package com.marriott.rfp.dataaccess.saleslocation.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.saleslocation.api.SalesLocationManager;
import com.marriott.rfp.object.location.SalesLocation;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class SalesLocationManagerImpl implements SalesLocationManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public SalesLocationManagerImpl() {

	}

	public List<SalesLocation> getLocations() {
		String queryString = "select locationid, locationname location from MFPDBO.LOCATION_REF order by locationname";

		Query q = em.createNativeQuery(queryString, SalesLocation.class);

		@SuppressWarnings("unchecked")
		List<SalesLocation> locationList = q.getResultList();
		return locationList;

	}


}
