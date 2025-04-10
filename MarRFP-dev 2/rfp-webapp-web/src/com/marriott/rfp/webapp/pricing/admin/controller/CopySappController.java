package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping({"/copysappaccount", "/sappaccount"})
public class CopySappController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(CopySappController.class);
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public CopySappController() {
        super();
    }

    public CopySappController(PricingCommonService pricingCommonService) {
        super();
        this.pricingCommonService = pricingCommonService;
    }

    @RequestMapping(value = "/getSappPeriodList", method = GET)
    public String getSappPeriodList() throws Exception {
        try {
            List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
            return objectMapperStream(periodList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/findToAccounts", method = GET)
    public String getToAccounts(String name, Long toPeriod, Long start, Long count) throws Exception {
        List<AccountJson> jsonResponse = new ArrayList<AccountJson>();
        try {
            String range = getRequest().getHeader("Range");
            if (range != null) {
                String[] parts = range.split("-");
                start = Long.parseLong(parts[0].replaceAll("items=", ""));
                count = Long.parseLong(parts[1]) - start + 1;
            }
             jsonResponse = pricingFilterListsService.getAccountListNotHavingSAPPInfo(count, start, name, toPeriod);
            getResponse().addHeader("Content-Range", start + "-" + (start + jsonResponse.size() - 1) + "/100000");
            return gsonStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/findFromAccounts", method = GET)
    public String getFromAccounts(String name, Long fromPeriod, Long start, Long count) throws Exception {
        List<AccountJson> jsonResponse = new ArrayList<AccountJson>();
        try {
            String range = getRequest().getHeader("Range");
            if (range != null) {
                String[] parts = range.split("-");
                start = Long.parseLong(parts[0].replaceAll("items=", ""));
                count = Long.parseLong(parts[1]) - start + 1;
            }
            jsonResponse = pricingFilterListsService.getAccountListHavingSAPPInfo(count, start, name, fromPeriod);
            getResponse().addHeader("Content-Range", start + "-" + (start + jsonResponse.size() - 1) + "/100000");
            return gsonStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(Long fromAccountrecid, Long toAccountrecid) throws Exception {
        try {
            pricingAdminService.copySappDetailsToNewAccount(fromAccountrecid, toAccountrecid, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }


    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(
            PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

}