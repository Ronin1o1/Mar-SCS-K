package com.marriott.rfp.object.pricing.sapp;

import java.util.Date;

import com.marriott.rfp.utility.NumberUtility;

public class BTProfile {

	private String requirecomm;
	private String requirelra;
	private String brandSegPref;
	private Double est_non_us_bus;
	private Double est_ttl_spend;
	private Double est_ttl_rm_nextyr;
	private String est_src_annual_vol;
	private Double annual_trvl_expense;
	private Double annual_airspend;
	private String src_annual_airspend;
	private Double rev;
	private Double rev_chg_lastyear; 
	private Double pct_ttl_rev; 
	private Double mar_ttl_room_nts; 
	private Double pct_ttlrmnts_mar;
	private Double pct_ttlrmnts_ind;
	private Double num_hotelbid;
	private Double num_accptdhotels;
	private Double num_hotel_per_mrdw;
	private Double ttl_hotel_directory;
	private Double directoryshare_pct;
	private Double mar_rewards_mmbrs;
	private String company_internal_code;
	private String co_includedrfp;
	private String pricingvehicle;	
	private String listrate;
	private String sep_stay;
	private Double max_disc_off_fixed;
	private Double max_blackout;
	private Long max_blackout_period;
	private String btOnly;	
	private String aer_account = "N";
	private Long default_percent;
	private Date lastupdate_bt_trans_profile;

	public String getRequirecomm() {
		return requirecomm;
	}
	public void setRequirecomm(String requirecomm) {
		this.requirecomm = requirecomm;
	}
	public String getRequirelra() {
		return requirelra;
	}
	public void setRequirelra(String requirelra) {
		this.requirelra = requirelra;
	}
	public String getBrandSegPref() {
		return brandSegPref;
	}
	public void setBrandSegPref(String brandSegPref) {
		this.brandSegPref = brandSegPref;
	}
	public Double getEst_non_us_bus() {
		return est_non_us_bus;
	}
	public void setEst_non_us_bus(Double est_non_us_bus) {
		this.est_non_us_bus = est_non_us_bus;
	}
	public Double getEst_ttl_spend() {
		return est_ttl_spend;
	}
	public void setEst_ttl_spend(Double est_ttl_spend) {
		this.est_ttl_spend = est_ttl_spend;
	}
	public Double getEst_ttl_rm_nextyr() {
		return est_ttl_rm_nextyr;
	}
	public void setEst_ttl_rm_nextyr(Double est_ttl_rm_nextyr) {
		this.est_ttl_rm_nextyr = est_ttl_rm_nextyr;
	}
	public String getEst_src_annual_vol() {
		return est_src_annual_vol;
	}
	public void setEst_src_annual_vol(String est_src_annual_vol) {
		this.est_src_annual_vol = est_src_annual_vol;
	}
	public Double getAnnual_trvl_expense() {
		return annual_trvl_expense;
	}
	public void setAnnual_trvl_expense(Double annual_trvl_expense) {
		this.annual_trvl_expense = annual_trvl_expense;
	}
	public Double getAnnual_airspend() {
		return annual_airspend;
	}
	public void setAnnual_airspend(Double annual_airspend) {
		this.annual_airspend = annual_airspend;
	}
	public String getSrc_annual_airspend() {
		return src_annual_airspend;
	}
	public void setSrc_annual_airspend(String src_annual_airspend) {
		this.src_annual_airspend = src_annual_airspend;
	}
	public Double getRev() {
		return rev;
	}
	public void setRev(Double rev) {
		this.rev = rev;
	}
	public Double getRev_chg_lastyear() {
		return rev_chg_lastyear;
	}
	public void setRev_chg_lastyear(Double rev_chg_lastyear) {
		this.rev_chg_lastyear = rev_chg_lastyear;
	}
	public Double getPct_ttl_rev() {
		return pct_ttl_rev;
	}
	public void setPct_ttl_rev(Double pct_ttl_rev) {
		this.pct_ttl_rev = pct_ttl_rev;
	}
	public Double getMar_ttl_room_nts() {
		return mar_ttl_room_nts;
	}
	public void setMar_ttl_room_nts(Double mar_ttl_room_nts) {
		this.mar_ttl_room_nts = mar_ttl_room_nts;
	}
	public Double getPct_ttlrmnts_mar() {
		return pct_ttlrmnts_mar;
	}
	public void setPct_ttlrmnts_mar(Double pct_ttlrmnts_mar) {
		this.pct_ttlrmnts_mar = pct_ttlrmnts_mar;
	}
	public Double getPct_ttlrmnts_ind() {
		return pct_ttlrmnts_ind;
	}
	public void setPct_ttlrmnts_ind(Double pct_ttlrmnts_ind) {
		this.pct_ttlrmnts_ind = pct_ttlrmnts_ind;
	}
	public Double getNum_hotelbid() {
		return num_hotelbid;
	}
	public void setNum_hotelbid(Double num_hotelbid) {
		this.num_hotelbid = num_hotelbid;
	}
	public Double getNum_accptdhotels() {
		return num_accptdhotels;
	}
	public void setNum_accptdhotels(Double num_accptdhotels) {
		this.num_accptdhotels = num_accptdhotels;
	}
	public Double getNum_hotel_per_mrdw() {
		return num_hotel_per_mrdw;
	}
	public void setNum_hotel_per_mrdw(Double num_hotel_per_mrdw) {
		this.num_hotel_per_mrdw = num_hotel_per_mrdw;
	}
	public Double getTtl_hotel_directory() {
		return ttl_hotel_directory;
	}
	public void setTtl_hotel_directory(Double ttl_hotel_directory) {
		this.ttl_hotel_directory = ttl_hotel_directory;
	}
	public Double getDirectoryshare_pct() {
		return directoryshare_pct;
	}
	public void setDirectoryshare_pct(Double directoryshare_pct) {
		this.directoryshare_pct = directoryshare_pct;
	}
	public Double getMar_rewards_mmbrs() {
		return mar_rewards_mmbrs;
	}
	public void setMar_rewards_mmbrs(Double mar_rewards_mmbrs) {
		this.mar_rewards_mmbrs = mar_rewards_mmbrs;
	}
	public String getCompany_internal_code() {
		return company_internal_code;
	}
	public void setCompany_internal_code(String company_internal_code) {
		this.company_internal_code = company_internal_code;
	}
	public String getCo_includedrfp() {
		return co_includedrfp;
	}
	public void setCo_includedrfp(String co_includedrfp) {
		this.co_includedrfp = co_includedrfp;
	}
	public String getPricingvehicle() {
		return pricingvehicle;
	}
	public void setPricingvehicle(String pricingvehicle) {
		this.pricingvehicle = pricingvehicle;
	}
	public String getListrate() {
		return listrate;
	}
	public void setListrate(String listrate) {
		this.listrate = listrate;
	}
	public String getSep_stay() {
		return sep_stay;
	}
	public void setSep_stay(String sep_stay) {
		this.sep_stay = sep_stay;
	}
	public Double getMax_disc_off_fixed() {
		return max_disc_off_fixed;
	}
	public void setMax_disc_off_fixed(Double max_disc_off_fixed) {
		this.max_disc_off_fixed = max_disc_off_fixed;
	}
	public Double getMax_blackout() {
		return max_blackout;
	}
	public void setMax_blackout(Double max_blackout) {
		this.max_blackout = max_blackout;
	}
	public Long getMax_blackout_period() {
		return max_blackout_period;
	}
	
	public void setMax_blackout_period(Long max_blackout_period) {
		this.max_blackout_period = max_blackout_period;
	}
	public String getBtOnly() {
		return btOnly;
	}
	public void setBtOnly(String btOnly) {
		this.btOnly = btOnly;
	}
	public String getAer_account() {
		return aer_account;
	}
	public void setAer_account(String aer_account) {
		this.aer_account = aer_account;
	}
	public Long getDefault_percent() {
		return default_percent;
	}
	public void setDefault_percent(Long default_percent) {
		this.default_percent = default_percent;
	}
	public Date getLastupdate_bt_trans_profile() {
		return lastupdate_bt_trans_profile;
	}
	public void setLastupdate_bt_trans_profile(Date lastupdate_bt_trans_profile) {
		this.lastupdate_bt_trans_profile = lastupdate_bt_trans_profile;
	}
	
	public String formatRateNumber(double thenum) {
		return NumberUtility.formatRateNumber(thenum);
	}
	
    public String getFormattedEstTtlSpend() {
    	if (est_ttl_spend != null) {
    		return this.formatRateNumber(est_ttl_spend);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedEstTtlRmNextyr() {
    	if (est_ttl_rm_nextyr != null) {
    		return this.formatRateNumber(est_ttl_rm_nextyr);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedRev() {
    	if (rev != null) {
    		return this.formatRateNumber(rev);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedMarTtlRoomNts() {
    	if (mar_ttl_room_nts != null) {
    		return this.formatRateNumber(mar_ttl_room_nts);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedPctTtlrmntsMar() {
    	if (pct_ttlrmnts_mar != null) {
    		return this.formatRateNumber(pct_ttlrmnts_mar);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedNumHotelbid() {
    	if (num_hotelbid != null) {
    		return this.formatRateNumber(num_hotelbid);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedNumAccptdhotels() {
    	if (num_accptdhotels != null) {
    		return this.formatRateNumber(num_accptdhotels);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedDirectorysharePct() {
    	if (directoryshare_pct != null) {
    		return this.formatRateNumber(directoryshare_pct);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedMarRewardsMmbrs() {
    	if (mar_rewards_mmbrs != null) {
    		return this.formatRateNumber(mar_rewards_mmbrs);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedMaxDiscOffFixed() {
    	if (max_disc_off_fixed != null) {
    		return this.formatRateNumber(max_disc_off_fixed);
    	} else {
    		return "";
    	}
    }
    
    public String getFormattedMaxBlackout() {
    	if (max_blackout != null) {
    		return this.formatRateNumber(max_blackout);
    	} else {
    		return "";
    	}
    }
    
}