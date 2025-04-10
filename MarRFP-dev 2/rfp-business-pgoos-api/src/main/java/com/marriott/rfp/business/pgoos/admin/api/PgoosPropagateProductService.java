package com.marriott.rfp.business.pgoos.admin.api;

import com.marriott.rfp.object.pgoos.propagate.PGOOSAccountProduct;
import com.marriott.rfp.object.user.User;


public interface PgoosPropagateProductService {

	public void accountRunMCBVerifyProdProcess(Long batchid, User user);

	public void accountRunMCBHotelProdProcess(Long batchid, User user, long numver);

	public void accountLiveProductProcess(Long batchid, long hotelid, long accountrecid, User user);

	public void accountBatchProductProcess(Long batchid, String user);

	public void accountBatchProductVerifyProcess(Long batchid, String user);

	public void accountBatchProductMasterProcess(Long batchid, String user);

	public void accountVerifyProductProcess(PGOOSAccountProduct apm);

	public void accountVerifyProductProcess(Long period, Long accountrecid, String productid);

	public long accountProductSize();

	public long hotelProductSize(long numver);

	public void hotelProductProcess(Long batchid, Long hotelid, Long accountrecid, String marshacode, String productid, String amenity_diff, String isAer, String user);

}
