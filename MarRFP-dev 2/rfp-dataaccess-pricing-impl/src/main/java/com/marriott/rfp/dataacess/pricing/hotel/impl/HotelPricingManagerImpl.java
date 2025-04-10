package com.marriott.rfp.dataacess.pricing.hotel.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.hotel.Ignore2ndRoomPool;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetailDO;
import com.marriott.rfp.object.pricing.pgoos.MirrorInfo;
import com.marriott.rfp.object.pricing.pgoos.MirrorSearchCriteria;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class HotelPricingManagerImpl implements HotelPricingManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private static final CacheManager cacheManager = CacheManager.create(HotelPricingManagerImpl.class.getResource("/ehcache_da_pricing.xml"));

	@SuppressWarnings("unchecked")
	public List<HotelListData> findAccountTrackingHotels() {
		String queryString = "select a.hotelid, a.marshacode,a.name hotelname, nvl(a.acct_tracking,'N') acct_tracking from mfpdbo.hotel a where partition_idx='M' order by marshacode ";
		Query q = em.createNativeQuery(queryString, HotelListData.class);
		List<HotelListData> hotelList = q.getResultList();

		return hotelList;
	}

	public void updateAccountTrackingHotels(HotelListData hotelList) {
		Query q = em.createNativeQuery("begin mfpproc.sp_updateaccttrackinghotels(?1, ?2); end;");
		q.setParameter(1, hotelList.getHotelid());
		q.setParameter(2, hotelList.getAcct_tracking());
		q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<HotelListData> getRoomPoolExemptList(long affiliationid, String pgoosable, int orderHotelBy) {

//		String queryString = "  SELECT a.marshacode, hotelname hotelname, rf.description, a.hotelid, hn.ignore_2ndrmpl_notes "
//				+ " FROM  (select marshacode, name hotelname, hotelid from "
//				+ " mfpdbo.hotel where partition_idx='M'";
//		if (affiliationid > 0)
//			queryString += " and affiliationid=?1";
//		queryString += ") a, mfpdbo.hotel_notes hn, mfpdbo.rm_pool_exempt_ref rf " + " WHERE  a.hotelid = hn.hotelid(+) and a.rm_pool_exempt=rf.rm_pool_exempt_id";
//		if (pgoosable.equals("Y"))
//			queryString += "AND a.hotelid IN (SELECT hotelid    FROM mfpdbo.accountdirectory WHERE pgoos = 'Y')";
//		queryString += " order by ";
//
//		if (orderHotelBy == 1)
//			queryString += " rf.sequence DESC, marshacode, hotelname ASC ";
//		else
//			queryString += "marshacode, hotelname ASC ";
//
//		Query q = em.createNativeQuery(queryString, HotelListData.class);
//		if (affiliationid > 0)
//			q.setParameter(1, affiliationid);
//		List<HotelListData> hotelList = q.getResultList();

		return new ArrayList<HotelListData>();

	}

	public void updateRoomPoolExemptList(HotelListData hotelList) {
//		Query q = em.createNativeQuery("begin mfpproc.sp_updateroompoolexempt_hpp(?, ?, ?); end;");
//		q.setParameter(1, hotelList.getHotelid());
//		q.setParameter(2, hotelList.getRm_pool_exempt());
//		q.setParameter(3, hotelList.getIgnore_2ndrmpl_notes());
//		q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<HotelAffiliation> getAffiliations() {
		List<HotelAffiliation> affiliationList;
		String cacheKey = "affiliationList";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT a.affiliationid, a.affiliationname FROM mfpdbo.hotelaffiliation a WHERE (a.parentid = 990) ORDER BY a.affiliationname ASC ";

			Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
			affiliationList = q.getResultList();
			if (affiliationList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, affiliationList));
			}
		} else
			affiliationList = (List<HotelAffiliation>) elem.getValue();
		return affiliationList;

	}

	public HotelAffiliation getAffiliation(Long affiliationid) {
		String queryString = "SELECT  a.affiliationid, a.affiliationname FROM mfpdbo.hotelaffiliation a WHERE (a.parentid = 990) and a.affiliationid =?1";

		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);

		q.setParameter(1, affiliationid);
		HotelAffiliation brand = (HotelAffiliation) q.getSingleResult();
		return brand;
	}

	@SuppressWarnings("unchecked")
	public List<Ignore2ndRoomPool> getIgnore2ndRoomPoolOptions() {
		List<Ignore2ndRoomPool> ignoreOptionsList;
		String cacheKey = "ignoreOptionsList";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT a.rm_pool_exempt_id, a.description, a.sequence  FROM mfpdbo.rm_pool_exempt_ref a order by a.sequence";

			Query q = em.createNativeQuery(queryString, Ignore2ndRoomPool.class);

			ignoreOptionsList = q.getResultList();
			if (ignoreOptionsList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, ignoreOptionsList));
			}
		} else
			ignoreOptionsList = (List<Ignore2ndRoomPool>) elem.getValue();
		return ignoreOptionsList;

	}

	@SuppressWarnings("unchecked")
	public List<MirrorDetailDO> findMirrorsForHotels(MirrorSearchCriteria mirrorSearchCriteria) {
		
		String sql = "SELECT hotelid, marshacode, hotelname, roomclassseq, roompoolseq, roompool, "
				+ " CASE WHEN price_rateofferid IS NULL THEN price_default ELSE price_exception END pricerateprogramcode, "
				+ " CASE WHEN price_rateofferid IS NULL THEN price_masterrateoffername ELSE price_rateoffername END pricerateoffername, "
				+ " CASE WHEN price_rateofferid IS NULL THEN price_masterrateofferid ELSE price_rateofferid END pricerateofferid, "
				+ " price_rateentityid pricerateentityid, CASE WHEN avail_rateofferid IS NULL THEN avail_default ELSE avail_exception END restrictionrateprogramcode, "
				+ " CASE WHEN avail_rateofferid IS NULL THEN avail_masterrateoffername ELSE avail_rateoffername END restrictionrateoffername, "
				+ " CASE WHEN avail_rateofferid IS NULL THEN avail_masterrateofferid ELSE avail_rateofferid END restrictionrateofferid, "
				+ " avail_rateentityid restrictionrateentityid, mirror_exception_notes "
				+ " FROM (SELECT h.hotelid, h.marshacode, h.name hotelname, rme.avail_exception, rme.avail_rateoffername, rme.avail_rateofferid, "
				+ " rme.avail_rateentityid, rme.price_exception, rme.price_rateoffername, rme.price_rateofferid, rme.price_rateentityid, rcseq.roomclassseq, "
				+ " rpseq.roompoolseq, hrp.roompool, rmd.avail_default, rmd.avail_masterrateoffername, rmd.avail_masterrateofferid, rmd.price_default, "
				+ " rmd.price_masterrateoffername, rmd.price_masterrateofferid, hn.mirror_exception_notes, ROW_NUMBER() OVER ( ORDER BY ";
		
		switch (mirrorSearchCriteria.getOrderby()) {
		case 0:
			sql += " h.marshacode ";
			break;
		case 1:
			sql += " h.name ";
			break;
		default:
			sql += " h.marshacode ";
		}
		
		sql += " ASC ) arow "
				+ " FROM mfpdbo.hotel  h JOIN ( SELECT level roomclassseq "
				+ " FROM dual CONNECT BY level <= (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_ROOMPOOLS' )) rcseq ON 1 = 1 "
				+ " JOIN ( SELECT level roompoolseq FROM dual CONNECT BY level <= (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'NUM_RMPOOLS' )) rpseq "
				+ " ON 1 = 1 LEFT JOIN mfpdbo.hotelrfp hr ON h.hotelid = hr.hotelid LEFT JOIN mfpdbo.rfp_mirrordefaults rmd ON h.affiliationid = rmd.affiliationid  "
				+ " AND rmd.room_pool_seq = rcseq.roomclassseq LEFT JOIN mfpdbo.hotelrfp_roompools hrp ON hr.hotelrfpid = hrp.hotelrfpid  AND rcseq.roomclassseq = hrp.roomclassseq  "
				+ " AND rpseq.roompoolseq = hrp.roompoolseq LEFT JOIN mfpdbo.rfp_mirrorexceptions rme ON h.hotelid = rme.hotelid  AND rcseq.roomclassseq = rme.roompoolseq  "
				+ " AND rpseq.roompoolseq = rme.roompoolsubseq LEFT JOIN mfpdbo.hotel_notes  hn ON h.hotelid = hn.hotelid WHERE ( hr.hotelid, hr.period ) "
				+ " IN ( SELECT hotelid, MAX(period) period FROM mfpdbo.hotelrfp GROUP BY hotelid ) AND h.partition_idx = 'M'";
		
		if (mirrorSearchCriteria.getFilterString() != null && !mirrorSearchCriteria.getFilterString().trim().equals("")) {
			sql += " AND UPPER(marshacode) LIKE ?3 ";
		}

		switch (mirrorSearchCriteria.getOrderby()) {
		case 0:
			sql += " ORDER BY marshacode";
			break;
		case 1:
			sql += " ORDER BY hotelname";
			break;
		default:
			sql += " ORDER BY marshacode";
		}
		sql += ", rcseq.roomclassseq, rpseq.roompoolseq) WHERE arow >=?1 AND arow <= ?2";
						

		long endaccount = mirrorSearchCriteria.getPage().getPage() * mirrorSearchCriteria.getPage().getMaxpagelen();
		long startaccount = endaccount - mirrorSearchCriteria.getPage().getMaxpagelen() + 1;

		Query q = em.createNativeQuery(sql, MirrorDetailDO.class);
		q.setParameter(1, startaccount);
		q.setParameter(2, endaccount);
		if (mirrorSearchCriteria.getFilterString() != null) {
			q.setParameter(3, mirrorSearchCriteria.getFilterString().trim().toUpperCase() + "%");
		}

		List<MirrorDetailDO> hotelList = q.getResultList();
		return hotelList;
	}
	

	public MirrorDetailDO findMirrorsForHotel(Long hotelid, Long roomClassSequence, Long roomPoolSequence) {

		String sql = " SELECT " + 
				"    DISTINCT(h.hotelid), " + 
				"    h.marshacode, " + 
				"    h.name                hotelname, " + 
				"    roompoolseq           roomclassseq, " + 
				"    roompoolsubseq        roompoolseq, " + 
				"    price_exception       pricerateprogramcode, " + 
				"    price_rateoffername   pricerateoffername, " + 
				"    price_rateofferid     pricerateofferid, " + 
				"    mroprice.ratetypeid   priceratetypeid, " + 
				"    avail_exception       restrictionrateprogramcode, " + 
				"    avail_rateoffername   restrictionrateoffername, " + 
				"    avail_rateofferid     restrictionrateofferid, " + 
				"    mroavail.ratetypeid   restrictionratetypeid, " + 
				"    hn.mirror_exception_notes " + 
				"FROM " + 
				"    mfpdbo.hotel h " + 
				"    LEFT JOIN mfpdbo.rfp_mirrorexceptions m  " + 
				"           ON m.hotelid = h.hotelid " + 
				"          AND m.roompoolseq = ?2 " + 
				"          AND m.roompoolsubseq = ?3 " + 
				"    LEFT JOIN mfpdbo.hotel_notes hn  " + 
				"           ON hn.hotelid = h.hotelid " + 
				"    LEFT JOIN hppdbo.hotelrateoffer@hpplink.world mroavail  " + 
				"           ON mroavail.hotelid = h.hotelid " + 
				"          AND mroavail.rateofferid = m.avail_rateofferid " + 
				"    LEFT JOIN hppdbo.hotelrateoffer@hpplink.world   mroprice ON mroprice.hotelid = h.hotelid " + 
				"          AND mroprice.rateofferid = m.price_rateofferid " + 
				"WHERE h.hotelid = ?1";

		Query q = em.createNativeQuery(sql, MirrorDetailDO.class);

		q.setParameter(1, hotelid);
		q.setParameter(2, roomClassSequence);
		q.setParameter(3, roomPoolSequence);
		MirrorDetailDO hotelmirrorexcept;
		try {
			hotelmirrorexcept = (MirrorDetailDO) q.getSingleResult();
		} catch (NoResultException ex) {
			hotelmirrorexcept = new MirrorDetailDO();
		}
		return hotelmirrorexcept;
	}

	public long getMirrorHotelsNum(MirrorSearchCriteria mirrorSearchCriteria) {
		String queryString = " select count(*) * 6 from mfpdbo.hotel where partition_idx = 'M'";
		if (mirrorSearchCriteria.getFilterString() != null && !mirrorSearchCriteria.getFilterString().trim().equals("")) {
			queryString += " AND (UPPER(marshacode) LIKE ?1) ";
		}
		Query q = em.createNativeQuery(queryString, Long.class);
		if (mirrorSearchCriteria.getFilterString() != null) {
			q.setParameter(1, mirrorSearchCriteria.getFilterString().trim().toUpperCase() + "%");
		}
		Long num_exceptions;
		try {
			num_exceptions = (Long) q.getSingleResult();
		} catch (NoResultException ex) {
			num_exceptions = 0L;
		}
		return num_exceptions;
	}

	public void updateMirror(MirrorInfo model) {

		Query q = em.createNativeQuery("begin MFPPROC.SP_UPDATE_MIRROR_RPE(?, ?, ?, ?, ?, ?, ?, ?, ?); end;");
		q.setParameter(1, model.getHotelid());

		q.setParameter(2, model.getRoomClassSeq());
		q.setParameter(3, model.getRateOfferId());
		q.setParameter(4, model.getRateOfferName());
		q.setParameter(5, model.getRateEntityId());
		q.setParameter(6, model.getRateProgramCode());
		q.setParameter(7, model.getMirrorType());
		q.setParameter(8, model.getMirror_exception_notes());
		q.setParameter(9, model.getRoomPoolSeq());

		q.executeUpdate();
	}

	public List<String> getFranchByList() {
		String queryString = "SELECT DISTINCT FRANCH_BY FROM MFPDBO.HOTEL WHERE PARTITION_IDX = 'M' AND FRANCH_BY IS NOT NULL ORDER BY FRANCH_BY ";

		Query q = em.createNativeQuery(queryString, String.class);
		@SuppressWarnings("unchecked")
		List<String> franchbyList = q.getResultList();
		return franchbyList;

	}

	private Ehcache getCache() {
		return cacheManager.getCache("rfp_da_pricing");
	}
	

}
