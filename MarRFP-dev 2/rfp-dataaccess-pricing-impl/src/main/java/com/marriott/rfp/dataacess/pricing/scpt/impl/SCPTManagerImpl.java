package com.marriott.rfp.dataacess.pricing.scpt.impl;

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
import com.marriott.rfp.dataacess.pricing.scpt.api.SCPTManager;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.scpt.SCPTAddAccount;
import com.marriott.rfp.object.pricing.scpt.SCPTBreakfast;
import com.marriott.rfp.object.pricing.scpt.SCPTComm;
import com.marriott.rfp.object.pricing.scpt.SCPTCommRateAmenities;
import com.marriott.rfp.object.pricing.scpt.SCPTCommRates;
import com.marriott.rfp.object.pricing.scpt.SCPTCommRateseason;
import com.marriott.rfp.object.pricing.scpt.SCPTCommSetupInfo;
import com.marriott.rfp.object.pricing.scpt.SCPTDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTHotel;
import com.marriott.rfp.object.pricing.scpt.SCPTInternet;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpAmenities;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpBudgetAndForecastData;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpGenInfo;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpRetailRate;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpThresholds;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpWtdRetailRate;
import com.marriott.rfp.object.pricing.scpt.SCPTStatus;
import com.marriott.rfp.object.pricing.scpt.SCPTStatusReason;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTAccountGroup;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingChange;
import com.marriott.rfp.utility.StringUtility;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class SCPTManagerImpl
 */

@Service
public class SCPTManagerImpl implements SCPTManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
public List<SCPTDetail> findSCPTDetail(Long hotelid, Long period, Long orderby, String filterString, String showGPP, Page page, Long scptaccountid) {

		String querystring = " SELECT scpt_accountid, scpt_detailid, mfpproc.pkg_scpt_rpe.fn_getaccountname (accountid, accountname, alt_accountname) accountname, "
				+ " mfpproc.pkg_scpt_rpe.fn_getaccountsegment (accountid, accounttypedescription, alt_segment) accountsegment, hotelid, period, accountid, "
				+ " mfpproc.pkg_scpt_rpe.fn_ishotelaccountaccepted(hotelid,accountid, period-1) prevaccepted, "
				+ " mfpproc.pkg_scpt_rpe.fn_ishotelaccountaccepted(hotelid,accountid, period-2) twoyearprevaccepted, accountrecid, "
				+ " NVL( mfpproc.pkg_scpt_rpe.fn_getaccountstatus (  mfpproc.pkg_scpt_rpe.fn_getscpt_accountrecid(accountid, period), hotelid), "
				+ " mfpproc.pkg_scpt_rpe.fn_getscptacctstatus( scpt_accountid)) accountstatus, "
				+ " sctypeid, scpt_typename, prevgrade, twoyearprevgrade, "
				+ " threeyearprevgrade, prevyear_rn_sun, prevyear_rn_mon, prevyear_rn_tue, prevyear_rn_wed, prevyear_rn_thu, prevyear_rn_fri, prevyear_rn_sat, "
				+ " prevyear_staypatterngrade, squatter_book_pct, squatter_book_grade, elite_rewards_mbr_pct, elite_rewards_mbr_grade, agency_compliance_pct, "
				+ " agency_compliance_grade, prevyear_ytd_rn, twoyearprev_ytd_rn, threeyearprev_ytd_rn, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_change_pct (prevyear_ytd_rn, twoyearprev_ytd_rn) yoy_ytd_change_pct, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_change (prevyear_ytd_rn, twoyearprev_ytd_rn) yoy_ytd_change, prevyear_acct_rate_net, twoyearprev_acct_rate_net, threeyearprev_acct_rate_net, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_netchange_pct (prevyear_acct_rate_net, twoyearprev_acct_rate_net) yoy_ytd_netchange_pct, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_netchange (prevyear_acct_rate_net, twoyearprev_acct_rate_net) yoy_ytd_netchange, prevyear_wgt_retail_rate, "
				+ " twoyearprev_wgt_retail_rate, threeyearprev_wgt_retail_rate, prevyear_dsc_retail_pct, twoyearprev_dsc_retail_pct, threeyearprev_dsc_retail_pct, "
				+ " prevyear_acct_rev_net, twoyearprev_acct_rev_net, threeyearprev_acct_rev_net, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_revchange_pct (prevyear_acct_rev_net, twoyearprev_acct_rev_net) yoy_ytd_revchange_pct, "
				+ " mfpproc.pkg_scpt_rpe.fn_getyoy_ytd_revchange (prevyear_acct_rev_net, twoyearprev_acct_rev_net) yoy_ytd_revchange,"
				+ " fy_fcst_vol,"				
				+ " nvl(total_multiplier,0) total_multiplier, "
				+ " NVL (anticipate_inc_retail_pct, 0) anticipate_inc_retail_pct, "
				+ " prevyear_retailadr, "
				+ " mfpproc.pkg_scpt_rpe.fn_getretail_adr (prevyear_retailadr, anticipate_inc_retail_pct) retail_adr "
				+ " FROM (SELECT ROWNUM arow, scpt_accountid, scpt_detailid, hotelid, period, accountid, accountrecid, accountperiod, alt_accountname, accountname, "
				+ " accounttypedescription, alt_segment, sctypeid, scpt_typename, prevgrade, twoyearprevgrade, threeyearprevgrade, prevyear_rn_sun, "
				+ " prevyear_rn_mon, prevyear_rn_tue, prevyear_rn_wed, prevyear_rn_thu, prevyear_rn_fri, prevyear_rn_sat, prevyear_staypatterngrade, "
				+ " squatter_book_pct, squatter_book_grade, elite_rewards_mbr_pct, elite_rewards_mbr_grade, agency_compliance_pct, agency_compliance_grade, "
				+ " prevyear_ytd_rn, twoyearprev_ytd_rn, threeyearprev_ytd_rn, prevyear_acct_rate_net, twoyearprev_acct_rate_net, "
				+ " threeyearprev_acct_rate_net, prevyear_wgt_retail_rate, twoyearprev_wgt_retail_rate, threeyearprev_wgt_retail_rate, "
				+ " prevyear_dsc_retail_pct, twoyearprev_dsc_retail_pct, threeyearprev_dsc_retail_pct, prevyear_acct_rev_net, twoyearprev_acct_rev_net, "
				+ " threeyearprev_acct_rev_net, fy_fcst_vol,"
				+ " total_multiplier,anticipate_inc_retail_pct,prevyear_retailadr "
				+ " FROM (  SELECT sa.scpt_accountid, sd.scpt_detailid, a.accountname, sa.accountname alt_accountname, sa.alt_segment, a.accounttypedescription, "
				+ " sa.hotelid, sa.period, sa.accountid, a.accountrecid,a.period accountperiod, sa.sctypeid, str.scpt_typename, sd.prevgrade, sd.twoyearprevgrade, "
				+ " sd.threeyearprevgrade, sd.prevyear_rn_sun, sd.prevyear_rn_mon, sd.prevyear_rn_tue, sd.prevyear_rn_wed, sd.prevyear_rn_thu, "
				+ " sd.prevyear_rn_fri, sd.prevyear_rn_sat, sd.prevyear_staypatterngrade, sd.squatter_book_pct, sd.squatter_book_grade, "
				+ " sd.elite_rewards_mbr_pct, sd.elite_rewards_mbr_grade, sd.agency_compliance_pct, sd.agency_compliance_grade, sd.prevyear_ytd_rn, "
				+ " sd.twoyearprev_ytd_rn, sd.threeyearprev_ytd_rn, sd.prevyear_acct_rate_net, sd.twoyearprev_acct_rate_net, "
				+ " sd.threeyearprev_acct_rate_net, sd.prevyear_wgt_retail_rate, sd.twoyearprev_wgt_retail_rate, sd.threeyearprev_wgt_retail_rate, "
				+ " sd.prevyear_dsc_retail_pct, sd.twoyearprev_dsc_retail_pct, sd.threeyearprev_dsc_retail_pct, sd.prevyear_acct_rev_net, "
				+ " sd.twoyearprev_acct_rev_net, sd.threeyearprev_acct_rev_net,sa.fy_fcst_vol, "
				+ " sd.total_multiplier, "
				+ " NVL (dos.anticipate_inc_retail_pct, 0) anticipate_inc_retail_pct,  dos.prevyear_retailadr "
				+ " FROM mfpdbo.scpt_detail sd, mfpdbo.scpt_account sa,  (SELECT accountid,  accountname,   a1.accounttype,   a1.accountrecid,  ar.accounttypedescription, a1.period "
				+ " FROM mfpdbo.account a1, mfpdbo.accounttiertype_ref ar  WHERE     (a1.period, a1.accountid) IN (  SELECT MAX (a2.period) max_period, a2.accountid "
				+ " FROM mfpdbo.account a2  WHERE     ( (period <> ?1 AND a2.hotel_display = 'Y') OR period = ?2)  AND accountpricingtype IN ('L', 'C') AND period IN (SELECT period "
				+ " FROM mfpdbo.period p WHERE p.hotelsview = 'Y' OR p.period = ?3) GROUP BY a2.accountid) "
				+ " AND a1.accounttype = ar.accounttype) a, mfpdbo.scpt_type_ref str, mfpdbo.hotelrfp hr, mfpdbo.salesdepth dos "
				+ " WHERE     sa.scpt_accountid = sd.scpt_accountid AND sa.accountid = a.accountid(+)  AND sa.sctypeid(+) = str.scpt_typeid "
				+ " AND sa.hotelid = ?4 AND sa.period = ?5 AND hr.hotelid = sa.hotelid AND hr.period = sa.period AND dos.hotelrfpid(+) = hr.hotelrfpid AND sa.isscaccount = 'Y' ";
		if (scptaccountid != null ) {
			/* For detail screen */
			querystring += " and sa.scpt_accountid = ?6 ))";
			
			Query q = em.createNativeQuery(querystring, SCPTDetail.class);
			q.setParameter(1, period);
			q.setParameter(2, period);
			q.setParameter(3, period);
			q.setParameter(4, hotelid);
			q.setParameter(5, period);	
			q.setParameter(6, scptaccountid);	
			@SuppressWarnings("unchecked")				
			List<SCPTDetail> scptdetail = q.getResultList();
			return scptdetail;
			
		}else {		
			if (filterString != null && !filterString.trim().equals("")) {
				querystring += " and (upper(mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname)) like upper('" + StringUtility.replaceSingleQuotes(filterString) + "%')) ";
			}
			if (showGPP != null && showGPP.equals("Y")) {
				querystring += " AND ( sa.alt_segment = 'GPP') ";
			}
	        querystring += " order by ";
			switch (orderby.intValue()) {
			case 1:
				querystring += " nvl(sd.prevyear_ytd_rn,0) desc, CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END  ";
				break;
			case 2:
				querystring += " nvl(sd.prevyear_acct_rev_net,0) desc, CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END  ";
				break;
			case 3:
				querystring += " CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END ";
				break;
			case 4:
				querystring += " mfpproc.pkg_scpt_rpe.fn_getaccountsegment (accountid, accounttypedescription, alt_segment) , CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END  ";
				break;
			case 5:
				querystring += " sa.sctypeid, CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END ";
				break;
			case 6:
				querystring += "  nvl(mfpproc.pkg_scpt_rpe.fn_ishotelaccountaccepted(hotelid,accountid, period-1) ,'A') desc , CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END ";
				break;
			case 7:
				querystring += " nvl(mfpproc.pkg_scpt_rpe.fn_ishotelaccountaccepted(hotelid,accountid, period-2) ,'A') desc, CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END ";
				break;
			default:
				querystring += " nvl(sd.prevyear_ytd_rn,0) desc, CASE WHEN sa.accountid IS NOT NULL and a.accountname is not null THEN a.accountname ELSE sa.accountname END  ";
				break;
			}
			long endaccount = page.getPage() * page.getMaxpagelen();
			long startaccount = endaccount - page.getMaxpagelen() + 1;
			querystring += "))  where   arow>=" + startaccount + " and arow <=" + endaccount;		

			Query q = em.createNativeQuery(querystring, SCPTDetail.class);
			q.setParameter(1, period);
			q.setParameter(2, period);
			q.setParameter(3, period);
			q.setParameter(4, hotelid);
			q.setParameter(5, period);	
			@SuppressWarnings("unchecked")				
			List<SCPTDetail> scptdetail = q.getResultList();
			return scptdetail;
		}
	}

	public Long findTotalDetail(Long hotelid, Long period, String filterString, String showGPP) {
		String querystring = " SELECT COUNT (*)  FROM mfpdbo.scpt_account sa, mfpdbo.account a WHERE  sa.hotelid = ?1 AND sa.period = ?2 AND sa.isscaccount = 'Y' AND sa.accountid = a.accountid(+) AND sa.period = a.period(+) ";
		if (filterString != null && !filterString.trim().equals("")) {
			querystring += " and (upper(mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname)) like upper('" + StringUtility.replaceSingleQuotes(filterString) + "%')) ";
		}
		if (showGPP != null && showGPP.equals("Y")) {
			querystring += " AND ( sa.alt_segment = 'GPP') ";
		}
		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		Long totalCount = (Long) q.getSingleResult();
		return totalCount;
	}

	public SCPTHotel findSCPTHotelDetail(Long hotelid, Long period) {
		String querystring = " select sh.showrmnights from mfpdbo.scpt_hotel sh where hotelid=?1 ";
		Query q = em.createNativeQuery(querystring, SCPTHotel.class);
		q.setParameter(1, hotelid);
		SCPTHotel hotelDetail = null;
		try {
			hotelDetail = (SCPTHotel) q.getSingleResult();
		} catch (Exception e) {
			hotelDetail = new SCPTHotel();
			hotelDetail.setShowrmnights("Y");
		}
		return hotelDetail;
	}

	public List<SCPTStatus> findSCPTStatus(Long hotelid, Long period) {
		String querystring = "SELECT sa.scpt_accountid,   mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname) accountname, sa.hotelid,  "              
                 + " NVL( mfpproc.pkg_scpt_rpe.fn_getaccountstatus (  mfpproc.pkg_scpt_rpe.fn_getscpt_accountrecid(sa.accountid, ?1), ?2) ,"
                 + " mfpproc.pkg_scpt_rpe.fn_getscptacctstatus(sa.scpt_accountid) ) status,  sa.period, sa.isscaccount "
                 + " FROM mfpdbo.scpt_account sa,  (SELECT accountid, accountname, 	 a1.accounttype, a1.accountrecid, ar.accounttypedescription, "
                 + " a1.period FROM mfpdbo.account a1, mfpdbo.accounttiertype_ref ar "
				 + " WHERE (a1.period, a1.accountid) IN (  SELECT MAX (a2.period) max_period, a2.accountid FROM mfpdbo.account a2 "
				 + " WHERE ((period <> ?3 AND a2.hotel_display = 'Y') OR period = ?4) AND accountpricingtype IN ('L', 'C') AND period IN "
                 + " (SELECT period FROM mfpdbo.period p  WHERE p.hotelsview = 'Y' OR p.period = ?5) GROUP BY a2.accountid) "
                 + " AND a1.accounttype = ar.accounttype) a "
				 + " WHERE sa.accountid = a.accountid(+) AND sa.hotelid = ?6 AND sa.period = ?7  and isscaccount = 'N' "
				 + " ORDER BY mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname)  ";
		Query q = em.createNativeQuery(querystring, SCPTStatus.class);
		q.setParameter(1, period);
		q.setParameter(2, hotelid);
		q.setParameter(3, period);
		q.setParameter(4, hotelid);
		q.setParameter(5, period);
		q.setParameter(6, hotelid);
		q.setParameter(7, period);
		@SuppressWarnings("unchecked")
		List<SCPTStatus> scptdetail = q.getResultList();
		return scptdetail;
	}
	public List<SCPTCommRates> findSCPTCommRates(Long hotelid, Long period, Long scpt_accountid, String isbrandextendedstay) {
		String querystring = "SELECT a.scpt_accountid, a.tiernumber, a.tiername,  mfpproc.fn_getroompoolstatus_scpt(a.accountid,a.hotelid,a.period,a.roomtypeid) roompoolstatus, a.roomtypeid, a.roomtypename, srates.scpt_commratesid1, " +
				"srates.prevyear_fcst_rns1, srates.fcst_rns1,srates.pct_annual_rn1,  srates.prevyear_rate_gross1,srates.open_rate_gross1, " +
				"srates.target_rate_gross1, srates.floor_rate_gross1, " +
				" mfpproc.pkg_scpt_rpe.fn_getmarrfpgrossrate(?20,a.scpt_accountid,?21,1,a.roomtypeid,a.tiernumber) prev_year_marrfp_rate1," +
				
				"mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (srates.open_rate_gross1,srates.target_rate_gross1,srates.floor_rate_gross1," +
				"srates.prevyear_rate_gross1,setup.show_yoy_comp)  pct_antc_gross_chg1,  srates.scpt_commratesid2, srates.prevyear_fcst_rns2," +
				" srates.fcst_rns2,srates.pct_annual_rn2,srates.prevyear_rate_gross2,srates.open_rate_gross2, srates.target_rate_gross2, " +
				"srates.floor_rate_gross2,  mfpproc.pkg_scpt_rpe.fn_getmarrfpgrossrate(?22,a.scpt_accountid,?23,2,a.roomtypeid,a.tiernumber) " +
				"prev_year_marrfp_rate2,mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (srates.open_rate_gross2,srates.target_rate_gross2," +
				"srates.floor_rate_gross2,srates.prevyear_rate_gross2,setup.show_yoy_comp)  pct_antc_gross_chg2,  srates.scpt_commratesid3," +
				" srates.prevyear_fcst_rns3, srates.fcst_rns3,srates.pct_annual_rn3,  srates.prevyear_rate_gross3,srates.open_rate_gross3, " +
				"srates.target_rate_gross3, srates.floor_rate_gross3, " +
				"mfpproc.pkg_scpt_rpe.fn_getmarrfpgrossrate(?24,a.scpt_accountid,?25,3,a.roomtypeid,a.tiernumber) prev_year_marrfp_rate3," +
				"mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (srates.open_rate_gross3,srates.target_rate_gross3,srates.floor_rate_gross3," +
				"srates.prevyear_rate_gross3,setup.show_yoy_comp)  pct_antc_gross_chg3, srates.scpt_commratesid4,srates.prevyear_fcst_rns4," +
				" srates.fcst_rns4,srates.pct_annual_rn4,  srates.prevyear_rate_gross4,srates.open_rate_gross4, srates.target_rate_gross4," +
				" srates.floor_rate_gross4,  mfpproc.pkg_scpt_rpe.fn_getmarrfpgrossrate(?26,a.scpt_accountid,?27,4,a.roomtypeid,a.tiernumber) prev_year_marrfp_rate4," +
				"mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (srates.open_rate_gross4,srates.target_rate_gross4,srates.floor_rate_gross4," +
				"srates.prevyear_rate_gross4,setup.show_yoy_comp)  pct_antc_gross_chg4," +
				
 				" srates.scpt_commratesid5, srates.prevyear_fcst_rns5, srates.fcst_rns5, srates.pct_annual_rn5,  " +
 				" srates.prevyear_rate_gross5, srates.open_rate_gross5, srates.target_rate_gross5, srates.floor_rate_gross5, " + 				
 				" mfpproc.pkg_scpt_rpe.fn_getmarrfpgrossrate(?52,a.scpt_accountid,?53,5,a.roomtypeid,a.tiernumber) prev_year_marrfp_rate5," +
 				" mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (srates.open_rate_gross5,srates.target_rate_gross5,srates.floor_rate_gross5," +
 				" srates.prevyear_rate_gross5,setup.show_yoy_comp) pct_antc_gross_chg5, " +
				
				" sc.prevyear_war,mfpproc.pkg_scpt_rpe.fn_get_curryear_wtd_netrt(?46,?47,?48,sc.roompoolid, sc.lengthofstayid,a.roomtypeid) curryear_war," + 				
				"mfpproc.pkg_scpt_rpe.fn_getwieghtedrate_rn (prevyear_rate_gross1, prevyear_fcst_rns1, prevyear_rate_gross2, " +
				"prevyear_fcst_rns2, prevyear_rate_gross3, prevyear_fcst_rns3, prevyear_rate_gross4, prevyear_fcst_rns4, prevyear_rate_gross5, prevyear_fcst_rns5) prevyear_weightedrate, " +
				"mfpproc.pkg_scpt_rpe.fn_getweightedrate_gross (setup.show_yoy_comp,open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4, open_rate_gross5," +
				"target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5,floor_rate_gross1,floor_rate_gross2,floor_rate_gross3," +
				"floor_rate_gross4, floor_rate_gross5,  fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate, " +
				" mfpproc.pkg_scpt_rpe.fn_getweightedrate_gross_chg (0,prevyear_rate_gross1, prevyear_fcst_rns1, prevyear_rate_gross2, prevyear_fcst_rns2," +
				" prevyear_rate_gross3, prevyear_fcst_rns3,prevyear_rate_gross4, prevyear_fcst_rns4,prevyear_rate_gross5, prevyear_fcst_rns5,setup.show_yoy_comp,open_rate_gross1," +
				"open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5," +
				"floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5,fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate_chg, " +
				" null prev_weightedratenet, mfpproc.pkg_scpt_rpe.fn_getweightedrate_net (0,setup.show_yoy_comp,open_rate_gross1,open_rate_gross2," +
				"open_rate_gross3,open_rate_gross4,open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, floor_rate_gross1," +
				"floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5,fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5," +				
				"sc.fixedcosts, sc.pctroomcosts, "+
				"sc.pctfbcosts)" +
				" weightedratenet, null weightedratenet_chg,null rcmd_min_rate_net,null rcmd_max_rate_net,null total_multiplier, null pct_antc_rcmd_min," +
				
				" mfpproc.pkg_scpt_rpe.fn_pct_accrate_wtd_retail(  mfpproc.pkg_scpt_rpe.fn_getweightedrate_net ( 0,setup.show_yoy_comp, open_rate_gross1,open_rate_gross2, open_rate_gross3,open_rate_gross4, " +
				" open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, " +
				" floor_rate_gross1, floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, " +
				" fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5, sc.fixedcosts, sc.pctroomcosts, sc.pctfbcosts)  ,setup.wtd_retail_rate) pct_accrate_weighted_retail," +
		        
				" null pct_prevrate_rcmd_max," +
				"sc.scpt_breaktypeid, sbr.breakfastname, sc.scpt_internettypeid, sir.internetname, sc.translocaloffice, sc.parking," +
				"round(sc.pctroomcosts,2) pctroomcosts, " +
				"sc.pctfbcosts, " +
				"round(sc.fixedcosts,2) fixedcosts, " +
				" sc.donotprice,sc.status,NVL(sc.lra,  CASE   " +
				" WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra (?28,(SELECT accountid FROM mfpdbo.scpt_account WHERE scpt_accountid =?29 AND period " +
				"  = ?30 ),?31)) = 'Y' THEN 'LRA'  WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra (?32, (SELECT accountid FROM mfpdbo.scpt_account " +
				" WHERE scpt_accountid =?33  AND period  = ?34),?35)) = 'N' THEN 'NLRA'  END) lra FROM (SELECT scpt_accountid, a.period, a.hotelid, a.accountid,tiernumber, tiername, " +
				"roomtypeid, roomtypename " + /* CASE WHEN accountid IS NOT NULL THEN roomtypename || ' - ' || mfpproc.pkg_scpt_rpe.fn_getscpt_roompool(hr.hotelrfpid, a.roomtypeid) ELSE roomtypename END roomtypename  " + */
				"FROM (SELECT sa.scpt_accountid, tiernumber, 'Tier ' || tiernumber tiername, srr.roomtypeid,srr.roomtypename, sa.accountid, " +
				"sa.hotelid, sa.period  FROM mfpdbo.scpt_account sa, mfpdbo.hotel h, ";
		if (isbrandextendedstay.equals("Y")) {
			querystring += " (    SELECT LEVEL tiernumber  FROM DUAL  CONNECT BY LEVEL <= (SELECT TO_NUMBER (constant_value)  " +
					"FROM mfpdbo.rfp_constants WHERE constant_name = 'MAX_LOS')) al, ";
		} else {
			querystring += " (    SELECT 1 tiernumber  FROM DUAL) al, ";
		}
		querystring += " mfpdbo.scpt_roomtype_ref srr  WHERE sa.hotelid = ?1  AND sa.period = ?2  AND srr.roomtypeid <> 5  AND h.hotelid = sa.hotelid " +
		" AND sa.isscaccount = 'Y'  AND ( (sa.accountid IS NOT NULL AND srr.roomtypeid <= 3) OR sa.accountid IS NULL)) a, " +
		" (SELECT hotelid, period, hotelrfpid FROM mfpdbo.hotelrfp hrfp " +
		" WHERE hrfp.hotelid = ?3 AND hrfp.period = ?4) hr  WHERE a.hotelid = hr.hotelid(+) AND " +
		"a.period = hr.period(+) ) a,  mfpdbo.scpt_comm sc, mfpdbo.scpt_breaktype_ref sbr, mfpdbo.scpt_internettype_ref sir, " +
		"(  SELECT scpt_accountid, roompoolid, lengthofstayid, " +
		"MAX (CASE WHEN seasonid = 1 THEN scpt_commratesid ELSE NULL END) scpt_commratesid1, " +
		"MAX (CASE WHEN seasonid = 2 THEN scpt_commratesid ELSE NULL END) scpt_commratesid2,  " +
		"MAX (CASE WHEN seasonid = 3 THEN scpt_commratesid ELSE NULL END) scpt_commratesid3, " +
		"MAX (CASE WHEN seasonid = 4 THEN scpt_commratesid ELSE NULL END) scpt_commratesid4, " +
		"MAX (CASE WHEN seasonid = 5 THEN scpt_commratesid ELSE NULL END) scpt_commratesid5, " +
		"MAX (CASE WHEN seasonid = 1 THEN prevyear_rate_gross ELSE NULL END) prevyear_rate_gross1, " +
		"MAX (CASE WHEN seasonid = 2 THEN prevyear_rate_gross ELSE NULL END) prevyear_rate_gross2, " +
		"MAX (CASE WHEN seasonid = 3 THEN prevyear_rate_gross ELSE NULL END) prevyear_rate_gross3, " +
		"MAX (CASE WHEN seasonid = 4 THEN prevyear_rate_gross ELSE NULL END) prevyear_rate_gross4, " +
		"MAX (CASE WHEN seasonid = 5 THEN prevyear_rate_gross ELSE NULL END) prevyear_rate_gross5, " +
		"MAX (CASE WHEN seasonid = 1 THEN pct_antc_gross_chg ELSE NULL END) pct_antc_gross_chg1, " +
		"MAX (CASE WHEN seasonid = 2 THEN pct_antc_gross_chg ELSE NULL END) pct_antc_gross_chg2,  " +
		"MAX (CASE WHEN seasonid = 3 THEN pct_antc_gross_chg ELSE NULL END) pct_antc_gross_chg3, " +
		"MAX (CASE WHEN seasonid = 4 THEN pct_antc_gross_chg ELSE NULL END) pct_antc_gross_chg4,  " +
		"MAX (CASE WHEN seasonid = 5 THEN pct_antc_gross_chg ELSE NULL END) pct_antc_gross_chg5,  " +
		"MAX (CASE WHEN seasonid = 1 THEN open_rate_gross ELSE NULL END) open_rate_gross1,  " +
		"MAX (CASE WHEN seasonid = 2 THEN open_rate_gross ELSE NULL END) open_rate_gross2, " +
		"MAX (CASE WHEN seasonid = 3 THEN open_rate_gross ELSE NULL END) open_rate_gross3,  " +
		"MAX (CASE WHEN seasonid = 4 THEN open_rate_gross ELSE NULL END) open_rate_gross4, " +
		"MAX (CASE WHEN seasonid = 5 THEN open_rate_gross ELSE NULL END) open_rate_gross5, " +
		"MAX (CASE WHEN seasonid = 1 THEN target_rate_gross ELSE NULL END) target_rate_gross1, " +
		"MAX (CASE WHEN seasonid = 2 THEN target_rate_gross ELSE NULL END) target_rate_gross2, " +
		"MAX (CASE WHEN seasonid = 3 THEN target_rate_gross ELSE NULL END) target_rate_gross3, " +
		"MAX (CASE WHEN seasonid = 4 THEN target_rate_gross ELSE NULL END) target_rate_gross4, " +
		"MAX (CASE WHEN seasonid = 5 THEN target_rate_gross ELSE NULL END) target_rate_gross5, " +
		"MAX (CASE WHEN seasonid = 1 THEN floor_rate_gross ELSE NULL END) floor_rate_gross1, " +
		"MAX (CASE WHEN seasonid = 2 THEN floor_rate_gross ELSE NULL END) floor_rate_gross2,  " +
		"MAX (CASE WHEN seasonid = 3 THEN floor_rate_gross ELSE NULL END) floor_rate_gross3, " +
		"MAX (CASE WHEN seasonid = 4 THEN floor_rate_gross ELSE NULL END) floor_rate_gross4, " +
		"MAX (CASE WHEN seasonid = 5 THEN floor_rate_gross ELSE NULL END) floor_rate_gross5, " +
		"MAX (CASE WHEN seasonid = 1 THEN pct_annual_rn ELSE NULL END) pct_annual_rn1, " +
		"MAX (CASE WHEN seasonid = 2 THEN pct_annual_rn ELSE NULL END) pct_annual_rn2, " +
		"MAX (CASE WHEN seasonid = 3 THEN pct_annual_rn ELSE NULL END) pct_annual_rn3, " +
		"MAX (CASE WHEN seasonid = 4 THEN pct_annual_rn ELSE NULL END) pct_annual_rn4, " +
		"MAX (CASE WHEN seasonid = 5 THEN pct_annual_rn ELSE NULL END) pct_annual_rn5, " +
		"MAX (CASE WHEN seasonid = 1 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns1, " +
		"MAX (CASE WHEN seasonid = 2 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns2, " +
		"MAX (CASE WHEN seasonid = 3 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns3, " +
		"MAX (CASE WHEN seasonid = 4 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns4, " +
		"MAX (CASE WHEN seasonid = 5 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns5, " +
		"MAX (CASE WHEN seasonid = 1 THEN fcst_rns ELSE NULL END) fcst_rns1, " +
		"MAX (CASE WHEN seasonid = 2 THEN fcst_rns ELSE NULL END) fcst_rns2, " +
		"MAX (CASE WHEN seasonid = 3 THEN fcst_rns ELSE NULL END) fcst_rns3, " +
		"MAX (CASE WHEN seasonid = 4 THEN fcst_rns ELSE NULL END) fcst_rns4,  " +
		"MAX (CASE WHEN seasonid = 5 THEN fcst_rns ELSE NULL END) fcst_rns5  " +
		"FROM (SELECT ss.scpt_accountid, ss.seasonid, sc.scpt_commratesid, sc.roompoolid, sc.lengthofstayid, " +
		"prevyear_rate_gross, pct_antc_gross_chg, open_rate_gross,target_rate_gross,floor_rate_gross, pct_annual_rn, " +
		"ROUND (mfpproc.pkg_scpt_rpe.fn_getprevyearfy_fcst (ss.prevyear_fy_fcst_vol, sd.prevyear_fy_fcst) * (sc.pct_annual_rn / 100)) prevyear_fcst_rns, " +
		"ROUND (mfpproc.pkg_scpt_rpe.fn_getfy_fcst (prevyear_fy_fcst_vol, prevyear_fy_fcst, ss.chg_rn_from_ty_pct,fy_fcst_vol) * (sc.pct_annual_rn / 100)) fcst_rns " +
		" FROM mfpdbo.scpt_commrates sc, mfpdbo.scpt_detail sd," +
		"(SELECT s.seasonid,sa.scpt_accountid, sa.prevyear_fy_fcst_vol, sa.fy_fcst_vol, sa.chg_rn_from_ty_pct, hr.hotelid , hr.period, " +
		"setup.RPP_SETUP_PRIMARY, setup.RPP_SETUP_SECONDARY, setup.RPP_SETUP_TERITARY,setup.RPP_SETUP_QUATERNARY FROM mfpdbo.hotelrfp hr, " +
		"mfpdbo.season s,mfpdbo.scpt_account sa,mfpdbo.scptsetupnew setup WHERE hr.hotelid = ?5 AND hr.period = ?6 AND sa.scpt_accountid=?7 " +
		"AND hr.hotelrfpid    = s.hotelrfpid AND sa.hotelid       = hr.hotelid AND sa.period        = hr.period  AND sa.hotelid   = setup.hotelid " +
		"AND sa.period        = setup.period  ) ss WHERE " +
		"sc.scpt_accountid = ss.scpt_accountid AND sc.seasonid  = ss.seasonid  AND " +
		"sc.scpt_accountid   = sd.scpt_accountid )  GROUP BY scpt_accountid, roompoolid, lengthofstayid) srates,mfpdbo.scptsetupnew setup WHERE " +
		"a.scpt_accountid = sc.scpt_accountid(+)  AND a.tiernumber = sc.lengthofstayid(+)  AND a.roomtypeid = sc.roompoolid(+)  AND " +
		"sc.scpt_breaktypeid = sbr.scpt_breaktypeid(+)  AND sc.scpt_internettypeid = sir.scpt_internettypeid(+)  AND a.scpt_accountid = " +
		"srates.scpt_accountid(+)  AND a.tiernumber = srates.lengthofstayid(+)  AND a.roomtypeid = srates.roompoolid(+)   and a.scpt_accountid=?8  " +
		"AND roomtypeid <> 5 and setup.hotelid=?16  and setup.period = ?17 UNION " +
		"SELECT a.scpt_accountid,NULL tiernumber,NULL tiername,NULL roompoolstatus,a.roomtypeid, a.roomtypename, " +
		"NULL scpt_commratesid1,srates.prevyear_fcst_rns1, srates.fcst_rns1, " +
		" srates.pct_annual_rn1, CASE WHEN srates.prevyear_fcst_rns1 <> 0 THEN " +
		"ROUND (srates.prevyear_rate_gross1 / srates.prevyear_fcst_rns1, 2) END prevyear_rate_gross1, " +
		"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.open_rate_gross1 / srates.fcst_rns1, 2) END open_rate_gross1,  " +
		"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.target_rate_gross1 / srates.fcst_rns1, 2) END target_rate_gross1, " +
		"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.floor_rate_gross1 / srates.fcst_rns1, 2) END floor_rate_gross1,  " +
		"(select null from dual) prev_year_marrfp_rate1,CASE WHEN (srates.fcst_rns1 <> 0 AND srates.prevyear_fcst_rns1 <> 0)" +
		" THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross1 / srates.fcst_rns1,2)," +
		"ROUND (srates.target_rate_gross1 / srates.fcst_rns1, 2),ROUND (srates.floor_rate_gross1 / srates.fcst_rns1, 2) ," +
		"ROUND (srates.prevyear_rate_gross1 / srates.prevyear_fcst_rns1, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg1, " +
		"NULL scpt_commratesid2, srates.prevyear_fcst_rns2, srates.fcst_rns2, srates.pct_annual_rn2, " +
		"CASE WHEN srates.prevyear_fcst_rns2 <> 0 THEN ROUND (srates.prevyear_rate_gross2 / srates.prevyear_fcst_rns2, 2) END prevyear_rate_gross2, " +
		"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.open_rate_gross2 / srates.fcst_rns2, 2) END open_rate_gross2," +
		"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.target_rate_gross2 / srates.fcst_rns2, 2) END target_rate_gross2,  " +
		"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.floor_rate_gross2 / srates.fcst_rns2, 2) END floor_rate_gross2, " +
		"(select null from dual) prev_year_marrfp_rate2," +
		"CASE WHEN (srates.fcst_rns2 <> 0 AND srates.prevyear_fcst_rns2 <> 0) " +
		"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross2 / srates.fcst_rns2,2)," +
		"ROUND (srates.target_rate_gross2 / srates.fcst_rns2, 2),ROUND (srates.floor_rate_gross2 / srates.fcst_rns2, 2) ," +
		"ROUND (srates.prevyear_rate_gross2 / srates.prevyear_fcst_rns2, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg2,  " +
		"NULL scpt_commratesid3,srates.prevyear_fcst_rns3, srates.fcst_rns3,  srates.pct_annual_rn3, " +
		"CASE WHEN srates.prevyear_fcst_rns3 <> 0 THEN ROUND (srates.prevyear_rate_gross3 / srates.prevyear_fcst_rns3, 2) END prevyear_rate_gross3," +
		"  CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.open_rate_gross3 / srates.fcst_rns3, 2) END open_rate_gross3, " +
		"CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.target_rate_gross3 / srates.fcst_rns3, 2) END target_rate_gross3,  " +
		"CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.floor_rate_gross3 / srates.fcst_rns3, 2) END floor_rate_gross3, " +
		"(select null from dual) prev_year_marrfp_rate3,CASE WHEN (srates.fcst_rns3 <> 0 AND srates.prevyear_fcst_rns3 <> 0) " +
		"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross3 / srates.fcst_rns3,2)," +
		"ROUND (srates.target_rate_gross3 / srates.fcst_rns3, 2),ROUND (srates.floor_rate_gross3/ srates.fcst_rns3, 2) ," +
		"ROUND (srates.prevyear_rate_gross3 / srates.prevyear_fcst_rns3, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg3, " +
		" NULL scpt_commratesid4, srates.prevyear_fcst_rns4, srates.fcst_rns4, srates.pct_annual_rn4, " +
		"CASE WHEN srates.prevyear_fcst_rns4 <> 0 THEN ROUND (srates.prevyear_rate_gross4 / srates.prevyear_fcst_rns4, 2) END prevyear_rate_gross4, " +
		"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.open_rate_gross4 / srates.fcst_rns4, 2) END open_rate_gross4, " +
		"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.target_rate_gross4 / srates.fcst_rns4, 2) END target_rate_gross4,  " +
		"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.floor_rate_gross4 / srates.fcst_rns4, 2) END floor_rate_gross4, " +
		"(select null from dual) prev_year_marrfp_rate4,CASE WHEN (srates.fcst_rns4 <> 0 AND srates.prevyear_fcst_rns4 <> 0) " +
		"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross4 / srates.fcst_rns4,2)," +
		"ROUND (srates.target_rate_gross4 / srates.fcst_rns4, 2),ROUND (srates.floor_rate_gross4 / srates.fcst_rns4, 2) ," +
		"ROUND (srates.prevyear_rate_gross4 / srates.prevyear_fcst_rns4, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg4, " +
		" NULL scpt_commratesid5, srates.prevyear_fcst_rns5, srates.fcst_rns5, srates.pct_annual_rn5, " +
		"CASE WHEN srates.prevyear_fcst_rns5 <> 0 THEN ROUND (srates.prevyear_rate_gross5 / srates.prevyear_fcst_rns5, 2) END prevyear_rate_gross5, " +
		"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.open_rate_gross5 / srates.fcst_rns5, 2) END open_rate_gross5, " +
		"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.target_rate_gross5 / srates.fcst_rns5, 2) END target_rate_gross5,  " +
		"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.floor_rate_gross5 / srates.fcst_rns5, 2) END floor_rate_gross5, " +
		"(select null from dual) prev_year_marrfp_rate5,CASE WHEN (srates.fcst_rns5 <> 0 AND srates.prevyear_fcst_rns5 <> 0) " +
		"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross5 / srates.fcst_rns5,2)," +
		"ROUND (srates.target_rate_gross5 / srates.fcst_rns5, 2),ROUND (srates.floor_rate_gross5 / srates.fcst_rns5, 2) ," +
		"ROUND (srates.prevyear_rate_gross5 / srates.prevyear_fcst_rns5, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg5,  " +
		"sc.prevyear_war,mfpproc.pkg_scpt_rpe.fn_get_curryear_wtd_netrt(?49,?50,?51,sc.roompoolid, sc.lengthofstayid,a.roomtypeid) curryear_war, " +
		" mfpproc.pkg_scpt_rpe.fn_totalweightedrate (prevyear_rate_gross1, prevyear_rate_gross2, prevyear_rate_gross3, " +
		"prevyear_rate_gross4,prevyear_rate_gross5, prevyear_fcst_rns1, prevyear_fcst_rns2, prevyear_fcst_rns3, prevyear_fcst_rns4, prevyear_fcst_rns5) prevyear_weightedrate," +
		"mfpproc.pkg_scpt_rpe.fn_totalweightedrate_gross (setup.show_yoy_comp,open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4, open_rate_gross5, " +
		"target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, floor_rate_gross1,floor_rate_gross2,floor_rate_gross3," +
		"floor_rate_gross4, floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate, " +
		"mfpproc.pkg_scpt_rpe.fn_getweightedrate_gross_chg (1,prevyear_rate_gross1, prevyear_fcst_rns1, prevyear_rate_gross2, prevyear_fcst_rns2, " +
		"prevyear_rate_gross3, prevyear_fcst_rns3, prevyear_rate_gross4, prevyear_fcst_rns4, prevyear_rate_gross5, prevyear_fcst_rns5, setup.show_yoy_comp,open_rate_gross1," +
		"open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4, target_rate_gross5, " +
		"floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4, floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate_chg," +
		"srates.prevyear_fy_fcst_rate_net prev_weightedratenet, mfpproc.pkg_scpt_rpe.fn_getweightedrate_net (1,setup.show_yoy_comp,open_rate_gross1," +
		"open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5,target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5," +
		"floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4,fcst_rns5, " +
		"sc.fixedcosts,sc.pctroomcosts,"+
		"sc.pctfbcosts) weightedratenet,mfpproc.pkg_scpt_rpe.fn_getweightedrate_net_chg(srates.prevyear_fy_fcst_rate_net,1,setup.show_yoy_comp," +
		"open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5,target_rate_gross1,target_rate_gross2,target_rate_gross3," +
		"target_rate_gross4,target_rate_gross5, floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5," +
		"sc.fixedcosts,sc.pctroomcosts,"+
		"sc.pctfbcosts) weightedratenet_chg," +
		"mfpproc.pkg_scpt_rpe.fn_getrcmd_min_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG) rcmd_min_rate_net," +
		"mfpproc.pkg_scpt_rpe.fn_getrcmd_max_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG, srates.total_multiplier) rcmd_max_rate_net," +
        "srates.total_multiplier total_multiplier, mfpproc.pkg_scpt_rpe.fn_pct_antc_rcmd_min(setup.show_yoy_comp,open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5," +
		"target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5,floor_rate_gross1,floor_rate_gross2,floor_rate_gross3," +
		"floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4,fcst_rns5, null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG," +
		"sc.fixedcosts,sc.pctroomcosts,"+
		"sc.pctfbcosts) pct_antc_rcmd_min," +
		
		" mfpproc.pkg_scpt_rpe.fn_pct_accrate_wtd_retail( mfpproc.pkg_scpt_rpe.fn_getweightedrate_net ( 1,setup.show_yoy_comp, open_rate_gross1,open_rate_gross2, open_rate_gross3,open_rate_gross4, " +
		" open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, " +
		" floor_rate_gross1, floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, " +
		" fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5, sc.fixedcosts, sc.pctroomcosts, sc.pctfbcosts)  " +
		" ,setup.wtd_retail_rate) pct_accrate_weighted_retail," +
        
		"mfpproc.pkg_scpt_rpe.fn_pct_prevrate_rcmd_max(srates.prevyear_fy_fcst_rate_net, mfpproc.pkg_scpt_rpe.fn_getrcmd_max_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG, srates.total_multiplier)) pct_prevrate_rcmd_max," +
        "sc.scpt_breaktypeid, " +
		"sbr.breakfastname, sc.scpt_internettypeid, sir.internetname, sc.translocaloffice, sc.parking," +
		"round(sc.pctroomcosts,2) pctroomcosts,"+
		" sc.pctfbcosts, " +
		"round(sc.fixedcosts,2) fixedcosts ,"+
		" sc.donotprice,sc.status,NVL(sc.lra,  CASE   WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra " +
		"(?36,(SELECT accountid FROM mfpdbo.scpt_account WHERE scpt_accountid =?37 AND period  = ?38 ),?39)) = 'Y' THEN 'LRA' " +
		" WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra (?40, (SELECT accountid FROM mfpdbo.scpt_account WHERE scpt_accountid =?41  AND period  = ?42),?43)) = 'N' " +
		"THEN 'NLRA'  END) lra FROM (SELECT sa.scpt_accountid, srr.roomtypeid, srr.roomtypename," +
		"sa.est_acct_rate_net FROM mfpdbo.scpt_account sa, mfpdbo.scpt_roomtype_ref srr  WHERE  sa.hotelid = ?9  AND sa.period = ?10  " +
		"and sa.scpt_accountid=?11 and srr.roomtypeid=5  AND sa.isscaccount = 'Y') a, mfpdbo.scpt_comm sc, mfpdbo.scpt_breaktype_ref sbr, " +
				"mfpdbo.scpt_internettype_ref sir, ( SELECT scpt_accountid, " +
				"SUM (CASE WHEN seasonid = 1 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross1," +
				"SUM (CASE WHEN seasonid = 2 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross2,  " +
				"SUM (CASE WHEN seasonid = 3 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross3, " +
				"SUM (CASE WHEN seasonid = 4 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross4, " +
				"SUM (CASE WHEN seasonid = 5 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross5, " +
					"prevyear_fy_fcst_rate_net,total_multiplier," +
				"SUM (CASE WHEN seasonid = 1 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross1," +
				"SUM (CASE WHEN seasonid = 2 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross2,  " +
				"SUM (CASE WHEN seasonid = 3 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross3, " +
				"SUM (CASE WHEN seasonid = 4 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross4, " +
				"SUM (CASE WHEN seasonid = 5 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross5, " +
				"SUM (CASE WHEN seasonid = 1 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross1," +
				"SUM (CASE WHEN seasonid = 2 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross2,  " +
				"SUM (CASE WHEN seasonid = 3 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross3, " +
				"SUM (CASE WHEN seasonid = 4 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross4, " +
				"SUM (CASE WHEN seasonid = 5 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross5, " +
				"SUM (CASE WHEN seasonid = 1 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross1," +
				"SUM (CASE WHEN seasonid = 2 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross2,  " +
				"SUM (CASE WHEN seasonid = 3 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross3, " +
				"SUM (CASE WHEN seasonid = 4 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross4, " +
				"SUM (CASE WHEN seasonid = 5 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross5, " +
				"SUM (CASE WHEN seasonid = 1 THEN pct_annual_rn ELSE NULL END) pct_annual_rn1, " +
				"SUM (CASE WHEN seasonid = 2 THEN pct_annual_rn ELSE NULL END) pct_annual_rn2, " +
				"SUM (CASE WHEN seasonid = 3 THEN pct_annual_rn ELSE NULL END) pct_annual_rn3," +
				"SUM (CASE WHEN seasonid = 4 THEN pct_annual_rn ELSE NULL END) pct_annual_rn4," +
				"SUM (CASE WHEN seasonid = 5 THEN pct_annual_rn ELSE NULL END) pct_annual_rn5," +
				"SUM (CASE WHEN seasonid = 1 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns1," +
				"SUM (CASE WHEN seasonid = 2 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns2, " +
				"SUM (CASE WHEN seasonid = 3 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns3, " +
				"SUM (CASE WHEN seasonid = 4 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns4, " +
				"SUM (CASE WHEN seasonid = 5 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns5, " +
				"SUM (CASE WHEN seasonid = 1 THEN fcst_rns ELSE NULL END) fcst_rns1, " +
				"SUM (CASE WHEN seasonid = 2 THEN fcst_rns ELSE NULL END) fcst_rns2,  " +
				"SUM (CASE WHEN seasonid = 3 THEN fcst_rns ELSE NULL END) fcst_rns3, " +
				"SUM (CASE WHEN seasonid = 4 THEN fcst_rns ELSE NULL END) fcst_rns4, " +
				"SUM (CASE WHEN seasonid = 5 THEN fcst_rns ELSE NULL END) fcst_rns5 " +
		"FROM (SELECT ss.scpt_accountid, ss.seasonid,sc.scpt_commratesid,sc.roompoolid, sc.lengthofstayid, sc.prevyear_rate_gross, " +
		"sc.pct_antc_gross_chg, sc.open_rate_gross, sc.target_rate_gross, sc.floor_rate_gross, sc.pct_annual_rn," +
        "mfpproc.pkg_scpt_rpe.fn_getprevyearfyratenet (sd.prevyear_fy_fcst_rate_net_vol, sd.prevyear_fy_fcst_rate_net) prevyear_fy_fcst_rate_net," +
		"sd.total_multiplier,ROUND (mfpproc.pkg_scpt_rpe.fn_getprevyearfy_fcst (ss.prevyear_fy_fcst_vol, sd.prevyear_fy_fcst) * (sc.pct_annual_rn / 100)) prevyear_fcst_rns, " +
				"ROUND (mfpproc.pkg_scpt_rpe.fn_getfy_fcst (prevyear_fy_fcst_vol, prevyear_fy_fcst, ss.chg_rn_from_ty_pct, fy_fcst_vol) * (sc.pct_annual_rn / 100)) fcst_rns, " +
				"ss.RPP_SETUP_PRIMARY,ss.RPP_SETUP_SECONDARY,ss.RPP_SETUP_TERITARY,ss.RPP_SETUP_QUATERNARY " +
		"FROM mfpdbo.scpt_commrates sc,  mfpdbo.scpt_detail sd, (SELECT s.seasonid, sa.scpt_accountid, sa.prevyear_fy_fcst_vol, " +
				"sa.fy_fcst_vol,sa.chg_rn_from_ty_pct,setup.RPP_SETUP_PRIMARY,setup.RPP_SETUP_SECONDARY,setup.RPP_SETUP_TERITARY,setup.RPP_SETUP_QUATERNARY FROM mfpdbo.hotelrfp hr,mfpdbo.season s, mfpdbo.scpt_account sa,mfpdbo.scptsetupnew setup WHERE hr.hotelid = ?12  " +
				"AND hr.period = ?13 and sa.scpt_accountid=?14 AND hr.hotelrfpid = s.hotelrfpid AND sa.hotelid = hr.hotelid  AND sa.period = hr.period AND sa.hotelid = setup.hotelid AND sa.period = setup.period ) ss " +
		"WHERE sc.scpt_accountid = ss.scpt_accountid AND sc.seasonid = ss.seasonid AND sc.scpt_accountid = sd.scpt_accountid " +
				" ) GROUP BY scpt_accountid,prevyear_fy_fcst_rate_net,total_multiplier) srates,mfpdbo.scptsetupnew setup " +
		"WHERE a.scpt_accountid = sc.scpt_accountid(+) AND a.roomtypeid = sc.roompoolid(+)  AND sc.scpt_breaktypeid = sbr.scpt_breaktypeid(+)  " +
		"AND sc.scpt_internettypeid = sir.scpt_internettypeid(+)  AND a.scpt_accountid = srates.scpt_accountid(+)   and a.scpt_accountid=?15 " +
		"AND roomtypeid = 5  and setup.hotelid=?18 and setup.period =?19 ";
		
		if (!isbrandextendedstay.equals("Y")) {
			querystring += " ORDER BY scpt_accountid, roomtypeid, tiernumber ";
		}
		
				
		if (isbrandextendedstay.equals("Y")) {
		querystring += " UNION " +
				"SELECT a.scpt_accountid, 5 tiernumber,NULL tiername,NULL roompoolstatus, srates.roompoolid roomtypeid, a.roomtypename, " +
				"NULL scpt_commratesid1,srates.prevyear_fcst_rns1, srates.fcst_rns1, " +
				" srates.pct_annual_rn1, CASE WHEN srates.prevyear_fcst_rns1 <> 0 THEN " +
				"ROUND (srates.prevyear_rate_gross1 / srates.prevyear_fcst_rns1, 2) END prevyear_rate_gross1, " +
				"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.open_rate_gross1 / srates.fcst_rns1, 2) END open_rate_gross1,  " +
				"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.target_rate_gross1 / srates.fcst_rns1, 2) END target_rate_gross1, " +
				"CASE WHEN srates.fcst_rns1 <> 0 THEN ROUND (srates.floor_rate_gross1 / srates.fcst_rns1, 2) END floor_rate_gross1,  " +
				"(select null from dual) prev_year_marrfp_rate1,CASE WHEN (srates.fcst_rns1 <> 0 AND srates.prevyear_fcst_rns1 <> 0)" +
				" THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross1 / srates.fcst_rns1,2)," +
				"ROUND (srates.target_rate_gross1 / srates.fcst_rns1, 2),ROUND (srates.floor_rate_gross1 / srates.fcst_rns1, 2) ," +
				"ROUND (srates.prevyear_rate_gross1 / srates.prevyear_fcst_rns1, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg1, " +
				"NULL scpt_commratesid2, srates.prevyear_fcst_rns2, srates.fcst_rns2, srates.pct_annual_rn2, " +
				"CASE WHEN srates.prevyear_fcst_rns2 <> 0 THEN ROUND (srates.prevyear_rate_gross2 / srates.prevyear_fcst_rns2, 2) END prevyear_rate_gross2, " +
				"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.open_rate_gross2 / srates.fcst_rns2, 2) END open_rate_gross2," +
				"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.target_rate_gross2 / srates.fcst_rns2, 2) END target_rate_gross2,  " +
				"CASE WHEN srates.fcst_rns2 <> 0 THEN ROUND (srates.floor_rate_gross2 / srates.fcst_rns2, 2) END floor_rate_gross2, " +
				"(select null from dual) prev_year_marrfp_rate2," +
				"CASE WHEN (srates.fcst_rns2 <> 0 AND srates.prevyear_fcst_rns2 <> 0) " +
				"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross2 / srates.fcst_rns2,2)," +
				"ROUND (srates.target_rate_gross2 / srates.fcst_rns2, 2),ROUND (srates.floor_rate_gross2 / srates.fcst_rns2, 2) ," +
				"ROUND (srates.prevyear_rate_gross2 / srates.prevyear_fcst_rns2, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg2,  " +
				"NULL scpt_commratesid3,srates.prevyear_fcst_rns3, srates.fcst_rns3,  srates.pct_annual_rn3, " +
				"CASE WHEN srates.prevyear_fcst_rns3 <> 0 THEN ROUND (srates.prevyear_rate_gross3 / srates.prevyear_fcst_rns3, 2) END prevyear_rate_gross3," +
				"  CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.open_rate_gross3 / srates.fcst_rns3, 2) END open_rate_gross3, " +
				"CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.target_rate_gross3 / srates.fcst_rns3, 2) END target_rate_gross3,  " +
				"CASE WHEN srates.fcst_rns3 <> 0 THEN ROUND (srates.floor_rate_gross3 / srates.fcst_rns3, 2) END floor_rate_gross3, " +
				"(select null from dual) prev_year_marrfp_rate3,CASE WHEN (srates.fcst_rns3 <> 0 AND srates.prevyear_fcst_rns3 <> 0) " +
				"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross3 / srates.fcst_rns3,2)," +
				"ROUND (srates.target_rate_gross3 / srates.fcst_rns3, 2),ROUND (srates.floor_rate_gross3/ srates.fcst_rns3, 2) ," +
				"ROUND (srates.prevyear_rate_gross3 / srates.prevyear_fcst_rns3, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg3, " +
				" NULL scpt_commratesid4, srates.prevyear_fcst_rns4, srates.fcst_rns4, srates.pct_annual_rn4, " +
				"CASE WHEN srates.prevyear_fcst_rns4 <> 0 THEN ROUND (srates.prevyear_rate_gross4 / srates.prevyear_fcst_rns4, 2) END prevyear_rate_gross4, " +
				"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.open_rate_gross4 / srates.fcst_rns4, 2) END open_rate_gross4, " +
				"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.target_rate_gross4 / srates.fcst_rns4, 2) END target_rate_gross4,  " +
				"CASE WHEN srates.fcst_rns4 <> 0 THEN ROUND (srates.floor_rate_gross4 / srates.fcst_rns4, 2) END floor_rate_gross4, " +
				"(select null from dual) prev_year_marrfp_rate4,CASE WHEN (srates.fcst_rns4 <> 0 AND srates.prevyear_fcst_rns4 <> 0) " +
				"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross4 / srates.fcst_rns4,2)," +
				"ROUND (srates.target_rate_gross4 / srates.fcst_rns4, 2),ROUND (srates.floor_rate_gross4 / srates.fcst_rns4, 2) ," +
				"ROUND (srates.prevyear_rate_gross4 / srates.prevyear_fcst_rns4, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg4, " +
				" NULL scpt_commratesid5, srates.prevyear_fcst_rns5, srates.fcst_rns5, srates.pct_annual_rn5, " +
				"CASE WHEN srates.prevyear_fcst_rns5 <> 0 THEN ROUND (srates.prevyear_rate_gross5 / srates.prevyear_fcst_rns5, 2) END prevyear_rate_gross5, " +
				"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.open_rate_gross5 / srates.fcst_rns5, 2) END open_rate_gross5, " +
				"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.target_rate_gross5 / srates.fcst_rns5, 2) END target_rate_gross5,  " +
				"CASE WHEN srates.fcst_rns5 <> 0 THEN ROUND (srates.floor_rate_gross5 / srates.fcst_rns5, 2) END floor_rate_gross5, " +
				"(select null from dual) prev_year_marrfp_rate5,CASE WHEN (srates.fcst_rns5 <> 0 AND srates.prevyear_fcst_rns5 <> 0) " +
				"THEN mfpproc.pkg_scpt_rpe.fn_getseasonantcgrosschg (ROUND(srates.open_rate_gross5 / srates.fcst_rns5,2)," +
				"ROUND (srates.target_rate_gross5 / srates.fcst_rns5, 2),ROUND (srates.floor_rate_gross5 / srates.fcst_rns5, 2) ," +
				"ROUND (srates.prevyear_rate_gross5 / srates.prevyear_fcst_rns5, 2),setup.show_yoy_comp)  ELSE 0 END pct_antc_gross_chg5,  " +
				"sc.prevyear_war,mfpproc.pkg_scpt_rpe.fn_get_curryear_wtd_netrt(?54,?55,?56,sc.roompoolid, sc.lengthofstayid,a.roomtypeid) curryear_war, " +
				" mfpproc.pkg_scpt_rpe.fn_totalweightedrate (prevyear_rate_gross1, prevyear_rate_gross2, prevyear_rate_gross3, " +
				"prevyear_rate_gross4,prevyear_rate_gross5, prevyear_fcst_rns1, prevyear_fcst_rns2, prevyear_fcst_rns3, prevyear_fcst_rns4, prevyear_fcst_rns5) prevyear_weightedrate," +
				"mfpproc.pkg_scpt_rpe.fn_totalweightedrate_gross (setup.show_yoy_comp,open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4, open_rate_gross5, " +
				"target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, floor_rate_gross1,floor_rate_gross2,floor_rate_gross3," +
				"floor_rate_gross4, floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate, " +
				"mfpproc.pkg_scpt_rpe.fn_getweightedrate_gross_chg (1,prevyear_rate_gross1, prevyear_fcst_rns1, prevyear_rate_gross2, prevyear_fcst_rns2, " +
				"prevyear_rate_gross3, prevyear_fcst_rns3, prevyear_rate_gross4, prevyear_fcst_rns4, prevyear_rate_gross5, prevyear_fcst_rns5, setup.show_yoy_comp,open_rate_gross1," +
				"open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4, target_rate_gross5, " +
				"floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4, floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5) weightedrate_chg," +
				"srates.prevyear_fy_fcst_rate_net prev_weightedratenet, mfpproc.pkg_scpt_rpe.fn_getweightedrate_net (1,setup.show_yoy_comp,open_rate_gross1," +
				"open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5,target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5," +
				"floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4,fcst_rns5, " +
				"sc.fixedcosts, mfpproc.pkg_scpt_rpe.fn_get_rppctroomcosts( srates.scpt_accountid, srates.roompoolid ),"+
				"sc.pctfbcosts) weightedratenet,mfpproc.pkg_scpt_rpe.fn_getweightedrate_net_chg(srates.prevyear_fy_fcst_rate_net,1,setup.show_yoy_comp," +
				"open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5,target_rate_gross1,target_rate_gross2,target_rate_gross3," +
				"target_rate_gross4,target_rate_gross5, floor_rate_gross1,floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5," +
				"sc.fixedcosts, mfpproc.pkg_scpt_rpe.fn_get_rppctroomcosts( srates.scpt_accountid, srates.roompoolid) ,"+
				"sc.pctfbcosts) weightedratenet_chg," +
				"mfpproc.pkg_scpt_rpe.fn_getrcmd_min_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG) rcmd_min_rate_net," +
				"mfpproc.pkg_scpt_rpe.fn_getrcmd_max_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG, srates.total_multiplier) rcmd_max_rate_net," +
		        "srates.total_multiplier total_multiplier, mfpproc.pkg_scpt_rpe.fn_pct_antc_rcmd_min(setup.show_yoy_comp,open_rate_gross1,open_rate_gross2,open_rate_gross3,open_rate_gross4,open_rate_gross5," +
				"target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5,floor_rate_gross1,floor_rate_gross2,floor_rate_gross3," +
				"floor_rate_gross4,floor_rate_gross5, fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4,fcst_rns5, null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG," +
				"sc.fixedcosts, mfpproc.pkg_scpt_rpe.fn_get_rppctroomcosts( srates.scpt_accountid, srates.roompoolid)  ,"+
				"sc.pctfbcosts) pct_antc_rcmd_min," +
				
				" mfpproc.pkg_scpt_rpe.fn_pct_accrate_wtd_retail(  mfpproc.pkg_scpt_rpe.fn_getweightedrate_net ( 1,setup.show_yoy_comp, open_rate_gross1,open_rate_gross2, open_rate_gross3,open_rate_gross4, " +
				" open_rate_gross5, target_rate_gross1,target_rate_gross2,target_rate_gross3,target_rate_gross4,target_rate_gross5, " +
				" floor_rate_gross1, floor_rate_gross2,floor_rate_gross3,floor_rate_gross4,floor_rate_gross5, " +
				" fcst_rns1,fcst_rns2,fcst_rns3,fcst_rns4, fcst_rns5, sc.fixedcosts, sc.pctroomcosts, sc.pctfbcosts)  " +
				",setup.wtd_retail_rate) pct_accrate_weighted_retail," +
		        
				"mfpproc.pkg_scpt_rpe.fn_pct_prevrate_rcmd_max(srates.prevyear_fy_fcst_rate_net, mfpproc.pkg_scpt_rpe.fn_getrcmd_max_rate_net (null, srates.prevyear_fy_fcst_rate_net, setup.YOY_RETAILRATE_CHG, srates.total_multiplier)) pct_prevrate_rcmd_max," +
		        "sc.scpt_breaktypeid, " +
				"sbr.breakfastname, sc.scpt_internettypeid, sir.internetname, sc.translocaloffice, sc.parking," +
				"round(mfpproc.pkg_scpt_rpe.fn_get_rppctroomcosts( srates.scpt_accountid, srates.roompoolid ),2) pctroomcosts,"+
				" sc.pctfbcosts, " +
				"round(sc.fixedcosts,2) fixedcosts ,"+
				" sc.donotprice,sc.status,NVL(sc.lra,  CASE   WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra " +
				"(?57,(SELECT accountid FROM mfpdbo.scpt_account WHERE scpt_accountid =?58 AND period  = ?59 ),?60)) = 'Y' THEN 'LRA' " +
				" WHEN ( mfpproc.pkg_scpt_rpe.fn_hotelaccountlra (?61, (SELECT accountid FROM mfpdbo.scpt_account WHERE scpt_accountid =?62  AND period  = ?63),?64)) = 'N' " +
				"THEN 'NLRA'  END) lra FROM (SELECT sa.scpt_accountid, srr.roomtypeid, srr.roomtypename," +
				"sa.est_acct_rate_net FROM mfpdbo.scpt_account sa, mfpdbo.scpt_roomtype_ref srr  WHERE  sa.hotelid = ?65 AND sa.period = ?66  " +
				"and sa.scpt_accountid=?67 and srr.roomtypeid=5  AND sa.isscaccount = 'Y') a, mfpdbo.scpt_comm sc, mfpdbo.scpt_breaktype_ref sbr, " +
						"mfpdbo.scpt_internettype_ref sir, ( SELECT scpt_accountid, " +
						"SUM (CASE WHEN seasonid = 1 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross1," +
						"SUM (CASE WHEN seasonid = 2 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross2,  " +
						"SUM (CASE WHEN seasonid = 3 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross3, " +
						"SUM (CASE WHEN seasonid = 4 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross4, " +
						"SUM (CASE WHEN seasonid = 5 THEN prevyear_rate_gross * prevyear_fcst_rns ELSE NULL END) prevyear_rate_gross5, " +
							"prevyear_fy_fcst_rate_net,total_multiplier, roompoolid, " +
						"SUM (CASE WHEN seasonid = 1 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross1," +
						"SUM (CASE WHEN seasonid = 2 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross2,  " +
						"SUM (CASE WHEN seasonid = 3 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross3, " +
						"SUM (CASE WHEN seasonid = 4 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross4, " +
						"SUM (CASE WHEN seasonid = 5 THEN open_rate_gross * fcst_rns ELSE NULL END) open_rate_gross5, " +
						"SUM (CASE WHEN seasonid = 1 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross1," +
						"SUM (CASE WHEN seasonid = 2 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross2,  " +
						"SUM (CASE WHEN seasonid = 3 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross3, " +
						"SUM (CASE WHEN seasonid = 4 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross4, " +
						"SUM (CASE WHEN seasonid = 5 THEN target_rate_gross * fcst_rns ELSE NULL END) target_rate_gross5, " +
						"SUM (CASE WHEN seasonid = 1 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross1," +
						"SUM (CASE WHEN seasonid = 2 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross2,  " +
						"SUM (CASE WHEN seasonid = 3 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross3, " +
						"SUM (CASE WHEN seasonid = 4 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross4, " +
						"SUM (CASE WHEN seasonid = 5 THEN floor_rate_gross * fcst_rns ELSE NULL END) floor_rate_gross5, " +
						"SUM (CASE WHEN seasonid = 1 THEN pct_annual_rn ELSE NULL END) pct_annual_rn1, " +
						"SUM (CASE WHEN seasonid = 2 THEN pct_annual_rn ELSE NULL END) pct_annual_rn2, " +
						"SUM (CASE WHEN seasonid = 3 THEN pct_annual_rn ELSE NULL END) pct_annual_rn3," +
						"SUM (CASE WHEN seasonid = 4 THEN pct_annual_rn ELSE NULL END) pct_annual_rn4," +
						"SUM (CASE WHEN seasonid = 5 THEN pct_annual_rn ELSE NULL END) pct_annual_rn5," +
						"SUM (CASE WHEN seasonid = 1 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns1," +
						"SUM (CASE WHEN seasonid = 2 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns2, " +
						"SUM (CASE WHEN seasonid = 3 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns3, " +
						"SUM (CASE WHEN seasonid = 4 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns4, " +
						"SUM (CASE WHEN seasonid = 5 THEN prevyear_fcst_rns ELSE NULL END) prevyear_fcst_rns5, " +
						"SUM (CASE WHEN seasonid = 1 THEN fcst_rns ELSE NULL END) fcst_rns1, " +
						"SUM (CASE WHEN seasonid = 2 THEN fcst_rns ELSE NULL END) fcst_rns2,  " +
						"SUM (CASE WHEN seasonid = 3 THEN fcst_rns ELSE NULL END) fcst_rns3, " +
						"SUM (CASE WHEN seasonid = 4 THEN fcst_rns ELSE NULL END) fcst_rns4, " +
						"SUM (CASE WHEN seasonid = 5 THEN fcst_rns ELSE NULL END) fcst_rns5 " +
				"FROM (SELECT ss.scpt_accountid, ss.seasonid,sc.scpt_commratesid,sc.roompoolid, sc.lengthofstayid, sc.prevyear_rate_gross, " +
				"sc.pct_antc_gross_chg, sc.open_rate_gross, sc.target_rate_gross, sc.floor_rate_gross, sc.pct_annual_rn," +
		        "mfpproc.pkg_scpt_rpe.fn_getprevyearfyratenet (sd.prevyear_fy_fcst_rate_net_vol, sd.prevyear_fy_fcst_rate_net) prevyear_fy_fcst_rate_net," +
				"sd.total_multiplier,ROUND (mfpproc.pkg_scpt_rpe.fn_getprevyearfy_fcst (ss.prevyear_fy_fcst_vol, sd.prevyear_fy_fcst) * (sc.pct_annual_rn / 100)) prevyear_fcst_rns, " +
						"ROUND (mfpproc.pkg_scpt_rpe.fn_getfy_fcst (prevyear_fy_fcst_vol, prevyear_fy_fcst, ss.chg_rn_from_ty_pct, fy_fcst_vol) * (sc.pct_annual_rn / 100)) fcst_rns, " +
						"ss.RPP_SETUP_PRIMARY,ss.RPP_SETUP_SECONDARY,ss.RPP_SETUP_TERITARY,ss.RPP_SETUP_QUATERNARY " +
				"FROM mfpdbo.scpt_commrates sc,  mfpdbo.scpt_detail sd, (SELECT s.seasonid, sa.scpt_accountid, sa.prevyear_fy_fcst_vol, " +
						"sa.fy_fcst_vol,sa.chg_rn_from_ty_pct,setup.RPP_SETUP_PRIMARY,setup.RPP_SETUP_SECONDARY,setup.RPP_SETUP_TERITARY,"
						+ "setup.RPP_SETUP_QUATERNARY FROM mfpdbo.hotelrfp hr,mfpdbo.season s, mfpdbo.scpt_account sa,mfpdbo.scptsetupnew setup WHERE hr.hotelid = ?68  " +
						"AND hr.period = ?69 and sa.scpt_accountid=?70 AND hr.hotelrfpid = s.hotelrfpid AND sa.hotelid = hr.hotelid  AND sa.period = hr.period AND sa.hotelid = setup.hotelid AND sa.period = setup.period ) ss " +
				"WHERE sc.scpt_accountid = ss.scpt_accountid AND sc.seasonid = ss.seasonid AND sc.scpt_accountid = sd.scpt_accountid " +
						" and sc.roompoolid in  (select roomtypeid  from mfpdbo.scpt_roomtype_ref where roomtypeid != 5) ) GROUP BY scpt_accountid,prevyear_fy_fcst_rate_net,total_multiplier,roompoolid ) srates,mfpdbo.scptsetupnew setup " +
				"WHERE a.scpt_accountid = sc.scpt_accountid(+) AND a.roomtypeid = sc.roompoolid(+)  AND sc.scpt_breaktypeid = sbr.scpt_breaktypeid(+)  " +
				"AND sc.scpt_internettypeid = sir.scpt_internettypeid(+)  AND a.scpt_accountid = srates.scpt_accountid(+)   and a.scpt_accountid=?71 " +
				"AND roomtypeid = 5  and setup.hotelid=?72 and setup.period =?73 ORDER BY scpt_accountid, roomtypeid, tiernumber";			
		       }
		
		
	
		Query q = em.createNativeQuery(querystring, SCPTCommRates.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, hotelid);
		q.setParameter(4, period);
		q.setParameter(5, hotelid);
		q.setParameter(6, period);
		q.setParameter(7, scpt_accountid);
		q.setParameter(8, scpt_accountid);
		q.setParameter(9, hotelid);
		q.setParameter(10, period);
		q.setParameter(11, scpt_accountid);
		q.setParameter(12, hotelid);
		q.setParameter(13, period);
		q.setParameter(14, scpt_accountid);
		q.setParameter(15, scpt_accountid);
		q.setParameter(16, hotelid);
		q.setParameter(17, period);
		q.setParameter(18, hotelid);
		q.setParameter(19, period);
		q.setParameter(20, hotelid);
		q.setParameter(21, period);
		q.setParameter(22, hotelid);
		q.setParameter(23, period);
		q.setParameter(24, hotelid);
		q.setParameter(25, period);
		q.setParameter(26, hotelid);
		q.setParameter(27, period);
		q.setParameter(28, hotelid);
		q.setParameter(29, scpt_accountid);
		q.setParameter(30, period);
		q.setParameter(31, period);
		q.setParameter(32, hotelid);
		q.setParameter(33, scpt_accountid);
		q.setParameter(34, period);
		q.setParameter(35, period);
		q.setParameter(36, hotelid);
		q.setParameter(37, scpt_accountid);
		q.setParameter(38, period);
		q.setParameter(39, period);
		q.setParameter(40, hotelid);
		q.setParameter(41, scpt_accountid);
		q.setParameter(42, period);
		q.setParameter(43, period);
		q.setParameter(44, hotelid);
		q.setParameter(45, period);		
		//INC000004743516 - SCPT Pricing tab Changes
		q.setParameter(46, hotelid);
		q.setParameter(47, period);
		q.setParameter(48, scpt_accountid);
		q.setParameter(49, hotelid);
		q.setParameter(50, period);
		q.setParameter(51, scpt_accountid);
		q.setParameter(52, hotelid);
		q.setParameter(53, period);
		q.setParameter(54, period);
		q.setParameter(55, scpt_accountid);
		q.setParameter(56, hotelid);
		q.setParameter(57, hotelid);
		q.setParameter(58, scpt_accountid);
		q.setParameter(59, period);
		q.setParameter(60, period);
		q.setParameter(61, hotelid);
		q.setParameter(62, scpt_accountid);
		q.setParameter(63, period);
		q.setParameter(64, period);
		q.setParameter(65, hotelid);
		q.setParameter(66, period);
		q.setParameter(67, scpt_accountid);
		q.setParameter(68, hotelid);
		q.setParameter(69, period);
		q.setParameter(70, scpt_accountid);
		q.setParameter(71, scpt_accountid);
		q.setParameter(72, hotelid);
		q.setParameter(73, period);
		
		//INC000004743516 - SCPT Pricing tab Changes
		@SuppressWarnings("unchecked")
		List<SCPTCommRates> scptcommrates = q.getResultList();		
		return scptcommrates;
	}
	public SCPTComm findSCPTComm(Long hotelid, Long period, Long scptaccountid) {
		String querystring = "SELECT scpt_accountid, scpt_detailid, accountname, accountsegment, hotelid, period, accountid, accountrecid, "
				+ " case when accountperiod=period then mfpproc.pkg_scpt_rpe.fn_getaccountstatus (accountrecid, hotelid) else null end accountstatus, mfpproc.fn_getsalesname (prevhotelrfpid, marshacode, prevaccountrecid) salesperson, "
				+ " CASE WHEN TO_CHAR (duedate, 'mm/dd/yyyy') = '12/31/9999' THEN 'TBD' WHEN TO_CHAR (duedate, 'mm/dd/yyyy') = '01/01/9999' THEN 'CBC Collection' ELSE TO_CHAR (duedate, 'Mon dd,yyyy') END duedate, "
				+ " est_acct_rate_net, "
				+ " mfpproc.pkg_scpt_rpe.fn_getprevyearfy_fcst (prevyear_fy_fcst_vol, prevyear_fy_fcst) prevyear_fy_fcst, "
				+ " mfpproc.pkg_scpt_rpe.fn_getfy_fcst (prevyear_fy_fcst_vol, prevyear_fy_fcst, chg_rn_from_ty_pct, fy_fcst_vol) fy_fcst, NVL (chg_rn_from_ty_pct, 0) chg_rn_from_ty_pct, "
				+ " mfpproc.pkg_scpt_rpe.fn_getprevyear_fcst_rate (prevyear_fy_fcst_rate, prevyear_fy_fcst_rate_net) prevyear_fy_fcst_rate_net, "
				+ " mfpproc.pkg_scpt_rpe.fn_getant_acct_rate_chg_ty (est_acct_rate_net, prevyear_fy_fcst_rate, prevyear_fy_fcst_rate_net) ant_acct_rate_chg_ty, comments, groupid "
				+ " FROM (SELECT scpt_accountid, scpt_detailid, accountname, accountsegment, hotelid, period, accountid, accountrecid, accountperiod, prevhotelrfpid, marshacode, "
				+ " prevaccountrecid, duedate, est_acct_rate_net, prevyear_fy_fcst_vol, fy_fcst_vol, prevyear_fy_fcst, chg_rn_from_ty_pct, prevyear_fy_fcst_rate, prevyear_fy_fcst_rate_net, comments , groupid, ROWNUM arow "
				+ " FROM (  SELECT sa.scpt_accountid, sd.scpt_detailid, mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname) accountname, "
				+ " mfpproc.pkg_scpt_rpe.fn_getaccountsegment (sa.accountid, a.accounttypedescription, sa.alt_segment) accountsegment, sa.hotelid, "
				+ " sa.period, sa.accountid, a.accountrecid, a.period accountperiod, lhr.hotelrfpid prevhotelrfpid, marshacode, la.accountrecid prevaccountrecid, duedate, "
				+ " sa.est_acct_rate_net, sa.prevyear_fy_fcst_vol, sa.fy_fcst_vol, sd.prevyear_fy_fcst, sa.chg_rn_from_ty_pct, sa.prevyear_fy_fcst_rate, sd.prevyear_fy_fcst_rate_net, comments, groupid "
				+ " FROM mfpdbo.scpt_detail sd, mfpdbo.scpt_account sa,  (SELECT accountid, accountname, a1.accounttype, CASE WHEN a1.period = ?1 THEN a1.accountrecid ELSE NULL END accountrecid, ar.accounttypedescription, "
				+ " a1.period, case when a1.period=?2 then p.duedate else null end duedate FROM mfpdbo.account a1, mfpdbo.accounttiertype_ref ar, "
				+ " mfpdbo.pricingperiod_accounts pa, mfpdbo.pricingperiod p WHERE     (a1.period, a1.accountid) IN (  SELECT MAX (a2.period) max_period, a2.accountid "
				+ " FROM mfpdbo.account a2 WHERE     ( (period <> ?3 AND a2.hotel_display = 'Y') OR period = ?4) AND accountpricingtype IN ('L', 'C') AND period IN (SELECT period "
				+ " FROM mfpdbo.period p WHERE p.hotelsview = 'Y' OR p.period = ?5) GROUP BY a2.accountid) AND a1.accounttype = ar.accounttype "
				+ " AND pa.accountrecid(+) = a1.accountrecid AND pa.pricingperiodid = p.pricingperiodid) a,  (SELECT *  FROM mfpdbo.hotelrfp hr "
				+ " WHERE hotelid = ?6 AND period = ?7) lhr,  (SELECT *  FROM mfpdbo.account a  WHERE period = ?8) la,  mfpdbo.hotel h "
				+ " WHERE     sa.scpt_accountid = sd.scpt_accountid  AND sa.accountid = a.accountid(+)   AND sa.hotelid = ?9  AND sa.period = ?10 "
				+ " AND lhr.hotelid(+) = sa.hotelid  AND h.hotelid = sa.hotelid  AND sa.accountid = la.accountid(+)  AND sa.isscaccount = 'Y' "
			    + " and sa.scpt_accountid = ?11 )) ";
			
			Query q = em.createNativeQuery(querystring, SCPTComm.class);
			Long prevperiod = period - 1;
			q.setParameter(1, period);
			q.setParameter(2, period);
			q.setParameter(3, period);
			q.setParameter(4, period);
			q.setParameter(5, period);
			q.setParameter(6, hotelid);
			q.setParameter(7, prevperiod);
			q.setParameter(8, prevperiod);
			q.setParameter(9, hotelid);
			q.setParameter(10, period);
			q.setParameter(11, scptaccountid);
			SCPTComm scptcomm =  (SCPTComm) q.getSingleResult();
			return scptcomm;

		
	}

	
	public List<SCPTAcctPricingDetail> findSCPTAcctPricingDetail(Long hotelid, Long period, String filterString, Long orderby, String groupid, Page page) {

		String querystring = " SELECT accountname, scpt_accountid, hotelid, groupid, accountsegment, salesmanager, bt_status, scpt_status, donotprice, lra, fcst_rns, "
		+" fcst_rns_amt_chg, fcst_rns_pct_chg, weightedrate,  weightedrate_pct_chg,     weightedrate_amt_chg,  weightedratenet,  weightedratenet_pct_chg,  " 
		+" weightedratenet_amt_chg, pct_prevrate_rcmd_max,  rcmd_min_rate_net, rcmd_max_rate_net, pct_antc_rcmd_min, pct_accrate_weighted_retail "
		+"  from ( SELECT accountname, scpt_accountid, hotelid, groupid, accountsegment, "
		+" salesmanager, bt_status, scpt_status,  donotprice, lra, fcst_rns, fcst_rns_amt_chg,  round(fcst_rns_pct_chg,2) fcst_rns_pct_chg, weightedrate, "
        +" round(weightedrate_pct_chg,2) weightedrate_pct_chg, weightedrate_amt_chg,  weightedratenet, round(weightedratenet_pct_chg,2) weightedratenet_pct_chg, "
        +" weightedratenet_amt_chg,  pct_prevrate_rcmd_max, rcmd_min_rate_net, rcmd_max_rate_net, pct_antc_rcmd_min, pct_accrate_weighted_retail, ";
		
		querystring += " row_number () over (order by ";
		switch (orderby.intValue()) {
		case 1:
			querystring += "  nvl(fcst_rns,0) desc, accountname ";
			break;
		case 2:
			querystring += " nvl(weightedrate,0) desc, accountname ";
			break;
		case 3:
			querystring += " accountname " ;  
			break;
		case 4:
			querystring += " accountsegment, accountname " ; 
			break;
		case 5:;
		querystring += " salesmanager, accountname "  ; 
			break;
		default:
			querystring += " accountname " ; 
			break;
		} 
		querystring += " ) arow from mfpdbo.scpt_acctpricingtotals where hotelid=?1 and period=?2 and groupid=?3 " ;
 		if (filterString != null && !filterString.trim().equals("")) {
			querystring += " and (upper(accountname)) like upper('" + StringUtility.replaceSingleQuotes(filterString) + "%') ";
		}
 		querystring += " ) ";
		
		
		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;
		querystring += "  where   arow>=" + startaccount + " and arow <=" + endaccount; 
         
		Query q = em.createNativeQuery(querystring, SCPTAcctPricingDetail.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, groupid);
		@SuppressWarnings("unchecked")
		List<SCPTAcctPricingDetail> scptacctpricingdtl = q.getResultList();
		return scptacctpricingdtl;
	}
	

	
	 
	public List<SCPTAcctPricingDetail> findSCPTAcctPricingTotal(Long hotelid, Long period, String groupid) {
		String querystring = " select sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)) fcst_rns ,  "                              
			 	 +" sum(  fcst_rns_amt_chg) fcst_rns_amt_chg,  "  
			  	 +" round(sum(fcst_rns_pct_chg),1) fcst_rns_pct_chg,  "    
				 +" round(sum(weightedrate * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))/sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)),2) weightedrate, "      
				 +" round( ( ( (sum(weightedrate * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) / sum( mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) - "
                 +"      ( sum(prevyear_weightedrate * prev_fcst_rns ) / sum(prev_fcst_rns) ) ),2) weightedrate_amt_chg,  "      
				 +" round( ( ( ( (sum(weightedrate *  mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) / sum( mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) - "
				 +"      ( sum(prevyear_weightedrate * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) / "
                 +"      ( sum(prevyear_weightedrate * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) * 100,1)  weightedrate_pct_chg, "   
				 +" round(sum(weightedratenet * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)) ,2) weightedratenet, "   
				 +" round( ( ( (sum(weightedratenet *  mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) / sum( mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) - "
                 +"      ( sum(prevyear_weightedrate_net * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) ,2)  weightedratenet_amt_chg, "            
				 +" round( ( ( ( (sum(weightedratenet *  mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) / sum( mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) - "
                 +"      ( sum(prevyear_weightedrate_net * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) / "
                 +"      ( sum(prevyear_weightedrate_net * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) * 100 ,1) weightedratenet_pct_chg, "   
				 +" round( ( ( ( ( sum(rcmd_max_rate_net *  mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) / sum( mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) ) ) - "
                 +"      ( sum(prevyear_weightedrate_net * prev_fcst_rns) / sum(prev_fcst_rns) ) ) / ( sum(prevyear_weightedrate_net * prev_fcst_rns ) / sum(prev_fcst_rns ) ) ) * 100 ) ,1)  pct_prevrate_rcmd_max, "   
				 +" round(sum(rcmd_min_rate_net * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) )/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)),2) rcmd_min_rate_net, "   
				 +" round(sum(rcmd_max_rate_net * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)),2) rcmd_max_rate_net,  "  
				 +" round (  (   (  sum(weightedratenet * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)) - "
                 +"       sum(rcmd_min_rate_net * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) )/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))  ) / "
                 +"      (  sum(rcmd_min_rate_net * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns) )/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns)) ) )*100,1 )  pct_antc_rcmd_min, "       
				 +"  round((sum(pct_accrate_weighted_retail * mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))/ sum(mfpproc.pkg_scpt_rpe.fn_getdonotprice_val(donotprice, fcst_rns))),1) pct_accrate_weighted_retail  " 
		         +" from mfpdbo.scpt_acctpricingtotals where hotelid = ?1 and period = ?2 and groupid = ?3 ";
          
		Query q = em.createNativeQuery(querystring, SCPTAcctPricingDetail.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, groupid);
		@SuppressWarnings("unchecked")		
		List<SCPTAcctPricingDetail> scptacctpricingdtl = q.getResultList();
		return scptacctpricingdtl;
	}
	

	public Long findTotalAcctPricingDtl(Long hotelid, Long period){
		
		String querystring = "SELECT  COUNT(*) FROM mfpdbo.scpt_account WHERE hotelid = ?1 AND period = ?2 "
				+ " AND ISSCACCOUNT='Y' AND scpt_accountid NOT IN "
				+ " (SELECT  scpt_accountid FROM mfpdbo.scpt_acctpricingtotals WHERE hotelid = ?3 AND PERIOD = ?4)";
		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);	
		q.setParameter(3, hotelid);
		q.setParameter(4, period);	
		Long totalCount = (Long) q.getSingleResult();
		return totalCount;
	}
	
	public Long findSCPTNonGroupAccount(Long hotelid, Long period){
		
		String querystring = " SELECT COUNT(*) FROM mfpdbo.scpt_account WHERE groupid is null and hotelid = ?1  and period = ?2";
		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);	
		Long totalCount = (Long) q.getSingleResult();
		return totalCount;
	}
	
	public void updateSCPTAcctPricingDtl(Long hotelid, Long period, Long scpt_accountid){
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updateacctpricingdetail (?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scpt_accountid);
		q.executeUpdate();		
	}
	
	
	public void updateSCPTGroupAccount(Long hotelid, Long period){
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_group_migration (?,?,'U'); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);		
		q.executeUpdate();		
	}
	
	public Long findTotalComm(Long hotelid, Long period, String filterString, String groupid) {
				
		String querystring = "   SELECT COUNT (*)    FROM mfpdbo.scpt_detail sd, mfpdbo.scpt_account sa, mfpdbo.account a  WHERE sa.scpt_accountid = sd.scpt_accountid AND sa.hotelid = ?1 AND sa.period = ?2 AND sa.groupid = ?3 AND sa.isscaccount = 'Y' AND sa.accountid = a.accountid(+) AND sa.period = a.period(+) ";
		if (filterString != null && !filterString.trim().equals("")) {
			querystring += " and (upper(mfpproc.pkg_scpt_rpe.fn_getaccountname (sa.accountid, a.accountname, sa.accountname)) like upper('" + StringUtility.replaceSingleQuotes(filterString) + "%')) ";
		}		

		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, groupid);
		Long totalCount = (Long) q.getSingleResult();
		return totalCount;
	}

	public List<SCPTStatusReason> findSCPTStatusReason() {
		String querystring = "select scpt_accountreasonid, scpt_accountreason from mfpdbo.scpt_accountreason_ref order by scpt_accountreasonid ";

		Query q = em.createNativeQuery(querystring, SCPTStatusReason.class);
		@SuppressWarnings("unchecked")
		List<SCPTStatusReason> scptcomm = q.getResultList();
		return scptcomm;
	}

	public void updateSCPTStatus(Long hotelid, Long period, SCPTStatus status) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatestatus(?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, status.getScpt_accountid());
		q.setParameter(4, status.getIsscaccount());
		q.executeUpdate();
	}
	
	public void updateSCPTAcctPricingChg(Long hotelid, SCPTAcctPricingChange acctpricing) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updateaccountpricing (?,?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, acctpricing.getScpt_accountid());
		q.setParameter(3, acctpricing.getDonotprice());
		q.setParameter(4, acctpricing.getStatus());
		q.setParameter(5, acctpricing.getAlt_segment());
		q.setParameter(6, acctpricing.getMoveoutofprimary());
		q.setParameter(7, acctpricing.getMovetoprimary());
		q.executeUpdate();
	}

	public Long updateSCPTAdd(Long hotelid, Long period, SCPTAddAccount addAccount) {
		Long rvalue=0L;
		String querystring="select count(*) from mfpdbo.scpt_account where accountname =? and hotelid=? and period=? and alt_segment=case when ?='G' then 'GPP'  when ?='L' then 'Local' else null end";
		Query q1 = em.createNativeQuery(querystring, Long.class);
		q1.setParameter(1, addAccount.getAccountname());
		q1.setParameter(2, hotelid);
		q1.setParameter(3, period);
		q1.setParameter(4, addAccount.getAccountsegment());
		q1.setParameter(5, addAccount.getAccountsegment());
		Long totalCount = (Long) q1.getSingleResult();
		if (totalCount>0) {
			rvalue=1L;
			return rvalue;
		}

		if (totalCount==0L) {
			Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_addaccount(?,?,?,?,?,?,?,?,?); end;");
			q.setParameter(1, hotelid);
			q.setParameter(2, period);
			q.setParameter(3, addAccount.getAccountid());
			q.setParameter(4, addAccount.getAccountname());
			q.setParameter(5, addAccount.getAccountsegment());
			q.setParameter(6, addAccount.getPrevfcrn());
			q.setParameter(7, addAccount.getPrevfcadr());
			q.setParameter(8, addAccount.getFcrn());
			q.setParameter(9, addAccount.getFcadr());
			q.executeUpdate();
		}
		return rvalue;
	}

	public List<SCPTBreakfast> findSCPTBreakfast() {
		String querystring = "SELECT a.scpt_breaktypeid, a.breakfastname FROM mfpdbo.scpt_breaktype_ref a order by breakfastseq ";

		Query q = em.createNativeQuery(querystring, SCPTBreakfast.class);
		@SuppressWarnings("unchecked")
		List<SCPTBreakfast> scptcomm = q.getResultList();
		return scptcomm;
	}

	public List<SCPTInternet> findSCPTInternet() {
		String querystring = "  SELECT a.scpt_internettypeid, a.internetname     FROM mfpdbo.scpt_internettype_ref a ORDER BY a.internetseq ";

		Query q = em.createNativeQuery(querystring, SCPTInternet.class);
		@SuppressWarnings("unchecked")
		List<SCPTInternet> scptcomm = q.getResultList();
		return scptcomm;
	}
	
	public List<SCPTAccountGroup> findSCPTAccountGroup() {
		String querystring = " select groupid, group_desc  from mfpdbo.scpt_acctgroup_ref order by groupid ";
		
		Query q = em.createNativeQuery(querystring, SCPTAccountGroup.class);
		@SuppressWarnings("unchecked")
		List<SCPTAccountGroup> scptaccountgroup = q.getResultList();
		return scptaccountgroup;
	}

	public void updateSCPTDetail(Long hotelid, Long period, Long scpt_accountid, SCPTDetail detail) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatedetail(?,?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scpt_accountid);
		
		q.executeUpdate();
	}

	public void updateSCPTHotelComm(Long hotelid, Long period, Long scpt_accountid, SCPTCommRateAmenities rateAmen, User user) {
	try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
								
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatehotelcomm(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scpt_accountid);
		q.setParameter(4, rateAmen.getRoompoolid());
		q.setParameter(5, rateAmen.getTierid());
		q.setParameter(6, rateAmen.getScpt_breaktypeid());
		q.setParameter(7, rateAmen.getScpt_internettypeid());
		q.setParameter(8, rateAmen.getTranslocaloffice());
		q.setParameter(9, rateAmen.getParking());
		q.setParameter(10, rateAmen.getPctroomcosts());
		q.setParameter(11, rateAmen.getPctfbcosts());
		q.setParameter(12, rateAmen.getFixedcosts());
		q.setParameter(13, rateAmen.getDonotprice());
		q.setParameter(14, rateAmen.getStatus());
		q.setParameter(15, rateAmen.getLra());
		q.executeUpdate();
		} finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}
	
	@Override
	public void updateSCPTFullYrRnts(Long hotelid, Long period,Long scpt_accountid, Long prevyear_fy_fcst, Long fy_fcst, Double chg_rn_from_ty_pct ) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatehotelFullYrRnts(?,?,?,?,?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scpt_accountid);
		q.setParameter(4, prevyear_fy_fcst);
		q.setParameter(5, fy_fcst);
		q.setParameter(6, chg_rn_from_ty_pct);		
		q.executeUpdate();
		
	}
	
	public void updateSCPTAcctComments(Long scpt_accountid, String comments, String commentschg ) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptacctcomments(?,?,?); end;");

		q.setParameter(1, scpt_accountid);
		q.setParameter(2, comments);
		q.setParameter(3, commentschg);		
		q.executeUpdate();
		
	}

	public void updateSCPTHotelCommRates(Long hotelid, Long period, Long scpt_accountid, SCPTCommRateseason rateSeason, User user) {
	try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatehotelcommseasons(?,?,?,?,?,?, ?,?,?,?,?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scpt_accountid);
		q.setParameter(4, rateSeason.getRoompoolid());
		q.setParameter(5, rateSeason.getSeasonid());
		q.setParameter(6, rateSeason.getTier());
		q.setParameter(7, rateSeason.getPrevyear_rate_gross());
		q.setParameter(8, rateSeason.getOpen_rate_gross());
		q.setParameter(9, rateSeason.getTarget_rate_gross());
		q.setParameter(10, rateSeason.getFloor_rate_gross());
		q.setParameter(11, rateSeason.getPct_antc_gross_chg());
		q.setParameter(12, rateSeason.getPct_annual_rn());
		q.executeUpdate();
		} finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public void updateSCPTHotelDetail(Long hotelid, Long period, SCPTHotel hotelDetail) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatehoteldetail(?,?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, hotelDetail.getShowrmnights());
		q.executeUpdate();
	}

	public void updateSCPTPopulatePreviousYear(Long hotelid, Long period) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_populateallpreviousyear(?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.executeUpdate();
	}

	public void updateSCPTPopulateGrossRates(Long hotelid, Long period) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt.sp_defaultgrossseasons_to_net(?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.executeUpdate();
	}

	public void updateSCPTCopyTotalComments(Long hotelid, Long period) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_copytotalcommentstorpone(?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.executeUpdate();
	}

	public void updateSCPTCopyTotalAmenities(Long hotelid, Long period) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_copytotalamenitiesstorpone(?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.executeUpdate();
	}
	@Override
	public String findAnticipatedRateSet(long hotelid, long period) {
		String querystring = " SELECT show_yoy_comp FROM mfpdbo.scptsetupnew where hotelid =?1 and period=?2 ";		
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		String scptcomm = (String) q.getSingleResult();
	
		return scptcomm;
    }	 

@Override
	public SCPTCommSetupInfo fetchSetupInfo(long hotelid, long period) {
		String querystring = "select s.rpp_setup_primary,s.rpp_setup_secondary,s.rpp_setup_teritary, s.rpp_setup_total," 
			+" s.tier_price_tier1,s.tier_price_tier2,s.tier_price_tier3, s.tier_price_tier4, s.tier_price_total, brkf_fcost, internet_fcost, transport_fcost, parking_fcost, "
			+" show_yoy_comp,  yoy_retailrate_chg from mfpdbo.scptsetupnew s where hotelid = ?1 and period=?2";

		Query q = em.createNativeQuery(querystring, SCPTCommSetupInfo.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<SCPTCommSetupInfo> scptSetUpGenInfo = q.getResultList();		
		return scptSetUpGenInfo.get(0);
	}
	
	public String getBrandname(Long affiliationid) {
		String queryString = "SELECT  a.affiliationname FROM mfpdbo.hotelaffiliation a WHERE (a.parentid = 990) and a.affiliationid =?1";

		Query q = em.createNativeQuery(queryString, String.class);

		q.setParameter(1, affiliationid);
		String brand = (String) q.getSingleResult();
		return brand;

	}

  @Override
	public String getIsLocked(long hotelid, long period) {
		String queryString = "select nvl(islocked,'N') from mfpdbo.scptsetupnew where hotelid=?1 and period=?2";
		try
		{
		Query q = em.createNativeQuery(queryString, String.class);

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<String> islockedList =  q.getResultList();
		if(islockedList != null && islockedList.size() > 0){
			return islockedList.get(0);
		}
		else{
			return null;
		}
		
		}
		catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public String getLastUpdatedUser(long hotelid, long period) {
		String queryString = "select decode(last_updated_by, null, 'N', b.cn_firstname ||' ' || b.cn_lastname)  from mfpdbo.scptsetupnew a, mfpdbo.ds_user b " +
				" where a.last_updated_by = b.eid(+) and hotelid=?1 and period=?2";
		try
		{
			
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<String> lastUpdatedList =  q.getResultList();
		if(lastUpdatedList != null && lastUpdatedList.size() > 0){
			return lastUpdatedList.get(0);
		}
		else{
			return null;
		}
		}
		catch (NoResultException e) {
			return null;
		}
	}
	

	@Override
	public SCPTSetUpGenInfo getSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay) {
		String queryString = "select hotelid,period,rpp_setup_primary as rpp_setup1, rpp_setup_secondary as rpp_setup2, rpp_setup_teritary as rpp_setup3, " +
		" rpp_setup_total,hotel_vat,show_yoy_comp ";

		if (isbrandextendedstay != null && isbrandextendedstay.equals("Y")) {
			queryString +=" ,tier_price_tier1,tier_price_tier2,tier_price_tier3,tier_price_tier4,tier_price_total";
		}
		queryString +=" from mfpdbo.scptsetupgeninfo where hotelid=?1 and period=?2";
		try
		{
			Query q = em.createNativeQuery(queryString, SCPTSetUpGenInfo.class);

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		SCPTSetUpGenInfo scptSetUpGenInfo = (SCPTSetUpGenInfo) q.getSingleResult();
		return scptSetUpGenInfo;
		}
		catch (NoResultException e) {
			return null;
		}
		
	}

	@Override
	public List<SCPTSetUpRetailRate> getSCPTSetUpRetailRate(long hotelid, long period,List<Season> seasonList) {
		String queryString =" select count(*) from mfpdbo.scptsetup_retailrate where hotelid =?1 and period=?2 ";
		try
		{
		Query q = em.createNativeQuery(queryString, Long.class); 
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<Long> hotelPresent = q.getResultList();
		long hotelPresentSize = hotelPresent.get(0).longValue();
		if(hotelPresentSize ==0){
				for (int i = 0; i < seasonList.size(); i++) {
				if (seasonList.get(i) != null) {
		Query insertQuery = em.createNativeQuery("begin Insert into mfpdbo.scptsetup_retailrate(hotelid, period,seasonid) values (?,?,?); commit; end; ");
			insertQuery.setParameter(1, hotelid);
			insertQuery.setParameter(2, period);
			insertQuery.setParameter(3, seasonList.get(i).getSeasonid());
			insertQuery.executeUpdate();
				}
			}
		}
		else if(hotelPresentSize != seasonList.size())
		{
			if(seasonList.size() > hotelPresentSize){
				for(int i = seasonList.size() ; i >  hotelPresentSize ; i-- ){
					Query insertQuery = em.createNativeQuery("begin Insert into mfpdbo.scptsetup_retailrate(hotelid, period,seasonid) values (?,?,?); commit; end; ");
					insertQuery.setParameter(1, hotelid);
					insertQuery.setParameter(2, period);
					insertQuery.setParameter(3, i);
					insertQuery.executeUpdate();
				}			
				
			}
			if(seasonList.size() < hotelPresentSize){
				for(int i = (int) hotelPresentSize ; i >  seasonList.size() ; i-- ){
					Query deleteQuery = em.createNativeQuery("begin delete from mfpdbo.scptsetup_retailrate where hotelid=?1 and period=?2 and seasonid=?3; commit; end;");
					deleteQuery.setParameter(1, hotelid);
					deleteQuery.setParameter(2, period);
					deleteQuery.setParameter(3, i);
					deleteQuery.executeUpdate();
				}			
				
			}
			Query deleteWeightedRateQuery = em.createNativeQuery("begin delete from mfpdbo.scptsetup_wtdretailrate where hotelid=?1 and period=?2; commit; end; ");
			deleteWeightedRateQuery.setParameter(1, hotelid);
			deleteWeightedRateQuery.setParameter(2, period);
			deleteWeightedRateQuery.executeUpdate();
		}
			
		String selectString =" select hotelid, period, seasonid, prev_ret_rate, curr_ret_rate " +
		" from mfpdbo.scptsetup_retailrate where hotelid=?1 and period=?2 order by seasonid";
		
		Query retailQuery = em.createNativeQuery(selectString, SCPTSetUpRetailRate.class);

		retailQuery.setParameter(1, hotelid);
		retailQuery.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<SCPTSetUpRetailRate> scptSetUpRetailRate =retailQuery.getResultList();
		
		return scptSetUpRetailRate;
		}
		catch (NoResultException e) {
			return null;
		}
	}
	@Override
	public SCPTSetUpAmenities getSCPTSetUpAmenities(long hotelid, long period) {
		long prevperiod = period -1;
		long twoPrevperiod = period -2;
		String queryString ="select hotelid,period,brkf_type,internet_type,transport," +
				"parking,brkf_fcost,internet_fcost,transport_fcost,parking_fcost,vatpercentroomrate,vatpercentrfoodandbeverage,"+
				" mfpproc.pkg_scpt_rpe.fn_getHistoricalVat("+hotelid+","+prevperiod+") histPrevYearVat,"+
				" mfpproc.pkg_scpt_rpe.fn_getHistoricalVat("+hotelid+","+twoPrevperiod+") histTwoPrevYearVat";
		queryString +=" from mfpdbo.scptsetupamenities where hotelid=?1 and period=?2";
		
		try
		{
			Query q = em.createNativeQuery(queryString, SCPTSetUpAmenities.class);

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
	
		SCPTSetUpAmenities scptSetUpAmenities = (SCPTSetUpAmenities) q.getSingleResult();
		return scptSetUpAmenities;
		}
		catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public SCPTSetUpWtdRetailRate getSCPTSetUpWtdRetailRate(long hotelid,
			long period) {
				String queryString ="select hotelid, period, yoy_retailrate_chg, wtd_prev_retail_rate, wtd_retail_rate ";
		queryString +=" from mfpdbo.scptsetup_wtdretailrate where hotelid=?1 and period=?2";
		try
		{
			Query q = em.createNativeQuery(queryString, SCPTSetUpWtdRetailRate.class);
		
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate = (SCPTSetUpWtdRetailRate) q.getSingleResult();
		return scptSetUpWtdRetailRate;
		}
		catch (NoResultException e) {
			return null;
		}
	}
	
	
	public String getSCPTYoYSetup(long hotelid, long period, long hotelrfpid)
	{
		String querystring = " select case when  "
                        + " (select case when( (select count(*) from mfpdbo.season where hotelrfpid = ?1 )=(select count(*) from mfpdbo.scptsetup_retailrate where hotelid= ?2  and period= ?3  ) )  "
                        + " 		then 'Y' else 'N' end case from dual ) = 'Y' AND "
                        + " (select case when ( select count(*) from  mfpdbo.scptsetup_wtdretailrate where hotelid = ?4 and period = ?5) > 0 "
                        + "			then 'Y' else 'N' end case from dual ) = 'Y' AND "
                        + " (select case when (select SETUPTAB_LAST_UPDATED from  mfpdbo.scptsetupnew  where hotelid= ?6 and period= ?7) is not null "
                        + "         then 'Y' else 'N' end case from dual) = 'Y' "
                        + " then 'Y' else 'N' end case from dual ";
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotelid);
		q.setParameter(3, period);
		q.setParameter(4, hotelid);
		q.setParameter(5, period);
		q.setParameter(6, hotelid);
		q.setParameter(7, period);
		String yoyretailsetup = (String) q.getSingleResult();
		return yoyretailsetup;
	}
	
	
	public Double getYoYRetailChange(long hotelid, long period)
	{
//		String querystring = " SELECT nvl(yoy_retailrate_chg,0) yoy_retailrate_chg FROM mfpdbo.scptsetupnew where hotelid =?1 and period=?2 ";
		String querystring = "select nvl((case when snew.yoy_retailrate_chg is null then swtd.yoy_retailrate_chg else snew.yoy_retailrate_chg end),0) yoy_retailrate_chg"
		+ " from mfpdbo.scptsetupnew snew, MFPDBO.scptsetup_wtdretailrate swtd"
		+ " where snew.hotelid=?1" 
		+ " and snew.period=?2"
		+ " and swtd.hotelid=snew.hotelid"
		+ " and swtd.period=snew.period";
		Query q = em.createNativeQuery(querystring, Double.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		Double yoyretailchange = (Double) q.getSingleResult();
		return yoyretailchange;
	}

	@Override
	public SCPTSetUpThresholds getSCPTSetUpThresholds(long hotelid, long period) {
		String queryString ="select hotelid,period,thrs_rmnt_low,thrs_rmnt_mid," +
				"thrs_perct_rtl_low,thrs_perct_rtl_mid,thrs_curry_rtl_low,thrs_curry_rtl_mid,thrs_percentage";
		queryString +=" from mfpdbo.scptsetupthresholds where hotelid=?1 and period=?2";
		try
		{
			Query q = em.createNativeQuery(queryString, SCPTSetUpThresholds.class);

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		SCPTSetUpThresholds scptSetUpThresholds = (SCPTSetUpThresholds) q.getSingleResult();
		return scptSetUpThresholds;
		}
		catch (NoResultException e) {
			return null;
		}
	}
	
	@Override
	public SCPTSetUpBudgetAndForecastData getSCPTSetUpBudgetAndForecastData(
			long hotelid, long period) {
		String queryString ="select hotelid, period, prev_yr_rn, prev_yr_adr, prev_yr_revenue,"
				+" curr_yr_rn, curr_yr_adr, curr_yr_revenue, curr_yr_fc_rn, curr_yr_fc_adr, curr_yr_fc_revenue"
					+" from mfpdbo.scpt_fc_budget_data where hotelid=?1 and period=?2 ";
try
{
	Query q = em.createNativeQuery(queryString, SCPTSetUpBudgetAndForecastData.class);

q.setParameter(1, hotelid);
q.setParameter(2, period);
SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData = (SCPTSetUpBudgetAndForecastData) q.getSingleResult();
return scptSetUpBudgetAndForecastData;
}
catch (NoResultException e) {
	return null;
}
	}

	@Override
	public void updateSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay, String isLocked, SCPTSetUpGenInfo scptSetUpGenInfo, User user) {
			try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupgeninfo(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, isbrandextendedstay);
		q.setParameter(4, isLocked);
		q.setParameter(5, scptSetUpGenInfo.getRpp_setup1());
		q.setParameter(6, scptSetUpGenInfo.getRpp_setup2());
		q.setParameter(7, scptSetUpGenInfo.getRpp_setup3());
		//q.setParameter(8, scptSetUpGenInfo.getRpp_setup_quaternary());
		q.setParameter(8, scptSetUpGenInfo.getRpp_setup_total());
		q.setParameter(9, scptSetUpGenInfo.getTier_price_tier1());
		q.setParameter(10, scptSetUpGenInfo.getTier_price_tier2());
		q.setParameter(11, scptSetUpGenInfo.getTier_price_tier3());
		q.setParameter(12, scptSetUpGenInfo.getTier_price_tier4());
		q.setParameter(13, scptSetUpGenInfo.getTier_price_total());
		q.setParameter(14, scptSetUpGenInfo.getHotel_vat());
		q.setParameter(15, scptSetUpGenInfo.getShow_yoy_comp());



		q.executeUpdate();
		} finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		
	}

	@Override
	public void updateSCPTSetupRetailRate(long hotelid, long period,List<SCPTSetUpRetailRate> scptSetUpRetailRate, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				stmt = con.prepareCall("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupretailrate(?, ?,?, ?, ?); end;");
				try {
					for (int i = 0; i < scptSetUpRetailRate.size(); i++) {
						if (scptSetUpRetailRate.get(i) != null) {
							stmt.setLong(1, hotelid);
							stmt.setLong(2, period);
							stmt.setDouble(3, scptSetUpRetailRate.get(i).getSeasonid());
							if (scptSetUpRetailRate.get(i).getPrev_ret_rate() == null)
								stmt.setNull(4, Types.NUMERIC);
							else
								stmt.setDouble(4, scptSetUpRetailRate.get(i).getPrev_ret_rate());
							if (scptSetUpRetailRate.get(i).getCurr_ret_rate() == null)
								stmt.setNull(5, Types.NUMERIC);
							else
								stmt.setDouble(5, scptSetUpRetailRate.get(i).getCurr_ret_rate());
							stmt.execute();
							
						}
					}

				}
				finally {
					stmt.close();
				}
			} finally {
			    audit.deleteAuditUser(con);
				con.close();

			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		
	}

	@Override
	public void updateSCPTSetUpAmenities(long hotelid, long period,
			SCPTSetUpAmenities scptSetUpAmenities, User user) {
			try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupamenities(?,?,?,?,?,?,?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scptSetUpAmenities.getBrkf_type());
		q.setParameter(4, scptSetUpAmenities.getInternet_type());
		q.setParameter(5, scptSetUpAmenities.getTransport());
		q.setParameter(6, scptSetUpAmenities.getParking());
		q.setParameter(7, scptSetUpAmenities.getBrkf_fcost());
		q.setParameter(8, scptSetUpAmenities.getInternet_fcost());
		q.setParameter(9, scptSetUpAmenities.getTransport_fcost());
		q.setParameter(10, scptSetUpAmenities.getParking_fcost());
		q.setParameter(11, scptSetUpAmenities.getVatpercentroomrate());
		q.setParameter(12, scptSetUpAmenities.getVatpercentrfoodandbeverage());
		q.executeUpdate();
		} finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		
	}

	
	
	@Override
	public void updateSCPTSetUpThresholds(long hotelid, long period,
			SCPTSetUpThresholds scptSetUpThresholds, User user) {
			try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
		
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupthresholds(?,?,?,?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scptSetUpThresholds.getThrs_rmnt_low());
		q.setParameter(4, scptSetUpThresholds.getThrs_rmnt_mid());
		q.setParameter(5, scptSetUpThresholds.getThrs_perct_rtl_low());
		q.setParameter(6, scptSetUpThresholds.getThrs_perct_rtl_mid());
		q.setParameter(7, scptSetUpThresholds.getThrs_curry_rtl_low());
		q.setParameter(8, scptSetUpThresholds.getThrs_curry_rtl_mid());
		q.setParameter(9, scptSetUpThresholds.getThrs_percentage());
		q.executeUpdate();
		} finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}
	@Override
	public void updateSCPTSetUpWtdRetailRate(long hotelid, long period,
			SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupwtdrate(?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scptSetUpWtdRetailRate.getWtd_prev_retail_rate());
		q.setParameter(4, scptSetUpWtdRetailRate.getWtd_retail_rate());
		q.setParameter(5, scptSetUpWtdRetailRate.getYoy_retailrate_chg());
		q.executeUpdate();

	}
	@Override
	public void updateSCPTSetUpBudgetAndForecastData(long hotelid, long period,
			SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptsetupscdata(?,?,?,?,?,?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, scptSetUpBudgetAndForecastData.getPrev_yr_rn());
		q.setParameter(4, scptSetUpBudgetAndForecastData.getPrev_yr_adr());
		q.setParameter(5, scptSetUpBudgetAndForecastData.getPrev_yr_revenue());
		q.setParameter(6, scptSetUpBudgetAndForecastData.getCurr_yr_rn());
		q.setParameter(7, scptSetUpBudgetAndForecastData.getCurr_yr_adr());
		q.setParameter(8, scptSetUpBudgetAndForecastData.getCurr_yr_revenue());
		q.setParameter(9, scptSetUpBudgetAndForecastData.getCurr_yr_fc_rn());
		q.setParameter(10, scptSetUpBudgetAndForecastData.getCurr_yr_fc_adr());
		q.setParameter(11, scptSetUpBudgetAndForecastData.getCurr_yr_fc_revenue());
		q.executeUpdate();
	}
	
	

	@Override
	public void updateSCPTPricing(long hotelid, long period, String username, String isLocked,String checkUpdateSCPT, 
			   User user, Long scpt_accountid, String donotprice) {
	try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatescptpricing(?,?,?,?,?,?); end;");
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.setParameter(3, username);
		q.setParameter(4, isLocked);
		q.setParameter(5, checkUpdateSCPT);
		q.setParameter(6, scpt_accountid);
		
		q.executeUpdate();
		 } finally {
				audit.deleteAuditUser(con);
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		
	}

	@Override
	public void createScptSetupIfHotelNotPresent(long hotelid, long period) {
		String querystring="select count(*) from mfpdbo.scptsetupnew where hotelid =?1 and period=?2 ";	
		Query q = em.createNativeQuery(querystring, Long.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<Long> hotelPresent = q.getResultList();
		if(hotelPresent.get(0).longValue() ==0){
			Query insertQuery = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_createscptsetup(?,?); end; ");
			insertQuery.setParameter(1, hotelid);
			insertQuery.setParameter(2, period);		
			insertQuery.executeUpdate();
		}
		
	}

	@Override
	public void updateLastChangedDate(long hotelid, long period) {
		Query insertQuery = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatepricingdatestamp(?,?); end;");
		insertQuery.setParameter(1, hotelid);
		insertQuery.setParameter(2, period);
		insertQuery.executeUpdate();
		
	}

	@Override
	public String fetchPricingLastUpdated(long hotelid, long period) {
		String querystring = " SELECT nvl(to_char(s.pricing_last_updated,'mm/dd/yyyy hh:mi am'),' ') pricing_last_updated FROM mfpdbo.scptsetupnew s where hotelid =?1 and period=?2 ";		
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		String lastupdated = (String) q.getSingleResult();	
		return lastupdated;
	}

	@Override
	public void updateSCPTPreviousYearGPPRates(long hotelid, long period)
	{
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_populateGPPRates(?,?); end;");

		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		q.executeUpdate();
	}

	@Override
	public String fetchSetupTabLastUpdated(long hotelid, long period) {
		String querystring = " SELECT nvl(to_char(s.SETUPTAB_LAST_UPDATED,'mm/dd/yyyy hh:mi am'),' ') setuptab_last_updated FROM mfpdbo.scptsetupnew s where hotelid =?1 and period=?2 ";		
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		String lastupdated = (String) q.getSingleResult();	
		return lastupdated;
	}
	
	
	public String fetchSetupTabCompleted(long hotelid, long period) {
		String querystring = " SELECT CASE WHEN COUNT(*) = 0 THEN 'N' else  'Y'  END setupcompleted FROM mfpdbo.scptsetupnew s where hotelid =?1 and period=?2 ";		
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		String setupcompleted = (String) q.getSingleResult();	
		return setupcompleted;
	}

	@Override
	public void updateSCPTPrevWeightedNet(Long scpt_accountid, Double prev_weightedratenet) {
		Query q = em.createNativeQuery("begin mfpproc.pkg_scpt_rpe.sp_updatePrevWeightedNet(?,?); end;");
		q.setParameter(1, scpt_accountid);
		q.setParameter(2, prev_weightedratenet);
		q.executeUpdate();
	}
	/* INC000007089109*/
	@Override
	public String fetchHistoryLastUpdated() {
		String querystring = "select constant_value from mfpdbo.scpt_constants where constant_name='SCPT_BATCH_LOAD_DATE'";		
		Query q = em.createNativeQuery(querystring, String.class);
		String lastupdated = (String) q.getSingleResult();	
		return lastupdated;
	}
	public String getCurrencyCode(long hotelrfpid) {

		String queryString = "SELECT      b.currencycode   FROM   mfpdbo.hotelrfp a, mfpdbo.currency_ref b  WHERE   (a.currencycode = b.currencycode(+))  AND hotelrfpid = ?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String currencycode = null;
		try {
			currencycode = (String) q.getSingleResult();
		} catch (NoResultException e) {
			currencycode = null;
		}
		return currencycode;
	}
	public String getCurrencyWidth(long hotelrfpid) {

		String queryString = "SELECT decode(b.width,null,'Small', 'Large')  FROM   mfpdbo.hotelrfp a,  mfpdbo.currency_width_ref  b WHERE   a.currencycode = b.currencycode(+) AND  hotelrfpid = ?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String currencyWidth = null;
		try {
			currencyWidth = (String) q.getSingleResult();
		} catch (NoResultException e) {
			currencyWidth = null;
		}
		return currencyWidth;
	}
}
