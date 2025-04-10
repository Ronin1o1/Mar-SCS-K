package com.marriott.marrfp.batch.core;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PgoosLoad;

public class PreProcessTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PreProcessTask.class);
	
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

		logger.info("Entering PreProcessTask");
		
		Long batchId = dao.getBatchId();
		PgoosLoad pgoosLoad = new PgoosLoad();
		pgoosLoad.setBatchId(BigDecimal.valueOf(batchId));
		pgoosLoad.setStatus(PgoosLoad.LOAD_START);
		pgoosLoad.setLoadStart(new Date());
		pgoosLoad.setLoadCreateUser(getEid());
		pgoosLoad.setLoadType(PgoosLoad.LOAD_TYPE);

		dao.createPgoosLoad(pgoosLoad);

		context.setLoadRecord(pgoosLoad);

		logger.info("Exiting PreProcessTask");
		
		return context;
	}
}
