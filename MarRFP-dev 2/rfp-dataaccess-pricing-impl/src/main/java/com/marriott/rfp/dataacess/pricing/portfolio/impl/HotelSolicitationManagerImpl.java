package com.marriott.rfp.dataacess.pricing.portfolio.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.portfolio.api.HotelSolicitationManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAddEmailInfo;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAvail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationEmail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationSelected;
import com.marriott.rfp.object.pricing.portfolio.SolicitSelect;
import com.marriott.rfp.object.pricing.sapp.Contacttype;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
//@Repository
public class HotelSolicitationManagerImpl implements HotelSolicitationManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public Long findPriorYearAccount(long accountrecid, long period) {
		long prioryear = period - 1;
		Long prioraccountrecid = null;
		String queryString = "select ACCOUNTRECID FROM MFPDBO.ACCOUNT WHERE PERIOD=?1 " + " AND ACCOUNTID in (SELECT ACCOUNTID  FROM MFPDBO.ACCOUNT WHERE ACCOUNTRECID= ?2 AND PERIOD=?3)";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, prioryear);
		q.setParameter(2, accountrecid);
		q.setParameter(3, period);
		try {
			prioraccountrecid = (Long) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return prioraccountrecid;
	}

	public List<HotelSolicitationAvail> findAvailHotelSolicitation(PricingFilterSelections filterValues, User user) {
		
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		
		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid "
				+ ", mfpproc.fn_getratetypeselected_aer(a.hotelid, " + filterValues.getAccountFilter().getAccountrecid() + ", " + filterValues.getYear() + ") ratetype_selected "
				+ ", ad.nopricing, ad.volunteered, nvl(hr.nopricing,decode(ad.nopricing,'','Y',ad.nopricing)) hasgenpricing, nvl(hr.willnotprice,'N') willnotprice " 
				+ ", (select status from mfpdbo.account_cbc_hotels cbc where a.hotelid = cbc.hotelid and cbc.accountrecid = " + accountFilter.getAccountrecid()+") status_CBC ";
		

		String fromString = " FROM mfpdbo.hotel a ";
		String whereString = " WHERE a.partition_idx='M' ";
		String orderString = "order by ";

		if (user.getIsLimitedSalesUser()) {
			fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) " + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') " + "   AND (d.partition_idx = 'M')) k ";
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
		

		if ((filterValues.getSolicittype().equals("Volunteered Rates") || filterValues.getSolicittype().equals("GPP Rates")) && accountFilter.getAccountrecid() > 0) {
			fromString += ", mfpdbo.accountdirectory ad , mfpdbo.hotelrfp hr ,  mfpdbo.hotel_accountinfo ha ";
			whereString += " and a.hotelid  = ad.hotelid and a.hotelid = hr.hotelid(+)  and hr.hotelrfpid = ha.hotelrfpid (+)" + " and ha.accountrecid = ad.accountrecid "
					+ " and (ad.selected is null or ad.selected='N') and ad.accountrecid = " + accountFilter.getAccountrecid();
			/** + ")"; **/
			if (filterValues.getSolicittype().equals("Volunteered Rates"))
				whereString += " and ad.volunteered = 'Y'  and (ha.ratetype_selected<>17 or ha.ratetype_selected is null) ";
			if (filterValues.getSolicittype().equals("GPP Rates"))
				whereString += "  and (ad.volunteered = 'N' or ad.volunteered is null) and (ha.ratetype_selected=18) ";
		} else {
			fromString += ",  ( select hotelid, period, nopricing, willnotprice from mfpdbo.hotelrfp where period = " + filterValues.getYear() + " ) hr ";
			fromString += ", (select hotelid, nopricing, volunteered from mfpdbo.accountdirectory " + " where accountrecid = " + +accountFilter.getAccountrecid() + " ) ad ";
			whereString += " and a.hotelid = hr.hotelid(+) and a.hotelid = ad.hotelid(+) ";
		}
		if (accountFilter.getAccountrecid() > 0) {
			whereString += " and a.hotelid not in (select hotelid from mfpdbo.account_solicited_hotels where accountrecid = " + accountFilter.getAccountrecid() + ")";
			
			/*whereString += " and a.hotelid not in (select hotelid from mfpdbo.account_cbc_hotels where accountrecid = " + accountFilter.getAccountrecid() + " and status='D')";*/
		
			whereString += " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
			if (filterValues.getSolicittype().equals("Prior Year Portfolio")) {
				Long prioraccountrecid = findPriorYearAccount(filterValues.getAccountFilter().getAccountrecid(), filterValues.getYear());
				whereString += "and (exists (select * from mfpdbo.accountdirectory w where w.accountrecid=" + prioraccountrecid + " and a.hotelid=w.hotelid and w.selected='Y'))";
			}
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
		
		whereString += getQuickSelect(filterValues);

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelSolicitationAvail.class);
		@SuppressWarnings("unchecked")
		List<HotelSolicitationAvail> hsa = q.getResultList();
		return hsa;
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
			whereString += " and a.affiliationid in (" + filterValues.getStringBrandList() + ") ";
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
			orderString += "  hotelname ASC";
			break;
		case 2:
			orderString += "  city ,  hotelname  ASC";
			break;
		case 3:
			orderString += "  state asc, city  ,  hotelname  ASC";
			break;
		case 4:
			orderString += " country ASC ,  state ASC , city  ,  hotelname  ASC";
			break;
		case 5:
			orderString += " status ";
			break;
		case 6:
			orderString += " email_sent_flag ";
			break;
		case 8:
			orderString += " check_rate ";
			break;
		case 9:
			orderString += " chasemail_sent_flag ";
			break;
		default:
			orderString += " country ASC ,  state ASC , city  ,  hotelname ASC";
			break;
		}
		return orderString;
	}

	public List<HotelSolicitationSelected> findSelectedHotelSolicitation(PricingFilterSelections filterValues, User user) {

//		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,40) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  nvl(st.status,'S') status, a.hotelid "
//				+ ", nvl(st.nopricing,nvl(r.nopricing,'Y')) nopricing, st.volunteered "
//				+ ", nvl(mfpproc.fn_getratetypeselected_aer(a.hotelid, "
//				+ filterValues.getAccountFilter().getAccountrecid()
//				+ ", "
//				+ filterValues.getYear() + "),decode(r.nopricing,'N',1,null))  ratetype_selected " + ", NVL (i.email_sent_flag, 'N') email_sent_flag, NVL (i.to_send_email, 'N') to_send_email "
//		
//		+",st.check_rate"
//		+ ", NVL (i.chasemail_sent_flag, 'N') chasemail_sent_flag, NVL (i.to_send_chasemail, 'N') to_send_chasemail ";
//
//		String fromString = " FROM mfpdbo.hotel a, mfpdbo.hotelrfp r ";
//		String whereString = " WHERE a.partition_idx='M' ";
//		String orderString = "order by ";
//
//		if (user.getIsLimitedSalesUser()) {
//			fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
//					+ " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid) " + "   AND (d.marshacode = a.marshacode)    AND (b.eid = '"
//					+ StringUtility.replaceSingleQuotes(user.getEid()) + "') " + "   AND (d.partition_idx = 'M')) k ";
//			whereString += " and a.hotelid=k.hotelid  ";
//		}
//		/**
//		 * Area Filter
//		 */
//		fromString += getAreaFrom(filterValues);
//		whereString += getAreaWhere(filterValues);
//
//		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
//		if (accountFilter.getAccountrecid() > 0) {
//			fromString += ", MFPDBO.ACCOUNT F";
//			whereString += " AND (i.HOTELID = A.HOTELID) " + " AND (i.ACCOUNTRECID = F.ACCOUNTRECID) " + " and i.accountrecid = " + accountFilter.getAccountrecid() + " " + " and f.period = "
//					+ filterValues.getYear() + " ";
//			fromString += ", MFPDBO.ACCOUNT_SOLICITED_HOTELS I ";
//
//		}
//
//		fromString += " ,( select hr.hotelrfpid, hr.hotelid,mfpproc.FN_SOLICIT_PROPERTY_RESPONDED(ha.hotel_accountinfoid) check_rate, " + 
//				"decode(mfpproc.fn_get_hotelaccountstatus(ha.hotel_accountinfoid),'Y','A','N','R', "
//				+ " (decode(mfpproc.fn_ishotelacctpgoos_pending(ha.hotel_accountinfoid),'Y','L'))) status " + ", nvl(hr.nopricing,decode(ad.nopricing,'','Y',ad.nopricing)) nopricing, ad.volunteered "
//				+ "  from mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr " + ", (select hotelid, nopricing, volunteered from mfpdbo.accountdirectory where accountrecid = "
//				+ accountFilter.getAccountrecid() + ") ad " + " where hr.period = " + filterValues.getYear() + " and accountrecid = " + accountFilter.getAccountrecid() + " and ha.hotelrfpid = hr.hotelrfpid and hr.hotelid = ad.hotelid(+) ) ST ";
//		whereString += " and r.period=" + filterValues.getYear() + " and r.hotelid=a.hotelid and (a.hotelid = st.hotelid(+)) ";
//
//		/**
//		 * Affiliation Filter
//		 */
//		whereString += getBrandWhere(filterValues);
//
//		/**
//		 * Managed/Franchise Filter
//		 */
//		whereString += getManagedWhere(filterValues);
//
//		whereString += getFilteredWhere(filterValues);
//
//		orderString += getOrderby(filterValues);
//
//		String queryString = selectString + fromString + whereString + orderString;
//
//		Query q = em.createNativeQuery(queryString, HotelSolicitationSelected.class);
//		@SuppressWarnings("unchecked")
//		List<HotelSolicitationSelected> hsa = q.getResultList();
//		return hsa;
		
		if (user.getIsLimitedSalesUser()) {
			return findSelectedHotelSolicitation_new1(filterValues,user);
		} else {
			return findSelectedHotelSolicitation_new(filterValues);
		}
		
	}
	
	private List<HotelSolicitationSelected> findSelectedHotelSolicitation_new(PricingFilterSelections filterValues) {
		
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country, "
				+ " nvl(decode(mfpproc.fn_get_hotelaccountstatus_new(i.accountrecid,a.hotelid,"+filterValues.getYear()+"),'Y','A','N','R', "
				+ " (decode(mfpproc.fn_ishotelacctpgoos_pendin_new(i.accountrecid,a.hotelid),'Y','L'))),'S') status, a.hotelid, "
				+ " nvl(r.nopricing,'Y') nopricing, ad.volunteered, "
				+ " nvl(mfpproc.fn_getratetypeselected_aer(a.hotelid, "
				+ filterValues.getAccountFilter().getAccountrecid()
				+ ", "
				+ filterValues.getYear() + "),decode(r.nopricing,'N',1,null))  ratetype_selected " + ", NVL (i.email_sent_flag, 'N') email_sent_flag, NVL (i.to_send_email, 'N') to_send_email, "
				+ " mfpproc.fn_solicit_property_respon_new(i.accountrecid,a.hotelid,"+filterValues.getYear()+") check_rate, "
		        + " NVL (i.chasemail_sent_flag, 'N') chasemail_sent_flag, NVL (i.to_send_chasemail, 'N') to_send_chasemail ";

		String fromString = " FROM MFPDBO.ACCOUNT_SOLICITED_HOTELS I, mfpdbo.hotel a, "
				+ "( select hotelrfpid, hotelid, period, nopricing, willnotprice from mfpdbo.hotelrfp where period = "+filterValues.getYear()+" ) r, "
				+ "(select hotelid, nopricing, volunteered from mfpdbo.accountdirectory  where accountrecid = "+accountFilter.getAccountrecid()+" ) ad ";
		String whereString = " WHERE i.accountrecid = " + accountFilter.getAccountrecid() + " and (i.hotelid = a.hotelid) and a.partition_idx='M' ";
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
		
		whereString += " and a.hotelid=ad.hotelid(+) and a.hotelid=r.hotelid(+) ";

		whereString += getFilteredWhere(filterValues);

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelSolicitationSelected.class);
		@SuppressWarnings("unchecked")
		List<HotelSolicitationSelected> hss = q.getResultList();
		return hss;
		
	}

	private List<HotelSolicitationSelected> findSelectedHotelSolicitation_new1(PricingFilterSelections filterValues, User user) {

		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country, "
				+ " nvl(decode(mfpproc.fn_get_hotelaccountstatus_new(i.accountrecid,a.hotelid,"+filterValues.getYear()+"),'Y','A','N','R', "
				+ " (decode(mfpproc.fn_ishotelacctpgoos_pendin_new(i.accountrecid,a.hotelid),'Y','L'))),'S') status, a.hotelid, "
				+ " nvl(r.nopricing,'Y') nopricing, ad.volunteered, "
				+ " nvl(mfpproc.fn_getratetypeselected_aer(a.hotelid, "
				+ filterValues.getAccountFilter().getAccountrecid()
				+ ", "
				+ filterValues.getYear() + "),decode(r.nopricing,'N',1,null))  ratetype_selected " + ", NVL (i.email_sent_flag, 'N') email_sent_flag, NVL (i.to_send_email, 'N') to_send_email, "
				+ " mfpproc.fn_solicit_property_respon_new(i.accountrecid,a.hotelid,"+filterValues.getYear()+") check_rate, "
		        + " NVL (i.chasemail_sent_flag, 'N') chasemail_sent_flag, NVL (i.to_send_chasemail, 'N') to_send_chasemail ";

		String fromString = " FROM MFPDBO.ACCOUNT_SOLICITED_HOTELS I, mfpdbo.hotel a, "
				+ "( select hotelrfpid, hotelid, period, nopricing, willnotprice from mfpdbo.hotelrfp where period = "+filterValues.getYear()+" ) r, "
				+ "(select hotelid, nopricing, volunteered from mfpdbo.accountdirectory  where accountrecid = "+accountFilter.getAccountrecid()+" ) ad, "
				+ "mfpdbo.ds_user usr, mfpdbo.ds_propusers pro ";
		String whereString = " WHERE i.accountrecid = " + accountFilter.getAccountrecid() + " and (i.hotelid = a.hotelid) and a.partition_idx='M' ";
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
		
		whereString += " and a.hotelid=ad.hotelid(+) and a.hotelid=r.hotelid(+) ";
		whereString += " and (usr.eid='" + StringUtility.replaceSingleQuotes(user.getEid()) + "') and usr.cn_userid=pro.cn_userid and pro.marshacode=a.marshacode ";

		whereString += getFilteredWhere(filterValues);

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, HotelSolicitationSelected.class);
		@SuppressWarnings("unchecked")
		List<HotelSolicitationSelected> hss = q.getResultList();
		return hss;
		
	}

	public String updateAccountSolicitationSelect(long accountrecid, List<SolicitSelect> solicitSelect, User user) {

		String strHotels = "";
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin ?:= mfpproc.fn_deletefromacctsolicitation( ?,?); end;");
				try {
					for (int i = 0; i < solicitSelect.size(); i++) {
						if (solicitSelect.get(i).getMove() != null) {
							long hotelid = solicitSelect.get(i).getHotelid();
							stmt.registerOutParameter(1, Types.VARCHAR);
							stmt.setLong(2, hotelid);
							stmt.setLong(3, accountrecid);
							stmt.executeUpdate();
							if (!stmt.getString(1).equals("Y")) {
								if (strHotels.length() > 0)
									strHotels += "\n";
								strHotels += stmt.getString(1);
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

	public void updateAccountSolicitationAvail(long accountrecid, List<Long> solictAvail, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_insertupdate_acctsolcit(?,?,?); end; ");
				try {
					for (int i = 0; i < solictAvail.size(); i++) {
						Long hotelid = solictAvail.get(i);
						if (hotelid != null) {
							stmt.setLong(1, accountrecid);
							stmt.setLong(2, hotelid);
							stmt.setString(3, "N");
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

	public HotelSolicitationEmail getEmailBodyData(Long accountrecid, Long hotelid, String addemailtext_screentype) {
		HotelSolicitationEmail hotelSolicitationEmail = null;
		boolean isExists = isExistsAdditionalEmailInfo(accountrecid, addemailtext_screentype);
		String strDueDate = "";
		String addInfo = "";
		if(addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			strDueDate = "to_char(decode(ha.rebid_flag3,'Y',ha.rebid_due3, decode(ha.rebid_flag2,'Y',ha.rebid_due2,decode(ha.rebid_flag,'Y',ha.rebid_due,sysdate+5))),'fmDay, Month dd, yyyy') duedate, ";
		}
		
		if (isExists) {
			addInfo = "aaet.additional_text freeFormText, nvl(aaet.sendfromtype,1) sendfromtype  ";
			if (addemailtext_screentype.equalsIgnoreCase("S")) {
				strDueDate = "decode(to_char(DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail),'mm/dd/yyyy'), '12/31/9999','TBD', decode(to_char(DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail),'mm/dd/yyyy'), '01/01/9999','CBC Collection',TO_CHAR (DECODE (aaet.duedate_foremail, NULL, pp.duedate, aaet.duedate_foremail), 'fmDay, Month dd, yyyy'))) duedate, ";
			}
		}
		else { 
			addInfo = "null as freeFormText, 1 as sendfromtype  ";
			if (addemailtext_screentype.equalsIgnoreCase("S")) {
				strDueDate = "decode(to_char(pp.duedate,'mm/dd/yyyy'), '12/31/9999','TBD',decode(to_char(pp.duedate,'mm/dd/yyyy'), '01/01/9999','CBC Collection', TO_CHAR ( pp.duedate, 'fmDay, Month dd, yyyy'))) duedate, ";
			}
		}
		String queryString = "SELECT h.NAME hotelname, marshacode, accountname, a.period,  "
			+  strDueDate + "ai_g.url accounturl, "
			+ " mfpproc.fn_getglobalcontact_for_email(a.accountrecid) globalContact, ai_g.contactemail globalContactEmail,  ai_b.contactname btamContact, ai_b.contactemail btamContactEmail, mfpproc.FN_GETSHAREDAL_CONTACT_FOR_EMAIL(a.accountrecid) sharedContact, ai_s.contactemail sharedContactEmail, "
			+ " (SELECT constant_value FROM mfpdbo.rfp_constants WHERE constant_name = 'CONTACT_EMAIL') adminEmail, (select constant_value from mfpdbo.rfp_constants where constant_name='CONTACT_NAME') adminName, a.accountpricingtype,  " + addInfo
			+ " FROM mfpdbo.ACCOUNT a,  mfpdbo.pricingperiod pp,  mfpdbo.pricingperiod_accounts ppa,  mfpdbo.hotel h, mfpdbo.account_addemailtext aaet, "
			+ " mfpdbo.hotel_accountinfo ha, mfpdbo.hotelrfp hr, "
			+ " (SELECT ai.accountrecid, ai.url, aic.contactname, aic.contactemail "
			+ " FROM mfpdbo.accountinfo ai, mfpdbo.accountinfo_contacts aic "
			+ " WHERE ai.accountinfoid = aic.accountinfoid AND aic.contacttypeid = 1) ai_g, "
			+ " (SELECT ai.accountrecid, aic.contactname, aic.contactemail "
			+ " FROM mfpdbo.accountinfo ai, mfpdbo.accountinfo_contacts aic "
			+ " WHERE ai.accountinfoid = aic.accountinfoid AND aic.contacttypeid = 8) ai_b, "
			+ " (SELECT ai.accountrecid, aic.contactname, aic.contactemail "
			+ " FROM mfpdbo.accountinfo ai, mfpdbo.accountinfo_contacts aic "
			+ " WHERE ai.accountinfoid = aic.accountinfoid AND aic.contacttypeid = 15) ai_s "
			+ " WHERE a.accountrecid = ppa.accountrecid(+)  AND pp.pricingperiodid(+) = ppa.pricingperiodid  AND a.accountrecid = ai_g.accountrecid(+)  AND a.accountrecid = ai_b.accountrecid(+) AND a.accountrecid = ai_s.accountrecid(+) AND a.accountrecid = aaet.accountrecid(+) "
			+ " and h.hotelid = hr.hotelid and a.accountrecid = ha.accountrecid and a.period = hr.period and ha.hotelrfpid = hr.hotelrfpid"
			+ "  AND a.hotel_display='Y' AND  a.accountrecid =  ?1 AND h.hotelid =?2";
			if (isExists) {
				queryString += " and aaet.addemailtext_screentype=?3 ";	
			}
		Query q = em.createNativeQuery(queryString, HotelSolicitationEmail.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, hotelid);
		if (isExists) {
		q.setParameter(3, addemailtext_screentype); 
		}
		try {
			hotelSolicitationEmail = (HotelSolicitationEmail) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return hotelSolicitationEmail;
	}

	public List<String> getEmailBodyDataQuestions(Long accountrecid) {
		String queryString = "SELECT   question   FROM mfpdbo.account_specific_questions asq   WHERE asq.accountrecid = ?1 ORDER BY question_seq";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountrecid);
		@SuppressWarnings("unchecked")
		List<String> questions = q.getResultList();
		return questions;
	}

	public List<String> getEmailBodyDataRespondents(Long hotelid, Long period) {
		String queryString = "SELECT trim(hrr.email)  FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelrfp_respondent hrr "
				+ " WHERE h.hotelid = hr.hotelid AND hr.hotelrfpid = hrr.hotelrfpid AND h.hotelid = ?1 AND period =?2";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<String> respondents = q.getResultList();
		return respondents;
	}

	public List<String> getEmailBodyDataRespondents2(Long hotelid, Long period, String addemailtext_screentype) {
		String rfpcontactsfilter = "";
		if (addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			rfpcontactsfilter = "and hrre.emailtypeid in ('1') ";
		}
		String queryString = "SELECT hrre.email " + " FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotelrfp_respondent hrr, mfpdbo.hotelrfp_res_emails hrre "
				+ " WHERE h.hotelid = hr.hotelid(+) and hr.hotelrfpid=hrr.hotelrfpid(+) " + " and hrr.rfprespondentid=hrre.rfprespondentid(+)AND h.hotelid =?1 and period=?2 "
				+ " and hrre.email is not null " + rfpcontactsfilter + " and hrre.emailtypeid not in ('4') " + "ORDER BY emailtypeid ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, period);
		@SuppressWarnings("unchecked")
		List<String> respondents = q.getResultList();
		return respondents;
	}

	public Contact getEmailBodyDataSalesContact(Long hotelid, Long accountrecid) {
		Contact salescontact = null;
		String queryString = "SELECT mfpproc.fn_getsalesname (hr.hotelrfpid, h.marshacode, ha.accountrecid) contactname, "
				+ " mfpproc.fn_getsalesemail (hr.hotelrfpid, h.marshacode, ha.accountrecid) contactemail "
				+ " FROM mfpdbo.hotel h, mfpdbo.hotelrfp hr, mfpdbo.hotel_accountinfo ha  WHERE h.hotelid = hr.hotelid(+) "
				+ " AND hr.hotelrfpid = ha.hotelrfpid(+)  AND h.hotelid =?1  AND ha.accountrecid =?2";
		Query q = em.createNativeQuery(queryString, Contact.class);
		q.setParameter(1, hotelid);
		q.setParameter(2, accountrecid);
		try {
			salescontact = (Contact) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return salescontact;
	}

	public Contact getEmailBodyDataMAESalesContact(Long hotelid, Long accountrecid) {
		Contact salescontact = null;
		String queryString = "SELECT sr.personname contactname, sr.email contactemail FROM mfpdbo.ACCOUNT a, mfpdbo.salesresp_prim_htlacct srph, "
				+ " mfpdbo.sales_respondent sr, mfpdbo.hotel h WHERE (sr.salesrespondentid = srph.salesrespondentid) "
				+ " AND (srph.accountid = a.accountid) AND srph.marshacode = h.marshacode AND (a.accountrecid = ?1 " + ") AND h.hotelid = ?2 ";
		Query q = em.createNativeQuery(queryString, Contact.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, hotelid);
		try {
			salescontact = (Contact) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return salescontact;
	}

	public void updateEmailSent(long accountrecid, long hotelid, boolean emailSent, User user , String mailType) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_update_acct_solicit_email (?,?,?,?); end; ");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setLong(2, hotelid);
					if(mailType.equals("sendemail")){
						stmt.setString(3, ((emailSent) ? "Y" : "P"));
						stmt.setString(4, "N");
					}else{
						stmt.setString(3, "N");
						stmt.setString(4, ((emailSent) ? "Y" : "P"));
					}
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

	public void updateRebidEmailSent(long accountrecid, long hotelid, long period, boolean emailSent, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.sp_update_rebid_chase_email (?,?,?,?); end; ");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setLong(2, hotelid);
					stmt.setLong(3, period);
					stmt.setString(4, ((emailSent) ? "Y" : "P"));
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
	
	public void updateResetRebidEmailSent(PricingFilterSelections filterValues) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				
				String queryString = "select hr.hotelrfpid from mfpdbo.accountdirectory ad, "
					+ "mfpdbo.hotel_accountinfo ha, mfpdbo.hotel h, mfpdbo.hotelrfp hr, MFPDBO.ACCOUNT a where "
					+ "ha.accountrecid = ad.accountrecid and a.accountrecid = ad.accountrecid and ha.accountrecid = a.accountrecid and "
					+ "ha.hotelrfpid = hr.hotelrfpid and hr.hotelid = ad.hotelid and hr.hotelid = h.hotelid " 
					+ "and a.period = hr.period and ad.accountrecid=? and a.period = ? and chasemail_sent_flag ='P' and ";
					if (filterValues.getAccountFilter().getAccountrecid() > 0) {
					    if (filterValues.getAccountFilter().getAccountstatus().equals("A")){
					    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'Y' ";
					    }else if (filterValues.getAccountFilter().getAccountstatus().equals("REJ")){	
					    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'N' ";
					    }else if (filterValues.getAccountFilter().getAccountstatus().equals("PEN")){	
					    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'P' ";
					    }else if (filterValues.getAccountFilter().getAccountstatus().equals("S"))
					    	queryString += "ad.selected = 'Y' ";
					    else if (filterValues.getAccountFilter().getAccountstatus().equals("V"))
					    	queryString += "ad.volunteered = 'Y' ";
					    else if (filterValues.getAccountFilter().getAccountstatus().equals("SOL")) 
					    	queryString += "(exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + filterValues.getAccountFilter().getAccountrecid() + " and x.hotelid=h.hotelid)) "
									+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + filterValues.getAccountFilter().getAccountrecid() + ")";							    
					}
					
				stmt = con.prepareCall("begin  update mfpdbo.hotel_accountinfo set chasemail_sent_flag = 'N' where accountrecid = ? and "
						+ " hotelrfpid in (" + queryString + ")"
						+ "; end; ");
				try {
					stmt.setLong(1, filterValues.getAccountFilter().getAccountrecid());
					stmt.setLong(2, filterValues.getAccountFilter().getAccountrecid());
					stmt.setLong(3, filterValues.getYear());
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
	public HotelSolicitationAddEmailInfo getAccountSolicitEmailAdditionalEmail(Long accountrecid, String addemailtext_screentype) {
		HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo = null;
		String queryString = "SELECT	a.duedate_foremail, a.additional_text, a.sendfromtype, a.sendfromemail  FROM mfpdbo.account_addemailtext a WHERE a.accountrecid = ?1 and a.addemailtext_screentype = ?2";
		Query q = em.createNativeQuery(queryString, HotelSolicitationAddEmailInfo.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, addemailtext_screentype);
		try {
			hotelSolicitationAddEmailInfo = (HotelSolicitationAddEmailInfo) q.getSingleResult();
		} catch (NoResultException e) {

		}
		return hotelSolicitationAddEmailInfo;
	}

	public void deleteAdditionalEmailTextAndDate(Long accountrecid, String addemailtext_screentype, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.SP_DELETE_ADDL_EMAIL_TEXT_DATE(?,?); end;");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setString(2, addemailtext_screentype);
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

	
	public void updateHotelSolicitationAddEmailInfo(Long accountrecid, HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_insertupd_acctsoladdemail_2(?,?,?,?,?,?); end;");
				try {
					stmt.setLong(1, accountrecid);
					stmt.setString(2, hotelSolicitationAddEmailInfo.getAdditional_text());
					if (hotelSolicitationAddEmailInfo.getDuedate_foremail() == null || hotelSolicitationAddEmailInfo.getDuedate_foremail().equals(""))
						stmt.setDate(3, null);
					else
						stmt.setDate(3, (Date) new Date(hotelSolicitationAddEmailInfo.getDuedate_foremail().getTime()));
					stmt.setLong(4, hotelSolicitationAddEmailInfo.getSendfromtype());
					stmt.setString(5, hotelSolicitationAddEmailInfo.getSendfromemail());
					stmt.setString(6,hotelSolicitationAddEmailInfo.getAddemailtext_screentype());
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

	public List<String> getEmailNotSent(PricingFilterSelections filterValues, String addemailtext_screentype) {
		String queryString = "";
		if (addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			queryString = "select h.marshacode || ' - ' ||  name hotelname from mfpdbo.accountdirectory ad, "
				+ "mfpdbo.hotel_accountinfo ha, mfpdbo.hotel h, mfpdbo.hotelrfp hr, MFPDBO.ACCOUNT a where "
				+ "ha.accountrecid = ad.accountrecid and a.accountrecid = ad.accountrecid and ha.accountrecid = a.accountrecid and "
				+ "ha.hotelrfpid = hr.hotelrfpid and hr.hotelid = ad.hotelid and hr.hotelid = h.hotelid " 
				+ "and a.period = hr.period and ad.accountrecid=?1 and a.period = ?2 and chasemail_sent_flag ='P' and ";
				if (filterValues.getAccountFilter().getAccountrecid() > 0) {
				    if (filterValues.getAccountFilter().getAccountstatus().equals("A")){
				    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'Y' ";
				    }else if (filterValues.getAccountFilter().getAccountstatus().equals("REJ")){	
				    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'N' ";
				    }else if (filterValues.getAccountFilter().getAccountstatus().equals("PEN")){
				    	queryString += "mfpproc.fn_accountstatus(ha.hotel_accountinfoid) = 'P' ";
				    }else if (filterValues.getAccountFilter().getAccountstatus().equals("S"))
				    	queryString += "ad.selected = 'Y' ";
				    else if (filterValues.getAccountFilter().getAccountstatus().equals("V"))
				    	queryString += "ad.volunteered = 'Y' ";
				    else if (filterValues.getAccountFilter().getAccountstatus().equals("SOL"))
				    	queryString += "(exists(select *  from mfpdbo.account_solicited_hotels x where x.accountrecid=" + filterValues.getAccountFilter().getAccountrecid() + " and x.hotelid=h.hotelid)) "
								+ " AND h.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + filterValues.getAccountFilter().getAccountrecid() + ")";							    
				}
				queryString += " order by marshacode";
		} else {
			queryString = "select marshacode || ' - ' ||  name hotelname from mfpdbo.hotel where hotelid in ("
				+ "select hotelid from mfpdbo.account_solicited_hotels where email_sent_flag ='P' and accountrecid=?1" + ") order by marshacode ";
		}
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, filterValues.getAccountFilter().getAccountrecid());
		q.setParameter(2, filterValues.getYear());
		@SuppressWarnings("unchecked")
		List<String> emailnotsent = q.getResultList();
		if (addemailtext_screentype != null && addemailtext_screentype.equalsIgnoreCase("R")) {
			updateResetRebidEmailSent(filterValues);
		} else {
			updateHotelSolicitationResetEmailSent(filterValues.getAccountFilter().getAccountrecid());
		}
		return emailnotsent;
	}

	public void updateHotelSolicitationResetEmailSent(Long accountrecid) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con.prepareCall("begin  update mfpdbo.account_solicited_hotels set email_sent_flag = 'N' where accountrecid = ? and email_sent_flag='P'; end; ");
				try {
					stmt.setLong(1, accountrecid);
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

	public List<Contacttype> getEmailContactOptions(String addemailtext_screentype) { 
		String queryString = "SELECT contacttypeid, contacttypedesc from mfpdbo.accountinfo_contacttype where contacttypeid in (1,8,15) order by contacttypeid";
		Query q = em.createNativeQuery(queryString, Contacttype.class);

		@SuppressWarnings("unchecked")
		List<Contacttype> contactlist = q.getResultList();
		return contactlist;
	}

	public Contacttype getEmailContactOption(Long accountrecid, String addemailtext_screentype) { 
		String queryString = "SELECT contacttypeid, contacttypedesc from mfpdbo.accountinfo_contacttype ac, mfpdbo.account_addemailtext a  where a.sendfromtype=ac.contacttypeid and a.accountrecid=?1 and a.addemailtext_screentype=?2 "; 
		Query q = em.createNativeQuery(queryString, Contacttype.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, addemailtext_screentype); 
		Contacttype contact;
		try {
			contact = (Contacttype) q.getSingleResult();
		} catch (NoResultException e) {
			contact = null;
		}
		return contact;
	}

	public boolean isExistsAdditionalEmailInfo(long accountrecid, String addemailtext_screentype) {
		boolean isExists = false;
		long count = new Long(0);
			String queryString = "SELECT COUNT(*) FROM MFPDBO.ACCOUNT_ADDEMAILTEXT WHERE ACCOUNTRECID= ?1 AND ADDEMAILTEXT_SCREENTYPE=?2";
			Query q = em.createNativeQuery(queryString, Long.class);
			q.setParameter(1, accountrecid);
			q.setParameter(2, addemailtext_screentype);
			try {
				count = (Long) q.getSingleResult();
			} catch (NoResultException e) {
				count = 0;
			}
			if (count > 0) {
				isExists = true;
			}
		return isExists;
	}
}
