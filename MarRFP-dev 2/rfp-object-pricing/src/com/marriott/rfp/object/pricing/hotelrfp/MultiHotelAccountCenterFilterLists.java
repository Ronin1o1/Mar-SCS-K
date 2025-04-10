package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.period.Period;

public class MultiHotelAccountCenterFilterLists implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private List<HotelAffiliation> brandlist;
    private List<Period> periodlist;

    public void setBrandlist(List<HotelAffiliation> brandlist) {
	this.brandlist = brandlist;
    }

    public List<HotelAffiliation> getBrandlist() {
	return brandlist;
    }


    public int getNumBrandRows() {
	int numRows = 0;
	if (brandlist.size()>0) {
	    numRows = brandlist.size()/2;
	    if (numRows*2<brandlist.size())
		numRows++;
	}
	return numRows;
    }
    public int getNumBrands() {
	return brandlist.size();
    }

    public void setPeriodlist(List<Period> periodlist) {
	this.periodlist = periodlist;
    }

    public List<Period> getPeriodlist() {
	return periodlist;
    }
}
