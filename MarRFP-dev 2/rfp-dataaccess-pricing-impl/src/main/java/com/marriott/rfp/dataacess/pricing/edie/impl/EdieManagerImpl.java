package com.marriott.rfp.dataacess.pricing.edie.impl;

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

import com.marriott.rfp.dataacess.pricing.edie.api.EdieManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.edie.EdieColumns;
import com.marriott.rfp.object.pricing.edie.EdieColumnsUpdate;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfile;
import com.marriott.rfp.object.pricing.edie.EdieProfileColumn;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class EdieManagerImpl
 */

@Service
public class EdieManagerImpl implements EdieManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<EdieProfile> getEdieProfiles() {

		String queryString = "select profile_id, profile_name from mfpdbo.edie_profile order by profile_name asc ";

		Query q = em.createNativeQuery(queryString, EdieProfile.class);

		List<EdieProfile> edieProfileList = q.getResultList();

		return edieProfileList;
	}

	public List<EdieHotelProfile> getEdieHotelProfiles() {

		String queryString = "select profile_id, profile_name from mfpdbo.hotel_profile order by profile_name asc ";

		Query q = em.createNativeQuery(queryString, EdieHotelProfile.class);

		@SuppressWarnings("unchecked")
		List<EdieHotelProfile> edieProfileList = q.getResultList();

		return edieProfileList;
	}

	public EdieHotelProfile getEdieHotelProfile(Long profileid) {

		String queryString = "select profile_id, profile_name from mfpdbo.hotel_profile where profile_id=?1 ";

		Query q = em.createNativeQuery(queryString, EdieHotelProfile.class);

		q.setParameter(1, profileid);
		EdieHotelProfile edieProfileList = (EdieHotelProfile) q.getSingleResult();

		return edieProfileList;
	}

	public String getEdieProfileName(long profileid) {

		String queryString = "SELECT   A.PROFILE_NAME  FROM  MFPDBO.EDIE_PROFILE A WHERE profile_id=" + profileid;
		Query q = em.createNativeQuery(queryString, String.class);
		String edieProfile = (String) q.getSingleResult();
		return edieProfile;
	}

	@SuppressWarnings("unchecked")
	public List<EdieColumns> getColumnsNotInEdieProfile(long profileid, String colfind) {

		String queryString = "SELECT   A.COLUMN_ID ,A.COLUMN_SEQ , A.COLUMN_LABEL,  decode(a.column_desc,null,'N','Y') column_hasDesc "
				+ " FROM   MFPDBO.EDIE_COLUMNS A  WHERE     (A.COLUMN_ID not in (SELECT   A.COLUMN_ID " + " FROM   MFPDBO.EDIE_PROFILE_COLUMN A  WHERE     (A.PROFILE_ID =" + profileid + "))) ";

		if (colfind != null)
			queryString += " AND upper(A.COLUMN_LABEL) like upper('%" + colfind + "%') ";

		queryString += " ORDER BY A.COLUMN_SEQ";

		Query q = em.createNativeQuery(queryString, EdieColumns.class);

		List<EdieColumns> edieColumnList = q.getResultList();

		return edieColumnList;

	}

	@SuppressWarnings("unchecked")
	public List<EdieColumns> getEdieProfileColumns(long profileid) {
		String queryString = "SELECT    A.COLUMN_ID , B.COLUMN_SEQ ,B.COLUMN_LABEL ,A.COLUMN_ORDER,  decode(b.column_desc,null,'N','Y') column_hasDesc "
				+ " FROM   MFPDBO.EDIE_PROFILE_COLUMN A  , MFPDBO.EDIE_COLUMNS B  WHERE     (B.COLUMN_ID = A.COLUMN_ID) " + "  AND (A.PROFILE_ID =" + profileid + ")  ORDER BY   A.COLUMN_ORDER ASC";
		Query q = em.createNativeQuery(queryString, EdieColumns.class);

		List<EdieColumns> edieColumnList = q.getResultList();

		return edieColumnList;

	}

	@SuppressWarnings("unchecked")
	public List<EdieColumnsUpdate> getEdieAllColumns(String colfind) {
		String queryString = "SELECT    A.COLUMN_SEQ ,A.COLUMN_LABEL, A.column_desc, a.epic_path, a.logic   FROM MFPDBO.EDIE_COLUMNS A ";
		if (colfind != null)
			queryString += " WHERE UPPER(A.COLUMN_LABEL) like UPPER('%" + colfind + "%') ";

		queryString += "ORDER BY A.COLUMN_SEQ ASC";
		Query q = em.createNativeQuery(queryString, EdieColumnsUpdate.class);

		List<EdieColumnsUpdate> edieColumnList = q.getResultList();

		return edieColumnList;
	}

	public String getEdieProfileColumnsDescription(long columnid) {
		String columnDesc = "";
		String queryString = "SELECT  a.column_desc  FROM   MFPDBO.EDIE_COLUMNS A  WHERE   A.COLUMN_ID  =" + columnid + " ";
		Query q = em.createNativeQuery(queryString, String.class);

		columnDesc = (String) q.getSingleResult();

		return columnDesc;
	}

	public void updateProfileName(long profileid, String profilename) {
		Query q = em.createNativeQuery("begin update mfpdbo.edie_profile set profile_name=?1 where profile_id = ?2; end; ");
		q.setParameter(1, profilename);
		q.setParameter(2, profileid);
		q.executeUpdate();
	}

	public void deleteProfileColumns(long profileid) {

		Query q = em.createNativeQuery("begin delete from mfpdbo.edie_profile_column where profile_id = ?1; end; ");
		q.setParameter(1, profileid);
		q.executeUpdate();
	}

	public void updateProfileColumns(long profileid, EdieProfileColumn edieColumns) {
		Query q = em.createNativeQuery("begin INSERT INTO MFPDBO.EDIE_PROFILE_COLUMN (PROFILE_ID , COLUMN_ID , COLUMN_ORDER )  VALUES (?1,?2,?3); end; ");
		q.setParameter(1, profileid);
		q.setParameter(2, edieColumns.getColumn_id());
		q.setParameter(3, edieColumns.getColumn_order());
		q.executeUpdate();
	}

	public void updateEdieColumnDescription(EdieColumns edieColumns) {

		Query q = em.createNativeQuery("begin update MFPDBO.EDIE_COLUMNS set column_desc=?1, epic_path=?2, logic=?3 where COLUMN_SEQ = ?4; end; ");
		q.setParameter(1, edieColumns.getColumn_desc());
		q.setParameter(2, edieColumns.getEpic_path());
		q.setParameter(3, edieColumns.getLogic());
		q.setParameter(4, edieColumns.getColumn_seq());
		q.executeUpdate();
	}

	public void deleteProfile(long profileid) {
		Query q = em.createNativeQuery("begin mfpproc.SP_DELETEEDIEPROFILE(?1); end; ");
		q.setParameter(1, profileid);
		q.executeUpdate();
	}

	public Long addProfile(String profilename, long copyprofileid) {
		Long profileid = new Long(0);
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_INSERTEDIEPROFILE(?, ?, ?)}");
				try {
					cstmt.setString(1, profilename);
					cstmt.setLong(2, copyprofileid);
					cstmt.registerOutParameter(3, Types.BIGINT);
					cstmt.execute();
					profileid = new Long(cstmt.getLong(3));
				} finally {
					cstmt.close();
				}

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		return profileid;
	}

	public Long addHotelProfile(String profilename) {
		Long profileid = new Long(0);
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_INSERTEDIEHOTELPROFILE(?, ?)}");
				try {
					cstmt.setString(1, profilename);
					cstmt.registerOutParameter(2, Types.BIGINT);
					cstmt.execute();
					profileid = new Long(cstmt.getLong(2));
				} finally {
					cstmt.close();
				}

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		return profileid;
	}

	public void deleteHotelProfile(long profileid) {
		Query q = em.createNativeQuery("begin mfpproc.SP_DELETEEDIEHOTELPROFILE(?1); end; ");
		q.setParameter(1, profileid);
		q.executeUpdate();
	}

	public void updateHotelProfileName(List<EdieHotelProfile> edieHotelProfile) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_UPDATEEDIEHOTELPROFILENAME(?, ?)}");
				try {
					for (int i = 0; i < edieHotelProfile.size(); i++) {
						if (edieHotelProfile.get(i).getChanged().equals("Y")) {
							cstmt.setLong(1, edieHotelProfile.get(i).getProfile_id());
							cstmt.setString(2, edieHotelProfile.get(i).getProfile_name());
							cstmt.execute();
						}
					}
				} finally {
					cstmt.close();
				}

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public List<HotelListData> findHotelProfileAvail(PricingFilterSelections filterValues, User user) {
		return findHotelProfile(filterValues, user, false);
	}

	public List<HotelListData> findHotelProfileSelected(PricingFilterSelections filterValues, User user) {
		return findHotelProfile(filterValues, user, true);
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

	private List<HotelListData> findHotelProfile(PricingFilterSelections filterValues, User user, boolean binProfile) {

		String selectString = "select DISTINCT A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid ";

		String fromString = " FROM mfpdbo.hotel a ";
		String whereString = " WHERE   a.partition_idx='M' ";
		String orderString = "order by ";

		if (user.getIsLimitedSalesUser()) {
			fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) " + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') " + "   AND (d.partition_idx = 'M')) k ";
			whereString += " and a.hotelid=k.hotelid  ";
		}

		whereString += " and a.hotelid ";
		if (!binProfile)
			whereString += " not ";
		whereString += " in (select hotelid from mfpdbo.hotel_profile_list where profile_id = " + filterValues.getHotelProfile() + ")";

		/**
		 * Area Filter
		 */
		fromString += getAreaFrom(filterValues);
		whereString += getAreaWhere(filterValues);

		/**
		 * Account Filter
		 */
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (!accountFilter.getAccountstatus().equals("ALL") && accountFilter.getAccountrecid() > 0) {
			fromString += " , MFPDBO.ACCOUNTDIRECTORY E , MFPDBO.ACCOUNT F, MFPDBO.HOTELRFP G, MFPDBO.HOTEL_ACCOUNTINFO H ";

			whereString += " AND (E.HOTELID = A.HOTELID) " + " AND (E.ACCOUNTRECID = F.ACCOUNTRECID) " + " AND (E.ACCOUNTRECID = F.ACCOUNTRECID) " + " AND (E.ACCOUNTRECID = H.ACCOUNTRECID) "
						+ " AND (H.HOTELRFPID = G.HOTELRFPID)  AND (G.HOTELID = A.HOTELID ) ";

			if (accountFilter.getHideNoPricing()) {
				whereString += " and e.nopricing = 'N' ";
			}
			String accountStatus = accountFilter.getAccountstatus();
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
			else if (accountStatus.equals("SOL")) 
				whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
						+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
			
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

		whereString += getFilteredWhere(filterValues);

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelListData.class);
		@SuppressWarnings("unchecked")
		List<HotelListData> hotelProfileList = q.getResultList();
		return hotelProfileList;
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
			orderString += "  e.regionid , substr(A.NAME,1,36)  ASC";
			break;
		default:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		}
		return orderString;
	}

	public void updateHotelProfile(long profileid, List<Long> hotelList) {
		Query q = em.createNativeQuery("begin  insert into mfpdbo.hotel_profile_list (profile_id, hotelid) values (?1, ?2); end; ");
		for (int i = 0; i < hotelList.size(); i++) {
			Long hotelid = hotelList.get(i);
			if (hotelid != null) {
				q.setParameter(1, profileid);
				q.setParameter(2, hotelid);
				q.executeUpdate();
			}
		}
	}

	public void deleteHotelProfile(long profileid, List<Long> hotelList) {
		Query q = em.createNativeQuery("begin  delete from mfpdbo.hotel_profile_list where profile_id= ?1 and hotelid= ?2; end;  ");
		for (int i = 0; i < hotelList.size(); i++) {
			Long hotelid = hotelList.get(i);
			if (hotelid != null) {
				q.setParameter(1, profileid);
				q.setParameter(2, hotelid);
				q.executeUpdate();
			}
		}
	}

	public void updateProfileUsage(long profileid, User user) {

		Query q = em.createNativeQuery("begin  insert into mfpdbo.edie_profile_usage (profile_id, date_ran, eid) values (?1, sysdate, ?2); end;  ");

		q.setParameter(1, profileid);
		q.setParameter(2, user.getEid());
		q.executeUpdate();
	}
}
