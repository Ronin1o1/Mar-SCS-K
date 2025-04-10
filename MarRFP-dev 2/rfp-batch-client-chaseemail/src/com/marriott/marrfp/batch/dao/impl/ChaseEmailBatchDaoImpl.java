package com.marriott.marrfp.batch.dao.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.marriott.marrfp.batch.core.ChaseEmailBatchRecord;
import com.marriott.marrfp.batch.dao.ChaseEmailBatchDao;
import com.marriott.marrfp.batch.domain.ChaseEmailLoad;


public class ChaseEmailBatchDaoImpl extends JdbcDaoSupport implements ChaseEmailBatchDao {

	public ChaseEmailLoad findById(BigDecimal batchId) {
		ChaseEmailLoad chaseEmailLoad = null;
		String sql = "SELECT batchid,   status,   loadtype,  loadstart,    loadend,  loadcreateuser FROM mfpdbo.chase_email_load WHERE batchid = ?";
		try {
			chaseEmailLoad = (ChaseEmailLoad) getJdbcTemplate().queryForObject(sql, new Object[] { batchId }, new BeanPropertyRowMapper<ChaseEmailLoad>(ChaseEmailLoad.class));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chaseEmailLoad;
	}

	public Long getBatchId() {
		Long batchId = null;
		String sql = "SELECT mfpdbo.chaseemail_batchid_seq.nextval FROM dual";
		try {
			batchId = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return batchId;
	}

	public void createChaseEmailLoad(ChaseEmailLoad chaseEmailLoad) {

		String sql = "INSERT INTO mfpdbo.chase_email_load(batchid, status, loadtype, loadstart, loadend, loadcreateuser, loadenduser) VALUES (?, ?, ?, ?, ?, ?, ?)";
		try {
			getJdbcTemplate().update(
				sql,
				new Object[] { chaseEmailLoad.getBatchId(), chaseEmailLoad.getStatus(), chaseEmailLoad.getLoadType(), chaseEmailLoad.getLoadStart(), chaseEmailLoad.getLoadEnd(), chaseEmailLoad.getLoadCreateUser(),
						chaseEmailLoad.getLoadEndUser() });
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void updateChaseEmailLoad(ChaseEmailLoad chaseEmailLoad) {

		String sql = "UPDATE mfpdbo.chase_email_load SET status = ?, loadend = ? WHERE batchid = ?";
	try {
		getJdbcTemplate().update(sql, new Object[] { chaseEmailLoad.getStatus(), chaseEmailLoad.getLoadEnd(), chaseEmailLoad.getBatchId() });
	} catch (Exception e) {
		e.printStackTrace();
	}
	}

	public void beginChaseEmailBatch(Long batchid, String eid) {
		CallableStatement stmt = null;
		Connection con = (Connection) getConnection();
		try {

			stmt = con.prepareCall("begin mfpproc.sp_chaseemail_stagebatch(?, ?); end; ");
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

	public Long getCountBatchItems(Long batchid) {
		Long count = null;
		String sql = "SELECT count(*) FROM mfpdbo.chaseemail_batch_stage where processed = 'N' and batchid=" + batchid;

		try {
			count = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return count;
	}
	
	public List<ChaseEmailBatchRecord> getBatchRecords(Long batchid, Long count) {
		List<ChaseEmailBatchRecord> chaseEmailBatchRecord = null;
		String sql = "select stageseq, batchid, accountid, accountrecid, hotelid, eid, processed, period from ("
				+ "SELECT a.stageseq, a.batchid, a.accountid, a.accountrecid, a.hotelid, a.eid, a.processed, a.period  FROM mfpdbo.CHASEEMAIL_BATCH_STAGE a  where batchid=? "
				+ " and processed='N' order by hotelid, accountrecid  )  where rownum<=?";
		try {
			chaseEmailBatchRecord = getJdbcTemplate().query(sql, new Object[] { batchid, count }, new BeanPropertyRowMapper<ChaseEmailBatchRecord>(ChaseEmailBatchRecord.class));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chaseEmailBatchRecord;
	}
	
	public void updateBatchRecord(Long stageseq) {
		String sql = "update  mfpdbo.CHASEEMAIL_BATCH_STAGE  set processed='Y' where stageseq=?";
		try {
			getJdbcTemplate().update(sql, new Object[] { stageseq });
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
