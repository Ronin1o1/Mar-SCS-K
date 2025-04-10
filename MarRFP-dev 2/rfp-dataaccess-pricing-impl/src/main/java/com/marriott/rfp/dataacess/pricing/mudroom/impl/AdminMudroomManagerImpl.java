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

import com.marriott.rfp.dataacess.pricing.mudroom.api.AdminMudroomManager;
import com.marriott.rfp.object.location.SalesLocation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountmarketregion.AccountMarketRegion;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class AccountManagerImpl
 */

@Service
public class AdminMudroomManagerImpl implements AdminMudroomManager {
	private static final Logger log = LoggerFactory.getLogger(AdminMudroomManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<Account> getAdminRespondentAccountNotSelected(long adminRespondentid, long period, String primeFlag) {

	String queryString = "SELECT A.ACCOUNTRECID , A.ACCOUNTNAME FROM  MFPDBO.ACCOUNT A "
                            + " WHERE ACCOUNTRECID NOT IN (SELECT C.ACCOUNTRECID "
                            + " FROM  MFPDBO.ACCOUNT C, MFPDBO.ADMIN_RESPONDENT_ACCOUNT B "
                            + " WHERE (C.ACCOUNTRECID = B.ADMINRESPONDENTACCOUNTRECID) "
                            + " AND c.period =?1"
                            + " AND (b.adminrespondentid = ?2";
	
	if (primeFlag.equals("Y"))
	    	queryString += " OR b.adminacctrespprimaryflag = 'Y' ";

	queryString +=  ")) AND PERIOD =  ?1"
                            + " and accountpricingtype <> 'P' ";

	queryString += " ORDER BY ACCOUNTNAME ASC ";

	Query q = em.createNativeQuery(queryString, Account.class);
	q.setParameter(1, period);
	q.setParameter(2, adminRespondentid);
	List<Account> accountList = q.getResultList();

	return accountList;
    }

    @SuppressWarnings("unchecked")
    public List<Account> getAdminRespondentAccountSelected(long adminRespondentid, long period, String primeFlag) {

	String queryString = "SELECT C.ACCOUNTRECID , c.accountid, C.ACCOUNTNAME FROM  MFPDBO.ACCOUNT C, MFPDBO.ADMIN_RESPONDENT_ACCOUNT B "
	    				+ " WHERE (C.ACCOUNTRECID = B.ADMINRESPONDENTACCOUNTRECID)  and  c.period=?1"
	    				+ " and adminrespondentid=?2";
	if (primeFlag.equals("Y"))
		queryString += " and (b.adminacctrespprimaryflag = 'Y') ";
	else
		queryString += " and ((b.adminacctrespprimaryflag != 'Y') OR (b.adminacctrespprimaryflag is null))";
	queryString += " ORDER BY ACCOUNTNAME ASC ";

	Query q = em.createNativeQuery(queryString, Account.class);
	q.setParameter(1, period);
	q.setParameter(2, adminRespondentid);
	List<Account> accountList = q.getResultList();

	return accountList;
    }

    @SuppressWarnings("unchecked")
    public List<AccountSegment> getAdminRespondentAvailSalesTiersNotSelected(long adminRespondentid) {

	String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION FROM MFPDBO.ACCOUNTTIERTYPE_REF A "
				      + " where  ACCOUNTTYPE NOT IN (SELECT ACCOUNTTYPE FROM MFPDBO.ADMIN_RESPONDENT_SALESTYPE "
				      +" WHERE ADMINRESPONDENTID = ?1"
				      + ")  ORDER BY A.SEQUENCE ASC ";

	Query q = em.createNativeQuery(queryString, AccountSegment.class);
	q.setParameter(1, adminRespondentid);

	List<AccountSegment> accountSegmentList = q.getResultList();

	return accountSegmentList;
    }

   @SuppressWarnings("unchecked")
    public List<AccountMarketRegion> getAccountMarketRegionsNotSelected(long adminRespondentid) {

	String queryString = "SELECT SALES_REGION_REF_ID regionid, MARKET_SALES_REGION region "
		+ " FROM  MFPDBO.MARKET_SALES_REGION_REF WHERE  SALES_REGION_REF_ID NOT IN "
		+ " (SELECT A.SALES_REGION_REF_ID FROM MFPDBO.ADMIN_RESPONDENT_SALESREGION A, MFPDBO.ADMIN_RESPONDENT_SALESTYPE B "
		+ " WHERE A.ADMINRESPONDENTSALESTYPEID = B.ADMINRESPONDENTSALESTYPEID AND B.ADMINRESPONDENTID =?1"
		+ ") "
		+ " ORDER BY MARKET_SALES_REGION ";

	Query q = em.createNativeQuery(queryString, AccountMarketRegion.class);
	q.setParameter(1, adminRespondentid);

	List<AccountMarketRegion> regionDetails = q.getResultList();

	return regionDetails;

    }

   @SuppressWarnings("unchecked")
   public List<AccountSegment> getAdminRespondentAvailSalesTiersSelected(long adminRespondentid) {

	String queryString = "SELECT A.ACCOUNTTYPE, A.ACCOUNTTYPEDESCRIPTION "
	    				+ "FROM MFPDBO.ACCOUNTTIERTYPE_REF A, MFPDBO.ADMIN_RESPONDENT_SALESTYPE B "
	    				+ " WHERE A. ACCOUNTTYPE =  B.ACCOUNTTYPE AND "
	    				+ " ADMINRESPONDENTID = ?1"
	    				+ "  ORDER BY A.SEQUENCE ASC ";

	Query q = em.createNativeQuery(queryString, AccountSegment.class);
	q.setParameter(1, adminRespondentid);

	List<AccountSegment> accountSegmentList = q.getResultList();

	return accountSegmentList;
   }

  @SuppressWarnings("unchecked")
   public List<AccountMarketRegion> getAccountMarketRegionsSelected(long adminRespondentid) {
	
      String queryString = "SELECT C.SALES_REGION_REF_ID regionid, C.MARKET_SALES_REGION region "
		+ " FROM MFPDBO.ADMIN_RESPONDENT_SALESREGION A, MFPDBO.ADMIN_RESPONDENT_SALESTYPE B, MFPDBO.MARKET_SALES_REGION_REF C "
		+ " WHERE A.ADMINRESPONDENTSALESTYPEID = B.ADMINRESPONDENTSALESTYPEID AND C.SALES_REGION_REF_ID = A.SALES_REGION_REF_ID "
		+ " AND B.ADMINRESPONDENTID =?1 "
		+ " ORDER BY MARKET_SALES_REGION ";

	Query q = em.createNativeQuery(queryString, AccountMarketRegion.class);
	q.setParameter(1, adminRespondentid);

	List<AccountMarketRegion> regionDetails = q.getResultList();

	return regionDetails;

   }

  public boolean findUpdateAdminRespondent(String loginName, String topazid) {
	boolean bUpdate = true;

		if (loginName.equalsIgnoreCase(topazid)) {
			bUpdate = false;
		} else {
			String queryString = "SELECT   mfpproc.fn_adminupdate(b.last_updatedate)  FROM   MFPDBO.ADMIN_RESPONDENT B  WHERE lower(EID)=lower('"
			                                +  StringUtility.replaceSingleQuotes(loginName)
							+ "')";

			Query q = em.createNativeQuery(queryString, String.class);
			String isUpdate = (String) q.getSingleResult();
			if (isUpdate != null && isUpdate.equals("N"))
				bUpdate = false;
		}
	return bUpdate;
   }

   public AdminMudroom findAdminRespondent(String loginName)  {

	String queryString = "SELECT   A.ADMINRESPONDENTID , c.cn_firstname || ' ' || c.cn_lastname personname, A.PERSONTITLE , A.COUNTRYCODE , A.LOCATIONID adminLocationid,"
						+ " A.AREACITYCODE  , A.PHONENUMBER , A.FAXNUMBER , decode(A.EMAIL, '', c.cn_mail, a.email) email, A.LAST_UPDATEDATE, lower(c.eid) eid "
						+ "  FROM MFPDBO.ADMIN_RESPONDENT A, MFPDBO.DS_USER C WHERE lower(a.eid(+))=lower(c.eid) and lower(c.eid)=('"
						+ StringUtility.replaceSingleQuotes(loginName)
						+ "')";
	Query q = em.createNativeQuery(queryString, AdminMudroom.class);
	AdminMudroom adminRes;
	try {
	    adminRes = (AdminMudroom) q.getSingleResult();
	} catch (NoResultException e) {
	    adminRes = new AdminMudroom();
	}

	return adminRes;
   }

   @SuppressWarnings("unchecked")
   public List<AdminMudroom> findPASManagerList()  {

		String queryString = "SELECT Distinct A.ADMINRESPONDENTID, A.PERSONNAME, lower(A.EID) eid"
							+ " FROM MFPDBO.ADMIN_RESPONDENT A, MFPDBO.ACCOUNT B, MFPDBO.ADMIN_RESPONDENT_ACCOUNT C "
							+ " WHERE A.ADMINRESPONDENTID = C.ADMINRESPONDENTID AND B.accountrecid = C.adminrespondentaccountrecid "
							+ " AND C.adminacctrespprimaryflag = 'Y' ORDER BY A.PERSONNAME";
		
		Query q = em.createNativeQuery(queryString, AdminMudroom.class);
				
		List<AdminMudroom> adminRes = q.getResultList();
		return adminRes;
   }
   
   public SalesLocation findAdminRespondentLocation(String loginName)  {

	String queryString = "SELECT  A.LOCATIONID, (SELECT MARKET_SALES_REGION FROM MFPDBO.MARKET_SALES_REGION_REF WHERE a.locationid=SALES_REGION_REF_ID) LOCATION "
						+ "  FROM MFPDBO.ADMIN_RESPONDENT A WHERE lower(a.eid)=('"
						+ StringUtility.replaceSingleQuotes(loginName)
						+ "')";
	Query q = em.createNativeQuery(queryString, SalesLocation.class);
	SalesLocation location;
	try {
	    location = (SalesLocation) q.getSingleResult();
	} catch (NoResultException e) {
	    location = new SalesLocation();
	}

	return location;
  }

	public void updateAdminRespondent(AdminMudroom adminRespondent, long period) {
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
		    try {
			CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_insertupdate_AdminResponden(?,?,?,?,?,?,?,?,?,?)}");
			try {
				cstmt.setString(1, adminRespondent.getPersonName());
				cstmt.setString(2, adminRespondent.getPersonTitle());
				cstmt.setString(3, adminRespondent.getCountryCode());
				cstmt.setString(4, adminRespondent.getAreaCityCode());
				cstmt.setString(5, adminRespondent.getPhoneNumber());
				cstmt.setString(6, adminRespondent.getFaxNumber());
				cstmt.setString(7, adminRespondent.getEmail());
				cstmt.setString(8, adminRespondent.getEid());
				cstmt.setLong(9, adminRespondent.getAdminLocationid());
				cstmt.registerOutParameter(10, Types.NUMERIC);
				cstmt.execute();
				adminRespondent.setAdminRespondentid(new Long(cstmt.getLong(10)));
			} finally {
			    cstmt.close();
			}
		    } finally {
			con.close();
		    }
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		    adminRespondent.setAdminRespondentid(new Long(0));
		}
		if (adminRespondent.getAdminRespondentid() != 0) {

			String queryString = "delete from mfpdbo.admin_respondent_salesregion " 
					+ " where adminrespondentsalestypeid in "
					+ " (select adminrespondentsalestypeid from mfpdbo.admin_respondent_salestype where adminrespondentid=?1)";
			Query q = em.createNativeQuery(queryString);
			q.setParameter(1, adminRespondent.getAdminRespondentid());
			q.executeUpdate();

			queryString = "delete from mfpdbo.admin_respondent_salestype where adminrespondentid=?1";
			q = em.createNativeQuery(queryString);
			q.setParameter(1, adminRespondent.getAdminRespondentid());
			q.executeUpdate();

			queryString = "delete from mfpdbo.admin_respondent_account where adminrespondentaccountrecid "
					+" in (select accountrecid from mfpdbo.account where period=?1) and adminrespondentid=?2";
			q = em.createNativeQuery(queryString);
			q.setParameter(1, period);
			q.setParameter(2, adminRespondent.getAdminRespondentid());
			q.executeUpdate();

			if(adminRespondent.getSalesTypesSel2() != null)
				updateAdminSalesTypes(adminRespondent.getAdminRespondentid(), adminRespondent.getSalesTypesSel2());
			
			Long marketSalestypeid;
			queryString = "select adminrespondentsalestypeid " 
					+"from mfpdbo.admin_respondent_salestype where accounttype='4' and adminrespondentid=?1";
			q = em.createNativeQuery(queryString, Long.class);
			try {
				q.setParameter(1, adminRespondent.getAdminRespondentid());
				marketSalestypeid = (Long) q.getSingleResult();
			} catch (NoResultException e) {
				marketSalestypeid = new Long(0);
			}

			if (marketSalestypeid.longValue() != 0 && adminRespondent.getAcctMktRgnSel2() != null) {
				updateAdminMarketRegion(marketSalestypeid, adminRespondent.getAcctMktRgnSel2());
			} //if
			
			if(adminRespondent.getPrimeAccountSel2() != null )
				updatePrimeAccounts(adminRespondent.getAdminRespondentid(), adminRespondent.getPrimeAccountSel2());
			if(adminRespondent.getSecAccountSel2() != null)
				updateSecAccounts(adminRespondent.getAdminRespondentid(), adminRespondent.getSecAccountSel2());

		} //if

	}

	public void updateAdminRespondentDate(String loginName) {
	
		Query q = em.createNativeQuery("update mfpdbo.admin_respondent set last_updatedate=sysdate where lower(eid)=lower(?1)");
		q.setParameter(1, loginName);
		q.executeUpdate();
	}

	public void updateAdminSalesTypes(long adminRespondentid, String[] salesTypesSel) {
		
		Query q = em
		.createNativeQuery("begin Insert into mfpdbo.admin_respondent_salestype (adminrespondentsalestypeid, adminrespondentid, accounttype) values (mfpdbo.ADMIN_RESPONDENT_SALESTYPE_SEQ.nextval,?1,?2); end; ");
		for (int i = 0; i < salesTypesSel.length; i++) {
			q.setParameter(1, adminRespondentid);
			q.setParameter(2, salesTypesSel[i]);
			q.executeUpdate();
		}
	}

	public void updatePrimeAccounts(long adminRespondentid, String[] primeAccounts) {
		
		Query q = em
		.createNativeQuery("begin Insert into mfpdbo.admin_respondent_account (adminrespondentid, adminrespondentaccountrecid, adminacctrespprimaryflag) VALUES (?1,?2, 'Y'); end; ");
	    for (int i = 0; i < primeAccounts.length; i++) {
			q.setParameter(1, adminRespondentid);
			q.setParameter(2, new Long(primeAccounts[i]).longValue());
			q.executeUpdate();
	    }
	}

	public void updateSecAccounts(long adminRespondentid, String[] secAccounts) {
		
		Query q = em
		.createNativeQuery("begin Insert into mfpdbo.admin_respondent_account (adminrespondentid, adminrespondentaccountrecid)  VALUES (?1,?2); end; ");
	    for (int i = 0; i < secAccounts.length; i++) {
			q.setParameter(1, adminRespondentid);
			q.setParameter(2, new Long(secAccounts[i]).longValue());
			q.executeUpdate();
	    }
	}

	public void updateAdminMarketRegion(long marketSalestypeid, String[] regionid) {
		
		Query q = em
		.createNativeQuery("begin Insert into mfpdbo.admin_respondent_salesregion (adminrespondentsalestypeid, sales_region_ref_id) VALUES (?1,?2); end; ");
	    for (int i = 0; i < regionid.length; i++) {
			q.setParameter(1, marketSalestypeid);
			q.setParameter(2, new Long(regionid[i]).longValue());
			q.executeUpdate();
	    }
	}

	public void updatePASAccounts(AdminMudroom adminRespondent, long period) {
		String queryString = "delete from mfpdbo.admin_respondent_account where adminrespondentaccountrecid "
				+" in (select accountrecid from mfpdbo.account where period=?1) and adminrespondentid=?2";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, period);
		q.setParameter(2, adminRespondent.getAdminRespondentid());
		q.executeUpdate();

		if(adminRespondent.getPrimeAccountSel2() != null )
			updatePrimeAccounts(adminRespondent.getAdminRespondentid(), adminRespondent.getPrimeAccountSel2());
		if(adminRespondent.getSecAccountSel2() != null)
			updateSecAccounts(adminRespondent.getAdminRespondentid(), adminRespondent.getSecAccountSel2());
	}

}
