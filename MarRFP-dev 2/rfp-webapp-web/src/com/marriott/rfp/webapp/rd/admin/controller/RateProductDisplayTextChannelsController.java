package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
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
@RequestMapping("rateproducttext")
public class RateProductDisplayTextChannelsController extends BaseDisplayTextChannelsController {

    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductDisplayTextChannelsController() {
        super();
    }

    public RateProductDisplayTextChannelsController(RateProductAdminService rateProductAdminService) {
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
    public Languages retrieveChannelLanguagesList(Channel channel) {
       return rateProductAdminService.getChannelLanguages(channel);
    }

    @Override
    public void deleteTheDisplayText(Channel channel, Language language) {
        rateProductAdminService.deleteDisplayText(channel, language, getUsername());
    }

    @RequestMapping(value = "/getDisplayText", method = RequestMethod.GET)
    public String getDisplayText() throws Exception {
        return super.getDisplayText();
    }
    @RequestMapping(value = "/getDisplayTextChannelLanguages",method={RequestMethod.POST})
    public String  getDisplayTextChannelLanguages(String strChannel)throws Exception{
        return super.getDisplayTextChannelLanguages(strChannel);
    }
    @RequestMapping(value = "/deleteText",method = {RequestMethod.POST})
    public String deleteDisplayText(String strChannel, String strLanguage) throws Exception {
        return super.deleteDisplayText(strChannel,strLanguage);
    }
    }
