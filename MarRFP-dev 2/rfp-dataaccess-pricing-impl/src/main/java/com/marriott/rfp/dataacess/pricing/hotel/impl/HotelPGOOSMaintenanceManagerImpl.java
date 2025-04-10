package com.marriott.rfp.dataacess.pricing.hotel.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPGOOSMaintenanceManager;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSListData;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelPGOOSMaintenanceManagerImpl implements HotelPGOOSMaintenanceManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<HotelPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user) {

	String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid, "
		+ "nvl(g.pgoos,'Y') pgoos, NVL (g.aerpgoos, 'Y') aerpgoos, mfpproc.fn_exclude_aer(a.affiliationid) excludeaer,  nvl(g.willnotprice, 'N') willnotprice "
		+ ", g.removalreasonid, nvl(L.REMOVALREASON, 'No Reason Provided.') removalreason, g.aerremovalreasonid, NVL (m.removalreason, 'No Reason Provided.') aerremovalreason ";

	String fromString = " FROM mfpdbo.hotel a, MFPDBO.PGOOS_REMOVAL_REF L ,  mfpdbo.pgoos_removal_ref m ,( select * from  mfpdbo.hotelrfp where period="
		+ filterValues.getYear() + ") g";
	String whereString = " WHERE   a.partition_idx='M '  and (g.HOTELID (+) = A.HOTELID) AND g.REMOVALREASONID = L.REMOVALREASONID (+) AND g.aerremovalreasonid = m.removalreasonid(+) ";
	String orderString = "order by ";

	/**
	 * Area Filter
	 */
	fromString += getAreaFrom(filterValues);
	whereString += getAreaWhere(filterValues);

	/**
	 * Future Openings Filter
	 */
	if (filterValues.getFutureOpeningFilter() != null
		&& (filterValues.getFutureOpeningFilter().getAllFutureOpenings().equals("Y")
			|| filterValues.getFutureOpeningFilter().getFromDate() != null || filterValues.getFutureOpeningFilter().getToDate() != null)) {
	    fromString += ", MFPDBO.HOTELWEBINFO B ";
	    whereString += " AND (B.HOTELID = A.HOTELID) ";
	    if (filterValues.getFutureOpeningFilter().getAllFutureOpenings().equals("Y"))
		whereString += " and b.estopendate > sysdate ";
	    if (filterValues.getFutureOpeningFilter().getFromDate() != null)
		whereString += " and b.estopendate >= to_date('" + filterValues.getFutureOpeningFilter().getStrFromDate() + "', 'mm/dd/yy') ";
	    if (filterValues.getFutureOpeningFilter().getToDate() != null)
		whereString += " and b.estopendate <= to_date('" + filterValues.getFutureOpeningFilter().getStrToDate() + "', 'mm/dd/yy') ";
	}

	/**
	 * Affiliation Filter
	 */
	whereString += getBrandWhere(filterValues);

	/**
	 * Managed/Franchise Filter
	 */
	whereString += getManagedWhere(filterValues);

	whereString += getFilteredWhere(filterValues);

	orderString += getOrderby(filterValues);

	String queryString = selectString + fromString + whereString + orderString;

	Query q = em.createNativeQuery(queryString, HotelPGOOSListData.class);
	@SuppressWarnings("unchecked")
	List<HotelPGOOSListData> hotelPGOOSListData = q.getResultList();
	return hotelPGOOSListData;
    }

    private String getFilteredWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() > 0 && !filterValues.getFilterString().equals("")) {
	    String filterString = "";
	    switch (filterValues.getFilterMatchField().intValue()) {
	    case 0:
		filterString += " a.marshacode";
		break;
	    case 6:
		filterString += " a.city";
		break;
	    case 7:
		filterString += " nvl(a.state, ' ')";
		break;
	    case 8:
		filterString += " a.country";
		break;
	    default:
		filterString += "";
	    }
	    if (!filterString.equals("")) {
		whereString += " and upper(" + filterString + ") like '";
		if (filterValues.getFilterMatchType() == 1)
		    whereString += "%";
		whereString += filterValues.getFilterString() + "%' ";
	    }
	}
	return whereString;
    }

    private String getManagedWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (!(filterValues.getFranchised().equals("Y") && filterValues.getManaged().equals("Y"))) {
	    if (filterValues.getFranchised().equals("Y"))
		whereString += " and a.franch_flag = 'F' ";
	    if (filterValues.getManaged().equals("Y"))
		whereString += " and a.franch_flag = 'M' ";
	}
	return whereString;
    }

    private String getBrandWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getBrandlist() != null && filterValues.getBrandlist().size() > 0)
	    whereString += " and a.affiliationid in (" + filterValues.getStringBrandList() + ")";
	return whereString;
    }

    private String getAreaWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	RegionFilterValue areaFilter = filterValues.getAreaFilter();
	if (areaFilter.getAreaOrRegion().equals("R")) {
	    whereString += " AND (C.HOTELID = A.HOTELID) ";
	    whereString += " and c.typeid = 74 ";
	    if (areaFilter.getRegionid() > 0)
		whereString += " and c.areaid = " + areaFilter.getRegionid() + " ";
	    else
		whereString += " and c.areaid not in (1,2) ";
	} else {
	    if (areaFilter.getCountry() != null && !areaFilter.getCountry().equals(""))
		whereString += "and a.country = '" + StringUtility.replaceSingleQuotes(areaFilter.getCountry()) + "' ";
	    if (areaFilter.getState() != null && !areaFilter.getState().equals(""))
		whereString += "and a.state = '" + StringUtility.replaceSingleQuotes(areaFilter.getState()) + "' ";
	    if (areaFilter.getCity() != null && !areaFilter.getCity().equals(""))
		whereString += "and a.city = '" + StringUtility.replaceSingleQuotes(areaFilter.getCity()) + "' ";
	}
	return whereString;
    }

    private String getAreaFrom(PricingFilterSelections filterValues) {
	String fromString = "";
	if (filterValues.getAreaFilter().getAreaOrRegion().equals("R"))
	    fromString += ", MFPDBO.HOTELAREAREC C ";
	return fromString;
    }

    private String getOrderby(PricingFilterSelections filterValues) {
	String orderString = "";
	switch (filterValues.getOrderBy()) {
	case 0:
	    orderString += " a.marshacode asc";
	    break;
	case 1:
	    orderString += " nvl(g.pgoos,'Y') asc, NVL (a.country, ' ') ASC ,  nvl(A.STATE, ' ') ASC ,NVL (a.city, ' ') ASC ,  substr(A.NAME,1,36) ASC";
	    break;
	case 2:
	    orderString += " nvl(g.pgoos,'Y') asc, nvl(L.REMOVALREASON, 'No Reason Provided.') ASC,  NVL (a.country, ' ') ASC ,  nvl(A.STATE, ' ') ASC , NVL (a.city, ' ') ASC , substr(A.NAME,1,36) ASC";
	    break;
	case 3:
	    orderString += " nvl(g.aerpgoos,'Y') asc,  NVL (a.country, ' ') ASC ,  nvl(A.STATE, ' ') ASC , NVL (a.city, ' ') ASC , substr(A.NAME,1,36) ASC";
	    break;
	case 4:
	    orderString += " nvl(g.aerpgoos,'Y') asc,  nvl(m.REMOVALREASON, 'No Reason Provided.'),  NVL (a.country, ' ') ASC ,  nvl(A.STATE, ' ') ASC , NVL (a.city, ' ') ASC , substr(A.NAME,1,36) ASC";
	    break;
	case 5:
	    orderString += " nvl(g.willnotprice,'N') desc, NVL (a.country, ' ') ASC ,  nvl(A.STATE, ' ') ASC , NVL (a.city, ' ') ASC , substr(A.NAME,1,36) ASC";
	    break;
	case 6:
	    orderString += " NVL (a.city, ' ') asc , substr(A.NAME,1,36) ASC";
	    break;
	case 7:
	    orderString += "  nvl(A.STATE, ' ') asc, NVL (a.city, ' ') ASC ,  substr(A.NAME,1,36) ASC";
	    break;
	case 8:
	    orderString += "  NVL (a.country, ' ') asc,  nvl(A.STATE, ' ') ASC , NVL (a.city, ' ') ASC ,  substr(A.NAME,1,36) ASC";
	    break;
	default:
	    orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
	    break;
	}
	return orderString;
    }

    public void updateHotelPgoosMaintanence(long period, List<HotelPGOOSListData> hotelpgoosmaint, User user) {
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin  mfpproc.sp_updatehotelpgoosflag_hpp(?, ?, ?, ?, ?, ?, ?); end; ");
		try {
		    for (int i = 0; i < hotelpgoosmaint.size(); i++) {
			HotelPGOOSListData hotelpgoos = hotelpgoosmaint.get(i);
			if (hotelpgoos.getChanged().equals("Y")) {
			    Long removalreason = null;
			    if ((hotelpgoos.getPgoos() != null && hotelpgoos.getPgoos().equals("Y")) || hotelpgoos.getRemovalreasonid() == null
				    || hotelpgoos.getRemovalreasonid() == 0)
				removalreason = null;
			    else
				removalreason = hotelpgoos.getRemovalreasonid();
			    Long aerremovalreason = null;
			    if ((hotelpgoos.getAerpgoos() != null && hotelpgoos.getAerpgoos().equals("Y"))
				    || hotelpgoos.getAerremovalreasonid() == null || hotelpgoos.getAerremovalreasonid() == 0)
				aerremovalreason = null;
			    else
				aerremovalreason = hotelpgoos.getAerremovalreasonid();
			    stmt.setLong(1, hotelpgoos.getHotelid());
			    stmt.setLong(2, period);
			    stmt.setString(3, hotelpgoos.getPgoos());
			    stmt.setString(4, hotelpgoos.getAerpgoos());
			    stmt.setString(5, hotelpgoos.getWillnotprice());
			    if (removalreason == null) {
				stmt.setNull(6, Types.INTEGER);
			    } else {
				stmt.setLong(6, removalreason);
			    }
			    if (aerremovalreason == null) {
				stmt.setNull(7, Types.INTEGER);
			    } else {
				stmt.setLong(7, aerremovalreason);
			    }
			    stmt.addBatch();
			}
		    }
		    stmt.executeBatch();
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

    }

}
