package com.marriott.rfp.object.pgoos.propagate;

import java.io.Serializable;

public class PGOOSHotelAccountProduct implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    /**
     * 
     */
    private Long accountrecid;
    private String brand;
    private Long hotelid;
    private String marshaCode;
    private Long period;
    private String productid;
    private String amenity_diff;
    private String isAer;

    public Long getAccountrecid() {
	return accountrecid;
    }

    public void setAccountrecid(Long accountrecid) {
	this.accountrecid = accountrecid;
    }

 
    public String getBrand() {
	return brand;
    }

    public void setBrand(String brand) {
	this.brand = brand;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }


    public String getMarshaCode() {
	return marshaCode;
    }

    public void setMarshaCode(String marshaCode) {
	this.marshaCode = marshaCode;
    }

    public Long getPeriod() {
	return period;
    }

    public void setPeriod(Long period) {
	this.period = period;
    }

    public String getProductid() {
	return productid;
    }

    public void setProductid(String productid) {
	this.productid = productid;
    }


    public String getAmenity_diff() {
	return amenity_diff;
    }

    public void setAmenity_diff(String amenity_diff) {
	this.amenity_diff = amenity_diff;
    }

    public void setIsAer(String isAer) {
	this.isAer = isAer;
    }

    public String getIsAer() {
	return isAer;
    }


}
