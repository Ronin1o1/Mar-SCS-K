package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelgrpsmtgs")
public class HotelRFPGroupsAndMeetingsController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPGroupsAndMeetingsController.class);

    private static final String CURRENTITEM="hotelgrpsmtgs";

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public HotelRFPGroupsAndMeetingsController() {
        super();
    }

    @Autowired
    public HotelRFPGroupsAndMeetingsController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService,
                                               ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelRFPGrpsAndMeetings", method = GET)
    public String getHotelRFPGrpsAndMeetings(Long hotelrfpid,Long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            HotelRFPGroupsAndMeetings  hotelRFPRespond = hotelRFPGeneralService.getHotelRFPGMRespond(hotelrfpid);
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu =setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelRFPRespond", hotelRFPRespond);
            info.put("contactName", contactname);
            info.put("currentItem", currentItem);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly",getGeneralReadOnly() );
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelGroupMeeting", method = POST)
    public String updateHotelGroupMeeting(String strHotel, Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings   hotelRFPRespond = fromJson(strHotel, HotelRFPGroupsAndMeetings.class);
            hotelRFPGeneralService.updateHotelRFPGMRespond(hotelrfpid, hotelRFPRespond, getUserProperties(), true);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateHotelGroupMeetingNoStatus", method = POST)
    public String updateHotelGroupMeetingNoStatus(String strHotel, Long hotelrfpid) throws Exception {
        try {
            HotelRFPGroupsAndMeetings  hotelRFPRespond = fromJson(strHotel, HotelRFPGroupsAndMeetings.class);
            hotelRFPGeneralService.updateHotelRFPGMRespond(hotelrfpid, hotelRFPRespond, getUserProperties(), false);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }

}
