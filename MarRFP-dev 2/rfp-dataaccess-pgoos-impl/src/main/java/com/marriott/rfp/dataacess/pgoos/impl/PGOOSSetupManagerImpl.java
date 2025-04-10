package com.marriott.rfp.dataacess.pgoos.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pgoos.api.PGOOSSetupManager;
import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.pricing.pgoos.McbStatus;
import com.marriott.rfp.object.pricing.pgoos.McbStatusDetails;

/**
 * Session Bean implementation class PGOOSManagerImpl
 */

@Service
public class PGOOSSetupManagerImpl implements PGOOSSetupManager {
	private static final Logger log = LoggerFactory.getLogger(PGOOSSetupManagerImpl.class);
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	public void updatebatch(Long hotelid, Long accountrecid, Long batchid, String eid, TransactionType transactiontype) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("begin  INSERT INTO mfpdbo.pgoos_batch_stage (stageseq,  batchid,  accountid,  accountrecid,  hotelid,  marshacmd, "
						+ " eid,  processed, byPeriod)  SELECT mfpdbo.pgoos_batch_stage_seq.NEXTVAL,  ?, a.accountid, ?, ?, ?, ?, 'N','Y' from mfpdbo.account a where accountrecid=?; commit; end; ");
				try {
					stmt.setLong(1, batchid);
					stmt.setLong(2, accountrecid);
					stmt.setLong(3, hotelid);
					stmt.setString(4, transactiontype.value());
					stmt.setString(5, eid);
					stmt.setLong(6, accountrecid);
					stmt.executeUpdate();
				} finally {
					stmt.close();
				}

			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}

	}

	public void updateforMCBbatch(Long batchid, String eid, TransactionType transactiontype, String byPeriod) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {

				CallableStatement stmt = con.prepareCall("begin  INSERT INTO mfpdbo.pgoos_batch_stage (stageseq,  batchid,  accountid,  accountrecid,  hotelid,  marshacmd, "
						+ " eid,  processed, rpgms, byPeriod)  SELECT mfpdbo.pgoos_batch_stage_seq.NEXTVAL,  ?, a.accountid, a.accountrecid, b.hotelid, ?, ?, 'N', b.rpgms, ? from mfpdbo.account a,"
						+ " mfpdbo.mcb_selection b where a.accountrecid=b.accountrecid and b.eid = ?; commit; end; ");
				try {
					stmt.setLong(1, batchid);
					stmt.setString(2, transactiontype.value());
					stmt.setString(3, eid);
					stmt.setString(4, byPeriod);
					stmt.setString(5, eid);
					stmt.executeUpdate();
				} finally {
					stmt.close();
				}

			} finally {
				con.close();

			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);

		}

	}

	public Long countTotalBatchRecords(Long batchid) {
		String queryString = "select count(*) thecount from  mfpdbo.pgoos_batch_stage  where batchid=?1";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, batchid);
		Long thecount = 0L;
		try {
			thecount = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			thecount = 0L;
		}
		return thecount;
	}

	public Long getNextBatchId() {

		String queryString = "SELECT mfpdbo.pgoos_batchid_seq.nextVal FROM DUAL";

		Query q = em.createNativeQuery(queryString, Long.class);
		Long batchId = (Long) q.getSingleResult();
		return batchId;
	}

	public void updatePgoosBatch(Long batchid, String status, String loadtype, String userid) {
	CallableStatement stmt;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			try {
				stmt = con.prepareCall("begin mfpproc.pkg_pgoos_hpp.sp_insertupdate_pgoosbatch(?, ?, ?, ?); end;");
				try {
					stmt.setLong(1, batchid);
					stmt.setString(2, status);
					stmt.setString(3, loadtype);
					stmt.setString(4, userid);
					stmt.execute();
				} finally {
					stmt.close();
				}
			} finally {
				con.close();
			}
		} catch (SQLException ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public McbStatus getMCBStatus(Long batchId) {

		String queryString = "select loadstart, loadend, onqueue from (select min(loaddate) loadstart, max(loaddate) loadend from mfpdbo.pgoos_transaction pt where pt.batchid = ?1) a,"
			+ " (SELECT COUNT (*) onqueue FROM mfpdbo.pgoos_batch_stage WHERE batchid = 18047) b ";
		Query q = em.createNativeQuery(queryString, McbStatus.class);
		q.setParameter(1, batchId);
		McbStatus value;

		try {
			value = (McbStatus) q.getSingleResult();
		} catch (Exception ex) {
			value = null;
		}

		return value;
	}
	
    public List<McbStatusDetails> getMCBStatusDetails(Long batchId) {
    	String queryString = "SELECT marshacmd, MAX (cmpl) cmpl, MAX (fail) fail, MAX (unpb) unpb, MAX (publ) publ "
    		+ " FROM (SELECT a.marshacmd, COUNT (a.transactionid) cmpl, NULL fail, NULL unpb, NULL publ  FROM mfpdbo.pgoos_transaction a "
    		+ " WHERE (a.batchid = ?1) AND status = 'CMPL'  GROUP BY a.marshacmd  UNION "
    		+ " SELECT a.marshacmd, NULL cmpl, COUNT (a.transactionid) fail, NULL unpb, NULL publ  FROM mfpdbo.pgoos_transaction a "
    		+ " WHERE (a.batchid = ?2) AND status = 'FAIL' GROUP BY a.marshacmd  UNION "
    		+ " SELECT a.marshacmd, NULL cmpl, NULL fail, COUNT (a.transactionid) unpb, NULL publ  FROM mfpdbo.pgoos_transaction a "
    		+ " WHERE (a.batchid = ?3) AND status = 'UNPB'  GROUP BY a.marshacmd  UNION "
    		+ " SELECT a.marshacmd, NULL cmpl, NULL fail, NULL unpb, COUNT (a.transactionid) publ  FROM mfpdbo.pgoos_transaction a "
    		+ " WHERE (a.batchid = ?4) AND status = 'PUBL'  GROUP BY a.marshacmd)  GROUP BY marshacmd  ORDER BY marshacmd";
    	Query q = em.createNativeQuery(queryString, McbStatusDetails.class);
    	q.setParameter(1, batchId);
    	q.setParameter(2, batchId);
    	q.setParameter(3, batchId);
    	q.setParameter(4, batchId);
    	@SuppressWarnings("unchecked")
    	List<McbStatusDetails> results = q.getResultList();

    	return results;
   }

}
