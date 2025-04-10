package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
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
@RequestMapping("rateproductrules")
public class RateProductRulesChannelsController extends BaseRulesChannelsController {

    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductRulesChannelsController() {
        super();
    }

    @Autowired
    public RateProductRulesChannelsController(RateProductAdminService rateProductAdminService) {
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
        MI_HotelRoomProductInfoChannelsRS channelList=rateProductAdminService.getChannels();
        return channelList;
    }

    @Override
    public MI_HotelRoomProductInfoEntriesRS retrieveEntryList() {
        MI_HotelRoomProductInfoEntriesRS entryList=rateProductAdminService.getEntries();
        return entryList;
    }

    @Override
    public void deleteTheRules(Channel channel, Entry entry) {
        rateProductAdminService.deleteDisplayRules(channel, entry, getUsername());
    }

    @RequestMapping(value = "/getRulesChannel", method = RequestMethod.GET)
    public String getRulesChannel() throws Exception {
        return super.getRulesChannel();
    }

    @RequestMapping(value = "/getRoomEntries", method = RequestMethod.POST)
    public String getRoomEntries() throws Exception {
        return super.getRoomEntries();
    }

    @RequestMapping(value = "/getDeleteRules", method = RequestMethod.POST)
    public String getDeleteRules(String strChannel, String strEntry) {
        return super.getDeleteRules(strChannel, strEntry);
    }
}
