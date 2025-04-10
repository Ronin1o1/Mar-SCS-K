package com.marriott.rfp.dataacess.pricing.mudroom.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.mudroom.api.SalesMudroomManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotel;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class AccountManagerImpl
 */

@Service
public class SalesMudroomManagerImpl implements SalesMudroomManager {
	private static final Logger log = LoggerFactory.getLogger(SalesMudroomManagerImpl.class);
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<Account> getSalesMudroomAccountLinked (User user, Page acctPage) {
		long endaccount = acctPage.getPage() * acctPage.getMaxpagelen();
		long startaccount = endaccount - acctPage.getMaxpagelen() + 1;

		String queryString = "SELECT accountid, accountname  FROM (SELECT accountid, accountname, rownum arow FROM " 
			+ " (SELECT a.accountid, accountname  FROM mfpdbo.ACCOUNT a, (SELECT   MAX (period) period, accountid "
	        + " FROM mfpdbo.ACCOUNT  WHERE accountid IN (  SELECT da.accountid "
	        + " FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da WHERE (du.cn_userid = da.cn_userid)  AND (du.eid = '"
	        + StringUtility.replaceSingleQuotes(user.getEid()) + "') AND (du.ismae = 'Y')) AND accountpricingtype IN ('L', 'C')  GROUP BY accountid) b "
	        + " WHERE a.accountid = b.accountid AND a.period = b.period  order by accountname) ) WHERE arow >= " + startaccount + " AND arow <= " + endaccount + " ";
		
		Query q = em.createNativeQuery(queryString, Account.class);
		List<Account> accountList = q.getResultList();
	
		return accountList;
    }

    public long getNumSalesMudroomAccountLinked (User user) {

    	String queryString = "SELECT count(a.accountid) FROM mfpdbo.ACCOUNT a, (SELECT   MAX (period) period, accountid "
            + " FROM mfpdbo.ACCOUNT  WHERE accountid IN (  SELECT da.accountid "
            + " FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da WHERE (du.cn_userid = da.cn_userid)  AND (du.eid = '"
            + StringUtility.replaceSingleQuotes(user.getEid()) + "') AND (du.ismae = 'Y')) AND accountpricingtype IN ('L', 'C')  GROUP BY accountid) b "
            + " WHERE a.accountid = b.accountid AND a.period = b.period  order by accountname ";
    	
    	Query q = em.createNativeQuery(queryString, Long.class);
    	long numAcct = (Long) q.getSingleResult();

    	return numAcct;
    }

    @SuppressWarnings("unchecked")
    public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, long salesRespondentId) {

		String queryString = "SELECT  a.accountid,   a.accountname, h.marshacode, h.NAME hotelName "
	        + "  FROM mfpdbo.ACCOUNT a, mfpdbo.hotel h, mfpdbo.salesresp_prim_htlacct spha, "
	        + " (SELECT   a.accountid, MAX (a.period) period FROM mfpdbo.ACCOUNT a GROUP BY a.accountid) b "
	        + "  WHERE (h.marshacode = spha.marshacode) AND (a.accountid = spha.accountid) "
	        + " AND a.accountid = b.accountid AND a.period = b.period" + "  AND (spha.salesrespondentid = ?"
	        + " )  GROUP BY a.accountname, a.accountid, h.marshacode, h.NAME  order by ";
		
		if (orderBy == 1)
			queryString += " accountname, marshacode";
		else
			queryString += " marshacode, accountname";

	Query q = em.createNativeQuery(queryString, SalesMudroomHotelAccount.class);
	q.setParameter(1, salesRespondentId);
	List<SalesMudroomHotelAccount> hotelAccountList = q.getResultList();

	return hotelAccountList;
    }

    public long getTotalSalesMudroomPC(User user) {

		String queryString = "SELECT   count(a.accountid)"
            + " FROM mfpdbo.ACCOUNT a, mfpdbo.hotel h, mfpdbo.salesresp_prim_htlacct spha, mfpdbo.sales_respondent sr "
            + " ,  (SELECT   a.accountid, MAX (a.period) period  FROM mfpdbo.ACCOUNT a   GROUP BY a.accountid) b "
            + " WHERE  b.period = a.period  AND b.accountid = a.accountid AND (h.marshacode = spha.marshacode)  AND (a.accountid = spha.accountid) "
            + " and (sr.salesrespondentid=spha.salesrespondentid)  AND sr.eid <> '" + StringUtility.replaceSingleQuotes(user.getEid()) + "' " 
            + " AND h.hotelid IN ( "
            + " SELECT h.hotelid FROM mfpdbo.ds_propusers dpu, mfpdbo.ds_user du, mfpdbo.hotel h "
            + " WHERE (du.cn_userid = dpu.cn_userid)  AND (dpu.marshacode = h.marshacode) AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid()) + "') "
            + " AND (h.partition_idx = 'M')) AND (a.accountid IN ( SELECT da.accountid "
            + " FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da WHERE (du.cn_userid = da.cn_userid)  AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid())
            + "'))  )   ";
		
		Query q = em.createNativeQuery(queryString, Long.class);
		Long pcTotal = (Long) q.getSingleResult();

		return pcTotal.longValue();
    }

    @SuppressWarnings("unchecked")
    public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, User user, Page page) {
		long endaccount = page.getPage() * page.getMaxpagelen();
		long startaccount = endaccount - page.getMaxpagelen() + 1;

		String queryString = " SELECT accountid, accountname, marshacode, hotelname, personname, phoneNumber, email FROM "
			+ " (SELECT accountid, accountname, marshacode, hotelname, personname, phoneNumber, email, rownum arow FROM "
			+ " (SELECT   a.accountid, a.accountname, h.marshacode, h.NAME hotelname, sr.personname, sr.countrycode || '-' || "
            + " sr.areacitycode || '-' || sr.phonenumber phoneNumber,  sr.email "
            + " FROM mfpdbo.ACCOUNT a, mfpdbo.hotel h, mfpdbo.salesresp_prim_htlacct spha, mfpdbo.sales_respondent sr "
            + " ,  (SELECT   a.accountid, MAX (a.period) period  FROM mfpdbo.ACCOUNT a   GROUP BY a.accountid) b "
            + " WHERE  b.period = a.period  AND b.accountid = a.accountid AND (h.marshacode = spha.marshacode)  AND (a.accountid = spha.accountid) "
            + " and (sr.salesrespondentid=spha.salesrespondentid)  AND sr.eid <> '" + StringUtility.replaceSingleQuotes(user.getEid()) + "' " 
            + " AND h.hotelid IN ( "
            + " SELECT h.hotelid FROM mfpdbo.ds_propusers dpu, mfpdbo.ds_user du, mfpdbo.hotel h "
            + " WHERE (du.cn_userid = dpu.cn_userid)  AND (dpu.marshacode = h.marshacode) AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid()) + "') "
            + " AND (h.partition_idx = 'M')) AND (a.accountid IN ( SELECT da.accountid "
            + " FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da WHERE (du.cn_userid = da.cn_userid)  AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid())
            + "'))  )   ORDER BY ";
    switch ((new Long(orderBy)).intValue()) {
    case 0:
        queryString += " sr.personname,h.name, marshacode, accountname";
        break;
    case 1:
        queryString += " marshacode, accountname, h.name";
        break;
    case 2:
        queryString += "accountname, marshacode,  h.name";
        break;
    default:
        queryString += " marshacode, accountname, h.name";
    }
    
    queryString += " ) a) WHERE arow >= " + startaccount + " AND arow <= " + endaccount + " ";
	Query q = em.createNativeQuery(queryString, SalesMudroomHotelAccount.class);
	List<SalesMudroomHotelAccount> hotelAccountList = q.getResultList();

	return hotelAccountList;
    }

    @SuppressWarnings("unchecked")
    public List<HotelListData> getSalesMudroomHotelLinked (User user, Page htlPage) {
		long endaccount = htlPage.getPage() * htlPage.getMaxpagelen();
		long startaccount = endaccount - htlPage.getMaxpagelen() + 1;
    	
		String queryString = "SELECT marshacode, hotelname, hotelid FROM (SELECT  marshacode, hotelname, hotelid, rownum arow FROM "
			+ " (SELECT    h.marshacode, h.NAME hotelname, h.hotelid FROM mfpdbo.ds_propusers dpu, mfpdbo.ds_user du, mfpdbo.hotel h "
            + " WHERE (    (du.cn_userid = dpu.cn_userid)    AND (dpu.marshacode = h.marshacode) AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid())
            + "')  AND (du.ismae = 'Y')  AND (h.partition_idx = 'M')  )  ORDER BY h.marshacode ASC) ) WHERE arow >= " + startaccount + " AND arow <= " + endaccount + " ";

	Query q = em.createNativeQuery(queryString, HotelListData.class);
	List<HotelListData> hotelList = q.getResultList();

	return hotelList;
    }

    public long getNumSalesMudroomHotelLinked (User user) {

		String queryString = " SELECT count(hotelid) FROM mfpdbo.ds_propusers dpu, mfpdbo.ds_user du, mfpdbo.hotel h "
            + " WHERE (    (du.cn_userid = dpu.cn_userid)    AND (dpu.marshacode = h.marshacode) AND (du.eid = '" + StringUtility.replaceSingleQuotes(user.getEid())
            + "')  AND (du.ismae = 'Y')  AND (h.partition_idx = 'M')  )  ORDER BY h.marshacode ASC ";

	Query q = em.createNativeQuery(queryString, Long.class);
	long numHotel = (Long) q.getSingleResult();

	return numHotel;
    }
    
    @SuppressWarnings("unchecked")
    public List<SalesMudroomHotel> getSalesMudroomHotelSelected (long salesRespondentid) {

		String queryString = " SELECT   d.salesrespondenthotelid, d.marshacode, e.NAME hotelname "
            + "FROM mfpdbo.hotel e, mfpdbo.sales_respondent_hotel d  WHERE (e.marshacode = d.marshacode) "
            + "AND (e.partition_idx = 'M')  AND (d.salesrespondentid = ?) "
            + "ORDER BY d.marshacode ASC ";

	Query q = em.createNativeQuery(queryString, SalesMudroomHotel.class);
	q.setParameter(1, salesRespondentid);
	List<SalesMudroomHotel> hotelList = q.getResultList();

	return hotelList;
    }

    @SuppressWarnings("unchecked")
    public List<SalesMudroomHotel> getSalesMudroomHotelNotSelected (User user) {

		String queryString = " SELECT    e.marshacode, e.NAME hotelname FROM mfpdbo.hotel e  WHERE  (e.partition_idx = 'M') "
		            + " and (not exists (  SELECT *   FROM mfpdbo.sales_respondent_hotel b, mfpdbo.sales_respondent a "
		            + " WHERE (b.salesrespondentid = a.salesrespondentid)  and upper(EID)=upper('"
		            + StringUtility.replaceSingleQuotes(user.getEid()) + "') and b.marshacode=e.marshacode ) ) " + "ORDER BY e.marshacode ASC ";

	Query q = em.createNativeQuery(queryString, SalesMudroomHotel.class);
	List<SalesMudroomHotel> hotelList = q.getResultList();

	return hotelList;
    }

   public SalesMudroom findSalesMudroom(User user)  {

		String queryString = "SELECT b.salesrespondentid, a.cn_firstname || ' ' || a.cn_lastname personname, b.persontitle, "
			+ " b.countrycode, b.areacitycode, b.phonenumber, b.faxnumber, "
			+ " DECODE (b.email, '', a.cn_mail, b.email) email, b.saleslocationid, b.sales_region_ref_id salesregionid, "
			+ " lower(DECODE(b.eid1,'', a.eid2, b.eid1)) eid, b.accounttype salestypeid,nvl(a.ismae,'N') mae"
			+ " FROM (SELECT UPPER (eid) eid1, salesrespondentid, persontitle, countrycode, "
			+ "  areacitycode, phonenumber, faxnumber, saleslocationid, " + " sales_region_ref_id, eid, accounttype, email "
			+ " FROM mfpdbo.sales_respondent where upper(eid)=upper('" + StringUtility.replaceSingleQuotes(user.getEid()) + "')) b, "
			+ " (select upper(eid) eid2, cn_firstname, cn_lastname, cn_mail, isMAE from mfpdbo.ds_user where upper(eid)=upper('"
			+ StringUtility.replaceSingleQuotes(user.getEid()) + "')) a  WHERE a.eid2 = b.eid1(+) ";

		Query q = em.createNativeQuery(queryString, SalesMudroom.class);
		SalesMudroom salesRes;
		try {
			salesRes = (SalesMudroom) q.getSingleResult();
		} catch (NoResultException e) {
			salesRes = new SalesMudroom();
		}
	
		return salesRes;
   }

   @SuppressWarnings("unchecked")
   public List<SalesMudroom> getSalesUserListAAEs()  {

		String queryString = "SELECT DISTINCT c.EID, UPPER(c.CN_FIRSTNAME) || ' ' || UPPER(c.CN_LASTNAME) personname "
			+ "FROM MFPDBO.ACCOUNT a, MFPDBO.DS_ACCOUNTUSERS b, MFPDBO.DS_USER c, MFPDBO.DS_MEMBER d "
			+ "WHERE c.CN_USERID = b.CN_USERID AND b.ACCOUNTID = a.ACCOUNTID AND d.OU_GROUPID IN (281, 530) " 
			+ "AND d.CN_USERID = c.CN_USERID AND a.ACCOUNTTYPE = 'F' AND d.OU_REFRESH=5 AND c.CN_REFRESH != -1 "
			+ "Order by (UPPER(c.CN_FIRSTNAME) || ' ' || UPPER(c.CN_LASTNAME)) "; 
			
		Query q = em.createNativeQuery(queryString, SalesMudroom.class);
		List<SalesMudroom> salesRes =  q.getResultList();
	
		return salesRes;
	}

   	@SuppressWarnings("unchecked")
    public List<SalesMudroom> getSalesUserListforAccounts()  {

		String queryString = "SELECT DISTINCT c.EID, UPPER(c.CN_FIRSTNAME) || ' ' || UPPER(c.CN_LASTNAME) personname "
			+ "FROM MFPDBO.ACCOUNT a, MFPDBO.DS_ACCOUNTUSERS b, MFPDBO.DS_USER c, MFPDBO.DS_MEMBER d "
			+ "WHERE c.CN_USERID = b.CN_USERID AND b.ACCOUNTID = a.ACCOUNTID AND d.OU_GROUPID IN (281,530) " 
			+ "AND d.CN_USERID = c.CN_USERID AND d.OU_REFRESH=5 AND c.CN_REFRESH != -1 "
			+ "Order by (UPPER(c.CN_FIRSTNAME) || ' ' || UPPER(c.CN_LASTNAME)) "; 
			
    	Query q = em.createNativeQuery(queryString, SalesMudroom.class);
    	List<SalesMudroom> salesRes = q.getResultList();
		
		return salesRes;
	}

    @SuppressWarnings("unchecked")
    public List<Account> getSalesUserAccountList(String eid) {

    	String queryString = "Select acc.accountid ,acc.accountname  FROM (SELECT max(a.accountrecid) accountrecid FROM mfpdbo.ACCOUNT a, (SELECT da.accountid "
            + " FROM mfpdbo.ds_user du, mfpdbo.ds_accountusers da WHERE (du.cn_userid = da.cn_userid)  AND (du.eid = '"
            + StringUtility.replaceSingleQuotes(eid) + "')) b WHERE a.accountid = b.accountid group by a.accountid) accb, mfpdbo.account acc "
            + " where acc.accountrecid = accb.accountrecid order by accountname ";
    	
    	Query q = em.createNativeQuery(queryString, Account.class);
    	List<Account> accountList = q.getResultList();

    	return accountList;
    }

	public void updateSalesMudroom(SalesMudroom salesMudroom) {
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
		    try {
		    	
	            CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_insertupdate_SaleRespondent(?,?,?,?,?,?,?,?,?,?,?,?)}");
			try {
				cstmt.setString(1, salesMudroom.getPersonname());
				cstmt.setString(2, salesMudroom.getPersontitle());
				cstmt.setString(3, salesMudroom.getCountrycode());
				cstmt.setString(4, salesMudroom.getAreacitycode());
				cstmt.setString(5, salesMudroom.getPhonenumber());
				cstmt.setString(6, salesMudroom.getFaxnumber());
				cstmt.setString(7, salesMudroom.getEmail());
				cstmt.setString(8, salesMudroom.getEid());
                cstmt.setObject(9, salesMudroom.getSaleslocationid(), Types.NUMERIC);
                cstmt.setObject(10, salesMudroom.getSalesregionid(), Types.NUMERIC);
				cstmt.setString(11, salesMudroom.getSalestypeid());
				cstmt.registerOutParameter(12, Types.NUMERIC);
				cstmt.execute();
				salesMudroom.setSalesrespondentid(new Long(cstmt.getLong(12)));

				if (salesMudroom.getSalesrespondentid() != 0) {

					String queryString = "DELETE FROM MFPDBO.SALES_RESPONDENT_HOTEL  where salesrespondentid=?";
						Query q = em.createNativeQuery(queryString);
					q.setParameter(1, salesMudroom.getSalesrespondentid());
					q.executeUpdate();

				} //if
				if((salesMudroom.getSalesrespondentid() != 0) && (salesMudroom.getSalesHotelSel2() != null)) {
					updateSalesRespondentHotels(salesMudroom.getSalesrespondentid(), salesMudroom.getSalesHotelSel2());
				}

			} finally {
			    cstmt.close();
			}
		    } finally {
			con.close();
		    }
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		    salesMudroom.setSalesrespondentid(new Long(0));
		}

	}

	public void updateSalesMudroomDate(String loginName) {
	
		Query q = em.createNativeQuery("update mfpdbo.sales_respondent set last_updatedate=sysdate where lower(eid)=lower(?)");
		q.setParameter(1, loginName);
		q.executeUpdate();
	}

	public boolean updateSalesPrimaryContacts(long salesrespondentid, Long accountid, String marshacode) {
		boolean bSomeAlreadyAssigned = false;
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
			try{
	            CallableStatement cstmt = con.prepareCall("begin ?:=mfpproc.fn_insert_saleresp_prim_ctc(?,?,?); end;");
	            try {
	            	cstmt.setLong(2, salesrespondentid);
	            	cstmt.setLong(3, accountid);
	            	cstmt.setString(4, marshacode);
	            	cstmt.registerOutParameter(1, Types.VARCHAR);
					cstmt.execute();
					String sAlreadyAssigned= cstmt.getString(1);
					if (sAlreadyAssigned != null && sAlreadyAssigned.equals("Y"))
                         bSomeAlreadyAssigned = true;
	            } catch (Exception e) {
					log.error(e.getMessage(),e);
	            } finally {
	            	cstmt.close();
	            }
			} finally {
				con.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return bSomeAlreadyAssigned;
	}

	public void updateSalesRespondentHotels(long salesRespondentid, String[] hotels) {
		
		Query q = em
		.createNativeQuery("begin Insert into MFPDBO.SALES_RESPONDENT_HOTEL (salesrespondenthotelid,salesrespondentid, marshacode)  values( MFPDBO.SALES_RESPONDENT_HOTEL_SEQ.nextval, ?, ?); end; ");
	    for (int i = 0; i < hotels.length; i++) {
			q.setParameter(1, salesRespondentid);
			q.setParameter(2, hotels[i]);
			q.executeUpdate();
	    }
	}
	
	public void removeSalesMudroomPC(long salesrespondentid, String marshaCode, long accountID) {
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
			try{
	            CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_delete_salesresp_prim_ctc(?,?,?); end; ");
	            try {
	            	cstmt.setLong(1, salesrespondentid);
	            	cstmt.setLong(2, accountID);
	            	cstmt.setString(3, marshaCode);
					cstmt.execute();
	            } catch (Exception e) {
					log.error(e.getMessage(),e);
	            } finally {
	            	cstmt.close();
	            }
			} finally {
				con.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
	}

	@Override
	public String getUserPhoneNumber(String eid) {
		String querystring = "select nvl(cn_phone, ' ') from mfpdbo.ds_user where eid = '" + StringUtility.replaceSingleQuotes(eid) + "'";	
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, eid);		
		String phoneNumber = (String) q.getSingleResult();	
		return phoneNumber;
	}
	
	@Override
	public String getUserEmailAddress(String eid) {
		String querystring = "select nvl(cn_mail, ' ') from mfpdbo.ds_user where eid = '" + StringUtility.replaceSingleQuotes(eid) + "'";	
		Query q = em.createNativeQuery(querystring, String.class);
		q.setParameter(1, eid);		
		String emailAddress = (String) q.getSingleResult();	
		return emailAddress.trim();
	}
}
