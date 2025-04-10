package com.marriott.rfp.object.pricing.sapp;

public class Leisure {

	private Long acctleisureid ;  
	private Long accountinfoid; 
    private String stOverview;
	private String marketing;
    private String strengths;
    private String leisureSegment; 
	private String onwardDistribution;
    private String contracting;    
    
	public Long getAcctleisureid() {
		return acctleisureid;
	}
	public void setAcctleisureid(Long acctleisureid) {
		this.acctleisureid = acctleisureid;
	}
	public Long getAccountinfoid() {
		return accountinfoid;
	}
	public void setAccountinfoid(Long accountinfoid) {
		this.accountinfoid = accountinfoid;
	}
    public String getStOverview() {
		return stOverview;
	}
	public void setStOverview(String stOverview) {
		this.stOverview = stOverview;
	}
	public String getMarketing() {
		return marketing;
	}
	public void setMarketing(String marketing) {
		this.marketing = marketing;
	}
	public String getStrengths() {
		return strengths;
	}
	public void setStrengths(String strengths) {
		this.strengths = strengths;
	}
	
	public String getOnwardDistribution() {
		return onwardDistribution;
	}
	public void setOnwardDistribution(String onwardDistribution) {
		this.onwardDistribution = onwardDistribution;
	}
	public String getContracting() {
		return contracting;
	}
	public void setContracting(String contracting) {
		this.contracting = contracting;
	}
	public String getLeisureSegment() {
		return leisureSegment;
	}
	public void setLeisureSegment(String leisureSegment) {
		this.leisureSegment = leisureSegment;
	}	
}