package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Security("MFPADMIN")
@RestController
@RequestMapping("/accountTrackingHotels")
public class AccountTrackingHotelsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountTrackingHotelsController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;


    public AccountTrackingHotelsController() {
        super();
    }

    public AccountTrackingHotelsController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    //Upgrade-revisit: not tested because  no curl found
    @RequestMapping(value = "/getHotelList", method = RequestMethod.GET)
    public String execute() throws Exception {
        try {
            List<HotelListData>   hotelList = pricingAdminService.findAccountTrackingHotels();
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(List<HotelListData>   hotelList) throws Exception {
        try {
            pricingAdminService.updateAccountTrackingHotels(hotelList);
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


}
