package com.marriott.marrfp.batch.core;

import java.io.Serializable;
import java.util.List;

public class HotelSolicitationEmail implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String accountname;
	private String accountPricingType;
	private String accounturl;
	private String additionalText="";
	private String freeFormText="";
	private String adminEmail="";
	private String adminName="";
	private String btamContact;
	private String btamContactEmail;
	private String duedate;
	private String globalContact;
	private String globalContactEmail;
	private String hotelname;
	private String maeContact;
	private String maeContactEmail;
	private String marshacode;
	private Long period;
	private String salesContact;
	private String salesContactEmail;
	private String sendBCC;
	private String sendFrom;
	private List<String> sendTo;
	private List<String> sendCC;
	private String siteUrl;
	private List<String> accountQuestions;
	private List<String> hotelRespondents;
	private Long sendfromtype;
	private String pricingContactsUrl;
	
	public String getPricingContactsUrl() {
        return pricingContactsUrl;
    }
    public void setPricingContactsUrl(String pricingContactsUrl) {
        this.pricingContactsUrl = pricingContactsUrl;
    }
	public String getAccountname() {
	    return accountname;
	}
	public void setAccountname(String accountname) {
	    this.accountname = accountname;
	}
	public String getAccountPricingType() {
	    return accountPricingType;
	}
	public void setAccountPricingType(String accountPricingType) {
	    this.accountPricingType = accountPricingType;
	}
	public String getAccounturl() {
	    return accounturl;
	}
	public void setAccounturl(String accounturl) {
	    this.accounturl = accounturl;
	}
	public String getAdditionalText() {
	    return additionalText;
	}
	public void setAdditionalText(String additionalText) {
	    this.additionalText = additionalText;
	}
	public String getFreeFormText() {
	    return freeFormText;
	}
	public void setFreeFormText(String freeFormText) {
	    this.freeFormText = freeFormText;
	}
	public String getAdminEmail() {
	    return adminEmail;
	}
	public void setAdminEmail(String adminEmail) {
	    this.adminEmail = adminEmail;
	}
	public String getAdminName() {
	    return adminName;
	}
	public void setAdminName(String adminName) {
	    this.adminName = adminName;
	}
	public String getBtamContact() {
	    return btamContact;
	}
	public void setBtamContact(String btamContact) {
	    this.btamContact = btamContact;
	}
	public String getBtamContactEmail() {
	    return btamContactEmail;
	}
	public void setBtamContactEmail(String btamContactEmail) {
	    this.btamContactEmail = btamContactEmail;
	}
	public String getDuedate() {
	    return duedate;
	}
	public void setDuedate(String duedate) {
	    this.duedate = duedate;
	}
	public String getGlobalContact() {
	    return globalContact;
	}
	public void setGlobalContact(String globalContact) {
	    this.globalContact = globalContact;
	}
	public String getGlobalContactEmail() {
	    return globalContactEmail;
	}
	public void setGlobalContactEmail(String globalContactEmail) {
	    this.globalContactEmail = globalContactEmail;
	}
	public String getHotelname() {
	    return hotelname;
	}
	public void setHotelname(String hotelname) {
	    this.hotelname = hotelname;
	}
	public String getMaeContact() {
	    return maeContact;
	}
	public void setMaeContact(String maeContact) {
	    this.maeContact = maeContact;
	}
	public String getMaeContactEmail() {
	    return maeContactEmail;
	}
	public void setMaeContactEmail(String maeContactEmail) {
	    this.maeContactEmail = maeContactEmail;
	}
	public String getMarshacode() {
	    return marshacode;
	}
	public void setMarshacode(String marshacode) {
	    this.marshacode = marshacode;
	}
	public Long getPeriod() {
	    return period;
	}
	public void setPeriod(Long period) {
	    this.period = period;
	}
	public String getSalesContact() {
	    return salesContact;
	}
	public void setSalesContact(String salesContact) {
	    this.salesContact = salesContact;
	}
	public String getSalesContactEmail() {
	    return salesContactEmail;
	}
	public void setSalesContactEmail(String salesContactEmail) {
	    this.salesContactEmail = salesContactEmail;
	}
	public String getSendBCC() {
	    return sendBCC;
	}
	public void setSendBCC(String sendBCC) {
	    this.sendBCC = sendBCC;
	}
	public String getSendFrom() {
	    return sendFrom;
	}
	public void setSendFrom(String sendFrom) {
	    this.sendFrom = sendFrom;
	}
	public List<String> getSendTo() {
	    return sendTo;
	}
	public void setSendTo(List<String> sendTo) {
	    this.sendTo = sendTo;
	}
	public List<String> getSendCC() {
	    return sendCC;
	}
	public void setSendCC(List<String> sendCC) {
	    this.sendCC = sendCC;
	}
	public String getSiteUrl() {
	    return siteUrl;
	}
	public void setSiteUrl(String siteUrl) {
	    this.siteUrl = siteUrl;
	}
	public List<String> getAccountQuestions() {
	    return accountQuestions;
	}
	public void setAccountQuestions(List<String> accountQuestions) {
	    this.accountQuestions = accountQuestions;
	}
	public List<String> getHotelRespondents() {
	    return hotelRespondents;
	}
	public void setHotelRespondents(List<String> hotelRespondents) {
	    this.hotelRespondents = hotelRespondents;
	}
	public void setSendfromtype(Long sendfromtype) {
		this.sendfromtype = sendfromtype;
	}
	public Long getSendfromtype() {
		return sendfromtype;
	}
	
	
}
