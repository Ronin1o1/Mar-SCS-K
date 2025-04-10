package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security(value = { "MFPADMIN", "MFPRDADM", "MFPPPADM" })
@RestController
@RequestMapping("/rateproductrulescopy")
public class RateProductRulesCopyController extends BaseRulesCopyController {

    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductRulesCopyController() {
	super();
    }

    public RateProductRulesCopyController(RateProductAdminService rateProductAdminService) {
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
    public MI_HotelRoomProductInfoEntriesRS retrieveEntryList() {

        return rateProductAdminService.getEntries();
    }


    @Override
    public void copyRules(Channel channel, Entry entry, Channel copychannel, Entry copyentry) throws RDRulesNotFoundException {
	 rateProductAdminService.copyDisplayRules(channel, entry, copychannel, copyentry, getUsername());
    }


    @RequestMapping(value = "/copyIntoRules", method = RequestMethod.POST)
    public String copyIntoRules(String strChannel, String strCopyChannel, String strCopyEntry,String strEntry,Boolean copyRulesExist) throws Exception {
        copyRulesExist=(copyRulesExist==null)?true:copyRulesExist;
        return super.copyIntoRules(strChannel,strCopyChannel,strCopyEntry,strEntry,copyRulesExist);
    }
    @RequestMapping(value = "/getRulesCopy", method = RequestMethod.POST)
    public String getRulesCopy(String strChannel, String strEntry) throws Exception {
        return super.getRulesCopy(strChannel,strEntry);
    }
}
