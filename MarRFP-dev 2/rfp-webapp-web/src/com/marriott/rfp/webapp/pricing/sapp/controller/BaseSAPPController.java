package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.pricing.sapp.Menu;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseSAPPController extends BaseController {

    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private DetailListService detailListService = null;
    @Autowired
    private AccountOverviewService accountOverviewService = null;
    @Autowired
    private AccountOverviewLocationsService accountOverviewLocationsService;
    @Autowired
    private UserService userService = null;



    public BaseSAPPController() {
        super();
    }

    public BaseSAPPController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                              AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super();
        this.constantsService = constantsService;
        this.pricingCommonService = pricingCommonService;
        this.detailListService = detailListService;
        this.accountOverviewService = accountOverviewService;
        this.accountOverviewLocationsService = accountOverviewLocationsService;
        this.userService = userService;
    }


    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public DetailListService getDetailListService() {
        return detailListService;
    }

    public void setDetailListService(DetailListService detailListService) {
        this.detailListService = detailListService;
    }

    public AccountOverviewService getAccountOverviewService() {
        return accountOverviewService;
    }

    public void setAccountOverviewService(AccountOverviewService accountOverviewService) {
        this.accountOverviewService = accountOverviewService;
    }


    /*public void setCheckFields() {
        if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
            setCheckFields(false);
        } else {
            setCheckFields(true);
        }
    }*/


    public AccountOverviewLocationsService getAccountOverviewLocationsService() {
        return accountOverviewLocationsService;
    }

    public void setAccountOverviewLocationsService(AccountOverviewLocationsService accountOverviewLocationsService) {
        this.accountOverviewLocationsService = accountOverviewLocationsService;
    }


    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public UserService getUserService() {
        return userService;
    }

}