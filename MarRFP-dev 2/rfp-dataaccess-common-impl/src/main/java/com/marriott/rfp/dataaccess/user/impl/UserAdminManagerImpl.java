package com.marriott.rfp.dataaccess.user.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.user.api.UserAdminManager;
import com.marriott.rfp.object.franchise.Franchise;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.InternalNotes;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class UserManagerImpl
 */
@Service
public class UserAdminManagerImpl implements UserAdminManager {

	private static final Logger log = LoggerFactory.getLogger(UserAdminManagerImpl.class);

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
		
	/**
	 * Default constructor.
	 */
	public UserAdminManagerImpl() {
	}

	private String buildUserListQuery(String role, int groupid, String filterString, String searchBy, int orderby) {

		String q = "";
		if (role.equals("MFPUSER")) {
			q = "SELECT A.CN_USERID , A.EID , A.CN_LASTNAME , A.CN_FIRSTNAME , A.CN_MAIL "
				+ ", A.CN_PHONE , A.CN_CITY , A.CN_STATE , A.CN_COUNTRY, null marshacode, null accountname,C.user_internalnotes,"
				+ " a.companyname, a.enhanced_reporting, 0 acctcount, count(D.marshacode) marshacount  "
				+ " FROM MFPDBO.DS_USER A , MFPDBO.DS_MEMBER B , mfpdbo.DS_USERNOTES C," + " (select d.marshacode, d.ou_groupid, d.cn_userid "
				+ " from MFPDBO.DS_PROPUSERS d, mfpdbo.hotel e " + " where (d.marshacode=e.marshacode) "
				+ " and e.partition_idx in ('M','R')) D " + " WHERE (B.CN_USERID = A.CN_USERID) " + " AND (B.OU_GROUPID = " + groupid + ") "
				+ " AND (D.OU_GROUPID (+) = B.OU_GROUPID) "+"AND (C.CN_USERID (+) = B.CN_USERID)" + " AND (D.CN_USERID (+) = B.CN_USERID) " + " AND (A.CN_REFRESH != -1)";
		} else if (role.equals("MFPSALES")) {
			q = "SELECT   A.CN_USERID , A.EID , A.CN_LASTNAME , A.CN_FIRSTNAME , A.CN_MAIL "
				+ ", A.CN_PHONE  , A.CN_CITY , A.CN_STATE , A.CN_COUNTRY, null marshacode, null accountname,C.user_internalnotes,"
				+ "a.companyname, 'N' enhanced_reporting, count(d.accountname) acctcount, 0 marshacount " + "FROM   MFPDBO.DS_USER A "
				+ ", MFPDBO.DS_MEMBER B , mfpdbo.DS_USERNOTES C " + ",(SELECT   A.CN_USERID , C.ACCOUNTNAME " + "	FROM   MFPDBO.DS_ACCOUNTUSERS A  "
				+ "	, (select b.accountid, b.accountname, b.period from mfpdbo.account b, " + "  (SELECT   A.ACCOUNTID , MAX(A.PERIOD) period "
				+ " FROM MFPDBO.ACCOUNT A " + " where account_tracking_only ='N' " + " GROUP BY   A.ACCOUNTID " + "    order by accountid) c "
				+ "where b.accountid=c.accountid " + "and b.period=c.period " + "order by accountname) C  " + "WHERE    (A.OU_GROUPID = "
				+ groupid + ")  " + "AND (A.ACCOUNTID = C.ACCOUNTID)  ) d " + "WHERE     (B.CN_USERID = A.CN_USERID) " + "AND (B.OU_GROUPID = "
				+ groupid + ") " + "and (a.cn_userid = d.cn_userid(+)) "+"AND (C.CN_USERID (+) = B.CN_USERID)" + " AND (A.CN_REFRESH != -1) ";
		} else if (role.equals("MFPADMIN") || role.equals("MFPWSADM") || role.equals("MFPPPADM") || role.equals("MFPFSALE") || role.equals("MFPRDADM") || role.equals("MFPDBMAR")
				|| role.equals("MFPAPADM") || role.equals("MFPKORAD") || role.equals("MFPREAD")) {
			q = "SELECT   A.CN_USERID , A.EID , A.CN_LASTNAME , A.CN_FIRSTNAME , A.CN_MAIL "
				+ " , A.CN_PHONE , A.CN_CITY, A.CN_STATE , A.CN_COUNTRY, null marshacode, null accountname, a.companyname, C.user_internalnotes,"
				+ "'N' enhanced_reporting, 0 acctcount, 0 marshacount" + " FROM   MFPDBO.DS_USER A " + ", MFPDBO.DS_MEMBER B,mfpdbo.DS_USERNOTES C "
				+ "WHERE (B.CN_USERID = A.CN_USERID) " + "AND (B.OU_GROUPID = " + groupid + " )"+"AND (C.CN_USERID (+) = B.CN_USERID)"   + " AND (A.CN_REFRESH != -1) ";
		}

		q += getSearchByClause(filterString, searchBy);
		if (role.equals("MFPUSER") || role.equals("MFPSALES")) {
			q += " Group BY A.CN_USERID , A.EID , A.CN_LASTNAME , A.CN_FIRSTNAME , A.CN_MAIL "
				+ ", A.CN_PHONE  , A.CN_CITY , A.CN_STATE , A.CN_COUNTRY, a.companyname,a.enhanced_reporting ,C.user_internalnotes";

		}
		if (orderby != -1)
			q += getOrderByClause(orderby) + " ";
		return q;
	}

	private String getSearchByClause(String filterString, String searchBy) {
		String alphaClause = "";
		String colname = "";
		if (filterString != null && !filterString.equals("")) {
			if (searchBy != null && !searchBy.equals("")) {
				if (searchBy.equals("EID")) {
					colname = "A.EID";
				} else if (searchBy.equals("LASTNAME")) {
					colname = "cn_lastname";
				}
			} 
			alphaClause = " AND (UPPER(" + colname + ") LIKE '" + StringUtility.replaceSingleQuotes(filterString.toUpperCase()) + "%') ";	
		} else {
			alphaClause = " ";
		}
		return alphaClause;
	}

	private String getOrderByClause(int sortOrder) {
		String orderBy = " ORDER BY UPPER(cn_lastname), UPPER(cn_firstname)";

		switch (sortOrder) {
		case 1:
			orderBy = " ORDER BY UPPER(A.EID) ";
			break;
		case 2:
			orderBy = " ORDER BY UPPER(cn_lastname), UPPER(cn_firstname) ";
			break;
		case 3:
			orderBy = " ORDER BY UPPER(cn_firstname) , UPPER(cn_lastname) ";
			break;
		case 4:
			orderBy = " ORDER BY UPPER(cn_city) ";
			break;
		case 5:
			orderBy = " ORDER BY UPPER(cn_state) ";
			break;
		case 6:
			orderBy = " ORDER BY UPPER(MarshaCode) ";
			break;
		case 7:
			orderBy = " ORDER BY UPPER(accountname) ";
			break;
		case 8:
			orderBy = " ORDER BY UPPER(companyname) ";
			break;
		}
		return orderBy;
	}

	@SuppressWarnings("unchecked")
	public List<DSUser> getFranchiseSalesUserList(String role, String filterString, String searchBy, int orderby, Page page) {

		String queryString;
		int groupid = getGroupID(role);
		queryString = "SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, CN_MAIL "
			+ ", CN_PHONE, CN_CITY, CN_STATE, CN_COUNTRY, marshacode, accountname, companyname,user_internalnotes"
			+ " From (SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, CN_MAIL "
			+ ", CN_PHONE, CN_CITY, CN_STATE, CN_COUNTRY, marshacode, accountname, companyname,user_internalnotes,rownum arow "
			+ " FROM (SELECT   A.CN_USERID , A.EID , A.CN_LASTNAME , A.CN_FIRSTNAME , A.CN_MAIL "
			+ " , A.CN_PHONE , A.CN_CITY, A.CN_STATE , A.CN_COUNTRY, null marshacode, null accountname, a.companyname,c.user_internalnotes,b.ou_groupid "
			+ "FROM   MFPDBO.DS_USER A " + ", MFPDBO.DS_MEMBER B " + ", MFPDBO.DS_USERNOTES C "+ "WHERE   (B.CN_USERID = A.CN_USERID) " 
			+  "AND (B.OU_GROUPID = " + groupid + " ) " 
			+ "AND (C.CN_USERID(+) = B.CN_USERID) "
			+ " AND (A.CN_REFRESH != -1) ";

		queryString += getSearchByClause(filterString, searchBy) + " " + getOrderByClause(orderby);
		Long endaccount = page.getPage() * page.getMaxpagelen();
		Long startaccount = endaccount - page.getMaxpagelen() + 1;

		queryString += "))  where   arow>=" + startaccount + " and arow <=" + endaccount;
		Query q = em.createNativeQuery(queryString, DSUser.class);
		List<DSUser> userList = q.getResultList();

		for (DSUser aUser : userList) {
			int count = getMarshaAccountNumber(aUser.getEid());
			aUser.setAcctcount(count);
			aUser.setMarshacount(count);
		}

		return userList;

	}

	public int getMarshaAccountNumber(String eid) {

		String queryString;
		queryString  = "Select count(*) FROM (SELECT DECODE (a.eid, '', b.eid, a.eid) eid, a.marshacode,  b.accountname "
			+ "  FROM (SELECT   ROWNUM rnum, c.eid, b.marshacode "
			+ "            FROM mfpdbo.ds_propusers b, mfpdbo.ds_user c, mfpdbo.hotel d "
			+ "           WHERE (c.cn_userid = b.cn_userid(+)) AND (c.eid = '"
			+ StringUtility.replaceSingleQuotes(eid) + "') "
			+ " AND b.marshacode = d.marshacode  AND	d.partition_idx='M' " + "        ORDER BY marshacode) a, "
			+ "       (SELECT ROWNUM rnum, eid, accountid, accountname "
			+ "          FROM (SELECT   c.eid, e.accountid, b.accountname " + "                    FROM mfpdbo.ds_user c, "
			+ "                         mfpdbo.ds_accountusers e, "
			+ "                         (SELECT b.accountid, b.accountname "
			+ "                            FROM mfpdbo.ACCOUNT b, "
			+ "                                 (SELECT   a.accountid, MAX (a.period) period "
			+ "                                      FROM mfpdbo.ACCOUNT a "
			+ "                                     WHERE account_tracking_only = 'N' "
			+ "                                  GROUP BY a.accountid) c "
			+ "                           WHERE b.accountid = c.accountid AND b.period = c.period) b "
			+ "                   WHERE (e.cn_userid = c.cn_userid) " + "                     AND (c.eid = '"
			+ StringUtility.replaceSingleQuotes(eid) + "') "
			+ "                     AND (b.accountid = e.accountid(+)) " + "                ORDER BY accountname)) b "
			+ " WHERE a.eid(+) = b.eid AND a.rnum(+) = b.rnum " + "UNION "
			+ "SELECT DECODE (a.eid, '', b.eid, a.eid) eid, a.marshacode, b.accountname "
			+ "  FROM (SELECT   ROWNUM rnum, c.eid, b.marshacode "
			+ "            FROM mfpdbo.ds_propusers b, mfpdbo.ds_user c, mfpdbo.hotel d "
			+ "           WHERE (c.cn_userid = b.cn_userid(+)) AND (c.eid = '"
			+ StringUtility.replaceSingleQuotes(eid) + "') "
			+ " AND b.marshacode = d.marshacode  AND d.partition_idx='M' " + "        ORDER BY marshacode) a, "
			+ "       (SELECT ROWNUM rnum, eid, accountid, accountname "
			+ "          FROM (SELECT   c.eid, e.accountid, b.accountname " + "                    FROM mfpdbo.ds_user c, "
			+ "                         mfpdbo.ds_accountusers e, "
			+ "                         (SELECT b.accountid, b.accountname "
			+ "                            FROM mfpdbo.ACCOUNT b, "
			+ "                                 (SELECT   a.accountid, MAX (a.period) period "
			+ "                                      FROM mfpdbo.ACCOUNT a "
			+ "                                     WHERE account_tracking_only = 'N' "
			+ "                                  GROUP BY a.accountid) c "
			+ "                           WHERE b.accountid = c.accountid AND b.period = c.period) b "
			+ "                   WHERE (e.cn_userid = c.cn_userid) " + "                     AND (c.eid = '"
			+ StringUtility.replaceSingleQuotes(eid) + "') "
			+ "                     AND (b.accountid = e.accountid(+)) " + "                ORDER BY accountname)) b "
			+ " WHERE a.eid = b.eid(+) AND a.rnum = b.rnum(+))";


		Query q = em.createNativeQuery(queryString, Integer.class);
		int count = (Integer) q.getSingleResult();

		return count;

	}

	@SuppressWarnings("unchecked")
	public List<DSUser> getUserList(String role, String filterString, String searchBy, int orderby, Page page) {

		String queryString;
		int groupid = getGroupID(role);
		queryString = buildUserListQuery(role, groupid, filterString, searchBy, orderby);
		Long endaccount = page.getPage() * page.getMaxpagelen();
		Long startaccount = endaccount - page.getMaxpagelen() + 1;

		if (role.equals("MFPFSALE")) {
			List<DSUser> list = getFranchiseSalesUserList(role, filterString, searchBy, orderby, page);
			return list;
		}

		queryString = "SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, CN_MAIL "
			+ ", CN_PHONE, CN_CITY, CN_STATE, CN_COUNTRY, marshacode, accountname,"
			+ " companyname, enhanced_reporting, acctcount, marshacount ,user_internalnotes"
			+ " FROM (SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, CN_MAIL "
			+ ", CN_PHONE, CN_CITY, CN_STATE, CN_COUNTRY, marshacode, accountname, "
			+ " companyname, enhanced_reporting, acctcount, marshacount,user_internalnotes, rownum arow " + " FROM (" + queryString + ")) where arow>="
			+ startaccount + " and arow <=" + endaccount;

		Query q = em.createNativeQuery(queryString, DSUser.class);
		List<DSUser> userList = q.getResultList();
		return userList;
	}

	@SuppressWarnings("unchecked")
	public List<DSUser> getUserListForCopy(Long userid, String role, String filterString, String searchBy, int orderby, Page page) {

		String queryString;
		int groupid = getGroupID(role);
		String groupStr = "(" + groupid;
		if (role.equals("MFPSALES"))
			groupStr += "," + getGroupID("MFPFSALE");
		groupStr += ")";

		Long endaccount = page.getPage() * page.getMaxpagelen();
		Long startaccount = endaccount - page.getMaxpagelen() + 1;

		queryString = "SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME " 
			+ " FROM (SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, acctcount, marshacount,rownum arow "
			+ " FROM (SELECT CN_USERID, EID, CN_LASTNAME, CN_FIRSTNAME, acctcount, marshacount "
			+ " FROM (SELECT  A.CN_USERID, A.EID, A.CN_LASTNAME, A.CN_FIRSTNAME," 
			+ " count(marshacode) marshacount, count(accountid) acctcount " 
			+ "FROM   MFPDBO.DS_USER A, MFPDBO.DS_PROPUSERS PU, MFPDBO.DS_ACCOUNTUSERS AU "
			+ ", MFPDBO.DS_MEMBER B " + "WHERE (B.CN_USERID = A.CN_USERID) " + "AND (B.OU_GROUPID in " + groupStr + " ) "
			+ "AND A.CN_USERID = PU.CN_USERID(+) AND A.CN_USERID = AU.CN_USERID(+) AND A.CN_USERID <> " + userid
			+ " AND (A.CN_REFRESH != -1) " + getSearchByClause(filterString,searchBy)
			+ "GROUP BY A.CN_USERID, A.EID, A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_MAIL"
			+ ", A.CN_PHONE, A.CN_CITY, A.CN_STATE, A.CN_COUNTRY, a.companyname " + getOrderByClause(orderby) 
			+ ") WHERE (acctcount > 0 OR marshacount > 0) )) "
			+ " where arow>=" + startaccount + " and arow <=" + endaccount;  

		Query q = em.createNativeQuery(queryString, DSUser.class);
		List<DSUser> userList = q.getResultList();
		return userList;
	}

	private int getGroupID(String role) {
		int groupid = 0;
		String queryString = "SELECT OU_GROUPID FROM MFPDBO.DS_GROUP WHERE (OU_GROUP ='" + StringUtility.replaceSingleQuotes(role) + "') ";
		Query q = em.createNativeQuery(queryString, Integer.class);
		groupid = (Integer) q.getSingleResult();
		return groupid;
	}

	@SuppressWarnings("unchecked")
	public DSUser getUserDetails(Long userid) {

		String queryString;
		String eid="";
		queryString = "select a.cn_userid, a.eid, a.cn_firstname, a.cn_lastname, a.companyname, a.enhanced_reporting, r.regionid, b.affiliationid, " +
		"a.ismae, nvl(a.allhotels, 'N') allhotels, f.franchcode franchCode  "
		+ "from mfpdbo.ds_user a, mfpdbo.ds_regionuser r, mfpdbo.ds_affiluser b, mfpdbo.ds_franchuser f "
		+ "where a.cn_userid=b.cn_userid(+) and a.cn_userid=f.cn_userid(+) and a.cn_userid=r.cn_userid(+) and a.cn_userid=" + userid;

		Query q = em.createNativeQuery(queryString, DSUser.class);
		List<DSUser> userList = q.getResultList();
		DSUser aUser = new DSUser();

		List<Long> rgnList = new ArrayList<Long>();
		List<Long> affiliationList = new ArrayList<Long>();
		List<String> fnchList = new ArrayList<String>();

		for (DSUser user : userList) {

			if (user.getRegionid() != null) {
				rgnList.add(user.getRegionid());
			}

			if (user.getAffiliationid() != null) {
				affiliationList.add(user.getAffiliationid());
			}

			if (user.getFranchCode() != null) {
				fnchList.add(user.getFranchCode());
			}

			if (!(eid.equals(user.getEid()))) {
				eid = user.getEid();
				aUser.setCn_userid(user.getCn_userid());
				aUser.setEid(user.getEid());
				aUser.setCn_firstname(user.getCn_firstname());
				aUser.setCn_lastname(user.getCn_lastname());
				aUser.setCompanyname(user.getCompanyname());
				aUser.setEnhanced_reporting(user.getEnhanced_reporting());
				aUser.setRegionid((user.getRegionid()));
				aUser.setAffiliationid(user.getAffiliationid());
				aUser.setIsmae(user.getIsmae());
				aUser.setAllhotels(user.getAllhotels());
				aUser.setFranchCode(user.getFranchCode());
			}

		}

		if (rgnList != null) {
			aUser.setRegionIds(rgnList);
		}

		if (affiliationList != null) {
			aUser.setAffiliationIds(affiliationList);
		}

		if (fnchList != null) {
			aUser.setFranchCodes(fnchList);
		}

		return aUser;
	}

	public Long getUserListNum(String role, String filterString, String searchBy, int orderby) {

		int groupid = getGroupID(role);
		String queryString = buildUserListQuery(role, groupid, filterString, searchBy, orderby);
		queryString = "SELECT COUNT(*) FROM (" + queryString + ")";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long numUsers = (Long) q.getSingleResult();
		return numUsers;
	}

	public Long getUserListNumForCopy(Long userid, String role, String filterString, String searchBy, int orderby) {

		int groupid = getGroupID(role);
		String queryString = "";
		if (role.equals("MFPFSALE")) {
			queryString = "SELECT  A.CN_USERID, A.EID, A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_MAIL"
				+ ", A.CN_PHONE, A.CN_CITY, A.CN_STATE, A.CN_COUNTRY, count(marshacode) marshacount, count(accountid) acctcount, a.companyname " 
				+ "FROM   MFPDBO.DS_USER A, MFPDBO.DS_PROPUSERS PU, MFPDBO.DS_ACCOUNTUSERS AU "
				+ ", MFPDBO.DS_MEMBER B " + "WHERE (B.CN_USERID = A.CN_USERID) " + "AND (B.OU_GROUPID = " + groupid + " ) "
				+ "AND A.CN_USERID = PU.CN_USERID(+) AND A.CN_USERID = AU.CN_USERID(+) AND A.CN_USERID <> " + userid
				+ " AND (A.CN_REFRESH != -1) " + getSearchByClause(filterString,searchBy)
				+ "GROUP BY A.CN_USERID, A.EID, A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_MAIL"
				+ ", A.CN_PHONE, A.CN_CITY, A.CN_STATE, A.CN_COUNTRY, a.companyname " ;

		} else {

			if(role.equals("MFPSALES")) 
				queryString = buildUserListQuery(role, groupid, filterString, searchBy, -1) 
				+ " Union " + buildUserListQuery(role, getGroupID("MFPFSALE"), filterString, searchBy, -1);
			else
				queryString = buildUserListQuery(role, groupid, filterString, searchBy, orderby);
		}

		queryString = "SELECT count(*) FROM (" + queryString + ") where acctcount > 0 OR marshacount > 0";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long numUsers = (Long) q.getSingleResult();
		return numUsers;
	}

	@SuppressWarnings("unchecked")
	public List<DSUser> getUserListDetail(Long userid, String role) {

		String queryString = "";
		int groupid = getGroupID(role);
		if (role.equals("MFPUSER")) {
			queryString = "select d.cn_userid,d.marshacode, null accountname  " + " from MFPDBO.DS_PROPUSERS d, mfpdbo.hotel e "
			+ " where (d.marshacode=e.marshacode) " + " and e.partition_idx in ('M','R') and d.ou_groupid = " + groupid
			+ "  and d.CN_USERID (+) = " + userid + " Order by d.marshacode";
		} else if (role.equals("MFPSALES")) {
			queryString = "SELECT   A.CN_USERID , null marshacode, C.ACCOUNTNAME " + "	FROM MFPDBO.DS_ACCOUNTUSERS A  "
			+ "	, (select b.accountid, b.accountname, b.period from mfpdbo.account b, "
			+ "  (SELECT   A.ACCOUNTID , MAX(A.PERIOD) period " + " FROM   MFPDBO.ACCOUNT A "
			+ " where account_tracking_only ='N' " + " GROUP BY   A.ACCOUNTID " + "    order by accountid) c "
			+ "where b.accountid=c.accountid " + "and b.period=c.period " + "order by accountname) C  "
			+ "WHERE    (A.OU_GROUPID = " + groupid + ")  " + " AND (A.ACCOUNTID = C.ACCOUNTID) AND A.CN_USERID (+) = " + userid
			+ " Order by C.ACCOUNTNAME";
		} else if (role.equals("MFPFSALE")) {
			queryString = "SELECT DECODE (a.eid, '', b.eid, a.eid) eid, a.marshacode,  b.accountname "
				+ "  FROM (SELECT   ROWNUM rnum, eid, marshacode " + "  FROM (SELECT  c.eid, b.marshacode "
				+ "            FROM mfpdbo.ds_propusers b, mfpdbo.ds_user c, mfpdbo.hotel d "
				+ "           WHERE (c.cn_userid = b.cn_userid(+)) AND (c.cn_userid = " + userid + ") "
				+ " AND b.marshacode = d.marshacode  AND	d.partition_idx='M' " + " ORDER BY marshacode)) a, "
				+ "       (SELECT ROWNUM rnum, eid, accountid, accountname "
				+ "          FROM (SELECT   c.eid, e.accountid, b.accountname " + " FROM mfpdbo.ds_user c, "
				+ "                         mfpdbo.ds_accountusers e, "
				+ "                         (SELECT b.accountid, b.accountname "
				+ "                            FROM mfpdbo.ACCOUNT b, "
				+ "                                 (SELECT   a.accountid, MAX (a.period) period "
				+ "                                      FROM mfpdbo.ACCOUNT a "
				+ "                                     WHERE account_tracking_only = 'N' "
				+ "                                  GROUP BY a.accountid) c "
				+ "                           WHERE b.accountid = c.accountid AND b.period = c.period) b "
				+ "                   WHERE (e.cn_userid = c.cn_userid) " + " AND (c.cn_userid = " + userid + ") "
				+ "                     AND (b.accountid = e.accountid(+)) " + " ORDER BY accountname)) b "
				+ " WHERE a.eid(+) = b.eid AND a.rnum(+) = b.rnum " + "UNION "
				+ "SELECT DECODE (a.eid, '', b.eid, a.eid), a.marshacode, b.accountname "
				+ "  FROM (SELECT   ROWNUM rnum, eid, marshacode " + " FROM (SELECT c.eid, b.marshacode "
				+ "            FROM mfpdbo.ds_propusers b, mfpdbo.ds_user c, mfpdbo.hotel d "
				+ "           WHERE (c.cn_userid = b.cn_userid(+)) AND (c.cn_userid = " + userid + ") "
				+ " AND b.marshacode = d.marshacode  AND d.partition_idx='M' " + " ORDER BY marshacode)) a, "
				+ "       (SELECT ROWNUM rnum, eid, accountid, accountname "
				+ "          FROM (SELECT   c.eid, e.accountid, b.accountname " + " FROM mfpdbo.ds_user c, "
				+ "                         mfpdbo.ds_accountusers e, "
				+ "                         (SELECT b.accountid, b.accountname "
				+ "                            FROM mfpdbo.ACCOUNT b, "
				+ "                                 (SELECT   a.accountid, MAX (a.period) period "
				+ "                                      FROM mfpdbo.ACCOUNT a "
				+ "                                     WHERE account_tracking_only = 'N' "
				+ "                                  GROUP BY a.accountid) c "
				+ "                           WHERE b.accountid = c.accountid AND b.period = c.period) b "
				+ "                   WHERE (e.cn_userid = c.cn_userid) " + " AND (c.cn_userid = " + userid + ") "
				+ "                     AND (b.accountid = e.accountid(+)) " + "  ORDER BY accountname)) b "
				+ " WHERE a.eid = b.eid(+) AND a.rnum = b.rnum(+) ";

		}

		Query q = em.createNativeQuery(queryString, DSUser.class);
		List<DSUser> userList = q.getResultList();
		return userList;
	}

	@SuppressWarnings("unchecked")
	public List<RegionRef> getRegions() {

		String queryString = "";
		queryString = "SELECT a.regionid, a.regionname FROM mfpdbo.region_ref a "
			+ "  WHERE a.regionstatus = 'Y' AND a.regionid NOT IN (1, 2) ORDER BY a.regionname";

		Query q = em.createNativeQuery(queryString, RegionRef.class);
		List<RegionRef> opRegion = q.getResultList();
		return opRegion;

	}

	@SuppressWarnings("unchecked")
	public List<HotelAffiliation> getAffiliations() {
		String queryString = "";
		queryString = "SELECT A.AFFILIATIONID, A.AFFILIATIONNAME FROM MFPDBO.HOTELAFFILIATION A WHERE (A.PARENTID =990)  ORDER BY A.AFFILIATIONNAME ASC";

		Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
		List<HotelAffiliation> affiliationList = q.getResultList();
		return affiliationList;

	}

	public void copyUserPropertyAcctUpdate(Long userid, String[] eidList, String role) {

		if (role.equals("MFPUSER") || role.equals("MFPFSALE")) {
			Query query = em.createNativeQuery("{call MFPPROC.SP_DS_COPYPROPUSERS(?1, ?2)}");
			for (String id : eidList) {
				query.setParameter(1, userid);
				query.setParameter(2, id);
				query.executeUpdate();
			}
		}

		if (role.equals("MFPSALES") || role.equals("MFPFSALE")) {
			Query query = em.createNativeQuery("{call MFPPROC.SP_DS_COPYACCOUNTUSERS(?1, ?2)}");
			for (String id : eidList) {
				query.setParameter(1, userid);
				query.setParameter(2, id);
				query.executeUpdate();
			}
		}
	}

	@SuppressWarnings("unchecked")
	public List<HotelDetailData> getUserPropertyList(Long uid, Page page) {

		Long endaccount = page.getPage() * page.getMaxpagelen();
		Long startaccount = endaccount - page.getMaxpagelen() + 1;

		String queryString = "SELECT MarshaCode marshaCode, Name hotelName FROM " + "(SELECT MarshaCode, Name, rownum rnum FROM ("
		+ "SELECT mfpdbo.DS_PropUsers.MarshaCode, mfpdbo.hotel.Name " + "FROM mfpdbo.DS_PropUsers, mfpdbo.hotel "
		+ "WHERE mfpdbo.ds_propusers.marshacode = mfpdbo.hotel.marshacode and " + "mfpdbo.hotel.partition_idx in ('M','R')  and "
		+ "cn_userid=" + uid + " order by mfpdbo.DS_PropUsers.MarshaCode)) where rnum >=" + startaccount + " and rnum <="
		+ endaccount;

		Query q = em.createNativeQuery(queryString, HotelDetailData.class);
		List<HotelDetailData> hotelList = q.getResultList();
		return hotelList;

	}

	public void updateUserRegion(Long userid, String[] selectedRegionList, List<RegionRef> regions) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_DELETEUSERREGION(?1, ?2)}");
		if (regions != null && regions.size() > 0) {
			for (int i=0; i<regions.size(); i++) {
				query.setParameter(1, userid);
				query.setParameter(2, regions.get(i).getRegionid());
				query.executeUpdate();
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_ADDUSERREGION(?1, ?2)}");
		if (selectedRegionList != null && selectedRegionList.length > 0) {
			for (String region : selectedRegionList) {
				query.setParameter(1, userid);
				query.setParameter(2, region);
				query.executeUpdate();
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEUSERREGION(?1)}");
		query.setParameter(1, userid);
		query.executeUpdate();
	}

	public void updateUserHotelAffiliation(Long userid, String[] selectedAffiliationList, List<HotelAffiliation> hotelAffiliations) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_DELETEUSERBRAND(?1, ?2)}");
		if (hotelAffiliations != null && hotelAffiliations.size() > 0) {
			for (int i=0; i<hotelAffiliations.size(); i++) {
				query.setParameter(1, userid);
				query.setParameter(2, hotelAffiliations.get(i).getAffiliationid());
				query.executeUpdate();
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_ADDUSERBRAND(?1, ?2)}");
		if (selectedAffiliationList != null && selectedAffiliationList.length > 0) {
			for (String brand : selectedAffiliationList) {
				query.setParameter(1, userid);
				query.setParameter(2, brand);
				query.executeUpdate();
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEUSERBRAND(?1)}");
		query.setParameter(1, userid);
		query.executeUpdate();
	}

	public void updateUserFranch(Long userid, String[] selectedFranchiseList, List<Franchise> franchiseList) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_DELETEUSERFRANCH(?1, ?2)}");
		if (franchiseList != null && franchiseList.size() > 0) {
			for (int i=0; i<franchiseList.size(); i++) {
				query.setParameter(1, userid);
				query.setParameter(2, franchiseList.get(i).getFranchCode());
				try  {
					query.executeUpdate();
				} catch (Exception e) {
					log.info("userid = " + userid.longValue());
					log.info("franchiseCode = " + franchiseList.get(i).getFranchCode());
					log.info(e.getMessage());
				}
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_ADDUSERFRANCH(?1, ?2)}");
		if (selectedFranchiseList != null && selectedFranchiseList.length > 0) {
			for (String franch : selectedFranchiseList) {
				query.setParameter(1, userid);
				query.setParameter(2, franch);
				query.executeUpdate();
			}
		}

		query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEUSERFRANCH(?1)}");
		query.setParameter(1, userid);
		query.executeUpdate();
	}

	public Long getUserPropertyListNum(Long userid) {

		String queryString = "SELECT MarshaCode marshaCode, Name hotelName FROM " + "(SELECT MarshaCode, Name, rownum rnum FROM ("
		+ "SELECT mfpdbo.DS_PropUsers.MarshaCode, mfpdbo.hotel.Name " + "FROM mfpdbo.DS_PropUsers, mfpdbo.hotel "
		+ "WHERE mfpdbo.ds_propusers.marshacode = mfpdbo.hotel.marshacode and " + "mfpdbo.hotel.partition_idx in ('M','R')  and "
		+ "cn_userid=" + userid + " order by mfpdbo.DS_PropUsers.MarshaCode))";

		queryString = "SELECT COUNT(*) FROM (" + queryString + ")";
		Query q = em.createNativeQuery(queryString, Long.class);
		Long hotelListNum = (Long) q.getSingleResult();
		return hotelListNum;

	}

	public void updateUserEnhancedReporting(Long userid, String enhancedReporting) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEUSERREPORTING(?1, ?2)}");
		query.setParameter(1, userid);
		query.setParameter(2, enhancedReporting);
		query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<Franchise> getHotelFranchCompanyListWithCode(boolean showManaged, String role) {

		String queryString = "select franchcode franchCode,franchname franchName, epic_id epicId from mfpdbo.franchise order by franchname";
		Query q = em.createNativeQuery(queryString, Franchise.class);
		List<Franchise> newList = new ArrayList<Franchise>();
		List<Franchise> r = q.getResultList();

		for (Franchise u : r) {
			newList.add(u);
		}

		return newList;
	}

	@SuppressWarnings("unchecked")
	/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getUserPropertyListAll
	 */
	public List<HotelDetailData> getUserPropertyListAll(Long userid, String userrole, String alphaOrderProp, Page currPageProp, String filterByMorF) {

		Long endaccount = currPageProp.getPage() * currPageProp.getMaxpagelen();
		Long startaccount = endaccount - currPageProp.getMaxpagelen() + 1;

		String queryString = "select marshacode marshaCode, name hotelName FROM (select marshacode, name, rownum rnum FROM "
			+ "(select marshacode, name from mfpdbo.hotel " + "where partition_idx in ('M','R')";

		queryString += "	and marshacode not in " + "(SELECT  MARSHACODE FROM   mfpdbo.DS_PROPUSERS " + "WHERE (CN_USERID =" + userid + ") )";

		if (alphaOrderProp != null && !alphaOrderProp.trim().equals("")) {
			queryString += " AND (UPPER(marshacode) LIKE '" + StringUtility.replaceSingleQuotes(alphaOrderProp.toUpperCase()) + "%') ";
		}
		/*
    	Added the filter condition to search by managed or franchise
		 */
		if (filterByMorF != null && !filterByMorF.equals("0")) {

			queryString += " AND franch_flag ='"+filterByMorF+"' ";

		}
		/*
    	 Ticket number:11325 changes ends
		 */

		queryString += "Order by MarshaCode)) where rnum >=" + startaccount + " and rnum <=" + endaccount;

		Query q = em.createNativeQuery(queryString, HotelDetailData.class);
		List<HotelDetailData> hotelListAll = q.getResultList();
		return hotelListAll;

	}
	/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getUserPropertyListAllNum
	 */
	
	@SuppressWarnings("unchecked")
	public List<HotelDetailData> getQuickSelectList(Long userid, String userrole, String hotellist) {

		String queryString = "select marshacode marshaCode, name hotelName FROM "
			+ "(select marshacode, name from mfpdbo.hotel " + "where partition_idx in ('M','R')";

		queryString += "	and marshacode not in " + "(SELECT  MARSHACODE FROM   mfpdbo.DS_PROPUSERS " + "WHERE (CN_USERID =" + userid + ") )";

		queryString += " and marshacode in " + hotellist;
		
		queryString += "Order by MarshaCode)";

		Query q = em.createNativeQuery(queryString, HotelDetailData.class);
		List<HotelDetailData> hotelListAll = q.getResultList();
		return hotelListAll;

	}
	
	public Long getUserPropertyListAllNum(Long userid, String userrole, String alphaOrderProp, String filterByMorF) {

		String queryString = "select marshacode marshaCode, name hotelName FROM (select marshacode, name, rownum rnum FROM "
			+ "(select marshacode, name from mfpdbo.hotel " + "where partition_idx in ('M','R')";

		queryString += "	and marshacode not in " + "(SELECT  MARSHACODE FROM   mfpdbo.DS_PROPUSERS " + "WHERE (CN_USERID =" + userid + ") )";

		if (alphaOrderProp != null && !alphaOrderProp.trim().equals("")) {
			queryString += " AND (UPPER(marshacode) LIKE '" + StringUtility.replaceSingleQuotes(alphaOrderProp.toUpperCase()) + "%') ";
		}
		/*
    	Added the filter condition to search by managed or franchise
		 */
		if (filterByMorF != null && !filterByMorF.equals("0")) {

			queryString += " AND franch_flag ='"+filterByMorF+"' ";

		}
		/*
   	 Ticket number:11325 changes ends
		 */

		queryString += "Order by MarshaCode))";

		queryString = "select count(*) from (" + queryString + ")"; 

		Query q = em.createNativeQuery(queryString, Long.class);
		Long hotelListNumAll = (Long) q.getSingleResult();
		return hotelListNumAll;

	}

	@SuppressWarnings("unchecked")
	public List<Account> getUserAccountList(Long userid, Page currPageAcctSel) {

		Long endaccount = currPageAcctSel.getPage() * currPageAcctSel.getMaxpagelen();
		Long startaccount = endaccount - currPageAcctSel.getMaxpagelen() + 1;

		String queryString = "SELECT ACCOUNTID, ACCOUNTNAME FROM ( SELECT ACCOUNTID, ACCOUNTNAME, rownum rnum FROM"
			+ "(SELECT B.ACCOUNTID, A.ACCOUNTNAME " + "FROM (select b.accountid, b.accountname from MFPDBO.ACCOUNT b, "
			+ "(select a.accountid, max(a.period) period FROM MFPDBO.ACCOUNT A " + " where account_tracking_only='N' "
			+ " GROUP BY A.ACCOUNTID ) c " + "where b.accountid=c.accountid and b.period=c.period) A "
			+ ", MFPDBO.DS_ACCOUNTUSERS B, MFPDBO.DS_GROUP C " + "WHERE (B.ACCOUNTID = A.ACCOUNTID) AND (B.OU_GROUPID = C.OU_GROUPID) "
			+ "AND (B.CN_USERID =" + userid + ")  ORDER BY A.ACCOUNTNAME)) where rnum >=" + startaccount + " and rnum <=" + endaccount;

		Query q = em.createNativeQuery(queryString, Account.class);
		List<Account> userAccountList = q.getResultList();
		return userAccountList;

	}

	public Long getUserAccountListNum(Long userid) {

		String queryString = " SELECT count(*) " + "FROM (select b.accountpricingtype, b.accountid, b.accountname from MFPDBO.ACCOUNT b, "
		+ "(select a.accountid, max(a.period) period FROM MFPDBO.ACCOUNT A " + " where account_tracking_only='N' "
		+ " GROUP BY A.ACCOUNTID ) c " + "where b.accountid=c.accountid and b.period=c.period) A "
		+ ", MFPDBO.DS_ACCOUNTUSERS B, MFPDBO.DS_GROUP C " + "WHERE (B.ACCOUNTID = A.ACCOUNTID) AND (B.OU_GROUPID = C.OU_GROUPID) "
		+ "AND (B.CN_USERID =" + userid + ")  ORDER BY A.ACCOUNTNAME";


		Query q = em.createNativeQuery(queryString, Long.class);
		Long accountListNum = (Long) q.getSingleResult();
		return accountListNum;
	}

	@SuppressWarnings("unchecked")
	public List<Account> getUserAccountListAll(Long userid, String alphaOrderAcct, Page currPageAcct, String accountPricingType, String accountSegment) {

		Long endaccount = currPageAcct.getPage() * currPageAcct.getMaxpagelen();
		Long startaccount = endaccount - currPageAcct.getMaxpagelen() + 1;

		String queryString = "SELECT ACCOUNTID, ACCOUNTNAME FROM (SELECT ACCOUNTID, ACCOUNTNAME, rownum rnum from  "
			+ "(SELECT A.ACCOUNTID,  A.ACCOUNTNAME FROM (select b.accountid, b.accountname from "
			+ "mfpdbo.account b, (SELECT   A.ACCOUNTID , MAX(A.PERIOD) period "
			+ "FROM   MFPDBO.ACCOUNT A  where account_tracking_only='N'  ";

		if (accountPricingType != null && !accountPricingType.equals("*")) {
			queryString += " and A.accountpricingtype='" + accountPricingType + "' ";
		}

		if (accountSegment != null && !accountSegment.equals("*")) {
			queryString += " and A.accounttype='" + accountSegment + "' ";
		}

		if (alphaOrderAcct != null && !alphaOrderAcct.trim().equals("")) {
			queryString += " AND (UPPER(accountname) LIKE '" + StringUtility.replaceSingleQuotes(alphaOrderAcct.toUpperCase()) + "%') ";
		}

		queryString += "GROUP BY   A.ACCOUNTID order by accountid " + ") c where b.accountid=c.accountid "
		+ "and b.period=c.period)  A WHERE (A.ACCOUNTID not in (SELECT   A.ACCOUNTID "
		+ "FROM    MFPDBO.DS_ACCOUNTUSERS A, MFPDBO.DS_GROUP B " + "WHERE     (B.OU_GROUPID = A.OU_GROUPID) AND (A.CN_USERID = "
		+ userid + "))) ";

		queryString += "ORDER BY A.ACCOUNTNAME ASC)) where rnum >=" + startaccount + " and rnum <=" + endaccount;

		Query q = em.createNativeQuery(queryString, Account.class);
		List<Account> accountListAll = q.getResultList();
		return accountListAll;

	}

	public Long getUserAcctListAllNum(Long userid, String alphaOrderAcct, String accountPricingType, String accountSegment) {

		String queryString = "SELECT count(*) FROM (select b.accountid, b.accountname from "
			+ "mfpdbo.account b, (SELECT   A.ACCOUNTID , MAX(A.PERIOD) period "
			+ "FROM   MFPDBO.ACCOUNT A  where account_tracking_only='N' ";

		if (accountPricingType != null && !accountPricingType.equals("*")) {
			queryString += " and A.accountpricingtype='" + accountPricingType + "' ";
		}

		if (accountSegment != null && !accountSegment.equals("*")) {
			queryString += " and A.accounttype='" + accountSegment + "' ";
		}

		if (alphaOrderAcct != null && !alphaOrderAcct.trim().equals("")) {
			queryString += " AND (UPPER(accountname) LIKE '" + StringUtility.replaceSingleQuotes(alphaOrderAcct.toUpperCase()) + "%') ";
		}

		queryString += " GROUP BY  A.ACCOUNTID " + "order by accountid) c where b.accountid=c.accountid "
		+ "and b.period=c.period)  A WHERE (A.ACCOUNTID not in (SELECT   A.ACCOUNTID "
		+ "FROM MFPDBO.DS_ACCOUNTUSERS A, MFPDBO.DS_GROUP B " + "WHERE (B.OU_GROUPID = A.OU_GROUPID) AND (A.CN_USERID = " + userid
		+ "))) ";

		Query q = em.createNativeQuery(queryString, Long.class);
		Long accountListNumAll = (Long) q.getSingleResult();
		return accountListNumAll;

	}

	public void updateUserProperties(Long userid, String[] hotels) {

		Query query = em.createNativeQuery("{call MFPPROC.sp_ds_addpropusers(?1, ?2)}");
		for (String hotel : hotels) {
			query.setParameter(1, userid);
			query.setParameter(2, hotel);
			query.executeUpdate();
		}
	}

	public void updateAllHotels(Long userid, String allhotels) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEUSERALLHOTEL(?1, ?2)}");
		query.setParameter(1, userid);
		query.setParameter(2, allhotels);
		query.executeUpdate();
	}

	public void updateUserIsMAE(Long userid, String isMAE) {
		Query query = em.createNativeQuery("{call MFPPROC.sp_ds_updateusermae(?1, ?2)}");
		query.setParameter(1, userid);
		query.setParameter(2, isMAE);
		query.executeUpdate();
	}

	public void updateUserAccounts(Long userid, String[] accounts, String groupId) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEACCOUNTUSERS(?1, ?2, ?3)}");
		for (String account : accounts) {
			query.setParameter(1, userid);
			query.setParameter(2, account);
			query.setParameter(3, groupId);
			query.executeUpdate();
		}
	}

	public void deleteUserProperties(Long userid, String[] delids, String groupId) {

		Query query = em.createNativeQuery("{call MFPPROC.sp_ds_deletepropusers(?1, ?2, ?3)}");
		for (String del : delids) {
			query.setParameter(1, userid);
			query.setParameter(2, del);
			query.setParameter(3, groupId);
			query.executeUpdate();
		}
	}

	public void deleteUserAccounts(Long userid, String[] delids, String groupId)  {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_DELETEACCOUNTUSERS(?1, ?2, ?3)}");
		for (String del : delids) {
			query.setParameter(1, userid);
			query.setParameter(2, del);
			query.setParameter(3, groupId);
			query.executeUpdate();
		}
	}

	public void updateAllHotelsFranchise(Long userid, String selFranchs) {

		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_UPDATEALLHOTELSFRAN(?1, ?2)}");
		query.setParameter(1, userid);
		query.setParameter(2, selFranchs);
		query.executeUpdate();
	}

	
	public void updateInternalNotes(InternalNotes internalNotes) {
	
		Query query = em.createNativeQuery("{call MFPPROC.SP_DS_USERNOTES(?1,?2,?3,?4)}");
		query.setParameter(1, internalNotes.getUser_internalnotes());
		query.setParameter(2, internalNotes.getCn_userid());	
		query.setParameter(3, internalNotes.getGroup());
		query.setParameter(4, internalNotes.getEid());
		query.executeUpdate();
	}	
}
