package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountRulesManager;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificPGOOSData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelAccountRulesManagerImpl implements HotelAccountRulesManager {
	private static final Logger log = LoggerFactory.getLogger(HotelAccountRulesManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<HotelRules> findAccountRulesDetail(long hotel_accountinfoid, long hotelrfpid, long ratetypeid, boolean isInternational, User user) {

		String queryString = " select rulename, rulevalue, hardcoded, ruleid from (SELECT   A.RULENAME ," + " decode(a.ruleid,4,mfpproc.FN_GETEDIETAXINC(?1), "
				+ "  decode(a.ruleid,2,decode(d.accountpricingtype,'L', decode(c.rulevalue, '','N',c.rulevalue), "
				+ "   nvl(decode(c.rulevalue, '', B.DEFAULTVALUE, c.rulevalue), '')),nvl(decode(c.rulevalue, '', B.DEFAULTVALUE, c.rulevalue), ''))) rulevalue, "
				+ " B.HARDCODED , rtrim(A.RULEID) ruleid, a.sequence " + "FROM mfpdbo.RATERULES_REF A " + ", mfpdbo.RATETYPE_RULES_REF B " + ", (SELECT ACCOUNTRULESID id , RULETYPEID , RULEVALUE "
				+ "FROM mfpdbo.ACCOUNTRULES B " + "WHERE (B.HOTEL_ACCOUNTINFOID=?2) " + " and (productid is null or productid = 1)) c, " + " (Select y.hotel_accountinfoid, z.accountpricingtype "
				+ " from mfpdbo.hotel_accountinfo y, mfpdbo.account z " + "	where y.accountrecid = z.accountrecid " + "	and hotel_accountinfoid =?3 ) d " + " WHERE (B.RULETYPEID = A.RULEID) "
		+ " AND (B.RULETYPEID = C.RULETYPEID (+)) " + "AND (B.RATETYPEID =?4) "
		+ " AND ruleid in(1,3)";
				
		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser())
			queryString += " AND (A.DISPLAYTYPEID ='A' or A.DISPLAYTYPEID =?5) ";
		queryString += ")  ORDER BY  SEQUENCE ASC";

		Query q = em.createNativeQuery(queryString, HotelRules.class);
		q.setParameter(1, hotelrfpid);
		q.setParameter(2, hotel_accountinfoid);
		q.setParameter(3, hotel_accountinfoid);
		q.setParameter(4, ratetypeid);
		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			String dom_int = "D";
			if (isInternational)
				dom_int = "I";
			q.setParameter(5, dom_int);
		}
		List<HotelRules> ruleslist = q.getResultList();
		return ruleslist;
	}

	public void updateRules(long hotel_accountinfoid, Long ratetypeid, List<HotelRules> ruleslist, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrules_hpp(?,?,?,?,?); end;");
				stmt.setInt(5, 0);
				try {

					for (int i = 0; i < ruleslist.size(); i++) {
						stmt.setLong(1, hotel_accountinfoid);
						stmt.setObject(2, ratetypeid, Types.NUMERIC);
						if(ruleslist.get(i) == null && (ruleslist.get(i).getRuleid() == null || ruleslist.get(i).getRulevalue() == null))
							continue;
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
			log.error(ex.getMessage(),ex);
		}

	}

	
	public void updateAccountRoomPoolRules(long hotel_accountinfoid,
			List<HotelAccountSpecificRoomPoolData> roompoolflaglist, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con
						.prepareCall("begin mfpproc.SP_UPDATEACCOUNTRPFLAGS (?,?,?,?,?,?,?,?,?); end; ");
				try {
					if (roompoolflaglist != null && roompoolflaglist.size() > 0) {
						for (HotelAccountSpecificRoomPoolData hotelAccountSpecificRoomPoolData : roompoolflaglist) {

							if (hotelAccountSpecificRoomPoolData != null
									&& hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData() != null
									&& hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData().size() > 0) {
								for (HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData : hotelAccountSpecificRoomPoolData
										.getHotelAccountSpecificPGOOSData()) {
									if (hotelAccountSpecificPGOOSData != null) {
										stmt.setLong(1, hotel_accountinfoid);
										stmt.setString(2, hotelAccountSpecificRoomPoolData.getLra());
										stmt.setString(3, hotelAccountSpecificRoomPoolData.getAccepted());
										if (hotelAccountSpecificRoomPoolData.getRejectreasonid() != null && "N".equalsIgnoreCase(hotelAccountSpecificRoomPoolData.getAccepted()) ) {
											stmt.setLong(4, hotelAccountSpecificRoomPoolData.getRejectreasonid());
										} else {
											
											stmt.setLong(4, -1);
										} // pgooschanges
										if (hotelAccountSpecificPGOOSData.getPgoos() != null
												&& (hotelAccountSpecificPGOOSData.getPgoos().equals("on")
														|| hotelAccountSpecificPGOOSData.getPgoos().equals("Y"))) {
											stmt.setString(5, "Y");
										} else {
											stmt.setString(5, "N");
										}
										if (hotelAccountSpecificPGOOSData.getRoomPoolSequence() != null) {
											stmt.setLong(6, hotelAccountSpecificPGOOSData.getRoomPoolSequence());
										} else { 
											stmt.setLong(6, -1);
									    }
										if (hotelAccountSpecificPGOOSData.getRemovalreasonid() != null) {
											stmt.setLong(7, hotelAccountSpecificPGOOSData.getRemovalreasonid());
										} else {
											stmt.setLong(7, -1);
										}

										if (hotelAccountSpecificPGOOSData.getRoomClassSequence() != null) {
											stmt.setLong(8, hotelAccountSpecificPGOOSData.getRoomClassSequence());
										} else {
											stmt.setLong(8, -1);
										}

										stmt.setString(9, user.getShortRole());

										boolean status = stmt.execute();
									}

								}
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
			log.error(ex.getMessage(),ex);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}

	public void updateRule(long hotel_accountinfoid, Long ratetypeid, String ruleid, String rulevalue, User user,boolean updated) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrules_hpp(?,?,?,?,?); end;");
				try {

					stmt.setLong(1, hotel_accountinfoid);
					stmt.setObject(2, ratetypeid, Types.NUMERIC);
					stmt.setString(3, ruleid);
					stmt.setString(4, rulevalue);
					if (updated)
						stmt.setInt(5, 1);
					else stmt.setInt(5, 0);
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public void updateRuleDiff(long hotel_accountinfoid, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.sp_accountrulesdiffcheck_hpp(?); end;");
				try {

					stmt.setLong(1, hotel_accountinfoid);
					stmt.execute();
				} finally {
					stmt.close();
				}
				audit.deleteAuditUser(con);
			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}
}
