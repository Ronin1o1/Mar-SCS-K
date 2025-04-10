package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSAuditListData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelpgoosaudittrail")
public class HotelPGOOSAuditController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelPGOOSAuditController.class);
    @Autowired
    private PricingAdminService pricingAdminService;

    public HotelPGOOSAuditController() {
        super();

    }

    public HotelPGOOSAuditController(PricingAdminService pricingAdminService) {
        setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getPGOOSAuditTrailDetail", method = GET)
    public String getPGOOSAuditTrailDetail(String marshaCode, Long period) throws Exception {
        try {
            List<HotelPGOOSAuditListData> hotelPGOOSAuditListData = pricingAdminService.findPGOOSAuditTrailDetail(marshaCode, period);
            return objectMapperStream(hotelPGOOSAuditListData);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }


}
