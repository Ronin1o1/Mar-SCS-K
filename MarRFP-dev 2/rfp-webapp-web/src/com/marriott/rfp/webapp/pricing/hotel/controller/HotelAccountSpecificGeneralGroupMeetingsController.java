package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER" })
@RestController
public class HotelAccountSpecificGeneralGroupMeetingsController extends BaseHotelBTPricingController{

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificGeneralGroupMeetingsController.class);

    private  static final String CURRENTITEM="hotelaccountspecrates";

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    @Autowired
    private HotelService hotelService = null;

    public HotelAccountSpecificGeneralGroupMeetingsController() {
        super();
        //setCurrentItem("hotelaccountspecrates");
    }

    @Autowired
    public HotelAccountSpecificGeneralGroupMeetingsController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                          ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        //setCurrentItem("hotelaccountspecrates");
    }

    @RequestMapping(value="/getHotelAccountGeneralGroupMeetings" , method = POST)
            public String execute(Long hotelrfpid,long period,String marshaCode,Long hotel_accountinfoid,Long hotelid,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            PricingMenuData hotelPricingMenu=  setMenuAndHotelData(hotelrfpid,currentItem,period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            HotelAccountSpecificData hotelAccountSpecificData=hotelRFPAccountSpecificService.findHotelAccountSpecific(hotel_accountinfoid);
            HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups=hotelRFPAccountSpecificService.getAccountGroupMeetings(hotel_accountinfoid, hotelid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage());
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long hotel_accountinfoid,String markComplete,String strHotelAccountSpecificData,String strHotelAccountSpeciifcGroupMeetings) throws Exception {
        try {
            HotelAccountSpecificData hotelAccountSpecificData= fromJson(strHotelAccountSpecificData,HotelAccountSpecificData.class);
            HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups=fromJson(strHotelAccountSpeciifcGroupMeetings,HotelAccountSpeciifcGroupMeetings.class);
            if ( hotelAccountSpecificData!= null) {
                hotelRFPAccountSpecificService.updateAccountGroupMeetings( hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(),
                        hotelAccountSpecificData.getAccountrecid(), hotelAccountSpecificGroups,markComplete, getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage());
            return FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }


}
