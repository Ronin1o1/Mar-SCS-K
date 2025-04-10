package com.marriott.rfp.object.pricing.scpt;


import java.io.Serializable;
import java.util.List;

public class SCPTDetailEdit implements Serializable{
	/*
	*
	*/
	private static final long serialVersionUID = 1L;
	private String prevweightednetChg="N";
	private String rateseasonChg="N";
	private String fullyrntsChg="N";
	private String hotelcommChg="N";
	private String commentsChg="N";
	private String showrmnightsChg="N";
	private Long scpt_accountid;
	private Long prevyear_fy_fcst;
	private Long fy_fcst;
	private Double chg_rn_from_ty_pct;
	private Double prev_weightedratenet;
	private String comments;
	private List <SCPTCommRateseason> rateseasonList;
	private List <SCPTCommRateAmenities> rateamenitiesList;

	

	
	public Double getChg_rn_from_ty_pct() {
		return chg_rn_from_ty_pct;
	}
	public void setChg_rn_from_ty_pct(Double chg_rn_from_ty_pct) {
		this.chg_rn_from_ty_pct = chg_rn_from_ty_pct;
	}
	public String getShowrmnightsChg() {
		return showrmnightsChg;
	}
	public void setShowrmnightsChg(String showrmnightsChg) {
		this.showrmnightsChg = showrmnightsChg;
	}
	public String getPrevweightednetChg() {
		return prevweightednetChg;
	}
	public void setPrevweightednetChg(String prevweightednetChg) {
		this.prevweightednetChg = prevweightednetChg;
	}

	
	public String getRateseasonChg() {
		return rateseasonChg;
	}
	public void setRateseasonChg(String rateseasonChg) {
		this.rateseasonChg = rateseasonChg;
	}
	public String getFullyrntsChg() {
		return fullyrntsChg;
	}
	public void setFullyrntsChg(String fullyrntsChg) {
		this.fullyrntsChg = fullyrntsChg;
	}
	public String getHotelcommChg() {
		return hotelcommChg;
	}
	public void setHotelcommChg(String hotelcommChg) {
		this.hotelcommChg = hotelcommChg;
	}
	public String getCommentsChg() {
		return commentsChg;
	}
	public void setCommentsChg(String commentsChg) {
		this.commentsChg = commentsChg;
	}
	public Long getScpt_accountid() {
		return scpt_accountid;
	}
	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
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
	public Double getPrev_weightedratenet() {
		return prev_weightedratenet;
	}
	public void setPrev_weightedratenet(Double prev_weightedratenet) {
		this.prev_weightedratenet = prev_weightedratenet;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public List<SCPTCommRateseason> getRateseasonList() {
		return rateseasonList;
	}
	public void setRateseasonList(List<SCPTCommRateseason> rateseasonList) {
		this.rateseasonList = rateseasonList;
	}
	public List<SCPTCommRateAmenities> getRateamenitiesList() {
		return rateamenitiesList;
	}
	public void setRateamenitiesList(List<SCPTCommRateAmenities> rateamenitiesList) {
		this.rateamenitiesList = rateamenitiesList;
	}
	

}
