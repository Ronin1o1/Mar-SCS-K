package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelgovseasons")
public class HotelRFPGovSeasonController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPGovSeasonController.class);
    private static final String CURRENTITEM="hotelgovseasons";

    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public HotelRFPGovSeasonController() {
        super();
    }

    @Autowired
    public HotelRFPGovSeasonController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService,
                                       ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    @RequestMapping(value = "/getHotelRFPGovSeason", method = RequestMethod.GET)
    public String getHotelRFPGovSeason(Long hotelrfpid, long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        boolean generalReadOnly = getGeneralReadOnly();
        try {
            PricingMenuData hotelPricingMenu = setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            List<Season> seasonList = hotelRFPGeneralRatesService.getHotelGovSeason(hotelrfpid, period);
            long maxSeason = getConstantsService().getMaxSeasons();
            String isDOSEnhanced = hotelRFPGeneralRatesService.isDOSEnhanced(hotelrfpid);
            if (hotelDetailData.getIsInternational())
                generalReadOnly = true;
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);

            Map<String, Object> info = new HashMap<>();
            info.put("seasonList", seasonList);
            info.put("maxSeason", maxSeason);
            info.put("isDOSEnhanced", isDOSEnhanced);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("gneralReadOnly", generalReadOnly);
            info.put("currentItem", currentItem);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelGovSeasons", method = RequestMethod.POST)
    public String updateHotelGovSeasons(String strSeasonList, Long hotelrfpid, String fromChg) throws Exception {
        try {
            List<Season> seasonList = fromJson(strSeasonList, List.class);
            hotelRFPGeneralRatesService.updateHotelGovSeason(fromChg, hotelrfpid, seasonList, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setHotelRFPGeneralRatesService(HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }

   /* public long getShowNumSeasons() {
        long showNumSeasons = maxSeason;
        if (getUserProperties().getIsPASAdmin() || getGeneralReadOnly()) {
            if (seasonList == null || seasonList.size() == 0)
                showNumSeasons = 1;
            else
                showNumSeasons = seasonList.size();
        }
        return showNumSeasons;
    }*/
}
