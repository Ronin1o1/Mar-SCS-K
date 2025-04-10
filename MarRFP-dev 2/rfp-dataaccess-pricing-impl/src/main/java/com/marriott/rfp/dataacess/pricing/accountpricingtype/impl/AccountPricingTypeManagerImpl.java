package com.marriott.rfp.dataacess.pricing.accountpricingtype.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountpricingtype.api.AccountPricingTypeManager;
import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountPricingTypeManagerImpl implements AccountPricingTypeManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<AccountPricingType> getAllAccountPricingTypes() {

		String queryString = "select accountpricingtype, accountpricing from mfpdbo.accountpricingtype_ref order by accountpricingtype ";

		Query q = em.createNativeQuery(queryString, AccountPricingType.class);

		List<AccountPricingType> accountPricingTypeList = q.getResultList();

		return accountPricingTypeList;
	}

	@SuppressWarnings("unchecked")
	public List<AccountPricingType> getDisplayAccountPricingTypes() {

		String queryString = "select accountpricingtype, accountpricing from mfpdbo.accountpricingtype_ref  where pricingtype_display = 'Y' order by accountpricingtype ";

		Query q = em.createNativeQuery(queryString, AccountPricingType.class);

		List<AccountPricingType> accountPricingTypeList = q.getResultList();

		return accountPricingTypeList;
	}

}
