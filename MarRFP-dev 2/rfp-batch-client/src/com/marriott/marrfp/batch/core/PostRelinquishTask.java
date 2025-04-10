package com.marriott.marrfp.batch.core;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PgoosLoad;

public class PostRelinquishTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PostRelinquishTask.class);
	
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

		logger.info("Entering PostRelinquishTask");

		PgoosLoad pgoosLoad = (PgoosLoad) context.getLoadRecord();
		pgoosLoad.setLoadEnd(new Date());
		pgoosLoad.setLoadEndUser(getEid());
		pgoosLoad.setStatus(PgoosLoad.LOAD_DONE);
		
		dao.updatePgoosLoad(pgoosLoad);

		logger.info("Exiting PostRelinquishTask");
		
		return context;
	}
}
