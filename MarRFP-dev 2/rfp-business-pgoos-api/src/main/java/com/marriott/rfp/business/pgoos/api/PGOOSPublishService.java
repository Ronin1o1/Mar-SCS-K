package com.marriott.rfp.business.pgoos.api;

import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.pricing.pgoos.McbStatus;
import com.marriott.rfp.object.user.User;


public interface PGOOSPublishService {
	public void publishHotelAccount(Long hotelid, Long accountrecid, Long batchid, User user, Boolean holdPublish, String byPeriod, TransactionType transactiontype);

	public void publishHotelAccount(Long hotelid, Long accountrecid, String rpgms, Long batchid, User user, Boolean holdPublish, String byPeriod, TransactionType transactiontype);

	public void publishLiveBatch(Long hotelid, Long accountrecid, Long batchid, User user);

	public void publishMCBBatch(Long batchid, User user, TransactionType transType, String byPeriod);

	public void publishHotels(Long batchid, Long hotelid, User user);

	public McbStatus getMcbStatus(Long batchId);
}
