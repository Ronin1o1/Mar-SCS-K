package com.marriott.rfp.dataacess.pricing.sapp.impl;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.sapp.api.AccountOverviewManager;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.sapp.AccountOverview;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctOverviewGroup;
import com.marriott.rfp.object.pricing.sapp.ActualSpend;
import com.marriott.rfp.object.pricing.sapp.Agencies;
import com.marriott.rfp.object.pricing.sapp.BTOverview;
import com.marriott.rfp.object.pricing.sapp.BTProfile;
import com.marriott.rfp.object.pricing.sapp.BusinessGen;
import com.marriott.rfp.object.pricing.sapp.CateringExtendedStay;
import com.marriott.rfp.object.pricing.sapp.Competitor;
import com.marriott.rfp.object.pricing.sapp.Contacts;
import com.marriott.rfp.object.pricing.sapp.GenHist;
import com.marriott.rfp.object.pricing.sapp.GroupDetail;
import com.marriott.rfp.object.pricing.sapp.Leisure;
import com.marriott.rfp.object.pricing.sapp.Markets;
import com.marriott.rfp.object.pricing.sapp.RevStreamsDescription;
import com.marriott.rfp.object.pricing.sapp.Subsidiary;
import com.marriott.rfp.utility.StringUtility;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.apache.poi.util.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Session Bean implementation class PeriodManagerImpl
 */

@Service
public class AccountOverviewManagerImpl implements AccountOverviewManager {

	private static final Logger log = LoggerFactory.getLogger(AccountOverviewManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public AccountOverviewManagerImpl() {
	}

	public AccountOverview getAcctOverview(long accountrecid, long period) {

		long accountinfoid = getAccountInfoID(accountrecid);

		String queryString = " SELECT d.accountname, d.accountrecid, d.accounttype, to_char(d.lastupdatedate,'MM/DD/YYYY') lastupdatedate, d.chairman_ceo, "
				+ "d.accountacronym, d.account_global_reach, d.glb_region_id, d.glb_regional_market, d.association_type, "
				+ "d.nyse_symbol, d.url,  e.fin_resultfor, e.fin_resultregion, e.glb_employee,  " + "e.num_glb_traveler, e.fortunefive_rev,  e.rev, e.netincome, e.bus_trvl_toprating, "
				+ "e.annual_trvl_expense, e.annual_airspend, d.ultimatebusinessid, e.annl_assn_budget, e.rev_conv_mtgs, " + "d.accounttypedescription, e.num_assn_members, e.revstreamid FROM "
				+ "(SELECT a.accountinfoid, b.accountname, b.accountrecid, b.accounttype, a.lastupdatedate,a.chairman_ceo,  "
				+ "a.accountacronym, a.account_global_reach, a.glb_region_id, a.glb_regional_market,a.association_type, " + "a.nyse_symbol, a.url, c.accounttypedescription, b.ultimatebusinessid "
				+ "FROM mfpdbo.accountinfo a,  (select a.accountname, a.accountrecid, a.accounttype, aml.ultimatebusinessid from mfpdbo.account a, mfpdbo.account_mcad_lookup aml  "
				+ "where a.accountrecid=aml.accountrecid (+) " + " and a.accountrecid = ?1 and a.period = ?2 " + " and rownum=1) b, mfpdbo.ACCOUNTTIERTYPE_REF C "
				+ "WHERE b.accountrecid = a.accountrecid (+)  " + "AND b.ACCOUNTTYPE=c.accounttype ) D, "
				+ "(SELECT f.accountinfoid, f.fin_resultfor, f.fin_resultregion, f.glb_employee, f.num_glb_traveler, f.fortunefive_rev, "
				+ "f.rev, f.netincome, f.bus_trvl_toprating, f.annual_trvl_expense, f.annual_airspend, f.annl_assn_budget, " + "f.rev_conv_mtgs, f.revstreamid, f.num_assn_members "
				+ "FROM mfpdbo.accountinfo_hist_acct_bt f " + "WHERE f.accountinfoid = ?3 " + " AND f.revstreamid = 1 ) E " + " WHERE D.accountinfoid = E.accountinfoid (+)";

		Query q = em.createNativeQuery(queryString, AccountOverview.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, period);
		q.setParameter(3, accountinfoid);
		AccountOverview acctOverview = (AccountOverview) q.getSingleResult();
		return acctOverview;

	}

	private long getAccountInfoID(long accountrecid) {
		try {

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			java.sql.CallableStatement cstmt = con.prepareCall("begin ? := mfpproc.FN_GET_ACCOUNTINFOID(?); end; ");
			cstmt.registerOutParameter(1, Types.NUMERIC);
			cstmt.setLong(2, accountrecid);

			try {
				cstmt.execute();
				return cstmt.getLong(1);
			} finally {
				cstmt.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}

		return 0;
	}

	@SuppressWarnings("unchecked")
	public List<Contacts> getAcctOverviewContactTypes(long contacttypeid, long revstreamid) {

		String queryString = "SELECT  contactTypeID, CONTACTTYPEDESC heading ,  sequence ,  istitleorregion ";
		if (contacttypeid == 9 && revstreamid == 0) {
			queryString += " , REVSTREAMID revStreamType, REVSTREAMNAME revStreamName ";
		}
		queryString += "FROM MFPDBO.ACCOUNTINFO_CONTACTTYPE ";
		if (contacttypeid == 9 && revstreamid == 0) {
			queryString += ", MFPDBO.ACCOUNTINFO_REVSTREAM_REF ";
		}
		if (contacttypeid != -1) {
			if (contacttypeid != 9 && contacttypeid != 1 && contacttypeid != 14 && contacttypeid != 15 && contacttypeid != 16 && contacttypeid != 24 && contacttypeid != 25)
				queryString += "WHERE CONTACTTYPEID not in (1,9,14,15,16,22,23,24,25,26,27,28,29) ";
			else
				queryString += "WHERE CONTACTTYPEID = " + contacttypeid;
			queryString += " ORDER BY sequence ";
		}

		Query q = em.createNativeQuery(queryString, Contacts.class);
		List<Contacts> acctOverviewContacts = q.getResultList();
		return acctOverviewContacts;
	}

	public List<Contacts> getAcctOverviewUnusedContactTypes(long accountrecid) {

		String queryString = "SELECT  contactTypeID, CONTACTTYPEDESC heading ,  sequence ,  istitleorregion "
				+ "FROM MFPDBO.ACCOUNTINFO_CONTACTTYPE WHERE CONTACTTYPEID not in (1,9,14,15,16,22,23,24,25,26,27,28,29) "
				+ "AND contacttypeid NOT IN (SELECT a.contacttypeid FROM mfpdbo.accountinfo_contacts a, mfpdbo.accountinfo b WHERE b.accountrecid = ?1 AND b.accountinfoid = a.accountinfoid "
				+ " and (a.contactname is not null or a.contactphone is not null or a.contacttitle is not null or contactemail is not null) ) " + " ORDER BY heading ";

		Query q = em.createNativeQuery(queryString, Contacts.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<Contacts> acctOverviewContacts = q.getResultList();
		return acctOverviewContacts;
	}

	@SuppressWarnings("unchecked")
	public List<Contacts> getAcctOverviewContacts(long accountrecid, long contacttypeid, long revstreamid) {

		String queryString = "SELECT A.CONTACTNAME name, A.CONTACTPHONE phone,  A.CONTACTTITLE title, A.CONTACTEMAIL email, A.CONTACTTYPEID , "
				+ "A.CONTACTADDRESS address, A.CONTACTCITY city, A.CONTACTSTATE state, A.CONTACTZIP zip, A.CONTACTCOUNTRY country, "
				+ "B.ACCOUNTRECID accountrecid, B.ACCOUNTINFOID accountinfoid, A.CONTACTPROVINCE province ";

		if (contacttypeid == 9) {
			queryString += " ,	a.influence_type buyerInfluence, a.influence_other buyerInfOther, a.area_resp buyerResponsibility, a.ind_membership buyerMemberships, "
					+ " a.comments buyerComments, a.cust_base buyerCustBase, a.buyer_type buyerType, a.buyer_other buyerOther, a.revstreamid revStreamType, "
					+ " a.accountinfo_contactid accountinfoContactId, a.regionid regionid ";
		}

		queryString += " FROM mfpdbo.ACCOUNTINFO_CONTACTS A, mfpdbo.ACCOUNTINFO B ";

		queryString += "WHERE (B.ACCOUNTRECID = " + accountrecid + ") AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) ";

		if (contacttypeid != 9 && contacttypeid != 1 && contacttypeid != 14 && contacttypeid != 15 && contacttypeid != 16)
			queryString += "AND CONTACTTYPEID not in (1,9,14,15,16) ";
		else {
			if (contacttypeid == 9 && revstreamid != 0) {
				queryString += "AND CONTACTTYPEID = " + contacttypeid;
				queryString += " AND REVSTREAMID = " + revstreamid;
			} else
				queryString += "AND CONTACTTYPEID = " + contacttypeid;
		}
		if (contacttypeid == 9) {
			queryString += " ORDER BY accountinfo_contactid ";
		} else
			queryString += " ORDER BY CONTACTTYPEID ";

		Query q = em.createNativeQuery(queryString, Contacts.class);
		List<Contacts> acctOverviewContacts = q.getResultList();
		return acctOverviewContacts;

	}

	public List<Contacts> getAcctOverviewTeamMembers(long accountrecid) {

		String queryString = "SELECT A.CONTACTNAME name, A.CONTACTPHONE phone,  A.CONTACTTITLE title, A.CONTACTEMAIL email, A.CONTACTTYPEID , "
				+ "A.CONTACTADDRESS address, A.CONTACTCITY city, A.CONTACTSTATE state, A.CONTACTZIP zip, A.CONTACTCOUNTRY country, "
				+ "B.ACCOUNTRECID , B.ACCOUNTINFOID , A.CONTACTPROVINCE province, c.contacttypeid, c.contacttypedesc heading, c.sequence, c.istitleorregion "
				+ " FROM mfpdbo.ACCOUNTINFO_CONTACTS A, mfpdbo.ACCOUNTINFO B, mfpdbo.accountinfo_contacttype c WHERE (B.ACCOUNTRECID = " + accountrecid
				+ ") AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) AND a.contacttypeid = c.contacttypeid AND a.CONTACTTYPEID not in (1,9,14,15,16,22,23,24,25,26,27,28,29)"
				+ "and (a.contactname is not null or a.contactphone is not null or a.contacttitle is not null or contactemail is not null)  ORDER BY heading ";

		Query q = em.createNativeQuery(queryString, Contacts.class);
		@SuppressWarnings("unchecked")
		List<Contacts> acctOverviewContacts = q.getResultList();
		return acctOverviewContacts;

	}

	public void updateAcctOverviewsGen(AccountOverview account, long period, long accountrecid, String loginName) {

		try {

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);

				Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_GEN(?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )}");
				query.setParameter(1, account.getChairman_ceo());
				query.setParameter(2, account.getAccountacronym());
				query.setParameter(3, account.getAccount_global_reach());
				query.setParameter(4, account.getGlb_region_id());
				query.setParameter(5, account.getGlb_regional_market());
				query.setParameter(6, account.getAssociation_type());
				query.setParameter(7, account.getNyse_symbol());
				query.setParameter(8, account.getUrl());
				query.setParameter(9, account.getFin_resultfor());
				query.setParameter(10, account.getFin_resultregion());
				query.setParameter(11, account.getGlb_employee());
				query.setParameter(12, account.getNum_glb_traveler());
				query.setParameter(13, account.getFortunefive_rev());
				query.setParameter(14, account.getRev());
				query.setParameter(15, account.getNetincome());
				query.setParameter(16, account.getBus_trvl_toprating());
				query.setParameter(17, account.getAnnual_trvl_expense());
				query.setParameter(18, account.getAnnual_airspend());
				query.setParameter(19, account.getNum_assn_members());
				query.setParameter(20, account.getAnnl_assn_budget());
				query.setParameter(21, account.getRev_conv_mtgs());
				query.setParameter(22, accountrecid);
				query.executeUpdate();
				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public void updateAcctOverviewContacts(List<Contacts> list, long accountrecid, String loginName) {

		Long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOVERVIEW_CONTACT(?, ?, ?, ?,  ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				for (Contacts contact : list) {
					if (null != contact){
						query.setParameter(1, contact.getContactTypeID());
						query.setParameter(2, accountinfoid);
						query.setParameter(3, contact.getName());
						query.setParameter(4, contact.getAddress());
						query.setParameter(5, contact.getCity());
						query.setParameter(6, contact.getState());
						query.setParameter(7, contact.getZip());
						query.setParameter(8, contact.getCountry());
						query.setParameter(9, contact.getEmail());
						query.setParameter(10, contact.getPhone());
						query.setParameter(11, contact.getTitle());
						query.setParameter(12, contact.getProvince());
						query.setParameter(13, contact.getBuyerInfluence());
						query.setParameter(14, contact.getBuyerInfOther());
						query.setParameter(15, contact.getBuyerResponsibility());
						query.setParameter(16, contact.getBuyerMemberships());
						query.setParameter(17, contact.getBuyerComments());
						query.setParameter(18, contact.getBuyerCustBase());
						query.setParameter(19, contact.getBuyerOther());
						query.setParameter(20, contact.getRevStreamType());
						query.setParameter(21, contact.getEid());
						query.executeUpdate();
					}
				}
				audit.deleteAuditUser(con);
			} catch (Exception ex) {
				log.error(ex.getMessage(),ex);
			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public String getLastUpdate(long accountrecid, String pgName) {

		String returnValue = "";
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

		try {
			long accountinfoid = getAccountInfoID(accountrecid);
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			java.sql.CallableStatement cstmt = con.prepareCall("begin ? := mfpproc.fn_get_lastupdatedatestamp(?, ?); end; ");
			cstmt.registerOutParameter(1, Types.DATE);
			cstmt.setLong(2, accountinfoid);
			cstmt.setString(3, pgName);

			try {
				cstmt.execute();
				Date d = cstmt.getDate(1);
				if (d != null) {
					returnValue = sdf.format(d);
				}
			} finally {
				cstmt.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
		return returnValue;
	}

	public GenHist getAcctOverviewGenHist(long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);

		String queryString = "  SELECT d.accountrecid, d.company_internal_code, d.room_nts_rev, d.mar_tracking, " + "d.compliance, f.num_hotelbid, f.num_accptdhotels, f.num_hotel_per_mrdw, "
				+ "f.ttl_hotel_directory, f.directoryshare_pct, f.mar_rewards_mmbrs, NVL(d.ttlglb_mar_room_rev,0) ttlglb_mar_room_rev, d.ttlglb_mar_room_nts, "
				+ "NVL(d.ttlglb_hotelspend_rev,0) ttlglb_hotelspend_rev, d.ttlglb_hotelspend_nts, NVL(d.ttlglb_pct_marspend_rev,0) ttlglb_pct_marspend_rev, d.ttlglb_pct_marspend_nts, "
				+ "d.ttlmar_rev, d.ttlmar_nts, d.ttlgroup_rev, d.ttlgroup_nts, d.ttl_bt_rev, d.ttl_bt_nts "
				+ "FROM (SELECT b.accountinfoid, A.ACCOUNTRECID, A.COMPANY_INTERNAL_CODE, B.ROOM_NTS_REV, B.MAR_TRACKING, " + "B.COMPLIANCE, B.TTLGLB_MAR_ROOM_REV, B.TTLGLB_MAR_ROOM_NTS, "
				+ "B.TTLGLB_HOTELSPEND_REV, B.TTLGLB_HOTELSPEND_NTS, B.TTLGLB_PCT_MARSPEND_REV, B.TTLGLB_PCT_MARSPEND_NTS, "
				+ "B.TTLMAR_REV, B.TTLMAR_NTS, B.TTLGROUP_REV, B.TTLGROUP_NTS, B.TTL_BT_REV, B.TTL_BT_NTS " + "FROM MFPDBO.ACCOUNT A, MFPdbo.ACCOUNTINFO B "
				+ "WHERE A.ACCOUNTRECID = B.ACCOUNTRECID (+) " + "AND B.ACCOUNTINFOID = ?1) D, " + "(SELECT c.accountinfoid, C.NUM_HOTELBID, C.NUM_ACCPTDHOTELS, C.NUM_HOTEL_PER_MRDW, "
				+ "C.TTL_HOTEL_DIRECTORY, C.DIRECTORYSHARE_PCT, C.MAR_REWARDS_MMBRS " + "FROM MFPDBO.ACCOUNTINFO_HIST_ACCT_BT C " + "WHERE ACCOUNTINFOID = ?2 AND C.revstreamid = 1 ) F "
				+ "WHERE d.accountinfoid = f.accountinfoid (+) ";

		Query q = em.createNativeQuery(queryString, GenHist.class);
		q.setParameter(1, accountinfoid);
		q.setParameter(2, accountinfoid);
		GenHist acctOverviewGenHist = null;
		try {
			acctOverviewGenHist = (GenHist) q.getSingleResult();
		} catch (NoResultException ex) {
			acctOverviewGenHist = new GenHist();
		}
		return acctOverviewGenHist;

	}

	@SuppressWarnings("unchecked")
	public List<ActualSpend> findAcctOverviewActualSpend(long accountrecid, String type) {

		long accountinfoid = getAccountInfoID(accountrecid);
		String queryString = "";

		if (type.equals("afl")) {
			queryString = "SELECT B.AFFILIATIONID, B.AFFILIATIONNAME, A.ROOM_NTS, A.REV, A.ACCOUNTINFOID , A.ACCTACTLSPENDID FROM "
					+ "(SELECT ACCOUNTINFOID, AFFILIATIONID, ROOM_NTS, REV, ACCTACTLSPENDID " + "FROM MFPDBO.ACCOUNTINFO_ACTUALSPEND " + "WHERE ACCOUNTINFOID = ?1) A ,"
					+ "(SELECT AFFILIATIONID, AFFILIATIONNAME " + "FROM MFPDBO.HOTELAFFILIATION " + "WHERE PARENTID = 990) B " + "WHERE A.AFFILIATIONID (+) = B.AFFILIATIONID "
					+ "ORDER BY B.AFFILIATIONNAME ";
		}

		if (type.equals("rgn")) {
			queryString = "SELECT B.REGIONID, B.REGIONNAME, A.ROOM_NTS, A.REV, A.ACCOUNTINFOID, A.ACCTACTLSPENDID FROM " + "(SELECT ACCOUNTINFOID, REGIONID, ROOM_NTS, REV , ACCTACTLSPENDID "
					+ "FROM MFPDBO.ACCOUNTINFO_ACTUALSPEND " + "WHERE ACCOUNTINFOID = ?1) A ," + "(SELECT REGIONID, REGIONNAME " + "FROM MFPDBO.REGION_REF " + "WHERE REGIONSTATUS='Y' AND REGIONID NOT IN (1,2)) B "
					+ "WHERE A.REGIONID (+) = B.REGIONID " + "ORDER BY B.REGIONNAME ";
		}

		Query q = em.createNativeQuery(queryString, ActualSpend.class);
		q.setParameter(1, accountinfoid);
		List<ActualSpend> acctOverviewActualSpend = q.getResultList();
		return acctOverviewActualSpend;
	}

	@SuppressWarnings("unchecked")
	public List<Competitor> getAcctOverviewCompetitor(long accountrecid) {

		List<Competitor> resultList = new ArrayList<Competitor>();
		long accountinfoid = getAccountInfoID(accountrecid);

		String queryStringMar = "SELECT accountinfoid, suppliername, share_percent, seqid " + "FROM MFPDBO.ACCOUNTINFO_COMPETITOR WHERE (ACCOUNTINFOID = ?1) "
				+ "AND UPPER(SUPPLIERNAME) = 'MARRIOTT' ";

		String queryString = "SELECT accountinfoid, suppliername, share_percent, seqid " + "FROM MFPDBO.ACCOUNTINFO_COMPETITOR WHERE (ACCOUNTINFOID = ?1) " + "AND UPPER(SUPPLIERNAME) <> 'MARRIOTT' "
				+ "ORDER BY SEQID ";

		Query q = em.createNativeQuery(queryStringMar, Competitor.class);
		q.setParameter(1, accountinfoid);
		List<Competitor> acctOverviewCompetitorMar = q.getResultList();

		if (acctOverviewCompetitorMar != null && acctOverviewCompetitorMar.size() > 0) {
			for (Competitor actCompMar : acctOverviewCompetitorMar) {
				resultList.add(actCompMar);
			}
		}

		q = em.createNativeQuery(queryString, Competitor.class);
		q.setParameter(1, accountinfoid);
		List<Competitor> acctOverviewCompetitor = q.getResultList();

		if (acctOverviewCompetitor != null && acctOverviewCompetitor.size() > 0) {
			for (Competitor actComp : acctOverviewCompetitor) {
				resultList.add(actComp);
			}
		}

		return resultList;

	}

	public void updateAcctOverviewCompetitor(Map<Integer, Competitor> pctMap, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call MFPPROC.SP_UPDATE_ACCTOV_COMPETITOR(?, ?, ?, ?)}");
		for (Integer key : pctMap.keySet()) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, pctMap.get(key).getSuppliername());
			query.setParameter(3, pctMap.get(key).getShare_percent());
			query.setParameter(4, pctMap.get(key).getSeqid());
			query.executeUpdate();
		}
	}

	public void updateAcctOverviewActualSpend(Map<Long, ActualSpend> actualSpendMap, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call MFPPROC.SP_UPDATE_ACCTOV_ACTUALSPEND(?, ?, ?, ?, ?, ?)}");
		for (Long key : actualSpendMap.keySet()) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, "R");
			query.setParameter(3, actualSpendMap.get(key).getRegionid());
			query.setParameter(4, null);
			query.setParameter(5, actualSpendMap.get(key).getRev());
			query.setParameter(6, actualSpendMap.get(key).getRoom_nts());
			query.executeUpdate();
		}

	}

	public void updateAcctOverviewsGenHist(GenHist genHist, long accountrecid) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_UPDATE_ACCTOV_GENHIST(?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountrecid);
		query.setParameter(2, genHist.getRoom_nts_rev());
		query.setParameter(3, genHist.getMar_tracking());
		query.setParameter(4, genHist.getCompliance());
		query.setParameter(5, genHist.getTtlglb_mar_room_rev());
		query.setParameter(6, genHist.getTtlglb_mar_room_nts());
		query.setParameter(7, genHist.getTtlglb_hotelspend_rev());
		query.setParameter(8, genHist.getTtlglb_hotelspend_nts());
		query.setParameter(9, genHist.getTtlglb_pct_marspend_rev());
		query.setParameter(10, genHist.getTtlglb_pct_marspend_nts());
		query.setParameter(11, genHist.getTtlmar_rev());
		query.setParameter(12, genHist.getTtlmar_nts());
		query.setParameter(13, genHist.getTtlgroup_rev());
		query.setParameter(14, genHist.getTtlgroup_nts());
		query.setParameter(15, genHist.getTtl_bt_rev());
		query.setParameter(16, genHist.getTtl_bt_nts());
		query.setParameter(17, genHist.getNum_hotelbid());
		query.setParameter(18, genHist.getNum_accptdhotels());
		query.setParameter(19, genHist.getNum_hotel_per_mrdw());
		query.setParameter(20, genHist.getTtl_hotel_directory());
		query.setParameter(21, genHist.getDirectoryshare_pct());
		query.setParameter(22, genHist.getMar_rewards_mmbrs());
		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	public BusinessGen findAcctOverviewBusinessGen(long accountrecid) {

		BusinessGen busGen = new BusinessGen();
		String queryString = "select b.accountinfotext_id, b.accountinfoid, b.mar_acctstrategy_obj, b.mar_vulnerabilities, " + " b.acct_acctindtrends, b.divisions, a.healthtext"
				+ " from mfpdbo.ACCOUNTINFO a, mfpdbo.ACCOUNTINFO_STRATEGY b" + " where a.accountinfoid = b.accountinfoid and a.accountrecid = ?1 ";

		Query q = em.createNativeQuery(queryString, BusinessGen.class);
		q.setParameter(1, accountrecid);
		List<BusinessGen> businessGen = q.getResultList();
		if (businessGen != null && businessGen.size() > 0) {
			busGen = businessGen.get(0);
		}

		return busGen;
	}

	@SuppressWarnings("unchecked")
	public List<Subsidiary> findAcctOverviewSubsidiaries(long accountrecid) {

		String queryString = "SELECT A.DIVNAME, A.RECID, B.ACCOUNTINFOID " + "FROM mfpdbo.ACCOUNTDIVISION A, mfpdbo.ACCOUNTINFO B " + "WHERE (B.ACCOUNTRECID = ?1)"
				+ "AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) ORDER BY RECID ASC ";

		Query q = em.createNativeQuery(queryString, Subsidiary.class);
		q.setParameter(1, accountrecid);
		List<Subsidiary> subs = q.getResultList();
		return subs;
	}

	public void updateAcctOverviewBusinessGen(BusinessGen acctPerspective, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);

		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BUSINESS_GEN(?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, acctPerspective.getMar_acctstrategy_obj());
		query.setParameter(3, acctPerspective.getMar_vulnerabilities());
		query.setParameter(4, acctPerspective.getAcct_acctindtrends());
		query.setParameter(5, acctPerspective.getDivisions());
		query.setParameter(6, acctPerspective.getHealthtext());
		query.executeUpdate();
	}

	public void updateAcctOverviewSubsidiaries(List<Subsidiary> subs, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_SUBSIDIARIES(?, ?, ?)}");
		for (Subsidiary sub : subs) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, sub.getRecid());
			query.setParameter(3, sub.getDivname());
			query.executeUpdate();
		}

	}

	public void updateAcctOverviewInitList(List<AcctInitiatives> inits, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_INITLIST(?, ?, ?, ?, ?)}");
		for (AcctInitiatives init : inits) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, init.getSeqid());
			query.setParameter(3, init.getInitiative_name());
			query.setParameter(4, init.getRevstreamid());
			query.setParameter(5, init.getAcctinitiativeid());
			query.executeUpdate();
		}

	}

	@SuppressWarnings("unchecked")
	public List<AcctInitiatives> getAcctOverviewInitList(long accountrecid, long revstreamid) {

		long accountinfoid = getAccountInfoID(accountrecid);

		String queryString = "SELECT A.initiative_name, A.revstreamid, A.seqid, A.acctinitiativeid " + "FROM mfpdbo.ACCOUNTINFO_INITIATIVES A "
				+ "WHERE (A.ACCOUNTINFOID = ?1) and A.BUYINGLOCID is null AND (A.revstreamid = ?2) ORDER BY SEQID ASC ";

		Query q = em.createNativeQuery(queryString, AcctInitiatives.class);
		q.setParameter(1, accountinfoid);
		q.setParameter(2, revstreamid);
		List<AcctInitiatives> initiatives = q.getResultList();
		return initiatives;

	}

	@SuppressWarnings("unchecked")
	public AcctInitiatives findAcctOverviewInitiatives(String action, long accountrecid, long seqId, long revStreamType, long buyinglocid) {

		String queryString = "";

		if (action.equals("AccountPerspective")) {
			queryString = "select a.acctinitiativeid, a.accountinfoid, a.seqid, a.initiative_name, a.areaplanid," + " a.plan_tm_lead, a.init_date, a.action, a.goal, a.revstreamid, a.revstream_other,"
					+ " a.objective, a.exec_plan, a.value_mar, a.value_act, a.results, a.comments" + " from mfpdbo.ACCOUNTINFO_INITIATIVES a, mfpdbo.ACCOUNTINFO b, mfpdbo.ACCOUNTINFO_REVSTREAM_REF c"
					+ " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1 and a.seqid = ?2 and a.BUYINGLOCID is null and a.revstreamid=c.REVSTREAMID and a.revstreamid = ?3";
		}

		if (action.equals("BuyingLocations")) {
			queryString = "select a.acctinitiativeid, a.accountinfoid, a.seqid, a.initiative_name, a.areaplanid," + " a.plan_tm_lead, a.init_date, a.action, a.goal, a.revstreamid, a.revstream_other,"
					+ " a.objective, a.exec_plan, a.value_mar, a.value_act, a.results, a.comments, a.buyinglocid "
					+ " from mfpdbo.ACCOUNTINFO_INITIATIVES a, mfpdbo.ACCOUNTINFO b, mfpdbo.ACCOUNTINFO_REVSTREAM_REF c"
					+ " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1 and a.seqid = ?2 and a.BUYINGLOCID = ?3 and a.revstreamid=c.REVSTREAMID(+) ";
		}

		Query q = em.createNativeQuery(queryString, AcctInitiatives.class);
		if (action.equals("AccountPerspective")) {
			q.setParameter(1, accountrecid);
			q.setParameter(2, seqId);
			q.setParameter(3, revStreamType);
		} else if (action.equals("BuyingLocations")) {
			q.setParameter(1, accountrecid);
			q.setParameter(2, seqId);
			q.setParameter(3, buyinglocid);
		}
		List<AcctInitiatives> initiative = q.getResultList();
		if (initiative.size() > 0) {
			return initiative.get(0);
		} else {
			return null;
		}
	}

	public Long updateAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Long newAccInitId;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_UPDATE_ACCTOV_INITIATIVES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				cstmt.setLong(1, accountinfoid);
				cstmt.setLong(2, initiative.getSeqid());
				cstmt.setString(3, initiative.getInitiative_name());
				if (initiative.getAreaplanid() == null)
					cstmt.setNull(4, Types.NUMERIC);
				else
					cstmt.setLong(4, initiative.getAreaplanid());
				cstmt.setString(5, initiative.getPlan_tm_lead());
				if (initiative.getInit_date() == null)
					cstmt.setNull(6, Types.NUMERIC);
				else
					cstmt.setLong(6, initiative.getInit_date());
				cstmt.setString(7, initiative.getAction());
				cstmt.setString(8, initiative.getGoal());
				if (initiative.getRevstreamid() == null)
					cstmt.setNull(9, Types.NUMERIC);
				else
					cstmt.setLong(9, initiative.getRevstreamid());
				cstmt.setString(10, initiative.getRevstream_other());
				cstmt.setString(11, initiative.getObjective());
				cstmt.setString(12, initiative.getExec_plan());
				cstmt.setString(13, initiative.getValue_mar());
				cstmt.setString(14, initiative.getValue_act());
				cstmt.setString(15, initiative.getResults());
				cstmt.setString(16, initiative.getComments());
				cstmt.registerOutParameter(17, Types.NUMERIC);
				if (initiative.getAcctinitiativeid() == null)
					cstmt.setNull(17, Types.NUMERIC);
				else
					cstmt.setLong(17, initiative.getAcctinitiativeid());
				cstmt.execute();

				newAccInitId = cstmt.getLong(17);
				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
			newAccInitId = new Long(0);
		}
		return newAccInitId;
	}

	public Long updateAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyinglocid, String loginName) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Long newAccInitId;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement cstmt = con.prepareCall("{call mfpproc.SP_UPDATE_ACCTOV_BL_INITIATIVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				cstmt.setLong(1, accountinfoid);
				cstmt.setLong(2, buyinglocid);
				cstmt.setLong(3, initiative.getSeqid());
				cstmt.setString(4, initiative.getInitiative_name());
				if (initiative.getAreaplanid() == null)
					cstmt.setNull(5, Types.NUMERIC);
				else
					cstmt.setLong(5, initiative.getAreaplanid());
				cstmt.setString(6, initiative.getPlan_tm_lead());
				if (initiative.getInit_date() == null)
					cstmt.setNull(7, Types.NUMERIC);
				else
					cstmt.setLong(7, initiative.getInit_date());
				cstmt.setString(8, initiative.getAction());
				cstmt.setString(9, initiative.getGoal());
				if (initiative.getRevstreamid() == null)
					cstmt.setNull(10, Types.NUMERIC);
				else
					cstmt.setLong(10, initiative.getRevstreamid());
				cstmt.setString(11, initiative.getRevstream_other());
				cstmt.setString(12, initiative.getObjective());
				cstmt.setString(13, initiative.getExec_plan());
				cstmt.setString(14, initiative.getValue_mar());
				cstmt.setString(15, initiative.getValue_act());
				cstmt.setString(16, initiative.getResults());
				cstmt.setString(17, initiative.getComments());
				cstmt.registerOutParameter(18, Types.NUMERIC);
				if (initiative.getAcctinitiativeid() == null)
					cstmt.setNull(18, Types.NUMERIC);
				else
					cstmt.setLong(18, initiative.getAcctinitiativeid());
				cstmt.execute();

				newAccInitId = cstmt.getLong(18);
				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
			newAccInitId = new Long(0);
		}
		return newAccInitId;

	}

	public void updateAcctOverviewLocInitList(List<AcctInitiatives> initiative, long accountrecid, String loginName) {

		long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BL_INITLIST(?, ?, ?, ?, ?, ?)}");
				for (AcctInitiatives init : initiative) {
					query.setParameter(1, accountinfoid);
					query.setParameter(2, init.getBuyinglocid());
					query.setParameter(3, init.getSeqid());
					query.setParameter(4, init.getInitiative_name());
					query.setParameter(5, init.getRevstreamid());
					query.setParameter(6, init.getAcctinitiativeid());
					query.executeUpdate();
				}

				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void deleteAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName) {

		long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				Query query = em.createNativeQuery("{call mfpproc.SP_DELETE_ACCTOV_INITIATIVES(?, ?, ?)}");
				query.setParameter(1, accountinfoid);
				query.setParameter(2, initiative.getSeqid());
				query.setParameter(3, initiative.getRevstreamid());
				query.executeUpdate();
				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public void deleteAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyingLocid, String loginName) {

		long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				Query query = em.createNativeQuery("{call mfpproc.SP_DELETE_ACCTOV_BL_INITIATIVE(?, ?, ?, ?)}");
				query.setParameter(1, accountinfoid);
				query.setParameter(2, initiative.getSeqid());
				query.setParameter(3, initiative.getRevstreamid());
				query.setParameter(4, buyingLocid);
				query.executeUpdate();
				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public String getBTOnlyFlag(long accountrecid) {

		String returnValue = "";
		try {

			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			java.sql.CallableStatement cstmt = con.prepareCall("begin ? := mfpproc.FN_GETBTONLY(?); end; ");
			cstmt.registerOutParameter(1, Types.VARCHAR);
			cstmt.setLong(2, accountrecid);

			try {
				cstmt.execute();
				returnValue = cstmt.getString(1);
			} finally {
				cstmt.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
		return returnValue;
	}

	@SuppressWarnings("unchecked")
	public BTProfile getAcctOverviewBTYrOverYr(long accountrecid, long revstreamid) {

		String btOnly = getBTOnlyFlag(accountrecid);

		String queryString = "SELECT   a.est_non_us_bus, a.est_ttl_spend, a.est_ttl_rm_nextyr, a.est_src_annual_vol, a.annual_trvl_expense, a.annual_airspend,"
				+ " a.src_annual_airspend, a.rev, a.rev_chg_lastyear, a.pct_ttl_rev, a.mar_ttl_room_nts, a.pct_ttlrmnts_mar, a.pct_ttlrmnts_ind,"
				+ " a.num_hotelbid, a.num_accptdhotels, a.num_hotel_per_mrdw, a.ttl_hotel_directory, a.directoryshare_pct, a.mar_rewards_mmbrs, " + " a.co_includedrfp, a.pricingvehicle, "
				+ " b.listrate, b.sep_stay, b.max_disc_off_fixed, b.max_blackout, b.max_blackout_period, "
				+ " b.requirecomm, b.requirelra, c.company_internal_code, c.aer_account, c.default_percent, d.lastupdate_bt_trans_profile "
				+ " FROM mfpdbo.accountinfo_hist_acct_bt a, mfpdbo.accountinfo b, mfpdbo.account c ,mfpdbo.accountinfo_datestamp d " + " WHERE a.accountinfoid(+)=b.accountinfoid "
				+ " AND b.accountinfoid=d.accountinfoid(+) AND a.revstreamid= ?1 AND b.accountrecid(+)=c.accountrecid " + " AND c.accountrecid= ?2";

		Query q = em.createNativeQuery(queryString, BTProfile.class);
		q.setParameter(1, revstreamid);
		q.setParameter(2, accountrecid);
		List<BTProfile> btProfile = q.getResultList();
		if (btProfile.size() > 0) {
			BTProfile profile = btProfile.get(0);
			profile.setBtOnly(btOnly);
			return profile;
		} else {
			BTProfile profile = new BTProfile();
			profile.setBtOnly(btOnly);
			return profile;
		}
	}

	@SuppressWarnings("unchecked")
	public List<HotelAffiliation> getAcctOverviewBrandSeg(long accountrecid) {
		String queryString = "";
		queryString = "SELECT a.affiliationid " + "FROM mfpdbo.accountinfo_brandseg_pref a, mfpdbo.accountinfo b " + " WHERE a.accountinfoid = b.accountinfoid " + " AND b.accountrecid= ?1";

		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		q.setParameter(1, accountrecid);
		List<HotelAffiliation> affiliationList = q.getResultList();
		return affiliationList;

	}

	@SuppressWarnings("unchecked")
	public List<Agencies> getAcctOverviewAgencies(long accountrecid) {

		String queryString = "SELECT  A.AGENCYNAME, A.AGENCYBOOKING, A.AGENCYGDS, " + "A.ACCOUNTINFO_AGENCYID, A.ACCOUNTRECID,A.AGENCYTYPEID "
				+ "FROM mfpdbo.ACCOUNTINFO_AGENCIES A, mfpdbo.ACCOUNTINFO B " + "WHERE (B.ACCOUNTRECID = ?1) AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) " + "ORDER BY A.AGENCYTYPEID ";
		Query q = em.createNativeQuery(queryString, Agencies.class);
		q.setParameter(1, accountrecid);
		List<Agencies> agencyTitles = q.getResultList();
		return agencyTitles;

	}

	@SuppressWarnings("unchecked")
	public List<Agencies> getAcctOverviewAgencyTypes() {

		String queryString = "SELECT A.AGENCYTYPEID , A.AGENCYTYPEDESC , A.SEQUENCE FROM MFPDBO.ACCOUNTINFO_AGENCYTYPE A order by a.sequence";
		Query q = em.createNativeQuery(queryString, Agencies.class);
		List<Agencies> agencyTitles = q.getResultList();
		return agencyTitles;
	}

	public void updateAcctOverviewBTYrOverYr(BTProfile model, long accountrecid, long revStreamId) {

		long accountinfoid = getAccountInfoID(accountrecid);

		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BTYROVERYR(?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, model.getEst_non_us_bus());
		query.setParameter(3, model.getEst_ttl_spend());
		query.setParameter(4, model.getEst_ttl_rm_nextyr());
		query.setParameter(5, model.getEst_src_annual_vol());
		query.setParameter(6, model.getAnnual_trvl_expense());
		query.setParameter(7, model.getAnnual_airspend());
		query.setParameter(8, model.getSrc_annual_airspend());
		query.setParameter(9, model.getRev());
		query.setParameter(10, model.getRev_chg_lastyear());
		query.setParameter(11, model.getPct_ttl_rev());
		query.setParameter(12, model.getMar_ttl_room_nts());
		query.setParameter(13, model.getPct_ttlrmnts_mar());
		query.setParameter(14, model.getPct_ttlrmnts_ind());
		query.setParameter(15, model.getNum_hotelbid());
		query.setParameter(16, model.getNum_accptdhotels());
		query.setParameter(17, model.getNum_hotel_per_mrdw());
		query.setParameter(18, model.getTtl_hotel_directory());
		query.setParameter(19, model.getDirectoryshare_pct());
		query.setParameter(20, model.getMar_rewards_mmbrs());
		query.setParameter(21, model.getCo_includedrfp());
		query.setParameter(22, model.getPricingvehicle());
		query.setParameter(23, model.getListrate());
		query.setParameter(24, model.getSep_stay());
		query.setParameter(25, model.getMax_disc_off_fixed());
		query.setParameter(26, model.getMax_blackout());
		query.setParameter(27, model.getMax_blackout_period());
		query.setParameter(28, model.getRequirecomm());
		query.setParameter(29, model.getRequirelra());
		query.setParameter(30, revStreamId);
		query.executeUpdate();

	}

	public void updateAcctOverviewBrandSeg(String[] selBrandList, long accountrecid) {

		CallableStatement stmt;
		long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			deleteAcctOverviewBrandSeg(accountrecid);

			try {

				stmt = con.prepareCall("{call mfpproc.SP_UPDATE_ACCTOV_BRANDSEG(?, ?)}");
				try {
					if (selBrandList != null) {
						for (String brand : selBrandList) {
							stmt.setLong(1, accountinfoid);
							stmt.setLong(2, new Long(brand));
							stmt.execute();
						}
					}
				} finally {
					stmt.close();
				}

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void deleteAcctOverviewBrandSeg(long accountrecid) {

		CallableStatement stmt;
		long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {

				stmt = con.prepareCall("{call mfpproc.SP_DELETE_ACCTOV_BRANDSEG(?)}");
				try {
					stmt.setLong(1, accountinfoid);
					stmt.execute();
				} finally {
					stmt.close();
				}

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void updateAcctOverviewAgencies(List<Agencies> agencies, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);

		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_AGENCIES(?, ?, ?, ?, ? ,?)}");
		for (Agencies agency : agencies) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, agency.getAccountinfo_agencyid());
			query.setParameter(3, agency.getAgencytypeid());
			if (agency.getAgencybooking() != null && agency.getAgencybooking() == 0) {
				query.setParameter(4, null);
			} else {
				query.setParameter(4, agency.getAgencybooking());
			}

			query.setParameter(5, agency.getAgencygds());
			query.setParameter(6, agency.getAgencyname());
			query.executeUpdate();
		}
	}

	@SuppressWarnings("unchecked")
	public BTOverview getAcctOverviewBTReqs(long accountrecid, long revStreamId) {

		String btOnly = getBTOnlyFlag(accountrecid);
		long accountinfoid = getAccountInfoID(accountrecid);

		String queryString = " SELECT a.relocat_intermediary, a.competitors_bybrand, a.pref_air_partners, a.pref_car_rental, a.pref_hotel,"
				+ " a.policies, a.solutions, a.inter_strategy, a.org_buying_struct, a.online_solut_util, a.onl_bkg_tool, a.adopt_rate_bkg_tool,"
				+ " b.requiretext, b.requesttext, b.notestext_existinghotel,b.notestext_preopeninghotel, b.reservationstext, d.lastupdate_bt_overview, b.CBC_SOFTDUEDATE, b.roomtypetext  "
				+ " FROM mfpdbo.accountinfo_desc_revstream a, mfpdbo.accountinfo b , mfpdbo.accountinfo_datestamp d " + " WHERE a.accountinfoid(+)=b.accountinfoid "
				+ " AND b.accountinfoid = d.accountinfoid(+) AND a.revstreamid = ?1 AND a.accountinfoid = ?2";

		Query q = em.createNativeQuery(queryString, BTOverview.class);
		q.setParameter(1, revStreamId);
		q.setParameter(2, accountinfoid);
		List<BTOverview> btOverview = q.getResultList();
		if (btOverview.size() > 0) {
			BTOverview overview = btOverview.get(0);
			overview.setBtOnly(btOnly);
			return overview;
		} else {
			BTOverview overview = new BTOverview();
			overview.setBtOnly(btOnly);
			return overview;
		}
	}

	public void updateAcctOverviewBTReqs(BTOverview model, long accountrecid, long revStreamId) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BTREQS(?, ?, ?, ?, ? ,?, ?, ?, ?, ? ,?, ?, ?, ?, ? ,?, ?, ?,? ,?,?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, model.getRelocat_intermediary());
		query.setParameter(3, model.getCompetitors_bybrand());
		query.setParameter(4, model.getPref_air_partners());
		query.setParameter(5, model.getPref_car_rental());
		query.setParameter(6, model.getPref_hotel());
		query.setParameter(7, model.getOrg_buying_struct());
		query.setParameter(8, model.getPolicies());
		query.setParameter(9, model.getSolutions());
		query.setParameter(10, model.getInter_strategy());
		query.setParameter(11, model.getOnline_solut_util());
		query.setParameter(12, model.getOnl_bkg_tool());
		query.setParameter(13, model.getAdopt_rate_bkg_tool());
		query.setParameter(14, model.getRequiretext());
		query.setParameter(15, model.getRequesttext());	
		query.setParameter(16, model.getNotestext_existinghotel());
		query.setParameter(17, model.getReservationstext());
		query.setParameter(18, revStreamId);
		query.setParameter(19, model.getShortCbc_softduedate());
		query.setParameter(20, model.getRoomtypetext());	
		query.setParameter(21,model.getNotestext_preopeninghotel());
		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	public List<Markets> getAcctOverviewMarkets(long accountrecid, boolean usMarket, int sortBy) {
		String queryString = "SELECT A.marketname, A.MARKETPOTENTIALRN, A.RECID, A.marketpotentialrev ,M.MARKET_STATE, c.iso2code market_country "
				+ "FROM mfpdbo.ACCOUNTMARKET A, mfpdbo.ACCOUNTINFO B, mfpdbo.MARKETINFO M, mfpdbo.COUNTRY C "
				+ "WHERE A.RECID = M.RECID (+) AND m.market_Country = c.country(+) AND (B.ACCOUNTRECID = " + accountrecid;

		queryString += ") AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) " + "AND A.USMARKET='" + (usMarket ? "Y" : "N") + "' ORDER BY ";

		switch (sortBy) {
		case 1:
			queryString += " A.MARKETNAME asc";
			break;
		case 2:
			queryString += " c.iso3code asc,  nvl(M.MARKET_STATE, 'ZZZ') ASC ";
			break;
		case 3:			
			queryString += " A.MARKETPOTENTIALRN desc";			
			break;
		case 0:
			queryString += " A.SEQID, A.RECID ";
			break;
		default:
			queryString += " A.SEQID, A.RECID ";
			break;
		}

		Query q = em.createNativeQuery(queryString, Markets.class);
		List<Markets> markets = q.getResultList();
		return markets;
	}

	@SuppressWarnings("unchecked")
	public Markets getAcctOverviewMarketInfo(long recid) {

		String queryString = "SELECT  A.notes, A.marketinfoid, A.CURRACTIVITY, A.MARKET_STATE, A.MARKET_COUNTRY, am.recid, am.accountinfoid, am.marketname, am.marketpotentialrn, am.usmarket, "
				+ " am.seqid  FROM  mfpdbo.MARKETINFO A, accountmarket am WHERE am.recid = a.recid(+) AND AM.RECID = " + recid;

		Query q = em.createNativeQuery(queryString, Markets.class);
		List<Markets> markets = q.getResultList();
		if (markets.size() > 0) {
			return markets.get(0);
		} else {
			return null;
		}

	}

	public void updateAcctOverviewMarkets(List<Markets> markets, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_MARKETS(?, ?, ?, ?, ? ,?)}");
		for (Markets market : markets) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, market.getSeqid());
			query.setParameter(3, market.getMarketname());
			query.setParameter(4, market.getRecid());
			query.setParameter(5, market.getMarketpotentialrn());
			query.setParameter(6, market.getUsMarket());
			query.executeUpdate();
		}

	}

	public long updateAcctOverviewMarketLevel(Markets model, long accountrecid, String action) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Connection connection = null;
		CallableStatement stmt = null;
		long rid = 0;

		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.SP_UPDATE_ACCTOV_MARKETLEVEL(?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ); end; ");
			stmt.registerOutParameter(1, Types.NUMERIC);
			stmt.registerOutParameter(6, Types.NUMERIC);

			stmt.setLong(1, model.getRecid());
			stmt.setString(2, model.getUsMarket());
			stmt.setString(3, model.getMarketname());
			if (model.getMarketpotentialrev() != null)
				stmt.setDouble(4, model.getMarketpotentialrev());
			else
				stmt.setNull(4, Types.NUMERIC);
			stmt.setLong(5, accountinfoid);
			if (model.getMarketinfoid() != null)
				stmt.setLong(6, model.getMarketinfoid());
			else
				stmt.setNull(6, Types.NUMERIC);
			if (model.getTraveldist() != null)
				stmt.setDouble(7, model.getTraveldist());
			else
				stmt.setNull(7, Types.NUMERIC);
			if (model.getRatecap() != null)
				stmt.setDouble(8, model.getRatecap());
			else
				stmt.setNull(8, Types.NUMERIC);
			stmt.setString(9, model.getMaxrate());
			stmt.setString(10, model.getLocation());
			if (model.getPrefhotels() != null)
				stmt.setLong(11, model.getPrefhotels());
			else
				stmt.setNull(11, Types.NUMERIC);
			if (model.getPrefmarprop() != null)
				stmt.setLong(12, model.getPrefmarprop());
			else
				stmt.setNull(12, Types.NUMERIC);
			stmt.setString(13, model.getBrandsegment());
			stmt.setString(14, StringUtility.replaceFormatChars(model.getNotes()));
			stmt.setString(15, model.getContactname());
			stmt.setString(16, model.getContacttitle());
			stmt.setString(17, model.getContactphone());
			stmt.setString(18, model.getContactemail());
			if (model.getMarketpotentialrn() != null)
				stmt.setLong(19, model.getMarketpotentialrn());
			else
				stmt.setNull(19, Types.NUMERIC);
			stmt.setLong(20, model.getSeqid());
			stmt.setString(21, StringUtility.replaceFormatChars(model.getCurractivity()));
			stmt.setString(22, action);
			stmt.setString(23, model.getMarket_state());
			stmt.setString(24, model.getMarket_country());
			stmt.executeUpdate();
			rid = stmt.getLong(1);

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}

		return rid;
	}

	public long updateAcctOverviewMarketLevel(Markets model, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Connection connection = null;
		CallableStatement stmt = null;
		long rid = 0;

		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.SP_UPDATE_ACCTOV_MARKETLEVEL2(?, ?, ?, ?, ?  ,? ,? ,? ,? ,?  ,?  ); end; ");
			stmt.registerOutParameter(1, Types.NUMERIC);
			stmt.registerOutParameter(6, Types.NUMERIC);

			stmt.setLong(1, model.getRecid());
			stmt.setString(2, model.getUsMarket());
			stmt.setString(3, model.getMarketname());
			if (model.getMarketpotentialrn() != null)
				stmt.setDouble(4, model.getMarketpotentialrn());
			else
				stmt.setNull(4, Types.NUMERIC);
			stmt.setLong(5, accountinfoid);
			if (model.getMarketinfoid() != null)
				stmt.setLong(6, model.getMarketinfoid());
			else
				stmt.setNull(6, Types.NUMERIC);
			stmt.setString(7, StringUtility.replaceFormatChars(model.getNotes()));
			stmt.setLong(8, model.getSeqid());
			stmt.setString(9, StringUtility.replaceFormatChars(model.getCurractivity()));
			stmt.setString(10, model.getMarket_state());
			stmt.setString(11, model.getMarket_country());
			stmt.executeUpdate();
			rid = stmt.getLong(1);

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}

		return rid;
	}

	public void deleteAcctOverviewMarketLevel(Long recid, String usMarket, long accountrecid) {

		Connection connection = null;
		CallableStatement stmt = null;

		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.sp_delete_acctov_marketlevel(?, ?, ?  ); end; ");

			stmt.setLong(1, recid);
			stmt.setString(2, usMarket);
			stmt.setLong(3, accountrecid);
			stmt.execute();

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}
	}

	public void deleteAcctMarketsbyCountry(long accountrecid, String usmarket) {

		CallableStatement stmt;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {

				stmt = con.prepareCall("{call mfpproc.SP_DELETE_ACCTOV_MARKETS(?, ?)}");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setString(2, usmarket);
					stmt.execute();
				} finally {
					stmt.close();
				}

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	@SuppressWarnings("unchecked")
	public CateringExtendedStay getAcctOverviewCatering(long accountrecid, long revstreamid) {

		String queryString = "select a.accthistcatid, a.accountinfoid, a.revstreamid, a.est_ttl_spnd, a.est_ttl_spnd_pct_lstyr,"
				+ " a.lead_us_mkts, a.est_non_us_bus, a.non_us_bus_chng_lstyr, a.lead_non_us_mkts, a.rev,"
				+ " a.rev_chng_lstyr, a.ttl_rev_pct, a.mar_lcl_rev, a.mar_lcl_rev_chng_lstyr, a.ttl_projections,"
				+ " a.ttl_proj_rev_pct, a.lead_mkts, a.act_pln_event, a.holiday_parties, a.holiday_party_details, a.telepresence_caps "
				+ " from mfpdbo.ACCOUNTINFO_HIST_EXT_CAT a, mfpdbo.ACCOUNTINFO b" + " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1 and a.revstreamid = ?2";

		Query q = em.createNativeQuery(queryString, CateringExtendedStay.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, revstreamid);
		List<CateringExtendedStay> catering = q.getResultList();
		if (catering.size() > 0) {
			CateringExtendedStay cat = catering.get(0);
			return cat;
		} else {
			CateringExtendedStay cat = new CateringExtendedStay();
			return cat;
		}
	}

	public void updateAcctOverviewCatering(CateringExtendedStay catering, long accountrecid, long revstreamid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_CATERING(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, revstreamid);
		query.setParameter(3, catering.getEst_ttl_spnd());
		query.setParameter(4, catering.getEst_ttl_spnd_pct_lstyr());
		query.setParameter(5, catering.getLead_us_mkts());
		query.setParameter(6, catering.getEst_non_us_bus());
		query.setParameter(7, catering.getNon_us_bus_chng_lstyr());
		query.setParameter(8, catering.getLead_us_mkts());
		query.setParameter(9, catering.getRev());
		query.setParameter(10, catering.getRev_chng_lstyr());
		query.setParameter(11, catering.getTtl_rev_pct());
		query.setParameter(12, catering.getMar_lcl_rev());
		query.setParameter(13, catering.getMar_lcl_rev_chng_lstyr());
		query.setParameter(14, catering.getTtl_projections());
		query.setParameter(15, catering.getTtl_proj_rev_pct());
		query.setParameter(16, catering.getLead_mkts());
		query.setParameter(17, catering.getAct_pln_event());
		query.setParameter(18, catering.getHoliday_parties());
		query.setParameter(19, catering.getHoliday_party_details());
		query.setParameter(20, catering.getTelepresence_caps());
		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	public RevStreamsDescription getAcctOverviewRevStream(long accountrecid, long revstreamid) {
		String queryString = "select a.acctstr_id, a.accountinfoid, a.revstreamid, a.org_buying_struct, a.solutions, a.policies, "
				+ " a.pref_brand, a.competitors_bybrand, a.online_solut_util, a.pref_air_partners, a.pref_car_rental,"
				+ " a.pref_hotel, a.relocat_intermediary, a.adopt_rate_bkg_tool, a.onl_bkg_tool, a.inter_strategy," + " a.bkg_agent, a.mtg_types, a.mtg_size, a.mtg_freq"
				+ " from mfpdbo.ACCOUNTINFO_DESC_REVSTREAM a, mfpdbo.ACCOUNTINFO b" + " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1 and a.revstreamid = ?2";

		Query q = em.createNativeQuery(queryString, RevStreamsDescription.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, revstreamid);
		List<RevStreamsDescription> revS = q.getResultList();
		if (revS.size() > 0) {
			RevStreamsDescription rev = revS.get(0);
			return rev;
		} else {
			RevStreamsDescription rev = new RevStreamsDescription();
			return rev;
		}

	}

	public void updateAcctOverviewRevStream(RevStreamsDescription revS, long accountrecid, long revstreamid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_REVSTREAM(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, revstreamid);
		query.setParameter(3, revS.getOrg_buying_struct());
		query.setParameter(4, revS.getSolutions());
		query.setParameter(5, revS.getPolicies());
		query.setParameter(6, revS.getPref_brand());
		query.setParameter(7, revS.getCompetitors_bybrand());
		query.setParameter(8, revS.getOnline_solut_util());
		query.setParameter(9, revS.getPref_air_partners());
		query.setParameter(10, revS.getPref_car_rental());
		query.setParameter(11, revS.getPref_hotel());
		query.setParameter(12, revS.getRelocat_intermediary());
		query.setParameter(13, revS.getAdopt_rate_bkg_tool());
		query.setParameter(14, revS.getOnl_bkg_tool());
		query.setParameter(15, revS.getInter_strategy());
		query.setParameter(16, revS.getBkg_agent());
		query.setParameter(17, revS.getMtg_types());
		query.setParameter(18, revS.getMtg_size());
		query.setParameter(19, revS.getMtg_freq());
		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	public CateringExtendedStay getAcctOverviewExtStay(long accountrecid, long revstreamid) {

		String queryString = "select a.accthistcatid, a.accountinfoid, a.revstreamid, a.est_ttl_spnd, a.rev, a.rev_chng_lstyr, "
				+ " a.ext_avg_len_stay, a.ext_est_ttl_spend_nxtyr, a.ext_est_source, a.ext_pct_ttl_rev," + " a.ext_ttl_room_nts, a.ext_mar_pct_ttl_roomnts, a.ext_ind_pct_ttl_roomnts,"
				+ " a.ext_requirements,a.ext_pricingvehicle, " + " a.ext_preferredrate, a.ext_prefer_relocprovider, a.ext_desc_relocprovider "
				+ " from mfpdbo.ACCOUNTINFO_HIST_EXT_CAT a, mfpdbo.ACCOUNTINFO b" + " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1 and a.revstreamid = ?2";

		Query q = em.createNativeQuery(queryString, CateringExtendedStay.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, revstreamid);
		List<CateringExtendedStay> catering = q.getResultList();
		if (catering.size() > 0) {
			CateringExtendedStay cat = catering.get(0);
			return cat;
		} else {
			CateringExtendedStay cat = new CateringExtendedStay();
			return cat;
		}
	}

	public void updateAcctOverviewExtStay(CateringExtendedStay extstay, long accountrecid, long revstreamid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_EXT_STAY(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, revstreamid);
		query.setParameter(3, extstay.getEst_ttl_spnd());
		query.setParameter(4, extstay.getRev());
		query.setParameter(5, extstay.getRev_chng_lstyr());
		query.setParameter(6, extstay.getExt_avg_len_stay());
		query.setParameter(7, extstay.getExt_est_ttl_spend_nxtyr());
		query.setParameter(8, extstay.getExt_est_source());
		query.setParameter(9, extstay.getExt_pct_ttl_rev());
		query.setParameter(10, extstay.getExt_ttl_room_nts());
		query.setParameter(11, extstay.getExt_mar_pct_ttl_roomnts());
		query.setParameter(12, extstay.getExt_ind_pct_ttl_roomnts());
		query.setParameter(13, extstay.getExt_requirements());
		query.setParameter(14, extstay.getExt_pricingvehicle());
		query.setParameter(15, extstay.getExt_preferredrate());
		query.setParameter(16, extstay.getExt_prefer_relocprovider());
		query.setParameter(17, extstay.getExt_desc_relocprovider());
		query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public Leisure getAcctOverviewLeisure(long accountrecid) {  
		String queryString = "select a.acctleisureid,a.stOverview, a.marketing, a.strengths,a.leisuresegment, " +
				"a.onwardDistribution, a.contracting, a.accountinfoid" 
				+ " from mfpdbo.accountinfo_leisure a, mfpdbo.accountinfo b where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1";
		Query q = em.createNativeQuery(queryString, Leisure.class); 
		q.setParameter(1, accountrecid); 
		List<Leisure> leisure = q.getResultList();
		if (leisure.size() > 0) {
			Leisure lsr = leisure.get(0);
			return lsr;
		} else {
			Leisure lsr = new Leisure();
			return lsr;
		}

	}

	public void updateAcctOverviewLeisure(Leisure leisure, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_LEISURE(?, ?, ?, ?, ?,?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, leisure.getStOverview());
		query.setParameter(3, leisure.getMarketing());
		query.setParameter(4, leisure.getStrengths());
		query.setParameter(5, leisure.getLeisureSegment());
		query.setParameter(6, leisure.getOnwardDistribution());
		query.setParameter(7, leisure.getContracting());	
		query.executeUpdate();
	}

	public void updateAcctOverviewContactsBuyer(List<Contacts> list, long accountrecid, String loginName) {

		Long accountinfoid = getAccountInfoID(accountrecid);

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_KEYBUYER(?, ?, ?, ?, ?)}");
				for (Contacts contact : list) {
					query.setParameter(1, contact.getAccountinfoContactId());
					query.setParameter(2, accountinfoid);
					query.setParameter(3, contact.getName());
					query.setParameter(4, contact.getContactTypeID());
					query.setParameter(5, contact.getRevStreamType());
					query.executeUpdate();
				}

				audit.deleteAuditUser(con);

			} finally {
				con.close();
			}

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	@SuppressWarnings("unchecked")
	public List<Contacts> getAcctOverviewKeyContacts(long accountrecid, String contactid, long contacttypeid) {

		String queryString = "SELECT a.CONTACTNAME name, a.CONTACTPHONE phone, a.CONTACTTITLE title, a.CONTACTEMAIL email, a.CONTACTTYPEID contactTypeID, "
				+ "a.CONTACTADDRESS address, a.CONTACTCITY city, " + "a.CONTACTSTATE state, a.CONTACTZIP zip, a.CONTACTCOUNTRY country, "
				+ "b.ACCOUNTRECID accountrecid, b.ACCOUNTINFOID accountinfoid, a.CONTACTPROVINCE province, "
				+ "a.influence_type buyerInfluence, a.influence_other buyerInfOther, a.area_resp buyerResponsibility, a.ind_membership buyerMemberships, "
				+ "a.comments buyerComments, a.cust_base buyerCustBase, a.buyer_type buyerType, a.buyer_other buyerOther, a.revstreamid revStreamType, "
				+ "a.accountinfo_contactid accountinfoContactId, a.regionid regionid, a.RELATIONSHIP_TO_ACCT accountRelationship, a.CONTACT_COMPANY_NAME companyName ";

		queryString += "FROM mfpdbo.ACCOUNTINFO_CONTACTS a, mfpdbo.ACCOUNTINFO b ";

		queryString += "WHERE (b.ACCOUNTRECID = ?1) and (b.ACCOUNTINFOID = a.ACCOUNTINFOID) " + " and (a.accountinfo_contactid = ?2)";

		queryString += " and a.CONTACTTYPEID = ?3";

		Query q = em.createNativeQuery(queryString, Contacts.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, contactid);
		q.setParameter(3, contacttypeid);
		List<Contacts> acctOverviewContacts = q.getResultList();
		return acctOverviewContacts;
	}

	public long updateAcctOverviewKeyContacts(Contacts model, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Connection connection = null;
		CallableStatement stmt = null;
		long contactid = 0;

		try {

			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.SP_UPDATE_ACCTOV_KEYCONTACTS(?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); end; ");
			stmt.registerOutParameter(1, Types.NUMERIC);

			if (model.getAccountinfoContactId() != null)
				stmt.setLong(1, model.getAccountinfoContactId());
			else
				stmt.setNull(1, Types.NUMERIC);
			stmt.setLong(2, accountinfoid);
			stmt.setString(3, model.getName());
			stmt.setString(4, model.getAddress());
			stmt.setString(5, model.getCity());
			stmt.setString(6, model.getState());
			stmt.setString(7, model.getZip());
			stmt.setString(8, model.getCountry());
			stmt.setString(9, model.getEmail());
			stmt.setString(10, model.getPhone());
			stmt.setString(11, model.getTitle());
			stmt.setString(12, model.getProvince());
			stmt.setString(13, model.getBuyerInfluence());
			stmt.setString(14, model.getBuyerInfOther());
			stmt.setString(15, model.getBuyerResponsibility());
			stmt.setString(16, model.getBuyerMemberships());
			stmt.setString(17, model.getBuyerComments());
			if (model.getRegionid() != null)
				stmt.setLong(18, model.getRegionid());
			else
				stmt.setNull(18, Types.NUMERIC);
			if (model.getContactTypeID() != null)
				stmt.setLong(19, model.getContactTypeID());
			else
				stmt.setNull(19, Types.NUMERIC);
			if (model.getRevStreamType() != null)
				stmt.setLong(20, model.getRevStreamType());
			else
				stmt.setNull(20, Types.NUMERIC);
			stmt.setString(21, model.getAccountRelationship());
			stmt.setString(22, model.getCompanyName());
			if (model.getBuyerType() != null)
				stmt.setLong(23, model.getBuyerType());
			else
				stmt.setNull(23, Types.NUMERIC);

			stmt.executeUpdate();
			contactid = stmt.getLong(1);

		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				log.error(ex.getMessage(),ex);
			}
		}

		return contactid;
	}

	public void deleteAcctOverviewKeyContacts(String accountId) {

		CallableStatement stmt;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {

				stmt = con.prepareCall("{call mfpproc.SP_DELETE_ACCTOV_KEYCONTACTS(?)}");
				try {
					stmt.setLong(1, new Long(accountId).longValue());
					stmt.execute();
				} finally {
					stmt.close();
				}

			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	@SuppressWarnings("unchecked")
	public GroupDetail getAcctOverviewGroupDetail(long accountrecid) {

		String queryString = "select a.acct_grpid, a.accountinfoid, a.directbill, a.amextmgcard, a.grp_solutions, a.natl_events_invited, a.grp_hotel_prog,"
				+ " a.ismar_pref_brand, a.num_mar_incl_prog, a.prefer_criteria, a.intermediaries , a.tradition, a.fullservice, a.contract ,"
				+ " a.site_select, a.housing, a.on_site, a.research , a.inter_other, a.onl_lead_gen, a.onl_registration, a.onl_housing ,"
				+ " a.struct_sml_mtg , a.struct_lge_mtg , a.struct_annl_mtg, a.competitor , a.solutions, a.affl_program, a.affl_roomnts," + " a.affl_rev, a.affl_mvci, a.other_group_info"
				+ " from mfpdbo.ACCOUNTINFO_DESC_GRP a, mfpdbo.ACCOUNTINFO b" + " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1";

		Query q = em.createNativeQuery(queryString, GroupDetail.class);
		q.setParameter(1, accountrecid);
		List<GroupDetail> groupDetail = q.getResultList();
		if (groupDetail.size() > 0) {
			GroupDetail grp = groupDetail.get(0);
			return grp;
		} else {
			GroupDetail grp = new GroupDetail();
			return grp;
		}

	}

	public void updateAcctOverviewGroupDetail(GroupDetail model, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_GRP_DESC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, model.getDirectbill());
		query.setParameter(3, model.getAmextmgcard());
		query.setParameter(4, model.getGrp_solutions());
		query.setParameter(5, model.getNatl_events_invited());
		query.setParameter(6, model.getGrp_hotel_prog());
		query.setParameter(7, model.getIsmar_pref_brand());
		query.setParameter(8, model.getNum_mar_incl_prog());
		query.setParameter(9, model.getPrefer_criteria());
		query.setParameter(10, model.getIntermediaries());
		query.setParameter(11, model.getTradition());
		query.setParameter(12, model.getFullservice());
		query.setParameter(13, model.getContract());
		query.setParameter(14, model.getSite_select());
		query.setParameter(15, model.getHousing());
		query.setParameter(16, model.getOn_site());
		query.setParameter(17, model.getResearch());
		query.setParameter(18, model.getInter_other());
		query.setParameter(19, model.getOnl_lead_gen());
		query.setParameter(20, model.getOnl_registration());
		query.setParameter(21, model.getOnl_housing());
		query.setParameter(22, model.getStruct_sml_mtg());
		query.setParameter(23, model.getStruct_lge_mtg());
		query.setParameter(24, model.getStruct_annl_mtg());
		query.setParameter(25, model.getCompetitor());
		query.setParameter(26, model.getSolutions());
		query.setParameter(27, model.getAffl_program());
		query.setParameter(28, model.getAffl_roomnts());
		query.setParameter(29, model.getAffl_rev());
		query.setParameter(30, model.getAffl_mvci());
		query.setParameter(31, model.getPageType());
		query.setParameter(32, model.getOther_group_info());
		query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public AcctOverviewGroup getAcctOverviewGroup(long accountrecid) {

		String queryString = "select a.accthistgrpid, a.accountinfoid, a.spend_budget, a.pct_budget_gstrm, a.pct_budget_fb, a.pct_budget_av, a.pct_budgetaffl_fb, "
				+ " a.pct_budget_other, a.pct_mar_share, a.pct_mtg_plnrenroll, a.pct_attr_contracts, a.ttl_annual_mtg, a.sml_mtg_pk_one,"
				+ " a.sml_mtg_pk_two, a.sml_mtg_pk_three, a.sml_mar_gsa, a.sml_mtg_grp_contract, a.sml_mtg_grp_clause, a.sml_mtg_mar_pct," + "a.sml_mtg_use_inter, "
				+ "a.lge_mtg_use_inter, a.annl_mtg, a.annl_mtg_leadtm, a.annl_mtg_slip, a.annl_mtg_use_inter, a.annl_mtg_attend,"
				+ " a.annl_mtg_pkrooms, a.annl_mtg_timeyear, a.annl_mtg_loc, a.annl_mtg_yrbk, a.annl_mtg_next_open, a.annl_mtg_rmbudget,"
				+ " a.annl_mtg_budget_fb, a.annl_mtg_budget_av, a.annl_mtg_budget_affl, a.annl_mtg_gsa, a.annl_mtg_grp_contract,"
				+ " a.annl_mtg_grp_clause, a.sml_mtg_cncssn, a.lge_mtg_concssn, a.annl_mtg_cncssn, " + " a.annl_mtg_desc, a.sml_mtg_use_inter_desc"
				+ " from mfpdbo.ACCOUNTINFO_HIST_GRP a, mfpdbo.ACCOUNTINFO b" + " where a.accountinfoid(+)=b.accountinfoid and b.accountrecid = ?1";

		Query q = em.createNativeQuery(queryString, AcctOverviewGroup.class);
		q.setParameter(1, accountrecid);
		List<AcctOverviewGroup> group = q.getResultList();
		if (group.size() > 0) {
			AcctOverviewGroup grp = group.get(0);
			return grp;
		} else {
			AcctOverviewGroup grp = new AcctOverviewGroup();
			return grp;
		}

	}

	public void updateAcctOverviewGroup(AcctOverviewGroup model, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_GRP_HISTORY(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " + "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " + "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
				+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " + "?, ?)}");
		query.setParameter(1, accountinfoid);
		query.setParameter(2, model.getSpend_budget());
		query.setParameter(3, model.getPct_budget_gstrm());
		query.setParameter(4, model.getPct_budget_fb());
		query.setParameter(5, model.getPct_budget_av());
		query.setParameter(6, model.getPct_budgetaffl_fb());
		query.setParameter(7, model.getPct_budget_other());
		query.setParameter(8, model.getPct_mar_share());
		query.setParameter(9, model.getPct_mtg_plnrenroll());
		query.setParameter(10, model.getPct_attr_contracts());
		query.setParameter(11, model.getTtl_annual_mtg());
		query.setParameter(12, model.getSml_mtg_pk_one());
		query.setParameter(13, model.getSml_mtg_pk_two());
		query.setParameter(14, model.getSml_mtg_pk_three());
		query.setParameter(15, model.getSml_mar_gsa());
		query.setParameter(16, model.getSml_mtg_grp_contract());
		query.setParameter(17, model.getSml_mtg_grp_clause());
		query.setParameter(18, model.getSml_mtg_mar_pct());
		query.setParameter(19, model.getSml_mtg_use_inter());
		query.setParameter(20, model.getLge_mtg_use_inter());
		query.setParameter(21, model.getAnnl_mtg());
		query.setParameter(22, model.getAnnl_mtg_leadtm());
		query.setParameter(23, model.getAnnl_mtg_slip());
		query.setParameter(24, model.getAnnl_mtg_use_inter());
		query.setParameter(25, model.getAnnl_mtg_attend());
		query.setParameter(26, model.getAnnl_mtg_pkrooms());
		query.setParameter(27, model.getAnnl_mtg_timeyear());
		query.setParameter(28, model.getAnnl_mtg_loc());
		query.setParameter(29, model.getAnnl_mtg_yrbk());
		query.setParameter(30, model.getAnnl_mtg_next_open());
		query.setParameter(31, model.getAnnl_mtg_rmbudget());
		query.setParameter(32, model.getAnnl_mtg_budget_fb());
		query.setParameter(33, model.getAnnl_mtg_budget_av());
		query.setParameter(34, model.getAnnl_mtg_budget_affl());
		query.setParameter(35, model.getAnnl_mtg_gsa());
		query.setParameter(36, model.getAnnl_mtg_grp_contract());
		query.setParameter(37, model.getAnnl_mtg_grp_clause());
		query.setParameter(38, model.getSml_mtg_cncssn());
		query.setParameter(39, model.getLge_mtg_concssn());
		query.setParameter(40, model.getAnnl_mtg_cncssn());
		query.setParameter(41, model.getAnnl_mtg_desc());
		query.setParameter(42, model.getSml_mtg_use_inter_desc());
		query.executeUpdate();
	}

	@Override
	public String saveExcelDataSAPP(BufferedReader br,long maxTravelMarkets,String marketType, Long accountrecid, List<String> stateNames, List<String> countryNames) {
		String importFailMsg="";
		int index=0;
		String line = "";
		try{
				br.readLine();
				List<String[]> cityList = new ArrayList<String[]>(); 
				String[] eachCity;
				Pattern pattern =null;
				Matcher matcher =null; 
				String patternMatch="(\"[^\",]++),([^\"]++\")";
				pattern = Pattern.compile(patternMatch);
				int length=0;			
				while ((line =  br.readLine()) != null) {
					line = line.replace("\"\"", "||");
					matcher = pattern.matcher(line);
					 while (matcher.find()) {
				            line = line.replace(matcher.group(0),matcher.group(0).replace(",", "$$"));		            
				        }
					eachCity = line.split(",");
					length = eachCity.length;
					if(length == 4){
						eachCity[3] = (eachCity[3].contains("$$")||eachCity[3].contains("||")? eachCity[3].replaceAll("(?m)(^\"|\"$)", "") : eachCity[3]);
					}else if(length == 5){
						eachCity[3] = (eachCity[3].contains("$$")||eachCity[3].contains("||")? eachCity[3].replaceAll("(?m)(^\"|\"$)", "") : eachCity[3]);
						eachCity[4] = (eachCity[4].contains("$$")||eachCity[4].contains("||")? eachCity[4].replaceAll("(?m)(^\"|\"$)", "") : eachCity[4]);
					}
					cityList.add(eachCity);				
				}
				boolean proceed = true;
				int rows =  cityList.size() ;
				if(rows == 0){
					importFailMsg="The file is empty. No Details found";
					return importFailMsg;
				}
				if(rows > maxTravelMarkets){
					importFailMsg="Total Number of markets should not be greater than "+maxTravelMarkets;
					return importFailMsg;
				}
				pattern = Pattern.compile("^\\d+$");				 
				String[] eachCityDup;
			
				for (int i = 0; i < rows && proceed; i++) {
					eachCity = cityList.get(i);
					index = i;
					if(eachCity[0]== null || eachCity[1]== null || eachCity[2]== null || eachCity[0].trim().isEmpty() || eachCity[1].trim().isEmpty()  || eachCity[2].trim().isEmpty()  ){
						importFailMsg ="The first three fields are required at row "+(i+2);
						proceed= false;
					}
					if(!pattern.matcher(eachCity[2].trim().replace("$$", "").replace("\"", "")).matches()){
						importFailMsg = "Row "+ (i+2) +"- the room nights should be a valid number (without commas or decimals).";
						proceed= false;
					}
					else if(marketType.equals("US") && !stateNames.contains(eachCity[1])){
						importFailMsg = "State name should be valid. \'"+eachCity[1]+"\' is not valid state at row  "+ (i+2);
						proceed = false;
					}else if(marketType.equals("International") && !countryNames.contains(eachCity[1])){
						importFailMsg = "Country/Region name should be valid. \'"+eachCity[1]+"\' is not valid country/region at row "+ (i+2);
						proceed = false;
					}					
					for (int j = i; j < rows && proceed; j++) {
						if(j!=i){
						eachCityDup = cityList.get(j);
						if(eachCityDup[0]== null || eachCityDup[1]== null || eachCityDup[2]== null){
							importFailMsg="The first three fields are required at row number "+(j+2);
							proceed= false;
						}
						else if(!pattern.matcher(eachCityDup[2].trim().replace("$$", "").replace("\"", "")).matches()){
							importFailMsg = "Row "+ (j+2) +"- the room nights should be a valid number (without commas or decimals).";
							proceed= false;
						}
						else if(eachCity[0].equalsIgnoreCase(eachCityDup[0])
								&& eachCity[1].equalsIgnoreCase(eachCityDup[1])){
							if(marketType.equals("International"))
								importFailMsg ="Duplicates entries of City/Market Name and Country/Region at rows "+(i+2)+" and "+ (j+2);
							else
								importFailMsg ="Duplicates entries of City/Market Name and State at rows "+(i+2)+" and "+ (j+2);
							proceed = false;
						}
					
						}
					}
					
				}				
				if(!proceed){
					return importFailMsg;
				}else{
					try {						
						 for (int i = 0; i < rows; i++)  {
							 eachCity = cityList.get(i);
							 Markets market = new Markets();
							 market.setRecid(0L);
							 market.setSeqid((long) i);
							 market.setUsMarket((marketType.equals("US")? "Y" : "N"));
							 market.setMarketname(eachCity[0]);
							 if(marketType.equals("US")){
						    		market.setMarket_state(eachCity[1]);
						    		market.setMarket_country(null);
						    	}else{
						    		market.setMarket_country(eachCity[1]);
						    		market.setMarket_state(null);
						    }
							 market.setMarketpotentialrn(Long.parseLong(eachCity[2].replace("$$", "").replace("\"", "")));
							 if(eachCity.length == 5){
								 market.setCurractivity(eachCity[3].replace("$$", ",").replace("||", "\""));
								 market.setNotes(eachCity[4].replace("$$", ",").replace("||", "\""));
							 }else if(eachCity.length == 4){
								 market.setCurractivity(eachCity[3].replace("$$", ",").replace("||", "\""));
								 market.setNotes(null);
							 }else if(eachCity.length == 3){
								 market.setCurractivity(null);
								 market.setNotes(null);
							 }							 
							  Long recid= updateAcctOverviewMarketLevel(market,accountrecid);
							    if (recid == 0){
							    	importFailMsg = "Data not saved properly";
							    	return importFailMsg;
								}
						 	}	 
					} catch (Exception e) {
						log.error(e.getMessage(),e);
						importFailMsg = "Error Occurred while saving the details.";
				    	return importFailMsg;
					}
				}
				}catch(IndexOutOfBoundsException iob){
					if(iob.getLocalizedMessage().equals("0") || iob.getLocalizedMessage().equals("1") || iob.getLocalizedMessage().equals("2") ){
						importFailMsg = "The first three fields are required at row number "+(index+2);
					}else{
						importFailMsg = "Error occurred while reading the csv file at number "+(index+2);
					}
					return importFailMsg;
				}
				catch(Exception e){
					log.error(e.getMessage(),e);
					importFailMsg = "An Error Occured while parsing the csv file";
					return importFailMsg;
				}				
				finally {
				    if( br != null){
				    	 try {
				    		 br.close();
				         } catch (IOException e) {
							 log.error(e.getMessage(),e);
				         }
				    }		    	
				 }
		return importFailMsg;
	}
	
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - Start
	/* (non-Javadoc)
	 * @see com.marriott.rfp.dataacess.pricing.sapp.api.AccountOverviewManager#getExportDataSAPP(java.lang.String, java.util.List, java.util.List)
	 */
	public byte[] getExportDataSAPP(String marketType, List<Markets> markets) {

		//String fileName = "";
		//File file = null;
		//Writer fileWriter = null;
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		BufferedWriter bufferedWriter = null;
		OutputStreamWriter outputStreamWriter = new OutputStreamWriter(byteArrayOutputStream);
		byte[] byteArray = null;
		try {

			if (marketType.equals("US")) {


				bufferedWriter = new BufferedWriter(outputStreamWriter);

				String firstLine = "City/Market Name,State Code(two letter),Room Night Volume,Current account activity,Notes";
				firstLine += System.getProperty("line.separator");
				bufferedWriter.write(firstLine);

			} else if (marketType.equals("International")) {

				bufferedWriter = new BufferedWriter(outputStreamWriter);

				String firstLine = "City/Market Name,Country/Region Code(two letter),Room Night Volume,Current account activity,Notes";
				firstLine += System.getProperty("line.separator");
				bufferedWriter.write(firstLine);
			}

			for (Markets market : markets) {

				Markets marketInfo = getAcctOverviewMarketInfo(market
						.getRecid());

				if (null == marketInfo.getCurractivity())
					marketInfo.setCurractivity("");
				if (null == marketInfo.getNotes())
					marketInfo.setNotes("");

				String newLine = market.getMarketname() + ",";
				
				if (marketType.equals("US")) {
					
					newLine += market.getMarket_state() + ",";
					
				} else if (marketType.equals("International")) {
					
					newLine += market.getMarket_country() + ",";
				}
				
				newLine += market.getMarketpotentialrn() + ","
						+ marketInfo.getCurractivity() + ","
						+ marketInfo.getNotes();

				newLine += System.getProperty("line.separator");

				bufferedWriter.write(newLine);
			}

		} catch (IOException e) {

			byteArrayOutputStream = null;

		} finally {
			IOUtils.closeQuietly(bufferedWriter);
			IOUtils.closeQuietly(outputStreamWriter);
			if(byteArrayOutputStream != null)
				 byteArray = byteArrayOutputStream.toByteArray();
			IOUtils.closeQuietly(byteArrayOutputStream);

		}

		return byteArray;
	}
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - End
	
	@SuppressWarnings("unchecked")
	public List<PricingPeriod> findDueDates(long period) {
		String queryString = "SELECT pricingperiodid , period , duedate  FROM mfpdbo.cbcpricingperiod  where period =?1 order by duedate  ";

		Query q = em.createNativeQuery(queryString, PricingPeriod.class);
		q.setParameter(1, period);
		List<PricingPeriod> periodList = q.getResultList();
		return periodList;
	}
}
