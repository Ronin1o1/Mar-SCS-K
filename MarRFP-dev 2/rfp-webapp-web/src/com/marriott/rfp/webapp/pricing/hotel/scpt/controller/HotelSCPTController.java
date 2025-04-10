package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.pricing.scpt.SCPTBreakfast;
import com.marriott.rfp.object.pricing.scpt.SCPTInternet;
import com.marriott.rfp.object.pricing.scpt.SCPTStatusReason;
import com.marriott.rfp.webapp.pricing.hotel.controller.BaseHotelBTPricingController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscpt")
public class HotelSCPTController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTController.class);
    private static final String CURRENTITEM= "hotelscpt";

    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public HotelSCPTController() {
        super();
        //setCurrentItem("hotelscpt");
        //String currentItem = "hotelscpt";
    }

    @Autowired
    public HotelSCPTController(HotelMenuService hotelMenuService, ConstantsService constantsService, HotelService hotelService,
                               HotelRFPService hotelRFPService, SCPTService scptService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.setScptService(scptService);

        //setCurrentItem("hotelscpt");
        //String currentItem = "hotelscpt";
    }


    @RequestMapping(value = "/getHotelSCPTMap", method = GET)
    public String getHotelSCPTMap(Long hotelrfpid, long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            //String currentItem = "hotelscpt";
            //setContactname(getConstantsService().getContactName());
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            List<SCPTStatusReason> scptstatusreason = scptService.findSCPTStatusReason();
            List<SCPTBreakfast>  breakfastList = scptService.findSCPTBreakfast();
            List<SCPTInternet>  internetList = scptService.findSCPTInternet();
            //Created Map
            Map<String, Object> hotelSCPTMap = new HashMap<>();
            hotelSCPTMap.put("scptstatusreason", scptstatusreason);
            hotelSCPTMap.put("breakfastList", breakfastList);
            hotelSCPTMap.put("internetList", internetList);
            return objectMapperStream(hotelSCPTMap);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

  /*  //Upgrade-revisit:no curl,not tested//redirect action ???
    @RequestMapping(value = "/update", method = POST)
    public String updateSCPT() throws Exception {
        try {

            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }*/


    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }

}
