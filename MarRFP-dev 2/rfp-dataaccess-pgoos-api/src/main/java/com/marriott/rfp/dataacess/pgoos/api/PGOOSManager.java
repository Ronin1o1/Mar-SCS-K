package com.marriott.rfp.dataacess.pgoos.api;

import java.util.List;



import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelAccountRoomPool;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.PricingRule;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.RoomPool;
import com.marriott.rfp.object.pgoos.Season;
import com.marriott.rfp.object.pgoos.TransactionType;


public interface PGOOSManager {

	public List<RoomPool> getRoomPools(HotelAccountInfo hotelacctInfo, boolean killOrRel);

	public HotelAccountInfo getHotelAccountSpecific(Long hotelid, Long accountrecid, TransactionType transactiontype);

	public String verifyData(HotelAccountInfo ha, String isLOSBrand, Long roompool);

	public String verifyTwoYear(HotelAccountInfo ha, TransactionType transactiontype);

	public List<Season> getBlackoutSeasons(HotelAccountInfo ha, String isaer_rateprogram);

	public List<PricingRule> getPricingRules(Long accountInfoId, Long roompool, String productid, String setPricingAmt, String zeroPrice, String zeroCeil, Double enhancedDiscount);

	public List<PricingRule> getDiscFirstTierRules(Long accountInfoId, Double pricingamount);

	public void updateVRPEError(HotelAccountInfo ha, RoomPool rp);

	public Long getTransactionid();

	public void updateAuditInfo(HotelAccountInfo ha, RoomPool rp, String byPeriod);

	public Long updateMarketcode(long haccid);

	public List<HotelsToPublish> getRecordsToPublish(Long batchid, Long hotelid);

	public void updatePublishHotel(List<PublishHotelResponse> phr, Long batchid);

	public String getBTtoHPPServiceUrl() ;
	
	public void updateHotelAccountFlags(Long haccId, int roomClassSeq, int roomPoolSeq, String setVRPE, String setVRPX, String setVPRK);
	
	public void updateHotelAccountFlags_runMCB_GPP_all(Long haccId, int roomClassSeq, int roomPoolSeq, String setVRPE, String setVRPX, String setVPRK);
	
	public List<HotelAccountRoomPool> getRoomPoolsToRecalc(Long haccid);

}
