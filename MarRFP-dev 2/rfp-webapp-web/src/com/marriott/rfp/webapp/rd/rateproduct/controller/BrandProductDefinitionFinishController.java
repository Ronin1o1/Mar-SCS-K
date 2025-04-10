package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM","MFPDBMAR"})
@RestController
@RequestMapping("/rateproductbrandfinish")
public class BrandProductDefinitionFinishController extends BaseProductDefinitionFinishController {

	public BrandProductDefinitionFinishController() {
		super();
		//setEntryLevel("Brand");
	}
	@Autowired
	public BrandProductDefinitionFinishController(RateProductService rateProductService) {
		super(rateProductService);
		//setEntryLevel("Brand");
	}

	//renamed execute
	@RequestMapping(value ="/getBrandProductDefinitionFinish" ,method = GET)
	public String getBrandProductDefinitionFinish(String marshaCode,String hotelName,String brandCode,String productCode,String level) throws Exception {
		/*setMarshaCode(marshaCode);
		setHotelName(hotelName);*/
		String entryLevel="Brand";
		return super.getProductDefinitionFinish(marshaCode,brandCode,productCode,level,entryLevel);
	}
	@RequestMapping(value ="/updateFinishProduct" ,method = POST)
	public String updateFinishProduct() throws Exception {
		return super.updateFinishProduct();
	}

}
