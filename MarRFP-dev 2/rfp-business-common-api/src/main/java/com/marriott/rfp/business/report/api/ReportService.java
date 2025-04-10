package com.marriott.rfp.business.report.api;

import java.util.List;

import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingNoFilterSelections;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.user.User;


public interface ReportService {
	public List<ReportModel> findReportList(String reportType, String role);

	public ReportModel findReportAttributes(String report_name);

	public List<ReportModel> findReportsFilterList(String reportType, User user);

	public List<ReportModel> findReportsNoFilterList(String reportType, User user);

	public ReportModel findReportDetails(String report_name);

	public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user);

	public Long updateList(List<HotelListData> hotelList, String highlightedOnly);

	public Long updateList(List<Long> hotelList);

	public String getRegionname(Long regionid);

	public String createBatchQueryString(PricingFilterSelections filterValues, ReportModel reportDetail, Long filterId);

	public String createBatchQueryString(PricingNoFilterSelections filterValues, ReportModel reportDetail);
	
	public void insertAmenityBatchRecord(ReportModel reportDetail, User user);
	
	public String createBatchQueryStringEDIE(PricingFilterSelections filterValues, ReportModel reportDetail, Long filterId);
	
}
