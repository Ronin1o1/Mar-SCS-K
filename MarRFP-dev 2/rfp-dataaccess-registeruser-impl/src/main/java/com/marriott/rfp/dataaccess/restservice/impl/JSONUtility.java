package com.marriott.rfp.dataaccess.restservice.impl;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONUtility {

	private final static Logger logger = LoggerFactory.getLogger(RequestCenterController.class);

	/**
	 * @param json
	 * @return
	 * @throws IOException
	 */
	public static AddRequest parseJSON(String json) {
		AddRequest request = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			request = mapper.readValue(json, AddRequest.class);
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage());
		}
		return request;
	}

	/**
	 * Parse an JSON and create and populate the object
	 * 
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public static String parseResponseToJson(SecurityResponse response) throws JsonProcessingException {

		String resJson = null;
		ObjectMapper mapper = new ObjectMapper();
		resJson = mapper.writeValueAsString(response);
		return resJson;

	}
}
