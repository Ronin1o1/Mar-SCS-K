package com.marriott.rfp.dataaccess.wholesaler.daysofweek.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.daysofweek.api.DaysOfWeekManager;
import com.marriott.rfp.object.wholesaler.daysofweek.DaysOfWeek;


/**
 * Session Bean implementation class DaysOfWeekManager
 */

@Service
public class DaysOfWeekManagerImpl implements DaysOfWeekManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em; 

	public DaysOfWeekManagerImpl() { }

	@SuppressWarnings("unchecked")
	public List<DaysOfWeek> findAllDaysOfWeek(){
	
		List<DaysOfWeek> retDow = new ArrayList<DaysOfWeek>();
		String queryString = "select combo_id from mfpdbo.ws_daysofweek_combo order by combo_id";
		Query q = em.createNativeQuery(queryString, DaysOfWeek.class);
		List<DaysOfWeek> daysOfWeekList = q.getResultList();
		
		for(int i=0;i<daysOfWeekList.size();i++) {
			DaysOfWeek dow=daysOfWeekList.get(i);
			dow.setDaysofweek(findDOWByComboId(dow.getCombo_id()));
		}
	
		DaysOfWeek dowEmpty = new DaysOfWeek();
		dowEmpty.setCombo_id(0);
		dowEmpty.setDaysofweek("");
		retDow.add(dowEmpty);

		for (DaysOfWeek doweek : daysOfWeekList) {
			retDow.add(doweek);
		}
	
		return retDow;
	}
	@SuppressWarnings("unchecked")
	public List<DaysOfWeek>findDOWByParticipationId(long wsid){
		String queryString = "select a.daysofweek_id, a.combo_id, b.season_id from mfpdbo.ws_daysofweek a, mfpdbo.ws_seasons b where "
							+ "b.participation_id = ?1 and a.season_id=b.season_id order by b.start_date asc";
		Query q = em.createNativeQuery(queryString, DaysOfWeek.class);
		q.setParameter(1, wsid);
		List<DaysOfWeek> daysOfWeekList = q.getResultList();
		if (daysOfWeekList != null && daysOfWeekList.size() > 0) {
			for(int i=0;i<daysOfWeekList.size();i++){
				DaysOfWeek dow=daysOfWeekList.get(i);
				dow.setDaysofweek(findDOWByComboId(dow.getCombo_id()));
				dow.setDaysofweek_ref(findDOWRefByComboId(dow.getCombo_id()));
				dow.setHasRates(hasRates(dow.getDaysofweek_id()));
			}
		}
	
		return daysOfWeekList;
		
	}

	public boolean hasRates(long daysofweekid){
		boolean b=false;
		String queryString = "select count(*) from mfpdbo.ws_rates where daysofweek_id = ?1";
		Query q = em.createNativeQuery(queryString, Integer.class);
		q.setParameter(1, daysofweekid);
		Integer IntCl = (Integer)q.getSingleResult();
		int cnt=IntCl.intValue();
		if(cnt >0) b=true;
		return b;
	}


	@SuppressWarnings("unchecked")
	private String findDOWByComboId(long comboid) {
		String days = "";
		String queryString = "select a.daysofweek from mfpdbo.ws_daysofweek_ref a, mfpdbo.ws_daysofweek_validcombo b "
							 + "where b.combo_id = ?1 and a.daysofweek_ref_id=b.daysofweek_ref_id order by b.daysofweek_seq";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, comboid);
		List<String> strDOWComboList = q.getResultList();
		for(int i=0;i<strDOWComboList.size();i++){
			days+=(String)strDOWComboList.get(i)+",";
		}
		
		return days.substring(0,days.length() - 1);
			
	}


	@SuppressWarnings("unchecked")
	private String findDOWRefByComboId(long comboid){
		String daysref = "";
		String queryString = "select a.daysofweek_ref_id from mfpdbo.ws_daysofweek_ref a, mfpdbo.ws_daysofweek_validcombo b "
							+ "where b.combo_id = ?1 and a.daysofweek_ref_id=b.daysofweek_ref_id order by b.daysofweek_seq";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, comboid);
		List<Long> strDOWRefList = q.getResultList();
		for(int i=0;i<strDOWRefList.size();i++){
			daysref+=((Long)strDOWRefList.get(i)).toString()+",";
		}
		
		return daysref.substring(0,daysref.length() - 1);
		
	}

	public void updateDaysofWeek(List<DaysOfWeek> dow, long participationid, String formChanged, long period, boolean isPeriodExpired, String role, String loginName){
		CallableStatement stmt;
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
		    
		    try {
		    	AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
		    	audit.setAuditUser(con);
		    	stmt=con.prepareCall("begin  mfpproc.SP_WS_UPDATEENTRYSTATUS(?,?," + isPeriodExpired + ",?, true); end; ");
			
		    	try {
					stmt.setLong(1,participationid);
					stmt.setString(2,role);
					stmt.setString(3,formChanged);
					stmt.execute();
			    } finally {
			    	stmt.close();
			    }
			    
			    try {
					stmt = con.prepareCall("{call mfpproc.SP_WS_UPDATEDAYSOFWEEK(?, ?, ?, ?, ? ,?, ?)}");
					if (dow != null) {
						for (int i = 0; i < dow.size(); i++) {
							DaysOfWeek daysofweek= (DaysOfWeek)dow.get(i);
							stmt.setLong(1, daysofweek.getSeason_id());
							stmt.setLong(2, Long.parseLong(daysofweek.getDaysofweek()));
							stmt.setString(3, new Boolean(daysofweek.isRatesChanged()).toString());
							stmt.setString(4, new Boolean(daysofweek.isHasRates()).toString());
							stmt.setLong(5, participationid);
							stmt.setString(6, role);
							stmt.setString(7, new Boolean(isPeriodExpired).toString());
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

	public List<DaysOfWeek> findDOWByParticipationIdwithoutComma(long wsid){
	
	List<DaysOfWeek> daysOfWeekList=findDOWByParticipationId(wsid);
	List<DaysOfWeek> vdaysofWeek = new ArrayList<DaysOfWeek>();
	
	if (daysOfWeekList != null && daysOfWeekList.size() > 0) {
		for(int i=0; i< daysOfWeekList.size(); i++) {
			DaysOfWeek daysofweek=(DaysOfWeek)daysOfWeekList.get(i);
			String strDaysofWeek=daysofweek.getDaysofweek();
			String strDaysofWeekRef=daysofweek.getDaysofweek_ref();
			long combo_id=daysofweek.getCombo_id();
			long season_id=daysofweek.getSeason_id();
			long days_week_id=daysofweek.getDaysofweek_id();

			if(!strDaysofWeek.equals("")) {
				StringTokenizer st = new StringTokenizer(strDaysofWeek, ",");
				StringTokenizer st1 = new StringTokenizer(strDaysofWeekRef, ",");
				if(st.countTokens() > 0) {
  	 	  			while (st.hasMoreTokens()) {
  	 	  				DaysOfWeek dw = new DaysOfWeek();
  	 	  				dw.setDaysofweek_id(days_week_id);
  	 	  				dw.setCombo_id(combo_id);
  	 	  				dw.setSeason_id(season_id);
  	 	  				dw.setDaysofweek(st.nextToken().trim());
  	 	  				dw.setDaysofweek_ref(st1.nextToken().trim());
  	 	  				vdaysofWeek.add(dw);
	    			}
				}
			}	
		}
	}
	
	return vdaysofWeek;

}

}