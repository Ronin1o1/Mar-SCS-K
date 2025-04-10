package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTCommRateseason implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long roompoolid;
	private Long tier;
	private Long seasonid;
	private Double prevyear_rate_gross;
	private Double rate_gross;
	private Double pct_grosschg;
	private Double walk_rate_gross;
	private Double open_rate_gross;
	private Double target_rate_gross;
	private Double floor_rate_gross;	
	private Double pct_annual_rn;
	private Double pct_antc_gross_chg;
	private String chg;
	
	public Long getRoompoolid() {
		return roompoolid;
	}

	public void setRoompoolid(Long roompoolid) {
		this.roompoolid = roompoolid;
	}

	public Long getTier() {
		return tier;
	}

	public void setTier(Long tier) {
		this.tier = tier;
	}

	public Long getSeasonid() {
		return seasonid;
	}

	public void setSeasonid(Long seasonid) {
		this.seasonid = seasonid;
	}

	public Double getPrevyear_rate_gross() {
		return prevyear_rate_gross;
	}

	public void setPrevyear_rate_gross(Double prevyear_rate_gross) {
		this.prevyear_rate_gross = prevyear_rate_gross;
	}

	public Double getRate_gross() {
		return rate_gross;
	}

	public void setRate_gross(Double rate_gross) {
		this.rate_gross = rate_gross;
	}

	public Double getPct_grosschg() {
		return pct_grosschg;
	}

	public void setPct_grosschg(Double pct_grosschg) {
		this.pct_grosschg = pct_grosschg;
	}

	
	public Double getOpen_rate_gross() {
		return open_rate_gross;
	}

	public void setOpen_rate_gross(Double open_rate_gross) {
		this.open_rate_gross = open_rate_gross;
	}

	public Double getTarget_rate_gross() {
		return target_rate_gross;
	}

	public void setTarget_rate_gross(Double target_rate_gross) {
		this.target_rate_gross = target_rate_gross;
	}

	public Double getFloor_rate_gross() {
		return floor_rate_gross;
	}

	public void setFloor_rate_gross(Double floor_rate_gross) {
		this.floor_rate_gross = floor_rate_gross;
	}

	public Double getPct_annual_rn() {
		return pct_annual_rn;
	}

	public void setPct_annual_rn(Double pct_annual_rn) {
		this.pct_annual_rn = pct_annual_rn;
	}

	public String getChg() {
		return chg;
	}

	public void setChg(String chg) {
		this.chg = chg;
	}

	public Double getWalk_rate_gross() {
		return walk_rate_gross;
	}

	public void setWalk_rate_gross(Double walk_rate_gross) {
		this.walk_rate_gross = walk_rate_gross;
	}

	public void setPct_antc_gross_chg(Double pct_antc_gross_chg) {
		this.pct_antc_gross_chg = pct_antc_gross_chg;
	}

	public Double getPct_antc_gross_chg() {
		return pct_antc_gross_chg;
	}

}
