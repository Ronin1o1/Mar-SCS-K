package com.marriott.rfp.object.pricing.sapp;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class GenHist implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long accountId;
	private Long accountrecid;
	private String company_internal_code; 
	private String room_nts_rev;
	private String mar_tracking;
	private Double compliance;
	private Double num_hotelbid;
	private Double num_accptdhotels;
	private Double num_hotel_per_mrdw;
	private Double ttl_hotel_directory;
	private Double directoryshare_pct;
	private Double mar_rewards_mmbrs;
	private Double ttlglb_mar_room_nts; 
	private Double ttlglb_mar_room_rev;
	private Double ttlglb_hotelspend_nts; 
	private Double ttlglb_hotelspend_rev; 
	private Double ttlglb_pct_marspend_rev; 
	private Double ttlglb_pct_marspend_nts; 
	private Double ttlmar_rev; 
	private Double ttlmar_nts; 
	private Double ttlgroup_rev; 
	private Double ttlgroup_nts; 
	private Double ttl_bt_rev; 
	private Double ttl_bt_nts;
	private String creditcardspend; 
	private String trackingother; 
	private String trackingother_desc;

	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public Long getAccountrecid() {
		return accountrecid;
	}
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	public String getCompany_internal_code() {
		return company_internal_code;
	}
	public void setCompany_internal_code(String company_internal_code) {
		this.company_internal_code = company_internal_code;
	}
	public String getRoom_nts_rev() {
		return room_nts_rev;
	}
	public void setRoom_nts_rev(String room_nts_rev) {
		this.room_nts_rev = room_nts_rev;
	}
	public String getMar_tracking() {
		return mar_tracking;
	}
	public void setMar_tracking(String mar_tracking) {
		this.mar_tracking = mar_tracking;
	}
	public Double getCompliance() {
		return compliance;
	}
	public void setCompliance(Double compliance) {
		this.compliance = compliance;
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
	public Double getTtlglb_mar_room_nts() {
		return ttlglb_mar_room_nts;
	}
	public void setTtlglb_mar_room_nts(Double ttlglb_mar_room_nts) {
		this.ttlglb_mar_room_nts = ttlglb_mar_room_nts;
	}
	public Double getTtlglb_hotelspend_nts() {
		return ttlglb_hotelspend_nts;
	}
	public void setTtlglb_hotelspend_nts(Double ttlglb_hotelspend_nts) {
		this.ttlglb_hotelspend_nts = ttlglb_hotelspend_nts;
	}
	public Double getTtlglb_hotelspend_rev() {
		return ttlglb_hotelspend_rev;
	}
	public void setTtlglb_hotelspend_rev(Double ttlglb_hotelspend_rev) {
		this.ttlglb_hotelspend_rev = ttlglb_hotelspend_rev;
	}
	public Double getTtlglb_pct_marspend_rev() {
		return ttlglb_pct_marspend_rev;
	}
	public void setTtlglb_pct_marspend_rev(Double ttlglb_pct_marspend_rev) {
		this.ttlglb_pct_marspend_rev = ttlglb_pct_marspend_rev;
	}
	public Double getTtlglb_pct_marspend_nts() {
		return ttlglb_pct_marspend_nts;
	}
	public void setTtlglb_pct_marspend_nts(Double ttlglb_pct_marspend_nts) {
		this.ttlglb_pct_marspend_nts = ttlglb_pct_marspend_nts;
	}
	public Double getTtlmar_rev() {
		return ttlmar_rev;
	}
	public void setTtlmar_rev(Double ttlmar_rev) {
		this.ttlmar_rev = ttlmar_rev;
	}
	public Double getTtlmar_nts() {
		return ttlmar_nts;
	}
	public void setTtlmar_nts(Double ttlmar_nts) {
		this.ttlmar_nts = ttlmar_nts;
	}
	public Double getTtlgroup_rev() {
		return ttlgroup_rev;
	}
	public void setTtlgroup_rev(Double ttlgroup_rev) {
		this.ttlgroup_rev = ttlgroup_rev;
	}
	public Double getTtlgroup_nts() {
		return ttlgroup_nts;
	}
	public void setTtlgroup_nts(Double ttlgroup_nts) {
		this.ttlgroup_nts = ttlgroup_nts;
	}
	public Double getTtl_bt_rev() {
		return ttl_bt_rev;
	}
	public void setTtl_bt_rev(Double ttl_bt_rev) {
		this.ttl_bt_rev = ttl_bt_rev;
	}
	public Double getTtl_bt_nts() {
		return ttl_bt_nts;
	}
	public void setTtl_bt_nts(Double ttl_bt_nts) {
		this.ttl_bt_nts = ttl_bt_nts;
	}
	public String getCreditcardspend() {
		return creditcardspend;
	}
	public void setCreditcardspend(String creditcardspend) {
		this.creditcardspend = creditcardspend;
	}
	public String getTrackingother() {
		return trackingother;
	}
	public void setTrackingother(String trackingother) {
		this.trackingother = trackingother;
	}
	public String getTrackingother_desc() {
		return trackingother_desc;
	}
	public void setTrackingother_desc(String trackingother_desc) {
		this.trackingother_desc = trackingother_desc;
	}
	public Double getTtlglb_mar_room_rev() {
		return ttlglb_mar_room_rev;
	}
	public void setTtlglb_mar_room_rev(Double ttlglb_mar_room_rev) {
		this.ttlglb_mar_room_rev = ttlglb_mar_room_rev;
	}
	
    public void setStrMarRoomRev(String ttlglb_mar_room_rev) {
    	if (ttlglb_mar_room_rev == null  || ttlglb_mar_room_rev.equals(""))
    	    this.ttlglb_mar_room_rev = null;
    	else
    	    this.ttlglb_mar_room_rev = Double.valueOf(ttlglb_mar_room_rev);
    }

    public String getFormattedMarRoomRev() {
    	if (ttlglb_mar_room_rev != null) {
    		return NumberUtility.formatRateNumber(ttlglb_mar_room_rev);
    	} else {
    		return "";
    	}
    }
    
    public void setStrHotelSpendRev(String ttlglb_hotelspend_rev) {
    	if (ttlglb_hotelspend_rev == null  || ttlglb_hotelspend_rev.equals(""))
    	    this.ttlglb_hotelspend_rev = null;
    	else
    	    this.ttlglb_hotelspend_rev = Double.valueOf(ttlglb_hotelspend_rev);
    }

    public String getFormattedHotelSpendRev() {
    	if (ttlglb_hotelspend_rev != null) {
    		return NumberUtility.formatRateNumber(ttlglb_hotelspend_rev);
    	} else {
    		return "";
    	}
    }
    
    public void setStrMarSpendRev(String ttlglb_pct_marspend_rev) {
    	if (ttlglb_pct_marspend_rev == null  || ttlglb_pct_marspend_rev.equals(""))
    	    this.ttlglb_pct_marspend_rev = null;
    	else
    	    this.ttlglb_pct_marspend_rev = Double.valueOf(ttlglb_pct_marspend_rev);
    }

    public String getFormattedMarSpendRev() {
    	if (ttlglb_pct_marspend_rev != null) {
    		return NumberUtility.formatRateNumber(ttlglb_pct_marspend_rev);
    	} else {
    		return "";
    	}
    }
    
    
	
	
	
}