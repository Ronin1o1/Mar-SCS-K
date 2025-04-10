package com.marriott.rfp.dataaccess.marketsalesregion.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.marketsalesregion.api.MarketSalesRegionManager;
import com.marriott.rfp.object.marketsalesregion.MarketSalesRegion;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class MarketSalesRegionManagerImpl implements MarketSalesRegionManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public MarketSalesRegionManagerImpl() {

	}

	public List<MarketSalesRegion> getMarketSalesRegion() {
		String queryString = "select sales_region_ref_id regionid, market_sales_region region from MFPDBO.MARKET_SALES_REGION_REF order by market_sales_region";

		Query q = em.createNativeQuery(queryString, MarketSalesRegion.class);

		@SuppressWarnings("unchecked")
		List<MarketSalesRegion> regionList = q.getResultList();
		return regionList;

	}


}
