package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.filterLists.FilterLists;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class BaseFilterController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseFilterController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService;

    public BaseFilterController() {
        super();
    }

    @Autowired
    public BaseFilterController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.setPricingFilterListsService(pricingFilterListsService);
        PricingFilterOptions filterOptions = new PricingFilterOptions();
    }


    public String getFilterViewLists(PricingFilterSelections filterValues, Long profile_id,String periodType) throws Exception {
        try {
             periodType=(periodType==null)?"B":periodType;
            if (filterValues == null) {
                filterValues = new PricingFilterSelections();
                if (profile_id != null) {
                    filterValues.setHotelProfile(profile_id);
                }
            }
            FilterLists  filterLists = pricingFilterListsService.getFilterViewLists(filterValues.getYear(), getUserProperties(), periodType);
            return objectMapperStream(filterLists);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }


}