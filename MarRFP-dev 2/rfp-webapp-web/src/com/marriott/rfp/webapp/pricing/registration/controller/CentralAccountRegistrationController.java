package com.marriott.rfp.webapp.pricing.registration.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.ThirdPartyRegion;
import com.marriott.rfp.object.pricing.accountregistration.AccountRegistration;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.salesregion.SalesRegion;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPAPADM"})
@RestController
@RequestMapping("/centralaccountreg")
public class CentralAccountRegistrationController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(CentralAccountRegistrationController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;
    @Autowired
    private PricingCommonService pricingCommonService = null;
    @Autowired
    private PortfolioService portfolioService = null;
    @Autowired
    private MudroomService mudroomService = null;
    @Autowired
    private ConstantsService constantsService = null;

    public CentralAccountRegistrationController() {
        super();
    }

    @Autowired
    public CentralAccountRegistrationController(MudroomService mudroomService, PricingFilterListsService pricingFilterListsService, ConstantsService constantsService) {
        super();
        this.setMudroomService(mudroomService);
        this.setPricingFilterListsService(pricingFilterListsService);
        this.setConstantsService(constantsService);
        String contactname=constantsService.getContactName();
        //setContactemail(constantsService.getPASEmail());
        String contactemail=constantsService.getAcctRegEmail();
    }

    @RequestMapping(value = "/getCentralAccountReg", method = GET)
    public String getCentralAccountReg(Long period) throws Exception {
        try {
            List<AccountSegment> accountSegmentList = pricingFilterListsService.getAllAccountSegments();
            List<SalesRegion> salesRegionList = pricingFilterListsService.getAllSalesRegions();
            List<PricingPeriod> dueDateList = pricingFilterListsService.getDueDatesWithCurrentDate(period);
            List<SalesMudroom> aaes=mudroomService.getSalesUserListforAccounts();
            List<ThirdPartyRegion> thirdParties = portfolioService.getAccountThirdPartiesForAcctReg();

            Map<String, Object> info = new HashMap<>();
            String contactname=constantsService.getContactName();
            String contactemail=constantsService.getAcctRegEmail();
            info.put("accountSegmentList", accountSegmentList);
            info.put("salesRegionList", salesRegionList);
            info.put("dueDateList", dueDateList);
            info.put("aaes", aaes);
            info.put("thirdParties", thirdParties);
            info.put("contactname", contactname);
            info.put("contactemail", contactemail);
            return objectMapperStream(info);


        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strAccReg) throws Exception {
        try {

            AccountRegistration accountReg = fromJson(strAccReg, AccountRegistration.class);
            portfolioService.registerCentralAccount(accountReg, getUserProperties());
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public MudroomService getMudroomService() {
        return mudroomService;
    }

    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(
            PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public PricingCommonService getPricingCommonService() {
        return pricingCommonService;
    }

    public void setPricingCommonService(PricingCommonService pricingCommonService) {
        this.pricingCommonService = pricingCommonService;
    }

}
