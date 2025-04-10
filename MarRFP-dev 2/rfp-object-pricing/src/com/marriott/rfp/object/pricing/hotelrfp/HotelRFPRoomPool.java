/**
 * 
 */
package com.marriott.rfp.object.pricing.hotelrfp;

/**
 * @author rana.v.pratap.singh
 *
 */
public class HotelRFPRoomPool {

	private Long roomClassSeq;
	
	private Long roomPoolSeq;
	
	private String roomPool;
	
	private String required;
	
	public Long getRoomClassSeq() {
		return roomClassSeq;
	}
	
	public void setRoomClassSeq(Long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}
	
	public Long getRoomPoolSeq() {
		return roomPoolSeq;
	}
	
	public void setRoomPoolSeq(Long roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}
	
	public String getRoomPool() {
		return roomPool;
	}
	
	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}
	
	public String getRequired() {
		return required;
	}
	
	public void setRequired(String required) {
		this.required = required;
	}
}
