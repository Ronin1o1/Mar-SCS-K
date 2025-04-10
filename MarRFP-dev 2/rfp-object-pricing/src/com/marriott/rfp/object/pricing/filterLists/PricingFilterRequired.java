package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class PricingFilterRequired implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private boolean accountRequired = false;
    private boolean accountSubsetRequired = false;
    private boolean areaRequired = false;
    private boolean brandRequired = false;
    private boolean edieProfileRequired = false;
    private boolean reportListRequired = false;
    private boolean req_acct_or_region = false;
    private boolean yearRequired = false;
    private boolean req_acct_region_brand = false;

    public boolean getAccountRequired() {
	return accountRequired;
    }

    public void setAccountRequired(boolean accountRequired) {
	this.accountRequired = accountRequired;
    }

    public boolean getAccountSubsetRequired() {
	return accountSubsetRequired;
    }

    public void setAccountSubsetRequired(boolean accountSubsetRequired) {
	this.accountSubsetRequired = accountSubsetRequired;
    }

    public boolean getAreaRequired() {
	return areaRequired;
    }

    public void setAreaRequired(boolean areaRequired) {
	this.areaRequired = areaRequired;
    }

    public boolean getBrandRequired() {
	return brandRequired;
    }

    public void setBrandRequired(boolean brandRequired) {
	this.brandRequired = brandRequired;
    }

    public boolean getEdieProfileRequired() {
	return edieProfileRequired;
    }

    public void setEdieProfileRequired(boolean edieProfileRequired) {
	this.edieProfileRequired = edieProfileRequired;
    }

    public boolean getReportListRequired() {
	return reportListRequired;
    }

    public void setReportListRequired(boolean reportListRequired) {
	this.reportListRequired = reportListRequired;
    }

    public boolean getReq_acct_or_region() {
	return req_acct_or_region;
    }

    public void setReq_acct_or_region(boolean req_acct_or_region) {
	this.req_acct_or_region = req_acct_or_region;
    }

    public boolean getYearRequired() {
	return yearRequired;
    }

    public void setYearRequired(boolean yearRequired) {
	this.yearRequired = yearRequired;
    }

    public boolean getReq_acct_region_brand() {
    return req_acct_region_brand;
}
    public void setReq_acct_region_brand(boolean req_acct_region_brand) {
	this.req_acct_region_brand = req_acct_region_brand;
    }
}
