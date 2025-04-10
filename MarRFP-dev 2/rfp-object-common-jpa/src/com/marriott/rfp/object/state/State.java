package com.marriott.rfp.object.state;

import java.io.Serializable;

public class State implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String state;
	private String statename;

	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

	public void setStatename(String statename) {
		this.statename = statename;
	}

	public String getStatename() {
		return statename;
	}

}
