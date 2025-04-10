package com.marriott.rfp.dataacess.pricing.hotelrfprespondent.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.NoResultException;
import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfprespondent.api.HotelRFPRespondentManager;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondent;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondentEmails;

/**
 * Session Bean implementation class HotelRFPRespondentManager
 */
@Service

public class HotelRFPRespondentManagerImpl implements HotelRFPRespondentManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public void checkRFPRespondent(long hotelrfpid, String loginName) {
	Query q = em.createNativeQuery("begin mfpproc.SP_CHECKPRICING_RESPONDENT(?1,?2); end;");
	q.setParameter(1, hotelrfpid);
	q.setParameter(2, loginName);
	q.executeUpdate();
    }

    public HotelRFPRespondent getHotelRFPRespondent(long hotelrfpid) {
	
	String queryString = "SELECT RFPRESPONDENTID, hr.HOTELRFPID, PERSONNAME, PERSONTITLE, COUNTRYCODE, "
		+ "AREACITYCODE, PHONENUMBER, FAXNUMBER, EMAIL FROM MFPDBO.HOTELRFP_RESPONDENT a, mfpdbo.hotelrfp hr where a.hotelrfpid(+) = hr.hotelrfpid and hr.hotelrfpid=?1";

	Query q = em.createNativeQuery(queryString, HotelRFPRespondent.class);
	q.setParameter(1, hotelrfpid);
	HotelRFPRespondent rfprespondent = (HotelRFPRespondent) q.getSingleResult();
	
	String acceptbtflg = "";
	try{
	String queryString1 = "SELECT ACCEPTBTFLG FROM MFPDBO.BT_BOOKING_COST_AUDIT where hotelrfpid=?1";
	Query q1 = em.createNativeQuery(queryString1, HotelRFPRespondent.class);
	q1.setParameter(1, hotelrfpid);
	List<HotelRFPRespondent> rfprespondentBT = (List<HotelRFPRespondent>) q1.getResultList();
	 if(rfprespondentBT!=null && !rfprespondentBT.isEmpty())
		 acceptbtflg = rfprespondentBT.get(0).getAcceptbtflg();
	 else
		 acceptbtflg = "N";
	 
	}catch(NoResultException e)
	{
		acceptbtflg = "N";
	}
	String queryString2 = "SELECT max(period) period FROM MFPDBO.period";

	Query q2 = em.createNativeQuery(queryString2, HotelRFPRespondent.class);
	
	List<HotelRFPRespondent> respondentList1 = q2.getResultList();
	HotelRFPRespondent rfprespondent1;
	if (respondentList1 != null && !respondentList1.isEmpty())
	    rfprespondent1 = respondentList1.get(0);
	else
	    rfprespondent1 = new HotelRFPRespondent();
	
	rfprespondent.setAcceptbtflg(acceptbtflg);
	rfprespondent.setPeriod(rfprespondent1.getPeriod());// max period from period table 
	
	return rfprespondent;
    
    }

    @SuppressWarnings("unchecked")
    public List<HotelRFPRespondentEmails> getHotelRFPRespondentEmails(long respondentid) {
	String queryString = "Select rfprespondentid, emailtypeid, nvl(email, '') email, nvl(personname, '') personname, nvl(persontitle, '') persontitle, nvl(phonenumber, '') phonenumber from mfpdbo.hotelrfp_res_emails"
		+ " where rfprespondentid=?1 order by emailtypeid ";
	Query q = em.createNativeQuery(queryString, HotelRFPRespondentEmails.class);
	q.setParameter(1, respondentid);
	List<HotelRFPRespondentEmails> rfprespondentemails = q.getResultList();

	return rfprespondentemails;
    }

    @SuppressWarnings("unchecked")
    public long getHotelRFPRespondentId(long hotelrfpid) {
	String queryString = "SELECT RFPRESPONDENTID FROM MFPDBO.HOTELRFP_RESPONDENT where hotelrfpid=?1";

	Query q = em.createNativeQuery(queryString, HotelRFPRespondent.class);
	q.setParameter(1, hotelrfpid);
	List<HotelRFPRespondent> respondentList = q.getResultList();
	HotelRFPRespondent rfprespondent;
	if (respondentList != null && !respondentList.isEmpty())
	    rfprespondent = respondentList.get(0);
	else
	    rfprespondent = new HotelRFPRespondent();

	return rfprespondent.getRfprespondentid();
    }

    public void updateRFPRespondent(HotelRFPRespondent hotelRFPRespondent, String loginName) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_rfprespondent(?,?,?,?,?,?,?,?); end; ");
		try {
		    stmt.setLong(1, hotelRFPRespondent.getHotelrfpid());
		    stmt.setString(2, hotelRFPRespondent.getPersonname());
		    stmt.setString(3, hotelRFPRespondent.getPersontitle());
		    stmt.setString(4, hotelRFPRespondent.getCountrycode());
		    stmt.setString(5, hotelRFPRespondent.getAreacitycode());
		    stmt.setString(6, hotelRFPRespondent.getPhonenumber());
		    stmt.setString(7, hotelRFPRespondent.getFaxnumber());
		    stmt.setString(8, hotelRFPRespondent.getEmail());
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
public void updateBTflag(Long hotelrfpid, String acceptbtflg, String eid)
    {
    	try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(eid);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_updatebtflag(?,?,?); end; ");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.setString(2, acceptbtflg);
					stmt.setString(3, eid);
					
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
    public void updateRFPRespondentEmails(HotelRFPRespondentEmails hotelRFPRespondentEmails, String loginName) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_rfpres_email(?,?,?,?,?,?); end; ");
		try {
		    stmt.setLong(1, hotelRFPRespondentEmails.getRfprespondentid());
		    stmt.setLong(2, hotelRFPRespondentEmails.getEmailtypeid());
		    stmt.setString(3, hotelRFPRespondentEmails.getEmail());
		    stmt.setString(4, hotelRFPRespondentEmails.getPersonname());
		    stmt.setString(5, hotelRFPRespondentEmails.getPersontitle());
		    stmt.setString(6, hotelRFPRespondentEmails.getPhonenumber());
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

}
