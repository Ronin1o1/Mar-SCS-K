package com.marriott.rfp.dataacess.pricing.accountsegment.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountsegment.api.AccountSegmentManager;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;

/**
 * Session Bean implementation class AccountSegmentManagerImpl
 */
@Service
public class AccountSegmentManagerImpl implements AccountSegmentManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<AccountSegment> getAllAccountSegments() {

		String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A ORDER BY A.SEQUENCE ASC ";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;
	}

	public String getAccountSegmentName(String accountsegment) {

		String queryString = "SELECT  A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A where a.accounttype=?1 ";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountsegment);
		String accountsegmentname = null;
		try {
			accountsegmentname = (String) q.getSingleResult();
		} catch (NoResultException ex) {
			accountsegmentname = null;
		}

		return accountsegmentname;
	}

	public List<AccountSegment> getSegmentAndDefaultRules() {

		String queryString = "SELECT   a.accounttype, a.accounttypedescription, nvl(b.defaultvalue,'N') defaultcom   FROM mfpdbo.accounttiertype_ref a, "
				+ "(SELECT a.accounttype, b.defaultvalue   FROM mfpdbo.ratetype_rules_ref b, mfpdbo.ratetype_ref a "
				+ " WHERE (a.ratetypeid = b.ratetypeid)   AND (b.ruletypeid = '1')) b   WHERE (a.accounttype = b.accounttype(+)) " + "ORDER BY A.SEQUENCE ASC";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		@SuppressWarnings("unchecked")
		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;

	}

	public List<AccountSegment> getPricingAccountSegments() {

		String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A where bt_only='Y' ORDER BY A.SEQUENCE ASC ";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		@SuppressWarnings("unchecked")
		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;
	}

	public List<AccountSegment> getPricingAccountSegmentsOrderByAccDesc() {

		String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A where bt_only='Y' ORDER BY A.ACCOUNTTYPEDESCRIPTION ASC ";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		@SuppressWarnings("unchecked")
		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;
	}

	public List<AccountSegment> getSalesAccountSegments() {

		String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A where accounttype not in ('T') AND bt_only='Y' ORDER BY A.SEQUENCE ASC ";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		@SuppressWarnings("unchecked")
		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;
	}
	
	public List<AccountSegment> getPricingSCPTAccountSegments() {

		String queryString = "SELECT a.accounttype, a.accounttypedescription  FROM mfpdbo.accounttiertype_ref a  WHERE bt_only = 'Y'  UNION "
				+ " SELECT 'L' accounttype, 'Local' accounttypedescription FROM DUAL  UNION  SELECT 'G' accounttype, 'GPP' accounttypedescription FROM DUAL " + " ORDER BY accounttypedescription ASC";

		Query q = em.createNativeQuery(queryString, AccountSegment.class);

		@SuppressWarnings("unchecked")
		List<AccountSegment> accountSegmentList = q.getResultList();

		return accountSegmentList;
	}


}
