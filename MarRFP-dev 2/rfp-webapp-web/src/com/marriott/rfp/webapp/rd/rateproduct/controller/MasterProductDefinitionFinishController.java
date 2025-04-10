package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RequestMapping(value = "rateproductmasterfinish")
@RestController
public class MasterProductDefinitionFinishController extends BaseProductDefinitionFinishController {

    public MasterProductDefinitionFinishController() {
        super();
    }

    @Autowired
    public MasterProductDefinitionFinishController(RateProductService rateProductService) {
        super(rateProductService);
        //setEntryLevel("Master");
    }

    @RequestMapping(value = "/getMasterProductDefinitionFinish", method = RequestMethod.GET)
    public String getMasterProductDefinitionFinish(String marshaCode, String brandCode, String productCode, String level) throws Exception {
        String entryLevel="Master";
        return super.getProductDefinitionFinish(marshaCode, brandCode, productCode, level,entryLevel);
    }

    @RequestMapping(value = "/updateFinishProduct", method = RequestMethod.POST)
    public String updateFinishProduct() throws Exception {
        return super.updateFinishProduct();
    }
}
