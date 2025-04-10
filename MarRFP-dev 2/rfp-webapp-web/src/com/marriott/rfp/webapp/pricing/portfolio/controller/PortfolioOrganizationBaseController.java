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

import java.lang.reflect.Type;
import java.util.List;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
public class PortfolioOrganizationBaseController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PortfolioOrganizationBaseController.class);
    @Autowired
    private PortfolioService portfolioService;



    public PortfolioOrganizationBaseController() {
        super();

    }

    @Autowired
    public PortfolioOrganizationBaseController(PortfolioService portfolioService) {
       setPortfolioService(portfolioService);
    }

    public String getPortfolioOrganization(String strFilterValues, int subsetnum) throws Exception {
        PricingFilterSelections  filterValues=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                  filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }


            List<Portfolio> portfolioList = portfolioService.findPortfolioOrganization(filterValues, subsetnum, getUserProperties());

            return objectMapperStream(portfolioList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String update(String strOrgSelect, Long accountrecid, String subset) throws Exception {
        boolean updateOtherList = false;
        try {
            List<Long> orgSelect=null;
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            orgSelect = (List<Long>) fromJson(strOrgSelect, collectionType);
            if (accountrecid != null && orgSelect != null) {
                portfolioService.updatePortfolioOrganization(accountrecid, subset, orgSelect, getUserProperties());
            }
            updateOtherList = true;
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
