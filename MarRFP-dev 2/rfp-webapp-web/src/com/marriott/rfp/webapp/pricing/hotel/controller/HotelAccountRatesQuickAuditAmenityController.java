package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelquickauditamenities")
public class HotelAccountRatesQuickAuditAmenityController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelAccountRatesQuickAuditAmenityController.class);
    @Autowired
    private HotelService hotelService = null;

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountRatesQuickAuditAmenityController() {
        super();
    }

    @Autowired
    public HotelAccountRatesQuickAuditAmenityController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService, ConstantsService constantsService,
                                                        HotelService hotelService, HotelRFPService hotelRFPService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getHotelAccountRatesQuickAuditAmenity", method = RequestMethod.GET)
    public String getHotelAccountRatesQuickAuditAmenity(Long hotel_accountinfoid, String marshaCode) throws Exception {
        try {
            HotelDetailData hotelDetailData=hotelService.findPropertyDetail(marshaCode);
            QuickAuditAmenData quickAuditAmenData=hotelRFPAccountSpecificService.getQuickAuditAmenities(hotel_accountinfoid, hotelDetailData.getIsInternational(), hotelDetailData.getBreakinrates(), getUserProperties());
            return objectMapperStream(quickAuditAmenData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }


}
