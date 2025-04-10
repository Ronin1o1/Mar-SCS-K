package com.marriott.marrfp.batch.dao;

import java.math.BigDecimal;
import java.util.List;

import com.marriott.marrfp.batch.core.ChaseEmailBatchRecord;
import com.marriott.marrfp.batch.domain.ChaseEmailLoad;

public interface ChaseEmailBatchDao {

	public ChaseEmailLoad findById(BigDecimal batchId);

	public Long getBatchId();

	public void createChaseEmailLoad(ChaseEmailLoad chaseEmailLoad);

	public void updateChaseEmailLoad(ChaseEmailLoad chaseEmailLoad);

	public void beginChaseEmailBatch(Long batchid, String eid);
	
	public Long getCountBatchItems(Long batchid);
	
	public List<ChaseEmailBatchRecord> getBatchRecords(Long batchid, Long count);

	public void updateBatchRecord(Long stageseq);
	
}
