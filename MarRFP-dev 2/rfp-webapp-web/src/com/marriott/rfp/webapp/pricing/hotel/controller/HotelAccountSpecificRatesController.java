package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
public class HotelAccountSpecificRatesController extends BaseHotelBTPricingController {
    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificRatesController.class);

    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private HotelMenuService hotelMenuService = null;

    public HotelAccountSpecificRatesController() {
        super();
        //setCurrentItem("hotelaccountspecrates");
    }

    @Autowired
    public HotelAccountSpecificRatesController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService, ConstantsService constantsService,
                                               HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
        //setCurrentItem("hotelaccountspecrates");
    }

    /*execute renamed to getAccSpecRates */
    public String getAccSpecRates(Long hotelrfpid, Long hotel_accountinfoid,Long period,String marshaCode, String currentItem) throws Exception {
        try {
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            String screenStatus  = getHotelMenuService().getScreenStatus(hotelrfpid, currentItem, hotel_accountinfoid);
            HotelAccountSpecificData hotelAccountSpecificData = hotelRFPAccountSpecificService.findTabHotelAccountSpecific(hotel_accountinfoid, getUserProperties());
            HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
            hotelAccountSpecific.setHotelAccountSpecificData(hotelAccountSpecificData);
            String top_account = hotelRFPAccountSpecificService.getIsTopAccount(hotel_accountinfoid);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelData", hotelService.findPropertyDetail(marshaCode));
            info.put("menu",hotelPricingMenu);
            info.put("currency", hotelRFPService.getCurrencyUsedInQuote(hotelrfpid));
            info.put("GeneralReadOnly", getGeneralReadOnly());
            info.put("screenStatus", screenStatus);
            info.put("hotelAccountSpecific", hotelAccountSpecific);
            info.put("top_account", top_account);
            return gsonStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    //upgrade-revisit:no curl,not tested
    public String display( Long hotel_accountinfoid) throws Exception {
        try {
            //INC000002650685_ Switch between pricing years
            HotelAccountSpecificData hotelAccountSpecificData = hotelRFPAccountSpecificService.findTabHotelAccountSpecific(hotel_accountinfoid, getUserProperties());
            log.info("Display-Method-Start");
            List<FinalPrintReportData> finalPrintReportData=hotelRFPAccountSpecificService.findFinalPrintReportPeriods(hotelAccountSpecificData.getHotelid(), hotelAccountSpecificData.getAccountid(), getUserProperties().getRole());
            //INC000002650685_ Switch between pricing years
            log.info("Display-Method-End");
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    //upgrade-revisit:no curl,not tested
    public String update(String strhassu, Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecificStatusUpdate  hassu = fromJson(strhassu, HotelAccountSpecificStatusUpdate.class);
            if (hassu != null) {
                hotelRFPAccountSpecificService.updateAccountSpecific(hotel_accountinfoid, hassu, getUserProperties(), false);
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    public String updateandpub(Long hotel_accountinfoid,HotelAccountSpecificStatusUpdate hassu) throws Exception {
        try {
            if (hassu != null) {
                HotelAccountSpecificData hotelAccountSpecificData = hotelRFPAccountSpecificService.findTabHotelAccountSpecific(hotel_accountinfoid, getUserProperties());
                if(hassu.getTabrebid_status()==null){
                    hassu.setTabrebid_status(hotelAccountSpecificData.getTabrebid_status());
                }
                if(hassu.getTabstatus_status()==null){
                    hassu.setTabstatus_status(hotelAccountSpecificData.getTabstatus_status());
                }
                if(hassu.getTabrates_status()==null){
                    hassu.setTabrates_status(hotelAccountSpecificData.getTabrates_status());
                }
                if(hassu.getTabelig_status()==null){
                    hassu.setTabelig_status(hotelAccountSpecificData.getTabelig_status());
                }
                if(hassu.getTabcompel_status()==null){
                    hassu.setTabcompel_status(hotelAccountSpecificData.getTabcompel_status());
                }
                if(hassu.getTabgroup_status()==null){
                    hassu.setTabgroup_status(hotelAccountSpecificData.getTabgroup_status());
                }
                if(hassu.getTabblackout_status()==null){
                    hassu.setTabblackout_status(hotelAccountSpecificData.getTabblackout_status());
                }
                if(hassu.getTabfacility_status()==null){
                    hassu.setTabfacility_status(hotelAccountSpecificData.getTabfacility_status());
                }
                if(hassu.getTabquest_status()==null){
                    hassu.setTabquest_status(hotelAccountSpecificData.getTabquest_status());
                }
                if(hassu.getTabgengroup_status()==null){
                    hassu.setTabgengroup_status(hotelAccountSpecificData.getTabgengroup_status());
                }
                if(hassu.getTabspecificquest_status()==null){
                    hassu.setTabspecificquest_status(hotelAccountSpecificData.getTabspecificquest_status());
                }
                hotelRFPAccountSpecificService.updateAccountSpecific(hotel_accountinfoid, hassu, getUserProperties(), true);
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }

}

