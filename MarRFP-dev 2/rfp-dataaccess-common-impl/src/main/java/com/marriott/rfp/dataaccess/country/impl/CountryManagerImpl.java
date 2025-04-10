package com.marriott.rfp.dataaccess.country.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.country.api.CountryManager;
import com.marriott.rfp.object.country.Country;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class CountryManagerImpl implements CountryManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	private static final CacheManager cacheManager = CacheManager.create(CountryManagerImpl.class.getResource("/ehcache_da_common.xml"));

	/**
	 * Default constructor.
	 */
	public CountryManagerImpl() {

	}

	@SuppressWarnings("unchecked")
	public List<Country> getCountries() {
		List<Country> countryList;
		String cacheKey = "countries";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {

			String queryString = "SELECT A.COUNTRY, A.COUNTRYNAME FROM MFPDBO.COUNTRY A WHERE (A.DISPLAYFLAG ='Y') order by decode(a.country,'US', '0', A.COUNTRYNAME)";

			Query q = em.createNativeQuery(queryString, Country.class);

			countryList = q.getResultList();
			if (countryList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, countryList));
			}
		} else
			countryList = (List<Country>) elem.getValue();
		return countryList;

	}

	@SuppressWarnings("unchecked")
	public List<Country> getCountriesforHotels() {
		List<Country> countryList;
		String cacheKey = "countrieshotel";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT distinct A.COUNTRY, A.COUNTRYNAME FROM  MFPDBO.COUNTRY A, MFPDBO.HOTEL B "
					+ " WHERE (A.COUNTRY = B.COUNTRY)  AND (B.PARTITION_IDX ='M') and (A.DISPLAYFLAG ='Y') " + " order by decode(a.country,'US', '0', A.COUNTRYNAME)";

			Query q = em.createNativeQuery(queryString, Country.class);

			countryList = q.getResultList();
			if (countryList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, countryList));
			}
		} else
			countryList = (List<Country>) elem.getValue();
		return countryList;

	}

	private Ehcache getCache() {
		return cacheManager.getCache("rfp_da_common");
	}

}
