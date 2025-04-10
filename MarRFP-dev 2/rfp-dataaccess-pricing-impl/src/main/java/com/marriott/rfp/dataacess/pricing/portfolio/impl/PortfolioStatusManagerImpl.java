package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioStatusManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificPGOOSData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatus;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatusDO;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class PortfolioStatusManagerImpl
 */

@Service
public class PortfolioStatusManagerImpl implements PortfolioStatusManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<PortfolioStatusDO> findPortfolioStatus(PricingFilterSelections filterValues, User user) {
		
		if (user.getIsLimitedSalesUser()) {
			return findPortfolioStatus_user(filterValues, user);
		} else {
			return findPortfolioStatus_new(filterValues);
		}

	}
	
	public List<PortfolioStatusDO> findPortfolioStatus_new(PricingFilterSelections filterValues) {

		String selectString = " SELECT marshacode, hotelname, city, state, country, nopricing, subsetname, regionid, commissionable, hotelid, hotelrfpid, selected, volunteered, "
				+ " readonly, ratetype_selected, product_offered, acceptedrmpool, rejectionreasonrmpool, rejectreasonidrmpool, pgoosrmpool, removalreasonrmpool, "
				+ " removalreasonidrmpool,lra, mfpproc.fn_maxacct_roompool_rpe (hotel_accountinfoid) maxacctroompool, roomclassseq,roompoolseq "
				+ " FROM (  SELECT marshacode, hotelname, city, state, country, nopricing, subsetname, regionid, commissionable, hotelid, hotelrfpid, selected, "
				+ " volunteered, readonly, ratetype_selected, product_offered, hotel_accountinfoid, affiliationid, roomclassseq, roompoolseq, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN accepted ELSE NULL END acceptedrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN rejectreason ELSE NULL END rejectionreasonrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN rejectreasonid ELSE NULL END rejectreasonidrmpool,"
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN pgoos ELSE NULL END pgoosrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN removalreason ELSE NULL END removalreasonrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN removalreasonid ELSE NULL END removalreasonidrmpool,  "
				+ " lra"
				+ " FROM (SELECT a.marshacode, substr(a.name,1,36) hotelname, NVL (a.city, ' ') city, NVL (a.state, ' ') state, NVL (a.country, ' ') country, "
				+ " NVL (e.nopricing, 'Y') nopricing, NVL (m.regionname, ' ') subsetname, e.regionid, "
				+ " mfpproc.fn_getrule (h.hotel_accountinfoid, '1') commissionable, a.hotelid, g.hotelrfpid, e.selected, e.volunteered, "
				+ "  h.ratetype_selected, mfpproc.fn_get_rateproduct (h.ratetype_selected) product_offered, ar.roompool, "
				+ " h.hotel_accountinfoid, a.affiliationid, arp.roomclassseq, arp.roompoolseq, CASE WHEN ar.accepted = 'P' THEN 'Z' ELSE ar.accepted END accepted, "
				+ " CASE WHEN ar.accepted = 'N' THEN NVL (j.rejectionreason, 'No Reason Provided.') END rejectreason, "
				+ " CASE WHEN ar.accepted = 'N' THEN j.rejectreasonid END rejectreasonid, NVL (arp.pgoos, 'N') pgoos, "
				+ " CASE WHEN NVL (arp.pgoos, 'N') = 'N' THEN NVL (l.removalreason, 'No Reason Provided.') END removalreason, "
				+ " CASE WHEN arp.pgoos = 'N' THEN arp.removalreasonid END removalreasonid,"
				+ " ar.lra,"
				+ " mfpproc.fn_maxacct_roompool_rpe (h.hotel_accountinfoid) marmpool,"
				+ " mfpproc.fn_get_accountprice(h.hotel_accountinfoid,ar.roompool) ap,"
				+ " 'N' readonly ";
		
		String fromString = "  FROM mfpdbo.hotel a, mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h, mfpdbo.accountrpflags ar, "
				+ " mfpdbo.accountreject_ref j,  mfpdbo.pgoos_removal_ref l, mfpdbo.accountdirectory e, mfpdbo.region_lookup m, mfpdbo.accountrpflags_roompools   arp ";

		String whereString = " WHERE (a.hotelid = g.hotelid(+)) and a.partition_idx = 'M' ";
		String orderString = " order by ";
		
		whereString += getQuickSelect(filterValues);
		
		/**
		 * Area Filter
		 */
		fromString += getAreaFrom(filterValues);
		whereString += getAreaWhere(filterValues);
		
		/**
		 * Affiliation Filter
		 */
		whereString += getBrandWhere(filterValues);
		
		/**
		 * Managed/Franchise Filter
		 */
		whereString += getManagedWhere(filterValues);

		
		whereString += " and g.period = "+ filterValues.getYear() + " "
				+ " and g.hotelrfpid = h.hotelrfpid and h.hotel_accountinfoid = ar.hotel_accountinfoid  and ar.rejectreasonid = j.rejectreasonid(+) and arp.removalreasonid = l.removalreasonid(+) "
				+ " and h.accountrecid = e.accountrecid and e.hotelid=a.hotelid and e.regionid = m.regionid(+) and  ar.hotel_accountinfoid = arp.hotel_accountinfoid and ar.roompool = arp.roomclassseq";

		/**
		 * Account Filter
		 */
		//String outerWhereclause = "";
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (accountFilter.getAccountrecid() > 0) {
			whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
			if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
				whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
			if (accountFilter.getAccountstatus().equals("A")) {
				//outerWhereclause += " where (acceptedRmPool='Y' ) ";
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='Y' ) > 0) ";
				whereString += " and e.selected = 'Y' ";
			} else if (accountFilter.getAccountstatus().equals("REJ")) {
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='N' ) > 0) ";
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted IN ('P','Y') ) = 0) ";
			} else if (accountFilter.getAccountstatus().equals("PEN")) {
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='P' and roompool<=mfpproc.fn_maxacct_roompool_rpe (h.hotel_accountinfoid)) > 0) ";
			} else if (accountFilter.getAccountstatus().equals("S"))
				whereString += " and e.selected = 'Y' ";
			else if (accountFilter.getAccountstatus().equals("V"))
				whereString += " and e. volunteered = 'Y' ";
			else if (accountFilter.getAccountstatus().equals("SOL"))	
				whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
						+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
		}
		
		whereString += getFilteredWhere(filterValues);

		orderString += getOrderby(filterValues);
		if (orderString.trim().equals("order by"))
			orderString = "";


		String grpByString = "  GROUP BY marshacode,  hotelname,  city,  state,  country,  nopricing,  subsetname,  regionid,  commissionable,  hotelid, "
				+ " hotelrfpid,  hotel_accountinfoid, selected,  volunteered,  readonly,  ratetype_selected,  product_offered, "
				+ " affiliationid) acct ";

		String queryString = selectString + fromString + whereString + ")) " +   orderString ;
		Query q = em.createNativeQuery(queryString, PortfolioStatusDO.class);
		@SuppressWarnings("unchecked")
		List<PortfolioStatusDO> portfolioSelectedList = q.getResultList();
		return portfolioSelectedList;
	}
	
	
	public List<PortfolioStatusDO> findPortfolioStatus_user(PricingFilterSelections filterValues, User user) {

		String selectString = " SELECT marshacode, hotelname, city, state, country, nopricing, subsetname, regionid, commissionable, hotelid, hotelrfpid, selected, volunteered, "
				+ " readonly, ratetype_selected, product_offered, acceptedrmpool, rejectionreasonrmpool, rejectreasonidrmpool, pgoosrmpool, removalreasonrmpool, "
				+ " removalreasonidrmpool,lra, mfpproc.fn_maxacct_roompool_rpe (hotel_accountinfoid) maxacctroompool, roomclassseq,roompoolseq "
				+ " FROM (  SELECT marshacode, hotelname, city, state, country, nopricing, subsetname, regionid, commissionable, hotelid, hotelrfpid, selected, "
				+ " volunteered, readonly, ratetype_selected, product_offered, hotel_accountinfoid, affiliationid, roomclassseq, roompoolseq, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN accepted ELSE NULL END acceptedrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN rejectreason ELSE NULL END rejectionreasonrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN rejectreasonid ELSE NULL END rejectreasonidrmpool,"
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN pgoos ELSE NULL END pgoosrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN removalreason ELSE NULL END removalreasonrmpool, "
				+ " CASE WHEN  roompool <= marmpool AND ap='Y' THEN removalreasonid ELSE NULL END removalreasonidrmpool,  "
				+ " lra"
				+ " FROM (SELECT a.marshacode, substr(a.name,1,36) hotelname, NVL (a.city, ' ') city, NVL (a.state, ' ') state, NVL (a.country, ' ') country, "
				+ " NVL (e.nopricing, 'Y') nopricing, NVL (m.regionname, ' ') subsetname, e.regionid, "
				+ " mfpproc.fn_getrule (h.hotel_accountinfoid, '1') commissionable, a.hotelid, g.hotelrfpid, e.selected, e.volunteered, "
				+ "  h.ratetype_selected, mfpproc.fn_get_rateproduct (h.ratetype_selected) product_offered, ar.roompool, "
				+ " h.hotel_accountinfoid, a.affiliationid, arp.roomclassseq, arp.roompoolseq, CASE WHEN ar.accepted = 'P' THEN 'Z' ELSE ar.accepted END accepted, "
				+ " CASE WHEN ar.accepted = 'N' THEN NVL (j.rejectionreason, 'No Reason Provided.') END rejectreason, "
				+ " CASE WHEN ar.accepted = 'N' THEN j.rejectreasonid END rejectreasonid, NVL (arp.pgoos, 'N') pgoos, "
				+ " CASE WHEN NVL (arp.pgoos, 'N') = 'N' THEN NVL (l.removalreason, 'No Reason Provided.') END removalreason, "
				+ " CASE WHEN arp.pgoos = 'N' THEN arp.removalreasonid END removalreasonid,"
				+ " ar.lra,"
				+ " mfpproc.fn_maxacct_roompool_rpe (h.hotel_accountinfoid) marmpool,"
				+ " mfpproc.fn_get_accountprice(h.hotel_accountinfoid,ar.roompool) ap,"
				+ " 'N' readonly ";
		
		String fromString = "  FROM mfpdbo.hotel a, mfpdbo.hotelrfp g, mfpdbo.hotel_accountinfo h, mfpdbo.accountrpflags ar, "
				+ " mfpdbo.accountreject_ref j,  mfpdbo.pgoos_removal_ref l, mfpdbo.accountdirectory e, mfpdbo.region_lookup m, mfpdbo.accountrpflags_roompools   arp, "
				+ " mfpdbo.ds_user usr, mfpdbo.ds_propusers pro ";

		String whereString = " WHERE (a.hotelid = g.hotelid(+)) and a.partition_idx = 'M' ";
		String orderString = " order by ";
		
		whereString += getQuickSelect(filterValues);
		
		/**
		 * Area Filter
		 */
		fromString += getAreaFrom(filterValues);
		whereString += getAreaWhere(filterValues);
		
		/**
		 * Affiliation Filter
		 */
		whereString += getBrandWhere(filterValues);
		
		/**
		 * Managed/Franchise Filter
		 */
		whereString += getManagedWhere(filterValues);

		
		whereString += " and g.period = "+ filterValues.getYear() + " "
				+ " and g.hotelrfpid = h.hotelrfpid and h.hotel_accountinfoid = ar.hotel_accountinfoid  and ar.rejectreasonid = j.rejectreasonid(+) and arp.removalreasonid = l.removalreasonid(+) "
				+ " and h.accountrecid = e.accountrecid and e.hotelid=a.hotelid and e.regionid = m.regionid(+) and  ar.hotel_accountinfoid = arp.hotel_accountinfoid and ar.roompool = arp.roomclassseq";

		/**
		 * Account Filter
		 */
		//String outerWhereclause = "";
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (accountFilter.getAccountrecid() > 0) {
			whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
			if (accountFilter.getSubset() != null && !accountFilter.getSubset().equals(""))
				whereString += " and e.regionid = '" + accountFilter.getSubset() + "' ";
			if (accountFilter.getAccountstatus().equals("A")) {
				//outerWhereclause += " where (acceptedRmPool='Y') ";
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='Y' ) > 0) ";
				whereString += " and e.selected = 'Y' ";
			} else if (accountFilter.getAccountstatus().equals("REJ")) {
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='N' ) > 0) ";
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted IN ('P','Y') ) = 0) ";
			} else if (accountFilter.getAccountstatus().equals("PEN")) {
				whereString += " AND (( select count(*) from mfpdbo.accountrpflags where hotel_accountinfoid=h.hotel_accountinfoid and accepted='P' and roompool<=mfpproc.fn_maxacct_roompool_rpe (h.hotel_accountinfoid)) > 0) ";
			} else if (accountFilter.getAccountstatus().equals("S"))
				whereString += " and e.selected = 'Y' ";
			else if (accountFilter.getAccountstatus().equals("V"))
				whereString += " and e. volunteered = 'Y' ";
			else if (accountFilter.getAccountstatus().equals("SOL"))	
				whereString += "  and (exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + accountFilter.getAccountrecid() + " and x.hotelid=a.hotelid)) "
						+ " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
		}
		
		whereString += " and (usr.eid='" + StringUtility.replaceSingleQuotes(user.getEid()) + "') and usr.cn_userid=pro.cn_userid and pro.marshacode=a.marshacode ";
		
		whereString += getFilteredWhere(filterValues);

		orderString += getOrderby(filterValues);
		if (orderString.trim().equals("order by"))
			orderString = "";


		String grpByString = "  GROUP BY marshacode,  hotelname,  city,  state,  country,  nopricing,  subsetname,  regionid,  commissionable,  hotelid, "
				+ " hotelrfpid,  hotel_accountinfoid, selected,  volunteered,  readonly,  ratetype_selected,  product_offered, "
				+ " affiliationid) acct ";

		String queryString = selectString + fromString + whereString + ")) " + orderString ;
		
		Query q = em.createNativeQuery(queryString, PortfolioStatusDO.class);
		@SuppressWarnings("unchecked")
		List<PortfolioStatusDO> portfolioSelectedList = q.getResultList();
		return portfolioSelectedList;
	}
	
	
	private String getQuickSelect(PricingFilterSelections filterValues) {
		String whereString = "";
		if (filterValues.getList() != null && !filterValues.getList().equals("")) {
			List<String> hotellist = Arrays.asList(filterValues.getList().split(","));
			String finallist = "( ";
			for(int i=0; i<hotellist.size(); i++){
				if (i != (hotellist.size() - 1))
					finallist += "'" +hotellist.get(i).toUpperCase()+ "',";
				else
					finallist += "'" +hotellist.get(i).toUpperCase()+ "' ) ";
			}
			whereString += " and upper(a.marshacode) in ";
			whereString += finallist;
		}
		return whereString;
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
			orderString += " marshacode asc";
			break;
		case 1:
			orderString += "   hotelname  ASC";
			break;
		case 2:
		case 4:
		case 6:	
			orderString += " acceptedRmPool, marshacode asc";
			break;
		case 3:
		case 5:
		case 7:
			orderString += "  rejectionReasonRmPool asc ";
			break;
		case 8:
		case 10:
		case 12:
			orderString += " pgoosRmPool asc";
			break;
		case 9:
		case 11:
		case 13:		
			orderString += " pgoosRmPool,  removalReasonRmPool1 ASC ,  State ASC , City  ASC ,   hotelname  ASC";
			break;
		case 14:
			orderString += " product_offered asc";
			break;
		case 15:
			orderString += " subsetname asc";
			break;
		case 16:
			orderString += " commissionable asc";
			break;
		case 17:
			orderString += "  City  ASC ,   hotelname  ASC";
			break;
		case 18:
			orderString += "  State ASC , City  ASC ,   hotelname  ASC";
			break;
		case 19:
			orderString += " COUNTRY ASC ,  State ASC , City  ASC ,   hotelname  ASC";
			break;
		default:
			orderString += " COUNTRY ASC ,  State ASC , City  ASC ,   hotelname  ASC";
			break;
		}
		if(orderString == "") {
			orderString += " roomclassseq asc, roompoolseq asc";
		}else {
			orderString += ", roomclassseq asc, roompoolseq asc";
		}
		
		
		return orderString;
	}

	public void updatePortfolioStatusList(List<PortfolioStatus> pslist, Long accountrecid, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_updateportfoliostatus_hpp(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); end; ");
				try {
					

					for (PortfolioStatus portfolioStatus : pslist) {

						if ((portfolioStatus.getReadonly() == null || portfolioStatus.getReadonly().equals("N"))
								&& (portfolioStatus.getChanged().equals("Y"))) {
							stmt.setLong(1, portfolioStatus.getHotelid());
							stmt.setLong(2, accountrecid);
							List<HotelAccountSpecificRoomPoolData> roomPoolDetails = portfolioStatus.getRoomPoolData();
							if (roomPoolDetails != null && roomPoolDetails.size() > 0) {
								int rc1Index = -1;
								int rc2Index = -1;
								int rc3Index = -1;
								for(int i = 0 ;i < roomPoolDetails.size() ; i++) {
									if(roomPoolDetails.get(i).getRoompool() == 1 ) {
										rc1Index = i;										
									}else if(roomPoolDetails.get(i).getRoompool() == 2 ) {
										rc2Index = i;										
									}else if(roomPoolDetails.get(i).getRoompool() == 3 ) {
										rc3Index = i;
									}
								}
								
								if( rc1Index != -1 && getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("acceptedrm") != null) {
									stmt.setString(3, (String)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("acceptedrm"));
									stmt.setObject(4, (Object)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("rejectrm"), Types.NUMERIC);
									stmt.setString(5, (String)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("pgoosrm1"));
									stmt.setLong(6, (Long)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("removalId1"));
									stmt.setString(7, (String)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("pgoosrm2"));
									stmt.setLong(8, (Long)getPGOOSDetails(roomPoolDetails.get(rc1Index)).get("removalId2"));
								}else {
									stmt.setString(3, "Z");
									stmt.setObject(4, null);
									stmt.setString(5, null);
									stmt.setLong(6, 0);
									stmt.setString(7, null);
									stmt.setLong(8, 0);
								}
								if(rc2Index != -1 && getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("acceptedrm") != null) {
									stmt.setString(9, (String)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("acceptedrm"));
									stmt.setObject(10, (Object)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("rejectrm"), Types.NUMERIC);
									stmt.setString(11, (String)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("pgoosrm1"));
									stmt.setLong(12, (Long)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("removalId1"));
									stmt.setString(13, (String)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("pgoosrm2"));
									stmt.setLong(14, (Long)getPGOOSDetails(roomPoolDetails.get(rc2Index)).get("removalId2"));			
								}else {
									stmt.setString(9, "Z");
									stmt.setObject(10, null);
									stmt.setString(11, null);
									stmt.setLong(12, 0);
									stmt.setString(13, null);
									stmt.setLong(14, 0);
								}
								if(rc3Index != -1 && getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("acceptedrm") != null) {
									stmt.setString(15, (String)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("acceptedrm"));
									stmt.setObject(16, (Object)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("rejectrm"), Types.NUMERIC);
									stmt.setString(17, (String)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("pgoosrm1"));
									stmt.setLong(18, (Long)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("removalId1"));
									stmt.setString(19, (String)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("pgoosrm2"));
									stmt.setLong(20, (Long)getPGOOSDetails(roomPoolDetails.get(rc3Index)).get("removalId2"));	
								}else {
									stmt.setString(15, "Z");
									stmt.setObject(16, null);
									stmt.setString(17, null);
									stmt.setLong(18, 0);
									stmt.setString(19, null);
									stmt.setLong(20, 0);
								}
							}
							
							String commissionable = "N";
							if (portfolioStatus.getCommissionable() != null
									&& portfolioStatus.getCommissionable().equals("Y"))
								commissionable = "Y";
							stmt.setString(21, commissionable);
							stmt.setString(22, user.getShortRole());
							
							stmt.execute();
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

	private Map<String, Object> getPGOOSDetails(HotelAccountSpecificRoomPoolData hotelAccountSpecificRoomPoolData) {
		String acceptedrm = null;
		Long rejectrm = 0L;
		String pgoosrm1 ="N";
		Long removalId1 =0L;
		String pgoosrm2 ="N";
		Long removalId2 =0L;
		
		Map<String, Object> details = new HashMap<String, Object>();
		
		if (hotelAccountSpecificRoomPoolData.getAccepted() == null
				|| hotelAccountSpecificRoomPoolData.getAccepted().equals("X"))
			acceptedrm = null;
		else
			acceptedrm = hotelAccountSpecificRoomPoolData.getAccepted();

		if (acceptedrm == null || acceptedrm.equals("Y")
				|| hotelAccountSpecificRoomPoolData.getRejectreasonid() == null
				|| hotelAccountSpecificRoomPoolData.getRejectreasonid() == 0)
			rejectrm = null;
		else
			rejectrm = new Long(hotelAccountSpecificRoomPoolData.getRejectreasonid());
		HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData= null;
		
		if(hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData() != null && hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData().size()>0) {
		
			hotelAccountSpecificPGOOSData = hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData().get(0);
			if (hotelAccountSpecificPGOOSData.getPgoos() != null
					&& hotelAccountSpecificPGOOSData.getPgoos().equals("Y"))
				pgoosrm1 = "Y";
			
			if (pgoosrm1.equals("Y")
					|| hotelAccountSpecificPGOOSData.getRemovalreasonid() == null
					|| hotelAccountSpecificPGOOSData.getRemovalreasonid() == 0) {
				removalId1 = 0L;
			} else {
				removalId1 = hotelAccountSpecificPGOOSData.getRemovalreasonid();
			}
			
			hotelAccountSpecificPGOOSData = hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData().get(1);
			if (hotelAccountSpecificPGOOSData.getPgoos() != null
					&& hotelAccountSpecificPGOOSData.getPgoos().equals("Y"))
				pgoosrm2 = "Y";
			
			if (pgoosrm2.equals("Y")
					|| hotelAccountSpecificPGOOSData.getRemovalreasonid() == null
					|| hotelAccountSpecificPGOOSData.getRemovalreasonid() == 0) {
				removalId2 = 0L;
			} else {
				removalId2 = hotelAccountSpecificPGOOSData.getRemovalreasonid();
			}
		}
		
		details.put("acceptedrm", acceptedrm);
		details.put("rejectrm", rejectrm);
		details.put("pgoosrm1", pgoosrm1);
		details.put("removalId1", removalId1);
		details.put("pgoosrm2", pgoosrm2);
		details.put("removalId2", removalId2);
		
		return details;
	}

	public void updateAcceptancePortfolioStatusList(String acceptReject, List<PortfolioStatus> pslist, Long accountrecid, User user, int rejectionReasonID) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				String accepted = "N";
				if (acceptReject.equals("A"))
					accepted = "Y";

				stmt = con.prepareCall("begin  mfpproc.sp_updateportfolioaccept_hpp(?,?,?,?); end; ");
				try {
					stmt.setLong(2, accountrecid);
					stmt.setString(3, accepted);
					stmt.setInt(4, rejectionReasonID);
					for (int i = 0; i < pslist.size(); i++) {
						PortfolioStatus model = (PortfolioStatus) pslist.get(i);
						if (model.getReadonly().equals("N")) {
							stmt.setLong(1, model.getHotelid());
							stmt.execute();
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
