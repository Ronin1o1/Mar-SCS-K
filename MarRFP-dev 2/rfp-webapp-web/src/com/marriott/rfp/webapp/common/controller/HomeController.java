package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.object.user.UserPrefs;
import org.apache.commons.lang.StringUtils;
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

@RestController
@RequestMapping("/home")
public class HomeController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HomeController.class);

    public HomeController() {
        super();
    }

    @Autowired
    private InfoService infoService = null;

    @Autowired
    private UserService userService = null;


    public HomeController(InfoService infoService) {
        super();
        this.infoService = infoService;
    }

    @RequestMapping(value = "/homeMessages", method = GET)
    public String home() throws Exception {
        try {
            List<GeneralInfo> generalInfo=infoService.getGeneralInfoList();
            List<RFPInfo> pricingInfo=infoService.getInfoListForUser(getUserProperties());
            UserPrefs  userPrefs = userService.getUserHomePagePref(getUserProperties());
            String cam_passport_url=infoService.getCam_passport_url();
            userService.updateLoginDate(getUserProperties().getEid());
            Map<String, Object> info = new HashMap<>();
            info.put("generalInfo", generalInfo);
            info.put("pricingInfo", pricingInfo);
            info.put("userPrefs", userPrefs);
            info.put("cam_passport_url", cam_passport_url);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strUserPrefs) throws Exception {
        UserPrefs userPrefs=null;
        try {
            if(StringUtils.isNotEmpty(strUserPrefs)) {
                userPrefs=fromJson(strUserPrefs,UserPrefs.class);
            }

            if (getUserProperties().getShowPricing().equals("Y")) {
                if (userPrefs == null)
                    userPrefs = new UserPrefs();
                userPrefs.setEid(getUserProperties().getEid());
                userService.updateUserPrefs(userPrefs, getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteInfoMsg", method = POST)
    public String deleteInfoMsg(Long infoid) throws Exception {
        try {
            infoService.deleteInfoUser(getUserProperties(), infoid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/syncSession", method = GET)
    public String syncSession() {
        return "Session is in sync now";
    }


    public InfoService getInfoService() {
        return infoService;
    }

    public void setInfoService(InfoService infoService) {
        this.infoService = infoService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }


}
