package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenamerulesentry")
public class RoomTypeNameRulesController extends BaseRulesController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;

    public RoomTypeNameRulesController() {
        super();
    }

    public RoomTypeNameRulesController(RoomTypeNameAdminService roomTypeNameAdminService) {
        super();
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    public RoomTypeNameAdminService getroomTypeNameAdminService() {
        return roomTypeNameAdminService;
    }

    public void setroomTypeNameAdminService(RoomTypeNameAdminService roomTypeNameAdminService) {
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    @Override
    public DisplayRulesViewModel retrieveTheRules(Channel channel, Entry entry, boolean bCreateNew) throws RDRulesNotFoundException {
        DisplayRulesViewModel displayRulesViewModel=roomTypeNameAdminService.getDisplayRulesData(channel, entry, bCreateNew);
        return  displayRulesViewModel;
    }

    @Override
    public void updateTheRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions, String username) {
        roomTypeNameAdminService.updateDisplayRules(channel, entry, theRules, displayDimensions, username);
    }

    @RequestMapping(value = "/getRules", method = {RequestMethod.GET, RequestMethod.POST})
    public String getRules(String strChannel, String strEntry, Boolean bCreateNew) throws Exception {
        bCreateNew=(bCreateNew==null)?false:bCreateNew;
        return super.getRules(strChannel, strEntry,bCreateNew);
    }

    @RequestMapping(value = "/updateRules", method = RequestMethod.POST)
    public String updateRules(String strChannel, String strEntry, String strDisplayDimension, String formChg, String strTheRules) {
        return super.updateRules(strChannel, strEntry, strDisplayDimension, formChg, strTheRules);
    }
}
