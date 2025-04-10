package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTAcctPricingDetail implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountname;
	private String donotprice;
	private String lra;
	private Double fcst_rns;
	private Double fcst_rns_amt_chg;
	private Double fcst_rns_pct_chg;
	private Double weightedrate;
	private Double weightedrate_amt_chg;
	private Double weightedrate_pct_chg;
	private Double weightedratenet;
	private Double weightedratenet_amt_chg;
	private Double weightedratenet_pct_chg;
	private Double pct_prevrate_rcmd_max;
	private Double rcmd_min_rate_net;
	private Double rcmd_max_rate_net;
	private Double pct_antc_rcmd_min;
	private Double pct_accrate_weighted_retail;
	private String bt_status;
	private String scpt_status;
	private String groupid;
	private Long hotelid;
	private Long scpt_accountid;	
	private String accountsegment;
	private String salesmanager;
	
	
	
	public String getAccountsegment() {
		return accountsegment;
	}
	public void setAccountsegment(String accountsegment) {
		this.accountsegment = accountsegment;
	}
	public String getSalesmanager() {
		return salesmanager;
	}
	public void setSalesmanager(String salesmanager) {
		this.salesmanager = salesmanager;
	}
	public String getAccountname() {
		return accountname;
	}
	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}
	public String getDonotprice() {
		return donotprice;
	}
	public void setDonotprice(String donotprice) {
		this.donotprice = donotprice;
	}
	public String getLra() {
		return lra;
	}
	public void setLra(String lra) {
		this.lra = lra;
	}

	public String getBt_status() {
		return bt_status;
	}
	public void setBt_status(String bt_status) {
		this.bt_status = bt_status;
	}
	public String getScpt_status() {
		return scpt_status;
	}
	public void setScpt_status(String scpt_status) {
		this.scpt_status = scpt_status;
	}

	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	public Long getHotelid() {
		return hotelid;
	}
	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}
	public Long getScpt_accountid() {
		return scpt_accountid;
	}
	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}
	public Double getFcst_rns() {
		return fcst_rns;
	}
	public void setFcst_rns(Double fcst_rns) {
		this.fcst_rns = fcst_rns;
	}
	public Double getFcst_rns_amt_chg() {
		return fcst_rns_amt_chg;
	}
	public void setFcst_rns_amt_chg(Double fcst_rns_amt_chg) {
		this.fcst_rns_amt_chg = fcst_rns_amt_chg;
	}
	public Double getFcst_rns_pct_chg() {
		return fcst_rns_pct_chg;
	}
	public void setFcst_rns_pct_chg(Double fcst_rns_pct_chg) {
		this.fcst_rns_pct_chg = fcst_rns_pct_chg;
	}
	public Double getWeightedrate() {
		return weightedrate;
	}
	public void setWeightedrate(Double weightedrate) {
		this.weightedrate = weightedrate;
	}
	public Double getWeightedrate_amt_chg() {
		return weightedrate_amt_chg;
	}
	public void setWeightedrate_amt_chg(Double weightedrate_amt_chg) {
		this.weightedrate_amt_chg = weightedrate_amt_chg;
	}
	public Double getWeightedrate_pct_chg() {
		return weightedrate_pct_chg;
	}
	public void setWeightedrate_pct_chg(Double weightedrate_pct_chg) {
		this.weightedrate_pct_chg = weightedrate_pct_chg;
	}
	public Double getWeightedratenet() {
		return weightedratenet;
	}
	public void setWeightedratenet(Double weightedratenet) {
		this.weightedratenet = weightedratenet;
	}
	public Double getWeightedratenet_amt_chg() {
		return weightedratenet_amt_chg;
	}
	public void setWeightedratenet_amt_chg(Double weightedratenet_amt_chg) {
		this.weightedratenet_amt_chg = weightedratenet_amt_chg;
	}
	public Double getWeightedratenet_pct_chg() {
		return weightedratenet_pct_chg;
	}
	public void setWeightedratenet_pct_chg(Double weightedratenet_pct_chg) {
		this.weightedratenet_pct_chg = weightedratenet_pct_chg;
	}
	public Double getPct_prevrate_rcmd_max() {
		return pct_prevrate_rcmd_max;
	}
	public void setPct_prevrate_rcmd_max(Double pct_prevrate_rcmd_max) {
		this.pct_prevrate_rcmd_max = pct_prevrate_rcmd_max;
	}
	public Double getRcmd_min_rate_net() {
		return rcmd_min_rate_net;
	}
	public void setRcmd_min_rate_net(Double rcmd_min_rate_net) {
		this.rcmd_min_rate_net = rcmd_min_rate_net;
	}
	public Double getRcmd_max_rate_net() {
		return rcmd_max_rate_net;
	}
	public void setRcmd_max_rate_net(Double rcmd_max_rate_net) {
		this.rcmd_max_rate_net = rcmd_max_rate_net;
	}
	public Double getPct_antc_rcmd_min() {
		return pct_antc_rcmd_min;
	}
	public void setPct_antc_rcmd_min(Double pct_antc_rcmd_min) {
		this.pct_antc_rcmd_min = pct_antc_rcmd_min;
	}
	public Double getPct_accrate_weighted_retail() {
		return pct_accrate_weighted_retail;
	}
	public void setPct_accrate_weighted_retail(Double pct_accrate_weighted_retail) {
		this.pct_accrate_weighted_retail = pct_accrate_weighted_retail;
	}
		
	

}
