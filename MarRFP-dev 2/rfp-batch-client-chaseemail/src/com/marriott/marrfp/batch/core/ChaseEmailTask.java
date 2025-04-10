package com.marriott.marrfp.batch.core;

import java.util.List;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.ChaseEmailBatchDao;
import com.marriott.marrfp.batch.domain.ChaseEmailLoad;
import com.marriott.marrfp.batch.core.BaseTask;
import com.marriott.marrfp.batch.core.Context;
import com.marriott.marrfp.batch.core.ChaseEmailBatchRecord;
import com.marriott.marrfp.batch.core.PortfolioServiceImpl;

public class ChaseEmailTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(ChaseEmailTask.class);

	
	@Autowired
	private ChaseEmailBatchDao dao;
	private static volatile boolean text;
	
	private Long batchSize;

	public Long getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}
		
	public Context executeTask(Context context) throws Exception {

		logger.info("Entering ChaseEmailTask");
		
		ChaseEmailLoad load = (ChaseEmailLoad) context.getLoadRecord();
		long batchid = load.getBatchId().longValue();
		dao.beginChaseEmailBatch(batchid, load.getLoadCreateUser());
		logger.info("Created batch stage for chaseEmail");
		long currcount=dao.getCountBatchItems(batchid);
		while (currcount > 0) {
			logger.info("Sending to Queue. Num batch items left:  " + currcount);
			
			List<ChaseEmailBatchRecord> records = dao.getBatchRecords(batchid, getBatchSize());
			for (ChaseEmailBatchRecord record : records) {
				// Publish it
				try {
					PortfolioServiceImpl portfolioServiceImpl = new PortfolioServiceImpl(); 
					text = portfolioServiceImpl.generateChaseEmailBatch(record.getAccountRecId(), record.getHotelId(), record.getPeriod(), load.getLoadCreateUser(), "S", context, batchid);
					
				} catch (Exception e) {
				    e.printStackTrace();
				}
				dao.updateBatchRecord(record.getStageseq());
			}	
			
			currcount=dao.getCountBatchItems(batchid);
		}
		logger.info("Exiting ChaseEmailTask");
		logger.info("Exiting ChaseEmailLoad");

		return context;
	}

	public void setDao(ChaseEmailBatchDao dao) {
		this.dao = dao;
	}

	public ChaseEmailBatchDao getDao() {
		return dao;
	}

}
