package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;

public class SalesDepth_Ranges implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long salesdepthid;
    private Long seqid;
    private Long volrmin;
    private Long volrmax;
    private Double ratermin;
    private Double ratermax;
    private String comments;
    private Long maxInfinityNum = 999999L;

    public Long getSalesdepthid() {
	return salesdepthid;
    }

    public void setSalesdepthid(Long salesdepthid) {
	this.salesdepthid = salesdepthid;
    }

    public Long getSeqid() {
	return seqid;
    }

    public void setSeqid(Long seqid) {
	this.seqid = seqid;
    }

    public Long getVolrmin() {
	return volrmin;
    }

    public void setVolrmin(Long volrmin) {
	this.volrmin = volrmin;
    }

    public Long getVolrmax() {
	return volrmax;
    }

    public void setVolrmax(Long volrmax) {
	this.volrmax = volrmax;
    }

    public void setStringVolrmax(String volrmax) {
	if (volrmax.equals("+"))
	    this.volrmax = maxInfinityNum;
	else if (volrmax.equals(""))
	    this.volrmax = null;
	else
	    this.volrmax = Long.valueOf(volrmax);
    }

    public String getStringVolrmax() {
	String strvolrmax = "";
	if (volrmax != null) {
	    if (volrmax.equals(maxInfinityNum))
		strvolrmax = "+";
	    else
		strvolrmax = volrmax.toString();
	}
	return strvolrmax;
    }

    public String getComments() {
	return comments;
    }

    public void setComments(String comments) {
	this.comments = comments;
    }

    public void setRatermin(Double ratermin) {
	this.ratermin = ratermin;
    }

    public void setStrRatermin(String strratermin) {
	if (strratermin == null || strratermin.equals(""))
	    this.ratermin = null;
	else
	    this.ratermin = Double.valueOf(strratermin);
    }

    public Double getRatermin() {
	return ratermin;
    }

    public void setRatermax(Double ratermax) {
	this.ratermax = ratermax;
    }

    public void setStrRatermax(String strratermax) {
	if (strratermax == null || strratermax.equals(""))
	    this.ratermax = null;
	else
	    this.ratermax = Double.valueOf(strratermax);
    }

    public Double getRatermax() {
	return ratermax;
    }

    public Long getMaxInfinityNum() {
	return maxInfinityNum;
    }

}
