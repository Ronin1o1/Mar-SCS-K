package com.marriott.rfp.dataacess.pricing.hotelaccounttracking.api;

import java.util.List;



import com.marriott.rfp.object.pricing.accounttracking.Account_Tracking;
import com.marriott.rfp.object.pricing.accounttracking.Account_tracking_account;
import com.marriott.rfp.object.user.User;


public interface HotelAccountTrackingManager {
	public List<Account_tracking_account> findAccountTrackingAccounts(long period, long endaccount, long startaccount);

	public Long findNumAccountTrackingAccounts(long period);

	public List<Account_Tracking> findAccountTrackingDetails(long accountrecid, String marshacode, long endmonth, long startmonth);

	public void updateAccountTrackingCurrency(long hotelrfpid);
 
	public void updateAccountTracking(long hotelrfpid,long accountrecid,  List<Account_Tracking> account_tracking, User user);
}
