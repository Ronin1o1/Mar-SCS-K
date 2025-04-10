package com.marriott.rfp.webapp.pricing.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelGPPPGOOSListData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/hotelgpppgoosmaintlist")
public class HotelGPPPGOOSMaintenanceListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelGPPPGOOSMaintenanceListController.class);
    @Autowired
    private PricingAdminService pricingAdminService;

    public HotelGPPPGOOSMaintenanceListController() {
        super();

    }

    public HotelGPPPGOOSMaintenanceListController(PricingAdminService pricingAdminService) {
        setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getGPPPGOOSList", method = {GET, POST})
    public String getGPPPGOOSList(String strFilterValues) throws Exception {
        PricingFilterSelections  filterValues=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                  filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<HotelGPPPGOOSListData> hotelGPPPGOOSListData = pricingAdminService.findHotelPgoosMaintList(filterValues, getUserProperties());
            return objectMapperStream(hotelGPPPGOOSListData);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    //Upgrade-revisit cannot test update method as no curls
    @RequestMapping(value = "/update", method = {GET, POST})
    public String update(String strHotelGPPPGOOSListData, Long accountrecid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelGPPPGOOSListData>>() {
            }.getType();
            List<HotelGPPPGOOSListData> hotelGPPPGOOSListData = (List<HotelGPPPGOOSListData>) fromJson(strHotelGPPPGOOSListData, collectionType);
            pricingAdminService.updateHotelGPPPgoosMaintanence(accountrecid, hotelGPPPGOOSListData, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    //Upgrade-revisit getting null for GET request but Post request is giving correct response and do we need null check for strHotelGPPPGOOSData
    @RequestMapping(value = "/updatereason", method = POST)
    public String updatereason(String strHotelGPPPGOOSData, Long accountrecid) throws Exception {
        try {
            HotelGPPPGOOSListData hotelGPPPGOOSData = fromJson(strHotelGPPPGOOSData, HotelGPPPGOOSListData.class);
            List<HotelGPPPGOOSListData>  hotelGPPPGOOSListData = new Vector<HotelGPPPGOOSListData>();
            hotelGPPPGOOSListData.add(hotelGPPPGOOSData);
            pricingAdminService.updateHotelGPPPgoosMaintanence(accountrecid, hotelGPPPGOOSListData, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            String val = "Error";
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

}
