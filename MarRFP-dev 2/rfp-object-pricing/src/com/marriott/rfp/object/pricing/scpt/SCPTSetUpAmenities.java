package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class SCPTSetUpAmenities implements Serializable {
	private static final long serialVersionUID = 1L;
	private long hotelid;
	private long period;
	private String brkf_type;
	private String internet_type;
	private String transport;
	private String parking;
	private Double brkf_fcost;
	private Double internet_fcost;
	private Double transport_fcost;
	private Double parking_fcost;
	private Double vatpercentroomrate;
	private Double vatpercentrfoodandbeverage;
	private Double histPrevYearVat;
	private Double histTwoPrevYearVat;
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	public long getPeriod() {
		return period;
	}
	public void setPeriod(long period) {
		this.period = period;
	}
	public String getBrkf_type() {
		return brkf_type;
	}
	public void setBrkf_type(String brkf_type) {
		this.brkf_type = brkf_type;
	}
	public String getInternet_type() {
		return internet_type;
	}
	public void setInternet_type(String internet_type) {
		this.internet_type = internet_type;
	}
	public String getTransport() {
		return transport;
	}
	public void setTransport(String transport) {
		this.transport = transport;
	}
	public String getParking() {
		return parking;
	}
	public void setParking(String parking) {
		this.parking = parking;
	}
	public Double getBrkf_fcost() {
		return brkf_fcost;
	}
	public void setBrkf_fcost(Double brkf_fcost) {
		this.brkf_fcost = brkf_fcost;
	}
	public Double getInternet_fcost() {
		return internet_fcost;
	}
	public void setInternet_fcost(Double internet_fcost) {
		this.internet_fcost = internet_fcost;
	}
	public Double getTransport_fcost() {
		return transport_fcost;
	}
	public void setTransport_fcost(Double transport_fcost) {
		this.transport_fcost = transport_fcost;
	}
	public Double getParking_fcost() {
		return parking_fcost;
	}
	public void setParking_fcost(Double parking_fcost) {
		this.parking_fcost = parking_fcost;
	}
	public Double getVatpercentroomrate() {
		return vatpercentroomrate;
	}
	public void setVatpercentroomrate(Double vatpercentroomrate) {
		this.vatpercentroomrate = vatpercentroomrate;
	}
	public Double getVatpercentrfoodandbeverage() {
		return vatpercentrfoodandbeverage;
	}
	public void setVatpercentrfoodandbeverage(Double vatpercentrfoodandbeverage) {
		this.vatpercentrfoodandbeverage = vatpercentrfoodandbeverage;
	}
	
	public Double getHistPrevYearVat() {
		return histPrevYearVat;
	}
	public void setHistPrevYearVat(Double histPrevYearVat) {
		this.histPrevYearVat = histPrevYearVat;
	}
	public Double getHistTwoPrevYearVat() {
		return histTwoPrevYearVat;
	}
	public void setHistTwoPrevYearVat(Double histTwoPrevYearVat) {
		this.histTwoPrevYearVat = histTwoPrevYearVat;
	}
	

}
