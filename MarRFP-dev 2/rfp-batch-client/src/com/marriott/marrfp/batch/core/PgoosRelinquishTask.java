package com.marriott.marrfp.batch.core;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PgoosLoad;
import com.marriott.rfp.webservice.pgoos.batch.PGOOSBatchPortType;

public class PgoosRelinquishTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PgoosRelinquishTask.class);

	@Autowired
	private PGOOSBatchPortType pgoosBatchPort;

	@Autowired
	private BatchDao dao;

	private Long batchSize;

	private Long pollInterval;

	private Resource accountList;

	public PGOOSBatchPortType getPgoosBatchPort() {
		return pgoosBatchPort;
	}

	public void setPgoosBatchPort(PGOOSBatchPortType pgoosBatchPort) {
		this.pgoosBatchPort = pgoosBatchPort;
	}

	public void setDao(BatchDao dao) {
		this.dao = dao;
	}

	public BatchDao getDao() {
		return dao;
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

	public Resource getAccountList() {
		return accountList;
	}

	public void setAccountList(Resource accountList) {
		this.accountList = accountList;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering PgoosRelinquishTask");

		PgoosLoad load = (PgoosLoad) context.getLoadRecord();
		long batchid = load.getBatchId().longValue();

		Scanner scan = null;

		try {
			List<Long> accountRecList = new ArrayList<Long>();
			scan = new Scanner(accountList.getFile());
			while (scan.hasNextLine()) {
				String line = scan.nextLine();
				accountRecList.add(Long.valueOf(line));
			}

			if (accountRecList.size() > 0) {
				dao.createRelinquishBatch(batchid, accountRecList, load.getLoadCreateUser());

				logger.info("Created batch stage for VRPX");
				boolean getUnprocessed = true;
				Long[] response = dao.countBatchItems(batchid, getUnprocessed);
				long currcount = response[0];
				long unprocessedCount = response[1];
				while (currcount > 0) {
					logger.info("Sending to Queue. Num batch items left: " + unprocessedCount
							+ " Messages in Stage batch yet to be sent to HPP: " + currcount);
					if (unprocessedCount > 0) {
						pgoosBatchPort.executeQueueForBatch(batchid, batchSize, load.getLoadCreateUser());
					} else if (getUnprocessed) {
						getUnprocessed = false;
					}
					response = dao.countBatchItems(batchid, getUnprocessed);
					currcount = response[0];
					unprocessedCount = response[1];
					if (!getUnprocessed) {
						// This means we are not calling MARRFP WebService so we can sleep for a min and
						// then check the remaining count.
						TimeUnit.MINUTES.sleep(pollInterval);
					}
				}
			} else {
				logger.info("No accounts added to process.");
			}

			logger.info("Exiting PgoosTask");

		} catch (Exception e) {
			logger.error("Error occurred in PgoosRelinquishTask for batch id = " + batchid);
			logger.error(e.getMessage());
			PgoosLoad pgoosLoad = (PgoosLoad) context.getLoadRecord();
			pgoosLoad.setLoadEnd(new Date());
			pgoosLoad.setLoadEndUser(load.getLoadCreateUser());
			pgoosLoad.setStatus(PgoosLoad.LOAD_FAIL);
			dao.updatePgoosLoad(pgoosLoad);
			System.exit(0);
		} finally {
			scan.close();
		}

		return context;
	}

}
