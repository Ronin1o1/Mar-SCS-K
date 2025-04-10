package com.marriott.rfp.object.pricing.mudroom;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.Account;

public class SalesMudroom implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String areacitycode;
	private String countrycode;
	private String eid;
	private String email;
	private String faxnumber;
	private String mae;  //this applies only for the limited sales user
	private List<Account> linkedAccounts;  //this applies only for the limited sales user
	private List<HotelListData> linkedHotels;  //this applies only for the limited sales user
	private String personname;
	private String persontitle;
	private String phonenumber;
	private List<SalesMudroomHotelAccount> primaryContact;  //this applies only for the limited sales user
	private String[] primaryContact2;
	private List<SalesMudroomHotel> salesHotelSel;
	private List<SalesMudroomHotel> salesHotelNotSel;
	private String[] salesHotelSel2;
	private Long saleslocationid; //taken from the area table type=74 w/o us and international
	private Long salesregionid;  
	private Long salesrespondentid;
	private String salestypeid;  //taken from the account tier table
	

	/**
	 * @return the personName
	 */
	public String getPersonname() {
	    return personname;
	}

	/**
	 * @param personName the personName to set
	 */
	public void setPersonname(String personname) {
	    this.personname = personname;
	}

	/**
	 * @return the personTitle
	 */
	public String getPersontitle() {
	    return persontitle;
	}

	/**
	 * @param personTitle the personTitle to set
	 */
	public void setPersontitle(String persontitle) {
	    this.persontitle = persontitle;
	}

	/**
	 * @return the countryCode
	 */
	public String getCountrycode() {
	    return countrycode;
	}

	/**
	 * @param countryCode the countryCode to set
	 */
	public void setCountrycode(String countrycode) {
	    this.countrycode = countrycode;
	}

	/**
	 * @return the phoneNumber
	 */
	public String getPhonenumber() {
	    return phonenumber;
	}

	/**
	 * @param phoneNumber the phoneNumber to set
	 */
	public void setPhonenumber(String phonenumber) {
	    this.phonenumber = phonenumber;
	}

	/**
	 * @return the faxNumber
	 */
	public String getFaxnumber() {
	    return faxnumber;
	}

	/**
	 * @param faxNumber the faxNumber to set
	 */
	public void setFaxnumber(String faxnumber) {
	    this.faxnumber = faxnumber;
	}

	/**
	 * @return the areaCityCode
	 */
	public String getAreacitycode() {
	    return areacitycode;
	}

	/**
	 * @param areaCityCode the areaCityCode to set
	 */
	public void setAreacitycode(String areacitycode) {
	    this.areacitycode = areacitycode;
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

	/**
	 * @return the isMAE
	 */
	public String getMae() {
		return mae;
	}

	/**
	 * @param isMAE the isMAE to set
	 */
	public void setMae(String mae) {
		this.mae = mae;
	}

	/**
	 * @return the linkedAccounts
	 */
	public List<Account> getLinkedAccounts() {
		return linkedAccounts;
	}

	/**
	 * @param linkedAccounts the linkedAccounts to set
	 */
	public void setLinkedAccounts(List<Account> linkedAccounts) {
		this.linkedAccounts = linkedAccounts;
	}

	/**
	 * @return the linkedHotels
	 */
	public List<HotelListData> getLinkedHotels() {
		return linkedHotels;
	}

	/**
	 * @param linkedHotels the linkedHotels to set
	 */
	public void setLinkedHotels(List<HotelListData> linkedHotels) {
		this.linkedHotels = linkedHotels;
	}

	/**
	 * @return the primaryContact
	 */
	public List<SalesMudroomHotelAccount> getPrimaryContact() {
		return primaryContact;
	}

	/**
	 * @param primaryContact the primaryContact to set
	 */
	public void setPrimaryContact(List<SalesMudroomHotelAccount> primaryContact) {
		this.primaryContact = primaryContact;
	}

	/**
	 * @return the saleshotelsel
	 */
	public List<SalesMudroomHotel> getSalesHotelSel() {
		return salesHotelSel;
	}

	/**
	 * @param saleshotels the saleshotelsel to set
	 */
	public void setSalesHotelSel(List<SalesMudroomHotel> salesHotelSel) {
		this.salesHotelSel = salesHotelSel;
	}

	/**
	 * @return the salesHotelNotSel
	 */
	public List<SalesMudroomHotel> getSalesHotelNotSel() {
		return salesHotelNotSel;
	}

	/**
	 * @param salesHotelNotSel the salesHotelNotSel to set
	 */
	public void setSalesHotelNotSel(List<SalesMudroomHotel> salesHotelNotSel) {
		this.salesHotelNotSel = salesHotelNotSel;
	}

	/**
	 * @return the saleslocationid
	 */
	public Long getSaleslocationid() {
		return saleslocationid;
	}

	/**
	 * @param saleslocationid the saleslocationid to set
	 */
	public void setSaleslocationid(Long saleslocationid) {
		this.saleslocationid = saleslocationid;
	}

	/**
	 * @return the salesregionid
	 */
	public Long getSalesregionid() {
		return salesregionid;
	}

	/**
	 * @param salesregionid the salesregionid to set
	 */
	public void setSalesregionid(Long salesregionid) {
		this.salesregionid = salesregionid;
	}

	/**
	 * @return the salesRespondentid
	 */
	public Long getSalesrespondentid() {
		return salesrespondentid;
	}

	/**
	 * @param salesRespondentid the salesRespondentid to set
	 */
	public void setSalesrespondentid(Long salesrespondentid) {
		this.salesrespondentid = salesrespondentid;
	}

	/**
	 * @return the salestypeid
	 */
	public String getSalestypeid() {
		return salestypeid;
	}

	/**
	 * @param salestypeid the salestypeid to set
	 */
	public void setSalestypeid(String salestypeid) {
		this.salestypeid = salestypeid;
	}

	public void setPrimaryContact2(String[] primaryContact2) {
		this.primaryContact2 = primaryContact2;
	}

	public String[] getPrimaryContact2() {
		return primaryContact2;
	}

	public String[] getSalesHotelSel2() {
		return salesHotelSel2;
	}

	public void setSalesHotelSel2(String[] salesHotelSel2) {
		this.salesHotelSel2 = salesHotelSel2;
	}

}
