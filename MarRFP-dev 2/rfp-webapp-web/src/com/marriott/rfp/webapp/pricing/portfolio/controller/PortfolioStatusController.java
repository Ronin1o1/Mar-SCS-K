package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.webapp.common.controller.BaseSingleFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/portfoliostatus")
public class PortfolioStatusController extends BaseSingleFilterController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioStatusController.class);

    public PortfolioStatusController() {
        super();

    }

    @Autowired
    public PortfolioStatusController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);}

    @RequestMapping(value = "/getPortfolioStatusPricingFilter" , method = GET)
    public String getPortfolioStatusPricingFilter() {
        try {
        PricingFilterOptions pfo = new PricingFilterOptions();
        PricingFilterShow pfs = pfo.getShowOptions();
        pfs.setShowAccountFilter(true);
        pfs.setShowAccountFlags(true);
        pfs.setShowAccountSubset(true);
        pfs.setShowBrandFilter(true);
        pfs.setShowAreaFilter(true);
        pfs.setShowFutureOpenings(true);
        pfs.setShowSave(false);
        pfs.setShowAcceptanceFilter(true);

        PricingFilterRequired pfr = pfo.getRequiredOptions();
        pfr.setYearRequired(true);
        pfr.setAccountRequired(true);
       // setTheList("/portfoliostatuslist/view.action");//Upgrade-revisit
        //setFindFilterAction("/portfoliostatusfindfilter/view.action");
        Map<String, Object> pricingFilters = new HashMap<>();
            pricingFilters.put("pfo", pfo);
            pricingFilters.put("pfs", pfs);
            pricingFilters.put("pfr", pfr);
            return objectMapperStream(pricingFilters);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getFilterViewLists" , method = GET)
    public String getFilterViewLists(PricingFilterSelections filterValues, Long profile_id,String periodType) throws Exception {
        return super.getFilterViewLists(filterValues,profile_id,periodType);
    }
    public String getDefaultRebidDueDate() {//Upgrade-revisit
        return DateUtility.formatShortDate(DateUtility.calcNBusinessDaysAfterToday(5));
    }
}
