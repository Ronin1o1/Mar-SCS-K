package com.marriott.rfp.dataaccess.restservice.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/requestcenter/user")

public class RequestCenterController {

	@Autowired
	private UserRegistrationImpl userRegistrationImpl;
	private static final Logger logger = LoggerFactory.getLogger(RequestCenterController.class);

	@RequestMapping(value = "", method = RequestMethod.POST)
	public @ResponseBody String userRegistration(@RequestBody String modifyRequest) {
		logger.info("MarRFP registration");
		String response = null;
		try {
			AddRequest request = JSONUtility.parseJSON(modifyRequest);
			response = userRegistrationImpl.userRegistration(request);

		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		logger.info("JSON Response" + response);
		return response;
	}

}
