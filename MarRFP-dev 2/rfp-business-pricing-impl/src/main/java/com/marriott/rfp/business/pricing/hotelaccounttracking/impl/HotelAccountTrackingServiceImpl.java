package com.marriott.rfp.business.pricing.hotelaccounttracking.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelaccounttracking.api.HotelAccountTrackingService;
import com.marriott.rfp.dataaccess.currency.api.CurrencyManager;
import com.marriott.rfp.dataacess.pricing.hotelaccounttracking.api.HotelAccountTrackingManager;
import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.pricing.accounttracking.Account_Tracking;
import com.marriott.rfp.object.pricing.accounttracking.Account_tracking_account;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelAccountTrackingServiceImpl implements HotelAccountTrackingService {

    @Autowired
    private HotelAccountTrackingManager accountTrackingMgr = null;

    @Autowired
    private CurrencyManager currnecyMgr = null;

    public CurrencyData findAccountTrackingCurrency(long hotelrfpid) {
	return currnecyMgr.findAccountTrackingCurrency(hotelrfpid);
    }

    public Long findNumAccountTrackingAccounts(long period) {
	return accountTrackingMgr.findNumAccountTrackingAccounts(period);
    }

    public List<Account_tracking_account> findAccountTrackingDetails(String marshacode, long period, long periodSelected, long max_page_len, long page) {
	long endaccount = page * max_page_len;
	long startaccount = endaccount - max_page_len + 1;
	List<Account_tracking_account> accountTrackingAccounts = accountTrackingMgr.findAccountTrackingAccounts(period, endaccount, startaccount);

	long endmonth = periodSelected * 2;
	long startmonth = endmonth - 1;

	for (int i = 0; i < accountTrackingAccounts.size(); i++) {
	    List<Account_Tracking> accountTracking = accountTrackingMgr.findAccountTrackingDetails(accountTrackingAccounts.get(i).getAccountrecid(),
		    marshacode, endmonth, startmonth);
	    accountTrackingAccounts.get(i).setAccount_trackingDetails(accountTracking);
	}
	return accountTrackingAccounts;
    }

    public void updateAccountTracking(long hotelrfpid, List<Account_tracking_account> accountTrackingAccounts, User user) {
	if (accountTrackingAccounts != null) {
	    for (int i = 0; i < accountTrackingAccounts.size(); i++) {
		if (accountTrackingAccounts.get(i).getChanged().equals("Y")) {
		    accountTrackingMgr.updateAccountTracking(hotelrfpid, accountTrackingAccounts.get(i).getAccountrecid(), accountTrackingAccounts
			    .get(i).getAccount_trackingDetails(), user);
		}
	    }
	}
    }
}
