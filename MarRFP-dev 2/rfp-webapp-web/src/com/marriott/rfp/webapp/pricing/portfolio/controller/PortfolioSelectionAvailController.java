package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/portfolioselectionavail")
public class PortfolioSelectionAvailController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioSelectionAvailController.class);
    @Autowired
    private PortfolioService portfolioService;

    public PortfolioSelectionAvailController() {
        super();

    }

    @Autowired
    public PortfolioSelectionAvailController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getPortfolioSelectionAvail", method = {GET, POST})
    public String getPortfolioSelectionAvail(String strFilterValues, boolean updateOtherList) throws Exception {
        PricingFilterSelections  filterValues=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<Portfolio> portfolioList = portfolioService.findPortfolioAvail(filterValues, getUserProperties());
            return objectMapperStream(portfolioList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strOrgSelect, Long accountrecid, String subset) throws Exception {
        boolean updateOtherList = false;
        String   failedHotels=null;
        try {
//	    failedHotels,accountrecid,orgSelect	,pselavail,filterValues,start,autoCreateSession
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            List<Long>  orgSelect = (List<Long>) fromJson(strOrgSelect, collectionType);
            if (accountrecid != null && orgSelect != null) {
                failedHotels = portfolioService.updatePortfolioSelection(accountrecid, subset, orgSelect, getUserProperties());
                updateOtherList = true;
            }
            Map info =  new HashMap();
            info.put("failedHotels",failedHotels);
            info.put("updateOtherList",updateOtherList);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    public void setPortfolioService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public PortfolioService getPortfolioService() {
        return portfolioService;
    }

}
