package com.marriott.rfp.object.pricing.scpt;

import com.marriott.rfp.utility.NumberUtility;

public class SCPTSetUpBudgetAndForecastData {
	private static final long serialVersionUID = 1L;
	private long hotelid;
	private long period;
	private long prev_yr_rn;                                                                                                                                                                                                           
	private Double prev_yr_adr;                                                                                                                                                                                                    
	private Double prev_yr_revenue;                                                                                                                                                                                                          
	private long curr_yr_rn;                                                                                                                                                                                                              
	private Double curr_yr_adr;                                                                                                                                                                                                           
	private Double curr_yr_revenue;                                                                                                                                                                                                      
	private long curr_yr_fc_rn;                                                                                                                                                                                                           
	private Double curr_yr_fc_adr;                                                                                                                                                                                                         
	private Double curr_yr_fc_revenue;
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	public long getPeriod() {
		return period;
	}
	public void setPeriod(long period) {
		this.period = period;
	}
	
	public Double getPrev_yr_adr() {
		return prev_yr_adr;
	}
	public void setPrev_yr_adr(Double prev_yr_adr) {
		this.prev_yr_adr = prev_yr_adr;
	}
	public Double getPrev_yr_revenue() {
		return prev_yr_revenue;
	}
	public void setPrev_yr_revenue(Double prev_yr_revenue) {
		this.prev_yr_revenue = prev_yr_revenue;
	}
	
	public Double getCurr_yr_adr() {
		return curr_yr_adr;
	}
	public void setCurr_yr_adr(Double curr_yr_adr) {
		this.curr_yr_adr = curr_yr_adr;
	}
	public Double getCurr_yr_revenue() {
		return curr_yr_revenue;
	}
	public void setCurr_yr_revenue(Double curr_yr_revenue) {
		this.curr_yr_revenue = curr_yr_revenue;
	}
	
	public Double getCurr_yr_fc_adr() {
		return curr_yr_fc_adr;
	}
	public void setCurr_yr_fc_adr(Double curr_yr_fc_adr) {
		this.curr_yr_fc_adr = curr_yr_fc_adr;
	}
	public Double getCurr_yr_fc_revenue() {
		return curr_yr_fc_revenue;
	}
	public void setCurr_yr_fc_revenue(Double curr_yr_fc_revenue) {
		this.curr_yr_fc_revenue = curr_yr_fc_revenue;
	}
	public void setPrev_yr_rn(long prev_yr_rn) {
		this.prev_yr_rn = prev_yr_rn;
	}
	public long getPrev_yr_rn() {
		return prev_yr_rn;
	}
	public void setCurr_yr_rn(long curr_yr_rn) {
		this.curr_yr_rn = curr_yr_rn;
	}
	public long getCurr_yr_rn() {
		return curr_yr_rn;
	}
	public void setCurr_yr_fc_rn(long curr_yr_fc_rn) {
		this.curr_yr_fc_rn = curr_yr_fc_rn;
	}
	public long getCurr_yr_fc_rn() {
		return curr_yr_fc_rn;
	}   

}
