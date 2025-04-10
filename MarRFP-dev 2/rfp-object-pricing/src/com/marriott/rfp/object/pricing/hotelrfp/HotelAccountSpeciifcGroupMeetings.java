package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.text.DecimalFormat;

public class HotelAccountSpeciifcGroupMeetings implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String honorrate;
	private String caprate;
	private Long caprateqty;
	private String applyvolume_outblock;
	private String discfb;
	private String discav;
	private Long comprooms;
	private String compparking;
	private String upfrontdep;
	
    private Long negratefifty; 
    private Long negratehund; 
    private String negtranshighrate; 
    private String daymtgpkgs; 
    private String meetingdaymeetingpckg;
    
	private Double fulldayratefifty; 
    private Double halfdayratefifty;
    private Double fulldayratehund; 
    private Double halfdayratehund; 
    private Double costbrkten; 
    private Double costbrktwnfive; 
    private String intfeeincldaymtg; 
    private String lcdcostincldaymtg; 
    private String scncostincldaymtg; 
    
    
    public String getMeetingdaymeetingpckg() {
		return meetingdaymeetingpckg;
	}

	public void setMeetingdaymeetingpckg(String meetingdaymeetingpckg) {
		this.meetingdaymeetingpckg = meetingdaymeetingpckg;
	}

	public Double getFulldayratehund() {
		return fulldayratehund;
	}

	public void setFulldayratehund(Double fulldayratehund) {
		if (fulldayratehund == null)
			this.fulldayratehund = null;
		else
			this.fulldayratehund = fulldayratehund;
	}

	public Double getHalfdayratehund() {
		return halfdayratehund;
	}

	public void setHalfdayratehund(Double halfdayratehund) {
		if (halfdayratehund == null)
			this.halfdayratehund = null;
		else
			this.halfdayratehund = halfdayratehund;
	}

	public Double getCostbrkten() {
		return costbrkten;
	}

	public void setCostbrkten(Double costbrkten) {
		if (costbrkten == null)
			this.costbrkten = null;
		else
			this.costbrkten = costbrkten;
	}

	public Double getCostbrktwnfive() {
		return costbrktwnfive;
	}

	public void setCostbrktwnfive(Double costbrktwnfive) {
		if (costbrktwnfive == null)
			this.costbrktwnfive = null;
		else
			this.costbrktwnfive = costbrktwnfive;
	}

	public String getIntfeeincldaymtg() {
		return intfeeincldaymtg;
	}

	public void setIntfeeincldaymtg(String intfeeincldaymtg) {
		this.intfeeincldaymtg = intfeeincldaymtg;
	}

	public String getLcdcostincldaymtg() {
		return lcdcostincldaymtg;
	}

	public void setLcdcostincldaymtg(String lcdcostincldaymtg) {
		this.lcdcostincldaymtg = lcdcostincldaymtg;
	}

	public String getScncostincldaymtg() {
		return scncostincldaymtg;
	}

	public void setScncostincldaymtg(String scncostincldaymtg) {
		this.scncostincldaymtg = scncostincldaymtg;
	}


	public String getHonorrate() {
		return honorrate;
	}

	public void setHonorrate(String honorrate) {
		this.honorrate = honorrate;
	}

	public String getCaprate() {
		return caprate;
	}

	public void setCaprate(String caprate) {
		this.caprate = caprate;
	}

	public Long getCaprateqty() {
		return caprateqty;
	}

	public void setCaprateqty(Long caprateqty) {
		this.caprateqty = caprateqty;
	}

	public String getApplyvolume_outblock() {
		return applyvolume_outblock;
	}

	public void setApplyvolume_outblock(String applyvolume_outblock) {
		this.applyvolume_outblock = applyvolume_outblock;
	}

	public String getDiscfb() {
		return discfb;
	}

	public void setDiscfb(String discfb) {
		this.discfb = discfb;
	}

	public String getDiscav() {
		return discav;
	}

	public void setDiscav(String discav) {
		this.discav = discav;
	}

	public Long getComprooms() {
		return comprooms;
	}

	public void setComprooms(Long comprooms) {
		this.comprooms = comprooms;
	}

	public String getCompparking() {
		return compparking;
	}

	public void setCompparking(String compparking) {
		this.compparking = compparking;
	}

	public String getUpfrontdep() {
		return upfrontdep;
	}

	public void setUpfrontdep(String upfrontdep) {
		this.upfrontdep = upfrontdep;
	}

	public Long getNegratefifty() {
		return negratefifty;
	}

	public void setNegratefifty(Long negratefifty) {
		if (negratefifty == null)
			this.negratefifty = null;
		else
			this.negratefifty = negratefifty;
	}

	public Long getNegratehund() {
		return negratehund;
	}

	public void setNegratehund(Long negratehund) {
		if (negratehund == null)
			this.negratehund = null;
		else
			this.negratehund = negratehund;
	}

	public String getNegtranshighrate() {
		return negtranshighrate;
	}

	public void setNegtranshighrate(String negtranshighrate) {
		this.negtranshighrate = negtranshighrate;
	}

	public String getDaymtgpkgs() {
		return daymtgpkgs;
	}

	public void setDaymtgpkgs(String daymtgpkgs) {
		this.daymtgpkgs = daymtgpkgs;
	}

	public Double getFulldayratefifty() {
		return fulldayratefifty;
	}

	public void setFulldayratefifty(Double fulldayratefifty) {
		if (fulldayratefifty == null)
			this.fulldayratefifty = null;
		else
			this.fulldayratefifty = fulldayratefifty;
	}

	public Double getHalfdayratefifty() {
		return halfdayratefifty;
	}

	public void setHalfdayratefifty(Double halfdayratefifty) {
		if (halfdayratefifty == null)
			this.halfdayratefifty = null;
		else
		this.halfdayratefifty = halfdayratefifty;
	}
	
	
	public String formatRate(double thenum) {
			int num = (int) thenum;		
			if (num == thenum) {
				return new DecimalFormat("#0").format(thenum);
			} else {
				return new DecimalFormat("#0.00").format(thenum);
			}
	}

	public String getFmFulldayratefifty(){
		if ( fulldayratefifty == null)	
			return "";
		else 
		return formatRate(this.fulldayratefifty);
	}
	
	public String getFmHalfdayratefifty(){
		if ( halfdayratefifty == null)	
			return "";
		else 
			return formatRate(this.halfdayratefifty);
	}
	
	public String getFmFulldayratehund(){		
		if ( fulldayratehund == null)	
			return "";
		else 
			return formatRate(this.fulldayratehund);
	}
	
	public String getFmHalfdayratehund(){
		if ( halfdayratehund == null)	
			return "";
		else 
		return formatRate(this.halfdayratehund);
	}
	
	public String getFmCostbrkten(){	
        if ( costbrkten == null)	
        	return "";
        else 	
		    return formatRate(this.costbrkten);
	}
	
	public String getFmCostbrktwnfive(){
        if ( costbrktwnfive == null)	
        	return "";
        else 	
        	return formatRate(this.costbrktwnfive);
	}
	public String getFmNegratefifty(){	
        if ( negratefifty == null)	
        	return "";
        else 	
		    return formatRate(this.negratefifty);
	}
	
	public String getFmNegratehund(){
        if ( negratehund == null)	
        	return "";
        else 	
        	return formatRate(this.negratehund);
	}

}
