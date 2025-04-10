package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralRatesService;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.pricing.scpt.*;
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

/* this corresponds to the pricing workbench tab in scpt.  This was originally called the details tab*/
@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptdetail")
public class HotelSCPTDetailsController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTDetailsController.class);
    private static final String CURRENTITEM="hotelscptdetails";

    @Autowired
    private HotelRFPGeneralRatesService hotelRFPGeneralRatesService = null;

    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private HotelService hotelService = null;

    public HotelSCPTDetailsController() {
        super();
    }

    @Autowired
    public HotelSCPTDetailsController(HotelMenuService hotelMenuService, SCPTService scptService, ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService,
                                      HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
        this.setScptService(scptService);
    }


    @RequestMapping(value = "/getHotelSCPTDetail", method = GET)
    public String getHotelSCPTDetail(Long hotelrfpid, Long period, Long detailorderby, String detailfilterString, String detailshowGPP, Long scptaccountid, Page detailpage, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        SCPTComm scptcomm=null;
        String history_last_updated="";
        String franch_flag="";
        List<SCPTDetail> scptdetail=null;

        try {

            if(detailorderby==null){
                 detailorderby = 3L;
            }
            if(StringUtils.isEmpty(detailshowGPP)){
                 detailshowGPP = "N";
            }
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));
            //setContactname(getConstantsService().getContactName());
            String contactname = constantsService.getContactName();
            period = period == null ? 0L : period;
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid,currentItem , period);
            ObjectMapper mapper = new ObjectMapper();

             franch_flag=hotelDetailData.getFranch_flag();
             scptdetail=scptService.findSCPTDetail(hotelDetailData.getHotelid(), period, detailorderby, detailfilterString, detailshowGPP, detailpage, scptaccountid);
            if (franch_flag.equals("F")) {
                mapper.addMixInAnnotations(SCPTDetail.class, SCPTDetailFranchise.class);
            }
            scptcomm = scptService.findSCPTComm(hotelDetailData.getHotelid(), period, hotelDetailData.getIsbrandextendedstay(), scptaccountid);
            scptcomm.setScptdetail(scptdetail);
            scptcomm.setScptCommSetupInfo(scptService.fetchSetupInfo(hotelDetailData.getHotelid(), period));
            scptcomm.setShow_yoy_comp(scptService.findAnticipatedRateSet(hotelDetailData.getHotelid(), period));
            scptcomm.setYoy_retail_change(scptService.getYoYRetailChange(hotelDetailData.getHotelid(), period));
            history_last_updated = scptService.fetchHistoryLastUpdated();
            scptcomm.setSeasonList(getHotelRFPGeneralRatesService().getHotelSeasonWithDefault(hotelrfpid, period));
            return objectMapperStream(scptcomm);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/updateSCPTDetail", method = POST)
    public String updateSCPTDetail(Long hotelrfpid, String strScptcomm, Long period, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        SCPTDetailEdit scptDetailedit = null;
        SCPTHotel hoteldetail=null;
        try {
            PricingMenuData hotelPricingMenu=setMenuAndHotelData(hotelrfpid, currentItem, period);
            scptDetailedit = fromJson(strScptcomm, SCPTDetailEdit.class);
            HotelDetailData hotelDetailData = (hotelService.findPropertyDetail(marshaCode));

            if (scptDetailedit.getPrevweightednetChg().equals("Y") && scptDetailedit.getPrevweightednetChg() != null) {
                scptService.updateSCPTPrevWeightedNet(scptDetailedit.getScpt_accountid(), scptDetailedit.getPrev_weightedratenet());
            }

            if (scptDetailedit.getCommentsChg().equals("Y")) {
                scptService.updateSCPTAcctComments(scptDetailedit.getScpt_accountid(), scptDetailedit.getComments(), scptDetailedit.getCommentsChg());
            }

            if (scptDetailedit.getFullyrntsChg().equals("Y") && scptDetailedit.getFullyrntsChg() != null) {
                scptService.updateSCPTFullYrRnts(hotelDetailData.getHotelid(), period,
                        scptDetailedit.getScpt_accountid(), scptDetailedit.getPrevyear_fy_fcst(), scptDetailedit.getFy_fcst(), scptDetailedit.getChg_rn_from_ty_pct());
            }
            if (scptDetailedit.getShowrmnightsChg().equals("Y") && scptDetailedit.getShowrmnightsChg() != null) {
                scptService.updateSCPTHotelDetail(hotelDetailData.getHotelid(), period, hoteldetail);
            }
            if (scptDetailedit.getHotelcommChg().equals("Y") && scptDetailedit.getHotelcommChg() != null) {
                scptService.updateSCPTHotelComm(hotelDetailData.getHotelid(), period, scptDetailedit.getScpt_accountid(), scptDetailedit.getRateamenitiesList(), getUserProperties());
            }
            if (scptDetailedit.getRateseasonChg().equals("Y") && scptDetailedit.getRateseasonChg() != null) {
                scptService.updateSCPTHotelCommRates(hotelDetailData.getHotelid(), period, scptDetailedit.getScpt_accountid(),
                        scptDetailedit.getRateseasonList(), getUserProperties());
            }

            if (scptDetailedit.getRateseasonChg().equals("Y") || scptDetailedit.getHotelcommChg().equals("Y")
                    || scptDetailedit.getFullyrntsChg().equals("Y") || scptDetailedit.getPrevweightednetChg().equals("Y")) {
                scptService.updateSCPTAcctPricingDtl(hotelDetailData.getHotelid(), period, scptDetailedit.getScpt_accountid());
            }

            scptService.updateLastChangedDate(hotelDetailData.getHotelid(), period);

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }

    public HotelRFPGeneralRatesService getHotelRFPGeneralRatesService() {
        return hotelRFPGeneralRatesService;
    }

    public void setHotelRFPGeneralRatesService(HotelRFPGeneralRatesService hotelRFPGeneralRatesService) {
        this.hotelRFPGeneralRatesService = hotelRFPGeneralRatesService;
    }

}
