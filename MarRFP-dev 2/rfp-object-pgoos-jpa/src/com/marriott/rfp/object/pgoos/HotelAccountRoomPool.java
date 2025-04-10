package com.marriott.rfp.object.pgoos;

public class HotelAccountRoomPool {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;	
	private Long hotel_accountinfoid;
	private int roomClassSeq;
	private int roomPoolSeq;
	private String recalcFlags;
	
	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}
	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}
	public int getRoomClassSeq() {
		return roomClassSeq;
	}
	public void setRoomClassSeq(int roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}
	public int getRoomPoolSeq() {
		return roomPoolSeq;
	}
	public void setRoomPoolSeq(int roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}
	public String getRecalcFlags() {
		return recalcFlags;
	}
	public void setRecalcFlags(String recalcFlags) {
		this.recalcFlags = recalcFlags;
	}	

}
