package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenamerulescopy")
public class RoomTypeNameRulesCopyController extends BaseRulesCopyController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;

    public RoomTypeNameRulesCopyController() {
        super();
    }

    @Autowired
    public RoomTypeNameRulesCopyController(RoomTypeNameAdminService roomTypeNameAdminService) {
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
    public MI_HotelRoomProductInfoChannelsRS retrieveChannelList() {
        MI_HotelRoomProductInfoChannelsRS channelList=roomTypeNameAdminService.getChannels();
        return channelList;
    }

    @Override
    public MI_HotelRoomProductInfoEntriesRS retrieveEntryList() {
        MI_HotelRoomProductInfoEntriesRS entryList=roomTypeNameAdminService.getEntries();
        return entryList;
    }

    @Override
    public void copyRules(Channel channel,Entry entry,Channel copychannel,Entry copyentry) throws RDRulesNotFoundException {
        roomTypeNameAdminService.copyDisplayRules(channel, entry,copychannel, copyentry, getUsername());

    }

    @RequestMapping(value = "/getRulesCopy", method = RequestMethod.GET)
    public String getRulesCopy(String strChannel, String strEntry) throws Exception {
        return super.getRulesCopy(strChannel, strEntry);
    }

    @RequestMapping(value = "/copyIntoRules", method = RequestMethod.POST)
    public String copyIntoRules(String strChannel, String strCopyChannel, String strCopyEntry,String strEntry,Boolean copyRulesExist) throws Exception {
         copyRulesExist=(copyRulesExist==null)?true:copyRulesExist;
        return super.copyIntoRules(strChannel, strCopyChannel, strCopyEntry, strEntry,copyRulesExist);
    }
}
