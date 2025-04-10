package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelAccountSpecificRoomPoolData implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	
	private Long accountrpflagid;
	private Long roompool;
	private String lra;
	private String accepted;	
	private Long rejectreasonid;
	private String rejectionreason;	
	private String isSelected;
	private List<HotelAccountSpecificPGOOSData> hotelAccountSpecificPGOOSData;

	public String getIsSelected() {
		return isSelected;
	}
	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}
	public Long getAccountrpflagid() {
		return accountrpflagid;
	}
	public void setAccountrpflagid(Long accountrpflagid) {
		this.accountrpflagid = accountrpflagid;
	}
	public Long getRoompool() {
		return roompool;
	}
	public void setRoompool(Long roompool) {
		this.roompool = roompool;
	}
	public String getLra() {
		return lra;
	}
	public void setLra(String lra) {
		this.lra = lra;
	}
	public String getAccepted() {
		return accepted;
	}
	public void setAccepted(String accepted) {
		this.accepted = accepted;
	}
	public Long getRejectreasonid() {
		return rejectreasonid;
	}
	public void setRejectreasonid(Long rejectreasonid) {
		this.rejectreasonid = rejectreasonid;
	}
	public String getRejectionreason() {
		return rejectionreason;
	}
	public void setRejectionreason(String rejectionreason) {
		this.rejectionreason = rejectionreason;
	}
	public List<HotelAccountSpecificPGOOSData> getHotelAccountSpecificPGOOSData() {
		return hotelAccountSpecificPGOOSData;
	}
	public void setHotelAccountSpecificPGOOSData(List<HotelAccountSpecificPGOOSData> hotelAccountSpecificPGOOSData) {
		this.hotelAccountSpecificPGOOSData = hotelAccountSpecificPGOOSData;
	}
}