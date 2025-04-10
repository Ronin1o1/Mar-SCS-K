package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioRebidManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class PortfolioRebidManagerImpl
 */

@Service
public class PortfolioRebidManagerImpl implements PortfolioRebidManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<PortfolioRebid> findPortfolioRebid(PricingFilterSelections filterValues, User user) {

//	String selectString = "select distinct  A.MARSHACODE , A.NAME hotelname , nvl(A.CITY, ' ') city, nvl(A.STATE, ' ') state , nvl(A.COUNTRY, ' ') country  , nvl(e.nopricing,'Y') nopricing, "
//		+ " nvl(m.regionname,' ') subsetname, e.regionid  , "
//		+ " a.hotelid, g.hotelrfpid, nvl(e.selected,'N') selected ";
//
//	if (user.getIsLimitedSalesUser()) {
//	    selectString += ", decode(k.hotelid, '', 'Y', 'N' ) readonly ";
//	} else {
//	    selectString += ", 'N' readonly ";
//	}
//	// ratetype_selected
//	selectString += ", h.ratetype_selected, mfpproc.fn_get_rateproduct(h.ratetype_selected) product_offered , h.rebid_flag, h.rebid_due,h.rebidstatus_id, decode(importance, '', 'N', 'Y', 'Y','N','N') importance, n.rebidstatus_desc, "
//		+ " h.rebid_flag2, h.rebid_due2, h.rebidstatus_id2,  n2.rebidstatus_desc rebidstatus_desc2, h.rebid_flag3, h.rebid_due3, h.rebidstatus_id3, n3.rebidstatus_desc rebidstatus_desc3 "
//		+ " , NVL(h.chasemail_sent_flag,'N') chasemail_sent_flag , NVL(h.to_send_chasemail,'N') to_send_chasemail , CASE WHEN NVL(h.rebid_flag3,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id3 IN ('2','3') THEN 'Y' ELSE 'N' END "
//		+ " ELSE CASE WHEN NVL(h.rebid_flag2,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id2 IN ('2','3') THEN 'Y' ELSE 'N' END "
//		+ " ELSE CASE WHEN NVL(h.rebid_flag,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id IN ('2','3') THEN 'Y' ELSE 'N' END END END END AS check_respond ";
//		//Added for RCE - Deepam - Ends
//	
//	String fromString = " FROM mfpdbo.hotel a ,  MFPDBO.ACCOUNTDIRECTORY E, "
//		+ "MFPDBO.ACCOUNT F,  mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h , "
//		+ " mfpdbo.region_lookup m,mfpdbo.bt_rebidstatus_ref n, mfpdbo.bt_rebidstatus_ref n2, mfpdbo.bt_rebidstatus_ref n3 "
//	    + "  "; 
//
//	String whereString = " WHERE  (E.HOTELID = A.HOTELID) AND (g.hotelid (+) = a.hotelid) And g.period = f.period " 
//		+ " AND h.hotelrfpid=g.hotelrfpid and f.accountrecid=e.accountrecid  AND h.accountrecid=f.accountrecid "
//		+ " AND e.regionid=m.regionid(+) and h.rebidstatus_id=n.rebidstatus_id(+)  "
//		+ " AND h.rebidstatus_id2 = n2.rebidstatus_id(+) AND h.rebidstatus_id3 = n3.rebidstatus_id(+) and a.partition_idx='M' "; 
//	String orderString = "order by ";
//
//	if (user.getIsLimitedSalesUser()) {
//	    fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
//		    + " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) "
//		    + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '" + StringUtility.replaceSingleQuotes(user.getEid()) + "') "
//		    + "   AND (d.partition_idx = 'M')) k ";
//	    whereString += " and a.hotelid=k.hotelid  ";
//	}
//	/**
//	 * Area Filter
//	 */
//	fromString += getAreaFrom(filterValues);
//	whereString += getAreaWhere(filterValues);
//
//	
//	
//	/**
//	 * Account Filter
//	 */
//	
//	PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
//	if (accountFilter.getAccountrecid() > 0) {
//
//	    if (accountFilter.getAccountstatus().equals("A")){
//		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'Y' ";
//	    }else if (accountFilter.getAccountstatus().equals("REJ")){
//		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'N' ";
//	    }else if (accountFilter.getAccountstatus().equals("PEN")){	
//		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'P' ";
//	    }else if (accountFilter.getAccountstatus().equals("S")) {
//		whereString += " and e.selected = 'Y' ";
//	    }else if (accountFilter.getAccountstatus().equals("V")) {
//		whereString += " and e.volunteered = 'Y' ";
//	    }else if (accountFilter.getAccountstatus().equals("SOL")) 
//			whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
//					+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
//		
//	    if (accountFilter.getAccountrecid() > 0)
//		whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
//
//	    whereString += " and f.period = " + filterValues.getYear() + " ";
//	    if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
//		whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
//	}
//
//	
//	
//	  
//
//	/**
//	 * Affiliation Filter
//	 */
//	whereString += getBrandWhere(filterValues);
//
//	/**
//	 * Managed/Franchise Filter
//	 */
//	whereString += getManagedWhere(filterValues);
//
//	whereString += getFilteredWhere(filterValues);
//
//	orderString += getOrderby(filterValues);
//	if(orderString.trim().equals("order by"))
//		orderString = "";
//
//	String queryString = selectString + fromString + whereString + orderString;
//	Query q = em.createNativeQuery(queryString, PortfolioRebid.class);
//	@SuppressWarnings("unchecked")
//	List<PortfolioRebid> portfolioSelectedList = q.getResultList();
//	return portfolioSelectedList;
	
    	if (user.getIsLimitedSalesUser()) {
    		return findPortfolioRebid_new1(filterValues,user);
    	} else {
    		return findPortfolioRebid_new(filterValues);
    	}
	
    }
    
    
    public List<PortfolioRebid> findPortfolioRebid_new(PricingFilterSelections filterValues) {
    	
    	PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
    	
    	String selectString = "select distinct  A.MARSHACODE , substr(A.NAME,1,36) hotelname , nvl(A.CITY, ' ') city, nvl(A.STATE, ' ') state , nvl(A.COUNTRY, ' ') country  , nvl(e.nopricing,'Y') nopricing, "
    		+ " nvl(m.regionname,' ') subsetname, e.regionid  , a.hotelid, g.hotelrfpid, nvl(e.selected,'N') selected, 'N' readonly "
    	    + ", h.ratetype_selected, mfpproc.fn_get_rateproduct(h.ratetype_selected) product_offered , h.rebid_flag, h.rebid_due,h.rebidstatus_id, decode(importance,'Y','Y','N') importance, "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id) rebidstatus_desc, h.rebid_flag2, h.rebid_due2, h.rebidstatus_id2,  "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id2) rebidstatus_desc2, h.rebid_flag3, h.rebid_due3, h.rebidstatus_id3, "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id3) rebidstatus_desc3, "
    		+ " NVL(h.chasemail_sent_flag,'N') chasemail_sent_flag , NVL(h.to_send_chasemail,'N') to_send_chasemail , "
    		+ " CASE WHEN NVL(h.rebid_flag3,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id3 IN ('2','3') THEN 'Y' ELSE 'N' END "
    		+ " ELSE CASE WHEN NVL(h.rebid_flag2,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id2 IN ('2','3') THEN 'Y' ELSE 'N' END "
    		+ " ELSE CASE WHEN NVL(h.rebid_flag,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id IN ('2','3') THEN 'Y' ELSE 'N' END END END END AS check_respond ";
    	
    	String fromString = " FROM mfpdbo.hotel a, mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h, mfpdbo.accountdirectory e, mfpdbo.region_lookup m ";
    	String whereString = " WHERE  a.hotelid=g.hotelid and a.partition_idx='M' ";
    	String orderString = " order by ";
    	/**
    	 * Affiliation Filter
    	 */
    	whereString += getBrandWhere(filterValues);
    	
    	/**
    	 * Managed/Franchise Filter
    	 */
    	whereString += getManagedWhere(filterValues);
    	
    	/**
    	 * Area Filter
    	 */
    	fromString += getAreaFrom(filterValues);
    	whereString += getAreaWhere(filterValues);
    	
    	whereString += " and g.period = " + filterValues.getYear() + " and g.hotelrfpid=h.hotelrfpid and h.accountrecid=e.accountrecid "
    		+ " and e.accountrecid = " + accountFilter.getAccountrecid() + " and (e.hotelid = a.hotelid) and e.regionid=m.regionid(+) ";    	
    	
    	/**
    	 * Account Filter
    	 */
    	
    	if (accountFilter.getAccountrecid() > 0) {

    	    if (accountFilter.getAccountstatus().equals("A")){
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("REJ")){
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'N' ";
    	    }else if (accountFilter.getAccountstatus().equals("PEN")){	
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'P' ";
    	    }else if (accountFilter.getAccountstatus().equals("S")) {
    		whereString += " and e.selected = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("V")) {
    		whereString += " and e.volunteered = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("SOL")) 
    			whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
    					+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";

    	    if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
    		whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
    	}

    	whereString += getFilteredWhere(filterValues);

    	orderString += getOrderby(filterValues);
    	if(orderString.trim().equals("order by"))
    		orderString = "";

    	String queryString = selectString + fromString + whereString + orderString;
    	Query q = em.createNativeQuery(queryString, PortfolioRebid.class);
    	@SuppressWarnings("unchecked")
    	List<PortfolioRebid> portfolioSelectedList = q.getResultList();
    	return portfolioSelectedList;
    }
    
    
    public List<PortfolioRebid> findPortfolioRebid_new1(PricingFilterSelections filterValues, User user) {

    	PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
    	
    	String selectString = "select distinct  A.MARSHACODE , substr(A.NAME,1,36) hotelname , nvl(A.CITY, ' ') city, nvl(A.STATE, ' ') state , nvl(A.COUNTRY, ' ') country  , nvl(e.nopricing,'Y') nopricing, "
    		+ " nvl(m.regionname,' ') subsetname, e.regionid  , a.hotelid, g.hotelrfpid, nvl(e.selected,'N') selected, 'N' readonly "
    	    + ", h.ratetype_selected, mfpproc.fn_get_rateproduct(h.ratetype_selected) product_offered , h.rebid_flag, h.rebid_due,h.rebidstatus_id, decode(importance,'Y','Y','N') importance, "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id) rebidstatus_desc, h.rebid_flag2, h.rebid_due2, h.rebidstatus_id2,  "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id2) rebidstatus_desc2, h.rebid_flag3, h.rebid_due3, h.rebidstatus_id3, "
    	    + " mfpproc.fn_get_rebidstatus(h.rebidstatus_id3) rebidstatus_desc3, "
    		+ " NVL(h.chasemail_sent_flag,'N') chasemail_sent_flag , NVL(h.to_send_chasemail,'N') to_send_chasemail , "
    		+ " CASE WHEN NVL(h.rebid_flag3,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id3 IN ('2','3') THEN 'Y' ELSE 'N' END "
    		+ " ELSE CASE WHEN NVL(h.rebid_flag2,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id2 IN ('2','3') THEN 'Y' ELSE 'N' END "
    		+ " ELSE CASE WHEN NVL(h.rebid_flag,'N') = 'Y' THEN CASE WHEN h.rebidstatus_id IN ('2','3') THEN 'Y' ELSE 'N' END END END END AS check_respond ";
    	
    	String fromString = " FROM mfpdbo.hotel a, mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h, mfpdbo.accountdirectory e, mfpdbo.region_lookup m, mfpdbo.ds_user usr, mfpdbo.ds_propusers pro ";
    	String whereString = " WHERE  a.hotelid=g.hotelid and a.partition_idx='M' ";
    	String orderString = " order by ";
    	/**
    	 * Affiliation Filter
    	 */
    	whereString += getBrandWhere(filterValues);
    	
    	/**
    	 * Managed/Franchise Filter
    	 */
    	whereString += getManagedWhere(filterValues);
    	
    	/**
    	 * Area Filter
    	 */
    	fromString += getAreaFrom(filterValues);
    	whereString += getAreaWhere(filterValues);
    	
    	whereString += " and g.period = " + filterValues.getYear() + " and g.hotelrfpid=h.hotelrfpid and h.accountrecid=e.accountrecid "
    		+ " and e.accountrecid = " + accountFilter.getAccountrecid() + " and (e.hotelid = a.hotelid) and e.regionid=m.regionid(+) ";    	
    	
    	/**
    	 * Account Filter
    	 */
    	
    	if (accountFilter.getAccountrecid() > 0) {

    	    if (accountFilter.getAccountstatus().equals("A")){
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("REJ")){
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'N' ";
    	    }else if (accountFilter.getAccountstatus().equals("PEN")){	
    		whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'P' ";
    	    }else if (accountFilter.getAccountstatus().equals("S")) {
    		whereString += " and e.selected = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("V")) {
    		whereString += " and e.volunteered = 'Y' ";
    	    }else if (accountFilter.getAccountstatus().equals("SOL")) 
    			whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
    					+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ") ";

    	    if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
    		whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
    	}
    	
    	whereString += " and (usr.eid='" + StringUtility.replaceSingleQuotes(user.getEid()) + "') and usr.cn_userid=pro.cn_userid and pro.marshacode=a.marshacode ";
    	
    	whereString += getFilteredWhere(filterValues);

    	orderString += getOrderby(filterValues);
    	if(orderString.trim().equals("order by"))
    		orderString = "";

    	String queryString = selectString + fromString + whereString + orderString;
    	Query q = em.createNativeQuery(queryString, PortfolioRebid.class);
    	@SuppressWarnings("unchecked")
    	List<PortfolioRebid> portfolioSelectedList = q.getResultList();
    	return portfolioSelectedList;
    }
    
    
    
    private String getFilteredWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() >= 0 && !filterValues.getFilterString().equals("")) {
	    String filterString = "";
	    switch (filterValues.getFilterMatchField().intValue()) {
	    case 0:
		filterString += " a.marshacode";
		break;
	    case 1:
		filterString += " a.name";
		break;
	    case 15:
		filterString += " a.city";
		break;
	    case 16:
		filterString += " nvl(a.state, ' ')";
		break;
	    case 17:
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
	    orderString += "   A.NAME  ASC";
	    break;
	case 2:
	    orderString += "nvl( h.rebid_flag,'N') asc, a.marshacode asc ";
	    break;
	case 3:
	    orderString += " h.rebid_due asc, a.marshacode asc ";
	    break;
	case 4:
	    orderString += " h.rebidstatus_id asc, a.marshacode asc ";
	    break;
	case 5:
	    orderString += " nvl(h.rebid_flag2,'N') asc, a.marshacode asc ";
	    break;
	case 6:
	    orderString += " h.rebid_due2 asc, a.marshacode asc ";
	    break;
	case 7:
	    orderString += " h.rebidstatus_id2 asc, a.marshacode asc ";
	    break;
	case 8:
	    orderString += " nvl(h.rebid_flag3, 'N') asc, a.marshacode asc ";
	    break;
	case 9:
	    orderString += " h.rebid_due3 asc, a.marshacode asc ";
	    break;
	case 10:
	    orderString += " h.rebidstatus_id3 asc, a.marshacode asc ";
	    break;
	case 11:
	    orderString += " mfpproc.fn_get_rateproduct(h.ratetype_selected) asc";
	    break;
	case 12:
	    orderString += " e.regionid asc";
	    break;
	case 13:
	    orderString += "  nvl(A.CITY, ' ')  , A.NAME  ASC";
	    break;
	case 14:
	    orderString += "  nvl(A.STATE, ' ') asc, nvl(A.CITY, ' ')  ,  A.NAME  ASC";
	    break;
	case 15:
	    orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,   A.NAME  ASC";
	    break;
	default:
	    orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  A.NAME ASC";
	    break;
	}
	return orderString;
    }

    public void updatePortfolioRebidList(List<PortfolioRebid> pslist, Long accountrecid, User user) {
	CallableStatement stmt;
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		stmt = con.prepareCall("begin  mfpproc.sp_updateportfoliorebid_hpp(?,?,?,?,?,?,?,?,?,?); end; "); 
		try {
		    for (int i = 0; i < pslist.size(); i++) {
		    	PortfolioRebid model = (PortfolioRebid) pslist.get(i);
			if ((model.getReadonly() == null || model.getReadonly().equals("N")) && (model.getChanged().equals("Y"))) {

			    stmt.setLong(1, model.getHotelid());
			    stmt.setLong(2, accountrecid);
			    stmt.setString(3, model.getRebid_flag());
			    String duedate = null;
			    if (model.getRebid_due() != null)
				duedate = DateUtility.formatShortDate(model.getRebid_due());
			    stmt.setString(4, duedate);
			    stmt.setString(5, model.getRebid_flag2());
			    duedate = null;
			    if (model.getRebid_due2() != null)
				duedate = DateUtility.formatShortDate(model.getRebid_due2());
			    stmt.setString(6, duedate);
			    stmt.setString(7, model.getRebid_flag3());
			    duedate = null;
			    if (model.getRebid_due3() != null)
				duedate = DateUtility.formatShortDate(model.getRebid_due3());
			    stmt.setString(8, duedate);
			    stmt.setString(9, model.getChasemail_sent_flag());
			    stmt.setString(10, model.getTo_send_chasemail());
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
