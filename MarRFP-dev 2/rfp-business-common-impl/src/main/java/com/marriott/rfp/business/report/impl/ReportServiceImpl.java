package com.marriott.rfp.business.report.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.dataaccess.region.api.RegionManager;
import com.marriott.rfp.dataaccess.report.api.ReportListManager;
import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingNoFilterSelections;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class ReportServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class ReportServiceImpl implements ReportService {

	@Autowired
	private ReportListManager reportListMgr = null;

	@Autowired
	RegionManager regionMgr = null;

	@Autowired
	private AccountManager accountMgr = null;

	@Autowired
	HotelPricingManager hotelPricingMgr = null;

	/**
	 * Default constructor.
	 */

	public List<ReportModel> findReportList(String reportType, String role) {

		return reportListMgr.findReportList(reportType, role);
	}

	public ReportModel findReportAttributes(String report_name) {
		return reportListMgr.findReportAttributes(report_name);
	}

	public List<ReportModel> findReportsFilterList(String reportType, User user) {
		return reportListMgr.getReportsFilterList(reportType, true, user);
	}

	public List<ReportModel> findReportsNoFilterList(String reportType, User user) {
		return reportListMgr.getReportsFilterList(reportType, false, user);
	}

	public ReportModel findReportDetails(String report_name) {
		ReportModel rm = reportListMgr.getReportDetails(report_name);
		if (rm != null && report_name.equals("ePgoosErrorException")) {
			rm.setAllow_pgoosStatus("Y");
		}
		if (rm != null && report_name.equals("eAmenitiesAnalysisBatch")) {
			rm.setAmenity_count(reportListMgr.getAmenityCount());
		} else {
			rm.setAmenity_count(0L);
		}
		return rm;
	}

	public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user) {
		if (filterValues != null)
			return reportListMgr.findHotelFilteredList(filterValues, user);
		else
			return null;
	}

	public Long updateList(List<HotelListData> hotelList, String highlightedOnly) {
		return reportListMgr.updateList(hotelList, highlightedOnly);
	}

	public Long updateList(List<Long> hotelList) {
		return reportListMgr.updateList(hotelList);
	}

	public String getRegionname(Long regionid) {
		String regionname = null;
		ReportingRegion rr = regionMgr.getReportingRegion(regionid);
		if (rr != null && rr.getAreaname() != null)
			regionname = rr.getAreaname();
		return regionname;
	}
	
	public String getBrandname(Long affiliationid) {
		String brandname = null;
		HotelAffiliation ha = hotelPricingMgr.getAffiliation(affiliationid);
		if (ha != null && ha.getAffiliationname() != null)
			brandname = ha.getAffiliationname();
		return brandname;
	}
	
/*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) starts	*/
	
	public String createBatchQueryString(PricingFilterSelections filterValues, ReportModel reportDetail,
			Long filterId) {
		String queryString = "";
		if (filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0) {
			Account account = null;
			account = accountMgr.findAccountInfo(filterValues.getAccountFilter().getAccountrecid());
			queryString += "&p_pAccount=" + filterValues.getAccountFilter().getAccountrecid().toString();
			queryString += "&p_pAccountname=" + StringUtility.replaceWildForFilename(account.getAccountname());
		} else if (reportDetail.getReq_acct_region_brand() != null
				&& reportDetail.getReq_acct_region_brand().equals("Y")) {
			if (filterValues.getAreaFilter().getRegionid() > 0) {
				String regionname = getRegionname(filterValues.getAreaFilter().getRegionid());
				queryString += "&p_pRegionname=" + StringUtility.replaceWildForFilename(regionname);
			}
			if (filterValues.getStringBrandList() != null && !(filterValues.getStringBrandList().indexOf(',') > 0)) {
				String brandname = getBrandname(Long.parseLong(filterValues.getStringBrandList()));
				queryString += "&p_pBrandname=" + StringUtility.replaceWildForFilename(brandname);
			}
		} else if (reportDetail.getReq_acct_or_region() != null && reportDetail.getReq_acct_or_region().equals("Y")) {
			if (filterValues.getAreaFilter().getRegionid() > 0) {
				String regionname = getRegionname(filterValues.getAreaFilter().getRegionid());
				queryString += "&p_pRegionname=" + StringUtility.replaceWildForFilename(regionname);
			}
		} else if (reportDetail.getAllow_accounttype() != null && reportDetail.getAllow_accounttype().equals("Y")) {
			if (filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountType() != null)
				queryString += "&p_pAccountType=" + filterValues.getAccountFilter().getAccountType();
		}

		if (filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountstatus() != null) {
			queryString += "&p_pAccountStatus=" + filterValues.getAccountFilter().getAccountstatus();
		}

		/*if (reportDetail.getIs_electronic() != null && reportDetail.getIs_electronic().equals("Y")) {
			queryString += "";
			
		}*/

		if (reportDetail.getAllow_period() != null && reportDetail.getAllow_period().equals("Y")) {
			if (filterValues.getYear() != null && filterValues.getYear() > 0) {
				queryString += "&p_period=" + filterValues.getYear().toString();
			}
		}
		if (reportDetail.getReq_daterange() != null && reportDetail.getReq_daterange().equals("Y")) {
			queryString += "&p_pStartTime=" + filterValues.getDateRangeFilter().getStringFromDate();
			queryString += "&p_pEndTime=" + filterValues.getDateRangeFilter().getStringToDate();
		}
		/*if (reportDetail.getPriority() != null && reportDetail.getPriority() > 0)
			queryString += "&__priorityValue=" + reportDetail.getPriority().toString();*/

		/*if (reportDetail.getSchedule_time() != null) {
			queryString += "&timeZone=EST";
			queryString += "&__scheduleType=once";
			Date today = new Date();
			String strToday = DateUtility.formatShortDate(today);
			queryString += "&__onceDate=" + strToday;
			queryString += "&__onceTime=" + reportDetail.getSchedule_time();
		}*/

		/*if (filterValues.getScheduleReport() != null && filterValues.getScheduleReport().equals("L")) {
			queryString += "&timeZone=EST";
			queryString += "&__scheduleType=once";
			queryString += "&__onceDate=" + filterValues.getScheduleReportDate();
			queryString += "&__onceTime=" + filterValues.getScheduleReportTime();
		}*/

		if (filterValues.getEdieProfile() != null && filterValues.getEdieProfile() > 0) {
			queryString += "&p_pProfileID=" + filterValues.getEdieProfile();
		}

		if (filterId != null)
			queryString += "&p_pHotelFilterID=" + filterId.toString();

		if (reportDetail.getAdd_params() != null)
			queryString += reportDetail.getAdd_params();

		if (reportDetail.getAllow_dateformat() != null && reportDetail.getAllow_dateformat().equals("Y")
				&& filterValues.getExceldateformat() != null && !filterValues.getExceldateformat().equals(""))
			queryString += "&p_pDateFormat=" + filterValues.getExceldateformat();
			
		/* Cognos : Email Me Functionality starts */
		if(filterValues.getEmailMe().equalsIgnoreCase("Y"))
			queryString += "&p_prmEmail=Yes";
		else 
			queryString += "&p_prmEmail=No";
		/* Cognos : Email Me functionality ends */
		
		return queryString;
	}

	public String createBatchQueryString(PricingNoFilterSelections filterValues, ReportModel reportDetail) {
		String queryString = "";
		if (filterValues.getAccountrecid() != null) {
			Account account = null;
			account = accountMgr.findAccountInfo(filterValues.getAccountrecid());
			queryString += "&p_pAccount=" + filterValues.getAccountrecid().toString();
			queryString += "&p_pAccountname=" + StringUtility.replaceWildForFilename(account.getAccountname());
		} else if (reportDetail.getAllow_accounttype() != null && reportDetail.getAllow_accounttype().equals("Y")) {
			if (filterValues.getAccountType() != null)
				queryString += "&p_pAccountType=" + filterValues.getAccountType();
		}

		/*if (reportDetail.getIs_electronic() != null && reportDetail.getIs_electronic().equals("Y")) {
			queryString += "";
			
		}*/

		if (reportDetail.getAllow_period() != null && reportDetail.getAllow_period().equals("Y")) {
			if (filterValues.getPeriod() != null && filterValues.getPeriod() > 0) {
				queryString += "&p_period=" + filterValues.getPeriod().toString();
			}
		}
		/*if (reportDetail.getPriority() != null && reportDetail.getPriority() > 0)
			queryString += "&__priorityValue=" + reportDetail.getPriority().toString();*/

		/* Cognos : Amenity Analysis Batch Report Parameters change starts */
		if (reportDetail.getSchedule_time() != null) {			
			Date today = new Date();
			String strToday = DateUtility.formatCognosDate(today);
			queryString += "&reportRunTime=" + strToday + "_" + reportDetail.getAdd_params();
			queryString += "&reportRunTimeZone=America/New_York" ;
		}
		/* Cognos : Amenity Analysis Batch Report Parameters change ends */
		/* Cognos : Amenity Analysis Batch Report Parameters change - No need to pass ADD_PARAM here */
		if (reportDetail.getAdd_params() != null && !(reportDetail.getReport_name().equalsIgnoreCase("eAmenitiesAnalysisBatch")))
			queryString += reportDetail.getAdd_params();
		/* Cognos : Amenity Analysis Batch Report Parameters change - No need to pass ADD_PARAM here */

		if (reportDetail.getReq_daterange() != null && reportDetail.getReq_daterange().equals("Y")) {
			queryString += "&p_pStartTime=" + filterValues.getDateRangeFilter().getStringFromDate();
			if (filterValues.getDateRangeFilter().getStringToDate() != null) {
				queryString += "&p_pEndTime=" + filterValues.getDateRangeFilter().getStringToDate();
			}

		}

		if (reportDetail.getAllow_saleslist() != null && reportDetail.getAllow_saleslist().equals("Y")
				&& filterValues.getGlobalLeaderEID() != null && !filterValues.getGlobalLeaderEID().equals("")) {
			queryString += "&p_pEID=" + filterValues.getGlobalLeaderEID();
		}

		if (reportDetail.getAllow_eid() != null && reportDetail.getAllow_eid().equals("Y")
				&& filterValues.getEid() != null && !filterValues.getEid().equals("")) {
			queryString += "&p_pEID=" + filterValues.getEid();
		}

		if (reportDetail.getAllow_onehotel() != null && reportDetail.getAllow_onehotel().equals("Y")
				&& filterValues.getMarshaCode() != null && !filterValues.getMarshaCode().equals("")) {
			queryString += "&p_pMarshacode=" + filterValues.getMarshaCode();
		}

		if (reportDetail.getAllow_region() != null
				&& (reportDetail.getAllow_region().equals("Y") || reportDetail.getAllow_region().equals("L"))
				&& filterValues.getRegionid() != null && !filterValues.getRegionid().equals(0L)) {
			queryString += "&p_pareaid=" + filterValues.getRegionid();
			/* Cognos : SCPT Pricing Summary starts */
			if (filterValues.getRegionid() > 0) {
				String regionname = getRegionname(filterValues.getRegionid());
				queryString += "&p_pAreaname=" + StringUtility.replaceWildForFilename(regionname);
			}
			/* Cognos : SCPT Pricing Summary ends */
			
		}
		
		if (reportDetail.getAcctplan_options() != null && reportDetail.getAcctplan_options().equals("Y")
				&& filterValues.getSappModule() != null && !filterValues.getSappModule().equals("")) {
			queryString += "&p_Pmodule=" + filterValues.getSappModule();
		}

		if (reportDetail.getReq_roles() != null && reportDetail.getReq_roles().equals("Y")
				&& filterValues.getRole() != null && !filterValues.getRole().equals("")) {
			queryString += "&p_Role=" + filterValues.getRole();
		}

		if (reportDetail.getAllow_proximitysubcat() != null && reportDetail.getAllow_proximitysubcat().equals("Y")
				&& filterValues.getProximitySubCatCode() != null && !filterValues.getProximitySubCatCode().equals(0L)) {
			queryString += "&p_Subcategory=" + filterValues.getProximitySubCatCode();
		}

		if (reportDetail.getAllow_quarter() != null && reportDetail.getAllow_quarter().equals("Y")
				&& filterValues.getQuarter() != null && !filterValues.getQuarter().equals("")) {
			queryString += "&p_prm_QuarterName=" + filterValues.getQuarter();
		}
		if (reportDetail.getReport_name().equals("AccountRegistration")) {
			if (filterValues.getAllnewregistrations() == null)
				filterValues.setAllnewregistrations("N");
			queryString += "&p_pullNew=" + filterValues.getAllnewregistrations();
			queryString += "&p_pCreationDate=" + filterValues.getChangeDate();
		}
		if (reportDetail.getAllow_dateformat() != null && reportDetail.getAllow_dateformat().equals("Y")
				&& filterValues.getExceldateformat() != null && !filterValues.getExceldateformat().equals(""))
			queryString += "&p_pDateFormat=" + filterValues.getExceldateformat();

		if (reportDetail.getAllow_pgoosStatus() != null && reportDetail.getAllow_pgoosStatus().equals("Y")) {
			if (filterValues.getPgoosStatus().getStatusError() != null) {
				queryString += "&p_pStatuserr=E";
			} else {
				queryString+="&p_pStatuserr=N";
			}
			if (filterValues.getPgoosStatus().getStatusInProgress() != null) {
				queryString += "&p_pStatusinc=I";
			} else {
				queryString+="&p_pStatusinc=N";
			}
			if (filterValues.getPgoosStatus().getStatusPublished() != null) {
				queryString += "&p_pStatuspub=C";
			} else {
				queryString+="&p_pStatuspub=N";
			}

		}
		
		/* Cognos : Email Me Functionality starts */
		if(filterValues.getEmailMe().equalsIgnoreCase("Y"))
			queryString += "&p_prmEmail=Yes";
		else 
			queryString += "&p_prmEmail=No";
		/* Cognos : Email Me functionality ends */
		
		return queryString;
	}
	/*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) ends	*/
	
	public void insertAmenityBatchRecord(ReportModel reportDetail, User user) {
		if (reportDetail.getSchedule_time() != null && !reportDetail.getAdd_params().equals(""))
			reportListMgr.insertAmenityBatchRecord(reportDetail.getAdd_params(), user);
	}
	
	public String createBatchQueryStringEDIE(PricingFilterSelections filterValues, ReportModel reportDetail, Long filterId) {
		String queryString = "";
		String profileName = "";
		Date today = new Date();
		String strDateTime = DateUtility.formatCognosDateTime(today);
		if (filterValues.getEdieProfile() != null && filterValues.getEdieProfile() > 0) {
			profileName = StringUtility.replace(accountMgr.findProfileName(filterValues.getEdieProfile()),"&","%26");
		}
		if (filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0) {
			Account account = null;
			account = accountMgr.findAccountInfo(filterValues.getAccountFilter().getAccountrecid());
			queryString += "&pAccount=" + filterValues.getAccountFilter().getAccountrecid().toString();
//			queryString += "&p_pAccountname=" + StringUtility.replaceWildForFilename(account.getAccountname());
			queryString += "&pReportouptname=" + StringUtility.replace(accountMgr.findAccountName(filterValues.getAccountFilter().getAccountrecid()),"&","%26") + "_";
			queryString += profileName + "_" + strDateTime;
		} else {
			String period = "";
			if (filterValues.getYear() != null && filterValues.getYear() > 0) {
				period = filterValues.getYear().toString();
			}
			queryString += "&pReportouptname=" + profileName + "_" + period + "_" + strDateTime;
		}

		if (filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountstatus() != null) {
			queryString += "&pAccountStatus=" + filterValues.getAccountFilter().getAccountstatus();
		}

		if (reportDetail.getIs_electronic() != null && reportDetail.getIs_electronic().equals("Y")) {
			queryString += "";
		}

		if (reportDetail.getAllow_period() != null && reportDetail.getAllow_period().equals("Y")) {
			if (filterValues.getYear() != null && filterValues.getYear() > 0) {
				queryString += "&period=" + filterValues.getYear().toString();
			}
		}

		if (filterValues.getEdieProfile() != null && filterValues.getEdieProfile() > 0) {
			queryString += "&pProfileID=" + filterValues.getEdieProfile();
		}

		if (filterId != null)
			queryString += "&pHotelFilterID=" + filterId.toString();

		if (reportDetail.getAllow_dateformat() != null && reportDetail.getAllow_dateformat().equals("Y")
				&& filterValues.getExceldateformat() != null && !filterValues.getExceldateformat().equals(""))
			queryString += "&pDateFormat=" + filterValues.getExceldateformat();
		
		if(filterValues.getEmailMe().equalsIgnoreCase("Y"))
			queryString += "&p_prmEmail=Yes";
		else 
			queryString += "&p_prmEmail=No";
		/* Cognos : Email Me functionality ends */
		
		return queryString;
	}

}
