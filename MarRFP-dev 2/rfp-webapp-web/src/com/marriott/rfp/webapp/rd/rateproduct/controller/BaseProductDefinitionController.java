package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.rateproduct.RateProductDataView;
import com.marriott.rfp.object.rateproduct.RateProductDefinitionUpdateView;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class BaseProductDefinitionController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseProductDefinitionController.class);
    @Autowired
    private RateProductService rateProductService = null;

    public BaseProductDefinitionController() {
        super();
    }

    @Autowired
    public BaseProductDefinitionController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
    }

    public String getProductDefinition(String marshaCode, String brandCode, String productCode, String level, String screenid, boolean isReadOnly) throws Exception {
        screenid = (StringUtils.isNotEmpty(screenid)) ? screenid : "0000";
        RateProductDataView rateProductDataView = null;
        try {
            rateProductDataView = rateProductService.getDataForDefinition(marshaCode, brandCode, productCode, level, screenid);
            Map<String, Object> info = new HashMap<>();
            info.put("level", level);
            info.put("readOnly", isReadOnly);
            info.put("rateProductDataView", rateProductDataView);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public String updateDefinition(String marshaCode, String brandCode, String productCode, String productName, String managed, String level, String strRateProductDefinition, String formChg, String entryLevel) throws Exception {
        Map<String, RateProductDefinitionUpdateView> rateProductDefinition = null;
        String productCodeResult = productCode;
        String productNameResult = productName;
        try {
            Type collectionType = new TypeToken<Map<String, RateProductDefinitionUpdateView>>() {
            }.getType();
            rateProductDefinition = (Map<String, RateProductDefinitionUpdateView>) fromJson(strRateProductDefinition, collectionType);
            if (formChg.equals("Y")) {
                productCodeResult = rateProductService.updateRateProductDefinition(marshaCode, brandCode, productCode, productName, managed, level, rateProductDefinition, getUsername());
                level = entryLevel;
            }
            if (StringUtils.isNotEmpty(productCodeResult)) {
                productNameResult = productName;
            }

            Map<String, Object> info = new HashMap<>();
            info.put("productName", productNameResult);
            info.put("productCode", productCodeResult);
            info.put("level", level);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setRateProductService(RateProductService rateProductService) {
        this.rateProductService = rateProductService;
    }

    public RateProductService getRateProductService() {
        return rateProductService;
    }


}
