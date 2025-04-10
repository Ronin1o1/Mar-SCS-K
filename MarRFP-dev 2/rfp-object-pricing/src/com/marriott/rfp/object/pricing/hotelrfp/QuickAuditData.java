package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class QuickAuditData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<HotelLRA_NLRA> lranlratype;
	private List<RoomTypeRef> roomtypelist;
    private List<HotelRFPRmPools> roompoollist;

	private List<QuickAuditInfo> quickAuditInfo;

	public List<HotelLRA_NLRA> getLranlratype() {
		return lranlratype;
	}

	public void setLranlratype(List<HotelLRA_NLRA> lranlratype) {
		this.lranlratype = lranlratype;
	}

	public List<RoomTypeRef> getRoomtypelist() {
		return roomtypelist;
	}

	public void setRoomtypelist(List<RoomTypeRef> roomtypelist) {
		this.roomtypelist = roomtypelist;
	}

	public List<QuickAuditInfo> getQuickAuditInfo() {
		return quickAuditInfo;
	}

	public void setQuickAuditInfo(List<QuickAuditInfo> quickAuditInfo) {
		this.quickAuditInfo = quickAuditInfo;
	}

	public long getNumAudits() {
		if (quickAuditInfo != null)
			return quickAuditInfo.size();
		else
			return 0;
	}

	public void setRoompoollist(List<HotelRFPRmPools> roompoollist) {
		this.roompoollist = roompoollist;
	}

	public List<HotelRFPRmPools> getRoompoollist() {
		return roompoollist;
	}
}
