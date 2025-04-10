package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("/rateproductbrandsearch")
public class BrandProductSearchController extends BaseProductSearchController {

    public BrandProductSearchController() {
        super();
    }

    @Autowired
    public BrandProductSearchController(RateProductService rateProductService) {
        super(rateProductService);
    }


    @RequestMapping(value = "/getBrandProductSearch", method = GET)
    public String getBrandProductSearch(String marshaCode,String hotelName) throws Exception {
        return gsonStream(super.getRateDefinitionList());
    }

    @RequestMapping(value = "/update", method = POST)
    public String update() throws Exception {
        return super.update();
    }

    @RequestMapping(value = "/search", method = {GET,POST})
    public String search(String marshaCode, String brandCode, String strRateProductSearch) throws Exception {
        String entryLevel= "Brand";
        return super.getSearch(marshaCode, brandCode,strRateProductSearch,entryLevel);
    }

    //Upgrade-revisit no curl not tested
    @RequestMapping(value = "/quickViewProduct", method = GET)
    public String quickViewProduct(String marshaCode, String brandCode, String productCode, String level) throws Exception {
        return super.getQuickViewProduct(marshaCode, brandCode, productCode, level);
    }
}
