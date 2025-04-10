package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class SCPTSetUpWtdRetailRate implements Serializable {
	private static final long serialVersionUID = 1L;
	private long hotelid;
	private long period;
	private Double yoy_retailrate_chg;
	private Double  wtd_prev_retail_rate;
	private Double wtd_retail_rate;
	
	public void setYoy_retailrate_chg(Double yoy_retailrate_chg) {
		this.yoy_retailrate_chg = yoy_retailrate_chg;
	}
	public Double getYoy_retailrate_chg() {
		return yoy_retailrate_chg;
	}
	public void setWtd_prev_retail_rate(Double wtd_prev_retail_rate) {
		this.wtd_prev_retail_rate = wtd_prev_retail_rate;
	}
	public Double getWtd_prev_retail_rate() {
		return wtd_prev_retail_rate;
	}
	public void setWtd_retail_rate(Double wtd_retail_rate) {
		this.wtd_retail_rate = wtd_retail_rate;
	}
	public Double getWtd_retail_rate() {
		return wtd_retail_rate;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	public long getHotelid() {
		return hotelid;
	}
	public void setPeriod(long period) {
		this.period = period;
	}
	public long getPeriod() {
		return period;
	}
	public String getFormattedYoy_retailrate_chg() {
		if(yoy_retailrate_chg != null  && yoy_retailrate_chg!=0)
		return NumberUtility.formatRateNumber(yoy_retailrate_chg);
		else if(yoy_retailrate_chg != null  && yoy_retailrate_chg ==0)
			return "0";
			else
			return null;
	    }

}
