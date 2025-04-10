package com.marriott.rfp.business.hpp.impl.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.xml.bind.JAXBException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.xml.sax.SAXException;

import com.marriott.rfp.object.pgoos.AccountInfo;
import com.marriott.rfp.object.pgoos.CeilingRuleType;
import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.PricingRule;
import com.marriott.rfp.object.pgoos.PricingRuleType;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.PublishResponse;
import com.marriott.rfp.object.pgoos.RoomPool;
import com.marriott.rfp.object.pgoos.Season;
import com.marriott.rfp.utility.BooleanUtility;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.JAXBUtilities;
import com.marriott.rfp.webservice.hpp.btrates.AdjustmentRuleType;
import com.marriott.rfp.webservice.hpp.btrates.AttributesType;
import com.marriott.rfp.webservice.hpp.btrates.AvailabilityResponseList;
import com.marriott.rfp.webservice.hpp.btrates.AvailabilityResponseType;
import com.marriott.rfp.webservice.hpp.btrates.BTPublishRequest;
import com.marriott.rfp.webservice.hpp.btrates.BTPublishResponse;
import com.marriott.rfp.webservice.hpp.btrates.BTRateStatusType;
import com.marriott.rfp.webservice.hpp.btrates.BTRatesRequest;
import com.marriott.rfp.webservice.hpp.btrates.BTRatesResponse;
import com.marriott.rfp.webservice.hpp.btrates.BtPricingRuleType;
import com.marriott.rfp.webservice.hpp.btrates.BtRuleLosType;
import com.marriott.rfp.webservice.hpp.btrates.DateRangeType;
import com.marriott.rfp.webservice.hpp.btrates.DistanceType;
import com.marriott.rfp.webservice.hpp.btrates.ErrorList;
import com.marriott.rfp.webservice.hpp.btrates.ErrorType;
import com.marriott.rfp.webservice.hpp.btrates.ICDListType;
import com.marriott.rfp.webservice.hpp.btrates.ICDType;
import com.marriott.rfp.webservice.hpp.btrates.KillRateEntityListType;
import com.marriott.rfp.webservice.hpp.btrates.KillRateEntityType;
import com.marriott.rfp.webservice.hpp.btrates.KnownRateEntityIdType;
import com.marriott.rfp.webservice.hpp.btrates.MirrorAvailabilityListType;
import com.marriott.rfp.webservice.hpp.btrates.MirrorAvailabilityType;
import com.marriott.rfp.webservice.hpp.btrates.MirroringType;
import com.marriott.rfp.webservice.hpp.btrates.ParentRateOfferResponseType;
import com.marriott.rfp.webservice.hpp.btrates.PricingParentType;
import com.marriott.rfp.webservice.hpp.btrates.PricingResponseListType;
import com.marriott.rfp.webservice.hpp.btrates.PricingResponseType;
import com.marriott.rfp.webservice.hpp.btrates.PricingRuleListType;
import com.marriott.rfp.webservice.hpp.btrates.PropertyCodeListType;
import com.marriott.rfp.webservice.hpp.btrates.PropertyPublishResponseType;
import com.marriott.rfp.webservice.hpp.btrates.RateEntityListType;
import com.marriott.rfp.webservice.hpp.btrates.RateEntityType;
import com.marriott.rfp.webservice.hpp.btrates.RateProgramBTTransactionIDListType;
import com.marriott.rfp.webservice.hpp.btrates.RelinquishRateEntityListType;
import com.marriott.rfp.webservice.hpp.btrates.RelinquishRateEntityType;
import com.marriott.rfp.webservice.hpp.btrates.RuleType;
import com.marriott.rfp.webservice.hpp.btrates.UnknownRateEntityIdType;
import com.marriott.rfp.webservice.hpp.btrates.WarningList;
import com.marriott.rfp.webservice.hpp.btrates.WarningType;

public class PGOOSUtils {

	private static final String SYSTEM_ERROR_CODE = "90000";
	private static final String SYSTEM_ERROR = "SYSTEM";
	private static final String FAILED_STATUS = "FAIL";

	private enum MirrorType {
		AVAILABILITY_MIRROR, CAPS_AND_RESTRICTION_MIRROR, PRICING_MIRROR, CEILING_MIRROR;
	};

	public static List<PublishResponse> parseHppResponse (String message) throws JAXBException, ParserConfigurationException, SAXException {

		BTRatesResponse response = JAXBUtilities.parseXml(message, BTRatesResponse.class);

		return convertFromBTRatesResponse(response);
	}

	public static BTRatesRequest convertToBTRatesRequest(HotelAccountInfo hotelAccount, Boolean holdPublish, String byPeriod, List<RoomPool> rateProgramList) {

		BTRatesRequest btRateRequest = new BTRatesRequest();
		btRateRequest.setEID(hotelAccount.getEid());
		btRateRequest.setPropertyCode(hotelAccount.getMarshacode());
		btRateRequest.setProcessId(hotelAccount.getProcessid());
		if (holdPublish != null)
			btRateRequest.setHoldPublish(holdPublish);

		RateEntityListType rateEntityListType = null;
		List<RateEntityType> rateEntityTypeList = null;
		KillRateEntityListType killRateEntityListType = null;
		List<KillRateEntityType> killRateEntityTypeList = null;
		RelinquishRateEntityListType relinquishRateEntityListType = null;
		List<RelinquishRateEntityType> relinquishRateEntityTypeList = null;

		List<RoomPool> rateProgramInfos = rateProgramList;
		for (RoomPool rateProgramInfo : rateProgramInfos) {
			if (rateProgramInfo.getStatus().equals("PEND")) {
				switch (rateProgramInfo.getCmdType()) {
				case VRPE:
					if (rateEntityListType == null) {
						rateEntityListType = new RateEntityListType();
						rateEntityTypeList = rateEntityListType.getRateEntity();
					}

					rateEntityTypeList.add(convertToRateEntityType(hotelAccount, rateProgramInfo));
					break;
				case VRPX:
					if (relinquishRateEntityListType == null) {
						relinquishRateEntityListType = new RelinquishRateEntityListType();
						relinquishRateEntityTypeList = relinquishRateEntityListType.getRelinquishRateEntity();
					}

					relinquishRateEntityTypeList.add(convertToRelinquishRateEntityType(hotelAccount, rateProgramInfo, byPeriod));
					break;
				case VRPK:
					if (killRateEntityListType == null) {
						killRateEntityListType = new KillRateEntityListType();
						killRateEntityTypeList = killRateEntityListType.getKillRateEntity();
					}

					killRateEntityTypeList.add(convertToKillRateEntityType(hotelAccount, rateProgramInfo));
					break;
				}
			}
		}

		btRateRequest.setSendRateEntityList(rateEntityListType);
		btRateRequest.setRelinquishRateEntityList(relinquishRateEntityListType);
		btRateRequest.setKillRateEntityList(killRateEntityListType);
		return btRateRequest;
	}

	private static RateEntityType convertToRateEntityType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {

		RateEntityType rateEntityType = new RateEntityType();
		rateEntityType.setTransactionId(rateProgramInfo.getTransactionid());
		rateEntityType.setCurrencyCode(ObjectUtils.toString(hotelAccount.getCurrencyCode()));

		DateRangeType dateRange = new DateRangeType();
		dateRange.setStartDate(JAXBUtilities.asXMLGregorianCalendar(hotelAccount.getStartdate()));
		dateRange.setEndDate(JAXBUtilities.asXMLGregorianCalendar(hotelAccount.getContractend()));
		rateEntityType.setTransactionDateRange(dateRange);

		rateEntityType.setRateOfferId(rateProgramInfo.getRateofferid());
		rateEntityType.setRateProgram(rateProgramInfo.getRateprog());
		rateEntityType.setProductCode(hotelAccount.getAccProductid());
		rateEntityType.setAccountName(hotelAccount.getAccountName());
		if (hotelAccount.getDistanceunit() != null && hotelAccount.getDistance() != null) {
			rateEntityType.setDistanceToLocalOfficeUnit(DistanceType.fromValue(hotelAccount.getDistanceunit().toLowerCase()));
			rateEntityType.setDistanceToLocalOffice(BigDecimal.valueOf(hotelAccount.getDistance()));
		}

		// Blackout
		ICDListType icdListType = convertToICDListType(rateProgramInfo.getBlackOutSeaons());
		rateEntityType.setBlackoutDatesList(icdListType);

		rateEntityType.setLRAFlag(BooleanUtility.fromYesNoStr(rateProgramInfo.getLra()));
		rateEntityType.setYearMinusYFlag(BooleanUtility.fromYesNoStr(hotelAccount.getYearMinusY()));

		// Attributes
		AttributesType attribType = convertToAttributesType(hotelAccount, rateProgramInfo.getRoompool());
		rateEntityType.setAttributesInfo(attribType);

		// Availability
		MirrorAvailabilityListType availListType = convertToAvailabilityList(hotelAccount, rateProgramInfo);
		rateEntityType.setAvailabilityList(availListType);

		// Restrictions
		MirroringType crType = convertToCapsAndRestrictionsInfo(hotelAccount, rateProgramInfo);
		rateEntityType.setCapsAndRestrictionsInfo(crType);

		// Pricing Rules
		PricingRuleListType pricingRuleList = convertToPricingRuleList(hotelAccount, rateProgramInfo);
		rateEntityType.setPricingRuleList(pricingRuleList);
		
		//Cancellation Policy
		//if (hotelAccount.getExtendcancelpolicy() != null && hotelAccount.getExtendcancelpolicy().equals("Y") && acctInfo.getAltcancelpolicytime() != null && hotelAccount.getSelected() != null && hotelAccount.getSelected().equals("Y") && hotelAccount.getRatetype_selected() != null && hotelAccount.getRatetype_selected() != 18  )
		//rateEntityType.setCancellationTime(DateUtility.formatCancellationPolicyTime(acctInfo.getAltcancelpolicytime())); 
		if (hotelAccount.getSelected() != null && hotelAccount.getSelected().equals("Y") && hotelAccount.getRatetype_selected() != null && hotelAccount.getRatetype_selected() != 18  ){
			if (hotelAccount.getAltcancelpolicyoptionid() == 1){
				if (hotelAccount.getExtendcancelpolicy() != null && hotelAccount.getExtendcancelpolicy().equals("Y") && hotelAccount.getAltcancelpolicytime() != null){
					rateEntityType.setCancellationTime(DateUtility.formatCancellationPolicyTime(hotelAccount.getAltcancelpolicytime()));
				}
			}
			if (hotelAccount.getAltcancelpolicyoptionid() == 2){
				if (hotelAccount.getAltcxlpolicytimeid() != null && hotelAccount.getAltcxlpolicytimeid() != 99 && hotelAccount.getAltcxlpolicytimeid() != 0 && hotelAccount.getAltcxlpolicytime() != null){
					rateEntityType.setCancellationTime(DateUtility.formatCancellationPolicyTime(hotelAccount.getAltcxlpolicytime()));
				}
			}
		}
		return rateEntityType;
	}

	private static ICDListType convertToICDListType(List<Season> seasons) {

		if ((seasons == null) || (seasons.size() == 0)) {
			return null;
		}

		ICDListType icdListType = new ICDListType();
		List<ICDType> icdList = icdListType.getICD();

		for (Season season : seasons) {
			ICDType icdType = new ICDType();
			icdType.setStart(JAXBUtilities.asXMLGregorianCalendar(season.getStartDate()));
			icdType.setEnd(JAXBUtilities.asXMLGregorianCalendar(season.getEndDate()));

			icdList.add(icdType);
		}

		return icdListType;
	}

	private static AttributesType convertToAttributesType(HotelAccountInfo hotelAccount, String roompool) {

		AttributesType attribType = new AttributesType();
		attribType.setMarketSegmentCode(hotelAccount.getMarketCode());
		attribType.setRoomPool(roompool);
		attribType.setCommissionableFlag(BooleanUtility.fromYesNoStr(hotelAccount.getCom()));
		return attribType;
	}

	private static MirrorAvailabilityListType convertToAvailabilityList(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {

		MirrorAvailabilityListType availListType = new MirrorAvailabilityListType();
		List<MirrorAvailabilityType> availList = availListType.getAvailability();

		List<PricingRule> pricingRules = rateProgramInfo.getPricingRules();

		Long currentSeason = null;
		for (PricingRule pricingRule : pricingRules) {

			// New season ...
			if (!pricingRule.getSeasonId().equals(currentSeason)) {

				currentSeason = pricingRule.getSeasonId();

				MirroringType mType = convertToMirroringType(hotelAccount, rateProgramInfo, MirrorType.AVAILABILITY_MIRROR);
				if (mType != null) {

					MirrorAvailabilityType availType = new MirrorAvailabilityType();
					availType.setMirrorAvailabilityRule(mType);

					DateRangeType dateRange = new DateRangeType();
					dateRange.setStartDate(JAXBUtilities.asXMLGregorianCalendar(pricingRule.getStartDate()));
					dateRange.setEndDate(JAXBUtilities.asXMLGregorianCalendar(pricingRule.getEndDate()));

					availType.setDateRange(dateRange);

					availList.add(availType);
				}
			}
		}

		return availListType;
	}

	private static PricingParentType convertToPricingMirroringType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {

		PricingParentType mType = null;

		if (rateProgramInfo.getPrice_rateentityid() != null) {
			mType = new PricingParentType();
			KnownRateEntityIdType knownType = new KnownRateEntityIdType();
			knownType.setMirrorRateOfferId(rateProgramInfo.getPrice_mirrorrateofferid());
			knownType.setMirrorRateEntityId(rateProgramInfo.getPrice_rateentityid());
			MirroringType mirrorType = new MirroringType();
			mirrorType.setMirrorInfoWithRateEntityId(knownType);
			mType.setMirrorParent(mirrorType);
		} else if (rateProgramInfo.getPrice_mirrorrateofferid() != null) {
			mType = new PricingParentType();
			UnknownRateEntityIdType unknownType = new UnknownRateEntityIdType();
			unknownType.setMirrorRateOfferId(rateProgramInfo.getPrice_mirrorrateofferid());
			unknownType.setPricingType(rateProgramInfo.getPrice_pricing_type());
			unknownType.setPriorityTag(rateProgramInfo.getPrice_priority_tag());
			unknownType.setRoomPoolCode(rateProgramInfo.getRoompool());
			MirroringType mirrorType = new MirroringType();
			mirrorType.setMirrorInfoWithoutRateEntityId(unknownType);
			mType.setMirrorParent(mirrorType);
		}
		return mType;
	}

	private static PricingParentType convertToCeilingMirroringType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo, PricingRule pricingRule) {
		PricingParentType mType = null;

		if (CeilingRuleType.BT_SPECIAL_RULE.value().equals(rateProgramInfo.getCeilingrule())) {
			if (rateProgramInfo.getPrice_rateentityid() != null) {
				mType = new PricingParentType();
				KnownRateEntityIdType knownType = new KnownRateEntityIdType();
				knownType.setMirrorRateOfferId(rateProgramInfo.getPrice_mirrorrateofferid());
				knownType.setMirrorRateEntityId(rateProgramInfo.getPrice_rateentityid());
				MirroringType mirrorType = new MirroringType();
				mirrorType.setMirrorInfoWithRateEntityId(knownType);
				mType.setMirrorParent(mirrorType);
			} else if (rateProgramInfo.getPrice_mirrorrateofferid() != null) {
				mType = new PricingParentType();
				UnknownRateEntityIdType unknownType = new UnknownRateEntityIdType();
				unknownType.setMirrorRateOfferId(rateProgramInfo.getPrice_mirrorrateofferid());
				unknownType.setPricingType(rateProgramInfo.getPrice_pricing_type());
				unknownType.setPriorityTag(rateProgramInfo.getPrice_priority_tag());
				unknownType.setRoomPoolCode(rateProgramInfo.getRoompool());
				MirroringType mirrorType = new MirroringType();
				mirrorType.setMirrorInfoWithoutRateEntityId(unknownType);
				mType.setMirrorParent(mirrorType);
			}
		} else if (CeilingRuleType.PERCENT_BELOW.value().equals(rateProgramInfo.getCeilingrule()) && hotelAccount.getDiscfirsttieronly().equals("Y")) {
			mType = new PricingParentType();
			mType.setMirrorTier(pricingRule.getCeilingmirrortier());
			mType.setMirrorSelf(pricingRule.getCeilingmirrorself().equals("Y"));
		}

		return mType;
	}

	private static MirroringType convertToMirroringType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo, MirrorType type) {

		MirroringType mType = null;
		switch (type) {

		case AVAILABILITY_MIRROR:
		case CAPS_AND_RESTRICTION_MIRROR: {

			if (rateProgramInfo.getAvail_rateentityid() != null) {
				mType = new MirroringType();
				KnownRateEntityIdType knownType = new KnownRateEntityIdType();
				knownType.setMirrorRateOfferId(rateProgramInfo.getAvail_mirrorrateofferid());
				knownType.setMirrorRateEntityId(rateProgramInfo.getAvail_rateentityid());
				mType.setMirrorInfoWithRateEntityId(knownType);
			} else if (rateProgramInfo.getAvail_mirrorrateofferid() != null) {
				mType = new MirroringType();
				UnknownRateEntityIdType unknownType = new UnknownRateEntityIdType();
				unknownType.setMirrorRateOfferId(rateProgramInfo.getAvail_mirrorrateofferid());
				unknownType.setPricingType(rateProgramInfo.getAvail_pricing_type());
				unknownType.setPriorityTag(rateProgramInfo.getAvail_priority_tag());
				unknownType.setRoomPoolCode(rateProgramInfo.getRoompool());
				mType.setMirrorInfoWithoutRateEntityId(unknownType);
			}
		}
			break;
		}

		return mType;
	}

	private static MirroringType convertToCapsAndRestrictionsInfo(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {
		MirroringType mType = convertToMirroringType(hotelAccount, rateProgramInfo, MirrorType.CAPS_AND_RESTRICTION_MIRROR);
		return mType;
	}

	private static PricingRuleListType convertToPricingRuleList(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {

		PricingRuleListType pricingRuleListType = new PricingRuleListType();
		List<BtPricingRuleType> pricingRuleTypeList = pricingRuleListType.getPricingRule();

		List<PricingRule> pricingRules = rateProgramInfo.getPricingRules();

		Long currentSeason = null;
		BtPricingRuleType pricingRuleType = null;
		for (PricingRule pricingRule : pricingRules) {

			// New season ...
			if (!pricingRule.getSeasonId().equals(currentSeason)) {
				pricingRuleType = new BtPricingRuleType();
				pricingRuleTypeList.add(pricingRuleType);

				DateRangeType dateRangeType = new DateRangeType();
				dateRangeType.setStartDate(JAXBUtilities.asXMLGregorianCalendar(pricingRule.getStartDate()));
				dateRangeType.setEndDate(JAXBUtilities.asXMLGregorianCalendar(pricingRule.getEndDate()));
				pricingRuleType.setDateRange(dateRangeType);

				currentSeason = pricingRule.getSeasonId();
			}

			List<BtRuleLosType> btRuleLosTypeList = pricingRuleType.getBtRuleList();
			BtRuleLosType btRuleLosType = new BtRuleLosType();
			btRuleLosTypeList.add(btRuleLosType);

			// Pricing
			RuleType pRuleType = new RuleType();
			pRuleType.setRuleID(NumberUtils.toInt(rateProgramInfo.getPricingrule(), -1));
			if (pricingRule.getPricingAmount() != null) {
				pRuleType.setAmount(BigDecimal.valueOf(pricingRule.getPricingAmount()));
			}
			btRuleLosType.setRuleInfo(pRuleType);
			if (rateProgramInfo.getPricingrule() != PricingRuleType.FIXED.value())
				btRuleLosType.setPricingParent(convertToPricingMirroringType(hotelAccount, rateProgramInfo));

			// Ceiling
			if (!(rateProgramInfo.getPricingrule() == PricingRuleType.FIXED.value() && hotelAccount.getBreakfast().equals("Y"))) {
				if (rateProgramInfo.getCeilingrule() != null) {
					if (hotelAccount.getDiscfirsttieronly().equals("N")) {
						AdjustmentRuleType cRuleType = new AdjustmentRuleType();
						cRuleType.setAdjustmentRuleID(NumberUtils.toLong(rateProgramInfo.getCeilingrule(), -1));
						if (pricingRule.getCeilingAmount() != null) {
							cRuleType.setAmount(BigDecimal.valueOf(pricingRule.getCeilingAmount()));
						}
						btRuleLosType.setCeilingRuleInfo(cRuleType);
						btRuleLosType.setCeilingParent(convertToCeilingMirroringType(hotelAccount, rateProgramInfo, pricingRule));
					} else {
						if (pricingRule.getCeilingAmount() != null) {
							AdjustmentRuleType cRuleType = new AdjustmentRuleType();
							cRuleType.setAdjustmentRuleID(NumberUtils.toLong(rateProgramInfo.getCeilingrule(), -1));
							cRuleType.setAmount(BigDecimal.valueOf(pricingRule.getCeilingAmount()));
							btRuleLosType.setCeilingRuleInfo(cRuleType);
							btRuleLosType.setCeilingParent(convertToCeilingMirroringType(hotelAccount, rateProgramInfo, pricingRule));

						}
					}
				}
			}

			// Occupancy or LOS
			if (pricingRule.getOccupancy() != null) {
				btRuleLosType.setOccupancyID(pricingRule.getOccupancy().value());
			} else {

				Boolean doMirrorTierStructure = BooleanUtility.fromYesNoStr(rateProgramInfo.getMirrorall());
				if (Boolean.TRUE.equals(doMirrorTierStructure)) {
					btRuleLosType.setMirrorLOSStructureFlag(doMirrorTierStructure);
					if (hotelAccount.getDiscfirsttieronly().equals("Y"))
						btRuleLosType.setCurrentTierNumber(BigDecimal.valueOf((pricingRule.getTierNumber() != null) ? pricingRule.getTierNumber() : -1));
				} else {
					btRuleLosType.setTierNumber(BigDecimal.valueOf((pricingRule.getTierNumber() != null) ? pricingRule.getTierNumber() : -1));
					btRuleLosType.setStartNight(BigDecimal.valueOf((pricingRule.getStartNights() != null) ? pricingRule.getStartNights() : -1));
					btRuleLosType.setEndNight(BigDecimal.valueOf((pricingRule.getEndNights() != null) ? pricingRule.getEndNights() : -1));
				}
			}
		}

		return pricingRuleListType;
	}

	public static KillRateEntityType convertToKillRateEntityType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo) {
		KillRateEntityType rateEntityType = new KillRateEntityType();
		rateEntityType.setTransactionId(rateProgramInfo.getTransactionid());
		rateEntityType.setRateOfferId(rateProgramInfo.getRateofferid());
		rateEntityType.setRateProgramCode(rateProgramInfo.getRateprog());
		return rateEntityType;
	}

	public static List<PublishResponse> convertFromBTRatesResponse(BTRatesResponse btResponse) {
		List<PublishResponse> responseList = new Vector<PublishResponse>();

		if (btResponse != null) {
			Long processid = btResponse.getProcessId();
			List<BTRateStatusType> btRateStatuses = btResponse.getBTRateStatus();

			for (BTRateStatusType btRateStatus : btRateStatuses) {
				PublishResponse response = new PublishResponse();
				response.setProcessId(processid);
				response.setTransactionId(btRateStatus.getTransactionId());
				response.setRequestType(btRateStatus.getRequestType());
				response.setRateOfferId(btRateStatus.getRateOfferId());
				response.setRateProgramCode(btRateStatus.getRateProgram());
				response.setPropertyRateEntityId(btRateStatus.getPropertyRateEntityId());
				response.setPropertyCode(btRateStatus.getPropertyCode());
				response.setStatus((btRateStatus.getStatus() != null) ? btRateStatus.getStatus().value() : null);
				response.setSource((btRateStatus.getSource() != null) ? btRateStatus.getSource().value() : null);
				response.setLastPublishDate(JAXBUtilities.asDate(btRateStatus.getLastPublishDate()));
				response.setPurgeDate(JAXBUtilities.asDate(btRateStatus.getPurgeDate()));

				// Restrictions
				ParentRateOfferResponseType restrictionsParent = btRateStatus.getCapsAndRestictionsParent();
				if (restrictionsParent != null) {
					response.setRestrictionsParentRateOfferId(restrictionsParent.getParentRateOfferId());
					response.setRestrictionsParentRateOfferName(restrictionsParent.getParentRateOfferName());
					response.setRestrictionsParentRateEntityId(restrictionsParent.getParentRateEntityId());
					response.setRestrictionsParentRateProgram(restrictionsParent.getParentRateEntityRateProgram());
				}

				// Availability
				AvailabilityResponseList availResponseList = btRateStatus.getAvailabilityResponseList();
				if (availResponseList != null) {
					List<AvailabilityResponseType> availResponseType = availResponseList.getAvailabilityResponse();
					if ((availResponseType != null) && (availResponseType.size() > 0)) {
						ParentRateOfferResponseType parentRoResponseType = ((AvailabilityResponseType) availResponseType.get(0)).getAvailabilityParent();
						response.setAvailParentRateOfferId(parentRoResponseType.getParentRateOfferId());
						response.setAvailParentRateOfferName(parentRoResponseType.getParentRateOfferName());
						response.setAvailParentRateEntityId(parentRoResponseType.getParentRateEntityId());
						response.setAvailParentRateProgram(parentRoResponseType.getParentRateEntityRateProgram());
					}
				}

				// Pricing
				PricingResponseListType pricingResponseListType = btRateStatus.getPricingResponseList();
				if (pricingResponseListType != null) {
					List<PricingResponseType> pricingResponseType = pricingResponseListType.getPricingResponse();
					if ((pricingResponseType != null) && (pricingResponseType.size() > 0)) {
						PricingResponseType prType = (PricingResponseType) pricingResponseType.get(0);
						ParentRateOfferResponseType priceParent = prType.getPricingParent();
						if (priceParent != null) {
							response.setPricingParentRateEntityId(priceParent.getParentRateEntityId());
							response.setPricingParentRateOfferId(priceParent.getParentRateOfferId());
							response.setPricingParentRateOfferName(priceParent.getParentRateOfferName());
							response.setPricingParentRateProgram(priceParent.getParentRateEntityRateProgram());
						}
						ParentRateOfferResponseType ceilingParent = prType.getCeilingParent();
						if (ceilingParent != null) {
							response.setCeilingParentRateEntityId(ceilingParent.getParentRateEntityId());
							response.setCeilingParentRateOfferId(ceilingParent.getParentRateOfferId());
							response.setCeilingParentRateOfferName(ceilingParent.getParentRateOfferName());
							response.setCeilingParentRateProgram(ceilingParent.getParentRateEntityRateProgram());
						}
					}
				}

				// Errors
				ErrorList errorList = btRateStatus.getErrorList();
				if (errorList != null) {
					List<ErrorType> errorTypes = errorList.getError();
					ArrayList<String> errorCodeList = new ArrayList<String>();
					ArrayList<String> errorMsgList = new ArrayList<String>();
					for (ErrorType errorType : errorTypes) {
						errorCodeList.add(errorType.getCode());
						errorMsgList.add(errorType.getMessage());
					}
					response.setErrorCodes((String[]) errorCodeList.toArray(new String[0]));
					response.setErrorMsgs((String[]) errorMsgList.toArray(new String[0]));
				}

				// Warnings
				WarningList warningList = btRateStatus.getWarningList();
				if (warningList != null) {
					List<WarningType> warningTypes = warningList.getWarning();
					ArrayList<String> warningCodeList = new ArrayList<String>();
					ArrayList<String> warningMsgList = new ArrayList<String>();
					for (WarningType warningType : warningTypes) {
						warningCodeList.add(warningType.getCode());
						warningMsgList.add(warningType.getMessage());
					}
					response.setWarningCodes((String[]) warningCodeList.toArray(new String[0]));
					response.setWarningMsgs((String[]) warningMsgList.toArray(new String[0]));
				}
				responseList.add(response);
			}
		}

		return responseList;
	}

	private static RelinquishRateEntityType convertToRelinquishRateEntityType(HotelAccountInfo hotelAccount, RoomPool rateProgramInfo, String byPeriod) {

		RelinquishRateEntityType rateEntityType = new RelinquishRateEntityType();

		rateEntityType.setTransactionId(rateProgramInfo.getTransactionid());
		rateEntityType.setRateProgramCode(rateProgramInfo.getRateprog());

		rateEntityType.setRateOfferId(rateProgramInfo.getRateofferid());

		if ((byPeriod == null || byPeriod.equals("Y")) && ((hotelAccount.getContractend() != null) && (hotelAccount.getContractend() != null))) {
			DateRangeType dateRangeType = new DateRangeType();
			dateRangeType.setStartDate(JAXBUtilities.asXMLGregorianCalendar(hotelAccount.getStartdate()));
			dateRangeType.setEndDate(JAXBUtilities.asXMLGregorianCalendar(hotelAccount.getContractend()));
			rateEntityType.setDateRange(dateRangeType);
		}

		return rateEntityType;
	}

	public static List<PublishResponse> convertFromFaultMessage_Exception(Exception fme, BTRatesRequest btRateRequest) {
		List<PublishResponse> responseList = new Vector<PublishResponse>();
		Long processid = btRateRequest.getProcessId();
		RateEntityListType rateEntityListType = btRateRequest.getSendRateEntityList();
		if (rateEntityListType != null) {
			List<RateEntityType> rateEntityTypes = rateEntityListType.getRateEntity();

			if ((rateEntityTypes != null) && (rateEntityTypes.size() > 0)) {
				for (RateEntityType rateEntityType : rateEntityTypes) {
					PublishResponse response = new PublishResponse();
					response.setProcessId(processid);
					response.setTransactionId(rateEntityType.getTransactionId());
					response.setRateOfferId(rateEntityType.getRateOfferId());
					response.setRateProgramCode(rateEntityType.getRateProgram());
					response.setPropertyRateEntityId(rateEntityType.getPropertyRateEntityId());
					response.setPropertyCode(btRateRequest.getPropertyCode());
					response.setStatus(FAILED_STATUS);
					response.setSource(SYSTEM_ERROR);
					response.setErrorCodes(new String[] { SYSTEM_ERROR_CODE });
					response.setErrorMsgs(new String[] { fme.getMessage() });
					responseList.add(response);
				}
			}
		}

		RelinquishRateEntityListType rrateEntityListType = btRateRequest.getRelinquishRateEntityList();
		if (rrateEntityListType != null) {
			List<RelinquishRateEntityType> rrateEntityTypes = rrateEntityListType.getRelinquishRateEntity();

			if ((rrateEntityTypes != null) && (rrateEntityTypes.size() > 0)) {
				for (RelinquishRateEntityType rateEntityType : rrateEntityTypes) {
					PublishResponse response = new PublishResponse();
					response.setProcessId(processid);
					response.setTransactionId(rateEntityType.getTransactionId());
					response.setRateOfferId(rateEntityType.getRateOfferId());
					response.setRateProgramCode(rateEntityType.getRateProgramCode());
					response.setPropertyRateEntityId(rateEntityType.getPropertyRateEntityId());
					response.setPropertyCode(btRateRequest.getPropertyCode());
					response.setStatus(FAILED_STATUS);
					response.setSource(SYSTEM_ERROR);
					response.setErrorCodes(new String[] { SYSTEM_ERROR_CODE });
					response.setErrorMsgs(new String[] { fme.getMessage() });
					responseList.add(response);
				}
			}
		}

		KillRateEntityListType krateEntityListType = btRateRequest.getKillRateEntityList();
		if (krateEntityListType != null) {
			List<KillRateEntityType> krateEntityTypes = krateEntityListType.getKillRateEntity();

			if ((krateEntityTypes != null) && (krateEntityTypes.size() > 0)) {
				for (KillRateEntityType rateEntityType : krateEntityTypes) {
					PublishResponse response = new PublishResponse();
					response.setProcessId(processid);
					response.setTransactionId(rateEntityType.getTransactionId());
					response.setRateOfferId(rateEntityType.getRateOfferId());
					response.setRateProgramCode(rateEntityType.getRateProgramCode());
					response.setPropertyRateEntityId(rateEntityType.getPropertyRateEntityId());
					response.setPropertyCode(btRateRequest.getPropertyCode());
					response.setStatus(FAILED_STATUS);
					response.setSource(SYSTEM_ERROR);
					response.setErrorCodes(new String[] { SYSTEM_ERROR_CODE });
					response.setErrorMsgs(new String[] { fme.getMessage() });
					responseList.add(response);
				}
			}
		}

		return responseList;
	}

	public static String toXML(Object parameter) {

		String xml = null;

		try {
			xml = JAXBUtilities.generateXml(parameter);
		} catch (Exception e) {
		}

		return xml;
	}

	public static BTPublishRequest convertToBTPublishRequest(List<HotelsToPublish> hotellist, String eid) {

		BTPublishRequest btpublishRequest = new BTPublishRequest();
		btpublishRequest.setEID(eid);
		List<PropertyCodeListType> propertyCodeList = btpublishRequest.getPropertyCodeList();
		Long currenthotelid = null;
		PropertyCodeListType propertyCodeListType = null;
		RateProgramBTTransactionIDListType rateProgramBTTransactionIDListType = null;
		List<RateProgramBTTransactionIDListType> rateprogramlist = null;
		for (HotelsToPublish htp : hotellist) {
			if (currenthotelid == null || currenthotelid.longValue() != htp.getHotelid().longValue()) {
				if (propertyCodeListType != null)
					propertyCodeList.add(propertyCodeListType);
				currenthotelid = htp.getHotelid();
				propertyCodeListType = new PropertyCodeListType();
				propertyCodeListType.setPropertyId(htp.getHotelid());
				rateprogramlist = propertyCodeListType.getRateProgramBTTransactionIDList();
			}
			rateProgramBTTransactionIDListType = new RateProgramBTTransactionIDListType();
			rateProgramBTTransactionIDListType.setBTTransactionId(htp.getTransactionid());
			rateProgramBTTransactionIDListType.setRateProgram(htp.getRpgm());
			rateprogramlist.add(rateProgramBTTransactionIDListType);
		}
		if (propertyCodeListType != null)
			propertyCodeList.add(propertyCodeListType);

		return btpublishRequest;
	}

	public static List<PublishHotelResponse> convertFromBTPublishResponse(BTPublishResponse btResponse) {
		List<PublishHotelResponse> responseList = new Vector<PublishHotelResponse>();

		if (btResponse != null) {
			List<PropertyPublishResponseType> propertyPublishList = btResponse.getPropertyPublishResponse();

			for (PropertyPublishResponseType propertyPublish : propertyPublishList) {
				PublishHotelResponse response = new PublishHotelResponse();
				response.setHotelid(propertyPublish.getPropertyId());
				response.setStatus((propertyPublish.getStatus() != null) ? propertyPublish.getStatus().value() : null);
				response.setSource((propertyPublish.getSource() != null) ? propertyPublish.getSource().value() : null);

				// Errors
				ErrorList errorList = propertyPublish.getErrorList();
				if (errorList != null) {
					List<ErrorType> errorTypes = errorList.getError();
					ArrayList<String> errorCodeList = new ArrayList<String>();
					ArrayList<String> errorMsgList = new ArrayList<String>();
					for (ErrorType errorType : errorTypes) {
						errorCodeList.add(errorType.getCode());
						errorMsgList.add(errorType.getMessage());
					}
					response.setErrorCodes((String[]) errorCodeList.toArray(new String[0]));
					response.setErrorMsgs((String[]) errorMsgList.toArray(new String[0]));
				}

			}
		}

		return responseList;
	}

	public static List<PublishHotelResponse> convertFromFaultMessage_Exception(Exception fme, BTPublishRequest btpublishRequest) {
		List<PublishHotelResponse> responseList = new Vector<PublishHotelResponse>();

		List<PropertyCodeListType> propertyCodeList = btpublishRequest.getPropertyCodeList();

		if ((propertyCodeList != null) && (propertyCodeList.size() > 0)) {
			for (PropertyCodeListType propertyCodeListType : propertyCodeList) {
				PublishHotelResponse response = new PublishHotelResponse();
				response.setHotelid(propertyCodeListType.getPropertyId());
				response.setStatus(FAILED_STATUS);
				response.setSource(SYSTEM_ERROR);
				response.setErrorCodes(new String[] { SYSTEM_ERROR_CODE });
				response.setErrorMsgs(new String[] { fme.getMessage() });
				responseList.add(response);
			}
		}

		return responseList;
	}

}
