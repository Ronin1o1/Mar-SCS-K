package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelRFPRmPools implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long seq;
	private String required;
	
	// Temporarily added till we work on Fixed Rates screen for multiple room pools
	private String room_pool;
	
	/**
	 * SWIRM-195 : List of room pool name
	 * @return
	 */
	private List<String> roomPoolList;

	public Long getSeq() {
		return seq;
	}

	public void setSeq(Long seq) {
		this.seq = seq;
	}

	public void setRequired(String required) {
		this.required = required;
	}

	public String getRequired() {
		return required;
	}

	/**
	 * SWIRM-195 : List of room pool name
	 * @return
	 */
	public List<String> getRoomPoolList() {
		return roomPoolList;
	}

	/**
	 * SWIRM-195
	 * @param roomPoolList
	 */
	public void setRoomPoolList(List<String> roomPoolList) {
		this.roomPoolList = roomPoolList;
	}

	public String getRoom_pool() {
		return room_pool;
	}

	public void setRoom_pool(String room_pool) {
		this.room_pool = room_pool;
	}

}
