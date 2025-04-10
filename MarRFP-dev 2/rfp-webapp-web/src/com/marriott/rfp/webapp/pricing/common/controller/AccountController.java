package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AccountController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    public AccountController() {
        super();
    }

    @Autowired
    public AccountController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    @RequestMapping(value = "/getAccountLists", method = GET)
    public String getAccountLists(Long searchperiod,Long searchdueDate,String searchnewAccountsOnly,String searchaccountpricingtype,String searchaccounttype,String searchgppaccountsonly) throws Exception {

        try {
            List<Account> accountlist = pricingFilterListsService.getAccountListForRole(searchperiod, searchdueDate, searchnewAccountsOnly, searchaccountpricingtype, searchaccounttype, searchgppaccountsonly,
                    getUserProperties());
            return objectMapperStream(accountlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getAccountShortInfo",method = GET)
    public String getAccountShortInfo(String searchaccountrecid) throws Exception {
        AccountCenterInfo accountCenterInfo=null;
        try {
            if (searchaccountrecid != null && searchaccountrecid.equals(""))
                   accountCenterInfo = pricingFilterListsService.getShortAccountInfo(Long.valueOf(searchaccountrecid));
            return objectMapperStream(accountCenterInfo);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}
