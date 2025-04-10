package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdeftext")
public class RoomDefDisplayTextChannelsController extends BaseDisplayTextChannelsController {

    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefDisplayTextChannelsController() {
        super();
    }

    public RoomDefDisplayTextChannelsController(RoomDefAdminService roomDefAdminService) {
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
    public Languages retrieveChannelLanguagesList(Channel channel) {
        return roomDefAdminService.getChannelLanguages(channel);
    }

    @Override
    public void deleteTheDisplayText(Channel channel, Language language) {
        roomDefAdminService.deleteDisplayText(channel, language, getUsername());
    }

    @RequestMapping(value = "/getDisplayText", method = RequestMethod.GET)
    public String getDisplayText() throws Exception {
        return super.getDisplayText();
    }

    @RequestMapping(value = "/getDisplayTextChannelLanguages", method = RequestMethod.POST)
    public String getDisplayTextChannelLanguages(String strChannel) throws Exception {
        return super.getDisplayTextChannelLanguages(strChannel);
    }

    @RequestMapping(value = "/deleteText", method = RequestMethod.POST)
    public String deleteDisplayText(String strChannel, String strLanguage) throws Exception {
        return super.deleteDisplayText(strChannel, strLanguage);
    }
}
