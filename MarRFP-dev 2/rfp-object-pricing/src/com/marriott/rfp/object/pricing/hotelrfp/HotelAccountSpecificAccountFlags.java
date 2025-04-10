package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountSpecificAccountFlags implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String pgoos = "N";
	private String amenities_exempt="N";
	private Long marketcode;
	private String removalreason;
	private Long removalreasonid;
	private String rejectreason;
	private Long rejectreasonid;
	private Long currrebidstatus;
	private String selected;
	private String accepted;

	public String getPgoos() {
		return pgoos;
	}

	public void setPgoos(String pgoos) {
		if (pgoos.equals("on"))
			pgoos = "Y";
		this.pgoos = pgoos;
	}


	public Long getMarketcode() {
		return marketcode;
	}

	public void setMarketcode(Long marketcode) {
		this.marketcode = marketcode;
	}

	public String getRemovalreason() {
		return removalreason;
	}

	public void setRemovalreason(String removalreason) {
		this.removalreason = removalreason;
	}

	public Long getRemovalreasonid() {
		return removalreasonid;
	}

	public void setRemovalreasonid(Long removalreasonid) {
		this.removalreasonid = removalreasonid;
	}

	public String getRejectreason() {
		return rejectreason;
	}

	public void setRejectreason(String rejectreason) {
		this.rejectreason = rejectreason;
	}

	public Long getRejectreasonid() {
		return rejectreasonid;
	}

	public void setRejectreasonid(Long rejectreasonid) {
		this.rejectreasonid = rejectreasonid;
	}

	public void setAmenities_exempt(String amenities_exempt) {
	    if (amenities_exempt==null || amenities_exempt.equals("N"))
		this.amenities_exempt="N";
	    else
		this.amenities_exempt = amenities_exempt;
	}

	public String getAmenities_exempt() {
	    return amenities_exempt;
	}

	public void setCurrrebidstatus(Long currrebidstatus) {
		this.currrebidstatus = currrebidstatus;
	}

	public Long getCurrrebidstatus() {
		return currrebidstatus;
	}

	public String getSelected() {
		return selected;
	}

	public void setSelected(String selected) {
		this.selected = selected;
	}

	public String getAccepted() {
		return accepted;
	}

	public void setAccepted(String accepted) {
		this.accepted = accepted;
	}
}
