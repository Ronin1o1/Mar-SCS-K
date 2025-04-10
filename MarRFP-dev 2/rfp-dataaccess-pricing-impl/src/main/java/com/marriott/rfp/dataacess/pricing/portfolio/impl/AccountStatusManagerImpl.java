package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountStatusListManager;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusList;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;


@Service
public class AccountStatusManagerImpl implements AccountStatusListManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private static final Logger logger = LoggerFactory.getLogger(AccountStatusManagerImpl.class);

	@SuppressWarnings("unchecked")

	public List<AccountStatusList> findAccountStatusListDetail(long period, String accountpricingtype,
			String accountsegment, int orderBy, Page page, String alphaOrder, User user, String pasManager,
			long accountstatus, String showPortfolio) {

		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;

		String orderString = " ORDER BY ACCOUNTNAME ASC ";
		switch (orderBy) {
		case 0:
			orderString = " ORDER BY ACCOUNTNAME ASC ";
			break;
		case 1:
			orderString = " ORDER BY decode(LOCKED, 'Y', 'Y',' ') DESC, ACCOUNTNAME ASC ";
			break;
		case 2:
			orderString = " ORDER BY  STATUS_TEXT ASC, ACCOUNTNAME ASC ";
			break;
		case 3:
			orderString = " ORDER BY decode(aer_account, 'Y', 'Y',' ') DESC, decode(Process_AER, 'Y', 'Y',' ') DESC, ACCOUNTNAME ASC ";
			break;
		case 4:
			orderString = " ORDER BY account_status_value ASC, ACCOUNTNAME ASC ";
			break;
		default:
			orderString = " ORDER BY ACCOUNTNAME ASC ";
			break;
		}

		String queryString = " SELECT a.accountrecid,  a.accountname, a.aer_account,   a.process_aer, "
				+ "  CASE WHEN a.locked IS NULL THEN 'N' ELSE a.locked END locked, CASE "
				+ "    WHEN a.account_status_id IS NULL THEN 2   ELSE a.account_status_id   END "
				+ "   acctStatusID,   a.account_status_value acctstatusname, "
				+ " TO_CHAR (a.locked_date, 'mm/dd/yyyy') lockdate,   a.status_text, a.internalnotes internalpasnotes, "
				+ "  mfpproc.fn_get_ismaxaerdiscount (a.aer_account, a.accountrecid) maxaer,  CASE "
				+ "    WHEN a.aer_account = 'Y' THEN  CASE   WHEN EXISTS   (SELECT 1 "
				+ "  FROM mfpdbo.account a1, mfpdbo.accountdirectory ad1, mfpdbo.hotel h1, mfpdbo.hotel_accountinfo ha1, mfpdbo.hotelrfp hr1, mfpdbo.accountrpflags ac1 "
				+ "  WHERE a1.accountrecid = ad1.accountrecid "
				+ "   AND h1.hotelid = ad1.hotelid   AND h1.hotelid = hr1.hotelid "
				+ "   AND hr1.hotelrfpid = ha1.hotelrfpid   AND ha1.accountrecid = a1.accountrecid "
				+ "   AND ac1.hotel_accountinfoid =   ha1.hotel_accountinfoid  AND a1.aer_account = 'Y' "
				+ "   AND ad1.selected = 'Y'  AND h1.partition_idx = 'M'   AND ac1.accepted = 'P' "
				+ "   AND a1.accountrecid = a.accountrecid   AND ac1.roompool <= "
				+ "  (SELECT max_roompool "
				+ "   FROM mfpdbo.account_defaultroompools adrp  WHERE adrp.accountrecid = "
				+ " a1.accountrecid  AND adrp.affiliationid =    h1.affiliationid) )  THEN   'Y' ELSE "
				+ "  'N' END ELSE NULL END  aer_ready,  ";
		if (showPortfolio.equals("N")) {
			queryString += " null ";
		} else {
			queryString += " CASE  WHEN EXISTS   (SELECT 1 "
					+ "  FROM mfpdbo.accountdirectory ad, mfpdbo.account a1, mfpdbo.hotel h "
					+ "  WHERE  h.hotelid = ad.hotelid    AND a1.accountrecid = ad.accountrecid  and a1.accountrecid=a.accountrecid "
					+ "   AND ad.selected = 'Y'    AND h.partition_idx = 'M'  )   THEN 'Y'   ELSE 'N' END ";
		}
		queryString += " portfolio  FROM (SELECT accountrecid, accountname, aer_account, locked, locked_date, accountid, "
				+ " process_aer, period , status_text, internalnotes, account_status_id, account_status_value   FROM (SELECT a2.accountrecid, accountname, aer_account, locked, "
				+ " locked_date, process_aer,  period, b2.status_text, b2.internalnotes, b2.account_status_id,  d.account_status_value, a2.accountid, "
				+ " ROW_NUMBER () OVER (" + orderString + ") arow  FROM mfpdbo.account a2, mfpdbo.account_load b2,    mfpdbo.account_status_ref d ";
		if (pasManager != null && !pasManager.equals("*")) {
			queryString += ", MFPDBO.ADMIN_RESPONDENT F2, MFPDBO.ADMIN_RESPONDENT_ACCOUNT G2 ";
		}
		if (user.getRole().equals("MFPSALES") || user.getRole().equals("MFPFSALE")) {
			queryString += " , MFPDBO.DS_GROUP f, MFPDBO.DS_ACCOUNTUSERS G , MFPDBO.DS_USER h ";
		}

				queryString += "   WHERE period = ?1  and a2.accountrecid=b2.accountrecid(+) AND account_tracking_only = 'N'  AND accountpricingtype  in ( 'L','C') ";
		if (accountpricingtype != null && !accountpricingtype.equals("*")) {
			queryString += " and accountpricingtype='" + accountpricingtype + "' "; 
		}
		if (accountsegment != null && !accountsegment.equals("*")) {
			queryString += " and accounttype='" + accountsegment + "' ";
		}
		if (alphaOrder != null && !alphaOrder.trim().equals("")) {
			queryString += " AND (UPPER(accountname) LIKE '"
					+ StringUtility.replaceSingleQuotes(alphaOrder.toUpperCase()) + "%') ";
		}
		if (accountstatus != 0) {
			queryString += "  and nvl(b2.ACCOUNT_STATUS_ID,2)='" + accountstatus + "' ";
		}
		
		if (showPortfolio.equals("Y")) {
			queryString += " and exists (SELECT 1 "
					+ "  FROM mfpdbo.accountdirectory ad, mfpdbo.account a1, mfpdbo.hotel h "
					+ "  WHERE  h.hotelid = ad.hotelid    AND a1.accountrecid = ad.accountrecid  and a1.accountrecid=a2.accountrecid "
					+ "   AND ad.selected = 'Y'    AND h.partition_idx = 'M'  )  ";
		}
		queryString += " and  CASE WHEN b2.account_status_id IS NULL THEN 2 ELSE b2.account_status_id END = d.account_status_id(+) ";
		if (user.getRole().equals("MFPSALES") || user.getRole().equals("MFPFSALE")) {
			queryString += " and  (G.ACCOUNTID = A2.ACCOUNTID) AND (f.OU_GROUPID = G.OU_GROUPID) "
					+ " AND (h.CN_USERID = G.CN_USERID) AND (lower(h.eid) =lower('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) "
					+ " AND (f.OU_GROUP ='MFPSALES' or f.ou_group='MFPFSALE') ";
		}

		if (pasManager != null && !pasManager.equals("*")) {
			queryString += " and  F2.ADMINRESPONDENTID = G2.ADMINRESPONDENTID AND G2.ADMINRESPONDENTACCOUNTRECID = A2.ACCOUNTRECID AND F2.ADMINRESPONDENTID="
					+ pasManager;
		}

		queryString += ") WHERE arow >= " + startaccount + " AND arow <= " + endaccount + ") a ";

		queryString +=    orderString;

		Query q = em.createNativeQuery(queryString, AccountStatusList.class);
		q.setParameter(1, period);

		List<AccountStatusList> accountStatusList = q.getResultList();
		return accountStatusList;
	}

	public long getNumAccountStatusListDetail(long period, String accountpricingtype, String accountsegment,
			int orderBy, String alphaOrder, User user, String pasManager, String showPortfolio) {
		Long numAccounts;
		String queryString = "";
		if (user.getRole().equals("MFPSALES") || user.getRole().equals("MFPFSALE")) {
			queryString = "SELECT count(*) "
					+ "FROM  MFPDBO.ACCOUNT A  , MFPDBO.DS_GROUP C, MFPDBO.DS_ACCOUNTUSERS D , MFPDBO.DS_USER E ";

			if (pasManager != null && !pasManager.equals("*"))
				queryString += " ,MFPDBO.ADMIN_RESPONDENT F, MFPDBO.ADMIN_RESPONDENT_ACCOUNT G ";
			queryString += " WHERE   (D.ACCOUNTID = A.ACCOUNTID) AND (C.OU_GROUPID = D.OU_GROUPID) "
					+ " AND (E.CN_USERID = D.CN_USERID) AND (lower(E.eid) =lower('"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "'))AND (A.PERIOD =?1"
					+ " AND A.ACCOUNT_TRACKING_ONLY='N' AND a.accountpricingtype <> 'P' "
					+ ") AND (C.OU_GROUP ='MFPSALES' or c.ou_group='MFPFSALE') ";
		} else {
			queryString = "SELECT count(*) FROM  MFPDBO.ACCOUNT A";
			if (pasManager != null && !pasManager.equals("*"))
				queryString += ", MFPDBO.ADMIN_RESPONDENT F, MFPDBO.ADMIN_RESPONDENT_ACCOUNT G ";
			queryString += " WHERE (A.PERIOD =?1) AND A.ACCOUNT_TRACKING_ONLY='N' AND a.accountpricingtype  in ( 'L','C')";
		}
		if (alphaOrder != null && !alphaOrder.trim().equals("")) {
			queryString += " AND (UPPER(accountname) LIKE '"
					+ StringUtility.replaceSingleQuotes(alphaOrder.toUpperCase()) + "%') ";
		}
		if (showPortfolio.equals("Y")) {
			queryString += " and exists (SELECT 1 "
					+ "  FROM mfpdbo.accountdirectory ad, mfpdbo.account a1, mfpdbo.hotel h "
					+ "  WHERE  h.hotelid = ad.hotelid    AND a1.accountrecid = ad.accountrecid AND a1.accountrecid=a.accountrecid "
					+ "   AND ad.selected = 'Y'    AND h.partition_idx = 'M'  )  ";
		}

		if (accountpricingtype != null && !accountpricingtype.equals("*")) {
			queryString += " and a.accountpricingtype='" + accountpricingtype + "' ";
		}
		if (accountsegment != null && !accountsegment.equals("*")) {
			queryString += " and a.accounttype='" + accountsegment + "' ";
		}
		if (pasManager != null && !pasManager.equals("*")) {
			queryString += " AND F.ADMINRESPONDENTID = G.ADMINRESPONDENTID AND G.ADMINRESPONDENTACCOUNTRECID = A.ACCOUNTRECID AND F.ADMINRESPONDENTID="
					+ pasManager;
		}

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, period);

		numAccounts = (Long) q.getSingleResult();
		return numAccounts.longValue();
	}

	public void update(AccountStatusList acctStatusList, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updateaccountstatus(?,?,?,? ,?,?,?); end; ");
				try {

					stmt.setLong(1, acctStatusList.getAccountrecid());
					stmt.setString(2, acctStatusList.getLocked());
					stmt.setString(3, acctStatusList.getStatus_text());
					stmt.setString(4, acctStatusList.getProcess_aer());
					stmt.setString(5, user.getShortRole());
					stmt.setLong(6, acctStatusList.getAcctStatusID());
					stmt.setString(7, acctStatusList.getInternalpasnotes());

					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException e) {
			logger.error(e.getMessage(),e);
		}
	}

}