package com.marriott.rfp.object.report;

import java.io.Serializable;

public class ReportModel implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String report_name;
    private String report_title;
    private String is_electronic;
    private String allow_accounttype;
    private String allow_account;
    private String allow_period;
    private String add_params;
    private String req_account;
    private String req_roles;
    private String allow_region;
    private String allow_proximitysubcat;
    private String schedule_time;
    private Long priority;
    private String req_acct_or_region;
    private String req_daterange;
    private String fsale_all_hotels;
    private String allow_account_eligible;
    private String allow_quarter;
    private String acctplan_options;
    private String sale_all_account;
    private String allow_saleslist;
    private String allow_apadminview;
    private String allow_account_solicited;
    private String include_marriott_contact;
    private String allow_onehotel;
    private String allow_eid;
    private String allow_futureopenings;
    private String allow_dateformat;
    private String req_acct_region_brand;
    private String allow_schedule;
    private String allow_cbchotels;
    private String allow_pgoosStatus;
    private Long amenity_count;
    
    public String getReport_name() {
	return report_name;
    }

    public void setReport_name(String report_name) {
	this.report_name = report_name;
    }

    public String getReport_title() {
	return report_title;
    }

    public void setReport_title(String report_title) {
	this.report_title = report_title;
    }

    public String getIs_electronic() {
	return is_electronic;
    }

    public void setIs_electronic(String is_electronic) {
	this.is_electronic = is_electronic;
    }

    public String getAllow_account() {
	return allow_account;
    }

    public void setAllow_account(String allow_account) {
	this.allow_account = allow_account;
    }

    public String getAllow_account_eligible() {
	return allow_account_eligible;
    }

    public void setAllow_account_eligible(String allow_account_eligible) {
	this.allow_account_eligible = allow_account_eligible;
    }

    public String getAllow_account_solicited() {
	return allow_account_solicited;
    }

    public void setAllow_account_solicited(String allow_account_solicited) {
	this.allow_account_solicited = allow_account_solicited;
    }

    public String getAllow_accounttype() {
	return allow_accounttype;
    }

    public void setAllow_accounttype(String allow_accounttype) {
	this.allow_accounttype = allow_accounttype;
    }

    public String getAllow_period() {
	return allow_period;
    }

    public void setAllow_period(String allow_period) {
	this.allow_period = allow_period;
    }

    public String getAllow_region() {
	return allow_region;
    }

    public void setAllow_region(String allow_region) {
	this.allow_region = allow_region;
    }

    public Long getPriority() {
	return priority;
    }

    public void setPriority(Long priority) {
	this.priority = priority;
    }

    public String getReq_account() {
	return req_account;
    }

    public void setReq_account(String req_account) {
	this.req_account = req_account;
    }

    public String getReq_acct_or_region() {
	return req_acct_or_region;
    }

    public void setReq_acct_or_region(String req_acct_or_region) {
	this.req_acct_or_region = req_acct_or_region;
    }

    public String getReq_daterange() {
	return req_daterange;
    }

    public void setReq_daterange(String req_daterange) {
	this.req_daterange = req_daterange;
    }

    public String getReq_roles() {
	return req_roles;
    }

    public void setReq_roles(String req_roles) {
	this.req_roles = req_roles;
    }

    public String getSchedule_time() {
	return schedule_time;
    }

    public void setSchedule_time(String schedule_time) {
	this.schedule_time = schedule_time;
    }

    public String getAdd_params() {
	return add_params;
    }

    public void setAdd_params(String add_params) {
	this.add_params = add_params;
    }

    public String getAllow_proximitysubcat() {
	return allow_proximitysubcat;
    }

    public void setAllow_proximitysubcat(String allow_proximitysubcat) {
	this.allow_proximitysubcat = allow_proximitysubcat;
    }

    public String getFsale_all_hotels() {
	return fsale_all_hotels;
    }

    public void setFsale_all_hotels(String fsale_all_hotels) {
	this.fsale_all_hotels = fsale_all_hotels;
    }

    public String getAllow_quarter() {
	return allow_quarter;
    }

    public void setAllow_quarter(String allow_quarter) {
	this.allow_quarter = allow_quarter;
    }

    public String getAcctplan_options() {
	return acctplan_options;
    }

    public void setAcctplan_options(String acctplan_options) {
	this.acctplan_options = acctplan_options;
    }

    public String getSale_all_account() {
	return sale_all_account;
    }

    public String getAllow_pgoosStatus() {
		return allow_pgoosStatus;
	}

	public void setAllow_pgoosStatus(String allow_pgoosStatus) {
		this.allow_pgoosStatus = allow_pgoosStatus;
	}

	public void setSale_all_account(String sale_all_account) {
	this.sale_all_account = sale_all_account;
    }

    public String getAllow_saleslist() {
	return allow_saleslist;
    }

    public void setAllow_saleslist(String allow_saleslist) {
	this.allow_saleslist = allow_saleslist;
    }

    public String getAllow_apadminview() {
	return allow_apadminview;
    }

    public void setAllow_apadminview(String allow_apadminview) {
	this.allow_apadminview = allow_apadminview;
    }

    public String getInclude_marriott_contact() {
	return include_marriott_contact;
    }

    public void setInclude_marriott_contact(String include_marriott_contact) {
	this.include_marriott_contact = include_marriott_contact;
    }

    public String getAllow_onehotel() {
	return allow_onehotel;
    }

    public void setAllow_onehotel(String allow_onehotel) {
	this.allow_onehotel = allow_onehotel;
    }

    public String getAllow_eid() {
	return allow_eid;
    }

    public void setAllow_eid(String allow_eid) {
	this.allow_eid = allow_eid;
    }


    public String getAllow_futureopenings() {
	return allow_futureopenings;
    }

    public void setAllow_futureopenings(String allow_futureopenings) {
	this.allow_futureopenings = allow_futureopenings;
    }

	public void setAllow_dateformat(String allow_dateformat) {
		this.allow_dateformat = allow_dateformat;
	}

	public String getAllow_dateformat() {
		return allow_dateformat;
	}
	
    public String getReq_acct_region_brand() {
    	return req_acct_region_brand;
    }

    public void setReq_acct_region_brand(String req_acct_region_brand) {
    	this.req_acct_region_brand = req_acct_region_brand;
    }

	public String getAllow_schedule() {
		return allow_schedule;
	}

	public void setAllow_schedule(String allow_schedule) {
		this.allow_schedule = allow_schedule;
	}

	public String getAllow_cbchotels() {
		return allow_cbchotels;
}
	public void setAllow_cbchotels(String allow_cbchotels) {
		this.allow_cbchotels = allow_cbchotels;
	}

	public Long getAmenity_count() {
		return amenity_count;
	}

	public void setAmenity_count(Long amenity_count) {
		this.amenity_count = amenity_count;
	}
	

}