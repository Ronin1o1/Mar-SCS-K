package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.sync.api.SyncService;
import com.marriott.rfp.common.util.ConfigurationUtil;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import org.apache.openjpa.util.GeneralException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPPPADM"})
@RestController
@RequestMapping("/synchronize")
public class SyncUsersController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(SyncUsersController.class);
    public static final String PERCENT_COMPLETED = "percentCompleted";
    public static final String FIRST_LETTER = "firstLetter";
    public static final String SECOND_LETTER = "secondLetter";
    public static final String Z = "Z";
    public static final String SYNCCOMPLETED = "synccompleted";
    public static final String LDA_PSERVER = "LDAPserver";
    public static final String LDA_PUSERID = "LDAPuserid";
    public static final String A = "A";
    @Autowired
    private SyncService syncService;
    public static final String SYNCCOMPLETE = "synccomplete";
    public static final String SYNCINCOMPLETE = "syncincomplete";

    public SyncUsersController() {
        super();
    }

    @Autowired
    public SyncUsersController(SyncService syncService) {
        super();
        this.syncService = syncService;

    }

    @RequestMapping(value = "/getSyncUsers", method = GET)
    public String getSyncUsers() {
        return RFPConstants.SUCCESS;
    }

    @RequestMapping(value = "/syncUsers", method = GET)
    public String syncUsers(String firstLetter, String secondLetter, Double previousPercentCompleted, @RequestParam(required = false, name = "synccomplete", defaultValue = SYNCCOMPLETE) String synccomplete, @RequestParam(required = false, name = "syncincomplete", defaultValue = SYNCINCOMPLETE) String syncincomplete) throws Exception {

        Map<String, String> returnValues = new HashMap<>();
        Map<String, String> map = new HashMap<>();
        String lserver = ConfigurationUtil.getProperty(LDA_PSERVER);
        String luser = ConfigurationUtil.getProperty(LDA_PUSERID);
        Double percentCompleted = 0.0;
        boolean synccompleted = false;
        try {
            for (int i = 0; i < 5; i++) {
                map = updateLetters(firstLetter, secondLetter, percentCompleted);
                firstLetter = map.get(FIRST_LETTER);
                secondLetter = map.get(SECOND_LETTER);
                percentCompleted=Double.parseDouble(map.get(PERCENT_COMPLETED));
                validateFirstAndSecondLetter(firstLetter, secondLetter);
                syncService.Synchronize(firstLetter, secondLetter, lserver, luser);
            }
            if (null == previousPercentCompleted) {
                percentCompleted = Double.parseDouble(map.get(PERCENT_COMPLETED));
                map.put(PERCENT_COMPLETED, percentCompleted.toString());
            } else {
                percentCompleted = Double.parseDouble(map.get(PERCENT_COMPLETED)) + previousPercentCompleted;
                if ((percentCompleted > 100) && (map.get(FIRST_LETTER).equals(Z)) && (map.get(SECOND_LETTER).equals(Z))) {
                    percentCompleted = 100.0;
                    map.put(PERCENT_COMPLETED, percentCompleted.toString());
                    synccompleted = true;
                }
                map.put(PERCENT_COMPLETED, percentCompleted.toString());
            }
            if (synccompleted) {
                returnValues.put(SYNCCOMPLETED, synccomplete);
            } else {
                returnValues.put(SYNCCOMPLETED, syncincomplete);
            }
            returnValues.put(FIRST_LETTER, map.get(FIRST_LETTER));
            returnValues.put(SECOND_LETTER, map.get(SECOND_LETTER));
            returnValues.put(PERCENT_COMPLETED, map.get(PERCENT_COMPLETED));
            return objectMapperStream(returnValues);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private void validateFirstAndSecondLetter(String firstLetter, String secondLetter) {
        StringJoiner errMessage = new StringJoiner(",");
        if (firstLetter == null) {
            errMessage.add("First Letter is null");
        } else if (firstLetter.length() != 1) {
            errMessage.add("First Letter length is no equal to 1,firstLetter: " + firstLetter);
        }
        if (secondLetter == null) {
            errMessage.add("Second Letter is null");
        } else if (secondLetter.length() != 1) {
            errMessage.add("Second Letter length is no equal to 1,secondLetter: " + secondLetter);
        }
        if (errMessage != null && !errMessage.toString().isEmpty()) {
            throw new GenericException("Synchronize user issues: "+errMessage.toString());
        }

    }


    private Map<String, String> updateLetters(String firstLetter, String secondLetter, Double percentCompleted) {
        Map<String, String> map = new HashMap<>();
        if (firstLetter == null) {
            firstLetter = A;
            secondLetter = A;
            percentCompleted = 0.7;
            map.put(FIRST_LETTER, firstLetter);
            map.put(SECOND_LETTER, secondLetter);
            map.put(PERCENT_COMPLETED, percentCompleted.toString());
        } else {
            percentCompleted += 0.1479;
            if (firstLetter.equals(Z)) {
                if (secondLetter.equals(Z)) {
                    map.put(FIRST_LETTER, firstLetter);
                    map.put(SECOND_LETTER, secondLetter);
                    map.put(PERCENT_COMPLETED, percentCompleted.toString());
                } else {
                    secondLetter = String.valueOf((char) ((int) (secondLetter.charAt(0)) + 1));
                    map.put(FIRST_LETTER, firstLetter);
                    map.put(SECOND_LETTER, secondLetter);
                    map.put(PERCENT_COMPLETED, percentCompleted.toString());
                }
            } else {
                if (secondLetter.equals(Z)) {
                    firstLetter = String.valueOf((char) ((int) (firstLetter.charAt(0)) + 1));
                    secondLetter = A;
                    map.put(FIRST_LETTER, firstLetter);
                    map.put(SECOND_LETTER, secondLetter);
                    map.put(PERCENT_COMPLETED, percentCompleted.toString());
                } else {
                    secondLetter = String.valueOf((char) ((int) (secondLetter.charAt(0)) + 1));
                    map.put(FIRST_LETTER, firstLetter);
                    map.put(SECOND_LETTER, secondLetter);
                    map.put(PERCENT_COMPLETED, percentCompleted.toString());
                }
            }
        }
        return map;
    }

    public void setSyncService(SyncService syncService) {
        this.syncService = syncService;
    }

    public SyncService getSyncService() {
        return syncService;
    }
}
