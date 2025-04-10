
package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/rateprogram")
public class RateProgramController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RateProgramController.class);

    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    public RateProgramController() {
        super();
    }

    @Autowired
    public RateProgramController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    @RequestMapping(value = "/getRateProgramList", method = GET)
    public String getRateProgramList(Long searchaccountrecid) throws Exception {
        try {
            List<RateProgram> rpgmlist = pricingFilterListsService.getAllRatePrograms(searchaccountrecid);
            return objectMapperStream(rpgmlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


}
