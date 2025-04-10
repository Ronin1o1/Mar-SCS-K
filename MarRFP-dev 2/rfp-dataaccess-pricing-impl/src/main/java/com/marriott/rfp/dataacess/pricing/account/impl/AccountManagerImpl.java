package com.marriott.rfp.dataacess.pricing.account.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.marriott.rfp.dataacess.pricing.accountregistration.impl.AccountRegistrationManagerImpl;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountBrand;
import com.marriott.rfp.object.pricing.account.AccountBrandList;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.account.AccountDefaultPercents;
import com.marriott.rfp.object.pricing.account.AccountDefaultRoompools;
import com.marriott.rfp.object.pricing.account.AccountDetailBrands;
import com.marriott.rfp.object.pricing.account.AccountDetailCompMatrix;
import com.marriott.rfp.object.pricing.account.AccountDetailGeneral;
import com.marriott.rfp.object.pricing.account.AccountDetailRFP;
import com.marriott.rfp.object.pricing.account.AccountHotelView;
import com.marriott.rfp.object.pricing.account.AccountIdJson;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.object.pricing.account.AccountThirdPartyRegion;
import com.marriott.rfp.object.pricing.account.AccountUpdateInfo;
import com.marriott.rfp.object.pricing.account.ComplexityAndRatings;
import com.marriott.rfp.object.pricing.account.RFPLaunchEmail;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.object.pricing.account.RenegSubmitList;
import com.marriott.rfp.object.pricing.account.RfpFileSentList;
import com.marriott.rfp.object.pricing.account.RfpLaunchRecapEmail;
import com.marriott.rfp.object.pricing.account.RfpSettingsList;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class AccountManagerImpl
 */

@Service
public class AccountManagerImpl implements AccountManager {
	private static final Logger log = LoggerFactory.getLogger(AccountManagerImpl.class);

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Account> findAccountListForRole(Long period, Long duedate, String newAccountsOnly,
			String accountpricingtype, String accounttype, boolean includeAPOnly, String searchgppaccountsonly,
			User user) {
		String role = user.getRole();
		String queryString = "SELECT  A.ACCOUNTNAME, A.ACCOUNTRECID  FROM MFPDBO.ACCOUNT  A ";
		if (duedate != null && duedate > 0)
			queryString += ", mfpdbo.pricingperiod_accounts ppa ";
		if (role.equals("MFPSALES") || role.equals("MFPFSALE")) {
			queryString += " , MFPDBO.DS_GROUP B , MFPDBO.DS_ACCOUNTUSERS C , MFPDBO.DS_USER D "
					+ " WHERE   (C.ACCOUNTID = A.ACCOUNTID)  AND (B.OU_GROUPID = C.OU_GROUPID)  AND (D.CN_USERID = C.CN_USERID) AND (lower(D.EID) =lower(?1))  AND (B.OU_GROUP =?2) and ";
		} else if (role.equals("MFPADMIN") || role.equals("MFPAPADM"))
			queryString += " where ";
		else if (role.equals("MFPUSER"))
			queryString += " where hotel_display='Y' and ";

		if (duedate != null && duedate > 0)
			queryString += " ppa.accountrecid = a.accountrecid and pricingperiodid=" + duedate + " and ";
		if (role.equals("MFPSALES") || role.equals("MFPFSALE"))
			queryString += " (period = ?3) ";
		else
			queryString += " (period = ?1) ";

		queryString += " and account_tracking_only='N'  ";

		if (includeAPOnly) {
			queryString += " AND a.accountpricingtype in ('P','C')";
		} else if (accountpricingtype != null && !accountpricingtype.equals("")) {
			queryString += " AND a.accountpricingtype= '" + accountpricingtype + "' ";
		} else {
			queryString += " AND a.accountpricingtype<> 'P' ";
		}

		if (searchgppaccountsonly != null && !searchgppaccountsonly.equals("") && searchgppaccountsonly.equals("Y")) {
			queryString += "and aer_account = 'Y' ";
		}

		if (accounttype != null && !accounttype.equals("")) {
			queryString += "and accounttype = '" + accounttype + "' ";
		}
		if (newAccountsOnly != null && newAccountsOnly.equals("Y")) {
			queryString += " AND mfpproc.fn_ishotelaccountnew (hotel_display_date) = 'Y' ";
		}
		queryString += " ORDER BY ACCOUNTNAME ASC ";

		Query q = em.createNativeQuery(queryString, Account.class);
		if (role.equals("MFPSALES") || role.equals("MFPFSALE")) {
			q.setParameter(1, user.getEid());
			q.setParameter(2, role);
			q.setParameter(3, period);
		} else
			q.setParameter(1, period);

		List<Account> accountList = q.getResultList();

		return accountList;
	}

	public List<Account> getAccountList(long period, String accountType, User user) {

		String queryString = "SELECT  A.ACCOUNTNAME, A.ACCOUNTRECID  FROM MFPDBO.ACCOUNT  A ";
		if (user.getIsHotelUser())
			queryString += " where hotel_display='Y' and ";
		else
			queryString += " where ";

		queryString += " (period =?1)   ";
		if (accountType != null && !accountType.equals("")) {
			queryString += "and accounttype = '" + accountType + "' ";
		}
		queryString += " ORDER BY ACCOUNTNAME ASC ";
		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, period);
		@SuppressWarnings("unchecked")
		List<Account> accountList = q.getResultList();
		return accountList;
	}

	public List<Account> getAccountListByRoleForProximity(long period, String accountType, User user) {

		String queryString = "SELECT  A.ACCOUNTNAME, A.ACCOUNTRECID  FROM MFPDBO.ACCOUNT  A ";
		if (user.getIsAnySalesUser())
			queryString += " , MFPDBO.DS_GROUP B, MFPDBO.DS_ACCOUNTUSERS C, MFPDBO.DS_USER D ";
		queryString += " where period=" + period;
		if (user.getIsAnySalesUser()) {
			String group = "";
			if (user.getIsSalesUser())
				group = "MFPSALES";
			else if (user.getIsLimitedSalesUser())
				group = "MFPFSALE";
			queryString += " and   (C.ACCOUNTID = A.ACCOUNTID) AND (B.OU_GROUPID = C.OU_GROUPID) AND (D.CN_USERID = C.CN_USERID) AND (lower(D.EID) =lower('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) AND (B.OU_GROUP ='" + group + "') ";
		}
		if (accountType != null && !accountType.equals("")) {
			queryString += " and accounttype = '" + accountType + "' ";
		}
		queryString += "  and account_tracking_only='N'  AND accountpricingtype = 'C'";
		queryString += " AND accountrecid in (select accountrecid from mfpdbo.account_mcad_lookup) ORDER BY ACCOUNTNAME ASC ";
		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, period);
		@SuppressWarnings("unchecked")
		List<Account> accountList = q.getResultList();
		return accountList;
	}

	public Long getNumAccountNoPeriod(User user) {

		String queryString = "SELECT  count(*)  FROM MFPDBO.ACCOUNT  A ";
		if (user.getIsAnySalesUser()) {
			String group = "";
			if (user.getIsSalesUser())
				group = "MFPSALES";
			else if (user.getIsLimitedSalesUser())
				group = "MFPFSALE";
			queryString += " , MFPDBO.DS_GROUP B " + ", MFPDBO.DS_ACCOUNTUSERS C " + ", MFPDBO.DS_USER D "
					+ " WHERE   (C.ACCOUNTID = A.ACCOUNTID) " + " AND (B.OU_GROUPID = C.OU_GROUPID) "
					+ " AND (D.CN_USERID = C.CN_USERID) " + " AND (lower(D.EID) =lower('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) " + " AND (B.OU_GROUP = '" + group
					+ "') ";
		} else if (user.getIsPASAdmin() || user.getIsSAPPAdmin())
			queryString += " ";
		else if (user.getIsHotelUser())
			queryString += " where hotel_display='Y' ";

		// queryString += " (period = " + period + ") ";
		queryString += " ORDER BY ACCOUNTNAME ASC ";

		Query q = em.createNativeQuery(queryString, Long.class);
		Long numAccts = 0L;
		numAccts = (Long) q.getSingleResult();

		return numAccts;

	}

	public Account findAccountInfo(long accountrecid) {
		String queryString = "SELECT  A.ACCOUNTNAME, A.ACCOUNTRECID, a.groupmeetings, a.accountpricingtype, a.period  FROM MFPDBO.ACCOUNT  A WHERE accountrecid=?1";

		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, accountrecid);
		Account account = (Account) q.getSingleResult();

		return account;
	}

	public String findLatestAccountName(long accountid) {
		String queryString = "SELECT accountname FROM mfpdbo.account WHERE  accountid=?1 AND  period IN (SELECT max(period) FROM mfpdbo.account WHERE accountid=?2) ";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountid);
		q.setParameter(2, accountid);
		String account = "";
		try {
			account = (String) q.getSingleResult();
		} catch (NoResultException e) {
			account = null;
		}

		return account;
	}

	public String findAccountAerType(long accountrecid) {
		String queryString = "SELECT CASE WHEN aer_account = 'Y' THEN 'AER_Y' ELSE 'AER_N' END  FROM MFPDBO.ACCOUNT WHERE accountrecid=?1  ";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountrecid);
		String aer_account = "";
		try {
			aer_account = (String) q.getSingleResult();
		} catch (NoResultException e) {
			aer_account = null;
		}

		return aer_account;
	}

	@SuppressWarnings("unchecked")
	public List<Account> getFromToAccountList(long period, boolean to) {

		String queryString = "select accountrecid, accountname from mfpdbo.account a where  ";
		if (to)
			queryString += "not ";
		queryString += "exists (SELECT  *  FROM   MFPDBO.ACCOUNTDIRECTORY B WHERE  a.accountrecid =b.accountrecid ";
		queryString += " and ((B.VOLUNTEERED is not null) or (B.WEBLOCKED ='Y'))) and period=?1"
				+ " and accountpricingtype in ('L','C') ";
		if (to)
			queryString += " and hotel_display='N' ";
		queryString += " order by accountname asc";

		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, period);

		List<Account> accountList = q.getResultList();

		return accountList;
	}

	public void accountCopyPricingUpdate(long fromAccountrecid, long toAccountrecid, String copyQuests,
			String copyGMQuests, User user) {
		try {

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				CallableStatement stmt = con
						.prepareCall("BEGIN mfpproc.SP_COPYACCOUNTTOBLANKACCOUNT_B(?, ?,?,?); END; ");
				try {
					stmt.setLong(1, fromAccountrecid);
					stmt.setLong(2, toAccountrecid);
					stmt.setString(3, copyQuests);
					stmt.setString(4, copyGMQuests);
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

	public String accountCopybyTierUpdate(long fromperiod, long toperiod, String accountsegment, User user) {
		String msg = "";

		long accountExists = 0;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_COPY_ACCOUNTBY_TIER_HPP(?, ?, ?,?)}");
				try {
					cstmt.setString(1, accountsegment);
					cstmt.setLong(2, toperiod);
					cstmt.setLong(3, fromperiod);
					cstmt.registerOutParameter(4, Types.NUMERIC);
					cstmt.execute();
					accountExists = cstmt.getLong(4);

				} finally {
					cstmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
			accountExists = -1;
		}

		if (accountExists > 0) {

			msg = accountExists + " accounts copied successfully ";
		} else if (accountExists == 0) {
			msg = " No account to copy ";
		} else if (accountExists < 0) {
			msg = " The copy was not successful.";
		}

		return msg;
	}

	public List<Account> findAccountList(long period, String accountPricingType, String accountSegment,
			String filterString, int orderby, Page page) {

		String queryString = "select accountrecid, accountname, hotel_display, decode(duedate, 'Dec 31, 9999','TBD', decode(duedate, 'Jan 01, 9999','CBC Collection', duedate)) duedate, accounttypedescription "
				+ " from  (select accountrecid, accountname, hotel_display, duedate, accounttypedescription, rownum anum "
				+ " from (  SELECT   a.accountrecid, a.accountname, DECODE (a.hotel_display, 'N', 'No', 'Y', 'Yes', a.hotel_display) hotel_display, "
				+ " TO_CHAR (c.duedate, 'Mon dd, yyyy')  duedate, d.accounttypedescription "
				+ "     FROM mfpdbo.ACCOUNT a, mfpdbo.pricingperiod_accounts b, mfpdbo.pricingperiod c, mfpdbo.accounttiertype_ref d "
				+ "    WHERE (b.accountrecid(+) = a.accountrecid) AND (b.pricingperiodid = c.pricingperiodid(+))          AND (a.accounttype = d.accounttype) AND (a.period = ?1)";

		if (accountPricingType != null && !accountPricingType.equals("*")) {
			queryString += " and a.accountpricingtype='" + accountPricingType + "' ";
		}
		if (accountSegment != null && !accountSegment.equals("*")) {
			queryString += " and a.accounttype='" + accountSegment + "' ";
		}

		if (filterString != null && !filterString.trim().equals("")) {
			queryString += " AND (UPPER(accountname) LIKE '" +"%"
					+ StringUtility.replaceSingleQuotes(filterString.toUpperCase()) + "%') ";
		}

		switch (orderby) {
		case 0:
			queryString += "ORDER BY decode(A.ACCOUNTTYPE, 'T', '0', 'A', '1', a.accounttype) ASC, A.ACCOUNTNAME ASC";
			break;
		case 1:
			queryString += "ORDER BY  A.ACCOUNTNAME ASC";
			break;
		case 2:
			queryString += "ORDER BY  C.Duedate ASC, a.accountname asc ";
			break;
		case 3:
			queryString += "ORDER BY  a.HOTEL_DISPLAY ASC, a.accountname asc ";
			break;
		default:
			queryString += "ORDER BY decode(A.ACCOUNTTYPE, 'T', '0', 'A', '1', a.accounttype) ASC, A.ACCOUNTNAME ASC";
		}

		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;
		queryString += "))  where   anum>=" + startaccount + " and anum <=" + endaccount;
		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, period);

		@SuppressWarnings("unchecked")
		List<Account> accountList = q.getResultList();

		return accountList;
	}

	public long getAccountListNum(long period, String accountPricingType, String accountSegment, String filterString,
			int orderby) {

		String queryString = "  select count(*)     FROM mfpdbo.ACCOUNT a, mfpdbo.pricingperiod_accounts b, mfpdbo.pricingperiod c, mfpdbo.accounttiertype_ref d "
				+ "    WHERE (b.accountrecid(+) = a.accountrecid) AND (b.pricingperiodid = c.pricingperiodid(+))          AND (a.accounttype = d.accounttype) AND (a.period = ?1)";

		if (accountPricingType != null && !accountPricingType.equals("*")) {
			queryString += " and a.accountpricingtype='" + accountPricingType + "' ";
		}
		if (accountSegment != null && !accountSegment.equals("*")) {
			queryString += " and a.accounttype='" + accountSegment + "' ";
		}

		if (filterString != null) {
			String alphaSearch = filterString.trim();
			if (!alphaSearch.equals(""))
				queryString += " AND (UPPER(accountname) LIKE '"
						+ StringUtility.replaceSingleQuotes(filterString.toUpperCase()) + "%') ";
		}

		switch (orderby) {
		case 0:
			queryString += "ORDER BY decode(A.ACCOUNTTYPE, 'T', '0', 'A', '1', a.accounttype) ASC, A.ACCOUNTNAME ASC";
			break;
		case 1:
			queryString += "ORDER BY  A.ACCOUNTNAME ASC";
			break;
		case 2:
			queryString += "ORDER BY  C.Duedate ASC, a.accountname asc ";
			break;
		case 3:
			queryString += "ORDER BY  a.HOTEL_DISPLAY ASC, a.accountname asc ";
			break;
		default:
			queryString += "ORDER BY decode(A.ACCOUNTTYPE, 'T', '0', 'A', '1', a.accounttype) ASC, A.ACCOUNTNAME ASC";
		}

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, period);
		Long numAccounts = (Long) q.getSingleResult();
		return numAccounts;
	}

	public AccountDetailGeneral getGeneralAccountDetails(long accountrecid) {
		String queryString = "SELECT " + "a.accountid, " + // start Account
															// fields
				"a.accountname, " + "a.accountpricingtype, " + "a.accountrecid, " + "a.groupmeetings, "
				+ "a.hotel_display, " + "a.period, " + "a.top_account, " + // end
																			// Account
																			// fields
				"a.accountpricingcycleid, " + // start AccountDetailGeneral
				"a.accounttype, " + "a.account_hotel_view," + "a.account_tracking_only, " + "a.aer_account, "
				+ "a.aer_accountname, " + "mfpproc.fn_isaccounthotelaerselected(a.accountrecid) aerportfolio, "
				+ "a.altcancelpolicyid, a.altcancelpolicyoptionid," + "a.altcancelpolicynotes, " + "a.altcancelpolicytimeid, "
				+ "a.bt_booking_cost," + "decode(h.defaultvalue,NULL,'N','Y') commdef_acct, "
				+ "DECODE (f.defaultvalue, 'Y', 'N', 'Y') commdef_tier, "
				+ "mfpproc.fn_getcontractend(a.accountrecid) contractend, "
				+ "mfpproc.fn_getcontractstart(a.accountrecid) contractstart ," + "a.default_percent, "
				+ "a.discfirsttieronly, " + "gov_account, "
				+ "mfpproc.fn_canchangeacctgovflag (a.accountrecid) govaccountcanchange, "
				+ "mfpproc.fn_haspricing(a.accountrecid) hasRecs, "
				+ "mfpproc.fn_hasaccountportfolio(a.accountrecid) hasportfolio, "
				+ "TO_CHAR (a.hotel_display_date, 'Mon dd, yyyy') hotel_display_date, "
				+ "mfpproc.fn_getnextcontractstart(a.accountrecid) nextcontractstart," + "a.nosquatter, "
				+ "nvl(a.offcycle,'N') offcycle,"
				+ "mfpproc.fn_canchangeoffcycle(a.accountrecid) offcycleaccountcanchange, "
				+ "mfpproc.fn_canchangeoffcycleend (a.accountrecid) offcycleaccountcanchangeend, "
				+ "mfpproc.fn_get_maxnumseasons(a.accountrecid) offcycle_numseasons, "
				+ "mfpproc.fn_getprevcontractend(a.accountrecid) prevcontractend ," + "b.pricingperiodid, "
				+ "a.rpgm_accountname, " + "a.rfppulldate, "
				+ "mfpproc.fn_isaccountweblocked (a.accountrecid) weblocked, " 
				+ "a.gpploiagreementonfile, a.govvpproductenabled, a.perdiemadjustmentsallowed,"
				+ " a.acctwifipolicyid, " + "a.remindersdate, " + "a.passubmissiondate, "
				+ "a.clientduedate, ai.CBC_SOFTDUEDATE cbcduedate, " 
				+ " a.ALLOW_ENHANCED as allowEnhanced, " 
				+ " NVL(a.ENHANCEDDISCOUNT, c.constant_value) as enhancedDiscount, "
				+ " NVL(a.ENHANCEDDISCOUNTGPP, a.default_percent) as enhancedDiscountGpp " 	// end 
				+ " FROM mfpdbo.ACCOUNT a, " + "mfpdbo.pricingperiod_accounts b, " + "mfpdbo.ratetype_rules_ref f, mfpdbo.ACCOUNTINFO ai,"
				+ "mfpdbo.ratetype_ref g, " + "( SELECT " + "	b.accountrecid, " + "	b.defaultvalue"
				+ "  FROM mfpdbo.account_defaultrules b " + " WHERE b.ruleid = 1 ) h ,"
				+ " (select constant_value from mfpdbo.rfp_constants where constant_name= 'DEFAULT_ENHANCEDDISC') c "
				+ " WHERE (b.accountrecid(+) = a.accountrecid)" + " AND (f.ratetypeid = g.ratetypeid) "
				+ " AND (g.accounttype = a.accounttype)" + " AND (f.ruletypeid = 1)" + " AND (a.accountrecid = ?1)"
				+ " AND (h.accountrecid(+) = a.accountrecid) AND (ai.accountrecid(+) = a.accountrecid)";
		Query q = em.createNativeQuery(queryString, AccountDetailGeneral.class);
		q.setParameter(1, accountrecid);
		
		AccountDetailGeneral result;
		try {
			result = (AccountDetailGeneral) q.getSingleResult();
		} catch (NoResultException e) {
			result = new AccountDetailGeneral();
		}

		return result;

	}

	@Override
	public AccountDetailBrands getBrandAccountDetails(Long accountrecid) {
		String queryString = "SELECT " + "   a.accountid, " + "   a.accountname, " + "   a.accountpricingtype, "
				+ "   a.accountrecid, " + "   a.groupmeetings, " + "   a.hotel_display, " + "   a.period, "
				+ "   a.top_account, " + "   a.account_hotel_view," + "   a.aer_account, " + "   a.allow_floatnociel, "
				+ "   a.allowHotelcanPriceFloatVP, " + "   a.allow_modifications, "
				+ "   a.allow_qmods allow_qmodifications, " + "   a.altcancelpolicyid," + "   a.altcancelpolicynotes, "
				+ "   a.altcancelpolicytimeid, " + "   a.analysisreportout," + "   a.bt_booking_cost,"
				+ "   a.company_internal_code clustercode, " + "   a.default_percent, " + "   a.endmoddate, "
				+ "   a.endqmoddate, " + "   a.internalpasnotes, " + "   a.startmoddate, " + "   a.startqmoddate, "
				+ "	  a.set_id, " + "	  a.rate_plan_id, "   + "	  a.accountAllowFloatVP, "
				+ "	  a.rateLoadInstructionsGDS, " + "	  a.rateLoadingNotes " 
				+ "FROM mfpdbo.ACCOUNT a " + "WHERE a.accountrecid = ?1";
		Query q = em.createNativeQuery(queryString, AccountDetailBrands.class);
		q.setParameter(1, accountrecid);

		AccountDetailBrands accountDetailBrands;
		try {
			accountDetailBrands = (AccountDetailBrands) q.getSingleResult();
		} catch (NoResultException e) {
			accountDetailBrands = new AccountDetailBrands();
		}

		return accountDetailBrands;
	}
    
	public AccountDetailRFP getAccountDetailRFP(Long accountrecid) {
		String queryString = "SELECT accountrecid, num_requiredfields,contain_userdefques, gbtaformat, maxseason, maxrt, "
				+"rtallowed, ratevisible, addquestnotes,edierfp,ediebt,edieaq, addrepformat,blackoutdateshidden,maxnum_blackoutdates,maxnum_blackoutperiod,taxfields,"
				+ "addnotes_rfp,presentfcr,filesubmission,pb,cs,ss,bd,gm,csr,es FROM mfpdbo.account WHERE accountrecid=?1";
		Query q = em.createNativeQuery(queryString, AccountDetailRFP.class);
		q.setParameter(1, accountrecid);
		AccountDetailRFP accountDetailRFP;
		try {
			accountDetailRFP = (AccountDetailRFP) q.getSingleResult();
		} catch (NoResultException e) {
			accountDetailRFP = new AccountDetailRFP();
		}
		return accountDetailRFP;
	}
        
    public AccountDetailCompMatrix getAccountDetailCompMatrix(Long accountrecid) {
    	String queryString = "SELECT accountrecid, mergacqrename, addquestcomp, satrating, tacbonus, tacbonuscomments, nvl(totrfpfilesent,0) totrfpfilesent, nvl(totrenegsubmit,0) totrenegsubmit, rateauditcomments "
    			+"FROM mfpdbo.account where accountrecid=?1";
    	Query q = em.createNativeQuery(queryString, AccountDetailCompMatrix.class);
    	q.setParameter(1, accountrecid);
    	AccountDetailCompMatrix accountDetailCompMatrix;
    	try {
    		accountDetailCompMatrix = (AccountDetailCompMatrix) q.getSingleResult();
    	} catch (NoResultException e) {
    		accountDetailCompMatrix = new AccountDetailCompMatrix();
    	}
   		return accountDetailCompMatrix;
    }
    
    public List<RfpFileSentList> getRfpFileList(Long accountrecid) {
		String queryString = "SELECT accountrecid, dateinfo FROM MFPDBO.RFPFILESENT "
						   + "WHERE accountrecid=?1 "
				           + "ORDER BY rfpfilesentid";
		Query q = em.createNativeQuery(queryString, RfpFileSentList.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<RfpFileSentList> rfpfilesdates = q.getResultList();
		return rfpfilesdates;
	}
    
    public List<RenegSubmitList> getRenegSubmitList(Long accountrecid) {
		String queryString = "SELECT accountrecid, dateinfo FROM MFPDBO.RENEGSUBMIT "
						   + "WHERE accountrecid=?1 "
				           + "ORDER BY renegsubmitid";
		Query q = em.createNativeQuery(queryString, RenegSubmitList.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<RenegSubmitList> renegsubmitdates = q.getResultList();
		return renegsubmitdates;
	}
        
	public List<HotelAffiliation> getBrandsCanPrice(long accountrecid) {
		String queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990) "
				+ "AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts WHERE accountrecid=?1)"
				+ "ORDER BY A.AFFILIATIONNAME ASC";
		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<HotelAffiliation> affiliationList = q.getResultList();

		return affiliationList;
	}

	public List<HotelAffiliation> getGPPRestrictedBrands(long accountrecid, boolean isEnabled) {
		String queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990) and A.GPP_LEVEL_RESTRICTION='Y' and ";
		if (isEnabled) {
			queryString += "a.affiliationid in (select affiliationid from mfpdbo.gpp_brand_accounts where accountrecid=?1 AND VALUE='Y') ";
		} else {
			queryString += "(a.affiliationid in (select affiliationid from mfpdbo.gpp_brand_accounts where accountrecid=?1 AND VALUE='N') OR a.affiliationid NOT in (select affiliationid from mfpdbo.gpp_brand_accounts where accountrecid=?2)) ";
		}
		queryString += " ORDER BY A.AFFILIATIONNAME ASC";
		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, accountrecid);

		@SuppressWarnings("unchecked")
		List<HotelAffiliation> affiliationList = q.getResultList();

		return affiliationList;
	}

	public List<HotelAffiliation> getBrandsCannotPrice(long accountrecid) {
		String queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990) "
				+ "AND a.affiliationid NOT IN (SELECT affiliationid FROM mfpdbo.brand_accounts WHERE accountrecid=?1)"
				+ "ORDER BY A.AFFILIATIONNAME ASC";
		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<HotelAffiliation> affiliationList = q.getResultList();

		return affiliationList;
	}

	@Override
	public List<AccountBrand> getBrands(Long accountrecid) {
		String queryString = "SELECT " + "   affil.affiliationid, " + "   affil.affiliationname, " + "  affil.gpp_optional_brand, " + " CASE "
				+ "       WHEN ba.affiliationid IS NULL " + "       THEN 'N' " + "       ELSE 'Y' "
				+ "   END canprice, " + "   service_level, " + "   defaultroompools, " + "   CASE "
				+ "       WHEN arp.max_roompool IS NULL " + "        OR "
				+ "           arp.max_roompool<defaultroompools " + "       THEN defaultroompools "
				+ "       ELSE arp.max_roompool " + "   END currentroompool, " + "   adfp.account_percentid, "
				+ "   adfp.default_floatpercent default_percent, " + "   CASE "
				+ "       WHEN mfpproc.fn_islosbrand(affil.affiliationid)='Y' " + "       THEN 'Extended Stay' "
				+ "       ELSE " + "           CASE affil.service_level " + "               WHEN 'F' "
				+ "               THEN 'Full Service' " + "               WHEN 'L' "
				+ "               THEN 'Modern Essentials' " + "               ELSE 'IN' " + "           END "
				+ "   END servicetype " + "FROM " + "   (SELECT a.AFFILIATIONID, " + "       a.affiliationname, " + "       a.gpp_optional_brand, "
				+ "       service_level, " + "       MAX(br.roompoolid) defaultroompools "
				+ "   FROM mfpdbo.hotelaffiliation a, " + "       mfpdbo.brand_roompools_ref br "
				+ "   WHERE a.PARENTID=990 " + "   AND " + "       br.affiliationid=a.affiliationid " + "   AND "
				+ "       br.ALWAYS_ALLOW='Y' " + "   GROUP BY a.AFFILIATIONID, " + "       a.affiliationname, " + "       a.gpp_optional_brand, "
				+ "       a.service_level " + "   ) affil, "
				+ "   (SELECT affiliationid, max_roompool FROM mfpdbo.account_defaultroompools WHERE accountrecid=?1 "
				+ "   ) arp, "
				+ "   (SELECT account_percentid, accountrecid, affiliationid, default_floatpercent FROM mfpdbo.account_defaultfloatpercent WHERE accountrecid = ?1 "
				+ "   ) adfp, " + "   (SELECT affiliationid FROM mfpdbo.brand_accounts WHERE accountrecid=?1 "
				+ "   ) ba " + "WHERE affil.affiliationid=arp.affiliationid(+) " + "AND "
				+ "    affil.affiliationid=adfp.affiliationid(+) " + "AND "
				+ "    affil.affiliationid=ba.affiliationid(+) " + "ORDER BY " + "    CASE "
				+ "        WHEN mfpproc.fn_islosbrand(affil.affiliationid)='Y' " + "        THEN 2 " + "        ELSE "
				+ "            CASE affil.service_level " + "                WHEN 'F' " + "                THEN 1 "
				+ "                ELSE 3 " + "            END " + "    END, " + "    affil.affiliationname";

		Query q = em.createNativeQuery(queryString, AccountBrand.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<AccountBrand> accountBrands = q.getResultList();

		return accountBrands;
	}
	
	public List<AccountBrandList> getAccountBrandList(Long accountrecid) {
		String queryString = "SELECT accountrecid, affiliationid, value FROM MFPDBO.GPP_BRAND_ACCOUNTS WHERE accountrecid=?1";

		Query q = em.createNativeQuery(queryString, AccountBrandList.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<AccountBrandList> accountBrandList = q.getResultList();

		return accountBrandList;
	}
	
	public AccountDetailBrands updateBrands(AccountDetailBrands adb) {
		boolean check = false;
		for (int i=0; i<adb.getBrands().size(); i++){
			if (adb.getBrands().get(i).getGpp_optional_brand().equals("Y")){
				for (int j=0; j<adb.getAccountbrandlist().size(); j++){
					if(adb.getBrands().get(i).getAffiliationid().equals(adb.getAccountbrandlist().get(j).getAffiliationid())){
						adb.getBrands().get(i).setGpp_value(adb.getAccountbrandlist().get(j).getValue());
						check = true;
						break;
					}
				}
//				if(!check){
//					if (adb.getAer_account().equalsIgnoreCase("Y")){
//						adb.setGpp_check("Y");
//					} else {
//						adb.setGpp_check("N");
//					}
//					adb.getBrands().get(i).setGpp_value("Y");
//				}
				check = false;
			}
		}
		if (adb.getAer_account().equalsIgnoreCase("Y")){
			adb.setGpp_check("Y");
		} else {
			adb.setGpp_check("N");
		}
		return adb;
	}

	/*
	 * Changes for Cannot price Start - added the new method to retrieve the
	 * Cannot Price details for New Account
	 */
	public List<HotelAffiliation> getNewAccountBrandsCannotPrice(long accountrecid) {
		String queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990) "
				+ "AND a.affiliationid NOT IN (SELECT affiliationid FROM mfpdbo.brand_accounts WHERE accountrecid=?1)"
				+ " AND a.affiliationid IN ('789','456','146')" + "ORDER BY A.AFFILIATIONNAME ASC";
		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<HotelAffiliation> affiliationList = q.getResultList();

		return affiliationList;
	}
	/*
	 * Changes for Cannot price Start - added the new method to retrieve the
	 * Cannot Price details for New Account
	 */

	/*
	 * Changes for Cannot price Start - added the new method to retrieve the Can
	 * Price details for New Account
	 */

	public List<HotelAffiliation> getNewAccountBrandsCanPrice(long accountrecid) {
		String queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990) "
				+ "AND a.affiliationid NOT IN (SELECT affiliationid FROM mfpdbo.brand_accounts WHERE accountrecid=?1)"
				+ " AND a.affiliationid NOT IN ('789','456','146')" + "ORDER BY A.AFFILIATIONNAME ASC";
		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<HotelAffiliation> affiliationList = q.getResultList();

		return affiliationList;
	}
	/*
	 * Changes for Cannot price End - added the new method to retrieve the Can
	 * Price details for New Account
	 */

	public List<RateProgram> getRatePrograms(long accountrecid, String aer_account,boolean isAccMaint) {

		String queryString = "SELECT a.rateprog, is_aer_rpgm, sequence, subsequence, a.rateoffername, a.rateofferid  FROM mfpdbo.account_rateprog a WHERE (a.accountrecid =?1) ";
		if (aer_account != null && aer_account.equals("Y"))
			queryString += " and is_aer_rpgm='Y' ";
		else
			queryString += " and (is_aer_rpgm is null or is_aer_rpgm='N') ";
		queryString += "ORDER BY A.SEQUENCE ,A.SUBSEQUENCE ASC";
		Query q = em.createNativeQuery(queryString, RateProgram.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<RateProgram> rpgmList = new ArrayList<RateProgram>(q.getResultList());
		if(isAccMaint) {
		List<RateProgram> ratePrograms = new ArrayList<RateProgram>();
		if (!org.apache.commons.collections4.CollectionUtils.isEmpty(rpgmList)) {
			for (int sequence = 1; sequence <= 3; sequence++) {
				for (int subsequence = 1; subsequence <= 2; subsequence++) {
					RateProgram rpgm = null;
					Iterator<RateProgram> iterator = rpgmList.iterator();
					while (iterator.hasNext()) {
						rpgm = iterator.next();
						if (rpgm.getSequence().longValue() == sequence
								&& null != rpgm.getSubsequence() && rpgm.getSubsequence().longValue() == subsequence) {
							ratePrograms.add(rpgm);
							iterator.remove();

						} else {
							rpgm = new RateProgram();
							rpgm.setSequence(new Long(sequence));
							rpgm.setSubsequence(new Long(subsequence));
							ratePrograms.add(rpgm);
						}
						break;

					}
				}
			}
		}

		return ratePrograms;
		}
		return rpgmList;

	}

	public List<RateProgram> getAllRatePrograms(long accountrecid) {

		String queryString = "SELECT a.rateprog, is_aer_rpgm, sequence, a.rateoffername, a.rateofferid  FROM mfpdbo.account_rateprog a WHERE (a.accountrecid =?1) "
				+ " AND rateprog IS NOT NULL ORDER BY is_aer_rpgm, A.SEQUENCE ASC, A.SUBSEQUENCE ASC";
		Query q = em.createNativeQuery(queryString, RateProgram.class);
		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<RateProgram> rpgmList = q.getResultList();

		return rpgmList;
	}

	public List<AccountThirdPartyRegion> getThirdPartyRegions(long accountrecid) {

		String queryString = " SELECT   account_thirdpartyregion, a.account_thirdparty_ref_id, b.account_thirdpartyregionid "
				+ " FROM (SELECT *   FROM mfpdbo.account_thirdparty   WHERE accountrecid = ?1) a,   mfpdbo.account_thirdpartyregion b "
				+ " WHERE (b.account_thirdpartyregionid = a.regionid(+))  ORDER BY b.seqid ASC";

		Query q = em.createNativeQuery(queryString, AccountThirdPartyRegion.class);

		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<AccountThirdPartyRegion> accountThirdParties = q.getResultList();

		return accountThirdParties;
	}

	public List<AccountDefaultPercents> getDefaultPercents(long accountrecid) {

		String queryString = "SELECT   ha.affiliationname, ha.affiliationid,  adfp.account_percentid, adfp.default_floatpercent default_percent "
				+ " FROM (SELECT account_percentid, accountrecid, affiliationid, default_floatpercent FROM mfpdbo.account_defaultfloatpercent  WHERE accountrecid = ?1 ) adfp, "
				+ " mfpdbo.hotelaffiliation ha WHERE (ha.affiliationid = adfp.affiliationid(+)) AND (ha.parentid = 990) ORDER BY affiliationname ASC";
		Query q = em.createNativeQuery(queryString, AccountDefaultPercents.class);

		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<AccountDefaultPercents> accountdefaultpercents = q.getResultList();

		return accountdefaultpercents;
	}

	public List<AccountDefaultRoompools> getDefaultRoompools(long accountrecid) {
		String queryString = "SELECT defaultroompools, CASE WHEN b.max_roompool IS NULL OR b.max_roompool<defaultroompools THEN defaultroompools ELSE max_roompool END currentroompool, "
				+ " a.affiliationid, a.affiliationname, DECODE(MFPPROC.FN_BRANDSERVICETYPE(a.affiliationid),'FS','Full Service','ES','Extended Stay','SS','Modern Essentials') servicetype "
				+ " FROM (SELECT max(br.roompoolid) defaultroompools, br.affiliationid, ha.affiliationname "
				+ " FROM mfpdbo.brand_roompools_ref br, mfpdbo.hotelaffiliation ha "
				+ " WHERE always_allow='Y' AND br.affiliationid=ha.affiliationid AND ha.parentid=990 "
				+ " GROUP BY br.affiliationid, ha.affiliationname) a, "
				+ " ( SELECT affiliationid, max_roompool FROM mfpdbo.account_defaultroompools WHERE accountrecid=?1) b  WHERE a.affiliationid=b.affiliationid(+) "
				+ "ORDER BY DECODE(MFPPROC.FN_BRANDSERVICETYPE(a.affiliationid),'FS',1,'ES',2,'SS',3),affiliationname";
		Query q = em.createNativeQuery(queryString, AccountDefaultRoompools.class);

		q.setParameter(1, accountrecid);

		@SuppressWarnings("unchecked")
		List<AccountDefaultRoompools> accountDefaultRoompools = q.getResultList();

		return accountDefaultRoompools;

	}

	@Override
	public AccountUpdateInfo updateAccount(AccountDetailGeneral adg, User user) {
		Boolean bAccNameExists = Boolean.FALSE;
		long newAccRecID = 0;
		Boolean bRateProgsOK = Boolean.TRUE;
		AccountUpdateInfo returncodes = new AccountUpdateInfo();
		returncodes.setBaccountnameexists(bAccNameExists);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				long accNameExists = 0;
				CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB1("
						+ "?,?,?,?,?,?,?,?,?,?,   " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?)}"); 
				try {
					cstmt.registerOutParameter(1, Types.NUMERIC);
					cstmt.registerOutParameter(39, Types.NUMERIC);
					cstmt.setLong(1, adg.getAccountrecid());
					cstmt.setLong(2, adg.getPeriod());
					cstmt.setString(3, adg.getAccountname());
					cstmt.setString(4, adg.getRpgm_accountname());
					cstmt.setString(5, adg.getAccountpricingtype());
					cstmt.setString(6, adg.getAccounttype());
					cstmt.setString(7, adg.getHotel_display());
					cstmt.setString(8, adg.getBt_booking_cost());
					cstmt.setLong(9, adg.getAccountpricingcycleid());
					cstmt.setString(10, adg.getOffcycle());
					if (adg.getContractstart() == null) {
						cstmt.setDate(11, null);
					} else {
						cstmt.setDate(11, (Date) new Date(adg.getContractstart().getTime()));
					}
					if (adg.getContractend() == null) {
						cstmt.setDate(12, null);
					} else {
						cstmt.setDate(12, (Date) new Date(adg.getContractend().getTime()));
					}
					if (adg.getOffcycle_numseasons() == null || adg.getOffcycle_numseasons().equals("")) {
						cstmt.setNull(13, Types.NUMERIC);
					} else {
						cstmt.setLong(13, adg.getOffcycle_numseasons().longValue());
					}
					cstmt.setLong(14, adg.getAltcancelpolicyid());
					cstmt.setLong(15, adg.getAltcancelpolicytimeid());
					cstmt.setString(16, adg.getAltcancelpolicynotes());
					cstmt.setString(17, adg.getAer_account());
					if (adg.getDefault_percent() == null || adg.getDefault_percent().equals("")) {
						cstmt.setNull(18, Types.NUMERIC);
					} else {
						cstmt.setLong(18, adg.getDefault_percent().longValue());
					}
					cstmt.setString(19, adg.getDiscfirsttieronly());
					cstmt.setString(20, adg.getAer_accountname());
					cstmt.setString(21, adg.getGov_account());
					cstmt.setString(22, adg.getGroupmeetings());
					cstmt.setString(23, adg.getNosquatter());
					cstmt.setString(24, adg.getTop_account());
					cstmt.setString(25, adg.getCommdef_tier());
					cstmt.setString(26, adg.getCommdef_acct());
					if (adg.getPricingperiodid() == null) {
						cstmt.setNull(27, Types.NUMERIC);
					} else {
						cstmt.setLong(27, adg.getPricingperiodid());
					}
					if (adg.getRfppulldate() == null) {
						cstmt.setDate(28, null);
					} else {
						cstmt.setDate(28, new Date(adg.getRfppulldate().getTime()));
					}
					cstmt.setString(29, adg.getAccount_hotel_view());
					if (adg.getHotel_display_date().equals("")) {
						cstmt.setDate(30, null);
					} else {
						cstmt.setDate(30, (Date) DateUtility.parseLongDate(adg.getHotel_display_date()));
					}
					cstmt.setLong(31, adg.getAltcancelpolicyoptionid());
					cstmt.setString(32, adg.getGpploiagreementonfile());
					cstmt.setString(33, adg.getGovvpproductenabled());
					cstmt.setString(34, adg.getPerdiemadjustmentsallowed());
					cstmt.setString(35, adg.getAcctwifipolicyid());
					if (adg.getRemindersdate() == null) {
						cstmt.setDate(36, null);
					} else {
						cstmt.setDate(36, new Date(adg.getRemindersdate().getTime()));
					}
					if (adg.getPassubmissiondate() == null) {
						cstmt.setDate(37, null);
					} else {
						cstmt.setDate(37, new Date(adg.getPassubmissiondate().getTime()));
					}
					if (adg.getClientduedate() == null) {
						cstmt.setDate(38, null);
					} else {
						cstmt.setDate(38, new Date(adg.getClientduedate().getTime()));
					}

					cstmt.execute();

					accNameExists = cstmt.getLong(39);
					if (accNameExists == 1) {
						bAccNameExists = Boolean.TRUE;
					} else {
						newAccRecID = cstmt.getLong(1);
						//long percent;
						//if (adg.getDefault_percent() == null || new Long(0).equals(adg.getDefault_percent())) {
						//	percent = Types.NUMERIC;
						//} else {
						//	percent = adg.getDefault_percent();
						//}
						//updateGPPEnabledBrandsRateType(newAccRecID, percent, true, adg.getAer_account(),
						//		adg.getOffcycle(), con);
						updateThirdParties(newAccRecID, adg.getAccountThirdPartyRegion(), con);
						updateHotelAcctDirect(newAccRecID, con);
					}
				} catch (ParseException e) {
					log.error(e.getMessage(),e);
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}
			returncodes.setAccountrecid(newAccRecID);
			returncodes.setBrateprogsok(bRateProgsOK);
			returncodes.setBaccountnameexists(bAccNameExists);

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

		return returncodes;
	}
	
	@Override
	public AccountUpdateInfo updateAccount_new(AccountDetailGeneral adg, User user) {
		Boolean bAccNameExists = Boolean.FALSE;
		long newAccRecID = 0;
		Boolean bRateProgsOK = Boolean.TRUE;
		if(adg.getAccountrecid() == 0){
			String queryString = "SELECT accountrecid FROM mfpdbo.ACCOUNT WHERE accountname=?1 and period=?2";
			Query q = em.createNativeQuery(queryString, AccountDetailGeneral.class);
			q.setParameter(1, adg.getAccountname());
			q.setParameter(2, adg.getPeriod());
			AccountDetailGeneral adgObj;
			try {
				adgObj = (AccountDetailGeneral) q.getSingleResult();
				bAccNameExists = Boolean.TRUE;
			} catch (NoResultException e) {
				adgObj = new AccountDetailGeneral();
			}
		}
		AccountUpdateInfo returncodes = new AccountUpdateInfo();
		returncodes.setBaccountnameexists(bAccNameExists);
				
		if(!bAccNameExists){
			if(adg.getAccountrecid() == 0){
				try {
					OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
					Connection con = (Connection) kem.getConnection();
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
					audit.setAuditUser(con);
					try {
						CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB1_CREATE("
								+ "?,?,?,?,?,?,?,?,?,?,   " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?,?,     " + "? )}");
						try {
							cstmt.registerOutParameter(1, Types.NUMERIC);
							cstmt.setLong(1, adg.getAccountrecid());
							cstmt.setLong(2, adg.getPeriod());
							cstmt.setString(3, adg.getAccountname());
							cstmt.setString(4, adg.getRpgm_accountname());
							cstmt.setString(5, adg.getAccountpricingtype());
							cstmt.setString(6, adg.getAccounttype());
							cstmt.setString(7, adg.getHotel_display());
							cstmt.setString(8, adg.getBt_booking_cost());
							cstmt.setLong(9, adg.getAccountpricingcycleid());
							cstmt.setString(10, adg.getOffcycle());
							if (adg.getContractstart() == null) {
								cstmt.setDate(11, null);
							} else {
								cstmt.setDate(11, (Date) new Date(adg.getContractstart().getTime()));
							}
							if (adg.getContractend() == null) {
								cstmt.setDate(12, null);
							} else {
								cstmt.setDate(12, (Date) new Date(adg.getContractend().getTime()));
							}
							if (adg.getOffcycle_numseasons() == null || adg.getOffcycle_numseasons().equals("")) {
								cstmt.setNull(13, Types.NUMERIC);
							} else {
								cstmt.setLong(13, adg.getOffcycle_numseasons().longValue());
							}
							cstmt.setLong(14, adg.getAltcancelpolicyid());
							cstmt.setLong(15, adg.getAltcancelpolicytimeid());
							cstmt.setString(16, adg.getAltcancelpolicynotes());
							cstmt.setString(17, adg.getAer_account());
							if (adg.getDefault_percent() == null || adg.getDefault_percent().equals("")) {
								cstmt.setNull(18, Types.NUMERIC);
							} else {
								cstmt.setLong(18, adg.getDefault_percent().longValue());
							}
							cstmt.setString(19, adg.getDiscfirsttieronly());
							cstmt.setString(20, adg.getAer_accountname());
							cstmt.setString(21, adg.getGov_account());
							cstmt.setString(22, adg.getGroupmeetings());
							cstmt.setString(23, adg.getNosquatter());
							cstmt.setString(24, adg.getTop_account());
							cstmt.setString(25, adg.getCommdef_tier());
							cstmt.setString(26, adg.getCommdef_acct());
							if (adg.getPricingperiodid() == null) {
								cstmt.setNull(27, Types.NUMERIC);
							} else {
								cstmt.setLong(27, adg.getPricingperiodid());
							}
							if (adg.getRfppulldate() == null) {
								cstmt.setDate(28, null);
							} else {
								cstmt.setDate(28, new Date(adg.getRfppulldate().getTime()));
							}
							cstmt.setString(29, adg.getAccount_hotel_view());
							if (adg.getHotel_display_date().equals("")) {
								cstmt.setDate(30, null);
							} else {
								cstmt.setDate(30, (Date) DateUtility.parseLongDate(adg.getHotel_display_date()));
							}
							cstmt.setLong(31, adg.getAltcancelpolicyoptionid());
							cstmt.setString(32, adg.getGpploiagreementonfile());
							cstmt.setString(33, adg.getGovvpproductenabled());
							cstmt.setString(34, adg.getPerdiemadjustmentsallowed());
							cstmt.setString(35, adg.getAcctwifipolicyid());
							if (adg.getRemindersdate() == null) {
								cstmt.setDate(36, null);
							} else {
								cstmt.setDate(36, new Date(adg.getRemindersdate().getTime()));
							}
							if (adg.getPassubmissiondate() == null) {
								cstmt.setDate(37, null);
							} else {
								cstmt.setDate(37, new Date(adg.getPassubmissiondate().getTime()));
							}
							if (adg.getClientduedate() == null) {
								cstmt.setDate(38, null);
							} else {
								cstmt.setDate(38, new Date(adg.getClientduedate().getTime()));
							}
							
							cstmt.setString(39, adg.getAllowEnhanced());
							
							//enhanced PGOOS = y, GPP = Y
							if(StringUtils.equals(adg.getAllowEnhanced(), "Y") && StringUtils.equals(adg.getAer_account(), "Y")) {
								cstmt.setLong(40, adg.getEnhancedDiscount());
								cstmt.setLong(41, adg.getEnhancedDiscountGpp());
							} 
							
							//enhanced PGOOS = y, GPP = N
							if(StringUtils.equals(adg.getAllowEnhanced(), "Y") && StringUtils.equals(adg.getAer_account(), "N") ) {
								cstmt.setLong(40, adg.getEnhancedDiscount());
								cstmt.setNull(41, Types.NUMERIC);
							} 
							
							//enhanced PGOOS = N , GPP = Y/N
							if(StringUtils.equals(adg.getAllowEnhanced(), "N") ) {
								cstmt.setNull(40, Types.NUMERIC);
								cstmt.setNull(41, Types.NUMERIC);
							}

							cstmt.execute();

							newAccRecID = cstmt.getLong(1);
							updateThirdParties(newAccRecID, adg.getAccountThirdPartyRegion(), con);
						} catch (ParseException e) {
							log.error(e.getMessage(),e);
						} catch (Exception e) {
							log.error(e.getMessage(),e);
						} finally {
							cstmt.close();
						}

						audit.deleteAuditUser(con);
					} finally {
						con.close();
					}
				} catch (SQLException ex) {
					log.error(ex.getMessage(),ex);
				}
			} else if (adg.getAccountrecid() != 0){
				newAccRecID = adg.getAccountrecid();
				try {
					OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
					Connection con = (Connection) kem.getConnection();
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
					audit.setAuditUser(con);
					try {
						updateThirdParties(newAccRecID, adg.getAccountThirdPartyRegion(), con);
						CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB1_UPDATE("
								+ "?,?,?,?,?,?,?,?,?,?,   " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?,?,    " + "?,?,?,?,?,?,?,?,?,?,    " + "? )}"); 
						try {
							cstmt.setLong(1, adg.getAccountrecid());
							cstmt.setLong(2, adg.getPeriod());
							cstmt.setString(3, adg.getAccountname());
							cstmt.setString(4, adg.getRpgm_accountname());
							cstmt.setString(5, adg.getAccountpricingtype());
							cstmt.setString(6, adg.getAccounttype());
							cstmt.setString(7, adg.getHotel_display());
							cstmt.setString(8, adg.getBt_booking_cost());
							cstmt.setLong(9, adg.getAccountpricingcycleid());
							cstmt.setString(10, adg.getOffcycle());
							if (adg.getContractstart() == null) {
								cstmt.setDate(11, null);
							} else {
								cstmt.setDate(11, (Date) new Date(adg.getContractstart().getTime()));
							}
							if (adg.getContractend() == null) {
								cstmt.setDate(12, null);
							} else {
								cstmt.setDate(12, (Date) new Date(adg.getContractend().getTime()));
							}
							if (adg.getOffcycle_numseasons() == null || adg.getOffcycle_numseasons().equals("")) {
								cstmt.setNull(13, Types.NUMERIC);
							} else {
								cstmt.setLong(13, adg.getOffcycle_numseasons().longValue());
							}
							cstmt.setLong(14, adg.getAltcancelpolicyid());
							cstmt.setLong(15, adg.getAltcancelpolicytimeid());
							cstmt.setString(16, adg.getAltcancelpolicynotes());
							cstmt.setString(17, adg.getAer_account());
							if (adg.getDefault_percent() == null || adg.getDefault_percent().equals("")) {
								cstmt.setNull(18, Types.NUMERIC);
							} else {
								cstmt.setLong(18, adg.getDefault_percent().longValue());
							}
							cstmt.setString(19, adg.getDiscfirsttieronly());
							cstmt.setString(20, adg.getAer_accountname());
							cstmt.setString(21, adg.getGov_account());
							cstmt.setString(22, adg.getGroupmeetings());
							cstmt.setString(23, adg.getNosquatter());
							cstmt.setString(24, adg.getTop_account());
							cstmt.setString(25, adg.getCommdef_tier());
							cstmt.setString(26, adg.getCommdef_acct());
							if (adg.getPricingperiodid() == null) {
								cstmt.setNull(27, Types.NUMERIC);
							} else {
								cstmt.setLong(27, adg.getPricingperiodid());
							}
							if (adg.getRfppulldate() == null) {
								cstmt.setDate(28, null);
							} else {
								cstmt.setDate(28, new Date(adg.getRfppulldate().getTime()));
							}
							cstmt.setString(29, adg.getAccount_hotel_view());
							if (adg.getHotel_display_date().equals("")) {
								cstmt.setDate(30, null);
							} else {
								cstmt.setDate(30, (Date) DateUtility.parseLongDate(adg.getHotel_display_date()));
							}
							cstmt.setLong(31, adg.getAltcancelpolicyoptionid());
							cstmt.setString(32, adg.getGpploiagreementonfile());
							cstmt.setString(33, adg.getGovvpproductenabled());
							cstmt.setString(34, adg.getPerdiemadjustmentsallowed());
							cstmt.setString(35, adg.getAcctwifipolicyid());
							if (adg.getRemindersdate() == null) {
								cstmt.setDate(36, null);
							} else {
								cstmt.setDate(36, new Date(adg.getRemindersdate().getTime()));
							}
							if (adg.getPassubmissiondate() == null) {
								cstmt.setDate(37, null);
							} else {
								cstmt.setDate(37, new Date(adg.getPassubmissiondate().getTime()));
							}
							if (adg.getClientduedate() == null) {
								cstmt.setDate(38, null);
							} else {
								cstmt.setDate(38, new Date(adg.getClientduedate().getTime()));
							}
							
							cstmt.setString(39, adg.getAllowEnhanced());
							//enhanced PGOOS = y, GPP = Y
							if(StringUtils.equals(adg.getAllowEnhanced(), "Y") && StringUtils.equals(adg.getAer_account(), "Y")) {
								cstmt.setLong(40, adg.getEnhancedDiscount());
								cstmt.setLong(41, adg.getEnhancedDiscountGpp());
							}
							
							//enhanced PGOOS = y, GPP = N
							if(StringUtils.equals(adg.getAllowEnhanced(), "Y") && StringUtils.equals(adg.getAer_account(), "N") ) {
								cstmt.setLong(40, adg.getEnhancedDiscount());
								cstmt.setNull(41, Types.NUMERIC);
							} 
							
							//enhanced PGOOS = N , GPP = Y/N
							if(StringUtils.equals(adg.getAllowEnhanced(), "N") ) {
								cstmt.setNull(40, Types.NUMERIC);
								cstmt.setNull(41, Types.NUMERIC);
							}
							cstmt.execute();

						} catch (ParseException e) {
							log.error(e.getMessage(),e);
						} catch (Exception e) {
							log.error(e.getMessage(),e);
						} finally {
							cstmt.close();
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
		
		returncodes.setAccountrecid(newAccRecID);
		returncodes.setBrateprogsok(bRateProgsOK);
		
		return returncodes;
	}

	@Override
	public AccountUpdateInfo updateAccountBrands(AccountDetailBrands adb, User user) {
		Boolean bRateProgsOK = Boolean.TRUE;
		AccountUpdateInfo returncodes = new AccountUpdateInfo();

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				CallableStatement cstmt = con
						.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB2(" + "?,?,?,?,?,?,?,?,?,?,   " + "?,?, " + "?,?,?,?,?)}"); 
				try {
					cstmt.setLong(1, adb.getAccountrecid());
					cstmt.setString(2, adb.getClustercode());
					cstmt.setString(3, adb.getAllow_floatnociel());
					cstmt.setString(4, adb.getAllow_modifications());
					if (adb.getStartmoddate() == null) {
						cstmt.setDate(5, null);
					} else {
						cstmt.setDate(5, (Date) new Date(adb.getStartmoddate().getTime()));
					}
					if (adb.getEndmoddate() == null) {
						cstmt.setDate(6, null);
					} else {
						cstmt.setDate(6, (Date) new Date(adb.getEndmoddate().getTime()));
					}
					cstmt.setString(7, adb.getAllow_qmodifications());
					if (adb.getStartqmoddate() == null) {
						cstmt.setDate(8, null);
					} else {
						cstmt.setDate(8, (Date) new Date(adb.getStartqmoddate().getTime()));
					}
					if (adb.getEndqmoddate() == null) {
						cstmt.setDate(9, null);
					} else {
						cstmt.setDate(9, (Date) new Date(adb.getEndqmoddate().getTime()));
					}
					cstmt.setString(10, adb.getAnalysisreportout());
					cstmt.setString(11, adb.getInternalpasnotes());
					cstmt.setString(12, adb.getAllowHotelcanPriceFloatVP());
					cstmt.setString(13, adb.getSet_id()); 
					cstmt.setString(14, adb.getRate_plan_id());
					cstmt.setString(15, adb.getAccountAllowFloatVP());
					cstmt.setString(16, adb.getRateLoadInstructionsGDS());
					cstmt.setString(17, adb.getRateLoadingNotes());

					cstmt.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}

				for (AccountBrand brand : adb.getBrands()) {

					cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_BRANDS_SW(" + "?,?,?,?,?)}");
					try {
						cstmt.setLong(1, adb.getAccountrecid());
						cstmt.setLong(2, brand.getAffiliationid());
						cstmt.setString(3, brand.getCanprice());
						if (brand.getDefault_percent() == null) {
							cstmt.setLong(4, 0L);
						} else {
							cstmt.setLong(4, brand.getDefault_percent());
						}
						cstmt.setLong(5, brand.getCurrentroompool());

						cstmt.execute();
					} catch (Exception e) {
						log.error(e.getMessage(),e);
					} finally {
						cstmt.close();
					}
				}
				
				for (AccountBrand brand : adb.getBrands()) {
					if((null != brand.getGpp_optional_brand()) && (brand.getGpp_optional_brand().equalsIgnoreCase("Y"))){
						cstmt = con.prepareCall("{call MFPPROC.SP_UPDATE_GPP_BRAND_ACCOUNTS(" + "?,?,?)}");
						try {
							cstmt.setLong(1, adb.getAccountrecid());
							cstmt.setLong(2, brand.getAffiliationid());
							if (brand.getGpp_value().equalsIgnoreCase("Y")){
								cstmt.setString(3, "Y");
							} else {
								cstmt.setString(3, "N");
							}
							cstmt.execute();
						} catch (Exception e) {
							log.error(e.getMessage(),e);
						} finally {
							cstmt.close();
						}
					}
				}
				
				boolean bRateprogramsOK, bAerRateprogramsOK;
				bRateprogramsOK = updateRatePrograms(adb.getAccountrecid(), adb.getPeriod(), adb.getRateprograms(),
						false, con);
				bAerRateprogramsOK = updateRatePrograms(adb.getAccountrecid(), adb.getPeriod(),
						adb.getAerrateprograms(), true, con);
				if (!bRateprogramsOK || !bAerRateprogramsOK) {
					bRateProgsOK = Boolean.FALSE;
				}
				returncodes.setBrateprogsok(bRateProgsOK);

				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

		return returncodes;
	}
        
	public void updateAccountDetailRFP(AccountDetailRFP adr, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB3(" + "?,?,?,?,?,?,?,?,?,?," + "?,?,?,?,?,?,?,?,?,?," + "?,?,?,?,?,?,?)}"); 
				try {
					cstmt.setLong(1, adr.getAccountrecid());
					if (adr.getNum_requiredfields() == null) {
						cstmt.setNull(2, Types.NUMERIC);
					} else {
						cstmt.setLong(2, adr.getNum_requiredfields());
					}
					cstmt.setString(3, adr.getContain_userdefques());
					if (adr.getGbtaformat() == null) {
						cstmt.setNull(4, Types.NUMERIC);
					} else {
						cstmt.setLong(4, adr.getGbtaformat());
					}
					if (adr.getMaxseason() == null) {
						cstmt.setNull(5, Types.NUMERIC);
					} else {
						cstmt.setLong(5, adr.getMaxseason());
					}
					if (adr.getMaxrt() == null) {
						cstmt.setNull(6, Types.NUMERIC);
					} else {
						cstmt.setLong(6, adr.getMaxrt());
					}
					if (adr.getRtallowed() == null) {
						cstmt.setNull(7, Types.NUMERIC);
					} else {
						cstmt.setLong(7, adr.getRtallowed());
					}
					if (adr.getRatevisible() == null) {
						cstmt.setNull(8, Types.NUMERIC);
					} else {
						cstmt.setLong(8, adr.getRatevisible());
					}
					cstmt.setString(9, adr.getAddquestnotes());
					if (adr.getEdierfp() == null) {
						cstmt.setNull(10, Types.NUMERIC);
					} else {
						cstmt.setLong(10, adr.getEdierfp());
					}
					if (adr.getEdiebt() == null) {
						cstmt.setNull(11, Types.NUMERIC);
					} else {
						cstmt.setLong(11, adr.getEdiebt());
					}
					if (adr.getEdieaq() == null) {
						cstmt.setNull(12, Types.NUMERIC);
					} else {
						cstmt.setLong(12, adr.getEdieaq());
					}
					cstmt.setString(13, adr.getAddrepformat());
					cstmt.setString(14, adr.getBlackoutdateshidden());
					cstmt.setString(15, adr.getMaxnum_blackoutdates());
					cstmt.setString(16, adr.getMaxnum_blackoutperiod());
					cstmt.setString(17, adr.getTaxfields());
					cstmt.setString(18, adr.getAddnotes_rfp());
					cstmt.setString(19, adr.getPresentfcr());
					cstmt.setString(20, adr.getFilesubmission());
					cstmt.setString(21, adr.getPb());
					cstmt.setString(22, adr.getCs());
					cstmt.setString(23, adr.getSs());
					cstmt.setString(24, adr.getBd());
					cstmt.setString(25, adr.getGm());
					cstmt.setString(26, adr.getCsr());
					cstmt.setString(27, adr.getEs());
				    cstmt.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
				
			    audit.deleteAuditUser(con);
				} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}		
        
	private void updateDefaultPercents(long accountRecID, List<AccountDefaultPercents> dp, Connection con)
			throws SQLException {
		CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_updateaccount_dflt_percent(?, ?, ?)}");
		try {
			for (int i = 0; i < dp.size(); i++) {
				AccountDefaultPercents dpm = (AccountDefaultPercents) dp.get(i);
				cstmt.setLong(1, accountRecID);
				cstmt.setLong(2, dpm.getAffiliationid());
				if (dpm.getDefault_percent() == null)
					cstmt.setNull(3, Types.NUMERIC);
				else
					cstmt.setLong(3, dpm.getDefault_percent().longValue());
				cstmt.execute();
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateDefaultRoompools(long accountRecID, List<AccountDefaultRoompools> dp, Connection con)
			throws SQLException {
		CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_updateaccount_dflt_roompool(?, ?, ?)}");
		try {
			for (int i = 0; i < dp.size(); i++) {
				AccountDefaultRoompools dpm = (AccountDefaultRoompools) dp.get(i);
				cstmt.setLong(1, accountRecID);
				cstmt.setLong(2, dpm.getAffiliationid());
				if (dpm.getCurrentroompool() == null)
					cstmt.setNull(3, Types.NUMERIC);
				else
					cstmt.setLong(3, dpm.getCurrentroompool().longValue());
				cstmt.execute();
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateGPPEnabledBrands(long accountRecID, String[] enabledBrandsList, boolean isEnabled,
			Connection con) throws Exception {
		CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_GPP_BRANDS(?, ?, ?)}");
		try {
			if (enabledBrandsList != null && enabledBrandsList.length > 0) {
				for (int i = 0; i < enabledBrandsList.length; i++) {
					cstmt.setLong(1, accountRecID);
					cstmt.setLong(2, new Long(enabledBrandsList[i]).longValue());
					cstmt.setString(3, (isEnabled ? "Y" : "N"));
					cstmt.execute();
				}
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateGPPEnabledBrandsRateType(long accountRecID, long percent, boolean isEnabled, String aerAccount,
			String offCycle, Connection con) throws Exception {
		CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_GPP_BRDS_RT(?,?,?,?)}");
		try {
			cstmt.setLong(1, accountRecID);
			cstmt.setLong(2, percent);
			cstmt.setString(3, aerAccount);
			cstmt.setString(4, offCycle);
			cstmt.execute();
		} finally {
			cstmt.close();
		}
	}

	private void updateBrandsAllowed(long accountRecID, String[] canPrice, Connection con) throws Exception {
		CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_BRANDS(?, ?, 'Y')}");
		try {
			if (canPrice != null && canPrice.length > 0) {
				for (int i = 0; i < canPrice.length; i++) {
					cstmt.setLong(1, accountRecID);
					cstmt.setLong(2, new Long(canPrice[i]).longValue());
					cstmt.execute();
				}
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateBrandsNotAllowed(long accountRecID, String[] canNotPrice, Connection con) throws Exception {
		CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_BRANDS(?, ?, 'N')}");
		try {
			if (canNotPrice != null && canNotPrice.length > 0) {
				for (int i = 0; i < canNotPrice.length; i++) {
					cstmt.setLong(1, accountRecID);
					cstmt.setLong(2, new Long(canNotPrice[i]).longValue());
					cstmt.execute();
				}
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateThirdParties(long accountRecID, List<AccountThirdPartyRegion> thirdParties, Connection con)
			throws SQLException {
		CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_updateaccount_rfps(?, ?, ?)}");
		try {
			for (int i = 0; i < thirdParties.size(); i++) {
				AccountThirdPartyRegion thirdPartymodel = (AccountThirdPartyRegion) thirdParties.get(i);
				cstmt.setLong(1, accountRecID);
				cstmt.setLong(2, thirdPartymodel.getAccount_thirdpartyregionid());
				cstmt.setLong(3, thirdPartymodel.getAccount_thirdparty_ref_id());
				cstmt.execute();
			}
		} finally {
			cstmt.close();
		}
	}

	private void updateHotelAcctDirect(long accountRecID, Connection con) throws SQLException {
		CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_HOTEL_DIRSW(?)}");
		try {
			cstmt.setLong(1, accountRecID);
			cstmt.execute();
		} finally {
			cstmt.close();
		}
	}

	private boolean updateRatePrograms(long accountRecID, long period, List<RateProgram> ratePrograms, boolean isAer,
			Connection con) {
		boolean bOK = true;
		if (ratePrograms != null) {
			try {
				CallableStatement cstmt = con
						.prepareCall("{call mfpproc.SP_UPDATEACCOUNT_RPGM_RPE(?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				cstmt.registerOutParameter(9, Types.NUMERIC);
				long isDupRateProg;
				try {
					String strIsAer = "N";
					if (isAer)
						strIsAer = "Y";
					for (int i = 0; i < ratePrograms.size(); i++) {
						RateProgram rpgm = (RateProgram) ratePrograms.get(i);
						cstmt.setLong(1, accountRecID);
						if (rpgm.getRateProg() != null && !rpgm.getRateProg().isEmpty()) {
							if (rpgm.getRateOfferId() != null)
								cstmt.setLong(2, rpgm.getRateOfferId());
							cstmt.setString(3, rpgm.getRateOfferName());
							cstmt.setString(4, rpgm.getRateProg());
						} else {
							cstmt.setNull(2, Types.NUMERIC);
							cstmt.setNull(3, Types.VARCHAR);
							cstmt.setNull(4, Types.VARCHAR);
						}
						cstmt.setLong(5, rpgm.getSequence());
						cstmt.setString(6, strIsAer);
						cstmt.setLong(7, period);
						cstmt.setLong(8, rpgm.getSubsequence());
						cstmt.execute();
						isDupRateProg = cstmt.getLong(9);
						if (isDupRateProg == 1) {
							bOK = false;
						}
					}
				} finally {
					cstmt.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			} catch (Exception ex) {
				log.error(ex.getMessage(),ex);
			}
		}
		return bOK;
	}

	public Long updateAccountCopyInfo(String cbCopyOv, long editperiod, long copyrec, User user) {

		Long newAccountRecID = new Long(0);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_updateaccountcopyinfo_rpe(?, ?, ?)}");
				try {
					cstmt.registerOutParameter(1, Types.NUMERIC);
					cstmt.setLong(2, editperiod);
					cstmt.setLong(3, copyrec);
					cstmt.execute();
					newAccountRecID = new Long(cstmt.getLong(1));
				} finally {
					cstmt.close();
				}
				if (cbCopyOv != null && cbCopyOv.equals("on")) {
					cstmt = con.prepareCall("{call MFPPROC.SP_INSERT_OVERVIEWS_NEWPERIOD(?,?)}");
					try {

						cstmt.setLong(1, newAccountRecID.longValue());
						cstmt.setLong(2, copyrec);

						cstmt.execute();
					} finally {
						cstmt.close();
					}
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

		return newAccountRecID;
	}

	public void deleteAccount(Long accountrecid, User user) {

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
			audit.setAuditUser(con);
			try {
				CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_DELETE_ACCOUNT(?)}");
				try {
					cstmt.setLong(1, accountrecid);
					cstmt.executeUpdate();
				} finally {
					cstmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public List<Account> getCopyAccountList(long copyperiod, long period) {

		String queryString = "SELECT accountrecid, accountname, accountid FROM mfpdbo.account WHERE period=?1"
				+ " AND accountid NOT IN (SELECT accountid FROM mfpdbo.account WHERE period=?2)"
				+ " ORDER BY accountname ASC";
		Query q = em.createNativeQuery(queryString, Account.class);
		q.setParameter(1, copyperiod);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<Account> accountList = q.getResultList();
		return accountList;
	}

	public AccountCenterInfo getShortAccountInfo(Long accountrecid) {
		String queryString = " SELECT a.bt_booking_cost, a.accountrecid, nosquatter, a.accountpricingcycleid, "
				+ "decode(TO_CHAR (pp.duedate, 'Mon dd, yyyy') , 'Dec 31, 9999','TBD', decode(TO_CHAR (pp.duedate, 'Mon dd, yyyy') , 'Jan 01, 9999','CBC Collection', TO_CHAR (pp.duedate, 'Mon dd, yyyy'))) duedate, "
				+ "  aer_account, atr.accounttypedescription,   mfpproc.fn_get_ismaxaerdiscount (a.aer_account, "
				+ " a.accountrecid   ) ismaxaer,   mfpproc.fn_ishotelaccountnew (hotel_display_date) isnew, mfpproc.fn_is_rollover (a.accountrecid) roll_over, "
				+ " a.hotel_display, a.accountname, a.period ,nvl( a.offcycle,'N') offcycle, nvl( a.top_account,'N') top_account  FROM mfpdbo.ACCOUNT a,  mfpdbo.pricingperiod_accounts ppa, "
				+ " mfpdbo.pricingperiod pp,  mfpdbo.accounttiertype_ref atr,  mfpdbo.ratetype_ref rr "
				+ " WHERE a.accountrecid = ppa.accountrecid AND ppa.pricingperiodid = pp.pricingperiodid "
				+ " AND a.accounttype = atr.accounttype  AND a.accountrecid = ?1 AND a.accounttype = rr.accounttype ";
		Query q = em.createNativeQuery(queryString, AccountCenterInfo.class);
		q.setParameter(1, accountrecid);
		AccountCenterInfo accountinfo = null;
		try {
			accountinfo = (AccountCenterInfo) q.getSingleResult();
		} catch (NoResultException ex) {
			accountinfo = null;
		}
		return accountinfo;

	}

	public List<AccountJson> getFilteredAccountListSAPP(long count, long start, String filter, long period, User user,
			boolean AllowEdit, String pFlag) {
		long endvalue = start + count + 1;
		long startvalue = start;
		String filterString = "";
		if (filter.length() > 1) {
			filterString = filter.toUpperCase();
			if (filterString.endsWith("*"))
				filterString = filterString.substring(0, filter.length() - 1);
		}

		String queryString = "SELECT accountname name, accountrecid";

		queryString += "  FROM (SELECT accountname, accountrecid, accountid, period FROM (SELECT accountname, accountrecid, accountid, period, ROWNUM arow "
				+ " FROM (SELECT   a.accountname, a.accountrecid, a.accountid, period  FROM mfpdbo.ACCOUNT a";
		if (!AllowEdit) {
			if (user.getIsAnySalesUser()) {
				if (user.getIsSalesUser()) {
					queryString += " Where ";
				} else if (user.getIsLimitedSalesUser()) {
					if (pFlag != null && pFlag.equals("H"))
						queryString += " Where ";
					else if (pFlag != null && pFlag.equals("N"))
						queryString += " Where accounttype in (Select accounttype from accounttiertype_ref where est_tier = 'Y') AND ";
					else
						// participate=A - account only
						queryString += " , MFPDBO.DS_GROUP B , MFPDBO.DS_ACCOUNTUSERS C, MFPDBO.DS_USER D WHERE   (C.ACCOUNTID = A.ACCOUNTID) "
								+ " AND (B.OU_GROUPID = C.OU_GROUPID)  AND (D.CN_USERID = C.CN_USERID)  AND (lower(D.EID) =lower('"
								+ StringUtility.replaceSingleQuotes(user.getEid()) + "'))  AND (B.OU_GROUP = '"
								+ user.getRole() + "') and ";
				}
			} else if (user.getIsPASAdmin() || user.getIsSAPPAdmin())
				queryString += " where ";
			else if (user.getIsHotelUser()) {
				if (pFlag.equals("H")
						|| (user.getEnhanced_Reporting() != null && user.getEnhanced_Reporting().equals("Y")))
					queryString += " where hotel_display='Y' and ";
				else
					queryString += "  where hotel_display='Y' AND accounttype in (Select accounttype from accounttiertype_ref where est_tier = 'Y') AND ";

			}
		} else {
			if (user.getIsAnySalesUser()) {
				queryString += " , MFPDBO.DS_GROUP B, MFPDBO.DS_ACCOUNTUSERS C, MFPDBO.DS_USER D WHERE   (C.ACCOUNTID = A.ACCOUNTID) AND (B.OU_GROUPID = C.OU_GROUPID) "
						+ " AND (D.CN_USERID = C.CN_USERID) AND (lower(D.EID) =lower('"
						+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) AND (B.OU_GROUP = '" + user.getRole()
						+ "') and ";

			} else if (user.getIsPASAdmin() || user.getIsSAPPAdmin())
				queryString += " where ";
		}

		queryString += " (period =" + period + ") AND UPPER (accountname) LIKE UPPER ('"
				+ StringUtility.replaceSingleQuotes(filterString) + "%')";

		queryString += "ORDER BY accountname ASC)) ";

		if (count != 0)
			queryString += " WHERE arow > " + startvalue + " AND arow <= " + endvalue;
		queryString += ") b, (SELECT   MAX (a2.period) max_period, a2.accountid  FROM mfpdbo.ACCOUNT a2, mfpdbo.accountinfo "
				+ " WHERE ((a2.accountrecid = accountinfo.accountrecid) AND (accountinfo.accountinfoid IS NOT NULL)) "
				+ " GROUP BY a2.accountid) c  WHERE b.accountid = c.accountid (+) order by accountname asc";

		Query q = em.createNativeQuery(queryString, AccountJson.class);
		@SuppressWarnings("unchecked")
		List<AccountJson> accountList = q.getResultList();
		return accountList;
	}

	public List<AccountJson> getAccountListHavingSAPPInfo(long count, long start, String filter, long period) {
		long endvalue = start + count + 1;
		long startvalue = start;
		String filterString = "";
		if (filter.length() > 1) {
			filterString = filter.toUpperCase();
			if (filterString.endsWith("*"))
				filterString = filterString.substring(0, filter.length() - 1);
		}

		String queryString = "  SELECT accountname name, accountrecid "
				+ " FROM (SELECT accountname, accountrecid, accountid, period, ROWNUM arow "
				+ " FROM (SELECT   a.accountname, a.accountrecid, a.accountid, period  FROM mfpdbo.ACCOUNT a, mfpdbo.accountinfo ai "
				+ " Where (period =" + period + ") AND UPPER (accountname) LIKE UPPER ('"
				+ StringUtility.replaceSingleQuotes(filterString) + "%')" + " AND a.accountrecid = ai.accountrecid ";

		queryString += "ORDER BY accountname ASC)) ";

		if (count != 0)
			queryString += " WHERE arow > " + startvalue + " AND arow <= " + endvalue;
		queryString += " order by accountname asc";

		Query q = em.createNativeQuery(queryString, AccountJson.class);
		@SuppressWarnings("unchecked")
		List<AccountJson> accountList = q.getResultList();
		return accountList;
	}

	public List<AccountJson> getAccountListNotHavingSAPPInfo(long count, long start, String filter, long period) {
		long endvalue = start + count + 1;
		long startvalue = start;
		String filterString = "";
		if (filter.length() > 1) {
			filterString = filter.toUpperCase();
			if (filterString.endsWith("*"))
				filterString = filterString.substring(0, filter.length() - 1);
		}

		String queryString = "  SELECT accountname name, accountrecid "
				+ " FROM (SELECT accountname, accountrecid, accountid, period, ROWNUM arow "
				+ " FROM (SELECT   a.accountname, a.accountrecid, a.accountid, period  FROM mfpdbo.ACCOUNT a "
				+ " WHERE (period =" + period + ") AND UPPER (accountname) LIKE UPPER ('"
				+ StringUtility.replaceSingleQuotes(filterString) + "%')"
				+ " AND a.accountrecid not in  (SELECT accountrecid from mfpdbo.accountinfo ) ";

		queryString += "ORDER BY accountname ASC)) ";

		if (count != 0)
			queryString += " WHERE arow > " + startvalue + " AND arow <= " + endvalue;
		queryString += "  order by accountname asc";

		Query q = em.createNativeQuery(queryString, AccountJson.class);
		@SuppressWarnings("unchecked")
		List<AccountJson> accountList = q.getResultList();
		return accountList;
	}

	public void copySappDetailsToNewAccount(long from_acctrecid, long to_acctrecid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_COPYSAPPDTL_TO_NEWACCT(?, ?)}");
				try {
					cstmt.setLong(1, from_acctrecid);
					cstmt.setLong(2, to_acctrecid);
					cstmt.execute();
				} finally {
					cstmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public List<AccountIdJson> getFilteredAccountListSCPT(long count, long start, String filter, long period,
			long hotelid, User user) {
		long endvalue = start + count + 1;
		long startvalue = start;
		String filterString = "";
		if (filter.length() > 1) {
			filterString = filter.toUpperCase();
			if (filterString.endsWith("*"))
				filterString = filterString.substring(0, filter.length() - 1);
		}

		String queryString = " SELECT accountid, accountname name, accounttype segment  FROM (SELECT accountid, accountname, accounttype, ROWNUM arow  FROM (  SELECT a.accountid, a.accountname, a.accounttype  FROM mfpdbo.account a, "
				+ " (  SELECT MAX (a2.period) max_period, a2.accountid  FROM mfpdbo.account a2  WHERE     ( (period <> ?1 AND a2.hotel_display = 'Y') OR period = ?2) "
				+ " AND accountpricingtype IN ('L', 'C')  AND period IN (SELECT period  FROM mfpdbo.period p  WHERE p.hotelsview = 'Y' OR p.period = ?3) "
				+ " GROUP BY a2.accountid) a2  WHERE     a2.accountid = a.accountid  AND a2.max_period = a.period  and a.accountid not in (select accountid from mfpdbo.scpt_account where hotelid=?4 and period=?5 and accountid is not null) "
				+ " AND (   accounttype NOT IN ('F', 'I')  OR (    a.period = ?6"
				+ " AND accounttype IN ('F', 'I')  AND ?7 IN (SELECT hotelid  FROM mfpdbo.account_solicited_hotels ash  WHERE ash.accountrecid = a.accountrecid))) "
				+ " AND UPPER (accountname) LIKE UPPER ('" + StringUtility.replaceSingleQuotes(filterString)
				+ "%')  ORDER BY accountname)) ";
		if (count != 0)
			queryString += " WHERE arow >= " + startvalue + " AND arow <= " + endvalue;

		Query q = em.createNativeQuery(queryString, AccountIdJson.class);
		q.setParameter(1, period);
		q.setParameter(2, period);
		q.setParameter(3, period);
		q.setParameter(4, hotelid);
		q.setParameter(5, period);
		q.setParameter(6, period);
		q.setParameter(7, hotelid);
		@SuppressWarnings("unchecked")
		List<AccountIdJson> accountList = q.getResultList();
		return accountList;
	}

	/* Cognos : View Report Functionality	*/
	public String findAccountName(long accountrecid) {
		String queryString = "SELECT  A.ACCOUNTNAME, a.period  FROM MFPDBO.ACCOUNT  A WHERE accountrecid=?1";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountrecid);
		String accountname = "";
		try {
			accountname = (String) q.getSingleResult();
		} catch (NoResultException e) {
			accountname = null;
		}

		return accountname;
	}
	/*Cognos : View Report Functionality	*/
	
	/* Cognos : EDIE Report Functionality	*/
	public String findProfileName(long profileid) {
		String queryString = "select profile_name from mfpdbo.edie_profile where profile_id=?1";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, profileid);
		String profilename = "";
		try {
			profilename = (String) q.getSingleResult();
		} catch (NoResultException e) {
			profilename = null;
		}

		return profilename;
	}
	/*Cognos : EDIE Report Functionality	*/

	@SuppressWarnings("unchecked")
	@Override
	public List<AccountHotelView> getAccountHotelViewlist() {
		String queryString = "SELECT ACCOUNT_HOTEL_VIEW, ACCOUNT_HOTEL_VIEW_DESC FROM MFPDBO.ACCOUNT_HOTEL_VIEW ORDER BY ACCOUNT_HOTEL_VIEW_DESC";
		Query q = em.createNativeQuery(queryString, AccountHotelView.class);

		List<AccountHotelView> accountHotelViewList = q.getResultList();
		return accountHotelViewList;
	}
	
	@SuppressWarnings("unchecked")
	public List<ComplexityAndRatings> getAddQuestCompList() {
		String queryString = "SELECT ratingval, ratingtext FROM mfpdbo.complexityandratings WHERE addquestcomp='Y' ORDER BY ratingval";
		Query q = em.createNativeQuery(queryString, ComplexityAndRatings.class);
		List<ComplexityAndRatings> addQuestCompList = q.getResultList();
		return addQuestCompList;
	}
	
	@SuppressWarnings("unchecked")
	public List<ComplexityAndRatings> getSatRatingList() {
		String queryString = "SELECT ratingval, ratingtext FROM mfpdbo.complexityandratings WHERE satrating='Y' ORDER BY ratingval";
		Query q = em.createNativeQuery(queryString, ComplexityAndRatings.class);
		List<ComplexityAndRatings> satRatingList = q.getResultList();
		return satRatingList;
	}

	@SuppressWarnings("unchecked")
	public List<ComplexityAndRatings> getTacBonusList() {
		String queryString = "SELECT ratingval, ratingtext FROM mfpdbo.complexityandratings WHERE tacbonus='Y' ORDER BY ratingval";
		Query q = em.createNativeQuery(queryString, ComplexityAndRatings.class);
		List<ComplexityAndRatings> tacBonusList = q.getResultList();
		return tacBonusList;
	}
	
	public void updateAccountDetailCompMatrix(AccountDetailCompMatrix adcm, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement cstmt = con.prepareCall("{call MFPPROC.SP_UPDATEACCOUNT_TAB4(?,?,?,?,?,?,?,?,?)}"); 
				try {
					cstmt.setLong(1, adcm.getAccountrecid());
					cstmt.setString(2, adcm.getMergacqrename());
					if (adcm.getAddquestcomp() == null) {
						cstmt.setNull(3, Types.NUMERIC);
					} else {
						cstmt.setLong(3, adcm.getAddquestcomp());
					}
					if (adcm.getSatrating() == null) {
						cstmt.setNull(4, Types.NUMERIC);
					} else {
						cstmt.setLong(4, adcm.getSatrating());
					}
					if (adcm.getTacbonus() == null) {
						cstmt.setNull(5, Types.NUMERIC);
					} else {
						cstmt.setLong(5, adcm.getTacbonus());
					}
					cstmt.setString(6, adcm.getTacbonuscomments());
					if (adcm.getTotrfpfilesent() == null) {
						cstmt.setNull(7, Types.NUMERIC);
					} else {
						cstmt.setLong(7, adcm.getTotrfpfilesent());
					}
					if (adcm.getTotrenegsubmit() == null) {
						cstmt.setNull(8, Types.NUMERIC);
					} else {
						cstmt.setLong(8, adcm.getTotrenegsubmit());
					}
					cstmt.setString(9, adcm.getRateauditcomments());
					cstmt.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
				
				CallableStatement cstmt_rfp_d = con.prepareCall("{call MFPPROC.SP_UPDATE_RFPFILESENT(?,?,?)}");
				try {
					cstmt_rfp_d.setLong(1, adcm.getAccountrecid());
					cstmt_rfp_d.setDate(2, null);
					cstmt_rfp_d.setString(3, "D");
					cstmt_rfp_d.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt_rfp_d.close();
				}
				
				for (RfpFileSentList rfp : adcm.getRfpfilesent()) {
					if(null != rfp){
						CallableStatement cstmt_rfp_i = con.prepareCall("{call MFPPROC.SP_UPDATE_RFPFILESENT(?,?,?)}");
						try {
							cstmt_rfp_i.setLong(1, adcm.getAccountrecid());
							if (rfp.getDateinfo() == null) {
								cstmt_rfp_i.setDate(2, null);
							} else {
								cstmt_rfp_i.setDate(2, (Date) new Date(rfp.getDateinfo().getTime()));
							}
							cstmt_rfp_i.setString(3, "I");
							cstmt_rfp_i.execute();
						} catch (Exception e) {
							log.error(e.getMessage(),e);
						} finally {
							cstmt_rfp_i.close();
						}
					}
				}
								
				CallableStatement cstmt_reneg_d = con.prepareCall("{call MFPPROC.SP_UPDATE_RENEGSUBMIT(?,?,?)}");
				try {
					cstmt_reneg_d.setLong(1, adcm.getAccountrecid());
					cstmt_reneg_d.setDate(2, null);
					cstmt_reneg_d.setString(3, "D");
					cstmt_reneg_d.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);;
				} finally {
					cstmt_reneg_d.close();
				}
				
				for (RenegSubmitList reneg : adcm.getRenegsubmit()) {
					if(null != reneg){
						CallableStatement cstmt_reneg_i = con.prepareCall("{call MFPPROC.SP_UPDATE_RENEGSUBMIT(?,?,?)}");
						try {
							cstmt_reneg_i.setLong(1, adcm.getAccountrecid());
							if (reneg.getDateinfo() == null) {
								cstmt_reneg_i.setDate(2, null);
							} else {
								cstmt_reneg_i.setDate(2, (Date) new Date(reneg.getDateinfo().getTime()));
							}
							cstmt_reneg_i.setString(3, "I");
							cstmt_reneg_i.execute();
						} catch (Exception e) {
							log.error(e.getMessage(),e);
						} finally {
							cstmt_reneg_i.close();
						}
					}
				}
		
				audit.deleteAuditUser(con);
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getGbtaList() {
		String queryString = "SELECT colvalue, coldesc FROM MFPDBO.rfpsettingslist WHERE gbta='Y' ORDER BY colvalue";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> gbtaList = q.getResultList();
		return gbtaList;
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getMaxseasonList() {
		String queryString = "SELECT colvalue, coldesc FROM MFPDBO.rfpsettingslist WHERE maxseason='Y' ORDER BY colvalue";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> maxseasonList = q.getResultList();
		return maxseasonList;
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getMaxrtList() {
		String queryString = "SELECT colvalue, coldesc FROM MFPDBO.rfpsettingslist WHERE maxrt='Y' ORDER BY colvalue";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> maxrtList = q.getResultList();
		return maxrtList;
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getRtallowedList() {
		String queryString = "SELECT colvalue, coldesc FROM MFPDBO.rfpsettingslist WHERE rtallowed='Y' ORDER BY colvalue";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> rtList = q.getResultList();
		return rtList;
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getRatevisibleList() {
		String queryString = "SELECT colvalue, coldesc FROM MFPDBO.rfpsettingslist WHERE ratevisible='Y' ORDER BY colvalue";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> rateList = q.getResultList();
		return rateList;
	}
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getEdierfpList() {
		String queryString = "SELECT profile_id as colvalue, profile_name FROM MFPDBO.edie_profile ORDER BY profile_name";
		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> edierfpList = q.getResultList();
		return edierfpList;
	}
	
	@SuppressWarnings("unchecked")
	public List<RfpSettingsList> getContactList(Long accountrecid, Long id) {
		String queryString = "SELECT a.contactname name, a.contactphone phone FROM MFPDBO.accountinfo_contacts a, MFPDBO.accountinfo b ";
		queryString += "WHERE (b.accountrecid = " + accountrecid + ") AND (b.accountinfoid = a.accountinfoid) AND a.contacttypeid = " + id;

		Query q = em.createNativeQuery(queryString, RfpSettingsList.class);
		List<RfpSettingsList> rfpContacts = q.getResultList();
		return rfpContacts;
	}
	
	public RFPLaunchEmail getRFPLaunchEmailDetails(long accountrecid) {
		String queryString = "SELECT " + "a.accountid, " + // start Account
															// fields
				"a.accountname, " + "a.accountpricingtype, " + "a.accountrecid, " + "a.groupmeetings, "
				+ "a.hotel_display, " + "a.period, " + "a.top_account, " + // end
																			// Account
																			// fields
				"a.accountpricingcycleid, " + // start AccountDetailGeneral
				"a.accounttype, " + "a.account_hotel_view," + "a.aer_account, "
				+ "a.aer_accountname, " + "mfpproc.fn_isaccounthotelaerselected(a.accountrecid) aerportfolio, "
				+ "a.altcancelpolicyid, a.altcancelpolicyoptionid," + "a.altcancelpolicynotes, " + "a.altcancelpolicytimeid, "
				+ "mfpproc.fn_getcontractend(a.accountrecid) contractend, "
				+ "mfpproc.fn_getcontractstart(a.accountrecid) contractstart ," + "a.default_percent, "
				+ "a.discfirsttieronly, " + "gov_account, "
				+ "TO_CHAR (a.hotel_display_date, 'mm/dd/yyyy') hotel_display_date, "
				+ "nvl(a.nosquatter,'N') nosquatter, "
				+ "nvl(a.offcycle,'N') offcycle, "
				+ "mfpproc.fn_get_maxnumseasons(a.accountrecid) offcycle_numseasons, "
				+ "b.pricingperiodid, mfpproc.fn_get_pricingperioddate(b.pricingperiodid) marrfpduedate, "
				+ "a.rpgm_accountname, " + "a.rfppulldate, "
				+ "mfpproc.fn_isaccountweblocked (a.accountrecid) weblocked, " 
				+ "a.gpploiagreementonfile, a.govvpproductenabled, a.perdiemadjustmentsallowed,"
				+ "a.remindersdate, " + "a.passubmissiondate, "
				+ "a.clientduedate, a.company_internal_code clustercode"
				+ ", a.pb, a.cs, a.ss, a.bd, a.gm, a.csr, a.es, a.contain_userdefques,a.maxseason, a.maxrt, "
				+ "a.rtallowed, mfpproc.fn_get_rfpsettingsdesc(a.rtallowed) rtalloweddesc, "
				+ "a.ratevisible, mfpproc.fn_get_rfpsettingsdesc(a.ratevisible) ratevisibledesc, a.blackoutdateshidden, a.maxnum_blackoutdates, "
				+ "a.maxnum_blackoutperiod, a.presentfcr"// end
				+ ", nvl(a.acctwifipolicyid,'N') rollover, nvl(a.allow_enhanced,'N') enhancedPgoos, case when nvl(a.aer_account,'N')='Y' then nvl(a.enhanceddiscountgpp,0) else nvl(a.enhanceddiscount,0) end enhancedDiscount, "
                + "a.accountallowfloatvp, a.allow_floatnociel, a.allowhotelcanpricefloatvp "
                + " FROM mfpdbo.ACCOUNT a, " + "mfpdbo.pricingperiod_accounts b, " + "mfpdbo.ratetype_rules_ref f, mfpdbo.ACCOUNTINFO ai,"
				+ "mfpdbo.ratetype_ref g, " + "( SELECT " + "	b.accountrecid, " + "	b.defaultvalue"
				+ "  FROM mfpdbo.account_defaultrules b " + " WHERE b.ruleid = 1 ) h "
				+ " WHERE (b.accountrecid(+) = a.accountrecid)" + " AND (f.ratetypeid = g.ratetypeid) "
				+ " AND (g.accounttype = a.accounttype)" + " AND (f.ruletypeid = 1)" + " AND (a.accountrecid = ?1)"
				+ " AND (h.accountrecid(+) = a.accountrecid) AND (ai.accountrecid(+) = a.accountrecid)";
		Query q = em.createNativeQuery(queryString, RFPLaunchEmail.class);
		q.setParameter(1, accountrecid);
		
		RFPLaunchEmail result;
		try {
			result = (RFPLaunchEmail) q.getSingleResult();
		} catch (NoResultException e) {
			result = new RFPLaunchEmail();
		}
		return result;
	}

	public String getRFPThirdPartyRegions(long accountrecid) {

		String queryString = " SELECT c.ACCOUNT_THIRDPARTY "
				+ " FROM (SELECT *   FROM mfpdbo.account_thirdparty WHERE regionid = 73 and accountrecid = ?1) a,   mfpdbo.account_thirdpartyregion b, "
				+ " MFPDBO.ACCOUNT_THIRDPARTY_REF c WHERE (b.account_thirdpartyregionid = 73) and a.account_thirdparty_ref_id = c.ACCOUNT_THIRDPARTY_REFID";

		Query q = em.createNativeQuery(queryString, String.class);

		q.setParameter(1, accountrecid);

		String accountthirdparty = "";
		try {
			accountthirdparty = (String) q.getSingleResult();
		} catch (NoResultException e) {
			accountthirdparty = null;
		}

		return accountthirdparty;
	}
	
	public void updateRFPAdditionalText(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail) {
		String querystring = "update mfpdbo.account set rfpadditionaltext=?1 where accountrecid=?2";
		Query q = em.createNativeQuery(querystring);
		log.info("rfpLaunchRecapEmail.getAdditional_text() "+rfpLaunchRecapEmail.getAdditional_text());
		log.info("accountrecid "+accountrecid);
		q.setParameter(1, rfpLaunchRecapEmail.getAdditional_text());
		q.setParameter(2, accountrecid);
		q.executeUpdate();
	}
	
	public RfpLaunchRecapEmail getRFPAdditionalText(Long accountrecid) {

		String queryString = " SELECT accountrecid, rfpadditionaltext additional_text "
				+ " FROM  mfpdbo.account where accountrecid = ?1 ";
		Query q = em.createNativeQuery(queryString, RfpLaunchRecapEmail.class);
		q.setParameter(1, accountrecid);
		RfpLaunchRecapEmail rfpLaunchRecapEmail = null;
		try {
			rfpLaunchRecapEmail = (RfpLaunchRecapEmail) q.getSingleResult();
		} catch (NoResultException e) {
			rfpLaunchRecapEmail = null;
			log.error(e.getMessage(),e);
		}
		return rfpLaunchRecapEmail;
	}
	
}
