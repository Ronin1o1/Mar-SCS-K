package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.ctc.wstx.util.StringUtil;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM","MFPDBMAR"})
@RestController
@RequestMapping("/rateproductbranddefinition")
public class BrandProductDefinitionController extends BaseProductDefinitionController {

	public BrandProductDefinitionController() {
		super();
		//setEntryLevel("Brand");
	}
	@Autowired
	public BrandProductDefinitionController(RateProductService rateProductService) {
		super(rateProductService);
		//setEntryLevel("Brand");
	}

	@RequestMapping(value ="/getBrandProductDefinition" ,method = GET)
	public String getBrandProductDefinition(String marshaCode,String hotelName,String brandCode,String productCode,String level,String screenid, Boolean readOnly) throws Exception {
		if (brandCode != null && !brandCode.equals("")) {
			//setMarshaCode(marshaCode);
			//setHotelName(hotelName);
			//setEntryLevel("Brand");
			boolean isReadOnly =(readOnly==null)?(getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha()): false;
			return super.getProductDefinition(marshaCode,brandCode, productCode, level, screenid,isReadOnly);
		} else
			return FATAL_ERROR;
	}
	@RequestMapping(value ="/updateDefinition" ,method = POST)
	public String updateDefinition(String marshaCode,String brandCode,String productCode, String productName,String managed,String level,String strRateProductDefinition,  String formChg,String entryLevel) throws Exception {
		 entryLevel=(StringUtils.isEmpty(entryLevel))?"Brand":entryLevel;
		return super.updateDefinition(marshaCode, brandCode, productCode, productName, managed,level,strRateProductDefinition,formChg, entryLevel);
		}

}
