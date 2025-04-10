package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class CBCStatus implements Serializable {
	/**
     * 
     */
	private static final long serialVersionUID = 1L;
	private String marshacode;
	private String hotelname;
	private String city;
	private String state;
	private String country;
	private Long hotelid;
	private String status;
	private String isSolicited;
	private String changed;
	private Long rejectreasonid;
	private String rejectionreason;
	private Date cbccreatedate;
	private Date cbc_softduedate;
	private String pastdue;
	private String isremovedsolicited;

	public String getMarshacode() {
		return marshacode;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public String getHotelname() {
		return hotelname;
	}

	public void setHotelname(String hotelname) {
		this.hotelname = hotelname;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getChanged() {
		return changed;
	}

	public void setRejectreasonid(Long rejectreasonid) {
		this.rejectreasonid = rejectreasonid;
	}

	public Long getRejectreasonid() {
		return rejectreasonid;
	}

	public void setRejectionreason(String rejectionreason) {
		this.rejectionreason = rejectionreason;
	}

	public String getRejectionreason() {
		return rejectionreason;
	}

	public void setCbccreatedate(Date cbccreatedate) {
		this.cbccreatedate = cbccreatedate;
	}

	public Date getCbccreatedate() {
		return cbccreatedate;
	}

	public String getStrCbccreatedate() {
		if (cbccreatedate == null)
			return "";
		else
			return DateUtility.formatShortDate(cbccreatedate);
	}

	public void setCbc_softduedate(Date cbc_softduedate) {
		this.cbc_softduedate = cbc_softduedate;
	}

	public Date getCbc_softduedate() {
		return cbc_softduedate;
	}

	public String getStrCbc_softduedate() {
		if (cbc_softduedate == null)
			return "";
		else
			return DateUtility.formatShortDate(cbc_softduedate);
	}

	public void setPastdue(String pastdue) {
		this.pastdue = pastdue;
	}

	public String getPastdue() {
		return pastdue;
	}

	public void setIsremovedsolicited(String isremovedsolicited) {
		this.isremovedsolicited = isremovedsolicited;
	}

	public String getIsremovedsolicited() {
		return isremovedsolicited;
	}



}
