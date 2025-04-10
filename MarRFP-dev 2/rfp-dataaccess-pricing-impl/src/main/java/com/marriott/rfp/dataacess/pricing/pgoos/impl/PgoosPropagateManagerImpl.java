package com.marriott.rfp.dataacess.pricing.pgoos.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.pgoos.api.PgoosPropagateManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.pgoos.PgoosLoad;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintAvail;
import com.marriott.rfp.object.pricing.pgoos.PgoosMaintSelected;
import com.marriott.rfp.object.pricing.pgoos.PgoosSelect;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;


@Service
public class PgoosPropagateManagerImpl implements PgoosPropagateManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<PgoosMaintAvail> findPgoosableHotelFilteredList(PricingFilterSelections filterValues, User user) {

		String selectString = " SELECT   ";
		String fromString = " FROM mfpdbo.hotel a , MFPDBO.HOTELWEBINFO B ";
		String whereString = " WHERE   (b.HOTELID (+) = A.HOTELID) ";
		String orderString = "order by ";
		
		/**
		 * Direct Select Filter
		 */
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
		
		
		/**
		 * Area Filter
		 */
		RegionFilterValue areaFilter = filterValues.getAreaFilter();
		if (areaFilter.getAreaOrRegion().equals("R")) {
			fromString += ", MFPDBO.HOTELAREAREC C ";
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

		/**
		 * Account Filter
		 */
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (accountFilter.getAccountrecid() > 0) {
			whereString += " AND EXISTS (Select * from mfpdbo.accountdirectory e, mfpdbo.account f ";
			String pgoosType = filterValues.getPgoosType();
			if (filterValues.isExcludeGPP()) {
				whereString += " , mfpdbo.hotel_accountinfo hai , mfpdbo.hotelrfp hrfp , mfpdbo.hotel htl ";
			}
			else if (pgoosType.equals("M") || pgoosType.equals("F") || pgoosType.equals("C") || 
					   pgoosType.equals("D") || pgoosType.equals("E") || pgoosType.equals("P") || pgoosType.equals("Z") ) {
				whereString += " , mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr , mfpdbo.accountrpflags ar, mfpdbo.accountrpflags_roompools arp ";
			}

			whereString += " where (e.accountrecid=f.accountrecid) " + " and (f.period=" + filterValues.getYear() + ") ";

			if (pgoosType.equals("M") || pgoosType.equals("F") || pgoosType.equals("C") || 
					   pgoosType.equals("D") || pgoosType.equals("E") || pgoosType.equals("P") || pgoosType.equals("Z") ) {
				whereString += "AND (hr.hotelid = A.hotelid  AND ha.hotelrfpid  = hr.hotelrfpid AND ha.accountrecid = e.accountrecid AND ar.hotel_accountinfoid = ha.hotel_accountinfoid  AND arp.hotel_accountinfoid = ha.hotel_accountinfoid) ";
			}
			if (pgoosType.equals("R") || pgoosType.equals("K")) { // relinquish
				// whereString
				if (filterValues.isExcludeGPP()) {
					whereString += " and ((e.weblocked='Y' and f.aer_account  <> 'Y' ) " + " or (f.aer_account = 'Y' AND f.process_aer = 'N' " + " AND mfpproc.fn_exclude_aer (htl.affiliationid) = 'N') or"
							+ "(e.weblocked='Y' and f.aer_account = 'Y' and mfpproc.fn_is_ritz_gpp(hai.hotel_accountinfoid) = 'N') or"
							+ "(f.aer_account = 'Y' AND f.process_aer = 'Y'  AND mfpproc.fn_exclude_aer (htl.affiliationid) = 'N' AND mfpproc.fn_is_ritz_gpp(hai.hotel_accountinfoid) = 'N')) "
							+ " and  hai.hotelrfpid = hrfp.hotelrfpid " + " and hrfp.hotelid = htl.hotelid " + " and e.hotelid = htl.hotelid " + " and f.accountrecid = hai.accountrecid "
							+ " and a.hotelid = htl.hotelid ";
				} else {
					whereString += " and (e.weblocked='Y' or (f.aer_account = 'Y' AND process_aer = 'Y' AND mfpproc.fn_exclude_aer (a.affiliationid) = 'N' AND mfpproc.fn_is_ritz_gpp_ah(a.affiliationid, f.accountrecid) = 'Y')) ";
				}
	
			} else if (pgoosType.equals("M") || pgoosType.equals("F") || pgoosType.equals("C") || 
					   pgoosType.equals("D") || pgoosType.equals("E") || pgoosType.equals("P") || pgoosType.equals("Z") ) {
				// run mcb
				whereString += " AND ((f.aer_account = 'Y'  AND f.process_aer = 'Y'  AND mfpproc.fn_exclude_aer (a.affiliationid) = 'N' AND mfpproc.fn_is_ritz_gpp(ha.hotel_accountinfoid) = 'Y') OR ((ar.accepted IN ('Y','P')) "
   						+ "  AND e.selected  = 'Y' AND e.nopricing  = 'N' )) AND f.locked  = 'Y' AND arp.pgoos  = 'Y'";
			}

			if (accountFilter.getAccountrecid() > 0) {
				whereString += " and e.accountrecid = " + accountFilter.getAccountrecid() + " ";
			}
			/**
			 * Not Accepted Only Filter
			 */
	
			if (filterValues.isNotAccepted()) {
				whereString += " and (e.accepted='N') ";
			}
			if (!(filterValues.isExcludeGPP())) {
				whereString += "  and a.hotelid=e.hotelid ";
			}
			whereString += "  )";
		}

		/**
		 * Hotels That Said Delete Only Filter
		 */
		if (filterValues.isHotelSaidDelete()) {
			fromString += " , mfpdbo.hotelrfp g ";
			whereString += " and g.hotelid=a.hotelid and g.delete_old_rateprogs='Y' and (g.period=" + filterValues.getYear() + ") ";
		}
		/**
		 * Affiliation Filter
		 */
		if (filterValues.getBrandlist() != null && filterValues.getBrandlist().size() > 0)
			whereString += " and a.affiliationid in (" + filterValues.getStringBrandList() + ")";

		/**
		 * user selected filter from find filter
		 */
		if (filterValues.getFilterMatchType() != -1 && filterValues.getFilterMatchField() != -1 && !filterValues.getFilterMatchField().equals("")) {
			String filterString = "";
			switch ((filterValues.getFilterMatchField().intValue())) {
			case 0:
				filterString += " a.marshacode";
				break;
			case 1:
				filterString += " a.name";
				break;
			case 2:
				filterString += " a.city";
				break;
			case 3:
				filterString += " nvl(a.state, ' ')";
				break;
			case 4:
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
		selectString += "  a.marshacode , substr(A.NAME,1,36) name ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country , nvl(B.FUTUREOPENING, 'N') futureopening,  a.hotelid ";
		whereString += " AND (A.PARTITION_IDX ='M') ";
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
			orderString += " nvl(B.FUTUREOPENING, 'N') asc, substr(A.NAME,1,36)  ASC";
			break;
		default:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		}

		String queryString = selectString + fromString + whereString + orderString;
		Query q = em.createNativeQuery(queryString, PgoosMaintAvail.class);
		@SuppressWarnings("unchecked")
		List<PgoosMaintAvail> pgoosMaintAvailList = q.getResultList();
		return pgoosMaintAvailList;

	}

	public String updatePgoosMaint(PricingFilterSelections filterValues, List<Long> pgoosSelect, User user) {
		Long accountrecid = filterValues.getAccountFilter().getAccountrecid();
		String byPeriod = filterValues.getByYear();
		String accounttype = filterValues.getAccountFilter().getAccountType();
		// String acctorRpgm = filterValues.getRPGMorAccount();
		String pgoosType = filterValues.getPgoosType();
		String notAccepted = filterValues.getNotAccepted();
		String excludeFlag = filterValues.getExcludeGPP();
		Long period = filterValues.getYear();
		String rpgms = filterValues.getStringRPGMList();
		
		Long total= 0L;
		Long totalAdded = 0L;

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_insert_pgoosmaint_aer_hpp( ?,?,?,?,?,?,?,?,?,?); end;");
				try {
					// stmt.setString(2, acctorRpgm);
					stmt.setLong(2, accountrecid);
					stmt.setString(3, accounttype);
					stmt.setLong(4, period);
					stmt.setString(5, pgoosType);
					stmt.setString(6, notAccepted);
					stmt.setString(7, excludeFlag);
					stmt.setString(8, byPeriod);
					stmt.setString(9, rpgms);
					stmt.setString(10, user.getEid());

					for (int i = 0; i < pgoosSelect.size(); i++) {
						Long hotelid = pgoosSelect.get(i);
						Long status=0L;
						if (hotelid != null) {
							stmt.setLong(1, hotelid);
							stmt.executeUpdate();
							// if (stmt.getInt(6) == 1) {
							// if (strHotels.length() > 0)
							// strHotels += ",";
							// strHotels += hotelid;
							// }
							if (accountrecid == 0){
								Query q = em.createNativeQuery("SELECT count(*) FROM mfpdbo.mcb_selection WHERE hotelid=" + hotelid, Long.class);
								try {
									status = (Long) q.getSingleResult();
								} catch (NoResultException ex) {
									status = 0L;
								}
							}
							total++;
						}
						if (status>0)
							totalAdded++;
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
		
		return totalAdded + " out of " + total + " added.";
	}

	public List<PgoosMaintSelected> findPgoosSelectedRecsFilteredList(PricingFilterSelections filterValues, User user) {
		List<PgoosMaintSelected> pgoosHotelList = null;
		if (filterValues.getYear() == 0)
			return pgoosHotelList;

		String selectString = " select hotelid, marshacode, name, accountname, accountdirid ,rpgms,  arownum "
				+ " from (SELECT  a.hotelid, a.marshacode, a.name, f.accountname, e.accountdirid , e.rpgms, nvl(A.COUNTRY, ' ') country ,  nvl(A.STATE, ' ') state , nvl(A.CITY, ' ') city , rownum arownum ";

		String fromString = " FROM mfpdbo.hotel a , MFPDBO.mcb_selection e, mfpdbo.account f  ";
		String whereString = " WHERE   (e.HOTELID = A.HOTELID)  and (e.eid = ?1) and (e.accountrecid  = f.accountrecid (+)) ";
		String orderString = "order by ";

		switch (filterValues.getOrderBy()) {
		case 0:
			orderString += " a.marshacode asc";
			break;
		case 1:
			orderString += "  A.NAME  ASC";
			break;
		case 2:
			orderString += " f.accountname  ASC";
			break;
		default:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  A.NAME  ASC";
			break;
		}
		orderString += ") where arownum<2001 "; // limit
		// to
		// the
		// first
		// 2000
		// rows
		String queryString = selectString + fromString + whereString + orderString;
		Query q = em.createNativeQuery(queryString, PgoosMaintSelected.class);
		q.setParameter(1, user.getEid());
		@SuppressWarnings("unchecked")
		List<PgoosMaintSelected> pgoosHotelLists = q.getResultList();
		return pgoosHotelLists;

	}

	public void deletePgoosMaint(List<PgoosSelect> pgoosSelect) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				for (int i = 0; i < pgoosSelect.size(); i++) {
					Long acdirid = pgoosSelect.get(i).getAccountdirid();
					Long hotelid = pgoosSelect.get(i).getHotelid();
					if (hotelid != 0) {
						if (acdirid != -1) {
							stmt = con.prepareCall("begin delete from mfpdbo.mcb_selection where accountdirid=?; end;");
							try {
								stmt.setLong(1, acdirid);
								stmt.execute();
							} finally {
								stmt.close();
							}
						} else {
							stmt = con.prepareCall("begin delete from mfpdbo.mcb_selection where accountdirid=-1 and hotelid=?; end;");
							try {
								stmt.setLong(1, hotelid);
								stmt.execute();
							} finally {
								stmt.close();
							}
						}
					}
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public void deleteMCB() {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con.prepareCall("begin delete from mfpdbo.mcb_selection; end;");
				try {
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public Long getPgoosBatchId() {
		String queryString = " select mfpdbo.pgoos_batchid_seq.nextval from dual ";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long num_batchid;
		try {
			num_batchid = (Long) q.getSingleResult();
		} catch (NoResultException ex) {
			num_batchid = 0L;
		}
		return num_batchid;
	}

	public Long getMCBCount() {
		String queryString = " select count(*) from mfpdbo.mcb_selection ";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long num_count;
		try {
			num_count = (Long) q.getSingleResult();
		} catch (NoResultException ex) {
			num_count = 0L;
		}
		return num_count;
	}

	public void deleteMCBRecord(Long accountrecid, Long hotelid) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con.prepareCall("begin delete from mfpdbo.mcb_selection where accountrecid=? and hotelid=?; end;");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setLong(2, hotelid);
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}


	public PgoosLoad findPgoosLoad() {

		String queryString = " select batchid, status, loadcreateuser eid, decode(cn_lastname, '',loadcreateuser,(cn_lastname ||', '||cn_firstname)) username "
				+ " from mfpdbo.pgoos_load a, mfpdbo.ds_user d " + " where a.loadcreateuser = d.eid(+) "
				+ " and a.batchid in ( select max(batchid) from mfpdbo.pgoos_load where loadtype = 'MCBLoad') ";

		Query q = em.createNativeQuery(queryString, PgoosLoad.class);
		PgoosLoad pgoosLoad = (PgoosLoad) q.getSingleResult();
		return pgoosLoad;

	}

	public void findMCBProdRecord() {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con
						.prepareCall("begin update mfpdbo.accountdirectory set sendproduct = 'Y' where accountdirid in (select accountdirid from mfpdbo.mcb_selection)  AND ( ((NVL(amenity_diff,'N') = 'Y') AND ( NVL(amenities_exempt,'N') = 'Y') ) OR (NVL(amenity_diff,'N') = 'N') ); end;");
				try {
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

	public void updateMCBProdRecord() {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con.prepareCall("begin update mfpdbo.accountdirectory set sendproduct = 'Y' where sendproduct = 'F'; end;");
				try {
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	}

}
