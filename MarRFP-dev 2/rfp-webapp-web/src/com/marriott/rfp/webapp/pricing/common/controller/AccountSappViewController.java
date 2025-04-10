package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM"})
@RestController
@RequestMapping(value={"/sappaccountviewlist","/sappaccounteditlist"})
public class AccountSappViewController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AccountSappViewController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;

    public AccountSappViewController() {
        super();
    }

    @Autowired
    public AccountSappViewController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    @RequestMapping(value = "/viewAccounts", method = GET)
    public String getViewAccounts(String name, Long period, String participate) throws Exception {
        try {
            String range = request.getHeader("Range");
            long start = 0;
            long count = 0;
            if (range != null) {
                String[] parts = range.split("-");
                start = Long.parseLong(parts[0].replaceAll("items=", ""));
                count = Long.parseLong(parts[1]) - start + 1;
            }
            List<AccountJson> jsonResponse = pricingFilterListsService.getFilteredAccountListSAPPView(count, start, name, period, getUserProperties(), participate);
            response.addHeader("Content-Range", start + "-" + (start + jsonResponse.size() - 1) + "/100000");
            return gsonStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/findAccounts", method = GET)
    public String getEditAccounts(String name, Long period, String participate) throws Exception {
        try {
            String range = request.getHeader("Range");
            long start = 0;
            long count = 0;
            if (range != null) {
                String[] parts = range.split("-");
                start = Long.parseLong(parts[0].replaceAll("items=", ""));
                count = Long.parseLong(parts[1]) - start + 1;
            }
            List<AccountJson> jsonResponse = pricingFilterListsService.getFilteredAccountListSAPPEdit(count, start, name, period, getUserProperties(), participate);
            response.addHeader("Content-Range", start + "-" + (start + jsonResponse.size() - 1) + "/100000");
            return gsonStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

}
