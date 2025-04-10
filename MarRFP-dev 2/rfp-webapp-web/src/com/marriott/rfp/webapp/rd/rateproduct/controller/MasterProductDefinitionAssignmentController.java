package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("rateproductmasterassign")
public class MasterProductDefinitionAssignmentController extends BaseProductDefinitionAssignmentController {

    private static final String LEVEL="Master";

    public MasterProductDefinitionAssignmentController() {
        super();
    }

    @Autowired
    public MasterProductDefinitionAssignmentController(RateProductService rateProductService) {
        super(rateProductService);
    }

    @RequestMapping(value = "/getMasterProductDefinitionAssignment", method = RequestMethod.GET)
    public String getMasterProductDefinitionAssignment(String brandCode, String marshaCode, String productCode, String level) throws Exception {
        return super.getProductDefinitionAssignment(brandCode, marshaCode, productCode, level);
    }

    @RequestMapping(value = "/getAssignments", method = RequestMethod.POST)
    public String getAssignments(String navPage, String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName) throws Exception {
        if(entryLevel==null||entryLevel=="")
        {
            entryLevel=LEVEL;
        }
        return super.getAssignments(navPage, marshaCode, brandCode, entryLevel, rpgmCode, rpgmName);
    }

    @RequestMapping(value = "/updateAssignProduct", method = RequestMethod.POST)
    public String updateAssignProduct(String navPage, String marshaCode, String brandCode, String entryLevel, String rpgmCode, String rpgmName) throws Exception {
        if(entryLevel==null||entryLevel=="")
        {
            entryLevel=LEVEL;
        }
        return super.updateAssignProduct(navPage, marshaCode, brandCode, entryLevel, rpgmCode, rpgmName);
    }
}

