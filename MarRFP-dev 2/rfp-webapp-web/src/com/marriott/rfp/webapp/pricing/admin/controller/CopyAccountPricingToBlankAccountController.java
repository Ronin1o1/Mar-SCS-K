package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/copyToBlankAccount")
public class CopyAccountPricingToBlankAccountController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(CopyAccountPricingToBlankAccountController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private PricingCommonService pricingCommonService;

    public CopyAccountPricingToBlankAccountController() {
        super();
    }

    public CopyAccountPricingToBlankAccountController(PricingAdminService pricingAdminService, PricingCommonService pricingCommonService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setPricingCommonService(pricingCommonService);
    }

    //Upgrade-revisit: not tested because no curl found
    @RequestMapping(value = "/getCopyToBlankAccount", method =  RequestMethod.GET)
    public String execute(long period) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            List<Account> fromAccountList=null;
            List<Account> toAccountList=null;
            boolean  copyOK = false;
            List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
            if (period == 0 && periodList != null)
                period = periodList.get(0).getPeriod();
            if (period != 0) {
                fromAccountList = pricingAdminService.getFromAccountList(period);
                toAccountList = pricingAdminService.getToAccountList(period);
            }
            info.put("fromAccountList", fromAccountList);
            info.put("toAccountList", toAccountList);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/copy", method = POST)
    public String copy(long fromAccount,long toAccount,String copyQuestions,String copyGMQuestions) throws Exception {
        try {
            boolean   copyOK = false;
            pricingAdminService.accountCopyPricingUpdate(fromAccount, toAccount, copyQuestions, copyGMQuestions, getUserProperties());
            copyOK = true;
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

}
