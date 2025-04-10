package com.marriott.rfp.object.pgoos;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.ObjectUtils;

public class HotelAccount implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountName;
	private Double distanceToLocalOffice;
	private String distanceToLocalOfficeUnit;
	private String currencyCode;
	private Long marketCode;
	private String commissionable;
	private Date offerStartDate;
	private Date offerEndDate;
	private String productCode;
	private String status = "PEND";
	private Long accountInfoId;
	private Long hotelrfpid;
	private Long period;
	private String lraFlag;
	private String yearMinusY;
	private PricingRuleType pricingRuleId;
	private CeilingRuleType ceilingRuleId;
	private String pricingRuleType;
	private String ceilingRuleType;
	private String mirrorAllTiers;
	private Long ratetype_selected;
	private String productid;
	private Double amount;
	private String errordesc;
	private String errorcode;
	private List<RateProgramInfo> rateProgramInfo;
	private MarshaCommandType cmd;
	private String breakfast;
	private String discfirsttieronly;

	private StayType stayType;

	public HotelAccount() {
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Double getDistanceToLocalOffice() {
		return distanceToLocalOffice;
	}

	public void setDistanceToLocalOffice(Double distanceToLocalOffice) {
		this.distanceToLocalOffice = distanceToLocalOffice;
	}

	public void setDistanceToLocalOffice(BigDecimal distanceToLocalOffice) {
		if (distanceToLocalOffice != null)
			this.distanceToLocalOffice = distanceToLocalOffice.doubleValue();
	}

	public String getDistanceToLocalOfficeUnit() {
		return ObjectUtils.toString(distanceToLocalOfficeUnit).trim();
	}

	public void setDistanceToLocalOfficeUnit(String distanceToLocalOfficeUnit) {
		this.distanceToLocalOfficeUnit = distanceToLocalOfficeUnit;
	}

	public String getCurrencyCode() {
		return ObjectUtils.toString(currencyCode).trim();
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public Long getMarketCode() {
		return marketCode;
	}

	public void setMarketCode(Long marketCode) {
		this.marketCode = marketCode;
	}

	public String getLraFlag() {
		return lraFlag;
	}

	public void setLraFlag(String lraFlag) {
		this.lraFlag = lraFlag;
	}

	public String getCommissionable() {
		return commissionable;
	}

	public void setCommissionable(String commissionable) {
		this.commissionable = commissionable;
	}

	public Date getOfferStartDate() {
		return offerStartDate;
	}

	public void setOfferStartDate(Date offerStartDate) {
		this.offerStartDate = offerStartDate;
	}

	public Date getOfferEndDate() {
		return offerEndDate;
	}

	public void setOfferEndDate(Date offerEndDate) {
		this.offerEndDate = offerEndDate;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getYearMinusY() {
		return yearMinusY;
	}

	public void setYearMinusY(String yearMinusY) {
		this.yearMinusY = yearMinusY;
	}

	public PricingRuleType getPricingRuleId() {
		return pricingRuleId;
	}

	public void setPricingRuleId(String pricingRuleId) {
		if (pricingRuleId != null) {
			this.pricingRuleId = PricingRuleType.fromValue(pricingRuleId);
		}
	}

	public CeilingRuleType getCeilingRuleId() {
		return ceilingRuleId;
	}

	public void setCeilingRuleId(String ceilingRuleId) {
		if (ceilingRuleId != null) {
			this.ceilingRuleId = CeilingRuleType.fromValue(ceilingRuleId);
		}
	}

	public Long getAccountInfoId() {
		return accountInfoId;
	}

	public void setAccountInfoId(Long accountInfoId) {
		this.accountInfoId = accountInfoId;
	}

	public String getMirrorAllTiers() {
		return mirrorAllTiers;
	}

	public void setMirrorAllTiers(String mirrorAllTiers) {
		this.mirrorAllTiers = mirrorAllTiers;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public StayType getStayType() {
		return stayType;
	}

	public void setStayType(String stayType) {
		this.stayType = StayType.fromValue(stayType);
	}

	public void setPricingRuleType(String pricingRuleType) {
		this.pricingRuleType = pricingRuleType;
	}

	public String getPricingRuleType() {
		return pricingRuleType;
	}

	public void setCeilingRuleType(String ceilingRuleType) {
		this.ceilingRuleType = ceilingRuleType;
	}

	public String getCeilingRuleType() {
		return ceilingRuleType;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getProductid() {
		return productid;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getAmount() {
		return amount;
	}

	public void setErrordesc(String errordesc) {
		this.errordesc = errordesc;
	}

	public String getErrordesc() {
		return errordesc;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setRateProgramInfo(List<RateProgramInfo> rateProgramInfo) {
		this.rateProgramInfo = rateProgramInfo;
	}

	public List<RateProgramInfo> getRateProgramInfo() {
		return rateProgramInfo;
	}

	public void setCmd(MarshaCommandType cmd) {
		this.cmd = cmd;
	}

	public MarshaCommandType getCmd() {
		return cmd;
	}

	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}

	public String getBreakfast() {
		return breakfast;
	}

	public void setDiscfirsttieronly(String discfirsttieronly) {
		this.discfirsttieronly = discfirsttieronly;
	}

	public String getDiscfirsttieronly() {
		return discfirsttieronly;
	}

}
