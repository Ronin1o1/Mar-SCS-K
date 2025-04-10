package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthotelsearch")
public class HotelProductSearchController extends BaseProductSearchController {

    public HotelProductSearchController() {
        super();
    }

    @Autowired
    public HotelProductSearchController(RateProductService rateProductService) {
        super(rateProductService);
    }

    @RequestMapping(value = "/getHotelProductSearch", method = RequestMethod.GET)
    public String getHotelProductSearch(String strBrandCode,String marshaCode) throws Exception {
        String brandCode=strBrandCode;
        if (strBrandCode == null || strBrandCode.equals(""))
            brandCode=getRateProductService().getHotelBrands(marshaCode);
        Map<String, Object> info = new HashMap<>();
        info.put("brandCode",brandCode);
        info.put("rateProductDefinitionLists" ,super.getRateDefinitionList());
        return  gsonStream(info);
    }

    @RequestMapping(value = "/search", method = {RequestMethod.GET, RequestMethod.POST})
    public String search(String marshaCode, String brandCode, String strRateProductSearch) throws Exception {
        String entryLevel= "Hotel";
        return super.getSearch(marshaCode, brandCode, strRateProductSearch,entryLevel);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update() throws Exception {
        return super.update();
    }

    @RequestMapping(value = "/quickViewProduct", method = RequestMethod.GET)
    public String quickViewProduct(String marshaCode, String brandCode, String productCode, String level) throws Exception {
        return super.getQuickViewProduct(marshaCode, brandCode, productCode, level);
    }
}
