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
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelfixedrates")
public class HotelRFPFixedRatesController extends BaseHotelGeneralRatesController {
    private static final String CURRENTITEM="hotelfixedrates";

    private static final Logger log = LoggerFactory.getLogger(HotelRFPFixedRatesController.class);
    public HotelRFPFixedRatesController() {
        super();
       // setCurrentItem("hotelfixedrates");
        Long ratetypeid=1L;
    }

    @Autowired
    public HotelRFPFixedRatesController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService, ConstantsService constantsService, HotelService hotelService,
                                        HotelRFPService hotelRFPService) {
        super(hotelMenuService, hotelRFPGeneralRatesService, constantsService, hotelService, hotelRFPService);
        //setCurrentItem("hotelfixedrates");
        Long ratetypeid=1L;
    }

    @RequestMapping(value = "/getHotelSeasonsLos", method = GET)
    public String getHotelRFPFixedRates(Long period, Long hotelrfpid, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        Long ratetypeid = 1L;
        try {
            return getHotelGeneralRates( hotelrfpid,  currentItem,  period, marshaCode,ratetypeid);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelSeasonsLos", method = POST)
    public String updateHotelSeasonsLos(String strHotelruleList, String strHotelSeason, String strLosList, String strhotelrateMap, String formChg, Long hotelrfpid, String num_seasoninitial) throws Exception {
        try {
            /*Long ratetypeid=1L;
            Type collectionType_ruleList = new TypeToken<List<HotelRules>>() {
            }.getType();
            Type collectionType_ratemap = new TypeToken<HashMap<String, HotelRates>>() {
            }.getType();*/
            Type collectionType_season = new TypeToken<Map<String, Season>>() {
            }.getType();
            Type collectionType_loslist = new TypeToken<Map<String, LengthOfStay>>() {
            }.getType();
            Map<String, Season> hotelSeason = fromJson(strHotelSeason, collectionType_season);
            Map<String, LengthOfStay> hotelLOS = fromJson(strLosList, collectionType_loslist);
            //HashMap<String, HotelRates> hotelrateMap = fromJson(strhotelrateMap, collectionType_ratemap);
            //List<HotelRules> hotelruleList = fromJson(strHotelruleList, collectionType_ruleList);
            getHotelRFPGeneralRatesService().updateHotelSeason(formChg, hotelrfpid, hotelSeason, getUserProperties(), num_seasoninitial);
            getHotelRFPGeneralRatesService().updateHotelLOS(formChg, hotelrfpid, hotelLOS, getUserProperties());
            //getHotelRFPGeneralRatesService().updateGeneralRules(formChg, hotelrfpid, ratetypeid, hotelruleList, getUserProperties());
            //getHotelRFPGeneralRatesService().updateGeneralRates(formChg, hotelrfpid, ratetypeid, hotelrateMap, hotelSeason, hotelLOS, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}