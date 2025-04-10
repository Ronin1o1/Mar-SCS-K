package com.marriott.rfp.dataacess.pricing.sapp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.sapp.api.AccountOverviewLocationsManager;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctLocations;
import com.marriott.rfp.object.pricing.sapp.AcctTasks;
import com.marriott.rfp.object.pricing.sapp.LocationMarkets;
import com.marriott.rfp.object.pricing.sapp.LocationOffice;
import com.marriott.rfp.object.pricing.sapp.LocationSalesArea;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class PeriodManagerImpl
 */

@Service
public class AccountOverviewLocationsManagerImpl implements AccountOverviewLocationsManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public AccountOverviewLocationsManagerImpl() {
	}

	@SuppressWarnings("unchecked")
	public List<AcctLocations> findAcctOverviewLocations(long accountrecid, String usLocation) {

		String queryString = "SELECT A.bl_name, a.bl_potentialrn, NVL(a.buyinglocid,0) buyinglocid, a.bl_potentialrev, A.ACCOUNTINFOID "
		        		+ "FROM mfpdbo.ACCOUNTINFO_BUYINGLOC A, mfpdbo.ACCOUNTINFO B " + "WHERE (B.ACCOUNTRECID = ?1) " +
		        		  " AND (B.ACCOUNTINFOID = A.ACCOUNTINFOID) and (a.USLOCATION= ?2) ORDER BY A.SEQID, A.ACCOUNTINFOID";

		Query q = em.createNativeQuery(queryString, AcctLocations.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, usLocation);
		List<AcctLocations> acctLocations = q.getResultList();
		return acctLocations;
	}
	
	@SuppressWarnings("unchecked")
	public List<LocationSalesArea> getAcctLocSalesAreaInfo(String usLocation) {
		
		String queryString = "";

        if (usLocation.equalsIgnoreCase("Y")) {
        	queryString = "select a.salesareaid, a.salesareaname from mfpdbo.accountinfo_bl_salesarea_ref a, mfpdbo.ACCOUNTINFO_MARKET_REF b "
        				   + " where a.salesareaid = b.salesareaid group by a.salesareaid, a.salesareaname";
        } else {
        	queryString = "select a.salesareaid, a.salesareaname from mfpdbo.accountinfo_bl_salesarea_ref a "
        		          + " MINUS select a.salesareaid, a.salesareaname from mfpdbo.accountinfo_bl_salesarea_ref a, mfpdbo.ACCOUNTINFO_MARKET_REF b "
						  + " where a.salesareaid = b.salesareaid group by a.salesareaid, a.salesareaname";
        }


		Query q = em.createNativeQuery(queryString, LocationSalesArea.class);
		List<LocationSalesArea> locSalesAreas = q.getResultList();
		return locSalesAreas;

	}
	
	@SuppressWarnings("unchecked")
	public List<AcctInitiatives> getAcctOverviewLocInitList(long accountrecid, long revstreamid, long buyinglocid) {

		long accountinfoid = getAccountInfoID(accountrecid);

		String queryString = "SELECT a.acctinitiativeid, A.INITIATIVE_NAME, A.SEQID, a.revstreamid, NVL(a.buyinglocid,0) buyinglocid FROM mfpdbo.ACCOUNTINFO_INITIATIVES A " 
		+ " WHERE (A.ACCOUNTINFOID = ?1) AND (A.buyinglocid = ?2) ORDER BY SEQID ASC ";
		
		Query q = em.createNativeQuery(queryString, AcctInitiatives.class);
		q.setParameter(1, accountinfoid);
		q.setParameter(2, buyinglocid);
		List<AcctInitiatives> initiatives = q.getResultList();
		return initiatives;

	}

	@SuppressWarnings("unchecked")
	public List<AcctTasks> getAcctOverviewLocTasksList(Long initiativeid) {

		String queryString = "SELECT a.accintdetailid, a.initiativeid, a.seqid, a.begindate, a.enddate, a.task_desc taskDesc, a.responsible"
                        + " from mfpdbo.ACCOUNTINFO_INIT_TASK a" + " WHERE a.initiativeid = ? ORDER BY a.seqid ASC ";
		
		Query q = em.createNativeQuery(queryString, AcctTasks.class);
		q.setParameter(1, initiativeid.longValue());
		List<AcctTasks> tasks = q.getResultList();
		return tasks;

	}

    public long getAccountInfoID(long accountrecid) {
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
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    public long getInitiativeID(long accountinfoid, long seqId, long buyingLocid) {
        try {
        	
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

            java.sql.CallableStatement cstmt = con.prepareCall("begin ? := mfpproc.FN_GET_BL_INITIATIVEID(?,?,?); end; ");
            cstmt.registerOutParameter(1, Types.NUMERIC);
            cstmt.setLong(2, accountinfoid);
            cstmt.setLong(3, seqId);
            cstmt.setLong(4, buyingLocid);
            try {
                cstmt.execute();
                return cstmt.getLong(1);
            } finally {
                cstmt.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

	@SuppressWarnings("unchecked")
	public List<LocationMarkets> getAcctLocMarkets() {
		
		String queryString = "Select b.salesareaid, a.marketid, a.marketname from mfpdbo.ACCOUNTINFO_MARKET_REF a, mfpdbo.ACCOUNTINFO_BL_SALESAREA_REF b "
                				+ " where a.salesareaid = b.salesareaid order by a.salesareaid, a.marketid";
		
		Query q = em.createNativeQuery(queryString, LocationMarkets.class);
		List<LocationMarkets> locMarkets = q.getResultList();
		return locMarkets;

		
	}
	
	@SuppressWarnings("unchecked")
	public List<DSUser> getAcctOverviewLocPlanUserList(long accountrecid) {
		
		String queryString = "SELECT  A.EID ,A.CN_LASTNAME, A.CN_FIRSTNAME, A.CN_LASTNAME||','||A.CN_FIRSTNAME name "
        + "FROM MFPDBO.DS_USER A , MFPDBO.DS_MEMBER B,MFPDBO.DS_ACCOUNTUSERS C,MFPDBO.ACCOUNT D, MFPDBO.DS_GROUP E "
        + "WHERE (B.CN_USERID = A.CN_USERID) " + "AND (B.OU_GROUPID = E.ou_groupid) "
        + "AND (E.ou_group  in ('MFPSALES','MFPFSALE')) " + "AND (B.cn_userid = C.cn_userid) " + "AND (B.ou_groupid = C.ou_groupid) "
        + "AND (A.CN_REFRESH != -1) " + "AND D.accountid = c.accountid " + "AND (D.accountrecid = ?1)"; 

		Query q = em.createNativeQuery(queryString, DSUser.class);
		q.setParameter(1, accountrecid);
		List<DSUser> contacts = q.getResultList();
		return contacts;

	}
	
	@SuppressWarnings("unchecked")
	public List<HotelAffiliation> getAcctOverviewLocBrandSeg(long buyinglocid) {

		String queryString = "SELECT a.affiliationid " + "FROM mfpdbo.ACCOUNTINFO_BL_BRANDSEG_PREF a "
                        + " WHERE a.buyinglocid = ?1"; 

			Query q = em.createNativeQuery(queryString, HotelAffiliation.class);
			q.setParameter(1, buyinglocid);
			List<HotelAffiliation> locbrand = q.getResultList();
			return locbrand;

	}
	
	public long createAcctOverviewBuyingLocation(AcctLocations location, long accountrecid) {

		long accountinfoid = getAccountInfoID(accountrecid);
		Connection connection = null;
		CallableStatement stmt = null;
		long buyinglocid = 0;
		
		try {
			
			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.SP_INSERT_ACCTOV_BL_LOCATION(?, ?, ?, ?, ?, ?); end; ");
			stmt.registerOutParameter(1, Types.NUMERIC);
			stmt.setLong(2, accountinfoid);
			stmt.setLong(3, location.getSeqid());
			stmt.setString(4, location.getBl_name());
			if (location.getBl_potentialrn() != null) stmt.setDouble(5, location.getBl_potentialrn()); else stmt.setNull(5, Types.NUMERIC);
			stmt.setString(6, location.getUsLocation());
			stmt.executeUpdate();
			buyinglocid = stmt.getLong(1);


		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				ex.printStackTrace();
			}
		}

		return buyinglocid;
	}
	
	@SuppressWarnings("unchecked")
	public AcctLocations getAcctOverviewLocationInfo(long buyinglocid) {

		String queryString = "select a.buyinglocid, a.bl_name, a.bl_potentialrn, a.bl_potentialrev, a.bl_salesareaid, " 
                		+ " a.bl_marketid, 999 as module_ref, a.bl_address, a.bl_city, a.bl_state, a.bl_country, "
						+ " a.bl_zip, a.notes, a.seqid, b.affiliationid, c.buyingloctextid, c.bl_overview, c.bl_objectives, c.bl_strategy, c.bl_issues "
						+ " from mfpdbo.ACCOUNTINFO_BUYINGLOC A, mfpdbo.ACCOUNTINFO_BL_BRANDSEG_PREF b, mfpdbo.ACCOUNTINFO_BL_STRATEGY c "
						+ " where a.buyinglocid = b.buyinglocid(+) and a.buyinglocid = c.buyinglocid(+) and a.buyinglocid = ?";

		Query q = em.createNativeQuery(queryString, AcctLocations.class);
		q.setParameter(1, buyinglocid);
		List<AcctLocations> locations = q.getResultList();
		if (locations != null && locations.size() > 0) {
			return locations.get(0);
		} else {
			return new AcctLocations();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<LocationOffice> findAcctOverviewLocationContacts(long buyingLocationId, long contacttypeid) {
		
		String queryString = "SELECT A.bl_contactid contactid, a.buyinglocid, a.contacttypeid, a.eid, a.contactname contactName, a.contacttitle contactTitle, a.contactphone contactPhone, " 
		        		+ " a.contactfax contactFax, a.contactemail contactEmail FROM mfpdbo.ACCOUNTINFO_BL_CONTACTS A, mfpdbo.ACCOUNTINFO_BUYINGLOC B " 
		        		+ " WHERE (A.BUYINGLOCID = B.BUYINGLOCID ) AND A.CONTACTTYPEID in (26,27) AND B.BUYINGLOCID =  ?1 order by a.contacttypeid";

		Query q = em.createNativeQuery(queryString, LocationOffice.class);
		q.setParameter(1, buyingLocationId);
		List<LocationOffice> locationContacts = q.getResultList();
		return locationContacts;
		
	}
	
	@SuppressWarnings("unchecked")
	public List<LocationOffice> getAcctOverviewLocationContactTypes() {

		String queryString = "select a.contacttypeid, a.contacttypedesc, a.sequence, a.istitleorregion "
		        	           + " FROM MFPDBO.ACCOUNTINFO_CONTACTTYPE a where A.CONTACTTYPEID in (26,27) ORDER BY a.SEQUENCE";

		Query q = em.createNativeQuery(queryString, LocationOffice.class);
		List<LocationOffice> locationTitles = q.getResultList();
		return locationTitles;

	}
	
	public long updateAcctOverviewLocationLevel(AcctLocations model, Map<Long, LocationOffice> locContacts, String[] selBrandList, long accountrecid, String action, long buyinglocid) {
		
		long accountinfoid = getAccountInfoID(accountrecid);
		Connection connection = null;
		CallableStatement stmt = null;
		long rid = 0;
		
		try {
			
			OpenJPAEntityManager openJPAem = OpenJPAPersistence.cast(em);
			connection = (Connection) openJPAem.getConnection();

			stmt = connection.prepareCall("begin mfpproc.SP_UPDATE_ACCTOV_BL_LOC_LEVEL(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); end; ");
			stmt.registerOutParameter(1, Types.NUMERIC);
            stmt.setLong(1, buyinglocid);
            if (model.getBl_name() != null) stmt.setString(2, model.getBl_name()); else stmt.setNull(2, Types.VARCHAR);
            if (model.getBl_potentialrn() != null) stmt.setDouble(3, model.getBl_potentialrn()); else stmt.setNull(3, Types.NUMERIC);
            if (model.getBl_potentialrev() != null) stmt.setDouble(4, model.getBl_potentialrev()); else stmt.setNull(4, Types.NUMERIC);
            stmt.setLong(5, accountinfoid);
            if (model.getBl_address() != null) stmt.setString(6, model.getBl_address()); else stmt.setNull(6, Types.VARCHAR);
            if (model.getBl_city() != null) stmt.setString(7, model.getBl_city()); else stmt.setNull(7, Types.VARCHAR);
            if (model.getBl_state() != null) stmt.setString(8, model.getBl_state()); else stmt.setNull(8, Types.VARCHAR);
            if (model.getBl_country() != null) stmt.setString(9, model.getBl_country()); else stmt.setNull(9, Types.VARCHAR);
            if (model.getBl_zip() != null) stmt.setString(10, model.getBl_zip()); else stmt.setNull(10, Types.VARCHAR);
            if (model.getBl_marketid() != null) stmt.setLong(11, model.getBl_marketid()); else stmt.setNull(11, Types.NUMERIC);
            if (model.getBl_salesareaid() != null) stmt.setLong(12, model.getBl_salesareaid()); else stmt.setNull(12, Types.NUMERIC);
            if (model.getNotes() != null) stmt.setString(13, StringUtility.replaceFormatChars(model.getNotes())); else stmt.setNull(13, Types.VARCHAR);
            if (model.getSeqid() != null) stmt.setLong(14, model.getSeqid()); else stmt.setNull(14, Types.NUMERIC);
            if (model.getAffiliationid() != null) stmt.setLong(15, model.getAffiliationid()); else stmt.setNull(15, Types.NUMERIC);
            if (model.getBl_overview() != null) stmt.setString(16, StringUtility.replaceFormatChars(model.getBl_overview())); else stmt.setNull(16, Types.VARCHAR);
            if (model.getBl_objectives() != null) stmt.setString(17, StringUtility.replaceFormatChars(model.getBl_objectives())); else stmt.setNull(17, Types.VARCHAR);
            if (model.getBl_strategy() != null) stmt.setString(18, StringUtility.replaceFormatChars(model.getBl_strategy())); else stmt.setNull(18, Types.VARCHAR);
            if (model.getBl_issues() != null) stmt.setString(19, StringUtility.replaceFormatChars(model.getBl_issues())); else stmt.setNull(19, Types.VARCHAR);
            stmt.setString(20, model.getUsLocation());
            stmt.setString(21, action);  
			stmt.executeUpdate();
			rid = stmt.getLong(1);
			long blinfoid = stmt.getLong(1);

			if (action.equals("update")) {
                updateOffices(locContacts, blinfoid, accountrecid);
                updateBrandSegments(selBrandList, blinfoid);
            }
			
		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException ex) {
				ex.printStackTrace();
			}
		}

		return rid;

	}
	
	public void updateOffices(Map<Long, LocationOffice> offices, long blinfoid, long accountrecid) {
		
		CallableStatement stmt;
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			try {
				
				stmt = con.prepareCall("{call mfpproc.SP_UPDATE_ACCTOV_BL_CONTACTS(?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				try {
					for (Long key : offices.keySet()) {
						if (offices.get(key).getEid() != null && !offices.get(key).getEid().equals("9999")) {
							String contactName = getContactName(offices.get(key).getEid(), accountrecid);
							stmt.setLong(1, blinfoid);
							if (offices.get(key).getContactid() != null) stmt.setLong(2, offices.get(key).getContactid()); else stmt.setNull(2, Types.NUMERIC);
							if (offices.get(key).getContacttypeid() != null) stmt.setLong(3, offices.get(key).getContacttypeid()); else stmt.setNull(3, Types.NUMERIC);
							if (offices.get(key).getEid() != null) stmt.setString(4, offices.get(key).getEid()); else stmt.setNull(4, Types.VARCHAR);
							if (contactName != null) stmt.setString(5, contactName); else stmt.setNull(5, Types.VARCHAR);
							if (offices.get(key).getContactTitle() != null) stmt.setString(6, offices.get(key).getContactTitle()); else stmt.setNull(6, Types.VARCHAR);
							if (offices.get(key).getContactPhone() != null) stmt.setString(7, offices.get(key).getContactPhone()); else stmt.setNull(7, Types.VARCHAR);
							if (offices.get(key).getContactFax() != null) stmt.setString(8, offices.get(key).getContactFax()); else stmt.setNull(8, Types.VARCHAR);
							if (offices.get(key).getContactEmail() != null) stmt.setString(9, offices.get(key).getContactEmail()); else stmt.setNull(9, Types.VARCHAR);
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
			ex.printStackTrace();
		}
	}
	
	public String getContactName(String eid, long accountrecid) {
		
		String queryString = "SELECT  A.CN_LASTNAME || ',' || A.CN_FIRSTNAME FROM MFPDBO.DS_USER A , MFPDBO.DS_MEMBER B, MFPDBO.DS_ACCOUNTUSERS C, MFPDBO.ACCOUNT D, " + 
							 " MFPDBO.DS_GROUP E WHERE (B.CN_USERID = A.CN_USERID) AND (B.OU_GROUPID = E.ou_groupid) AND (E.ou_group  in ('MFPSALES','MFPFSALE')) " + 
							 " AND (B.cn_userid = C.cn_userid) AND (B.ou_groupid = C.ou_groupid) AND (A.CN_REFRESH != -1) AND D.accountid = c.accountid AND (D.accountrecid = ?1) " +
							 " and (A.eid = ?2)";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, accountrecid);
		q.setParameter(2, eid);
		String name = (String) q.getSingleResult();
		return name;

	}
	
	public void updateBrandSegments(String[] selBrandList, long blinfoid) {
		
		CallableStatement stmt;
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			deleteAcctOverviewBrandSeg(blinfoid);
			
			try {
				
				stmt = con.prepareCall("{call mfpproc.SP_UPDATE_ACCTOV_BL_BRANDSEG(?, ?)}");
				try {
					if (selBrandList != null) {
						for (String brand : selBrandList) {
							stmt.setLong(1, blinfoid);
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
			ex.printStackTrace();
		}
	}

	public void updateBLInitiativeTasks(AcctTasks task, long initiativeid) {
		
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BL_INIT_TASK(?, ?, ?, ?, ?, ?)}");
			query.setParameter(1, initiativeid);
			query.setParameter(2, task.getSeqid());
			query.setParameter(3, task.getBegindate());
			query.setParameter(4, task.getEnddate());
			query.setParameter(5, task.getTaskDesc());
			query.setParameter(6, task.getResponsible());
			query.executeUpdate();
	}

	public void deleteAcctOverviewBrandSeg(long blinfoid) {
		
		CallableStatement stmt;
		
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			
			try {
				
				stmt = con.prepareCall("{call mfpproc.SP_DELETE_ACCTOV_BL_BRANDSEG(?)}");
				try {
					stmt.setLong(1, blinfoid);
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
	
	public void updateAcctOverviewLocations(List<AcctLocations> locations, long accountrecid) {
		
		long accountinfoid = getAccountInfoID(accountrecid);
		
		Query query = em.createNativeQuery("{call mfpproc.SP_UPDATE_ACCTOV_BL_LOCATIONS(?, ?, ?, ?, ?, ?)}");
		for (AcctLocations location : locations) {
			query.setParameter(1, accountinfoid);
			query.setParameter(2, location.getSeqid());
			query.setParameter(3, location.getBl_name());
			query.setParameter(4, location.getBuyinglocid());
			query.setParameter(5, location.getBl_potentialrn());
			query.setParameter(6, location.getUsLocation());
			query.executeUpdate();
		}
		
	}

}