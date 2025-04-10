package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountRatesManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRoomPool;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountRatesManagerImpl implements HotelAccountRatesManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelRates> findOffcycleFixedRatesDetail(long hotel_accountinfoid) {

		String queryString = " SELECT A.SEASONID , A.LENGTHOFSTAYID , nvl(A.PRODUCTID, 1) productid , A.ROOMTYPEID, roompool, a.rate FROM mfpdbo.ACCOUNTRATES_FIXED A  WHERE (A.HOTEL_ACCOUNTINFOID =?1) "
				+ " ORDER BY  seasonid asc, lengthofstayid asc, productid asc, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, hotel_accountinfoid);
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	@SuppressWarnings("unchecked")
	public List<HotelRates> findRatesDetail(long hotel_accountinfoid) {
		String queryString = " SELECT A.SEASONID , A.LENGTHOFSTAYID , nvl(A.PRODUCTID, 1) productid, A.ROOMTYPEID, roompool,  A.RATE FROM mfpdbo.ACCOUNTRATES A  WHERE (A.HOTEL_ACCOUNTINFOID =?1 ) "
				+ " ORDER BY  seasonid asc, lengthofstayid asc, productid asc, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, hotel_accountinfoid);
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public void updateRates(long haccid, long rateTypeId, Map<String, HotelRates> rfpRatesDetails, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrates_rp(?,?,?,?,?,?,?,?); end;");
				try {
					Double rateValue;

					for (String key : rfpRatesDetails.keySet()) {
						HotelRates rfpRates = rfpRatesDetails.get(key);
						if (rfpRates.getRate() != null && rfpRates.getRate() == 0)
							rateValue = null;
						else
							rateValue = rfpRates.getRate();

						stmt.setLong(1, haccid);
						stmt.setLong(2, rfpRates.getSeasonid());
						stmt.setLong(3, rfpRates.getLengthofstayid());
						stmt.setLong(4, rateTypeId);
						stmt.setLong(5, rfpRates.getRoompool());
						stmt.setLong(6, Long.valueOf(rfpRates.getProductid()));
						stmt.setLong(7, rfpRates.getRoomtypeid());
						stmt.setObject(8, rateValue, Types.DOUBLE);
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

	public void updateAccountFixedRates(long haccid, Map<String, HotelRates> rfpRatesDetails, User user, boolean notlocked) {
		boolean bcontinue = false;
		if (!notlocked) {
			String queryString = " SELECT count(*) FROM mfpdbo.ACCOUNTRATES_FIXED A  WHERE (A.HOTEL_ACCOUNTINFOID =?1 ) ";
			Query q = em.createNativeQuery(queryString, Long.class);
			q.setParameter(1, haccid);
			try {
				Long hotelcount = (Long) q.getSingleResult();
				if (hotelcount.longValue() == 0)
					bcontinue = true;
			} catch (NoResultException e) {
				bcontinue = false;
			}
		} else
			bcontinue = true;
		if (bcontinue) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				try {
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
					audit.setAuditUser(con);
					CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrates_fixed_rp(?,?,?,?,?,?,?,?,?); end;");
					try {
						Double rateValue;

						for (String key : rfpRatesDetails.keySet()) {
							HotelRates rfpRates = rfpRatesDetails.get(key);
							if (rfpRates.getRate() == null || rfpRates.getRate() == 0)
								rateValue = null;
							else
								rateValue = rfpRates.getRate();

							stmt.setLong(1, haccid);
							stmt.setLong(2, rfpRates.getSeasonid());
							stmt.setLong(3, rfpRates.getLengthofstayid());
							stmt.setLong(4, 1);
							stmt.setLong(5, rfpRates.getRoompool());
							stmt.setLong(6, 1);
							stmt.setLong(7, rfpRates.getRoomtypeid());
							stmt.setObject(8, rateValue, Types.DOUBLE);
							stmt.setString(9, user.getShortRole());
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

	public List<HotelRFPRmPools> getHotelAccountRmPools(long hotel_accountinfoid) {

		String queryString = "SELECT c.ROOMCLASSSEQ roomClassSeq, c.ROOMPOOLSEQ roomPoolSeq, c.roompool, b.required  FROM (SELECT brr.roompoolid, brr.required required "
				+ " FROM mfpdbo.hotelrfp hr,  mfpdbo.hotel h, "
				+ " mfpdbo.hotel_accountinfo ha,  mfpdbo.brand_roompools_ref brr  WHERE     hr.hotelid = h.hotelid  AND h.affiliationid = brr.affiliationid(+) "
				+ " AND ha.hotelrfpid = hr.hotelrfpid  AND ha.hotel_accountinfoid = ?1) b,  (SELECT LEVEL seq  FROM DUAL "
				+ " CONNECT BY LEVEL <= mfpproc.fn_maxacct_roompool_rpe (?2)) a,  (SELECT a.ROOMCLASSSEQ, a.ROOMPOOLSEQ, a.roompool  FROM mfpdbo.hotelrfp_roompools a, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha "
				+ " WHERE a.hotelrfpid = hr.hotelrfpid AND hr.hotelrfpid = ha.hotelrfpid AND ha.hotel_accountinfoid = ?3  and a.ROOMPOOL is not null ) c  WHERE a.seq = c.ROOMCLASSSEQ(+) AND a.seq = b.roompoolid(+) "
				+ " ORDER BY roomClassSeq, roomPoolSeq";

		Query q = em.createNativeQuery(queryString, HotelRFPRoomPool.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotel_accountinfoid);
		q.setParameter(3, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<HotelRFPRmPools> hotelAccountRmPools = getRFPRoomPools(q.getResultList());
		return hotelAccountRmPools;
	}

	/**
	 * SWIRM-195 : Convert the HotelRFPRoomPool to HotelRFPRmPools type
	 * @param resultList
	 * @return
	 */
	private List<HotelRFPRmPools> getRFPRoomPools(List<HotelRFPRoomPool> resultList) {
		Map<Long,HotelRFPRmPools> roomClassMap = new HashedMap<Long, HotelRFPRmPools>();
		for(HotelRFPRoomPool roomPoolClass : resultList) {
			if(roomClassMap.containsKey(roomPoolClass.getRoomClassSeq())) {
				roomClassMap.get(roomPoolClass.getRoomClassSeq()).getRoomPoolList().add(roomPoolClass.getRoomPool());
			}else {
				HotelRFPRmPools roomPool = new HotelRFPRmPools();
				List<String> roomPools = new ArrayList<String>();
				roomPool.setRequired(roomPoolClass.getRequired());
				roomPools.add(roomPoolClass.getRoomPool());
				roomPool.setRoomPoolList(roomPools);
				roomPool.setSeq(roomPoolClass.getRoomClassSeq());
				roomClassMap.put(roomPoolClass.getRoomClassSeq(), roomPool);
			}
		}
		List<HotelRFPRmPools> rfpRoomPoolList = new ArrayList<HotelRFPRmPools>(roomClassMap.values());
		if (!CollectionUtils.isEmpty(rfpRoomPoolList)) {
			Collections.sort(rfpRoomPoolList, new Comparator<HotelRFPRmPools>() {
				@Override
				public int compare(HotelRFPRmPools object1, HotelRFPRmPools object2) {
					int result = 0;
					if (null != object1.getSeq() && null != object2.getSeq()) {
						result = object1.getSeq().compareTo(object2.getSeq());
					}
					return result;
				}
			});
		}
		return rfpRoomPoolList;
	}
}
