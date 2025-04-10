package com.marriott.rfp.dataacess.pgoos.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.dataacess.pgoos.api.PGOOSBatchManager;
import com.marriott.rfp.object.pgoos.PGOOSBatchRecord;
import com.marriott.rfp.object.pgoos.PublishResponse;


@Service
@Transactional("transactionManagerRfpCommon")
public class PGOOSBatchManagerImpl implements PGOOSBatchManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	private EntityManager em;


	public List<PGOOSBatchRecord> getBatchRecords(Long batchid, Long count) {
		String queryString = "select stageseq, batchid, accountid, accountrecid, hotelid, marshacmd transactionType, eid, rpgms, byperiod from ("
				+ "SELECT a.stageseq, a.batchid, a.accountid, a.accountrecid, a.hotelid, a.marshacmd, a.eid, a.processed, rpgms, byperiod  FROM mfpdbo.pgoos_batch_stage a  where batchid=?1 "
				+ " and processed='N' order by hotelid, accountrecid  )  where rownum<=?2";

		Query q = em.createNativeQuery(queryString, PGOOSBatchRecord.class);
		q.setParameter(1, batchid);
		q.setParameter(2, count);
		@SuppressWarnings("unchecked")
		List<PGOOSBatchRecord> record = q.getResultList();

		return record;
	}
	
	public void updateBatchRecord(Long stageseq) {
		String queryString = "update  mfpdbo.pgoos_batch_stage  set processed='Y' where stageseq=?1";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, stageseq);
		q.executeUpdate();
	}

	public Long countBatchRecord(Long batchid, Long hotelid) {
		String queryString = "select count(*) thecount from  mfpdbo.pgoos_batch_stage  where batchid=?1 and hotelid=?2";
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, batchid);
		q.setParameter(2, hotelid);
		Long thecount = 0L;
		try {
			thecount = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			thecount = 0L;
		}
		return thecount;
	}

	public void deleteBatchRecord(Long stageseq) {
		String queryString = "delete from  mfpdbo.pgoos_batch_stage  where stageseq=?1";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, stageseq);
		q.executeUpdate();
	}

	public void savePublishResponseDetails(List<PublishResponse> responseList) {
		if (responseList != null) {
			for (PublishResponse response : responseList) {
				if (response != null) {

					Query q = em
							.createNativeQuery("begin mfpproc.pkg_pgoos_hpp.sp_updatetransstatus(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,   ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,   ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,   ?, ?, ?); end; ");

					q.setParameter(1, response.getTransactionId());
					q.setParameter(2, response.getRequestType());
					q.setParameter(3, response.getRateOfferId());
					q.setParameter(4, response.getRateProgramCode());
					q.setParameter(5, response.getPropertyRateEntityId());
					q.setParameter(6, response.getPropertyCode());
					q.setParameter(7, response.getStatus());
					q.setParameter(8, response.getSource());
					q.setParameter(9, response.getEid());
					q.setParameter(10, response.getLastPublishDate());
					q.setParameter(11, response.getPurgeDate());

					q.setParameter(12, response.getAvailParentRateProgram());
					q.setParameter(13, response.getAvailParentRateOfferName());
					q.setParameter(14, response.getAvailParentRateOfferId());
					q.setParameter(15, response.getAvailParentRateEntityId());

					q.setParameter(16, response.getPricingParentRateProgram());
					q.setParameter(17, response.getPricingParentRateOfferName());
					q.setParameter(18, response.getPricingParentRateOfferId());
					q.setParameter(19, response.getPricingParentRateEntityId());

					q.setParameter(20, response.getRestrictionsParentRateProgram());
					q.setParameter(21, response.getRestrictionsParentRateOfferName());
					q.setParameter(22, response.getRestrictionsParentRateOfferId());
					q.setParameter(23, response.getRestrictionsParentRateEntityId());

					q.setParameter(24, response.getCeilingParentRateProgram());
					q.setParameter(25, response.getCeilingParentRateOfferName());
					q.setParameter(26, response.getCeilingParentRateOfferId());
					q.setParameter(27, response.getCeilingParentRateEntityId());

					q.setParameter(28, response.getErrorCodesAsDelimitedString());
					q.setParameter(29, response.getErrorMessagesAsDelimitedString());
					q.setParameter(30, response.getWarningCodesAsDelimitedString());
					q.setParameter(31, response.getWarningMessagesAsDelimitedString());
					q.setParameter(32, response.getProcessId());
					q.setParameter(33, ""); // RET VAL

					q.executeUpdate();
				}
			}
		}
	}
	

}
