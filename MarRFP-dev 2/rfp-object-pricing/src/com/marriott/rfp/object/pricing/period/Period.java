package com.marriott.rfp.object.pricing.period;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;


public class Period implements Serializable {

	private Long period;

	private Date startdate;

	private Date enddate;

	private String hotelsview;
	private List<PricingPeriod> dueDates;

	private static final long serialVersionUID = 1L;

	public Period() {
		super();
	}

	public Long getPeriod() {
		return this.period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Date getStartdate() {
		return this.startdate;
	}

	public String getShortStartdate() {
		String str = "";
		if (startdate != null)
			str = DateUtility.formatShortDate(startdate);
		return str;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return this.enddate;
	}

	public String getShortEnddate() {
		String str = "";
		if (enddate != null)
			str = DateUtility.formatShortDate(enddate);
		return str;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public String getHotelsview() {
		return this.hotelsview;
	}

	public void setHotelsview(String hotelsview) {
		this.hotelsview = hotelsview;
	}

	public void setDueDates(List<PricingPeriod> dueDates) {
		this.dueDates = dueDates;
	}

	public List<PricingPeriod> getDueDates() {
		return dueDates;
	}

}
