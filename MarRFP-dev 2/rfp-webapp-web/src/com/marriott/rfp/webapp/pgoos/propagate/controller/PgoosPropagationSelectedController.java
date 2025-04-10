package com.marriott.rfp.webapp.pgoos.propagate.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.pgoos.api.PgoosService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintSelected;
import com.marriott.rfp.object.pricing.pgoos.PgoosSelect;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@Security({"MFPADMIN"})
@RestController
@RequestMapping("/pgoospropagationselect")
public class PgoosPropagationSelectedController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(PgoosPropagationSelectedController.class);
    @Autowired
    private PgoosService pgoosService;

    public PgoosPropagationSelectedController() {
        super();

    }

    public PgoosPropagationSelectedController(PgoosService pgoosService) {
        setPgoosService(pgoosService);
    }

    @RequestMapping(value = "/getPGOOSPropagationSelection", method = {GET, POST})
    public String getPGOOSPropagationSelection(String strFilterValues,String initialLoad) throws Exception {
        PricingFilterSelections  filterValues=null;
        initialLoad=(initialLoad==null)?"Y":initialLoad;
        List<PgoosMaintSelected> pgoosList=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            if (initialLoad == "Y" && filterValues == null) {
                pgoosService.deleteMCB();
                initialLoad.equals("N");
            }
            pgoosList = pgoosService.findPgoosSelectedRecsFilteredList(filterValues, getUserProperties());
            return objectMapperStream(pgoosList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/propagate", method = {GET, POST})
    public String propagate(String strFilterValues) throws Exception {
        PricingFilterSelections  filterValues=null;
        Long batchId=null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
            }
            batchId = pgoosService.pgoospropagate(filterValues, getUserProperties(), 1L);
            Map<String, Long> batchIdMap = new HashMap<>();
            batchIdMap.put("batchId", batchId);
            return objectMapperStream(batchIdMap);// in example we are returning success

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/delete", method = {GET, POST})
    public String delete(String strFilterValues,String strPGOOSSelect) throws Exception {
        PricingFilterSelections  filterValues=null;
        List<PgoosSelect> pgoosSelect=null;
        boolean updateOtherList = false;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
            }
            Type collectionType = new TypeToken<List<PgoosSelect>>() {
            }.getType();
            pgoosSelect = (List<PgoosSelect>) fromJson(strPGOOSSelect, collectionType);
            if (filterValues.getDeleteMCB().equals("Y")) {
                pgoosService.deleteMCB();
                filterValues.setDeleteMCB("N");
            }

            if (pgoosSelect != null) {
                pgoosService.deletePgoosMaint(pgoosSelect);
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
