package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.object.rateproduct.RateProductMenu;
import com.marriott.rfp.object.rateproduct.RateProductSearch;
import com.marriott.rfp.object.rateproduct.RateProductView;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public class BaseProductSearchController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseProductSearchController.class);
    @Autowired
    private RateProductService rateProductService = null;

    public BaseProductSearchController() {
        super();
    }

    @Autowired
    public BaseProductSearchController(RateProductService rateProductService) {
        super();
        this.rateProductService = rateProductService;
    }

    public RateProductDefinitionLists getRateDefinitionList() throws Exception {
        RateProductDefinitionLists rateProductDefinitionLists = null;
        try {
            rateProductDefinitionLists = rateProductService.getDataDictionaryForSearch();
        } catch (Exception e) {
            log.error(e.getMessage(),e);

        }
        return rateProductDefinitionLists;
    }

    public String update() throws Exception {
        try {
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public String getSearch(String marshaCode, String brandCode, String strRateProductSearch,String entryLevel) throws Exception {
        RateProductSearch rateProductSearch= null;
        RateProductDefinitions[] rateProductDefinitions=null;
        String searchFirstProductResult = "";
        String nendProductResult= "";
        int nav=0;
        try {
            if (StringUtils.isNotEmpty(strRateProductSearch)) {
                rateProductSearch = fromJson(strRateProductSearch, RateProductSearch.class);

            }

            if (rateProductSearch == null) {
                rateProductSearch = new RateProductSearch();

            }//Added from controller
            rateProductDefinitions = rateProductService.getRateProductDefinitionsList(marshaCode, brandCode, rateProductSearch);
            if(rateProductDefinitions != null){
                searchFirstProductResult = rateProductDefinitions[nav].getProductCode();
                nendProductResult = rateProductDefinitions[rateProductDefinitions.length - 1].getProductCode();
            }
            Map<String, Object> info = new HashMap<>();
            info.put("brandCode", brandCode);
            info.put("marshaCode",marshaCode);
            info.put("entryLevel",entryLevel);
            info.put("rateProductDef", rateProductDefinitions);
            info.put("searchFirstProduct",searchFirstProductResult);
            info.put("nendProduct",nendProductResult);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public String getQuickViewProduct(String marshaCode, String brandCode, String productCode, String level) throws Exception {
        RateProductView productView=null;
        try {
            productView = rateProductService.getDataForView(marshaCode, brandCode, productCode, level);

            Map<String, Object> info = new HashMap<>();
            info.put("productView", productView);
            info.put("marshaCode", marshaCode);
            info.put("brandCode", brandCode);
            info.put("productCode", productCode);
            info.put("level", level);
            return objectMapperStream(info);
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

