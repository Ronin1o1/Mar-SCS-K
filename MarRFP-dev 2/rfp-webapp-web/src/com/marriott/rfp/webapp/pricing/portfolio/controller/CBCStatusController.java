package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterRequired;
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

@Security({"MFPADMIN", "MFPSALES","MFPFSALE"})
@RestController
@RequestMapping("/cbcstatus")
public class CBCStatusController extends BaseSingleFilterController {

	private static final Logger log = LoggerFactory.getLogger(CBCStatusController.class);

    public CBCStatusController() {
	super();

    }

	@Autowired
    public CBCStatusController(PricingFilterListsService pricingFilterListsService) {
	super(pricingFilterListsService);}

	@RequestMapping(value="/getCBCStatusPricingFilter", method = GET)
	public String getCBCStatusPricingFilter(){
		try{
			PricingFilterOptions pfo = new PricingFilterOptions();
			PricingFilterShow pfs = pfo.getShowOptions();
			pfs.setShowAccountFilter(true);
			pfs.setShowBrandFilter(true);
			pfs.setShowAreaFilter(true);
			pfs.setShowFutureOpenings(true);
			pfs.setShowSave(true);

			PricingFilterRequired pfr = pfo.getRequiredOptions();
			pfr.setYearRequired(true);
			pfr.setAccountRequired(true);
			//setTheList("/cbcstatuslist/view.action");//Upgrade-revisit
			//setFindFilterAction("/cbcfindfilter/view.action");
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
	@RequestMapping(value = "/getFilterViewLists" , method = {GET,POST})
	public String getFilterViewLists(String strFilterValues, Long profile_id,String periodType) throws Exception {
		PricingFilterSelections filterValues=null;
    	if(StringUtils.isNotEmpty(strFilterValues)) {
			 filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
		}
    	return super.getFilterViewLists(filterValues,profile_id,periodType);
	}
  
}
