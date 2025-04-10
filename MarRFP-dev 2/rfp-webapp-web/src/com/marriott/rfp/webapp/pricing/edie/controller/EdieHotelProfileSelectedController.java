package com.marriott.rfp.webapp.pricing.edie.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN"})
@RestController
@RequestMapping("/ediehotelprofileselect")
public class EdieHotelProfileSelectedController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(EdieHotelProfileSelectedController.class);
    @Autowired
    private EdieService edieService = null;

    public EdieHotelProfileSelectedController() {
        super();
    }

    @Autowired
    public EdieHotelProfileSelectedController(EdieService edieService) {
        setEdieService(edieService);
    }

    @RequestMapping(value = "/getHotelProfileSelect", method = {GET, POST})
    public String getHotelProfileSelect(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<HotelListData> edieProfileHotelList = edieService.findHotelProfileSelected(filterValues, getUserProperties());
            return objectMapperStream(edieProfileHotelList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long profileid, String strOrgSelect) throws Exception {
        boolean updateOtherList=false;
        try {
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            List<Long> orgSelect = (List<Long>) fromJson(strOrgSelect, collectionType);
            if (orgSelect != null) {
                edieService.deleteHotelProfile(profileid, orgSelect);
                updateOtherList = true;
            }
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
