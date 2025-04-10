package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.webapp.common.controller.BaseReportFilterController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping("/pricingreportfiltered")
public class PricingReportFilterController extends BaseReportFilterController {

    private static final Logger log = LoggerFactory.getLogger(PricingReportFilterController.class);

    public PricingReportFilterController() {
        super();
    }

    @Autowired
    public PricingReportFilterController(PricingFilterListsService pricingFilterListsService, ReportService reportService) {
        super(pricingFilterListsService, reportService);
        this.setPricingFilterListsService(pricingFilterListsService);
        PricingFilterOptions filterOptions = new PricingFilterOptions();
      //  setReportType("B");
    }

    @RequestMapping(value = "/getPricingReportFilter",method = GET)
    public String getPricingReportFilter(){
        PricingFilterOptions pfo = new PricingFilterOptions();
        PricingFilterShow pfs = pfo.getShowOptions();
        PricingFilterRequired pfr = pfo.getRequiredOptions();
        pfs.setShowBrandFilter(true);
        pfs.setShowAreaFilter(true);
        pfs.setShowReportList(true);
        pfr.setYearRequired(true);
        pfs.setShowAccountFlags(true);
        pfs.setShowAccountFilter(true);
        pfs.setShowAccountSubset(true);
        pfs.setShowHighlightedOnly(true);
        /* Cognos : Email Me Functionality */
        pfs.setShowEmailMe(true);
        /* Cognos : Email Me Functionality */
        pfs.setShowRunReport(true);

        pfr.setReportListRequired(true);

       /* setTheList("/pricingreportfilterlist/view.action");
        setFindFilterAction("/pricingreportfilterfindfilter/view.action");*/
        try{
            Map<String,Object> pricingFilters =new HashMap<>();
            pricingFilters.put("pfo",pfo);
            pricingFilters.put("pfs",pfs);
            pricingFilters.put("pfr",pfr);
            return objectMapperStream(pricingFilters);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getFilterViewLists",method = GET)
    public String getFilterViewLists(String reportType) throws Exception {
        if(StringUtils.isEmpty(reportType))
        {
            reportType="B";
        }
        return super.getFilterViewLists(reportType);
    }
    //TODO: Needs to be tested, curl not found
    @RequestMapping(value = "/findReportDetail",method = GET)
    public String findReportDetail( String reportDetail) throws Exception{
        return super.findReportDetail(reportDetail);
       // return super.findReportDetail(getReportName());
    }
}
