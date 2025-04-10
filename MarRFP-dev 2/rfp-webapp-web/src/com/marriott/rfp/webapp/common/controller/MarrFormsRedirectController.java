package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/marrforms")
public class MarrFormsRedirectController {

    @Autowired
    private ConstantsService constantsService;
    private static final String REDIRECT = "redirect : ";

    public MarrFormsRedirectController() {
        super();
    }

    @RequestMapping(value = "/marrforms", method = GET)
    public String marrforms(HttpServletResponse response) throws IOException {
        String url = constantsService.getMarrFormsUrl();
        return REDIRECT + url;
    }

}
