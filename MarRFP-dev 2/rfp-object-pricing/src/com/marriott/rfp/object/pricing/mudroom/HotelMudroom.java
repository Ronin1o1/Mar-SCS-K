package com.marriott.rfp.object.pricing.mudroom;

import java.io.Serializable;

public class HotelMudroom implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelRespondentid;
	private String personName="";
	private String personTitle="";
	private String countryCode="";
	private String phoneNumber="";
	private String faxNumber="";
	private String areaCityCode="";
	private String email="";
	private String eid="";

	/**
	 * @return the hotelRespondentid
	 */
	public Long getHotelRespondentid() {
	    return hotelRespondentid;
	}

	/**
	 * @param hotelRespondentid the hotelRespondentid to set
	 */
	public void setHotelRespondentid(Long hotelRespondentid) {
	    this.hotelRespondentid = hotelRespondentid;
	}

	/**
	 * @return the personName
	 */
	public String getPersonName() {
	    return personName;
	}

	/**
	 * @param personName the personName to set
	 */
	public void setPersonName(String personName) {
	    this.personName = personName;
	}

	/**
	 * @return the personTitle
	 */
	public String getPersonTitle() {
	    return personTitle;
	}

	/**
	 * @param personTitle the personTitle to set
	 */
	public void setPersonTitle(String personTitle) {
	    this.personTitle = personTitle;
	}

	/**
	 * @return the countryCode
	 */
	public String getCountryCode() {
	    return countryCode;
	}

	/**
	 * @param countryCode the countryCode to set
	 */
	public void setCountryCode(String countryCode) {
	    this.countryCode = countryCode;
	}

	/**
	 * @return the phoneNumber
	 */
	public String getPhoneNumber() {
	    return phoneNumber;
	}

	/**
	 * @param phoneNumber the phoneNumber to set
	 */
	public void setPhoneNumber(String phoneNumber) {
	    this.phoneNumber = phoneNumber;
	}

	/**
	 * @return the faxNumber
	 */
	public String getFaxNumber() {
	    return faxNumber;
	}

	/**
	 * @param faxNumber the faxNumber to set
	 */
	public void setFaxNumber(String faxNumber) {
	    this.faxNumber = faxNumber;
	}

	/**
	 * @return the areaCityCode
	 */
	public String getAreaCityCode() {
	    return areaCityCode;
	}

	/**
	 * @param areaCityCode the areaCityCode to set
	 */
	public void setAreaCityCode(String areaCityCode) {
	    this.areaCityCode = areaCityCode;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
	    return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
	    this.email = email;
	}

	/**
	 * @return the eid
	 */
	public String getEid() {
	    return eid;
	}

	/**
	 * @param eid the eid to set
	 */
	public void setEid(String eid) {
	    this.eid = eid;
	}

}
