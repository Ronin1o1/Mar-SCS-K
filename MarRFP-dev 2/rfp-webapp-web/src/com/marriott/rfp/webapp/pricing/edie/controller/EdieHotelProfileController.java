package com.marriott.rfp.webapp.pricing.edie.controller;


import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.webapp.common.controller.BaseDoubleFilterController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN"})
@RestController
@RequestMapping("/ediehotelprofile")
public class EdieHotelProfileController extends BaseDoubleFilterController {
    private static final Logger log = LoggerFactory.getLogger(EdieHotelProfileController.class);
    @Autowired
    private EdieService edieService;

    public EdieHotelProfileController() {
        super();

    }

    @Autowired
    public EdieHotelProfileController(PricingFilterListsService pricingFilterListsService, EdieService edieService) {
        super(pricingFilterListsService);
    }

    @RequestMapping(value = "/getEdieHotelProfileFilter", method = GET)
    public String getEdieHotelProfileFilter() {
        try {
            setEdieService(edieService);
            PricingFilterOptions pfo = new PricingFilterOptions();
            PricingFilterShow pfs = pfo.getShowOptions();
            pfs.setShowAccountFilter(true);
            pfs.setShowAccountFlags(true);
            pfs.setShowBrandFilter(true);
            pfs.setShowAreaFilter(true);
            pfs.setShowNumberSelected(true);
            pfs.setHideHotelProfile(true);

            PricingFilterRequired pfr = pfo.getRequiredOptions();
            pfr.setYearRequired(true);
 /*           setTopList("/ediehotelprofileavail/view.action");
            setBottomList("/ediehotelprofileselect/view.action");
            setFindFilterAction("/ediehotelprofilefindfilter/view.action");*/
            Map<String, Object> pricingFilters = new HashMap<>();
            pricingFilters.put("pfo", pfo);
            pricingFilters.put("pfs", pfs);
            pricingFilters.put("pfr", pfr);
            return objectMapperStream(pricingFilters);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getHotelProfileEdie", method = GET)
    public String getHotelProfileEdie(Long profile_id) throws Exception {
        try {
            EdieHotelProfile edieHotelProfile = edieService.getEdieHotelProfile(profile_id);
            return objectMapperStream(edieHotelProfile);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getFilterViewLists", method = {GET, POST})
    public String getFilterViewLists(String strFilterValues, Long profile_id, String periodType) throws Exception {
        PricingFilterSelections filterValues = null;
        if (StringUtils.isNotEmpty(strFilterValues)) {
            filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
        }
        return super.getFilterViewLists(filterValues, profile_id, periodType);
    }

    public void setEdieService(EdieService edieService) {
        this.edieService = edieService;
    }

    public EdieService getEdieService() {
        return edieService;
    }

}
