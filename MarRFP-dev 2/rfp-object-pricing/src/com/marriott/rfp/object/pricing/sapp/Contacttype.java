package com.marriott.rfp.object.pricing.sapp;

import java.io.Serializable;

public class Contacttype implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long contacttypeid;
	private String contacttypedesc;
	public void setContacttypedesc(String contacttypedesc) {
		this.contacttypedesc = contacttypedesc;
	}
	public String getContacttypedesc() {
		return contacttypedesc;
	}
	public void setContacttypeid(Long contacttypeid) {
		this.contacttypeid = contacttypeid;
	}
	public Long getContacttypeid() {
		return contacttypeid;
	}

	
	
}
