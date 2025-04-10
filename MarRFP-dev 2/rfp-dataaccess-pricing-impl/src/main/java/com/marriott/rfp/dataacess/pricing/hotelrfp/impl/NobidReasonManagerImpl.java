package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelrfp.api.NobidReasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelNobidReason;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class NobidReasonManagerImpl implements NobidReasonManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelNobidReason> findNobidReasons() {

		String queryString = " SELECT A.NOBIDREASONID, A.NOBIDREASON FROM MFPDBO.HOTELNOBID_REF A ORDER BY A.NOBIDREASON ASC ";
		Query q = em.createNativeQuery(queryString, HotelNobidReason.class);
		List<HotelNobidReason> rateslist = q.getResultList();
		return rateslist;
	}



}
