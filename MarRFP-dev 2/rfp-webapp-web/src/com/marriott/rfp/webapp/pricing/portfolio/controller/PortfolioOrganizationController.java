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

@Security({"MFPADMIN", "MFPSALES","MFPFSALE"})
@RestController
@RequestMapping("/portfolioorganization")

public class PortfolioOrganizationController extends BaseDoubleFilterController {

	private static final Logger log = LoggerFactory.getLogger(PortfolioOrganizationController.class);
    public PortfolioOrganizationController() {
	super();

    }

	@Autowired
    public PortfolioOrganizationController(PricingFilterListsService pricingFilterListsService) {
	super(pricingFilterListsService);}
	@RequestMapping(value = "/getPortfolioOrganizationPricingFilter" , method = GET)
	public String getPortfolioOrganizationPricingFilter() {
		try {
			PricingFilterOptions pfo = new PricingFilterOptions();
			PricingFilterShow pfs = pfo.getShowOptions();
			pfs.setShowAccountFilter(true);
			pfs.setShowAccountSubset(true);
			pfs.setShowAccountSubset2(true);
			pfs.setShowBrandFilter(true);
			pfs.setShowAreaFilter(true);
			pfs.setShowManagedFranchised(true);
			pfs.setShowNumberSelected(true);

			PricingFilterRequired pfr = pfo.getRequiredOptions();
			pfr.setYearRequired(true);
			pfr.setAccountRequired(true);
			//setTopList("/portfolioorgavail/view.action");
			//setBottomList("/portfolioorgselect/view.action");
			//setFindFilterAction("/portfolioorgfindfilter/view.action");
			String strAddAll="Are you sure you want to ADD ALL HOTELS matching the criteria into a different subset in the portfolio?\\n\\n(Please click OK to continue, CANCEL to stop)";
			Map<String, Object> pricingFilters = new HashMap<>();
			pricingFilters.put("pfo", pfo);
			pricingFilters.put("pfs", pfs);
			pricingFilters.put("pfr", pfr);
			pricingFilters.put("strAddAll", strAddAll);
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
}
