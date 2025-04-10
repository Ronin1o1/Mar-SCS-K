package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class QuickHotelAccountCenter implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountname;
	private Long accountrecid;
	private Long hotel_accountinfoid;
	private Long hotelid;
	private Long hotelrfpid;
	private String isAccepted;
	private String isSelected;
	private String isSolicited;
	private String marshacode;
	private String productoffered;
	private Long period;
	private String isLocked;
	private Date rebid_due;
	private Long rebid_level;
	private Long rebidstatus;
	private String hasaccountspec;
	private String hasgenpricing;
	private String accountpricingtype;
	private Date duedate;
	private String hasansweredquestions;
	private String hasquestions;
	private Long ratetype_selected;
	private String cbcstatus;

	public String getIsLocked() {
		return isLocked;
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	public String getAccountname() {
		return accountname;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public String getIsAccepted() {
		return isAccepted;
	}

	public String getIsSelected() {
		return isSelected;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public String getMarshacode() {
		return marshacode;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setIsAccepted(String isAccepted) {
		this.isAccepted = isAccepted;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public String getProductoffered() {
		return productoffered;
	}

	public void setProductoffered(String productoffered) {
		this.productoffered = productoffered;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public String getAccountStatus() {
		String status = "";
		if (isAccepted != null && isAccepted.equals("Y"))
			status = "A";
		else if (isAccepted != null && isAccepted.equals("N"))
			status = "R";
		else if (isLocked != null && isLocked.equals("Y"))
			status = "L";
		else if (isSolicited != null && isSolicited.equals("Y"))
			status = "S";

		return status;
	}

	public Date getRebid_due() {
		return rebid_due;
	}

	public void setRebid_due(Date rebid_due) {
		this.rebid_due = rebid_due;
	}

	public Long getRebid_level() {
		return rebid_level;
	}

	public void setRebid_level(Long rebid_level) {
		this.rebid_level = rebid_level;
	}

	public Long getRebidstatus() {
		return rebidstatus;
	}

	public void setRebidstatus(Long rebidstatus) {
		this.rebidstatus = rebidstatus;
	}

	public String getHasaccountspec() {
		return hasaccountspec;
	}

	public void setHasaccountspec(String hasaccountspec) {
		this.hasaccountspec = hasaccountspec;
	}

	public String getHasgenpricing() {
		return hasgenpricing;
	}

	public void setHasgenpricing(String hasgenpricing) {
		this.hasgenpricing = hasgenpricing;
	}

	public String getAccountpricingtype() {
		return accountpricingtype;
	}

	public void setAccountpricingtype(String accountpricingtype) {
		this.accountpricingtype = accountpricingtype;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public String getStrDuedate() {
		String strduedate = "";
		if (duedate != null) {
			strduedate = DateUtility.formatShortStringDate(duedate);
			if (strduedate.equals("Dec 31, 9999"))
				strduedate = "TBD";
			if (strduedate.equals("Jan 01, 9999"))
				strduedate = "CBC Collection";
		}
		return strduedate;
	}

	public String getHasansweredquestions() {
		return hasansweredquestions;
	}

	public void setHasansweredquestions(String hasansweredquestions) {
		this.hasansweredquestions = hasansweredquestions;
	}

	public String getHasquestions() {
		return hasquestions;
	}

	public void setHasquestions(String hasquestions) {
		this.hasquestions = hasquestions;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public void setCbcstatus(String cbcstatus) {
		this.cbcstatus = cbcstatus;
	}

	public String getCbcstatus() {
		return cbcstatus;
	}
}
