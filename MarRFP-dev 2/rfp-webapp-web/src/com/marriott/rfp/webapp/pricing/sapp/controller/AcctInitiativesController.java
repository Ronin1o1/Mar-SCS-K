package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctinitiatives")
public class AcctInitiativesController extends BaseSAPPController {

    private static final Logger log = LoggerFactory.getLogger(AcctInitiativesController.class);
    private static final String CURRENT_SCREEN = "acctinitiatives";
    private static final String  NEXT_SCREEN = null;
    private static final String  PREVIOUS_SCREEN = "keycontacts";

    public AcctInitiativesController() {
        super();

    }

    @Autowired
    public AcctInitiativesController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                     AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getAcctInitiatives", method = GET)
    public String getAcctInitiatives(Long accountrecid) throws Exception {
        try {
            long maxInitiatives = getConstantsService().getMaxInitiatives();
            long revStreamId = 4; // leisure
            String lastupdatedate = null;
            List<AcctInitiatives> initLists1 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists1Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists1.size(); i++) {
                AcctInitiatives init = initLists1.get(i);
                Integer key = i + 1;
                initLists1Map.put(key, init);
            }


            revStreamId = 6; // catering
            List<AcctInitiatives> initLists2 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists2Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists2.size(); i++) {
                AcctInitiatives init = initLists2.get(i);
                Integer key = i + 1;
                initLists2Map.put(key, init);
            }

            revStreamId = 2; // account overview
            List<AcctInitiatives> initLists3 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists3Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists3.size(); i++) {
                AcctInitiatives init = initLists3.get(i);
                Integer key = i + 1;
                initLists3Map.put(key, init);
            }

            revStreamId = 3; // groups history
            List<AcctInitiatives> initLists4 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists4Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists4.size(); i++) {
                AcctInitiatives init = initLists4.get(i);
                Integer key = i + 1;
                initLists4Map.put(key, init);
            }

            revStreamId = 5; // extended stay
            List<AcctInitiatives> initLists5 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists5Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists5.size(); i++) {
                AcctInitiatives init = initLists5.get(i);
                Integer key = i + 1;
                initLists5Map.put(key, init);
            }

            revStreamId = 1; // perspectives
            List<AcctInitiatives> initLists6 = getAccountOverviewService().getAcctOverviewInitList(accountrecid, revStreamId);
            Map<Integer, AcctInitiatives> initLists6Map = new HashMap<Integer, AcctInitiatives>();
            for (int i = 0; i < initLists6.size(); i++) {
                AcctInitiatives init = initLists6.get(i);
                Integer key = i + 1;
                initLists6Map.put(key, init);
            }

            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "AcctOverallInit");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;

            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("maxInitiatives", maxInitiatives);
            info.put("initLists1", initLists1);
            info.put("initLists1Map", initLists1Map);
            info.put("initLists2", initLists2);
            info.put("initLists2Map", initLists2Map);
            info.put("initLists3", initLists3);
            info.put("initLists3Map", initLists3Map);
            info.put("initLists4", initLists4);
            info.put("initLists4Map", initLists4Map);
            info.put("initLists5", initLists5);
            info.put("initLists5Map", initLists5Map);
            info.put("initLists6", initLists6);
            info.put("initLists6Map", initLists5Map);
            info.put("currentScreen", CURRENT_SCREEN);
            info.put("nextScreen", NEXT_SCREEN);
            info.put("previousScreen", PREVIOUS_SCREEN);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateAcctInitiatives", method = POST)
    public String updateAcctInitiatives(Long accountrecid, String formChg, String strInitLists1Map, String strInitLists2Map, String strInitLists3Map, String strInitLists4Map, String strInitLists5Map, String strInitLists6Map) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Integer, AcctInitiatives>>() {
            }.getType();
            Map<Integer, AcctInitiatives> initLists1Map = fromJson(strInitLists1Map, collectionType);
            Map<Integer, AcctInitiatives> initLists2Map = fromJson(strInitLists2Map, collectionType);
            Map<Integer, AcctInitiatives> initLists3Map = fromJson(strInitLists3Map, collectionType);
            Map<Integer, AcctInitiatives> initLists4Map = fromJson(strInitLists4Map, collectionType);
            Map<Integer, AcctInitiatives> initLists5Map = fromJson(strInitLists5Map, collectionType);
            Map<Integer, AcctInitiatives> initLists6Map = fromJson(strInitLists6Map, collectionType);


            if (formChg.equals("Y")) {

                List<AcctInitiatives> inits = new ArrayList<AcctInitiatives>();
                if (initLists1Map != null) {
                    for (Integer key : initLists1Map.keySet()) {
                        if (initLists1Map.get(key).getInitiative_name() != null && initLists1Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists1Map.get(key).getInitiative_name());
                            init.setSeqid(initLists1Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(4));
                            init.setAcctinitiativeid(initLists1Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                if (initLists2Map != null) {
                    for (Integer key : initLists2Map.keySet()) {
                        if (initLists2Map.get(key).getInitiative_name() != null && initLists2Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists2Map.get(key).getInitiative_name());
                            init.setSeqid(initLists2Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(6));
                            init.setAcctinitiativeid(initLists2Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                if (initLists3Map != null) {
                    for (Integer key : initLists3Map.keySet()) {
                        if (initLists3Map.get(key).getInitiative_name() != null && initLists3Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists3Map.get(key).getInitiative_name());
                            init.setSeqid(initLists3Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(2));
                            init.setAcctinitiativeid(initLists3Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                if (initLists4Map != null) {
                    for (Integer key : initLists4Map.keySet()) {
                        if (initLists4Map.get(key).getInitiative_name() != null && initLists4Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists4Map.get(key).getInitiative_name());
                            init.setSeqid(initLists4Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(3));
                            init.setAcctinitiativeid(initLists4Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                if (initLists5Map != null) {
                    for (Integer key : initLists5Map.keySet()) {
                        if (initLists5Map.get(key).getInitiative_name() != null && initLists5Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists5Map.get(key).getInitiative_name());
                            init.setSeqid(initLists5Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(5));
                            init.setAcctinitiativeid(initLists5Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                if (initLists6Map != null) {
                    for (Integer key : initLists6Map.keySet()) {
                        if (initLists6Map.get(key).getInitiative_name() != null && initLists6Map.get(key).getInitiative_name().length() > 0) {
                            AcctInitiatives init = new AcctInitiatives();
                            init.setInitiative_name(initLists6Map.get(key).getInitiative_name());
                            init.setSeqid(initLists6Map.get(key).getSeqid());
                            init.setRevstreamid(new Long(1));
                            init.setAcctinitiativeid(initLists6Map.get(key).getAcctinitiativeid());
                            inits.add(init);
                        }
                    }
                }

                getAccountOverviewService().updateAcctOverviewInitList(inits, accountrecid);
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
}