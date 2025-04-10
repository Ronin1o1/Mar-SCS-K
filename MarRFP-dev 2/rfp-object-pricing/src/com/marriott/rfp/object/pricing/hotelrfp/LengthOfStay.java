package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class LengthOfStay implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rfplosid;
	private Long hotelrfpid;
	private Long lengthofstayid;
	private Long roomnightsfrom;
	private Long roomnightsto;

	public Long getRfplosid() {
		return rfplosid;
	}

	public void setRfplosid(Long rfplosid) {
		this.rfplosid = rfplosid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getLengthofstayid() {
		return lengthofstayid;
	}

	public void setLengthofstayid(Long lengthofstayid) {
		this.lengthofstayid = lengthofstayid;
	}

	public Long getRoomnightsfrom() {
		return roomnightsfrom;
	}

	public void setRoomnightsfrom(Long roomnightsfrom) {
		if (roomnightsfrom!=null && roomnightsfrom.equals(0))
			this.roomnightsfrom=null;
		this.roomnightsfrom = roomnightsfrom;
	}

	public Long getRoomnightsto() {
		return roomnightsto;
	}

	public void setRoomnightsto(Long roomnightsto) {
		if (roomnightsto!=null && roomnightsto.equals(0))
			this.roomnightsto=null;
		this.roomnightsto = roomnightsto;
	}

}
