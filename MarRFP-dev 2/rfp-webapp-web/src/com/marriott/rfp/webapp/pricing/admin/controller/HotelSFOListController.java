package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFODetails;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOFilterLists;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOSearch;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

//Upgrade-revisit class not tested as no curls and not touched after first commit
@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping(value = "/hotelsfolist")
public class HotelSFOListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSFOListController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public HotelSFOListController() {
        super();
    }

    public HotelSFOListController(PricingAdminService pricingAdminService, ConstantsService constantsService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setConstantsService(constantsService);
    }

    //might need POST method; struts has a refresh call that expects sfoList
    @RequestMapping(value = "/getHotelSFOList", method = {GET, POST})
    public String getHotelSFOList(HotelSFOSearch hotelsfosearch) throws Exception {
        try {
            initialize(hotelsfosearch);
            Long totalPages = pricingAdminService.getTotalHotelSFOListPages(hotelsfosearch);
            List<HotelSFODetails> hotelsfolist=pricingAdminService.findHotelSFOList(hotelsfosearch);
            HotelSFOFilterLists hotelsfofilterlists = pricingAdminService.getSFOFilterList(hotelsfosearch);
            //upgrade-revisit created a map
            Map<String, Object> sfoSearchMap = new HashMap<>();
            sfoSearchMap.put("hotelSFOFilterList", hotelsfofilterlists);
            sfoSearchMap.put("totalPages", totalPages);
            return gsonStream(sfoSearchMap);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private void initialize(HotelSFOSearch hotelsfosearch) {
        if (hotelsfosearch == null) {
            hotelsfosearch = new HotelSFOSearch();
            hotelsfosearch.setBrandAll("Y");
            hotelsfosearch.setParticipate("A");
        }
        hotelsfosearch.getPage().setMaxpagelen(constantsService.getAccountCenterMaxPageLen());

    }

    @RequestMapping(value = "/update", method = POST)
    public String update(HotelSFOSearch hotelsfosearch, String strHotelsfodetails) throws Exception {
        try {
            HotelSFODetails hotelsfodetails = fromJson(strHotelsfodetails, HotelSFODetails.class);
            pricingAdminService.updateHotelSFO(hotelsfodetails, getUserProperties());
            return getHotelSFOList(hotelsfosearch);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

}
