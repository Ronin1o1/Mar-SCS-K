package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelrfp.api.RemovalReasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.RemovalReason;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class RemovalReasonManagerImpl implements RemovalReasonManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<RemovalReason> findRemovalReasons() {

		String queryString = " SELECT REMOVALREASONID, REMOVALREASON  FROM MFPDBO.PGOOS_REMOVAL_REF ORDER BY REMOVALREASON ASC";
		Query q = em.createNativeQuery(queryString, RemovalReason.class);
		List<RemovalReason> rateslist = q.getResultList();
		return rateslist;
	}

}
