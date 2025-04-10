package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.AccountMaintCopyInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmaintcopy")
public class AccountMaintCopyInfoController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountMaintCopyInfoController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;


    public AccountMaintCopyInfoController() {
        super();
    }

    public AccountMaintCopyInfoController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getAccountCopyInfo", method = POST)
    public AccountMaintCopyInfo getAccountCopyInfo(Long period, Long copyFromPeriod) throws Exception {
        try {
            AccountMaintCopyInfo accountMaintCopyInfo=new AccountMaintCopyInfo();
            accountMaintCopyInfo.setPeriodList(pricingAdminService.findAllPeriodsExcept(period));
            if (copyFromPeriod == null || copyFromPeriod.equals(new Long(0)))
                copyFromPeriod = accountMaintCopyInfo.getPeriodList().get(0).getPeriod();
            accountMaintCopyInfo.setAccountList(pricingAdminService.getCopyAccountList(copyFromPeriod, period));
            return accountMaintCopyInfo;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String copyFromExistingAccount, Long copyFromPeriod, String copySAPP, Long period, Long copyFromAccountrecid) throws Exception {
        try {
            Long accountrecid = pricingAdminService.updateAccountCopyInfo(copyFromExistingAccount, copySAPP, period, copyFromAccountrecid, getUserProperties());
            return objectMapperStream(accountrecid);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }


}
