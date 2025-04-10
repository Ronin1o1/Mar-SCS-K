package com.marriott.rfp.object.pricing.hotelsfo;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;

public class HotelSFOSearch implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String participate;
    private Long salesorg;
    private Long marketarea;
    private String franchmange;
    private String franchby;
    private List<HotelAffiliation> brandlist;
    private String brandAll;
    private RegionFilterValue regionfiltervalue;
    private Page page;
    private int orderby;

    public HotelSFOSearch() {
	super();
	page = new Page();
	page.setPage(1);
	orderby = 1;
	regionfiltervalue = new RegionFilterValue();
	regionfiltervalue.setAreaOrRegion("C");

    }

    public String getParticipate() {
	return participate;
    }

    public void setParticipate(String participate) {
	this.participate = participate;
    }

    public Long getSalesorg() {
	return salesorg;
    }

    public void setSalesorg(Long salesorg) {
	this.salesorg = salesorg;
    }

    public Long getMarketarea() {
	return marketarea;
    }

    public void setMarketarea(Long marketarea) {
	this.marketarea = marketarea;
    }

    public String getFranchmange() {
	return franchmange;
    }

    public void setFranchmange(String franchmange) {
	this.franchmange = franchmange;
    }

    public String getFranchby() {
	return franchby;
    }

    public void setFranchby(String franchby) {
	this.franchby = franchby;
    }

    public String getBrandAll() {
	return brandAll;
    }

    public void setBrandAll(String brandAll) {
	this.brandAll = brandAll;
    }

    public RegionFilterValue getRegionfiltervalue() {
	return regionfiltervalue;
    }

    public void setRegionfiltervalue(RegionFilterValue regionfiltervalue) {
	this.regionfiltervalue = regionfiltervalue;
    }

    public void setPage(Page page) {
	this.page = page;
    }

    public Page getPage() {
	return page;
    }

    public void setOrderby(int orderby) {
	this.orderby = orderby;
    }

    public int getOrderby() {
	return orderby;
    }

    public void setBrandlist(List<HotelAffiliation> brandlist) {
	this.brandlist = brandlist;
    }

    public List<HotelAffiliation> getBrandlist() {
	return brandlist;
    }

    public String getStringBrandList() {
	String brandliststring = null;
	if (brandlist != null) {
	    brandliststring = "";
	    for (int i = 0; i < brandlist.size(); i++) {
		if (brandlist.get(i) != null) {
		    if (brandliststring.length() > 0)
			brandliststring += ", ";
		    brandliststring += brandlist.get(i).getAffiliationid();
		}
	    }
	}
	return brandliststring;
    }
}
