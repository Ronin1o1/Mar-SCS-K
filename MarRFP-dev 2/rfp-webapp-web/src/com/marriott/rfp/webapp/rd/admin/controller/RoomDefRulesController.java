package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
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

@Security(value = {"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdefrulesentry")
public class RoomDefRulesController extends BaseRulesController {

    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefRulesController() {
        super();
    }

    @Autowired
    public RoomDefRulesController(RoomDefAdminService roomDefAdminService) {
        super();
        this.roomDefAdminService = roomDefAdminService;
    }

    public RoomDefAdminService getroomDefAdminService() {
        return roomDefAdminService;
    }

    public void setroomDefAdminService(RoomDefAdminService roomDefAdminService) {
        this.roomDefAdminService = roomDefAdminService;
    }

    @Override
    public DisplayRulesViewModel  retrieveTheRules(Channel channel, Entry entry, boolean bCreateNew) throws RDRulesNotFoundException {
        DisplayRulesViewModel displayRulesViewModel=roomDefAdminService.getDisplayRulesData( channel, entry, bCreateNew);
        return displayRulesViewModel;
    }

    @Override
    public void updateTheRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions, String username) {
        roomDefAdminService.updateDisplayRules(channel, entry, theRules, displayDimensions, username);
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
