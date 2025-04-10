package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
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


public interface HotelAccountCenterManager { 
	public List<HotelAccountCenter> findAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, Orderby orderby, Page page, User user);

	public RebidStatusAlert findRebidPendingAlert(long hotelrfpid, String accountpricingtype, User user);

	public long findNumAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, User user);

	public boolean findAllowFloatNoCiel(long hotelrfpid, User user);

	public boolean findShowOffcycleProducts(long hotelrfpid, String accountPricingType, User user);

	public boolean findHasGovPerDiemPricing(long hotelrfpid);

	public List<AccountNotViewable> getAccountNotViewableList(long period, User user, String marshacode, String accountPricingType);

	public List<AccountNotViewable> getAccountOffcycleNotViewableList(long period, User user, String marshacode, String accountPricingType);

	public void update(long hotel_accountinfoid, HotelAccountCenterUpdate hotelAccountCenterUpdate, User user);

	public List<HotelAccountCenter> findMultiHotelCenterDetail(MultiHotelAccountCenterSearch mhacsearch, String filterString, String canregionalize, Orderby orderby, Page page, User user);

	public long findNumMultiHotelCenterDetails(MultiHotelAccountCenterSearch mhacsearch, String filterString, String canregionalize, User user);

	public RebidStatusAlert findMultiHotelRebidPendingAlert(long accountrecid, String canregionalize, User user);

	public AccountCenterInfo findAccountCenterAccountInfo(long accountrecid);

	public void checkAccountCenter(long hotelrfpid, User user);

	public void update_portfolio(long hotel_accountinfoid, HotelAccountCenterUpdate hotelAccountCenterUpdate, User user);

	public List<AccountNew> getNewAccounts(Long newforXdays, User user);

	public List<QuickHotelAccountCenter> getStatusChangedAccounts(Long newforXdays, User user, String marshacode);

	public List<QuickHotelAccountCenter> getRequestChangedAccounts(Long newforXdays, User user, String marshacode);

	public List<QuickHotelAccountCenter> getRebidDueAccounts(User user, String marshacode);
	
	public List<QuickHotelAccountCenter> getCBCChangedAccounts(Long newforXdays, User user, String marshacode);
	
	public AccountCenterView fetchcbccounts(AccountCenterView acv, long hotelrfpid, long period);
	
	//GBTA-4 CPAC screen price button product selection
	public PriceButtonProductData findAccountMaintanenceFloatData(Long accountRecID);
}
