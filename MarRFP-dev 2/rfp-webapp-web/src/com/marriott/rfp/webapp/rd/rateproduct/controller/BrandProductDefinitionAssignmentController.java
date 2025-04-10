package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM","MFPDBMAR"})
@RestController
@RequestMapping("/rateproductbrandassign")

public class BrandProductDefinitionAssignmentController extends BaseProductDefinitionAssignmentController {

	private static final String LEVEL="Brand";

	public BrandProductDefinitionAssignmentController() {
		super();
	}

	@Autowired
	public BrandProductDefinitionAssignmentController(RateProductService rateProductService) {
		super(rateProductService);
	}

	//execute
	@RequestMapping(value ="/getBrandProductDefinitionAssignment" ,method =GET )
	public String getBrandProductDefinitionAssignment(String marshaCode, String hotelName,String brandCode, String productCode,String level) throws Exception {
		return super.getProductDefinitionAssignment(brandCode,marshaCode, productCode, level);

	}
	@RequestMapping(value = "/getAssignments",method = GET)
	public String getAssignments(String navPage,String marshaCode,String brandCode, String entryLevel,String rpgmCode,String rpgmName) throws Exception {
		if(entryLevel==null||entryLevel=="")
		{
			entryLevel=LEVEL;
		}
		return super.getAssignments(navPage,marshaCode, brandCode, entryLevel, rpgmCode, rpgmName);
	}

	public String updateAssignProduct(String navPage,String marshaCode,String brandCode, String entryLevel,String rpgmCode,String rpgmName) throws Exception {
		if(entryLevel==null||entryLevel=="")
		{
			entryLevel=LEVEL;
		}
        return super.updateAssignProduct(navPage,marshaCode, brandCode, entryLevel, rpgmCode, rpgmName);
    }
}
