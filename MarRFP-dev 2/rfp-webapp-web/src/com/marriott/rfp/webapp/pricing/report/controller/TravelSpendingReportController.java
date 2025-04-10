package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.webapp.common.controller.BaseReportReadController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("travelspendingreport")
public class TravelSpendingReportController extends BaseReportReadController {

    private static final Logger log = LoggerFactory.getLogger(TravelSpendingReportController.class);
    public TravelSpendingReportController() {
        super();
    }

    @Autowired
    public TravelSpendingReportController(ConstantsService constantsService) {
        super(constantsService);
      //  setReportQueryString("&showTOC=true");
    }

    @RequestMapping(value = "/getTravelSpendingReport", method = RequestMethod.GET)
    public String getTravelSpendingReport(String quarter) throws Exception {
        String reportQueryString ="&showTOC=true";
        String  reportDirectory = "SalesReports";
        try {
            setROI(quarter);
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", reportQueryString);
            info.put("reportDirectory", reportDirectory);
            info.put("reportROI", setROI(quarter));
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private String setROI(String quarter) {
        String roiString = "TravelSpending/TravelSpending_" + quarter + ".ROI";

        return roiString;
    }


}
