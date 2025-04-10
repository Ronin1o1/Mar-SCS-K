package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRateTypeManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelLRA_NLRA;
import com.marriott.rfp.object.pricing.hotelrfp.RateTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.RoomTypeRef;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class HotelRateTypeManagerImpl implements HotelRateTypeManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelLRA_NLRA> findLRAProductsDetail(long ratetypeid) {

		String queryString = "select productdescription, required, ratetype_products_ref.productid "
				+ "from mfpdbo.producttype_ref, mfpdbo.ratetype_products_ref "
				+ "where producttype_ref.productid = ratetype_products_ref.productid and ratetypeid =?1 order by sequence";
		Query q = em.createNativeQuery(queryString, HotelLRA_NLRA.class);
		q.setParameter(1, ratetypeid);
		List<HotelLRA_NLRA> lranlralist = q.getResultList();
		return lranlralist;
	}

	@SuppressWarnings("unchecked")
	public List<HotelLRA_NLRA> findAllLRAProductsDetail() {

		String queryString = "select productdescription, productid from mfpdbo.producttype_ref where productid <> 3 order by sequence";
		Query q = em.createNativeQuery(queryString, HotelLRA_NLRA.class);
		List<HotelLRA_NLRA> lranlralist = q.getResultList();
		return lranlralist;
	}

	public RateTypeRef findRateDefDetail(long ratetypeid) {

		String queryString = "select ratetypeid, ratetype,  ratedefinition, minpercent,  hardcoded, accounttype "
				+ " ,ALLOWELIGIBILITYANDAMENITIES , ALLOWWAIVEBLACKOUTS, ALLOWFACILITYANDRATENOTES from mfpdbo.ratetype_ref "
				+ "where ratetypeid =?1";
		Query q = em.createNativeQuery(queryString, RateTypeRef.class);
		q.setParameter(1, ratetypeid);
		RateTypeRef ratetypedef = (RateTypeRef) q.getSingleResult();
		return ratetypedef;
	}

	public RateTypeRef findRateDefDetail(String accounttype, long accountrecid, long affiliationid) {

		String queryString = "select a.ratetypeid, a.ratetype, a.ratedefinition, "
				+ " mfpproc.FN_GET_AERMINPERCENT_BT(a.ratetypeid, ?1,?2) minpercent ,   a.hardcoded, a.accounttype "
				+ " ,a.ALLOWELIGIBILITYANDAMENITIES , a.ALLOWWAIVEBLACKOUTS, a.ALLOWFACILITYANDRATENOTES from mfpdbo.ratetype_ref  a "
				+ "where  a.accounttype =?3";
		Query q = em.createNativeQuery(queryString, RateTypeRef.class);
		q.setParameter(1, affiliationid);
		q.setParameter(2, accountrecid);
		q.setParameter(3, accounttype);
		RateTypeRef ratetypedef = (RateTypeRef) q.getSingleResult();
		return ratetypedef;
	}

	@SuppressWarnings("unchecked")
	public List<RoomTypeRef> findRoomTypesDetail(long affiliationid) {

		String queryString = "select roomtypedescription, required, brand_roomtypes_ref.roomtypeid "
				+ "from mfpdbo.roomtypes_ref, mfpdbo.brand_roomtypes_ref where roomtypes_ref.roomtypeid = brand_roomtypes_ref.roomtypeid and "
				+ "affiliationid =?1 and roomtypes_ref.roomtypeid not in (4) order by sequence";
		Query q = em.createNativeQuery(queryString, RoomTypeRef.class);
		q.setParameter(1, affiliationid);
		List<RoomTypeRef> roomTypelist = q.getResultList();
		return roomTypelist;
	}

	@SuppressWarnings("unchecked")
	public List<RoomTypeRef> findAllRoomTypesDetail() {

		String queryString = "select roomtypedescription,  roomtypeid from mfpdbo.roomtypes_ref and roomtypes_ref.roomtypeid not in (4) order by roomtypeid";
		Query q = em.createNativeQuery(queryString, RoomTypeRef.class);
		List<RoomTypeRef> roomTypelist = q.getResultList();
		return roomTypelist;
	}

}
