package com.marriott.rfp.object.user;

import java.io.Serializable;
import java.util.List;
import java.util.Map;



public class DSUser implements Serializable {

	private int index;
	private String ismae;
	private Long regionid;
	private String franchCode = "";
	private String allhotels = "N";
	private List<Long> regionIds;
	private List<Long> affiliationIds;
	private List<String> franchCodes;
	private Long affiliationid;

	private String role;
	private long cn_userid;
	private String eid;
	private String cn_lastname;
	private String cn_firstname;
	private String cn_mail;
	private String cn_phone;
	private String cn_city;
	private String cn_state;
	private String cn_country;
	private String marshacode;
	private String accountname;
	private String companyname;
	
	private String enhanced_reporting;
	private long acctcount;
	private long marshacount;
	private Long cn_refresh;
	private String name;
	
	private String user_internalnotes;
	private Map<Integer,InternalNotes > internalnotesMap;
	private static final long serialVersionUID = 1L;

	public String getAllhotels() {
		return allhotels;
	}

	public void setAllhotels(String allhotels) {
		this.allhotels = allhotels;
	}

	public DSUser() {
		super();
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String isIsmae() {
		return ismae;
	}

	public void setIsmae(String ismae) {
		this.ismae = ismae;
	}

	public Long getRegionid() {
		return regionid;
	}

	public void setRegionid(Long regionid) {
		this.regionid = regionid;
	}

	public String getRole() {
		return role;
	}

	public void setRole(java.lang.String role) {
		this.role = role;
	}

	public String getFranchCode() {
		return franchCode;
	}

	public void setFranchCode(String franchCode) {
		this.franchCode = franchCode;
	}

	public String getIsmae() {
		return ismae;
	}

	public List<Long> getRegionIds() {
		return regionIds;
	}

	public void setRegionIds(List<Long> regionIds) {
		this.regionIds = regionIds;
	}

	public List<Long> getAffiliationIds() {
		return affiliationIds;
	}

	public void setAffiliationIds(List<Long> affiliationIds) {
		this.affiliationIds = affiliationIds;
	}

	public List<String> getFranchCodes() {
		return franchCodes;
	}

	public void setFranchCodes(List<String> franchCodes) {
		this.franchCodes = franchCodes;
	}

	public long getCn_userid() {
		return cn_userid;
	}

	public void setCn_userid(long cn_userid) {
		this.cn_userid = cn_userid;
	}

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid.toLowerCase();
	}



	public String getCn_lastname() {
		return cn_lastname;
	}

	public void setCn_lastname(String cn_lastname) {
		this.cn_lastname = cn_lastname;
	}

	public String getCn_firstname() {
		return cn_firstname;
	}

	public void setCn_firstname(String cn_firstname) {
		this.cn_firstname = cn_firstname;
	}

	public String getCn_mail() {
		return cn_mail;
	}

	public void setCn_mail(String cn_mail) {
		if (cn_mail ==null)
			cn_mail="";
		this.cn_mail = cn_mail;
	}

	public String getCn_phone() {
		return cn_phone;
	}

	public void setCn_phone(String cn_phone) {
		this.cn_phone = cn_phone;
	}

	public String getCn_city() {
		return cn_city;
	}

	public void setCn_city(String cn_city) {
		if (cn_city ==null)
			cn_city="";
		this.cn_city = cn_city;
	}

	public String getCn_state() {
		return cn_state;
	}

	public void setCn_state(String cn_state) {
		if (cn_state ==null)
			cn_state="";
		this.cn_state = cn_state;
	}

	public String getCn_country() {
		return cn_country;
	}

	public void setCn_country(String cn_country) {
		if (cn_country ==null)
			cn_country="";
		this.cn_country = cn_country;
	}

	public String getMarshacode() {
		return marshacode;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		if (companyname ==null)
			companyname="";
		this.companyname = companyname;
	}

	public String getEnhanced_reporting() {
		return enhanced_reporting;
	}

	public void setEnhanced_reporting(String enhanced_reporting) {
		this.enhanced_reporting = enhanced_reporting;
	}

	public long getMarshacount() {
		return marshacount;
	}

	public void setMarshacount(long marshacount) {
		this.marshacount = marshacount;
	}

	public long getAcctcount() {
		return acctcount;
	}

	public void setAcctcount(long acctcount) {
		this.acctcount = acctcount;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public boolean equals(Object o) {
		if (o instanceof DSUser) {

			DSUser key = (DSUser) o;
			if (getCn_firstname().equalsIgnoreCase(key.getCn_firstname()) && getCn_lastname().equalsIgnoreCase(key.getCn_lastname()) && getCn_mail().equals(key.getCn_mail())
					&& key.getCn_refresh().equals(5L) && getCn_phone().equals(key.getCn_phone()) && getCn_city().equals(key.getCn_city()) && getCn_state().equals(key.getCn_state())
					&& getCn_country().equals(key.getCn_country()) && getRole().equalsIgnoreCase(key.getRole()))
				return true;
			else
				return false;
		}
		return false;
	}

	public void setCn_refresh(Long cn_refresh) {
		this.cn_refresh = cn_refresh;
	}

	public Long getCn_refresh() {
		return cn_refresh;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public Map<Integer, InternalNotes> getInternalnotesMap() {
		return internalnotesMap;
	}

	public void setInternalnotesMap(Map<Integer, InternalNotes> internalnotesMap) {
		this.internalnotesMap = internalnotesMap;
	}

	public String getUser_internalnotes() {
		return user_internalnotes;
	}

	public void setUser_internalnotes(String user_internalnotes) {
		this.user_internalnotes = user_internalnotes;
	}

	
	

}