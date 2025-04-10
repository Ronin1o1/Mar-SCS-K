package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.webapp.common.controller.BaseSingleFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelgpppgoosmaint")
public class HotelGPPPGOOSMaintenanceController extends BaseSingleFilterController {

    private static final Logger log = LoggerFactory.getLogger(HotelGPPPGOOSMaintenanceController.class);
    public HotelGPPPGOOSMaintenanceController() {
        super();

    }

    @Autowired
    public HotelGPPPGOOSMaintenanceController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

    @RequestMapping(value = "/getGPPPGOOSMaintPricingFilter", method = GET)
    public String getGPPPGOOSMaintPricingFilter() {

        try {
            PricingFilterOptions pfo = new PricingFilterOptions();
            PricingFilterShow pfs = pfo.getShowOptions();
            pfs.setShowAccountFilter(true);
            pfs.setShowGPPAccountsOnly(true);
            pfs.setShowBrandFilter(true);
            pfs.setShowAreaFilter(true);
            pfs.setShowFutureOpenings(true);
            //pfs.setShowSave(true);

            PricingFilterRequired pfr = pfo.getRequiredOptions();
            pfr.setYearRequired(true);
            pfr.setAccountRequired(true);
            //ToDO Upgrade-revisit
            //setTheList("/hotelgpppgoosmaintlist/view.action");
            //setFindFilterAction("/hotelgpppgoosmaintfindfilter/view.action");
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
