package com.marriott.marrfp.batch.core;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.marriott.marrfp.batch.dao.BatchDao;
import com.marriott.marrfp.batch.domain.PGOOSAccountProduct;
import com.marriott.marrfp.batch.domain.PGOOSHotelAccountProduct;
import com.marriott.marrfp.batch.domain.PgoosLoad;
import com.marriott.rfp.webservice.product.batch.PgoosPropagateProductPortType;

public class PgoosProductTask extends BaseTask {

	private static final Logger logger = Logger.getLogger(PgoosProductTask.class);

	@Autowired
	private PgoosPropagateProductPortType pgoosPropagateProductPort;

	@Autowired
	private BatchDao dao;

	public void setDao(BatchDao dao) {
		this.dao = dao;
	}

	public BatchDao getDao() {
		return dao;
	}

	public PgoosPropagateProductPortType getPgoosPropagateProductPort() {
		return pgoosPropagateProductPort;
	}

	public void setPgoosPropagateProductPort(PgoosPropagateProductPortType pgoosPropagateProductPort) {
		this.pgoosPropagateProductPort = pgoosPropagateProductPort;
	}

	public Context executeTask(Context context) throws Exception {

		logger.info("Entering ProductTask");

		logger.info("Updating compare amenities");
		dao.updateCompareAmenityBatch();

		PgoosLoad load = (PgoosLoad) context.getLoadRecord();
		long batchid = load.getBatchId().longValue();
		String eid = load.getLoadCreateUser();
		logger.info("batchid=" + batchid);
		logger.info("Product verify");
		List<PGOOSAccountProduct> aps = dao.getBatchVerifyAccountProduct();
		logger.info(aps.size() + " Products to verify");
		for (PGOOSAccountProduct apm : aps) {
			pgoosPropagateProductPort.accountBatchProductVerifyProcess(apm.getPeriod().longValue(), apm.getAccountrecid().longValue(), apm.getProductid());
		}
		logger.info("Product master");
		pgoosPropagateProductPort.accountBatchProductMasterProcess(batchid, eid);
		logger.info("Product send hotel products");

		List<PGOOSHotelAccountProduct> ahs = dao.getBatchHotelProduct();
		logger.info(ahs.size() + " Products to send");
		for (PGOOSHotelAccountProduct ah : ahs) {
			pgoosPropagateProductPort.hotelProductProcess(batchid, ah.getHotelid().longValue(), ah.getAccountrecid().longValue(), ah.getMarshaCode(), ah.getProductid(), ah.getAmenity_diff(),
					ah.getIsAer(), eid);
		}
		logger.info("Exiting ProductTask");

		return context;
	}

}
