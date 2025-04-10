package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/accountmcadresultmaint")
public class AccountMCADResultMaintController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountMCADResultMaintController.class);
    @Autowired
    private PricingAdminService pricingAdminService;

    public AccountMCADResultMaintController() {
        super();
    }

    public AccountMCADResultMaintController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }


    @RequestMapping(value = "/getAccountMCADResult", method = {GET, POST})
    public String getAccountMCADResult(String searchtype, String businessname, String businesslevel, String countrycode, Long businessid, String parentbusinesslevel, String childbusinesslevel) throws Exception {
        String result ="";
        if (searchtype != null && searchtype.equals("search_for_children"))
            result = searchByChild(businessid, parentbusinesslevel, childbusinesslevel);
        else if (searchtype.equals("search_for_id"))
            result = searchById(businessid, businesslevel, countrycode);
        else if (searchtype.equals("search_for_name"))
            result = searchByName(businessname, businesslevel, countrycode);
        return result;
    }

    public String searchById(Long businessid, String businesslevel, String countrycode) throws Exception {
        try {
            List<MCADData> mcadNetezzaDataList = pricingAdminService.getNetezzaMcadSummaryById(businessid, businesslevel, countrycode);
            return objectMapperStream(mcadNetezzaDataList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String searchByName(String businessname, String businesslevel, String countrycode) throws Exception {
        try {
            List<MCADData> mcadNetezzaDataList = pricingAdminService.getNetezzaMcadSummaryByName(businessname, businesslevel, countrycode);
            return objectMapperStream(mcadNetezzaDataList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String searchByChild(Long businessid, String parentbusinesslevel, String childbusinesslevel) throws Exception {
        try {
            List<MCADData> mcadNetezzaDataList = pricingAdminService.getNetezzaMcadSummaryByChild(businessid, parentbusinesslevel, childbusinesslevel);
            return objectMapperStream(mcadNetezzaDataList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

}
