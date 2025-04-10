package com.marriott.rfp.dataacess.pricing.period.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service("periodManagerImpl")

public class PeriodManagerImpl implements PeriodManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Period> findAllPeriodsForRole(String role) {

		String queryString = "SELECT A.PERIOD, A.HOTELSVIEW FROM MFPDBO.PERIOD A";
		if (role.equals("MFPUSER"))
			queryString += " WHERE (HOTELSVIEW ='Y')  ";
		queryString += " ORDER BY PERIOD DESC";

		Query q = em.createNativeQuery(queryString, Period.class);
		List<Period> periodList = q.getResultList();

		return periodList;
	}

	@SuppressWarnings("unchecked")
	public List<Period> findPeriodsForMaintenance() {

		String queryString = "SELECT A.PERIOD, A.HOTELSVIEW FROM MFPDBO.PERIOD A ORDER BY PERIOD DESC";

		Query q = em.createNativeQuery(queryString, Period.class);
		List<Period> periodList = q.getResultList();

		if (periodList != null) {
			for (int i = 0; i < periodList.size(); i++) {
				String queryString2 = "SELECT   a.pricingperiodid, a.period, a.duedate, decode((select count(*) from mfpdbo.pricingperiod_accounts where pricingperiod_accounts.pricingperiodid=a.pricingperiodid),0,'N','Y') hasAccounts "
						+ " FROM   mfpdbo.pricingperiod a	WHERE   a.period = ?1 ORDER BY   a.duedate";
				Query q2 = em.createNativeQuery(queryString2, PricingPeriod.class);
				q2.setParameter(1, periodList.get(i).getPeriod());
				List<PricingPeriod> pricingPeriodList = q2.getResultList();
				periodList.get(i).setDueDates(pricingPeriodList);
			}
		}
		return periodList;
	}
	
	@SuppressWarnings("unchecked")
	public List<Period> findCBCPeriodsForMaintenance() {

		String queryString = "SELECT A.PERIOD, A.HOTELSVIEW FROM MFPDBO.PERIOD A ORDER BY PERIOD DESC";

		Query q = em.createNativeQuery(queryString, Period.class);
		List<Period> periodList = q.getResultList();

		if (periodList != null) {
			for (int i = 0; i < periodList.size(); i++) {
				String queryString2 = "SELECT   a.pricingperiodid, a.period, a.duedate, decode((select count(*) from mfpdbo.pricingperiod_accounts where pricingperiod_accounts.pricingperiodid=a.pricingperiodid),0,'N','Y') hasAccounts "
						+ " FROM   mfpdbo.cbcpricingperiod a	WHERE   a.period = ?1 ORDER BY   a.duedate";
				Query q2 = em.createNativeQuery(queryString2, PricingPeriod.class);
				q2.setParameter(1, periodList.get(i).getPeriod());
				List<PricingPeriod> pricingPeriodList = q2.getResultList();
				periodList.get(i).setDueDates(pricingPeriodList);
			}
		}
		return periodList;
	}

	public List<Period> findAllPeriodsExcept(long period) {

		String queryString = "SELECT A.PERIOD, A.HOTELSVIEW FROM MFPDBO.PERIOD A where period<> ?1 ORDER BY PERIOD DESC";

		Query q = em.createNativeQuery(queryString, Period.class);
		q.setParameter(1, period);
		@SuppressWarnings("unchecked")
		List<Period> periodList = q.getResultList();

		return periodList;
	}

	public Period findPeriodDetails(long period) {
		String queryString = "SELECT A.PERIOD, startdate, enddate, hotelsview FROM MFPDBO.PERIOD A  where period=?1";
		Query q = em.createNativeQuery(queryString, Period.class);
		q.setParameter(1, period);
		Period periodDetails = (Period) q.getSingleResult();

		return periodDetails;
	}

	@SuppressWarnings("unchecked")
	public List<PricingPeriod> findDueDates(long period) {

		String queryString = "SELECT pricingperiodid , period , duedate  FROM mfpdbo.pricingperiod  where period =?1 order by duedate  ";

		Query q = em.createNativeQuery(queryString, PricingPeriod.class);
		q.setParameter(1, period);
		List<PricingPeriod> periodList = q.getResultList();
		return periodList;
	}
	
	@SuppressWarnings("unchecked")
	public List<PricingPeriod> findDueDatesWithCurrentDate(long period) {

		String queryString = "SELECT pricingperiodid , period , duedate  FROM mfpdbo.pricingperiod  where period =?1 and DUEDATE - 7 > sysdate order by duedate  ";

		Query q = em.createNativeQuery(queryString, PricingPeriod.class);
		q.setParameter(1, period);
		List<PricingPeriod> periodList = q.getResultList();
		return periodList;
	}

	public PricingPeriod findDueDate(Long pricingperiodid) {

		String queryString2 = "SELECT   a.pricingperiodid, a.period, a.duedate  FROM   mfpdbo.pricingperiod a	WHERE   a.pricingperiodid= ?1 ";
		Query q2 = em.createNativeQuery(queryString2, PricingPeriod.class);
		q2.setParameter(1, pricingperiodid);
		return (PricingPeriod) q2.getSingleResult();
	}
	
	public PricingPeriod findCBCDueDate(Long pricingperiodid) {

		String queryString2 = "SELECT   a.pricingperiodid, a.period, a.duedate  FROM   mfpdbo.cbcpricingperiod a	WHERE   a.pricingperiodid= ?1 ";
		Query q2 = em.createNativeQuery(queryString2, PricingPeriod.class);
		q2.setParameter(1, pricingperiodid);
		return (PricingPeriod) q2.getSingleResult();
	}

	public void updateDueDate(PricingPeriod dueDate) {
		Query q = em.createNativeQuery("begin mfpproc.sp_updateduedates(?1,?2,?3); end;");
		q.setParameter(1, dueDate.getPeriod());
		q.setParameter(2, dueDate.getPricingperiodid());
		q.setParameter(3, dueDate.getShortDueDate());
		q.executeUpdate();
	}
	
	public void updateCBCDueDate(PricingPeriod dueDate) {
		Query q = em.createNativeQuery("begin mfpproc.sp_updatecbcduedates(?1,?2,?3); end;");
		q.setParameter(1, dueDate.getPeriod());
		q.setParameter(2, dueDate.getPricingperiodid());
		q.setParameter(3, dueDate.getShortDueDate());
		q.executeUpdate();
	}

	public void deleteDueDate(Long pricingperiodid) {
		PricingPeriod dueDate = new PricingPeriod();
		dueDate.setPricingperiodid(pricingperiodid);
		updateDueDate(dueDate);
	}
	
	public void deleteCBCDueDate(Long pricingperiodid) {
		PricingPeriod dueDate = new PricingPeriod();
		dueDate.setPricingperiodid(pricingperiodid);
		updateCBCDueDate(dueDate);
	}

	public void updateHotelView(Period period) {
		Query q = em.createNativeQuery("begin MFPPROC.SP_UPDATE_HOTELSVIEW(?1,?2); end;");
		q.setParameter(1, period.getPeriod());
		q.setParameter(2, period.getHotelsview());
		q.executeUpdate();
	}

	public void updateCBCHotelView(Period period) {
		Query q = em.createNativeQuery("begin MFPPROC.SP_UPDATE_CBCHOTELSVIEW(?1,?2); end;");
		q.setParameter(1, period.getPeriod());
		q.setParameter(2, period.getHotelsview());
		q.executeUpdate();
	}
	
	public Date getSysDate() {
		String queryString = "select sysdate from dual";
		Query q = em.createNativeQuery(queryString, Date.class);

		return (Date) q.getSingleResult();
	}
	
	public List<Period> findAllWSPeriodsForRole(String role) {

		String queryString = "SELECT A.PRICE_PERIOD PERIOD, A.HOTELSVIEW FROM MFPDBO.WS_PRICE_PERIOD A";
		if (role.equals("MFPUSER"))
			queryString += " WHERE (HOTELSVIEW ='Y')  ";
		queryString += " ORDER BY PRICE_PERIOD DESC";

		Query q = em.createNativeQuery(queryString, Period.class);
		@SuppressWarnings("unchecked")
		List<Period> periodList = q.getResultList();

		return periodList;
	}
	
	public String getNoPricingFlag(long hotelrfpid) {
		String queryString = "SELECT NOPRICING FROM MFPDBO.HOTELRFP WHERE HOTELRFPID = ?1 ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String noPricing = null;
		try {
			noPricing = (String) q.getSingleResult();
		} catch (NoResultException e) {
			noPricing = null;
		}
		return noPricing;
	}


}
