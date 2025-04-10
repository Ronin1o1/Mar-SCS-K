package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public abstract class BaseRulesCopyController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseRulesCopyController.class);
    public BaseRulesCopyController() {
        super();
    }

    @Autowired
    public BaseRulesCopyController(InfoService infoService) {
        super();
    }

    public String getRulesCopy(String strChannel, String strEntry) throws Exception {
        try {
            Channel channel = null;
            Entry entry = null;
            channel = fromJson(strChannel, Channel.class);
            entry = fromJson(strEntry, Entry.class);
            Map<String, Object> info = new HashMap<>();
            info.put("channelList", retrieveChannelList());
            info.put("entryList", retrieveEntryList());
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String copyIntoRules(String strChannel, String strCopyChannel, String strCopyEntry,String strEntry,boolean copyRulesExist) throws Exception {
         Channel channel = null;
         Entry entry = null;
         Channel copychannel = null;
         Entry copyentry = null;

        try {
            channel = fromJson(strChannel, Channel.class);
            entry = fromJson(strEntry, Entry.class);
            copychannel = fromJson(strCopyChannel, Channel.class);
            copyentry = fromJson(strCopyEntry, Entry.class);
            copyRules(channel,entry,copychannel,copyentry);
        } catch (RDRulesNotFoundException e) {
            copyRulesExist = false;
            HashMap<String,Object> info = new HashMap<>();
            info.put("copyRulesExist", copyRulesExist);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
        return SUCCESS;
    }

    public abstract MI_HotelRoomProductInfoChannelsRS retrieveChannelList();

    public abstract MI_HotelRoomProductInfoEntriesRS retrieveEntryList();

    public abstract void copyRules(Channel channel,Entry entry,Channel copychannel,Entry copyentry) throws RDRulesNotFoundException;

}
