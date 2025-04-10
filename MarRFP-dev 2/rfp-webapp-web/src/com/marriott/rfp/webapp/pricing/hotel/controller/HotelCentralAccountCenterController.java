package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelcentralaccountcenter")
public class HotelCentralAccountCenterController extends HotelAccountCenterController {
    private static final String CURRENTITEM="hotelcentralaccountcenter";

    public HotelCentralAccountCenterController() {
        super();
    }

    @Autowired
    public HotelCentralAccountCenterController(HotelMenuService hotelMenuService,
                                               HotelRFPService hotelRFPService,
                                               HotelRFPAccountCenterService hotelRFPAccountCenterService,
                                               ConstantsService constantsService, HotelService hotelService) {
        super(hotelMenuService, hotelRFPService, hotelRFPAccountCenterService,
                constantsService, hotelService);
     //   setCurrentItem("hotelcentralaccountcenter");
        //setPricingPage("hotelaccountspeccentralrates");
    }

    @RequestMapping(value = "/getHotelAccountCenter", method = {GET, POST})
    public String getHotelAccountCenter(String strOrderby, Long hotelrfpid, String marshaCode,String strPage, Long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        accountpricingtype=(StringUtils.isNotEmpty(accountpricingtype))?accountpricingtype:"C";
        return super.getHotelAccountCenter(strOrderby, hotelrfpid, strPage, period, accountpricingtype, marshaCode,  filterString,  displayString,  dueDateFrom,  dueDateTo,currentItem);
    }

    @RequestMapping(value = "/updateHotelAccountCenter", method = POST)
    public String updateHotelAccountCenter(String strHotelAccountCenterUpdate, String formChg) throws Exception {
        return super.updateHotelAccountCenter(strHotelAccountCenterUpdate, formChg);
    }

}
