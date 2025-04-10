package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.LinkPasAccounts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/linkpasaccounts")
public class LinkPasAccountsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(LinkPasAccountsController.class);
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private MudroomService mudroomService = null;

    public LinkPasAccountsController() {
        super();
    }

    @Autowired
    public LinkPasAccountsController(MudroomService mudroomService) {
        super();
        this.setMudroomService(mudroomService);
    }

    @RequestMapping(value = "/getLinkPasAccounts", method = GET)
    public LinkPasAccounts getLinkPasAccounts(String pasManager, Long period) throws Exception {
        try {
            LinkPasAccounts linkPasAccounts=new LinkPasAccounts();
            linkPasAccounts.setPasManagerList(mudroomService.findPASManagerList());
            if (pasManager == null)
                pasManager = getUserProperties().getEid();
            linkPasAccounts.setPeriodList(pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole()));
            if (period == null || period.equals(0))
                period = ((Period) linkPasAccounts.getPeriodList().get(0)).getPeriod();
            linkPasAccounts.setAdminRespondent(mudroomService.getAdminRespondent(pasManager, period));
            return linkPasAccounts;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/updatePasAccounts", method = POST)
    public String updatePasAccounts(String strAdminRespondent, Long origPeriod) throws Exception {
        try {
            AdminMudroom adminRespondent = fromJson(strAdminRespondent, AdminMudroom.class);
            mudroomService.updatePASAccounts(adminRespondent, origPeriod);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public MudroomService getMudroomService() {
        return mudroomService;
    }


}
