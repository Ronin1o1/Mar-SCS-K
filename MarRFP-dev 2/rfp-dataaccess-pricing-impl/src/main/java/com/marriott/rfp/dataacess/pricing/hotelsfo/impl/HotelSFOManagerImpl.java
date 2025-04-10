package com.marriott.rfp.dataacess.pricing.hotelsfo.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelsfo.api.HotelSFOManager;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFODetails;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOSearch;
import com.marriott.rfp.object.pricing.hotelsfo.MarketArea;
import com.marriott.rfp.object.pricing.hotelsfo.SalesMarket;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class AccountManagerImpl
 */

@Service
public class HotelSFOManagerImpl implements HotelSFOManager {

    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<HotelSFODetails> findHotelSFOList(HotelSFOSearch filter) {

	String queryString = "select hotelid, salesareaid, marketid, "
		+ "  decode(sfo_participate,'Y','Yes','N','No','') sfo_participate, marshacode, name, franch_flag franchflag, franch_by franchby, "
		+ "   salesareaorg, marketarea   from "
		+ "  (select hotelid, salesareaid,marketid, sfo_participate, marshacode, name, franch_flag, franch_by,"
		+ "     salesareaorg, marketarea, rownum num from "
		+ "	 ( select hotelid, salesareaid,marketid, sfo_participate, marshacode, name, franch_flag, franch_by, "
		+ "      mfpproc.fn_get_sfo_salesorg(salesareaid) salesareaorg, mfpproc.fn_get_sfo_marketarea(salesareaid, marketid) marketarea "
		+ "      from mfpdbo.hotel  where partition_idx = 'M' ";

	// filter for Brand/affiliation
	if (filter.getStringBrandList() != null && !filter.getStringBrandList().equals("")) {
	    queryString += "  and affiliationid in (" + filter.getStringBrandList() + ")";
	}

	// filter for region
	if (filter.getRegionfiltervalue().getAreaOrRegion().equals("C")) {
	    if (filter.getRegionfiltervalue().getCountry() != null && !filter.getRegionfiltervalue().getCountry().equals("")) {
		queryString += " and country = '" + filter.getRegionfiltervalue().getCountry() + "' ";
	    }
	    if (filter.getRegionfiltervalue().getState() != null && !filter.getRegionfiltervalue().getState().equals("")) {
		queryString += " and state = '" + filter.getRegionfiltervalue().getState() + "' ";
	    }
	    if (filter.getRegionfiltervalue().getCity() != null && !filter.getRegionfiltervalue().getCity().equals("")
		    && !filter.getRegionfiltervalue().getCity().equals("*")) {
		queryString += " and city = '" + filter.getRegionfiltervalue().getCity() + "' ";
	    }
	} else {
	    queryString += " and hotelid in (SELECT hotelid FROM mfpdbo.hotelarearec WHERE typeid = 74 ";
	    if (filter.getRegionfiltervalue().getRegionid() != 0) {
		queryString += " AND areaid = " + filter.getRegionfiltervalue().getRegionid() + " )";
	    } else {
		queryString += " AND areaid not in (1,2) )";
	    }

	}

	// Franchise by filter
	if (filter.getFranchmange() != null && !filter.getFranchmange().equals("")) {
	    queryString += " AND franch_flag = '" + filter.getFranchmange() + "'";

	}

	// Franchisee
	if (filter.getFranchby() != null && !filter.getFranchby().trim().equals("") && filter.getFranchmange().equals("F")) {
	    queryString += " AND franch_by = '" + filter.getFranchby() + "' ";
	}

	// Participationg List
	if (filter.getParticipate() != null && !filter.getParticipate().equals("") && !filter.getParticipate().equals("A")) {
	    queryString += " AND sfo_participate = '" + filter.getParticipate() + "' ";
	} else if (filter.getParticipate() == null || filter.getParticipate().equals(""))
		queryString += " AND sfo_participate is null ";
	
	// Sales Organization
	if (filter.getSalesorg() != null && !filter.getSalesorg().equals(new Long(0))) {
	    queryString += " AND salesareaid = " + filter.getSalesorg();
	}

	// Market Area
	if (filter.getSalesorg() != null && filter.getMarketarea() != null && !(filter.getSalesorg().equals(new Long(0)))
		&& !filter.getMarketarea().equals(new Long(0))) {
	    queryString += " AND marketid = " + filter.getMarketarea();
	}

	switch (filter.getOrderby()) {
	case 0:
	case 1:
	    queryString += "	   order by marshacode  )) ";
	    break;
	case 2:
	    queryString += "	   order by name  )) ";
	    break;
	case 3:
	    queryString += "	   order by franch_flag  )) ";
	    break;
	case 4:
	    queryString += "	   order by franch_by  )) ";
	    break;
	case 5:
	    queryString += "	   order by salesareaorg, marketarea, marshacode  )) ";
	    break;
	case 6:
	    queryString += "	   order by marketarea  )) ";
	    break;
	default:
	    queryString += "	   order by marshacode  )) ";
	}

	long endaccount = filter.getPage().getPage() * filter.getPage().getMaxpagelen();
	long startaccount = endaccount - filter.getPage().getMaxpagelen() + 1;
	queryString += " where num >= " + startaccount + " and num <=" + endaccount;
	Query q = em.createNativeQuery(queryString, HotelSFODetails.class);

	@SuppressWarnings("unchecked")
	List<HotelSFODetails> hotelList = q.getResultList();

	return hotelList;
    }

    public long findHotelSFOListNum(HotelSFOSearch filter) {

	String queryString = " select count(*) num    from mfpdbo.hotel  where partition_idx = 'M' ";

	// filter for Brand/affiliation
	if (filter.getStringBrandList() != null && !filter.getStringBrandList().equals("")) {
	    queryString += "  and affiliationid in (" + filter.getStringBrandList() + ")";
	}

	// filter for region
	if (filter.getRegionfiltervalue().getAreaOrRegion().equals("C")) {
	    if (filter.getRegionfiltervalue().getCountry() != null && !filter.getRegionfiltervalue().getCountry().equals("")) {
		queryString += " and country = '" + filter.getRegionfiltervalue().getCountry() + "' ";
	    }
	    if (filter.getRegionfiltervalue().getState() != null && !filter.getRegionfiltervalue().getState().equals("")) {
		queryString += " and state = '" + filter.getRegionfiltervalue().getState() + "' ";
	    }
	    if (filter.getRegionfiltervalue().getCity() != null && !filter.getRegionfiltervalue().getCity().equals("")
		    && !filter.getRegionfiltervalue().getCity().equals("*")) {
		queryString += " and city = '" + filter.getRegionfiltervalue().getCity() + "' ";
	    }
	} else {
	    queryString += " and hotelid in (SELECT hotelid FROM mfpdbo.hotelarearec WHERE typeid = 74 ";
	    if (filter.getRegionfiltervalue().getRegionid() != 0) {
		queryString += " AND areaid = " + filter.getRegionfiltervalue().getRegionid() + " )";
	    } else {
		queryString += " AND areaid not in (1,2) )";
	    }

	}

	// Franchise by filter
	if (filter.getFranchmange() != null && !filter.getFranchmange().equals("")) {
	    queryString += " AND franch_flag = '" + filter.getFranchmange() + "'";

	}

	// Franchisee
	if (filter.getFranchby() != null && !filter.getFranchby().trim().equals("") && filter.getFranchmange().equals("F")) {
	    queryString += " AND franch_by = '" + filter.getFranchby() + "' ";
	}

	// Participationg List
	if (filter.getParticipate() != null && !filter.getParticipate().equals("") && !filter.getParticipate().equals("A")) {
	    queryString += " AND sfo_participate = '" + filter.getParticipate() + "' ";
	} else if (filter.getParticipate() == null || filter.getParticipate().equals(""))
		queryString += " AND sfo_participate is null ";

	// Sales Organization
	if (filter.getSalesorg() != null && !filter.getSalesorg().equals(new Long(0))) {
	    queryString += " AND salesareaid = " + filter.getSalesorg();
	}

	// Market Area
	if (filter.getSalesorg() != null && filter.getMarketarea() != null && !(filter.getSalesorg().equals(new Long(0)))
		&& !filter.getMarketarea().equals(new Long(0))) {
	    queryString += " AND marketid = " + filter.getMarketarea();
	}

	Query q = em.createNativeQuery(queryString, Long.class);

	Long num = (Long) q.getSingleResult();
	return num;
    }

    public List<SalesMarket> getSalesAreaList() {
	String queryString = "SELECT SALESAREAID, SALESAREANAME FROM MFPDBO.ACCOUNTINFO_BL_SALESAREA_REF ORDER BY SALESAREANAME";
	Query q = em.createNativeQuery(queryString, SalesMarket.class);

	@SuppressWarnings("unchecked")
	List<SalesMarket> saleslist = q.getResultList();

	return saleslist;

    }

    public List<String> getFranchByList() {

	String queryString = "SELECT DISTINCT FRANCH_BY FROM MFPDBO.HOTEL WHERE PARTITION_IDX = 'M' AND FRANCH_BY IS NOT NULL ORDER BY FRANCH_BY ";
	Query q = em.createNativeQuery(queryString, String.class);

	@SuppressWarnings("unchecked")
	List<String> saleslist = q.getResultList();

	return saleslist;

    }

    public void updateHotelSFO(HotelSFODetails model, User user) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin  mfpproc.sp_update_hotel_sfo(?,?,?,?); end;");
		try {
		    stmt.setLong(1, model.getHotelid());
		    stmt.setString(2, model.getSfo_participate());
		    stmt.setLong(3, model.getSalesareaid());
		    if (model.getMarketid() == null)
			stmt.setNull(4, Types.NUMERIC);
		    else
			stmt.setLong(4, model.getMarketid());

		    stmt.execute();
		} finally {
		    stmt.close();
		}
		audit.deleteAuditUser(con);
	    } finally {
		con.close();

	    }
	} catch (SQLException ex) {
	    ex.printStackTrace();
	}
	String queryString = "begin  mfpproc.sp_update_hotel_sfo(?,?,?,?); end; ";
	Query q = em.createNativeQuery(queryString);
	q.setParameter(1, model.getHotelid());
	q.setParameter(2, model.getSfo_participate());
	q.setParameter(3, model.getSalesareaid());
	q.setParameter(4, model.getMarketid());
	q.executeUpdate();
    }

    public List<MarketArea> findMarketArea(long salesareaid) {

	String queryString = "select  marketid, marketname from mfpdbo.accountinfo_market_ref " + " where salesareaid =?1 order by marketname ";

	Query q = em.createNativeQuery(queryString, MarketArea.class);
	q.setParameter(1, salesareaid);
	@SuppressWarnings("unchecked")
	List<MarketArea> saleslist = q.getResultList();

	return saleslist;
    }

    public HotelSFODetails getHotelSFODetails(long hotelid) {
	String queryString = "SELECT hotelid, sfo_participate, salesareaid, marketid, marshacode, name, franch_by franchby FROM mfpdbo.hotel WHERE hotelid =?1 ";
	Query q = em.createNativeQuery(queryString, HotelSFODetails.class);
	q.setParameter(1, hotelid);
	HotelSFODetails details;
	try {
	    details = (HotelSFODetails) q.getSingleResult();
	} catch (NoResultException e) {
	    details = new HotelSFODetails();
	}
	return details;

    }
}
