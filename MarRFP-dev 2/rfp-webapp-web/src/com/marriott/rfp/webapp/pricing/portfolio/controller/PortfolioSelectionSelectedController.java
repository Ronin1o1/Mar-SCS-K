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
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/portfolioselectionselect")
public class PortfolioSelectionSelectedController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioSelectionSelectedController.class);
    @Autowired
    private PortfolioService portfolioService;

    public PortfolioSelectionSelectedController() {
        super();

    }

    @Autowired
    public PortfolioSelectionSelectedController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getPortfolioSelectionSelected", method = {GET, POST})
    public String getPortfolioSelectionSelected(String strFilterValues) throws Exception {
        PricingFilterSelections    filterValues=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                    filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<Portfolio>   portfolioList = portfolioService.findPortfolioSelected(filterValues, getUserProperties());
            return gsonStream(portfolioList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/delete", method = POST)
    public String delete(String strOrgSelect, String accountpricingtype, Long accountrecid) throws Exception {
        boolean updateOtherList = false;
        try {
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            List<Long>   orgSelect = (List<Long>) fromJson(strOrgSelect, collectionType);
            if (accountrecid != null && orgSelect != null) {
                portfolioService.deletePortfolioSelection(accountrecid, accountpricingtype, orgSelect, getUserProperties());
                updateOtherList = true;
            }
            return RFPConstants.SUCCESS;
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
