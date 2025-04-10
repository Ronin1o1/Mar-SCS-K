package com.marriott.rfp.business.pricing.filters.api;

import java.util.List;



import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.account.AccountIdJson;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.object.pricing.account.AccountSubset;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.filterLists.FilterLists;
import com.marriott.rfp.object.pricing.filterLists.NoFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingNoFilterSelections;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.salesregion.SalesRegion;
import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.User;


public interface PricingFilterListsService {

	public FilterLists getReportViewFilterLists(long period, User user);

	public List<Account> getAccountListForRole(Long period, Long duedate, String newAccountsOnly, String accountpricingtype, String accounttype, String searchgppaccountsonly, User user);

	public List<AccountSegment> getPricingAccountSegments();

	public List<PricingPeriod> getDueDates(Long period);

	public AccountCenterInfo getShortAccountInfo(Long accountrecid);

	public FilterLists getFilterViewLists(Long period, User user, String periodType);

	public List<AccountPricingType> getDisplayAccountPricingTypes();

	public List<AccountSubset> getAccountSubsets();

	public FilterLists getReportFilterViewLists(Long period, String reportType, User user);

	public NoFilterOptions getReportNoFilterViewLists(String reportType, User user, PricingNoFilterSelections pfs);

	public FilterLists getEdieFilterLists(Long period, User user);

	public List<SAPPModule> getSappModules(Long accountrecid, User user);

	public List<AccountJson> getFilteredAccountListSAPPView(long count, long start, String filter, long period, User user, String pFlag);

	public List<AccountJson> getFilteredAccountListSAPPEdit(long count, long start, String filter, long period, User user, String pFlag);

	public List<AccountSegment> getAllAccountSegments();

	public List<SalesRegion> getAllSalesRegions();

	public List<DSUser> getAccountPlanUserList(long accontrecid);

	public List<RateProgram> getAllRatePrograms(long accountrecid);
	
	public List<AccountJson> getAccountListHavingSAPPInfo(long count, long start, String filter, long period);
	
	public List<AccountJson> getAccountListNotHavingSAPPInfo(long count, long start, String filter, long period);
	public List<AccountIdJson> getFilteredAccountListSCPT(long count, long start, String filter, long period, long hotelid, User user);
	
	public List<AccountSegment> getPricingSCPTAccountSegments();

	public String findAccountAerType(long accountrecid) ;

	public List<PricingPeriod> getDueDatesWithCurrentDate(Long period);
	/*View report Functionality*/
	public String findAccountname(long accountrecid);
	/*View report Functionality*/
}
