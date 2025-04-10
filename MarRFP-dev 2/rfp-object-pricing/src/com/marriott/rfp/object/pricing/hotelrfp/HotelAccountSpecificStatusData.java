package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountSpecificStatusData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long affiliationid;

	private Long hotel_accountinfoid;
	private HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags;
	private Long hotelid;
	private Long hotelrfpid;
	private String isAccepted;
	private String isLocked;
	private String isProgress;
	private String isSelected;
	private String isSolicited;
	private Contact salesContact;

	public Long getAffiliationid() {
		return affiliationid;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public void setHotelAccountSpecificAccountFlags(HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags) {
		this.hotelAccountSpecificAccountFlags = hotelAccountSpecificAccountFlags;
	}

	public void setSalesContact(Contact salesContact) {
		this.salesContact = salesContact;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public HotelAccountSpecificAccountFlags getHotelAccountSpecificAccountFlags() {
		return hotelAccountSpecificAccountFlags;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public String getIsAccepted() {
		return isAccepted;
	}

	public String getIsLocked() {
		return isLocked;
	}

	public String getBoolStringIsLocked() {
		if (isLocked == null || isLocked.equals("N"))
			return "false";
		else
			return "true";
	}

	public String getIsProgress() {
		return isProgress;
	}

	public String getIsSelected() {
		return isSelected;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public Contact getSalesContact() {
		return salesContact;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public void setIsAccepted(String isAccepted) {
		this.isAccepted = isAccepted;
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	public void setIsProgress(String isProgress) {
		this.isProgress = isProgress;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
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

	public boolean getIsSalesContactEditable() {
		if (salesContact != null && salesContact.getContactid() != null && salesContact.getContactid() > 0) {
			return false;
		} else {
			return true;
		}

	}
}
