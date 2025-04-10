package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelJson;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM"})
@RestController("HotelCommonSelectController")
@RequestMapping(value = "/pricinghotellist")
public class HotelSelectController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSelectController.class);
    @Autowired
    private HotelService hotelService = null;

    public HotelSelectController() {
        super();
    }

    public HotelSelectController(HotelService hotelService) {
        super();
        this.hotelService = hotelService;
    }

    @RequestMapping(value = "/findHotels")
    public String findHotels(String name) throws Exception {
        Long count = null;
        Long start = null;
        List<HotelJson> jsonResponse = new ArrayList<HotelJson>();
        try {
            String range = getRequest().getHeader("Range");
            if (range != null) {
                String[] parts = range.split("-");
                start = Long.parseLong(parts[0].replaceAll("items=", ""));
                count = Long.parseLong(parts[1]) - start + 1;
            }
            if (count != null && start != null && name != null) {
                jsonResponse = hotelService.findAllPropertiesForPricing(getUserProperties(), count, start, name);
                // set the content range with a very high "total results" to ensure that client allows more results
                // to be requested
                getResponse().addHeader("Content-Range", start + "-" + (start + jsonResponse.size() - 1) + "/100000");
            }
            return gsonStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelService getHotelService() {
        return hotelService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }
}
