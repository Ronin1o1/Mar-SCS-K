package com.marriott.marrfp.batch.core;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PgoosLoad;
import com.marriott.rfp.webservice.pgoos.batch.PGOOSBatchPortType;

public class PgoosTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PgoosTask.class);

	@Autowired
	private PGOOSBatchPortType pgoosBatchPort;

	@Autowired
	private BatchDao dao;

	private Long batchSize;
	
	private Long pollInterval;

	public PGOOSBatchPortType getPgoosBatchPort() {
		return pgoosBatchPort;
	}

	public void setPgoosBatchPort(PGOOSBatchPortType pgoosBatchPort) {
		this.pgoosBatchPort = pgoosBatchPort;
	}

	public Long getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}

	public Long getPollInterval() {
		return pollInterval;
	}

	public void setPollInterval(Long pollInterval) {
		this.pollInterval = pollInterval;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering PgoosTask");

		PgoosLoad load = (PgoosLoad) context.getLoadRecord();
		long batchid = load.getBatchId().longValue();
		dao.beginVRPEVRPXBatch(batchid, load.getLoadCreateUser());
		logger.info("Created batch stage for VRPE and VRPX/K");
		//long currcount=dao.getCountBatchItems(batchid);
		boolean getUnprocessed = true;
		Long[] response = dao.countBatchItems(batchid, getUnprocessed);
		long currcount = response[0];
		long unprocessedCount = response[1];
		while (currcount > 0) {
			logger.info("Sending to Queue. Num batch items left:  " + unprocessedCount + " Messages in Stage batch yet to be sent to HPP: " + currcount);
			if(unprocessedCount > 0) {
				getUnprocessed = true;
				pgoosBatchPort.executeQueueForBatch(batchid, batchSize, load.getLoadCreateUser());
			} else if (getUnprocessed){
				getUnprocessed = false;
			}
			if(!getUnprocessed) { // This means we are not calling MARRFP WebService so we can sleep for a min and then check the remaining count.
				TimeUnit.MINUTES.sleep(pollInterval);
			}
			response = dao.countBatchItems(batchid, getUnprocessed);
			currcount = response[0];
			unprocessedCount = response[1];
		}
		logger.info("Exiting PgoosTask");

		return context;
	}

	public void setDao(BatchDao dao) {
		this.dao = dao;
	}

	public BatchDao getDao() {
		return dao;
	}

}
