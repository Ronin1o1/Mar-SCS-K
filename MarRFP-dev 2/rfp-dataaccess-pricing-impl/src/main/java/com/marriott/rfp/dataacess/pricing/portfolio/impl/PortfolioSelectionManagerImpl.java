package com.marriott.rfp.dataacess.pricing.portfolio.impl;

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
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioSelectionManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class PortfolioSelectionManagerImpl implements PortfolioSelectionManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<Portfolio> findPortfolioAvail(PricingFilterSelections filterValues, User user) {

	String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid "
		+ ", mfpproc.fn_getratetypeselected_aer(a.hotelid, "
		+ filterValues.getAccountFilter().getAccountrecid()
		+ ", "
		+ filterValues.getYear()
		+ ") ratetype_selected "
		+ ", nvl(z.nopricing,decode(y.nopricing,'','Y',y.nopricing)) hasgenpricing, nvl(y.selected, 'N') selected, nvl(y.volunteered,'N') volunteered ";

	String fromString = " FROM mfpdbo.hotel a ";
	String whereString = " WHERE   a.partition_idx='M' ";
	String orderString = "order by ";

	if (user.getIsLimitedSalesUser()) {
	    fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
		    + " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) "
		    + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '" + StringUtility.replaceSingleQuotes(user.getEid()) + "') "
		    + "   AND (d.partition_idx = 'M')) k ";
	    whereString += " and a.hotelid=k.hotelid  ";
	}
	/**
	 * Area Filter
	 */
	fromString += getAreaFrom(filterValues);
	whereString += getAreaWhere(filterValues);

	/**
	 * Account Filter
	 */
	PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
	if (accountFilter.getAccountrecid() > 0) {
	    fromString += ", (SELECT HOTELID, selected, nopricing, volunteered FROM  MFPDBO.ACCOUNTDIRECTORY  WHERE (ACCOUNTRECID ="
		    + accountFilter.getAccountrecid() + ") ) Y  ,(select hotelrfpid,hotelid, nopricing from mfpdbo.hotelrfp where period="
		    + filterValues.getYear() + ")  Z ";

	    whereString += " and a.hotelid=y.hotelid(+)  and (a.hotelid=z.hotelid(+)) and (  exists(select * "
		    + " from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + accountFilter.getAccountrecid()
		    + " and x.hotelid=a.hotelid";
	    if (accountFilter.getAccountPricing().endsWith("L")) {
		whereString += " and x.hotelid in (select b.hotelid from mfpdbo.hotel_accountinfo a, mfpdbo.hotelrfp b"
			+ " where  a.hotelrfpid = b.hotelrfpid " + " and a.accountrecid =" + accountFilter.getAccountrecid() + " )";
	    }
	    whereString += " )) AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = "
		    + accountFilter.getAccountrecid() + ") and (y.selected  is null or y.selected='N') ";

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

	Query q = em.createNativeQuery(queryString, Portfolio.class);
	@SuppressWarnings("unchecked")
	List<Portfolio> portfolioAvailList = q.getResultList();
	return portfolioAvailList;
    }

    public List<Portfolio> findPortfolioSelected(PricingFilterSelections filterValues, User user) {

	String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid, e.regionid subset   "
		+ ", mfpproc.fn_getratetypeselected_aer(a.hotelid, "
		+ filterValues.getAccountFilter().getAccountrecid()
		+ ", "
		+ filterValues.getYear()
		+ ") ratetype_selected "
		+ ",  nvl(g.nopricing,decode(e.nopricing,'','Y',e.nopricing))  hasgenpricing, nvl(e.selected, 'N') selected, nvl(e.volunteered,'N') volunteered, l.regionname subsetname ";

	String fromString = " FROM mfpdbo.hotel a ,  MFPDBO.ACCOUNTDIRECTORY E, MFPDBO.ACCOUNT F,  mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h, mfpdbo.region_lookup l ";
	String whereString = " WHERE  (E.HOTELID = A.HOTELID) AND (g.hotelid (+) = a.hotelid)  and e.regionid=l.regionid (+) "
		+ " AND h.hotelrfpid=g.hotelrfpid and f.accountrecid=e.accountrecid  AND h.accountrecid=f.accountrecid  and a.partition_idx='M' ";
	String orderString = "order by ";

	if (user.getIsLimitedSalesUser()) {
	    fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
		    + " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) "
		    + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '" + StringUtility.replaceSingleQuotes(user.getEid()) + "') "
		    + "   AND (d.partition_idx = 'M')) k ";
	    whereString += " and a.hotelid=k.hotelid  ";
	}
	/**
	 * Area Filter
	 */
	fromString += getAreaFrom(filterValues);
	whereString += getAreaWhere(filterValues);

	/**
	 * Account Filter
	 */
	PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
	if (accountFilter.getAccountrecid() > 0) {

	    whereString += " and e.selected = 'Y' ";

	    if (accountFilter.getAccountrecid() > 0)
		whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";

	    whereString += " and f.period = " + filterValues.getYear() + " ";
	    if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
		whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
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

	Query q = em.createNativeQuery(queryString, Portfolio.class);
	@SuppressWarnings("unchecked")
	List<Portfolio> portfolioSelectedList = q.getResultList();
	return portfolioSelectedList;
    }

    private String getFilteredWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() > 0 && !filterValues.getFilterString().equals("")) {
	    String filterString = "";
	    switch (filterValues.getFilterMatchField().intValue()) {
	    case 1:
		filterString += " a.marshacode";
		break;
	    case 2:
		filterString += " a.name";
		break;
	    case 3:
		filterString += " a.city";
		break;
	    case 4:
		filterString += " nvl(a.state, ' ')";
		break;
	    case 5:
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
	if (!(filterValues.getFranchised().equals("true") && filterValues.getManaged().equals("true"))) {
	    if (filterValues.getFranchised().equals("true"))
		whereString += " and a.franch_flag = 'F' ";
	    if (filterValues.getManaged().equals("true"))
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
	    orderString += "  substr(A.NAME,1,36)  ASC";
	    break;
	case 2:
	    orderString += "  nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
	    break;
	case 3:
	    orderString += "  nvl(A.STATE, ' ') asc, nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
	    break;
	case 4:
	    orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
	    break;
	case 5:
	    orderString += "  l.regionname , substr(A.NAME,1,36)  ASC";
	    break;
	default:
	    orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
	    break;
	}
	return orderString;
    }

    public String updatePortfolioSelection(long accountrecid, String subset, List<Long> orgSelect, User user) {
	String queryString = "select accounttype from mfpdbo.account where accountrecid=?1";
	Query q = em.createNativeQuery(queryString, String.class);
	q.setParameter(1, accountrecid);
	String accounttype = (String) q.getSingleResult();
	String strHotels = "";
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin  mfpproc.SP_ADD_PORTFOLIO_RPE(?, ?, ?, ?,?,?); end;");
		try {
		    stmt.setLong(2, accountrecid);
		    stmt.setString(3, accounttype);
		    stmt.setString(4, "");
		    stmt.setString(5, subset);
		    stmt.registerOutParameter(6, Types.INTEGER);
		    for (int i = 0; i < orgSelect.size(); i++) {
			Long hotelid = orgSelect.get(i);
			if (hotelid != null) {
			    stmt.setLong(1, hotelid);
			    stmt.executeUpdate();
			    if (stmt.getInt(6) == 1) {
				if (strHotels.length() > 0)
				    strHotels += ",";
				strHotels += hotelid;
			    }
			}
		    }
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
	return strHotels;
    }

    public void deletePortfolioSelection(long accountrecid, String accountpricingtype, List<Long> orgSelect, User user) {
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin MFPPROC.SP_REMOVE_PORTFOLIO_HPP(?,?,?); end;");
		try {
		    stmt.setLong(2, accountrecid);
		    stmt.setString(3, accountpricingtype);
		    for (int i = 0; i < orgSelect.size(); i++) {
			Long hotelid = orgSelect.get(i);
			if (hotelid != null) {
			    stmt.setLong(1, hotelid);
			    stmt.executeUpdate();
			
			}
		    }
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
