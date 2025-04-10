package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class SCPTSetUpThresholds implements Serializable {
	private static final long serialVersionUID = 1L;
	private long hotelid;
	private long period;
	private long thrs_rmnt_low;
	private long thrs_rmnt_mid;
	private Double thrs_perct_rtl_low;
	private Double thrs_perct_rtl_mid;
	private Double thrs_curry_rtl_low;
	private Double thrs_curry_rtl_mid;
	private String thrs_percentage;
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
	
	public Double getThrs_perct_rtl_low() {
		return thrs_perct_rtl_low;
	}
	public void setThrs_perct_rtl_low(Double thrs_perct_rtl_low) {
		this.thrs_perct_rtl_low = thrs_perct_rtl_low;
	}
	public Double getThrs_perct_rtl_mid() {
		return thrs_perct_rtl_mid;
	}
	public void setThrs_perct_rtl_mid(Double thrs_perct_rtl_mid) {
		this.thrs_perct_rtl_mid = thrs_perct_rtl_mid;
	}
	public Double getThrs_curry_rtl_low() {
		return thrs_curry_rtl_low;
	}
	public void setThrs_curry_rtl_low(Double thrs_curry_rtl_low) {
		this.thrs_curry_rtl_low = thrs_curry_rtl_low;
	}
	public Double getThrs_curry_rtl_mid() {
		return thrs_curry_rtl_mid;
	}
	public void setThrs_curry_rtl_mid(Double thrs_curry_rtl_mid) {
		this.thrs_curry_rtl_mid = thrs_curry_rtl_mid;
	}
	public String getThrs_percentage() {
		return thrs_percentage;
	}
	public void setThrs_percentage(String thrs_percentage) {
		this.thrs_percentage = thrs_percentage;
	}
	public void setThrs_rmnt_low(long thrs_rmnt_low) {
		this.thrs_rmnt_low = thrs_rmnt_low;
	}
	public long getThrs_rmnt_low() {
		return thrs_rmnt_low;
	}
	public void setThrs_rmnt_mid(long thrs_rmnt_mid) {
		this.thrs_rmnt_mid = thrs_rmnt_mid;
	}
	public long getThrs_rmnt_mid() {
		return thrs_rmnt_mid;
	}

}
