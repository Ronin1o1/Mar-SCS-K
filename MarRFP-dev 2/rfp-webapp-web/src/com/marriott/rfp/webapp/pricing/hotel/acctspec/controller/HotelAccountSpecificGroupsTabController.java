package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecgroups")
public class HotelAccountSpecificGroupsTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificGroupsTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificGroupsTabController() {
        super();
    }


    @Autowired
    public HotelAccountSpecificGroupsTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getAccSpecGrp", method = GET)
    public String getAccSpecGrp(Long hotel_accountinfoid) throws Exception {
        try {
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList=hotelRFPAccountSpecificService.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid, getUserProperties());
            return objectMapperStream(accountSpecificGroupQandAList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    //Upgrade-revisit:no curl,not tested
    @RequestMapping(value = "/update", method = POST)
    public String update(Long hotel_accountinfoid, String strAccountSpecificGroupQandAList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelAccountSpecQandA>>() {
            }.getType();
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList = fromJson(strAccountSpecificGroupQandAList, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificGroupAnswers(hotel_accountinfoid, accountSpecificGroupQandAList, getUserProperties());
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
