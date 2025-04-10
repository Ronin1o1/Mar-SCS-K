package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.rateproduct.RateProductDataView;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public class BaseProductDefinitionFinishController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseProductDefinitionFinishController.class);
    @Autowired
    private RateProductService rateProductService = null;

    public BaseProductDefinitionFinishController() {
        super();
    }

    @Autowired
    public BaseProductDefinitionFinishController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
    }

    public String getProductDefinitionFinish(String marshaCode, String brandCode, String productCode, String level,String entryLevel) throws Exception {
        RateProductDataView rateProductDataView = null;
        try {
            if (brandCode==null || brandCode.equals(""))
                brandCode=getRateProductService().getHotelBrands(marshaCode);
             //entryLevel ="Hotel";
            rateProductDataView=rateProductService.getDataForDefinition(marshaCode, brandCode, productCode, level, "0000");
            return gsonStream(rateProductDataView);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String updateFinishProduct() throws Exception {
        try {
            return SUCCESS;
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
