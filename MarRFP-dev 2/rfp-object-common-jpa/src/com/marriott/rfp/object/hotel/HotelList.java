package com.marriott.rfp.object.hotel;

import java.io.Serializable;

public class HotelList implements Serializable {

	private String marshacode;
	private String name;
	private long hotelid;

	private static final long serialVersionUID = 1L;
	
	public HotelList(){
		super();
	}

	public String getMarshacode() {
		return marshacode;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public long getHotelid() {
		return hotelid;
	}

	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	

}
