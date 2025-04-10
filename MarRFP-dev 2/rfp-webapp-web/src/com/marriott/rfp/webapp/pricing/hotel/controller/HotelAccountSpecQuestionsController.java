package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/hotelaccountspecquestions")
public class HotelAccountSpecQuestionsController extends BaseHotelAccountSpecQuestionsController {
	private static final String CURRENTITEM="hotelaccountspecquestions";

	public HotelAccountSpecQuestionsController() {
		super();
	}

	@Autowired
	public HotelAccountSpecQuestionsController(HotelMenuService hotelMenuService, HotelRFPAccountSpecificService hotelRFPAccountSpecificService,
                                               ConstantsService constantsService, HotelService hotelService, HotelRFPService hotelRFPService) {
		super(hotelMenuService, hotelRFPAccountSpecificService, constantsService, hotelService,  hotelRFPService);
		String returnImg="/image/button/btnReturnAccountCenter.gif";
		String returnAction="/hotelcentralaccountcenter/view.action";
		String updateAction="/hotelaccountspecquestions/updateAnswers.action";
	}

	@RequestMapping(value ="/getHotelAccountSpecQuestions" ,method = GET)
	public String getHotelAccountSpecQuestions(Long hotel_accountinfoid,Long hotelrfpid, long period,String marshaCode,Long rt, @RequestParam(required = false,name = "currentItem",defaultValue = CURRENTITEM) String currentItem) throws Exception {
		if(rt==null)
		{
			rt=0l;
		}
		return super.getHotelAccountSpecQuestions(hotel_accountinfoid,hotelrfpid,period,marshaCode,rt,currentItem);
	}
	@RequestMapping(value ="/updateAnswers" ,method = POST)
	public String updateAnswers(Long hotel_accountinfoid, String strAccountSpecificQandAList, String strAccountSpecificGroupQandAList) throws Exception {
		return super.updateAnswers(hotel_accountinfoid,strAccountSpecificQandAList,strAccountSpecificGroupQandAList);
	}

}
