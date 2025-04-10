package com.marriott.rfp.business.pgoos.pricing.api;

public interface PGOOSBatchStagingService {

	public void executeQueueForBatch(Long batchid, Long count, String eid);
}
