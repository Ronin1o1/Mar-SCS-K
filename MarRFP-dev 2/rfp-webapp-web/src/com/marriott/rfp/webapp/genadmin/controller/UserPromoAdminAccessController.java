package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/userpromoadminaccess")
public class UserPromoAdminAccessController extends BaseUserAccessListController {

    private static final String USER_ROLE = "MFPPPADM";
    private static final String  USER_ROLE_DESCRIPTION ="Promotions Admin Users";

    public UserPromoAdminAccessController() {
        super();
    }

    @Autowired
    public UserPromoAdminAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
        super(userAdminService, constantsService);

    }

    @RequestMapping(value = "/getUserPromoAdminAccess", method = GET)
    public String getUserPromoAdminAccess(String strPage, String userRole, String filterString, String searchBy, Integer orderby) throws Exception {
        orderby=(orderby==null)?0:orderby;//Added to resolve null pointer issue
        String userRoleDescription=(StringUtils.isNotEmpty(userRole)&& StringUtils.equals(userRole,USER_ROLE))?USER_ROLE_DESCRIPTION:"";
        return super.getBaseUserAccessList(strPage, userRole, filterString, searchBy, orderby,userRoleDescription);
    }


}