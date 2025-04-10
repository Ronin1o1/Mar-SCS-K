package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.webapp.common.controller.BaseAccountReportViewController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPPPADM", "MFPRDADM", "MFPAPADM", "MFPREAD"})
@RestController
@RequestMapping("/generalreportview")
public class GeneralReportViewController extends BaseAccountReportViewController {

	public GeneralReportViewController() {
		super();
	}

	@Autowired
	public GeneralReportViewController(ReportService reportService, ConstantsService constantsService, PricingFilterListsService pricingFilterListsService) {
		super(reportService, constantsService, pricingFilterListsService);
	}

	@RequestMapping(value ="/getGeneralReportView" ,method ={GET,POST} )
	public String getGeneralReportView(Long accountrecid,Long period,String currentReport,String reportType) throws Exception {
		reportType=(reportType==null)?"G":reportType;
		return super.getPricingReportViewFilterLists(accountrecid, period, currentReport,reportType);
	}

}
