package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;

public class SalesDepth_En_LOS implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long salesdepth_en_los_id;
	private Long salesdepthid;
	private Long losid;
	private long roomnightsfrom;
	private long roomnightsto;

	public Long getSalesdepth_en_los_id() {
		return salesdepth_en_los_id;
	}

	public void setSalesdepth_en_los_id(Long salesdepth_en_los_id) {
		this.salesdepth_en_los_id = salesdepth_en_los_id;
	}

	public Long getSalesdepthid() {
		return salesdepthid;
	}

	public void setSalesdepthid(Long salesdepthid) {
		this.salesdepthid = salesdepthid;
	}

	public Long getLosid() {
		return losid;
	}

	public void setLosid(Long losid) {
		this.losid = losid;
	}

	public long getRoomnightsfrom() {
		return roomnightsfrom;
	}

	public void setRoomnightsfrom(long roomnightsfrom) {
		this.roomnightsfrom = roomnightsfrom;
	}

	public long getRoomnightsto() {
		return roomnightsto;
	}

	public void setRoomnightsto(long roomnightsto) {
		this.roomnightsto = roomnightsto;
	}

	public String getLosChar() {
		return String.valueOf((char)(losid+64));
	}
}
