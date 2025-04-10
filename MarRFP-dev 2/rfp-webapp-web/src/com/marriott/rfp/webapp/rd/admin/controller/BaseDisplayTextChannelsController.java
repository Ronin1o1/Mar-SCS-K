package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseDisplayTextChannelsController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseDisplayTextChannelsController.class);
    public BaseDisplayTextChannelsController() {
        super();
    }

    public BaseDisplayTextChannelsController(InfoService infoService) {
        super();
    }

    public String getDisplayText() throws Exception {
        try {
            return objectMapperStream( retrieveChannelList());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String getChannelLanguages() throws Exception {
        try {
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String getDisplayTextChannelLanguages(String strChannel) throws Exception {
        try {
            Channel  channel = fromJson(strChannel, Channel.class);
            Languages channelLanguagesList =retrieveChannelLanguagesList(channel);
            return objectMapperStream(channelLanguagesList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String deleteDisplayText(String strChannel, String strLanguage) throws Exception {
        try {
            Channel channel = fromJson(strChannel, Channel.class);
            Language language = fromJson(strLanguage, Language.class);
            deleteTheDisplayText(channel,language);
            Languages channelLanguagesList =retrieveChannelLanguagesList(channel);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    public abstract MI_HotelRoomProductInfoChannelsRS retrieveChannelList();

    public abstract Languages  retrieveChannelLanguagesList(Channel channel);

    public abstract void deleteTheDisplayText(Channel channel,Language language);


}
