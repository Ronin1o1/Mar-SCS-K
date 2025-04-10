package com.marriott.rfp.dataacess.pricing.accountpricingcycle.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountpricingcycle.api.AccountPricingCycleManager;
import com.marriott.rfp.object.pricing.account.AccountPricingCycle;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountPricingCycleManagerImpl implements AccountPricingCycleManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<AccountPricingCycle> getAccountPricingCycle() {
		String queryString = "select accountpricingcycleid, accountpricingcycle from mfpdbo.accountpricingcycle_ref order by accountpricingcycleid";
		Query q = em.createNativeQuery(queryString, AccountPricingCycle.class);

		@SuppressWarnings("unchecked")
		List<AccountPricingCycle> accountPricingCycleList = q.getResultList();

		return accountPricingCycleList;
	}

}
