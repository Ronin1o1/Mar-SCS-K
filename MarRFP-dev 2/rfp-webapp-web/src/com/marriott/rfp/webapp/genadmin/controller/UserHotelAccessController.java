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


@Security({ "MFPADMIN", "MFPAPADM"})
@RestController
@RequestMapping("/userhotelaccess")
public class UserHotelAccessController extends BaseUserAccessListController {

    private static final Logger log = LoggerFactory.getLogger(UserHotelAccessController.class);
    private static final String REDIRECT_USEREDITHOTELACCESS = "redirect: useredithotelaccess";
    private static final String USER_ROLE = "MFPUSER";
    private static final String  USER_ROLE_DESCRIPTION ="Hotel Users";

    public UserHotelAccessController() {
        super();
    }

    @Autowired
    public UserHotelAccessController(UserAdminService userAdminService, ConstantsService constantsService) {
        super(userAdminService, constantsService);

    }

    @RequestMapping(value = "/edit",method = POST)
    public String edit() throws Exception {
        try {
           // setEditnamespace("/useredithotelaccess");
            return REDIRECT_USEREDITHOTELACCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
    @RequestMapping(value = "/getUserHotelAccessList",method = {GET,POST})
    public String  getUserHotelAccessList(String strPage , String role, String filterString, String searchBy, Integer orderby)  throws Exception {
        role= StringUtils.isEmpty(role)?USER_ROLE:role;
        String userRoleDescription=(StringUtils.isNotEmpty(role)&& StringUtils.equals(role,USER_ROLE))?USER_ROLE_DESCRIPTION:"";
        return super.getBaseUserAccessList(strPage,role,filterString,searchBy,orderby,userRoleDescription) ;
    }
    @RequestMapping(value = "/updateStatus",method = POST)
    public String update(String strInternalnotesMap) throws Exception {
        return super.update(strInternalnotesMap);
    }

}