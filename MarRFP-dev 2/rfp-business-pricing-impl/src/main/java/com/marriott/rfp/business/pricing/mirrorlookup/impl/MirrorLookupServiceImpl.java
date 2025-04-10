package com.marriott.rfp.business.pricing.mirrorlookup.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.mirrorlookup.api.MirrorLookupService;
import com.marriott.rfp.dataacess.pricing.mirrorlookup.api.MirrorLookupManager;
import com.marriott.rfp.object.mirror.PropertyMirrorRateEntity;
import com.marriott.rfp.object.mirror.PropertyMirrorRateOffer;
import com.marriott.rfp.object.mirror.RateType;
@Transactional("transactionManagerRfpCommon")
@Service
public class MirrorLookupServiceImpl implements MirrorLookupService {
	
	@Autowired
	private MirrorLookupManager mirrorLookupManager;
	
	public List<RateType> getRateTypes(){
		return mirrorLookupManager.getRateTypes();
	}

	public List<PropertyMirrorRateOffer> findEligibleParentPropertyROs(Long propertyId, Long rateOfferId, Long rateTypeId){
		return mirrorLookupManager.findEligibleParentPropertyROs(propertyId, rateOfferId, rateTypeId);
	}

	public List<PropertyMirrorRateEntity> findAllPropertyREs(Long hotelid, Long propertyRateOfferId){
		return mirrorLookupManager.findAllPropertyREs(hotelid,propertyRateOfferId);
	}
}
