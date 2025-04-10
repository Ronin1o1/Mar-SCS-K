package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelRFPStandardRmPoolsDO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long roomClassSeq;
	private Long bedtypeid;
	private Long roomtypeid;
	private String bedtype;
	private String roomtype;
	private Long actualnumrooms;
	private long roomPoolseq;
	private String roompool;
	private String rpgm;	
	private String restrictionrpgm;
	
	public long getRoomClassSeq() {
		return roomClassSeq;
	}
	public void setRoomClassSeq(long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}
	public Long getBedtypeid() {
		return bedtypeid;
	}
	public void setBedtypeid(Long bedtypeid) {
		this.bedtypeid = bedtypeid;
	}
	public Long getRoomtypeid() {
		return roomtypeid;
	}
	public void setRoomtypeid(Long roomtypeid) {
		this.roomtypeid = roomtypeid;
	}
	public String getBedtype() {
		return bedtype;
	}
	public void setBedtype(String bedtype) {
		this.bedtype = bedtype;
	}
	public String getRoomtype() {
		return roomtype;
	}
	public void setRoomtype(String roomtype) {
		this.roomtype = roomtype;
	}
	public Long getActualnumrooms() {
		return actualnumrooms;
	}
	public void setActualnumrooms(Long actualnumrooms) {
		this.actualnumrooms = actualnumrooms;
	}
	public long getRoomPoolseq() {
		return roomPoolseq;
	}
	public void setRoomPoolseq(long roomPoolseq) {
		this.roomPoolseq = roomPoolseq;
	}
	public String getRoompool() {
		return roompool;
	}
	public void setRoompool(String roompool) {
		this.roompool = roompool;
	}
	public String getRpgm() {
		return rpgm;
	}
	public void setRpgm(String rpgm) {
		this.rpgm = rpgm;
	}
	public String getRestrictionrpgm() {
		return restrictionrpgm;
	}
	public void setRestrictionrpgm(String restrictionrpgm) {
		this.restrictionrpgm = restrictionrpgm;
	}

	

}
