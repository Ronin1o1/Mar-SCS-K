package com.marriott.rfp.dataaccess.restservice.impl;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SecurityResponse {

	@JsonProperty(required = true)
	protected ModifyResponse modifyResponse;

	public ModifyResponse getModifyResponse() {
		return modifyResponse;
	}

	public void setModifyResponse(ModifyResponse value) {
		this.modifyResponse = value;
	}

}
