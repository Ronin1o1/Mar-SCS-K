package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.Gson;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctTasks;
import com.marriott.rfp.object.pricing.sapp.DetailList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/editInitiative")
public class EditInitiativeController extends BaseSAPPController {
    private static final Logger log = LoggerFactory.getLogger(EditInitiativeController.class);
    public EditInitiativeController() {
        super();
    }

    @Autowired
    public EditInitiativeController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                    AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
    }

    @RequestMapping(value = "/getEditInitiative", method = GET)
    public String getEditInitiative(String initiative_name,String action, Long accountrecid, Long buyinglocid, long seqId, long revStreamId) throws Exception {
        try {
            List<Period> periodList = getPricingCommonService().findAllPeriodsForRole(getUserProperties().getRole());
            buyinglocid = (null == buyinglocid ? 0L : buyinglocid);//Added ternary for null issue
            AcctInitiatives acctInitiative = getAccountOverviewService().findAcctOverviewInitiatives(action, accountrecid, seqId, revStreamId, buyinglocid);
            long maxAcctPlanTasks = 0;
            if (acctInitiative == null) {
                // This means this is a new initiative that is getting added.
                acctInitiative = new AcctInitiatives();
                acctInitiative.setSeqid(seqId);
                acctInitiative.setInitiative_name(initiative_name);
                if (action.equals("AccountPerspective")) {
                    acctInitiative.setRevstreamid(revStreamId);
                }
                if (action.equals("BuyingLocations")) {
                    maxAcctPlanTasks = getConstantsService().getMaxAcctPlanTasks();
                }
                acctInitiative.setBuyinglocid(buyinglocid);
            } else {
                acctInitiative.setSeqid(seqId);
                acctInitiative.setInitiative_name(initiative_name);
                if (action.equals("AccountPerspective")) {
                    acctInitiative.setRevstreamid(revStreamId);
                }
                if (action.equals("BuyingLocations")) {
                    acctInitiative.setAcctTasks(getAccountOverviewLocationsService().getAcctOverviewLocTasksList(acctInitiative.getAcctinitiativeid()));
                    maxAcctPlanTasks = getConstantsService().getMaxAcctPlanTasks();
                }
                acctInitiative.setBuyinglocid(buyinglocid);
            }
            List<DetailList> listRevStream = getDetailListService().getDetailListRevStream();

            Map<String, Object> info = new HashMap<>();
            info.put("periodList", periodList);
            info.put("acctInitiative", acctInitiative);
            info.put("action", action);
            info.put("seqId", seqId);
            info.put("revStreamId", revStreamId);
            info.put("initiative_name", initiative_name);
            info.put("maxAcctPlanTasks", maxAcctPlanTasks);
            info.put("listRevStream", listRevStream);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getUpdateInitiative", method = POST)
    public String getUpdateInitiative(Long accountrecid, String strAcctInitiative) throws Exception {
        try {
            AcctInitiatives acctInitiative = fromJson(strAcctInitiative, AcctInitiatives.class);
            acctInitiative.setAcctinitiativeid(getAccountOverviewService().updateAcctOverviewInitiatives(acctInitiative, accountrecid, getUserProperties().getEid()));
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getUpdateLocInitiative", method = POST)
    public String getUpdateLocInitiative(Long accountrecid, String strAcctInitiative, Long buyinglocid) throws Exception {
        try {
            AcctInitiatives acctInitiative = fromJson(strAcctInitiative, AcctInitiatives.class);
            acctInitiative.setAcctinitiativeid(getAccountOverviewService().updateAcctOverviewLocInitiatives(acctInitiative, accountrecid, buyinglocid, getUserProperties().getEid()));
            String emptyTaskFlag="N";
            for (AcctTasks task : acctInitiative.getAcctTasks()) {
                if (task != null ) {
                        if (task.getTaskDesc()!=null && task.getTaskDesc().length()>1024) {
                            task.setTaskDesc("");
                            emptyTaskFlag = "Y";
                        }
                }
            }
            if(emptyTaskFlag.equals("Y")){
                List<AcctTasks> accttaskList = new ArrayList<>();
                acctInitiative.setAcctTasks(accttaskList);
            }
             getAccountOverviewLocationsService().updateBLInitiativeTasks(acctInitiative, buyinglocid);

            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getDeleteLocInitiative", method = POST)
    public String getDeleteLocInitiative(Long accountrecid, String strAcctInitiative, Long buyinglocid) throws Exception {
        try {
            AcctInitiatives acctInitiative = fromJson(strAcctInitiative, AcctInitiatives.class);
            getAccountOverviewService().deleteAcctOverviewLocInitiatives(acctInitiative, accountrecid, buyinglocid, getUserProperties().getEid());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getDeleteInitiative", method = POST)
    public String getDeleteInitiative(Long accountrecid, String strAcctInitiative) throws Exception {
        try {
            AcctInitiatives acctInitiative = fromJson(strAcctInitiative, AcctInitiatives.class);
            getAccountOverviewService().deleteAcctOverviewInitiatives(acctInitiative, accountrecid, getUserProperties().getEid());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}