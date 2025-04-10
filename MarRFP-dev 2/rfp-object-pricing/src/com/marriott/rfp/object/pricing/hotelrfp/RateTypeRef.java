package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RateTypeRef implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long ratetypeid;
	private String ratetype;
	private String ratedefinition;
	private Long minpercent;
	private String accounttype;
	private String allowallpriducts;
	private String hardcoded;
	private String alloweligibilityandamenities;
	private String allowwaiveblackouts;
	private String allowfacilityandratenotes;

	public Long getRatetypeid() {
		return ratetypeid;
	}

	public void setRatetypeid(Long ratetypeid) {
		this.ratetypeid = ratetypeid;
	}

	public String getRatetype() {
		return ratetype;
	}

	public void setRatetype(String ratetype) {
		this.ratetype = ratetype;
	}

	public String getRatedefinition() {
		return ratedefinition;
	}

	public void setRatedefinition(String ratedefinition) {
		this.ratedefinition = ratedefinition;
	}

	public Long getMinpercent() {
		return minpercent;
	}

	public void setMinpercent(Long minpercent) {
		this.minpercent = minpercent;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public String getAllowallpriducts() {
		return allowallpriducts;
	}

	public void setAllowallpriducts(String allowallpriducts) {
		this.allowallpriducts = allowallpriducts;
	}

	public String getHardcoded() {
		return hardcoded;
	}

	public void setHardcoded(String hardcoded) {
		this.hardcoded = hardcoded;
	}

	public String getAlloweligibilityandamenities() {
		return alloweligibilityandamenities;
	}

	public void setAlloweligibilityandamenities(String alloweligibilityandamenities) {
		this.alloweligibilityandamenities = alloweligibilityandamenities;
	}

	public String getAllowwaiveblackouts() {
		return allowwaiveblackouts;
	}

	public void setAllowwaiveblackouts(String allowwaiveblackouts) {
		this.allowwaiveblackouts = allowwaiveblackouts;
	}

	public String getAllowfacilityandratenotes() {
		return allowfacilityandratenotes;
	}

	public void setAllowfacilityandratenotes(String allowfacilityandratenotes) {
		this.allowfacilityandratenotes = allowfacilityandratenotes;
	}

}
