package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountFacilityManager;
import com.marriott.rfp.object.pricing.hotelrfp.AccountFacility;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountFacilityManagerImpl implements HotelAccountFacilityManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<AccountFacility> findFacilityDetails(long hotelid, long accountrecid) {

		String queryString = "SELECT decode(c.businessname, null,  c.ultimatebusinessname, c.businessname) businessname, c.streetaddress1 address,  c.cityname,  c.stateabbrev, c.zipcode, "
				+ " a.distance, a.direction,  c.siteemployeenumber,  '(' || c.telephoneareacode || ') ' || SUBSTR (c.phonenumber, 1, 3) || '-' || SUBSTR (c.phonenumber, 4, 4) phonenumber, "
				+ " c.siccode1desc " + " FROM mfpdbo.accountproximityhotel a, mfpdbo.account_mcad_lookup b, mfpdbo.businessfacts c "
				+ " WHERE (a.businessid = c.businessid) AND (a.hotelid = ?1) AND (DECODE (b.deployed_level,  'U', b.ultimatebusinessid,  'P', b.parentbusinessid) "
				+ " = DECODE (b.deployed_level,  'U', a.ultimatebusinessid,  'P', a.parentbusinessid))  AND (b. accountrecid =?2) " + " ORDER BY a.distance, c.cityname";
		Query q = em.createNativeQuery(queryString, AccountFacility.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountrecid);
		List<AccountFacility> facilityList = q.getResultList();
		return facilityList;

	}

	public boolean canPickFacility(long hotelid, long accountid) {

		String queryString = "select count(*) thecount from MFPDBO.ACCOUNTPROXIMITYDISTINCT where " + " accountid = ?1 and hotelid = ?2";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, accountid);
		q.setParameter(2, hotelid);
		Long numProximity = new Long(0);
		try {
			numProximity = (Long) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return (numProximity != null && numProximity > 0);

	}

	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	public String checkPropertyDistanceUnit(long hotelid) {

		String queryString = "select distanceunit from mfpdbo.hotel where hotelid =?1 ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelid);
		String distanceUnit = new String();
		try {
			distanceUnit = (String) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return distanceUnit;
	}
	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	public void updateFacilityInfo(long haccid, HotelAccountSpecificFacility hasf, Contact salesContact, User user) {

		Long rntargetnum = null;
		if (hasf.getRn_target() != null && hasf.getRn_target().equals("Y")) {
			rntargetnum = new Long(hasf.getRn_targetnum());
		}

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall(" begin  mfpproc.sp_updatefacility_salesctc_hpp(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); end; ");
				try {
					stmt.setLong(1, haccid);
					stmt.setString(2, hasf.getFacility_name());
					stmt.setString(3, hasf.getFacility_street());
					stmt.setString(4, hasf.getFacility_city());
					stmt.setString(5, hasf.getFacility_state_prov());
					stmt.setString(6, hasf.getFacility_zip());
					stmt.setString(7, hasf.getFacility_country());
					stmt.setString(8, StringUtility.replaceFormatChars(hasf.getDirectionstofacility()));
					stmt.setString(9, StringUtility.replaceFormatChars(hasf.getRatenotes()));
					if (hasf.getDistance() == null)
						stmt.setNull(10, Types.NUMERIC);
					else
						stmt.setDouble(10, hasf.getDistance());
					if (hasf.getShuttle_cost_one_way() == null)
						stmt.setNull(11, Types.NUMERIC);
					else
						stmt.setDouble(11, hasf.getShuttle_cost_one_way());
					stmt.setString(12, hasf.getRn_target());
					stmt.setObject(13, rntargetnum, Types.NUMERIC);
					if (hasf.getRm_nights() == null)
						stmt.setNull(14, Types.NUMERIC);
					else
						stmt.setLong(14, hasf.getRm_nights());
					if (salesContact != null) {
						stmt.setString(15, StringUtility.replaceFormatChars(salesContact.getContactname()));
						stmt.setString(16, StringUtility.replaceFormatChars(salesContact.getContactemail()));
						stmt.setString(17, salesContact.getContactcountrycode());
						stmt.setString(18, salesContact.getContactareacitycode());
						stmt.setString(19, salesContact.getContactphonenumber());
					} else {
						stmt.setString(15, "");
						stmt.setString(16, "");
						stmt.setString(17, "");
						stmt.setString(18, "");
						stmt.setString(19, "");

					}
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

	public void updateFacilityInfo(long haccid, HotelAccountSpecificFacility hasf, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall(" begin  mfpproc.sp_updatefacility_hpp(?,?,?,?,?, ?,?,?,?,?, ?); end; ");
				try {
					stmt.setLong(1, haccid);
					stmt.setString(2, hasf.getFacility_name());
					stmt.setString(3, hasf.getFacility_street());
					stmt.setString(4, hasf.getFacility_city());
					stmt.setString(5, hasf.getFacility_state_prov());
					stmt.setString(6, hasf.getFacility_zip());
					stmt.setString(7, hasf.getFacility_country());
					stmt.setString(8, StringUtility.replaceFormatChars(hasf.getDirectionstofacility()));
					stmt.setString(9, StringUtility.replaceFormatChars(hasf.getRatenotes()));
					if (hasf.getDistance() == null)
						stmt.setNull(10, Types.NUMERIC);
					else
						stmt.setDouble(10, hasf.getDistance());
					if (hasf.getShuttle_cost_one_way() == null)
						stmt.setNull(11, Types.NUMERIC);
					else
						stmt.setDouble(11, hasf.getShuttle_cost_one_way());
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

	public void updateSalesInfo(long haccid, Contact salesContact, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall(" begin  mfpproc.sp_update_salesctc_hpp(?,?,?,?,?,?); end; ");
				try {
					stmt.setLong(1, haccid);

					if (salesContact != null) {
						stmt.setString(2, StringUtility.replaceFormatChars(salesContact.getContactname()));
						stmt.setString(3, StringUtility.replaceFormatChars(salesContact.getContactemail()));
						stmt.setString(4, salesContact.getContactcountrycode());
						stmt.setString(5, salesContact.getContactareacitycode());
						stmt.setString(6, salesContact.getContactphonenumber());
					} else {
						stmt.setString(2, "");
						stmt.setString(3, "");
						stmt.setString(4, "");
						stmt.setString(5, "");
						stmt.setString(6, "");

					}
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

	public void updateRmNights(long haccid, Long rmNights, String extendcancelpolicy, String waiveCharge, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall(" begin  mfpproc.sp_updatermnights_hpp(?,?,?,?); end; ");
				try {
					stmt.setLong(1, haccid);
					if (rmNights == null)
						stmt.setNull(2, Types.NUMERIC);
					else
						stmt.setLong(2, rmNights);
					stmt.setString(3,extendcancelpolicy);
					stmt.setString(4, waiveCharge);
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

	public void updateRmNights_1(long haccid, Long rmNights, Long altcxlpolicytimeid, String waiveCharge, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall(" begin  mfpproc.sp_updatermnights_hpp_1(?,?,?,?); end; ");
				try {
					stmt.setLong(1, haccid);
					if (rmNights == null)
						stmt.setNull(2, Types.NUMERIC);
					else
						stmt.setLong(2, rmNights);
					if (altcxlpolicytimeid == null)
						stmt.setNull(3, Types.NUMERIC);
					else
						stmt.setLong(3, altcxlpolicytimeid);
					stmt.setString(4, waiveCharge);
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
