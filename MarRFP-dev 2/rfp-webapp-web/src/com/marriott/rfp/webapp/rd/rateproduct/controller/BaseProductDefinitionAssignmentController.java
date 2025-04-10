package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentDataView;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.object.rateproduct.RateProductDataView;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentsSearch;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class BaseProductDefinitionAssignmentController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseProductDefinitionAssignmentController.class);
    @Autowired
    private RateProductService rateProductService = null;

    public BaseProductDefinitionAssignmentController() {
        super();
    }

    public BaseProductDefinitionAssignmentController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
    }

    public String getProductDefinitionAssignment(String brandCode, String marshaCode, String productCode, String level) throws Exception {
        try {
            RateProductDataView rateProductDataView = rateProductService.getDataForDefinition(marshaCode, brandCode, productCode, level, "0000");
            return gsonStream(rateProductDataView);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    public String getAssignments(String navPage, String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName) throws Exception {
        RatePlanAssignmentsSearch ratePlanAssignmentsSearch = new RatePlanAssignmentsSearch();
        try {
            if (ratePlanAssignmentsSearch == null || navPage == null || navPage.equals(RFPConstants.SEARCH))
                ratePlanAssignmentsSearch = new RatePlanAssignmentsSearch();
            else if (navPage != null) {
                if (navPage.equals(RFPConstants.NEXTPAGE)) {
                    ratePlanAssignmentsSearch.setStartKey(ratePlanAssignmentsSearch.getEndKey());
                    ratePlanAssignmentsSearch.setEndKey("");
                    ratePlanAssignmentsSearch.setStartRatePlanCode(ratePlanAssignmentsSearch.getEndRatePlanCode());
                    ratePlanAssignmentsSearch.setEndRatePlanCode("");
                } else if (navPage.equals(RFPConstants.PREVIOUSPAGE)) {
                    ratePlanAssignmentsSearch.setEndKey(ratePlanAssignmentsSearch.getStartKey());
                    ratePlanAssignmentsSearch.setStartKey("");
                    ratePlanAssignmentsSearch.setEndRatePlanCode(ratePlanAssignmentsSearch.getStartRatePlanCode());
                    ratePlanAssignmentsSearch.setStartRatePlanCode("");
                }
            }
            RateProductAssignmentView rateProductAssignmentView = rateProductService.getRatePlanAssignmentList(marshaCode, brandCode, entryLevel, rpgmCode, rpgmName,
                    ratePlanAssignmentsSearch.getStartRatePlanCode(), ratePlanAssignmentsSearch.getEndRatePlanCode(),
                    ratePlanAssignmentsSearch.getStartKey(), ratePlanAssignmentsSearch.getEndKey());

            return gsonStream(rateProductAssignmentView);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    public String updateAssignProduct(String navPage, String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName) throws Exception {
        try {
            // rateProductService.updateRatePlanAssignment(marshaCode, brandCode, productCode, entryLevel, rpaData, getUsername());
            return getAssignments(navPage, marshaCode, brandCode, entryLevel, rpgmCode, rpgmName);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }


    public RateProductService getRateProductService() {
        return rateProductService;
    }

    public void setRateProductService(RateProductService rateProductService) {
        this.rateProductService = rateProductService;
    }


}
