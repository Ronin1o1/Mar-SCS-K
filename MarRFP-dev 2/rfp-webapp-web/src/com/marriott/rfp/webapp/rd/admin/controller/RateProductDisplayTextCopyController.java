package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("/rateproducttextcopy")
public class RateProductDisplayTextCopyController extends BaseDisplayTextCopyController {

    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductDisplayTextCopyController() {
        super();
    }

    @Autowired
    public RateProductDisplayTextCopyController(RateProductAdminService rateProductAdminService) {
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
    public MI_HotelRoomProductInfoChannelsRS retrieveChannelList() {
        return rateProductAdminService.getChannels();
    }

    @Override
    public void copyDisplayText(Channel channel, Language language, Channel copychannel, Language copyLanguage) throws RDTextNotFoundException {
        rateProductAdminService.copyDisplayText(channel, language, copychannel, copyLanguage, getUsername());

    }


    @RequestMapping(value = "/getDisplayTextCopy", method = {GET, POST})
    public String getDisplayTextCopy(String strChannel, String strLanguage) throws Exception {
        return super.getDisplayTextCopy(strChannel, strLanguage);
    }

    @RequestMapping(value = "/copyIntoDisplayText", method = POST)
    public String copyIntoDisplayText(String strChannel, String strLanguage, String strCopyChannel, String strCopyLanguage) throws Exception {
        return super.copyIntoDisplayText(strChannel, strLanguage, strCopyChannel, strCopyLanguage);
    }

}
