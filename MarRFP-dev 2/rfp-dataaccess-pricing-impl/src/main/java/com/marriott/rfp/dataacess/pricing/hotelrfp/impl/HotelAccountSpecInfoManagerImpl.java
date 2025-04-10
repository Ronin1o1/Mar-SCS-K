package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSpecInfoManager;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAccountFlags;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRPData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebid;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolDataDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.RebidStatus;
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountSpecInfoManagerImpl implements HotelAccountSpecInfoManager {
	private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecInfoManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public HotelAccountSpecificData findAccountSpecificDetail(long hotel_accountinfoid) {

		String queryString = "SELECT a.hotel_accountinfoid, g.hotelid, g.marshacode, g.affiliationid,  c.accountrecid, c.accountid, waiveblackouts, ratetype_selected, "
				+ " mfpproc.fn_getcompareratetype_bt (a.hotel_accountinfoid) compareratetype, mfpproc.fn_ishotelaccountlocked (a.hotel_accountinfoid) islocked, "
				+ " mfpproc.fn_ishotelaccountselected (a.hotel_accountinfoid) isselected, mfpproc.fn_get_hotelaccountstatus( a.hotel_accountinfoid ) isaccepted, "
				+ " c.accounttype, c.accountname, f.ratetypeid, d.hotelrfpid, c.aer_account, c.period, mfpproc.fn_getrpgm_rateoffer_rpe(g.hotelid, a.accountrecid, 1, 1,1) rateoffername1,  "
				+ " mfpproc.fn_getrpgm_rateoffer_rpe(g.hotelid, a.accountrecid, 1, 4,1) initialload, "
				+ " c.groupmeetings,nvl( c.gov_account,'N') gov_account, a.percentdiscount, c.allow_floatnociel, case when ratetype_selected=18 then nvl(c.discfirsttieronly,'N') else 'N' end discfirsttieronly, "
				+ " mfpproc.fn_get_aerminpercent_bt (f.ratetypeid, g.affiliationid, c.accountrecid) minpercent, "
				+ " mfpproc.fn_ishotelacctpgoos_pending (a.hotel_accountinfoid) isprogress, mfpproc.fn_issolicited_hotel (a.accountrecid, g.hotelid) issolicited, "
				+ " mfpproc.fn_get_ismaxaerdiscount (c.aer_account, c.accountrecid) ismaxaer, "
				+ " DECODE (rebid_flag, 'Y', DECODE (a.rebidstatus_id, NULL, 1, a.rebidstatus_id)) rebidstatus,rr.rebidstatus_desc,  DECODE (rebid_flag, 'Y', rebid_due, NULL) rebid_due, "
				+ " rebid_notes, DECODE (rebid_flag2, 'Y', DECODE (rebidstatus_id2, NULL, 1, rebidstatus_id2)) rebidstatus2, rr2.rebidstatus_desc rebidstatus_desc2, "
				+ " DECODE (rebid_flag2, 'Y', rebid_due2, NULL) rebid_due2, rebid_notes2, "
				+ " DECODE (rebid_flag3, 'Y', DECODE (rebidstatus_id3, NULL, 1, rebidstatus_id3)) rebidstatus3, "
				+ " DECODE (rebid_flag3, 'Y', rebid_due3, NULL) rebid_due3, rebid_notes3, "
				+ " DECODE ( c.allow_modifications, 'Y', CASE WHEN TRUNC (c.startmoddate) <= TRUNC (SYSDATE) AND TRUNC (c.endmoddate) >= TRUNC (SYSDATE) "
				+ " AND mfpproc.fn_ishotelaccountlocked ( a.hotel_accountinfoid) = 'Y' THEN 'Y' ELSE 'N' END, 'N') "
				+ " allow_modify, mfpproc.fn_exclude_aer (g.affiliationid) excludeaer, c.accountpricingtype, a.last_updatedrates,"
				+ " case when userrates.eid is null  or userrates.cn_refresh=-1 then a.last_updaterateseid else userrates.cn_firstname || ' ' || userrates.cn_lastname end lastupaterateeid,  a.last_updatedamenities, "
				+ "  case when userrates.eid is null  or userrates.cn_refresh=-1 then null else userrates.cn_mail end lastupaterateeemail, "
				+ " case when useramen.eid is null  or useramen.cn_refresh=-1 then a.last_updateamenitieseid else useramen.cn_firstname || ' ' || useramen.cn_lastname end lastupateameneid, "
				+ "  case when useramen.eid is null  or useramen.cn_refresh=-1 then null else useramen.cn_mail end lastupateameneemail, "
				+ " a.LAST_UPDATEDREBID1, a.LAST_UPDATEDREBID2, a.LAST_UPDATEDREBID3, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID1EID,1) LASTUPDATEREBID1EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID1EID,2) lastupdaterebid1email, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID2EID,1) LASTUPDATEREBID2EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID2EID,2) lastupdaterebid2email, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID3EID,1) LASTUPDATEREBID3EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID3EID,2) lastupdaterebid3email, "
				+ " nvl(a.business_case,'N') business_case , nvl( c.offcycle,'N') offcycle, mfpproc.fn_maxacct_roompool_rpe(a.hotel_accountinfoid) maxroompools,"
				+ " mfpproc.fn_getcontractstart (c.accountrecid) contractstart, mfpproc.fn_getcontractend (c.accountrecid) contractend, mfpproc.fn_availacct_roompool(a.hotel_accountinfoid) availroompools, "
				+ " DECODE ( c.allow_qmods, 'Y', CASE WHEN TRUNC (c.startqmoddate) <= TRUNC (SYSDATE) AND TRUNC (c.endqmoddate) >= TRUNC (SYSDATE) "
				+ " AND mfpproc.fn_ishotelaccountlocked( a.hotel_accountinfoid) = 'Y' THEN 'Y' ELSE 'N' END, 'N')  allow_qmodify, haf.breakfast_incl_corp_rates, mfpproc.fn_get_maxnumseasons(c.accountrecid) maxseasons, hi.cbc_softduedate "
				+ " , case when hi.cbc_softduedate<trunc(sysdate) then 'Y' else 'N' end ispastcbc, mfpproc.fn_hasnlrapricing(a.hotel_accountinfoid) hasnlrapricing, mfpproc.fn_cbcstatus (a.accountrecid, g.hotelid) cbcstatus, haf.breakfast_incl_corp_rates breakinrates "
				+ " FROM mfpdbo.hotel_accountinfo a, mfpdbo.account c, mfpdbo.ratetype_ref f, mfpdbo.hotelrfp d, mfpdbo.hotel g, mfpdbo.accounttiertype_ref h, "
				+ " mfpdbo.hotel_acctinfo_business_case hbc, mfpdbo.accountinfo hi, mfpdbo.bt_rebidstatus_ref rr,  mfpdbo.bt_rebidstatus_ref rr2 , mfpdbo.hotelaffiliation haf, mfpdbo.ds_user userrates, mfpdbo.ds_user useramen "
				+ " WHERE g.hotelid = d.hotelid AND (d.hotelrfpid = a.hotelrfpid) AND (c.accounttype = f.accounttype) AND (a.accountrecid = c.accountrecid) AND "
				+ "  rr.rebidstatus_id(+) = a.rebidstatus_id AND rr2.rebidstatus_id(+) = a.rebidstatus_id2 and  g.affiliationid=haf.affiliationid(+) and "
				+ " c.accounttype =  h.accounttype AND a.hotel_accountinfoid = hbc.hotel_accountinfoid(+) AND a.accountrecid = hi.accountrecid(+)   and a.last_updaterateseid=userrates.eid(+) "
				+ " and a.last_updateamenitieseid=useramen.eid(+) AND (a.hotel_accountinfoid =?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificData.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificData accountspec = (HotelAccountSpecificData) q.getSingleResult();
		return accountspec;
	}

	public HotelAccountSpecificData findAccountSpecificDetailfortab(long hotel_accountinfoid) {

		String queryString = "SELECT a.hotel_accountinfoid,g.hotelid,g.marshacode,g.affiliationid,c.accountrecid,c.accountid,c.accounttype,c.top_account,c.bt_booking_cost,mfpproc.fn_is_rollover(c.accountrecid) rollover,c.accountname,d.hotelrfpid,d.grpsmtgrespond," + 
				"mfpproc.fn_getrpgm_rateoffer_rpe(g.hotelid,  a.accountrecid,  1,  1,1)  rateoffername," + 
				"mfpproc.fn_getrpgm_rateoffer_rpe(g.hotelid,  a.accountrecid,  1,  4,1)  initialload," + 
				"DECODE(c.allow_modifications, 'Y',CASE WHEN trunc(c.startmoddate) <= trunc(SYSDATE) AND trunc(c.endmoddate) >= trunc(SYSDATE)AND mfpproc.fn_ishotelaccountlocked(a.hotel_accountinfoid) = 'Y' THEN 'Y' ELSE	'N' END, 'N') allow_modify," + 
				"CASE WHEN c.allow_qmods = 'Y' AND mfpproc.fn_ishotelaccountlocked(a.hotel_accountinfoid) = 'Y' AND trunc(c.startqmoddate) <= trunc(SYSDATE)	AND trunc(c.endqmoddate) >= trunc(SYSDATE) THEN  'Y' ELSE 'N' END allow_qmodify," + 
				"c.groupmeetings,mfpproc.fn_ishotelacctpgoos_pending(a.hotel_accountinfoid) isprogress,mfpproc.fn_issolicited_hotel(a.accountrecid, g.hotelid) issolicited,mfpproc.fn_get_ismaxaerdiscount(DECODE(c.aer_account, 'Y', mfpproc.fn_is_ritz_gpp(a.hotel_accountinfoid), 'N'), c.accountrecid) ismaxaer," + 
				"CASE WHEN ( rebid_flag = 'Y' OR rebid_flag2 = 'Y' OR rebid_flag3 = 'Y' ) THEN 'Y' ELSE 'N' END showrebid, c.accountpricingtype," + 
				"mfpproc.fn_maxacct_roompool_rpe(a.hotel_accountinfoid) maxroompools,mfpproc.fn_getcontractstart(c.accountrecid) contractstart,mfpproc.fn_getcontractend(c.accountrecid) contractend," + 
				"CASE WHEN EXISTS (SELECT 1 FROM mfpdbo.account_specific_questions asq WHERE asq.accountrecid = a.accountrecid) THEN 'Y' ELSE 'N' END hasaccountspecquests," + 
				"CASE WHEN EXISTS (SELECT 1 FROM	mfpdbo.group_mtgs_specific_questions asq WHERE asq.accountrecid = a.accountrecid) THEN 'Y' ELSE 'N'	 END hasgroupspecquests," + 
				"tabrebid_status,tabstatus_status,tabrates_status,tabelig_status,tabcompel_status,tabgroup_status,tabblackout_status,tabfacility_status,tabquest_status,tabgengroup_status,tabspecificquest_status,haf.breakfast_incl_corp_rates breakinrates,a.ratetype_selected," + 
				"CASE WHEN c.accountpricingtype = 'C' AND ai.max_blackout > 0 AND nvl(a.waiveblackouts, 'N') = 'N' THEN mfpproc.px.fn_get_numblackoutdates(a.hotel_accountinfoid) ELSE 0	END numblackouts,ai.max_blackout maxblackouts," + 
				"CASE WHEN c.accountpricingtype = 'C' AND ai.max_blackout_period > 0	 AND nvl(a.waiveblackouts, 'N') = 'N' THEN mfpproc.fn_get_numblackoutperiods(a.hotel_accountinfoid)	ELSE 0 END numblackoutperiods, nvl(ai.max_blackout_period, 0) maxblackoutperiod, a.rm_nights,nvl(a.business_case, 'N') business_case," + 
				"CASE WHEN rebid_flag3 = 'Y' THEN rebidstatus_id3 WHEN rebid_flag2 = 'Y' THEN rebidstatus_id2 WHEN rebid_flag = 'Y'  THEN a.rebidstatus_id ELSE	NULL END rebidstatus,DECODE(c.aer_account, 'Y', mfpproc.fn_is_ritz_gpp(a.hotel_accountinfoid), 'N') aer_account," + 
				"mfpproc.fn_ishotelaccountlocked(a.hotel_accountinfoid) islocked,mfpproc.fn_ishotelaccountselected(a.hotel_accountinfoid) isselected,mfpproc.fn_get_hotelaccountstatus(a.hotel_accountinfoid) isaccepted," + 
				"CASE WHEN (SELECT COUNT(*) FROM mfpdbo.sales_respondent sr, mfpdbo.salesresp_prim_htlacct   srph,mfpdbo.ds_user du WHERE sr.salesrespondentid = srph.salesrespondentid AND sr.eid = du.eid	AND du.ismae = 'Y' AND srph.accountid = c.accountid	AND srph.marshacode = g.marshacode AND sr.personname IS NOT NULL AND sr.countrycode IS NOT NULL " + 
				"AND sr.areacitycode IS NOT NULL AND sr.phonenumber IS NOT NULL AND sr.email IS NOT NULL	AND sr.salesrespondentid IS NOT NULL) = 0 THEN CASE WHEN (SELECT COUNT(*) FROM	mfpdbo.hotel_accountinfo WHERE hotel_accountinfoid = a.hotel_accountinfoid AND sales_contact_name IS NOT NULL AND " + 
				"sales_contact_email IS NOT NULL AND sales_contact_countrycode IS NOT NULL AND sales_contact_areacitycode IS NOT NULL AND sales_contact_phonenumber IS NOT NULL) = 0 THEN 'N' " + 
				"ELSE 'Y' END ELSE 'Y' END hassalescontact,CASE WHEN facility_name IS NULL OR facility_street is null OR facility_city IS NULL OR facility_zip IS NULL OR facility_country IS NULL OR a.distance IS NULL	OR directionstofacility IS NULL THEN 'N'  ELSE 'Y' END hasfacility " + 
				"FROM mfpdbo.hotel_accountinfo a,mfpdbo.account c,mfpdbo.hotelrfp d,mfpdbo.hotel g,mfpdbo.hotelaffiliation haf,mfpdbo.accountinfo ai " + 
				"WHERE g.hotelid = d.hotelid	 AND d.hotelrfpid = a.hotelrfpid AND a.accountrecid = c.accountrecid AND g.affiliationid = haf.affiliationid (+) AND c.accountrecid = ai.accountrecid (+) AND a.hotel_accountinfoid = ?1";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificData.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificData accountspec = (HotelAccountSpecificData) q.getSingleResult();
		
		if(accountspec!=null) {
			String hotelAccountSpecificRPDataQuery="SELECT roomclassseq sequence,roompoolseq subsequence, " + 
					"mfpproc.fn_getrpgm_rateoffer_rpe(b.hotelid, a.accountrecid, roomclassseq, 2,roompoolseq) rateprog, " + 
					"mfpproc.fn_getrpgm_rateoffer_rpe(b.hotelid, a.accountrecid, roomclassseq, 3,roompoolseq) rateentity " + 
					"FROM (SELECT level roomclassseq FROM dual CONNECT BY level <= (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_ROOMPOOLS')), " + 
					" (SELECT level roompoolseq FROM dual CONNECT BY level <= (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_RMPOOLS')), " + 
					"mfpdbo.hotel_accountinfo a, mfpdbo.hotelrfp b WHERE a.hotelrfpid = b.hotelrfpid AND ((mfpproc.fn_getrpgm_rateoffer_rpe(b.hotelid, a.accountrecid, roomclassseq, 6, roompoolseq) = 'N') OR " + 
					"  (mfpproc.fn_getrpgm_rateoffer_rpe(b.hotelid, a.accountrecid, roomclassseq, 6, roompoolseq) = 'Y' AND roomclassseq < (case when b.EXEMPT_GPP = 'Y' then 2 else 3 end) )) AND a.hotel_accountinfoid = ?1 order by sequence, subsequence";
			Query qRPData=em.createNativeQuery(hotelAccountSpecificRPDataQuery, HotelAccountSpecificRPData.class);
			qRPData.setParameter(1, hotel_accountinfoid);
			@SuppressWarnings("unchecked")
			List<HotelAccountSpecificRPData> hotelAccountSpecificRPDataList=qRPData.getResultList();
			accountspec.setRateProgDetails(hotelAccountSpecificRPDataList);
		}
		return accountspec;
	}

	public HotelAccountSpecificData findAccountSpecificDetailforRates(long hotel_accountinfoid) {             

		String queryString = "SELECT a.hotel_accountinfoid, a.extendcancelpolicy, nvl(a.altcxlpolicytimeid,0) altcxlpolicytimeid, nvl(a.waiveearlycharge,'N') waiveearlycharge, nvl(d.early_charge,'N') earlychargeresponse, mfpproc.fn_htlstdcxltimeid (g.hotelid) htlstdcxltime, g.hotelid, c.accountrecid,  ratetype_selected, "
			+ " mfpproc.fn_getcompareratetype_bt (a.hotel_accountinfoid) compareratetype, mfpproc.fn_ishotelaccountlocked (a.hotel_accountinfoid) islocked, "
			+ " mfpproc.fn_ishotelaccountselected (a.hotel_accountinfoid) isselected, mfpproc.FN_GET_HOTELACCOUNTSTATUS(a.hotel_accountinfoid) isaccepted, MFPPROC.fn_getnumseasons(a.hotelrfpid, null) numGeneralSeason, "
			+ " c.accounttype,c.altcancelpolicytimeid,c.altcancelpolicyid,c.altcancelpolicynotes,c.altcancelpolicyoptionid, c.accountpricingcycleid, c.period, f.ratetypeid, d.hotelrfpid, "
			+ " DECODE ( c.aer_account, 'Y', mfpproc.fn_is_ritz_gpp( a.hotel_accountinfoid ), 'N') aer_account, "
			+ " nvl( c.gov_account,'N') gov_account, a.percentdiscount, c.allow_floatnociel, c.allowHotelcanPriceFloatVP, case when ratetype_selected=18 then nvl(c.discfirsttieronly,'N') else 'N' end discfirsttieronly, "
			+ " mfpproc.fn_get_aerminpercent_bt (f.ratetypeid, g.affiliationid, c.accountrecid) minpercent, "
			+ " mfpproc.fn_ishotelacctpgoos_pending (a.hotel_accountinfoid) isprogress,mfpproc.fn_get_cxlpolicytime(c.altcancelpolicytimeid) altcancelpolicytime, mfpproc.fn_issolicited_hotel (a.accountrecid, g.hotelid) issolicited, "
			+ " mfpproc.fn_get_ismaxaerdiscount (DECODE ( c.aer_account, 'Y', mfpproc.fn_is_ritz_gpp( a.hotel_accountinfoid ), 'N'), c.accountrecid) ismaxaer, "
			+ " DECODE ( c.allow_modifications, 'Y', CASE WHEN TRUNC (c.startmoddate) <= TRUNC (SYSDATE) AND TRUNC (c.endmoddate) >= TRUNC (SYSDATE) "
			+ " AND mfpproc.fn_ishotelaccountlocked ( a.hotel_accountinfoid) = 'Y' THEN 'Y' ELSE 'N' END, 'N') "
			+ " allow_modify, mfpproc.fn_exclude_aer (g.affiliationid) excludeaer, c.accountpricingtype, a.last_updatedrates,"
			+ " case when userrates.eid is null  or userrates.cn_refresh=-1 then a.last_updaterateseid else userrates.cn_firstname || ' ' || userrates.cn_lastname end lastupaterateeid,   "
			+ "  case when userrates.eid is null  or userrates.cn_refresh=-1 then null else userrates.cn_mail end lastupaterateeemail, "
			+ "  nvl( c.offcycle,'N') offcycle, g.affiliationid, mfpproc.fn_maxacct_roompool_rpe(a.hotel_accountinfoid) maxroompools, mfpproc.fn_availacct_roompool(a.hotel_accountinfoid) availroompools, "
			+ " mfpproc.fn_getcontractstart (c.accountrecid) contractstart, mfpproc.fn_getcontractend (c.accountrecid) contractend, a.hotel_accountinfoid,  rm_nights "
			+ " , mfpproc.fn_get_maxnumseasons(c.accountrecid) maxseasons,  mfpproc.fn_hasnlrapricing(a.hotel_accountinfoid) hasnlrapricing, g.country, mfpproc.fn_isbrandextendedstay (g.affiliationid) isbrandextendedstay, g.affiliationid, g.marshacode "
			+ " , substr(h.roomtypetext, 0, "
            + "        ( CASE WHEN  LENGTH(h.roomtypetext ) < 150 THEN  LENGTH(h.roomtypetext ) ELSE  instr(substr(h.roomtypetext,150,200), chr(20),1) + 150 END ) ) roomtypetextone  "
			+ " , substr(h.roomtypetext, instr(substr(h.roomtypetext,150,200),chr(20),1) + 151, LENGTH(h.roomtypetext )) roomtypetexttwo, nvl(a.rollover,'N') rollover "
			+ " FROM mfpdbo.hotel_accountinfo a, mfpdbo.account c, mfpdbo.ratetype_ref f, mfpdbo.hotelrfp d, mfpdbo.hotel g,   mfpdbo.ds_user userrates,  mfpdbo.accountinfo h  "
			+ " WHERE g.hotelid = d.hotelid AND (d.hotelrfpid = a.hotelrfpid) AND (c.accounttype = f.accounttype) AND (a.accountrecid = c.accountrecid) AND "
			+ "    (c.accountrecid = h.accountrecid(+) ) and  "
			+ "    a.last_updaterateseid=userrates.eid(+)   AND (a.hotel_accountinfoid =?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificData.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificData accountspec = (HotelAccountSpecificData) q.getSingleResult();
		return accountspec;
	}

	
	public List<HotelAccountSpecificRoomPoolDataDO> findAllRoomPoolDetail(long hotel_accountinfoid) {
		String queryString = "SELECT " + 
				"      accountrpflagid," + 
				"      d.roomclassseq," + 
				"      d.roompoolseq," + 
				"      lra," + 
				"      accepted," + 
				"      d.removalreasonid," + 
				"      d.pgoos," + 
				"      a.rejectreasonid," + 
				"      mfpproc.fn_ishotelaccountselected(a.hotel_accountinfoid) isselected," + 
				"      CASE" + 
				"          WHEN d.pgoos = 'N' THEN" + 
				"              nvl(c.removalreason, 'No Reason Provided.')" + 
				"      END removalreason," + 
				"      CASE" + 
				"          WHEN a.accepted = 'N' THEN" + 
				"              nvl(b.rejectionreason, 'No Reason Provided.')" + 
				"      END rejectionreason" + 
				"  FROM" + 
				"      mfpdbo.accountrpflags            a," + 
				"      mfpdbo.accountreject_ref   b," + 
				"      mfpdbo.pgoos_removal_ref         c," + 
				"      mfpdbo.accountrpflags_roompools   d" + 
				"  WHERE" + 
				"      a.hotel_accountinfoid = ?1" + 
				"      AND a.hotel_accountinfoid = d.hotel_accountinfoid" + 
				"      AND a.roompool = d.roomclassseq" + 
				"      AND a.roompool <= mfpproc.fn_maxacct_roompool_rpe(a.hotel_accountinfoid)" + 
				"      AND d.removalreasonid = c.removalreasonid (+)" + 
				"      AND a.rejectreasonid = b.rejectreasonid (+)" + 
				"  ORDER BY" + 
				"      d.roomclassseq," + 
				"      d.roompoolseq ASC";
		
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificRoomPoolDataDO.class);
		q.setParameter(1, hotel_accountinfoid);
		@SuppressWarnings("unchecked")
		List<HotelAccountSpecificRoomPoolDataDO> roompool = q.getResultList();
		return roompool;
	}

		

	public HotelAccountSpecificAmenityData findAccountSpecificAmenity(long hotel_accountinfoid) {

		String queryString = "SELECT   a.last_updatedamenities, mfpproc.px.fn_get_accountrule(a.hotel_accountinfoid,'3') breakfast_rule, "
				+ " case when useramen.eid is null  or useramen.cn_refresh=-1 then a.last_updateamenitieseid else useramen.cn_firstname || ' ' || useramen.cn_lastname end lastupateameneid, "
				+ "  case when useramen.eid is null  or useramen.cn_refresh=-1 then null else useramen.cn_mail end lastupateameneemail, mfpproc.fn_ishotelaccountselected (a.hotel_accountinfoid) isselected "
				+ " FROM mfpdbo.hotel_accountinfo a,  mfpdbo.ds_user useramen " + " WHERE  a.last_updateamenitieseid=useramen.eid(+) AND (a.hotel_accountinfoid =?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificAmenityData.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificAmenityData accountspec = (HotelAccountSpecificAmenityData) q.getSingleResult();
		return accountspec;
	}

	public HotelAccountSpecificBusinessCase findAccountSpecBusinessCase(long hotel_accountinfoid) {

		String queryString = "SELECT mfpproc.fn_issolicited_hotel( a.accountrecid, g.hotelid ) issolicited, NVL( a.business_case, 'N' ) business_case, "
				+ " hi.cbc_softduedate,  CASE WHEN hi.cbc_softduedate < TRUNC( SYSDATE ) THEN 'Y' ELSE 'N' END ispastcbc, mfpproc.fn_cbcstatus( a.accountrecid, g.hotelid ) cbcstatus,"		
				+ " nvl(hbc.trvler_endorse,'N') trvler_endorse , hbc.trvler_info, hbc.market_notes, hbc.competitor_info, hbc.bus_reason, hi.notestext_existinghotel,hi.notestext_preopeninghotel, rm_nights ,hbc.pid, "
				+ " ( SELECT count(*) FROM MFPDBO.account_cbc_hotels cbc, MFPDBO.hotelrfp rfp, MFPDBO.hotel_accountinfo hcc "
				+ " WHERE hcc.hotel_accountinfoid=?1 AND rfp.hotelrfpid=hcc.hotelrfpid AND rfp.hotelid=cbc.hotelid AND cbc.status IN ('C', 'D', 'A') AND cbc.typeofcbc = 'Volunteered' AND cbc.accountrecid IN "
				+ " ( SELECT DISTINCT accountrecid FROM MFPDBO.hotel_accountinfo WHERE hotelrfpid IN ( SELECT hotelrfpid FROM MFPDBO.hotel_accountinfo WHERE hotel_accountinfoid=?1 )) ) cbc_count, "
				+ " ( SELECT COUNT(*) FROM MFPDBO.account_cbc_hotels cbc, MFPDBO.hotelrfp rfp, MFPDBO.hotel_accountinfo hcc "
				+ " WHERE hcc.hotel_accountinfoid=?1 AND rfp.hotelrfpid=hcc.hotelrfpid AND rfp.hotelid=cbc.hotelid "
				+ " AND cbc.status='R' AND hcc.accountrecid=cbc.accountrecid ) cbc_request, "
				+ " (select to_number(constant_value) from mfpdbo.rfp_constants where constant_name='MAX_CBC') max_cbc "
				+ " FROM mfpdbo.hotel_accountinfo a, mfpdbo.hotel_acctinfo_business_case hbc, mfpdbo.accountinfo hi, mfpdbo.hotelrfp d, mfpdbo.hotel g "
				+ " WHERE g.hotelid = d.hotelid AND ( d.hotelrfpid = a.hotelrfpid ) and a.hotel_accountinfoid = hbc.hotel_accountinfoid(+) AND a.accountrecid = hi.accountrecid(+) AND (a.hotel_accountinfoid =?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificBusinessCase.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificBusinessCase accountspec = (HotelAccountSpecificBusinessCase) q.getSingleResult();
		return accountspec;
	}	
	
	public List<TypeofPropertyDropDown> findPropertytypesDropDowns() {
		String queryString = "select pid,typeOfProperty from mfpdbo.CBCpropertytype_ref order by pid";
		Query q = em.createNativeQuery(queryString, TypeofPropertyDropDown.class);

		@SuppressWarnings("unchecked")
		List<TypeofPropertyDropDown> typeofPropertyDropDowns = q.getResultList();

		return typeofPropertyDropDowns;
	}


	public HotelAccountSpecificFacility findAccountSpecificFacility(long hotel_accountinfoid) {

		String queryString = "SELECT  facility_name, facility_street, facility_city, directionstofacility, ratenotes, distance, shuttle_cost_one_way, "
				+ " facility_state_prov, facility_zip, facility_country, nvl(rn_target,'N') rn_target , rn_targetnum, rm_nights, "
				+ " mfpproc.fn_ishotelaccountlocked( a.hotel_accountinfoid ) islocked, last_updateratenotes "
				+ " FROM mfpdbo.hotel_accountinfo a WHERE  (a.hotel_accountinfoid =?1)";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificFacility.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificFacility accountspec = (HotelAccountSpecificFacility) q.getSingleResult();
		return accountspec;
	}

	public Contact findGlobalSalesLeader(long accountrecid) {
		String queryString = "select a.contactname ,a.contactemail from mfpdbo.accountinfo_contacts a,mfpdbo.accountinfo b,mfpdbo.ds_user c "
				+ " where a.accountinfoid= b.accountinfoid and a.contacttypeid=1 and b.accountrecid = ?1 " + " and a.eid=c.eid and c.cn_refresh !=-1"
				+ " and c.cn_userid in (select a.cn_userid from mfpdbo.ds_accountusers a,mfpdbo.ds_user b " + " where a.cn_userid=b.cn_userid)";

		Query q = em.createNativeQuery(queryString, Contact.class);
		q.setParameter(1, accountrecid);
		Contact globalcontact;
		try {
			globalcontact = (Contact) q.getSingleResult();
		} catch (NoResultException e) {
			globalcontact = new Contact();
		}
		return globalcontact;
	}

	/*
	 * Changes for Ticket number:RMSDB00011509 starts here
	 * Added the new function findRitzcarltonSalesLeader
	 */
	public Contact findRitzcarltonSalesLeader(long accountrecid) {
		String queryString = " select a.contactname ,a.contactemail from mfpdbo.accountinfo_contacts a,mfpdbo.accountinfo b,mfpdbo.accountinfo_contacttype c " 
			+ " where a.accountinfoid= b.accountinfoid and a.contacttypeid = c.contacttypeid and b.accountrecid = ?1  and a.contacttypeid=13";
	Query q = em.createNativeQuery(queryString, Contact.class);
	q.setParameter(1, accountrecid);
	Contact ritzcarltoncontact;
	try {
		ritzcarltoncontact = (Contact) q.getSingleResult();
	} catch (NoResultException e) {
		ritzcarltoncontact = new Contact();
	}
	return ritzcarltoncontact;
	}
	
	/*
	 * Changes for Ticket number:RMSDB00011509 ends here
	 */
	public Contact findSalesContact(long hotel_accountinfoid, long accountid, String marshacode) {
		/*
		 * if there is an mae assigned to the hotel/account put in the mae;
		 * otherwise, use the contact info entered by the hotel
		 */
		Contact salescontact;

		String queryString = " SELECT sr.personname contactname, sr.countrycode contactcountrycode, sr.areacitycode contactareacitycode, sr.phonenumber contactphonenumber, sr.email contactemail,  sr.salesrespondentid contactid"
				+ " FROM mfpdbo.sales_respondent sr, mfpdbo.salesresp_prim_htlacct srph, mfpdbo.ds_user du "
				+ " WHERE sr.salesrespondentid = srph.salesrespondentid AND sr.eid = du.eid AND du.ismae = 'Y' AND srph.accountid = ?1 AND srph.marshacode = ?2";

		Query q = em.createNativeQuery(queryString, Contact.class);
		q.setParameter(1, accountid);
		q.setParameter(2, marshacode);
		try {
			salescontact = (Contact) q.getSingleResult();
		} catch (NoResultException e) {
			queryString = "select sales_contact_name contactname, sales_contact_email contactemail, sales_contact_countrycode contactcountrycode, sales_contact_areacitycode contactareacitycode, sales_contact_phonenumber contactphonenumber, null contactid from mfpdbo.hotel_accountinfo where hotel_accountinfoid=?1 ";

			q = em.createNativeQuery(queryString, Contact.class);
			q.setParameter(1, hotel_accountinfoid);
			try {
				salescontact = (Contact) q.getSingleResult();
			} catch (NoResultException eh) {
				salescontact = new Contact();
			}
		}
		return salescontact;
	}

	public Contact findSalesContact(long hotel_accountinfoid) {
		/*
		 * if there is an mae assigned to the hotel/account put in the mae;
		 * otherwise, use the contact info entered by the hotel
		 */
		Contact salescontact;

		String queryString = " SELECT sr.personname contactname, sr.countrycode contactcountrycode, sr.areacitycode contactareacitycode, sr.phonenumber contactphonenumber, sr.email contactemail,  sr.salesrespondentid contactid"
				+ " FROM mfpdbo.sales_respondent sr, mfpdbo.salesresp_prim_htlacct srph, mfpdbo.ds_user du "
				+ " WHERE sr.salesrespondentid = srph.salesrespondentid AND sr.eid = du.eid AND du.ismae = 'Y' "
				+ "and (srph.accountid, srph.marshacode) in (select accountid, marshacode from mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.account a "
				+ " where h.hotelid=hr.hotelid and hr.hotelrfpid=ha.hotelrfpid and ha.accountrecid=a.accountrecid and ha.hotel_accountinfoid=?1)";

		Query q = em.createNativeQuery(queryString, Contact.class);
		q.setParameter(1, hotel_accountinfoid);
		try {
			salescontact = (Contact) q.getSingleResult();
		} catch (NoResultException e) {
			queryString = "select sales_contact_name contactname, sales_contact_email contactemail, sales_contact_countrycode contactcountrycode, sales_contact_areacitycode contactareacitycode, sales_contact_phonenumber contactphonenumber, null contactid from mfpdbo.hotel_accountinfo where hotel_accountinfoid=?1 ";

			q = em.createNativeQuery(queryString, Contact.class);
			q.setParameter(1, hotel_accountinfoid);
			try {
				salescontact = (Contact) q.getSingleResult();
			} catch (NoResultException eh) {
				salescontact = new Contact();
			}
		}
		return salescontact;
	}

	public Long findMaxBlackouts(long hotel_accountinfoid) {
		String queryString = "select nvl(max_blackout,0) max_blackout from mfpdbo.accountinfo where accountrecid=" + "(select accountrecid from mfpdbo.hotel_accountinfo where hotel_accountinfoid=?1)";

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotel_accountinfoid);
		Long maxBlackout;
		try {
			maxBlackout = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			maxBlackout = new Long(0);
		}
		return maxBlackout;
	}

	public HotelAccountSpecificAccountFlags findAccountSpecStatus(long hotel_accountinfoid) {
		
		String queryString = "SELECT nvl(b.amenities_exempt,'N') amenities_exempt, b.marketcode,b.selected,   "
			+ " case when (rebid_flag3='Y') then rebidstatus_id3 when (rebid_flag2='Y') then rebidstatus_id2  when (rebid_flag='Y') then a.rebidstatus_id else null end currrebidstatus  "
			+ " FROM mfpdbo.hotel_accountinfo a, mfpdbo.accountdirectory b, mfpdbo.hotelrfp c "
			+ " WHERE (c.hotelid = b.hotelid) AND (a.hotelrfpid = c.hotelrfpid) AND (a.accountrecid = b.accountrecid) "
			+ " AND (a.hotel_accountinfoid = ?1)";

		Query q = em.createNativeQuery(queryString, HotelAccountSpecificAccountFlags.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificAccountFlags accountspecstatus;
		try {
			accountspecstatus = (HotelAccountSpecificAccountFlags) q.getSingleResult();
		} catch (NoResultException e) {
			accountspecstatus = new HotelAccountSpecificAccountFlags();
		}
		return accountspecstatus;
	}

	public HotelAccountSpecificRebid findAccountSpecificRebid(long hotel_accountinfoid) {

		String queryString = "SELECT a.hotel_accountinfoid,g.hotelid,c.accountrecid,d.hotelrfpid, "
				+ " DECODE( rebid_flag, 'Y', DECODE( a.rebidstatus_id, NULL, 1, a.rebidstatus_id ) ) rebidstatus,rr.rebidstatus_desc, "
				+ " DECODE( rebid_flag, 'Y', rebid_due, NULL ) rebid_due,rebid_notes,DECODE( rebid_flag2, 'Y', DECODE( rebidstatus_id2, NULL, 1, rebidstatus_id2 ) ) rebidstatus2, "
				+ " rr2.rebidstatus_desc rebidstatus_desc2,DECODE( rebid_flag2, 'Y', rebid_due2, NULL ) rebid_due2,rebid_notes2, "
				+ " DECODE( rebid_flag3, 'Y', DECODE( rebidstatus_id3, NULL, 1, rebidstatus_id3 ) ) rebidstatus3,DECODE( rebid_flag3, 'Y', rebid_due3, NULL ) rebid_due3,rebid_notes3 "
				+ " , a.LAST_UPDATEDREBID1, a.LAST_UPDATEDREBID2, a.LAST_UPDATEDREBID3, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID1EID,1) LASTUPDATEREBID1EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID1EID,2) lastupdaterebid1email, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID2EID,1) LASTUPDATEREBID2EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID2EID,2) lastupdaterebid2email, "
				+ " mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID3EID,1) LASTUPDATEREBID3EID, mfpproc.FN_GET_USER_DETAILS(a.LASTUPDATEREBID3EID,2) lastupdaterebid3email "				
				+ " FROM mfpdbo.hotel_accountinfo a,mfpdbo.account c,mfpdbo.hotelrfp d,mfpdbo.hotel g,mfpdbo.bt_rebidstatus_ref rr,mfpdbo.bt_rebidstatus_ref rr2 "
				+ " WHERE     g.hotelid = d.hotelid AND ( d.hotelrfpid = a.hotelrfpid ) AND ( a.accountrecid = c.accountrecid ) AND rr.rebidstatus_id(+) = a.rebidstatus_id "
				+ " AND rr2.rebidstatus_id(+) = a.rebidstatus_id2 AND ( a.hotel_accountinfoid =?1 )";
		Query q = em.createNativeQuery(queryString, HotelAccountSpecificRebid.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountSpecificRebid accountspec = (HotelAccountSpecificRebid) q.getSingleResult();
		return accountspec;
	}

	public List<RebidStatus> getBTRebidStatus() {

		String queryString = "SELECT a.rebidstatus_id, a.rebidstatus_desc FROM mfpdbo.bt_rebidstatus_ref a  order by rebidstatus_id";

		Query q = em.createNativeQuery(queryString, RebidStatus.class);
		@SuppressWarnings("unchecked")
		List<RebidStatus> questList = q.getResultList();
		return questList;
	}

	public List<MultiHotelAccountSpecific> findAllAccountSpecificForHotelDetails(long rfpid, long startNum) {

		long endNum = startNum + 5 - 1;
		String queryString = "select hotel_accountinfoid from (select hotel_accountinfoid, accountrecid, rownum arow "
				+ " from (SELECT  d.hotel_accountinfoid, d.accountrecid  FROM  MFPDBO.ACCOUNTDIRECTORY A  , MFPDBO.HOTELRFP E "
				+ " , MFPDBO.HOTEL_ACCOUNTINFO D , MFPDBO.ACCOUNT B WHERE  (E.HOTELID = A.HOTELID) "
				+ " AND (D.ACCOUNTRECID = A.ACCOUNTRECID)  AND (B.ACCOUNTRECID = D.ACCOUNTRECID)  AND ((A.VOLUNTEERED ='Y') "
				+ " or (A.SELECTED ='Y'))  AND (E.HOTELRFPID =?1) AND (D.HOTELRFPID =?2)  AND (D.RATETYPE_SELECTED <> '0')"
				+ " AND (D.RATETYPE_SELECTED <> '17') AND (((D.RATETYPE_SELECTED = '1') OR (D.RATETYPE_SELECTED = '18') "
				+ " AND A.SELECTED = 'Y') OR (D.RATETYPE_SELECTED <> '1') AND (D.RATETYPE_SELECTED <> '18'))"
				+ "  ORDER BY   B.ACCOUNTNAME ASC )) where arow>=?3 and arow <=?4";

		Query q = em.createNativeQuery(queryString, MultiHotelAccountSpecific.class);
		q.setParameter(1, rfpid);
		q.setParameter(2, rfpid);
		q.setParameter(3, startNum);
		q.setParameter(4, endNum);
		@SuppressWarnings("unchecked")
		List<MultiHotelAccountSpecific> questList = q.getResultList();
		return questList;
	}

	public long findNumAllAccountSpecificForHotelDetails(long rfpid) {

		String queryString = "SELECT  count(*)  FROM  MFPDBO.ACCOUNTDIRECTORY A , MFPDBO.HOTELRFP E " + " , MFPDBO.HOTEL_ACCOUNTINFO D  , MFPDBO.ACCOUNT B WHERE  (E.HOTELID = A.HOTELID) "
				+ " AND (D.ACCOUNTRECID = A.ACCOUNTRECID)  AND (B.ACCOUNTRECID = D.ACCOUNTRECID) "
				+ " AND ((A.VOLUNTEERED ='Y') or (A.SELECTED ='Y'))  AND (E.HOTELRFPID =?1)  AND (D.HOTELRFPID =?2) AND (D.RATETYPE_SELECTED <> '0')"
				+ " AND (D.RATETYPE_SELECTED <> '17') AND (((D.RATETYPE_SELECTED = '1') OR (D.RATETYPE_SELECTED = '18') "
				+ " AND A.SELECTED = 'Y') OR (D.RATETYPE_SELECTED <> '1') AND (D.RATETYPE_SELECTED <> '18')) ";

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, rfpid);
		q.setParameter(2, rfpid);
		Long numAccounts = (Long) q.getSingleResult();
		return numAccounts;
	}

	public void updateAccountFlags(long haccid, String isAccepted, HotelAccountSpecificAccountFlags hasaFlags, User user) {
		if (hasaFlags == null)
			return;
		String sAccepted = "N";

		if (user.getIsPASorAnySales()) {
			sAccepted = isAccepted;
			if (sAccepted == null || sAccepted.equals(""))
				sAccepted = "D";
		} else
			sAccepted = "E";

		String sAmenitiesExempt = "N";
		if (user.getIsPASAdmin()) {
			if (hasaFlags.getAmenities_exempt().equals("Y"))
				sAmenitiesExempt = "Y";
		} else
			sAmenitiesExempt = "E";

		String sPgoos = "N";
		if (user.getIsPASAdmin()) {
			if (hasaFlags.getPgoos().equals("Y"))
				sPgoos = "Y";
		} else
			sPgoos = "E";

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountflags_hpp(?,?,?,?,?,?,?); end;  ");
				try {
					stmt.setLong(1, haccid);
					stmt.setString(2, sAccepted);
					stmt.setString(3, sAmenitiesExempt);
					stmt.setString(4, sPgoos);
					if (hasaFlags.getRejectreasonid() != null && !hasaFlags.getRejectreasonid().equals(0)) {
						stmt.setObject(5, hasaFlags.getRejectreasonid(), Types.NUMERIC);
					} else {
						stmt.setNull(5, Types.NUMERIC);
					}
					stmt.setString(6, user.getShortRole());
					if (hasaFlags.getRemovalreasonid() != null && !hasaFlags.getRemovalreasonid().equals(0)) {
						stmt.setLong(7, hasaFlags.getRemovalreasonid());
					} else {
						stmt.setNull(7, Types.INTEGER);
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
			log.error(ex.getMessage(),ex);

		}

	}

	public void updateRebidStatus(long haccid, Long rebidRound, Long rebidstatus_id, String rebid_notes, User user) {

		if (rebidstatus_id != null) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				try {
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
					audit.setAuditUser(con);
					CallableStatement stmt = con.prepareCall("begin mfpproc.sp_update_hotelaccount_rebid(?,?,?,?,?); end; ");
					try {
						stmt.setLong(1, haccid);
						stmt.setLong(2, rebidstatus_id);
						stmt.setString(3, rebid_notes);
						stmt.setLong(4, rebidRound);
						stmt.setString(5, user.getEid());

						stmt.execute();
					} finally {
						stmt.close();
					}
					audit.deleteAuditUser(con);
				} finally {
					con.close();

				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);

			}
		}
	}

	public void updateCompellingBusinessCase(long haccid, String business_case, HotelAccountSpecificBusinessCase hasbc, User user) {
		if (business_case != null && business_case.trim() != "") {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				try {
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
					audit.setAuditUser(con);  
					CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_acct_buscase(?,?,?,?,?,?,?,?); end; ");
					try {
						stmt.setLong(1, haccid);
						stmt.setString(2, business_case);
						stmt.setString(3, hasbc.getTrvler_endorse());
						stmt.setString(4, StringUtility.replaceFormatChars(hasbc.getTrvler_info()));
						stmt.setString(5, StringUtility.replaceFormatChars(hasbc.getMarket_notes()));
						stmt.setString(6, StringUtility.replaceFormatChars(hasbc.getCompetitor_info()));
						stmt.setString(7, StringUtility.replaceFormatChars(hasbc.getBus_reason()));
						stmt.setString(8,hasbc.getPid());
						stmt.execute();
					} finally {
						stmt.close();
					}
					audit.deleteAuditUser(con);
				} finally {
					con.close();

				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);

			}
		}
	}

	public void updateAccountPercentDiscount(long haccid, Double percent, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updateaccountpercentdisc(?, ?); end; ");
				try {
					stmt.setLong(1, haccid);
					if (percent != null && !percent.equals(0)) {
						stmt.setDouble(2, percent);
					} else {
						stmt.setNull(2, Types.NUMERIC);
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
			log.error(ex.getMessage(),ex);

		}
	}

	public void updateMarketcode(long haccid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_UPDATE_MARKETCODE_HTLACT(?); end; ");
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
			log.error(ex.getMessage(),ex);

		}
	}

	public void updateProduct(long haccid, long newratetype_selected, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updateproduct_gov(?, ?); end;");
				try {
					stmt.setLong(1, haccid);
					stmt.setDouble(2, newratetype_selected);
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}
	
	/*GBTA-13 Copy Season functionality*/
	public void copySeasons(long rfpid, long haccid, long ratetype_selected, String acctype, User user){
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertaddaccountinfo_gbta(?, ?, ?, ?); end;");
				try {
					stmt.setLong(1, rfpid);
					stmt.setLong(2, haccid);
					stmt.setLong(3, ratetype_selected);
					stmt.setString(4, acctype);
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

	public void updateCopyGov(long haccid, String rateCopy, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatecopy_gov(?, ?); end;");
				try {
					stmt.setLong(1, haccid);
					stmt.setString(2, rateCopy);
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public HotelAccountSpeciifcGroupMeetings getAccountGroupMeetings(long hotel_accountinfoid, long hotelid) {

		String queryString = "SELECT negratefifty, negratehund, negtranshighrate, comprooms, discfb,  fulldayratefifty, halfdayratefifty, "
                + " fulldayratehund, halfdayratehund, costbrkten, costbrktwnfive, intfeeincldaymtg, lcdcostincldaymtg, scncostincldaymtg," 
                + " (select a.meetingdaymeetingpckg from mfpdbo.edie_report_info a where a.hotelid =?2) meetingdaymeetingpckg "
				+ " FROM mfpdbo.hotel_accountinfo  where hotel_accountinfoid =?1";
		Query q = em.createNativeQuery(queryString, HotelAccountSpeciifcGroupMeetings.class);
		q.setParameter(1, hotel_accountinfoid);
		q.setParameter(2, hotelid);
		HotelAccountSpeciifcGroupMeetings accountspecgroups;
		try {
			accountspecgroups = (HotelAccountSpeciifcGroupMeetings) q.getSingleResult();
		} catch (NoResultException e) {
			accountspecgroups = new HotelAccountSpeciifcGroupMeetings();
		}
		return accountspecgroups;
	}

	public void updateAccountGroupMeetings(long haccid, HotelAccountSpeciifcGroupMeetings detail, User user) {
		Long compRooms = null;
	//	Long negRateFifty = null;
		if ((detail.getComprooms() != null) && (!(detail.getComprooms().equals("")))) {
			compRooms = new Long(detail.getComprooms());
		}
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_update_acct_groupmeeting(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); end;");
				try {
					stmt.setLong(1, haccid);
					stmt.setObject(2, detail.getNegratefifty());
					stmt.setObject(3, detail.getNegratehund());
					stmt.setString(4, detail.getNegtranshighrate());
					stmt.setObject(5, compRooms, Types.NUMERIC);
					stmt.setString(6, detail.getDiscfb());
					stmt.setObject(7, detail.getFulldayratefifty());
					stmt.setObject(8, detail.getHalfdayratefifty());
					stmt.setObject(9, detail.getFulldayratehund());
					stmt.setObject(10, detail.getHalfdayratehund());
					stmt.setObject(11, detail.getCostbrkten());
					stmt.setObject(12, detail.getCostbrktwnfive());
					stmt.setString(13, detail.getIntfeeincldaymtg());
					stmt.setString(14, detail.getLcdcostincldaymtg());
					stmt.setString(15, detail.getScncostincldaymtg());
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, User user) {

		String queryString = "SELECT pt.transactionid, sl.status,  sl.statusdesc,  pt.transactionstatusid "
				+ " FROM mfpdbo.pgoos_transaction pt, mfpdbo.pgoos_statuslookup sl  WHERE pt.status = sl.status " + "    AND pt.transactionid IN (SELECT MAX (pt.transactionid) transactionid "
				+ " FROM mfpdbo.pgoos_transaction pt, mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr  WHERE ha.hotelrfpid=hr.hotelrfpid "
				+ " and ha.accountrecid=pt.accountrecid and hr.hotelid=pt.hotelid  and ha.hotel_accountinfoid=?1)";

		Query q = em.createNativeQuery(queryString, HotelAccountSpecificStatus.class);
		q.setParameter(1, hotelAccountInfoId);
		HotelAccountSpecificStatus status = null;
		try {
			status = (HotelAccountSpecificStatus) q.getSingleResult();
		} catch (NoResultException ex) {
			status = null;
		}

		if (status != null && status.getStatus() != null && status.getStatus().equals("FAIL")) {
			queryString = "select distinct decode('MFPADMIN',?1, statusdesc, statushoteluserdesc) statusdesc from mfpdbo.pgoos_transactionstatus pts, mfpdbo.pgoos_transactionstatus_lookup ptsl "
					+ " where pts.errorcode=ptsl.statuscode and transactionstatusid=?2";
			q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, user.getRole());
			q.setParameter(2, status.getTransactionstatusid());
			@SuppressWarnings("unchecked")
			List<String> errorDesc = q.getResultList();
			status.setErrorDesc(errorDesc);
		}
		return status;
	}

	@SuppressWarnings("unchecked")
	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, String rateprog, User user) {

		String queryString = "SELECT pt.transactionid, sl.status,pt.marshacmd,to_char(pt.loaddate,'mm/dd/yy hh:mi am') loadDate, "
				+ " case when sl.status='UNPB' and (select  errordesc from mfpdbo.pgoos_transactionstatus pts where pts.transactionstatusid=pt.transactionstatusid and pts.errorcode=1116 and rownum=1) is not null "
				+ " then (select  errordesc from mfpdbo.pgoos_transactionstatus pts where pts.transactionstatusid=pt.transactionstatusid and pts.errorcode=1116 and rownum=1) else sl.statusdesc end statusdesc, "
				+ " pt.transactionstatusid  FROM mfpdbo.pgoos_transaction pt, mfpdbo.pgoos_statuslookup sl WHERE pt.status = sl.status AND pt.transactionid IN "
				+ " (SELECT MAX (pt.transactionid) transactionid  FROM mfpdbo.pgoos_transaction pt, mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr WHERE     ha.hotelrfpid = hr.hotelrfpid "
				+ "  AND ha.accountrecid = pt.accountrecid AND hr.hotelid = pt.hotelid AND pt.rpgm =?1  AND ha.hotel_accountinfoid = ?2)";

		Query q = em.createNativeQuery(queryString, HotelAccountSpecificStatus.class);
		q.setParameter(1, rateprog);
		q.setParameter(2, hotelAccountInfoId);
		HotelAccountSpecificStatus status = null;
		try {
			status = (HotelAccountSpecificStatus) q.getSingleResult();
		} catch (NoResultException ex) {
			status = null;
		}

		if (status != null && status.getStatus() != null && status.getStatus().equals("FAIL")) {
			queryString = "select distinct nvl(decode('MFPADMIN',?1, statusdesc, statushoteluserdesc), decode('MFPADMIN',?1, errordesc, null)) statusdesc"
					+ " from mfpdbo.pgoos_transactionstatus pts, mfpdbo.pgoos_transactionstatus_lookup ptsl "
					+ " where pts.errorcode=ptsl.statuscode (+) and transactionstatusid=?2";
			q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, user.getRole());
			q.setParameter(2, status.getTransactionstatusid());
			@SuppressWarnings("unchecked")
			List<String> errorDesc = q.getResultList();
			status.setErrorDesc(errorDesc);
			if(errorDesc != null){
				List<String> newVal = new ArrayList<String>();
				for(int i=0; i<errorDesc.size(); i++){
					if(errorDesc.get(i).equalsIgnoreCase("LRA Flag is missing")){
						queryString = "select distinct errordesc from mfpdbo.pgoos_transactionstatus where transactionstatusid=?1";
						q = em.createNativeQuery(queryString, String.class);
						q.setParameter(1, status.getTransactionstatusid());
						@SuppressWarnings("unchecked")
						List<String> newVal1 = q.getResultList();
						newVal.addAll(newVal1);
					} else {
						newVal.add(errorDesc.get(i));
					}
				}
				status.setErrorDesc(newVal);
			}
		}
		return status;
	}

	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, User user, long roomClassId) {
		
		HotelAccountSpecificStatus status = new HotelAccountSpecificStatus();
		List<String> errorDesc = new ArrayList<String>();
	    
		  String queryString = "SELECT count(*) FROM mfpdbo.accountrates WHERE hotel_accountinfoid =?1 and roompool = ?2 ";
	      Query q = em.createNativeQuery(queryString, Long.class);
		  q.setParameter(1, hotelAccountInfoId);
		  q.setParameter(2, roomClassId);
		  Long result = null;
		  try {
			  result = (Long) q.getSingleResult();
		  }catch (NoResultException ex) {
				status = null;
	}
		  status.setTransactionid(new Long(0));
		  status.setTransactionstatusid(new Long(0));
		  if (result > 0){
			  status.setStatus("FAIL");
			  status.setStatusdesc("Error");
			  String desc = null;

		      if (user.getRole().equals("MFPADMIN")){
				  desc = "Rate Program Not Found";
		    	}
		      else{
		    	  desc = "PAS will look into this.";
		      	} 	      
		      errorDesc.add(desc);
		      status.setErrorDesc(errorDesc); 
  	      }		
		return status;
	}
	public HotelAccountInfo getHotelAccountInfo(Long hotel_accountinfoid) {

		String queryString = "  SELECT hr.hotelid, ha.accountrecid, hr.hotelrfpid  FROM mfpdbo.hotel_accountinfo ha,"
				+ "        mfpdbo.hotelrfp hr WHERE ha.hotelrfpid = hr.hotelrfpid   AND ha.hotel_accountinfoid =?1";
		Query q = em.createNativeQuery(queryString, HotelAccountInfo.class);
		q.setParameter(1, hotel_accountinfoid);
		HotelAccountInfo ha = (HotelAccountInfo) q.getSingleResult();
		return ha;
	}


	public void updateAccountSpecTabStatus(Long hotel_accountinfoid, HotelAccountSpecificStatusUpdate hassu, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatetabstatus(?, ?,?,?,?, ?,?,?,?,?,?,?); end;");
				try {
					stmt.setLong(1, hotel_accountinfoid);
					stmt.setString(2, hassu.getTabrebid_status());
					stmt.setString(3, hassu.getTabstatus_status());
					stmt.setString(4, hassu.getTabrates_status());
					stmt.setString(5, hassu.getTabelig_status());
					stmt.setString(6, hassu.getTabcompel_status());
					stmt.setString(7, hassu.getTabgroup_status());
					stmt.setString(8, hassu.getTabblackout_status());
					stmt.setString(9, hassu.getTabfacility_status());
					stmt.setString(10, hassu.getTabquest_status());
					stmt.setString(11, hassu.getTabgengroup_status());
					stmt.setString(12, hassu.getTabspecificquest_status());
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}
	
	
	@Override
	public String getIsTopAccount(long hotel_accountinfoid) {
		String queryString = "SELECT nvl(top_account,'N') top_account FROM mfpdbo.account WHERE accountrecid =" +
				" (select accountrecid from mfpdbo.hotel_accountinfo where hotel_accountinfoid = ?1)";
		
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotel_accountinfoid);
		String topAccount=null;
		try {
			topAccount = (String) q.getSingleResult();
		} 
		catch (NoResultException e) {
			topAccount = null;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return topAccount;
	}

	@Override
	public String getIsHotelExempted(long hotelrfpid) {
		String queryString = " SELECT nvl(EXEMPT_REWARDSWIFI,'N') EXEMPT_REWARDSWIFI FROM mfpdbo.hotelrfp WHERE hotelrfpid = ?1";
		
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String hotelExemptedAccount = null;
		try {
			hotelExemptedAccount = (String) q.getSingleResult();
		}catch (NoResultException e) {
			hotelExemptedAccount = null;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		
		return hotelExemptedAccount;
	}
	
	public List<FinalPrintReportData> findFinalPrintReportPeriods(Long hotelid, Long accountid,String role) {
		String queryString = "SELECT a.hotelrfpid,a.accountrecid,p.period,a.selected FROM "
		+ " (SELECT ha.hotelrfpid,ha.accountrecid,hr.period,ad.selected FROM MFPDBO.hotel_accountinfo ha, mfpdbo.hotelrfp hr, mfpdbo.accountdirectory ad "
		+ "WHERE  hr.hotelid = ?1 AND ha.accountrecid IN (SELECT accountrecid FROM mfpdbo.ACCOUNT WHERE accountid = ?2) "
		+ "AND hr.hotelrfpid =ha.hotelrfpid AND ad.hotelid = hr.hotelid AND ad.accountrecid = ha.accountrecid) a , mfpdbo.period p "
		+ "WHERE p.period IN (SELECT period FROM mfpdbo.account WHERE accountrecid = a.accountrecid AND ACCOUNT_HOTEL_VIEW IN ('S','A')) ";
		if (role.equalsIgnoreCase("MFPUSER"))
		{
			queryString += "AND p.hotelsview = 'Y' ";
		}
		queryString += "order by p.period desc";
		Query q = em.createNativeQuery(queryString, FinalPrintReportData.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountid);
		@SuppressWarnings("unchecked")
		List <FinalPrintReportData> fprd = (List<FinalPrintReportData>) q.getResultList();
		return fprd;
	}
	
	public String getEarlyCharge() {
    	String queryString = "select constant_value from mfpdbo.rfp_constants where constant_name='EARLY_DEP_CHARGE'";
    	Query q = em.createNativeQuery(queryString, String.class);
    	String earlycharge;
    	try {
    		earlycharge = (String) q.getSingleResult(); 
    	} catch (NoResultException e) {
    		earlycharge = "";
    	}
    	return earlycharge;
    }
}
