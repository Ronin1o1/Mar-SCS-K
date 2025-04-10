package com.marriott.rfp.business.pricing.filters.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.dataaccess.hotel.api.HotelManager;
import com.marriott.rfp.dataaccess.region.api.RegionManager;
import com.marriott.rfp.dataaccess.report.api.ReportListManager;
import com.marriott.rfp.dataaccess.user.api.UserManager;
import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.accountpricingtype.api.AccountPricingTypeManager;
import com.marriott.rfp.dataacess.pricing.accountsegment.api.AccountSegmentManager;
import com.marriott.rfp.dataacess.pricing.accountsubset.api.AccountSubsetManager;
import com.marriott.rfp.dataacess.pricing.edie.api.EdieManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.dataacess.pricing.salesregion.api.SalesRegionManager;
import com.marriott.rfp.dataacess.pricing.sapp.api.SAPPModulesManager;
import com.marriott.rfp.dataacess.travelspending.api.TravelSpendingManager;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.account.AccountIdJson;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.object.pricing.account.AccountSubset;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.object.pricing.filterLists.FilterLists;
import com.marriott.rfp.object.pricing.filterLists.NoFilterLists;
import com.marriott.rfp.object.pricing.filterLists.NoFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingNoFilterSelections;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.salesregion.SalesRegion;
import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class PricingFilterListsServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class PricingFilterListsServiceImpl implements PricingFilterListsService {

	@Autowired
	private PeriodManager periodMgr = null;
	@Autowired
	private AccountManager accountMgr = null;
	@Autowired
	private AccountSegmentManager accountSegmentMgr = null;
	@Autowired
	private AccountPricingTypeManager accountPricingTypeMgr = null;
	@Autowired
	private AccountSubsetManager accountSubsetMgr = null;
	@Autowired
	private HotelPricingManager hotelPricingMgr = null;
	@Autowired
	private ReportListManager reportListMgr = null;
	@Autowired
	private TravelSpendingManager travelSpendingMgr = null;
	@Autowired
	private EdieManager edieMgr = null;
	@Autowired
	private RegionManager regionMgr = null;
	@Autowired
	private SAPPModulesManager sappModulesMgr = null;
	@Autowired
	private ReportService reportService = null;
	@Autowired
	private UserManager userMgr = null;
	@Autowired
	private HotelManager hotelMgr = null;
	@Autowired
	private SalesRegionManager salesRegionMgr = null;

	public FilterLists getReportViewFilterLists(long period, User user) {
		FilterLists filterLists = new FilterLists();
		List<Period> periodList = periodMgr.findAllPeriodsForRole(user.getRole());
		filterLists.setPeriodList(periodList);
		if (period == 0 && periodList != null && !periodList.isEmpty()) {
			Period thePeriod = periodList.get(0);
			period = thePeriod.getPeriod();
		}
		filterLists.setAccountList(accountMgr.findAccountListForRole(period, 0L, null, null, null, false, null, user));
		return filterLists;
	}

	public List<Account> getAccountListForRole(Long period, Long duedate, String newAccountsOnly, String accountpricingtype, String accounttype, String searchgppaccountsonly, User user) {
		return accountMgr.findAccountListForRole(period, duedate, newAccountsOnly, accountpricingtype, accounttype, false, searchgppaccountsonly, user);
	}

	public List<AccountSegment> getPricingAccountSegments() {
		return accountSegmentMgr.getPricingAccountSegmentsOrderByAccDesc();
	}

	public List<PricingPeriod> getDueDates(Long period) {
		if (period != 0)
			return periodMgr.findDueDates(period);
		else
			return null;
	}

	public List<PricingPeriod> getDueDatesWithCurrentDate(Long period) {
		if (period != 0)
			return periodMgr.findDueDatesWithCurrentDate(period);
		else
			return null;
	}

	public AccountCenterInfo getShortAccountInfo(Long accountrecid) {
		return accountMgr.getShortAccountInfo(accountrecid);
	}

	public FilterLists getFilterViewLists(Long period, User user, String periodType) {
		FilterLists filterLists = new FilterLists();
		List<Period> periodList = null;
		if (periodType.equals("W"))
			periodList = periodMgr.findAllWSPeriodsForRole(user.getRole());
		else
			periodList = periodMgr.findAllPeriodsForRole(user.getRole());

		filterLists.setPeriodList(periodList);
		filterLists.setBrandlist(hotelPricingMgr.getAffiliations());
		return filterLists;
	}

	public List<AccountPricingType> getDisplayAccountPricingTypes() {
		return accountPricingTypeMgr.getDisplayAccountPricingTypes();
	}

	public List<AccountSubset> getAccountSubsets() {
		return accountSubsetMgr.getAccountSubsets();
	}

	public List<SAPPModule> getSappModules(Long accountrecid, User user) {
		if (accountrecid == null)
			return null;
		else
			return sappModulesMgr.findSAPPModules(accountrecid, user);
	}

	public FilterLists getReportFilterViewLists(Long period, String reportType, User user) {
		FilterLists filterLists = getFilterViewLists(period, user, reportType);
		List<ReportModel> reportList = reportListMgr.getReportsFilterList(reportType, true, user);
		filterLists.setReportlist(reportList);
		filterLists.setExceldateformat(reportListMgr.findExcelDateFormats());
		return filterLists;
	}

	public NoFilterOptions getReportNoFilterViewLists(String reportType, User user, PricingNoFilterSelections pfs) {
		NoFilterOptions filterOptions = new NoFilterOptions();
		NoFilterLists filterLists = filterOptions.getNoFilterLists();
		List<ReportModel> reportList = reportListMgr.getReportsFilterList(reportType, false, user);

		filterLists.setReportlist(reportList);
		if (pfs != null && pfs.getReport() != null && !pfs.getReport().equals("")) {
			ReportModel rm = reportService.findReportDetails(pfs.getReport());
			filterOptions.setReportDetails(rm);
			if (rm != null) {
				if (rm.getAllow_period() != null && rm.getAllow_period().equals("Y")) {
					List<Period> periodList = periodMgr.findAllPeriodsForRole(user.getRole());
					filterLists.setPeriodList(periodList);
					if (pfs.getPeriod() == null && periodList != null && periodList.size() > 0) {
						pfs.setPeriod(periodList.get(0).getPeriod());
					}
				}
				if (rm.getAllow_accounttype() != null && rm.getAllow_accounttype().equals("Y")) {
					List<AccountSegment> accountSegmentList = accountSegmentMgr.getAllAccountSegments();
					filterLists.setAccountSegmentList(accountSegmentList);
				}
				if (rm.getAllow_account() != null && rm.getAllow_account().equals("Y")) {
					List<Account> accountList = null;
					if (rm.getReport_name().equals("eProximityReport")) {
						accountList = accountMgr.getAccountListByRoleForProximity(pfs.getPeriod(), pfs.getAccountType(), user);
					} else if (rm.getSale_all_account() != null && rm.getSale_all_account().equals("Y")) {
						accountList = accountMgr.getAccountList(pfs.getPeriod(), pfs.getAccountType(), user);
					} else {
						boolean includeap = false;
						if (rm.getAllow_apadminview() != null && rm.getAllow_apadminview().equals("Y"))
							includeap = true;

						accountList = accountMgr.findAccountListForRole(pfs.getPeriod(), 0L, "N", null, pfs.getAccountType(), includeap, "N", user);

					}
					filterLists.setAccountList(accountList);
				}
				if (rm.getAllow_proximitysubcat() != null && rm.getAllow_proximitysubcat().equals("Y") && pfs.getAccountrecid() != null && !pfs.getAccountrecid().equals(0L)
						&& pfs.getRetrieveSubCat() != null && pfs.getRetrieveSubCat().equals("Y")) {
					filterLists.setProximityList(reportListMgr.findProximitySubCategoryList(pfs.getAccountrecid()));
				}
				if (rm.getAllow_quarter() != null && rm.getAllow_quarter().equals("Y")) {
					filterLists.setQuarterList(travelSpendingMgr.findAllQuarters());
				}
				if (rm.getAllow_region() != null) {
					if (rm.getAllow_region().equals("Y")) {
						filterLists.setRegionList(regionMgr.getAllReportingRegions());
					} else if (rm.getAllow_region().equals("L")) {
						filterLists.setRegionList(regionMgr.getReportingRegions());
					}
				}
				if (rm.getAcctplan_options() != null && rm.getAcctplan_options().equals("Y")) {
					filterLists.setSappmoduleList(sappModulesMgr.findSAPPModules(pfs.getAccountrecid(), user));
				}
				if (rm.getAllow_saleslist() != null && rm.getAllow_saleslist().equals("Y")) {
					boolean incMarriottContact = false;
					if (rm.getInclude_marriott_contact() != null && rm.getInclude_marriott_contact().equals("Y"))
						incMarriottContact = true;
					filterLists.setGlobalSalesContacts(sappModulesMgr.findGlobalContactsWithMyAccount(user, incMarriottContact));
				}
				if (rm.getReq_roles() != null && rm.getReq_roles().equals("Y")) {
					filterLists.setRoleList(userMgr.getRoles());
				}
				if (rm.getAllow_onehotel() != null && rm.getAllow_onehotel().equals("Y")) {
					filterLists.setHotelList(hotelMgr.findAllProperties());
				}
				if (rm.getAllow_dateformat() != null && rm.getAllow_dateformat().equals("Y")) {
					filterLists.setExceldateformat(reportListMgr.findExcelDateFormats());
				}
			}
		}
		return filterOptions;
	}

	public FilterLists getEdieFilterLists(Long period, User user) {
		FilterLists filterLists = getFilterViewLists(period, user, "B");
		List<EdieProfile> edieProfile = edieMgr.getEdieProfiles();
		List<EdieHotelProfile> edieHotelProfile = edieMgr.getEdieHotelProfiles();
		filterLists.setEdieprofilelist(edieProfile);
		filterLists.setEdiehotelprofilelist(edieHotelProfile);
		filterLists.setExceldateformat(reportListMgr.findExcelDateFormats());
		return filterLists;
	}

	public void setRegionMgr(RegionManager regionMgr) {
		this.regionMgr = regionMgr;
	}

	public RegionManager getRegionMgr() {
		return regionMgr;
	}

	public List<AccountJson> getFilteredAccountListSAPPView(long count, long start, String filter, long period, User user, String pFlag) {
		try {
			return accountMgr.getFilteredAccountListSAPP(count, start, filter, period, user, false, pFlag);
		} catch (Exception ex) {
			return null;
		}
	}

	public List<AccountJson> getFilteredAccountListSAPPEdit(long count, long start, String filter, long period, User user, String pFlag) {
		return accountMgr.getFilteredAccountListSAPP(count, start, filter, period, user, true, pFlag);
	}

	public List<AccountSegment> getAllAccountSegments() {
		return accountSegmentMgr.getAllAccountSegments();
	}

	public List<SalesRegion> getAllSalesRegions() {
		return salesRegionMgr.getAllSalesRegions();
	}
	
	public List<DSUser> getAccountPlanUserList(long accountrecid) {
		return userMgr.getAccountPlanUserList(accountrecid);
	}

	public List<RateProgram> getAllRatePrograms(long accountrecid) {
		return accountMgr.getAllRatePrograms(accountrecid);
	}

	public List<AccountJson> getAccountListHavingSAPPInfo(long count, long start, String filter, long period) {
		try {
			return accountMgr.getAccountListHavingSAPPInfo(count, start, filter, period);
		} catch (Exception ex) {
			return null;
		}
	}

	public List<AccountJson> getAccountListNotHavingSAPPInfo(long count, long start, String filter, long period) {
		try {
			return accountMgr.getAccountListNotHavingSAPPInfo(count, start, filter, period);
		} catch (Exception ex) {
			return null;
		}
	}

	public List<AccountIdJson> getFilteredAccountListSCPT(long count, long start, String filter, long period, long hotelid, User user) {
		return accountMgr.getFilteredAccountListSCPT(count, start, filter, period, hotelid, user);
	}

	public List<AccountSegment> getPricingSCPTAccountSegments() {
		return accountSegmentMgr.getPricingSCPTAccountSegments();
	}

	public String findAccountAerType(long accountrecid) {
		return accountMgr.findAccountAerType(accountrecid);
	}
	/*Cognos : View Report Functionality	*/
	public String findAccountname(long accountrecid) {
		return accountMgr.findAccountName(accountrecid);
	}
	/*Cognos : View Report Functionality	*/
}
