package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelaccountspeclocalgroupmeetings")
public class HotelAccountSpecificCentralGroupMeetingsController extends HotelAccountSpecificGroupMeetingsController {
    private static final String CURRENTITEM="hotelaccountspeccentralgroupmeetings";

    public HotelAccountSpecificCentralGroupMeetingsController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificCentralGroupMeetingsController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                              ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, hotelRFPAccountSpecificService, constantsService, hotelService, hotelRFPService);
       // setCurrentItem("hotelaccountspeccentralgroupmeetings");
    }

    @RequestMapping(value = "/getHotelAccountSpecificCentralGroupMeetings", method = RequestMethod.GET)
    public String getHotelAccountSpecificCentralGroupMeetings(Long hotel_accountinfoid, Long hotelrfpid, long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        return super.getHotelAccountSpecificGroupMeetings(hotel_accountinfoid, hotelrfpid, period, marshaCode,currentItem);
    }


    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public String update(Long hotel_accountinfoid, String strAccountData, String strHotelData, String strAccountGrpQandAList) throws Exception {
        return super.update(hotel_accountinfoid, strAccountData, strHotelData, strAccountGrpQandAList);
    }
}
