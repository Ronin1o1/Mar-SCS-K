package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.object.user.DSUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security(value = { "MFPADMIN", "MFPAPADM" })
@RestController
@RequestMapping("/userlistdialog")
public class UserListDialogController extends BaseUserAccessListController {

	private static final Logger log = LoggerFactory.getLogger(UserListDialogController.class);
    @Autowired
    private UserAdminService userAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;

	public UserListDialogController() {
	super();
    }

    @Autowired
    public UserListDialogController(UserAdminService userAdminService, ConstantsService constantsService) {
	super();
	this.setUserAdminService(userAdminService);
	this.setConstantsService(constantsService);
    }

    @RequestMapping(value ="/getUserListDialog" ,method = GET)
    public String getUserListDialog(Long userid,String userRole) throws Exception {
    	try {
			List<DSUser> userMaintlist = userAdminService.getUserListDetail(userid, userRole);
    		return gsonStream(userMaintlist);
    	} catch (Exception e) {
			log.error(e.getMessage(),e);
    		return FATAL_ERROR;
    	}
    }

	public UserAdminService getUserAdminService() {
		return userAdminService;
	}

	public void setUserAdminService(UserAdminService userAdminService) {
		this.userAdminService = userAdminService;
	}

	public void setConstantsService(ConstantsService constantsService) {
	this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
	return constantsService;
    }

}