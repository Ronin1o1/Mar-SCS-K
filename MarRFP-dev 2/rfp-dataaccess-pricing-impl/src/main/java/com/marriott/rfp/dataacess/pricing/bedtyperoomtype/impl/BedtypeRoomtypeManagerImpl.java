package com.marriott.rfp.dataacess.pricing.bedtyperoomtype.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.bedtyperoomtype.api.BedtypeRoomtypeManager;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;

/**
 * Session Bean implementation class BedtypeRoomtypeManagerImpl
 */
@Service
public class BedtypeRoomtypeManagerImpl implements BedtypeRoomtypeManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Bedtype> getBedtypesForMaintenance(String orderBy) {

		String queryString = "SELECT   bedtypeid, bedtype, bedtype_view, used "
				+ " FROM (SELECT a.bedtypeid, a.bedtype, a.bedtype_view, 'Y' used  FROM mfpdbo.promo_bedtype a "
				+ "        WHERE ( EXISTS (SELECT * FROM mfpdbo.hotelrfp_roomtypes c WHERE a.bedtypeid = c.bedtypeid)) "
				+ "      UNION SELECT a.bedtypeid, a.bedtype, a.bedtype_view, 'N' used   FROM mfpdbo.promo_bedtype a "
				+ "        WHERE (  NOT EXISTS (SELECT * FROM mfpdbo.hotelrfp_roomtypes c WHERE a.bedtypeid = c.bedtypeid))) f " + " ORDER BY  ";
		if (orderBy == null)
			queryString += "bedtype ";
		else if (orderBy.equals("1"))
			queryString += "bedtype";
		else if (orderBy.equals("2"))
			queryString += "bedtype_view desc";
		else
			queryString += "bedtype ";

		Query q = em.createNativeQuery(queryString, Bedtype.class);
		List<Bedtype> bedtypeList = q.getResultList();
		return bedtypeList;
	}

	public Bedtype getBedtypeForMaintenance(long bedtypeid) {

		String queryString = "SELECT   bedtypeid, bedtype, bedtype_view  FROM mfpdbo.promo_bedtype where bedtypeid= ?1 ";

		Query q = em.createNativeQuery(queryString, Bedtype.class);
		q.setParameter(1, bedtypeid);
		Bedtype bedtype = (Bedtype) q.getSingleResult();
		return bedtype;
	}

	public void updateBedtype(Bedtype bedtype) {
		Query q = em.createNativeQuery("begin mfpproc.sp_insertupdate_promo_bedtype(?1,?2,?3); end; ");
		q.setParameter(1, bedtype.getBedtypeid());
		q.setParameter(2, bedtype.getBedtype());
		q.setParameter(3, bedtype.getBedtype_view());
		q.executeUpdate();
	}

	public void deleteBedtype(long bedtypeid) {
		Query q = em.createNativeQuery("delete from mfpdbo.promo_bedtype where bedtypeid=?1");
		q.setParameter(1, bedtypeid);
		q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<Roomtype> getRoomtypesForMaintenance(String orderBy) {

		String queryString = " SELECT   promo_roomtypeid, roomtype, roomtype_view, used "
				+ " FROM (SELECT a.promo_roomtypeid, a.roomtype, a.roomtype_view, 'Y' used " + "        FROM mfpdbo.promo_roomtype a "
				+ "       WHERE ( EXISTS (SELECT * FROM mfpdbo.hotelrfp_roompools c WHERE a.promo_roomtypeid = c.roomtypeid)) "
				+ "      UNION SELECT a.promo_roomtypeid, a.roomtype, a.roomtype_view, 'N' used " + "          FROM mfpdbo.promo_roomtype a "
				+ "        WHERE ( NOT EXISTS (SELECT * FROM mfpdbo.hotelrfp_roompools c WHERE a.promo_roomtypeid = c.roomtypeid))) f "
				+ " ORDER BY  ";
		if (orderBy == null)
			queryString += " ROOMTYPE";
		else if (orderBy.equals("1"))
			queryString += " ROOMTYPE";
		else if (orderBy.equals("2"))
			queryString += " roomtype_view desc";
		else
			queryString += " ROOMTYPE";
		Query q = em.createNativeQuery(queryString, Roomtype.class);
		List<Roomtype> roomtypeList = q.getResultList();
		return roomtypeList;
	}

	public Roomtype getRoomtypeForMaintenance(long promo_roomtypeid) {

		String queryString = "SELECT   promo_roomtypeid, roomtype, roomtype_view  FROM mfpdbo.promo_roomtype where promo_roomtypeid= ?1 ";

		Query q = em.createNativeQuery(queryString, Roomtype.class);
		q.setParameter(1, promo_roomtypeid);
		Roomtype roomtype = (Roomtype) q.getSingleResult();
		return roomtype;
	}

	public void updateRoomtype(Roomtype roomtype) {
		Query q = em.createNativeQuery("begin mfpproc.sp_insertupdate_promo_roomtype(?1,?2,?3); end;");
		q.setParameter(1, roomtype.getPromo_roomtypeid());
		q.setParameter(2, roomtype.getRoomtype());
		q.setParameter(3, roomtype.getRoomtype_view());
		q.executeUpdate();
	}

	public void deleteRoomtype(long promo_roomtypeid) {
		Query q = em.createNativeQuery("delete from mfpdbo.promo_roomtype where promo_roomtypeid=?1");
		q.setParameter(1, promo_roomtypeid);
		q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<Bedtype> getBedtypeList() {
		String queryString = "select bedtypeid, bedtype from mfpdbo.promo_bedtype where bedtype_view='Y' order by bedtype";

		Query q = em.createNativeQuery(queryString, Bedtype.class);
		List<Bedtype> bedtypeList = q.getResultList();
		return bedtypeList;

	}
	
	@SuppressWarnings("unchecked")
	public List<Roomtype> getRoomtypeList() {
		String queryString = "select promo_roomtypeid, roomtype from mfpdbo.promo_roomtype where roomtype_view='Y' order by roomtype";

		Query q = em.createNativeQuery(queryString, Roomtype.class);
		List<Roomtype> roomtypeList = q.getResultList();
		return roomtypeList;
		
	}
}
