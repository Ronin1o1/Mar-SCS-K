package com.marriott.marrfp.batch.core;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.ChaseEmailBatchDao;
import com.marriott.marrfp.batch.domain.ChaseEmailLoad;

public class PreProcessChaseEmailTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PreProcessChaseEmailTask.class);
	
	@Autowired
	private ChaseEmailBatchDao dao;
	
	private String eid;
	
	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public ChaseEmailBatchDao getDao() {
		return dao;
	}

	public void setDao(ChaseEmailBatchDao dao) {
		this.dao = dao;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering PreProcessTask");
		
		Long batchId = dao.getBatchId();
		ChaseEmailLoad chaseEmailLoad = new ChaseEmailLoad();
		chaseEmailLoad.setBatchId(BigDecimal.valueOf(batchId));
		chaseEmailLoad.setStatus(ChaseEmailLoad.LOAD_START);
		chaseEmailLoad.setLoadStart(new Date());
		chaseEmailLoad.setLoadCreateUser(getEid());
		chaseEmailLoad.setLoadType(ChaseEmailLoad.LOAD_TYPE);

		dao.createChaseEmailLoad(chaseEmailLoad);

		context.setLoadRecord(chaseEmailLoad);

		logger.info("Exiting PreProcessTask");
		
		return context;
	}
}
