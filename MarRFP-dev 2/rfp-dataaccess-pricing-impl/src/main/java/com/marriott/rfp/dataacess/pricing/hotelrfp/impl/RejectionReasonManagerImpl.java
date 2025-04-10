package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelrfp.api.RejectionReasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class RejectionReasonManagerImpl implements RejectionReasonManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<RejectionReason> findRejectionReasons() {

		String queryString = " SELECT A.REJECTREASONID, A.REJECTIONREASON FROM MFPDBO.ACCOUNTREJECT_REF A ORDER BY A.REJECTIONREASON ASC ";
		Query q = em.createNativeQuery(queryString, RejectionReason.class);
		List<RejectionReason> rateslist = q.getResultList();
		return rateslist;
	}

}
