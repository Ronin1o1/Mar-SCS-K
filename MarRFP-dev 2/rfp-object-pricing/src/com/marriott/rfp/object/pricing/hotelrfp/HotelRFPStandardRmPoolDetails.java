package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelRFPStandardRmPoolDetails implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long roomPoolSeq;
	private String roomPool;
	private String rpgm;
	private String restrictionRpgm;
	private Long actualNumRooms;
	private Long roomtypeid;
	private String roomtype;
	
	
	public long getRoomPoolSeq() {
		return roomPoolSeq;
	}
	public void setRoomPoolSeq(long roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}
	public String getRoomPool() {
		return roomPool;
	}
	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}
	public String getRpgm() {
		return rpgm;
	}
	public void setRpgm(String rpgm) {
		this.rpgm = rpgm;
	}
	public String getRestrictionRpgm() {
		return restrictionRpgm;
	}
	public void setRestrictionRpgm(String restrictionRpgm) {
		this.restrictionRpgm = restrictionRpgm;
	}
	public Long getActualNumRooms() {
		return actualNumRooms;
	}
	public void setActualNumRooms(Long actualNumRooms) {
		this.actualNumRooms = actualNumRooms;
	}
	public Long getRoomtypeid() {
		return roomtypeid;
	}
	public void setRoomtypeid(Long roomtypeid) {
		this.roomtypeid = roomtypeid;
	}
	public String getRoomtype() {
		return roomtype;
	}
	public void setRoomtype(String roomtype) {
		this.roomtype = roomtype;
	}
	

}
