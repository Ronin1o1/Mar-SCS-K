package com.marriott.rfp.dataacess.pricing.hotelmenu.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.ArgumentException;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.object.pricing.menu.PricingMenu;
import com.marriott.rfp.object.pricing.menu.PricingMenuChecks;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service("hotelMenuManagerImplPricing")

public class HotelMenuManagerImpl implements HotelMenuManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<PricingMenu> findByHotelRFPId(long hotelrfpid) {

		String queryString = "SELECT DISTINCT a.statusid, a.screenid, b.screenname, b.screensequence, b.actionstruts "
				+ " From   (select *  FROM mfpdbo.rfpentrystatus rs, mfpdbo.hotelrfp hr "
				+ " WHERE  rs.hotelrfpid = ?1 and hr.hotelrfpid=rs.hotelrfpid and rs.screenid not in (13,18)) A "
				+ " , MFPDBO.PRICINGSCREENS B   Where (B.screenid = A.screenid) " + " AND (B.PARENTID = 23)  and a.screenid not in (1, 16, 22,  27, 7,14,17, 19,26)  Order By   SCREENSEQUENCE Asc";

		Query q = em.createNativeQuery(queryString, PricingMenu.class);
		q.setParameter(1, hotelrfpid);
		List<PricingMenu> hotelList = q.getResultList();

		return hotelList;
	}

	public PricingMenuChecks getMenuChecks(long hotelrfpid, User userProperties) {
		PricingMenuChecks pricingMenuChecks = new PricingMenuChecks();
		String queryString;

		queryString = "select decode(decode(a.currencycode, null, decode(b.currencycode, null,'N','Y'),'Y'),'Y',decode(a.distanceunit, null, decode(b.distanceunit, null,'N','Y'),'Y'),'N') hasdistanceandcurrency "
				+ " from  mfpdbo.hotel a, mfpdbo.hotelrfp b where  a.hotelid=b.hotelid and b.hotelrfpid= ?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String hasdistanceandcurrency = null;
		try {
			hasdistanceandcurrency = (String) q.getSingleResult();
		} catch (NoResultException e) {

		}
		if (hasdistanceandcurrency != null && hasdistanceandcurrency.equals("Y"))
			pricingMenuChecks.setBHasCurrency(true);
		
		//check for standards screen status & set alert for seasons screen
		queryString = "SELECT distinct A.statusid From   mfpdbo.RFPENTRYSTATUS A Where (A.SCREENID =3) AND (A.HOTELRFPID =?1) ";
		q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String hasstandards = null;
		try {
			hasstandards = (String) q.getSingleResult();
		} catch (NoResultException e) {

		}
		if (hasstandards != null && hasstandards.equals("C"))
			pricingMenuChecks.setBHasStandards(true);
		else
			pricingMenuChecks.setBHasStandards(false);

		queryString = "SELECT   DECODE (b.distanceunit, NULL, 'N', DECODE (b.currencycode, NULL, 'N', 'Y')) hasenteredcurrency " + " FROM   mfpdbo.hotelrfp b WHERE   b.hotelrfpid = ?1";
		q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String hasenteredcurrency = null;
		try {
			hasenteredcurrency = (String) q.getSingleResult();
		} catch (NoResultException e) {

		}
		if (hasenteredcurrency != null && hasenteredcurrency.equals("Y"))
			pricingMenuChecks.setBEnteredCurrency(true);

		// check for seasons

		queryString = "select mfpproc.fn_getnumseasons(?1, null) from dual";
		q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelrfpid);
		Long numSeasons = (Long) q.getSingleResult();

		if (numSeasons.longValue() > 0)
			pricingMenuChecks.setBHasSeasons(true);

		// check for los

		queryString = "select mfpproc.fn_getnumlos(?1, null) from dual";
		q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelrfpid);
		Long numLos = (Long) q.getSingleResult();
		if (numLos.longValue() > 0)
			pricingMenuChecks.setBHasLOS(true);

			

	
		// check for gov fixed rates

		queryString = "SELECT  Count (A.ratetypeid) From mfpdbo.HOTELRATES_gov A Where (A.HOTELRFPID =?1) " + "AND (A.RATETYPEID =1)";
		q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelrfpid);
		Long numGovRates = (Long) q.getSingleResult();
		if (numGovRates.longValue() > 0)
			pricingMenuChecks.setBHasGovRates(true);

		// if there are rates check for fixed rates screen having the
		// status of complete for the hotel user
		if (pricingMenuChecks.getBHasGovRates() && !userProperties.getIsPASAdmin() && !userProperties.getIsAnySalesUser() && !userProperties.getIsReadOnly()) {
			queryString = "SELECT distinct A.statusid From   mfpdbo.RFPENTRYSTATUS A Where (A.SCREENID =18) AND (A.HOTELRFPID =?1) ";
			q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, hotelrfpid);
			String govStatus = null;
			try {
				govStatus = (String) q.getSingleResult();
			} catch (NoResultException e) {

			}
			if (govStatus != null && govStatus.equals("C"))
				pricingMenuChecks.setBHasGovRates(true);
			else
				pricingMenuChecks.setBHasGovRates(false);
		}
		
		//GBTA-4 Remove Fixed Rates
		
		// check for fixed rates
		/*queryString = "SELECT  Count (A.ratetypeid) From mfpdbo.HOTELRATES A Where (A.HOTELRFPID =?1) " + "AND (A.RATETYPEID =1)";
		q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelrfpid);
		Long numFixedRates = (Long) q.getSingleResult();
		if (numFixedRates.longValue() > 0)
			pricingMenuChecks.setBHasFixed(true);

		// if there are rates check for fixed rates screen having the
		// status of complete for the hotel user
		if (pricingMenuChecks.getBHasFixed() && !userProperties.getIsPASAdmin() && !userProperties.getIsAnySalesUser() && !userProperties.getIsReadOnly()) {
			queryString = "SELECT  distinct A.statusid From   mfpdbo.RFPENTRYSTATUS A Where (A.SCREENID =7) AND (A.HOTELRFPID =?1) ";
			q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, hotelrfpid);
			String fixStatus = null;
			try {
				fixStatus = (String) q.getSingleResult();
			} catch (NoResultException e) {

			}
			if (fixStatus != null && fixStatus.equals("C"))
				pricingMenuChecks.setBHasFixed(true);
			else
				pricingMenuChecks.setBHasFixed(false);
		}*/
		if (!userProperties.getIsPASAdmin() && !userProperties.getIsAnySalesUser() && !userProperties.getIsReadOnly()) {
			queryString = "SELECT COUNT (*)  FROM mfpdbo.rfpentrystatus res, mfpdbo.hotel h, mfpdbo.hotelrfp hr "
					+ " WHERE     (h.hotelid = hr.hotelid) AND (hr.hotelrfpid = res.hotelrfpid)  AND (res.screenid = 13) " + " AND (res.hotelrfpid = ?1)  AND (  statusid = 'C') ";
			q = em.createNativeQuery(queryString, Long.class);
			q.setParameter(1, hotelrfpid);
			Long govTerms = (Long) q.getSingleResult();
			if (govTerms.longValue() > 0)
				pricingMenuChecks.setBHasGovTerms(true);
		}

		// --
		// check for group meetings

		queryString = "SELECT count(*)  FROM mfpdbo.hotelrfp	 WHERE hotelrfpid = ?1 " + "   AND ((discfb IS NOT NULL AND discav IS NOT NULL AND comprooms IS NOT NULL AND compparking IS NOT NULL "
				+ "AND directbill IS NOT NULL AND payterms IS NOT NULL AND upfrontdep IS NOT NULL AND minspend IS NOT NULL "
				+ "AND maxspend IS NOT NULL AND corporate_mtngcard IS NOT NULL AND cardmax IS NOT NULL ) "
				+ "OR ((minspend = 'Y' AND minamount IS NOT NULL) OR (maxspend = 'Y' AND maxamount IS NOT NULL) "
				+ "OR (corporate_mtngcard = 'Y' AND mtngcardfunds IS NOT NULL) OR (cardmax = 'Y' AND cardmaxamount IS NOT NULL))) ";

		q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, hotelrfpid);
		Long groupMeet = (Long) q.getSingleResult();
		if (groupMeet.longValue() > 0)
			pricingMenuChecks.setBHasGroupMeeting(true);

		// if there group meetingrates check for fixed rates screen
		// having the status of complete for the hotel user

		//if (pricingMenuChecks.getBHasFixed() && !userProperties.getIsPASAdmin() && !userProperties.getIsAnySalesUser() && !userProperties.getIsReadOnly()) {
		if (!userProperties.getIsPASAdmin() && !userProperties.getIsAnySalesUser() && !userProperties.getIsReadOnly()) {
			queryString = "SELECT distinct A.statusid From   mfpdbo.RFPENTRYSTATUS A Where (A.SCREENID =8) AND (A.HOTELRFPID =?1) ";
			q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, hotelrfpid);
			String groupStatus = null;
			try {
				groupStatus = (String) q.getSingleResult();
			} catch (NoResultException e) {

			}
			if (groupStatus != null && groupStatus.equals("C"))
				pricingMenuChecks.setBHasGroupMeeting(true);
			else
				pricingMenuChecks.setBHasGroupMeeting(false);
		}

		// check for DOS screen existance and status
		queryString = "SELECT distinct A.statusid From   mfpdbo.RFPENTRYSTATUS A Where (A.SCREENID =20) AND (A.HOTELRFPID =?1) ";
		q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String DOSStatus = null;
		try {
			DOSStatus = (String) q.getSingleResult();
		} catch (NoResultException e) {

		}
		if (DOSStatus != null && DOSStatus.equals("C"))
			pricingMenuChecks.setBHasDOS(true);
		else
			pricingMenuChecks.setBHasNoDOSScreen(true);

		return pricingMenuChecks;
	}

	public String getNextScreen(long hotelrfpid, String currentItem, User user) {
		String queryString = "select mfpproc.fn_getNextScreen2(?1,?2,?3) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, "/" + currentItem + "/view.action");
		q.setParameter(3, user.getShortRole());
		String nextscreen = null;
		try {
			nextscreen = (String) q.getSingleResult();
		} catch (ArgumentException e) {
			// caused by null value returned from the function. null values from
			// function worked in rad 7, but not rad 8

		}
		return nextscreen;
	}

	public String getPreviousScreen(long hotelrfpid, String currentItem, User user) {
		String queryString = "select mfpproc.fn_getPrevScreen2(?1,?2,?3) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, "/" + currentItem + "/view.action");
		q.setParameter(3, user.getShortRole());
		String prevscreen = null;
		try {
			prevscreen = (String) q.getSingleResult();
		} catch (ArgumentException e) {
			// caused by null value returned from the function. null values from
			// function worked in rad 7, but not rad 8

		}
		return (String) prevscreen;
	}

	public String getScreenStatus(long hotelrfpid, String currentItem, long hotel_accountinfoid) {
		String queryString = "SELECT distinct statusid  FROM mfpdbo.rfpentrystatus a, mfpdbo.pricingscreens b " + " WHERE (a.screenid=b.screenid) AND a.hotelrfpid = ?1";
		if (currentItem != null
				&& (currentItem.equals("hotelaccountspecrates") || currentItem.equals("hotelaccountspeccentralrates") || currentItem.equals("hotelaccountspeclocalrates") || currentItem
						.equals("multihotelaccountspecrates"))) {
			queryString += " and b.screenid=15  AND (A.ACCOUNTRECID = (SELECT ACCOUNTRECID FROM MFPDBO.HOTEL_ACCOUNTINFO " + " WHERE (HOTEL_ACCOUNTINFOID = " + hotel_accountinfoid + " )))";
		} else
			queryString += " and b.actionstruts='/" + currentItem + "/view.action' ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelrfpid);
		String screenstatus = null;
		try {
			screenstatus = (String) q.getSingleResult();
		} catch (NoResultException e) {
			// caused by null value returned from the function. null values from
			// function worked in rad 7, but not rad 8

		}
		return (String) screenstatus;

	}

	public void update(long hotelrfpid, long screenid, long accountrecid, String accounttype, String status, User user, String changed, String markComplete) {
		String makeComplete = (markComplete.equals("Y")) ? "Y" : "N";
		String queryString = "begin  mfpproc.sp_updatehotelscreenstatus_mc(?1,?2,?3,?4,?5,?6,?7,?8,?9); end; ";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, screenid);
		if (accountrecid == 0)
			q.setParameter(3, null);
		else
			q.setParameter(3, accountrecid);
		q.setParameter(4, accounttype);
		q.setParameter(5, null);
		q.setParameter(6, status);
		q.setParameter(7, user.getShortRole());
		q.setParameter(8, changed);
		q.setParameter(9, makeComplete);
		q.executeUpdate();
	}

	public void updateRevisitStatus(long accountrecid) {
		String queryString = "begin  mfpproc.SP_UPDATEREVISITSTATUS(?1); end;";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, accountrecid);
		q.executeUpdate();
	}
}
