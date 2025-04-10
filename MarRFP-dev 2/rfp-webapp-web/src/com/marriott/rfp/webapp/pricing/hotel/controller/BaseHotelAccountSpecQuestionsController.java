package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

public class BaseHotelAccountSpecQuestionsController extends BaseHotelBTPricingController {
    private static final Logger log = LoggerFactory.getLogger(BaseHotelAccountSpecQuestionsController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private ConstantsService constantsService = null;
    private static final String CURRENTITEM="hotelaccountspecquestions";

    public BaseHotelAccountSpecQuestionsController() {
        super();
    }

    @Autowired
    public BaseHotelAccountSpecQuestionsController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                   ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
       // setCurrentItem("hotelaccountspecquestions");
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public String getHotelAccountSpecQuestions(Long hotel_accountinfoid, Long hotelrfpid, long period, String marshaCode, long rateType, String currentItem) throws Exception {
        try {

            PricingMenuData hotelPricingMenu = setMenuAndHotelData(hotelrfpid, currentItem, period);
            List<HotelAccountSpecQandA> accountSpecificQandAList = hotelRFPAccountSpecificService.findAccountSpecQuestionsDetailCpac(hotel_accountinfoid, rateType, getUserProperties());
             List<HotelAccountSpecQandA> accountSpecificGroupQandAList = hotelRFPAccountSpecificService.findAccountSpecGroupQuestionsDetailCpac(hotel_accountinfoid, rateType, getUserProperties());
            HashMap<String, Object> info = new HashMap<>();
            info.put("accountSpecificQandAList", accountSpecificQandAList);
            info.put("accountSpecificGroupQandAList", accountSpecificGroupQandAList);
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("menu",hotelPricingMenu);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public String updateAnswers(Long hotel_accountinfoid,String strAccountSpecificQandAList, String strAccountSpecificGroupQandAList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelAccountSpecQandA>>() {}.getType();
            List<HotelAccountSpecQandA> accountSpecificQandAList=(List<HotelAccountSpecQandA>)fromJson(strAccountSpecificQandAList,collectionType);
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList=(List<HotelAccountSpecQandA>)fromJson(strAccountSpecificGroupQandAList, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificAnswers(hotel_accountinfoid, accountSpecificQandAList, accountSpecificGroupQandAList, getUserProperties());
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
