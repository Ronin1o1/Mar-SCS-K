package com.marriott.rfp.webapp.rd.rateproduct.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("rateproducthotelfinish")
public class HotelProductDefinitionFinishController extends BaseProductDefinitionFinishController {

    public HotelProductDefinitionFinishController() {
        super();
    }

    public HotelProductDefinitionFinishController(RateProductService rateProductService) {
        super(rateProductService);
        //setEntryLevel("Hotel");
    }

	@RequestMapping(value = "/getHotelProductDefinitionFinish", method = RequestMethod.GET)
	public String getHotelProductDefinitionFinish(String marshaCode, String brandCode, String productCode, String level) throws Exception {
		String entryLevel="Hotel";
    	return super.getProductDefinitionFinish(marshaCode, brandCode, productCode, level,entryLevel);
	}

	@RequestMapping(value = "/updateFinishProduct", method = RequestMethod.POST)
	public String updateFinishProduct() throws Exception {
		return super.updateFinishProduct();
	}
}
