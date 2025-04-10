package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFODetails;
import com.marriott.rfp.object.pricing.hotelsfo.SalesMarket;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

//Upgrade-revisit class not tested as no curls and not touched after first commit
@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/hotelsfoedit")
public class HotelSFOEditController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSFOEditController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public HotelSFOEditController() {
        super();
    }

    @Autowired
    public HotelSFOEditController(PricingAdminService pricingAdminService) {
        super();
        this.pricingAdminService = pricingAdminService;
    }

    @RequestMapping(value = "/getHotelSFOEdit", method = GET)
    public String getHotelSFOEdit(Long hotelid) throws Exception {
        try {
            List<SalesMarket> salesmarket = pricingAdminService.getSalesAreaList();
            HotelSFODetails   hotelsfodetails = pricingAdminService.getHotelSFODetails(hotelid);
            Map sfoSalesMap = new HashMap<>();
            sfoSalesMap.put("salesmarket", salesmarket);
            sfoSalesMap.put("hotelfodetails", hotelsfodetails);
            return gsonStream(sfoSalesMap);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }
}
