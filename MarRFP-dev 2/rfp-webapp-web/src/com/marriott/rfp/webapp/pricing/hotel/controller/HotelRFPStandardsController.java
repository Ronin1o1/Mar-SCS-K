package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;
import com.marriott.rfp.object.pricing.hotel.HotelRoomPool;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandards;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.apache.commons.lang.StringUtils;
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
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelstandards")
public class HotelRFPStandardsController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPStandardsController.class);
    private static final String CURRENTITEM="hotelstandards";

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public HotelRFPStandardsController() {
        super();
    }
    @Autowired
    private ConstantsService constantsService = null;

    @Autowired
    public HotelRFPStandardsController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService, ConstantsService constantsService, HotelService hotelService,
                                       HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelRFPStandard", method = GET)
    public String getHotelRFPStandard(Long hotelrfpid, Long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        String softLaunchEnabled="N";
        try {
            String contactemail = constantsService.getPASEmail();
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String disableSecondaryRoomPool=null;
            HotelRFPStandards hotelRFPStandards = hotelRFPGeneralService.getHotelRFPStandards(marshaCode, hotelrfpid, getUserProperties());
            List<Bedtype> bedtypeList = hotelRFPGeneralService.getBedtypeList();
            List<Roomtype> roomtypeList = hotelRFPGeneralService.getRoomtypeList();
            String currency = null;
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);


            if (hotelRFPStandards != null) {
                currency = hotelRFPStandards.getCurrencycode();
                 softLaunchEnabled = "N";
                if (period > 2020) {
                    softLaunchEnabled = getConstantsService().getSoftLaunchEnabled();
                }
              //  setSoftLaunchEnabled(softLaunchEnabled);
                if (period < 2021)
                    disableSecondaryRoomPool = "Y";
                else
                    disableSecondaryRoomPool = "N";
            }
            List<CurrencyData> currencyList = hotelRFPGeneralService.findCurrencyList(currency);
            //setContactname(getConstantsService().getContactName());
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);

            List<HotelRoomPool>  hotelroompoolList = hotelRFPGeneralService.findAllRoomPoolsForHotel(hotelrfpid, getUserProperties(), softLaunchEnabled);

            Map<String, Object> info = new HashMap<>();
            info.put("hotelRFPStandards", hotelRFPStandards);
            info.put("bedtypeList", bedtypeList);
            info.put("roomtypeList", roomtypeList);
            info.put("currencyList", currencyList);
            info.put("hotelroompoolList", hotelroompoolList);
            info.put("currentItem", currentItem);
            info.put("contactName", contactname);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("softLaunchEnabled",softLaunchEnabled);
            info.put("contactemail",contactemail);
            info.put("disableSecondaryRoomPool",disableSecondaryRoomPool);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelStandards", method = POST)
    public String updateHotelStandards(String strHotelRFPStandards, String formChg, Long hotelrfpid, Long period) throws Exception {
        try {
            HotelRFPStandards   hotelRFPStandards = fromJson(strHotelRFPStandards, HotelRFPStandards.class);
            hotelRFPGeneralService.updateHotelRFPStandards(hotelrfpid, hotelRFPStandards, formChg, getUserProperties(), period);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

}
