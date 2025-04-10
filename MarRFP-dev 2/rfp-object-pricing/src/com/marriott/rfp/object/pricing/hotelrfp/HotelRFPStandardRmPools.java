package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelRFPStandardRmPools implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long roomClassSeq;
	private Long bedtypeid;	
	private String bedtype;	
	private Long num_rms_actl_capacity;
	private List<HotelRFPStandardRmPoolDetails> roomPools;
		
	public Long getBedtypeid() {
		return bedtypeid;
	}

	public void setBedtypeid(Long bedtypeid) {
		this.bedtypeid = bedtypeid;
	}

	public String getBedtype() {
		return bedtype;
	}

	public void setBedtype(String bedtype) {
		this.bedtype = bedtype;
	}

	public Long getNum_rms_actl_capacity() {
		return num_rms_actl_capacity;
	}

	public void setNum_rms_actl_capacity(Long num_rms_actl_capacity) {
		this.num_rms_actl_capacity = num_rms_actl_capacity;
	}

	public long getRoomClassSeq() {
		return roomClassSeq;
	}

	public void setRoomClassSeq(long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}

	public List<HotelRFPStandardRmPoolDetails> getRoomPools() {
		return roomPools;
	}

	public void setRoomPools(List<HotelRFPStandardRmPoolDetails> roomPools) {
		this.roomPools = roomPools;
	}

}
