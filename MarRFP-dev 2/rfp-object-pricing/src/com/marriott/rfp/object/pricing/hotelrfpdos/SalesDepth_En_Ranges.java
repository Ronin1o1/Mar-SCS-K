package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;
import java.util.List;

public class SalesDepth_En_Ranges implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long salesdepth_en_ranges_id;
    private Long salesdepthid;
    private Long seqid;
    private Long volrmin;
    private Long volrmax;
    private Long seasonid;
    private String comments;
    private List<SalesDepth_En_Rates> salesdepth_en_rates;
    private Long maxInfinityNum = 999999L;

    public Long getSalesdepth_en_ranges_id() {
	return salesdepth_en_ranges_id;
    }

    public void setSalesdepth_en_ranges_id(Long salesdepth_en_ranges_id) {
	this.salesdepth_en_ranges_id = salesdepth_en_ranges_id;
    }

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
	    this.volrmax=null;
	else
	    this.volrmax = Long.valueOf(volrmax);
    }

    public String getStringVolrmax() {
	String strvolrmax = "";
	if (volrmax != null) {
	    if (volrmax.equals(maxInfinityNum))
		strvolrmax = "+";
	}
	return strvolrmax;
    }

    public Long getMaxInfinityNum() {
	return maxInfinityNum;
    }

    public Long getSeasonid() {
	return seasonid;
    }

    public void setSeasonid(Long seasonid) {
	this.seasonid = seasonid;
    }

    public String getComments() {
	return comments;
    }

    public void setComments(String comments) {
	this.comments = comments;
    }

    public void setSalesdepth_en_rates(List<SalesDepth_En_Rates> salesdepth_en_rates) {
	this.salesdepth_en_rates = salesdepth_en_rates;
    }

    public List<SalesDepth_En_Rates> getSalesdepth_en_rates() {
	return salesdepth_en_rates;
    }

}
