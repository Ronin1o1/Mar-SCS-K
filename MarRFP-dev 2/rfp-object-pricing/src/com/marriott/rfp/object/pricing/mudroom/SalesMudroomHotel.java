package com.marriott.rfp.object.pricing.mudroom;

import java.io.Serializable;

public class SalesMudroomHotel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long salesRespondentHotelid;
	private String hotelName="";
	private String marshaCode="";

	/**
	 * @return the salesRespondentHotelid
	 */
	public long getSalesRespondentHotelid() {
		return salesRespondentHotelid;
	}
	/**
	 * @param salesRespondentHotelid the salesRespondentHotelid to set
	 */
	public void setSalesRespondentHotelid(long salesRespondentHotelid) {
		this.salesRespondentHotelid = salesRespondentHotelid;
	}
	/**
	 * @return the hotelName
	 */
	public String getHotelName() {
		return hotelName;
	}
	/**
	 * @param hotelName the hotelName to set
	 */
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	/**
	 * @return the marshaCode
	 */
	public String getMarshaCode() {
		return marshaCode;
	}
	/**
	 * @param marshaCode the marshaCode to set
	 */
	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}

}
