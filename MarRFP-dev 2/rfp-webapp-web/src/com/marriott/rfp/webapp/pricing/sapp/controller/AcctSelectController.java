package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.AcctSelect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctselect")
public class AcctSelectController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AcctSelectController.class);

    @Autowired
    private PricingCommonService pricingCommonService = null;
    public AcctSelectController() {
        super();
    }

    public AcctSelectController(PricingCommonService pricingCommonService) {
        super();
        this.pricingCommonService = pricingCommonService;
    }

    @RequestMapping(value = "/getAcctSelect", method = POST)
    public AcctSelect getAcctSelect() throws Exception {
        try {
            AcctSelect acctSelect=new AcctSelect();
            acctSelect.setPeriodList(pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole()));
            acctSelect.setLinkedMsg(pricingCommonService.getUserNotLinkedAccountMsg(getUserProperties()));
            return acctSelect;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }
}