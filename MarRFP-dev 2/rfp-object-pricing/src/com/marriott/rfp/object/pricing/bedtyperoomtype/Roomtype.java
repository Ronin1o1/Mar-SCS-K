package com.marriott.rfp.object.pricing.bedtyperoomtype;

import java.io.Serializable;

public class Roomtype implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	long promo_roomtypeid;
	String roomtype;
	String roomtype_view;
	long seqid;
	String used;
	

	public long getPromo_roomtypeid() {
		return promo_roomtypeid;
	}

	public void setPromo_roomtypeid(long promo_roomtypeid) {
		this.promo_roomtypeid = promo_roomtypeid;
	}

	public String getRoomtype() {
		return roomtype;
	}

	public void setRoomtype(String roomtype) {
		this.roomtype = roomtype;
	}

	public String getRoomtype_view() {
		return roomtype_view;
	}

	public void setRoomtype_view(String roomtype_view) {
		this.roomtype_view = roomtype_view;
	}

	public long getSeqid() {
		return seqid;
	}

	public void setSeqid(long seqid) {
		this.seqid = seqid;
	}

	public String getUsed() {
		return used;
	}

	public void setUsed(String used) {
		this.used = used;
	}

}
