package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.webapp.common.controller.BaseController;
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

@Security({ "MFPADMIN", "MFPAPADM" })
@RestController
@RequestMapping("/usereditcopy")
public class UserEditCopyController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(UserEditCopyController.class);
    @Autowired
    private UserAdminService userAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;

	public UserEditCopyController() {
		super();
	}

	@Autowired
	public UserEditCopyController(UserAdminService userAdminService, ConstantsService constantsService) {
		super();
		this.setUserAdminService(userAdminService);
		this.setConstantsService(constantsService);
	}


	@RequestMapping(value = "/getUserEditCopy",method = {GET,POST})
	public String getUserEditCopy(String dialogFilterString, String dialogSearchBy, Integer orderby, String role, Long userid, String strDialogPage) throws Exception {
		try {

			orderby =(orderby==null)?1:orderby;
			Page dialogPage = null;
			if (strDialogPage == null) {
				if(orderby == null) {
					orderby = 1;
				}
				dialogPage = new Page();
			}
			if(StringUtils.isNotEmpty(strDialogPage))
				dialogPage = fromJson(strDialogPage, Page.class);
			if(dialogPage.getMaxpagelen() == 0)	{
					dialogPage.setMaxpagelen(constantsService.getUsersMaxPageLen());
			}

			if (dialogFilterString != null) {
				if (dialogSearchBy == null) {
					dialogSearchBy = "EID";
				} else {
					if (dialogSearchBy.equals("")) {
						dialogSearchBy = "EID";
					}
				}
			}

			Long totalDialogPages = userAdminService.getTotalUserListPagesForCopy(userid, role, dialogFilterString, dialogSearchBy, orderby, dialogPage.getMaxpagelen());
			List<DSUser> userEditCopyList = userAdminService.getUserListForCopy(userid,role, dialogFilterString, dialogSearchBy, orderby, dialogPage);
			Map<String, Object> userEditCopyMap = new HashMap<>();
			userEditCopyMap.put("totalDialogPages",totalDialogPages);
			userEditCopyMap.put("userEditCopyList",userEditCopyList);
			return objectMapperStream(userEditCopyMap);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
	    	return FATAL_ERROR;
		}
	}

	@RequestMapping(value = "/userEditCopyUpdate",method = POST)
	public String userEditCopyUpdate(String[] eidList, String role, Long userid) throws Exception {
		try {
			userAdminService.copyUserPropertyAcctUpdate(userid, eidList,role);
			return SUCCESS;
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

	public ConstantsService getConstantsService() {
		return constantsService;
	}

	public void setConstantsService(ConstantsService constantsService) {
		this.constantsService = constantsService;
	}

}