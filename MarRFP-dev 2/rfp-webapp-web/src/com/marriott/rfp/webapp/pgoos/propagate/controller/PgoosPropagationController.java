package com.marriott.rfp.webapp.pgoos.propagate.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.webapp.common.controller.BaseDoubleFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/pgoospropagation")
public class PgoosPropagationController extends BaseDoubleFilterController {

    private static final Logger log = LoggerFactory.getLogger(PgoosPropagationController.class);
    public PgoosPropagationController() {
        super();

    }

    @Autowired
    public PgoosPropagationController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }


    @RequestMapping(value = "/getPgoosPropagationPricingFilter", method = GET)
    public String getPgoosPropagationPricingFilter() {
        try {
            PricingFilterOptions pfo = new PricingFilterOptions();
            PricingFilterShow pfs = pfo.getShowOptions();
            pfs.setShowByAccountorByRPGM(true);
            pfs.setShowAccountFilter(true);
            pfs.setShowBrandFilter(true);
            pfs.setShowAreaFilter(true);
            pfs.setShowHotelsSaidDelete(true);
            pfs.setShowNumberSelected(true);
            pfs.setShowPgoosFilter(true);
            pfs.setShowExcludeGPP(true);
            pfs.setShowNotAccepted(true);
            PricingFilterRequired pfr = pfo.getRequiredOptions();
            pfr.setYearRequired(true);
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
}
