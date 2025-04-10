package com.marriott.rfp.dataacess.pricing.accountsubset.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountsubset.api.AccountSubsetManager;
import com.marriott.rfp.object.pricing.account.AccountSubset;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountSubsetManagerImpl implements AccountSubsetManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<AccountSubset> getAccountSubsets() {

	String queryString = "SELECT REGIONID , REGIONNAME  FROM MFPDBO.REGION_LOOKUP  ORDER BY REGION_SEQUENCE ASC";

	Query q = em.createNativeQuery(queryString, AccountSubset.class);

	List<AccountSubset> accountSubsetList = q.getResultList();

	return accountSubsetList;
    }

}
