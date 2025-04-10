package com.marriott.rfp.dataacess.pricing.alternateCancPolicy.impl;

/**
 * @author Kperl585
 */
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.alternateCancPolicy.api.AlternateCancPolicyManager;
import com.marriott.rfp.object.pricing.account.AlternateCancPolicy;

@Service
public class AlternateCancPolicyManagerImpl implements
		AlternateCancPolicyManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<AlternateCancPolicy> getAlternateCancPolicylist() {
		String queryString = "select altcancelpolicyid, altcancelpolicy from mfpdbo.altcancelpolicy order by altcancelpolicyid";
		Query q = em.createNativeQuery(queryString, AlternateCancPolicy.class);

		List<AlternateCancPolicy> alternateCancPolicyList = q.getResultList();
		return alternateCancPolicyList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AlternateCancPolicy> getAlternateCancPolicyTimelist() {
		String queryString = "select altcancelpolicytimeid, altcancelpolicytime from mfpdbo.altcancelpolicytime order by altcancelpolicytimeid";
		Query q = em.createNativeQuery(queryString, AlternateCancPolicy.class);

		List<AlternateCancPolicy> alternateCancPolicyList = q.getResultList();
		return alternateCancPolicyList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<AlternateCancPolicy> getAlternateCancPolicyOptionlist() {
		String queryString = "select altcancelpolicyoptionid, altcancelpolicyoption from mfpdbo.altcancelpolicyoption order by altcancelpolicyoptionid";
		Query q = em.createNativeQuery(queryString, AlternateCancPolicy.class);

		List<AlternateCancPolicy> alternateCancPolicyList = q.getResultList();
		return alternateCancPolicyList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<AlternateCancPolicy> getAlternateCxlPolicyTimelist() {
		String queryString = "select altcancelpolicytimeid, altcancelpolicytime from mfpdbo.altcancelpolicytime where hotelspecifictime='Y' order by altcancelpolicytimeid";
		Query q = em.createNativeQuery(queryString, AlternateCancPolicy.class);

		List<AlternateCancPolicy> alternateCancPolicyList = q.getResultList();
		return alternateCancPolicyList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<AlternateCancPolicy> getCxlorderlist() {
		String queryString = "select altcancelpolicytimeid, cxlorder from mfpdbo.altcancelpolicytime order by cxlorder";
		Query q = em.createNativeQuery(queryString, AlternateCancPolicy.class);

		List<AlternateCancPolicy> cxlorderlist = q.getResultList();
		return cxlorderlist;
	}

}
