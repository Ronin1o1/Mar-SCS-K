package com.marriott.rfp.object.pricing.mudroom;

import java.io.Serializable;

public class SalesMudroomHotelAccount implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long  accountID;
	private String accountname="";
	private String email="";
	private String hotelName="";
	private String marshaCode="";
	private String personname="";
	private String phoneNumber="";
	private String pcChecked="";
	/**
	 * @return the accountID
	 */
	public long getAccountID() {
		return accountID;
	}
	/**
	 * @param accountID the accountID to set
	 */
	public void setAccountID(long accountID) {
		this.accountID = accountID;
	}
	/**
	 * @return the accountname
	 */
	public String getAccountname() {
		return accountname;
	}
	/**
	 * @param accountname the accountname to set
	 */
	public void setAccountname(String accountname) {
		this.accountname = accountname;
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
	 * @return the hotelName
	 */
	public String getHotelName() {
		return hotelName;
	}
	/**
	 * @param hotelName the hotelName to set
	 */
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	/**
	 * @return the marshaCode
	 */
	public String getMarshaCode() {
		return marshaCode;
	}
	/**
	 * @param marshaCode the marshaCode to set
	 */
	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}
	/**
	 * @return the personname
	 */
	public String getPersonname() {
		return personname;
	}
	/**
	 * @param personname the personname to set
	 */
	public void setPersonname(String personname) {
		this.personname = personname;
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
	 * @return the pcChecked
	 */
	public String getPcChecked() {
		return pcChecked;
	}
	/**
	 * @param pcChecked the pcChecked to set
	 */
	public void setPcChecked(String pcChecked) {
		this.pcChecked = pcChecked;
	}
	
}
