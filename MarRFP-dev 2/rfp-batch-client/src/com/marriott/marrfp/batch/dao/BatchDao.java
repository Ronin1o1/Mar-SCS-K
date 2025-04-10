package com.marriott.marrfp.batch.dao;

import java.math.BigDecimal;
import java.util.List;

import com.marriott.marrfp.batch.domain.PGOOSAccountProduct;
import com.marriott.marrfp.batch.domain.PGOOSHotelAccountProduct;
import com.marriott.marrfp.batch.domain.PgoosLoad;

public interface BatchDao {

	public PgoosLoad findById(BigDecimal batchId);

	public Long getBatchId();

	public void createPgoosLoad(PgoosLoad pgoosLoad);

	public void updatePgoosLoad(PgoosLoad pgoosLoad);

	public void updateCompareAmenityBatch();

	public List<PGOOSAccountProduct> getBatchVerifyAccountProduct();

	public List<PGOOSHotelAccountProduct> getBatchHotelProduct();

	public void beginVRPEVRPXBatch(Long batchid, String eid);

	public Long getCountBatchItems(Long batchid);

	public Long[] countBatchItems(Long batchid, boolean getUnprocessed);

	public boolean isJobRunning(String jobType);
	
	public void createRelinquishBatch(Long batchId, List<Long> accountRecList, String eid);
}
