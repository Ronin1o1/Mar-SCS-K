package com.marriott.marrfp.batch.core;

import java.util.List;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.UserCleanupBatchDao;
import com.marriott.marrfp.batch.domain.UserCleanupLoad;
import com.marriott.marrfp.batch.core.BaseTask;
import com.marriott.marrfp.batch.core.Context;

public class UserCleanupTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(UserCleanupTask.class);

	
	@Autowired
	private UserCleanupBatchDao dao;
	boolean text;
	
	private Long batchSize;

	public Long getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}
		
	public Context executeTask(Context context) throws Exception {

		logger.info("Entering UserCleanupTask");
		
		UserCleanupLoad load = (UserCleanupLoad) context.getLoadRecord();
		long batchid = load.getBatchId().longValue();
		dao.beginUserCleanupBatch(batchid, load.getLoadCreateUser());
		logger.info("Exiting UserCleanupTask");
		logger.info("Exiting UserCleanupLoad");

		return context;
	}

	public void setDao(UserCleanupBatchDao dao) {
		this.dao = dao;
	}

	public UserCleanupBatchDao getDao() {
		return dao;
	}

}
