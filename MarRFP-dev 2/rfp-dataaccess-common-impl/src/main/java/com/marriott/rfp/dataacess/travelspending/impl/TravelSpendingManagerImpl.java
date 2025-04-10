package com.marriott.rfp.dataacess.travelspending.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.travelspending.api.TravelSpendingManager;
import com.marriott.rfp.object.travelspending.TravelSpending;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class TravelSpendingManagerImpl implements TravelSpendingManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
        EntityManager em;

    @SuppressWarnings("unchecked")
    public List<TravelSpending> findAllQuarters() {

	String queryString = "SELECT   a.quartername, a.description FROM mfpdbo.trvlspending_quarter a  where viewable ='Y' "
		+ " ORDER BY begindate desc, description, enddate desc ";
	Query q = em.createNativeQuery(queryString, TravelSpending.class);
	List<TravelSpending> tslist = q.getResultList();

	return tslist;
    }

}
