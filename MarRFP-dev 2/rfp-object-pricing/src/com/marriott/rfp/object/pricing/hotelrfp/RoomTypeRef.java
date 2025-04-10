package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RoomTypeRef implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String roomtypedescription;
	private String required;
	private Long roomtypeid;

	public String getRoomtypedescription() {
		return roomtypedescription;
	}

	public void setRoomtypedescription(String roomtypedescription) {
		this.roomtypedescription = roomtypedescription;
	}

	public String getRequired() {
		return required;
	}

	public void setRequired(String required) {
		this.required = required;
	}

	public Long getRoomtypeid() {
		return roomtypeid;
	}

	public void setRoomtypeid(Long roomtypeid) {
		this.roomtypeid = roomtypeid;
	}

}
