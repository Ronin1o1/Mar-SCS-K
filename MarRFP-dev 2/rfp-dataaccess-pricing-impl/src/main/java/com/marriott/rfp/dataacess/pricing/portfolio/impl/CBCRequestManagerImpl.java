package com.marriott.rfp.dataacess.pricing.portfolio.impl;

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
import com.marriott.rfp.dataacess.pricing.portfolio.api.CBCRequestManager;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestAvail;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestSelected;
import com.marriott.rfp.object.pricing.portfolio.CBCSelect;
import com.marriott.rfp.object.pricing.portfolio.CBCStatus;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class CBCRequestManagerImpl implements CBCRequestManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public List<CBCRequestAvail> findAvailCBCRequest(PricingFilterSelections filterValues, User user) {

		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  a.hotelid ";

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
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (accountFilter.getAccountrecid() > 0) {
			whereString += " and a.hotelid not in (select hotelid from mfpdbo.account_cbc_hotels where accountrecid = " + accountFilter.getAccountrecid() + ")";
			whereString += " and a.hotelid not in (select hotelid from mfpdbo.account_solicited_hotels where accountrecid = " + accountFilter.getAccountrecid() + ")";
			whereString += " AND a.affiliationid IN (SELECT affiliationid FROM mfpdbo.brand_accounts where accountrecid = " + accountFilter.getAccountrecid() + ")";
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

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, CBCRequestAvail.class);
		@SuppressWarnings("unchecked")
		List<CBCRequestAvail> hsa = q.getResultList();
		return hsa;
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
			orderString += "nvl(i.status,'S')  ";
			break;
		default:
			orderString += " nvl(A.COUNTRY, ' ') ASC ,  nvl(A.STATE, ' ') ASC , nvl(A.CITY, ' ')  ,  substr(A.NAME,1,36)  ASC";
			break;
		}
		return orderString;
	}

	private String getStatusOrderby(PricingFilterSelections filterValues) {
		String orderString = "";
		switch (filterValues.getOrderBy()) {
		case 0:
			orderString += " marshacode asc";
			break;
		case 1:
			orderString += "  substr(hotelname,1,36)  ASC";
			break;
		case 2:
			orderString += "nvl(status,'S')  ";
			break;
		case 3:
			orderString += "nvl(rejectionreason,'No Reason Provided.'), marshacode asc";
			break;
		case 4:
			orderString += "cbccreatedate, marshacode asc ";
			break;
		case 15:
			orderString += "  nvl(CITY, ' ')  ,  substr(hotelname,1,36)  ASC";
			break;
		case 16:
			orderString += "  nvl(STATE, ' ') asc, nvl(CITY, ' ')  ,  substr(hotelname,1,36)  ASC";
			break;
		case 17:
			orderString += " nvl(COUNTRY, ' ') ASC ,  nvl(STATE, ' ') ASC , nvl(CITY, ' ')  ,  substr(hotelname,1,36)  ASC";
			break;
		default:
			orderString += " nvl(COUNTRY, ' ') ASC ,  nvl(STATE, ' ') ASC , nvl(CITY, ' ')  ,  substr(hotelname,1,36)  ASC";
			break;
		}
		return orderString;
	}

	public List<CBCRequestSelected> findSelectedCBCRequest(PricingFilterSelections filterValues, User user) {

		String selectString = "select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,  i.status, statusdescription, a.hotelid ";

		String fromString = " FROM mfpdbo.hotel a ";
		String whereString = " WHERE a.partition_idx='M' ";
		String orderString = "order by ";

		if (user.getIsLimitedSalesUser()) {
			fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid)    AND (d.marshacode = a.marshacode)    AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')    AND (d.partition_idx = 'M')) k ";
			whereString += " and a.hotelid=k.hotelid  ";
		}
		/**
		 * Area Filter
		 */
		fromString += getAreaFrom(filterValues);
		whereString += getAreaWhere(filterValues);

		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();
		if (accountFilter.getAccountrecid() > 0) {
			fromString += ", MFPDBO.ACCOUNT F";
			whereString += " AND (i.HOTELID = A.HOTELID)  AND (i.ACCOUNTRECID = F.ACCOUNTRECID) and i.status=cbcr.status(+) and i.accountrecid = " + accountFilter.getAccountrecid()
					+ " and f.period = " + filterValues.getYear() + " ";
			fromString += ", MFPDBO.ACCOUNT_cbc_HOTELS I, mfpdbo.cbcstatus_ref cbcr ";

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

		orderString += getOrderby(filterValues);

		String queryString = selectString + fromString + whereString + orderString;

		Query q = em.createNativeQuery(queryString, CBCRequestSelected.class);
		@SuppressWarnings("unchecked")
		List<CBCRequestSelected> hsa = q.getResultList();
		return hsa;
	}

	public String updateAccountCBCSelect(long accountrecid, List<CBCSelect> cbcSelect, User user) {

		String strHotels = "";
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_delete_acctcbc(?,?); end; ");
				try {
					for (int i = 0; i < cbcSelect.size(); i++) {
						if (cbcSelect.get(i).getMove() != null) {
							long hotelid = cbcSelect.get(i).getHotelid();
							stmt.setLong(1, accountrecid);
							stmt.setLong(2, hotelid);
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

		return strHotels;
	}

	public void updateAccountCBCAvail(long accountrecid, List<Long> cbcAvail, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin  mfpproc.sp_insertupdate_acctcbc(?,?); end; ");
				try {
					for (int i = 0; i < cbcAvail.size(); i++) {
						Long hotelid = cbcAvail.get(i);
						if (hotelid != null) {
							stmt.setLong(1, accountrecid);
							stmt.setLong(2, hotelid);
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

	public List<CBCStatus> findSelectedCBCStatus(PricingFilterSelections filterValues, User user) {
		PricingAccountFilterValue accountFilter = filterValues.getAccountFilter();

		String selectString = "select marshacode, hotelname, city, state, country, status, hotelid, issolicited,isremovedsolicited, rejectreasonid, case when status='D' and rejectionreason is null then 'No Reason Provided.' else rejectionreason end rejectionreason, cbccreatedate, cbc_softduedate,  "
				+ " case when trunc(cbccreatedate)>trunc(cbc_softduedate) then 'Y' else 'N' end pastdue "
				+ " from (select distinct A.MARSHACODE , substr(A.NAME,1,36) hotelname ,  nvl(A.CITY, ' ') city , nvl(A.STATE, ' ') state, nvl(A.COUNTRY, ' ') country,i.isremovedsolicited,i.status, a.hotelid, mfpproc.fn_issolicited_hotel("
				+ accountFilter.getAccountrecid() 
				+ ", a.hotelid) isSolicited, r.rejectreasonid, r.rejectionreason, trunc(mfpproc.fn_cbccreatedate(f.accountrecid, a.hotelid)) cbccreatedate, ai.cbc_softduedate ";

		String fromString = " FROM mfpdbo.hotel a ";
		String whereString = " WHERE a.partition_idx='M' ";
		String orderString = "order by ";

		if (user.getIsLimitedSalesUser()) {
			fromString += " , (SELECT d.hotelid   FROM mfpdbo.ds_member c, mfpdbo.ds_user b, mfpdbo.ds_propusers a, mfpdbo.hotel d "
					+ " WHERE (a.ou_groupid = c.ou_groupid)    AND (a.cn_userid = c.cn_userid)   AND (c.cn_userid = b.cn_userid)    AND (d.marshacode = a.marshacode)    AND (b.eid = '"
					+ StringUtility.replaceSingleQuotes(user.getEid()) + "')    AND (d.partition_idx = 'M')) k ";
			whereString += " and a.hotelid=k.hotelid  ";
		}
		/**
		 * Area Filter
		 */
		fromString += getAreaFrom(filterValues);
		whereString += getAreaWhere(filterValues);

		if (accountFilter.getAccountrecid() > 0) {
			fromString += ", MFPDBO.ACCOUNT F";
			whereString += " AND (i.HOTELID = A.HOTELID)  AND (i.ACCOUNTRECID = F.ACCOUNTRECID)   AND ( i.rejectionreasonid = r.rejectreasonid(+) ) and (f.accountrecid=ai.accountrecid(+)) and i.accountrecid = "
					+ accountFilter.getAccountrecid() + " and f.period = " + filterValues.getYear() + " ";
			fromString += ", MFPDBO.ACCOUNT_cbc_HOTELS I, mfpdbo.cbcreject_ref r,mfpdbo.accountinfo ai  ";

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

		orderString += getStatusOrderby(filterValues);

		String queryString = selectString + fromString + whereString + ") " + orderString;

		Query q = em.createNativeQuery(queryString, CBCStatus.class);
		@SuppressWarnings("unchecked")
		List<CBCStatus> hsa = q.getResultList();
		return hsa;
	}

	public void updateAcceptanceCBCStatusList(List<CBCStatus> pslist, Long accountrecid, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				stmt = con.prepareCall("begin  mfpproc.sp_updatecbcstatus_hpp(?,?,?,?); end; ");
				try {
					stmt.setLong(2, accountrecid);
					Long reject = null;
					String status = null;
					for (int i = 0; i < pslist.size(); i++) {
						CBCStatus model = (CBCStatus) pslist.get(i);
						if (model.getStatus() == null || model.getStatus().equals("X"))
							status = null;
						else
							status = model.getStatus();
						if (status == null || status.equals("Y") || model.getRejectreasonid() == null || model.getRejectreasonid() == 0)
							reject = null;
						else
							reject = new Long(model.getRejectreasonid());

						if (model.getChanged().equals("Y")) {
							stmt.setLong(1, model.getHotelid());
							stmt.setString(3, model.getStatus());
							stmt.setObject(4, reject, Types.NUMERIC);
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
	
	public void updateCBCListByProperty(String status, List<CBCStatus> pslist, Long accountrecid, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				stmt = con.prepareCall("begin  mfpproc.sp_updatecbcstatus_hpp(?,?,?,?); end; ");
				try {
					stmt.setLong(2, accountrecid);
					Long reject = null;
					String status1 = null;
					for (int i = 0; i < pslist.size(); i++) {
						CBCStatus model = (CBCStatus) pslist.get(i);
						if (model.getStatus() == null || model.getStatus().equals("X"))
							status1 = null;
						else
							status1 = status;
						if (status1 == null || status1.equals("Y") || model.getRejectreasonid() == null || model.getRejectreasonid() == 0)
							reject = null;
						else
							reject = new Long(model.getRejectreasonid());

						if (model.getChanged().equals("Y")) {
							stmt.setLong(1, model.getHotelid());
							stmt.setString(3, status);
							stmt.setObject(4, reject, Types.NUMERIC);
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

	public void updateAllAcceptanceCBCStatusList(String status, List<CBCStatus> pslist, Long accountrecid, User user) {

		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);

				stmt = con.prepareCall("begin  mfpproc.sp_updatecbcstatus_hpp(?,?,?,?); end; ");
				try {
					stmt.setLong(2, accountrecid);

					for (int i = 0; i < pslist.size(); i++) {
						CBCStatus model = (CBCStatus) pslist.get(i);
						if (model.getStatus() != null && ((status.equals("A") && model.getStatus().equals("D")) || model.getStatus().equals("C"))) {
							stmt.setLong(1, model.getHotelid());
							stmt.setString(3, status);
							if(model.getRejectreasonid() != null)
								stmt.setLong(4, model.getRejectreasonid());
							else
								stmt.setNull(4, Types.NUMERIC);
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

	@SuppressWarnings("unchecked")
	public List<RejectionReason> findRejectionReasons() {

		String queryString = " SELECT A.REJECTREASONID, A.REJECTIONREASON FROM MFPDBO.CBCREJECT_REF A ORDER BY A.REJECTIONREASON ASC ";
		Query q = em.createNativeQuery(queryString, RejectionReason.class);
		List<RejectionReason> rateslist = q.getResultList();
		return rateslist;
	}

}
