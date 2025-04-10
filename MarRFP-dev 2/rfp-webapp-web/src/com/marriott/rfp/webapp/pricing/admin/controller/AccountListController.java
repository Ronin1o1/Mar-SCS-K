package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.AccountFilterLists;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/accountmaintenance")
public class AccountListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountListController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public AccountListController() {
        super();
    }

    public AccountListController(PricingAdminService pricingAdminService, ConstantsService constantsService) {
        super();
        this.setPricingAdminService(pricingAdminService);
        this.setConstantsService(constantsService);
    }

    @RequestMapping(value = "/getAccountList", method = {GET, POST})
    public String getAccountList(Long period, String accountpricingtype, String accountsegment, String filterString, Integer orderby, String strPage) throws Exception {
        Map<String, Object> acountList = new HashMap<>();

        try {
            AccountFilterLists accountfilterlists = pricingAdminService.getAccountFilterLists();
            acountList.put("accountfilterlists", accountfilterlists);
            Page page = fromJson(strPage, Page.class);
            decodeCookie(orderby, page, period, accountpricingtype, accountsegment, filterString);
            if (page == null) {
                orderby = 1;
                page = new Page();
            }
            page.setMaxpagelen(constantsService.getAccountCenterMaxPageLen());
            if (period == null) {
                period = accountfilterlists.getPeriodList().get(0).getPeriod();
            }
            if (accountpricingtype == null || accountpricingtype.equals("")) {
                if (getUserProperties().getIsPASAdmin())
                    accountpricingtype = "C";
                else
                    accountpricingtype = "*";
            }
            if (accountsegment == null || accountsegment.equals("")) {
                accountsegment = "*";
            }

            //initialize(page,orderby,period,accountpricingtype,accountsegment);
            Long totalPages = pricingAdminService.getTotalAccoutListPages(period, accountpricingtype, accountsegment, filterString, orderby, page.getMaxpagelen());
            if (page != null && page.getPage() == 0)
                page.setPage(1);
            List<Account> accountlist = pricingAdminService.findAccountList(period, accountpricingtype, accountsegment, filterString, orderby, page);
            if (totalPages == 0)
                page.setPage(0);

            acountList.put("totalPages", totalPages);
            acountList.put("accountlist", accountlist);
            acountList.put("period", period);
            acountList.put("accountpricingtype", accountpricingtype);
            acountList.put("accountsegment", accountsegment);
            acountList.put("filterString", filterString);
            acountList.put("orderby", orderby);
            acountList.put("page", page);
            return gsonStream(acountList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private void decodeCookie(Integer orderby, Page page, Long period, String accountpricingtype, String accountsegment, String filterString) throws Exception {
        HttpServletRequest servletRequest = getRequest();
        if (servletRequest.getQueryString() != null &&
                servletRequest.getQueryString().toLowerCase().contains("restoresearch")) {
            Cookie[] cookies = servletRequest.getCookies();
            if (cookies != null) {
                for (int i = 0; i < cookies.length; i++) {
                    if (cookies[i].getName().equalsIgnoreCase("searchTerms")) {
                        String rawValue = URLDecoder.decode(cookies[i].getValue(), "UTF-8");
                        Map<String, String> searchTerms = new Gson().fromJson(rawValue,
                                new TypeToken<Map<String, String>>() {
                                }.getType());
                        if (searchTerms.containsKey("orderby")) {
                            orderby = Integer.parseInt(searchTerms.get("orderby"));
                        }
                        if (searchTerms.containsKey("page.page")) {
                            Page p = new Page();
                            p.setPage(Long.parseLong(searchTerms.get("page.page")));
                            page = p;
                        }
                        if (searchTerms.containsKey("period")) {
                            period = Long.parseLong(searchTerms.get("period"));
                        }
                        if (searchTerms.containsKey("accountpricingtype")) {
                            accountpricingtype = searchTerms.get("accountpricingtype");
                        }
                        if (searchTerms.containsKey("accountsegment")) {
                            accountsegment = searchTerms.get("accountsegment");
                        }
                        if (searchTerms.containsKey("filterString")) {
                            filterString = searchTerms.get("filterString");
                        }
                    }
                    break;
                }
            }
        }
    }

    private void initialize(Page page, Integer orderby, Long period, String accountpricingtype, String accountsegment) {
        AccountFilterLists accountfilterlists = null;
        if (page == null) {
            orderby = 1;
            page = new Page();
        }
        page.setMaxpagelen(constantsService.getAccountCenterMaxPageLen());
        if (period == null) {
            period = accountfilterlists.getPeriodList().get(0).getPeriod();
        }
        if (accountpricingtype == null || accountpricingtype.equals("")) {
            if (getUserProperties().getIsPASAdmin())
                accountpricingtype = "C";
            else
                accountpricingtype = "*";
        }
        if (accountsegment == null || accountsegment.equals("")) {
            accountsegment = "*";
        }

    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }


}
