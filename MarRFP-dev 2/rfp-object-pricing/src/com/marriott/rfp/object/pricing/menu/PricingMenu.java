package com.marriott.rfp.object.pricing.menu;

import java.io.Serializable;

public class PricingMenu implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String statusid;
	private int screenid;
	private String screenname;
	private long screensequence;
	private String actionstruts;
	private String message="";

	public String getStatusid() {
		return statusid;
	}
	public void setStatusid(String statusid) {
		this.statusid = statusid;
	}
	public int getScreenid() {
		return screenid;
	}
	public void setScreenid(int screenid) {
		this.screenid = screenid;
	}
	public String getScreenname() {
		return screenname;
	}
	public void setScreenname(String screenname) {
		this.screenname = screenname;
	}
	public long getScreensequence() {
		return screensequence;
	}
	public void setScreensequence(long screensequence) {
		this.screensequence = screensequence;
	}

	public void setMessage(String message) {
		if (message == null)
			this.message="";
		else
			this.message = message;
	}
	public String getMessage() {
		return message;
	}
	public void setActionstruts(String actionstruts) {
		this.actionstruts = actionstruts;
	}
	public String getActionstruts() {
		return actionstruts;
	}
	
}
