package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountRatesManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenter;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class AccountRatesManagerImpl implements AccountRatesManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public List<HotelAccountCenter> findAccountRates(PricingFilterSelections filterValues, User user) {

	String selectString = "SELECT marshacode, NAME hotelname, city, state, country, futureopening, hotelid, "
		+ " a.accountrecid, accounttype, accountname, hotel_accountinfoid, "
		+ " ratetype_selected,  aer_account,  allow_no_bid, gov_account, allow_floatnociel , selected isSelected, "
		+ " nobidreasonid,  nobidreason, ismaxaer, mfpproc.fn_exclude_aer(a.affiliationid) excludeaer, "
		+  " mfpproc.fn_hasgovperdiempricing(hotelrfpid) hasgovperdiempricing, decode(adfp.default_floatpercent,'', 'N', 'Y')  hasdefaultfloat, ratetypeid volunteeredratetype, hotelrfpid, decode(country,'US','N','Y') isInternational  "
		+ " FROM (SELECT marshacode, NAME, city, state, country, futureopening, hotelid, "
		+ " accountrecid, accounttype, accountname, hotel_accountinfoid,  ratetype_selected, "
		+ " aer_account, allow_no_bid, gov_account, allow_floatnociel, "
		+ " selected, nobidreasonid, nobidreason, ismaxaer, hotelrfpid, affiliationid, ratetypeid, ROWNUM arow "
		+ " FROM (SELECT   h.marshacode, SUBSTR (h.NAME, 1, 36) NAME,  NVL (h.city, ' ') city, NVL (h.state, ' ') state, "
		+ " NVL (h.country, ' ') country,  NVL (hwi.futureopening, 'N') futureopening, "
		+ " h.hotelid, a.accountrecid, a.accounttype,  a.accountname, ha.hotel_accountinfoid, "
		+ " ha.ratetype_selected,  a.aer_account, atr.allow_no_bid, "
		+ " a.gov_account, a.allow_floatnociel, ad.selected,  ha.nobidreasonid, hnbr.nobidreason, "
		+ " mfpproc.fn_get_ismaxaerdiscount  (a.aer_account,  a.accountrecid  ) ismaxaer, hr.hotelrfpid, h.affiliationid, rtr.ratetypeid  "
		+ " FROM mfpdbo.hotel h,  mfpdbo.hotelwebinfo hwi,  mfpdbo.accountdirectory ad,  mfpdbo.ACCOUNT a, "
		+ " mfpdbo.hotelrfp hr,  mfpdbo.hotel_accountinfo ha,  mfpdbo.accounttiertype_ref atr, "
		+ " mfpdbo.ratetype_ref rtr,  mfpdbo.hotelnobid_ref hnbr ";

	String fromString = "  ";
	String whereString = " WHERE (hwi.hotelid(+) = h.hotelid)  AND (ad.hotelid = h.hotelid) "
		+ " AND (ad.accountrecid = a.accountrecid)  AND (ad.accountrecid = a.accountrecid) "
		+ " AND (ad.accountrecid = ha.accountrecid)  AND (ha.hotelrfpid = hr.hotelrfpid) "
		+ " AND (hr.hotelid = h.hotelid)  AND atr.accounttype = a.accounttype  AND rtr.accounttype = a.accounttype "
		+ " AND ha.nobidreasonid = hnbr.nobidreasonid(+) ";

	if (user.getIsLimitedSalesUser()) {
	    fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
		    + " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid) "
		    + "   AND (c.cn_userid = b.cn_userid)   AND (d.marshacode = a.marshacode)   AND (b.eid = '"
		    + StringUtility.replaceSingleQuotes(user.getEid()) + "')   AND (d.partition_idx = 'M')) k ";
	    whereString += " and  (k.HOTELID  = h.HOTELID) ";
	}
	String orderString = "order by ";

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
	    whereString += " and ad.nopricing = 'N' ";
	    if (accountFilter.getAccountstatus().equals("A"))
		whereString += " and ad.accepted = 'Y' ";
	    else if (accountFilter.getAccountstatus().equals("S"))
		whereString += " and ad.selected = 'Y' ";
	    else if (accountFilter.getAccountstatus().equals("V"))
		whereString += " and ad.volunteered = 'Y' ";

	    if (accountFilter.getAccountrecid() > 0)
		whereString += " and ad.accountrecid = " + accountFilter.getAccountrecid() + " ";

	    whereString += " and a.period = " + filterValues.getYear() + " ";
	    if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
		whereString += " and ad.regionid = '" + accountFilter.getSubset() + "' ";
	}

	/**
	 * Affiliation Filter
	 */
	whereString += getBrandWhere(filterValues);

	whereString += getFilteredWhere(filterValues);

	whereString += " and h.partition_idx='M'";
	orderString += getOrderby(filterValues);

	orderString += ")) a,  mfpdbo.account_defaultfloatpercent adfp  WHERE a.accountrecid = adfp.accountrecid(+) "
		+ " and a.affiliationid=adfp.affiliationid(+) ";
	String queryString = selectString + fromString + whereString + orderString;

	Query q = em.createNativeQuery(queryString, HotelAccountCenter.class);
	@SuppressWarnings("unchecked")
	List<HotelAccountCenter> accountRatesList = q.getResultList();
	return accountRatesList;
    }

    private String getFilteredWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() >= 0 && !filterValues.getFilterString().equals("")) {
	    String filterString = "";
	    switch (filterValues.getFilterMatchField().intValue()) {
	    case 0:
		filterString += " h.marshacode";
		break;
	    case 1:
		filterString += " h.name";
		break;
	    case 15:
		filterString += " h.city";
		break;
	    case 16:
		filterString += " nvl(h.state, ' ')";
		break;
	    case 17:
		filterString += " h.country";
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

    private String getBrandWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	if (filterValues.getBrandlist() != null && filterValues.getBrandlist().size() > 0)
	    whereString += " and h.affiliationid in (" + filterValues.getStringBrandList() + ")";
	return whereString;
    }

    private String getAreaWhere(PricingFilterSelections filterValues) {
	String whereString = "";
	RegionFilterValue areaFilter = filterValues.getAreaFilter();
	if (areaFilter.getAreaOrRegion().equals("R")) {
	    whereString += " AND (hac.HOTELID = h.HOTELID) ";
	    whereString += " and hac.typeid = 74 ";
	    if (areaFilter.getRegionid() > 0)
		whereString += " and hac.areaid = " + areaFilter.getRegionid() + " ";
	    else
		whereString += " and hac.areaid not in (1,2) ";
	} else {
	    if (areaFilter.getCountry() != null && !areaFilter.getCountry().equals(""))
		whereString += "and h.country = '" + StringUtility.replaceSingleQuotes(areaFilter.getCountry()) + "' ";
	    if (areaFilter.getState() != null && !areaFilter.getState().equals(""))
		whereString += "and h.state = '" + StringUtility.replaceSingleQuotes(areaFilter.getState()) + "' ";
	    if (areaFilter.getCity() != null && !areaFilter.getCity().equals(""))
		whereString += "and h.city = '" + StringUtility.replaceSingleQuotes(areaFilter.getCity()) + "' ";
	}
	return whereString;
    }

    private String getAreaFrom(PricingFilterSelections filterValues) {
	String fromString = "";
	if (filterValues.getAreaFilter().getAreaOrRegion().equals("R"))
	    fromString += ", MFPDBO.HOTELAREAREC hac ";
	return fromString;
    }

    private String getOrderby(PricingFilterSelections filterValues) {
	String orderString = "";
	switch (filterValues.getOrderBy()) {
	case 0:
	    orderString += "  h.marshacode asc";
	    break;
	case 1:
	    orderString += "  SUBSTR (h.NAME, 1, 36) ASC";
	    break;
	case 2:
	    orderString += " NVL (h.city, ' '), NVL (h.country, ' ') ASC, NVL (h.state, ' ') ASC,     SUBSTR (h.NAME, 1, 36) ASC";
	    break;
	case 3:
	    orderString += "  NVL (h.state, ' ') ASC, NVL (h.country, ' ') ASC,   NVL (h.city, ' '),  SUBSTR (h.NAME, 1, 36) ASC";
	    break;
	case 4:
	    orderString += " NVL (h.country, ' ') ASC, NVL (h.state, ' ') ASC,   NVL (h.city, ' '),  SUBSTR (h.NAME, 1, 36) ASC";
	    break;
	default:
	    orderString += " NVL (h.country, ' ') ASC, NVL (h.state, ' ') ASC,   NVL (h.city, ' '),  SUBSTR (h.NAME, 1, 36) ASC";
	    break;
	}
	return orderString;
    }

   
}
