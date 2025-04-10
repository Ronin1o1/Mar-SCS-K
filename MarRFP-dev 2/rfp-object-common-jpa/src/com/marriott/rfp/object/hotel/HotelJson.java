package com.marriott.rfp.object.hotel;

import java.io.Serializable;

public class HotelJson implements Serializable {

	private String marshacode;
	private String name;


	private static final long serialVersionUID = 1L;
	
	public HotelJson(){
		super();
	}

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


}
