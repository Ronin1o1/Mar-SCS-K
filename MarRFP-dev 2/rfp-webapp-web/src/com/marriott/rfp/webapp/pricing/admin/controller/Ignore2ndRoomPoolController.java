package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.hotel.Ignore2ndRoomPool;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

//Upgrade-revisit class not tested as no curls and not touched after first commit
@Security("MFPADMIN")
@RestController
@RequestMapping("/ignore2ndRoomPool")
public class Ignore2ndRoomPoolController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(Ignore2ndRoomPoolController.class);

    @Autowired
    private PricingAdminService pricingAdminService;
    @Autowired
    private PricingCommonService pricingCommonService;

    public Ignore2ndRoomPoolController() {
        super();
    }

    public Ignore2ndRoomPoolController(PricingAdminService pricingAdminService, PricingCommonService pricingCommonService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setPricingCommonService(pricingCommonService);
    }

    @RequestMapping(value = "/execute", method = GET)
    public String execute(  int orderHotelBy) throws Exception {
        Long affiliationid = 0L;
        String pgoosable = "N";
        try {
            List<HotelListData>   hotelList = pricingAdminService.getRoomPoolExemptList(affiliationid, pgoosable, orderHotelBy);
            List<HotelAffiliation>  affiliationList = pricingCommonService.findAllHotelAffiliations();
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/editignorermpool", method = POST)
    public String editignorermpool() throws Exception {
        try {
            List<Ignore2ndRoomPool>  rmpoolOptions = pricingAdminService.getIgnore2ndRoomPoolOptions();
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updatermpool", method = POST)
    public String updatermpool( HotelListData hotelrmpool) throws Exception {
        try {
            pricingAdminService.updateRoomPoolExempt(hotelrmpool);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update() throws Exception {
        try {
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
