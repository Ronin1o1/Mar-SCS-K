package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.object.roomdef.beans.*;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthotelview")
public class HotelRateProductViewDescriptionController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelRateProductViewDescriptionController.class);
    @Autowired
    private RateProductService rateProductService = null;


    public HotelRateProductViewDescriptionController() {
        super();
    }

    @Autowired
    public HotelRateProductViewDescriptionController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
        String entryLevel="Hotel";
    }

    @RequestMapping(value = "/getRateProductViewDescription", method = RequestMethod.GET)
    public String getRateProductViewDescription(String brandCode, String marshaCode) throws Exception {
        Channel[] channelList= null;
        Language[] languageList = null;
        Entry[] entryList = null;
        if (brandCode == null || brandCode.equals("")) {
            brandCode = rateProductService.getHotelBrands(marshaCode);
        }
        channelList = rateProductService.getChannels();
        entryList = rateProductService.getEntries();
        languageList = rateProductService.getDefaultLanguages();
        Map<String, Object> info = new HashMap<>();
        info.put("brandCode", brandCode);
        info.put("channelList", channelList);
        info.put("entryList", entryList);
        info.put("languageList", languageList);
        return gsonStream(info);
    }

    @RequestMapping(value = "/getAssignments", method = RequestMethod.POST)
    public String getAssignments(String navPage, String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName, String strRatePlanAssignmentsSearch) throws Exception {
        RatePlanAssignmentsSearch ratePlanAssignmentsSearch=null;
        RateProductAssignmentView rateProductAssignmentView=null;
        String NEXTPAGE = "NEXT";
        String PREVIOUSPAGE = "PREVIOUS";
        String SEARCH = "SEARCH";
        try {
            ratePlanAssignmentsSearch = fromJson(strRatePlanAssignmentsSearch,RatePlanAssignmentsSearch.class);
            if (ratePlanAssignmentsSearch == null || navPage == null || navPage.equals(SEARCH))
                ratePlanAssignmentsSearch = new RatePlanAssignmentsSearch();
            else if (navPage != null) {
                if (navPage.equals(NEXTPAGE)) {
                    ratePlanAssignmentsSearch.setStartKey(ratePlanAssignmentsSearch.getEndKey());
                    ratePlanAssignmentsSearch.setEndKey("");
                    ratePlanAssignmentsSearch.setStartRatePlanCode(ratePlanAssignmentsSearch.getEndRatePlanCode());
                    ratePlanAssignmentsSearch.setEndRatePlanCode("");
                } else if (navPage.equals(PREVIOUSPAGE)) {
                    ratePlanAssignmentsSearch.setEndKey(ratePlanAssignmentsSearch.getStartKey());
                    ratePlanAssignmentsSearch.setStartKey("");
                    ratePlanAssignmentsSearch.setEndRatePlanCode(ratePlanAssignmentsSearch.getStartRatePlanCode());
                    ratePlanAssignmentsSearch.setStartRatePlanCode("");
                }
            }
            rateProductAssignmentView = rateProductService.getRatePlanAssignmentList(marshaCode, brandCode, entryLevel, rpgmCode, rpgmName,
                    ratePlanAssignmentsSearch.getStartRatePlanCode(), ratePlanAssignmentsSearch.getEndRatePlanCode(),
                    ratePlanAssignmentsSearch.getStartKey(), ratePlanAssignmentsSearch.getEndKey());

            return gsonStream(rateProductAssignmentView);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getRateDescription", method = RequestMethod.POST)
    public String getRateDescription(String marshaCode, String strChannel, String languageId, String strEntry, String viewrpgmCode) throws Exception {
        Channel channel = null;
        Entry entry = null;
        Text[] descriptionText = null;
        Text[] oldText = null;
        try {
            channel = fromJson(strChannel, Channel.class);
            entry = fromJson(strEntry, Entry.class);
            descriptionText = rateProductService.getRateDescription(marshaCode, channel, languageId, entry, viewrpgmCode);
            oldText = rateProductService.getOldRateDescription(marshaCode, channel, languageId, entry, viewrpgmCode);
            Map<String, Object> info = new HashMap<>();
            info.put("descriptionText", descriptionText);
            info.put("oldText", oldText);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public RateProductService getRateProductService() {
        return rateProductService;
    }


    public void setRateProductService(RateProductService rateProductService) {
        this.rateProductService = rateProductService;
    }




}
