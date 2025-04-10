package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.webapp.common.controller.BaseRDHotelSelectController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthotelselect")
public class HotelRateProductSelectController extends BaseRDHotelSelectController {


    public HotelRateProductSelectController() {
        super();
    }

    public HotelRateProductSelectController(HotelService hotelService, ConstantsService constantsService) {
        super(hotelService, constantsService);
    }

    @RequestMapping(value = "/getHotelRateProductSelect", method = RequestMethod.GET)
    public String getHotelRateSelect() throws Exception {
        return super.getRDHotelSelect();
    }
}
