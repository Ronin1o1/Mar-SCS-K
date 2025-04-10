package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class AccountCenterView implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean showOffcycleProducts = false;
	private boolean hasGovPerDiem = false;
	private boolean allowFloatNoCiel = false;
	private boolean showGPP = false;
	private boolean showGovVP = false;
	private String rebidAlert;
	private long numProducts;
	private long totalPages;
	private long cbc_requested;
	private long cbc_accepted;
	private long cbc_rejected;
	private long cbc_completed;
	
	private List<HotelAccountCenter> hotelAccountCenterList;

	public boolean getShowOffcycleProducts() {
		return showOffcycleProducts;
	}

	public void setShowOffcycleProducts(boolean showOffcycleProducts) {
		this.showOffcycleProducts = showOffcycleProducts;
	}

	public boolean getHasGovPerDiem() {
		return hasGovPerDiem;
	}

	public void setHasGovPerDiem(boolean hasGovPerDiem) {
		this.hasGovPerDiem = hasGovPerDiem;
	}

	public boolean getAllowFloatNoCiel() {
		return allowFloatNoCiel;
	}

	public void setAllowFloatNoCiel(boolean allowFloatNoCiel) {
		this.allowFloatNoCiel = allowFloatNoCiel;
	}

	public long getNumProducts() {
		return numProducts;
	}

	public void setNumProducts(long numProducts) {
		this.numProducts = numProducts;
	}

	public List<HotelAccountCenter> getHotelAccountCenterList() {
		return hotelAccountCenterList;
	}

	public void setHotelAccountCenterList(
			List<HotelAccountCenter> hotelAccountCenterList) {
		this.hotelAccountCenterList = hotelAccountCenterList;
	}

	public long getHotelAccountCenterListCount() {
		long numList = 0;
		if (hotelAccountCenterList != null)
			numList = hotelAccountCenterList.size();
		return numList;
	}

	public void setTotalPages(long totalPages) {
		this.totalPages = totalPages;
	}

	public long getTotalPages() {
		return totalPages;
	}

	public void setShowGPP(boolean showGPP) {
		this.showGPP = showGPP;
	}

	public boolean getShowGPP() {
		return showGPP;
	}

	public void setShowGovVP(boolean showGovVP) {
		this.showGovVP = showGovVP;
	}

	public boolean getShowGovVP() {
		return showGovVP;
	}

	public void setRebidAlert(String rebidAlert) {
		this.rebidAlert = rebidAlert;
	}

	public String getRebidAlert() {
		return rebidAlert;
	}

	public long getCbc_requested() {
		return cbc_requested;
	}

	public void setCbc_requested(long cbc_requested) {
		this.cbc_requested = cbc_requested;
	}

	public long getCbc_accepted() {
		return cbc_accepted;
	}

	public void setCbc_accepted(long cbc_accepted) {
		this.cbc_accepted = cbc_accepted;
	}

	public long getCbc_rejected() {
		return cbc_rejected;
	}

	public void setCbc_rejected(long cbc_rejected) {
		this.cbc_rejected = cbc_rejected;
	}

	public long getCbc_completed() {
		return cbc_completed;
	}

	public void setCbc_completed(long cbc_completed) {
		this.cbc_completed = cbc_completed;
	}

}
