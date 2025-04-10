package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelaccountspeccentralrates")
public class HotelAccountSpecificCentralRatesController extends HotelAccountSpecificRatesController {
    private static final String CURRENTITEM="hotelaccountspeccentralrates";
    public HotelAccountSpecificCentralRatesController() {
        super();
        String currentItem="hotelaccountspeccentralrates";
        String returnaction="/hotelcentralaccountcenter/view.action";
        String returnbutton="btnReturnAccountCenter.gif";

    }

    @Autowired
    public HotelAccountSpecificCentralRatesController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                                      ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, hotelRFPAccountSpecificService, constantsService, hotelService, hotelRFPService);
        String currentItem="hotelaccountspeccentralrates";
        String returnaction="/hotelcentralaccountcenter/view.action";
        String returnbutton="btnReturnAccountCenter.gif";
    }

    @RequestMapping(value = "/getAccSpecRates", method = GET)
    public String getAccSpecRates(Long hotelrfpid, Long hotel_accountinfoid,Long period,String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        return super.getAccSpecRates(hotelrfpid, hotel_accountinfoid,period,marshaCode, currentItem);
    }
    @RequestMapping(value = "/updatePublish", method = POST)
    public String updateandpub(Long hotel_accountinfoid,String strHassu) throws Exception {
        HotelAccountSpecificStatusUpdate hassu=fromJson(strHassu,HotelAccountSpecificStatusUpdate.class);
        return super.updateandpub(hotel_accountinfoid,hassu);

    }
    @RequestMapping(value = "/update", method = POST)
    public String update(String strHassu,Long hotel_accountinfoid) throws Exception {
        return super.update(strHassu,hotel_accountinfoid);

    }
}
