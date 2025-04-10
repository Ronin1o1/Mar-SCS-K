package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.object.pricing.hotelrfp.QuickHotelAccountCenter;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/accountstatuslist")
public class AccountStatusController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AccountStatusController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;


    public AccountStatusController() {
        super();
    }

    public AccountStatusController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    @RequestMapping(value = "/statusaccounts")
    public String statusChangedAccounts(String marshaCode) throws Exception {
        try {
            List<QuickHotelAccountCenter> accountlist = hotelRFPAccountCenterService.getStatusChangedAccounts(7L, getUserProperties(), marshaCode);
            return gsonStream(accountlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/requestsaccounts")
    public String requestChangedAccounts(String marshaCode) throws Exception {
        try {
            List<QuickHotelAccountCenter> accountrequestlist = hotelRFPAccountCenterService.getRequestChangedAccounts(7L, getUserProperties(), marshaCode);
            return gsonStream(accountrequestlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/cbcaccounts")
    public String cbcChangedAccounts(String marshaCode) throws Exception {
        try {
            List<QuickHotelAccountCenter> accountcbclist = hotelRFPAccountCenterService.getCBCChangedAccounts(7L, getUserProperties(), marshaCode);
            return gsonStream(accountcbclist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/rebidaccounts")
    public String rebidDueAccounts(String marshaCode) throws Exception {
        try {
            List<QuickHotelAccountCenter> accountrebidlist = hotelRFPAccountCenterService.getRebidDueAccounts(getUserProperties(), marshaCode);
            return gsonStream(accountrebidlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


}

