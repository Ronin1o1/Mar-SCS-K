package com.marriott.rfp.webapp.pgoos.propagate.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pgoos.admin.api.PgoosPropagateProductService;
import com.marriott.rfp.business.pricing.pgoos.api.PgoosService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.pgoos.PgoosLoad;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/pgoospropagationrun")
public class PgoosPropagationRunController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(PgoosPropagationRunController.class);
    @Autowired
    private PgoosService pgoosService;

    @Autowired
    private PgoosPropagateProductService pgoosPropagateProdService;

    public PgoosPropagationRunController() {
        super();

    }

    @Autowired
    public PgoosPropagationRunController(PgoosService pgoosService) {
        setPgoosService(pgoosService);
    }

    @RequestMapping(value = "/getPGOOSPropagationRun", method = GET)
    public String getPGOOSPropagationRun() throws Exception {
        Long totalCount = 0L;
        Long progressCount = 0L;
        Long prodCount = 0L;
        String retval;
        try {
            PgoosLoad pgoosLoad = pgoosService.findPgoosLoad();
            totalCount = pgoosService.getMCBCount();
            progressCount = pgoosService.getMCBCount();
            prodCount = pgoosPropagateProdService.hotelProductSize(0);

            if (!(pgoosLoad.getStatus().equals("LOAD"))) {
                retval = REDIRECT;
            } else {
                retval = SUCCESS;
            }
            Map<String, Object> info = new HashMap<>();
            info.put("prodCount", prodCount);
            info.put("progressCount", progressCount);
            info.put("totalCount", totalCount);
            info.put("pgoosLoad", pgoosLoad);
            info.put("retval", retval);
            return objectMapperStream(info);


        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    //Upgrade-revisit no curl
    @RequestMapping(value = "/batchreset", method = GET)
    public String batchreset(Long batchId) throws Exception {
        try {
            if(batchId==null)
            {
                batchId=0L;
            }
            pgoosService.updatePgoosBatch(batchId, "DONE", "MCBLoad", getUserProperties().getEid());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    //Upgrade-revisit get request not working Null Pointer
    @RequestMapping(value = "/run", method = {GET, POST})
    public String run(String strFilterValues, Long totalCount,Long prodIter) throws Exception {
        PricingFilterSelections filterValues = null;
        Long progressCount = 0L;
        Long batchId = 0L;
        Long prodCount = 0L;
        prodIter = (prodIter==null)?0L:prodIter;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingFilterSelections.class);
            }
            if (totalCount == 0) {
                totalCount = pgoosService.getMCBCount();
            }
            batchId = pgoosService.pgoospropagate(filterValues, getUserProperties(), prodIter);
            PgoosLoad pgoosLoad = pgoosService.findPgoosLoad();
            filterValues.setBatchId(batchId);
            progressCount = pgoosService.getMCBCount();
            Map<String, Object> info = new HashMap<>();
            if (filterValues.getPgoosStatus().equals("P")) {
                prodIter++;
                prodCount = pgoosPropagateProdService.hotelProductSize(prodIter);
                if (prodCount < 0)
                    prodCount = 0L;

            } else
                prodCount = 0L;
            if ((filterValues.getPgoosStatus().equals("D")) || (pgoosLoad.getStatus().equals("DONE"))) {
                info.put("value", "REDIRECT");
            }
            info.put("totalCount", totalCount);
            info.put("prodIter", prodIter);
            info.put("progressCount", progressCount);
            info.put("prodCount", prodCount);
            info.put("batchid", batchId);
            info.put("pgoosLoad", pgoosLoad);
            info.put("filterValues", filterValues);
            return gsonStream(info);
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

    public PgoosPropagateProductService getPgoosPropagateProdService() {
        return pgoosPropagateProdService;
    }

    public void setPgoosPropagateProdService(PgoosPropagateProductService pgoosPropagateProdService) {
        this.pgoosPropagateProdService = pgoosPropagateProdService;
    }

}
