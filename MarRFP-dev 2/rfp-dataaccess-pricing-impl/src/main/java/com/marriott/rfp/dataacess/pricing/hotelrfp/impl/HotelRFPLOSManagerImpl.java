package com.marriott.rfp.dataacess.pricing.hotelrfp.impl;

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

import com.marriott.rfp.dataacess.pricing.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPLOSManager;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelManagerImpl
 */

@Service
public class HotelRFPLOSManagerImpl implements HotelRFPLOSManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<LengthOfStay> getHotelLOS(long hotelrfpid) {

		String queryString = "SELECT lengthofstayid , roomnightsFrom , roomnightsto  FROM mfpdbo.lengthofstay   where hotelrfpid = ?1 " + " order by lengthofstayid  ";
		Query q = em.createNativeQuery(queryString, LengthOfStay.class);
		q.setParameter(1, hotelrfpid);
		List<LengthOfStay> lengthOfStayList = q.getResultList();
		return lengthOfStayList;
	}

	public void updateHotelLOS(long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_UPDATELOS(?, null, ?, ?, ?); end; ");
				try {
					Long fromLOS, toLOS;
					for (int i = 0; i < lengthOfStayList.size(); i++) {
						if (lengthOfStayList.get(i).getRoomnightsfrom() == null)
							fromLOS = null;
						else
							fromLOS = new Long(lengthOfStayList.get(i).getRoomnightsfrom());
						if (lengthOfStayList.get(i).getRoomnightsto() == null)
							toLOS = null;
						else
							toLOS = new Long(lengthOfStayList.get(i).getRoomnightsto());

						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, lengthOfStayList.get(i).getLengthofstayid());
						stmt.setObject(3, fromLOS, Types.NUMERIC);
						stmt.setObject(4, toLOS, Types.NUMERIC);
						stmt.execute();
					}
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATELOSRATES(?); end; ");
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

	public void updateHotelLOS(long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				String losstartswith = "1_";
				if (hotelLOS.size() > 0) {
					for (String key : hotelLOS.keySet()) {
						int index = key.indexOf("_");
						losstartswith = key.substring(0, index + 1);
						break;
					}
				}
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_UPDATELOS(?, null, ?, ?, ?); end; ");
				int numLOS = 0;
				try {
					Long fromLOS, toLOS;
					for (String key : hotelLOS.keySet()) {
						if (key.startsWith(losstartswith)) {
							numLOS++;
							LengthOfStay los = hotelLOS.get(key);
							if (los.getRoomnightsfrom() == null || los.getRoomnightsfrom() == 0)
								fromLOS = null;
							else
								fromLOS = new Long(los.getRoomnightsfrom());
							if (los.getRoomnightsto() == null || los.getRoomnightsto() == 0)
								toLOS = null;
							else
								toLOS = new Long(los.getRoomnightsto());

							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, los.getLengthofstayid());
							stmt.setObject(3, fromLOS, Types.NUMERIC);
							stmt.setObject(4, toLOS, Types.NUMERIC);
							stmt.execute();
						}
					}

				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.sp_hotellosdel_hpp(?,?); end;");
				try {
					stmt.setLong(1, hotelrfpid);
					stmt.setLong(2, numLOS);
					stmt.execute();
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATELOSRATES(?); end; ");
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
	public List<LengthOfStay> getHotelGovLOS(long hotelrfpid) {

		String queryString = "SELECT lengthofstayid , roomnightsFrom , roomnightsto  FROM mfpdbo.lengthofstay_gov   where hotelrfpid = ?1 " + " order by lengthofstayid  ";
		Query q = em.createNativeQuery(queryString, LengthOfStay.class);
		q.setParameter(1, hotelrfpid);
		List<LengthOfStay> lengthOfStayList = q.getResultList();
		return lengthOfStayList;
	}

	public void updateHotelGovLOS(long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_UPDATELOS_GOV(?, null, ?, ?, ?); end; ");
				try {
					Long fromLOS, toLOS;
					for (int i = 0; i < lengthOfStayList.size(); i++) {
						if (lengthOfStayList.get(i).getRoomnightsfrom() == null)
							fromLOS = null;
						else
							fromLOS = new Long(lengthOfStayList.get(i).getRoomnightsfrom());
						if (lengthOfStayList.get(i).getRoomnightsto() == null)
							toLOS = null;
						else
							toLOS = new Long(lengthOfStayList.get(i).getRoomnightsto());

						stmt.setLong(1, hotelrfpid);
						stmt.setLong(2, lengthOfStayList.get(i).getLengthofstayid());
						stmt.setObject(3, fromLOS, Types.NUMERIC);
						stmt.setObject(4, toLOS, Types.NUMERIC);
						stmt.execute();
					}
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATELOSGOVRATES(?); end; ");
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

	public void updateHotelGovLOS(long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(user.getEid());
				audit.setAuditUser(con);
				String losstartswith = "1_";
				if (hotelLOS.size() > 0) {
					for (String key : hotelLOS.keySet()) {
						int index = key.indexOf("_");
						losstartswith = key.substring(0, index + 1);
						break;
					}
				}
				CallableStatement stmt = con.prepareCall("begin mfpproc.SP_UPDATELOS_GOV(?, null, ?, ?, ?); end; ");
				int numLOS = 0;
				try {
					Long fromLOS, toLOS;
					for (String key : hotelLOS.keySet()) {
						if (key.startsWith(losstartswith)) {
							numLOS++;
							LengthOfStay los = hotelLOS.get(key);
							if (los.getRoomnightsfrom() == null)
								fromLOS = null;
							else
								fromLOS = new Long(los.getRoomnightsfrom());
							if (los.getRoomnightsto() == null)
								toLOS = null;
							else
								toLOS = new Long(los.getRoomnightsto());

							stmt.setLong(1, hotelrfpid);
							stmt.setLong(2, los.getLengthofstayid());
							stmt.setObject(3, fromLOS, Types.NUMERIC);
							stmt.setObject(4, toLOS, Types.NUMERIC);
							stmt.execute();
						}
					}
				} finally {
					stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.sp_hotellosgovdel_hpp(?,?); end;");
				try {
				    stmt.setLong(1, hotelrfpid);
				    stmt.setLong(2, numLOS);
				    stmt.execute();
				} finally {
				    stmt.close();
				}
				stmt = con.prepareCall("begin mfpproc.SP_UPDATELOSGOVRATES(?); end; ");
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
}
