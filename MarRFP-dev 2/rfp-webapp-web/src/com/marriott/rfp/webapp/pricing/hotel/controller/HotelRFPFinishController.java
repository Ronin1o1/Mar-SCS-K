package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPFinishView;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.webapp.pricing.admin.controller.AccountQuestionsMaintController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelfinish")
public class HotelRFPFinishController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPFinishController.class);
    private static final String CURRENTITEM="hotelfinish";

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;


    public HotelRFPFinishController() {
        super();
    }

    @Autowired
    public HotelRFPFinishController(HotelMenuService hotelMenuService, HotelRFPGeneralService hotelRFPGeneralService, ConstantsService constantsService,
                                    HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    @RequestMapping(value = "/getHotelRFPFinish", method = {RequestMethod.GET, RequestMethod.POST})
    public String getHotelRFPFinish(Long pricingperiodid, Long hotelrfpid, Long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);
            if (pricingperiodid == null) {
                pricingperiodid = -1L;
            }
            HotelRFPFinishView hotelRFPFinishView = hotelRFPGeneralService.getFinishData(hotelrfpid, period, pricingperiodid, getUserProperties());
            if (pricingperiodid == -1)
                pricingperiodid = hotelRFPFinishView.getSelectedpricingperiodid();
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelRFPFinishView", hotelRFPFinishView);
            info.put("pricingperiodid", pricingperiodid);
            info.put("menu", hotelPricingMenu);
            info.put("hotelData", hotelDetailData);
            info.put("currency", currencyused);
            info.put("GeneralReadOnly",getGeneralReadOnly() );
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateFinish", method = RequestMethod.POST)
    public String updateFinish() {
        return RFPConstants.SUCCESS;
    }

}

