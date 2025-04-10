package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

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
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountgenspecgroups")
public class HotelAccountSpecificGeneralGroupsTabController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificGeneralGroupsTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
 
    public HotelAccountSpecificGeneralGroupsTabController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificGeneralGroupsTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    //Upgrade-revisit:no curl, not touched,not tested
    @RequestMapping(value = "/getHotelAccountSpecificGeneralGroupsTab", method = GET)
    public String getHotelAccountSpecificGeneralGroupsTab(Long hotel_accountinfoid, Long hotelid) throws Exception {
        try {

            HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups=hotelRFPAccountSpecificService.getAccountGroupMeetings(hotel_accountinfoid, hotelid, getUserProperties());
            return gsonStream(hotelAccountSpecificGroups);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    //Upgrade-revisit:no curl, not tested
    @RequestMapping(value = "/updateGenGroups", method = POST)
    public String update(Long hotel_accountinfoid, String strHotelAccountSpecificGroups) throws Exception {
        try {
            HotelAccountSpeciifcGroupMeetings hotelAccountSpecificGroups = fromJson(strHotelAccountSpecificGroups, HotelAccountSpeciifcGroupMeetings.class);
            hotelRFPAccountSpecificService.updateAccountGroupMeetings(hotel_accountinfoid, hotelAccountSpecificGroups, getUserProperties());
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
