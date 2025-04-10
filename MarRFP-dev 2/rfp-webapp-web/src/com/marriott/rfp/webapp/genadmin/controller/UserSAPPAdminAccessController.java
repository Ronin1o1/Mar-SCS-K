package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN"})
@RestController
@RequestMapping("/usersappadminaccess")
public class UserSAPPAdminAccessController extends BaseUserAccessListController {

	private static final String USER_ROLE = "MFPAPADM";
	private static final String  USER_ROLE_DESCRIPTION ="Account Plan Users";

	public UserSAPPAdminAccessController() {
		super();
	}

	public UserSAPPAdminAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
		super(userAdminService, constantsService);

	}
	@RequestMapping(value = "/getUserSAPPAdminAccess",method = {GET,POST})
	public String  getUserSAPPAdminAccess(String strPage , String role, String filterString, String searchBy, Integer orderby)  throws Exception {
		orderby=(orderby==null)?0:orderby;//Added to resolve null in primitive type
		String userRoleDescription=(StringUtils.isNotEmpty(role)&& StringUtils.equals(role,USER_ROLE))?USER_ROLE_DESCRIPTION:"";
		return super.getBaseUserAccessList(strPage,role,filterString,searchBy,orderby,userRoleDescription) ;
	}
}