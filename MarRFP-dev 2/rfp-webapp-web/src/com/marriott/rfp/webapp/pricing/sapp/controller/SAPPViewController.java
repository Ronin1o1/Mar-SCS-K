package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.period.Period;
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

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping("/sappview")
public class SAPPViewController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(SAPPViewController.class);

	@Autowired
	private PricingCommonService pricingCommonService;

	public SAPPViewController() {
		super();
	}

	@Autowired
	public SAPPViewController(PricingCommonService pricingCommonService) {
		super();
		setPricingCommonService(pricingCommonService);
	}

	@RequestMapping(value ="/getSAPPView" , method = GET)
	public String getSAPPView() throws Exception {
		try {
			List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
			String linkedMsg = pricingCommonService.getUserNotLinkedMsg(getUserProperties());
			String participate = pricingCommonService.getParticipate(getUserProperties());
			Map<String, Object> info = new HashMap<>();
			info.put("periodList", periodList);
			info.put("linkedMsg", linkedMsg);
			info.put("participate", participate);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}


	public void setPricingCommonService(PricingCommonService pricingCommonService) {
		this.pricingCommonService = pricingCommonService;
	}

	public PricingCommonService getPricingCommonService() {
		return pricingCommonService;
	}


}
