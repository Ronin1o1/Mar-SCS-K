package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.period.PricingPeriod;

public class AccountDropDownLists implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<AccountPricingType> accountPricingTypeList;
	private List<ThirdPartyRegion> accountThirdPartyList;
	private List<PricingPeriod> pricingPeriodList;
	private List<AccountSegment> accountSegmentList;
	private List<AccountPricingCycle> accountPricingCycleList;
	private List<Allowable_aer_percents> allowableAerPercentsList;
	private List<AlternateCancPolicy> alternateCancPolicyList; 
	private List<AlternateCancPolicy> alternateCancPolicyTimeList;
	private List<AlternateCancPolicy> alternateCancPolicyOptionList;
	private List<AccountHotelView> accountHotelViewList; 
	
	public List<AccountPricingType> getAccountPricingTypeList() {
		return accountPricingTypeList;
	}

	public void setAccountPricingTypeList(List<AccountPricingType> accountPricingTypeList) {
		this.accountPricingTypeList = accountPricingTypeList;
	}

	public List<ThirdPartyRegion> getAccountThirdPartyList() {
		return accountThirdPartyList;
	}

	public void setAccountThirdPartyList(List<ThirdPartyRegion> accountThirdPartyList) {
		this.accountThirdPartyList = accountThirdPartyList;
	}

	public List<PricingPeriod> getPricingPeriodList() {
		return pricingPeriodList;
	}

	public void setPricingPeriodList(List<PricingPeriod> pricingPeriodList) {
		this.pricingPeriodList = pricingPeriodList;
	}

	public List<AccountSegment> getAccountSegmentList() {
		return accountSegmentList;
	}

	public void setAccountSegmentList(List<AccountSegment> accountSegmentList) {
		this.accountSegmentList = accountSegmentList;
	}

	public List<AccountPricingCycle> getAccountPricingCycleList() {
		return accountPricingCycleList;
	}

	public void setAccountPricingCycleList(List<AccountPricingCycle> accountPricingCycleList) {
		this.accountPricingCycleList = accountPricingCycleList;
	}

	public void setAllowableAerPercentsList(List<Allowable_aer_percents> allowableAerPercentsList) {
		this.allowableAerPercentsList = allowableAerPercentsList;
	}

	public List<Allowable_aer_percents> getAllowableAerPercentsList() {
		return allowableAerPercentsList;
	}
	
	public List<AlternateCancPolicy> getAlternateCancPolicyList() {
		return alternateCancPolicyList;
	}

	public void setAlternateCancPolicyList(
			List<AlternateCancPolicy> alternateCancPolicyList) {
		this.alternateCancPolicyList = alternateCancPolicyList;
	}
	
	public List<AlternateCancPolicy> getAlternateCancPolicyTimeList() {
		return alternateCancPolicyTimeList;
	}

	public void setAlternateCancPolicyTimeList(
			List<AlternateCancPolicy> alternateCancPolicyTimeList) {
		this.alternateCancPolicyTimeList = alternateCancPolicyTimeList;
	}

	
	public List<AccountHotelView> getAccountHotelViewList() {
		return accountHotelViewList;
	}

	public void setAccountHotelViewList(List<AccountHotelView> accountHotelViewList) {
		this.accountHotelViewList = accountHotelViewList;
	}

	public List<AlternateCancPolicy> getAlternateCancPolicyOptionList() {
		return alternateCancPolicyOptionList;
	}

	public void setAlternateCancPolicyOptionList(List<AlternateCancPolicy> alternateCancPolicyOptionList) {
		this.alternateCancPolicyOptionList = alternateCancPolicyOptionList;
	}
	
	
}
