package com.marriott.rfp.dataaccess.wholesaler.participate.impl;

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

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.participate.api.ParticipateManager;
import com.marriott.rfp.object.wholesaler.participate.Participiate;

/**
 * Session Bean implementation class ParticipateManagerImpl
 */

@Service
public class ParticipateManagerImpl implements ParticipateManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em; 
	
	public ParticipateManagerImpl() { }
	
	public long findWSParticipationID(String marshacode, long period, String loginName){
		
		long lng=0;
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
	    
			try {
				CallableStatement stmt = con.prepareCall("begin ? := mfpproc.FN_WS_GETPARTICIPATIONID(?,?,?); end;");
				
				try {
					stmt.registerOutParameter(1, Types.NUMERIC);
					stmt.setString(2, marshacode);
					stmt.setLong(3, period);
					stmt.setString(4, loginName);
					stmt.execute();
					lng=stmt.getLong(1);
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
	
		return lng;
	}
	
	public String isParticipating(long participationid) {
	
		String queryString;
		String strParticipate="";
		queryString = "SELECT nvl(participation,' ') participation FROM MFPDBO.WS_PARTICIPATION " + "WHERE participation_id = ?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, participationid);
		strParticipate=(String)q.getSingleResult();
		return strParticipate;
	}

	public String hasPeriodExpired(long period,long participationid) {
	
		String queryString;
		queryString="select mfpproc.FN_WS_ISPERIODEXPIRED(?,?) from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, period);
		q.setParameter(2, participationid);
		String strPeriodExpired=(String)q.getSingleResult();
		return strPeriodExpired;
	}

	@SuppressWarnings("unchecked")
	public  Participiate findRespondentDetails(long wsid, String role, String loginName){
	
		if (role.equals("U")) {
			Query q = em.createNativeQuery("begin mfpproc.SP_WS_CHECK_RESPONDENT(?1,?2); end;");
			q.setParameter(1, wsid);
			q.setParameter(2, loginName);
			q.executeUpdate();
		}
		
		String queryString;
		queryString="SELECT b.participation participate, nvl(A.RESPONDENT_ID,0) respondentid, nvl(A.PARTICIPATION_ID,0) participateid,"
			+ "nvl(A.PERSON_NAME,'') person_name, nvl(A.PERSON_TITLE,'') person_title, nvl(A.EMAIL ,'')email, "
			+ "nvl(A.COUNTRY_CODE,'') country_code, nvl(A.AREA_CITY_CODE,'') area_city_code, nvl(A.PHONE_NUMBER,'') phone_number,"
			+ "nvl(A.FAX_NUMBER,'') fax_number "
			+ "FROM MFPDBO.WS_RESPONDENT A, MFPDBO.WS_PARTICIPATION B "
			+ "WHERE A.PARTICIPATION_ID (+)= B.PARTICIPATION_ID "
			+ "AND B.PARTICIPATION_ID = ?";
	
		Query q1 = em.createNativeQuery(queryString, Participiate.class);
		q1.setParameter(1,wsid);
		List<Participiate> partList=q1.getResultList();
		Participiate participiate;
		if(partList != null && !partList.isEmpty()){
			participiate=partList.get(0);
		} else {
			participiate=new Participiate();
		}
	
		return participiate;
	}
	
	public void updateRespondent(Participiate participate,long wsid, String changed, String role, boolean isPeriodExpired, String loginName){
	
	try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
					audit.setAuditUser(con);
					CallableStatement stmt = con.prepareCall("begin mfpproc.SP_WS_UPDATERESPONDENT(?,?,?,?,?,?,?,?,?,?,?," +isPeriodExpired + "); end; ");
					
					try {
						stmt.setLong(1, participate.getRespondentid());
						stmt.setString(2, participate.getPerson_name());
						stmt.setString(3, participate.getPerson_title());
						stmt.setString(4, participate.getEmail());
						stmt.setString(5, participate.getCountry_code());
						stmt.setString(6, participate.getArea_city_code());
						stmt.setString(7, participate.getPhone_number());
						stmt.setString(8, participate.getFax_number());
						stmt.setLong(9, wsid);
						stmt.setString(10, role);
						stmt.setString(11, changed);	
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

	public void updateParticipiant(Participiate participate,long wsid, String changed, String role, boolean isPeriodExpired, String loginName){
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_WS_UPDATEPARTICIPATION(?,?,?,?," +isPeriodExpired + "); end; ");
		
				try {
					stmt.setLong(1, wsid);
					stmt.setString(2, participate.getParticipate());
					stmt.setString(3, role);
					stmt.setString(4, changed);
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