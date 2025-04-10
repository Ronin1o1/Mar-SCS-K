package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.pricing.scpt.SCPTHotel;
import com.marriott.rfp.object.pricing.scpt.SCPTSetupData;
import com.marriott.rfp.object.pricing.scpt.SCPTSetupStatus;
import com.marriott.rfp.webapp.pricing.hotel.controller.BaseHotelBTPricingController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptsetup")
public class HotelSCPTSetUpController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTSetUpController.class);
    private static final String CURRENTITEM="hotelscptsetup";
    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private HotelRFPService hotelRFPService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelService hotelService = null;

    public HotelSCPTSetUpController() {
        super();
    }

    @Autowired
    public HotelSCPTSetUpController(HotelMenuService hotelMenuService, SCPTService scptService, HotelRFPGeneralService hotelRFPGeneralService,
                                    ConstantsService constantsService, HotelService hotelService,
                                    HotelRFPService hotelRFPService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.setHotelRFPGeneralService(hotelRFPGeneralService);
        this.setHotelRFPGeneralRatesService(hotelRFPGeneralRatesService);
        this.setScptService(scptService);
        this.setHotelRFPService(hotelRFPService);
    }


    @RequestMapping(value = "/getHotelSCPTSetup", method = GET)
    public String getHotelSCPTSetup(Long hotelrfpid, Long period, String updateSCPTPricing, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {

            SCPTSetupData scptSetupData = new SCPTSetupData();
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));


            scptService.createScptSetupIfHotelNotPresent(hotelDetailData.getHotelid(), period);
            List<Season> seasonList=getHotelRFPGeneralRatesService().getHotelSeasonWithDefault(hotelrfpid, period);


            scptSetupData.setSeasonList(getHotelRFPGeneralRatesService().getHotelSeasonWithDefault(hotelrfpid, period));
            scptSetupData.setBrandName(scptService.getBrandname(hotelDetailData.getAffiliationid()));
            scptSetupData.setScptSetUpGenInfo(scptService.getSCPTSetUpGenInfo(hotelDetailData.getHotelid(), period, hotelDetailData.getIsbrandextendedstay()));
            scptSetupData.setScptSetUpRetailRate(scptService.getSCPTSetUpRetailRate(hotelDetailData.getHotelid(), period, seasonList));
            scptSetupData.setScptSetUpWtdRetailRate(scptService.getSCPTSetUpWtdRetailRate(hotelDetailData.getHotelid(), period));
            scptSetupData.setScptSetUpAmenities(scptService.getSCPTSetUpAmenities(hotelDetailData.getHotelid(), period));
            scptSetupData.setScptSetUpThresholds(scptService.getSCPTSetUpThresholds(hotelDetailData.getHotelid(), period));
            scptSetupData.setScptSetUpBudgetAndForecastData(scptService.getSCPTSetUpBudgetAndForecastData(hotelDetailData.getHotelid(), period));
            scptSetupData.setUpdateSCPTPricing(updateSCPTPricing);
            scptSetupData.setIsLocked(scptService.getIsLocked(hotelDetailData.getHotelid(), period));
            scptSetupData.setLastUpdatedUser(scptService.getLastUpdatedUser(hotelDetailData.getHotelid(), period));
            scptSetupData.setSetuptab_last_updated(scptService.fetchSetupTabLastUpdated(hotelDetailData.getHotelid(), period));
            scptSetupData.setUserRole(getUserProperties().getRole());
            scptSetupData.setIsBrandExtendedStay(hotelDetailData.getIsbrandextendedstay());


            return objectMapperStream(scptSetupData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/updateSCPTSetup", method = POST)
    public String updateSCPTSetup(Long hotelrfpid, Long period, String strScptUpdate, Long scpt_accountid, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        String donotprice = "N";
        SCPTSetupData scptSetupData = null;

        try {

            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            scptSetupData = fromJson(strScptUpdate, SCPTSetupData.class);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            scptSetupData.setCheckUpdateSCPT((scptSetupData.getCheckUpdateSCPT()==null)?"N":scptSetupData.getCheckUpdateSCPT());
            scpt_accountid=(scpt_accountid==null)?1L:scpt_accountid;
            scptSetupData.setLastUpdatedUser(getUserProperties().getEid());

            if (scptSetupData.getScptSetUpFormChg().equals("Y")) {
                if (scptSetupData.getScptSetUpGenInfoFormChg().equals("Y")) {
                    scptService.updateSCPTSetUpGenInfo(hotelDetailData.getHotelid(), period, hotelDetailData.getIsbrandextendedstay(), scptSetupData.getIsLocked(), scptSetupData.getScptSetUpGenInfo(), getUserProperties());
                }
                if (scptSetupData.getScptSetUpRetailRateFormChg().equals("Y")) {
                    scptService.updateSCPTSetupRetailRate(hotelDetailData.getHotelid(), period, scptSetupData.getScptSetUpRetailRate(), getUserProperties());
                    scptService.updateSCPTSetUpWtdRetailRate(hotelDetailData.getHotelid(), period, scptSetupData.getScptSetUpWtdRetailRate());
                }
                if (scptSetupData.getScptSetUpAmenitiesFormChg().equals("Y")) {
                    scptService.updateSCPTSetUpAmenities(hotelDetailData.getHotelid(), period, scptSetupData.getScptSetUpAmenities(), getUserProperties());
                }
                if (scptSetupData.getScptSetUpThresholdsFormChg().equals("Y")) {
                    scptService.updateSCPTSetUpThresholds(hotelDetailData.getHotelid(), period, scptSetupData.getScptSetUpThresholds(), getUserProperties());
                }
                if (scptSetupData.getScptSetUpBudgetAndForecastFormChg().equals("Y")) {
                    scptService.updateSCPTSetUpBudgetAndForecastData(hotelDetailData.getHotelid(), period, scptSetupData.getScptSetUpBudgetAndForecastData());
                }

            }
            if (scptSetupData.getUpdateSCPTPricing().equals("Y")) {
                /*scptService.updateSCPTPricing(getHotelDetailData().getHotelid(), period, getUsername(), scptSetupData.getIsLocked(), scptSetupData.getCheckUpdateSCPT(),
                        getUserProperties(), scpt_accountid, getDonotprice());*/
                scptService.updateSCPTPricing(hotelDetailData.getHotelid(), period, scptSetupData.getLastUpdatedUser(), scptSetupData.getIsLocked(), scptSetupData.getCheckUpdateSCPT(),
                        getUserProperties(), scpt_accountid,  donotprice);
            }

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
          return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/scptSetupStatus", method = GET)
    public String scptSetupStatus(Long period, Long hotelrfpid, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {


            SCPTSetupStatus scptSetupStatus= new SCPTSetupStatus();
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));

            String currencyused =hotelRFPService.getCurrencyUsedInQuote(hotelrfpid);


            SCPTHotel hoteldetail = scptService.findSCPTHotelDetail(hotelDetailData.getHotelid(), period);
            scptSetupStatus.setShowrmnights(hoteldetail.getShowrmnights());
            scptSetupStatus.setHotelid(hotelDetailData.getHotelid());
            scptSetupStatus.setScptSetupCompleted(scptService.getSCPTYoYSetup(hotelDetailData.getHotelid(), period, hotelrfpid));
            scptSetupStatus.setIsBrandExtendedStay(hotelDetailData.getIsbrandextendedstay());
            scptSetupStatus.setFranch_flag(hotelDetailData.getFranch_flag());
            scptSetupStatus.setCurrency(currencyused);
            scptSetupStatus.setMarshaCode(marshaCode);
            scptSetupStatus.setBrandName(scptService.getBrandname(hotelDetailData.getAffiliationid()));
            scptSetupStatus.setHotelName(hotelDetailData.getHotelName());
            scptSetupStatus.setPeriod(period);
            scptSetupStatus.setCurrencyCode(scptService.getCurrencyCode(hotelrfpid));
            scptSetupStatus.setCurrencyWidth(scptService.getCurrencyWidth(hotelrfpid));
            scptSetupStatus.setInternetList(scptService.findSCPTInternet());
            scptSetupStatus.setBreakfastList(scptService.findSCPTBreakfast());
            scptSetupStatus.setAccountgroupList(scptService.findSCPTAccountGroup());

            return objectMapperStream(scptSetupStatus);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    //Upgrade-revisit:no curl,not tested
    @RequestMapping(value = "/updateSCPTHotel", method = POST)
    public String updateSCPTHotel(Long hotelrfpid, Long period, String strSCPTHotelDetail, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        try {

            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            SCPTHotel hoteldetail = new SCPTHotel();
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            hoteldetail = fromJson(strSCPTHotelDetail, SCPTHotel.class);

            scptService.updateSCPTHotelDetail(hotelDetailData.getHotelid(), period, hoteldetail);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
           return RFPConstants.FATAL_ERROR;
        }
    }


    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }

    public void setHotelRFPGeneralRatesService(
            HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }

    public HotelRFPService getHotelRFPService() {
        return hotelRFPService;
    }

    public void setHotelRFPService(HotelRFPService hotelRFPService) {
        this.hotelRFPService = hotelRFPService;
    }

}
