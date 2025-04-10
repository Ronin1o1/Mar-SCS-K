package com.marriott.rfp.object.wholesaler.daysofweek;

import java.io.Serializable;

public class DaysOfWeek  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long combo_id;
	private long daysofweek_id;
	private Long season_id;
	private String daysofweek;
	private String daysofweek_ref;
	private boolean hasRates;
	private boolean ratesChanged;
	
	public long getCombo_id() {
		return combo_id;
	}
	
	public void setCombo_id(long combo_id) {
		this.combo_id = combo_id;
	}
	
	public long getDaysofweek_id() {
		return daysofweek_id;
	}
	
	public void setDaysofweek_id(long daysofweek_id) {
		this.daysofweek_id = daysofweek_id;
	}
	
	public Long getSeason_id() {
		return season_id;
	}
	
	public void setSeason_id(Long season_id) {
		this.season_id = season_id;
	}
	
	public String getDaysofweek() {
		return daysofweek;
	}
	
	public void setDaysofweek(String daysofweek) {
		this.daysofweek = daysofweek;
	}
	
	public String getDaysofweek_ref() {
		return daysofweek_ref;
	}
	
	public void setDaysofweek_ref(String daysofweek_ref) {
		this.daysofweek_ref = daysofweek_ref;
	}
	
	public boolean isHasRates() {
		return hasRates;
	}
	
	public void setHasRates(boolean hasRates) {
		this.hasRates = hasRates;
	}
	
	public boolean isRatesChanged() {
		return ratesChanged;
	}
	
	public void setRatesChanged(boolean ratesChanged) {
		this.ratesChanged = ratesChanged;
	}
	
}