package com.marriott.rfp.dataacess.pricing.mirrorlookup.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.mirrorlookup.api.MirrorLookupManager;
import com.marriott.rfp.object.mirror.PropertyMirrorRateEntity;
import com.marriott.rfp.object.mirror.PropertyMirrorRateOffer;
import com.marriott.rfp.object.mirror.RateType;

@Service
public class MirrorLookupManagerImpl implements MirrorLookupManager{

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	private EntityManager em;

	@Override
	public List<RateType> getRateTypes() {

		String sql =  "SELECT DISTINCT ratetypeid id, ratetype type, ratetypename name, displayseq"
                      +" FROM hppdbo.RATETYPE_LKUP@hpplink.world rt";

		Query q = em.createNativeQuery(sql, RateType.class);
		@SuppressWarnings("unchecked")
		List<RateType> result = q.getResultList();

		return result;
	}

	@Override
	public List<PropertyMirrorRateOffer> findEligibleParentPropertyROs(Long hotelId, Long rateOfferId, Long rateTypeId) {
		
		String sql = " SELECT t0.rateofferid,"
					 +"       t0.rateoffersystemid,"
					 +"       t3.rateoffername,"
					 +"       t2.ratetypename"
					 +"  FROM (SELECT DISTINCT childofferid rateofferid,"
					 +"                        childoffersystemid rateoffersystemid"
					 +"          FROM hppdbo.mirrorrelation@hpplink.world"
					 +"         WHERE hotelid = ?1"
					 +"           AND childofferid NOT IN (SELECT DISTINCT childofferid"
					 +"          							 FROM hppdbo.mirrorrelation@hpplink.world"
					 +"                                     WHERE hotelid = ?2"
					 +"                                START WITH hotelid=?3 and parentofferid = ?4"
					 +"                                CONNECT BY nocycle hotelid=?5 and PRIOR childofferid = parentofferid)"
					 +"     AND LEVEL <= 3"
					 +"    START WITH hotelid=?6 and parentofferid IS NULL"
					 +"    CONNECT BY NOCYCLE hotelid=?7 and PRIOR childofferid = parentofferid) t0,"
					 +"       hppdbo.hotelrateoffer@hpplink.world t1,"
					 +"       hppdbo.ratetype_lkup@hpplink.world t2,"
					 +"       hppdbo.masterrateoffer@hpplink.world t3"
					 +" WHERE t0.rateoffersystemid = t1.hotelrateoffersystemid"
					 +"   AND t1.ratetypeid = t2.ratetypeid"
					 +"   AND t1.masterrateoffersystemid = t3.masterrateoffersystemid"
					 +"   AND t1.ratetypeid = ?8 ORDER BY t3.rateoffername";

		Query q = em.createNativeQuery(sql, PropertyMirrorRateOffer.class);
		q.setParameter(1, hotelId); 
		q.setParameter(2, hotelId); 
		q.setParameter(3, hotelId);
		q.setParameter(4, rateOfferId); 
		q.setParameter(5, hotelId);
		q.setParameter(6, hotelId);
		q.setParameter(7, hotelId);
		q.setParameter(8, rateTypeId);
		@SuppressWarnings("unchecked")
		List<PropertyMirrorRateOffer> result = q.getResultList();
		
		return result;
	}
	

	public List<PropertyMirrorRateEntity> findAllPropertyREs(Long hotelid,Long propertyRateOfferId) {
		
		String sql =  " SELECT t0.hotelrorateentitysystemid rateentitysystemid,"
				      +"       t0.hotelrorateentityid propertyrateentityid,"
                      +"       t0.prioritytag prioritytag,"
                      +"       t1.roompool roompoolcode,"
                      +"       t3.roompoolclassname roompoolclassification,"
                      +"       t0.rpgm rateprogram,"
                      +"       t4.pricingtypename pricingtype"
                      +"  FROM hppdbo.hotelrorateentity@hpplink.world t0,"
                      +"       hppdbo.roompools@hpplink.world t1,"
                      +"       hppdbo.propertypreferencermplclass@hpplink.world t2,"
                      +"       hppdbo.roompoolclass_lkup@hpplink.world t3,"
                      +"       hppdbo.pricingtype_lkup@hpplink.world t4"
                      +" WHERE t0.hotelrateoffersystemid =  (select max(hotelrateoffersystemid) "
                      + " from hppdbo.hotelrateoffer@hpplink.world where hotelid=?1 and completionlevel in ('R','P') and rateofferid=?2) "
                      +"   AND t0.roompoolid = t1.roompoolid"
                      +"   AND t1.roompoolid = t2.roompoolid"
                      +"   AND t2.roompoolclassid = t3.roompoolclassid"
                      +"   AND t0.pricingtypeid = t4.pricingtypeid ORDER BY t0.hotelrorateentityid";

		Query q = em.createNativeQuery(sql, PropertyMirrorRateEntity.class);
		q.setParameter(1, hotelid); 
		q.setParameter(2, propertyRateOfferId); 
		@SuppressWarnings("unchecked")
		List<PropertyMirrorRateEntity> result = q.getResultList();
		
		return result;
	}
}