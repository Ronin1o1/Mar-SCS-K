package com.marriott.marrfp.batch.core;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PgoosLoad;

public class PreRelinquishProcessTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PreRelinquishProcessTask.class);

	@Autowired
	private BatchDao dao;

	private String eid;

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public BatchDao getDao() {
		return dao;
	}

	public void setDao(BatchDao dao) {
		this.dao = dao;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering PreRelinquishProcessTask");

		if (dao.isJobRunning(PgoosLoad.LOAD_TYPE)) {
			logger.info("Batch job is currently running. Relinquish Batch job terminated.");
			System.exit(0);
		} else if (dao.isJobRunning(PgoosLoad.REL_LOAD_TYPE)) {
			logger.info("Relinquish batch job is currently running. Relinquish Batch job terminated.");
			System.exit(0);
		} else {
			Long batchId = dao.getBatchId();
			PgoosLoad pgoosLoad = new PgoosLoad();
			pgoosLoad.setBatchId(BigDecimal.valueOf(batchId));
			pgoosLoad.setStatus(PgoosLoad.LOAD_START);
			pgoosLoad.setLoadStart(new Date());
			pgoosLoad.setLoadCreateUser(getEid());
			pgoosLoad.setLoadType(PgoosLoad.REL_LOAD_TYPE);

			dao.createPgoosLoad(pgoosLoad);

			context.setLoadRecord(pgoosLoad);
		}

		logger.info("Exiting PreRelinquishProcessTask");

		return context;
	}
}
