package com.marriott.rfp.object.wholesaler.roomselection;

import java.io.Serializable;

public class RoomSelection implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private long roompool_id;
	private String roompool;
	private long roompool_ref_id;
	private long roompool_seq_id;
	private long participation_id;
	private boolean hasRates;
	private String checkbox_;
	private String checkbox_changed_;
	private String checkbox_hasrates_;
	private String checkbox_values_;
	private String statusid;
	
	public long getRoompool_id() {
		return roompool_id;
	}
	
	public void setRoompool_id(long roompool_id) {
		this.roompool_id = roompool_id;
	}
	
	public String getRoompool() {
		return roompool;
	}
	
	public void setRoompool(String roompool) {
		this.roompool = roompool;
	}
	
	public long getRoompool_seq_id() {
		return roompool_seq_id;
	}
	
	public void setRoompool_seq_id(long roompool_seq_id) {
		this.roompool_seq_id = roompool_seq_id;
	}
	
	public boolean isHasRates() {
		return hasRates;
	}
	
	public void setHasRates(boolean hasRates) {
		this.hasRates = hasRates;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public long getRoompool_ref_id() {
		return roompool_ref_id;
	}
	
	public void setRoompool_ref_id(long roompool_ref_id) {
		this.roompool_ref_id = roompool_ref_id;
	}
	
	public long getParticipation_id() {
		return participation_id;
	}
	
	public void setParticipation_id(long participation_id) {
		this.participation_id = participation_id;
	}
	
	public String getCheckbox_() {
		return checkbox_;
	}
	
	public void setCheckbox_(String checkbox_) {
		this.checkbox_ = checkbox_;
	}
	
	public String getCheckbox_changed_() {
		return checkbox_changed_;
	}
	
	public void setCheckbox_changed_(String checkbox_changed_) {
		this.checkbox_changed_ = checkbox_changed_;
	}
	
	public String getCheckbox_hasrates_() {
		return checkbox_hasrates_;
	}
	
	public void setCheckbox_hasrates_(String checkbox_hasrates_) {
		this.checkbox_hasrates_ = checkbox_hasrates_;
	}
	
	public String getCheckbox_values_() {
		return checkbox_values_;
	}
	
	public void setCheckbox_values_(String checkbox_values_) {
		this.checkbox_values_ = checkbox_values_;
	}
	
	public String getStatusid() {
		return statusid;
	}
	
	public void setStatusid(String statusid) {
		this.statusid = statusid;
	}
	
}