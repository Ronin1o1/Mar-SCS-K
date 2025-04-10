package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
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

@Security({"MFPADMIN", "MFPSALES","MFPFSALE"})
@RestController
@RequestMapping("/propertylist")
public class PropertyListController extends BaseSingleFilterController {
	private static final Logger log = LoggerFactory.getLogger(PropertyListController.class);
	//Added a default constructor
	public PropertyListController() {
		super();}
	@Autowired
    public PropertyListController(PricingFilterListsService pricingFilterListsService) {
	super(pricingFilterListsService);}

	@RequestMapping(value = "/getPropertyListPricingFilter" , method = GET)
	public String getPropertyListPricingFilter(){
    	try {
			PricingFilterOptions pfo = new PricingFilterOptions();
			PricingFilterShow pfs = pfo.getShowOptions();

			pfs.setShowBrandFilter(true);
			pfs.setShowAreaFilter(true);
			pfs.setShowAccountFlags(true);
			pfs.setShowAccountFilter(true);
			pfs.setShowAccountSubset(true);
			pfs.setShowFutureOpenings(true);

			//setTheList("/propertylistlist/view.action");
			//setFindFilterAction("/propertylistfindfilter/view.action");
			Map<String, Object> pricingFilters = new HashMap<>();
			pricingFilters.put("pfo", pfo);
			pricingFilters.put("pfs", pfs);
			return objectMapperStream(pricingFilters);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
    }
	@RequestMapping(value = "/getFilterViewLists" , method = GET)
	public String getFilterViewLists(PricingFilterSelections filterValues, Long profile_id,String periodType) throws Exception {
		return super.getFilterViewLists(filterValues,profile_id,periodType);
	}
 
}
