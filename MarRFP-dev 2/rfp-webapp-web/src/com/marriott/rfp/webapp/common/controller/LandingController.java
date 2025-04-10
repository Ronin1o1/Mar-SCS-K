package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.info.api.InfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
@RequestMapping("/home")
public class LandingController {

    private static final Logger log = LoggerFactory.getLogger(LandingController.class);
    public static final String CONTEXT_PATH = "contextPath";
    @Autowired
    private InfoService infoService = null;

    public LandingController() {
        super();
    }

    @RequestMapping(value = "/home", method = GET)
    public String home(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        String contextPath = httpServletRequest.getContextPath();
        Cookie cookie = new Cookie(CONTEXT_PATH, contextPath);
        httpServletResponse.addCookie(cookie);
        String code = httpServletRequest.getParameter("code");
        if (code != null) {
            return "redirect:/index?code=" + code;
        } else {
            String cam_passport_url = infoService.getCam_passport_url();
            return "redirect:" + cam_passport_url;
        }
    }

}


