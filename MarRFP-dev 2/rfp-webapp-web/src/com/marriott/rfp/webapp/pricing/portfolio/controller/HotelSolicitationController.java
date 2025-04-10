package com.marriott.rfp.webapp.pricing.portfolio.controller;

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

@Security(value = {"MFPADMIN", "MFPSALES","MFPFSALE"})
@RestController
@RequestMapping("/hotelsolicitation")
public class HotelSolicitationController extends BaseDoubleFilterController {
    private static final Logger log = LoggerFactory.getLogger(HotelSolicitationController.class);

    public HotelSolicitationController() {
        super();

    }

    @Autowired
    public HotelSolicitationController( PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

    @RequestMapping(value = "/getHotelSolicitationPricingFilter",method = GET)
    public String getHotelSolicitationPricingFilter(){
        try{
            PricingFilterOptions pfo = new PricingFilterOptions();
            PricingFilterShow pfs = pfo.getShowOptions();
            pfs.setShowAccountFilter(true);
            pfs.setShowBrandFilter(true);
            pfs.setShowSolicitSelectionFilter(true);
            pfs.setShowProductLegend(true);
            pfs.setShowAccountStatusLegend(true);
            pfs.setShowAreaFilter(true);
            pfs.setShowManagedFranchised(true);
            pfs.setShowNumberSelected(true);

            PricingFilterRequired pfr = pfo.getRequiredOptions();
            pfr.setYearRequired(true);
            pfr.setAccountRequired(true);
            /*setTopList("/hotelsolicitationavail/view.action");
            setBottomList("/hotelsolicitationselect/view.action");
            setFindFilterAction("/hotelsolicitationfindfilter/view.action");*/
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

    @RequestMapping(value = "/getFilterViewLists",method = GET)
    public String getFilterViewLists(String periodType, PricingFilterSelections filterValues,Long profile_id) throws Exception {
        return super.getFilterViewLists(filterValues,profile_id,periodType);
    }

}
