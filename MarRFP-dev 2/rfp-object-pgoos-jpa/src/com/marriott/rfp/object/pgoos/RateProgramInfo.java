package com.marriott.rfp.object.pgoos;

import java.util.List;

public class RateProgramInfo {

	private Long transactionId;
	private Long sequence;
	private String rateProgramCode;
	private String roomTypeId;
	private Long rateOfferId;
	private Long price_mirrorrateofferid;
	private Long price_pricing_type;
	private Long price_priority_tag;
	private Long price_rateentityid;
	private Long avail_mirrorrateofferid;
	private Long avail_pricing_type;
	private Long avail_priority_tag;
	private Long avail_rateentityid;
	private String roompool;
	private String errordesc;
	private String errorcode;
	private String status = "PEND";
	private List<PricingRule> pricingRules;
	private List<Season> blackOutSeaons;
	
	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public String getRateProgramCode() {
		return rateProgramCode;
	}

	public void setRateProgramCode(String rateProgramCode) {
		this.rateProgramCode = rateProgramCode;
	}

	public String getRoomTypeId() {
		return roomTypeId;
	}

	public void setRoomTypeId(String roomTypeId) {
		this.roomTypeId = roomTypeId;
	}


	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

	public Long getPrice_mirrorrateofferid() {
		return price_mirrorrateofferid;
	}

	public void setPrice_mirrorrateofferid(Long price_mirrorrateofferid) {
		this.price_mirrorrateofferid = price_mirrorrateofferid;
	}

	public Long getPrice_pricing_type() {
		return price_pricing_type;
	}

	public void setPrice_pricing_type(Long price_pricing_type) {
		this.price_pricing_type = price_pricing_type;
	}

	public Long getPrice_priority_tag() {
		return price_priority_tag;
	}

	public void setPrice_priority_tag(Long price_priority_tag) {
		this.price_priority_tag = price_priority_tag;
	}

	public Long getPrice_rateentityid() {
		return price_rateentityid;
	}

	public void setPrice_rateentityid(Long price_rateentityid) {
		this.price_rateentityid = price_rateentityid;
	}

	public Long getAvail_mirrorrateofferid() {
		return avail_mirrorrateofferid;
	}

	public void setAvail_mirrorrateofferid(Long avail_mirrorrateofferid) {
		this.avail_mirrorrateofferid = avail_mirrorrateofferid;
	}

	public Long getAvail_pricing_type() {
		return avail_pricing_type;
	}

	public void setAvail_pricing_type(Long avail_pricing_type) {
		this.avail_pricing_type = avail_pricing_type;
	}

	public Long getAvail_priority_tag() {
		return avail_priority_tag;
	}

	public void setAvail_priority_tag(Long avail_priority_tag) {
		this.avail_priority_tag = avail_priority_tag;
	}

	public Long getAvail_rateentityid() {
		return avail_rateentityid;
	}

	public void setAvail_rateentityid(Long avail_rateentityid) {
		this.avail_rateentityid = avail_rateentityid;
	}

	public void setRoompool(String roompool) {
		this.roompool = roompool;
	}

	public String getRoompool() {
		return roompool;
	}

	public void setErrordesc(String errordesc) {
		this.errordesc = errordesc;
	}

	public String getErrordesc() {
		return errordesc;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setPricingRules(List<PricingRule> pricingRules) {
		this.pricingRules = pricingRules;
	}

	public List<PricingRule> getPricingRules() {
		return pricingRules;
	}

	public void setBlackOutSeaons(List<Season> blackOutSeaons) {
		this.blackOutSeaons = blackOutSeaons;
	}

	public List<Season> getBlackOutSeaons() {
		return blackOutSeaons;
	}

	public void clearAvailabilityMirror() {
		this.avail_mirrorrateofferid=null;
		this.avail_pricing_type=null;
		this.avail_priority_tag=null;
		this.avail_rateentityid=null;
	}


}
