package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextModel;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("rateproducttextdata")
public class RateProductDisplayTextDataController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RateProductDisplayTextDataController.class);
    @Autowired
    private RateProductAdminService rateProductAdminService = null;

    public RateProductDisplayTextDataController() {
        super();
    }

    public RateProductDisplayTextDataController(RateProductAdminService rateProductAdminService) {
        super();
        this.rateProductAdminService = rateProductAdminService;
    }

    public RateProductAdminService getrateProductAdminService() {
        return rateProductAdminService;
    }

    public void setrateProductAdminService(RateProductAdminService rateProductAdminService) {
        this.rateProductAdminService = rateProductAdminService;
    }

    @RequestMapping(value = "/getRateProductDisplayTextData", method = RequestMethod.POST)
    public String getRateProductDisplayTextData(String strChannel, String strLanguage, Boolean bCreateNew) throws Exception {
        Vector<RateProductDisplayTextModel> displayTextList=null;
        boolean bCreateNewResult = false;
        try {
            bCreateNewResult=(bCreateNew==null)?false:bCreateNew;
            if(StringUtils.isNotEmpty(strChannel) && StringUtils.isNotEmpty(strLanguage)) {
                Channel channel = fromJson(strChannel, Channel.class);
                Language language = fromJson(strLanguage, Language.class);
                 displayTextList = rateProductAdminService.getDisplayTextData(channel, language.getCode(), bCreateNewResult);
            }
        } catch (RDTextNotFoundException e) {
            if (bCreateNewResult) {
                bCreateNewResult = false;
                return objectMapperStream(new HashMap<>().put("bCreateNew", bCreateNewResult));
            } else {
                return "copyTheText";
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
        return gsonStream(displayTextList);
    }

    @RequestMapping(value = "/updateDisplayText", method = RequestMethod.POST)
    public String updateDisplayText(String strChannel, String strLanguage, String strTheText) {
       Channel channel = fromJson(strChannel, Channel.class);
       Language language = fromJson(strLanguage, Language.class);
        Type collectionType = new TypeToken<Map<String, RateProductDisplayTextElementModel>>() {
        }.getType();
        Map<String, RateProductDisplayTextElementModel> theText = (Map<String, RateProductDisplayTextElementModel>) fromJson(strTheText, collectionType);
        rateProductAdminService.updateDisplayTextData(channel, language.getCode(), theText, getUsername());
        return RFPConstants.SUCCESS;
    }

}
