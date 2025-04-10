package com.marriott.rfp.webapp.pricing.mudroom.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.location.SalesLocation;
import com.marriott.rfp.object.pricing.accountmarketregion.AccountMarketRegion;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.user.User;
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

@Security(value = {"MFPADMIN"})
@RestController
@RequestMapping("/adminmudroom")
public class AdminMudroomController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AdminMudroomController.class);
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private MudroomService mudroomService = null;

    public AdminMudroomController() {
        super();
    }

    public AdminMudroomController(MudroomService mudroomService) {
        super();
        this.setMudroomService(mudroomService);
    }

    @RequestMapping(value = "/getAdminMudroomDetails", method = GET)
    public String getAdminMudroomDetails(Long period) throws Exception {
        try {
            List<AccountSegment> accountSegmentList = pricingAdminService.getAllAccountSegments();
            List<SalesLocation> locationList = pricingCommonService.getLocations();
            List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
            if (period == null || period.equals(0))
                period = ((Period) periodList.get(0)).getPeriod();
            AdminMudroom adminRespondent = mudroomService.getAdminRespondent(getUserProperties().getEid(), period);
            Map<String, Object> adminMudroomDetails = new HashMap<>();
            adminMudroomDetails.put("accountSegmentList", accountSegmentList);
            adminMudroomDetails.put("locationList", locationList);
            adminMudroomDetails.put("adminRespondent", adminRespondent);
            adminMudroomDetails.put("period", period);
            adminMudroomDetails.put("periodList",periodList);
            return gsonStream(adminMudroomDetails);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateadminmudroom", method = POST)
    public String updateadminmudroom(String strAdminRespondent, Long origPeriod, String changingPeriod) throws Exception {
        try {
            AdminMudroom adminRespondent = fromJson(strAdminRespondent, AdminMudroom.class);
            mudroomService.updateAdminRespondent(adminRespondent, origPeriod);
            if (!changingPeriod.equalsIgnoreCase("Y")) {
                User u = getUserProperties();
                u.setUpdateContactInfo(false);
                mudroomService.updateAdminRespondentDate(getUserProperties());
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public MudroomService getMudroomService() {
        return mudroomService;
    }
}
