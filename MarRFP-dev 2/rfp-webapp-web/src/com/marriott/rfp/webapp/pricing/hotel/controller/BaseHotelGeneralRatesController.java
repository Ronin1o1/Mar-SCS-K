package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.object.pricing.hotelrfp.*;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseHotelGeneralRatesController extends BaseHotelBTPricingController {
    private static final Logger log = LoggerFactory.getLogger(BaseHotelGeneralRatesController.class);
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;

    public BaseHotelGeneralRatesController() {
        super();
    }

    public BaseHotelGeneralRatesController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService,
                                           ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    //upgrade-revisit:This method is not exposed and untouched
    public String getHotelGeneralRates(Long hotelrfpid, String currentItem, long period,String marshaCode,Long ratetypeid) throws Exception {
        try {
            List<RoomTypeRef>    roomtypeList=null;
            List<HotelRules> hotelruleList=null;
            PricingMenuData hotelPricingMenu = setMenuAndHotelData(hotelrfpid, currentItem,period);
            if(hotelService.findPropertyDetail(marshaCode) != null) {
                roomtypeList = hotelRFPGeneralRatesService.findRoomTypesDetail(hotelService.findPropertyDetail(marshaCode).getAffiliationid());
            }
            List<HotelLRA_NLRA>  lratypeList = hotelRFPGeneralRatesService.findLRAProductsDetail(ratetypeid);
            List<HotelRFPRmPools> roompoollist = hotelRFPGeneralRatesService.getHotelRFPRmPools(hotelrfpid);
            RateTypeRef ratetyperef=getHotelRFPGeneralRatesService().findRateDefDetail(ratetypeid);
            if(hotelService.findPropertyDetail(marshaCode) != null) {
                hotelruleList=getHotelRFPGeneralRatesService().findGenRulesDetail(hotelrfpid, ratetypeid,
                        hotelService.findPropertyDetail(marshaCode).getIsInternational(), getUserProperties());
            }
           // Map<String, HotelRates> hotelrateMap=getHotelRFPGeneralRatesService().findGenRatesDetail(hotelrfpid, ratetypeid);
            long maxSeason=getConstantsService().getMaxSeasons();
            long maxLOS = getConstantsService().getMaxLOS();
            List<LengthOfStay> losList=getHotelRFPGeneralRatesService().getHotelLOSWithDefault(hotelrfpid);
            List<Season> seasonList=getHotelRFPGeneralRatesService().getHotelSeasonWithDefault(hotelrfpid, period);
            long num_rp=getConstantsService().getNumRoomPools();
            String isDOSEnhanced = getHotelRFPGeneralRatesService().isDOSEnhanced(hotelrfpid);
            Map<String, Object> info = new HashMap<>();
            info.put("isDOSEnhanced", isDOSEnhanced);
            info.put("currentItem", currentItem);
            info.put("SeasonList", seasonList);
            info.put("LosList", losList);
            info.put("Num_rp", num_rp);
           // info.put("rateMap", hotelrateMap);
            info.put("rateTypeId", ratetypeid);
            info.put("roomtypeList", roomtypeList);
            info.put("lratypeList", lratypeList);
            info.put("roompoollist", roompoollist);
            info.put("maxLOS", maxLOS);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("currency", hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("Ratetyperef", ratetyperef);
            //info.put("HotelRateMap", hotelrateMap);
            info.put("RuleList", hotelruleList);
            info.put("MaxSeason", maxSeason);
            return gsonStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public HotelRFPService getHotelRFPService() {
        return hotelRFPService;
    }

    public void setHotelRFPService(HotelRFPService hotelRFPService) {
        this.hotelRFPService = hotelRFPService;
    }

    public void setHotelRFPGeneralRatesService(HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }


}