package com.marriott.rfp.business.pgoos.admin.impl;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marriott.rfp.business.pgoos.admin.api.PgoosPropagateProductService;

//@javax.ejb.Stateless
@Service()
@WebService(endpointInterface = "com.marriott.rfp.webservice.product.batch.PgoosPropagateProductPortType", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", serviceName = "PgoosPropagateProductService", portName = "PgoosPropagateProductPort")
public class PgoosPropagateProductBindingImpl {

	@Autowired
	private PgoosPropagateProductService pgoosPropagateProductService;

	public void hotelProductProcess(long batchId, long hotelid, long accountrecid, String marshacode, String productid, String amenity_diff, String isAer, String eid) {
		pgoosPropagateProductService.hotelProductProcess(batchId, hotelid, accountrecid, marshacode, productid, amenity_diff, isAer, eid);
	}

	public void accountBatchProductVerifyProcess(long period, long accountrecid, String productid) {
		pgoosPropagateProductService.accountVerifyProductProcess(period, accountrecid, productid);
	}

	public void accountBatchProductMasterProcess(long batchId, String eid) {
		pgoosPropagateProductService.accountBatchProductMasterProcess(batchId, eid);
	}

}