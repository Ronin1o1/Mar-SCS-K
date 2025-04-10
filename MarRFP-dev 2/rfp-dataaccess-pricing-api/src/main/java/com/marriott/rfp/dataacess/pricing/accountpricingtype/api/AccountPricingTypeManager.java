package com.marriott.rfp.dataacess.pricing.accountpricingtype.api;

import java.util.List;

import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;


public interface AccountPricingTypeManager {
	public List<AccountPricingType> getAllAccountPricingTypes();
	public List<AccountPricingType> getDisplayAccountPricingTypes();
}
