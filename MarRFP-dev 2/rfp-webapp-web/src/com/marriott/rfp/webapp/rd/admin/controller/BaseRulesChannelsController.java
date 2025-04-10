package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseRulesChannelsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseRulesChannelsController.class);
    public BaseRulesChannelsController() {
        super();
    }

    public BaseRulesChannelsController(InfoService infoService) {
        super();
    }

    public String getRulesChannelList() throws Exception {
        try {
            return objectMapperStream(retrieveChannelList());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return  RFPConstants.FATAL_ERROR;
        }
    }

    public String getEntries() throws Exception {
        try {
            return objectMapperStream(retrieveEntryList());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return  RFPConstants.FATAL_ERROR;
        }
    }

    public String deleteRules() {
        Channel channel=new Channel();
        Entry entry=new Entry();
        deleteTheRules( channel, entry);
        retrieveEntryList();
        return SUCCESS;
    }

    public String getRulesChannel() throws Exception {
        try {
            return objectMapperStream( retrieveChannelList());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return  RFPConstants.FATAL_ERROR;
        }
    }

    public String getRoomEntries() throws Exception {
        try {
            return gsonStream( retrieveEntryList());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return  RFPConstants.FATAL_ERROR;
        }
    }

    public String getDeleteRules(String strChannel, String strEntry) {
        Channel channel = fromJson(strChannel, Channel.class);
        Entry entry = fromJson(strEntry, Entry.class);
        deleteTheRules( channel, entry);
        retrieveEntryList();
        return SUCCESS;
    }

    public abstract MI_HotelRoomProductInfoChannelsRS retrieveChannelList();

    public abstract MI_HotelRoomProductInfoEntriesRS retrieveEntryList();

    public abstract void deleteTheRules(Channel channel, Entry entry);

}
