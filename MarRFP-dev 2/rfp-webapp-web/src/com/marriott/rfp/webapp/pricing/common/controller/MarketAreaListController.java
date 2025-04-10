package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelsfo.MarketArea;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/marketarealist")
public class MarketAreaListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(MarketAreaListController.class);

    @Autowired
    private PricingAdminService pricingAdminService = null;

    public MarketAreaListController() {
        super();
    }

    @Autowired
    public MarketAreaListController(PricingAdminService pricingAdminService) {
        super();
        this.pricingAdminService = pricingAdminService;
    }

    @RequestMapping(value = "/getMarketAreaList", method = GET)
    public String getMarketAreaList(Long salesorg) throws Exception {
        try {
            List<MarketArea> marketareaList = pricingAdminService.findMarketArea(salesorg);
            return gsonStream(marketareaList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

}
