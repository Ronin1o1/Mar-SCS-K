package com.marriott.rfp.object.wholesaler.participate;

import java.io.Serializable;

public class Participiate implements Serializable {

	private static final long serialVersionUID = 1L;
	private long respondentid;
	private long participateid;
	private String person_name;
	private String person_title;
	private String email;
	private String country_code;
	private String area_city_code;
	private String phone_number;
	private String fax_number;
	private String participate;

	public long getRespondentid() {
		return respondentid;
	}
	
	public void setRespondentid(long respondentid) {
		this.respondentid = respondentid;
	}
	
	public long getParticipateid() {
		return participateid;
	}
	
	public void setParticipateid(long participateid) {
		this.participateid = participateid;
	}
	
	public String getParticipate() {
		return participate;
	}
	
	public void setParticipate(String participate) {
		this.participate = participate;
	}
	
	public String getPerson_name() {
		return person_name;
	}
	
	public void setPerson_name(String person_name) {
		this.person_name = person_name;
	}
	
	public String getPerson_title() {
		return person_title;
	}
	
	public void setPerson_title(String person_title) {
		this.person_title = person_title;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getCountry_code() {
		return country_code;
	}
	
	public void setCountry_code(String country_code) {
		this.country_code = country_code;
	}
	
	public String getArea_city_code() {
		return area_city_code;
	}
	
	public void setArea_city_code(String area_city_code) {
		this.area_city_code = area_city_code;
	}
	
	public String getPhone_number() {
		return phone_number;
	}
	
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	
	public String getFax_number() {
		return fax_number;
	}
	
	public void setFax_number(String fax_number) {
		this.fax_number = fax_number;
	}
}