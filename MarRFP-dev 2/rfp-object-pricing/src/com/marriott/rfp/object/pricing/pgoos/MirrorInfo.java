package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class MirrorInfo implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long hotelid;

	private Long roomPoolSeq;
	private String rateProgramCode;
	private String rateOfferName;
	private Long rateOfferId;
	private Long rateEntityId;
	private Long ratetypeid;
	private String mirrorType;
	private String mirror_exception_notes;
	private Long roomClassSeq;
	
	public Long getRoomClassSeq() {
		return roomClassSeq;
	}

	public void setRoomClassSeq(Long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public Long getRoomPoolSeq() {
		return roomPoolSeq;
	}

	public void setRoomPoolSeq(Long roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}



	public String getMirrorType() {
		return mirrorType;
	}

	public void setMirrorType(String mirrorType) {
		this.mirrorType = mirrorType;
	}

	public String getMirror_exception_notes() {
		return mirror_exception_notes;
	}

	public void setMirror_exception_notes(String mirror_exception_notes) {
		this.mirror_exception_notes = mirror_exception_notes;
	}

	public String getRateProgramCode() {
		return rateProgramCode;
	}

	public void setRateProgramCode(String rateProgramCode) {
		this.rateProgramCode = rateProgramCode;
	}

	public String getRateOfferName() {
		return rateOfferName;
	}

	public void setRateOfferName(String rateOfferName) {
		this.rateOfferName = rateOfferName;
	}

	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

	public Long getRateEntityId() {
		return rateEntityId;
	}

	public void setRateEntityId(Long rateEntityId) {
		this.rateEntityId = rateEntityId;
	}

	public Long getRatetypeid() {
		return ratetypeid;
	}

	public void setRatetypeid(Long ratetypeid) {
		this.ratetypeid = ratetypeid;
	}


	
}
