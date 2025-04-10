package com.marriott.rfp.business.pricing.admin.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.admin.api.HPPRateOfferRpgmLookupService;
import com.marriott.rfp.dataacess.pricing.account.api.HPPRateOfferRpgmLookupManager;
import com.marriott.rfp.object.pricing.account.HPPRateOffer;
import com.marriott.rfp.object.pricing.account.HPPRateProgram;
@Transactional("transactionManagerRfpCommon")
@Service
public class HPPRateOfferRpgmLookupServiceImpl implements HPPRateOfferRpgmLookupService {

	@Autowired
	private HPPRateOfferRpgmLookupManager lookupManager;

	public HPPRateOfferRpgmLookupServiceImpl() {
	}

	public HPPRateOfferRpgmLookupServiceImpl(HPPRateOfferRpgmLookupManager lookupManager) {
		this.lookupManager = lookupManager;
	}

	public List<HPPRateOffer> getRateOffers(String filterValue, Long start, Long count) {
		return lookupManager.getRateOffers( filterValue,  start,  count);
	}

	public List<HPPRateProgram> getRatePrograms(Long rateOfferId) {
		return lookupManager.getRatePrograms(rateOfferId);
	}
}
