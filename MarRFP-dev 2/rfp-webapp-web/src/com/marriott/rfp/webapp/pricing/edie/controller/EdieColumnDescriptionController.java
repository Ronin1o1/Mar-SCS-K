package com.marriott.rfp.webapp.pricing.edie.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.edie.EdieColumnsUpdate;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/ediecolumndesc")
public class EdieColumnDescriptionController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(EdieColumnDescriptionController.class);

    @Autowired
    private EdieService edieService = null;

    public EdieColumnDescriptionController() {
        super();
    }

    @Autowired
    public EdieColumnDescriptionController(EdieService edieService) {
        super();
        this.setEdieService(edieService);
    }

    @RequestMapping(value = "/getEdieColumns", method = GET)
    public String getEdieColumns(String colfind) throws Exception {
        try {
            List<EdieColumnsUpdate> edieColumnsList = edieService.getEdieAllColumns(colfind);
            return objectMapperStream(edieColumnsList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String updateDescriptions(String strEdieColumnsList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<EdieColumnsUpdate>>() {
            }.getType();
            List<EdieColumnsUpdate> edieColumnsList = (List<EdieColumnsUpdate>) fromJson(strEdieColumnsList, collectionType);
            edieService.updateEdieColumnDescription(edieColumnsList);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setEdieService(EdieService edieService) {
        this.edieService = edieService;
    }

    public EdieService getEdieService() {
        return edieService;
    }
}
