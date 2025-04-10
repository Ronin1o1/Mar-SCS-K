package com.marriott.rfp.dataacess.pricing.accountthirdparty.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountthirdparty.api.AccountThirdPartyManager;
import com.marriott.rfp.object.pricing.account.ThirdPartyRegion;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountThrirdPartyManagerImpl implements AccountThirdPartyManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<ThirdPartyRegion> getAllAccountThirdParties() {
		String queryString = "SELECT   a.account_thirdparty_refid, a.account_thirdparty   FROM mfpdbo.account_thirdparty_ref a ORDER BY a.seqid";
		Query q = em.createNativeQuery(queryString, ThirdPartyRegion.class);

		@SuppressWarnings("unchecked")
		List<ThirdPartyRegion> accountThirdPartyList = q.getResultList();

		return accountThirdPartyList;
	}

	public List<ThirdPartyRegion> getAccountThirdPartiesForAcctReg() {
		String queryString = "SELECT   a.account_thirdparty_refid, a.account_thirdparty   FROM mfpdbo.account_thirdparty_ref a ORDER BY UPPER(a.account_thirdparty)";
		Query q = em.createNativeQuery(queryString, ThirdPartyRegion.class);

		@SuppressWarnings("unchecked")
		List<ThirdPartyRegion> accountThirdPartyList = q.getResultList();

		return accountThirdPartyList;
	}

	public String getAccountThirdPartiesName(Long thirdPartyId) {
		String queryString = "SELECT a.account_thirdparty   FROM mfpdbo.account_thirdparty_ref a where account_thirdparty_refid=?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, thirdPartyId);
		String accountthirdparty = null;
		try {
			accountthirdparty = (String) q.getSingleResult();
		} catch (NoResultException ex) {
			accountthirdparty = null;
		}
		return accountthirdparty;
	}

}
