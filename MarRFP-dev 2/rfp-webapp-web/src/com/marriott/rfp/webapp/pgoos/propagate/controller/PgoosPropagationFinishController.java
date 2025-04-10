package com.marriott.rfp.webapp.pgoos.propagate.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pgoos.api.PGOOSPublishService;
import com.marriott.rfp.object.pricing.pgoos.McbStatus;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/pgoospropagationfinish")
public class PgoosPropagationFinishController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(PgoosPropagationFinishController.class);
    @Autowired
    private PGOOSPublishService pgoosPublishService = null;

    public PgoosPropagationFinishController() {
        super();

    }

    @RequestMapping(value = "/getPropagationFinish", method = GET)
    public String getPropagationFinish(Long batchId) throws Exception {
        try {
            McbStatus mcbStatus = pgoosPublishService.getMcbStatus(batchId);
            return objectMapperStream(mcbStatus);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public PGOOSPublishService getPgoosPublishService() {
        return pgoosPublishService;
    }

    public void setPgoosPublishService(PGOOSPublishService pgoosPublishService) {
        this.pgoosPublishService = pgoosPublishService;
    }

}
