package com.marriott.rfp.object.wholesaler.period;

import java.io.Serializable;
import java.util.List;

public class Period implements Serializable{
	
	private long period;
	private String startdate;
    private String enddate;
    private String startdatemmddyyyy;
    private String enddatemmddyyyy;
	private String hotelsview;
	private static final long serialVersionUID = 1L;
	private List<WholeSalerPeriod> dueDates;

	public List<WholeSalerPeriod> getDueDates() {
		return dueDates;
	}

	public void setDueDates(List<WholeSalerPeriod> dueDates) {
		this.dueDates = dueDates;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public long getPeriod() {
		return period;
	}

	public void setPeriod(long period) {
		this.period = period;
	}

	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public String getHotelsview() {
		return hotelsview;
	}

	public void setHotelsview(String hotelsview) {
		this.hotelsview = hotelsview;
	}

	public String getStartdatemmddyyyy() {
		return startdatemmddyyyy;
	}

	public void setStartdatemmddyyyy(String startdatemmddyyyy) {
		this.startdatemmddyyyy = startdatemmddyyyy;
	}

	public String getEnddatemmddyyyy() {
		return enddatemmddyyyy;
	}

	public void setEnddatemmddyyyy(String enddatemmddyyyy) {
		this.enddatemmddyyyy = enddatemmddyyyy;
	}
	
}