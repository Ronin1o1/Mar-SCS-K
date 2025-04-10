package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.webapp.common.controller.BaseRDHotelSelectController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("roomtypenamehotelselect")
public class HotelRoomTypeNameSelectController extends BaseRDHotelSelectController {


    public HotelRoomTypeNameSelectController() {
        super();
    }

    public HotelRoomTypeNameSelectController(HotelService hotelService, ConstantsService constantsService) {
        super(hotelService, constantsService);
    }

    @RequestMapping(value = "/getRDHotelSelect", method = RequestMethod.GET)
    public String getRDHotelSelect() throws Exception {
        return super.getRDHotelSelect();
    }
}
