package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelGeneralRatesManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelGeneralRatesManagerImpl implements HotelGeneralRatesManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelRates> findGenRatesDetail(long hotelrfpid, long ratetypeid) {

		String queryString = " SELECT A.SEASONID , A.LENGTHOFSTAYID , nvl(A.PRODUCTID, 1) productid , A.ROOMTYPEID,  A.RATE, a.roompool FROM mfpdbo.HOTELRATES A "
				+ "WHERE A.HOTELRFPID =?1  AND A.RATETYPEID =?2  ORDER BY  seasonid asc, lengthofstayid asc, roompool asc, productid asc, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, ratetypeid);
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public List<HotelRates> findGenFixedRatesForOffcycleFloat(long hotelrfpid) {
		String queryString = " SELECT   1 seasonid, a.lengthofstayid, NVL (a.productid, 1) productid, a.roomtypeid, a.rate, a.roompool   FROM   mfpdbo.hotelrates a  WHERE   (a.hotelrfpid = ?1 "
				+ ") AND ratetypeid = 1 AND seasonid IN  (SELECT   MIN (seasonid)  FROM   mfpdbo.hotelrates "
				+ " WHERE   hotelrfpid = ?2 AND ratetypeid = 1 AND roomtypeid IN (1, 3) AND NVL (productid, 1) = 1 AND lengthofstayid = 1  AND rate IN "
				+ " (SELECT   MAX (a.rate)  FROM   mfpdbo.hotelrates a  WHERE       (a.hotelrfpid = ?3) " + " AND ratetypeid = 1  AND roomtypeid IN (1, 3)  AND NVL (a.productid, 1) = 1 "
				+ " AND lengthofstayid = 1))  ORDER BY   lengthofstayid ASC,  roompool asc, productid ASC, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotelrfpid);
		q.setParameter(3, hotelrfpid);
		@SuppressWarnings("unchecked")
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public List<HotelRates> findRatesForOffcycleFloat(long hotelrfpid, Double percentdiscount, String discfirsttieronly) {
		String queryString = " SELECT   1 seasonid, a.lengthofstayid, NVL (a.productid, 1) productid,a.roompool, a.roomtypeid, CASE WHEN 'Y' =?1 AND a.lengthofstayid <> 1  THEN "
				+ " ( SELECT MIN( CASE WHEN b.lengthofstayid <> 1 THEN b.rate ELSE ROUND( b.rate * ( ( 100 -?2 ) / 100 ) ) END ) rate	FROM mfpdbo.hotelrates b "
				+ "	WHERE     ( b.hotelrfpid = a.hotelrfpid ) 	AND b.ratetypeid = 1	AND b.lengthofstayid <= a.lengthofstayid 	AND b.roomtypeid = a.roomtypeid "
				+ "	AND b.seasonid = a.seasonid and b.roompool=a.roompool) ELSE ROUND( a.rate * ( ( 100 -?3 ) / 100 ) ) END rate  FROM   mfpdbo.hotelrates a , mfpdbo.hotelrfp hr, mfpdbo.hotel h, mfpdbo.brand_roompools_ref brr "
				+ " WHERE   (a.hotelrfpid =?4  ) AND ratetypeid = 1 AND seasonid IN  (SELECT   MIN (seasonid)  FROM   mfpdbo.hotelrates WHERE   hotelrfpid = ?5 "
				+ " AND ratetypeid = 1 AND roomtypeid IN (1, 3) AND NVL (productid, 1) = 1 AND lengthofstayid = 1  AND rate IN "
				+ " (SELECT   MAX (a.rate)  FROM   mfpdbo.hotelrates a  WHERE       (a.hotelrfpid = ?6)  AND ratetypeid = 1  AND roomtypeid IN (1, 3)  AND NVL (a.productid, 1) = 1 "
				+ " AND lengthofstayid = 1))   and a.hotelrfpid=hr.hotelrfpid and hr.hotelid=h.hotelid and h.affiliationid=brr.affiliationid and brr.required='Y' and brr.roompoolid=a.roompool "
				+ " ORDER BY   lengthofstayid ASC,  roompool asc, productid ASC, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, discfirsttieronly);
		q.setParameter(2, percentdiscount);
		q.setParameter(3, percentdiscount);
		q.setParameter(4, hotelrfpid);
		q.setParameter(5, hotelrfpid);
		q.setParameter(6, hotelrfpid);
		@SuppressWarnings("unchecked")
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public List<HotelRates> findRatesForFloat(long hotelrfpid, Double percentdiscount, String discfirsttieronly) {
		String queryString = " SELECT A.SEASONID , A.LENGTHOFSTAYID , nvl(A.PRODUCTID, 1) productid , a.roompool, A.ROOMTYPEID,  CASE WHEN 'Y' =?1 AND a.lengthofstayid <> 1  THEN "
				+ "	 ( SELECT MIN( CASE WHEN b.lengthofstayid <> 1 THEN b.rate ELSE ROUND( b.rate * ( ( 100 -?2 ) / 100 ) ) END ) rate	FROM mfpdbo.hotelrates b "
				+ "	WHERE     ( b.hotelrfpid = a.hotelrfpid ) 	AND b.ratetypeid = 1	AND b.lengthofstayid <= a.lengthofstayid 	AND b.roomtypeid = a.roomtypeid "
				+ "	AND b.seasonid = a.seasonid   and b.roompool=a.roompool) ELSE ROUND( a.rate * ( ( 100 -?3 ) / 100 ) ) END rate FROM mfpdbo.hotelRATES A, mfpdbo.hotelrfp hr, mfpdbo.hotel h, mfpdbo.brand_roompools_ref brr"
				+ " WHERE (A.HOTELrfpID =?4) and ratetypeid=1 and a.hotelrfpid=hr.hotelrfpid and hr.hotelid=h.hotelid and h.affiliationid=brr.affiliationid and brr.required='Y' and brr.roompoolid=a.roompool "
				+ " ORDER BY  seasonid asc, lengthofstayid asc,  roompool asc, productid asc, roomtypeid ASC ";
		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, discfirsttieronly);
		q.setParameter(2, percentdiscount);
		q.setParameter(3, percentdiscount);
		q.setParameter(4, hotelrfpid);
		@SuppressWarnings("unchecked")
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public void updateGeneralRates(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelrates(?,?,?,?,?,?,?); end; ");
				try {
					for (String key : rateslist.keySet()) {
						if (rateslist.get(key).getRate() == null || rateslist.get(key).getRate() == 0)
							rateslist.get(key).setRate(null);
						String[] splitkey = key.split("_");
						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, Long.valueOf(splitkey[0]));
						stmt.setLong(3, Long.valueOf(splitkey[1]));
						stmt.setLong(4, ratetypeid);
						stmt.setLong(5, Long.valueOf(splitkey[2]));
						stmt.setLong(6, Long.valueOf(splitkey[3]));
						stmt.setObject(7, rateslist.get(key).getRate(), Types.DOUBLE);
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

	public void updateGeneralRates2(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelrates_rp(?,?,?,?,?,?,?,?); end; ");
				try {
					for (String key : rateslist.keySet()) {
						if (rateslist.get(key).getRate() == null || rateslist.get(key).getRate() == 0)
							rateslist.get(key).setRate(null);
						String[] splitkey = key.split("_");
						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, rateslist.get(key).getSeasonid());
						stmt.setLong(3, rateslist.get(key).getLengthofstayid());
						stmt.setLong(4, ratetypeid);
						stmt.setLong(5, Long.valueOf(splitkey[2]));
						stmt.setLong(6, Long.valueOf(splitkey[3]));
						stmt.setLong(7, Long.valueOf(splitkey[4]));
						stmt.setObject(8, rateslist.get(key).getRate(), Types.DOUBLE);
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

	public void updateGeneralFixedRates(long hotelrfpid, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.SP_UPDATEHOTELSPORTFOLIO_bt(?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.execute();
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATEHOTELACCOUNTINFO_bt(?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.execute();
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_INSERTUPDATE_MARKETCODE_HTL(?); end; ");
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

	@SuppressWarnings("unchecked")
	public List<HotelRates> findGovGenRatesDetail(long hotelrfpid, long ratetypeid) {
		String queryString = " SELECT A.SEASONID , A.LENGTHOFSTAYID , nvl(A.PRODUCTID, 1) productid , A.ROOMTYPEID,  A.RATE, a.roompool FROM mfpdbo.HOTELRATES_GOV A "
				+ "WHERE A.HOTELRFPID =?1  AND A.RATETYPEID =?2  ORDER BY  seasonid asc, lengthofstayid asc,  roompool asc, productid asc, roomtypeid ASC ";

		Query q = em.createNativeQuery(queryString, HotelRates.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, ratetypeid);
		List<HotelRates> rateslist = q.getResultList();
		return rateslist;
	}

	public void updateGovGeneralRates(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelrates_gov(?,?,?,?,?,?,?); end; ");
				try {
					for (String key : rateslist.keySet()) {
						if (rateslist.get(key).getRate() == null || rateslist.get(key).getRate() == 0)
							rateslist.get(key).setRate(null);
						String[] splitkey = key.split("_");
						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, Long.valueOf(splitkey[0]));
						stmt.setLong(3, Long.valueOf(splitkey[1]));
						stmt.setLong(4, ratetypeid);
						stmt.setLong(5, Long.valueOf(splitkey[2]));
						stmt.setLong(6, Long.valueOf(splitkey[3]));
						stmt.setObject(7, rateslist.get(key).getRate(), Types.DOUBLE);
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

	public void updateGovGeneralRates2(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelratesgovr(?,?,?,?,?,?,?,?); end; ");
				try {
					for (String key : rateslist.keySet()) {
						if (rateslist.get(key).getRate() == null || rateslist.get(key).getRate() == 0)
							rateslist.get(key).setRate(null);
						String[] splitkey = key.split("_");
						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, rateslist.get(key).getSeasonid());
						stmt.setLong(3, rateslist.get(key).getLengthofstayid());
						stmt.setLong(4, ratetypeid);
						stmt.setLong(5, Long.valueOf(splitkey[2]));
						stmt.setLong(6, Long.valueOf(splitkey[3]));
						stmt.setLong(7, Long.valueOf(splitkey[4]));
						stmt.setObject(8, rateslist.get(key).getRate(), Types.DOUBLE);
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
