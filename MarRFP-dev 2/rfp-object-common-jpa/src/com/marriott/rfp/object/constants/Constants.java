package com.marriott.rfp.object.constants;

import java.io.Serializable;

/**
 * Entity implementation class for Entity: Constants
 *
 */

public class Constants implements Serializable {

	private String constant_name;
	private String constant_value;
	private static final long serialVersionUID = 1L;

	public Constants() {
		super();
	}   
	public String getConstant_name() {
		return this.constant_name;
	}

	public void setConstant_name(String constant_name) {
		this.constant_name = constant_name;
	}   
	public String getConstant_value() {
		return this.constant_value;
	}

	public void setConstant_value(String constant_value) {
		this.constant_value = constant_value;
	}
   
}
