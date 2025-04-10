package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.period.PricingPeriod;

public class HotelRFPFinishView implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<PricingPeriod> duedateList; 
	private List<HotelRFPFinish> hotelRFPFinishList;
	private String selectedDueDate;
	private Long selectedpricingperiodid;

	public List<PricingPeriod> getDuedateList() {
		return duedateList;
	}

	public void setDuedateList(List<PricingPeriod> duedateList) {
		this.duedateList = duedateList;
	}

	public List<HotelRFPFinish> getHotelRFPFinishList() {
		return hotelRFPFinishList;
	}

	public void setHotelRFPFinishList(List<HotelRFPFinish> hotelRFPFinishList) {
		this.hotelRFPFinishList = hotelRFPFinishList;
	}

	public void setSelectedDueDate(String selectedDueDate) {
		this.selectedDueDate = selectedDueDate;
	}

	public String getSelectedDueDate() {
		return selectedDueDate;
	}

	public void setSelectedpricingperiodid(Long selectedpricingperiodid) {
	    this.selectedpricingperiodid = selectedpricingperiodid;
	}

	public Long getSelectedpricingperiodid() {
	    return selectedpricingperiodid;
	}

}
