package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNew;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/newaccountlist")
public class NewAccountController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(NewAccountController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;


    public NewAccountController() {
        super();
    }

    public NewAccountController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    @RequestMapping(value = "/newaccounts", method = GET)
    public String newAccounts() throws Exception {
        List<AccountNew> accountlist=null;
        try {
            accountlist=hotelRFPAccountCenterService.getNewAccounts(7L, getUserProperties());
            return gsonStream(accountlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelRFPAccountCenterService getHotelRFPAccountCenterService() {
        return hotelRFPAccountCenterService;
    }

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }



}
