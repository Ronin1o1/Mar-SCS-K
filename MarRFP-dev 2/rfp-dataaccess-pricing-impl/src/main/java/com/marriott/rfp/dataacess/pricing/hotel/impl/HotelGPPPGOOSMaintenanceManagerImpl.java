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
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelGPPPGOOSMaintenanceManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotel.HotelGPPPGOOSListData;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelGPPPGOOSMaintenanceManagerImpl implements HotelGPPPGOOSMaintenanceManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<HotelGPPPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user) {

		String selectString = " select marshacode,  substr(NAME,1,36) hotelname ,  nvl(CITY, ' ') city , nvl(STATE, ' ') state, nvl(COUNTRY, ' ') country , pgoos, hotelid, "
				+ " f.removalreasonid, nvl(L.REMOVALREASON, 'No Reason Provided.') removalreason from MFPDBO.PGOOS_REMOVAL_REF L,  (SELECT"
				+ " A.MARSHACODE , A.NAME , nvl(A.CITY, ' ') city  , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ')  country,  " + "   nvl(arprpool.pgoos,'N') pgoos, "
				+ " a.hotelid, e.selected, arp.accepted, a.affiliationid, arprpool.removalreasonid";

		String fromString = " FROM mfpdbo.hotel a , mfpdbo.brand_accounts b,  mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha, mfpdbo.accountrpflags arp, mfpdbo.accountrpflags_roompools arprpool, ";
		String whereString = " WHERE  (E.HOTELID (+) = A.HOTELID)   and b.affiliationid=a.affiliationid  AND (A.PARTITION_IDX ='M')	"
				+ "and hr.hotelrfpid=ha.hotelrfpid and ha.hotel_accountinfoid=arp.hotel_accountinfoid and a.hotelid=hr.hotelid  and ha.accountrecid=b.accountrecid  and arp.roompool=1  AND arp.hotel_accountinfoid = arprpool.hotel_accountinfoid  "
				+ " AND arp.roompool = arprpool.roomclassseq AND arprpool.roompoolseq = 1  ";
		String orderString = "  where (selected='N' or selected is null or accepted='N') " + " and affiliationid not in (select affiliationid from mfpdbo.exclude_aer) "
				+ " AND F.REMOVALREASONID = L.REMOVALREASONID (+) order by";

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
			fromString += " (select * from mfpdbo.accountdirectory where accountrecid = " + accountFilter.getAccountrecid() + ") e ";
			whereString += " and b.accountrecid=" + accountFilter.getAccountrecid();
		} else {
			fromString += " mfpdbo.accountdirectory e ";
		}

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
		 * Managed/Franchise Filter
		 */
		whereString += getManagedWhere(filterValues);

		whereString += getFilteredWhere(filterValues) + ") F  ";

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelGPPPGOOSListData.class);
		@SuppressWarnings("unchecked")
		List<HotelGPPPGOOSListData> hotelPGOOSListData = q.getResultList();
		return hotelPGOOSListData;
	}

	private String getFilteredWhere(PricingFilterSelections filterValues) {
		String whereString = "";
		if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() > 0 && !filterValues.getFilterString().equals("")) {
			String filterString = "";
			switch (filterValues.getFilterMatchField().intValue()) {
			case 0:
				filterString += " marshacode";
				break;
			case 1:
				filterString += " name";
				break;
			case 5:
				filterString += " city";
				break;
			case 6:
				filterString += " nvl(state, ' ')";
				break;
			case 7:
				filterString += " country";
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
			fromString += " MFPDBO.HOTELAREAREC C , ";
		return fromString;
	}

	private String getOrderby(PricingFilterSelections filterValues) {
		String orderString = "";
		switch (filterValues.getOrderBy()) {
		case 0:
			orderString += " marshacode asc";
			break;
		case 1:
			orderString += "  substr(NAME,1,36) ASC";
			break;
		case 2:
			orderString += " pgoos ASC";
			break;
		case 3:
			orderString += " nvl(pgoos, 'Y') asc, nvl(REMOVALREASON, 'No Reason Provided.') ASC , nvl(CITY, ' ')  ,   NAME  ASC";
			break;
		case 5:
			orderString += " NVL (city, ' ') asc , substr(NAME,1,36) ASC";
			break;
		case 6:
			orderString += "  nvl(STATE, ' ') asc, NVL (city, ' ') ASC ,  substr(NAME,1,36) ASC";
			break;
		case 7:
			orderString += "  NVL (country, ' ') asc,  nvl(STATE, ' ') ASC , NVL (city, ' ') ASC ,  substr(NAME,1,36) ASC";
			break;
		default:
			orderString += " nvl(COUNTRY, ' ') ASC ,  nvl(STATE, ' ') ASC , nvl(CITY, ' ')  ,  substr(NAME,1,36)  ASC";
			break;
		}
		return orderString;
	}

	public void updateHotelRFP(Long accountrecid, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_updatehotelrfp_bt(?, ?); end; ");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setString(2, user.getEid());
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

	}

	public void updateHotelGPPPgoosMaintanence(long accountrecid, List<HotelGPPPGOOSListData> hotelpgoosmaint, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.SP_UPDATEHOTELAERACCTPGOOS_HPP(?,?,?,?,?); end;  ");
				try {
					for (int i = 0; i < hotelpgoosmaint.size(); i++) {
						HotelGPPPGOOSListData hotelpgoos = hotelpgoosmaint.get(i);
						if (hotelpgoos.getChanged().equals("Y")) {
							Long removalreason = null;
							if ((hotelpgoos.getPgoos() != null && hotelpgoos.getPgoos().equals("Y")) || hotelpgoos.getRemovalreasonid() == null || hotelpgoos.getRemovalreasonid() == 0)
								removalreason = null;
							else
								removalreason = hotelpgoos.getRemovalreasonid();
							stmt.setLong(1, hotelpgoos.getHotelid());
							stmt.setLong(2, accountrecid);
							stmt.setString(3, hotelpgoos.getPgoos());
							stmt.setString(4, user.getEid());
							if (removalreason == null) {
								stmt.setNull(5, Types.INTEGER);
							} else {
								stmt.setLong(5, removalreason);
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
