package com.marriott.rfp.object.pricing.mudroom;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountmarketregion.AccountMarketRegion;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;

public class AdminMudroom implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long adminRespondentid;
	private String personName="";
	private String personTitle="";
	private String countryCode="";
	private String phoneNumber="";
	private String faxNumber="";
	private String areaCityCode="";
	private String email="";
	private String eid="";
	private Long adminLocationid;
	private List<AccountMarketRegion> acctMktRgnSel;
	private String[] acctMktRgnSel2;
	private List<AccountMarketRegion> acctMktRgnNotSel;
	private Date last_updatedate;
	private List<AccountSegment> salesTypesSel;
	private String[] salesTypesSel2;
	private List<AccountSegment> salesTypesNotSel;
	private List<Account> primeAccountSel;
	private String[] primeAccountSel2;
	private List<Account> secAccountSel;
	private String[] secAccountSel2;
	private List<Account> primeAccountNotSel;
	private List<Account> secAccountNotSel;
	
	public void setAcctMktRgnSel(List<AccountMarketRegion> acctMktRgnSel) {
		this.acctMktRgnSel = acctMktRgnSel;
	}

	public List<AccountMarketRegion> getAcctMktRgnSel() {
		return acctMktRgnSel;
	}

	/**
	 * @return the acctMktRgnNotSel
	 */
	public List<AccountMarketRegion> getAcctMktRgnNotSel() {
		return acctMktRgnNotSel;
	}

	/**
	 * @param acctMktRgnNotSel the acctMktRgnNotSel to set
	 */
	public void setAcctMktRgnNotSel(List<AccountMarketRegion> acctMktRgnNotSel) {
		this.acctMktRgnNotSel = acctMktRgnNotSel;
	}

	/**
	 * @return the adminRespondentid
	 */
	public Long getAdminRespondentid() {
	    return adminRespondentid;
	}

	/**
	 * @param adminRespondentid the adminRespondentid to set
	 */
	public void setAdminRespondentid(Long adminRespondentid) {
	    this.adminRespondentid = adminRespondentid;
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

	/**
	 * @return the location
	 */
	public Long getAdminLocationid() {
	    return adminLocationid;
	}

	/**
	 * @param location the location to set
	 */
	public void setAdminLocationid(Long adminLocationid) {
	    this.adminLocationid = adminLocationid;
	}

	/**
	 * @return the last_updatedate
	 */
	public Date getLast_updatedate() {
	    return last_updatedate;
	}

	/**
	 * @param last_updatedate the last_updatedate to set
	 */
	public void setLast_updatedate(Date last_updatedate) {
	    this.last_updatedate = last_updatedate;
	}

	/**
	 * @return the salesTypesSel
	 */
	public List<AccountSegment> getSalesTypesSel() {
		return salesTypesSel;
	}

	/**
	 * @param salesTypesSel the salesTypesSel to set
	 */
	public void setSalesTypesSel(List<AccountSegment> salesTypesSel) {
		this.salesTypesSel = salesTypesSel;
	}

	/**
	 * @return the salesTypesNotSel
	 */
	public List<AccountSegment> getSalesTypesNotSel() {
		return salesTypesNotSel;
	}

	/**
	 * @param salesTypesNotSel the salesTypesNotSel to set
	 */
	public void setSalesTypesNotSel(List<AccountSegment> salesTypesNotSel) {
		this.salesTypesNotSel = salesTypesNotSel;
	}

	/**
	 * @return the primeAccountNotSel
	 */
	public List<Account> getPrimeAccountNotSel() {
		return primeAccountNotSel;
	}

	/**
	 * @param primeAccountNotSel the primeAccountNotSel to set
	 */
	public void setPrimeAccountNotSel(List<Account> primeAccountNotSel) {
		this.primeAccountNotSel = primeAccountNotSel;
	}

	/**
	 * @return the secAccountNotSel
	 */
	public List<Account> getSecAccountNotSel() {
		return secAccountNotSel;
	}

	/**
	 * @param secAccountNotSel the secAccountNotSel to set
	 */
	public void setSecAccountNotSel(List<Account> secAccountNotSel) {
		this.secAccountNotSel = secAccountNotSel;
	}

	/**
	 * @return the primeAccountSel
	 */
	public List<Account> getPrimeAccountSel() {
		return primeAccountSel;
	}

	/**
	 * @param primeAccountSel the primeAccountSel to set
	 */
	public void setPrimeAccountSel(List<Account> primeAccountSel) {
		this.primeAccountSel = primeAccountSel;
	}

	/**
	 * @return the secAccountSel
	 */
	public List<Account> getSecAccountSel() {
		return secAccountSel;
	}

	/**
	 * @param secAccountSel the secAccountSel to set
	 */
	public void setSecAccountSel(List<Account> secAccountSel) {
		this.secAccountSel = secAccountSel;
	}

	public void setSalesTypesSel2(String[] salesTypesSel2) {
		this.salesTypesSel2 = salesTypesSel2;
	}

	public String[] getSalesTypesSel2() {
		return salesTypesSel2;
	}

	public String[] getAcctMktRgnSel2() {
		return acctMktRgnSel2;
	}

	public void setAcctMktRgnSel2(String[] acctMktRgnSel2) {
		this.acctMktRgnSel2 = acctMktRgnSel2;
	}

	public String[] getPrimeAccountSel2() {
		return primeAccountSel2;
	}

	public void setPrimeAccountSel2(String[] primeAccountSel2) {
		this.primeAccountSel2 = primeAccountSel2;
	}

	public String[] getSecAccountSel2() {
		return secAccountSel2;
	}

	public void setSecAccountSel2(String[] secAccountSel2) {
		this.secAccountSel2 = secAccountSel2;
	}

}
