package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmaintenanceedit")
public class AccountMaintenanceController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountMaintenanceController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public AccountMaintenanceController() {
        super();
    }

    public AccountMaintenanceController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }
    //Upgrade-revisit: not tested because no curl found

    @RequestMapping(value = "/getAccountDetails", method = GET)
    public String getAccountDetails(Long accountrecid) throws Exception {
        Long period = null;
        Account account = null;
        try {
            if (accountrecid == 0) {
                account = new Account();
                account.setPeriod(period);
            } else {
                account = pricingAdminService.findAccountInfo(accountrecid);
            }
            return objectMapperStream(account);
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

}
