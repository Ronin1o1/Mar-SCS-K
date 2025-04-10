package com.marriott.rfp.webapp.pricing.edie.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.FilterLists;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterShow;
import com.marriott.rfp.webapp.common.controller.BaseSingleFilterController;
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
@RequestMapping("/ediereportfiltered")
public class EdieReportFilterController extends BaseSingleFilterController {

    private static final Logger log = LoggerFactory.getLogger(EdieReportFilterController.class);

    public EdieReportFilterController() {
        super();
    }

    @Autowired
    public EdieReportFilterController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

    @RequestMapping(value = "/getEdieReportFilter", method = GET)
    public String getEdieReportFilter() {
        try {

            PricingFilterOptions pfo = new PricingFilterOptions();
            PricingFilterShow pfs = pfo.getShowOptions();

            pfs.setShowBrandFilter(true);
            pfs.setShowAreaFilter(true);
            pfs.setShowHotelProfile(true);
            pfs.setShowEdieProfileFilter(true);
            pfs.setShowByAccountorByHotel(true);
            pfs.setShowAccountFlags(true);
            pfs.setShowAccountFilter(true);
            pfs.setShowAccountSubset(true);
            pfs.setShowHighlightedOnly(true);
            /* Cognos : Email Me Functionality */
            pfs.setShowEmailMe(true);
            /* Cognos : Email Me Functionality */
            pfs.setShowRunReport(true);
            pfs.setShowDateFormat(true);
           /* setTheList("/ediereportfilterlist/view.action");
            setFindFilterAction("/ediereportfilterfindfilter/view.action");*/
            Map<String, Object> pricingFilters = new HashMap<>();
            pricingFilters.put("pfo", pfo);
            pricingFilters.put("pfs", pfs);
            return objectMapperStream(pricingFilters);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getFilterViewLists", method = {GET,POST})
    public String getFilterViewLists(String strFilterValues) throws Exception {
        try {
            PricingFilterSelections filterValues=null;
            if(StringUtils.isNotEmpty(strFilterValues)) {
                 filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
            }
            else {
                filterValues=new PricingFilterSelections();
            }
            FilterLists filterLists=getPricingFilterListsService().getEdieFilterLists(filterValues.getYear(), getUserProperties());
            //Map<String, Object> info = new HashMap();
            //info.put("filterList", getFilterLists());
            //info.put("filtervalues", filterValues);
            return gsonStream(filterLists);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
}
