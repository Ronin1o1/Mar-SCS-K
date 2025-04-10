package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestAvail;
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
@RequestMapping("/cbcrequestavail")
public class CBCRequestAvailController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(CBCRequestAvailController.class);
    @Autowired
    private PortfolioService portfolioService;

    public CBCRequestAvailController() {
        super();

    }


    @Autowired
    public CBCRequestAvailController(PortfolioService portfolioService) {
        setPortfolioService(portfolioService);
    }

    @RequestMapping(value = "/getCBCRequestAvail", method = {GET, POST})
    public String getCBCRequestAvail(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        List<CBCRequestAvail> cbcRequestAvailList = null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            cbcRequestAvailList = portfolioService.findAvailCBCRequest(filterValues, getUserProperties());
            return objectMapperStream(cbcRequestAvailList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strCheckAvail, Long accountrecid) throws Exception {
        List<Long> checkAvail = null;
        boolean updateOtherList = false;
        try {
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            checkAvail = (List<Long>) fromJson(strCheckAvail, collectionType);
            if (accountrecid != null && checkAvail != null)
                portfolioService.updateAccountCBCAvail(accountrecid, checkAvail, getUserProperties());
            updateOtherList = true;
            return objectMapperStream(updateOtherList);
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
