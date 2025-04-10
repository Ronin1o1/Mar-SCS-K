package com.marriott.rfp.dataacess.pricing.account.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.account.api.HPPRateOfferRpgmLookupManager;
import com.marriott.rfp.object.pricing.account.HPPRateOffer;
import com.marriott.rfp.object.pricing.account.HPPRateProgram;

@Service
public class HPPRateOfferRpgmLookupManagerImpl implements HPPRateOfferRpgmLookupManager {

    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public HPPRateOfferRpgmLookupManagerImpl() {
    }

    public List<HPPRateOffer> getRateOffers(String filterValue, Long start, Long count) {

	// Look for latest offers either in Published(P) OR Ready for Publish(R)
	// state
	// AND Rate Type = Business (B)
	Long endvalue = start + count+1;
	Long startvalue = start;
	String filterString = "%";
	if (filterValue != null && filterValue.length() > 1) {
	    filterString = filterValue.toUpperCase();
	    if (filterString.endsWith("*"))
		filterString = filterString.substring(0, filterValue.length() - 1);
	    filterString +="%";
	}

	String sql = "select rateoffersystemid, name, rateofferid, completionlevel, lastupdatedate "
		+ " from (select rateoffersystemid, name, rateofferid, completionlevel, lastupdatedate, rownum arow "
		+ " from (SELECT mro.masterrateoffersystemid rateoffersystemid, mro.rateoffername name,  mro.rateofferid rateofferid, "
		+ " mro.completionlevel completionlevel, mro.lastupdatedate  FROM hppdbo.masterrateoffer@hpplink.world mro, "
		+ " (SELECT mro.rateofferid, MAX (mro.lastupdatedate) lastupdatedate "
		+ " 	 FROM hppdbo.masterrateoffer@hpplink.world mro,  hppdbo.masterroratetype@hpplink.world mrort, "
		+ " hppdbo.ratetype_lkup@hpplink.world rt   WHERE     mro.masterrateoffersystemid = mrort.masterrateoffersystemid "
		+ " AND mrort.ratetypeid = rt.ratetypeid  AND rt.ratetype = 'B'  AND mro.completionlevel IN ('P', 'R') and upper(rateoffername) like upper(?1)   "
		+ " GROUP BY mro.rateofferid) lmros  WHERE     lmros.rateofferid = mro.rateofferid "
		+ " AND lmros.lastupdatedate = mro.lastupdatedate  AND mro.completionlevel IN ('P', 'R') "
		+ " order by rateoffername))  where (arow>?2 and arow <=?3) ";
	Query q = em.createNativeQuery(sql, HPPRateOffer.class);
	q.setParameter(1, filterString);
	q.setParameter(2, startvalue);
	q.setParameter(3, endvalue);
	@SuppressWarnings("unchecked")
	List<HPPRateOffer> result = q.getResultList();

	return result;
    }

    public List<HPPRateProgram> getRatePrograms(Long rateOfferId) {

	String sql = "SELECT DISTINCT rpgm rateProgramCode          FROM hppdbo.masterrateoffer@hpplink.world mro,"
		+ "                hppdbo.masterrorateentity@hpplink.world mrore,               hppdbo.masterrorerpgm@hpplink.world mrorerpgm"
		+ "          WHERE mro.masterrateoffersystemid = mrore.masterrateoffersystemid"
		+ "            AND mrore.masterrorateentityid = mrorerpgm.masterrorateentityid           AND mrore.markedfordeletion <> 'Y'"
		+ "            AND mro.masterrateoffersystemid = (           SELECT mro.masterrateoffersystemid"
		+ "              FROM hppdbo.masterrateoffer@hpplink.world mro,      			  (SELECT mro.rateofferid,"
		+ "               	          MAX(mro.lastupdatedate) lastupdatedate"
		+ "          		     FROM hppdbo.masterrateoffer@hpplink.world mro,"
		+ "                           hppdbo.masterroratetype@hpplink.world mrort,"
		+ "                           hppdbo.ratetype_lkup@hpplink.world rt"
		+ "                     WHERE mro.masterrateoffersystemid = mrort.masterrateoffersystemid"
		+ "                       AND mrort.ratetypeid = rt.ratetypeid                      AND rt.ratetype = 'B'"
		+ "                       AND mro.completionlevel IN ( 'P', 'R' )                 GROUP BY mro.rateofferid) lmros"
		+ "          WHERE lmros.rateofferid = mro.rateofferid           AND lmros.lastupdatedate = mro.lastupdatedate"
		+ "            AND mro.completionlevel IN ( 'P', 'R' )           AND lmros.rateofferid = ?1)  order by rpgm";

	Query q = em.createNativeQuery(sql, HPPRateProgram.class);
	q.setParameter(1, rateOfferId);
	@SuppressWarnings("unchecked")
	List<HPPRateProgram> result = q.getResultList();

	return result;
    }

}
