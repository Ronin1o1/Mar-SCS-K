package com.marriott.rfp.webapp.pricing.hotel.grpmtg.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.pricing.hotel.acctspec.controller.HotelAccountSpecificFacilityTabController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelgrpprice")
public class HotelGrpPriceTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelGrpPriceTabController.class);

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;

    public HotelGrpPriceTabController() {
        super();
    }


    public HotelGrpPriceTabController(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getRFPGrpPriceTab", method = GET)
    public String getRFPGrpPriceTab(Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings hotelRFPGroupsPricing = hotelRFPGeneralService.getHotelRFPGroupPricing(hotelrfpid);
            return objectMapperStream(hotelRFPGroupsPricing);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateGrpPrices", method = POST)
    public String update(Long hotelrfpid, String strHRFPGroupsPricing) throws Exception {
        try {
            HotelRFPGroupsAndMeetings hotelRFPGroupsPricing = fromJson(strHRFPGroupsPricing, HotelRFPGroupsAndMeetings.class);
            hotelRFPGeneralService.updateHotelRFPGroupPricing(hotelrfpid, hotelRFPGroupsPricing, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {

            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }
}
