package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelSelect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController("HotelPricingSelectController")
@RequestMapping("/pricinghotelselect")
public class HotelSelectController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSelectController.class);
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private PricingCommonService pricingCommonService = null;

    public HotelSelectController() {
        super();
    }

    @Autowired
    public HotelSelectController(HotelService hotelService, ConstantsService constantsService, PricingCommonService pricingCommonService) {
        super();
        this.hotelService = hotelService;
        this.constantsService = constantsService;
        this.pricingCommonService = pricingCommonService;
    }

    @RequestMapping(value = "/getHotelSelect", method = GET)
    public HotelSelect getHotelSelect() throws Exception {
        try {
            HotelSelect hotelSelect=new HotelSelect();
            hotelSelect.setContactEmail(constantsService.getPASEmail());
            hotelSelect.setHotelList(hotelService.findAllPropertiesForPricing(getUserProperties()));
            hotelSelect.setPeriodList(pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole()));
            return hotelSelect;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    public HotelService getHotelService() {
        return hotelService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

}
