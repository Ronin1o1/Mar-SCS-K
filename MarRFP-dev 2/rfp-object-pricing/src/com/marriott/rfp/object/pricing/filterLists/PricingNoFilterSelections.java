package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class PricingNoFilterSelections implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Long accountrecid;
    private String accountType;
    private String sappModule;
    private String eid;
    private String globalLeaderEID;
    private String marshaCode;
    private Long period;
    private Long proximitySubCatCode;
    private String quarter;
    private String report;
    private String retrieveSubCat;
    private String role;
    private Long regionid;
    private String allnewregistrations;
    private String changeDate;
    private DateRangeFilterValue dateRangeFilter;
    private String exceldateformat="mm/dd/yyyy";
    private PgoosStatus pgoosStatus;
    
    /* Cognos : Email Me functionality starts */
    private String emailMe = "N";
    
    public String getEmailMe() {
		return emailMe;
    }
    public void setEmailMe(String emailMe) {
		this.emailMe = emailMe;
    }
    /* Cognos : Email Me functionality ends */

    public PricingNoFilterSelections() {
    }


    public Long getAccountrecid() {
        return accountrecid;
    }


    public void setAccountrecid(Long accountrecid) {
        this.accountrecid = accountrecid;
    }


    public String getAccountType() {
        return accountType;
    }


    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }


    public String getSappModule() {
        return sappModule;
    }


    public void setSappModule(String sappModule) {
        this.sappModule = sappModule;
    }


    public String getEid() {
        return eid;
    }


    public void setEid(String eid) {
        this.eid = eid;
    }


    public String getGlobalLeaderEID() {
        return globalLeaderEID;
    }


    public void setGlobalLeaderEID(String globalLeaderEID) {
        this.globalLeaderEID = globalLeaderEID;
    }


    public String getMarshaCode() {
        return marshaCode;
    }


    public void setMarshaCode(String marshaCode) {
        this.marshaCode = marshaCode;
    }


    public Long getPeriod() {
        return period;
    }


    public void setPeriod(Long period) {
        this.period = period;
    }


    public Long getProximitySubCatCode() {
        return proximitySubCatCode;
    }


    public void setProximitySubCatCode(Long proximitySubCatCode) {
        this.proximitySubCatCode = proximitySubCatCode;
    }


    public String getQuarter() {
        return quarter;
    }


    public void setQuarter(String quarter) {
        this.quarter = quarter;
    }


    public String getReport() {
        return report;
    }


    public void setReport(String report) {
        this.report = report;
    }


    public String getRetrieveSubCat() {
        return retrieveSubCat;
    }


    public void setRetrieveSubCat(String retrieveSubCat) {
        this.retrieveSubCat = retrieveSubCat;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public void setRegionid(Long regionid) {
	this.regionid = regionid;
    }


    public Long getRegionid() {
	return regionid;
    }


    public void setAllnewregistrations(String allnewregistrations) {
      		this.allnewregistrations = allnewregistrations;
    }


    public String getAllnewregistrations() {
	return allnewregistrations;
    }


    public void setChangeDate(String changeDate) {
	this.changeDate = changeDate;
    }


    public String getChangeDate() {
	return changeDate;
    }

    public void setDateRangeFilter(DateRangeFilterValue dateRangeFilter) {
    	this.dateRangeFilter = dateRangeFilter;
    }

    public DateRangeFilterValue getDateRangeFilter() {
    	return dateRangeFilter;
    }


	public void setExceldateformat(String exceldateformat) {
		this.exceldateformat = exceldateformat;
	}


	public String getExceldateformat() {
		return exceldateformat;
	}


	public PgoosStatus getPgoosStatus() {
		return pgoosStatus;
	}


	public void setPgoosStatus(PgoosStatus pgoosStatus) {
		this.pgoosStatus = pgoosStatus;
	}




}
