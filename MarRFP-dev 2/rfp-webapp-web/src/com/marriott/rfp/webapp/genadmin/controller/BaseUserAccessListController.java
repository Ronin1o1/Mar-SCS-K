package com.marriott.rfp.webapp.genadmin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.InternalNotes;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BaseUserAccessListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseUserAccessListController.class);
    @Autowired
    private UserAdminService userAdminService = null;
    @Autowired
    private ConstantsService constantsService = null;


    public BaseUserAccessListController() {
        super();
    }

    @Autowired
    public BaseUserAccessListController(UserAdminService userAdminService, ConstantsService constantsService) {
        super();
        this.setUserAdminService(userAdminService);
        this.setConstantsService(constantsService);
    }



    public String getBaseUserAccessList(String strPage,String userRole,String filterString,String searchBy,Integer orderby,String userRoleDescription) throws Exception {
        Page   page=null;
        try {

            if(StringUtils.isNotEmpty(strPage)) {
                page = fromJson(strPage, Page.class);
            }
            if (page == null) {
                orderby = 1;
                page = new Page();
            }
            page.setMaxpagelen(constantsService.getUsersMaxPageLen());

            if (filterString != null) {
                if (searchBy == null) {
                    searchBy = "EID";
                }
            }
            orderby = (orderby == null) ? 1 : orderby;//Added to resolve null in primitive type

            Long totalPages = userAdminService.getTotalUserListPages(userRole, filterString, searchBy, orderby, page.getMaxpagelen());
            List<DSUser> userlist = userAdminService.getUserList(userRole, filterString, searchBy, orderby, page);
            Map<String, Object> info = new HashMap<>();
            info.put("totelPages",totalPages);
            info.put("userlist",userlist);
            info.put("userRoleDescription",userRoleDescription);
            return  gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String update(String strInternalnotesMap) throws Exception {
        Map<Long,InternalNotes> internalnotesMap = null;
        try {
            Type collectionType = new TypeToken<Map<Long,InternalNotes>>(){}.getType();
            if(StringUtils.isNotEmpty(strInternalnotesMap)) {
                internalnotesMap = (Map<Long, InternalNotes>) fromJson(strInternalnotesMap, collectionType);
            }
            userAdminService.updateInternalNotes(internalnotesMap);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }

    public void setUserAdminService(UserAdminService userAdminService) {
        this.userAdminService = userAdminService;
    }

    public UserAdminService getUserAdminService() {
        return userAdminService;
    }



}