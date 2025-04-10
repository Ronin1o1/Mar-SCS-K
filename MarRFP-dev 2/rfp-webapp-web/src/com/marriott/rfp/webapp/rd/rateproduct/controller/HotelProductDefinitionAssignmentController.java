package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthotelassign")
public class HotelProductDefinitionAssignmentController extends BaseProductDefinitionAssignmentController {

    private static final String LEVEL="Hotel";
    public HotelProductDefinitionAssignmentController() {
        super();
    }

    @Autowired
    public HotelProductDefinitionAssignmentController(RateProductService rateProductService) {
        super(rateProductService);
    }

    @RequestMapping(value = "/getHotelProductDefinitionAssignment", method = RequestMethod.GET)
    public String getHotelProductDefinitionAssignment(String brandCode, String marshaCode, String productCode, String level) throws Exception {
        if (brandCode == null || brandCode.equals(""))
            brandCode = getRateProductService().getHotelBrands(marshaCode);
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

