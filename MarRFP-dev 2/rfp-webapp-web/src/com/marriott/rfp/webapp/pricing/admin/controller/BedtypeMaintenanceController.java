package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/bedtypemaintenance")
public class BedtypeMaintenanceController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BedtypeMaintenanceController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public BedtypeMaintenanceController() {
        super();
    }

    @Autowired
    public BedtypeMaintenanceController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getBedTypes", method = GET)
    public String getBedTypes(String orderBy) throws Exception {
        try {
            List<Bedtype> bedtypelist = pricingAdminService.getBedtypesForMaintenance(orderBy);
            return objectMapperStream(bedtypelist);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/getEditBedtype", method = GET)
    public String getEditBedtype(Long bedtypeid) throws Exception {
        Bedtype bedtype = null;
        try {
            if (bedtypeid != 0)
                bedtype = pricingAdminService.getBedtypeForMaintenance(bedtypeid);
            return objectMapperStream(bedtype);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteBedtype", method = POST)
    public String deleteBedtype(Long bedtypeid) throws Exception {
        try {
            pricingAdminService.deleteBedtype(bedtypeid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateBedtype", method = POST)
    public String updateBedtype(String strBedtype) throws Exception {
        Bedtype bedtype = null;
        try {
            bedtype = fromJson(strBedtype, Bedtype.class);
            pricingAdminService.updateBedtype(bedtype);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
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
