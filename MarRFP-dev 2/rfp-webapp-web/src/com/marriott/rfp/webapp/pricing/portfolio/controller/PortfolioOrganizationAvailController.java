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
@RequestMapping("/portfolioorgavail")
public class PortfolioOrganizationAvailController extends PortfolioOrganizationBaseController {


    public PortfolioOrganizationAvailController() {
	super();

    }

	@Autowired
    public PortfolioOrganizationAvailController(PortfolioService portfolioService) {
	setPortfolioService(portfolioService);
	//setSubsetnum(1);
	//setActionnamespace("portfolioorgavail");
	//setOrgtype("Avail");//Upgrade-revisit no usage found
    }
	//Upgrade-revisit
	@RequestMapping(value = "/getPortfolioOrganization" , method = {GET,POST})
	public String getPortfolioOrganization(String strFilterValues) throws Exception {
		Integer subsetnum=1;
		return super.getPortfolioOrganization(strFilterValues,subsetnum);
	}

	@RequestMapping(value = "/update" , method = POST)
	public String update(String strOrgSelect,Long accountrecid,String subset) throws Exception {
		return super.update(strOrgSelect,accountrecid,subset);
	}
}
