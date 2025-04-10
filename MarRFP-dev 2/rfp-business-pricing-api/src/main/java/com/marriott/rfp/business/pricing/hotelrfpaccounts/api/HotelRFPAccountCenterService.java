package com.marriott.rfp.business.pricing.hotelrfpaccounts.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNew;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNotViewable;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelNobidReason;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterFilterLists;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterSearch;
import com.marriott.rfp.object.pricing.hotelrfp.PriceButtonProductData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickHotelAccountCenter;
import com.marriott.rfp.object.user.User;


public interface HotelRFPAccountCenterService {

	public String findRebidPendingAlert(long hotelrfpid, String accountpricingtype, User user);

	public AccountCenterView findAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, Orderby orderby, Page page, User user, 
			HotelDetailData hotelDetailData);

	public List<AccountNotViewable> getAccountNotViewableList(long period, User user, String marshacode, String accountPricingType);

	public List<AccountNotViewable> getAccountOffcycleNotViewableList(long period, User user, String marshacode, String accountPricingType);

	public List<HotelNobidReason> findNobidReasons();

	public void updateAccountCenter(Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate, User user);

	public AccountCenterView findMultiHotelAccountCenterDetail(MultiHotelAccountCenterSearch mhacsearch, String filterString, Orderby orderby, Page page, User user);

	public MultiHotelAccountCenterFilterLists getMultiHotelAccountCenterFilterList(User user);

	public AccountCenterView findAccountRatesDetail(PricingFilterSelections filterValues, User user);

	public void updatePortfolioAccountRates(Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate, User user);

	public List<AccountNew> getNewAccounts(Long newforXdays, User user);

	public List<QuickHotelAccountCenter> getStatusChangedAccounts(Long newforXdays, User user, String marshacode);

	public List<QuickHotelAccountCenter> getRequestChangedAccounts(Long newforXdays, User user, String marshacode);

	public List<QuickHotelAccountCenter> getCBCChangedAccounts(Long newforXdays, User user, String marshacode);

	public List<QuickHotelAccountCenter> getRebidDueAccounts(User user, String marshacode);

	//GBTA-4 CPAC screen price button product selection
	public PriceButtonProductData getAccountMaintanenceFloatData(Long accountRecID);
}
