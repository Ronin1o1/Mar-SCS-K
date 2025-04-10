package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("multihotelaccountspecgroupmeetings")
public class MultiHotelAccountSpecificGroupMeetingsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(MultiHotelAccountSpecificGroupMeetingsController.class);

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private HotelService hotelService;

    public MultiHotelAccountSpecificGroupMeetingsController() {
        super();
        String currentItem = "multihotelaccountspecgroupmeetings";
    }

    @Autowired
    public MultiHotelAccountSpecificGroupMeetingsController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService, HotelService hotelService) {
        super();
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        this.hotelService = hotelService;
        String currentItem = "multihotelaccountspecgroupmeetings";
        String returnaction = "/multihotelaccountcenter/view.action";
        String returnbutton = "btnReturnHotelCenter.gif";
        String returnratesaction = "/multihotelaccountspecrates/view.action";
    }

    @RequestMapping(value = "/getHotelAccountTracking", method = GET)
    public String getHotelAccountTracking(String marshaCode, Long hotelid, Long hotel_accountinfoid) throws Exception {
        try {
            HotelDetailData hotelDetailData = hotelService.findPropertyDetail(marshaCode);
            HotelAccountSpecificData hotelAccountSpecificData = hotelRFPAccountSpecificService.findHotelAccountSpecific(hotel_accountinfoid);
            HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups = hotelRFPAccountSpecificService.getAccountGroupMeetings(hotel_accountinfoid, hotelid, getUserProperties());
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList = hotelRFPAccountSpecificService.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid, getUserProperties());

            return objectMapperStream(SUCCESS);
        } catch (Exception e) {
            log.error(e.getMessage());
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strAccountSpecificGroupQandAList, Long hotel_accountinfoid, String markComplete, String strHotelAccountSpecificData, HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups) throws Exception {
        try {
            List<HotelAccountSpecQandA> accountSpecificGroupQandAList = fromJson(strAccountSpecificGroupQandAList, List.class);
            HotelAccountSpecificData hotelAccountSpecificData = fromJson(strHotelAccountSpecificData, HotelAccountSpecificData.class);
            if (hotelAccountSpecificData != null) {
                hotelRFPAccountSpecificService.updateAccountGroupMeetings(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), hotelAccountSpecificData.getAccountrecid(),
                        hotelAccountSpecificGroups, markComplete, getUserProperties());
                hotelRFPAccountSpecificService.updateAccountSpecificGroupAnswers(hotel_accountinfoid, accountSpecificGroupQandAList, getUserProperties());
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
