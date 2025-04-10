package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping("/sappmodulelist")
public class SAPPModuleController extends BaseController{

	private static final Logger log = LoggerFactory.getLogger(SAPPModuleController.class);

	@Autowired
	private PricingFilterListsService pricingFilterListsService = null;

	public SAPPModuleController() {
		super();
	}

	public SAPPModuleController(PricingFilterListsService pricingFilterListsService) {
		super();
		this.pricingFilterListsService = pricingFilterListsService;
	}
//Renamed execute to getSAPPModule. Upgrade-revisit no curl
	@RequestMapping(value = "/getSAPPModule", method = POST)
	public String getSAPPModule(Long accountrecid) throws Exception {
		try {
			List<SAPPModule>	sappModuleList = pricingFilterListsService.getSappModules(accountrecid, getUserProperties());
			Map<String,List<SAPPModule>> sappModuleMap = new HashMap<>();
			sappModuleMap.put("sappModuleList",sappModuleList);//Created map
			return gsonStream(sappModuleMap);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}

	public PricingFilterListsService getPricingFilterListsService() {
		return pricingFilterListsService;
	}

	public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
		this.pricingFilterListsService = pricingFilterListsService;
	}

}
