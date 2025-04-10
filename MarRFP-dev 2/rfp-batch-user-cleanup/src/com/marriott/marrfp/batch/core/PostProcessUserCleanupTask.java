package com.marriott.marrfp.batch.core;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.UserCleanupBatchDao;
import com.marriott.marrfp.batch.domain.UserCleanupLoad;

public class PostProcessUserCleanupTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PostProcessUserCleanupTask.class);
	
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

		logger.info("Entering PostProcessUserCleanupTask");

		UserCleanupLoad userCleanupLoad = (UserCleanupLoad) context.getLoadRecord();
		userCleanupLoad.setLoadEnd(new Date());
		userCleanupLoad.setLoadEndUser(getEid());
		userCleanupLoad.setStatus(UserCleanupLoad.LOAD_DONE);
		
		dao.updateUserCleanupLoad(userCleanupLoad);

		logger.info("Exiting PostProcessUserCleanupTask");
		
		return context;
	}
}
