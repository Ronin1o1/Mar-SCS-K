
package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;



public class SCPTCommSetupInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rpp_setup_primary;
	private String rpp_setup_secondary;
	private String rpp_setup_teritary;

	private String rpp_setup_total;
	private String tier_price_tier1;
	private String tier_price_tier2;
	private String tier_price_tier3;
	private String tier_price_tier4;
	private String tier_price_total;
	private String show_yoy_comp ;
	
	private Double brkf_fcost;
	private Double internet_fcost;
	private Double transport_fcost;
	private Double parking_fcost;
	private Double yoy_retailrate_chg;
	
	public String getRpp_setup_primary() {
		return rpp_setup_primary;
	}
	public void setRpp_setup_primary(String rpp_setup_primary) {
		this.rpp_setup_primary = rpp_setup_primary;
	}
	public String getRpp_setup_secondary() {
		return rpp_setup_secondary;
	}
	public void setRpp_setup_secondary(String rpp_setup_secondary) {
		this.rpp_setup_secondary = rpp_setup_secondary;
	}
	public String getRpp_setup_teritary() {
		return rpp_setup_teritary;
	}
	public void setRpp_setup_teritary(String rpp_setup_teritary) {
		this.rpp_setup_teritary = rpp_setup_teritary;
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
	
	public void setShow_yoy_comp(String show_yoy_comp) {
		this.show_yoy_comp = show_yoy_comp;
	}
	public String getShow_yoy_comp() {
		return show_yoy_comp;
	}
	
	public Double getBrkf_fcost() {
		return brkf_fcost;
	}
	public void setBrkf_fcost(Double brkf_fcost) {
		this.brkf_fcost = brkf_fcost;
	}
	public Double getInternet_fcost() {
		return internet_fcost;
	}
	public void setInternet_fcost(Double internet_fcost) {
		this.internet_fcost = internet_fcost;
	}
	public Double getTransport_fcost() {
		return transport_fcost;
	}
	public void setTransport_fcost(Double transport_fcost) {
		this.transport_fcost = transport_fcost;
	}
	public Double getParking_fcost() {
		return parking_fcost;
	}
	public void setParking_fcost(Double parking_fcost) {
		this.parking_fcost = parking_fcost;
	}
	public Double getYoy_retailrate_chg() {
		return yoy_retailrate_chg;
	}
	public void setYoy_retailrate_chg(Double yoy_retailrate_chg) {
		this.yoy_retailrate_chg = yoy_retailrate_chg;
	}



}

