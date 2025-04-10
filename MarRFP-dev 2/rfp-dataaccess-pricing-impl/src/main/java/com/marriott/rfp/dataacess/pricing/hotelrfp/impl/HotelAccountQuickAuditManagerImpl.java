package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountQuickAuditManager;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditCancelInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRateIncludes;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRates;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRules;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRulesInfo;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountQuickAuditManagerImpl implements HotelAccountQuickAuditManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<QuickAuditInfo> getQuickAudit(long hotel_accountinfoid) {
		String queryString = "SELECT a. quickaudithotelaccountid, a.quickauditversion, a.ratetype_selected, a.percentdiscount, a.last_updatedrates, a.last_updaterateseid, mfpproc.FN_GET_RATEPRODUCT(a.ratetype_selected) productdesc, act.offcycle, act.accountname "
				+ "  FROM mfpdbo.quickaudithotelaccount a, mfpdbo.hotel_accountinfo ha, mfpdbo.account act "
				+ " WHERE a.hotel_accountinfoid = ? and ha.hotel_accountinfoid=a.hotel_accountinfoid and ha.accountrecid=act.accountrecid ORDER BY quickauditversion";

		Query q = em.createNativeQuery(queryString, QuickAuditInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<QuickAuditInfo> qaList = q.getResultList();
		return qaList;

	}

	public List<QuickAuditRates> getQuickAuditRates(long hotel_accountinfoid, long quickaudithotelaccountid) {
		String queryString = "SELECT  a.seasonid, a.startdate, a.enddate, "
				+ " a.lengthofstayid, a.roomnightsfrom, a.roomnightsto, a.lra_single_rp1,  a.lra_double_rp1, a.lra_single_rp2,  a.lra_double_rp2, a.lra_single_rp3,  a.lra_double_rp3, "
				+ " a.lra_ext_rp1, a.lra_ext_rp2,  a.lra_ext_rp3, a.nlra_single_rp1,  a.nlra_double_rp1, a.nlra_single_rp2,  a.nlra_double_rp2, a.nlra_single_rp3,  a.nlra_double_rp3, "
				+ " a.nlra_ext_rp1, a.nlra_ext_rp2, a.nlra_ext_rp3, a.fixed_single_rp1,  a.fixed_double_rp1,  a.fixed_single_rp2,  a.fixed_double_rp2, a.fixed_single_rp3,  a.fixed_double_rp3, "
				+ " a.fixed_ext_rp1, a.fixed_ext_rp2,  a.fixed_ext_rp3 "
				+ " FROM mfpdbo.quickauditharates a where hotel_accountinfoid=?1 and quickaudithotelaccountid=?2   order by seasonid, lengthofstayid ";

		Query q = em.createNativeQuery(queryString, QuickAuditRates.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithotelaccountid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRates> qaList = q.getResultList();
		return qaList;

	}

	public List<QuickAuditRates> getQuickAuditRatesWithDiff(long hotel_accountinfoid, long quickaudithotelaccountid, long prevquickaudithotelaccountid) {
		String queryString = " SELECT a.seasonid, a.startdate, a.enddate, a.lengthofstayid, a.roomnightsfrom, a.roomnightsto, a.lra_single_rp1, a.lra_double_rp1, a.lra_single_rp2, "
				+ " a.lra_double_rp2, a.lra_single_rp3, a.lra_double_rp3, a.lra_ext_rp1, a.lra_ext_rp2, a.lra_ext_rp3, a.nlra_single_rp1, a.nlra_double_rp1, "
				+ " a.nlra_single_rp2, a.nlra_double_rp2, a.nlra_single_rp3, a.nlra_double_rp3, a.nlra_ext_rp1, a.nlra_ext_rp2, a.nlra_ext_rp3, a.fixed_single_rp1, "
				+ " a.fixed_double_rp1, a.fixed_single_rp2, a.fixed_double_rp2, a.fixed_single_rp3, a.fixed_double_rp3, a.fixed_ext_rp1, a.fixed_ext_rp2, "
				+ " a.fixed_ext_rp3, CASE WHEN a.startdate <> b.startdate OR b.startdate IS NULL THEN 'Y' ELSE 'N' END startdatediff, "
				+ " CASE WHEN a.enddate <> b.enddate OR b.enddate IS NULL THEN 'Y' ELSE 'N' END enddatediff, "
				+ " CASE WHEN a.roomnightsfrom <> b.roomnightsfrom OR b.roomnightsfrom IS NULL THEN 'Y' ELSE 'N' END roomnightsfromdiff, "
				+ " CASE WHEN a.roomnightsto <> b.roomnightsto OR b.roomnightsto IS NULL THEN 'Y' ELSE 'N' END roomnightstodiff, "
				+ " CASE WHEN a.lra_single_rp1 <> b.lra_single_rp1 OR b.lra_single_rp1 IS NULL THEN 'Y' ELSE 'N' END lra_single_rp1_diff, "
				+ " CASE WHEN a.lra_double_rp1 <> b.lra_double_rp1 OR b.lra_double_rp1 IS NULL THEN 'Y' ELSE 'N' END lra_double_rp1_diff, "
				+ " CASE WHEN a.lra_single_rp2 <> b.lra_single_rp2 OR b.lra_single_rp2 IS NULL THEN 'Y' ELSE 'N' END lra_single_rp2_diff, "
				+ " CASE WHEN a.lra_double_rp2 <> b.lra_double_rp2 OR b.lra_double_rp2 IS NULL THEN 'Y' ELSE 'N' END lra_double_rp2_diff, "
				+ " CASE WHEN a.lra_single_rp3 <> b.lra_single_rp3 OR b.lra_single_rp3 IS NULL THEN 'Y' ELSE 'N' END lra_single_rp3_diff, "
				+ " CASE WHEN a.lra_double_rp3 <> b.lra_double_rp3 OR b.lra_double_rp3 IS NULL THEN 'Y' ELSE 'N' END lra_double_rp3_diff, "
				+ " CASE WHEN a.lra_ext_rp1 <> b.lra_ext_rp1 OR b.lra_ext_rp1 IS NULL THEN 'Y' ELSE 'N' END lra_ext_rp1_diff, "
				+ " CASE WHEN a.lra_ext_rp2 <> b.lra_ext_rp2 OR b.lra_ext_rp2 IS NULL THEN 'Y' ELSE 'N' END lra_ext_rp2_diff, "
				+ " CASE WHEN a.lra_ext_rp3 <> b.lra_ext_rp3 OR b.lra_ext_rp3 IS NULL THEN 'Y' ELSE 'N' END lra_ext_rp3_diff, "
				+ " CASE WHEN a.nlra_single_rp1 <> b.nlra_single_rp1 OR b.nlra_single_rp1 IS NULL THEN 'Y' ELSE 'N' END nlra_single_rp1_diff, "
				+ " CASE WHEN a.nlra_double_rp1 <> b.nlra_double_rp1 OR b.nlra_double_rp1 IS NULL THEN 'Y' ELSE 'N' END nlra_double_rp1_diff, "
				+ " CASE WHEN a.nlra_single_rp2 <> b.nlra_single_rp2 OR b.nlra_single_rp2 IS NULL THEN 'Y' ELSE 'N' END nlra_single_rp2_diff, "
				+ " CASE WHEN a.nlra_double_rp2 <> b.nlra_double_rp2 OR b.nlra_double_rp2 IS NULL THEN 'Y' ELSE 'N' END nlra_double_rp2_diff, "
				+ " CASE WHEN a.nlra_single_rp3 <> b.nlra_single_rp3 OR b.nlra_single_rp3 IS NULL THEN 'Y' ELSE 'N' END nlra_single_rp3_diff, "
				+ " CASE WHEN a.nlra_double_rp3 <> b.nlra_double_rp3 OR b.nlra_double_rp3 IS NULL THEN 'Y' ELSE 'N' END nlra_double_rp3_diff, "
				+ " CASE WHEN a.nlra_ext_rp1 <> b.nlra_ext_rp1 OR b.nlra_ext_rp1 IS NULL THEN 'Y' ELSE 'N' END nlra_ext_rp1_diff, "
				+ " CASE WHEN a.nlra_ext_rp2 <> b.nlra_ext_rp2 OR b.nlra_ext_rp2 IS NULL THEN 'Y' ELSE 'N' END nlra_ext_rp2_diff, "
				+ " CASE WHEN a.nlra_ext_rp3 <> b.nlra_ext_rp3 OR b.nlra_ext_rp3 IS NULL THEN 'Y' ELSE 'N' END nlra_ext_rp3_diff, "
				+ " CASE WHEN a.fixed_single_rp1 <> b.fixed_single_rp1 OR b.fixed_single_rp1 IS NULL THEN 'Y' ELSE 'N' END fixed_single_rp1_diff, "
				+ " CASE WHEN a.fixed_double_rp1 <> b.fixed_double_rp1 OR b.fixed_double_rp1 IS NULL THEN 'Y' ELSE 'N' END fixed_double_rp1_diff, "
				+ " CASE WHEN a.fixed_single_rp2 <> b.fixed_single_rp2 OR b.fixed_single_rp2 IS NULL THEN 'Y' ELSE 'N' END fixed_single_rp2_diff, "
				+ " CASE WHEN a.fixed_double_rp2 <> b.fixed_double_rp2 OR b.fixed_double_rp2 IS NULL THEN 'Y' ELSE 'N' END fixed_double_rp2_diff, "
				+ " CASE WHEN a.fixed_single_rp3 <> b.fixed_single_rp3 OR b.fixed_single_rp3 IS NULL THEN 'Y' ELSE 'N' END fixed_single_rp3_diff, "
				+ " CASE WHEN a.fixed_double_rp3 <> b.fixed_double_rp3 OR b.fixed_double_rp3 IS NULL THEN 'Y' ELSE 'N' END fixed_double_rp3_diff, "
				+ " CASE WHEN a.fixed_ext_rp1 <> b.fixed_ext_rp1 OR b.fixed_ext_rp1 IS NULL THEN 'Y' ELSE 'N' END fixed_ext_rp1_diff, "
				+ " CASE WHEN a.fixed_ext_rp2 <> b.fixed_ext_rp2 OR b.fixed_ext_rp2 IS NULL THEN 'Y' ELSE 'N' END fixed_ext_rp2_diff, "
				+ " CASE WHEN a.fixed_ext_rp3 <> b.fixed_ext_rp3 OR b.fixed_ext_rp3 IS NULL THEN 'Y' ELSE 'N' END fixed_ext_rp3_diff "
				+ " FROM (SELECT a.seasonid, a.startdate, a.enddate, a.lengthofstayid, a.roomnightsfrom, a.roomnightsto, a.lra_single_rp1, a.lra_double_rp1, "
				+ " a.lra_single_rp2, a.lra_double_rp2, a.lra_single_rp3, a.lra_double_rp3, a.lra_ext_rp1, a.lra_ext_rp2, a.lra_ext_rp3, a.nlra_single_rp1, "
				+ " a.nlra_double_rp1, a.nlra_single_rp2, a.nlra_double_rp2, a.nlra_single_rp3, a.nlra_double_rp3, a.nlra_ext_rp1, a.nlra_ext_rp2, "
				+ " a.nlra_ext_rp3, a.fixed_single_rp1, a.fixed_double_rp1, a.fixed_single_rp2, a.fixed_double_rp2, a.fixed_single_rp3, a.fixed_double_rp3, "
				+ " a.fixed_ext_rp1, a.fixed_ext_rp2, a.fixed_ext_rp3 FROM mfpdbo.quickauditharates a  	WHERE hotel_accountinfoid = ?1 AND quickaudithotelaccountid = ?2 "
				+ " ORDER BY seasonid, lengthofstayid) a,  (SELECT a.seasonid, a.startdate, a.enddate, a.lengthofstayid, a.roomnightsfrom, a.roomnightsto, a.lra_single_rp1, a.lra_double_rp1, "
				+ " a.lra_single_rp2, a.lra_double_rp2, a.lra_single_rp3, a.lra_double_rp3, a.lra_ext_rp1, a.lra_ext_rp2, a.lra_ext_rp3, a.nlra_single_rp1, "
				+ " a.nlra_double_rp1, a.nlra_single_rp2, a.nlra_double_rp2, a.nlra_single_rp3, a.nlra_double_rp3, a.nlra_ext_rp1, a.nlra_ext_rp2, "
				+ " a.nlra_ext_rp3, a.fixed_single_rp1, a.fixed_double_rp1, a.fixed_single_rp2, a.fixed_double_rp2, a.fixed_single_rp3, a.fixed_double_rp3, "
				+ " a.fixed_ext_rp1, a.fixed_ext_rp2, a.fixed_ext_rp3  FROM mfpdbo.quickauditharates a  WHERE hotel_accountinfoid = ?3 AND quickaudithotelaccountid = ?4 "
				+ " ORDER BY seasonid, lengthofstayid) b WHERE a.seasonid = b.seasonid(+) AND a.lengthofstayid = b.lengthofstayid(+)  ORDER BY seasonid, lengthofstayid ";

		Query q = em.createNativeQuery(queryString, QuickAuditRates.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithotelaccountid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, prevquickaudithotelaccountid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRates> qaList = q.getResultList();
		return qaList;

	}

	public void updateQuickAudit(long haccid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatequickauditrates(?); end; ");
				try {
					stmt.setLong(1, haccid);
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

	public List<QuickAuditAmenInfo> getQuickAuditAmen(long hotel_accountinfoid) {
		String queryString = "SELECT a.quickaudithtlacctamenid, a.quickauditversion, a.last_updatedrates, a.last_updaterateseid, act.accountname "
				+ "  FROM mfpdbo.quickaudithtlacctamen a, mfpdbo.hotel_accountinfo ha, mfpdbo.account act "
				+ " WHERE a.hotel_accountinfoid = ? and ha.hotel_accountinfoid=a.hotel_accountinfoid and ha.accountrecid=act.accountrecid ORDER BY quickauditversion";

		Query q = em.createNativeQuery(queryString, QuickAuditAmenInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<QuickAuditAmenInfo> qaList = q.getResultList();
		return qaList;

	}
	
	public List<QuickAuditCancelInfo> getQuickAuditCancelInfo(long hotel_accountinfoid) {
		String queryString = "select auh.tdate updated_on, auh.osuser eid, mfpproc.fn_get_auditcxltime(auh.altcxlpolicytimeid_old) old_cxlpolicy, "
				           + "mfpproc.fn_get_auditcxltime(auh.altcxlpolicytimeid_new) new_cxlpolicy "
				           + "from mfpdbo.audit_hotel_accountinfo auh, mfpdbo.hotelrfp rfp, mfpdbo.hotel htl, mfpdbo.hotel_accountinfo hai "
				           + "where hai.hotel_accountinfoid=?1 and hai.accountrecid=auh.accountrecid and hai.hotelrfpid=rfp.hotelrfpid and rfp.hotelid=htl.hotelid "
				           + "and htl.marshacode=auh.marshacode and auh.altcxlpolicytimeid_old<>auh.altcxlpolicytimeid_new "
				           + "union "
				           + "select arh.tdate updated_on, arh.osuser eid, mfpproc.fn_get_auditcxltime(arh.altcxlpolicytimeid_old) old_cxlpolicy, "
				           + "mfpproc.fn_get_auditcxltime(arh.altcxlpolicytimeid_new) new_cxlpolicy "
				           + "from mfpdbo.archive_hotel_accountinfo arh, mfpdbo.hotelrfp rfp, mfpdbo.hotel htl, mfpdbo.hotel_accountinfo hai "
				           + "where hai.hotel_accountinfoid=?1 and hai.accountrecid=arh.accountrecid and hai.hotelrfpid=rfp.hotelrfpid and rfp.hotelid=htl.hotelid "
				           + "and htl.marshacode=arh.marshacode and arh.altcxlpolicytimeid_old<>arh.altcxlpolicytimeid_new "
				           + "order by updated_on";

		Query q = em.createNativeQuery(queryString, QuickAuditCancelInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<QuickAuditCancelInfo> qaList = q.getResultList();
		return qaList;
	}

	public List<QuickAuditAmenities> getQuickAuditAmenities(long hotel_accountinfoid, long quickaudithtlacctamenid) {
		String queryString = "SELECT   ar.amenitydescription, a.value FROM mfpdbo.quickaudithaamenities a, mfpdbo.amenities_ref ar  where a.amenityid=ar.amenityid "
				+ " and hotel_accountinfoid=?1 and a.quickaudithtlacctamenid=?2  order by ar.sequence";

		Query q = em.createNativeQuery(queryString, QuickAuditAmenities.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithtlacctamenid);
		@SuppressWarnings("unchecked")
		List<QuickAuditAmenities> qaList = q.getResultList();
		return qaList;

	}

	public List<QuickAuditAmenities> getQuickAuditAmenitiesWithDiff(long hotel_accountinfoid, long quickaudithtlacctamenid, long prevquickaudithtlacctamenid) {
		String queryString = "SELECT ar.amenitydescription, curr.value,CASE WHEN curr.value <> prev.value  OR prev.value IS NULL THEN 'Y' ELSE 'N' END valuediff "
				+ " FROM (SELECT a.amenityid, a.VALUE  FROM mfpdbo.quickaudithaamenities a  WHERE hotel_accountinfoid = ?1 AND a.quickaudithtlacctamenid = ?2) curr, "
				+ " (SELECT a.amenityid, a.VALUE  FROM mfpdbo.quickaudithaamenities a  WHERE hotel_accountinfoid = ?3 AND quickaudithtlacctamenid = ?4) prev, "
				+ "  mfpdbo.amenities_ref ar  WHERE curr.amenityid=ar.amenityid and curr.amenityid = prev.amenityid(+) order by ar.sequence";

		Query q = em.createNativeQuery(queryString, QuickAuditAmenities.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithtlacctamenid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, prevquickaudithtlacctamenid);
		@SuppressWarnings("unchecked")
		List<QuickAuditAmenities> qaList = q.getResultList();
		return qaList;

	}

	public List<QuickAuditRateIncludes> getQuickAuditRateIncludes(long hotel_accountinfoid, long quickaudithtlacctamenid) {
		String queryString = "SELECT   ar.rateincludesdescription, a.value FROM mfpdbo.quickauditharateincl a, mfpdbo.rateincludes_ref ar  where a.rateincludes_id=ar.rateincludes_id "
				+ " and hotel_accountinfoid=?1 and a.quickaudithtlacctamenid=?2  order by ar.sequence";

		Query q = em.createNativeQuery(queryString, QuickAuditRateIncludes.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithtlacctamenid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRateIncludes> qaList = q.getResultList();
		return qaList;

	}

	public List<QuickAuditRateIncludes> getQuickAuditRateIncludesWithDiff(long hotel_accountinfoid, long quickaudithtlacctamenid, long prevquickaudithtlacctamenid) {
		String queryString = "SELECT ar.rateincludesdescription, curr.value,CASE WHEN curr.value <> prev.value  OR prev.value IS NULL THEN 'Y' ELSE 'N' END valuediff "
				+ " FROM (SELECT a.rateincludes_id, a.VALUE  FROM mfpdbo.quickauditharateincl a  WHERE hotel_accountinfoid = ?1 AND a.quickaudithtlacctamenid = ?2) curr, "
				+ " (SELECT a.rateincludes_id, a.VALUE  FROM mfpdbo.quickauditharateincl a  WHERE hotel_accountinfoid = ?3 AND quickaudithtlacctamenid = ?4) prev, "
				+ "  mfpdbo.rateincludes_ref ar  WHERE curr.rateincludes_id=ar.rateincludes_id and curr.rateincludes_id = prev.rateincludes_id(+) order by ar.sequence";

		Query q = em.createNativeQuery(queryString, QuickAuditRateIncludes.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, quickaudithtlacctamenid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, prevquickaudithtlacctamenid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRateIncludes> qaList = q.getResultList();
		return qaList;

	}

	public void updateQuickAuditAmenities(long haccid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatequickauditamenities(?); end; ");
				try {
					stmt.setLong(1, haccid);
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
	public List<QuickAuditRulesInfo> getQuickAuditRuleInfo(long hotel_accountinfoid) {
		String queryString = "select a.quickaudithtlacctruleid, a.quickauditversion, a.last_updatedrules, a.last_updaterateseid" 
			+" from mfpdbo.Quickaudithtlacctrules a, mfpdbo.hotel_accountinfo ha, mfpdbo.account act "
				+ " WHERE a.hotel_accountinfoid = ? and ha.hotel_accountinfoid=a.hotel_accountinfoid and" 
				+" ha.accountrecid=act.accountrecid ORDER BY quickauditversion";
		Query q = em.createNativeQuery(queryString, QuickAuditRulesInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRulesInfo> qaList = q.getResultList();
		return qaList;

	}
	
	
	public List<QuickAuditRules> getQuickAuditRules(long hotel_accountinfoid, long Quickaudithtlacctruleid) {
		String queryString = "SELECT   'Commissionable:' as rulename, a.rulevalue,null as roompool FROM mfpdbo.Quickaudithacomvalues a "
							+" where  hotel_accountinfoid=?1 and a.quickaudithtlacctruleid=?2   " 
							+"union all " 
							+" SELECT   'LRA' as rulename, a.rulevalue,a.roompool FROM mfpdbo.Quickaudithalravalues a "
							+" where  hotel_accountinfoid=?1 and a.quickaudithtlacctruleid=?2 " 
							+" order by rulename,roompool";

		Query q = em.createNativeQuery(queryString, QuickAuditRules.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, Quickaudithtlacctruleid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRules> qaList = q.getResultList();
		return qaList;

	}
	
	public List<QuickAuditRules> getQuickAuditRulesWithDiff(long hotel_accountinfoid, long Quickaudithtlacctruleid, long prevQuickaudithtlacctruleid) {
		String queryString = "SELECT 'Commissionable:' as rulename,curr.rulevalue,null as roompool, CASE WHEN curr.rulevalue <> prev.rulevalue  OR "
			+" prev.rulevalue IS NULL THEN 'Y' ELSE 'N' END valuediff FROM " 
			+" (SELECT  a.rulevalue  FROM mfpdbo.Quickaudithacomvalues a WHERE hotel_accountinfoid = ?1 " 
			+" AND a.quickaudithtlacctruleid = ?2 ) curr, "
			+" (SELECT  a.rulevalue FROM mfpdbo.Quickaudithacomvalues a " 
			+" WHERE hotel_accountinfoid = ?3 AND a.quickaudithtlacctruleid =?4 ) prev "
			+" union all "
			+" SELECT 'LRA' as rulename,curr.rulevalue,curr.roompool,CASE WHEN curr.rulevalue <> prev.rulevalue  OR " 
			+" prev.rulevalue IS NULL THEN 'Y' ELSE 'N' END valuediff FROM "
			+" (SELECT  a.rulevalue, a.roompool  FROM mfpdbo.quickaudithalravalues a WHERE hotel_accountinfoid = ?1 " 
			+" AND a.quickaudithtlacctruleid = ?2 order by a.roompool) curr, "
			+" (SELECT  a.rulevalue, a.roompool  FROM mfpdbo.quickaudithalravalues a " 
			+" WHERE hotel_accountinfoid = ?3 AND a.quickaudithtlacctruleid =?4 order by a.roompool) prev " 
			+" WHERE curr.roompool=prev.roompool "
			+" order by rulename,roompool ";

		Query q = em.createNativeQuery(queryString, QuickAuditRules.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, Quickaudithtlacctruleid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, prevQuickaudithtlacctruleid);
		@SuppressWarnings("unchecked")
		List<QuickAuditRules> qaList = q.getResultList();
		return qaList;

	}

	public void updateQuickAuditRules(long haccid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatequickauditrules(?); end; ");
				try {
					stmt.setLong(1, haccid);
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
