package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;
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
@RequestMapping("/roomtypemaintenance")
public class RoomtypeMaintenanceController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(RoomtypeMaintenanceController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public RoomtypeMaintenanceController() {
        super();
    }

    @Autowired
    public RoomtypeMaintenanceController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getRoomTypes", method = GET)
    public String getRoomTypes(String orderBy) throws Exception {
        try {
            List<Roomtype> roomtypelist = pricingAdminService.getRoomtypesForMaintenance(orderBy);
            return objectMapperStream(roomtypelist);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getEditRoomtype", method = GET)
    public String getEditRoomtype(Long promo_roomtypeid) throws Exception {
        Roomtype roomtype = null;
        try {
            if (promo_roomtypeid != 0)
                roomtype = pricingAdminService.getRoomtypeForMaintenance(promo_roomtypeid);
            return objectMapperStream(roomtype);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteRoomtype", method = POST)
    public String deleteRoomtype(Long promo_roomtypeid) throws Exception {
        try {
            pricingAdminService.deleteRoomtype(promo_roomtypeid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateRoomtype", method = POST)
    public String updateRoomtype(String strRoomtype) throws Exception {
        try {
            Roomtype roomtype = fromJson(strRoomtype, Roomtype.class);
            pricingAdminService.updateRoomtype(roomtype);
            return SUCCESS;
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
