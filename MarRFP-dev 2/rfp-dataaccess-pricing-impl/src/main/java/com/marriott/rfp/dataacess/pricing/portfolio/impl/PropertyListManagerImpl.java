package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.portfolio.api.PropertyListManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class PropertyListManagerImpl
 */
@Service
public class PropertyListManagerImpl implements PropertyListManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user) {
		/**
		 * Year must be selected
		 */
		if (filterValues.getYear() == 0)
			return null;

		String selectString = " SELECT ";

		String fromString = " FROM mfpdbo.hotel a , MFPDBO.HOTELWEBINFO B  ";
		if (user.getIsLimitedSalesUser()) {
			fromString += " , (SELECT d.hotelid    FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)  AND (a.cn_userid = c.cn_userid)  AND (c.cn_userid = b.cn_userid) " + "   AND (d.marshacode = a.marshacode)  AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') " + "   AND (d.partition_idx = 'M')) k ";
		}
		String whereString = " WHERE   (b.HOTELID (+) = A.HOTELID) ";

		if (user.getIsLimitedSalesUser()) {
			whereString += " and a.hotelid=k.hotelid  ";
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
		if (accountFilter.getAccountrecid() != null && accountFilter.getAccountrecid() > 0) {
			String accountStatus = accountFilter.getAccountstatus();
			if (!accountStatus.equals("ALL")) {
				fromString += " , MFPDBO.ACCOUNTDIRECTORY E , MFPDBO.ACCOUNT F, MFPDBO.HOTELRFP G, MFPDBO.HOTEL_ACCOUNTINFO H ";

				whereString += " AND (E.HOTELID = A.HOTELID)  AND (E.ACCOUNTRECID = F.ACCOUNTRECID) " + " AND (E.ACCOUNTRECID = F.ACCOUNTRECID)  AND (E.ACCOUNTRECID = H.ACCOUNTRECID) "
						+ " AND (H.HOTELRFPID = G.HOTELRFPID)  AND (G.HOTELID = A.HOTELID ) ";

				if (accountFilter.getHideNoPricing())
					whereString += " and e.nopricing = 'N' ";
				if (accountStatus.equals("A")){
					whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'Y' ";
				}else if (accountStatus.equals("S")) {
					whereString += " and e.selected = 'Y' ";
				}else if (accountStatus.equals("V")) {
					whereString += " and e.volunteered = 'Y' ";
				}else if (accountStatus.equals("REJ")){
					whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'N' ";
				}else if (accountStatus.equals("PEN")){	
						whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'P' ";
				}else if (accountStatus.equals("SOL")) { 
					whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
							+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
				}if (accountFilter.getAccountrecid() > 0)
					whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
				whereString += " and f.period = " + filterValues.getYear() + " ";
				if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
					whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
			}

		}

		whereString += getManagedWhere(filterValues);

		/**
		 * Future Openings Filter
		 */
		if (filterValues.getFutureOpeningFilter() != null
				&& (filterValues.getFutureOpeningFilter().getAllFutureOpenings().equals("Y") || filterValues.getFutureOpeningFilter().getFromDate() != null || filterValues.getFutureOpeningFilter()
						.getToDate() != null)) {
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
		 * user selected filter from find filter
		 */
		whereString += getFilteredWhere(filterValues);
		selectString += " DISTINCT A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state , nvl(A.COUNTRY, ' ') country , nvl(B.FUTUREOPENING, 'N') futureopening,  a.hotelid ";
		whereString += " AND (A.PARTITION_IDX ='M') ";
		orderString += getOrderby(filterValues);
		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelListData.class);
		@SuppressWarnings("unchecked")
		List<HotelListData> hotelListData = q.getResultList();
		return hotelListData;
	}

	private String getFilteredWhere(PricingFilterSelections filterValues) {

		String whereString = "";
		if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() >= 0 && !filterValues.getFilterString().equals("")) {
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
		case 1:
			orderString += " a.marshacode asc";
			break;
		case 2:
			orderString += "  substr(A.NAME,1,36)  ASC";
			break;
		case 3:
			orderString += "  nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		case 4:
			orderString += "  nvl(A.STATE, ' ') asc, nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		case 5:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		case 6:
			orderString += " nvl(B.FUTUREOPENING, 'N') asc, substr(A.NAME,1,36)  ASC";
			break;
		default:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		}
		return orderString;
	}

}
