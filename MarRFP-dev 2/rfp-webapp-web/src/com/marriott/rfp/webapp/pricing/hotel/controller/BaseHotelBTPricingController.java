package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.Calendar;

@RestController
public class BaseHotelBTPricingController extends BaseController {

    @Autowired
    private HotelMenuService hotelMenuService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;

    //private Long hotelrfpid;
    //private long period;
    //INC000002650685_ Switch between pricing years
    //private Long switchHotelrfpid;
    //private Long switchPeriod;
    //INC000002650685_ Switch between pricing years
    //private String formChg;

    public BaseHotelBTPricingController() {
        super();
    }


    public BaseHotelBTPricingController(HotelMenuService hotelMenuService, ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super();
        this.hotelMenuService = hotelMenuService;
        this.hotelService = hotelService;
        this.constantsService = constantsService;
        this.hotelRFPService = hotelRFPService;
    }

    public PricingMenuData setMenuAndHotelData(Long hotelrfpid, String currentItem, long period) {
        PricingMenuData hotelPricingMenu = hotelMenuService.findByHotelRFPId(hotelrfpid, currentItem, getUserProperties());
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        if (("Y").equals(constantsService.getBlockPricingScreens()) && period >= currentYear + 1) {
            hotelPricingMenu.setBlockPricingScreens(true);
            if (currentItem.equals("hotelstandards")) {
                hotelPricingMenu.setNextScreen(null);
            }
        }
        return hotelPricingMenu;
    }

    /*public Long getHotelrfpid() {
        return hotelrfpid;
    }

    public void setHotelrfpid(Long hotelrfpid) {
        this.hotelrfpid = hotelrfpid;
    }*/

    /*public long getPeriod() {
        return period;
    }*/

    /*public void setPeriod(long period) {
        this.period = period;
    }*/

    /*public long getLastPeriod() {
        return period;
    }*/

    /*public long getNextPeriod() {
        return period + 1;
    }*/

    /*public String getShortLastPeriod() {
        return String.valueOf(getLastPeriod()).substring(2);
    }*/

    /*public String getShortNextPeriod() {
        return String.valueOf(getNextPeriod()).substring(2);
    }*/

    public void setHotelMenuService(HotelMenuService hotelMenuService) {
        this.hotelMenuService = hotelMenuService;
    }

    public HotelMenuService getHotelMenuService() {
        return hotelMenuService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }

    public boolean getGeneralReadOnly() {
        boolean generalReadOnly = false;
        if (getUserProperties().getIsReadOnly() || getUserProperties().getIsAnySalesUser()) {
            generalReadOnly = true;
        } else {
            generalReadOnly = false;
        }
        return generalReadOnly;
    }

    //INC000002650685_ Switch between pricing years

    /*public void setHotelPeriodSwitchData() {
        setHotelrfpid(getSwitchHotelrfpid());
        setPeriod(getSwitchPeriod());
    }*/
    //INC000002650685_ Switch between pricing years

    /*public void setFormChg(String formChg) {
        this.formChg = formChg;
    }

    public String getFormChg() {
        return formChg;
    }*/

    public void setHotelRFPService(HotelRFPService hotelRFPService) {
        this.hotelRFPService = hotelRFPService;
    }

    public HotelRFPService getHotelRFPService() {
        return hotelRFPService;
    }

    //INC000002650685_ Switch between pricing years
    /*public void setSwitchHotelrfpid(Long switchHotelrfpid) {
        this.switchHotelrfpid = switchHotelrfpid;
    }

    public Long getSwitchHotelrfpid() {
        return switchHotelrfpid;
    }*/

    /*public void setSwitchPeriod(Long switchPeriod) {
        this.switchPeriod = switchPeriod;
    }

    public Long getSwitchPeriod() {
        return switchPeriod;
    }*/
    //INC000002650685_ Switch between pricing years

}
