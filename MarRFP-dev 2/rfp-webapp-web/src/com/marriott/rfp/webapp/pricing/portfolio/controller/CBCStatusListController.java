package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.CBCStatus;
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
@RequestMapping("/cbcstatuslist")
public class CBCStatusListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(CBCStatusListController.class);
    @Autowired
    private PortfolioService portfolioService;

    public CBCStatusListController() {
        super();

    }

    @Autowired
    public CBCStatusListController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getCBCStatusList", method = {GET, POST})
    public String getCBCStatusList(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<CBCStatus> cbcStatusList = portfolioService.findSelectedCBCStatus(filterValues, getUserProperties());
            return objectMapperStream(cbcStatusList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long accountrecid, String strCBCStatusList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCStatus>>() {
            }.getType();
            List<CBCStatus> cbcStatusList = (List<CBCStatus>) fromJson(strCBCStatusList, collectionType);
            portfolioService.updateAcceptanceCBCStatusList(cbcStatusList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateAccept", method = POST)
    public String updateAccept(Long accountrecid, String strCBCStatusList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCStatus>>() {
            }.getType();
            List<CBCStatus> cbcStatusList = (List<CBCStatus>) fromJson(strCBCStatusList, collectionType);
            portfolioService.updateCBCListByProperty("A", cbcStatusList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateReject", method = POST)
    public String updateReject(Long accountrecid, String strCBCStatusList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCStatus>>() {
            }.getType();
            List<CBCStatus> cbcStatusList = (List<CBCStatus>) fromJson(strCBCStatusList, collectionType);
            portfolioService.updateCBCListByProperty("D", cbcStatusList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/acceptAll", method = POST)
    public String acceptAll(Long accountrecid, String strCBCStatusList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCStatus>>() {
            }.getType();
            List<CBCStatus> cbcStatusList = (List<CBCStatus>) fromJson(strCBCStatusList, collectionType);
            portfolioService.updateAllAcceptanceCBCStatusList("A", cbcStatusList, accountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/rejectAll", method = POST)
    public String rejectAll(Long accountrecid, String strCBCStatusList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCStatus>>() {
            }.getType();
            List<CBCStatus> cbcStatusList = (List<CBCStatus>) fromJson(strCBCStatusList, collectionType);
            portfolioService.updateAllAcceptanceCBCStatusList("D", cbcStatusList, accountrecid, getUserProperties());
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
