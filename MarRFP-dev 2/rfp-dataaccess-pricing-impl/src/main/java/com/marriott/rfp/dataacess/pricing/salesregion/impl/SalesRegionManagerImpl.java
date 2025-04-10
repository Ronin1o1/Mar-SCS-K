package com.marriott.rfp.dataacess.pricing.salesregion.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.salesregion.api.SalesRegionManager;
import com.marriott.rfp.object.pricing.salesregion.SalesRegion;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class SalesRegionManagerImpl implements SalesRegionManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<SalesRegion> getAllSalesRegions() {

		String queryString = "SELECT A.SALESREGIONID , A.SALESREGION  FROM MFPDBO.SALES_REGION A ORDER BY A.SALESREGION ASC ";

		Query q = em.createNativeQuery(queryString, SalesRegion.class);

		List<SalesRegion> salesRegionList = q.getResultList();

		return salesRegionList;
	}

	public String getSalesRegion(String salesRegionID) {

		String queryString = "SELECT  A.SALESREGION FROM MFPDBO.SALES_REGION A where SALESREGIONID=?1 ";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, salesRegionID);
		String salesregion = null;
		try {
			salesregion = (String) q.getSingleResult();
		} catch (NoResultException ex) {
			salesregion = null;
		}

		return salesregion;
	}

}
