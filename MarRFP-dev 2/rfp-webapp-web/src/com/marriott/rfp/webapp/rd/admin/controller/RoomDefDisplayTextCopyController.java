package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdeftextcopy")
public class RoomDefDisplayTextCopyController extends BaseDisplayTextCopyController {

    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefDisplayTextCopyController() {
        super();
    }

    public RoomDefDisplayTextCopyController(RoomDefAdminService roomDefAdminService) {
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
    public MI_HotelRoomProductInfoChannelsRS retrieveChannelList() {
        return roomDefAdminService.getChannels();
    }

    @Override
    public void copyDisplayText(Channel channel,Language language,Channel copychannel,Language copylanguage) throws RDTextNotFoundException {
        roomDefAdminService.copyDisplayText(channel, language, copychannel, copylanguage, getUsername());

    }

    @RequestMapping(value = "/copyIntoDisplayText", method = RequestMethod.POST)
    public String deleteDisplayText(String strChannel, String strLanguage, String strCopyChannel, String strCopyLanguage) throws Exception {
        return super.copyIntoDisplayText(strChannel, strLanguage, strCopyChannel, strCopyLanguage);
    }
}
