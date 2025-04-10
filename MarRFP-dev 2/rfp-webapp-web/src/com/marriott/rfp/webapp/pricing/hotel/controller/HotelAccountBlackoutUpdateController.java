package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.AccountBlackoutGroup;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelaccountblackout")
public class HotelAccountBlackoutUpdateController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountBlackoutUpdateController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    public HotelAccountBlackoutUpdateController() {
        super();
    }

    @Autowired
    public HotelAccountBlackoutUpdateController(HotelMenuService hotelMenuService, HotelRFPService hotelRFPService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                ConstantsService constantsService, HotelService hotelService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.setHotelRFPAccountSpecificService(hotelRFPAccountSpecificService);
    }

    @RequestMapping(value = "/getHotelAccountBlackoutUpdate", method = RequestMethod.GET)
    public String getHotelAccountBlackoutUpdate(String marshaCode, String hotelName, String currentItem, Long hotelrfpid, Long period, Long hotel_accountinfoid, Long startnum, String searchtype) throws Exception {
        try {
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            if (StringUtils.isEmpty(searchtype)) {
                searchtype = "A";
            }
            //setMarshaCode(marshaCode);
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            List<AccountBlackoutGroup> accountBlackoutGroup = hotelRFPAccountSpecificService.getRolledupBlackouts(hotelDetailData.getHotelid(), period, searchtype, getUserProperties());
            Long numblackouts = getConstantsService().getMaxBlackouts();
            Map<String, Object> info = new HashMap<>();
            info.put("accountBlackoutGroup", accountBlackoutGroup);
            info.put("numblackouts", numblackouts);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly", getGeneralReadOnly());
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(String strAccountBlackoutGroup) throws Exception {
        try {
            Type collectionType = new TypeToken<List<AccountBlackoutGroup>>() {
            }.getType();
            List<AccountBlackoutGroup> accountBlackoutGroup = (List<AccountBlackoutGroup>) fromJson(strAccountBlackoutGroup, collectionType);
            if (accountBlackoutGroup != null && accountBlackoutGroup.size() > 0)
                hotelRFPAccountSpecificService.updateRolledupBlackouts(accountBlackoutGroup, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }
}
