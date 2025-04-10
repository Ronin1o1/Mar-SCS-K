package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM","MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthoteldefinition")
public class HotelProductDefinitionController extends BaseProductDefinitionController {

	public HotelProductDefinitionController() {
		super();
	}

	@Autowired
	public HotelProductDefinitionController(RateProductService rateProductService) {
		super(rateProductService);
		//setEntryLevel("Hotel");
	}

	@RequestMapping(value = "/getHotelProductDefinition", method = RequestMethod.GET)
	public String getHotelProductDefinition(String marshaCode, String brandCode, String productCode, String level, String screenid, Boolean readOnly ) throws Exception {
		boolean isReadOnly =(readOnly==null)?(getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha()): false;
		return super.getProductDefinition(marshaCode, brandCode, productCode, level, screenid,isReadOnly);

	}

	@RequestMapping(value = "/updateDefinition", method = RequestMethod.POST)
	public String updateDefinition(String marshaCode, String brandCode, String productCode, String productName, String managed, String level, String strRateProductDefinition, String formChg,String entryLevel) throws Exception {
		entryLevel=(StringUtils.isEmpty(entryLevel))?"Hotel":entryLevel;
		return super.updateDefinition(marshaCode, brandCode, productCode, productName, managed, level, strRateProductDefinition, formChg, entryLevel);
	}
}
