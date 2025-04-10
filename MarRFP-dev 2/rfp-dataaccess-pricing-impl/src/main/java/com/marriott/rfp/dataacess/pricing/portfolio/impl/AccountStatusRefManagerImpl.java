package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountStatusRefManager;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusRef;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountStatusRefManagerImpl implements AccountStatusRefManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<AccountStatusRef> getAllAccountStatusRef() {

		String queryString = "SELECT a.account_status_id accountStatusId, a.account_status_value accountStatusName FROM mfpdbo.account_status_ref a ORDER BY a.seqid";

		Query q = em.createNativeQuery(queryString, AccountStatusRef.class);

		List<AccountStatusRef> accountStatusRef = q.getResultList();

		return accountStatusRef;
	}

}
