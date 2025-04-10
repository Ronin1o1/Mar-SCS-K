package com.marriott.rfp.object.pricing.hotelsfo;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterList;

public class HotelSFOFilterLists implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private RegionFilterList regionfilterlist;
    private List<HotelAffiliation> brandlist;
    private List<SalesMarket> salemarket;
    private List<String> franchby;

    public void setRegionfilterlist(RegionFilterList regionfilterlist) {
	this.regionfilterlist = regionfilterlist;
    }

    public RegionFilterList getRegionfilterlist() {
	return regionfilterlist;
    }

    public void setBrandlist(List<HotelAffiliation> brandlist) {
	this.brandlist = brandlist;
    }

    public List<HotelAffiliation> getBrandlist() {
	return brandlist;
    }

    public void setSalemarket(List<SalesMarket> salemarket) {
	this.salemarket = salemarket;
    }

    public List<SalesMarket> getSalemarket() {
	return salemarket;
    }

    public void setFranchby(List<String> franchby) {
	this.franchby = franchby;
    }

    public List<String> getFranchby() {
	return franchby;
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
}
