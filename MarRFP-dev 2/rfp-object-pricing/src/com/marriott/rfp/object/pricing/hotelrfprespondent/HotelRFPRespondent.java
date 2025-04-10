package com.marriott.rfp.object.pricing.hotelrfprespondent;

import java.io.Serializable;

public class HotelRFPRespondent implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rfprespondentid;
	private long hotelrfpid;
	private String personname;
	private String persontitle;
	private String countrycode;
	private String areacitycode;
	private String phonenumber;
	private String faxnumber;
	private String email;
	private String acceptbtflg;
	private int period;

	public Long getRfprespondentid() {
		return rfprespondentid;
	}

	public void setRfprespondentid(Long rfprespondentid) {
		this.rfprespondentid = rfprespondentid;
	}

	public long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public String getPersonname() {
		return personname;
	}

	public void setPersonname(String personname) {
		this.personname = personname;
	}

	public String getPersontitle() {
		return persontitle;
	}

	public void setPersontitle(String persontitle) {
		this.persontitle = persontitle;
	}

	public String getCountrycode() {
		return countrycode;
	}

	public void setCountrycode(String countrycode) {
		this.countrycode = countrycode;
	}

	public String getAreacitycode() {
		return areacitycode;
	}

	public void setAreacitycode(String areacitycode) {
		this.areacitycode = areacitycode;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getFaxnumber() {
		return faxnumber;
	}

	public void setFaxnumber(String faxnumber) {
		this.faxnumber = faxnumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getAcceptbtflg() {
		return acceptbtflg;
	}

	public void setAcceptbtflg(String acceptbtflg) {
		this.acceptbtflg = acceptbtflg;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

}
