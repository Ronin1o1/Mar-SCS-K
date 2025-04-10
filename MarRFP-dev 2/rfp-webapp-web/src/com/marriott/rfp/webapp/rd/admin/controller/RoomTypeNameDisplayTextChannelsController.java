package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenametext")
public class RoomTypeNameDisplayTextChannelsController extends BaseDisplayTextChannelsController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;

    public RoomTypeNameDisplayTextChannelsController() {
        super();
    }

    public RoomTypeNameDisplayTextChannelsController(RoomTypeNameAdminService roomTypeNameAdminService) {
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
       return roomTypeNameAdminService.getChannels();
    }

    @Override
    public Languages retrieveChannelLanguagesList(Channel channel) {
        return roomTypeNameAdminService.getChannelLanguages(channel);
    }

    @Override
    public void deleteTheDisplayText(Channel channel, Language language) {
        roomTypeNameAdminService.deleteDisplayText(channel, language, getUsername());
    }

    @RequestMapping(value = "/getDisplayText", method = RequestMethod.GET)
    public String getDisplayText() throws Exception {
        return super.getDisplayText();
    }

    @RequestMapping(value = "/getDisplayTextChannelLanguages", method = RequestMethod.POST)
    public String getDisplayTextChannelLanguages(String strChannel) throws Exception {
        return super.getDisplayTextChannelLanguages(strChannel);
    }

    @RequestMapping(value = "/deleteDisplayText", method = RequestMethod.POST)
    public String deleteDisplayText(String strChannel, String strLanguage) throws Exception {
        return super.deleteDisplayText(strChannel, strLanguage);
    }
}
