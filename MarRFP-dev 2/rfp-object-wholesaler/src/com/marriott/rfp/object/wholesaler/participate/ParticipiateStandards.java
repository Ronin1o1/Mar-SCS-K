package com.marriott.rfp.object.wholesaler.participate;

import java.io.Serializable;

public class ParticipiateStandards  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private String prt_participation;
	private String prt_name;
	private String prt_title;
	private String prt_email;
	private String prt_countrycode;
	private String prt_areacode;
	private String prt_phone;
	private String prt_fax;
	
	public String getPrt_participation() {
		return prt_participation;
	}
	
	public void setPrt_participation(String prt_participation) {
		this.prt_participation = prt_participation;
	}
	
	public String getPrt_name() {
		return prt_name;
	}
	
	public void setPrt_name(String prt_name) {
		this.prt_name = prt_name;
	}
	
	public String getPrt_title() {
		return prt_title;
	}
	
	public void setPrt_title(String prt_title) {
		this.prt_title = prt_title;
	}
	
	public String getPrt_email() {
		return prt_email;
	}
	
	public void setPrt_email(String prt_email) {
		this.prt_email = prt_email;
	}
	
	public String getPrt_countrycode() {
		return prt_countrycode;
	}
	
	public void setPrt_countrycode(String prt_countrycode) {
		this.prt_countrycode = prt_countrycode;
	}
	
	public String getPrt_areacode() {
		return prt_areacode;
	}
	
	public void setPrt_areacode(String prt_areacode) {
		this.prt_areacode = prt_areacode;
	}
	
	public String getPrt_phone() {
		return prt_phone;
	}
	
	public void setPrt_phone(String prt_phone) {
		this.prt_phone = prt_phone;
	}
	
	public String getPrt_fax() {
		return prt_fax;
	}
	
	public void setPrt_fax(String prt_fax) {
		this.prt_fax = prt_fax;
	}
	 
}