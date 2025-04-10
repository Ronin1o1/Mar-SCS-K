package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class PortfolioStatusDO implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String marshacode;
    private String hotelname;
    private String city;
    private String state;
    private String country;
    private String nopricing;
    private String subsetname;
    private String regionid;
    private String commissionable;
    private Long hotelid;
    private Long hotelrfpid;
    private String selected;
    private String volunteered;
    private String readonly;
    private Long ratetype_selected;
    private String product_offered;
    private String acceptedRmPool;
    private String rejectionReasonRmPool;
    private Long rejectReasonIdRmPool;
    private String pgoosRmPool;
    private String removalReasonRmPool;
    private Long removalReasonIdRmPool;
    private String lra;
    private Long maxAcctRoomPool;
    private Long roomClassSeq;
    private Long roomPoolSeq;
    
    private String futureopening;
    private String locked;
    private String selectedload;
    private String changed;
    private String selectProp;
      

    public Long getRoomClassSeq() {
		return roomClassSeq;
	}

	public void setRoomClassSeq(Long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}

	public Long getRoomPoolSeq() {
		return roomPoolSeq;
	}

	public void setRoomPoolSeq(Long roomPoolSeq) {
		this.roomPoolSeq = roomPoolSeq;
	}

	public String getLra() {
		return lra;
	}

	public void setLra(String lra) {
		this.lra = lra;
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

	public String getAcceptedRmPool() {
		return acceptedRmPool;
	}

	public void setAcceptedRmPool(String acceptedRmPool) {
		if(acceptedRmPool != null && acceptedRmPool.equals("Z"))
			acceptedRmPool = "P";
		this.acceptedRmPool = acceptedRmPool;
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

	public String getPgoosRmPool() {
		return pgoosRmPool;
	}

	public void setPgoosRmPool(String pgoosRmPool) {
		this.pgoosRmPool = pgoosRmPool;
	}

	public String getRejectionReasonRmPool() {
		return rejectionReasonRmPool;
	}

	public void setRejectionReasonRmPool(String rejectionReasonRmPool) {
		this.rejectionReasonRmPool = rejectionReasonRmPool;
	}

	public Long getRejectReasonIdRmPool() {
		return rejectReasonIdRmPool;
	}

	public void setRejectReasonIdRmPool(Long rejectReasonIdRmPool) {
		this.rejectReasonIdRmPool = rejectReasonIdRmPool;
	}

	public String getRemovalReasonRmPool() {
		return removalReasonRmPool;
	}

	public void setRemovalReasonRmPool(String removalReasonRmPool) {
		this.removalReasonRmPool = removalReasonRmPool;
	}

	public Long getRemovalReasonIdRmPool() {
		return removalReasonIdRmPool;
	}

	public void setRemovalReasonIdRmPool(Long removalReasonIdRmPool) {
		this.removalReasonIdRmPool = removalReasonIdRmPool;
	}
}
