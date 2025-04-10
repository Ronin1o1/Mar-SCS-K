package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN", "MFPRDADM", "MFPPPADM" })
@RestController
@RequestMapping("/roomtypenametextcopy")
public class RoomTypeNameDisplayTextCopyController extends BaseDisplayTextCopyController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;

    public RoomTypeNameDisplayTextCopyController() {
	super();
    }
    @Autowired
    public RoomTypeNameDisplayTextCopyController(RoomTypeNameAdminService roomTypeNameAdminService) {
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
    public void copyDisplayText(Channel channel, Language language, Channel copyChannel, Language copyLanguage) throws RDTextNotFoundException {
	roomTypeNameAdminService.copyDisplayText(channel, language, copyChannel, copyLanguage, getUsername());

    }
    @RequestMapping(value ="/getDisplayTextCopy" ,method = {GET,POST})
    public String getDisplayTextCopy(String strChannel, String strLanguage) throws Exception {
        return  super.getDisplayTextCopy(strChannel,strLanguage);
    }

    @RequestMapping(value ="/copyIntoDisplayText" ,method = POST)
    public String copyIntoDisplayText(String strChannel, String strLanguage,String strCopyChannel, String strCopyLanguage) throws Exception {
        return super.copyIntoDisplayText(strChannel,strLanguage,strCopyChannel,strCopyLanguage);
    }
}
