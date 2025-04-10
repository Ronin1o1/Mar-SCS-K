package com.marriott.rfp.object.wholesaler.seasons;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class Seasons implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long season_id;
	private Date start_date;
	private Date end_date;
	private long combo_id;
	private boolean hasRates;
	private boolean ratesChanged;
	private String participating;
	
	public Long getSeason_id() {
		return season_id;
	}
	
	public void setSeason_id(Long season_id) {
		this.season_id = season_id;
	}
	
	public Date getStart_date() {
		return start_date;
	}
	
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	
	public Date getEnd_date() {
		return end_date;
	}
	
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
	
	public long getCombo_id() {
		return combo_id;
	}
	
	public void setCombo_id(long combo_id) {
		this.combo_id = combo_id;
	}
	
	public boolean isHasRates() {
		return hasRates;
	}
	
	public void setHasRates(boolean hasRates) {
		this.hasRates = hasRates;
	}
	
	public String getShortStartdate() {
		return DateUtility.formatShortDate(start_date);
	}

	public String getShortEnddate() {
		return DateUtility.formatShortDate(end_date);
	}
	
	public String getLongStartdate() {
		return DateUtility.formatLongDate(start_date);
	}

	public String getLongEnddate() {
		return DateUtility.formatLongDate(end_date);
	}
	
	public boolean isRatesChanged() {
		return ratesChanged;
	}
	
	public void setRatesChanged(boolean ratesChanged) {
		this.ratesChanged = ratesChanged;
	}

	public String getParticipating() {
		return participating;
	}

	public void setParticipating(String participating) {
		this.participating = participating;
	}
	
}