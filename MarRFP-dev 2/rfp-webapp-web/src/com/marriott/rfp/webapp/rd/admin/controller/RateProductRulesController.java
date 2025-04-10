package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("rateproductrulesentry")
public class RateProductRulesController extends BaseRulesController {

    private static final Logger log = LoggerFactory.getLogger(RateProductRulesController.class);
    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductRulesController() {
        super();
    }

    @Autowired
    public RateProductRulesController(RateProductAdminService rateProductAdminService) {
        super();
        this.rateProductAdminService = rateProductAdminService;
    }

    public RateProductAdminService getrateProductAdminService() {
        return rateProductAdminService;
    }

    public void setrateProductAdminService(RateProductAdminService rateProductAdminService) {
        this.rateProductAdminService = rateProductAdminService;
    }

    @Override
    public DisplayRulesViewModel retrieveTheRules(Channel channel, Entry entry, boolean bCreateNew) throws RDRulesNotFoundException {
        DisplayRulesViewModel displayRulesViewModel=rateProductAdminService.getDisplayRulesData(channel, entry, bCreateNew);
        return  displayRulesViewModel;
    }

    @Override
    public void updateTheRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions, String username ) {
        rateProductAdminService.updateDisplayRules(channel, entry, theRules, displayDimensions, username);
    }

    @RequestMapping(value = "/getRules", method = {RequestMethod.GET,RequestMethod.POST})
    public String getRules(String strChannel, String strEntry,Boolean bCreateNew) throws Exception {
        Channel channel = null;
        Entry entry = null;
        bCreateNew = (bCreateNew==null)?false:bCreateNew;
        DisplayRulesViewModel displayRulesViewModel =null;

        try {
            if(StringUtils.isNotEmpty(strChannel) && StringUtils.isNotEmpty(strEntry)) {
                channel = fromJson(strChannel, Channel.class);
                entry = fromJson(strEntry, Entry.class);
                displayRulesViewModel = rateProductAdminService.getDisplayRulesData(channel, entry, bCreateNew);

            }

            return objectMapperStream(displayRulesViewModel);
        } catch (RDRulesNotFoundException e) {
            if (bCreateNew) {
                bCreateNew = false;
                return objectMapperStream(new HashMap<>().put("bCreateNew", bCreateNew));
            } else {
                return "copyTheRules";
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateRules", method = RequestMethod.POST)
    public String updateRules(String strChannel, String strEntry, String strDisplayDimension, String formChg, String strTheRules) {
        return super.updateRules(strChannel, strEntry, strDisplayDimension, formChg, strTheRules);
    }
}
