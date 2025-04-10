package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
public class HotelAccountSpecificGroupMeetingsController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificGroupMeetingsController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private HotelService hotelService = null;

    public HotelAccountSpecificGroupMeetingsController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificGroupMeetingsController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                       ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        //setCurrentItem("hotelaccountspecrates");
    }

    public String getHotelAccountSpecificGroupMeetings(Long hotel_accountinfoid, Long hotelrfpid, long period, String marshaCode, String currentItem) throws Exception {
        HotelAccountSpecificData hotelAccountSpecificData=null;
        List<HotelAccountSpecQandA> accountSpecificGroupQandAList=null;
        try {
            PricingMenuData hotelPricingMenu =setMenuAndHotelData(hotelrfpid, currentItem, period);
            hotelAccountSpecificData = hotelRFPAccountSpecificService.findHotelAccountSpecific(hotel_accountinfoid);
            accountSpecificGroupQandAList = hotelRFPAccountSpecificService.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid, getUserProperties());
            HashMap<String, Object> info = new HashMap<>();
            info.put("hotelAccountSpecificData", hotelAccountSpecificData);
            info.put("accountSpecificGroupQandAList", accountSpecificGroupQandAList);
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("menu",hotelPricingMenu);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String update(Long hotel_accountinfoid, String strAccountData, String strHotelData, String strAccountGrpQandAList) throws Exception {
        String markComplete = "N";
        List<HotelAccountSpecQandA> accountSpecificGroupQandAList=null;
        HotelAccountSpecificData hotelAccountSpecificData=null;
        HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups=null;
        try {
            Type collectionType = new TypeToken<List<HotelAccountSpecQandA>>() {
            }.getType();
            accountSpecificGroupQandAList = fromJson(strAccountGrpQandAList, collectionType);
            hotelAccountSpecificData = fromJson(strAccountData, HotelAccountSpecificData.class);
            hotelAccountSpecificGroups = fromJson(strHotelData, HotelAccountSpeciifcGroupMeetings.class);

            if (hotelAccountSpecificData != null) {
                hotelRFPAccountSpecificService.updateAccountGroupMeetings(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(),
                        hotelAccountSpecificData.getAccountrecid(), hotelAccountSpecificGroups, markComplete, getUserProperties());
                hotelRFPAccountSpecificService.updateAccountSpecificGroupAnswers(hotel_accountinfoid, accountSpecificGroupQandAList, getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
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
