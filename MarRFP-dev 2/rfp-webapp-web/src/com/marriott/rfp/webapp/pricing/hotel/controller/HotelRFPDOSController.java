package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralDOSService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hoteldos")
public class HotelRFPDOSController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelRFPDOSController.class);
    private static final String CURRENTITEM="hoteldos";

    @Autowired
    private HotelRFPGeneralDOSService hotelRFPGeneralDOSService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;

    public HotelRFPDOSController() {
        super();
      //  setCurrentItem("hoteldos");
    }

    @Autowired
    public HotelRFPDOSController(HotelMenuService hotelMenuService, HotelRFPGeneralDOSService hotelRFPGeneralDOSService,
                                 ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralDOSService = hotelRFPGeneralDOSService;
        //setCurrentItem("hoteldos");
    }

    @RequestMapping(value = "/getHotelRFPDOS", method = GET)
    public String getHotelRFPDOS(Long hotelrfpid, Long period, String marshaCode, Integer seasonid,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        boolean enhancedDOSCompleteted=true;
        try {
            if (seasonid == null) {
                seasonid = 1;
            }
            SalesDepth salesDepth = hotelRFPGeneralDOSService.getHotelRFPDOS(hotelrfpid, seasonid);
            long maxDOS = getConstantsService().getMaxDOS();
            if (salesDepth.getSalesdepthid() != null && !(salesDepth.getIsenhanced().equals("N")))
                enhancedDOSCompleteted=hotelRFPGeneralDOSService.getHotelRFPEnhancedDOSCompletionStatus(salesDepth, seasonid);
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);

            Map<String, Object> info = new HashMap<>();
            info.put("salesDepth", salesDepth);
            info.put("enhancedDOSCompleted", enhancedDOSCompleteted);
            info.put("maxDOS", maxDOS);
            info.put("hotelPricingMenu", hotelPricingMenu);
            info.put("hotelDetailData", hotelService.findPropertyDetail(marshaCode));
            info.put("currencyused", hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            info.put("generalReadOnly", getGeneralReadOnly());
            info.put("currentItem", currentItem);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateHotelRFPDepthOfSales", method = POST)
    public String updateHotelRFPDepthOfSales(String strSalesDepth, String formChg, Long hotelrfpid, String switched) throws Exception {


        try {
                if(StringUtils.isEmpty(switched))
                {
                    switched="N";
                }
            SalesDepth salesDepth = fromJson(strSalesDepth, SalesDepth.class);
            if (formChg != null && formChg.equals("Y")) {
                salesDepth.setHotelrfpid(hotelrfpid);
                hotelRFPGeneralDOSService.updateSalesDepth(salesDepth, switched, getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setHotelRFPGeneralDOSService(HotelRFPGeneralDOSService hotelRFPGeneralDOSService) {
        this.hotelRFPGeneralDOSService = hotelRFPGeneralDOSService;
    }

    public HotelRFPGeneralDOSService getHotelRFPGeneralDOSService() {
        return hotelRFPGeneralDOSService;
    }

}


