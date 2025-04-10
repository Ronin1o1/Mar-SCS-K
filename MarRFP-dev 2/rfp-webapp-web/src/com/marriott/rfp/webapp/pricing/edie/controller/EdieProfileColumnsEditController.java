package com.marriott.rfp.webapp.pricing.edie.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.edie.EdieColumns;
import com.marriott.rfp.object.pricing.edie.UpdateColumn;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/edieprofileedit")
public class EdieProfileColumnsEditController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(EdieProfileColumnsEditController.class);

    @Autowired
    private EdieService edieService = null;

    public EdieProfileColumnsEditController() {
        super();
    }

    @Autowired
    public EdieProfileColumnsEditController(EdieService edieService) {
        super();
        this.setEdieService(edieService);
    }

    @RequestMapping(value = "/getEdieProfileDetails", method = POST)
    public String getEdieProfileDetails(Long profile_id) throws Exception {
        try {
            String profileName = edieService.getEdieProfileName(profile_id);
            List<EdieColumns> profileColumns = edieService.getEdieProfileColumns(profile_id);
            List<EdieColumns> columnsNotInProfile = edieService.getColumnsNotInEdieProfile(profile_id, null);
            Map<String, Object> edieProfileDetails = new HashMap<>();
            edieProfileDetails.put("profileName", profileName);
            edieProfileDetails.put("profileColumns", profileColumns);
            edieProfileDetails.put("columnsNotInProfile", columnsNotInProfile);
            return objectMapperStream(edieProfileDetails);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/getAvailableColumnsList", method = {GET, POST})
    public String getAvailableColumnsList(Long profile_id, String colfind) throws Exception {
        try {
            List<EdieColumns> columnsNotInProfile = edieService.getColumnsNotInEdieProfile(profile_id, colfind);
            return objectMapperStream(columnsNotInProfile);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getColumnDescription", method = {GET, POST})
    public String getColumnDescription(Long column_id) throws Exception {
        try {
            String column_desc = edieService.getEdieProfileColumnsDescription(column_id);
            return gsonStream(column_desc);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strSortu, Long profile_id, String profileName) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, UpdateColumn>>() {
            }.getType();
            Map<Long, UpdateColumn> sortu = (Map<Long, UpdateColumn>) fromJson(strSortu, collectionType);
            edieService.updateProfile(profile_id, profileName, sortu);
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
