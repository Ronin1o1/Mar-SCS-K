package com.marriott.rfp.dataaccess.state.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.state.api.StateManager;
import com.marriott.rfp.object.state.State;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class StateManagerImpl implements StateManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public StateManagerImpl() {

	}

	public List<State> getStates(String country) {
		String queryString = "SELECT A.STATE, A.STATENAME FROM MFPDBO.STATE A WHERE COUNTRY=?1 ORDER BY STATENAME";

		Query q = em.createNativeQuery(queryString, State.class);
		q.setParameter(1, country);

		@SuppressWarnings("unchecked")
		List<State> stateList = q.getResultList();
		return stateList;

	}

}
