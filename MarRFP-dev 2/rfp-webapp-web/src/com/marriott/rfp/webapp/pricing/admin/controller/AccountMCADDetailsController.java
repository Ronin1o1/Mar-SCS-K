package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.MCADDetail;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmcaddetail")
public class AccountMCADDetailsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountMCADDetailsController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public AccountMCADDetailsController() {
        super();
    }

    public AccountMCADDetailsController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }


    @RequestMapping(value = "/getAccountMCADDetails", method = GET)
    public String getAccountMCADDetails(Long accountrecid, Long businessid) throws Exception {
        try {
            MCADDetail mcadDetail=null;
            if(accountrecid==null)
                accountrecid=0L;
            if(businessid==null)
                businessid=0L;
            if (accountrecid == 0)
                mcadDetail = pricingAdminService.findNetezzaMCADDetail(businessid);
            else
                mcadDetail = pricingAdminService.findOracleMCADDetail(accountrecid, businessid);
            Gson gson = getGsonBuilder().setExclusionStrategies(new ExclusionStrategy() {
                @Override
                public boolean shouldSkipField(FieldAttributes f) {
                    if (f.getDeclaringClass() == MCADDetail.class && f.getName().equals("stateabbrev")) {
                        return true;
                    }
                    return false;
                }

                @Override
                public boolean shouldSkipClass(Class<?> clazz) {
                    return false;
                }
            }).create();
            return gsonStream(mcadDetail);
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
