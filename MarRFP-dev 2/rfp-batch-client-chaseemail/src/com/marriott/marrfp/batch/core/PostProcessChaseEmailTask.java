package com.marriott.marrfp.batch.core;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.ChaseEmailBatchDao;
import com.marriott.marrfp.batch.domain.ChaseEmailLoad;

public class PostProcessChaseEmailTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PostProcessChaseEmailTask.class);
	
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

		logger.info("Entering PostProcessChaseEmailTask");

		ChaseEmailLoad chaseEmailLoad = (ChaseEmailLoad) context.getLoadRecord();
		chaseEmailLoad.setLoadEnd(new Date());
		chaseEmailLoad.setLoadEndUser(getEid());
		chaseEmailLoad.setStatus(ChaseEmailLoad.LOAD_DONE);
		
		dao.updateChaseEmailLoad(chaseEmailLoad);

		logger.info("Exiting PostProcessChaseEmailTask");
		
		return context;
	}
}
