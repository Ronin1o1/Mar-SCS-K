package com.marriott.rfp.dataaccess.restservice.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.core.JsonProcessingException;

public class RequestCenterJSONResponse {

	private final static Logger logger = LoggerFactory.getLogger(RequestCenterJSONResponse.class);

	public static String generateResponse(SecurityResponse response) {

		String ResponseJSON;
		try {
			ResponseJSON = JSONUtility.parseResponseToJson(response);
			return ResponseJSON;
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage());
			return null;
		}
	}

}
