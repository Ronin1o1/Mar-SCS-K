package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTCommRateAmenities implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long roompoolid;
	private Long tierid;
	private Long seasonid;
	private Long scpt_breaktypeid;
	private Long scpt_internettypeid;
	private String translocaloffice;
	private String parking;
	private Double fixedcosts;
	private Double pctcosts;
	private Double pctfbcosts;
	private Double pctroomcosts;
	private String otheramenities;
	private String comments;
	private String donotprice;
	private String status;
	private String lra;
	private Long prevyear_fy_fcst;
	private Long fy_fcst;
	private Double chg_rn_from_ty_pct;
	
	private Double prev_weightedratenet;
	private String chg;
	private String prev_weightedratenet_chg;
	
	
	public Long getRoompoolid() {
		return roompoolid;
	}

	public void setRoompoolid(Long roompoolid) {
		this.roompoolid = roompoolid;
	}

	public Long getTierid() {
		return tierid;
	}

	public void setTierid(Long tierid) {
		this.tierid = tierid;
	}

	public Long getSeasonid() {
		return seasonid;
	}

	public void setSeasonid(Long seasonid) {
		this.seasonid = seasonid;
	}

	public Long getScpt_breaktypeid() {
		return scpt_breaktypeid;
	}

	public void setScpt_breaktypeid(Long scpt_breaktypeid) {
		this.scpt_breaktypeid = scpt_breaktypeid;
	}

	public Long getScpt_internettypeid() {
		return scpt_internettypeid;
	}

	public void setScpt_internettypeid(Long scpt_internettypeid) {
		this.scpt_internettypeid = scpt_internettypeid;
	}

	public String getTranslocaloffice() {
		return translocaloffice;
	}

	public void setTranslocaloffice(String translocaloffice) {
		this.translocaloffice = translocaloffice;
	}

	public Double getFixedcosts() {
		return fixedcosts;
	}

	public void setFixedcosts(Double fixedcosts) {
		this.fixedcosts = fixedcosts;
	}

	public Double getPctcosts() {
		return pctcosts;
	}

	public void setPctcosts(Double pctcosts) {
		this.pctcosts = pctcosts;
	}

	public String getOtheramenities() {
		return otheramenities;
	}

	public void setOtheramenities(String otheramenities) {
		this.otheramenities = otheramenities;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getChg() {
		return chg;
	}

	public void setChg(String chg) {
		this.chg = chg;
	}

	public String getParking() {
		return parking;
	}

	public void setParking(String parking) {
		this.parking = parking;
	}

	public Double getPctfbcosts() {
		return pctfbcosts;
	}

	public void setPctfbcosts(Double pctfbcosts) {
		this.pctfbcosts = pctfbcosts;
	}

	public Double getPctroomcosts() {
		return pctroomcosts;
	}

	public void setPctroomcosts(Double pctroomcosts) {
		this.pctroomcosts = pctroomcosts;
	}

	public String getDonotprice() {
		return donotprice;
	}

	public void setDonotprice(String donotprice) {
		this.donotprice = donotprice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLra() {
		return lra;
	}

	public void setLra(String lra) {
		this.lra = lra;
	}

	public Long getPrevyear_fy_fcst() {
		return prevyear_fy_fcst;
	}

	public void setPrevyear_fy_fcst(Long prevyear_fy_fcst) {
		this.prevyear_fy_fcst = prevyear_fy_fcst;
	}

	public Long getFy_fcst() {
		return fy_fcst;
	}

	public void setFy_fcst(Long fy_fcst) {
		this.fy_fcst = fy_fcst;
	}

	public Double getChg_rn_from_ty_pct() {
		return chg_rn_from_ty_pct;
	}

	public void setChg_rn_from_ty_pct(Double chg_rn_from_ty_pct) {
		this.chg_rn_from_ty_pct = chg_rn_from_ty_pct;
	}

	public void setPrev_weightedratenet(Double prev_weightedratenet) {
		this.prev_weightedratenet = prev_weightedratenet;
	}

	public Double getPrev_weightedratenet() {
		return prev_weightedratenet;
	}

	public void setPrev_weightedratenet_chg(String prev_weightedratenet_chg) {
		this.prev_weightedratenet_chg = prev_weightedratenet_chg;
	}

	public String getPrev_weightedratenet_chg() {
		return prev_weightedratenet_chg;
	}
	
}
