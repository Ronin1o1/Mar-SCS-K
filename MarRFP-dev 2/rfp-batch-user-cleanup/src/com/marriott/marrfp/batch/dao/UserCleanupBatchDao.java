package com.marriott.marrfp.batch.dao;

import java.math.BigDecimal;
import java.util.List;

import com.marriott.marrfp.batch.core.UserCleanupBatchRecord;
import com.marriott.marrfp.batch.domain.UserCleanupLoad;

public interface UserCleanupBatchDao {

//	public UserCleanupLoad findById(BigDecimal batchId);

	public Long getBatchId();

	public void createUserCleanupLoad(UserCleanupLoad userCleanupLoad);

	public void updateUserCleanupLoad(UserCleanupLoad userCleanupLoad);

	public void beginUserCleanupBatch(Long batchid, String eid);
	
//	public Long getCountBatchItems(Long batchid);
	
//	public List<UserCleanupBatchRecord> getBatchRecords(Long batchid, Long count);

//	public void updateBatchRecord(Long stageseq);
	
}
