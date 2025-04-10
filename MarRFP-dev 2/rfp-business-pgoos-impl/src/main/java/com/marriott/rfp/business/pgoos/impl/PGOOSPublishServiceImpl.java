package com.marriott.rfp.business.pgoos.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.hpp.api.HppPublishService;
import com.marriott.rfp.business.pgoos.api.PGOOSPublishService;
import com.marriott.rfp.business.pgoos.pricing.api.PGOOSBatchStagingService;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSBatchManager;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSManager;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSSetupManager;

import com.marriott.rfp.object.pgoos.CeilingRuleType;
import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelAccountRoomPool;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.MarshaCommandType;
import com.marriott.rfp.object.pgoos.OccupancyType;
import com.marriott.rfp.object.pgoos.PricingRule;
import com.marriott.rfp.object.pgoos.PricingRuleType;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.PublishResponse;
import com.marriott.rfp.object.pgoos.RoomPool;
import com.marriott.rfp.object.pgoos.Season;
import com.marriott.rfp.object.pgoos.TransactionType;
import com.marriott.rfp.object.pricing.pgoos.McbStatus;
import com.marriott.rfp.object.user.User;
/**
 * Session Bean implementation class PGOOSServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class PGOOSPublishServiceImpl implements PGOOSPublishService {

	private static final Logger logger = Logger.getLogger(PGOOSPublishServiceImpl.class.getName());
	
	@Autowired
	private PGOOSManager pgoosManager;
	@Autowired
	private PGOOSSetupManager pgoosSetupManager;
	@Autowired
	private PGOOSBatchManager pgoosBatchManager;

	@Autowired
	private HppPublishService publishService;

	@Autowired
	private PGOOSBatchStagingService pgoosBatchStagingService;

	public void publishLiveBatch(Long hotelid, Long accountrecid, Long batchid, User user) {
		pgoosSetupManager.updatebatch(hotelid, accountrecid, batchid, user.getEid(), TransactionType.LIVE);
		pgoosBatchStagingService.executeQueueForBatch(batchid, (long) 1, user.getEid());
	}

	public void publishMCBBatch(Long batchid, User user, TransactionType transType, String byPeriod) {
		pgoosSetupManager.updateforMCBbatch(batchid, user.getEid(), transType, byPeriod);
		Long numMCBRecords = pgoosSetupManager.countTotalBatchRecords(batchid);
		pgoosBatchStagingService.executeQueueForBatch(batchid, numMCBRecords, user.getEid());
	}

	public void publishHotelAccount(Long hotelid, Long accountrecid, Long batchid, User user, Boolean holdPublish, String byPeriod, TransactionType transactiontype) {
		publishHotelAccount(hotelid, accountrecid, null, batchid, user, holdPublish, byPeriod, transactiontype);
	}

	public void publishHotelAccount(Long hotelid, Long accountrecid, String rpgms, Long batchid, User user, Boolean holdPublish, String byPeriod, TransactionType transactiontype) {
		logger.log(Level.INFO, "Start publish");
		HotelAccountInfo hotelacctinfo = pgoosManager.getHotelAccountSpecific(hotelid, accountrecid, transactiontype);		

		if (hotelacctinfo != null) {
			boolean mcbSendAndKill = transactiontype == TransactionType.MCBVRPA || transactiontype == TransactionType.MCBVREX;
			boolean mcbSend = transactiontype == TransactionType.MCBVRPE || transactiontype == TransactionType.MCBVREP;
			boolean mcbKill = transactiontype == TransactionType.MCBVRXK || transactiontype == TransactionType.MCBVRXP;
			boolean killOrRel = transactiontype == TransactionType.MCBVRPK || transactiontype == TransactionType.MCBVRPX;

			// Update flags in HOTEL_ACCOUNTINFO_ROOMPOOLS table for MCB options
			if (mcbSendAndKill && hotelacctinfo.isGPPAccount()) {
				pgoosManager.updateHotelAccountFlags_runMCB_GPP_all(hotelacctinfo.getHotel_accountinfoid(), 0, 0, "Y", null, "Y");
			} else if ((mcbSendAndKill && !hotelacctinfo.isGPPAccount()) || mcbSend) {
				pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), 0, 0, "Y", null, null);
			} else if (mcbKill && hotelacctinfo.isGPPAccount()) {
				pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), 0, 0, null, null, "Y");
			}
			
			// For Account Specific flow, check if any hotel/account/room pool PGOOS flags should be recalculated
			if (transactiontype == TransactionType.LIVE) {
				List<HotelAccountRoomPool> recalcRoomPools = pgoosManager.getRoomPoolsToRecalc(hotelacctinfo.getHotel_accountinfoid());
				
				if(null != recalcRoomPools && recalcRoomPools.size() > 0) {
					for (HotelAccountRoomPool recalcRoomPool : recalcRoomPools) {
						if (null != recalcRoomPool.getRecalcFlags() && "A".equals(recalcRoomPool.getRecalcFlags())) {
							pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), 0, 0, "Y", null, null);
						} else if (null != recalcRoomPool.getRecalcFlags() && "B".equals(recalcRoomPool.getRecalcFlags())) {
							pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), 0, 0, "Y", null, "Y");
						} else if (null != recalcRoomPool.getRecalcFlags() && "Y".equals(recalcRoomPool.getRecalcFlags())) {
							pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), recalcRoomPool.getRoomClassSeq(), recalcRoomPool.getRoomPoolSeq(), "Y", null, null);
						} else if (null != recalcRoomPool.getRecalcFlags() && "R".equals(recalcRoomPool.getRecalcFlags())) {
							pgoosManager.updateHotelAccountFlags(hotelacctinfo.getHotel_accountinfoid(), recalcRoomPool.getRoomClassSeq(), recalcRoomPool.getRoomPoolSeq(), null, "Y", "S");
						}
					}
				}
			}

			hotelacctinfo.setBatchid(batchid);
			hotelacctinfo.setEid(user.getEid());
			if (rpgms != null && killOrRel) {
				hotelacctinfo.setRpgms(rpgms);
			}

			if (hotelacctinfo != null) {
				publish(hotelacctinfo, transactiontype, holdPublish, byPeriod, batchid);
			}
		}
		logger.log(Level.INFO, "End publish");
	}

	private void publish(HotelAccountInfo hotelacctinfo, TransactionType transactiontype, Boolean holdPublish, String byPeriod, Long batchid) {
		String status = pgoosManager.verifyTwoYear(hotelacctinfo, transactiontype);
		List<RoomPool> rmPools = getRoomPools(hotelacctinfo, transactiontype);
		hotelacctinfo.setRmPools(rmPools);
		boolean hasVRPE = false;
		for (RoomPool rp : rmPools) {
			if (rp.getCmdType() == MarshaCommandType.VRPE && rp.getStatus().equals("PEND")) {
				hasVRPE = true;
				break;
			}
		}
		if (hasVRPE) {
			if (!("PEND").equals(status)) {
				for (RoomPool rp : rmPools) {
					if (rp.getCmdType() == MarshaCommandType.VRPE && rp.getStatus().equals("PEND")) {
						rp.setStatus(status);
					}
				}
			}

		}
		validateRoomPools(rmPools, hotelacctinfo);

		// GPP Pricing Rules Caching at hotel/account level
		List<PricingRule> gpppricingrules = new ArrayList<PricingRule>();
		if (hotelacctinfo.getDiscfirsttieronly().equals("Y")) {
			gpppricingrules = pgoosManager.getDiscFirstTierRules(hotelacctinfo.getHotel_accountinfoid(), hotelacctinfo.getPercentdiscount());
		}		

		Map<Long, List<PricingRule>> prefPricingRulesMap = new HashMap<Long, List<PricingRule>>();
		Map<String, List<Season>> blackOutSeaonsMap = new HashMap<String, List<Season>>();
		
		for (RoomPool rp : rmPools) {
			if (rp.getCmdType() != null && rp.getCmdType() != MarshaCommandType.NONE) {
				rp.setTransactionid(pgoosManager.getTransactionid());
				if (rp.getStatus().equals("FAIL")) {
					pgoosManager.updateVRPEError(hotelacctinfo, rp);
				} else {
					if (rp.getStatus().equals("PEND")) {
						hotelacctinfo.setStatus("PEND");
						if (rp.getCmdType() == MarshaCommandType.VRPE) {

							// Preferred Pricing Rules Caching at room class level
							List<PricingRule> prefppricingrules = new ArrayList<PricingRule>();
							if (prefPricingRulesMap.containsKey(rp.getRoomClassSeq())) {
								prefppricingrules = prefPricingRulesMap.get(rp.getRoomClassSeq());
							} else {
								if (hotelacctinfo.getBreakfast().equals("Y")) {
									prefppricingrules = pgoosManager.getPricingRules(
											hotelacctinfo.getHotel_accountinfoid(), rp.getRoomClassSeq(),
											hotelacctinfo.getProductid(rp.getRoomClassSeq()), "Y", "N", "N", 0.0);
								} else {
									if (hotelacctinfo.getIslos().equals("Y")) {
										prefppricingrules = pgoosManager.getPricingRules(
												hotelacctinfo.getHotel_accountinfoid(), rp.getRoomClassSeq(),
												hotelacctinfo.getProductid(rp.getRoomClassSeq()), "Y", "N", "Y", hotelacctinfo.getEnhancedDiscount());
									} else {
										prefppricingrules = pgoosManager.getPricingRules(
												hotelacctinfo.getHotel_accountinfoid(), rp.getRoomClassSeq(),
												hotelacctinfo.getProductid(rp.getRoomClassSeq()), "N", "Y", "N", hotelacctinfo.getEnhancedDiscount());
									}
								}
								prefPricingRulesMap.put(rp.getRoomClassSeq(), prefppricingrules);
							}

							// Blackouts Caching at rate type level
							List<Season> blackOutSeaons = new ArrayList<Season>();
							if (blackOutSeaonsMap.containsKey(rp.getIs_aer_rpgm())) {
								blackOutSeaons = blackOutSeaonsMap.get(rp.getIs_aer_rpgm());
							} else {
								blackOutSeaons = pgoosManager.getBlackoutSeasons(hotelacctinfo, rp.getIs_aer_rpgm());
								blackOutSeaonsMap.put(rp.getIs_aer_rpgm(), blackOutSeaons);
							}							
							
							getVRPERules(hotelacctinfo, rp, prefppricingrules, gpppricingrules, blackOutSeaons);
						}
						pgoosManager.updateAuditInfo(hotelacctinfo, rp, byPeriod);
					}
				}
			} else {
				rp.setStatus("HOLD");
			}			

			if ("Y".equals(rp.getIs_aer_rpgm())) {
				hotelacctinfo.getGppRatePrograms().add(rp);
			} else if ("N".equals(rp.getIs_aer_rpgm())) {
				hotelacctinfo.getPrefRatePrograms().add(rp);
			}
		}
		
		boolean bHasPend = false;
		for (RoomPool rp : rmPools) {
			if (rp.getStatus().equals("PEND")) {
				bHasPend = true;
				break;
			}
		}

		if (bHasPend) {
			if (hotelacctinfo.getPrefRatePrograms().size() > 0) {
				List<PublishResponse> publishResponse = publishService.publishRateEntity(hotelacctinfo, pgoosManager.getBTtoHPPServiceUrl(), holdPublish, byPeriod, hotelacctinfo.getPrefRatePrograms());
				pgoosBatchManager.savePublishResponseDetails(publishResponse);
			}
			
			if (hotelacctinfo.getGppRatePrograms().size() > 0) {
				List<PublishResponse> publishResponse = publishService.publishRateEntity(hotelacctinfo, pgoosManager.getBTtoHPPServiceUrl(), holdPublish, byPeriod, hotelacctinfo.getGppRatePrograms());
				pgoosBatchManager.savePublishResponseDetails(publishResponse);
			}
		}
	}

	private List<RoomPool> getRoomPools(HotelAccountInfo hotelacctInfo, TransactionType transactiontype) {
		boolean killOrRel = transactiontype == TransactionType.MCBVRPK || transactiontype == TransactionType.MCBVRPX;
		List<RoomPool> rmPools = pgoosManager.getRoomPools(hotelacctInfo, killOrRel);
		
		if (hotelacctInfo != null && rmPools != null) {
			for (RoomPool rp : rmPools) {
				if (transactiontype == TransactionType.MCBVRPX) {
					// PGOOS Propagation Relinquish - force set command type as VRPX
					rp.setCmdType(MarshaCommandType.VRPX);
				} else if (transactiontype == TransactionType.MCBVRPK) {
					// PGOOS Propagation Kill - force set command type as VRPK
					rp.setCmdType(MarshaCommandType.VRPK);
				} else {
					// PGOOS Propagation MCB, JOB and Account Specific flow
					if ("Y".equals(rp.getSendvrpe())) {
						// If preferred RPGM and SENDVRPE is Y, set command type as VPRE, OR
						// If GPP RPGM and SENDVRPE_GPP is Y, set command type as VPRE
						rp.setCmdType(MarshaCommandType.VRPE);
					} else if ("Y".equals(rp.getSendvrpx())) {
						// If preferred RPGM and SENDVRPX is Y, set command type as VPRX
						rp.setCmdType(MarshaCommandType.VRPX);
					} else if ("Y".equals(rp.getSendvrpk())) {
						// If preferred RPGM and SENDVRPK is Y, set command type as VPRK/VRPX, OR
						// If GPP RPGM and SENDVRPK_GPP is Y, set command type as VRPK/NONE
						rp.setCmdType(MarshaCommandType.VRPK);
					} else {
						// No matched found, set command type as NONE
						rp.setCmdType(MarshaCommandType.NONE);
					}
				}
			}
		}
		
		return rmPools;
	}

	private void validateRoomPools(List<RoomPool> rmPools, HotelAccountInfo hotelaccountinfo) {
		Map<Long, String> rateErrorCodeRCMap = new HashMap<Long, String>();
		String rateErrorCode = null;
		boolean marketCodeSet = false;
		for (RoomPool rp : rmPools) {
			if (rp.getCmdType() != MarshaCommandType.NONE) {
				if (rp.getRateprog() == null) {
					rp.setStatus("FAIL");
					rp.setErrorcode("10022");
					rp.setErrordesc("Rate Program is Missing");
				} else if (rp.getRateofferid() == null) {
					rp.setStatus("FAIL");
					rp.setErrorcode("10009");
					rp.setErrordesc("Rate Offer Id is missing");
				} else {
					if (rp.getCmdType() == MarshaCommandType.VRPE) {
						if (rp.getRoompool() == null) {
							rp.setStatus("FAIL");
							rp.setErrorcode("10008");
							rp.setErrordesc("Room pool  is missing");
						} else {
							// SWIRM-1971 - Call function only once
							if(!marketCodeSet) {
								Long marketcode = pgoosManager.updateMarketcode(hotelaccountinfo.getHotel_accountinfoid());
								hotelaccountinfo.setMarketCode(marketcode);
								marketCodeSet = true;
							}
							if (!rp.getStatus().equals("HOLD")) {
								if(rateErrorCodeRCMap.containsKey(rp.getRoomClassSeq())) {
									rateErrorCode = rateErrorCodeRCMap.get(rp.getRoomClassSeq());
								}
								validateRoomPoolForVRPE(rp, hotelaccountinfo, rateErrorCode);
								rateErrorCodeRCMap.put(rp.getRoomClassSeq(), rateErrorCode);
							}
						}
					}
				}
			}
		}
	}

	private void validateRoomPoolForVRPE(RoomPool rp, HotelAccountInfo hotelaccountinfo, String rateErrorCode) {

		String status = "PEND";
		String errordesc = "";
		String errorcode = "";

		if (hotelaccountinfo.getCurrencyCode() == null || hotelaccountinfo.getCurrencyCode().equals("")) {
			status = "FAIL";
			errordesc = "Currency for property is missing";
			errorcode = "10002";
		} else if (rp.getLra() != null && rp.getLra().equalsIgnoreCase("P")) {
			status = "FAIL";
			errordesc = "Pricing is missing";
			errorcode = "10003";
		} else if (rp.getLra() == null) {
			status = "FAIL";
			errordesc = "LRA Flag is missing";
			errorcode = "10003";
		} else if (hotelaccountinfo.getCom() == null || hotelaccountinfo.getCom().equals("")) {
			status = "FAIL";
			errordesc = "Commission Flag is missing";
			errorcode = "10004";
		} else if (hotelaccountinfo.getBreakfast() == null || hotelaccountinfo.getBreakfast().equals("")) {
			status = "FAIL";
			errordesc = "Breakfast flag is missing";
			errorcode = "10006";
		} else if (hotelaccountinfo.getAccProductid() == null || hotelaccountinfo.getAccProductid().equals("")) {
			status = "FAIL";
			errordesc = "Product Code is missing";
			errorcode = "10007";
		} else if (hotelaccountinfo.getDistanceunit() == null || hotelaccountinfo.getDistanceunit().equals("")) {
			status = "FAIL";
			errordesc = "Hotel Distance Unit is missing";
			errorcode = "10017";
		} else if (hotelaccountinfo.getMarketCode() == null || hotelaccountinfo.getMarketCode() < 1) {
			status = "FAIL";
			errordesc = "Market Code is missing";
			errorcode = "10005";
		}

		if (status.equals("PEND") && !hotelaccountinfo.getIsFloatingRate()) {
			if (null == rateErrorCode)
				rateErrorCode = pgoosManager.verifyData(hotelaccountinfo, hotelaccountinfo.getIslos(), rp.getRoomClassSeq());
			errorcode = rateErrorCode;
			if (!errorcode.equals("0")) {
				status = "FAIL";
				if (errorcode.equals("10015")) {
					errordesc = "Seasons Missing Error";
				} else if (errorcode.equals("10016")) {
					errordesc = "Seasons Not Contiguous";
				} else if (errorcode.equals("10011")) {
					errordesc = "Seasons or Tiers Error";
				} else if (errorcode.equals("10014")) {
					errordesc = "Rate Missing Error";
				} else if (errorcode.equals("10012")) {
					errordesc = "Low Rate Error";
				} else if (errorcode.equals("10013")) {
					errordesc = "Currency Decimal Error";
				} else {
					errordesc = "Other: code-" + errorcode;
				}
			}
		}

		rp.setStatus(status);
		rp.setErrorcode(errorcode);
		rp.setErrordesc(errordesc);
	}

	private void getVRPERules(HotelAccountInfo ha, RoomPool rp, List<PricingRule> prefpricingrules, List<PricingRule> gpppricingrules, List<Season> blackOutSeaons) {		

		if (rp.getIs_aer_rpgm().equals("Y") || ha.getRatetype_selected() == 20) {
			rp.setPricingrule(PricingRuleType.PERCENT_BELOW.value());
			rp.setDiscount(ha.getPercentdiscount());
			if (ha.getIslos().equals("Y")) {
				rp.setMirrorall("Y");
				if (ha.getDiscfirsttieronly().equals("Y")) {
					rp.setCeilingrule(CeilingRuleType.PERCENT_BELOW.value());
					rp.setPricingRules(gpppricingrules);
				} else {
					List<PricingRule> pricingRules = new ArrayList<PricingRule>();
					PricingRule pr = new PricingRule();
					pr.setSeasonId(1L);
					pr.setStartDate(ha.getStartdate());
					pr.setEndDate(ha.getContractend());
					pr.setPricingAmount(ha.getPercentdiscount());
					pr.setCeilingAmount(null);
					pr.setTierNumber(1L);
					pr.setStartNights(1L);
					pr.setEndNights(999L);
					pricingRules.add(pr);
					rp.setPricingRules(pricingRules);
				}
			} else {
				List<PricingRule> pricingRules = new ArrayList<PricingRule>();
				for (OccupancyType type : OccupancyType.values()) {
					PricingRule pr = new PricingRule();
					pr.setSeasonId(1L);
					pr.setStartDate(ha.getStartdate());
					pr.setEndDate(ha.getContractend());
					pr.setPricingAmount(ha.getPercentdiscount());
					pr.setCeilingAmount(null);
					pr.setOccupancy(type.value());
					pricingRules.add(pr);
				}
				rp.setPricingRules(pricingRules);
			}

		} else {
			rp.setMirrorall("N");
			if (ha.getBreakfast().equals("Y")) {
				rp.setPricingrule(PricingRuleType.FIXED.value());
			} else {
				if (ha.getIslos().equals("Y")) {
					rp.setPricingrule(PricingRuleType.FIXED.value());
					rp.setCeilingrule(CeilingRuleType.BT_SPECIAL_RULE.value());
				} else {
					rp.setPricingrule(PricingRuleType.PERCENT_BELOW.value());
					rp.setCeilingrule(CeilingRuleType.FIXED.value());
					rp.setDiscount(0.0);
				}
			}
			rp.setPricingRules(prefpricingrules);
		}
		rp.setBlackOutSeaons(blackOutSeaons);
	}

	public void publishHotels(Long batchid, Long hotelid, User user) {
		List<HotelsToPublish> htp = pgoosManager.getRecordsToPublish(batchid, hotelid);
		if (htp != null && htp.size() > 0) { // if there are no hotels to
											 // publish, don't bother sending
											 // this message.
			String urlForBTService = pgoosManager.getBTtoHPPServiceUrl();
			List<PublishHotelResponse> phr = publishService.publishHotels(htp, user.getEid(), urlForBTService);
			pgoosManager.updatePublishHotel(phr, batchid);
		}
	}

	public McbStatus getMcbStatus(Long batchId) {
		McbStatus mcbStatus = pgoosSetupManager.getMCBStatus(batchId);
		return mcbStatus;
	}

}