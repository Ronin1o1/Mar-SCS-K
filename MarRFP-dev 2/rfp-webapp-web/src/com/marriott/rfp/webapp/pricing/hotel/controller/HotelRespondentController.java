package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondent;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondentEmails;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelrespondent")
public class HotelRespondentController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRespondentController.class);

    private static final String CURRENTITEM = "hotelrespondent";
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService;

    @Autowired
    private HotelRFPService hotelRFPService;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;


    public HotelRespondentController() {
        super();
    }

    @Autowired
    public HotelRespondentController(HotelMenuService hotelMenuService, HotelRFPService hotelRFPService, HotelRFPGeneralService hotelRFPGeneralService,
                                     ConstantsService constantsService, HotelService hotelService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelRespondent", method = GET)
    public String getHotelRespondent(String marshaCode, Long period,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        HotelRFPRespondent hotelRFPRespondent = null;
        List<HotelRFPRespondentEmails> hotelRFPRespondentEmails = null;
        Long hotelrfpid = hotelRFPService.getHotelRFPID(marshaCode, period, getUsername());
        try {

            PricingMenuData hotelPricingMenu = hotelMenuService.findByHotelRFPId(hotelrfpid, currentItem, getUserProperties());
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            hotelRFPRespondent = hotelRFPGeneralService.getHotelRFPRespondent(hotelrfpid, getUsername());
            if (hotelRFPRespondent.getRfprespondentid() != null)
                hotelRFPRespondentEmails = hotelRFPGeneralService.getHotelRFPRespondentEmails(hotelRFPRespondent.getRfprespondentid());
            long max_emails = getConstantsService().getMaxEmail();
            String contactname = constantsService.getContactName();
            String currencyused = hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            int currentYear = Calendar.getInstance().get(Calendar.YEAR);
            if (("Y").equals(constantsService.getBlockPricingScreens()) && period >= currentYear + 1) {
                hotelPricingMenu.setBlockPricingScreens(true);
                if (currentItem.equals("hotelstandards")) {
                    hotelPricingMenu.setNextScreen(null);
                }
            }
            Map<String, Object> info = new HashMap<>();
            info.put("hotelRFPRespondent", hotelRFPRespondent);
            info.put("hotelRFPRespondentEmails", hotelRFPRespondentEmails);
            info.put("max_emails", max_emails);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("Contact", contactname);
            info.put("hotelrfpid", hotelrfpid);
            info.put("currentItem", currentItem);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelRespondent", method = POST)
    public String updateHotelRespondent(String strHotelRFPRespondent, String strRespondentEmails, Long hotelrfpid) throws Exception {
        HotelRFPRespondent hotelRFPRespondent = null;
        Map<String, HotelRFPRespondentEmails> respondentEmails = null;
        try {
            hotelRFPRespondent = fromJson(strHotelRFPRespondent, HotelRFPRespondent.class);
            Type collectionType = new TypeToken<Map<String, HotelRFPRespondentEmails>>() {
            }.getType();
            respondentEmails = (Map<String, HotelRFPRespondentEmails>) fromJson(strRespondentEmails, collectionType);
            hotelRFPGeneralService.updateRFPRespondent(hotelrfpid, hotelRFPRespondent, respondentEmails, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    //upgrade-revisit:no curl found,not tested
    @RequestMapping(value = "/updateBTflag", method = POST)
    public String updateBTflag(String marshaCode, Long period) throws Exception {
        Long hotelrfpid = hotelRFPService.getHotelRFPID(marshaCode, period, getUsername());
        try {
            hotelRFPGeneralService.updateBTflag(hotelrfpid, "Y", getUserProperties());
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