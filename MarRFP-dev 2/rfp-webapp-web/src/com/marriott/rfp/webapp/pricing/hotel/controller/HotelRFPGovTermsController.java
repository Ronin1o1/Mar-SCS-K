package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelgovterms")
public class HotelRFPGovTermsController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPGovTermsController.class);
    private static final String CURRENTITEM="hotelgovterms";

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;

    @Autowired
    private HotelService hotelService = null;

    public HotelRFPGovTermsController() {
        super();
    }

    @Autowired
    public HotelRFPGovTermsController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService,
                                      ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelRFPGovTerms", method = RequestMethod.POST)
    public String getHotelRFPGovTerms(Long hotelrfpid, long period,String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            Map<String, Object> info = new HashMap<>();
            info.put("hotelPricingMenu", hotelPricingMenu);
            info.put("hotelDetailData", hotelDetailData);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateHotelGovTerms", method = RequestMethod.POST)
    public String updateHotelGovTerms(Long hotelrfpid) throws Exception {
        try {
            hotelRFPGeneralService.updateGovTerms(hotelrfpid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}
