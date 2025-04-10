package com.marriott.rfp.webapp.pricing.registration.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({ "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPAPADM"})
@RestController
@RequestMapping("/aaeAccountList")

public class AAEAccountListController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(AAEAccountListController.class);
	@Autowired
	private MudroomService mudroomService = null;

    public AAEAccountListController() {
        super();
    }

	@Autowired
	public AAEAccountListController(MudroomService mudroomService) {
		super();
		this.setMudroomService(mudroomService);
	}

	@RequestMapping(value = "/getAAEAccountList",method = GET)
	public String getAAEAccountList(String eid) throws Exception {
		try {

            List<Account> accountForUser = mudroomService.getSalesUserAccountList(eid);
            return objectMapperStream(accountForUser);


		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}
	@RequestMapping(value = "/fetchPhoneNumber",method = GET)
    public String fetchPhoneNumber(String eid) throws Exception{
		try {

			String phoneNumber = mudroomService.getUserPhoneNumber(eid);
			String emailAddress = mudroomService.getUserEmailAddress(eid);
			Map<String, Object> info = new HashMap<>();
			info.put("phoneNumber", phoneNumber);
			info.put("emailAddress", emailAddress);
			return objectMapperStream(info);

	} catch (Exception e)
		{
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
	    }

    }
	public void setMudroomService(MudroomService mudroomService) {
		this.mudroomService = mudroomService;
	}

	public MudroomService getMudroomService() {
		return mudroomService;
	}

}

