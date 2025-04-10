package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountCenterManager;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNew;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNotViewable;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenter;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterSearch;
import com.marriott.rfp.object.pricing.hotelrfp.PriceButtonProductData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickHotelAccountCenter;
import com.marriott.rfp.object.pricing.hotelrfp.RebidStatusAlert;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountCenterManagerImpl implements HotelAccountCenterManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public void checkAccountCenter(long hotelrfpid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatehotelaccountinfo_bt(?); end; ");
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
	public List<HotelAccountCenter> findAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, Orderby orderby, Page page, User user) { 

		String queryString = " select /* +parallel(a) */ accountrecid, accounttype, accounttypedescription, accountname, hotel_accountinfoid, ratetype_selected, accountpricingtype," 
				+ " importance, ac_locked isLocked, ac_selected isSelected,  ac_accepted isAccepted, duedate,   ratetypeid volunteeredratetype, "
				+ " screenstatus, aer_account, allow_no_bid, "
				+ " mfpproc.fn_is_ritz_gpp(hotel_accountinfoid) is_ritz_gpp, "
				+ " mfpproc.fn_hasansweredquestions_bt(hotel_accountinfoid, accountrecid) hasansweredquestions, "
				+ " mfpproc.fn_hasquestions_bt(accountrecid) hasquestions, show_questions_always, hotel_display_date, "
				+ "mfpproc.fn_ishotelaccountnew(hotel_display_date) isNew, gov_account, govvpproductenabled, nosquatter, allow_floatnociel, HOTEL_DISPLAY,allowHotelcanPriceFloatVP, "
				+ " issolicited, nobidreasonid, nobidreason, ismaxaer, accountpricingcycleid, rebidstatus, rebid_due, rebid_level, business_case, offcycle, cbcstatus, top_account,bt_booking_cost,roll_over  "
				+ " from (select accountrecid, accounttype, accounttypedescription, accountname, hotel_accountinfoid, ratetype_selected, accountpricingtype, " 
				+ "  importance, duedate,  ratetypeid, ac_locked, aer_account,  allow_no_bid, screenstatus, "
				+ " show_questions_always, hotel_display_date, gov_account, govvpproductenabled, nosquatter, allow_floatnociel, HOTEL_DISPLAY,allowHotelcanPriceFloatVP, rownum arow, "
				+ " issolicited,  ac_selected,  ac_accepted, nobidreasonid, nobidreason, ismaxaer, accountpricingcycleid, "
				+ " decode(rebidstatus3, null, decode(rebidstatus2, null, rebidstatus, rebidstatus2),rebidstatus3) rebidstatus, "
				+ " decode(rebid_due3, null, decode(rebid_due2, null, rebid_due, rebid_due2),rebid_due3) rebid_due, "
				+ " decode(rebidstatus3, null, decode(rebidstatus2, null, 1, 2),3) rebid_level , business_case, offcycle, cbcstatus, top_account,bt_booking_cost,roll_over "
				+ " from (SELECT   A.ACCOUNTRECID , A.ACCOUNTTYPE , A.PERIOD , A.ACCOUNTNAME , A.HOTEL_DISPLAY, A.HOTEL_DISPLAY_DATE"
				+ " , B.IMPORTANCE , B.HOTEL_ACCOUNTINFOID , B.HOTELRFPID , D.DUEDATE , B.RATETYPE_SELECTED, a.accountpricingtype accountpricingtype " 
				+ " ,  E.ACCOUNTTYPEDESCRIPTION , ratetypeid, mfpproc.fn_ishotelacctpgoos_pending (hotel_accountinfoid) ac_locked, a.aer_account, e.allow_no_bid,  "
				+ " mfpproc.fn_getscreenstatus(?1, a.accountrecid) screenstatus, e.show_questions_always, a.gov_account, nvl(a.govvpproductenabled,'N') govvpproductenabled, a.nosquatter, a.allow_floatnociel,a.allowHotelcanPriceFloatVP, "
				+ " mfpproc.fn_issolicited_hotel(a.accountrecid, g.hotelid) issolicited, mfpproc.fn_isHotelAccountSelected(hotel_accountinfoid) ac_selected, b.nobidreasonid, h.nobidreason, "
				+ " mfpproc.fn_get_hotelaccountstatus (hotel_accountinfoid) ac_accepted, mfpproc.fn_get_ismaxaerdiscount(a.aer_account,a.accountrecid) ismaxaer, a.accountpricingcycleid,"
				+ "DECODE (rebid_flag, 'Y', DECODE (rebidstatus_id, NULL, 1, rebidstatus_id)) rebidstatus,  DECODE (rebid_flag, 'Y', rebid_due, NULL) rebid_due, "
				+ " DECODE (rebid_flag2, 'Y', DECODE (rebidstatus_id2, NULL, 1, rebidstatus_id2)) rebidstatus2,  DECODE (rebid_flag2, 'Y', rebid_due2, NULL) rebid_due2, "
				+ " DECODE (rebid_flag3, 'Y', DECODE (rebidstatus_id3, NULL, 1, rebidstatus_id3)) rebidstatus3, "
				+ " DECODE (rebid_flag3, 'Y', rebid_due3, NULL) rebid_due3,  nvl(b.business_case,'N') business_case, nvl(a.offcycle,'N') offcycle,mfpproc.fn_cbcstatus(a.accountrecid,g.hotelid) cbcstatus "
				+ " , nvl(a.top_account,'N') top_account,nvl(a.bt_booking_cost,'N') bt_booking_cost, mfpproc.fn_is_rollover(a.accountrecid) roll_over "
				+ " FROM   MFPDBO.ACCOUNT A , MFPDBO.HOTEL_ACCOUNTINFO B , MFPDBO.PRICINGPERIOD_ACCOUNTS C "
				+ "  , MFPDBO.PRICINGPERIOD D , MFPDBO.ACCOUNTTIERTYPE_REF E , MFPDBO.RATETYPE_REF F, MFPDBO.HOTELRFP G,  MFPDBO.HOTELNOBID_REF H "

				+ " WHERE A.accountpricingtype NOT IN ('P') and (B.ACCOUNTRECID = A.ACCOUNTRECID) AND (C.ACCOUNTRECID = A.ACCOUNTRECID) " 
				+ " AND (D.PRICINGPERIODID = C.PRICINGPERIODID) AND (E.ACCOUNTTYPE = A.ACCOUNTTYPE)   and (e.accounttype = f.accounttype) "
				+ "  and (g.hotelrfpid=b.hotelrfpid) AND   (A.ACCOUNT_TRACKING_ONLY='N') AND B.NOBIDREASONID = H.NOBIDREASONID (+)  AND (A.PERIOD =?3) ";

		//Admin or Sales or limited sales Users
		if (user.getIsPASAdmin() || user.getIsAnySalesUser()) {
			queryString += " AND ((A.HOTEL_DISPLAY ='N') OR ";	
			queryString += "((A.HOTEL_DISPLAY ='Y') AND  (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND g.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid)))))";
		}
		
		//Hotel Users
		if (user.getIsHotelUser()) {
			queryString += " AND (A.HOTEL_DISPLAY ='Y')";
			queryString += " AND (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND g.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))) ";
		}
		
		queryString += " AND (B.HOTELRFPID =?4) ";
		if (user.getIsAnySalesUser())
			queryString += "  and mfpproc.fn_issalesaccount('" + user.getEid() + "', a.accountrecid)='Y' ";
		
		
		//Both Due Date From and To
		if (dueDateFrom != null && dueDateFrom.trim().length() > 0 && dueDateTo != null && dueDateTo.trim().length() > 0) {
			queryString += " and (d.duedate between to_date('" + dueDateFrom + "','mm/dd/yy') and to_date('" + dueDateTo + "','mm/dd/yy')) ";
		} 
		//Only Due Date From
		else if ((dueDateFrom != null && dueDateFrom.trim().length() > 0) && (dueDateTo == null || dueDateTo.trim().length() == 0)) {
			queryString += " and (d.duedate between to_date('" + dueDateFrom + "','mm/dd/yy') and to_date(sysdate)) ";
		}
		//Only Due Date To
		else if ((dueDateFrom == null || dueDateFrom.trim().length() == 0) && (dueDateTo != null && dueDateTo.trim().length() > 0)) {
			queryString += " and (d.duedate <= to_date('" + dueDateTo + "','mm/dd/yy')) ";
		}
		
		if (displayString == null || displayString.trim().length()==0)
			displayString = "MY";
				
		//Show my accounts
		if (displayString == null || displayString.equalsIgnoreCase("") || displayString.equalsIgnoreCase("MY")) {
			queryString += " AND (mfpproc.fn_isHotelAccountSelected(hotel_accountinfoid) = 'Y' OR ";
			queryString += " mfpproc.fn_cbcstatus(a.accountrecid,g.hotelid) IN ('R','C','A','D') OR ";
			queryString += " mfpproc.fn_issolicited_hotel(a.accountrecid, g.hotelid) = 'Y' OR ";
			queryString += " importance = 'Y' OR ratetype_selected IN (9,10,11,12,15,16,17,19,20,25,26,27,28,29,31,32) OR ";
			queryString += " (ratetype_selected IN (0, 1, 2, 18) AND mfpproc.fn_ishotelacctpgoos_pending (hotel_accountinfoid) = 'Y'))";
			queryString += " and ((b.nobidreasonid is null) OR b.nobidreasonid not in (16))";
		}
		
		if (displayString != null) {
			
			String alphaSearch = filterString != null? filterString.trim():"";
			
			//Show new account only
			if (displayString.equalsIgnoreCase("NEW")) {
				queryString += " AND mfpproc.fn_ishotelaccountnew (hotel_display_date)='Y' ";
				
			}
			
			//Show accounts containing
			if (displayString.equalsIgnoreCase("FILTER")) {
				queryString += " AND (UPPER(accountname) LIKE '%" + StringUtility.replaceSingleQuotes(alphaSearch.toUpperCase()) + "%') ";
			}
		
		}
		
		//Order by for All accounts and Filter account options
		if (displayString != null && (displayString.equalsIgnoreCase("ALL") || displayString.equalsIgnoreCase("FILTER"))) {
			
		}
		
		queryString += " order by ";
		
		switch (orderby.getOrderby()) {
		case 1:
			queryString += " accountname ";
			break;
		case 2:
			queryString += " accounttypedescription, accountname ";
			break;
		case 3:
			queryString += " duedate, accountname ";
			break;
		case 4:
			queryString += " nvl(importance,'N'), accountname ";
			break;
		case 5:
			queryString += " decode(ratetype_selected,0, 0, 1, 1, 2, 2,18, 3, 4), accountname ";
			break;
		case 6:
			queryString += " decode(screenstatus, 'R', 'A', screenstatus), accountname ";
			break;
		case 7:
			queryString += "  DECODE (ac_accepted, 'Y', 'A', 'N', 'D', DECODE (ac_selected,  'Y', 'P',  DECODE (issolicited, 'Y', 'R', ''))), accountname ";
			break;
		case 8:
			queryString += "  rebidstatus , accountname ";
			break;
		case 9:
			queryString += " mfpproc.fn_cbcstatus(a.accountrecid,g.hotelid), accountname ";
			break;
		default:
			queryString += "  accountname ";
			break;
		}
		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;
		queryString += "))  where   arow>=" + startaccount + " and arow <=" + endaccount;

		Query q = em.createNativeQuery(queryString, HotelAccountCenter.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, accountpricingtype);
		q.setParameter(3, period);
		q.setParameter(4, hotelrfpid);
		List<HotelAccountCenter> accountcenterlist = q.getResultList();
		return accountcenterlist;

	}

	public long findNumAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, User user) { 

		String queryString = "   SELECT /*+ use_nl(a) */  COUNT (*)  FROM mfpdbo.ACCOUNT a, " + " mfpdbo.hotel_accountinfo b,  mfpdbo.pricingperiod_accounts c,  mfpdbo.pricingperiod d, "
				+ " mfpdbo.accounttiertype_ref e, ";
		if (user.getIsAnySalesUser())
			queryString += " mfpdbo.ds_user du,  mfpdbo.ds_accountusers da,  mfpdbo.ds_group dg, ";
		queryString += " mfpdbo.hotelrfp g,  MFPDBO.HOTELNOBID_REF H  WHERE (b.accountrecid = a.accountrecid)  AND (c.accountrecid = a.accountrecid) "
				+ " AND (d.pricingperiodid = c.pricingperiodid)  AND (e.accounttype = a.accounttype) " + " AND (g.hotelrfpid = b.hotelrfpid) AND B.NOBIDREASONID = H.NOBIDREASONID (+) ";
		if (user.getIsAnySalesUser()) {
			queryString += " AND (du.cn_userid = da.cn_userid)  AND (dg.ou_groupid = da.ou_groupid) " + " AND (a.accountid = da.accountid)  AND (LOWER (du.eid) = LOWER ('" + user.getEid()
					+ "'))  AND (dg.ou_group = '" + user.getRole() + "') ";
		}

		queryString += " AND a.accountpricingtype NOT IN ('P') AND (a.account_tracking_only = 'N') " + " AND (a.period =  " + " ?2)  AND (b.hotelrfpid =?3 ) "; 

		
		
		//Admin or Sales or limited sales Users
		if (user.getIsPASAdmin() || user.getIsAnySalesUser()) {
			queryString += " AND ((A.HOTEL_DISPLAY ='N') OR ";	
			queryString += "((A.HOTEL_DISPLAY ='Y') AND  (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND g.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid)))))";
		}
		
		//Hotel Users
		if (user.getIsHotelUser()) {
			queryString += " AND (A.HOTEL_DISPLAY ='Y')";
			queryString += " AND (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND g.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))) ";
		}
		
		if (user.getIsAnySalesUser())
			queryString += "  and mfpproc.fn_issalesaccount('" + user.getEid() + "', a.accountrecid)='Y' ";
		
		//Both Due Date From and To
		if (dueDateFrom != null && dueDateFrom.trim().length() > 0 && dueDateTo != null && dueDateTo.trim().length() > 0) {
			queryString += " and (d.duedate between to_date('" + dueDateFrom + "','mm/dd/yy') and to_date('" + dueDateTo + "','mm/dd/yy')) ";
		} 
		//Only Due Date From
		else if ((dueDateFrom != null && dueDateFrom.trim().length() > 0) && (dueDateTo == null || dueDateTo.trim().length() == 0)) {
			queryString += " and (d.duedate between to_date('" + dueDateFrom + "','mm/dd/yy') and to_date(sysdate)) ";
		}
		//Only Due Date To
		else if ((dueDateFrom == null || dueDateFrom.trim().length() == 0) && (dueDateTo != null && dueDateTo.trim().length() > 0)) {
			queryString += " and (d.duedate <= to_date('" + dueDateTo + "','mm/dd/yy')) ";
		}
		
		if (displayString == null || displayString.trim().length()==0)
			displayString = "MY";
				
		//Show my accounts
		if (displayString == null || displayString.equalsIgnoreCase("") || displayString.equalsIgnoreCase("MY")) {
			queryString += " AND (mfpproc.fn_isHotelAccountSelected(hotel_accountinfoid) = 'Y' OR ";
			queryString += " mfpproc.fn_cbcstatus(a.accountrecid,g.hotelid) IN ('R','C','A','D') OR ";
			queryString += " mfpproc.fn_issolicited_hotel(a.accountrecid, g.hotelid) = 'Y' OR ";
			queryString += " importance = 'Y' OR ratetype_selected IN (9,10,11,12,15,16,17,19,20,25,26,27,28,29,31,32) OR ";
			queryString += " (ratetype_selected IN (0, 1, 2, 18) AND mfpproc.fn_ishotelacctpgoos_pending (hotel_accountinfoid) = 'Y'))";
			queryString += " and ((b.nobidreasonid is null) OR b.nobidreasonid not in (16))";
		}
		
		if (displayString != null) {
			
			String alphaSearch = filterString != null? filterString.trim():"";
			
			//Show new account only
			if (displayString.equalsIgnoreCase("NEW")) {
				queryString += " AND mfpproc.fn_ishotelaccountnew (hotel_display_date)='Y' ";
			}
			
			//Show accounts containing
			if (displayString.equalsIgnoreCase("FILTER")) {
				queryString += " AND (UPPER(accountname) LIKE '%" + StringUtility.replaceSingleQuotes(alphaSearch.toUpperCase()) + "%') ";
			}
		
		}
		
		
		
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, accountpricingtype);
		q.setParameter(2, period);
		q.setParameter(3, hotelrfpid);
		Long numAccounts = (Long) q.getSingleResult();
		return numAccounts;
	}

	public RebidStatusAlert findRebidPendingAlert(long hotelrfpid, String accountpricingtype, User user) {
		
		String queryString = "select numrebidpending, numrebidpending_past  from (SELECT COUNT (*) numrebidpending    FROM mfpdbo.hotel_accountinfo  WHERE hotelrfpid =  ?1"
				+ " AND ( (rebid_flag = 'Y' AND rebidstatus_id = 1) OR (rebid_flag2 = 'Y' AND rebidstatus_id2 = 1) OR (rebid_flag3 = 'Y' AND rebidstatus_id3 = 1))";

		
		queryString += " and accountrecid in (select accountrecid from mfpdbo.account where  accountpricingtype NOT IN ('P') "; 
		if (user.getIsHotelUser())
			queryString += "and hotel_display='Y' ";
		queryString += ")) a, ( SELECT COUNT (*) numrebidpending_past  FROM mfpdbo.hotel_accountinfo WHERE hotelrfpid =  " + hotelrfpid
				+ " AND ( (rebid_flag = 'Y' AND rebidstatus_id = 1 AND rebid_due < SYSDATE) OR (rebid_flag2 = 'Y' AND "
				+ " rebidstatus_id2 = 1 AND rebid_due2 < SYSDATE) OR (rebid_flag3 = 'Y' AND rebidstatus_id3 = 1 AND rebid_due3 < SYSDATE))";
		
		queryString += " and accountrecid in (select accountrecid from mfpdbo.account where  accountpricingtype NOT IN ('P') "; 
		if (user.getIsHotelUser())
			queryString += "and hotel_display='Y' ";
		queryString += ")) b ";

		Query q = em.createNativeQuery(queryString, RebidStatusAlert.class);
		q.setParameter(1, hotelrfpid);
		RebidStatusAlert rebidstatus = (RebidStatusAlert) q.getSingleResult();
		return rebidstatus;

	}

	public boolean findAllowFloatNoCiel(long hotelrfpid, User user) {
		boolean bAllowFloatNoCiel = false;
		String queryString = "select mfpproc.fn_allowfloatnociel(?1,?2) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, user.getShortRole());
		String allowFloat = (String) q.getSingleResult();
		if (allowFloat != null && allowFloat.equals("Y"))
			bAllowFloatNoCiel = true;
		return bAllowFloatNoCiel;
	}

	public boolean findShowOffcycleProducts(long hotelrfpid, String accountPricingType, User user) {
		boolean bShowOffcycleProducts = false;
		String queryString = "select mfpproc.fn_showoffcycleproducts(?1,?2,?3) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, accountPricingType);
		q.setParameter(3, user.getShortRole());
		String showOffcycle = (String) q.getSingleResult();
		if (showOffcycle != null && showOffcycle.equals("Y"))
			bShowOffcycleProducts = true;
		return bShowOffcycleProducts;
	}

	public boolean findHasGovPerDiemPricing(long hotelrfpid) {
		boolean bHasGovPerDiem = false;

		String queryString = "select mfpproc.fn_hasgovperdiempricing(?) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String hasGovPerDiem = (String) q.getSingleResult();
		if (hasGovPerDiem != null && hasGovPerDiem.equals("Y"))
			bHasGovPerDiem = true;
		return bHasGovPerDiem;
	}

	public List<AccountNotViewable> getAccountNotViewableList(long period, User user, String marshacode, String accountPricingType) {
		String queryString = " select  /* +parallel(a) */ a.accountrecid, a.accountname, a.accounttypedescription, b.CONTACTNAME globalSalesLeader, b.CONTACTEMAIL, a.aer_account,  a.default_percent "
				+ " from ( select a.accountrecid, a.period, a.accounttype, b.accounttypedescription, a.accountname, c.affiliationid , d.marshacode, d.hotelID , a.aer_account, a.default_percent "
				+ " from mfpdbo.account a, mfpdbo.accounttiertype_ref b, mfpdbo.brand_accounts c, mfpdbo.hotel d ";
		if (user.getIsAnySalesUser()) {
			queryString += " , MFPDBO.DS_GROUP e , MFPDBO.DS_ACCOUNTUSERS f , MFPDBO.DS_USER g ";
		}
		queryString += " where a.accounttype = b.accounttype and a.accountrecid = c.accountrecid and c.affiliationid = d.affiliationid ";
		if (user.getIsAnySalesUser()) {
			String group = user.getRole();
			queryString += "  and (f.ACCOUNTID = A.ACCOUNTID)  AND (e.OU_GROUPID = f.OU_GROUPID) AND (g.CN_USERID = f.CN_USERID) " + " AND (lower(G.EID) =lower('" + user.getEid() + "')) "
					+ " AND (E.OU_GROUP = '" + group + "')";
		}

		
		queryString += " and hotel_display ='N' and account_tracking_only = 'N' and accountpricingtype NOT IN ('P') and ( period = ?2 " + ")  and d.marshacode =?3 and a.accountrecid not in " 
				+ "(SELECT accountrecid FROM mfpdbo.account_solicited_hotels ash, mfpdbo.hotel ah  where ash.hotelid = ah.hotelid " + "and ash.accountrecid = a.accountrecid "
				+ "and ah.marshacode = ?4)) a,";
		queryString += " (select accountrecid, eid, CONTACTNAME, CONTACTEMAIL from mfpdbo.accountinfo a, mfpdbo.accountinfo_contacts b "
				+ " where a.accountinfoid = b.accountinfoid and b.contacttypeid = 1 and b.eid = mfpproc.fn_getglobaleidcontact_pri(a.accountrecid)) b ";

		queryString += " where a.accountrecid = b.accountrecid (+) " + "order by upper( accountname) ";
		Query q = em.createNativeQuery(queryString, AccountNotViewable.class);
		q.setParameter(1, accountPricingType);
		q.setParameter(2, period);
		q.setParameter(3, marshacode);
		q.setParameter(4, marshacode);
		@SuppressWarnings("unchecked")
		List<AccountNotViewable> accountnotviewable = q.getResultList();
		return accountnotviewable;

	}

	public List<AccountNew> getNewAccounts(Long newforXdays, User user) {
		String queryString = " SELECT a.accountrecid,  a.period,   accountname,   pp.duedate,     atr.accounttypedescription "
				+ " FROM mfpdbo.account a, mfpdbo.pricingperiod_accounts pa, mfpdbo.pricingperiod pp, mfpdbo.accounttiertype_ref atr, mfpdbo.period p " + " WHERE     a.accountrecid = pa.accountrecid "

				+ " AND p.period=pp.period AND pa.pricingperiodid = pp.pricingperiodid " + " and a.accounttype=atr.accounttype " + " AND accountpricingtype NOT IN ('P') " 
				+ " AND (a.contractend > trunc(SYSDATE)  or (a.contractend is null and a.period>=to_char(SYSDATE,'YYYY'))) " + " AND a.hotel_display_date  > TRUNC( SYSDATE - ?1 ) "
				+ " and a.hotel_display='Y' and p.hotelsview='Y' ";

		if (user.getHasLimitedHotels()) {

			
			queryString += " and ((exists (select * from mfpdbo.brand_accounts ba, mfpdbo.hotel h, mfpdbo.ds_user du, ";

			if (user.getIsLimitedSalesUser())
				queryString += " mfpdbo.ds_accountusers da,";
			queryString += " mfpdbo.ds_propusers dp where ba.affiliationid=h.affiliationid and du.cn_userid=dp.cn_userid and dp.marshacode=h.marshacode ";
			if (user.getIsLimitedSalesUser())
				queryString += " and du.cn_userid=da.cn_userid and a.accountid=da.accountid ";
			queryString += " and h.partition_idx='M' and a.accountrecid=ba.accountrecid and du.eid=?2)) ";

			
			queryString += " or (exists (select * from mfpdbo.brand_accounts ba, mfpdbo.hotel h, mfpdbo.ds_user du, ";

			if (user.getIsLimitedSalesUser())
				queryString += " mfpdbo.ds_accountusers da,";
			queryString += " mfpdbo.ds_propusers dp, mfpdbo.account_solicited_hotels ash where ba.affiliationid=h.affiliationid and du.cn_userid=dp.cn_userid and dp.marshacode=h.marshacode ";
			if (user.getIsLimitedSalesUser())
				queryString += " and du.cn_userid=da.cn_userid and a.accountid=da.accountid ";
			queryString += " and h.partition_idx='M' and a.accountrecid=ba.accountrecid  and a.accountrecid=ash.accountrecid and h.hotelid=ash.hotelid and du.eid=?3))) ";
		} else if (user.getIsSalesUser()) {
			queryString += "  AND EXISTS (SELECT * FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da  WHERE du.cn_userid = da.cn_userid AND a.accountid = da.accountid AND du.eid = ?2) ";

		}

		queryString += " order by accountname ";
		Query q = em.createNativeQuery(queryString, AccountNew.class);
		q.setParameter(1, newforXdays);
		q.setParameter(2, user.getEid());
		if (user.getHasLimitedHotels())
			q.setParameter(3, user.getEid());
		@SuppressWarnings("unchecked")
		List<AccountNew> accountnew = q.getResultList();
		return accountnew;
	}

	public List<QuickHotelAccountCenter> getStatusChangedAccounts(Long newforXdays, User user, String marshacode) {
		String queryString = "select a.accountname,  a.accountrecid, h.marshacode, mfpproc.fn_get_rateproduct(ha.ratetype_selected) productoffered, ha.hotel_accountinfoid, a.period, hr.hotelrfpid,  "
				+ " CASE WHEN ( ad.weblocked = 'Y' AND ad.selected = 'N' ) THEN 'N' WHEN ad.weblocked = 'Y' THEN 'Y' ELSE 'N' END islocked "
				+ "  , ad.selected isselected,  mfpproc.fn_get_hotelaccountstatus (ha.hotel_accountinfoid) isaccepted, mfpproc.fn_issolicited_hotel( a.accountrecid, h.hotelid ) issolicited, "
				+ " CASE WHEN ( rebid_flag3 = 'Y' ) THEN 3 WHEN ( rebid_flag2 = 'Y' ) THEN 2 WHEN ( rebid_flag = 'Y' ) THEN 1 ELSE NULL END rebid_level, "
				+ " CASE    WHEN ( rebid_flag3 = 'Y' ) THEN NVL( rebidstatus_id3, 1 )   WHEN ( rebid_flag2 = 'Y' ) THEN NVL( rebidstatus_id2, 1 ) "
				+ " WHEN ( rebid_flag = 'Y' ) THEN NVL( rebidstatus_id, 1 )   ELSE NULL  END   rebidstatus, "
				+ " CASE  WHEN ( rebid_flag3 = 'Y' ) THEN rebid_due3  WHEN ( rebid_flag2 = 'Y' ) THEN rebid_due2 " + " WHEN ( rebid_flag = 'Y' ) THEN rebid_due   ELSE NULL   END   rebid_due  "
				+ ",  pp.duedate, mfpproc.fn_hasansweredquestions_bt( hotel_accountinfoid, a.accountrecid ) hasansweredquestions, "
				+ " mfpproc.fn_hasquestions_bt( a.accountrecid ) hasquestions, ha.ratetype_selected, mfpproc.fn_cbcstatus(a.accountrecid,h.hotelid) cbcstatus  "
				+ " from mfpdbo.accountdirectory ad, mfpdbo.account a, mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.pricingperiod pp, mfpdbo.pricingperiod_accounts ppa ";
		if (user.getHasLimitedAccounts())
			queryString += " , mfpdbo.ds_user du, mfpdbo.ds_accountusers dau ";
		queryString += " where a.accountrecid=ad.accountrecid and h.hotelid=ad.hotelid and hr.hotelid=h.hotelid and hr.hotelrfpid=ha.hotelrfpid and a.accountrecid=ha.accountrecid "
				+ " AND pp.pricingperiodid = ppa.pricingperiodid AND a.accountrecid = ppa.accountrecid "
				+ " and h.marshacode=?1 and  selected='Y' and (dateselected>trunc(sysdate-?2) or dateaccepted>trunc(sysdate-?3))  "
				+ " and a.hotel_display='Y' AND (a.contractend > trunc(SYSDATE)  or (a.contractend is null and a.period>=to_char(SYSDATE,'YYYY'))) "
				+ "  AND ( CASE WHEN ( rebid_flag3 = 'Y' AND NVL( rebidstatus_id3, 1 ) = 1 ) THEN 1  WHEN ( rebid_flag2 = 'Y' AND NVL( rebidstatus_id2, 1 ) = 1 ) THEN 1 "
				+ " WHEN ( rebid_flag = 'Y' AND NVL( rebidstatus_id, 1 ) = 1 ) THEN 1 ELSE 0 END = 0 )";
		if (user.getHasLimitedAccounts())
			queryString += " and du.cn_userid=dau.cn_userid and dau.accountid=a.accountid and du.eid=?5' ";

		queryString += " order by accountname ";
		Query q = em.createNativeQuery(queryString, QuickHotelAccountCenter.class);
		q.setParameter(1, marshacode);
		q.setParameter(2, newforXdays);
		q.setParameter(3, newforXdays);
		q.setParameter(4, newforXdays);
		if (user.getHasLimitedAccounts())
			q.setParameter(5, user.getEid());
		@SuppressWarnings("unchecked")
		List<QuickHotelAccountCenter> accountnew = q.getResultList();
		return accountnew;
	}

	public List<QuickHotelAccountCenter> getRequestChangedAccounts(Long newforXdays, User user, String marshacode) {
		String queryString = "select a.accountname, a.accountrecid, h.marshacode, mfpproc.fn_get_rateproduct(ha.ratetype_selected) productoffered, ha.hotel_accountinfoid, a.period, hr.hotelrfpid,  "
				+ " CASE WHEN ( ad.weblocked = 'Y' AND ad.selected = 'N' ) THEN 'N' WHEN ad.weblocked = 'Y' THEN 'Y' ELSE 'N' END islocked "
				+ "  , ad.selected isselected,  ad.accepted isaccepted, mfpproc.fn_issolicited_hotel( a.accountrecid, h.hotelid ) issolicited, "
				+ " CASE WHEN ( rebid_flag3 = 'Y' ) THEN 3 WHEN ( rebid_flag2 = 'Y' ) THEN 2 WHEN ( rebid_flag = 'Y' ) THEN 1 ELSE NULL END rebid_level, "
				+ " CASE    WHEN ( rebid_flag3 = 'Y' ) THEN NVL( rebidstatus_id3, 1 )   WHEN ( rebid_flag2 = 'Y' ) THEN NVL( rebidstatus_id2, 1 ) "
				+ " WHEN ( rebid_flag = 'Y' ) THEN NVL( rebidstatus_id, 1 )   ELSE NULL  END   rebidstatus, "
				+ " CASE  WHEN ( rebid_flag3 = 'Y' ) THEN rebid_due3  WHEN ( rebid_flag2 = 'Y' ) THEN rebid_due2 "
				+ " WHEN ( rebid_flag = 'Y' ) THEN rebid_due   ELSE NULL   END   rebid_due, case when ad.selected='Y' or ad.volunteered='Y' then 'Y' else 'N' end hasaccountspec, mfpproc.fn_hasgenpricing(a.accountrecid, hr.hotelrfpid) hasgenpricing, accountpricingtype  "
				+ ",  pp.duedate, mfpproc.fn_hasansweredquestions_bt( hotel_accountinfoid, a.accountrecid ) hasansweredquestions, "
				+ " mfpproc.fn_hasquestions_bt( a.accountrecid ) hasquestions, ha.ratetype_selected,mfpproc.fn_cbcstatus(a.accountrecid,h.hotelid) cbcstatus  "
				+ " from mfpdbo.accountdirectory ad, mfpdbo.account a, mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha,mfpdbo.pricingperiod pp, mfpdbo.pricingperiod_accounts ppa ";
		if (user.getHasLimitedAccounts())
			queryString += " , mfpdbo.ds_user du, mfpdbo.ds_accountusers dau ";
		queryString += " where a.accountrecid=ad.accountrecid and h.hotelid=ad.hotelid and hr.hotelid=h.hotelid and hr.hotelrfpid=ha.hotelrfpid and a.accountrecid=ha.accountrecid "
				+ " AND pp.pricingperiodid = ppa.pricingperiodid AND a.accountrecid = ppa.accountrecid "
				+ " and h.marshacode=?1 and exists (select * from mfpdbo.account_solicited_hotels ash where ash.datesolicited>trunc(sysdate-?2) and ash.accountrecid=ha.accountrecid and ash.hotelid=h.hotelid) "
				+ " and a.hotel_display='Y' AND NVL( ad.selected, 'N' ) = 'N' AND (a.contractend > trunc(SYSDATE)  or (a.contractend is null and a.period>=to_char(SYSDATE,'YYYY'))) "
				+ "  AND ( CASE WHEN ( rebid_flag3 = 'Y' AND NVL( rebidstatus_id3, 1 ) = 1 ) THEN 1  WHEN ( rebid_flag2 = 'Y' AND NVL( rebidstatus_id2, 1 ) = 1 ) THEN 1 "
				+ " WHEN ( rebid_flag = 'Y' AND NVL( rebidstatus_id, 1 ) = 1 ) THEN 1 ELSE 0 END = 0 )";
		if (user.getHasLimitedAccounts())
			queryString += " and du.cn_userid=dau.cn_userid and dau.accountid=a.accountid and du.eid=?5' ";

		queryString += " order by accountname ";
		Query q = em.createNativeQuery(queryString, QuickHotelAccountCenter.class);
		q.setParameter(1, marshacode);
		q.setParameter(2, newforXdays);
		q.setParameter(3, newforXdays);
		q.setParameter(4, newforXdays);
		if (user.getHasLimitedAccounts())
			q.setParameter(5, user.getEid());
		@SuppressWarnings("unchecked")
		List<QuickHotelAccountCenter> accountnew = q.getResultList();
		return accountnew;
	}

	public List<QuickHotelAccountCenter> getCBCChangedAccounts(Long newforXdays, User user, String marshacode) {
		String queryString = "select a.accountname, a.accountrecid, h.marshacode, mfpproc.fn_get_rateproduct(ha.ratetype_selected) productoffered, ha.hotel_accountinfoid, a.period, hr.hotelrfpid,  "
				+ " CASE WHEN ( ad.weblocked = 'Y' AND ad.selected = 'N' ) THEN 'N' WHEN ad.weblocked = 'Y' THEN 'Y' ELSE 'N' END islocked "
				+ "  , ad.selected isselected,  ad.accepted isaccepted, mfpproc.fn_issolicited_hotel( a.accountrecid, h.hotelid ) issolicited, "
				+ " CASE WHEN ( rebid_flag3 = 'Y' ) THEN 3 WHEN ( rebid_flag2 = 'Y' ) THEN 2 WHEN ( rebid_flag = 'Y' ) THEN 1 ELSE NULL END rebid_level, "
				+ " CASE    WHEN ( rebid_flag3 = 'Y' ) THEN NVL( rebidstatus_id3, 1 )   WHEN ( rebid_flag2 = 'Y' ) THEN NVL( rebidstatus_id2, 1 ) "
				+ " WHEN ( rebid_flag = 'Y' ) THEN NVL( rebidstatus_id, 1 )   ELSE NULL  END   rebidstatus, "
				+ " CASE  WHEN ( rebid_flag3 = 'Y' ) THEN rebid_due3  WHEN ( rebid_flag2 = 'Y' ) THEN rebid_due2 "
				+ " WHEN ( rebid_flag = 'Y' ) THEN rebid_due   ELSE NULL   END   rebid_due, case when ad.selected='Y' or ad.volunteered='Y' then 'Y' else 'N' end hasaccountspec, mfpproc.fn_hasgenpricing(a.accountrecid, hr.hotelrfpid) hasgenpricing, accountpricingtype  "
				+ ",  pp.duedate, mfpproc.fn_hasansweredquestions_bt( hotel_accountinfoid, a.accountrecid ) hasansweredquestions, "
				+ " mfpproc.fn_hasquestions_bt( a.accountrecid ) hasquestions, ha.ratetype_selected, mfpproc.fn_cbcstatus(a.accountrecid,h.hotelid) cbcstatus  "
				+ " from mfpdbo.accountdirectory ad, mfpdbo.account a, mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha,mfpdbo.pricingperiod pp, mfpdbo.pricingperiod_accounts ppa ";
		if (user.getHasLimitedAccounts())
			queryString += " , mfpdbo.ds_user du, mfpdbo.ds_accountusers dau ";
		queryString += " where a.accountrecid=ad.accountrecid and h.hotelid=ad.hotelid and hr.hotelid=h.hotelid and hr.hotelrfpid=ha.hotelrfpid and a.accountrecid=ha.accountrecid "
				+ " AND pp.pricingperiodid = ppa.pricingperiodid AND a.accountrecid = ppa.accountrecid "
				+ " and h.marshacode=?1 and exists (select * from mfpdbo.account_cbc_hotels ash where ash.datecbcrequest>trunc(sysdate-?2) and ash.accountrecid=ha.accountrecid and ash.hotelid=h.hotelid and ash.status='R') "
				+ " and a.hotel_display='Y' AND NVL( ad.selected, 'N' ) = 'N' AND (a.contractend > trunc(SYSDATE)  or (a.contractend is null and a.period>=to_char(SYSDATE,'YYYY'))) "
				+ "  AND ( CASE WHEN ( rebid_flag3 = 'Y' AND NVL( rebidstatus_id3, 1 ) = 1 ) THEN 1  WHEN ( rebid_flag2 = 'Y' AND NVL( rebidstatus_id2, 1 ) = 1 ) THEN 1 "
				+ " WHEN ( rebid_flag = 'Y' AND NVL( rebidstatus_id, 1 ) = 1 ) THEN 1 ELSE 0 END = 0 )";
		if (user.getHasLimitedAccounts())
			queryString += " and du.cn_userid=dau.cn_userid and dau.accountid=a.accountid and du.eid=?5' ";

		queryString += " order by accountname ";
		Query q = em.createNativeQuery(queryString, QuickHotelAccountCenter.class);
		q.setParameter(1, marshacode);
		q.setParameter(2, newforXdays);
		q.setParameter(3, newforXdays);
		q.setParameter(4, newforXdays);
		if (user.getHasLimitedAccounts())
			q.setParameter(5, user.getEid());
		@SuppressWarnings("unchecked")
		List<QuickHotelAccountCenter> accountnew = q.getResultList();
		return accountnew;
	}

	public List<QuickHotelAccountCenter> getRebidDueAccounts(User user, String marshacode) {
		String queryString = "select a.accountname, a.accountrecid, h.marshacode, mfpproc.fn_get_rateproduct(ha.ratetype_selected) productoffered, ha.hotel_accountinfoid, a.period, hr.hotelrfpid,  "
				+ " CASE WHEN ( ad.weblocked = 'Y' AND ad.selected = 'N' ) THEN 'N' WHEN ad.weblocked = 'Y' THEN 'Y' ELSE 'N' END islocked "
				+ "  , ad.selected isselected,  ad.accepted isaccepted, "
				+ " (SELECT DECODE(COUNT(*),0,'N','Y') FROM mfpdbo.account_solicited_hotels s WHERE s.accountrecid = a.accountrecid AND s.hotelid = h.hotelid) issolicited,"
				+ " CASE WHEN ( rebid_flag3 = 'Y' ) THEN 3 WHEN ( rebid_flag2 = 'Y' ) THEN 2 WHEN ( rebid_flag = 'Y' ) THEN 1 ELSE NULL END rebid_level, "
				+ " CASE    WHEN ( rebid_flag3 = 'Y' ) THEN NVL( rebidstatus_id3, 1 )   WHEN ( rebid_flag2 = 'Y' ) THEN NVL( rebidstatus_id2, 1 ) "
				+ " WHEN ( rebid_flag = 'Y' ) THEN NVL( rebidstatus_id, 1 )   ELSE NULL  END   rebidstatus, "
				+ " CASE  WHEN ( rebid_flag3 = 'Y' ) THEN rebid_due3  WHEN ( rebid_flag2 = 'Y' ) THEN rebid_due2 "
				+ " WHEN ( rebid_flag = 'Y' ) THEN rebid_due   ELSE NULL   END   rebid_due , case when ad.selected='Y' or ad.volunteered='Y' then 'Y' else 'N' end hasaccountspec, mfpproc.fn_hasgenpricing(a.accountrecid, hr.hotelrfpid) hasgenpricing, accountpricingtype  "
				+ ",  pp.duedate, mfpproc.fn_hasansweredquestions_bt( hotel_accountinfoid, a.accountrecid ) hasansweredquestions, "
				+ " mfpproc.fn_hasquestions_bt( a.accountrecid ) hasquestions, ha.ratetype_selected, mfpproc.fn_cbcstatus(a.accountrecid,h.hotelid) cbcstatus  "
				+ " from mfpdbo.accountdirectory ad, mfpdbo.account a, mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha,mfpdbo.pricingperiod pp, mfpdbo.pricingperiod_accounts ppa ";
		if (user.getHasLimitedAccounts())
			queryString += " , mfpdbo.ds_user du, mfpdbo.ds_accountusers dau ";
		queryString += " where a.accountrecid=ad.accountrecid and h.hotelid=ad.hotelid and hr.hotelid=h.hotelid and hr.hotelrfpid=ha.hotelrfpid and a.accountrecid=ha.accountrecid "
				+ " AND pp.pricingperiodid = ppa.pricingperiodid AND a.accountrecid = ppa.accountrecid " + " and h.marshacode=?1 and    (    ( rebid_flag = 'Y' AND rebidstatus_id = 1 ) "
				+ " OR ( rebid_flag2 = 'Y' AND rebidstatus_id2 = 1 ) " + " OR ( rebid_flag3 = 'Y' AND rebidstatus_id3 = 1 ) ) AND h.partition_idx = 'M'"
				+ " and a.hotel_display='Y'  AND (a.contractend > trunc(SYSDATE)  or (a.contractend is null and a.period>=to_char(SYSDATE,'YYYY'))) ";
		if (user.getHasLimitedAccounts())
			queryString += " and du.cn_userid=dau.cn_userid and dau.accountid=a.accountid and du.eid=?2 ";

		queryString += " order by accountname ";
		Query q = em.createNativeQuery(queryString, QuickHotelAccountCenter.class);
		q.setParameter(1, marshacode);

		if (user.getHasLimitedAccounts())
			q.setParameter(2, user.getEid());
		@SuppressWarnings("unchecked")
		List<QuickHotelAccountCenter> accountnew = q.getResultList();
		return accountnew;
	}

	public List<AccountNotViewable> getAccountOffcycleNotViewableList(long period, User user, String marshacode, String accountPricingType) {
		String queryString = "  select /* +parallel(a) */ a.accountrecid,  a.accountname,  mfpproc.fn_getcontractend(a.accountrecid) contractenddate from mfpdbo.account a, mfpdbo.brand_accounts c, mfpdbo.hotel d ";
		if (user.getIsAnySalesUser()) {
			queryString += " , MFPDBO.DS_GROUP e , MFPDBO.DS_ACCOUNTUSERS f , MFPDBO.DS_USER g ";
		}
		queryString += " where  a.accountrecid = c.accountrecid and c.affiliationid = d.affiliationid and a.offcycle='Y' ";
		if (user.getIsAnySalesUser()) {
			String group = user.getRole();
			queryString += "  and (f.ACCOUNTID = A.ACCOUNTID)  AND (e.OU_GROUPID = f.OU_GROUPID) AND (g.CN_USERID = f.CN_USERID) " + " AND (lower(G.EID) =lower('" + user.getEid() + "')) "
					+ " AND (E.OU_GROUP = '" + group + "')";
		}
		queryString += " and a.accountid not in (select accountid "
				+ " from mfpdbo.account where accountpricingtype=a.accountpricingtype  and account_tracking_only = 'N' and  period=a.period+1 and hotel_display='Y') "
				+ " and  mfpproc.fn_getcontractend(a.accountrecid)> trunc(sysdate) "

				+ " and hotel_display ='Y' and account_tracking_only = 'N' and accountpricingtype NOT IN ('P') and ( period = ?2 )  and d.marshacode =?3 order by upper( accountname) "; 

		Query q = em.createNativeQuery(queryString, AccountNotViewable.class);
		q.setParameter(1, accountPricingType);
		q.setParameter(2, period);
		q.setParameter(3, marshacode);
		@SuppressWarnings("unchecked")
		List<AccountNotViewable> accountnotviewable = q.getResultList();
		return accountnotviewable;

	}

	public void update(long hotel_accountinfoid, HotelAccountCenterUpdate hotelAccountCenterUpdate, User user) {
		if (hotelAccountCenterUpdate.getRatetype_selected() == null)
			return;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertaccountinfo(?,?,?,?); end; ");
				try {
					stmt.setLong(1, hotel_accountinfoid);
					stmt.setLong(2, hotelAccountCenterUpdate.getRatetype_selected());
					stmt.setString(3, hotelAccountCenterUpdate.getImportance());
					stmt.setObject(4, hotelAccountCenterUpdate.getNobidreasonid(), Types.NUMERIC);
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

	public void update_portfolio(long hotel_accountinfoid, HotelAccountCenterUpdate hotelAccountCenterUpdate, User user) {
		if (hotelAccountCenterUpdate.getRatetype_selected() == null)
			return;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertacctselection_port(?,?); end; ");
				try {
					stmt.setLong(1, hotel_accountinfoid);
					stmt.setLong(2, hotelAccountCenterUpdate.getRatetype_selected());
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

	public List<HotelAccountCenter> findMultiHotelCenterDetail(MultiHotelAccountCenterSearch mhacsearch, String filterString, String canregionalize, Orderby orderby, Page page, User user) {

		String afmFrom = getCountryRegionFrom(mhacsearch.getRegionfiltervalue());
		String afmWhere = getCountryRegionWhere(mhacsearch.getRegionfiltervalue());
		String queryString = "SELECT /* +parallel(a) */ period, accountrecid, ratetype_selected, importance, " + " hotel_accountinfoid, hotelrfpid, selected isSelected, accepted isAccepted, nopricing, "
				+ " rebidstatus, rebid_due, rebid_level, nobidreasonid, nobidreason, hotelid,  marshacode, NAME hotelname,  affiliationid, " + "  screenstatus, "
				+ " mfpproc.fn_ishotelacctpgoos_pending (hotel_accountinfoid) isLocked, mfpproc.fn_hasquestions_bt(accountrecid) hasquestions, "
				+ " mfpproc.fn_is_ritz_gpp (hotel_accountinfoid) is_ritz_gpp, "
				+ " mfpproc.fn_hasansweredquestions_bt (hotel_accountinfoid, accountrecid) hasansweredquestions, "
				+ "  mfpproc.fn_hasgovperdiempricing(hotelrfpid) hasgovperdiempricing, decode(country,'US','N','Y') isInternational, "
				+ "  issolicited, mfpproc.fn_exclude_aer(affiliationid) excludeaer, mfpproc.fn_hasrevisitgenpricing(hotelrfpid, '" + user.getShortRole()
				+ "') revistgenpricing, ratetypeid volunteeredratetype  FROM (SELECT ROWNUM arow, period, accountrecid, ratetype_selected,"
				+ " importance, hotel_accountinfoid, hotelrfpid, selected,accepted, nopricing,  rebidstatus, "
				+ "  rebid_due,  rebid_level , nobidreasonid,  nobidreason, hotelid, marshacode, NAME, affiliationid, country "
				+ " ,mfpproc.fn_getscreenstatus (hotelrfpid, accountrecid) screenstatus, mfpproc.fn_issolicited_hotel (accountrecid, hotelid) issolicited, ratetypeid "
				+ " FROM (SELECT   period, accountrecid, ratetype_selected, importance, "
				+ " hotel_accountinfoid, hotelrfpid, selected, accepted,   nopricing,  decode(rebidstatus3, null, decode(rebidstatus2, null, rebidstatus, rebidstatus2),rebidstatus3) rebidstatus, "
				+ " decode(rebid_due3, null, decode(rebid_due2, null, rebid_due, rebid_due2),rebid_due3) rebid_due, "
				+ "  decode(rebidstatus3, null, decode(rebidstatus2, null, 1, 2),3) rebid_level , nobidreasonid, "
				+ " nobidreason, hotelid, marshacode, NAME, affiliationid, country, ratetypeid  FROM (SELECT hr.period, a.accountrecid, "
				+ " ha.ratetype_selected, ha.importance,   ha.hotel_accountinfoid, ha.hotelrfpid, "
				+ " ad.selected, mfpproc.fn_get_hotelaccountstatus (ha.hotel_accountinfoid) accepted, hr.nopricing ,  DECODE   (rebid_flag, 'Y', DECODE (rebidstatus_id, NULL, 1, rebidstatus_id)) rebidstatus, "
				+ " DECODE (rebid_flag, 'Y', rebid_due, NULL) rebid_due,  DECODE   (rebid_flag2, 'Y', DECODE (rebidstatus_id2, NULL, 1, rebidstatus_id2)) rebidstatus2, "
				+ " DECODE (rebid_flag2, 'Y', rebid_due, NULL) rebid_due2,  DECODE   (rebid_flag3, 'Y', DECODE (rebidstatus_id3, NULL, 1, rebidstatus_id3)) rebidstatus3, "
				+ " DECODE (rebid_flag3, 'Y', rebid_due3, NULL) rebid_due3,  ha.nobidreasonid, hnbr.nobidreason, h.hotelid, h.marshacode, h.NAME, h.affiliationid, h.country, rr.ratetypeid "
				+ " FROM mfpdbo.ACCOUNT a, mfpdbo.accountdirectory ad,  mfpdbo.hotel h,  mfpdbo.hotelrfp hr,  mfpdbo.hotel_accountinfo ha, mfpdbo.ratetype_ref rr,  mfpdbo.hotelnobid_ref hnbr "
				+ afmFrom;
		if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
			queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
		}
		queryString += " WHERE (a.accountrecid = ad.accountrecid)  and (a.accounttype=rr.accounttype) AND (h.hotelid = ad.hotelid)  AND (h.hotelid = hr.hotelid) "
				+ " AND (a.accountrecid = ha.accountrecid)   AND (hr.hotelrfpid = ha.hotelrfpid) "
				+ " AND ha.nobidreasonid = hnbr.nobidreasonid(+)  AND h.partition_idx = 'M'  AND (hr.period = ?1)  AND (a.period = ?2)   AND (a.accountrecid =?3) ";
		if (filterString != null && !filterString.equals(""))
			queryString += "  and upper(h.marshacode) like  '" + StringUtility.replaceSingleQuotes(filterString.toUpperCase()) + "%' ";

	
			//Admin or Sales or limited sales Users
			if (user.getIsPASAdmin() || user.getIsAnySalesUser()) {
				queryString += " AND ((A.HOTEL_DISPLAY ='N') OR ";	
				queryString += "((A.HOTEL_DISPLAY ='Y') AND  (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND h.hotelid IN (SELECT ash.hotelid "
					+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid)))))";
			}
			
			//Hotel Users
			if (user.getIsHotelUser()) {
				queryString += " AND (A.HOTEL_DISPLAY ='Y')";
				queryString += " AND (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND h.hotelid IN (SELECT ash.hotelid "
					+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))) ";
			}
			
		if (user.getIsPASAdmin() || user.getIsSalesUser()||user.getIsLimitedSalesUser()) {
			if (mhacsearch.getAccountstatus() != null) {
				if (mhacsearch.getAccountstatus().equals("A"))
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("REJ"))	
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'N' ";
				else if (mhacsearch.getAccountstatus().equals("PEN"))	
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'P' ";
				else if (mhacsearch.getAccountstatus().equals("S"))
					queryString += " and ad.selected = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("V"))
					queryString += " and ad.volunteered = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("R")) {
					queryString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + mhacsearch.getAccountrecid() + " and x.hotelid=h.hotelid)) "
							+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + mhacsearch.getAccountrecid() + ")";
				}
				else if (mhacsearch.getAccountstatus().equals("SOLNB")) {
						queryString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + mhacsearch.getAccountrecid() + " and x.hotelid=h.hotelid)) "
								+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + mhacsearch.getAccountrecid() + ")"
										+ " AND ha.ratetype_selected in (17,18) and hr.nopricing = 'N' ";			
				}
			}
			if (mhacsearch.getSubset() != null && !mhacsearch.getSubset().equals(""))
				queryString += " and ad.regionid = '" + mhacsearch.getSubset() + "' ";
		}
		if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
			queryString += " AND du.cn_userid = dpu.cn_userid AND dpu.marshacode = h.marshacode AND du.eid = '" + user.getEid() + "' ";
		}
		if (mhacsearch.getBrandlist() != null && mhacsearch.getBrandlist().size() > 0)
			queryString += " and h.affiliationid in (" + mhacsearch.getStringBrandList() + ")";
		queryString += afmWhere + " AND (   ?4 = 'N'  OR (   ?5 = 'Y'   AND h.hotelid IN ( " + " SELECT ash.hotelid FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = "
				+ " a.accountrecid)  )  ) ";

		if ((user.getIsPASAdmin() || user.getIsSalesUser()) && mhacsearch.getAccountrecid() == null) {
			queryString += " UNION   SELECT hr.period, NULL, NULL, NULL, NULL, NULL, "
					+ " NULL, NULL, 'Y' nopricing, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,  h.hotelid, h.marshacode, h.NAME, h.affiliationid, h.country, null  FROM mfpdbo.hotel h, "
					+ " (SELECT hotelid, hotelrfpid, period  FROM mfpdbo.hotelrfp  WHERE period = ?6) hr " + afmFrom;
			if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
				queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
			}
			queryString += " WHERE (h.hotelid = hr.hotelid(+))   AND h.partition_idx = 'M'  AND hotelrfpid IS NULL ";
			if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
				queryString += " AND du.cn_userid = dpu.cn_userid  AND dpu.marshacode = h.marshacode  AND du.eid = '" + user.getEid() + "' ";
			}
			if (mhacsearch.getBrandlist() != null && mhacsearch.getBrandlist().size() > 0)
				queryString += " and h.affiliationid in (" + mhacsearch.getStringBrandList() + ")";
			queryString += afmWhere + " AND (  ?7 = 'N'  OR (   ?8 = 'Y' AND h.hotelid IN ( " + " SELECT ash.hotelid " + " FROM mfpdbo.account_solicited_hotels ash WHERE ash.accountrecid = ?9)  ) )";
		}
		queryString += ") order by ";
		switch (orderby.getOrderby()) {
		case 1:
			queryString += " marshacode ";
			break;
		case 4:
			queryString += " nvl(importance,'N'), marshacode ";
			break;
		case 5:
			queryString += " DECODE (ratetype_selected, null, 0, 1, 1, 18, 3, 4), marshacode ";
			break;
		case 6:
			queryString += " decode(mfpproc.fn_getscreenstatus (hotelrfpid,  accountrecid ), 'R', 'A', mfpproc.fn_getscreenstatus (hotelrfpid, accountrecid  )), marshacode ";
			break;
		case 7:
			queryString += "  DECODE (accepted, 'Y', 'A', 'N', 'D', DECODE (selected,  'Y', 'P',  DECODE ( mfpproc.fn_issolicited_hotel (accountrecid,  hotelid ), 'Y', 'R', ''))), marshacode ";
			break;
		case 8:
			queryString += "  rebidstatus , marshacode ";
			break;
		default:
			queryString += "  marshacode ";
			break;
		}

		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;
		queryString += "))  where   arow>=" + startaccount + " and arow <=" + endaccount;
		Query q = em.createNativeQuery(queryString, HotelAccountCenter.class);
		q.setParameter(1, mhacsearch.getPeriod());
		q.setParameter(2, mhacsearch.getPeriod());
		q.setParameter(3, mhacsearch.getAccountrecid());
		q.setParameter(4, canregionalize);
		q.setParameter(5, canregionalize);
		q.setParameter(6, mhacsearch.getPeriod());
		q.setParameter(7, canregionalize);
		q.setParameter(8, canregionalize);
		q.setParameter(9, mhacsearch.getAccountrecid());
		@SuppressWarnings("unchecked")
		List<HotelAccountCenter> accountcenterlist = q.getResultList();
		return accountcenterlist;

	}

	private String getCountryRegionWhere(RegionFilterValue afm) {
		String queryString = "";
		if (afm != null) {
			if (afm.getAreaOrRegion().equals("C")) {
				if (afm.getCountry() != null && !afm.getCountry().equals("")) {
					queryString += " and h.country='" + afm.getCountry() + "' ";
					if (afm.getState() != null && !afm.getState().equals("")) {
						queryString += " and h.state='" + afm.getState() + "' ";
					}
					if (afm.getCity() != null && !afm.getCity().equals("") && !afm.getCity().equals("*")) {
						queryString += " and h.city='" + afm.getCity() + "' ";
					}
				}
			} else if (afm.getAreaOrRegion().equals("R")) {
				if (afm.getRegionid() > 0) {
					queryString += " AND (h.HOTELID = har.HOTELID) ";
					queryString += " and har.typeid = 74 ";
					queryString += " and har.areaid = " + afm.getRegionid() + " ";
				}
			}
		}
		return queryString;
	}

	private String getCountryRegionFrom(RegionFilterValue afm) {
		String queryString = "";
		if (afm != null && afm.getAreaOrRegion().equals("R") && afm.getRegionid() > 0)
			queryString += ", MFPDBO.HOTELAREAREC har ";
		return queryString;
	}

	public long findNumMultiHotelCenterDetails(MultiHotelAccountCenterSearch mhacsearch, String filterString, String canregionalize, User user) {

		String afmFrom = getCountryRegionFrom(mhacsearch.getRegionfiltervalue());
		String afmWhere = getCountryRegionWhere(mhacsearch.getRegionfiltervalue());

		String queryString = "SELECT  count(*)  FROM (SELECT  h.hotelid  FROM mfpdbo.ACCOUNT a, mfpdbo.accountdirectory ad,  mfpdbo.hotel h,  mfpdbo.hotelrfp hr, "
				+ " mfpdbo.hotel_accountinfo ha,  mfpdbo.hotelnobid_ref hnbr " + afmFrom;
		if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
			queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
		}
		queryString += " WHERE (a.accountrecid = ad.accountrecid)  AND (h.hotelid = ad.hotelid)  AND (h.hotelid = hr.hotelid) "
				+ " AND (a.accountrecid = ha.accountrecid)   AND (hr.hotelrfpid = ha.hotelrfpid) "
				+ " AND ha.nobidreasonid = hnbr.nobidreasonid(+)  AND h.partition_idx = 'M'  AND (hr.period =?1)  AND (a.period = ?2)   AND (a.accountrecid = ?3) ";
		if (filterString != null && !filterString.equals(""))
			queryString += "  and upper(h.marshacode) like  '" + StringUtility.replaceSingleQuotes(filterString.toUpperCase()) + "%' ";

		//Admin or Sales or limited sales Users
		if (user.getIsPASAdmin() || user.getIsAnySalesUser()) {
			queryString += " AND ((A.HOTEL_DISPLAY ='N') OR ";	
			queryString += "((A.HOTEL_DISPLAY ='Y') AND  (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND h.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid)))))";
		}
		
		//Hotel Users
		if (user.getIsHotelUser()) {
			queryString += " AND (A.HOTEL_DISPLAY ='Y')";
			queryString += " AND (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND h.hotelid IN (SELECT ash.hotelid "
				+ " FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))) ";
		}
		
		if (user.getIsPASAdmin() || user.getIsSalesUser()||user.getIsLimitedSalesUser()) {
			if (mhacsearch.getAccountstatus() != null) {
				if (mhacsearch.getAccountstatus().equals("A"))
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("REJ"))	
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'N' ";
				else if (mhacsearch.getAccountstatus().equals("PEN"))	
					queryString += " and mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'P' ";
				else if (mhacsearch.getAccountstatus().equals("S"))
					queryString += " and ad.selected = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("V"))
					queryString += " and ad.volunteered = 'Y' ";
				else if (mhacsearch.getAccountstatus().equals("R")) {
					queryString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + mhacsearch.getAccountrecid() + " and x.hotelid=h.hotelid)) "
							+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + mhacsearch.getAccountrecid() + ")";
				}
				else if (mhacsearch.getAccountstatus().equals("SOLNB")) {
						queryString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + mhacsearch.getAccountrecid() + " and x.hotelid=h.hotelid)) "
								+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + mhacsearch.getAccountrecid() + ")"
										+ " AND ha.ratetype_selected in (17,18) and hr.nopricing = 'N' ";								
				}				
			}
			if (mhacsearch.getSubset() != null && !mhacsearch.getSubset().equals(""))
				queryString += " and ad.regionid = '" + mhacsearch.getSubset() + "' ";
		}

		if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
			queryString += " AND du.cn_userid = dpu.cn_userid AND dpu.marshacode = h.marshacode AND du.eid = '" + user.getEid() + "' ";
		}
		if (mhacsearch.getBrandlist() != null && mhacsearch.getBrandlist().size() > 0)
			queryString += " and h.affiliationid in (" + mhacsearch.getStringBrandList() + ")";
		queryString += afmWhere + " AND (  ?4 = 'N'  OR (   ?5 = 'Y'   AND h.hotelid IN (SELECT ash.hotelid FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = "
				+ " a.accountrecid)  )  )  ";
		if ((user.getIsPASAdmin() || user.getIsSalesUser()) && mhacsearch.getAccountrecid() == null) {
			queryString += " UNION   SELECT   h.hotelid  FROM mfpdbo.hotel h,  (SELECT hotelid, hotelrfpid, period  FROM mfpdbo.hotelrfp  WHERE period =?6) hr " + afmFrom;
			if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
				queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
			}
			queryString += " WHERE (h.hotelid = hr.hotelid(+))   AND h.partition_idx = 'M'  AND hotelrfpid IS NULL ";
			if (!user.getIsPASAdmin() && !user.getIsSalesUser()) {
				queryString += " AND du.cn_userid = dpu.cn_userid  AND dpu.marshacode = h.marshacode  AND du.eid = '" + user.getEid() + "' ";
			}
			if (mhacsearch.getBrandlist() != null && mhacsearch.getBrandlist().size() > 0)
				queryString += " and h.affiliationid in (" + mhacsearch.getStringBrandList() + ")";
			queryString += afmWhere + " AND (  ?7= 'N'  OR (   ?8 = 'Y' AND h.hotelid IN ( SELECT ash.hotelid FROM mfpdbo.account_solicited_hotels ash WHERE ash.accountrecid = ?9)  ) )";
		}

		queryString += ")";

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, mhacsearch.getPeriod());
		q.setParameter(2, mhacsearch.getPeriod());
		q.setParameter(3, mhacsearch.getAccountrecid());
		q.setParameter(4, canregionalize);
		q.setParameter(5, canregionalize);
		q.setParameter(6, mhacsearch.getPeriod());
		q.setParameter(7, canregionalize);
		q.setParameter(8, canregionalize);
		q.setParameter(9, mhacsearch.getAccountrecid());
		Long numAccounts = (Long) q.getSingleResult();
		return numAccounts;
	}

	public RebidStatusAlert findMultiHotelRebidPendingAlert(long accountrecid, String canregionalize, User user) {

		String queryString = "SELECT numrebidpending, numrebidpending_past FROM (SELECT COUNT (*) numrebidpending FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr,  mfpdbo.hotel_accountinfo ha ";
		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
		}

		queryString += "  WHERE h.hotelid = hr.hotelid AND hr.hotelrfpid = ha.hotelrfpid AND ha.accountrecid =  ?1 AND rebid_flag = 'Y'  AND rebidstatus_id = 1 ";

		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			queryString += " AND du.cn_userid = dpu.cn_userid AND dpu.marshacode = h.marshacode AND du.eid = '" + user.getEid() + "' ";
		}
		queryString += " AND (  ?2 = 'N'  OR (   ?3 = 'Y'   AND h.hotelid IN ( " + " SELECT ash.hotelid FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = "
				+ " ha.accountrecid)  )  ) ) a, "

				+ " (SELECT COUNT (*) numrebidpending_past  FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr,mfpdbo.hotel_accountinfo ha ";
		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			queryString += " , mfpdbo.ds_user du,  mfpdbo.ds_propusers dpu ";
		}
		queryString += " WHERE h.hotelid = hr.hotelid AND hr.hotelrfpid = ha.hotelrfpid  AND ha.accountrecid =  ?4 AND rebid_flag = 'Y' AND rebidstatus_id = 1 AND rebid_due < SYSDATE ";

		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			queryString += " AND du.cn_userid = dpu.cn_userid AND dpu.marshacode = h.marshacode AND du.eid = '" + user.getEid() + "' ";
		}
		queryString += " AND (  ?5 = 'N'  OR (   ?6 = 'Y'   AND h.hotelid IN ( " + " SELECT ash.hotelid FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = ha.accountrecid)  )  )) b ";

		Query q = em.createNativeQuery(queryString, RebidStatusAlert.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, canregionalize);
		q.setParameter(3, canregionalize);
		q.setParameter(4, accountrecid);
		q.setParameter(5, canregionalize);
		q.setParameter(6, canregionalize);
		RebidStatusAlert rebidstatus = (RebidStatusAlert) q.getSingleResult();
		return rebidstatus;

	}

	public AccountCenterInfo findAccountCenterAccountInfo(long accountrecid) {
		String queryString = "SELECT a.accountrecid, nosquatter, a.accountpricingcycleid, "
				+ " DECODE (TO_CHAR (pp.duedate, 'Mon dd, yyyy'), 'Dec 31, 9999', 'TBD', DECODE (TO_CHAR (pp.duedate, 'Mon dd, yyyy'), 'Jan 01, 9999', 'CBC Collection', TO_CHAR (pp.duedate, 'Mon dd, yyyy'))) duedate, aer_account, "
				+ " atr.accounttypedescription, mfpproc.fn_get_ismaxaerdiscount (a.aer_account, a.accountrecid) ismaxaer, "
				+ " mfpproc.fn_ishotelaccountnew (hotel_display_date) isnew, a.hotel_display, a.accountname, a.period, NVL (a.offcycle, 'N') offcycle, gov_account, nvl(a.govvpproductenabled,'N') govvpproductenabled, "
				+ " a.allow_floatnociel,a.allowHotelcanPriceFloatVP, atr.allow_no_bid, atr.show_questions_always, mfpproc.fn_hasquestions_bt (a.accountrecid) hasquestions, rr.ratetypeid,  atr.can_regionalize, a.accountpricingtype, a.top_account "
				+ " FROM mfpdbo.account a, mfpdbo.pricingperiod_accounts ppa, mfpdbo.pricingperiod pp, mfpdbo.accounttiertype_ref atr, mfpdbo.ratetype_ref rr "
				+ " WHERE a.accountrecid = ppa.accountrecid(+) AND ppa.pricingperiodid = pp.pricingperiodid(+) AND a.accounttype = atr.accounttype AND a.accountrecid = ?1 "
				+ " AND a.accounttype = rr.accounttype";
		Query q = em.createNativeQuery(queryString, AccountCenterInfo.class);
		q.setParameter(1, accountrecid);
		AccountCenterInfo aci = (AccountCenterInfo) q.getSingleResult();
		return aci;
	}
	
	
	public AccountCenterView fetchcbccounts(AccountCenterView acv, long hotelrfpid, long period) {
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				String selectSQL = "SELECT cbc.status as status, count(cbc.status) as count FROM mfpdbo.ACCOUNT a,  mfpdbo.hotel_accountinfo b,  mfpdbo.pricingperiod_accounts c,  mfpdbo.pricingperiod d, "
								  +"mfpdbo.accounttiertype_ref e,  mfpdbo.hotelrfp g,  MFPDBO.HOTELNOBID_REF H, MFPDBO.account_cbc_hotels cbc "
								  +"WHERE (b.accountrecid = a.accountrecid)  AND (c.accountrecid = a.accountrecid)  AND (d.pricingperiodid = c.pricingperiodid)  AND (e.accounttype = a.accounttype) "  
								  +"AND (g.hotelrfpid = b.hotelrfpid) AND (B.NOBIDREASONID = H.NOBIDREASONID (+)) AND (a.accountpricingtype NOT IN ('P')) AND (a.account_tracking_only = 'N') "
								  +"AND (b.hotelrfpid = ?)  AND (a.period = ?)  AND "
								  +"((A.HOTEL_DISPLAY ='N') OR ((A.HOTEL_DISPLAY ='Y') AND (A.ACCOUNT_HOTEL_VIEW = 'A' OR (A.ACCOUNT_HOTEL_VIEW = 'S' AND g.hotelid IN (SELECT ash.hotelid  FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))))) "
								  +"AND (g.hotelid = cbc.hotelid) AND (a.accountrecid = cbc.accountrecid) "
								  +"GROUP BY cbc.status";
				PreparedStatement stmt = con.prepareStatement(selectSQL);
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.setLong(2, period);
					ResultSet rs = stmt.executeQuery();
					while (rs.next()) {
						if( null != rs.getString(1)){
							if("R".equalsIgnoreCase(rs.getString(1)))
								acv.setCbc_requested(rs.getInt(2));
							else if("A".equalsIgnoreCase(rs.getString(1)))
								acv.setCbc_accepted(rs.getInt(2));
							else if("D".equalsIgnoreCase(rs.getString(1)))
								acv.setCbc_rejected(rs.getInt(2));
							else if("C".equalsIgnoreCase(rs.getString(1)))
								acv.setCbc_completed(rs.getInt(2));
						}
					}
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		return acv;
	}
	
	public PriceButtonProductData findAccountMaintanenceFloatData(Long accountRecID) {
		try{
            String queryString = "SELECT accountAllowFloatVP, allow_floatnociel, allowHotelcanPriceFloatVP FROM mfpdbo.ACCOUNT WHERE accountrecid = ?1";
            Query q = em.createNativeQuery(queryString, PriceButtonProductData.class);
            q.setParameter(1, accountRecID);
            PriceButtonProductData priceButtonProductData = (PriceButtonProductData) q.getSingleResult();
            return priceButtonProductData;
        } catch (NoResultException e){
            return null;
        }
	}

}
