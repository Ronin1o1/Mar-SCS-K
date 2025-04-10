
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
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricing;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingChange;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTCommEdit;
import com.marriott.rfp.webapp.pricing.hotel.controller.BaseHotelBTPricingController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptcomm")
public class HotelSCPTCommController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTCommController.class);
    private static final String CURRENTITEM="hotelscptcomm";

    @Autowired
    private HotelRFPGeneralService hotelRFPGeneralService = null;
    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;
    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelService hotelService = null;


    public HotelSCPTCommController() {
        super();
    }

    @Autowired
    public HotelSCPTCommController(HotelMenuService hotelMenuService, SCPTService scptService, HotelRFPGeneralService hotelRFPGeneralService, ConstantsService constantsService, HotelService hotelService,
                                   HotelRFPService hotelRFPService, HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralService = hotelRFPGeneralService;
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
        this.setScptService(scptService);
        Page  commpage = new Page();
    }


    @RequestMapping(value = "/getHotelSCPTCommData", method = GET)
    public String getHotelSCPTCommData(Long hotelrfpid, Long period, String commfilterString, String commgroupid, Long commorderby, String marshaCode, Long page,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {

        Page commpage=new Page();
        HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
        try {
            if(commorderby==null){
                commorderby = 3L;
            }
            SCPTAcctPricing  scptAcctPricing = new SCPTAcctPricing();
            String contactname = constantsService.getContactName();
            PricingMenuData hotelPricingMenu = setMenuAndHotelData(hotelrfpid, currentItem, period);
            //Long  reccount = scptService.findSCPTNonGroupAccount(getHotelDetailData().getHotelid(), period);
            Long  reccount = scptService.findSCPTNonGroupAccount(hotelDetailData.getHotelid(), period);

            if (!reccount.equals(0L)) {
                scptService.updateSCPTGroupAccount(hotelDetailData.getHotelid(), period);
                //scptService.updateSCPTAcctPricingDtl(getHotelDetailData().getHotelid(), period, 0L);
                scptService.updateSCPTAcctPricingDtl(hotelDetailData.getHotelid(), period, 0L);
            }
            reccount = scptService.findTotalAcctPricingDtl(hotelDetailData.getHotelid(), period);
            if (!reccount.equals(0L)) {
                scptService.updateSCPTAcctPricingDtl(hotelDetailData.getHotelid(), period, 0L);
            }
            if (commorderby.equals(0))
                commorderby = 0L;
            commpage.setMaxpagelen(40);
            commpage.setPage(page);
            Long commtotalPages = scptService.findTotalComm(hotelDetailData.getHotelid(), period, commpage.getMaxpagelen(), commfilterString, commgroupid);
            if (commtotalPages == 0) {
                commpage.setPage(0);
            }
            scptAcctPricing.setCommtotalPages(commtotalPages);
            scptAcctPricing.setCommpage(commpage);
            scptAcctPricing.setComrates(scptService.findSCPTAcctPricingDetail(hotelDetailData.getHotelid(), period, commfilterString, commorderby, commgroupid, commpage));

            return objectMapperStream(scptAcctPricing);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;

        }

    }


    @RequestMapping(value = "/findAcctPricingTotal", method = GET)
    public String findAcctPricingTotal(Long hotelrfpid, Long period, String commgroupid, String currentItem, String marshaCode) throws Exception {
        try {
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            return objectMapperStream(scptService.findSCPTAcctPricingTotal(hotelDetailData.getHotelid(), period, commgroupid));
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/updatePrevYrSCPTComm", method = GET)
    public String updatePrevYrSCPTComm(Long hotelrfpid, Long period, String refreshRates, String currentItem, String marshaCode) throws Exception {
        try {
            if(StringUtils.isEmpty(refreshRates)){
                refreshRates = "N";
            }
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            if (refreshRates != null && !refreshRates.equals("undefined")) {
                if (refreshRates.equals("P")) {
                    scptService.updateSCPTPopulatePreviousYear(hotelDetailData.getHotelid(), period);
                    scptService.updateSCPTPreviousYearGPPRates(hotelDetailData.getHotelid(), period);
                }
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/updateSCPTComm", method = POST)
    public String updateSCPTComm(Long hotelrfpid, String strCommData, Long period, String currentItem, String marshaCode,String isLocked,String checkUpdateSCPT) throws Exception {
        try {
            if(StringUtils.isEmpty(isLocked)){
                isLocked="Y";
            }
            if(StringUtils.isEmpty(checkUpdateSCPT)) {
                checkUpdateSCPT = "U";
            }
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            SCPTAcctPricing scptAcctPricing = fromJson(strCommData, SCPTAcctPricing.class);
            if (scptAcctPricing.getCommformChg().equals("Y")) {
                scptService.updateSCPTAcctPricingChg(hotelDetailData.getHotelid(), scptAcctPricing.getComacctpricingchg(),
                        period, getUsername(), isLocked, checkUpdateSCPT, getUserProperties());
            }

            strCommData = RFPConstants.SUCCESS;
            return strCommData;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public HotelRFPGeneralService getHotelRFPGeneralService() {
        return hotelRFPGeneralService;
    }

    public void setHotelRFPGeneralService(HotelRFPGeneralService hotelRFPGeneralService) {
        this.hotelRFPGeneralService = hotelRFPGeneralService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }

    public void setHotelRFPGeneralRatesService(HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }


    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }

}

