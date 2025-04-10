package com.marriott.marrfp.batch.dao.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.marriott.marrfp.batch.dao.UserCleanupBatchDao;
import com.marriott.marrfp.batch.domain.UserCleanupLoad;


public class UserCleanupBatchDaoImpl extends JdbcDaoSupport implements UserCleanupBatchDao {

	/*public UserCleanupLoad findById(BigDecimal batchId) {
		UserCleanupLoad userCleanupLoad = null;
		String sql = "SELECT batchid,   status,   loadtype,  loadstart,    loadend,  loadcreateuser FROM mfpdbo.usercleanup_load WHERE batchid = ?";
		try {
			userCleanupLoad = (UserCleanupLoad) getJdbcTemplate().queryForObject(sql, new Object[] { batchId }, new BeanPropertyRowMapper<UserCleanupLoad>(UserCleanupLoad.class));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userCleanupLoad;
	}*/

	public Long getBatchId() {
		Long batchId = null;
		String sql = "SELECT mfpdbo.usercleanup_batchid_seq.nextval FROM dual";
		try {
			batchId = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return batchId;
	}

	public void createUserCleanupLoad(UserCleanupLoad userCleanupLoad) {

		String sql = "INSERT INTO mfpdbo.usercleanup_load(batchid, status, loadtype, loadstart, loadend, loadcreateuser, loadenduser) VALUES (?, ?, ?, ?, ?, ?, ?)";
		try {
			getJdbcTemplate().update(
				sql,
				new Object[] { userCleanupLoad.getBatchId(), userCleanupLoad.getStatus(), userCleanupLoad.getLoadType(), userCleanupLoad.getLoadStart(), userCleanupLoad.getLoadEnd(), userCleanupLoad.getLoadCreateUser(),
						userCleanupLoad.getLoadEndUser() });
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void updateUserCleanupLoad(UserCleanupLoad userCleanupLoad) {

		String sql = "UPDATE mfpdbo.usercleanup_load SET status = ?, loadend = ? WHERE batchid = ?";
	try {
		getJdbcTemplate().update(sql, new Object[] { userCleanupLoad.getStatus(), userCleanupLoad.getLoadEnd(), userCleanupLoad.getBatchId() });
	} catch (Exception e) {
		e.printStackTrace();
	}
	}

	public void beginUserCleanupBatch(Long batchid, String eid) {
		CallableStatement stmt = null;
		Connection con = (Connection) getConnection();
		try {

			stmt = con.prepareCall("begin mfpproc.sp_usercleanup_stagebatch(?, ?); end; ");
			stmt.setLong(1, batchid);
			stmt.setString(2, eid);

			stmt.executeUpdate();

		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {

			try {
				if (stmt != null) {
					stmt.close();
				}
				if (con != null) {
					con.close();
				}
			} catch (SQLException ex) {
				ex.printStackTrace();
			}
		}

	}

	/*public Long getCountBatchItems(Long batchid) {
		Long count = null;
		String sql = "SELECT count(*) FROM mfpdbo.chaseemail_batch_stage where processed = 'N' and batchid=" + batchid;

		try {
			count = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return count;
	}*/
	
	/*public List<UserCleanupBatchRecord> getBatchRecords(Long batchid, Long count) {
		List<UserCleanupBatchRecord> userCleanupBatchRecord = null;
		String sql = "select stageseq, batchid, accountid, accountrecid, hotelid, eid, processed, period from ("
				+ "SELECT a.stageseq, a.batchid, a.accountid, a.accountrecid, a.hotelid, a.eid, a.processed, a.period  FROM mfpdbo.CHASEEMAIL_BATCH_STAGE a  where batchid=? "
				+ " and processed='N' order by hotelid, accountrecid  )  where rownum<=?";
		try {
			userCleanupBatchRecord = getJdbcTemplate().query(sql, new Object[] { batchid, count }, new BeanPropertyRowMapper<UserCleanupBatchRecord>(UserCleanupBatchRecord.class));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userCleanupBatchRecord;
	}*/
	
	/*public void updateBatchRecord(Long stageseq) {
		String sql = "update  mfpdbo.CHASEEMAIL_BATCH_STAGE  set processed='Y' where stageseq=?";
		try {
			getJdbcTemplate().update(sql, new Object[] { stageseq });
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}*/
	
}
