package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportNoFilterListController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping("pricingreportnofilterlist")
public class PricingReportNoFilterListController extends BaseReportNoFilterListController {

	private static final Logger log = LoggerFactory.getLogger(PricingReportNoFilterListController.class);

    public PricingReportNoFilterListController() {
	super();
    }

    @Autowired
    public PricingReportNoFilterListController(ConstantsService constantsService, PricingFilterListsService pricingFilterListsService,
											   ReportService reportService) {
	super(constantsService, pricingFilterListsService, reportService);
	//setReportType("B");
	//setListChangeAction("/pricingreportnofilterlist/view.action" );
	//setReportRunAction("/pricingreportnofilterlist/runReport.action");
    }

    @RequestMapping(value = "/getPricingReportNoFilterDetails", method = RequestMethod.GET)
	public String getPricingReportNoFilterDetails() throws Exception {
    	String reportType = "B";
    	String listChange = "/pricingreportnofilterlist/view.action";
    	String reportRun="/pricingreportnofilterlist/runReport.action";
		try {
			Map<String, Object> info = new HashMap<>();
			info.put("ReportType",reportType);
			info.put("ListChange",listChange);
			info.put("ReportRun",reportRun);
			return objectMapperStream(info);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}

	}
	@RequestMapping(value = "/getReportNoFilterViewLists", method = {RequestMethod.GET,RequestMethod.POST})
	public String getReportNoFilterViewLists(String strFilterValues, String reportType) throws Exception  {
    	reportType=(reportType==null)?"B":reportType;
    	return super.getReportNoFilterViewLists(strFilterValues,reportType);
	}

	@RequestMapping(value = "/runReport", method = RequestMethod.POST)
	public String runReport(String strFilterValues) throws Exception  {
		return super.runReport(strFilterValues);
	}

}
