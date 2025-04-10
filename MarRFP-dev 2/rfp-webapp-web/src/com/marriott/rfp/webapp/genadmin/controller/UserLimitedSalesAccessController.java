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

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN","MFPAPADM"})
@RestController
@RequestMapping("/userlimitedsalesaccess")
public class UserLimitedSalesAccessController extends BaseUserAccessListController {

	private static final Logger log = LoggerFactory.getLogger(UserLimitedSalesAccessController.class);
	private static final String REDIRECT_USEREDITLIMITEDSALESACCESS = "redirect: usereditlimitedsalesaccess";
	private static final String USER_ROLE = "MFPFSALE";
	private static final String  USER_ROLE_DESCRIPTION ="Limited Sales Users";

	public UserLimitedSalesAccessController() {
		super();
	}

	@Autowired
	public UserLimitedSalesAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
		super(userAdminService, constantsService);

		//String actionnamespace = "userlimitedsalesaccess";
	}

	@RequestMapping(value = "/edit",method = POST)
	public String edit() throws Exception {
		try {
			//setEditnamespace("/usereditlimitedsalesaccess");
			return REDIRECT_USEREDITLIMITEDSALESACCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	@RequestMapping(value = "/getUserAccessList",method = {GET,POST})
	public String  getUserAccessList(String strPage , String role, String filterString, String searchBy, Integer orderby)  throws Exception {
		role= StringUtils.isEmpty(role)?"MFPFSALE":role;
		String userRoleDescription=(StringUtils.isNotEmpty(role)&& StringUtils.equals(role,USER_ROLE))?USER_ROLE_DESCRIPTION:"";
		return super.getBaseUserAccessList(strPage,role,filterString,searchBy,orderby,userRoleDescription) ;
	}
	@RequestMapping(value = "/updateStatus",method = POST)
	public String update(String strInternalnotesMap) throws Exception {
		return super.update(strInternalnotesMap);
	}

}