package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.object.pricing.filterLists.FilterLists;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.utility.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;


public class BaseAccountReportViewController extends BaseReportViewController {

    private static final Logger log = LoggerFactory.getLogger(BaseAccountReportViewController.class);
    @Autowired
    private ConstantsService constantsService;

    @Autowired
    private PricingFilterListsService pricingFilterListsService;


    /* Cognos : View Report Functionality	*/

    /* Cognos : View Report Functionality	*/

    public BaseAccountReportViewController() {
        super();
    }

    public BaseAccountReportViewController(ReportService reportService, ConstantsService constantsService, PricingFilterListsService pricingFilterListsService) {
        super(reportService, constantsService);
        this.setPricingFilterListsService(pricingFilterListsService);
    }

    public String getPricingReportViewFilterLists(Long accountrecid,Long period,String currentReport,String reportType) {
        try {
            period=(period==null)?0l:period;
            Map<String, Object> reportDetails = getReportViewFilterLists( accountrecid,period,currentReport,reportType);
            reportDetails.put("reportType", reportType);
            return gsonStream(reportDetails);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public Map<String, Object> getReportViewFilterLists(Long accountrecid,long period,String currentReport, String reportType) throws Exception {
        Map<String, Object> reportViewFilterLists = getReportDetails(reportType, currentReport);
      //  if (reportViewFilterLists.get("currentReportModel") != null && reportViewFilterLists.get("currentReportModel").get().getAllow_account().equals("Y"))
        FilterLists filterLists=null;
        ReportModel currentReportModel=(ReportModel) reportViewFilterLists.get("currentReportModel");
        String allow_account= currentReportModel.getAllow_account();
        if(currentReportModel != null && allow_account.equals("Y"))
            filterLists = pricingFilterListsService.getReportViewFilterLists(period, getUserProperties());
        else
            filterLists = null;
        reportViewFilterLists.put("filterLists", filterLists);
        return reportViewFilterLists;
    }


    public String getReportUrl(String currentReport,Long accountrecid,long period) throws Exception {
        String viewReport = currentReport;
        FilterLists filterLists=null;
        /*Cognos : View Report Functionality starts	*/
        String accountname = "";
        if (accountrecid != null)
            accountname = pricingFilterListsService.findAccountname(accountrecid);
        accountname = "&p_pAccountname=" + StringUtility.replaceWildForFilename(accountname);
        /*Cognos : View Report Functionality ends	*/
		/*if (viewReport !=null && viewReport.equals("ePRReport"))
			viewReport="ePRReportBasic";*/
        /* Cognos : View Report (Request Reports) Url Formation should be like... starts */

        String thereport = constantsService.getExcelDownloadLocation() + "__reportName=" + viewReport;

//		if (getCurrentReportModel().getIs_electronic() != null && getCurrentReportModel().getIs_electronic().equals("Y"))
//			thereport += "/XLS";
        if (filterLists != null) {
            if (period > 0)
                thereport += "&p_period=" + period;
            else {
                if (filterLists.getPeriodList() != null && !filterLists.getPeriodList().isEmpty()) {
                    period = filterLists.getPeriodList().get(0).getPeriod();
                    thereport += "&p_period=" + period;
                }
            }
        }
        if (filterLists != null && accountrecid != null && accountrecid > 0)
            thereport += accountname;
        /* Cognos : Viewing the Batch reports in View reports screen starts */
        if (viewReport != null && (viewReport.equals("GPP_PGOOS_Status") || viewReport.equals("eSCPTDetail_ExtendedStay") || viewReport.equals("eSCPTPricingSummaryBatch")))
            thereport += "&p_pReportType=Scheduled";
        /* Cognos : Viewing the Batch reports in View reports screen ends */
        /* Cognos : View Report (Request Reports) Url Formation should be like... end */
        return thereport;
    }


    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

   }
