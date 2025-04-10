package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class EarlyDepartureCharge implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    private String departurecharge;
    private Long departurechargeoption;
    private Double departurechargevalue;
    
	public String getDeparturecharge() {
		return departurecharge;
	}
	public void setDeparturecharge(String departurecharge) {
		this.departurecharge = departurecharge;
	}
	public Long getDeparturechargeoption() {
		return departurechargeoption;
	}
	public void setDeparturechargeoption(Long departurechargeoption) {
		this.departurechargeoption = departurechargeoption;
	}
	public Double getDeparturechargevalue() {
		return departurechargevalue;
	}
	public void setDeparturechargevalue(Double departurechargevalue) {
		this.departurechargevalue = departurechargevalue;
	}
	
	public String getFormattedValue() {
		if(departurechargevalue!=null)
			return NumberUtility.formatRateNumber(departurechargevalue);
		else
			return null;
	}

}