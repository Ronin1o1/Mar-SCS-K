package com.marriott.rfp.dataacess.pricing.hotel.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelRoomPoolManager;
import com.marriott.rfp.object.pricing.hotel.HotelRoomPool;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelRoomPoolManagerImpl implements HotelRoomPoolManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<HotelRoomPool> findRoomPools(Long hotelid, Long hotelrfpid, User user, String softLaunchEnabled) {
		String querystring = "select roompoolid, roompool, actualnumrooms from mfpdbo.hotel_roompool where hotelid=?1  and roompool <> 'ROOM'  ";
		if (user.getIsHotelUser() && "N".equalsIgnoreCase(softLaunchEnabled)) {
			querystring += " and roompool not in (select roompool from mfpdbo.hotelrfp_roompools where hotelrfpid=?2  and roompool is not null) ";
		}
		querystring += " order by roompool ";
		Query q = em.createNativeQuery(querystring, HotelRoomPool.class);
		q.setParameter(1, hotelid);
		if (user.getIsHotelUser() && "N".equalsIgnoreCase(softLaunchEnabled)) {
			q.setParameter(2, hotelrfpid);
		}
		@SuppressWarnings("unchecked")
		List<HotelRoomPool> roompoollist = q.getResultList();
		return roompoollist;
	}

	public boolean hasBeenUpdatedToday(Long hotelid) {
		String strHasbeenupdated = "N";
		String querystring = "select decode(numupdatedtoday, 0, 'N','Y') updatedtoday from (SELECT count(*) numupdatedtoday  FROM mfpdbo.hotel_roompool a  where   hotelid=?1  and trunc(lastupdate_date) >= trunc(sysdate))";
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelid);
		try {
			strHasbeenupdated = (String) q.getSingleResult();
		} catch (NoResultException e) {
			strHasbeenupdated = "N";
		}

		return strHasbeenupdated.equals("Y");
	}
	
	public void updateHotelRoomPoolDate(Long hotelid) {

		Query q = em.createNativeQuery("begin update mfpdbo.hotel_roompool set lastupdate_date=sysdate where hotelid = ?1; end; ");
		q.setParameter(1, hotelid);
		q.executeUpdate();

	}

	public void updateHotelRoomPool(Long hotelid, List<HotelRoomPool> hotelroompoollist, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_insertupdate_hotelroompools(?, ?, ?); end; ");
				try {
					for (int i = 0; i < hotelroompoollist.size(); i++) {
						HotelRoomPool hotelRoomPool = hotelroompoollist.get(i);
						stmt.setLong(1, hotelid);
						stmt.setString(2, hotelRoomPool.getRoompool());
						if (hotelRoomPool.getActualnumrooms() == null) {
							stmt.setNull(3, Types.INTEGER);
						} else {
							stmt.setLong(3, hotelRoomPool.getActualnumrooms());
						}
						stmt.addBatch();
					}
					stmt.executeBatch();
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

	public void updateHotelRFPRoomPool(Long hotelrfpid, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_updatestdroompool_rpe(?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.execute();
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

	public void deleteHotelRoomPool(Long hotelid, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  delete from mfpdbo.hotel_roompool where hotelid=" + hotelid + " and trunc(lastupdate_date)<trunc(sysdate); end; ");
				try {
					stmt.execute();
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
