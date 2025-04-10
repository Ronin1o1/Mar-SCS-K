package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.object.region.ReportingRegion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/reportingregionlist")
public class ReportingRegionListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(ReportingRegionListController.class);
    @Autowired
    private ListsService listService = null;

    public ReportingRegionListController() {
        super();
    }

    @Autowired
    public ReportingRegionListController(ListsService listService) {
        super();
        this.listService = listService;
    }

    @RequestMapping(value = "/getRegions", method = GET)
    public String getRegions() throws Exception {
        try {
            List<ReportingRegion> regionList = listService.getAllReportingRegions();
            return objectMapperStream(regionList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
