package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;

public class PortfolioStatus implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    private String city;
    private String commissionable;
    private String country;
    private String futureopening;
    private Long hotelid;
    private String hotelname;
    private Long hotelrfpid;
    private String locked;
    private String marshacode;
    private String nopricing;
    private String product_offered;
    private Long ratetype_selected;
    private String readonly;
    private String regionid;
    private String subsetname;
    private String selected;
    private String volunteered;
    private String selectedload;
    private String state;
    private String changed;
    private Long maxAcctRoomPool;
    private String selectProp;
    private List<HotelAccountSpecificRoomPoolData> roomPoolData;
    
    public List<HotelAccountSpecificRoomPoolData> getRoomPoolData() {
		return roomPoolData;
	}

	public void setRoomPoolData(List<HotelAccountSpecificRoomPoolData> roomPoolData) {
		this.roomPoolData = roomPoolData;
	}

	public String getCity() {
	return city;
    }

    public String getCommissionable() {
	return commissionable;
    }

    public String getCountry() {
	return country;
    }

    public String getFutureopening() {
	return futureopening;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public String getHotelname() {
	return hotelname;
    }

    public Long getHotelrfpid() {
	return hotelrfpid;
    }

    public String getLocked() {
	return locked;
    }

    public String getMarshacode() {
	return marshacode;
    }

    public String getNopricing() {
	return nopricing;
    }

    public String getPricing() {
	if (nopricing == null || nopricing.equals("Y"))
	    return "N";
	else
	    return "Y";
    }

    public String getProduct_offered() {
	return product_offered;
    }

    public Long getRatetype_selected() {
	return ratetype_selected;
    }

    public String getReadonly() {
	return readonly;
    }

    public String getRegionid() {
	return regionid;
    }

    public String getSelected() {
	return selected;
    }

    public String getSelectedload() {
	return selectedload;
    }

    public String getState() {
	return state;
    }

    public String getVolunteered() {
		return volunteered;
	}

	public void setVolunteered(String volunteered) {
		this.volunteered = volunteered;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public void setCommissionable(String commissionable) {
	this.commissionable = commissionable;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public void setFutureopening(String futureopening) {
	this.futureopening = futureopening;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
    }

    public void setHotelrfpid(Long hotelrfpid) {
	this.hotelrfpid = hotelrfpid;
    }

    public void setLocked(String locked) {
	this.locked = locked;
    }

    public void setMarshacode(String marshacode) {
	this.marshacode = marshacode;
    }

    public void setNopricing(String nopricing) {
	this.nopricing = nopricing;
    }


    public void setProduct_offered(String product_offered) {
	this.product_offered = product_offered;
    }

    public void setRatetype_selected(Long ratetype_selected) {
	this.ratetype_selected = ratetype_selected;
    }

    public void setReadonly(String readonly) {
	this.readonly = readonly;
    }

    public void setRegionid(String regionid) {
	this.regionid = regionid;
    }

    public void setSelected(String selected) {
	this.selected = selected;
    }

    public void setSelectedload(String selectedload) {
	this.selectedload = selectedload;
    }

    public void setState(String state) {
	this.state = state;
    }

    public void setChanged(String changed) {
	this.changed = changed;
    }

    public String getChanged() {
	return changed;
    }

    public Boolean getHardcoded() {
	Boolean hardcoded = false;
	if (selected == null || selected.equals("N") || nopricing == null || nopricing.equals("Y") || readonly == null || readonly.equals("Y"))
	    hardcoded = true;
	return hardcoded;
    }

    public void setSubsetname(String subsetname) {
	this.subsetname = subsetname;
    }

    public String getSubsetname() {
	return subsetname;
    }

	public Long getMaxAcctRoomPool() {
		return maxAcctRoomPool;
	}

	public void setMaxAcctRoomPool(Long maxAcctRoomPool) {
		this.maxAcctRoomPool = maxAcctRoomPool;
    }

	public String getSelectProp() {
		return selectProp;
	}

	public void setSelectProp(String selectProp) {
		this.selectProp = selectProp;
	}
}
