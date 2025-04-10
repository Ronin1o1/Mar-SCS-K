package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.UserAdminAccess;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/useradminaccess")
public class UserAdminAccessController extends BaseUserAccessListController {

    private static final Logger log = LoggerFactory.getLogger(UserAdminAccessController.class);
    private static final String USER_ROLE = "MFPADMIN";
    private static final String USER_ROLE_DESCRIPTION = "Administrative Users";
    private static final String ACTION_NAMESPACE = "useradminaccess";

    public UserAdminAccessController() {
        super();
    }

    @Autowired
    public UserAdminAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
        super(userAdminService, constantsService);

    }

    @RequestMapping(value = "/getUserAdminAccess", method = GET)
    public UserAdminAccess getUserAdminAccess() throws Exception {

        try {
            UserAdminAccess userAdminAccess = new UserAdminAccess();
            userAdminAccess.setUserRole(USER_ROLE);
            userAdminAccess.setUserActionNamespace(ACTION_NAMESPACE);
            userAdminAccess.setUserRoleDescription(USER_ROLE_DESCRIPTION);
            return userAdminAccess;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/getUserAccessList", method = {GET, POST})
    public String getUserAccessList(String strPage, String role, String filterString, String searchBy, Integer orderby) throws Exception {
        role = StringUtils.isEmpty(role) ? USER_ROLE : role;
        String userRoleDescription = (StringUtils.isNotEmpty(role) && StringUtils.equals(role, USER_ROLE)) ? USER_ROLE_DESCRIPTION : "";
        return super.getBaseUserAccessList(strPage, role, filterString, searchBy, orderby, userRoleDescription);
    }

    @RequestMapping(value = "/updateStatus", method = POST)
    public String update(String strInternalnotesMap) throws Exception {
        return super.update(strInternalnotesMap);
    }

}