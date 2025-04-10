package com.marriott.rfp.dataaccess.report.api;

import java.util.List;



import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.report.ExcelDateFormats;
import com.marriott.rfp.object.report.ProximitySubCategory;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.user.User;


public interface ReportListManager {
	public List<ReportModel> findReportList(String reportType, String role);

	public ReportModel findReportAttributes(String report_name);

	public List<ReportModel> getReportsFilterList(String reportType, boolean filtered, User user);

	public ReportModel getReportDetails(String reportname);

	public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user);

	public Long updateList(List<HotelListData> hotelList, String highlightedOnly);

	public Long updateList(List<Long> hotelList);

	public List<ProximitySubCategory> findProximitySubCategoryList(Long accountrecid);

	public List<ExcelDateFormats> findExcelDateFormats();
	
	public Long getAmenityCount();
	
	public void insertAmenityBatchRecord(String scheduleTime, User user);
	
	
}
