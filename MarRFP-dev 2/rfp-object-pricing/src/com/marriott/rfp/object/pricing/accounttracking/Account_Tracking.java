package com.marriott.rfp.object.pricing.accounttracking;

import java.io.Serializable;

public class Account_Tracking implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long acct_tracking_period;
    private Double roomnights;
    private Double revenue;
    private Double grp_roomnights;
    private Double grp_revenue;

    public Long getAcct_tracking_period() {
	return acct_tracking_period;
    }

    public void setAcct_tracking_period(Long acct_tracking_period) {
	this.acct_tracking_period = acct_tracking_period;
    }

    public Double getRoomnights() {
	return roomnights;
    }

    public void setRoomnights(Double roomnights) {
	this.roomnights = roomnights;
    }

    public void setStrRoomnights(String strroomnights) {
	if (strroomnights == null || strroomnights.equals(""))
	    this.roomnights = null;
	else
	    this.roomnights = Double.valueOf(strroomnights);
    }

    public Double getGrp_roomnights() {
	return grp_roomnights;
    }

    public void setGrp_roomnights(Double grp_roomnights) {
	this.grp_roomnights = grp_roomnights;
    }

    public void setStrGrp_roomnights(String strgrp_roomnights) {
	if (strgrp_roomnights == null || strgrp_roomnights.equals(""))
	    this.grp_roomnights = null;
	else
	    this.grp_roomnights = Double.valueOf(strgrp_roomnights);
    }

    public Double getGrp_revenue() {
	return grp_revenue;
    }

    public void setGrp_revenue(Double grp_revenue) {
	this.grp_revenue = grp_revenue;
    }

    public void setStrGrp_revenue(String strgrp_revenue) {
	if (strgrp_revenue == null || strgrp_revenue.equals(""))
	    this.grp_revenue = null;
	else
	    this.grp_revenue = Double.valueOf(strgrp_revenue);
    }

    public void setRevenue(Double revenue) {
	this.revenue = revenue;
    }

    public void setStrRevenue(String strrevenue) {
	if (strrevenue == null || strrevenue.equals(""))
	    this.revenue = null;
	else
	    this.revenue = Double.valueOf(strrevenue);
    }

    public Double getRevenue() {
	return revenue;
    }

}
