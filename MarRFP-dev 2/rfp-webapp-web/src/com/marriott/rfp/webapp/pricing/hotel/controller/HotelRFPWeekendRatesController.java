package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelweekendrates")
public class HotelRFPWeekendRatesController extends BaseHotelGeneralRatesController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPWeekendRatesController.class);

    public HotelRFPWeekendRatesController() {
        super();
    }

    @Autowired
    public HotelRFPWeekendRatesController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService,
                                          ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, hotelRFPGeneralRatesService, constantsService, hotelService, hotelRFPService);
       // setCurrentItem("hotelweekendrates");
        Long ratetypeid=4L;
    }

    @RequestMapping(value = "/getHotelRFPWeekendRates", method = RequestMethod.GET)
    public String getHotelRFPWeekendRates(Long hotelrfpid) throws Exception {
        try {
            Map<String, HotelRates> hotelfixedrateMap = getHotelRFPGeneralRatesService().findGenRatesDetail(hotelrfpid, 1);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage());
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateHotelWeekendRates", method = RequestMethod.POST)
    public String updateHotelWeekendRates(String formChg, Long hotelrfpid, Long ratetypeid, String strHotelruleList, String strHotelRateMap) throws Exception {
        try {
            Type collectionType = new TypeToken<HashMap<String, HotelRates>>() {
            }.getType();
            HashMap<String, HotelRates> hotelRateMap = fromJson(strHotelRateMap, collectionType);

            Type collectionType1 = new TypeToken<List<HotelRules>>() {
            }.getType();
            List<HotelRules> hotelRulesList = fromJson(strHotelruleList, collectionType1);

            getHotelRFPGeneralRatesService().updateGeneralRules(formChg, hotelrfpid, ratetypeid, hotelRulesList, getUserProperties());
            getHotelRFPGeneralRatesService().updateGeneralRates(formChg, hotelrfpid, ratetypeid, hotelRateMap, getUserProperties());

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage());
            return RFPConstants.FATAL_ERROR;
        }
    }


}
