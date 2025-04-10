package com.marriott.rfp.business.pricing.hotelaccounttracking.api;

import java.util.List;



import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.pricing.accounttracking.Account_tracking_account;
import com.marriott.rfp.object.user.User;


public interface HotelAccountTrackingService {
	public CurrencyData findAccountTrackingCurrency(long hotelrfpid);

	public Long findNumAccountTrackingAccounts(long period);

	 public List<Account_tracking_account> findAccountTrackingDetails(String marshacode, long period, long periodSelected, long max_page_len, long page);
	
	public void updateAccountTracking(long hotelrfpid,  List<Account_tracking_account> accountTrackingAccounts, User user);
}
