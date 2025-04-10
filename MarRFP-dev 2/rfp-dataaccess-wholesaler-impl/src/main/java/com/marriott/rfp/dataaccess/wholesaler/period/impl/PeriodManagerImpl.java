package com.marriott.rfp.dataaccess.wholesaler.period.impl;

import java.util.List;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.marriott.rfp.dataaccess.wholesaler.period.api.PeriodManager;
import com.marriott.rfp.object.wholesaler.period.Period;
import org.springframework.stereotype.Service;

/**
 * Session Bean implementation class PeriodManagerImpl
 */
@Service("periodManagerImplWholesaler")
public class PeriodManagerImpl implements PeriodManager {
	
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public PeriodManagerImpl() { }
	
	@SuppressWarnings("unchecked")
	public List<Period> findAllPeriodsForRole(String role) {

		String queryString = "SELECT PRICE_PERIOD PERIOD FROM MFPDBO.WS_PRICE_PERIOD";
		if (role.equals("MFPUSER"))
			queryString += " WHERE (HOTELSVIEW ='Y')";
		
		queryString += " ORDER BY PRICE_PERIOD DESC";
		Query q = em.createNativeQuery(queryString, Period.class);
		List<Period> periodList = q.getResultList();

		return periodList;
		
	}

   
	public Period findPeriodDetails(long period){
		String queryString = "SELECT to_char(start_date,'Month dd,yyyy') startdate, to_char(end_date,'Month dd,yyyy') enddate, to_char(start_date,'MM/DD/YYYY') startdatemmddyyyy, to_char(end_date,'MM/DD/YYYY') enddatemmddyyyy, hotelsview " +
				"FROM MFPDBO.WS_PRICE_PERIOD " + 
				" where price_period= ?1";
		
		Query q = em.createNativeQuery(queryString, Period.class);
		q.setParameter(1, period);
		Period periodobj=(Period)q.getSingleResult();
		return periodobj;
			
	}
	
}