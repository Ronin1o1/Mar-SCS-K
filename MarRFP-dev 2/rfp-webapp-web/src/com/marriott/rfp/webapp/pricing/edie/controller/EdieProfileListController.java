package com.marriott.rfp.webapp.pricing.edie.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/edieprofilelist")
public class EdieProfileListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(EdieProfileListController.class);
    @Autowired
    private EdieService edieService = null;

    public EdieProfileListController() {
        super();
    }

    @Autowired
    public EdieProfileListController(EdieService edieService) {
        super();
        this.setEdieService(edieService);
    }

    @RequestMapping(value = "/getEdieProfiles", method = GET)
    public String getEdieProfiles() throws Exception {
        try {
            List<EdieProfile> edieProfileList = edieService.getEdieProfiles();
            return objectMapperStream(edieProfileList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteProfile", method = POST)
    public String deleteProfile(Long profile_id) throws Exception {
        try {
            edieService.deleteProfile(profile_id);
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
