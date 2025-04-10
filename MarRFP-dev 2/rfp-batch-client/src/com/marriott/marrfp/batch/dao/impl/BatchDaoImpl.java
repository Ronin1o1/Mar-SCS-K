package com.marriott.marrfp.batch.dao.impl;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PGOOSAccountProduct;
import com.marriott.marrfp.batch.domain.PGOOSHotelAccountProduct;
import com.marriott.marrfp.batch.domain.PgoosLoad;

public class BatchDaoImpl extends JdbcDaoSupport implements BatchDao {

	public PgoosLoad findById(BigDecimal batchId) {

		String sql = "SELECT batchid,   status,   loadtype,  loadstart,    loadend,  loadcreateuser FROM mfpdbo.pgoos_load WHERE batchid = ?";

		PgoosLoad pgoosLoad = (PgoosLoad) getJdbcTemplate().queryForObject(sql, new Object[] { batchId }, new BeanPropertyRowMapper<PgoosLoad>(PgoosLoad.class));
		return pgoosLoad;
	}

	public Long getBatchId() {

		String sql = "SELECT mfpdbo.pgoos_batchid_seq.nextval FROM dual";

		Long batchId = (Long) getJdbcTemplate().queryForObject(sql, Long.class);

		return batchId;
	}

	public void createPgoosLoad(PgoosLoad pgoosLoad) {

		String sql = "INSERT INTO mfpdbo.pgoos_load(batchid, status, loadtype, loadstart, loadend, loadcreateuser, loadenduser) VALUES (?, ?, ?, ?, ?, ?, ?)";

		getJdbcTemplate().update(
				sql,
				new Object[] { pgoosLoad.getBatchId(), pgoosLoad.getStatus(), pgoosLoad.getLoadType(), pgoosLoad.getLoadStart(), pgoosLoad.getLoadEnd(), pgoosLoad.getLoadCreateUser(),
						pgoosLoad.getLoadEndUser() });

	}

	public void updatePgoosLoad(PgoosLoad pgoosLoad) {

		String sql = "UPDATE mfpdbo.pgoos_load SET status = ?, loadend = ? WHERE batchid = ?";

		getJdbcTemplate().update(sql, new Object[] { pgoosLoad.getStatus(), pgoosLoad.getLoadEnd(), pgoosLoad.getBatchId() });
	}

	public void updateCompareAmenityBatch() {
		Connection con = (Connection) getConnection();
		try {

			CallableStatement stmt = con.prepareCall("{call mfpproc.pkg_pgoos_hpp.sp_compare_batchamenities()}");

			try {
				stmt.execute();
			} finally {
				stmt.close();
			}
		} catch (SQLException e) {

			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
	}

	public List<PGOOSAccountProduct> getBatchVerifyAccountProduct() {
		String sql = null;
		sql = " select distinct period, a.accountrecid, product_id productid from mfpdbo.account a, mfpdbo.accountdirectory ad where a.accountrecid=ad.accountrecid and "
				+ "  mfpproc.fn_getcontractend(a.accountrecid)>=trunc(SYSDATE) and a.locked='Y' "
				+ " and product_id is not null and  pgoos='Y' and nvl(ad.sendproduct,'Y')='Y'  and ((a.aer_account='N' and selected='Y' and nvl(accepted,'Y')='Y') or a.aer_account='Y') ";

		List<PGOOSAccountProduct> productList = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<PGOOSAccountProduct>(PGOOSAccountProduct.class));
		return productList;

	}

	public List<PGOOSHotelAccountProduct> getBatchHotelProduct() {
		String sql = "SELECT hotelid, marshacode, accountrecid, productid, period, amenity_diff, isaer FROM (SELECT /*+ index(ad IDX_FLAGS) */ ad.hotelid, h.marshacode, a.accountrecid, a.product_id productid, a.period, NVL (ad.amenity_diff, 'N') amenity_diff, "
				+ " mfpproc.fn_get_account_rate_type(hr.hotelrfpid, a.accountrecid, h.affiliationid, a.aer_account, a.process_aer, ad.selected) isaer FROM  mfpdbo.account a, mfpdbo.accountdirectory ad, mfpdbo.hotel h," 
				+ " mfpdbo.hotelrfp hr, mfpdbo.period  p "
				+ " WHERE a.accountrecid = ad.accountrecid AND a.period = hr.period "
                + " AND hr.hotelid = ad.hotelid AND p.period = a.period  AND hr.hotelid = h.hotelid "
                + " AND ad.nopricing = 'N' AND CASE WHEN contractend IS NULL THEN p.enddate ELSE a.contractend END >= TRUNC (SYSDATE) AND a.locked = 'Y' AND  NVL(ad.sendproduct,'Y') ='Y' "
                + " AND h.hotelid = ad.hotelid AND h.partition_idx = 'M' AND (a.aer_account='Y' or ad.selected = 'Y'))"
                + "	WHERE isaer IS NOT NULL ";

		List<PGOOSHotelAccountProduct> productList = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<PGOOSHotelAccountProduct>(PGOOSHotelAccountProduct.class));
		return productList;

	}

	public void beginVRPEVRPXBatch(Long batchid, String eid) {
		CallableStatement stmt = null;
		Connection con = (Connection) getConnection();
		try {

			stmt = con.prepareCall("begin mfpproc.sp_pgoos_stagebatch(?, ?); end; ");
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

		String sql = "SELECT count(*) FROM mfpdbo.pgoos_batch_stage where batchid=" + batchid;

		Long batchId = (Long) getJdbcTemplate().queryForObject(sql, Long.class);

		return batchId;
	}
	
	public Long[] countBatchItems(Long batchid, boolean getUnprocessed) {

		String sql = "SELECT count(*) FROM mfpdbo.pgoos_batch_stage where batchid=" + batchid;

		Long totalMessages = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		Long totalUnprocessedMessages = 0L;
//		if (getUnprocessed) {
			sql = "SELECT count(*) FROM mfpdbo.pgoos_batch_stage where batchid=" + batchid + " and processed = 'N'";
			totalUnprocessedMessages = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
//		}
		Long[] response = new Long[] {totalMessages, totalUnprocessedMessages };

		return response;
	}
	
	public boolean isJobRunning(String jobType) {
		
		String sql = "SELECT count(*) FROM mfpdbo.pgoos_load WHERE loadend IS NULL AND loadstart > TRUNC(SYSDATE - 1) AND loadtype ='" + jobType + "'";
		Long count = (Long) getJdbcTemplate().queryForObject(sql, Long.class);
		if(count > 0)
			return true;
		else
			return false;		
	}

	public void createRelinquishBatch(Long batchId, List<Long> accountRecList, String eid) {

		List<List<Long>> chunkedAccountRecList = new ArrayList<List<Long>>();
		int limit = 999;
		int chunkSize = 0;
		for (int n = 0; n < accountRecList.size(); n += limit) {
			chunkSize = Math.min(accountRecList.size(), n + limit);
			chunkedAccountRecList.add(accountRecList.subList(n, chunkSize));
		}

		for (List<Long> accountRecBatch : chunkedAccountRecList) {
			String accountRecIds = "";
			for (Long accountRecId : accountRecBatch) {
				if (accountRecIds.length() > 0)
					accountRecIds += ", ";
				accountRecIds += accountRecId;
			}

			String sql = "	INSERT INTO mfpdbo.pgoos_batch_stage (stageseq, batchid, accountid, accountrecid, hotelid, marshacmd, eid, processed, byperiod) "
					+ "		SELECT mfpdbo.pgoos_batch_stage_seq.NEXTVAL, ?, a.accountid, a.accountrecid, h.hotelid, 'X', ?, 'N', 'N' "
					+ "		FROM mfpdbo.accountdirectory ad, mfpdbo.account a, mfpdbo.hotel h "
					+ "		WHERE ad.accountrecid = a.accountrecid AND h.hotelid = ad.hotelid AND h.partition_idx = 'M' AND ad.accountrecid IN ( "
					+ accountRecIds
					+ "		) AND ( ad.weblocked = 'Y' OR ( a.aer_account = 'Y' AND process_aer = 'Y' AND mfpproc.fn_exclude_aer(h.affiliationid) = 'N' "
					+ "		AND mfpproc.fn_is_ritz_gpp_ah(h.affiliationid, a.accountrecid) = 'Y' ) )"
					+ "		AND mfpproc.fn_getcontractend (a.accountrecid) > TRUNC(SYSDATE - 1) ";

			getJdbcTemplate().update(sql, new Object[] { batchId, eid });
		}
	}

}
