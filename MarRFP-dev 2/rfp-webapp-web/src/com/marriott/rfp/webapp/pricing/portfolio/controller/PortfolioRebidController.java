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
@RequestMapping("/portfoliorebid")
public class PortfolioRebidController extends BaseSingleFilterController {

    private static final Logger log = LoggerFactory.getLogger(PortfolioRebidController.class);
    public PortfolioRebidController() {
        super();
    }

    @Autowired
    public PortfolioRebidController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

    @RequestMapping(value = "/getPortfolioPricingFilter", method = GET)
    public String getPortfolioPricingFilter() {
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

            PricingFilterRequired pfr = pfo.getRequiredOptions();
            pfr.setYearRequired(true);
            pfr.setAccountRequired(true);
            //setTheList("/portfoliorebidlist/view.action");//Upgrade-revisit
            //setFindFilterAction("/portfoliorebidfindfilter/view.action");
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

    @RequestMapping(value = "/getFilterViewLists", method = GET)
    public String getFilterViewLists(PricingFilterSelections filterValues, Long profile_id,String periodType) throws Exception {
        return super.getFilterViewLists(filterValues, profile_id,periodType);
    }

    //upgrade-revisit didn't find a curl for this
    public String getDefaultRebidDueDate() {
        return DateUtility.formatShortDate(DateUtility.calcNBusinessDaysAfterToday(5));
    }
}
