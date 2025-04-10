package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctHistSummary;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctHistory;
import com.marriott.rfp.object.pricing.scpt.SCPTDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTHotel;
import com.marriott.rfp.webapp.pricing.hotel.controller.BaseHotelBTPricingController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptaccthistory")
public class HotelSCPTAcctHistoryController extends BaseHotelBTPricingController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTAcctHistoryController.class);
    private static final String CURRENTITEM="hotelscptaccthistory";

    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private HotelService hotelService = null;

    public HotelSCPTAcctHistoryController() {
        super();
      ///  setCurrentItem("hotelscptaccthistory");
    }

    @Autowired
    public HotelSCPTAcctHistoryController(HotelMenuService hotelMenuService, SCPTService scptService, ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
        super(hotelMenuService, constantsService, hotelService, hotelRFPService);
        this.setScptService(scptService);
       // setCurrentItem("hotelscptaccthistory");
        //detailpage = new Page();

    }


    @RequestMapping(value = "/getHotelSCPTAccHistory", method = GET)
    public String getHotelSCPTAccHistory(Long detailorderby, Long period, String detailfilterString, String detailshowGPP, Long hotelrfpid, Long scptaccountid, Long page, String marshaCode,@RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
        SCPTAcctHistory accthistory=null;
        Page detailpage=new Page();
        Long detailtotalPages=null;

        try {
            ObjectMapper mapper = new ObjectMapper();
            accthistory = new SCPTAcctHistory();
            detailorderby =(detailorderby==null)?3L:detailorderby;
            detailshowGPP =(detailshowGPP==null)?"N":detailshowGPP;
            PricingMenuData hotelPricingMenu= setMenuAndHotelData(hotelrfpid, currentItem, period);
            if (detailorderby.equals(0))
                detailorderby = 1L;
            detailpage.setMaxpagelen(40);
            detailpage.setPage(page);
            detailtotalPages = scptService.findTotalDetail(hotelService.findPropertyDetail(marshaCode).getHotelid(), period, detailfilterString, detailshowGPP);
            if (detailtotalPages == 0) {
                detailpage.setPage(0);
            }

            accthistory.setDetailpage(detailpage);
            accthistory.setTotalpages(detailtotalPages);
            accthistory.setScptdetail(scptService.findSCPTDetail(hotelService.findPropertyDetail(marshaCode).getHotelid(), period, detailorderby, detailfilterString, detailshowGPP, detailpage, scptaccountid));
            mapper.addMixInAnnotations(SCPTDetail.class, SCPTAcctHistSummary.class);
            //strAcctHistory = mapper.writeValueAsString(accthistory);
            //return gsonStream(new ByteArrayInputStream(strAcctHistory.getBytes()));
            return objectMapperStream(accthistory);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }
    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }


}
