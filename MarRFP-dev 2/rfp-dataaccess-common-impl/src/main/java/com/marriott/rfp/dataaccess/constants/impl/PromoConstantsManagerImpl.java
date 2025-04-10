package com.marriott.rfp.dataaccess.constants.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.constants.api.PromoConstantsManager;
import com.marriott.rfp.object.constants.Constants;

/**
 * Session Bean implementation class PromoConstantsManagerImpl
 */
@Service
public class PromoConstantsManagerImpl implements PromoConstantsManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public PromoConstantsManagerImpl() {

	}

	private String getConstantsDetails(String constant_name) {
		Query query = em.createNativeQuery("select c.constant_value from mfpdbo.Promo_Constants c where c.constant_name= ?1 ", String.class);
		query.setParameter(1, constant_name);
		return (String) query.getSingleResult();
	}

	private Constants getConstantsFullDetails(String constant_name) {
		Query query = em.createNativeQuery("select  c.constant_value, c.constant_name from mfpdbo.Promo_Constants c where c.constant_name= ?1 ", Constants.class);
		query.setParameter(1, constant_name);
		return (Constants) query.getSingleResult();
	}

	public long getMaxSeasons() {

		return Long.parseLong(getConstantsDetails("MAX_SEASONS"));
	}

	public long getMaxSubs() {

		return Long.parseLong(getConstantsDetails("MAX_SUBS"));
	}

	public long getMaxRateFactsLines() {

		return Long.parseLong(getConstantsDetails("MAX_RATEFACTS_LINES"));
	}

	public String getMaxRateCat() {

		return getConstantsDetails("MAX_RATE_CAT");
	}

	public long getStdRpgmNumFields() {

		return Long.parseLong(getConstantsDetails("STD_RPGM_NUM_FIELDS"));
	}

	public long getPrmRpgmNumFields() {

		return Long.parseLong(getConstantsDetails("PRM_RPGM_NUM_FIELDS"));
	}

	public long getFltRpgmNumFields() {

		return Long.parseLong(getConstantsDetails("FLT_RPGM_NUM_FIELDS"));
	}

	public int getPromoMarshaMaxDaysOut() {

		return Integer.parseInt(getConstantsDetails("MARSHA_MAX_DAYS_OUT"));
	}

	public String getPromoContactEmail() {

		return getConstantsDetails("PROMO_CONTACT_EMAIL");
	}

	public String getPromoContactName() {

		return getConstantsDetails("PROMO_CONTACT_NAME");
	}

	public String getPromoProfileUpdateDays() {

		return getConstantsDetails("PROFILE_UPDATE_DAYS");
	}

	public Constants getPromoContactEmailConst() {
		return getConstantsFullDetails("PROMO_CONTACT_EMAIL");
	}

}
