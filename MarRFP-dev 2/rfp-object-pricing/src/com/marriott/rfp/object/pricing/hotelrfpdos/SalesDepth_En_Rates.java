package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;

public class SalesDepth_En_Rates implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long salesdepth_en_rates_id;
    private Long salesdepth_en_ranges_id;
    private Long losid;
    private Double ratemin;
    private Double ratemax;

    public Long getSalesdepth_en_rates_id() {
	return salesdepth_en_rates_id;
    }

    public void setSalesdepth_en_rates_id(Long salesdepth_en_rates_id) {
	this.salesdepth_en_rates_id = salesdepth_en_rates_id;
    }

    public Long getSalesdepth_en_ranges_id() {
	return salesdepth_en_ranges_id;
    }

    public void setSalesdepth_en_ranges_id(Long salesdepth_en_ranges_id) {
	this.salesdepth_en_ranges_id = salesdepth_en_ranges_id;
    }

    public Long getLosid() {
	return losid;
    }

    public void setLosid(Long losid) {
	this.losid = losid;
    }

    public Double getRatemin() {
	return ratemin;
    }

    public void setRatemin(Double ratemin) {
	this.ratemin = ratemin;
    }

    public void setStrRatemin(String strratemin) {
	if (strratemin == null || strratemin.equals(""))
	    this.ratemin = null;
	else
	    this.ratemin = Double.valueOf(strratemin);
    }

    public Double getRatemax() {
	return ratemax;
    }

    public void setRatemax(Double ratemax) {
	this.ratemax = ratemax;
    }

    public void setStrRatemax(String strratemax) {
	if (strratemax == null || strratemax.equals(""))
	    this.ratemax = null;
	else
	    this.ratemax = Double.valueOf(strratemax);
    }

}
