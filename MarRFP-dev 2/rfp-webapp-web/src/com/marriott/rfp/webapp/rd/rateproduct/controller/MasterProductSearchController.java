package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("rateproductmastersearch")
public class MasterProductSearchController extends BaseProductSearchController {

    public MasterProductSearchController() {
        super();
    }

    @Autowired
    public MasterProductSearchController(RateProductService rateProductService) {
        super(rateProductService);
    }

    @RequestMapping(value = "/getMasterProductSearch", method = RequestMethod.GET)
    public String getMasterProductSearch() throws Exception {
        return gsonStream(super.getRateDefinitionList());
    }

    @RequestMapping(value = "/search", method = {RequestMethod.GET, RequestMethod.POST})
    public String search(String marshaCode, String brandCode, String strRateProductSearch) throws Exception {
        String entryLevel= "Master";
        return super.getSearch(marshaCode, brandCode, strRateProductSearch,entryLevel);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update() throws Exception {
        return super.update();
    }

    @RequestMapping(value = "/getQuickViewProduct", method = RequestMethod.GET)
    public String quickViewProduct(String marshaCode, String brandCode, String productCode, String level) throws Exception {
        return super.getQuickViewProduct(marshaCode, brandCode, productCode, level);
    }
}

