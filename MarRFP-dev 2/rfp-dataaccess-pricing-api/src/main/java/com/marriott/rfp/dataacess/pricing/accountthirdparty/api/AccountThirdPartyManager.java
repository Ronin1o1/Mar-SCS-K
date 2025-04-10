package com.marriott.rfp.dataacess.pricing.accountthirdparty.api;

import java.util.List;



import com.marriott.rfp.object.pricing.account.ThirdPartyRegion;


public interface AccountThirdPartyManager {
	public List<ThirdPartyRegion> getAllAccountThirdParties();

	public List<ThirdPartyRegion> getAccountThirdPartiesForAcctReg();

	public String getAccountThirdPartiesName(Long thirdPartyId);
}
