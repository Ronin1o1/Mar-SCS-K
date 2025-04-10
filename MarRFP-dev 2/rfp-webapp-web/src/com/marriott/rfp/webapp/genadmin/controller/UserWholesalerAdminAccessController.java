package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/userwsadminaccess")
public class UserWholesalerAdminAccessController extends BaseUserAccessListController {

    private static final String USER_ROLE ="MFPWSADM";
    private static final String  USER_ROLE_DESCRIPTION ="Wholesaler Administrative Users";

    public UserWholesalerAdminAccessController() {
        super();
    }

    @Autowired
    public UserWholesalerAdminAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
        super(userAdminService, constantsService);

    }

    @RequestMapping(value = "/getUserAccessList", method = GET)
    public String getUserAccessList(String strPage, String userRole, String filterString, String searchBy, int orderby) throws Exception {
        String userRoleDescription=(StringUtils.isNotEmpty(userRole)&& StringUtils.equals(userRole,USER_ROLE))?USER_ROLE_DESCRIPTION:"";
        return super.getBaseUserAccessList(strPage, userRole, filterString, searchBy, orderby,userRoleDescription);
    }

    //not in struts
    @RequestMapping(value = "/update", method = POST)
    public String update(String strInternalnotesMap) throws Exception {
        return super.update(strInternalnotesMap);
    }

}