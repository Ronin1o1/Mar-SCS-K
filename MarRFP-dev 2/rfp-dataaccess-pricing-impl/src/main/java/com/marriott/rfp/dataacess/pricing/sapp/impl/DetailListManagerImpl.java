package com.marriott.rfp.dataacess.pricing.sapp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.sapp.api.DetailListManager;
import com.marriott.rfp.object.pricing.sapp.DetailList;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class DetailListManagerImpl implements DetailListManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public DetailListManagerImpl() {

	}

	public List<DetailList> getDetailListGlb() {
		String queryString = "SELECT A.GLOBALID listId, A.GLOBALDESC listName FROM MFPDBO.ACCOUNTINFO_GLOBAL_REF A  WHERE TYPE1 = 'Y' ORDER BY A.GLOBALID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	public List<DetailList> getDetailListAssn() {
		String queryString = "SELECT A.ASSOCIATIONID listId, A.ASSOCIATION_NAME listName FROM MFPDBO.ACCOUNTINFO_ASSOCIATION_REF A ORDER BY A.ASSOCIATIONID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}

	public List<DetailList> getDetailListGrm() {
		String queryString = "SELECT A.GLOBALID listId, A.GLOBALDESC listName FROM MFPDBO.ACCOUNTINFO_GLOBAL_REF A WHERE TYPE2 = 'Y' ORDER BY A.GLOBALID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	public List<DetailList> getDetailListInf() {
		String queryString = "SELECT A.INFLUENCEID listId, A.INFLUENCENAME listName FROM MFPDBO.ACCOUNTINFO_INFLUENCE_REF A ORDER BY A.INFLUENCEID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	public long getRevStreamId(String revStream) {
		String queryString = "SELECT REVSTREAMID FROM MFPDBO.ACCOUNTINFO_REVSTREAM_REF WHERE REVSTREAMNAME '" + revStream + "'";
		Query q = em.createNativeQuery(queryString, Long.class);

		@SuppressWarnings("unchecked")
		List<Long> detailList = q.getResultList();
		return detailList.get(0);

	}
	
	public List<DetailList> getDetailListAreaPlan() {
		String queryString = "SELECT A.AREAPLANID refId, A.AREAPLANNAME listName FROM MFPDBO.ACCOUNTINFO_AREAPLAN_REF A ORDER BY A.AREAPLANID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	public List<DetailList> getDetailListRevStream() {
		String queryString = "SELECT A.REVSTREAMID refId, A.REVSTREAMNAME listName FROM MFPDBO.ACCOUNTINFO_REVSTREAM_REF A ORDER BY A.REVSTREAMID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	public List<DetailList> getDetailListBuyerTypes() {
		String queryString = "SELECT A.BUYERTYPEID refId, A.BUYERTYPENAME listName FROM MFPDBO.ACCOUNTINFO_BUYER_TYPE_REF A ORDER BY A.BUYERTYPEID";

		Query q = em.createNativeQuery(queryString, DetailList.class);

		@SuppressWarnings("unchecked")
		List<DetailList> detailList = q.getResultList();
		return detailList;

	}
	
	
}