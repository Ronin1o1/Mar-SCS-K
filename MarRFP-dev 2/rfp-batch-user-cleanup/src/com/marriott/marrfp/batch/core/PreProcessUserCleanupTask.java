package com.marriott.marrfp.batch.core;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.UserCleanupBatchDao;
import com.marriott.marrfp.batch.domain.UserCleanupLoad;

public class PreProcessUserCleanupTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PreProcessUserCleanupTask.class);
	
	@Autowired
	private UserCleanupBatchDao dao;
	
	private String eid;
	
	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public UserCleanupBatchDao getDao() {
		return dao;
	}

	public void setDao(UserCleanupBatchDao dao) {
		this.dao = dao;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering PreProcessTask");
		
		Long batchId = dao.getBatchId();
		UserCleanupLoad userCleanupLoad = new UserCleanupLoad();
		userCleanupLoad.setBatchId(BigDecimal.valueOf(batchId));
		userCleanupLoad.setStatus(UserCleanupLoad.LOAD_START);
		userCleanupLoad.setLoadStart(new Date());
		userCleanupLoad.setLoadCreateUser(getEid());
		userCleanupLoad.setLoadType(UserCleanupLoad.LOAD_TYPE);

		dao.createUserCleanupLoad(userCleanupLoad);

		context.setLoadRecord(userCleanupLoad);

		logger.info("Exiting PreProcessTask");
		
		return context;
	}
}
