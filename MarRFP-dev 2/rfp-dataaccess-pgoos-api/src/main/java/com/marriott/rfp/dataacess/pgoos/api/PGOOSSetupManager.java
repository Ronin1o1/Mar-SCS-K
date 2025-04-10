package com.marriott.rfp.dataacess.pgoos.api;

import java.util.List;



import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.pricing.pgoos.McbStatus;
import com.marriott.rfp.object.pricing.pgoos.McbStatusDetails;


public interface PGOOSSetupManager {
	public void updatebatch(Long hotelid, Long accountrecid, Long batchid, String eid, TransactionType transactiontype);

	public void updateforMCBbatch(Long batchid, String eid, TransactionType transactiontype, String byPeriod);

	public Long getNextBatchId();

	public void updatePgoosBatch(Long batchid, String status, String loadtype, String userid);

	public McbStatus getMCBStatus(Long batchId);

	public List<McbStatusDetails> getMCBStatusDetails(Long batchId);

	public Long countTotalBatchRecords(Long batchid);
}
