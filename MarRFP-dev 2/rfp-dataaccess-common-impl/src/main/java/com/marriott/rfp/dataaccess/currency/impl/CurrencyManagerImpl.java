package com.marriott.rfp.dataaccess.currency.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.currency.api.CurrencyManager;
import com.marriott.rfp.object.currency.CurrencyData;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class CurrencyManagerImpl implements CurrencyManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public CurrencyManagerImpl() {

	}

	@SuppressWarnings("unchecked")
	public List<CurrencyData> findCurrencyList(String currencyCode) {
		String queryString = "SELECT A.CURRENCYCODE , A.CURRENCYNAME  FROM mfpdbo.CURRENCY_REF A  WHERE (A.DISPLAYFLAG ='Y') "
				+ " or (a.currencycode=?1 and ?2 is not null) ORDER BY a.currencycode, A.CURRENCYNAME ASC";
		Query q = em.createNativeQuery(queryString, CurrencyData.class);
		q.setParameter(1, currencyCode);
		q.setParameter(2, currencyCode);
		List<CurrencyData> currencyList = q.getResultList();

		return currencyList;
	}

	public CurrencyData findAccountTrackingCurrency(long hotelrfpid) {

		String queryString = "begin  mfpproc.sp_updateaccttrackingcurr(?1); end;";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, hotelrfpid);
		q.executeUpdate();

		queryString = "select a.currencyname,a.currencycode from mfpdbo.currency_ref a, mfpdbo.hotel b "
				+ "where a.currencycode=b.acct_tracking_currencycode(+) and hotelid=" + "(select hotelid from mfpdbo.hotelrfp where hotelrfpid=?1)";
		q = em.createNativeQuery(queryString, CurrencyData.class);
		q.setParameter(1, hotelrfpid);
		CurrencyData accountTrackingCurrency = (CurrencyData) q.getSingleResult();
		return accountTrackingCurrency;
	}

	public void updateAccountTrackingCurrency(long hotelrfpid, CurrencyData accountTrackingCurrency) {
		String queryString = "begin mfpproc.sp_insertupdate_acctt_currency(?1,?2); end;";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, accountTrackingCurrency.getCurrencycode());
		q.executeUpdate();
	}
}
