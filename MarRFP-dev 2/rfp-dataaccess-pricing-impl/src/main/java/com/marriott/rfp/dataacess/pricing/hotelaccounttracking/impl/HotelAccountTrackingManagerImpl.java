package com.marriott.rfp.dataacess.pricing.hotelaccounttracking.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelaccounttracking.api.HotelAccountTrackingManager;
import com.marriott.rfp.object.pricing.accounttracking.Account_Tracking;
import com.marriott.rfp.object.pricing.accounttracking.Account_tracking_account;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelAccountTrackingManager
 */
@Service

public class HotelAccountTrackingManagerImpl implements HotelAccountTrackingManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Account_tracking_account> findAccountTrackingAccounts(long period, long endaccount, long startaccount) {
		String queryString = "SELECT   accountname, accountrecid  FROM   (SELECT accountname, accountrecid, ROWNUM arow  FROM (SELECT DISTINCT accountname, accountrecid   FROM mfpdbo.ACCOUNT "
				+ "   WHERE  hotel_display = 'Y'	and accountpricingtype <> 'P' AND accountrecid in (select accountrecid from mfpdbo.account_mcad_lookup) "
				+ " 	AND period = ?1   ORDER BY accountname))   WHERE arow>=?2 and arow <=?3";

		Query q = em.createNativeQuery(queryString, Account_tracking_account.class);
		q.setParameter(1, period);
		q.setParameter(2, startaccount);
		q.setParameter(3, endaccount);
		List<Account_tracking_account> account_tracking_accounts = q.getResultList();

		return account_tracking_accounts;

	}

	public Long findNumAccountTrackingAccounts(long period) {
		String queryString = "SELECT count(*)   FROM mfpdbo.ACCOUNT "
				+ "   WHERE  hotel_display = 'Y'	and accountpricingtype <> 'P' AND accountrecid in (select accountrecid from mfpdbo.account_mcad_lookup) "
				+ " 	AND period = ?1 ";

		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, period);
		Long numAccounts = (Long) q.getSingleResult();
		return numAccounts;
	}

	@SuppressWarnings("unchecked")
	public List<Account_Tracking> findAccountTrackingDetails(long accountrecid, String marshacode, long endmonth, long startmonth) {
		String queryString = "select  acct_tracking_period, roomnights, revenue, grp_roomnights, grp_revenue from mfpdbo.account_tracking a, mfpdbo.hotel b "
				+ " where a.hotelid(+)=b.hotelid and a.accountrecid=?1 and b.marshacode=?2 and acct_tracking_period between ?3 and  ?4 order by acct_tracking_period";

		Query q = em.createNativeQuery(queryString, Account_Tracking.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, marshacode);
		q.setParameter(3, startmonth);
		q.setParameter(4, endmonth);
		List<Account_Tracking> account_tracking = q.getResultList();

		return account_tracking;
	}

	public void updateAccountTrackingCurrency(long hotelrfpid) {

		String queryString = "begin  mfpproc.sp_updateaccttrackingcurr(?1); end;";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, hotelrfpid);
		q.executeUpdate();
	}

	public void updateAccountTracking(long hotelrfpid,long accountrecid,  List<Account_Tracking> account_tracking, User user) {
		String queryString = "begin mfpproc.sp_insertupdate_accttracking(?1,?2,?3,?4,?5,?6,?7); end;  ";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2,accountrecid);
		for (int i = 0; i < account_tracking.size(); i++) {
				q.setParameter(3, account_tracking.get(i).getAcct_tracking_period());
				q.setParameter(4, account_tracking.get(i).getRoomnights());
				q.setParameter(5, account_tracking.get(i).getRevenue());
				q.setParameter(6, account_tracking.get(i).getGrp_roomnights());
				q.setParameter(7, account_tracking.get(i).getGrp_revenue());
				q.executeUpdate();
		}

	}

}
