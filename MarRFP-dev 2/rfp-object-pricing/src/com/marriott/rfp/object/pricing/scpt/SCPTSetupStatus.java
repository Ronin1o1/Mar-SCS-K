package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.List;

public class SCPTSetupStatus implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelid;
	private String scptSetupCompleted;
	private String isBrandExtendedStay;
	private String franch_flag;
	private String currency;
	private String marshaCode;
	private String brandName;
	private String hotelName;
	private String currencyCode;
	private String currencyWidth;
	private String showrmnights;
	private List<SCPTBreakfast> breakfastList;
	private List<SCPTInternet> internetList;
	private List<SCPTAccountGroup> accountgroupList;
	private long period;	
	
	public long getPeriod() {
		return period;
	}
	public void setPeriod(long period) {
		this.period = period;
	}
	public Long getHotelid() {
		return hotelid;
	}
	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public String getScptSetupCompleted() {
		return scptSetupCompleted;
	}
	public void setScptSetupCompleted(String scptSetupCompleted) {
		this.scptSetupCompleted = scptSetupCompleted;
	}
	public String getIsBrandExtendedStay() {
		return isBrandExtendedStay;
	}
	public void setIsBrandExtendedStay(String isBrandExtendedStay) {
		this.isBrandExtendedStay = isBrandExtendedStay;
	}
	public String getFranch_flag() {
		return franch_flag;
	}
	public void setFranch_flag(String franch_flag) {
		this.franch_flag = franch_flag;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getMarshaCode() {
		return marshaCode;
	}
	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getCurrencyCode() {
		return currencyCode;
	}
	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}
	public String getCurrencyWidth() {
		return currencyWidth;
	}
	public void setCurrencyWidth(String currencyWidth) {
		this.currencyWidth = currencyWidth;
	}
	public String getShowrmnights() {
		return showrmnights;
	}
	public void setShowrmnights(String showrmnights) {
		this.showrmnights = showrmnights;
	}
	public List<SCPTBreakfast> getBreakfastList() {
		return breakfastList;
	}
	public void setBreakfastList(List<SCPTBreakfast> breakfastList) {
		this.breakfastList = breakfastList;
	}
	public List<SCPTInternet> getInternetList() {
		return internetList;
	}
	public void setInternetList(List<SCPTInternet> internetList) {
		this.internetList = internetList;
	}
	public List<SCPTAccountGroup> getAccountgroupList() {
		return accountgroupList;
	}
	public void setAccountgroupList(List<SCPTAccountGroup> accountgroupList) {
		this.accountgroupList = accountgroupList;
	}

		
	

}
