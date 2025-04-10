package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificAmenityData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<HotelAmenities> amenities;
	private List<HotelRateIncludes> rateincludes;
	private List<HotelEligibility> eligibility;
	private Date last_updatedamenities;
	private String lastupateameneid;
	private String lastupateameneemail;
	private Long countAmenities;
	private Long totalAmenitiesRows;
	private String breakfast_rule;
	private String isSelected;
	
	public List<HotelAmenities> getAmenities() {
		return amenities;
	}

	public List<HotelEligibility> getEligibility() {
		return eligibility;
	}

	public Date getLast_updatedamenities() {
		return last_updatedamenities;
	}

	public String getFormattedLast_updatedamenities() {
		return DateUtility.formatLongDate(last_updatedamenities);
	}

	public List<HotelRateIncludes> getRateincludes() {
		return rateincludes;
	}

	public void setRateincludes(List<HotelRateIncludes> rateincludes) {
		this.rateincludes = rateincludes;
	}

	public String getLastupateameneid() {
		return lastupateameneid;
	}

	public void setLastupateameneid(String lastupateameneid) {
		this.lastupateameneid = lastupateameneid;
	}

	public String getLastupateameneemail() {
		return lastupateameneemail;
	}

	public void setLastupateameneemail(String lastupateameneemail) {
		this.lastupateameneemail = lastupateameneemail;
	}

	public void setAmenities(List<HotelAmenities> amenities) {
		this.amenities = amenities;
	}

	public void setEligibility(List<HotelEligibility> eligibility) {
		this.eligibility = eligibility;
	}

	public void setLast_updatedamenities(Date last_updatedamenities) {
		this.last_updatedamenities = last_updatedamenities;
	}

	public void setCountAmenities(Long countAmenities) {
		this.countAmenities = countAmenities;
	}

	public Long getCountAmenities() {
		return countAmenities;
	}

	public void setTotalAmenitiesRows(Long totalAmenitiesRows) {
		this.totalAmenitiesRows = totalAmenitiesRows;
	}

	public Long getTotalAmenitiesRows() {
		return totalAmenitiesRows;
	}

	public void setBreakfast_rule(String breakfast_rule) {
		this.breakfast_rule = breakfast_rule;
	}

	public String getBreakfast_rule() {
		return breakfast_rule;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public String getIsSelected() {
		return isSelected;
	}


}
