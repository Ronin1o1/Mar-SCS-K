package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestSelected;
import com.marriott.rfp.object.pricing.portfolio.CBCSelect;
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
@RequestMapping("/cbcrequestselect")
public class CBCRequestSelectedController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(CBCRequestSelectedController.class);
    @Autowired
    private PortfolioService portfolioService;


    public CBCRequestSelectedController() {
        super();

    }

    @Autowired
    public CBCRequestSelectedController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getCBCRequestSelected", method = {GET, POST})
    public String getCBCRequestSelected(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<CBCRequestSelected> cbcRequestSelectedList = portfolioService.findSelectedCBCRequest(filterValues, getUserProperties());
            return objectMapperStream(cbcRequestSelectedList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strCBCStatusList, Long accountrecid) throws Exception {
        try {
            Type collectionType = new TypeToken<List<CBCSelect>>() {
            }.getType();
            List<CBCSelect> cbcSelect = (List<CBCSelect>) fromJson(strCBCStatusList, collectionType);
            if (accountrecid != null && cbcSelect != null)
                portfolioService.updateAccountCBCSelect(accountrecid, cbcSelect, getUserProperties());
            boolean updateOtherList = true;
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
