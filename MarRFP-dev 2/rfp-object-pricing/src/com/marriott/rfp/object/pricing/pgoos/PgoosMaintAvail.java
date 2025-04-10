package com.marriott.rfp.object.pricing.pgoos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

public class PgoosMaintAvail implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String marshacode;
	private String name;
	private String city="";	
	private String state="";
	private String country="";	
	private boolean futureopening; 	
	private long hotelid; 	
	
	
	public String getMarshacode() {
		return marshacode;
	}
	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}

	@JsonIgnore
	public boolean isFutureopening() {
		return futureopening;
	}

	public String getFutureopening(){
		String opening;
		if (isFutureopening())
			opening = "Y";
		else
			opening = "N";
		
		return opening;
		
		
	}
	
	public void setFutureopening(boolean futureopening) {
		this.futureopening = futureopening;
	}
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}



	
	
}
