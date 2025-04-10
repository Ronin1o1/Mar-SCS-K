package com.marriott.rfp.dataaccess.wholesaler.roomselection.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.wholesaler.audittrail.impl.AuditUtilityManagerImpl;
import com.marriott.rfp.dataaccess.wholesaler.roomselection.api.RoomSelectionManager;
import com.marriott.rfp.object.wholesaler.roomselection.RoomSelection;

/**
 * Session Bean implementation class RoomSelectionManagerImpl
 */

@Service
public class RoomSelectionManagerImpl implements RoomSelectionManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public RoomSelectionManagerImpl() {
	}

	@SuppressWarnings("unchecked")
	public List<RoomSelection> findAllRoomPools() {
		String queryString = "SELECT roompool_ref_id, roompool_seq_id, roompool FROM MFPDBO.WS_ROOMPOOL_REF ORDER BY roompool asc";
		Query q = em.createNativeQuery(queryString, RoomSelection.class);
		List<RoomSelection> roolSelectionList = q.getResultList();
		return roolSelectionList;
	}

	@SuppressWarnings("unchecked")
	public List<RoomSelection> findRoomPoolsByParticipationId(long participationid) {

		String queryString = "SELECT A.ROOMPOOL_ID, A.ROOMPOOL_REF_ID, A.PARTICIPATION_ID, B.ROOMPOOL, B.ROOMPOOL_SEQ_ID"
				+ " FROM MFPDBO.WS_ROOMPOOL A, MFPDBO.WS_ROOMPOOL_REF B"
				+ " WHERE participation_id = ?1"
				+ " AND A.roompool_ref_id = B.roompool_ref_id"
				+ " order by roompool_seq_id";

		Query q = em.createNativeQuery(queryString, RoomSelection.class);
		q.setParameter(1, participationid);
		List<RoomSelection> roomSelectionList = q.getResultList();
		long lroomrefid = 0;
		for (int i = 0; i < roomSelectionList.size(); i++) {
			RoomSelection roomselection = roomSelectionList.get(i);
			lroomrefid = roomselection.getRoompool_ref_id();
			roomselection.setHasRates(hasRates(participationid, lroomrefid));
		}

		return roomSelectionList;
	}

	public boolean hasRates(long participationid, long refid) {
		boolean b = false;
		String queryString = "select count(*) from mfpdbo.ws_rates "
				+ "where roompool_id=(select roompool_id from mfpdbo.ws_roompool "
				+ "where participation_id = ?1 and roompool_ref_id= ?2)";

		Query q = em.createNativeQuery(queryString, Integer.class);
		q.setParameter(1, participationid);
		q.setParameter(2, refid);
		Integer IntCl = (Integer) q.getSingleResult();
		int cnt = IntCl.intValue();
		if (cnt > 0) {
			b = true;
		}

		return b;
	}

	public void updateRoomSelection(long wsid, String[] cb, String[] cbChanged,
			Integer[] cbValue, String changed, String role,
			boolean isPeriodExpired, String loginName) {

		boolean bUpdate = false;
		List<RoomSelection> oldRooms;
		boolean roomPoolFlag = false;
		int roomPoolRefId = 0;

		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();

			try {

				AuditUtilityManagerImpl audit = new AuditUtilityManagerImpl(
						loginName);
				audit.setAuditUser(con);
				CallableStatement cstmt = null;
				java.sql.ResultSet rs = null;
				java.sql.Statement stmt = con.createStatement(
						ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);

				if ((!isPeriodExpired && !role.equals("R") && !role.equals("S"))
						|| role.equals("A") || role.equals("W")) {
					bUpdate = true;
				}

				try {

					if (bUpdate) {
						oldRooms = findRoomPoolsByParticipationId(wsid);

						for (int i = 0; i < cb.length; i++) {
							if (cbChanged[i].equals("Y")) {
								if (cb[i] != null && cb[i].equals("on"))
									roomPoolFlag = true;
								else
									roomPoolFlag = false;
								roomPoolRefId = cbValue[i].intValue();
								cstmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATEROOMPOOL(?,?,"
												+ roomPoolFlag + "); end; ");

								try {
									cstmt.setLong(1, wsid);
									cstmt.setLong(2, roomPoolRefId);
									cstmt.execute();
								} finally {
									cstmt.close();
								}
							}
						}

						List<RoomSelection> roomList = findRoomPoolsByParticipationId(wsid);
						String queryString = "SELECT A.ENTRY_STATUS_ID, A.STATUS_ID FROM MFPDBO.WS_ENTRY_STATUS A WHERE (A.PARTICIPATION_ID = "
								+ wsid + ") " + "AND A.SCREEN_ID = 8 ORDER BY A.ENTRY_STATUS_ID";

						try {

							rs = stmt.executeQuery(queryString);
							int k = 0;
							while (rs.next()) {
								if (k < oldRooms.size() && oldRooms.size() > 0) {
									RoomSelection roomselection = (RoomSelection) oldRooms
											.get(k);
									roomselection.setStatusid(rs.getString(2));
									k++;
								}
							}

							rs.beforeFirst();
							int entryStatusUpdateCount = 0;
							String status = "";
							int count = 0;

							while (rs.next()) {
								status = "";
								if (count < roomList.size()) {
									if (oldRooms.size() > 0) {
										for (int i = 0; i < oldRooms.size(); i++) {
											RoomSelection roomselection = (RoomSelection) oldRooms
													.get(i);
											long oldid = roomselection
													.getRoompool_id();
											RoomSelection roomselectionNew = (RoomSelection) roomList
													.get(count);
											long newid = roomselectionNew
													.getRoompool_id();
											if (oldid == newid)
												status = roomselection
														.getStatusid();
										}
									}

									if (status.equals(""))
										status = "N";
									count++;
								} else {
									if (roomList.size() == 0
											&& entryStatusUpdateCount == 0) {
										status = "N";
										entryStatusUpdateCount++;
									} else {
										status = "U";
									}
								}

								cstmt = con.prepareCall("begin  mfpproc.SP_WS_UPDATESCREENSTATUS(?,?,?,?, 'Y', " + isPeriodExpired + "); end; ");

								try {
									cstmt.setLong(1, wsid);
									cstmt.setLong(2, rs.getLong(1));
									cstmt.setString(3, status);
									cstmt.setString(4, role);
									cstmt.execute();
								} finally {
									cstmt.close();
								}
							}
						} finally {
							rs.close();
						}
					}
				} finally {
					if (cstmt != null) {
						cstmt.close();
					}
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