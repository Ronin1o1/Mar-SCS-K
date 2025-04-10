package com.marriott.rfp.dataacess.pricing.mirrorlookup.api;

import java.util.List;



import com.marriott.rfp.object.mirror.PropertyMirrorRateEntity;
import com.marriott.rfp.object.mirror.PropertyMirrorRateOffer;
import com.marriott.rfp.object.mirror.RateType;


public interface MirrorLookupManager {

	public List<RateType> getRateTypes();

	public List<PropertyMirrorRateOffer> findEligibleParentPropertyROs(Long propertyId, Long rateOfferId, Long rateTypeId);

	public List<PropertyMirrorRateEntity> findAllPropertyREs(Long hotelid, Long propertyRateOfferId);
}
