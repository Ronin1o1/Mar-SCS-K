package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/multihotelaccountspecquestions")
public class MultiHotelAccountSpecQuestionsController extends BaseController {


    private static final Logger log = LoggerFactory.getLogger(MultiHotelAccountSpecQuestionsController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService;
    @Autowired
    private HotelService hotelService;

    public MultiHotelAccountSpecQuestionsController() {
        super();
    }

    @Autowired
    public MultiHotelAccountSpecQuestionsController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService, HotelService hotelService) {
        super();
        this.hotelService = hotelService;
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        String returnImg = "/image/button/btnReturnHotelCenter.gif";
        String returnAction = "/multihotelaccountcenter/view.action";
        String updateAction = "/multihotelaccountspecquestions/updateAnswers.action";
    }

    @RequestMapping(value = "/getMultiHotelAccountSpecQuestions", method = GET)
    public String getMultiHotelAccountSpecQuestions(Long hotel_accountinfoid, String marshaCode) throws Exception {
        try {

            List<HotelAccountSpecQandA> accountSpecificQandAList = hotelRFPAccountSpecificService.findAccountSpecQuestionsDetail(hotel_accountinfoid, getUserProperties());
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList = hotelRFPAccountSpecificService.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid,
                    getUserProperties());
            HotelDetailData hotelDetailData = hotelService.findPropertyDetail(marshaCode);
            Map<String, Object> info = new HashMap<>();
            info.put("accountSpecificQandAList", accountSpecificQandAList);
            info.put("accountSpecificGroupQandAList", accountSpecificGroupQandAList);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateAnswers", method = POST)
    public String updateAnswers(String straccountSpecificQandAList, String strAccountSpecificGroupQandAList, Long hotel_accountinfoid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelAccountSpecQandA>>() {
            }.getType();
            List<HotelAccountSpecQandA> accountSpecificQandAList = fromJson(straccountSpecificQandAList, collectionType);
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList = fromJson(strAccountSpecificGroupQandAList, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificAnswers(hotel_accountinfoid, accountSpecificQandAList, accountSpecificGroupQandAList,
                    getUserProperties());
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

    public HotelService getHotelService() {
        return hotelService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

}
