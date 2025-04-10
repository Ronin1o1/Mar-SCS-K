package com.marriott.rfp.dataaccess.restservice.impl;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ModifyResponse {

	@JsonProperty(value = "requestID", required = true)
	protected String requestID;
	@JsonProperty(value = "code", required = true)
	protected String code;
	@JsonProperty(value = "description", required = true)
	protected String description;
	@JsonProperty(value = "comments", required = true)
	protected String comments;

	public String getRequestID() {
		return requestID;
	}

	public void setRequestID(String value) {
		this.requestID = value;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String value) {
		this.code = value;
	}

	public void setDescription(String value) {
		this.description = value;
	}

	public void setComments(String value) {
		this.comments = value;

	}

}
