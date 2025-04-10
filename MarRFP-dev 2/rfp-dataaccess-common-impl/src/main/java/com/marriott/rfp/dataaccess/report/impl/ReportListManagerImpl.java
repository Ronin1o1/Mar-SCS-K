package com.marriott.rfp.dataaccess.report.impl;

import com.marriott.rfp.dataaccess.report.api.ReportListManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.report.ExcelDateFormats;
import com.marriott.rfp.object.report.ProximitySubCategory;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * Session Bean implementation class ReportListManagerImpl
 */
@Service
public class ReportListManagerImpl implements ReportListManager {
	private static final Logger log = LoggerFactory.getLogger(ReportListManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<ReportModel> findReportList(String reportType, String role) {
		String queryString = "";

		queryString = "SELECT   REPORT_NAME , REPORT_TITLE, IS_ELECTRONIC, ALLOW_ACCOUNT FROM   MFPDBO.REPORT_LIST  " + " WHERE REPORT_NAME not like 'SalesMetrics%'  and report_name NOT IN ('eAccountTracking', 'eAccessToAccountTracking') and reportType=?1";
		if (role.equals("MFPSALES"))
			queryString += " and allow_salesview='Y' ";
		else if ( role.equals("MFPFSALE"))
			queryString += " and allow_fsalesview='Y' ";
		else if (role.equals("MFPWSADM"))
			queryString += " and allow_wsview='Y' ";
		else if (role.equals("MFPPPADM"))
			queryString += " and allow_padminview='Y' ";
		else if (role.equals("MFPUSER"))
			queryString += " and allow_enhancehotelview='Y' ";
		else if (role.equals("MFPREAD"))
			queryString += " and allow_readonlyview='Y' ";
		else if (role.equals("MFPRDADM"))
			queryString += " and allow_rdadminview='Y' ";
		else if (role.equals("MFPAPADM"))
			queryString += " and allow_apadminview='Y' ";

		queryString += " ORDER by REPORT_TITLE";

		Query query = em.createNativeQuery(queryString, ReportModel.class);
		query.setParameter(1, reportType);
		List<ReportModel> resultList = (List<ReportModel>) query.getResultList();

		return resultList;
	}

	public List<ProximitySubCategory> findProximitySubCategoryList(Long accountrecid) {

		String queryString = "SELECT DISTINCT SICCODE1, SICCODE1DESC FROM MFPDBO.BUSINESSFACTS WHERE ULTIMATEBUSINESSID in ( "
				+ "    SELECT ULTIMATEBUSINESSID      FROM MFPDBO.account_mcad_lookup      WHERE (ACCOUNTRECID =?1)  ) ORDER BY SICCODE1DESC";

		Query query = em.createNativeQuery(queryString, ProximitySubCategory.class);
		query.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<ProximitySubCategory> resultList = query.getResultList();

		return resultList;
	}

	public ReportModel findReportAttributes(String report_name) {
		String queryString = "";

		queryString = "SELECT   REPORT_NAME , REPORT_TITLE, IS_ELECTRONIC, ALLOW_ACCOUNT FROM   MFPDBO.REPORT_LIST   WHERE REPORT_NAME =?1";

		Query query = em.createNativeQuery(queryString, ReportModel.class);
		query.setParameter(1, report_name);
		ReportModel result = (ReportModel) query.getSingleResult();

		return result;
	}

	public List<ReportModel> getReportsFilterList(String reportType, boolean filtered, User user) {
		
		String queryString1 = "select count(*) thecount from mfpdbo.amenity_report_user where eid=?";
		Query q = em.createNativeQuery(queryString1, Long.class);
		q.setParameter(1, user.getEid());
		Long thecount = 0L;
		try {
			thecount = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			thecount = 0L;
		}
		
		String queryString = "SELECT REPORT_NAME ,  REPORT_TITLE FROM   MFPDBO.REPORT_LIST  WHERE";
		if (filtered)
			queryString += " hotel_filtered='Y' ";
		else
			queryString += " hotel_filtered!='Y' ";
		if (thecount == 0){
			queryString += " and report_name NOT IN ('eAccountTracking', 'eAccessToAccountTracking', 'eAmenitiesAnalysisBatch')  and reporttype=?1 ";
		} else {
			queryString += " and report_name NOT IN ('eAccountTracking', 'eAccessToAccountTracking')  and reporttype=?1 ";
		}
		if (user.getIsSalesUser())
			queryString += " and allow_salesview='Y' ";
		else if (user.getIsLimitedSalesUser())
			queryString += " and allow_fsalesview='Y' ";
		else if (user.getIsWholesalerAdmin())
			queryString += " and allow_wsview='Y' ";
		else if (user.getShortRole().equals("P")) // this needs to be removed
			// when promotions is removed.
			queryString += " and allow_padminview='Y' ";
		else if (user.getIsHotelUser())
			queryString += " and allow_enhancehotelview='Y' ";
		else if (user.getIsReadOnly())
			queryString += " and allow_readonlyview='Y' ";
		else if (user.getIsRDAdmin())
			queryString += " and allow_rdadminview='Y' ";
		else if (user.getIsSAPPAdmin())
			queryString += " and allow_apadminview='Y' ";
		queryString += " ORDER by REPORT_TITLE";
		Query query = em.createNativeQuery(queryString, ReportModel.class);
		query.setParameter(1, reportType);
		@SuppressWarnings("unchecked")
		List<ReportModel> result = query.getResultList();
		
		return result;
	}

	public ReportModel getReportDetails(String reportname) {

		if (reportname != null && !reportname.equals("")) {
			String queryString = "select report_name, report_title, is_electronic, allow_accounttype, allow_period, add_params, req_account, " + " allow_account, req_roles,  allow_region, "
					+ " allow_proximitysubcat, schedule_time, priority, req_daterange,  req_acct_or_region , "
					+ " fsale_all_hotels, allow_account_eligible, allow_quarter, acctplan_options, sale_all_account, "
					+ " allow_saleslist, allow_apadminview, allow_account_solicited, include_marriott_contact, " + " DECODE (hotel_filtered, 'O', 'Y', 'N') allow_onehotel, "
					+ " DECODE (report_name, 'eHotelAccountAccess', 'Y', 'N') allow_eid, allow_dateformat, req_acct_region_brand, allow_schedule,  " 
					+ " allow_cbchotels"
					+ " from mfpdbo.report_list where report_name=?1";
			Query query = em.createNativeQuery(queryString, ReportModel.class);
			query.setParameter(1, reportname);
			ReportModel result = (ReportModel) query.getSingleResult();
			return result;
		}

		return null;
	}

	public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user) {
		/**
		 * Year must be selected
		 */
		if (filterValues.getYear() == 0 && filterValues.getReport() != null && filterValues.getReport().equals(""))
			return null;

		boolean allowallhotels = false;
		if (user.getIsLimitedSalesUser() && filterValues.getReport() != null && !filterValues.getReport().equals("")) {
			String queryString = "select  fsale_all_hotels  from mfpdbo.report_list where report_name=?1";
			Query q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, filterValues.getReport());
			String allowAllhotels = "N";
			try {
				allowAllhotels = (String) q.getSingleResult();
			} catch (Exception ex) {
				allowAllhotels = "N";
			}
			if (allowAllhotels != null && allowAllhotels.equals("Y")) {
				allowallhotels = true;
			}
		}

		String selectString = " SELECT ";

		String fromString = " FROM mfpdbo.hotel a , MFPDBO.HOTELWEBINFO B  ";
		if ((user.getIsLimitedSalesUser() && !allowallhotels) || user.getIsHotelUser()) {
			fromString += " , (SELECT d.hotelid    FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)  AND (a.cn_userid = c.cn_userid)  AND (c.cn_userid = b.cn_userid) " + "   AND (d.marshacode = a.marshacode)  AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') " + "   AND (d.partition_idx = 'M')) k ";
		}
		String whereString = " WHERE   (b.HOTELID (+) = A.HOTELID) ";

		if (filterValues.getHotelProfile() != null && filterValues.getHotelProfile() > 0) {
			fromString += ", mfpdbo.hotel_profile_list hpl ";
			whereString += " and a.hotelid = hpl.hotelid and hpl.profile_id=" + filterValues.getHotelProfile() + " ";
		}
		if ((user.getIsLimitedSalesUser() && !allowallhotels) || user.getIsHotelUser()) {
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
			if (!accountStatus.equals("ALL") && !accountStatus.equals("E") && !accountStatus.equals("R")) {
				fromString += " , MFPDBO.ACCOUNTDIRECTORY E , MFPDBO.ACCOUNT F, MFPDBO.HOTELRFP G, MFPDBO.HOTEL_ACCOUNTINFO H ";

				whereString += " AND (E.HOTELID = A.HOTELID)  AND (E.ACCOUNTRECID = F.ACCOUNTRECID) " + " AND (E.ACCOUNTRECID = F.ACCOUNTRECID)  AND (E.ACCOUNTRECID = H.ACCOUNTRECID) "
						+ " AND (H.HOTELRFPID = G.HOTELRFPID)  AND (G.HOTELID = A.HOTELID )";

				if (accountFilter.getHideNoPricing())
					whereString += " and e.nopricing = 'N' ";
				
				if (accountStatus.equals("A")){
					whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'Y' ";
				}else if (accountStatus.equals("REJ")){	
					whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'N' ";
				}else if (accountStatus.equals("PEN")){	
					whereString += " and mfpproc.fn_accountstatus(h.hotel_accountinfoid) = 'P' ";
				}else if (accountStatus.equals("S"))
					whereString += " and e.selected = 'Y' ";
				else if (accountStatus.equals("V"))
					whereString += " and e.volunteered = 'Y' ";
				else if (accountStatus.equals("C"))
					whereString += " and h.business_case = 'Y' ";
				else if (accountStatus.equals("SOL")) 
					whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
							+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
				if (accountFilter.getAccountrecid() > 0)
					whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
				whereString += " and f.period = " + filterValues.getYear() + " ";
				if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
					whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
			} else if (accountStatus.equals("E")) {
				whereString += " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
			} else if (accountStatus.equals("R")) {
				whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x   where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
						+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
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

		if (filterValues.getReport() != null && filterValues.getReport().startsWith("WS_RateChange")) {
			fromString += " , MFPDBO.WS_PARTICIPATION J ";
			whereString += " AND (J.HOTELID = A.HOTELID)  AND (J.PRICE_PERIOD=" + filterValues.getYear() + ")" + " AND J.PARTICIPATION IS NOT NULL ";
		}
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

	public Long updateList(List<HotelListData> hotelList, String highlightedOnly) {
		Long filterId = 0L;
		try {

			String queryString = "select mfpdbo.report_hotel_seq.nextval from dual";

			Query q = em.createNativeQuery(queryString, Long.class);
			filterId = (Long) q.getSingleResult();

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			boolean highlighted = false;
			if (highlightedOnly != null && highlightedOnly.equals("Y"))
				highlighted = true;
			try {
				CallableStatement cstmt = con.prepareCall("begin  insert into mfpdbo.report_hotel (report_id, hotelid) values(?,?); end; ");
				try {

					for (int i = 0; i < hotelList.size(); i++) {
						if (highlighted) {
							if (hotelList.get(i).getChanged() != null && hotelList.get(i).getChanged().equals("Y")) {
								cstmt.setLong(1, filterId);
								cstmt.setLong(2, hotelList.get(i).getHotelid());
								cstmt.execute();
							}
						} else {
							cstmt.setLong(1, filterId);
							cstmt.setLong(2, hotelList.get(i).getHotelid());
							cstmt.execute();
						}
					}
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		return filterId;
	}

	public Long updateList(List<Long> hotelList) {
		Long filterId = 0L;
		try {

			String queryString = "select mfpdbo.report_hotel_seq.nextval from dual";

			Query q = em.createNativeQuery(queryString, Long.class);
			filterId = (Long) q.getSingleResult();

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("begin  insert into mfpdbo.report_hotel (report_id, hotelid) values(?,?); end; ");
				try {

					for (int i = 0; i < hotelList.size(); i++) {
						if (hotelList.get(i) != null) {
							cstmt.setLong(1, filterId);
							cstmt.setLong(2, hotelList.get(i));
							cstmt.execute();
						}
					}
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		return filterId;
	}

	public List<ExcelDateFormats> findExcelDateFormats() {
		String queryString = "SELECT dateformats, defaultvalue FROM mfpdbo.exceldateformat_ref order by decode(defaultvalue,'Y','A','Z'), dateformats ";

		Query query = em.createNativeQuery(queryString, ExcelDateFormats.class);
		@SuppressWarnings("unchecked")
		List<ExcelDateFormats> result = query.getResultList();

		return result;
	}
	
	public Long getAmenityCount() {
		String queryString = "select count(*) from mfpdbo.amenity_report_schedule where schedule_date=trunc(sysdate) ";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long count = 0L;
		try {
			count = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			count = 0L;
		}
		return count;
	}
	
	public void insertAmenityBatchRecord(String scheduleTime, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("begin insert into mfpdbo.amenity_report_schedule values (trunc(sysdate),?,?); end; ");
				try {
					cstmt.setString(1, scheduleTime);
					cstmt.setString(2, user.getEid());
					cstmt.execute();
				} catch (Exception e) {
					log.error(e.getMessage(),e);
				} finally {
					cstmt.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}
}
