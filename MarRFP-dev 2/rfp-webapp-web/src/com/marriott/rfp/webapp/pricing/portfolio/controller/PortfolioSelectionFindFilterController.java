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
@RequestMapping("/portfolioselectionfindfilter")

public class PortfolioSelectionFindFilterController extends BaseFindFilterController {

    private static final Logger log = LoggerFactory.getLogger(PortfolioSelectionFindFilterController.class);

    public PortfolioSelectionFindFilterController() {
        super();
    }

    @RequestMapping(value = "/getPortfolioSelectionFindFilter", method = GET)
    public String getPortfolioSelectionFindFilter() {
        Boolean bcanSearchDoubleFrame = true;
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
