package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/accountaertype")
public class AccountAerTypeController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountAerTypeController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;


    public AccountAerTypeController() {
        super();
    }

    @Autowired
    public AccountAerTypeController(PricingFilterListsService PricingFilterListsService) {
        super();
        this.pricingFilterListsService = PricingFilterListsService;
    }

    @RequestMapping(value = "/getAccAerType", method = GET)
    public String getAccAerType(Long accountrecid) throws Exception {
        try {
            String accountaertype = pricingFilterListsService.findAccountAerType(accountrecid);
            return objectMapperStream(accountaertype);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

}
