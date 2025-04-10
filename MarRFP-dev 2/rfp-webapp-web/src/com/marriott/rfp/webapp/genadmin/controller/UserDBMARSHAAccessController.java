package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/userdbmarshaaccess")
public class UserDBMARSHAAccessController extends BaseUserAccessListController {

    private static final Logger log = LoggerFactory.getLogger(UserDBMARSHAAccessController.class);
    private static final String USER_ROLE = "MFPDBMAR";
    private static final String USER_ROLE_DESCRIPTION = "DBMARSHA Users";
    private static final String ACTION_NAMESPACE = "userdbmarshaaccess";

    public UserDBMARSHAAccessController() {
        super();
    }

    @Autowired
    public UserDBMARSHAAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
        super(userAdminService, constantsService);

    }

    @RequestMapping(value = "/getDBMARSHAAccess", method = GET)// check metheod type no curl
    public String getDBMARSHAAccess() throws Exception {

        try {
            Map<String, Object> info = new HashMap<>();
            info.put("userRole", USER_ROLE);
            info.put("userRoleDescription", USER_ROLE_DESCRIPTION);
            info.put("userActionNamespace", ACTION_NAMESPACE);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getUserAccessList", method = {GET, POST})
    public String getUserAccessList(String strPage, String role, String filterString, String searchBy, Integer orderby) throws Exception {
        role = StringUtils.isEmpty(role) ? USER_ROLE : role;
        String userRoleDescription = (StringUtils.isNotEmpty(role) && StringUtils.equals(role, USER_ROLE)) ? USER_ROLE_DESCRIPTION : "";
        return super.getBaseUserAccessList(strPage, role, filterString, searchBy, orderby, userRoleDescription);
    }


}

