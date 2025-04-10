package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class MirrorExceptionDetail implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String marshacode;
	private String name;
	private String dscr1;
	private String mres1;
	private String dscr2;
	private String mres2;
	private Long hotelid;
	private String canhavesecondroompool;

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

	public String getDscr1() {
		return dscr1;
	}

	public void setDscr1(String dscr1) {
		if (dscr1 != null)
			this.dscr1 = dscr1.toUpperCase();
		else
			this.dscr1 = dscr1;
	}

	public String getMres1() {
		return mres1;
	}

	public void setMres1(String mres1) {
		if (mres1 != null)
			this.mres1 = mres1.toUpperCase();
		else
			this.mres1 = mres1;
	}

	public String getDscr2() {

		return dscr2;
	}

	public void setDscr2(String dscr2) {
		if (dscr2 != null)
			this.dscr2 = dscr2.toUpperCase();
		else
			this.dscr2 = dscr2;
	}

	public String getMres2() {
		return mres2;
	}

	public void setMres2(String mres2) {
		if (mres2 != null)
			this.mres2 = mres2.toUpperCase();
		else
			this.mres2 = mres2;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setCanhavesecondroompool(String canhavesecondroompool) {
		this.canhavesecondroompool = canhavesecondroompool;
	}

	public String getCanhavesecondroompool() {
		return canhavesecondroompool;
	}

}
