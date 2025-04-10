package com.marriott.rfp.dataaccess.wholesaler.rates.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.rates.api.RatesManager;
import com.marriott.rfp.object.wholesaler.hotel.HotelRates;
import com.marriott.rfp.object.wholesaler.rates.Rates;
import com.marriott.rfp.object.wholesaler.roompools.RoomPools;

/**
 * Session Bean implementation class SeasonsManager
 */

@Service
public class RatesManagerImpl implements RatesManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public RatesManagerImpl() { }

	@SuppressWarnings("unchecked")
	public List<RoomPools> findRoomPoolsByParticipationId(long participationid) {

		String queryString = "SELECT A.ROOMPOOL_ID, A.ROOMPOOL_REF_ID, B.ROOMPOOL, B.ROOMPOOL_SEQ_ID"
				+ " FROM MFPDBO.WS_ROOMPOOL A, MFPDBO.WS_ROOMPOOL_REF B"
				+ " WHERE participation_id = ?1"
				+ " AND A.roompool_ref_id = B.roompool_ref_id"
				+ " order by roompool_seq_id";

		Query q = em.createNativeQuery(queryString, RoomPools.class);
		q.setParameter(1, participationid);
		List<RoomPools> roomPoolsList = q.getResultList();
		if (roomPoolsList != null && roomPoolsList.size() > 0) {
			for (int i = 0; i < roomPoolsList.size(); i++) {
				RoomPools roomPools = (RoomPools) roomPoolsList.get(i);
				roomPools.setHasRates(hasRates(participationid,
						roomPools.getRoompool_ref_id()));
			}
		}

		return roomPoolsList;

	}

	public boolean hasRates(long participationid, long refid) {
		boolean b = false;
		String queryString = "select count(*) from mfpdbo.ws_rates "
				+ "where roompool_id=(select roompool_id from mfpdbo.ws_roompool "
				+ "where participation_id= ?1 and roompool_ref_id= ?2)";

		Query q = em.createNativeQuery(queryString, Integer.class);
		q.setParameter(1, participationid);
		q.setParameter(2, refid);
		Integer IntCl = (Integer) q.getSingleResult();
		int cnt = IntCl.intValue();
		if (cnt > 0) {
			b = true;
		}
		return b;
	}

	@SuppressWarnings("unchecked")
	public List<Rates> findRatesByRoomPool(long roompoolid) {
		String queryString = "select nvl(rates_id,0) rates_id,nvl(daysofweek_id,0) daysofweek_id,"
				+ "nvl(daysofweek_ref_id,0) daysofweek_ref_id,nvl(bedtype_id,0) bedtype_id, "
				+ "nvl(bedtype_ref_id,0)bedtype_ref_id, "
				+ "nvl(roompool_id,0)roompool_id,nvl(room_rate,'-1') room_rate "
				+ "from mfpdbo.ws_rates where roompool_id=?";

		Query q = em.createNativeQuery(queryString, Rates.class);
		q.setParameter(1, roompoolid);
		List<Rates> ratesList = q.getResultList();

		return ratesList;

	}

	public void updateWSRates(Map<String, HotelRates> rateslist, long roompoolid, long wsid, String formChanged, long period, String role, boolean isPeriodExpired, String loginName) {
		
		CallableStatement stmt;
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			try {
				
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				stmt = con.prepareCall("{call mfpproc.SP_WS_UPDATERATES(?, ?, ?, ?, ? ,?)}");
				try {
					for (String key : rateslist.keySet()) {
						String[] splitkey = key.split("_");
						if (Long.valueOf(splitkey[4]) != 0) {
							stmt.setLong(1, Long.valueOf(splitkey[4]));
						} else {
							stmt.setNull(1, Types.NUMERIC);
						}
						stmt.setLong(2, Long.valueOf(splitkey[0]));
						stmt.setLong(3, Long.valueOf(splitkey[1]));
						stmt.setLong(4, Long.valueOf(splitkey[2]));
						stmt.setLong(5, Long.valueOf(splitkey[3]));
						stmt.setObject(6, rateslist.get(key).getRate(), Types.DOUBLE);
						stmt.execute();
					}
				} finally {
					stmt.close();
				}

				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

}