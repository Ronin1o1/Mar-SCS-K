package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.FindFilterOption;
import com.marriott.rfp.webapp.common.controller.BaseFindFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM"})
@RestController
@RequestMapping("pricingreportfilterfindfilter")
public class PricingReportFilterFindFilterController extends BaseFindFilterController {

    private static final Logger log = LoggerFactory.getLogger(PricingReportFilterFindFilterController.class);

    public PricingReportFilterFindFilterController() {
        super();
    }

    @RequestMapping(value = "/getPricingReportFilterFindFilter", method = RequestMethod.GET)
    public String getPricingReportFilterFindFilter() {
        List<FindFilterOption> findList = new Vector<FindFilterOption>(5);
        findList.add(new FindFilterOption("Marshacode", 1L));
        findList.add(new FindFilterOption("Name", 2L));
        findList.add(new FindFilterOption("City", 3L));
        findList.add(new FindFilterOption("State", 4L));
        findList.add(new FindFilterOption("Country", 5L));
        try {
            return objectMapperStream(findList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
}
