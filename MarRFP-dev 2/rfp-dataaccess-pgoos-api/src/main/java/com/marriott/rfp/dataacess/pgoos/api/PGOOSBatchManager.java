package com.marriott.rfp.dataacess.pgoos.api;

import java.util.List;

import com.marriott.rfp.object.pgoos.PGOOSBatchRecord;
import com.marriott.rfp.object.pgoos.PublishResponse;

public interface PGOOSBatchManager {
	public List<PGOOSBatchRecord> getBatchRecords(Long batchid, Long count);

	public void updateBatchRecord(Long stageseq);

	public Long countBatchRecord(Long batchid, Long hotelid);

	public void deleteBatchRecord(Long stageseq);

	public void savePublishResponseDetails(List<PublishResponse> responseList);
}
