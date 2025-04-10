package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.CopyAccountInfoBySegment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/copyAccountInfoBySegment")
public class CopyAccountInfoBySegmentController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(CopyAccountInfoBySegmentController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;


    public CopyAccountInfoBySegmentController() {
        super();
    }

    @Autowired
    public CopyAccountInfoBySegmentController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/copyAccountInfo", method = GET)
    public CopyAccountInfoBySegment copyAccountInfo() throws Exception {
        try {
            CopyAccountInfoBySegment copyAccountInfoBySegment=new CopyAccountInfoBySegment();
            copyAccountInfoBySegment.setFromperiodList(pricingAdminService.getFromPeriods(getUserProperties().getRole()));
            copyAccountInfoBySegment.setToperiodList(pricingAdminService.getToPeriods(getUserProperties().getRole()));
            copyAccountInfoBySegment.setAccountSegmentList(pricingAdminService.getAllAccountSegments());
            copyAccountInfoBySegment.setCopyMsg("");
            return copyAccountInfoBySegment;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/copy", method = POST)
    public String copy(Long fromperiod, Long toperiod, String accountSegment) throws Exception {
        try {
            String copyMsg = "";
            copyMsg = pricingAdminService.accountCopybyTierUpdate(fromperiod, toperiod, accountSegment, getUserProperties());
            return gsonStream(copyMsg);
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
