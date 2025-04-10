package com.marriott.rfp.object.pgoos;

import java.io.Serializable;
import java.util.List;

public class RoomPool implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String roompool;
	private Long roomClassSeq;
	private Long roomPoolSeq;
	private Long rateofferid;
	private String is_aer_rpgm;
	private String rateprog;
	private MarshaCommandType cmdType = MarshaCommandType.NONE;
	private String status="PEND";
	private String errordesc;
	private String errorcode;	
	private Long price_mirrorrateofferid;
	private Long price_pricing_type;
	private Long price_priority_tag;
	private Long price_rateentityid;
	private Long avail_mirrorrateofferid;
	private Long avail_pricing_type;
	private Long avail_priority_tag;
	private Long avail_rateentityid;
	private String mirrorall;
	private String pricingrule;
	private String ceilingrule;
	private Double discount;
	private String lra;
	private List<PricingRule>pricingRules;
	private List<Season> blackOutSeaons;
	private Long transactionid;
	private String sendvrpe;
	private String sendvrpx;
	private String sendvrpk;

	public String getRoompool() {
		return roompool;
	}

	public void setRoompool(String roompool) {
		this.roompool = roompool;
	}

	public Long getRoomClassSeq() {
		return roomClassSeq;
	}

	public void setRoomClassSeq(Long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}

	public Long getRoomPoolSeq() {
		return roomPoolSeq;
	}

	public void setRoomPoolSeq(Long roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}

	public void setCmdType(MarshaCommandType cmdType) {
		this.cmdType = cmdType;
	}

	public MarshaCommandType getCmdType() {
		return cmdType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getErrordesc() {
		return errordesc;
	}

	public void setErrordesc(String errordesc) {
		this.errordesc = errordesc;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	public Long getRateofferid() {
		return rateofferid;
	}

	public void setRateofferid(Long rateofferid) {
		this.rateofferid = rateofferid;
	}

	public String getIs_aer_rpgm() {
		return is_aer_rpgm;
	}

	public void setIs_aer_rpgm(String is_aer_rpgm) {
		this.is_aer_rpgm = is_aer_rpgm;
	}

	public String getRateprog() {
		return rateprog;
	}

	public void setRateprog(String rateprog) {
		this.rateprog = rateprog;
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

	public String getMirrorall() {
		return mirrorall;
	}

	public void setMirrorall(String mirrorall) {
		this.mirrorall = mirrorall;
	}

	public String getPricingrule() {
		return pricingrule;
	}

	public void setPricingrule(String pricingrule) {
		this.pricingrule = pricingrule;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public List<PricingRule> getPricingRules() {
		return pricingRules;
	}

	public void setPricingRules(List<PricingRule> pricingRules) {
		this.pricingRules = pricingRules;
	}

	public void setCeilingrule(String ceilingrule) {
		this.ceilingrule = ceilingrule;
	}

	public String getCeilingrule() {
		return ceilingrule;
	}

	public void setBlackOutSeaons(List<Season> blackOutSeaons) {
		this.blackOutSeaons = blackOutSeaons;
	}

	public List<Season> getBlackOutSeaons() {
		return blackOutSeaons;
	}

	public void setTransactionid(Long transactionid) {
		this.transactionid = transactionid;
	}

	public Long getTransactionid() {
		return transactionid;
	}

	public String getLra() {
		return lra;
	}

	public void setLra(String lra) {
		this.lra = lra;
	}

	public String getSendvrpe() {
		return sendvrpe;
	}

	public void setSendvrpe(String sendvrpe) {
		this.sendvrpe = sendvrpe;
	}

	public String getSendvrpx() {
		return sendvrpx;
	}

	public void setSendvrpx(String sendvrpx) {
		this.sendvrpx = sendvrpx;
	}

	public String getSendvrpk() {
		return sendvrpk;
	}

	public void setSendvrpk(String sendvrpk) {
		this.sendvrpk = sendvrpk;
	}

}
