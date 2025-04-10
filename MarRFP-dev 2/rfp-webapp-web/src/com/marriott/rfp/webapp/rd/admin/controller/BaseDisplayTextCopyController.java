package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public abstract class BaseDisplayTextCopyController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseDisplayTextCopyController.class);
    public BaseDisplayTextCopyController() {
        super();
    }

    public BaseDisplayTextCopyController(InfoService infoService) {
        super();
    }

    public String getDisplayTextCopy(String strChannel, String strLanguage) throws Exception {
        Channel channel=null;
        Language language=null;
        MI_HotelRoomProductInfoChannelsRS channelList = null;
         Languages channelLanguagesList=null;
        try {
            if(StringUtils.isNotEmpty(strChannel)) {
                channel = fromJson(strChannel, Channel.class);
                channelList =  retrieveChannelList();
            }
            if(StringUtils.isNotEmpty(strLanguage)) {
                language = fromJson(strLanguage, Language.class);
                channelLanguagesList =  retrieveChannelLanguagesList(language);
            }

            Map<String, Object> info = new HashMap<>();
            info.put("channelList", channelList);
            info.put("channelLanguageList", channelLanguagesList);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String copyIntoDisplayText(String strChannel, String strLanguage,String strCopyChannel, String strCopyLanguage) throws Exception {
         Channel channel;
         Language language;
         Channel copychannel;
         Language copylanguage;
        boolean copyDisplayTextExist = true;
        try {
            channel = fromJson(strChannel, Channel.class);
            language = fromJson(strLanguage, Language.class);
            copychannel=fromJson(strCopyChannel, Channel.class);
            copylanguage=fromJson(strCopyLanguage, Language.class);

            copyDisplayText(channel,language,copychannel,copylanguage);
        } catch (RDTextNotFoundException e) {
            copyDisplayTextExist = false;
            return objectMapperStream(copyDisplayTextExist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
        return RFPConstants.SUCCESS;
    }


    public abstract MI_HotelRoomProductInfoChannelsRS  retrieveChannelList();

    public Languages retrieveChannelLanguagesList(Language language) {
        int numLang = 1;
        if (!language.getCode().equals("en"))
            numLang = 2;
        Language[] tmpLang = new Language[numLang];
        tmpLang[0] = language;
        if (!language.getCode().equals("en")) {
            Language enLang = new Language();
            enLang.setCode("en");
            enLang.setEnglishName("English");
            tmpLang[1] = enLang;
        }
        Languages channelLanguagesList = new Languages();
        channelLanguagesList.setLanguage(tmpLang);
        return channelLanguagesList;
    }

    public abstract void copyDisplayText(Channel channel,Language language,Channel copychannel,Language copylanguage) throws RDTextNotFoundException;



}
