package com.marriott.rfp.business.pgoos.pricing.impl;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marriott.rfp.business.pgoos.pricing.api.PGOOSBatchStagingService;

@Service
@WebService(endpointInterface = "com.marriott.rfp.webservice.pgoos.batch.PGOOSBatchPortType", targetNamespace = "http://com/marriott/rfp/webservice/pgoos/batch/", serviceName = "PGOOSBatchStagingService", portName = "PGOOSBatchPort")
public class PGOOSBatchBindingImpl {

	@Autowired
	private PGOOSBatchStagingService pgoosBatchStagingService;


	public void executeQueueForBatch(long batchId, long count, String eid) {
		 pgoosBatchStagingService.executeQueueForBatch( batchId,  count,  eid); 
	}

}