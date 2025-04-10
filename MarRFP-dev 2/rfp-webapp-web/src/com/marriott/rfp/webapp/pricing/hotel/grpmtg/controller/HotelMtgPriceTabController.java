package com.marriott.rfp.webapp.pricing.hotel.grpmtg.controller;


import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelMtgPriceTab;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelmtgprice")
public class HotelMtgPriceTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelMtgPriceTabController.class);
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;

    public HotelMtgPriceTabController() {
        super();
    }

    public HotelMtgPriceTabController(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelMtgPriceTab", method = GET)
    public HotelMtgPriceTab getHotelMtgPriceTab(Long hotelrfpid) throws Exception {
        try {
            HotelMtgPriceTab hotelMtgPriceTab=new HotelMtgPriceTab();
            hotelMtgPriceTab.setHotelRFPSIHMtgPricing(hotelRFPGeneralService.getHotelRFPSIHMtgPricing(hotelrfpid));
            hotelMtgPriceTab.setHotelRFPMtgPricing(hotelRFPGeneralService.getHotelRFPMtgPricing(hotelrfpid));
            return hotelMtgPriceTab;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }

    }

    @RequestMapping(value = "/updateMtgPrices", method = POST)
    public String update(String strHRFPMtgPricing, Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings hotelRFPMtgPricing = fromJson(strHRFPMtgPricing, HotelRFPGroupsAndMeetings.class);
            hotelRFPGeneralService.updateHotelRFPMtgPricing(hotelrfpid, hotelRFPMtgPricing, getUserProperties());
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
