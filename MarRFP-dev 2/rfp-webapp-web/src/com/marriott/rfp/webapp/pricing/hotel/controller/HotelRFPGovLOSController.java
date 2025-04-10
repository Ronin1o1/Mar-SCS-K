package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
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
@RequestMapping("hotelgovlos")
public class HotelRFPGovLOSController extends BaseHotelBTPricingController {
    private static final Logger log = LoggerFactory.getLogger(HotelRFPGovLOSController.class);
    private static final String CURRENTITEM="hotelgovlos";

    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public HotelRFPGovLOSController() {
        super();
    }

    @Autowired
    public HotelRFPGovLOSController(HotelMenuService hotelMenuService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService,
                                    ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    @RequestMapping(value = "/getHotelRFPGovLOS", method = RequestMethod.GET)
    public String getHotelRFPGovLOS(Long hotelrfpid, long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        List<LengthOfStay> lengthOfStayList;
        boolean generalReadOnly = getGeneralReadOnly();
        try {
           HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            lengthOfStayList = hotelRFPGeneralRatesService.getHotelGovLOS(hotelrfpid);
            long maxLOS = getConstantsService().getMaxLOS();
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            if (hotelDetailData.getIsInternational())
                generalReadOnly = true;
            Map<String, Object> info = new HashMap<>();
            info.put("lengthOfStayList", lengthOfStayList);
            info.put("maxLOS", maxLOS);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly", generalReadOnly);
            info.put("currentItem", currentItem);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelRFPGovLOS", method = RequestMethod.POST)
    public String updateHotelRFPGovLOS(String strLengthOfStayList, Long hotelrfpid, String formChg) throws Exception {
        try {
            List<LengthOfStay> lengthOfStayList = fromJson(strLengthOfStayList, List.class);
            hotelRFPGeneralRatesService.updateHotelGovLOS(formChg, hotelrfpid, lengthOfStayList, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
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
