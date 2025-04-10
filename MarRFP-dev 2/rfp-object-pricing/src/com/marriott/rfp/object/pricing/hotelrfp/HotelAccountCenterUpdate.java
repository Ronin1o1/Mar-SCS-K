package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountCenterUpdate implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private Long hotel_accountinfoid;
	private Long ratetype_selected;
	private String importance;
	private Long nobidreasonid;
	private String changed;
	private String currimportance;
	private String origratetype_selected;
	private String hotelrfpid;
	private String marshacode;

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public String getImportance() {
		return importance;
	}

	public void setImportance(String importance) {
		if (importance==null)
			this.importance="N";
		else
			this.importance = importance;
	}

	public Long getNobidreasonid() {
		return nobidreasonid;
	}

	public void setNobidreasonid(Long nobidreasonid) {
		this.nobidreasonid = nobidreasonid;
	}

	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getChanged() {
		return changed;
	}

	public void setCurrimportance(String currimportance) {
		this.currimportance = currimportance;
	}

	public String getCurrimportance() {
		return currimportance;
	}

	public void setOrigratetype_selected(String origratetype_selected) {
		this.origratetype_selected = origratetype_selected;
	}

	public String getOrigratetype_selected() {
		return origratetype_selected;
	}

	public void setHotelrfpid(String hotelrfpid) {
	    this.hotelrfpid = hotelrfpid;
	}

	public String getHotelrfpid() {
	    return hotelrfpid;
	}

	public void setMarshacode(String marshacode) {
	    this.marshacode = marshacode;
	}

	public String getMarshacode() {
	    return marshacode;
	}
}
