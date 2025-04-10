package com.marriott.rfp.webapp.pricing.hotel.grpmtg.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.webapp.common.controller.BaseController;
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
@RequestMapping("/hotelgrpmtgpay")
public class HotelGrpMtgPaymentTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelGrpMtgPaymentTabController.class);
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;

    public HotelGrpMtgPaymentTabController() {
        super();
    }

    public HotelGrpMtgPaymentTabController(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelGrpMtgPaymentTab", method = GET)
    public String getHotelGrpMtgPaymentTab(Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings  hotelRFPPayPricing = hotelRFPGeneralService.getHotelRFPPayPricing(hotelrfpid);
            return objectMapperStream(hotelRFPPayPricing);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    //upgrade-revisit:no curl,not tested
    @RequestMapping(value = "/updateGrpMtgPay", method = POST)
    public String update(String strHotelRFPPayPricing, Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings  hotelRFPPayPricing = fromJson(strHotelRFPPayPricing, HotelRFPGroupsAndMeetings.class);
            hotelRFPGeneralService.updateHotelRFPPayPricing(hotelrfpid, hotelRFPPayPricing, getUserProperties());
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
