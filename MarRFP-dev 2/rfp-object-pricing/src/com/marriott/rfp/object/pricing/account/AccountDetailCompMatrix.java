package com.marriott.rfp.object.pricing.account;

import java.util.List;

public class AccountDetailCompMatrix extends Account {
	
	/**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String mergacqrename;
    private Long addquestcomp;
    private Long satrating;
    private Long tacbonus;
    private String tacbonuscomments;
    private List<RfpFileSentList> rfpfilesent;
    private Long totrfpfilesent;
    private List<RenegSubmitList> renegsubmit;
    private Long totrenegsubmit;
    private String rateauditcomments;
    
	public String getMergacqrename() {
		return mergacqrename;
	}
	public void setMergacqrename(String mergacqrename) {
		this.mergacqrename = mergacqrename;
	}
	public Long getAddquestcomp() {
		return addquestcomp;
	}
	public void setAddquestcomp(Long addquestcomp) {
		this.addquestcomp = addquestcomp;
	}
	public Long getSatrating() {
		return satrating;
	}
	public void setSatrating(Long satrating) {
		this.satrating = satrating;
	}
	public Long getTacbonus() {
		return tacbonus;
	}
	public void setTacbonus(Long tacbonus) {
		this.tacbonus = tacbonus;
	}
	public String getTacbonuscomments() {
		return tacbonuscomments;
	}
	public void setTacbonuscomments(String tacbonuscomments) {
		this.tacbonuscomments = tacbonuscomments;
	}
	public List<RfpFileSentList> getRfpfilesent() {
		return rfpfilesent;
	}
	public void setRfpfilesent(List<RfpFileSentList> rfpfilesdates) {
		this.rfpfilesent = rfpfilesdates;
	}
	public Long getTotrfpfilesent() {
		return totrfpfilesent;
	}
	public void setTotrfpfilesent(Long totrfpfilesent) {
		this.totrfpfilesent = totrfpfilesent;
	}
	public List<RenegSubmitList> getRenegsubmit() {
		return renegsubmit;
	}
	public void setRenegsubmit(List<RenegSubmitList> renegsubmit) {
		this.renegsubmit = renegsubmit;
	}
	public Long getTotrenegsubmit() {
		return totrenegsubmit;
	}
	public void setTotrenegsubmit(Long totrenegsubmit) {
		this.totrenegsubmit = totrenegsubmit;
	}
	public String getRateauditcomments() {
		return rateauditcomments;
	}
	public void setRateauditcomments(String rateauditcomments) {
		this.rateauditcomments = rateauditcomments;
	}
    
}
