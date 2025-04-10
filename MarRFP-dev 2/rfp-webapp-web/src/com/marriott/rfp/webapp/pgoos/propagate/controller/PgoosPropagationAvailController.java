package com.marriott.rfp.webapp.pgoos.propagate.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.pgoos.api.PgoosService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintAvail;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/pgoospropagationavail")
public class PgoosPropagationAvailController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(PgoosPropagationAvailController.class);
    @Autowired
    private PgoosService pgoosService;

    public PgoosPropagationAvailController() {
        super();

    }
    @Autowired
    public PgoosPropagationAvailController(PgoosService pgoosService) {
        setPgoosService(pgoosService);

    }
    @RequestMapping(value = "/getPGOOSPropagationAvail", method = {GET, POST})
    public String getPGOOSPropagationAvail(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        List<PgoosMaintAvail> pgoosList;
        List<String> tempList;
        String notfound;

        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
           if( filterValues.getAccountFilter().getAccountrecid()==null)
           {
               filterValues.getAccountFilter().setAccountrecid(0L);
           }
            pgoosList = pgoosService.findPgoosableHotelFilteredList(filterValues, getUserProperties());
            tempList = new ArrayList<String>();
            notfound = "";
            if (filterValues != null) {
                if (filterValues.getList() != null && !filterValues.getList().equalsIgnoreCase("")) {
                    List<String> list = Arrays.asList(filterValues.getList().split(","));
                    boolean found;
                    for (int i = 0; i < list.size(); i++) {
                        found = true;
                        if (list.get(i) != null && !list.get(i).equalsIgnoreCase("")) {
                            found = false;
                            for (int j = 0; j < pgoosList.size(); j++) {
                                if (pgoosList.get(j).getMarshacode() != null && !pgoosList.get(j).getMarshacode().equalsIgnoreCase("")) {
                                    if (pgoosList.get(j).getMarshacode().equalsIgnoreCase(list.get(i))) {
                                        found = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!found) {
                            tempList.add(list.get(i).toUpperCase());
                            if (notfound != null) {
                                notfound = notfound + list.get(i).toUpperCase() + " ";
                            } else {
                                notfound = list.get(i).toUpperCase() + " ";
                            }
                        }
                    }
                    if (!tempList.isEmpty()) {
                        if (tempList.size() == 1) {
                            tempList.add(0, "The following MARSHA code was not found");
                            notfound = "The following MARSHA code was not found: " + notfound;
                        } else {
                            tempList.add(0, "The following MARSHA codes were not found");
                            notfound = "The following MARSHA codes were not found: " + notfound;
                        }
                    } else {
                        notfound = " ";
                    }
                } else {
                    filterValues.setList("");
                }
            }
            Map<String, Object> info = new HashMap<>();
            info.put("pgoosList", pgoosList);
            info.put("tempList", tempList);
            info.put("notfound", notfound);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
    @RequestMapping(value = "/update", method = POST)
    public String update(String strFilterValues, String strPGOOSSelect) throws Exception {
        PricingFilterSelections filterValues = null;
        List<Long> pgoosSelect;
        boolean updateOtherList;
        String msg;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
            }
            if( filterValues.getAccountFilter().getAccountrecid()==null)
            {
                filterValues.getAccountFilter().setAccountrecid(0L);
            }
            filterValues.setStringRPGMList(filterValues.getStringRpgmList());
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            pgoosSelect = fromJson(strPGOOSSelect, collectionType);
            if (filterValues.getDeleteMCB().equals("Y")) {
                pgoosService.deleteMCB();
                filterValues.setDeleteMCB("N");
            }
            if (pgoosSelect != null) {
                msg = pgoosService.updatePgoosMaint(filterValues, pgoosSelect, getUserProperties());
                updateOtherList = true;
            }

            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }
    public PgoosService getPgoosService() {
        return pgoosService;
    }

    public void setPgoosService(PgoosService pgoosService) {
        this.pgoosService = pgoosService;
    }
}

