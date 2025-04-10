package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.filterLists.FindFilterOption;
import com.marriott.rfp.webapp.common.controller.BaseFindFilterController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/cbcstatusfindfilter")

public class CBCStatusFindFilterController extends BaseFindFilterController {

    private static final Logger log = LoggerFactory.getLogger(CBCStatusFindFilterController.class);
    public CBCStatusFindFilterController() {
        super();
    }

    @RequestMapping(value = "/getCBCStatusFindFilter", method = GET)
    public String getCBCStatusFindFilter() {
        List<FindFilterOption> findList = new Vector<FindFilterOption>(5);
        findList.add(new FindFilterOption("Marshacode", 0L));
        findList.add(new FindFilterOption("Name", 1L));
        findList.add(new FindFilterOption("City", 16L));
        findList.add(new FindFilterOption("State", 17L));
        findList.add(new FindFilterOption("Country", 18L));
        try {
            return objectMapperStream(findList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}
