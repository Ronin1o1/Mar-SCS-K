package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public abstract class BaseRulesController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseRulesController.class);
    @Autowired
    private RoomDefAdminService roomDefAdminService=null;

    public BaseRulesController() {
        super();
    }

    public BaseRulesController(InfoService infoService) {
        super();
    }

    public String getRules(String strChannel, String strEntry,boolean bCreateNew) throws Exception {
        try {
            Channel channel=null;
            Entry entry=null;
            DisplayRulesViewModel displayRulesViewModel=null;
            if(StringUtils.isNotEmpty(strChannel) && StringUtils.isNotEmpty(strEntry)) {
                channel = fromJson(strChannel, Channel.class);
                entry = fromJson(strEntry, Entry.class);
                displayRulesViewModel=retrieveTheRules(channel,entry,bCreateNew);
            }

            return objectMapperStream(displayRulesViewModel);
        } catch (RDRulesNotFoundException e) {
            if (bCreateNew) {
                bCreateNew = false;
                return objectMapperStream(new HashMap<>().put("bCreateNew", bCreateNew));
            } else {
                String copyTheRules="copyTheRules";
                /*DisplayRulesViewModel dM = new DisplayRulesViewModel();
                Map<String, Object> info= new HashMap<>();
                info.put("copyTheRules",copyTheRules);*/
              //  info.put("rulesDataDictionary",roomDefAdminService.getDataDictionaryForRules());
                return objectMapperStream(copyTheRules);
               // return "copyTheRules";
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public String updateRules(String strChannel, String strEntry, String strDisplayDimension, String formChg, String strTheRules) {
         Channel channel= fromJson(strChannel, Channel.class);
         Entry entry=fromJson(strEntry, Entry.class);
         DisplayDimensions displayDimensions=fromJson(strDisplayDimension, DisplayDimensions.class);

        Type collectionType = new TypeToken<Map<String, ProductDescriptionRules>>() {
        }.getType();
        Map<String, ProductDescriptionRules> theRules = fromJson(strTheRules, collectionType);
        updateTheRules(channel,entry,theRules,displayDimensions,getUsername());
        return SUCCESS;
    }

    public abstract DisplayRulesViewModel  retrieveTheRules(Channel channel, Entry entry,boolean bCreateNew) throws RDRulesNotFoundException;

    public abstract void updateTheRules(Channel channel,Entry entry,Map<String, ProductDescriptionRules> theRules,DisplayDimensions displayDimensions, String username );

}