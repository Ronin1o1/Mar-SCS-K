package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;
import java.util.List;

public class MirrorDetail implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long hotelid;
	private String marshacode;
	private String hotelName;
	private List<MirrorRoomClassDetail> mirrorRoomClassList;
	private String mirror_exception_notes;
	
	public Long getHotelid() {
		return hotelid;
	}
	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}
	public String getMarshacode() {
		return marshacode;
	}
	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public List<MirrorRoomClassDetail> getMirrorRoomClassList() {
		return mirrorRoomClassList;
	}
	public void setMirrorRoomClassList(List<MirrorRoomClassDetail> mirrorRoomClassList) {
		this.mirrorRoomClassList = mirrorRoomClassList;
	}
	public String getMirror_exception_notes() {
		return mirror_exception_notes;
	}
	public void setMirror_exception_notes(String mirror_exception_notes) {
		this.mirror_exception_notes = mirror_exception_notes;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
