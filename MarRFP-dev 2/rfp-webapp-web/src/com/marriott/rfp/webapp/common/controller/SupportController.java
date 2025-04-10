package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.SupportAndTermsConstantsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/support")
public class SupportController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(SupportController.class);
    @Autowired
    private SupportAndTermsConstantsService supportAndTermsConstantsService = null;

    public SupportController() {
        super();
    }

    public SupportController(SupportAndTermsConstantsService supportAndTermsConstantsService) {
        super();
        this.supportAndTermsConstantsService = supportAndTermsConstantsService;
    }

    @RequestMapping(value = "/getSupportInfo", method = GET)
    public String getSupportInfo() throws Exception {
        try {
            return gsonStream(supportAndTermsConstantsService.getSupportInfomation());
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}
