package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.common.util.RFPConstants;
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
@RequestMapping("hotelseasons")
public class HotelRFPSeasonController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPSeasonController.class);
    private static final String CURRENTITEM="hotelseasons";

    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;

    public HotelRFPSeasonController() {
        super();
    }

    @Autowired
    public HotelRFPSeasonController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService,
                                    ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
       // setCurrentItem("hotelseasons");
    }

    @RequestMapping(value = "/getHotelRFPSeason", method = RequestMethod.GET)
    public String getHotelRFPSeason(Long hotelrfpid, long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            List<Season> seasonList = hotelRFPGeneralRatesService.getHotelSeason(hotelrfpid);
            long maxSeason = getConstantsService().getMaxSeasons();
            String isDOSEnhanced = hotelRFPGeneralRatesService.isDOSEnhanced(hotelrfpid);
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            Map<String, Object> info = new HashMap<>();
            info.put("seasonList", seasonList);
            info.put("maxSeason", maxSeason);
            info.put("isDOSEnhanced", isDOSEnhanced);
            info.put("currentItem", currentItem);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("currency", hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            info.put("generalReadOnly", getGeneralReadOnly());
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelSeasons", method = RequestMethod.POST)
    public String updateHotelSeasons(String strSeasonList, String formChg, Long hotelrfpid) throws Exception {
        try {
            List<Season> seasonList = fromJson(strSeasonList, List.class);
            hotelRFPGeneralRatesService.updateHotelSeason(formChg, hotelrfpid, seasonList, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage());
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setHotelRFPGeneralRatesService(HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }


}
