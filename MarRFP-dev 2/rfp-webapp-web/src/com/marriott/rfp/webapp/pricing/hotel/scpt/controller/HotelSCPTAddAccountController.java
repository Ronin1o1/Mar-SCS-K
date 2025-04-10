package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.AccountIdJson;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.scpt.SCPTAddAccount;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptaccount")
public class HotelSCPTAddAccountController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelSCPTAddAccountController.class);
    @Autowired
    private SCPTService scptService = null;
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;


    public HotelSCPTAddAccountController() {
        super();
    }

    public HotelSCPTAddAccountController(SCPTService scptService) {
        this.setScptService(scptService);
    }


    @RequestMapping(value = "/getHotelSCPTAccSegment", method = GET)
    public String getHotelSCPTAccSegment() throws Exception {
        List<AccountSegment> scptseg=null;
        try {

            scptseg = pricingFilterListsService.getPricingSCPTAccountSegments();
            return objectMapperStream(scptseg);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/updateAccount", method = POST)
    public String update(String strAddAccount, Long hotelid, Long period) throws Exception {
        String strAddAccount1="";
        try {
            Long rvalue = 0L;
            SCPTAddAccount scptadd = new SCPTAddAccount();
            scptadd = fromJson(strAddAccount, SCPTAddAccount.class);

            if (!scptadd.getAccountname().equals(null)) {
                rvalue = scptService.updateSCPTAdd(hotelid, period, scptadd);
            }
            strAddAccount1="success";
           // setStrAddAccount("Success");
            if (rvalue == 1) {
                strAddAccount1="Duplicate Record";
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/findBTAccounts", method = GET)
    public String findBTAccounts(Long count, Long start, String filter, Long period, Long hotelid) throws Exception {
        List<AccountIdJson> jsonResponse = new ArrayList<AccountIdJson>();
        filter=(filter==null)?"":filter;
        try {
            jsonResponse = pricingFilterListsService.getFilteredAccountListSCPT(count, start, filter, period, hotelid, getUserProperties());
            return objectMapperStream(jsonResponse);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }


    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }


}
