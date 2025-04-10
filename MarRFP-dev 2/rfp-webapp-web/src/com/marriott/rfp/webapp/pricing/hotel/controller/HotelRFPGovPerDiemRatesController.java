package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.*;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelgovrates")
public class HotelRFPGovPerDiemRatesController extends BaseHotelGeneralRatesController {
    private static final Logger log = LoggerFactory.getLogger(HotelRFPGovPerDiemRatesController.class);
    private static final String CURRENTITEM="hotelgovrates";
    public HotelRFPGovPerDiemRatesController() {
        super();
    }

    @Autowired
    private HotelService hotelService = null;

    @Autowired
    public HotelRFPGovPerDiemRatesController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService, ConstantsService constantsService, HotelService hotelService,
                                             HotelRFPService hotelRFPService) {
        super(hotelMenuService, hotelRFPGeneralRatesService, constantsService, hotelService, hotelRFPService);
        //setCurrentItem("hotelgovrates");
        Long ratetypeid=5L;
    }

    @RequestMapping(value = "/getHotelRFPGovPerDiemRates", method = RequestMethod.GET)
    public String getHotelRFPGovPerDiemRates(Long hotelrfpid, long period,String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            Long ratetypeid=5L;
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            List<RoomTypeRef> roomtypeList=getHotelRFPGeneralRatesService().findRoomTypesDetail(hotelService.findPropertyDetail(marshaCode).getAffiliationid());
            List<HotelLRA_NLRA> lratypeList=getHotelRFPGeneralRatesService().findLRAProductsDetail(ratetypeid);
            List<HotelRFPRmPools> roompoollist=getHotelRFPGeneralRatesService().getHotelRFPRmPools(hotelrfpid);
            RateTypeRef ratetyperef=getHotelRFPGeneralRatesService().findRateDefDetail(ratetypeid);
            List<LengthOfStay> losList=getHotelRFPGeneralRatesService().getHotelGovLOS(hotelrfpid);
            List<Season> seasonList=getHotelRFPGeneralRatesService().getHotelGovSeason(hotelrfpid, period);
            List<HotelRules> hotelruleList=getHotelRFPGeneralRatesService().findGovGenRulesDetail(hotelrfpid, ratetypeid, hotelService.findPropertyDetail(marshaCode).getIsInternational(), getUserProperties());
            List<HotelRules> hotelfixedruleList=getHotelRFPGeneralRatesService().findGovGenRulesDetail(hotelrfpid, 1, hotelService.findPropertyDetail(marshaCode).getIsInternational(), getUserProperties());
            Map<String, HotelRates> hotelrateMap=getHotelRFPGeneralRatesService().findGovGenRatesDetail(hotelrfpid, ratetypeid);
            Map<String, HotelRates> hotelfixedrateMap = getHotelRFPGeneralRatesService().findGovGenRatesDetail(hotelrfpid, 1);
            long maxSeason=getConstantsService().getMaxSeasons();
            long maxLOS=getConstantsService().getMaxLOS();
            long num_rp=getConstantsService().getNumRoomPools();

            Map<String, Object> info = new HashMap<>();
            info.put("hotelrfpid", hotelrfpid);
            info.put("period", period);
            info.put("marshaCode", marshaCode);
            info.put("hotelfixedruleList", hotelfixedruleList);
            info.put("hotelfixedrateMap", hotelfixedrateMap);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateHotelGovRates", method = RequestMethod.POST)
    public String updateHotelGovRates(String formChg, Long hotelrfpid, Long ratetypeid,
                                      String strSeason, String strHotelLOS, String strHotelruleList,
                                      String strHotelFixedruleList, String strHotelRateMap, String strHotelFixedRateMap) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<String, Season>>() {}.getType();
            Map<String, Season> hotelSeason = fromJson(strSeason, collectionType);

            Type collectionType1 = new TypeToken<Map<String, LengthOfStay>>() {}.getType();
            Map<String, LengthOfStay> hotelLOS = fromJson(strHotelLOS, collectionType1);

            Type collectionType2 = new TypeToken<List<HotelRules>>() {}.getType();
            List<HotelRules> hotelRulesList = fromJson(strHotelruleList, collectionType2);

            List<HotelRules> hotelFixedRulesList = fromJson(strHotelFixedruleList, collectionType2);

            Type collectionType3 = new TypeToken<HashMap<String, HotelRates>>() {}.getType();
            HashMap<String, HotelRates> hotelRateMap = fromJson(strHotelRateMap, collectionType3);

            HashMap<String, HotelRates> hotelFixedRateMap = fromJson(strHotelFixedRateMap, collectionType3);

            if (formChg != null && formChg.equals("Y")) {
                getHotelRFPGeneralRatesService().updateHotelGovSeason(formChg, hotelrfpid, hotelSeason, getUserProperties());
                getHotelRFPGeneralRatesService().updateHotelGovLOS(formChg, hotelrfpid, hotelLOS, getUserProperties());

                getHotelRFPGeneralRatesService().updateGovGeneralRules(formChg, hotelrfpid, ratetypeid, hotelRulesList, getUserProperties());
                getHotelRFPGeneralRatesService().updateGovGeneralRates(formChg, hotelrfpid, ratetypeid, hotelRateMap, hotelSeason, hotelLOS, getUserProperties());
                getHotelRFPGeneralRatesService().updateGovGeneralRules(formChg, hotelrfpid, 1, hotelFixedRulesList, getUserProperties());
                getHotelRFPGeneralRatesService().updateGovGeneralRates(formChg, hotelrfpid, 1, hotelFixedRateMap, hotelSeason, hotelLOS, getUserProperties());
            }

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}
