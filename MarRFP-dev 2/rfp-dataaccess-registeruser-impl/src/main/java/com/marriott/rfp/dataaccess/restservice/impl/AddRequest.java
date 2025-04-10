package com.marriott.rfp.dataaccess.restservice.impl;

import java.io.Serializable;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

@JsonTypeInfo(include = As.WRAPPER_OBJECT, use = JsonTypeInfo.Id.NAME)
@JsonIgnoreProperties(ignoreUnknown = true)

public class AddRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonProperty(value = "REQUESTID", required = true)
	protected String requestID;
	@JsonProperty(value = "ACCESSTYPE", required = true)
	protected String accessType;
	@JsonProperty(value = "DELETETYPE", required = true)
	protected String deleteType;
	@JsonProperty(value = "DELETELIST", required = true)
	protected List<String> deleteList;
	@JsonProperty(value = "ADDLIST", required = true)
	protected List<String> addList;
	@JsonProperty(value = "ADDTYPE", required = true)
	protected String addType;
	@JsonProperty(value = "CUSTOMEREID", required = true)
	protected String eid;
	@JsonProperty(value = "CUSTOMEREIDTYPE", required = true)
	protected String customerEIDType;
	@JsonProperty(value = "CUSTOMEREMAIL", required = true)
	protected String email;
	@JsonProperty(value = "CUSTOMERFIRSTNAME", required = true)
	protected String firstName;
	@JsonProperty(value = "CUSTOMERLASTNAME", required = true)
	protected String lastName;
	@JsonProperty(value = "CUSTOMERROLE", required = true)
	protected String customerRole;
	@JsonProperty(value = "CUSTOMERSTATUS", required = true)
	protected String customerstatus;
	@JsonProperty(value = "COMPANYCODE", required = true)
	protected String companycode;
	@JsonProperty(value = "COMPANYNAME", required = true)
	protected String companyname;
	@JsonProperty(value = "EDSROLE", required = true)
	protected String edsRole;
	@JsonProperty(value = "TRANSTYPE", required = true)
	protected String transType;
	@JsonProperty(value = "CUSTOMERPHONE", required = true)
	protected String phone;
	@JsonProperty(value = "CUSTOMERCITY", required = true)
	protected String city;
	@JsonProperty(value = "CUSTOMERCOUNTRY", required = true)
	protected String country;
	@JsonProperty(value = "CUSTOMERSTATE", required = true)
	protected String state;

	public String getrequestID() {
		return requestID;
	}

	public void setREQUESTID(String value) {
		this.requestID = value;
	}

	public String getAccessType() {
		return accessType;
	}

	public void setACCESSTYPE(String accessType) {
		this.accessType = accessType;
	}

	public String getDeleteType() {
		return deleteType;
	}

	public void setDELETETYPE(String deleteType) {
		this.deleteType = deleteType;
	}

	public List<String> getDeleteList() {
		return deleteList;
	}

	public void setDELETELIST(List<String> deleteList) {
		this.deleteList = deleteList;
	}

	public List<String> getAddList() {
		return addList;
	}

	public void setADDLIST(List<String> addList) {
		this.addList = addList;
	}

	public String getAddType() {
		return addType;
	}

	public void setADDTYPE(String addType) {
		this.addType = addType;
	}

	public String getEid() {
		return eid;
	}

	public void setCUSTOMEREID(String eid) {
		this.eid = eid;
	}

	public String getCustomerEIDType() {
		return customerEIDType;
	}

	public void setCustomerEIDType(String customerEIDType) {
		this.customerEIDType = customerEIDType;
	}

	public String getEmail() {
		return email;
	}

	public void setEMAIL(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFIRSTNAME(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLASTNAME(String lastName) {
		this.lastName = lastName;
	}

	public String getgroupname() {
		return customerRole;
	}

	public void setCUSTOMERROLE(String customerRole) {
		this.customerRole = customerRole;
	}

	public String getCustomerStatus() {
		return customerstatus;
	}

	public void setCUSTOMERSTATUS(String customerstatus) {
		this.customerstatus = customerstatus;
	}

	public String getCompanyCode() {
		return companycode;
	}

	public void setCOMPANYCODE(String companycode) {
		this.companycode = companycode;
	}

	public String getCompanyName() {
		return companyname;
	}

	public void setCOMPANYNAME(String companyname) {
		this.companyname = companyname;
	}

	public String getRole() {
		return edsRole;
	}

	public void setEDSROLE(String edsRole) {
		this.edsRole = edsRole;
	}

	public String getTransType() {
		return transType;
	}

	public void setTRANSTYPE(String transType) {
		this.transType = transType;
	}

	public String getPhone() {
		return phone;
	}

	public void setCUSTOMERPHONE(String phone) {
		this.phone = phone;
	}

	public String getCity() {
		return city;
	}

	public void setCUSTOMERCITY(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCUSTOMERCOUNTRY(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setCUSTOMERSTATE(String state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "\n  REQUESTID:" + requestID + ",\n  ACCESSTYPE:" + accessType + ",\n  ADDLIST:" + addList
				+ ",\n  ADDTYPE:" + addType + ",\n  DELETELIST:" + deleteList + ",\n  DELETETYPE:" + deleteType
				+ ",\n  CUSTOMEREID:" + eid + ",\n  CUSTOMEREIDTYPE:" + customerEIDType + ",\n  CUSTOMEREMAIL:" + email
				+ ",\n  CUSTOMERFIRSTNAME:" + firstName + ",\n  CUSTOMERLASTNAME:" + lastName + ",\n  CUSTOMERPHONE:"
				+ phone + ",\n  CUSTOMERCITY:" + city + ",\n  CUSTOMERSTATE:" + state + ",\n  CUSTOMERCOUNTRY:"
				+ country + ",\n  COMPANYCODE:" + companycode + ",\n  COMPANYNAME:" + companyname
				+ ",\n  CUSTOMERSTATUS:" + customerstatus + ",\n  EDSROLE:" + edsRole + ",\n  TRANSTYPE:" + transType;
	}

}

