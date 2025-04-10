package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.SupportAndTermsConstantsService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/terms")
public class TermsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(TermsController.class);
    @Autowired
    private SupportAndTermsConstantsService supportAndTermsConstantsService = null;
    @Autowired
    private UserService userService = null;
    private static final String REDIRECT_HOME = "redirect: home";

    public TermsController() {
        super();
    }

    public TermsController(SupportAndTermsConstantsService supportAndTermsConstantsService, UserService userService) {
        super();
        this.supportAndTermsConstantsService = supportAndTermsConstantsService;
        this.userService = userService;
    }

    @RequestMapping(value = "/terms", method = GET)
    public String terms(HttpServletResponse response) throws Exception {
        try {
            HashMap<String, String> termsInformation = supportAndTermsConstantsService.getTermsInformation();
            return gsonStream(termsInformation);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/acceptTerms", method = GET)
    public String acceptTerms(HttpServletResponse response) throws Exception {
        try {
            User u = getUserProperties();
            userService.acceptTerms(u.getEid());
            u.setAgreedtoTerms(true);
            return REDIRECT_HOME;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return ERROR;
        }
    }


}
