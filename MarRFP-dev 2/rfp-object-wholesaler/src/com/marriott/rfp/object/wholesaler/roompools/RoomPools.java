package com.marriott.rfp.object.wholesaler.roompools;

import java.io.Serializable;

public class RoomPools  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long roompool_id;
	private long roompool_ref_id;
	private String roompool;
	private long roompool_seq_id;
	private boolean hasRates;
	
	public long getRoompool_id() {
		return roompool_id;
	}
	
	public void setRoompool_id(long roompool_id) {
		this.roompool_id = roompool_id;
	}
	
	public long getRoompool_ref_id() {
		return roompool_ref_id;
	}
	
	public void setRoompool_ref_id(long roompool_ref_id) {
		this.roompool_ref_id = roompool_ref_id;
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

}