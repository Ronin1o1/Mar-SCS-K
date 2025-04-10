package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES","MFPFSALE"})
@RestController
@RequestMapping("/portfolioorgselect")

public class PortfolioOrganizationSelectedController extends PortfolioOrganizationBaseController {

    public PortfolioOrganizationSelectedController() {
	super();
    }

	@Autowired
    public PortfolioOrganizationSelectedController(PortfolioService portfolioService) {
		setPortfolioService(portfolioService);
		//setSubsetnum(2);
		//setActionnamespace("portfolioorgselect");
		//setOrgtype("Selected");//Upgrade-revisit no usage found
    }

	@RequestMapping(value = "/getPortfolioOrganization" , method = {GET,POST})
	public String getPortfolioOrganization(String strFilterValues) throws Exception {
		Integer subsetnum = 2;
		return super.getPortfolioOrganization(strFilterValues, subsetnum);
	}

	@RequestMapping(value = "/update" , method = POST)
	public String update(String strOrgSelect,Long accountrecid,String subset) throws Exception {
		return super.update(strOrgSelect,accountrecid,subset);
	}
}
