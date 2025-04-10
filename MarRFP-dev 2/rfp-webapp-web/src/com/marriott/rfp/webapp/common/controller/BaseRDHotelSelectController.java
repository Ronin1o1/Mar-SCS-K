package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.object.hotel.HotelListData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseRDHotelSelectController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseRDHotelSelectController.class);
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public BaseRDHotelSelectController() {
        super();
    }

    public BaseRDHotelSelectController(HotelService hotelService, ConstantsService constantsService) {
        super();
        this.hotelService = hotelService;
        this.constantsService = constantsService;
    }

    public String getRDHotelSelect() throws Exception {
        try {
            String contactEmail = constantsService.getPASEmail();
            List<HotelListData> hotelList = hotelService.findAllPropertiesForFmtRateLogin(getUserProperties());
            Map<String, Object> info = new HashMap<>();
            info.put("contactEmail", contactEmail);
            info.put("hotelList", hotelList);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
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



}
