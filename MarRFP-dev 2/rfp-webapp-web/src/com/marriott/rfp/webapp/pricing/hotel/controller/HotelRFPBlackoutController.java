package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDates;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
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
@RequestMapping("/hotelblackout")
public class HotelRFPBlackoutController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPBlackoutController.class);
    private static final String CURRENTITEM="hotelblackout";

    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;


    public HotelRFPBlackoutController() {
        super();
    }

    @Autowired
    public HotelRFPBlackoutController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService,
                                      ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;

    }

    @RequestMapping(value = "/getHotelRFPBlackout", method = GET)
    public String getHotelRFPBlackout(Long hotelrfpid, Long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        HotelBlackoutDates hotelBlackoutDates = null;
        try {
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            hotelBlackoutDates = hotelRFPGeneralService.getGeneralBlackoutDates(hotelrfpid);
            List hotelBlackoutDate = hotelBlackoutDates.getHotelBlackoutDate();
            List<HotelBlackoutDate> hotelBlackoutDatesList = hotelBlackoutDate;
            Long TotalNumBlackoutDays = hotelBlackoutDates.getTotalNumBlackoutDays();
            long totalNumBlackoutDays = TotalNumBlackoutDays;
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu = setMenuAndHotelData(hotelrfpid, currentItem, period);
            long max_blackouts = constantsService.getMaxBlackouts();
            Map<String, Object> info = new HashMap<>();
            info.put("BlackoutDates", hotelBlackoutDates);
            info.put("HotelBlackoutDatesList", hotelBlackoutDatesList);
            info.put("BlackoutDate", hotelBlackoutDate);
            info.put("TotalNumBlackoutDays", TotalNumBlackoutDays);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("ContactName", contactname);
            info.put("currentItem", currentItem);
            info.put("max_blackouts",max_blackouts);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
           return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelBlackout", method = POST)
    public String updateHotelBlackout(String strHotelBlackoutDatesList, String formChg, Long hotelrfpid) throws Exception {
        List<HotelBlackoutDate> hotelBlackoutDatesList = null;
        HotelBlackoutDates hotelBlackoutDates = null;
        try {
            Type collectionType = new TypeToken<List<HotelBlackoutDate>>() {
            }.getType();
            hotelBlackoutDatesList = fromJson(strHotelBlackoutDatesList, collectionType);
            for (int i = 0; i < hotelBlackoutDatesList.size(); i++) {
                HotelBlackoutDate srt = (HotelBlackoutDate) hotelBlackoutDatesList.get(i);
                if (srt.getStartdate() != null) {
                    srt.setStartdate(srt.getStartdate());
                }
                if (srt.getEnddate() != null) {
                    srt.setEnddate(srt.getEnddate());
                }

            }
            hotelRFPGeneralService.updateBlackoutDates(formChg, hotelrfpid, hotelBlackoutDatesList, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;


        }
    }

    public HotelRFPService getHotelRFPService() {
        return hotelRFPService;
    }

    public void setHotelRFPService(HotelRFPService hotelRFPService) {
        this.hotelRFPService = hotelRFPService;
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }


}
