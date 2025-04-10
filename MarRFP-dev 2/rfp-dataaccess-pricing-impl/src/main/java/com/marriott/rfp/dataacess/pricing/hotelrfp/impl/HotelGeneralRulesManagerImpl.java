package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelGeneralRulesManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelGeneralRulesManagerImpl implements HotelGeneralRulesManager {
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<HotelRules> findGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user) {

	String queryString = "SELECT   A.RULENAME , nvl(decode(c.rulevalue, '', B.DEFAULTVALUE, c.rulevalue), '') rulevalue , B.HARDCODED , rtrim(A.RULEID) ruleid "
		+ " FROM mfpdbo.RATERULES_REF A "
		+ " , mfpdbo.RATETYPE_RULES_REF B "
		+ " , (SELECT HOTELRULESID id , RULETYPEID , RULEVALUE "
		+ " FROM mfpdbo.HOTELRULES B "
		+ " WHERE (B.HOTELRFPID =?1) "
		+ " AND (B.RATETYPEID =?2)) c "
		+ " WHERE (B.RULETYPEID = A.RULEID) "
		+ " AND (B.RULETYPEID = C.RULETYPEID (+)) " + " AND (B.RATETYPEID =?3 ) ";
	if (!user.getIsPASAdmin() && !user.getIsAnySalesUser())
	    queryString += " AND (A.DISPLAYTYPEID ='A' or A.DISPLAYTYPEID =?4) ";
	queryString += " ORDER BY  A.SEQUENCE ASC ";

	Query q = em.createNativeQuery(queryString, HotelRules.class);
	q.setParameter(1, hotelrfpid);
	q.setParameter(2, ratetypeid);
	q.setParameter(3, ratetypeid);
	if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
	    String dom_int = "D";
	    if (isInternational)
		dom_int = "I";
	    q.setParameter(4, dom_int);
	}
	List<HotelRules> ruleslist = q.getResultList();
	return ruleslist;
    }

    public void updateGeneralRules(long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelrules(?,?,?,?); end; ");
		try {
		    for (int i = 0; i < ruleslist.size(); i++) {
			stmt.setLong(1, hotelrfpid);
			stmt.setLong(2, ratetypeid);
			stmt.setString(3, ruleslist.get(i).getRuleid());
			stmt.setString(4, ruleslist.get(i).getRulevalue());
			stmt.execute();
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
    public List<HotelRules> findGovGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user) {

	String queryString = "SELECT   A.RULENAME , nvl(decode(c.rulevalue, '', B.DEFAULTVALUE, c.rulevalue), '') rulevalue , B.HARDCODED , rtrim(A.RULEID) ruleid "
		+ " FROM mfpdbo.RATERULES_REF A "
		+ " , mfpdbo.RATETYPE_RULES_REF B "
		+ " , (SELECT HOTELRULESID id , RULETYPEID , RULEVALUE "
		+ " FROM mfpdbo.HOTELRULES_gov B "
		+ " WHERE (B.HOTELRFPID =?1) "
		+ " AND (B.RATETYPEID =?2)) c "
		+ " WHERE (B.RULETYPEID = A.RULEID) " + " AND (B.RULETYPEID = C.RULETYPEID (+)) " + " AND (B.RATETYPEID =?3 ) ";
	if (!user.getIsPASAdmin() && !user.getIsAnySalesUser())
	    queryString += " AND (A.DISPLAYTYPEID ='A' or A.DISPLAYTYPEID =?4) ";
	queryString += " ORDER BY  A.SEQUENCE ASC ";

	Query q = em.createNativeQuery(queryString, HotelRules.class);
	q.setParameter(1, hotelrfpid);
	q.setParameter(2, ratetypeid);
	q.setParameter(3, ratetypeid);
	if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
	    String dom_int = "D";
	    if (isInternational)
		dom_int = "I";
	    q.setParameter(4, dom_int);
	}
	List<HotelRules> ruleslist = q.getResultList();
	return ruleslist;
    }

    public void updateGovGeneralRules(long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user) {
	try {
	    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
	    Connection con = (Connection) kem.getConnection();
	    try {
		AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
		audit.setAuditUser(con);
		CallableStatement stmt = con.prepareCall("begin mfpproc.sp_insertupdate_hotelrules_gov(?,?,?,?); end; ");
		try {
		    for (int i = 0; i < ruleslist.size(); i++) {
			stmt.setLong(1, hotelrfpid);
			stmt.setLong(2, ratetypeid);
			stmt.setString(3, ruleslist.get(i).getRuleid());
			stmt.setString(4, ruleslist.get(i).getRulevalue());
			stmt.execute();
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
