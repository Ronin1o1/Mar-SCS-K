package com.marriott.rfp.dataaccess.constants.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.constants.api.WSConstantsManager;
import com.marriott.rfp.object.constants.Constants;

/**
 * Session Bean implementation class WSConstantsManagerImpl
 */
@Service
public class WSConstantsManagerImpl implements WSConstantsManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public WSConstantsManagerImpl() {

	}

	private String getConstantsDetails(String constant_name) {
		Query query = em.createNativeQuery("select c.constant_value from mfpdbo.WS_Constants c where upper(c.constant_name) = upper(?1) ", String.class);
		query.setParameter(1, constant_name);
		return (String) query.getSingleResult();
	}

	private Constants getConstantsFullDetails(String constant_name) {
	    Query query = em.createNativeQuery("select c.constant_name, c.constant_value from mfpdbo.WS_Constants c where upper(c.constant_name) = upper(?1) ", Constants.class);
	    query.setParameter(1,constant_name);
		return (Constants) query.getSingleResult();
	}

	public Constants getWSContactEmail() {
		return getConstantsFullDetails("WS_CONTACT_EMAIL");
	}

	public long getMaxRoomPool() {
		return Long.parseLong(getConstantsDetails("ROOM_SELECTION"));
	}
	
   	public long getWSMaxSeasons(){
		return Long.parseLong(getConstantsDetails("SEASONS_ADMIN"));
	}
	
	public long getWSMinSeasons(){
		return Long.parseLong(getConstantsDetails("SEASONS_USER"));
	}
	
	


}