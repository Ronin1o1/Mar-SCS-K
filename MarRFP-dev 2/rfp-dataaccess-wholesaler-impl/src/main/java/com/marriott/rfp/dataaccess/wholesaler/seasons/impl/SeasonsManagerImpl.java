package com.marriott.rfp.dataaccess.wholesaler.seasons.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.seasons.api.SeasonsManager;
import com.marriott.rfp.object.wholesaler.seasons.Seasons;
import com.marriott.rfp.utility.DateUtility;

/**
 * Session Bean implementation class SeasonsManager
 */

@Service
public class SeasonsManagerImpl implements SeasonsManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public SeasonsManagerImpl() { }

	@SuppressWarnings("unchecked")
	public List<Seasons> getSeasonDetails(long participationid) {

		String queryString = "select a.season_id, a.start_date, a.end_date from mfpdbo.ws_seasons a, mfpdbo.ws_daysofweek b where a.participation_id = ?1 and a.season_id=b.season_id(+) order by a.start_date asc";

		Query q = em.createNativeQuery(queryString, Seasons.class);
		q.setParameter(1, participationid);
		List<Seasons> seasonsList = q.getResultList();
		for (int i = 0; i < seasonsList.size(); i++) {
			Seasons seasons = seasonsList.get(i);
			seasons.setHasRates(hasRates(seasons.getSeason_id(), participationid));
		}

		return seasonsList;
	}

	public boolean hasRates(long seasonid, long participationid) {
		boolean b = false;
		String queryString = "select count(*) from mfpdbo.ws_rates where daysofweek_id in "
				+ "(select daysofweek_id from mfpdbo.ws_daysofweek where season_id in "
				+ "(select season_id from mfpdbo.ws_seasons where season_id= ?1 and participation_id = ?2))";

		Query q = em.createNativeQuery(queryString, Integer.class);
		q.setParameter(1, seasonid);
		q.setParameter(2, participationid);
		Integer IntCl = (Integer) q.getSingleResult();
		int cnt = IntCl.intValue();
		if (cnt > 0) {
			b = true;
		}

		return b;
	}

	public void updateSeasons(List<Seasons> seasonList, long wsid, String formChanged, long period, String role, boolean isPeriodExpired, String loginName) {
		
		CallableStatement stmt;
		try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				
				try {
					AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(loginName);
					audit.setAuditUser(con);
					boolean pDelete = false;
					boolean pInsert = false;
					long newseasonid = 0;
					List<Seasons> newseasons = new ArrayList<Seasons>();
					stmt = con.prepareCall("{call mfpproc.SP_WS_UPDATESEASONS(?, ?, ?, ?, ? ,?, ?, ?, ?)}");
					
					try {
						for (int i = 0; i < seasonList.size(); i++) {
							if (seasonList.get(i) != null) {
								if (seasonList.get(i).getSeason_id() == null) {
									stmt.setLong(1, new Long(0).longValue());
								} else {
									stmt.setLong(1, seasonList.get(i).getSeason_id().longValue());
								}
								stmt.setLong(2, wsid);
								java.util.Date start = seasonList.get(i).getStart_date();
								java.util.Date end = seasonList.get(i).getEnd_date();
								String sdate = "";
								String edate = "";
								if (start != null)
									sdate = DateUtility.formatShortDate(start);
								if (end != null)
									edate = DateUtility.formatShortDate(end);

								stmt.setString(3, sdate);
								stmt.setString(4, edate);
								stmt.setString(5, role);
								stmt.setString(6, new Boolean(isPeriodExpired).toString());
								stmt.setString(7, new Boolean(pDelete).toString());
								stmt.setString(8, new Boolean(pInsert).toString());
								stmt.setLong(9, 0);
								stmt.registerOutParameter(7, Types.VARCHAR);
								stmt.registerOutParameter(8, Types.VARCHAR);
								stmt.registerOutParameter(9, Types.NUMERIC);
								stmt.executeUpdate();
							
								pDelete = new Boolean(stmt.getString(7)).booleanValue();
								pInsert = new Boolean(stmt.getString(8)).booleanValue();
								newseasonid = stmt.getLong(9);

								if (newseasonid != 0) {
									Seasons s = new Seasons();
									s.setSeason_id(newseasonid);
									newseasons.add(s);
								}
							}
					}
				} finally {
					stmt.close();
				}

				String allseasons = "-1";
				for (int i = 0; i < seasonList.size(); i++) {
					if (seasonList.get(i) != null) {
						long value = 0;
						if (seasonList.get(i).getSeason_id() != null) {
							value = seasonList.get(i).getSeason_id().longValue();
						}
						allseasons += ", " + value;
					}
				}
				for (int i = 0; i < newseasons.size(); i++) {
					Seasons seasons = newseasons.get(i);
					if (seasons != null) {
						long value1 = 0;
						if (seasons.getSeason_id() != null) {
							value1 = seasons.getSeason_id().longValue();
						}
						allseasons += ", " + value1;
					}
				}

				if ((!isPeriodExpired && !role.equals("R") && !role.equals("S")) || (role.equals("A") || role.equals("W"))) {

					String queryString = "";
					try {
						queryString = "select season_id from mfpdbo.ws_seasons where participation_id="  + wsid + " and season_id not in (" + allseasons + ")";
						java.sql.Statement st = con.createStatement();
						java.sql.ResultSet rs = st.executeQuery(queryString);
						long did = 0;
						
						try {
							
							while (rs.next()) {
								long sid = rs.getLong(1);
								queryString = "select daysofweek_id from mfpdbo.ws_daysofweek where season_id=" + sid;
								st = con.createStatement();
								try {
									java.sql.ResultSet rs1 = st.executeQuery(queryString);
									try {
										if (rs1.next()) {
											did = rs1.getLong(1);
										}
									} finally {
										rs1.close();
									}
								} finally {
									st.close();
								}

								if (did != 0) {
									pDelete = true;
									queryString = "delete from mfpdbo.ws_rates where daysofweek_id=" + did;
									st = con.createStatement();
									try {
										st.executeUpdate(queryString);
									} finally {
										st.close();
									}
									queryString = "delete from mfpdbo.ws_daysofweek where daysofweek_id=" + did;
									st = con.createStatement();
									try {
										st.executeUpdate(queryString);
									} finally {
										st.close();
									}
								}
								pDelete = true;
								queryString = "delete from mfpdbo.ws_seasons where season_id=" + sid;
								st = con.createStatement();
								try {
									st.executeUpdate(queryString);
								} finally {
									st.close();
								}
							}
						} finally {
							rs.close();
						}
					} catch (SQLException ex) {
						ex.printStackTrace();

					}

				}

				stmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATESEASON_ENTRYSTATUS(?," + pDelete + "," + pInsert + ",?," + isPeriodExpired + ",?); end; ");
				try {
					stmt.setLong(1, wsid);
					stmt.setString(2, role);
					stmt.setString(3, formChanged);
					stmt.executeUpdate();
				} finally {
					stmt.close();
				}

				stmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATESEASON_NUM(?); end; ");
				try {
					stmt.setLong(1, wsid);
					stmt.executeUpdate();
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