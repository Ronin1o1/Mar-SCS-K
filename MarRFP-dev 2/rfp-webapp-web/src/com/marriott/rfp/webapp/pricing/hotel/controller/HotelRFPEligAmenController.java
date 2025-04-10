package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureCharge;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelRFPEligAmen;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hoteleligamen")
public class HotelRFPEligAmenController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPEligAmenController.class);
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    private static final String CURRENTITEM = "hoteleligamen";


    public HotelRFPEligAmenController() {
        super();
        //setCurrentItem("hoteleligamen");
    }

    @Autowired
    public HotelRFPEligAmenController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService,
                                      ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
        // setCurrentItem("hoteleligamen");
    }

    @RequestMapping(value = "/getHotelRFPEligAmen", method = GET)
    public HotelRFPEligAmen getHotelRFPEligAmen(Long hotelrfpid, Long period, String marshaCode, @RequestParam(required = false, name = "currentItem", defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            HotelRFPEligAmen hotelRFPEligAmen = new HotelRFPEligAmen();
            hotelRFPEligAmen.setHotelEligibilityList(hotelRFPGeneralService.getGeneralEligibility(hotelrfpid));
            hotelRFPEligAmen.setHotelAmenitiesList(hotelRFPGeneralService.getGeneralAmenities(hotelrfpid));
            hotelRFPEligAmen.setHtlstdcxlpolicy(hotelRFPGeneralService.getCxlPolicy(hotelrfpid));
            hotelRFPEligAmen.setEarlycharge(hotelRFPGeneralService.getEarlyCharge());
            hotelRFPEligAmen.setChargeOptions(hotelRFPGeneralService.getChargeOptions());
            hotelRFPEligAmen.setEarlyDepartureCharge(hotelRFPGeneralService.getEarlyDepartureCharge(hotelrfpid));
            hotelRFPEligAmen.setMenu(setMenuAndHotelData(hotelrfpid, currentItem, period));

            return hotelRFPEligAmen;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }

    }

    @RequestMapping(value = "/updateHotelEligAmen", method = POST)
    public String updateHotelEligAmen(String strHotelEligibilityList, String strEarlyDepartureCharge, String formChg, Long hotelrfpid, String earlycharge) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelEligibility>>() {
            }.getType();
            List<HotelEligibility> hotelEligibilityList = fromJson(strHotelEligibilityList, collectionType);
            EarlyDepartureCharge earlyDepartureCharge = fromJson(strEarlyDepartureCharge, EarlyDepartureCharge.class);

            hotelRFPGeneralService.updateGeneralEligibility(formChg, hotelrfpid, hotelEligibilityList, getUserProperties());
            if (earlycharge != null && earlycharge.equalsIgnoreCase("Y")) {
                hotelRFPGeneralService.updateEarlyDepartureCharge(hotelrfpid, earlyDepartureCharge, getUserProperties());
            }

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }


}
