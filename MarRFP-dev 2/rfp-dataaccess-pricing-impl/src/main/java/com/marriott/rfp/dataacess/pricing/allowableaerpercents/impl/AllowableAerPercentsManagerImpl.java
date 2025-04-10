package com.marriott.rfp.dataacess.pricing.allowableaerpercents.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.allowableaerpercents.api.AllowableAerPercentsManager;
import com.marriott.rfp.object.pricing.account.Allowable_aer_percents;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AllowableAerPercentsManagerImpl implements AllowableAerPercentsManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Allowable_aer_percents> getAllowableAerPercents() {

		String queryString =  "SELECT a.allowable_percents  FROM mfpdbo.allowable_aer_percents a order by a.allowable_percents";

		Query q = em.createNativeQuery(queryString, Allowable_aer_percents.class);

		List<Allowable_aer_percents> accountPricingTypeList = q.getResultList();

		return accountPricingTypeList;
	}

}
