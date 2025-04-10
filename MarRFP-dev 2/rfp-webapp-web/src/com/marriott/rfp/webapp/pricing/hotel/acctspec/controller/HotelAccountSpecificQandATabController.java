package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecquest")
public class HotelAccountSpecificQandATabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificQandATabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificQandATabController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificQandATabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getHotelAccountSpecificQandATab", method = GET)
    public String getHotelAccountSpecificQandATab(Long hotel_accountinfoid) throws Exception {
        try {
            List<HotelAccountSpecQandA> accountSpecificQandAList=hotelRFPAccountSpecificService.findAccountSpecQuestionsDetail(hotel_accountinfoid, getUserProperties());
            return objectMapperStream(accountSpecificQandAList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateQuestion", method = POST)
    public String update(Long hotel_accountinfoid, String strAccountSpecificQandAList) throws Exception {
        try {

            Type collectionType = new TypeToken<List<HotelAccountSpecQandA>>() {
            }.getType();
            List<HotelAccountSpecQandA> accountSpecificQandAList = (List<HotelAccountSpecQandA>) fromJson(strAccountSpecificQandAList, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificAnswers(hotel_accountinfoid, accountSpecificQandAList, getUserProperties());
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
