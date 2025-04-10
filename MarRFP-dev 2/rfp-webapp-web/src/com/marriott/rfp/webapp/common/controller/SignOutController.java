package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.common.util.ConfigurationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/signout")
public class SignOutController extends BaseController {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(SignOutController.class);

    public SignOutController() {
        super();
    }

    @RequestMapping(value = "/signout", method = GET)
    public String signout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            String loginUrl = ConfigurationUtil.getProperty("sessionLoginURL");
            String logoutUrl = ConfigurationUtil.getProperty("sessionLogoutURL");
            HttpSession session = request.getSession();
            if (session instanceof HttpSession) {
                try {
                    session.invalidate();
                    Map<String, Object> urls = new HashMap<>();
                    urls.put("loginUrl", loginUrl);
                    urls.put("logoutUrl", logoutUrl);
                    return gsonStream(urls);
                } catch (IllegalStateException e) {
                    return ERROR;
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return ERROR;
        }
        return SUCCESS;

    }

}
