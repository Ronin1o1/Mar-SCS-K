package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;


public class SCPTSetUpGenInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	private long hotelid;
	private long period;
	
	private String rpp_setup1;
	private String rpp_setup2;
	private String rpp_setup3;

	private String rpp_setup_total;
	private String tier_price_tier1;
	private String tier_price_tier2;
	private String tier_price_tier3;
	private String tier_price_tier4;
	private String tier_price_total;
	private String hotel_vat;
	private String show_yoy_comp;
	
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	
		
	public String getRpp_setup1() {
		return rpp_setup1;
	}
	public void setRpp_setup1(String rpp_setup1) {
		this.rpp_setup1 = rpp_setup1;
	}
	public String getRpp_setup2() {
		return rpp_setup2;
	}
	public void setRpp_setup2(String rpp_setup2) {
		this.rpp_setup2 = rpp_setup2;
	}
	public String getRpp_setup3() {
		return rpp_setup3;
	}
	public void setRpp_setup3(String rpp_setup3) {
		this.rpp_setup3 = rpp_setup3;
	}
	public long getPeriod() {
		return period;
	}
	public void setPeriod(long period) {
		this.period = period;
	}

	public String getRpp_setup_total() {
		return rpp_setup_total;
	}
	public void setRpp_setup_total(String rpp_setup_total) {
		this.rpp_setup_total = rpp_setup_total;
	}
	public String getTier_price_tier1() {
		return tier_price_tier1;
	}
	public void setTier_price_tier1(String tier_price_tier1) {
		this.tier_price_tier1 = tier_price_tier1;
	}
	public String getTier_price_tier2() {
		return tier_price_tier2;
	}
	public void setTier_price_tier2(String tier_price_tier2) {
		this.tier_price_tier2 = tier_price_tier2;
	}
	public String getTier_price_tier3() {
		return tier_price_tier3;
	}
	public void setTier_price_tier3(String tier_price_tier3) {
		this.tier_price_tier3 = tier_price_tier3;
	}
	public String getTier_price_tier4() {
		return tier_price_tier4;
	}
	public void setTier_price_tier4(String tier_price_tier4) {
		this.tier_price_tier4 = tier_price_tier4;
	}
	public String getTier_price_total() {
		return tier_price_total;
	}
	public void setTier_price_total(String tier_price_total) {
		this.tier_price_total = tier_price_total;
	}
	public String getHotel_vat() {
		return hotel_vat;
	}
	public void setHotel_vat(String hotel_vat) {
		this.hotel_vat = hotel_vat;
	}
	
	public String getShow_yoy_comp() {
		return show_yoy_comp;
	}
	public void setShow_yoy_comp(String show_yoy_comp) {
		this.show_yoy_comp = show_yoy_comp;
	}
	
	
	
}