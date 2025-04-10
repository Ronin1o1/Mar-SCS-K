package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPSeasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelRFPSeasonManagerImpl implements HotelRFPSeasonManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Season> getHotelSeason(long hotelrfpid) {

		String queryString = "SELECT seasonid , startdate , enddate FROM mfpdbo.season   where hotelrfpid =?1 order by seasonid  ";
		Query q = em.createNativeQuery(queryString, Season.class);
		q.setParameter(1, hotelrfpid);
		List<Season> seasonList = q.getResultList();
		return seasonList;
	}

	@SuppressWarnings("unchecked")
	public void updateHotelSeasons(long hotelrfpid, List<Season> seasonList, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON(?, null, ?, ?, ?); end;");
				Long seasonid = 0L;
				try {
					for (int i = 0; i < seasonList.size(); i++) {
						if (seasonList.get(i) != null) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, seasonList.get(i).getSeasonid());
							stmt.setString(3, DateUtility.formatShortDate(seasonList.get(i).getStartdate()));
							stmt.setString(4, DateUtility.formatShortDate(seasonList.get(i).getEnddate()));
							stmt.execute();
							if (seasonid < seasonList.get(i).getSeasonid())
								seasonid = seasonList.get(i).getSeasonid();
						}
					}

				} finally {
					stmt.close();
				}
				if (user.getIsPASAdmin()) {
					String queryString2 = "SELECT seasonid  FROM mfpdbo.season   where hotelrfpid = ?1 and seasonid > ?2";
					Query q = em.createNativeQuery(queryString2, Season.class);
					q.setParameter(1, hotelrfpid);
					q.setParameter(2, seasonid);
					List<Season> seasonList2 = q.getResultList();
					stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON(?, null, ?, '', ''); end;");
					try {
						for (int i = 0; i < seasonList2.size(); i++) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, seasonList2.get(i).getSeasonid());
							stmt.execute();
						}

					} finally {
						stmt.close();
					}
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASONRATES(?); end; ");
				try {
						stmt.setLong(1, hotelrfpid);
						stmt.execute();
				} finally {
					stmt.close();
					}
				/* update the seasons for scpt*/
				stmt = con.prepareCall("begin mfpproc.pkg_scpt_rpe.sp_updateseasons(?); end; ");
				try {
							stmt.setLong(1, hotelrfpid);
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

	@SuppressWarnings("unchecked")
	public void updateHotelSeasons(long hotelrfpid, Map<String, Season> hotelSeason, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON(?, null, ?, ?, ?); end;");
				Long seasonid = 0L;
				try {
					for (Season season : hotelSeason.values()) {
						if (season != null) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, season.getSeasonid());
							stmt.setString(3, DateUtility.formatShortDate(season.getStartdate()));
							stmt.setString(4, DateUtility.formatShortDate(season.getEnddate()));
							stmt.execute();
							if (seasonid < season.getSeasonid())
								seasonid = season.getSeasonid();
						}
					}

				} finally {
					stmt.close();
				}
					String queryString2 = "SELECT seasonid  FROM mfpdbo.season   where hotelrfpid = ?1 and seasonid > ?2";
					Query q = em.createNativeQuery(queryString2, Season.class);
					q.setParameter(1, hotelrfpid);
					q.setParameter(2, seasonid);
					List<Season> seasonList2 = q.getResultList();
					stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON(?, null, ?, '', ''); end;");
					try {
						for (int i = 0; i < seasonList2.size(); i++) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, seasonList2.get(i).getSeasonid());
							stmt.execute();
						}

					} finally {
						stmt.close();
					}

				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASONRATES(?); end; ");
				try {
						stmt.setLong(1, hotelrfpid);
						stmt.execute();
				} finally {
					stmt.close();
					}
				/* update the seasons for scpt*/
				stmt = con.prepareCall("begin mfpproc.pkg_scpt_rpe.sp_updateseasons(?); end; ");
				try {
						stmt.setLong(1, hotelrfpid);
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

	@SuppressWarnings("unchecked")
	public List<Season> getHotelGovSeason(long hotelrfpid) {

		String queryString = "SELECT seasonid , startdate , enddate FROM mfpdbo.season_gov  where hotelrfpid =?1 order by seasonid  ";
		Query q = em.createNativeQuery(queryString, Season.class);
		q.setParameter(1, hotelrfpid);
		List<Season> seasonList = q.getResultList();
		return seasonList;
	}

	@SuppressWarnings("unchecked")
	public void updateHotelGovSeasons(long hotelrfpid, List<Season> seasonList, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON_GOV(?, null, ?, ?, ?); end;");
				Long seasonid = 0L;
				try {
					for (int i = 0; i < seasonList.size(); i++) {
						if (seasonList.get(i) != null) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, seasonList.get(i).getSeasonid());
							stmt.setString(3, DateUtility.formatShortDate(seasonList.get(i).getStartdate()));
							stmt.setString(4, DateUtility.formatShortDate(seasonList.get(i).getEnddate()));
							stmt.execute();
							if (seasonid < seasonList.get(i).getSeasonid())
								seasonid = seasonList.get(i).getSeasonid();
						}
					}

				} finally {
					stmt.close();
				}
				if (user.getIsPASAdmin()) {
					String queryString2 = "SELECT seasonid  FROM mfpdbo.season_gov where hotelrfpid = ?1 and seasonid > ?2";
					Query q = em.createNativeQuery(queryString2, Season.class);
					q.setParameter(1, hotelrfpid);
					q.setParameter(2, seasonList.size());
					List<Season> seasonList2 = q.getResultList();
					stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON_GOV(?, null, ?, '', ''); end;");
					try {
						for (int i = 0; i < seasonList2.size(); i++) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, seasonid);
							stmt.execute();
						}

					} finally {
						stmt.close();
					}
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASONGOVRATES(?); end; ");
				try {
					for (int i = 0; i < seasonList.size(); i++) {
						stmt.setLong(1, hotelrfpid);
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

	
	public void updateHotelGovSeasons(long hotelrfpid,Map<String, Season> hotelSeason, User user) {
		CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON_GOV(?, null, ?, ?, ?); end;");
				Long seasonid = 0L;
				try {
					for (Season season : hotelSeason.values()) {
						if (season != null) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, season.getSeasonid());
							stmt.setString(3, DateUtility.formatShortDate(season.getStartdate()));
							stmt.setString(4, DateUtility.formatShortDate(season.getEnddate()));
							stmt.execute();
							if (seasonid < season.getSeasonid())
								seasonid = season.getSeasonid();
						}
					}

				} finally {
					stmt.close();
				}
					String queryString2 = "SELECT seasonid  FROM mfpdbo.season_gov where hotelrfpid = ?1 and seasonid > ?2";
					Query q = em.createNativeQuery(queryString2, Season.class);
					q.setParameter(1, hotelrfpid);
					q.setParameter(2, hotelSeason.size());
					@SuppressWarnings("unchecked")
					List<Season> seasonList2 = q.getResultList();
					stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASON_GOV(?, null, ?, '', ''); end;");
					try {
						for (Season season : seasonList2) {
							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, season.getSeasonid());
							stmt.execute();
						}

					} finally {
						stmt.close();
					}

				stmt = con.prepareCall("begin mfpproc.SP_UPDATESEASONGOVRATES(?); end; ");
				try {
					for (int i = 0; i < hotelSeason.size(); i++) {
						stmt.setLong(1, hotelrfpid);
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
