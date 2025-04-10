package com.marriott.rfp.object.pgoos;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.ObjectUtils;

public class RateEntity {

	private Long rateOfferId;
	private Long propertyRateEntityId;

	private String marshaCode;
	private String accountName;
	private Double distanceToLocalOffice;
	private String distanceToLocalOfficeUnit;
	private String currencyCode;
	private Long marketCode;
	private String roomPool;
	private String commissionable;
	private String lraFlag;

	private RateEntityMirror restrictionMirror;
	private RateEntityMirror pricingMirror;

	private Date offerStartDate;
	private Date offerEndDate;
	private String productCode;
	private String status;
	private String yearMinusY;

	private PricingRuleType pricingRuleId;

	private CeilingRuleType ceilingRuleId;

	private Long accountInfoId;

	private Long transactionId;

	private String mirrorAllTiers;

	private String tierNumber;
	private String startNights;
	private String endNights;

	private Long period;

	private StayType stayType;

	private Account account;

	private RateProgram rateProgam;

	private List<PricingRule> pricingRules;

	private List<Season> blackOutSeaons;

	public RateEntity() {
		restrictionMirror = new RateEntityMirror();
		pricingMirror = new RateEntityMirror();
	}

	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

	public Long getPropertyRateEntityId() {
		return propertyRateEntityId;
	}

	public void setPropertyRateEntityId(Long propertyRateEntityId) {
		this.propertyRateEntityId = propertyRateEntityId;
	}

	public String getMarshaCode() {
		return ObjectUtils.toString(marshaCode).trim();
	}

	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
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

	public String getRoomPool() {
		return roomPool;
	}

	public void setRoomPool(String roomPool) {
		this.roomPool = roomPool;
	}

	public String getCommissionable() {
		return commissionable;
	}

	public void setCommissionable(String commissionable) {
		this.commissionable = commissionable;
	}

	public RateEntityMirror getRestrictionMirror() {
		return restrictionMirror;
	}

	public void setRestrictionMirror(RateEntityMirror restrictionMirror) {
		this.restrictionMirror = restrictionMirror;
	}

	public RateEntityMirror getPricingMirror() {
		return pricingMirror;
	}

	public void setPricingMirror(RateEntityMirror pricingMirror) {
		this.pricingMirror = pricingMirror;
	}

	public String getRestrictionParentRateOfferId() {
		return restrictionMirror.getParentRateOfferId();
	}

	public void setRestrictionParentRateOfferId(String restrictionParentRateOfferId) {
		this.restrictionMirror.setParentRateOfferId(restrictionParentRateOfferId);
	}

	public String getRestrictionParentPricingType() {
		return restrictionMirror.getParentPricingType();
	}

	public void setRestrictionParentPricingType(String restrictionParentPricingType) {
		this.restrictionMirror.setParentPricingType(restrictionParentPricingType);
	}

	public String getRestrictionParentRateEntityId() {
		return restrictionMirror.getParentRateEntityId();
	}

	public void setRestrictionParentRateEntityId(String restrictionParentRateEntityId) {
		this.restrictionMirror.setParentRateEntityId(restrictionParentRateEntityId);
	}

	public String getRestrictionParentPriority() {
		return restrictionMirror.getParentPriority();
	}

	public void setRestrictionParentPriority(String restrictionParentPriority) {
		this.restrictionMirror.setParentPriority(restrictionParentPriority);
	}

	public String getPricingParentRateOfferId() {
		return pricingMirror.getParentRateOfferId();
	}

	public void setPricingParentRateOfferId(String parentRateOfferId) {
		pricingMirror.setParentRateOfferId(parentRateOfferId);
	}

	public String getPricingParentPricingType() {
		return pricingMirror.getParentPricingType();
	}

	public void setPricingParentPricingType(String parentPricingType) {
		pricingMirror.setParentPricingType(parentPricingType);
	}

	public String getPricingParentRateEntityId() {
		return pricingMirror.getParentRateEntityId();
	}

	public void setPricingParentRateEntityId(String pricingParentRateEntityId) {
		pricingMirror.setParentRateEntityId(pricingParentRateEntityId);
	}

	public String getPricingParentPriority() {
		return pricingMirror.getParentPriority();
	}

	public void setPricingParentPriority(String pricingParentPriority) {
		pricingMirror.setParentPriority(pricingParentPriority);
	}

	public String getPricingParentRoomPool() {
		return pricingMirror.getParentRoomPool();
	}

	public void setPricingParentRoomPool(String pricingParentRoomPool) {
		pricingMirror.setParentRoomPool(pricingParentRoomPool);
	}

	public String getRestrictionParentRoomPool() {
		return restrictionMirror.getParentRoomPool();
	}

	public void setRestrictionParentRoomPool(String parentRoomPool) {
		this.restrictionMirror.setParentRoomPool(parentRoomPool);
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

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getMirrorAllTiers() {
		return mirrorAllTiers;
	}

	public void setMirrorAllTiers(String mirrorAllTiers) {
		this.mirrorAllTiers = mirrorAllTiers;
	}

	public String getTierNumber() {
		return tierNumber;
	}

	public void setTierNumber(String tierNumber) {
		this.tierNumber = tierNumber;
	}

	public String getStartNights() {
		return startNights;
	}

	public void setStartNights(String startNights) {
		this.startNights = startNights;
	}

	public String getEndNights() {
		return endNights;
	}

	public void setEndNights(String endNights) {
		this.endNights = endNights;
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

	public RateProgram getRateProgam() {
		return rateProgam;
	}

	public void setRateProgam(RateProgram rateProgam) {
		this.rateProgam = rateProgam;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public List<PricingRule> getPricingRules() {
		return pricingRules;
	}

	public void setPricingRules(List<PricingRule> pricingRules) {
		this.pricingRules = pricingRules;
	}

	public List<Season> getBlackOutSeaons() {
		return blackOutSeaons;
	}

	public void setBlackOutSeaons(List<Season> blackOutSeaons) {
		this.blackOutSeaons = blackOutSeaons;
	}

	public String getRestrictionParentPricingTypeId() {
		return restrictionMirror.getParentPricingTypeId();
	}

	public void setRestrictionParentPricingTypeId(String parentPricingTypeId) {
		this.restrictionMirror.setParentPricingTypeId(parentPricingTypeId);
	}

	public String getPricingParentPricingTypeId() {
		return pricingMirror.getParentPricingTypeId();
	}

	public void setPricingParentPricingTypeId(String parentPricingTypeId) {
		this.pricingMirror.setParentPricingTypeId(parentPricingTypeId);
	}
}
