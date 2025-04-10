package com.marriott.rfp.webapp.pricing.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSListData;
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


@RestController
@RequestMapping("/hotelpgoosmaintlist")
public class HotelPGOOSMaintenanceListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelPGOOSMaintenanceListController.class);
    @Autowired
    private PortfolioService portfolioService;

    public HotelPGOOSMaintenanceListController() {
        super();

    }

    public HotelPGOOSMaintenanceListController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getHotelPGOOSList", method = {GET, POST})
    public String getHotelPGOOSList(String strFilterValues) throws Exception {
        try {
            PricingFilterSelections filterValues = null;
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<HotelPGOOSListData> hotelPGOOSListData = portfolioService.findHotelPgoosMaintList(filterValues, getUserProperties());
            return objectMapperStream(hotelPGOOSListData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strHotelPGOOSListData, Long period) throws Exception {
        try {
            Type collectionType = new TypeToken<List<HotelPGOOSListData>>() {
            }.getType();
            List<HotelPGOOSListData> hotelPGOOSListData = (List<HotelPGOOSListData>) fromJson(strHotelPGOOSListData, collectionType);
            portfolioService.updateHotelPgoosMaintanence(period, hotelPGOOSListData, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }

}
