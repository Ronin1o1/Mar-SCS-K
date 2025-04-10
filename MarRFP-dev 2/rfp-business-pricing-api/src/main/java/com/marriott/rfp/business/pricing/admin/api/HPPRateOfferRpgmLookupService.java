package com.marriott.rfp.business.pricing.admin.api;

import java.util.List;



import com.marriott.rfp.object.pricing.account.HPPRateOffer;
import com.marriott.rfp.object.pricing.account.HPPRateProgram;


public interface HPPRateOfferRpgmLookupService {

	public List<HPPRateOffer> getRateOffers(String filterValue, Long start, Long count);
	
	public List<HPPRateProgram> getRatePrograms(Long rateOfferId);
}
