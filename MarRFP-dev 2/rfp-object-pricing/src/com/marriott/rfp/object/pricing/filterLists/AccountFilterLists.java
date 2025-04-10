package com.marriott.rfp.object.pricing.filterLists;

import java.util.List;

import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;

public class AccountFilterLists extends FilterLists {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<AccountSegment> accountSegmentList;
	private List<AccountPricingType> accountPricingTypeList;

	public List<AccountSegment> getAccountSegmentList() {
		return accountSegmentList;
	}

	public void setAccountSegmentList(List<AccountSegment> accountSegmentList) {
		this.accountSegmentList = accountSegmentList;
	}

	public List<AccountPricingType> getAccountPricingTypeList() {
		return accountPricingTypeList;
	}

	public void setAccountPricingTypeList(List<AccountPricingType> accountPricingTypeList) {
		this.accountPricingTypeList = accountPricingTypeList;
	}

}
