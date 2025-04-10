package com.marriott.rfp.object.wholesaler.rates;

import java.io.Serializable;

public class Rates  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long rates_id;
	private long daysofweek_id;
	private long daysofweek_ref_id;
	private long bedtype_id;
	private long bedtype_ref_id;
	private long roompool_id;
	private float room_rate;
	
	public long getRates_id() {
		return rates_id;
	}
	
	public void setRates_id(long rates_id) {
		this.rates_id = rates_id;
	}
	
	public long getDaysofweek_id() {
		return daysofweek_id;
	}
	
	public void setDaysofweek_id(long daysofweek_id) {
		this.daysofweek_id = daysofweek_id;
	}
	
	public long getDaysofweek_ref_id() {
		return daysofweek_ref_id;
	}
	
	public void setDaysofweek_ref_id(long daysofweek_ref_id) {
		this.daysofweek_ref_id = daysofweek_ref_id;
	}
	
	public long getBedtype_id() {
		return bedtype_id;
	}
	
	public void setBedtype_id(long bedtype_id) {
		this.bedtype_id = bedtype_id;
	}
	
	public long getBedtype_ref_id() {
		return bedtype_ref_id;
	}
	
	public void setBedtype_ref_id(long bedtype_ref_id) {
		this.bedtype_ref_id = bedtype_ref_id;
	}
	
	public long getRoompool_id() {
		return roompool_id;
	}
	
	public void setRoompool_id(long roompool_id) {
		this.roompool_id = roompool_id;
	}
	
	public float getRoom_rate() {
		return room_rate;
	}
	
	public void setRoom_rate(float room_rate) {
		this.room_rate = room_rate;
	}

}