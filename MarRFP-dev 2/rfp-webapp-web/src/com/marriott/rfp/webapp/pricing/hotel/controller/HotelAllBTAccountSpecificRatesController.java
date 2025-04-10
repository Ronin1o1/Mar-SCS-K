package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificDataUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountSpecific;
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

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/hotelaccountspecallbtrates")
public class HotelAllBTAccountSpecificRatesController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelAllBTAccountSpecificRatesController.class);
    private static final String CURRENTITEM="hotelallbtaccountspecrates";

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;


    public HotelAllBTAccountSpecificRatesController() {
        super();
    }

    @Autowired
    public HotelAllBTAccountSpecificRatesController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                    ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        Long numIncrement = 5L;
    }

    @RequestMapping(value = "/getHotelAllBTAccountSpecificRates", method = GET)
    public String getHotelAllBTAccountSpecificRates(Long hotelrfpid, Long startnum, Long period, String marshaCode,Long numIncrement,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            String contactemail = constantsService.getPASEmail();
            String contactname = constantsService.getContactName();
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);

            if (startnum == null)
                startnum = 1L;
            if(  numIncrement == null)
            {
                 numIncrement = 5L;
            }
            PricingMenuData hotelPricingMenu =setMenuAndHotelData(hotelrfpid, currentItem, period);
            List<MultiHotelAccountSpecific> allHotelRates = hotelRFPAccountSpecificService.findAllHotelAccountSpecificRates(hotelrfpid,
                    startnum, hotelDetailData.getIsInternational(), hotelDetailData.getIsLOSBrand(), getUserProperties());
            Long totalnumber = hotelRFPAccountSpecificService.findNumAllAccountSpecificForHotelDetails(hotelrfpid);
            Map<String, Object> info = new HashMap<>();
            info.put("startnum", startnum);
            info.put("allHotelRates", allHotelRates);
            info.put("totalnumber", totalnumber);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("generalReadOnly", getGeneralReadOnly());
            info.put("currentItem", currentItem);
            info.put("numIncrement", numIncrement);
            info.put("contactName", contactname);
            info.put("contactemail", contactemail);
            if (allHotelRates != null) {
                for (MultiHotelAccountSpecific infoId : allHotelRates) {
                    infoId.getHotelAccountSpecific().getHotelAccountSpecificData().setAccountStatus(
                            getAccountStatusValue(infoId.getHotelAccountSpecific().getHotelAccountSpecificData().getIsAccepted(),
                                    infoId.getHotelAccountSpecific().getHotelAccountSpecificData().getIsLocked(),
                                    infoId.getHotelAccountSpecific().getHotelAccountSpecificData().getIsProgress(),
                                    infoId.getHotelAccountSpecific().getHotelAccountSpecificData().getIsSolicited()));
                }
            }
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strHasd) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificDataUpdate>>() {
            }.getType();
            Map<Long, HotelAccountSpecificDataUpdate>  hasd = fromJson(strHasd, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificRates(hasd, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }
    public String getAccountStatusValue(String isAccepted,String isLocked,String isProgress,String isSolicited) {
        String status = "";
        if (isAccepted != null && isAccepted.equals("Y"))
            status = "A";
        else if (isAccepted != null && isAccepted.equals("N"))
            status = "R";
        else if (isLocked != null && isLocked.equals("Y") && isProgress.equals("Y"))
            status = "L";
        else if (isSolicited != null && isSolicited.equals("Y"))
            status = "S";

        return status;
    }

}
