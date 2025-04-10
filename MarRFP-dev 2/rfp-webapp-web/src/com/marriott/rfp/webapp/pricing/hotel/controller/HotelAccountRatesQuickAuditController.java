package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditCancelInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRuleData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelquickaudit")
public class HotelAccountRatesQuickAuditController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelAccountRatesQuickAuditController.class);
    @Autowired
    private HotelService hotelService = null;

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;


    public HotelAccountRatesQuickAuditController() {
        super();
    }

    @Autowired
    public HotelAccountRatesQuickAuditController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService, ConstantsService constantsService,
                                                 HotelService hotelService, HotelRFPService hotelRFPService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getQuickAudit", method = RequestMethod.GET)
    public String getQuickAudit(String marshaCode, Long hotel_accountinfoid) throws Exception {
        try {
            HotelDetailData hotelDetailData = hotelService.findPropertyDetail(marshaCode);
            QuickAuditData quickAuditData = hotelRFPAccountSpecificService.getQuickAuditRates(hotel_accountinfoid, hotelDetailData.getAffiliationid());
            Map<String, Object> info = new HashMap<>();
            info.put("hotelDetailData", hotelDetailData);
            info.put("quickAuditData", quickAuditData);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/viewrules", method = RequestMethod.GET)
    public String viewrules(String marshaCode, Long hotel_accountinfoid) throws Exception {
        try {
            HotelDetailData hotelDetailData = hotelService.findPropertyDetail(marshaCode);
            QuickAuditRuleData quickAuditRuleData = hotelRFPAccountSpecificService.getQuickAuditRules(hotel_accountinfoid, hotelDetailData.getAffiliationid());
            Map<String, Object> info = new HashMap<>();
            info.put("hotelDetailData", hotelDetailData);
            info.put("rules", quickAuditRuleData);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/viewcancel", method = RequestMethod.GET)
    public String viewcancel(String marshaCode, Long hotel_accountinfoid) throws Exception {
        try {
            HotelDetailData hotelDetailData = hotelService.findPropertyDetail(marshaCode);
            List<QuickAuditCancelInfo> quickAuditCancelList = hotelRFPAccountSpecificService.getQuickAuditCancelInfo(hotel_accountinfoid);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelDetailData", hotelDetailData);
            info.put("cancelList", quickAuditCancelList);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}
