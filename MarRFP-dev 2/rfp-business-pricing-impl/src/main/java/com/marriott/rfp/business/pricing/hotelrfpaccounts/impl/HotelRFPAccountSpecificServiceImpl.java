package com.marriott.rfp.business.pricing.hotelrfpaccounts.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pgoos.admin.api.PgoosPropagateProductService;
import com.marriott.rfp.business.pgoos.api.PGOOSPublishService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataacess.pgoos.api.PGOOSSetupManager;
import com.marriott.rfp.dataacess.pricing.alternateCancPolicy.api.AlternateCancPolicyManager;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountBlackoutManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountCenterManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountEligibilityAmenityManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountFacilityManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountLOSManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountQuickAuditManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountRatesManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountRulesManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSeasonManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSpecInfoManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountSpecQuestionsManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelGeneralRatesManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPLOSManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPSeasonManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRateTypeManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.RejectionReasonManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.RemovalReasonManager;
import com.marriott.rfp.object.pricing.hotelrfp.AccountBlackoutGroup;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfoQuestionStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAccountFlags;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBlackoutData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificDataUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificPGOOSData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRPData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebid;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebidViewInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolDataDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificViewInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountname;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelLRA_NLRA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRateIncludes;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditCancelInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditInfo;
import  com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRuleData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRulesInfo;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.hotelrfp.RemovalReason;
import com.marriott.rfp.object.pricing.hotelrfp.RoomTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;
import com.marriott.rfp.object.pricing.account.AlternateCancPolicy;
/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPAccountSpecificServiceImpl implements HotelRFPAccountSpecificService {

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;

	@Autowired
	HotelAccountSpecQuestionsManager hotelAccountSpecQuestionsMgr = null;

	@Autowired
	HotelAccountSpecInfoManager hotelAccountSpecInfoMgr = null;

	@Autowired
	HotelRateTypeManager ratetypeMgr = null;

	@Autowired
	HotelGeneralRatesManager generalRateMgr = null;

	@Autowired
	HotelAccountRatesManager accountRateMgr = null;

	@Autowired
	HotelAccountRulesManager accountRuleMgr = null;

	@Autowired
	HotelRFPSeasonManager hotelSeasonMgr = null;

	@Autowired
	HotelAccountSeasonManager accountSeasonMgr = null;

	@Autowired
	HotelRFPLOSManager hotelLOSMgr = null;

	@Autowired
	HotelAccountLOSManager accountLOSMgr = null;

	@Autowired
	HotelAccountEligibilityAmenityManager eligibilityMgr = null;

	@Autowired
	HotelAccountBlackoutManager blackoutMgr = null;

	@Autowired
	HotelAccountFacilityManager facilityMgr = null;

	@Autowired
	private RFPConstantsManager rfpConstantsMgr = null;

	@Autowired
	private RemovalReasonManager removalReasonMgr = null;

	@Autowired
	private RejectionReasonManager rejectionReasonMgr = null;

	@Autowired
	HotelAccountCenterManager accountcenterMgr = null;

	@Autowired
	HotelAccountQuickAuditManager accountQuickAuditMgr = null;

	@Autowired
	private PGOOSPublishService pgoosPublishService;

	@Autowired
	private PgoosPropagateProductService pgoosPropagateProductService;

	@Autowired
	private PGOOSSetupManager pgoosSetupMgr = null;
	
	@Autowired
	private AlternateCancPolicyManager alternateCancPolicyManager = null;
	

	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetail(long hotel_accountinfoid, User user) {
		List<HotelAccountSpecQandA> haquest = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsDetail(hotel_accountinfoid);
		//Long rateType = hotelAccountSpecQuestionsMgr.getHotelAccountProductInfo(hotel_accountinfoid);
		boolean isEditable = true;
		//Long noBidRateType = 17L;
		if (haquest != null && haquest.size() > 0) {
			HotelAccountInfoQuestionStatus haqstatus = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsModifiable(hotel_accountinfoid);
			for (int i = 0; i < haquest.size(); i++) {
				HotelAccountSpecQandA haq = haquest.get(i);
				isEditable = true;
				//if(rateType == noBidRateType)
				//	isEditable = false;
				if (user.getIsReadOnly())
					isEditable = false;
				else if (user.getIsPASAdmin() || user.getIsAnySalesUser())
					isEditable = true;
				else if (haqstatus.getAnswersModifiable().equals("Y"))
					isEditable = true;
				else if (haqstatus.getLocked().equals("Y") && haq.getAnswer() != null && !haq.getAnswer().equals(""))
					isEditable = false;
				haq.setEditable(isEditable);
			}

		}
		return haquest;
	}

	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetail(long hotel_accountinfoid, User user) {
		List<HotelAccountSpecQandA> haquest = hotelAccountSpecQuestionsMgr.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid);
		boolean isEditable = true;
		if (haquest != null && haquest.size() > 0) {
			HotelAccountInfoQuestionStatus haqstatus = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsModifiable(hotel_accountinfoid);
			for (int i = 0; i < haquest.size(); i++) {
				HotelAccountSpecQandA haq = haquest.get(i);
				isEditable = true;
				if (user.getIsReadOnly())
					isEditable = false;
				else if (user.getIsPASAdmin() || user.getIsAnySalesUser())
					isEditable = true;
				else if (haqstatus.getAnswersModifiable().equals("Y"))
					isEditable = true;
				else if (haqstatus.getLocked().equals("Y") && haq.getAnswer() != null && !haq.getAnswer().equals(""))
					isEditable = false;
				haq.setEditable(isEditable);
			}

		}
		return haquest;
	}

	public void updateAccountSpecificAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, List<HotelAccountSpecQandA> groupanswerList, User user) {
		updateAccountSpecificAnswers(hotel_accountinfoid, answerList, user);
		updateAccountSpecificGroupAnswers(hotel_accountinfoid, groupanswerList, user);
		HotelAccountInfo hai = hotelAccountSpecInfoMgr.getHotelAccountInfo(hotel_accountinfoid);
		hotelMenuMgr.update(hai.getHotelrfpid(), 15, hai.getAccountrecid(), "", "C", user, "Y", "N");

	}

	public void updateAccountSpecificAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user) {
		if (answerList != null) {
			hotelAccountSpecQuestionsMgr.updateAccountSpecAnswers(hotel_accountinfoid, answerList, user);
		}
	}

	public void updateAccountSpecificGroupAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> groupanswerList, User user) {
		if (groupanswerList != null) {
			hotelAccountSpecQuestionsMgr.updateAccountSpecGroupAnswers(hotel_accountinfoid, groupanswerList, user);
		}
	}

	public HotelAccountSpecificStatusData findHotelAccountStatusTabSpecific(long hotel_accountinfoid) {
		HotelAccountSpecificStatusData hotelAccountSpecific = new HotelAccountSpecificStatusData();
		HotelAccountSpecificAccountFlags accountflags = hotelAccountSpecInfoMgr.findAccountSpecStatus(hotel_accountinfoid);
		hotelAccountSpecific.setHotelAccountSpecificAccountFlags(accountflags);
		Contact sales = hotelAccountSpecInfoMgr.findSalesContact(hotel_accountinfoid);
		hotelAccountSpecific.setSalesContact(sales);

		return hotelAccountSpecific;
	}

	public void updateAccountSpecificStatusTab(long hotel_accountinfoid, HotelAccountSpecificStatusData hasdu, User user) {
		hotelAccountSpecInfoMgr.updateAccountFlags(hotel_accountinfoid, hasdu.getIsAccepted(), hasdu.getHotelAccountSpecificAccountFlags(), user);

		facilityMgr.updateSalesInfo(hotel_accountinfoid, hasdu.getSalesContact(), user);

	}

	public HotelAccountSpecificRebid findHotelAccountRebidTabSpecific(long hotel_accountinfoid) {

		HotelAccountSpecificRebid hotelAccountSpecific = hotelAccountSpecInfoMgr.findAccountSpecificRebid(hotel_accountinfoid);
		HotelAccountSpecificRebidViewInfo hotelAccountSpecificViewInfo = new HotelAccountSpecificRebidViewInfo();
		findRebidViewInfo(hotelAccountSpecific, hotelAccountSpecificViewInfo);
		hotelAccountSpecific.setHasRebidViewInfo(hotelAccountSpecificViewInfo);
		return hotelAccountSpecific;
	}

	public void updateAccountSpecificRebid(long hotel_accountinfoid, HotelAccountSpecificRebid hasd, User user) {
		hotelAccountSpecInfoMgr.updateRebidStatus(hotel_accountinfoid, hasd.getRebidRound(), hasd.getRebidstatus(), hasd.getRebid_notes(), user);
	}

	public HotelAccountSpecificFacility findHotelAccountFacilityTabSpecific(long hotel_accountinfoid, Long hotelid, Long accountid) {
		HotelAccountSpecificFacility hasf = hotelAccountSpecInfoMgr.findAccountSpecificFacility(hotel_accountinfoid);
		findCanFindFacilities(hasf, hotelid, accountid);
		//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
		findPropertyDistanceUnit(hasf, hotelid, accountid);
		//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
		return hasf;
	}

	public void updateAccountSpecificFacility(long hotel_accountinfoid, HotelAccountSpecificFacility hasdu, User user) {
		facilityMgr.updateFacilityInfo(hotel_accountinfoid, hasdu, user);
	}

	public HotelAccountSpecificBlackoutData findHotelAccountBlackTabSpecific(long hotel_accountinfoid, String isLocked, User user) {
		HotelAccountSpecificBlackoutData hotelAccountSpecific = new HotelAccountSpecificBlackoutData();
		Long maxblackouts = hotelAccountSpecInfoMgr.findMaxBlackouts(hotel_accountinfoid);
		hotelAccountSpecific.setMaxblackouts(maxblackouts);
		List<HotelBlackoutDate> blackouts = blackoutMgr.getBlackouts(hotel_accountinfoid);
		HotelBlackoutDates blackoutdates = new HotelBlackoutDates();
		blackoutdates.setHotelBlackoutDate(blackouts);
		hotelAccountSpecific.setBlackoutdates(blackoutdates);
		String waiveblackouts = blackoutMgr.getWaiveBlackouts(hotel_accountinfoid);
		hotelAccountSpecific.setWaiveblackouts(waiveblackouts);

		long numBlackouts = 0;
		boolean checkNumBlackouts = true;
		if (user.getIsPASorAnySales() || (isLocked.equals("N"))) {
			numBlackouts = rfpConstantsMgr.getMaxBlackouts();
			checkNumBlackouts = false;
		} else {
			if (hotelAccountSpecific.getBlackoutdates() != null && hotelAccountSpecific.getBlackoutdates().getHotelBlackoutDate() != null)
				numBlackouts = hotelAccountSpecific.getBlackoutdates().getHotelBlackoutDate().size();
			else
				numBlackouts = 0;
		}
		hotelAccountSpecific.setCheckNumBlackouts(checkNumBlackouts);
		hotelAccountSpecific.setNumblackouts(numBlackouts);
		return hotelAccountSpecific;
	}

	public void updateAccountSpecificBlackout(long hotel_accountinfoid, String waiveBlackouts, Map<Long, HotelBlackoutDate> hasdu, User user) {
		blackoutMgr.updateAccountBlackouts(hotel_accountinfoid, waiveBlackouts, hasdu, user);
	}

	public HotelAccountSpecificAmenityData findHotelAccountAmenityTabSpecific(long hotel_accountinfoid, long hotelrfpid) {
		HotelAccountSpecificAmenityData hotelAccountSpecific = hotelAccountSpecInfoMgr.findAccountSpecificAmenity(hotel_accountinfoid);
		List<HotelEligibility> eligibility = eligibilityMgr.getEligibility(hotel_accountinfoid);
		List<HotelAmenities> amenities = eligibilityMgr.getAmenities(hotel_accountinfoid, hotelrfpid);
		List<HotelRateIncludes> rateincludes = eligibilityMgr.getRateIncludes(hotel_accountinfoid);
		hotelAccountSpecific.setEligibility(eligibility);
		hotelAccountSpecific.setAmenities(amenities);
		hotelAccountSpecific.setRateincludes(rateincludes);
		long totalAmenities = amenities.size();
		double modRows = totalAmenities % 2;
		long totalRows = Math.round(Math.ceil(totalAmenities / 2));
		if (modRows > 0)
			totalRows = totalRows + 1;
		hotelAccountSpecific.setCountAmenities(totalAmenities);
		hotelAccountSpecific.setTotalAmenitiesRows(totalRows);
		return hotelAccountSpecific;
	}

	public void updateAccountSpecificAmenity(long hotel_accountinfoid, HotelAccountSpecificAmenityData hasdu, User user) {
		boolean updated = false;
		if (hasdu.getEligibility() != null)
			eligibilityMgr.updateEligibilityAmenity(hotel_accountinfoid, hasdu.getEligibility(), user);
		if (hasdu.getAmenities() != null)
			eligibilityMgr.updateAmenity(hotel_accountinfoid, hasdu.getAmenities(), user);
		if (hasdu.getRateincludes() != null)
			updated = eligibilityMgr.updateRateIncludes(hotel_accountinfoid, hasdu.getRateincludes(), user);
		if (hasdu.getBreakfast_rule() != null)
			accountRuleMgr.updateRule(hotel_accountinfoid, null, "3", hasdu.getBreakfast_rule(), user, updated);
		accountQuickAuditMgr.updateQuickAuditAmenities(hotel_accountinfoid, user);
	}

	public HotelAccountSpecificBusinessCase findHotelAccountCompelTabSpecific(long hotel_accountinfoid) {
		return hotelAccountSpecInfoMgr.findAccountSpecBusinessCase(hotel_accountinfoid);
	}

	public void updateAccountSpecificCompel(long hotel_accountinfoid, HotelAccountSpecificBusinessCase hasdu, User user) {
		hotelAccountSpecInfoMgr.updateCompellingBusinessCase(hotel_accountinfoid, hasdu.getBusiness_case(), hasdu, user);
	}

	public HotelAccountSpecific findHotelAccountSpecificRatestab(long hotel_accountinfoid, User user) {
		HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
		HotelAccountSpecificData hotelAccountSpecificData = hotelAccountSpecInfoMgr.findAccountSpecificDetailforRates(hotel_accountinfoid);
		hotelAccountSpecificData.setAltcxlpolicyoptionlist(alternateCancPolicyManager.getAlternateCxlPolicyTimelist());
		hotelAccountSpecificData.setCxlorderlist(alternateCancPolicyManager.getCxlorderlist());
		getHotelAccountSpecificRateInfowoflags(hotelAccountSpecificData, hotel_accountinfoid, hotelAccountSpecificData.getIsInternational(), user);
		hotelAccountSpecific.setHotelAccountSpecificData(hotelAccountSpecificData);
		List<HotelAccountSpecificRoomPoolData> rpflags = hotelAccountSpecificRoomPoolDataMapping(hotelAccountSpecInfoMgr.findAllRoomPoolDetail(hotel_accountinfoid));		
		hotelAccountSpecificData.setRoompooldetails(rpflags);
		Contact globalSales = hotelAccountSpecInfoMgr.findGlobalSalesLeader(hotelAccountSpecificData.getAccountrecid());
		hotelAccountSpecificData.setGlobalSalesLead(globalSales);
		HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo = new HotelAccountSpecificViewInfo();
		findRateEditInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, hotelAccountSpecificData.getIsLOSBrand(), user);
		findRulesInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, user);
		hotelAccountSpecific.setHotelAccountSpecificViewInfo(hotelAccountSpecificViewInfo);
		return hotelAccountSpecific;
	}

	public void updateAccountSpecificRatestab(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, User user) {
		accountRuleMgr.updateRules(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRules(), user);
		accountRuleMgr.updateRuleDiff(hotel_accountinfoid, user);
		if (hasdu.getAltcancelpolicyoptionid() == 2){
            facilityMgr.updateRmNights_1(hotel_accountinfoid, hasdu.getHotelAccountSpecificFacility().getRm_nights(), hasdu.getAltcxlpolicytimeid(), hasdu.getWaiveearlycharge(), user);
        } else {
            facilityMgr.updateRmNights(hotel_accountinfoid, hasdu.getHotelAccountSpecificFacility().getRm_nights(), hasdu.getExtendcancelpolicy(), hasdu.getWaiveearlycharge(), user);
        }
		updateAccountSpecificRates(hotel_accountinfoid, hasdu, user);
		accountQuickAuditMgr.updateQuickAudit(hotel_accountinfoid, user);
		hotelAccountSpecInfoMgr.updateMarketcode(hotel_accountinfoid, user);
		accountRuleMgr.updateAccountRoomPoolRules(hotel_accountinfoid,hasdu.getRoompoolflags(), user);
		accountQuickAuditMgr.updateQuickAuditRules(hotel_accountinfoid, user);
	}
	
	public void updateAccountSpecificFlags(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, User user) {
		accountRuleMgr.updateRules(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRules(), user);
		accountRuleMgr.updateRuleDiff(hotel_accountinfoid, user);
		accountRuleMgr.updateAccountRoomPoolRules(hotel_accountinfoid,hasdu.getRoompoolflags(), user);
		accountQuickAuditMgr.updateQuickAuditRules(hotel_accountinfoid, user);
	}
	public HotelAccountSpecificData findTabHotelAccountSpecific(long hotel_accountinfoid, User user) {
		HotelAccountSpecificData hotelAccountSpecificData = hotelAccountSpecInfoMgr.findAccountSpecificDetailfortab(hotel_accountinfoid);
		List<HotelLRA_NLRA> lranlratype = ratetypeMgr.findAllLRAProductsDetail();
		hotelAccountSpecificData.setLranlratype(lranlratype);
		List<RoomTypeRef> roomtypelist = ratetypeMgr.findRoomTypesDetail(hotelAccountSpecificData.getAffiliationid());
		hotelAccountSpecificData.setRoomtypelist(roomtypelist);

		Contact globalSales = hotelAccountSpecInfoMgr.findGlobalSalesLeader(hotelAccountSpecificData.getAccountrecid());
		hotelAccountSpecificData.setGlobalSalesLead(globalSales);
		/*
		 * Changes for Ticket number:RMSDB00011509 starts here
		 * Added the new function findRitzcarltonSalesLeader
		 */
		Contact ritzcarltonSales = hotelAccountSpecInfoMgr.findRitzcarltonSalesLeader(hotelAccountSpecificData.getAccountrecid());
		hotelAccountSpecificData.setRitzcarltonSalesLead(ritzcarltonSales);
		
		
		if (hotelAccountSpecificData.getRateProgDetails().size() > 0) {
			for (int i = 0; i < hotelAccountSpecificData.getRateProgDetails().size(); i++) {
				HotelAccountSpecificRPData rpData = hotelAccountSpecificData.getRateProgDetails().get(i);
				if(rpData.getRateprog() == null) {
					rpData.setRateentity(null);
					rpData.setLatestStatus(null);
					rpData.setRateload(null);
				}
				if (hotelAccountSpecificData != null && rpData.getRateprog() != null) {
					HotelAccountSpecificStatus latestStatus = hotelAccountSpecInfoMgr
							.getLatestTransactionStatus(hotel_accountinfoid, rpData.getRateprog(), user);
					rpData.setLatestStatus(latestStatus);
					if (latestStatus != null)
						rpData.setRateload(latestStatus.getLoadDate());
					else
						rpData.setRateentity(null);
				} else if (hotelAccountSpecificData != null && rpData.getSequence() >= 2 && rpData.getSubsequence() == 1 && rpData.getRateprog() == null
						&& hotelAccountSpecificData.getMaxroompools() >= rpData.getSequence()
						&& hotelAccountSpecificData.getRateProgDetails().get(0).getLatestStatus() != null) {
					HotelAccountSpecificStatus latestStatus = hotelAccountSpecInfoMgr
							.getLatestTransactionStatus(hotel_accountinfoid, user, rpData.getSequence());
					rpData.setLatestStatus(latestStatus);
					if (latestStatus != null)
						rpData.setRateload(latestStatus.getLoadDate());
					else
						rpData.setRateentity(null);
				}
			}

		}

		return hotelAccountSpecificData;
	}

	public HotelAccountSpecific findAllHotelAccountSpecific(long hotel_accountinfoid, boolean isInternational, boolean isLOSBrand, User user) {
		HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
		HotelAccountSpecificData hotelAccountSpecificData = hotelAccountSpecInfoMgr.findAccountSpecificDetail(hotel_accountinfoid);
		findHotelAccountSpecificInfo(hotelAccountSpecificData, hotel_accountinfoid, user);
		getHotelAccountSpecificRateInfo(hotelAccountSpecificData, hotel_accountinfoid, isInternational, user);
		hotelAccountSpecific.setHotelAccountSpecificData(hotelAccountSpecificData);
		/*if (hotelAccountSpecificData != null && hotelAccountSpecificData.getRateprog1() != null) {
			HotelAccountSpecificStatus latestStatus1 = hotelAccountSpecInfoMgr.getLatestTransactionStatus(hotel_accountinfoid, hotelAccountSpecificData.getRateprog1(), user);
			hotelAccountSpecificData.setHotelAccountSpecificStatus1(latestStatus1);
		}
		if (hotelAccountSpecificData != null && hotelAccountSpecificData.getRateprog2() != null) {
			HotelAccountSpecificStatus latestStatus2 = hotelAccountSpecInfoMgr.getLatestTransactionStatus(hotel_accountinfoid, hotelAccountSpecificData.getRateprog2(), user);
			hotelAccountSpecificData.setHotelAccountSpecificStatus2(latestStatus2);
		}*/

		HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo = new HotelAccountSpecificViewInfo();
		findRebidViewInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		findRateEditInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, isLOSBrand, user);
		findRulesInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, user);
		findCanFindFacilities(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
		findPropertyDistanceUnit(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
		findAmenitiesInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		findSalesEditable(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		findBlackoutEditInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, user);
		hotelAccountSpecific.setHotelAccountSpecificViewInfo(hotelAccountSpecificViewInfo);

		return hotelAccountSpecific;
	}

	public HotelAccountSpecific findShortHotelAccountSpecific(long hotel_accountinfoid, long ratetype_selected, boolean isInternational, boolean isLOSBrand, User user) {
		updatePortfolioAccountRates(hotel_accountinfoid, ratetype_selected, user);
		HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
		HotelAccountSpecificData hotelAccountSpecificData = hotelAccountSpecInfoMgr.findAccountSpecificDetail(hotel_accountinfoid);
		findHotelAccountSpecificInfo(hotelAccountSpecificData, hotel_accountinfoid, user);
		getHotelAccountSpecificRateInfo(hotelAccountSpecificData, hotel_accountinfoid, isInternational, user);
		hotelAccountSpecific.setHotelAccountSpecificData(hotelAccountSpecificData);
		/*if (hotelAccountSpecificData != null && hotelAccountSpecificData.getRateprog1() != null) {
			HotelAccountSpecificStatus latestStatus1 = hotelAccountSpecInfoMgr.getLatestTransactionStatus(hotel_accountinfoid, hotelAccountSpecificData.getRateprog1(), user);
			hotelAccountSpecificData.setHotelAccountSpecificStatus1(latestStatus1);
		}
		if (hotelAccountSpecificData != null && hotelAccountSpecificData.getRateprog2() != null) {
			HotelAccountSpecificStatus latestStatus2 = hotelAccountSpecInfoMgr.getLatestTransactionStatus(hotel_accountinfoid, hotelAccountSpecificData.getRateprog2(), user);
			hotelAccountSpecificData.setHotelAccountSpecificStatus2(latestStatus2);
		}*/

		HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo = new HotelAccountSpecificViewInfo();
		findRebidViewInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo);
		findRateEditInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, isLOSBrand, user);
		findRulesInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, user);
		hotelAccountSpecific.setHotelAccountSpecificViewInfo(hotelAccountSpecificViewInfo);
/*
		List<HotelAccountSpecificRoomPoolData> room = hotelAccountSpecInfoMgr.findAllRoomPoolDetail(hotel_accountinfoid);		
		hotelAccountSpecificData.setRoompooldetails(room);*/
		
		return hotelAccountSpecific;
	}

	public HotelAccountSpecificData findHotelAccountSpecific(long hotel_accountinfoid) {
		return hotelAccountSpecInfoMgr.findAccountSpecificDetail(hotel_accountinfoid);
	}

	public HotelAccountSpecific findHotelAccountSpecificRates(long hotel_accountinfoid, boolean isInternational, boolean isLOSBrand, User user) {
		HotelAccountSpecific hotelAccountSpecific = new HotelAccountSpecific();
		HotelAccountSpecificData hotelAccountSpecificData = hotelAccountSpecInfoMgr.findAccountSpecificDetail(hotel_accountinfoid);
		getHotelAccountSpecificRateInfo(hotelAccountSpecificData, hotel_accountinfoid, isInternational, user);
		hotelAccountSpecific.setHotelAccountSpecificData(hotelAccountSpecificData);

		HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo = new HotelAccountSpecificViewInfo();
		findRateEditInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, isLOSBrand, user);
		findRulesInfo(hotelAccountSpecificData, hotelAccountSpecificViewInfo, user);
		hotelAccountSpecific.setHotelAccountSpecificViewInfo(hotelAccountSpecificViewInfo);

		return hotelAccountSpecific;
	}

	public List<MultiHotelAccountSpecific> findAllHotelAccountSpecificRates(long hotelrfpid, long startnum, boolean isInternational, boolean isLOSBrand, User user) {
		List<HotelAccountSpecificRoomPoolData> roomPoolSpecificFlags = null;
		List<MultiHotelAccountSpecific> multiaccounts = hotelAccountSpecInfoMgr.findAllAccountSpecificForHotelDetails(hotelrfpid, startnum);
		for (int i = 0; i < multiaccounts.size(); i++) {
			multiaccounts.get(i).setHotelAccountSpecific(findHotelAccountSpecificRates(multiaccounts.get(i).getHotel_accountinfoid(), isInternational, isLOSBrand, user));
			//SWIRM-685
			roomPoolSpecificFlags = hotelAccountSpecificRoomPoolDataMapping(hotelAccountSpecInfoMgr.findAllRoomPoolDetail(multiaccounts.get(i).getHotel_accountinfoid()));		
			multiaccounts.get(i).getHotelAccountSpecific().getHotelAccountSpecificData().setRoompooldetails(roomPoolSpecificFlags);
		}
		return multiaccounts;
	}

	public long findNumAllAccountSpecificForHotelDetails(long rfpid) {
		return hotelAccountSpecInfoMgr.findNumAllAccountSpecificForHotelDetails(rfpid);
	}

	private void findSalesEditable(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		if (hotelAccountSpecificData.getSalesContact() != null && hotelAccountSpecificData.getSalesContact().getContactid() != null && hotelAccountSpecificData.getSalesContact().getContactid() > 0)
			hotelAccountSpecificViewInfo.setSalesEditable(false);
		else
			hotelAccountSpecificViewInfo.setSalesEditable(true);

	}

	private void findCanFindFacilities(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		boolean canpick = facilityMgr.canPickFacility(hotelAccountSpecificData.getHotelid(), hotelAccountSpecificData.getAccountid());
		hotelAccountSpecificViewInfo.setCanPickFacility(canpick);
	}
	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	private void findPropertyDistanceUnit(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		String distanceUnit = facilityMgr.checkPropertyDistanceUnit(hotelAccountSpecificData.getHotelid());
		hotelAccountSpecificViewInfo.setPropertyDistanceUnit(distanceUnit);
	}
	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	private void findCanFindFacilities(HotelAccountSpecificFacility hotelAccountSpecificData, Long hotelid, Long accountid) {
		boolean canpick = facilityMgr.canPickFacility(hotelid, accountid);
		hotelAccountSpecificData.setCanPickFacility(canpick);
	}
	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	private void findPropertyDistanceUnit(HotelAccountSpecificFacility hotelAccountSpecificFacility, Long hotelid, Long accountid) {
		String distanceUnit = facilityMgr.checkPropertyDistanceUnit(hotelid);
		hotelAccountSpecificFacility.setPropertyDistanceUnit(distanceUnit);
	}
	//INC000006143774- MarRFP Issue: Nearest Facility - distance unit//
	private void findBlackoutEditInfo(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo, User user) {
		long numBlackouts = 0;
		boolean checkNumBlackouts = true;
		if (user.getIsPASorAnySales() || (hotelAccountSpecificData.getIsLocked().equals("N"))) {
			numBlackouts = rfpConstantsMgr.getMaxBlackouts();
			checkNumBlackouts = false;
		} else {
			if (hotelAccountSpecificData.getBlackoutdates() != null && hotelAccountSpecificData.getBlackoutdates().getHotelBlackoutDate() != null)
				numBlackouts = hotelAccountSpecificData.getBlackoutdates().getHotelBlackoutDate().size();
			else
				numBlackouts = 0;
		}
		boolean isBlkEditable = true;// (hotelAccountSpecificData.getIsLocked().equals("Y")
									 // ||
									 // hotelAccountSpecificData.getOffcycle().equals("Y"));

		hotelAccountSpecificViewInfo.setBlackoutsEditable(isBlkEditable);
		hotelAccountSpecificViewInfo.setCheckNumBlackouts(checkNumBlackouts);
		hotelAccountSpecificViewInfo.setNumblackouts(numBlackouts);

	}

	private void findRulesInfo(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo, User user) {
		long totalRules = hotelAccountSpecificData.getAccountRules().size();
		double modRows = totalRules % 2;
		long totalRows = Math.round(Math.ceil(totalRules / 2));
		if (modRows > 0)
			totalRows = totalRows + 1;
		boolean breakfasteditable = !(hotelAccountSpecificData.getBreakfast_incl_corp_rates() != null && hotelAccountSpecificData.getBreakfast_incl_corp_rates().equals("Y") && user
				.getIsAnySalesUser());
		hotelAccountSpecificViewInfo.setBreakfastRuleEditable(breakfasteditable);
		hotelAccountSpecificViewInfo.setCountRules(totalRules);
		hotelAccountSpecificViewInfo.setTotalRulesRows(totalRows);
	}

	private void findAmenitiesInfo(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		long totalAmenities = hotelAccountSpecificData.getAmenities().size();
		double modRows = totalAmenities % 2;
		long totalRows = Math.round(Math.ceil(totalAmenities / 2));
		if (modRows > 0)
			totalRows = totalRows + 1;
		hotelAccountSpecificViewInfo.setCountAmenities(totalAmenities);
		hotelAccountSpecificViewInfo.setTotalAmenitiesRows(totalRows);
	}

	private void findRateEditInfo(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo, boolean isLOSBrand, User user) {
		long ratetype_selected = hotelAccountSpecificData.getRatetype_selected();
		boolean isLocked = (hotelAccountSpecificData.getIsLocked() != null && hotelAccountSpecificData.getIsLocked().equals("Y"));
		boolean offcycle = (hotelAccountSpecificData.getOffcycle() != null && hotelAccountSpecificData.getOffcycle().equals("Y"));
		boolean aerAccount = (hotelAccountSpecificData.getAer_account() != null && hotelAccountSpecificData.getAer_account().equals("Y"));
		//boolean hasFixedRates = hotelAccountSpecificData.getFixedRates() != null && hotelAccountSpecificData.getFixedRates().size() > 0;
		boolean hasAccountRates = hotelAccountSpecificData.getAccountRates() != null && hotelAccountSpecificData.getAccountRates().size() > 0;
		boolean isRollOver = (hotelAccountSpecificData.getRollover() != null && hotelAccountSpecificData.getRollover().equals("Y"));
		boolean isSelected = (hotelAccountSpecificData.getIsSelected() != null && hotelAccountSpecificData.getIsSelected().equals("Y"));
		boolean ratesReadOnly = false;
		if (user.getIsReadOnly()) {
			ratesReadOnly = true;
		}
		if ((ratetype_selected == 1 && !(user.getIsPASAdmin())) || ratetype_selected == 18 || ratetype_selected == 20) {
			ratesReadOnly = true;
		}
		long dcolspan = 3;
		boolean seasonsEditable = false;
		boolean losEditable = false;

		//if (offcycle && (!isLocked || !hasFixedRates) && ratetype_selected != 20) {
		if ((!isLocked) && ratetype_selected != 20) {
			seasonsEditable = true;
			if (isLOSBrand)
				losEditable = true;
		} else if (user.getIsPASAdmin() && isLocked && ratetype_selected != 18 && ratetype_selected != 20) {
			seasonsEditable = true;
			if (isLOSBrand)
				losEditable = true;
		} else if (user.getIsAnySalesUser()) {
			if (ratetype_selected != 1 && isLocked && ratetype_selected != 18 && ratetype_selected != 20) {
				seasonsEditable = true;
				if (isLOSBrand)
					losEditable = true;
			}
		}
		
		//Roll Over Logic
		if (isRollOver) {
			seasonsEditable = true;
			if (isLOSBrand)
				losEditable = true;
		}
		
		if (user.getIsHotelUser() && isSelected) {
			seasonsEditable = false;
			losEditable = false;
		}
		
		if (seasonsEditable)
			dcolspan = 5;

		long widthLOSField = 0;
		if (isLOSBrand) {
			if (losEditable)
				widthLOSField = 75;
			else
				widthLOSField = 50;
		}
		long widthtable = 822 + widthLOSField;
		if (seasonsEditable)
			widthtable += 20;
		if (losEditable)
			widthtable += 20;

		boolean fixedEditable = false;
		/*if (offcycle && !(aerAccount && ratetype_selected == 18) && !(ratetype_selected == 20) && (user.getIsPASorAnySales() || !isLocked || !hasFixedRates))
			fixedEditable = true;*/

		long rategridheadercolspan = 4;
		if (seasonsEditable)
			rategridheadercolspan++;
		if (losEditable)
			rategridheadercolspan++;

		long maxLOS = rfpConstantsMgr.getMaxLOS();
		long maxSeasons = hotelAccountSpecificData.getMaxseasons();
		if (!user.getIsHotelUser())
			maxSeasons = rfpConstantsMgr.getMaxAdminSeasons();

		String comparerates = "true";
		if (user.getIsPASorAnySales() || (user.getIsHotelUser() && hotelAccountSpecificData.getAllow_modify() != null && hotelAccountSpecificData.getAllow_modify().equals("Y")))
			comparerates = "false";

		String limitedSalesRate = "true";
		// FOR 8081 LimitedSales  alert issue
		if(hotelAccountSpecificData.getAllow_modify() != null && hotelAccountSpecificData.getAllow_modify().equals("Y") && user.getIsLimitedSalesUser()){
			limitedSalesRate ="false";
		}
		long minroomtype = hotelAccountSpecificData.getRoomtypelist().get(0).getRoomtypeid();

		hotelAccountSpecificViewInfo.setSeasonsEditable(seasonsEditable);
		hotelAccountSpecificViewInfo.setLosEditable(losEditable);
		hotelAccountSpecificViewInfo.setFixedEditable(fixedEditable);
		hotelAccountSpecificViewInfo.setRategridLOSwidth(widthLOSField);
		hotelAccountSpecificViewInfo.setRategridtablewidth(widthtable);
		hotelAccountSpecificViewInfo.setRategridcolspan(dcolspan);
		hotelAccountSpecificViewInfo.setHasAccountRates(hasAccountRates);
		hotelAccountSpecificViewInfo.setRategridheadercolspan(rategridheadercolspan);
		hotelAccountSpecificViewInfo.setMaxLOS(maxLOS);
		hotelAccountSpecificViewInfo.setMaxSeasons(maxSeasons);
		hotelAccountSpecificViewInfo.setComparerates(comparerates);
		hotelAccountSpecificViewInfo.setMinroomtype(minroomtype);
		hotelAccountSpecificViewInfo.setRatesReadOnly(ratesReadOnly);
		hotelAccountSpecificViewInfo.setLimitedSalesRate(limitedSalesRate);
	}

	private void findRebidViewInfo(HotelAccountSpecificData hotelAccountSpecificData, HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		boolean showRebid = (hotelAccountSpecificData.getRebidstatus() != null);
		hotelAccountSpecificViewInfo.setShowRebid(showRebid);
		if (showRebid) {
			long rebidRound = 1;
			Long rebidstatusidedit;
			String rebidNotesedit;
			Date rebidDueDateedit;
			if (hotelAccountSpecificData.getRebidstatus3() != null) {
				rebidRound = 3;
				rebidstatusidedit = hotelAccountSpecificData.getRebidstatus3();
				rebidNotesedit = hotelAccountSpecificData.getRebid_notes3();
				rebidDueDateedit = hotelAccountSpecificData.getRebid_due3();
			} else if (hotelAccountSpecificData.getRebidstatus2() != null) {
				rebidRound = 2;
				rebidstatusidedit = hotelAccountSpecificData.getRebidstatus2();
				rebidNotesedit = hotelAccountSpecificData.getRebid_notes2();
				rebidDueDateedit = hotelAccountSpecificData.getRebid_due2();
			} else {
				rebidRound = 1;
				rebidstatusidedit = hotelAccountSpecificData.getRebidstatus();
				rebidNotesedit = hotelAccountSpecificData.getRebid_notes();
				rebidDueDateedit = hotelAccountSpecificData.getRebid_due();
			}
			boolean rebidpastdue = (rebidstatusidedit == 1 && DateUtility.isBeforeToDay(rebidDueDateedit));

			hotelAccountSpecificViewInfo.setRebidRound(rebidRound);
			hotelAccountSpecificViewInfo.setRebidstatusidedit(rebidstatusidedit);
			hotelAccountSpecificViewInfo.setRebidNotesedit(rebidNotesedit);
			hotelAccountSpecificViewInfo.setRebidDueDateedit(rebidDueDateedit);
			hotelAccountSpecificViewInfo.setRebidpastdue(rebidpastdue);
			hotelAccountSpecificViewInfo.setRebidStatusList(hotelAccountSpecInfoMgr.getBTRebidStatus());
		}
	}

	private void findRebidViewInfo(HotelAccountSpecificRebid hotelAccountSpecific, HotelAccountSpecificRebidViewInfo hotelAccountSpecificViewInfo) {
		boolean showRebid = (hotelAccountSpecific.getRebidstatus() != null);
		hotelAccountSpecificViewInfo.setShowRebid(showRebid);
		if (showRebid) {
			long rebidRound = 1;
			Long rebidstatusidedit;
			String rebidNotesedit;
			Date rebidDueDateedit;
			if (hotelAccountSpecific.getRebidstatus3() != null) {
				rebidRound = 3;
				rebidstatusidedit = hotelAccountSpecific.getRebidstatus3();
				rebidNotesedit = hotelAccountSpecific.getRebid_notes3();
				rebidDueDateedit = hotelAccountSpecific.getRebid_due3();
			} else if (hotelAccountSpecific.getRebidstatus2() != null) {
				rebidRound = 2;
				rebidstatusidedit = hotelAccountSpecific.getRebidstatus2();
				rebidNotesedit = hotelAccountSpecific.getRebid_notes2();
				rebidDueDateedit = hotelAccountSpecific.getRebid_due2();
			} else {
				rebidRound = 1;
				rebidstatusidedit = hotelAccountSpecific.getRebidstatus();
				rebidNotesedit = hotelAccountSpecific.getRebid_notes();
				rebidDueDateedit = hotelAccountSpecific.getRebid_due();
			}
			boolean rebidpastdue = (rebidstatusidedit == 1 && DateUtility.isBeforeToDay(rebidDueDateedit));

			hotelAccountSpecificViewInfo.setRebidRound(rebidRound);
			hotelAccountSpecificViewInfo.setRebidstatusidedit(rebidstatusidedit);
			hotelAccountSpecificViewInfo.setRebidNotesedit(rebidNotesedit);
			hotelAccountSpecificViewInfo.setRebidDueDateedit(rebidDueDateedit);
			hotelAccountSpecificViewInfo.setRebidpastdue(rebidpastdue);
			hotelAccountSpecificViewInfo.setRebidStatusList(hotelAccountSpecInfoMgr.getBTRebidStatus());
		}
	}

	private void findHotelAccountSpecificInfo(HotelAccountSpecificData hotelAccountSpecificData, long hotel_accountinfoid, User user) {
		/*
		 * get global sales, sales contact, business case, blackout dates,
		 * account specific questions, eligibility and amenities.
		 */
		Contact globalSales = hotelAccountSpecInfoMgr.findGlobalSalesLeader(hotelAccountSpecificData.getAccountrecid());
		hotelAccountSpecificData.setGlobalSalesLead(globalSales);
		Contact ritzcarltonSales = hotelAccountSpecInfoMgr.findRitzcarltonSalesLeader(hotelAccountSpecificData.getAccountrecid());
		hotelAccountSpecificData.setRitzcarltonSalesLead(ritzcarltonSales);
		Contact sales = hotelAccountSpecInfoMgr.findSalesContact(hotel_accountinfoid, hotelAccountSpecificData.getAccountid(), hotelAccountSpecificData.getMarshacode());
		hotelAccountSpecificData.setSalesContact(sales);
		Long maxblackouts = hotelAccountSpecInfoMgr.findMaxBlackouts(hotel_accountinfoid);
		hotelAccountSpecificData.setMaxblackouts(maxblackouts);
		HotelAccountSpecificBusinessCase busCase = hotelAccountSpecInfoMgr.findAccountSpecBusinessCase(hotel_accountinfoid);
		hotelAccountSpecificData.setHotelAccountSpecificBusinessCase(busCase);
		HotelAccountSpecificFacility facility = hotelAccountSpecInfoMgr.findAccountSpecificFacility(hotel_accountinfoid);
		hotelAccountSpecificData.setHotelAccountSpecificFacility(facility);

		List<HotelEligibility> eligibility = eligibilityMgr.getEligibility(hotel_accountinfoid);
		List<HotelAmenities> amenities = eligibilityMgr.getAmenities(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid());
		List<HotelRateIncludes> rateincludes = eligibilityMgr.getRateIncludes(hotel_accountinfoid);
		hotelAccountSpecificData.setEligibility(eligibility);
		hotelAccountSpecificData.setAmenities(amenities);
		hotelAccountSpecificData.setRateincludes(rateincludes);

		List<HotelBlackoutDate> blackouts = blackoutMgr.getBlackouts(hotel_accountinfoid);
		HotelBlackoutDates blackoutdates = new HotelBlackoutDates();
		blackoutdates.setHotelBlackoutDate(blackouts);
		hotelAccountSpecificData.setBlackoutdates(blackoutdates);
		List<HotelAccountSpecQandA> accountspecQandA = findAccountSpecQuestionsDetail(hotel_accountinfoid, user);
		hotelAccountSpecificData.setAccountspecQandA(accountspecQandA);
	}

	private void getHotelAccountSpecificRateInfowoflags(HotelAccountSpecificData hotelAccountSpecificData, long hotel_accountinfoid, boolean isInternational, User user) {
		List<HotelLRA_NLRA> lranlratype = ratetypeMgr.findLRAProductsDetail(hotelAccountSpecificData.getRatetypeid());
		hotelAccountSpecificData.setLranlratype(lranlratype);
		List<RoomTypeRef> roomtypelist = ratetypeMgr.findRoomTypesDetail(hotelAccountSpecificData.getAffiliationid());
		hotelAccountSpecificData.setRoomtypelist(roomtypelist);
		List<HotelRFPRmPools> roompoollist = accountRateMgr.getHotelAccountRmPools(hotel_accountinfoid);
		hotelAccountSpecificData.setRoompoollist(roompoollist);
		/*
		 * set variable if the rate is a gpp or floating vp rate
		 */
		boolean isFloatingRateType = (hotelAccountSpecificData.getRatetype_selected() == 18 || hotelAccountSpecificData.getRatetype_selected() == 20);
		/*List<HotelRates> fixedRates = getFixedRates(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), hotelAccountSpecificData.getOffcycle(), isFloatingRateType,
				hotelAccountSpecificData.getRatetype_selected());
		HashMap<String, HotelRates> hotelfixedrates = new HashMap<String, HotelRates>();
		if (fixedRates != null && fixedRates.size() > 0) {
			for (int i = 0; i < fixedRates.size(); i++) {
				HotelRates hr = fixedRates.get(i);
				String newkey = hr.getSeasonid() + "_" + hr.getLengthofstayid() + "_" + hr.getRoompool() + "_" + hr.getProductid() + "_" + hr.getRoomtypeid();
				hotelfixedrates.put(newkey, hr);
			}
		}
		hotelAccountSpecificData.setFixedRates(hotelfixedrates);*/

		List<HotelRules> accountRules = accountRuleMgr.findAccountRulesDetail(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), hotelAccountSpecificData.getRatetypeid(), isInternational,
				user);
		hotelAccountSpecificData.setAccountRules(accountRules);

		hotelAccountSpecificData.setAccountSeason(getSeasons(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), hotelAccountSpecificData.getOffcycle(), isFloatingRateType, hotelAccountSpecificData.getPeriod(), hotelAccountSpecificData.getRatetype_selected()));

		hotelAccountSpecificData.setAccountLOS(getLOS(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), isFloatingRateType));

		List<HotelRates> accountRates = getAccountRates(hotel_accountinfoid, hotelAccountSpecificData.getHotelrfpid(), hotelAccountSpecificData.getOffcycle(), isFloatingRateType,
				hotelAccountSpecificData.getPercentdiscount(), hotelAccountSpecificData.getDiscfirsttieronly());
		HashMap<String, HotelRates> hotelaccountrates = new HashMap<String, HotelRates>();
		//if (fixedRates != null && accountRates.size() > 0) {
		if ( accountRates != null && accountRates.size() > 0) {
			for (int i = 0; i < accountRates.size(); i++) {
				HotelRates hr = accountRates.get(i);
				String newkey = hr.getSeasonid() + "_" + hr.getLengthofstayid() + "_" + hr.getRoompool() + "_" + hr.getProductid() + "_" + hr.getRoomtypeid();
				hotelaccountrates.put(newkey, hr);
			}
		}
		hotelAccountSpecificData.setAccountRates(hotelaccountrates);

		/*if (hotelAccountSpecificData.getCompareratetype() == 1)
			hotelAccountSpecificData.setCompareRates(hotelAccountSpecificData.getFixedRates());
		else*/
			hotelAccountSpecificData.setCompareRates(hotelAccountSpecificData.getAccountRates());

	}

	private void getHotelAccountSpecificRateInfo(HotelAccountSpecificData hotelAccountSpecificData, long hotel_accountinfoid, boolean isInternational, User user) {
		HotelAccountSpecificAccountFlags accountflags = hotelAccountSpecInfoMgr.findAccountSpecStatus(hotel_accountinfoid);
		hotelAccountSpecificData.setHotelAccountSpecificAccountFlags(accountflags);
		getHotelAccountSpecificRateInfowoflags(hotelAccountSpecificData, hotel_accountinfoid, isInternational, user);

	}

	private List<HotelRates> getFixedRates(long hotel_accountinfoid, long hotelrfpid, String offcycle, boolean isFloatingRateType, long ratetype_selected) {
		/*
		 * if the account is offcycle, then get the account specific fixed rates
		 * if a regular account or vp; otherwise get the fixed rates from one
		 * season with the highest single rate else if the hotel/account is
		 * offering gov vp, then get the gov fixed rates else get the general
		 * fixed rates.
		 */
		List<HotelRates> fixedRates = null;
		if (offcycle.equals("Y")) {
			if (isFloatingRateType)
				fixedRates = generalRateMgr.findGenFixedRatesForOffcycleFloat(hotelrfpid);
			else
				fixedRates = accountRateMgr.findOffcycleFixedRatesDetail(hotel_accountinfoid);
		} else if (ratetype_selected == 19) {
			fixedRates = generalRateMgr.findGovGenRatesDetail(hotelrfpid, 1);
		} else {
			fixedRates = generalRateMgr.findGenRatesDetail(hotelrfpid, 1);
		}
		return fixedRates;
	}

	private List<Season> getSeasons(long hotel_accountinfoid, long hotelrfpid, String offcycle, boolean isFloatingRateType, long period, long rateTypeSelected) {
		/*
		 * if this is an offcycle account and the product is GPP or float, then
		 * use the contract start and end dates else if this is not an offcycle
		 * account and the product is GPP or float, then use the general seasons
		 * otherwise use the account specific seasons
		 */
		List<Season> seasonList = new Vector<Season>();
		List<Season> finalseasonList = new Vector<Season>();
		
		if (isFloatingRateType) {
			if (offcycle.equals("Y"))
				finalseasonList = accountSeasonMgr.getOffCycleFloatSeason(hotel_accountinfoid);
			else
				if(rateTypeSelected == 20) {
					
					finalseasonList = accountSeasonMgr.getOffCycleFloatSeason(hotel_accountinfoid);
					
				} else {
					finalseasonList = hotelSeasonMgr.getHotelSeason(hotelrfpid);
				}
		} else{
			if(rateTypeSelected == 20) {
				
				finalseasonList = accountSeasonMgr.getOffCycleFloatSeason(hotel_accountinfoid);
				
			} else {
				
				finalseasonList = accountSeasonMgr.getSeason(hotel_accountinfoid);
							
				if (finalseasonList.size() == 0) {
					Season defaultSeason = new Season();
					defaultSeason.setSeasonid(1L);
					// set rfpseasonid as 1 to indicate this is a default season
					defaultSeason.setRfpseasonid(1L);
					try {
						defaultSeason.setStartdate(DateUtility.parseDate("01/01/" + period));
						defaultSeason.setEnddate(DateUtility.parseDate("12/31/" + period));
					} catch (ParseException e) {
					}
					// return defaultseason if accountseason is empty
					seasonList.add(defaultSeason);
					return seasonList;
				}
			}
		}		
			
		return finalseasonList;
	}

	private List<LengthOfStay> getLOS(long hotel_accountinfoid, long hotelrfpid, boolean isFloatingRateType) {
		/*
		 * if this is an floating rate type, then use the general LOS otherwise
		 * use the account specific LOS
		 */
		List<LengthOfStay> losList = null;
		if (isFloatingRateType)
			losList = hotelLOSMgr.getHotelLOS(hotelrfpid);
		else
			losList = accountLOSMgr.getLOS(hotel_accountinfoid);

		return losList;
	}

	private List<HotelRates> getAccountRates(long hotel_accountinfoid, long hotelrfpid, String offcycle, boolean isFloatingRateType, Double percentDiscount, String discfirsttieronly) {
		/*
		 * if this is a floating type offcycle account, then calculate the
		 * percent off of the rates in the season with the highest general fixed
		 * single rate else if this is a floating type account, then calculate
		 * the percent off of the general fixed rates otherwise get the account
		 * specific rates
		 */
		List<HotelRates> accountRates = null;
		if (isFloatingRateType) {
			if (percentDiscount == null)
				percentDiscount = 0.0;
			// GBTA-4 Remove Fixed Rates column
			/*if (offcycle.equals("Y"))
				accountRates = generalRateMgr.findRatesForOffcycleFloat(hotelrfpid, percentDiscount, discfirsttieronly);
			else
				accountRates = generalRateMgr.findRatesForFloat(hotelrfpid, percentDiscount, discfirsttieronly);*/
		} else
			accountRates = accountRateMgr.findRatesDetail(hotel_accountinfoid);

		return accountRates;
	}

	public List<RemovalReason> findRemovalReasons() {
		return removalReasonMgr.findRemovalReasons();
	}

	public List<RejectionReason> findRejectionReasons() {
		return rejectionReasonMgr.findRejectionReasons();
	}

	public void updateAccountSpecific(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user) {
		hotelAccountSpecInfoMgr.updateAccountFlags(hotel_accountinfoid, hasdu.getIsAccepted(), hasdu.getHotelAccountSpecificAccountFlags(), user);
		hotelAccountSpecInfoMgr.updateRebidStatus(hotel_accountinfoid, hasdu.getRebidRound(), hasdu.getRebidstatus(), hasdu.getRebid_notes(), user);

		boolean bRebidRejected = (hasdu.getRebidstatus() != null && hasdu.getRebidstatus() == 2);
		blackoutMgr.updateAccountBlackouts(hotel_accountinfoid, hasdu.getWaiveblackouts(), hasdu.getHotelBlackoutDate(), user);
		accountRuleMgr.updateRules(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRules(), user);
		accountRuleMgr.updateRuleDiff(hotel_accountinfoid, user);
		if (!bRebidRejected) {
			updateAccountSpecificRates(hotel_accountinfoid, hasdu, user);

			if (hasdu.getEligibility() != null)
				eligibilityMgr.updateEligibility(hotel_accountinfoid, hasdu.getEligibility(), user);
			if (hasdu.getAmenities() != null)
				eligibilityMgr.updateAmenity(hotel_accountinfoid, hasdu.getAmenities(), user);
			if (hasdu.getRateincludes() != null) {
				boolean updated = eligibilityMgr.updateRateIncludes(hotel_accountinfoid, hasdu.getRateincludes(), user);
			}
			facilityMgr.updateFacilityInfo(hotel_accountinfoid, hasdu.getHotelAccountSpecificFacility(), hasdu.getSalesContact(), user);
			hotelAccountSpecInfoMgr.updateCompellingBusinessCase(hotel_accountinfoid, hasdu.getBusiness_case(), hasdu.getHotelAccountSpecificBusinessCase(), user);
			hotelAccountSpecInfoMgr.updateMarketcode(hotel_accountinfoid, user);
		}
		accountQuickAuditMgr.updateQuickAudit(hotel_accountinfoid, user);
		accountQuickAuditMgr.updateQuickAuditRules(hotel_accountinfoid, user);
		accountQuickAuditMgr.updateQuickAuditAmenities(hotel_accountinfoid, user);
		hotelMenuMgr.update(hasdu.getHotelrfpid(), 15, hasdu.getAccountrecid(), "", "C", user, "Y", markComplete);
		sendProductToMarshandPublishToHPP(hasdu.getHotelid(), hasdu.getAccountrecid(), user);
	}

	public void updateAccountSpecific(long hotel_accountinfoid, HotelAccountSpecificStatusUpdate hassu, User user, boolean publishrates) {
		hotelAccountSpecInfoMgr.updateAccountSpecTabStatus(hotel_accountinfoid, hassu, user);
		hotelMenuMgr.update(hassu.getHotelrfpid(), 15, hassu.getAccountrecid(), "", "C", user, "Y", hassu.getMarkComplete());
		if (publishrates) {
			sendProductToMarshandPublishToHPP(hotel_accountinfoid, user);
		}
	}

	public void sendProductToMarshandPublishToHPP(Long hotel_accountinfoid, User user) {

		HotelAccountInfo hInfo = hotelAccountSpecInfoMgr.getHotelAccountInfo(hotel_accountinfoid);
		sendProductToMarshandPublishToHPP(hInfo.getHotelid(), hInfo.getAccountrecid(), user);
	}

	private void sendProductToMarshandPublishToHPP(Long hotelId, Long accountRecId, User user) {

		Long batchId = pgoosSetupMgr.getNextBatchId();

		// Send Product Definition
		pgoosPropagateProductService.accountLiveProductProcess(batchId, hotelId, accountRecId, user);

		// Publish Rates to HPP
		pgoosPublishService.publishLiveBatch(hotelId, accountRecId, batchId, user);
	}

	public void updateAccountSpecificShort(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user) {
		hotelAccountSpecInfoMgr.updateAccountFlags(hotel_accountinfoid, hasdu.getIsAccepted(), hasdu.getHotelAccountSpecificAccountFlags(), user);
		hotelAccountSpecInfoMgr.updateRebidStatus(hotel_accountinfoid, hasdu.getRebidRound(), hasdu.getRebidstatus(), hasdu.getRebid_notes(), user);

		accountRuleMgr.updateRules(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRules(), user);
		accountRuleMgr.updateRuleDiff(hotel_accountinfoid, user);
		boolean bRebidRejected = (hasdu.getRebidstatus() != null && hasdu.getRebidstatus() == 2);
		if (!bRebidRejected) {
			updateAccountSpecificRates(hotel_accountinfoid, hasdu, user);
			hotelAccountSpecInfoMgr.updateMarketcode(hotel_accountinfoid, user);

		}
		accountRuleMgr.updateAccountRoomPoolRules(hotel_accountinfoid,hasdu.getRoompoolflags(), user);
		
		accountQuickAuditMgr.updateQuickAudit(hotel_accountinfoid, user);
		accountQuickAuditMgr.updateQuickAuditRules(hotel_accountinfoid, user);
		hotelMenuMgr.update(hasdu.getHotelrfpid(), 15, hasdu.getAccountrecid(), "", "C", user, "Y", markComplete);
		sendProductToMarshandPublishToHPP(hotel_accountinfoid, user);

	}

	private void updatePortfolioAccountRates(Long hotel_accountinfoid, Long ratetype_selected, User user) {
		HotelAccountCenterUpdate hotelAccountCenterUpdate = new HotelAccountCenterUpdate();
		hotelAccountCenterUpdate.setHotel_accountinfoid(hotel_accountinfoid);
		hotelAccountCenterUpdate.setRatetype_selected(ratetype_selected);
		accountcenterMgr.update_portfolio(hotel_accountinfoid, hotelAccountCenterUpdate, user);
	}

	public void updateAccountSpecificRates(Map<Long, HotelAccountSpecificDataUpdate> hasdmap, User user) {
		for (Long key : hasdmap.keySet()) {
			long hotel_accountinfoid = key;
			HotelAccountSpecificDataUpdate hasdu = hasdmap.get(key);
			hotelAccountSpecInfoMgr.updateAccountFlags(hotel_accountinfoid, hasdu.getIsAccepted(), hasdu.getHotelAccountSpecificAccountFlags(), user);
			accountRuleMgr.updateRules(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRules(), user);
			accountRuleMgr.updateRuleDiff(hotel_accountinfoid, user);
			accountRuleMgr.updateAccountRoomPoolRules(hotel_accountinfoid,hasdu.getRoompoolflags(), user);

			updateAccountSpecificRates(hotel_accountinfoid, hasdu, user);

		}

	}

	private void updateAccountSpecificRates(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, User user) {
		boolean isLocked = (hasdu.getIsLocked() != null && hasdu.getIsLocked().equals("Y"));
		/*if(hasdu.getRollover() != null && hasdu.getRollover().equalsIgnoreCase("Y")) {
			if (user.getIsPASorAnySales() || (user.getIsHotelUser() && !isLocked)) {
				if (hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20) {
					if (hasdu.getAccountLOS() != null)
						accountLOSMgr.updateLOS(hotel_accountinfoid, hasdu.getAccountLOS(), user);
				}
				if (hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20) {
					if (hasdu.getAccountSeason() != null)
						accountSeasonMgr.updateSeasons(hotel_accountinfoid, hasdu.getAccountSeason(), user);
				}
			}
		} else {
			if ((user.getIsPASorAnySales() || hasdu.getOffcycle().equals("Y")) && hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20) {
				if (hasdu.getIsLocked() != null && hasdu.getIsLocked().equals("Y") && hasdu.getAccountLOS() != null || hasdu.getOffcycle().equals("Y"))
					accountLOSMgr.updateLOS(hotel_accountinfoid, hasdu.getAccountLOS(), user);
			}
			if ((user.getIsPASorAnySales() || hasdu.getOffcycle().equals("Y")) && hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20) {
				if (hasdu.getIsLocked() != null && hasdu.getIsLocked().equals("Y") && hasdu.getAccountSeason() != null || hasdu.getOffcycle().equals("Y"))
					accountSeasonMgr.updateSeasons(hotel_accountinfoid, hasdu.getAccountSeason(), user);
			}
		}*/
		
		//GBTA-13 Allow HotelUser to update Season/Los when property is not in Portfolio
		if (hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20){
			if (user.getIsPASorAnySales() || (user.getIsHotelUser() && !isLocked)){
				if (hasdu.getAccountLOS() != null){
					accountLOSMgr.updateLOS(hotel_accountinfoid, hasdu.getAccountLOS(), user);
				}
				if (hasdu.getAccountSeason() != null){
					accountSeasonMgr.updateSeasons(hotel_accountinfoid, hasdu.getAccountSeason(), user);
				}
			}
		}
		
		if (hasdu.getRatetype_selected() != 18 && hasdu.getRatetype_selected() != 20) {
			if(hasdu.getAccountRates() != null){
			for (String keyRates : hasdu.getAccountRates().keySet()) {
				HotelRates rate = hasdu.getAccountRates().get(keyRates);
				String[] splitKeyRates = keyRates.split("_");
				Season season = hasdu.getAccountSeason().get(splitKeyRates[0]);
				LengthOfStay los = hasdu.getAccountLOS().get(splitKeyRates[0] + "_" + splitKeyRates[1]);
				rate.setSeasonid(season.getSeasonid());
				rate.setLengthofstayid(los.getLengthofstayid());
				rate.setRoompool(Long.valueOf(splitKeyRates[2]));
			}
			accountRateMgr.updateRates(hotel_accountinfoid, hasdu.getRatetype_selected(), hasdu.getAccountRates(), user);
			}
			/*if (hasdu.getOffcycle().equals("Y") && hasdu.getFixedRates() != null) {
				for (String keyRates : hasdu.getFixedRates().keySet()) {
					HotelRates rate = hasdu.getFixedRates().get(keyRates);
					String[] splitKeyRates = keyRates.split("_");
					Season season = hasdu.getAccountSeason().get(splitKeyRates[0]);
					LengthOfStay los = hasdu.getAccountLOS().get(splitKeyRates[0] + "_" + splitKeyRates[1]);
					rate.setSeasonid(season.getSeasonid());
					rate.setLengthofstayid(los.getLengthofstayid());
					rate.setRoompool(Long.valueOf(splitKeyRates[2]));
				}
				boolean bnotlocked = (user.getIsPASorAnySales() || !hasdu.getIsLocked().equals("Y"));
				accountRateMgr.updateAccountFixedRates(hotel_accountinfoid, hasdu.getFixedRates(), user, bnotlocked);
			}*/
		} else {
			if (user.getIsPASorAnySales() || user.getIsHotelUser() || hasdu.getAccountpricingtype().equals("L"))
				hotelAccountSpecInfoMgr.updateAccountPercentDiscount(hotel_accountinfoid, hasdu.getPercentdiscount(), user);
		}
	}

	public void updateCopyGov(long haccid, String rateCopy, User user) {
		hotelAccountSpecInfoMgr.updateCopyGov(haccid, rateCopy, user);
	}

	public void updateProduct(long haccid, long newratetype_selected, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user) {
		hotelAccountSpecInfoMgr.updateProduct(haccid, newratetype_selected, user);
		hotelMenuMgr.update(hasdu.getHotelrfpid(), 15, hasdu.getAccountrecid(), "", "C", user, "Y", markComplete);
	}

	public void updateProduct(long haccid, long newratetype_selected, User user) {
		hotelAccountSpecInfoMgr.updateProduct(haccid, newratetype_selected, user);
	}
	
	/*GBTA-13 Copy season functionality*/
	public void copySeasons(long rfpid, long haccid, long ratetype_selected, String acctype, User user) {
		hotelAccountSpecInfoMgr.copySeasons(rfpid, haccid, ratetype_selected, acctype, user);
	}

	public HotelAccountSpeciifcGroupMeetings getAccountGroupMeetings(long hotel_accountinfoid, long hotelid, User user) {

		HotelAccountSpeciifcGroupMeetings hasgm = hotelAccountSpecInfoMgr.getAccountGroupMeetings(hotel_accountinfoid, hotelid);
		return hasgm;

	}

	public void updateAccountGroupMeetings(long haccid, HotelAccountSpeciifcGroupMeetings detail, User user) {
		hotelAccountSpecInfoMgr.updateAccountGroupMeetings(haccid, detail, user);
	}

	public void updateAccountGroupMeetings(long haccid, long accountrecid, long hotelrfpid, HotelAccountSpeciifcGroupMeetings detail, String markComplete, User user) {
		hotelAccountSpecInfoMgr.updateAccountGroupMeetings(haccid, detail, user);
		hotelMenuMgr.update(hotelrfpid, 15, accountrecid, "", "C", user, "Y", markComplete);
	}

	public QuickAuditData getQuickAuditRates(long haccid, long affiliationid) {
		QuickAuditData qaData = new QuickAuditData();
		List<HotelLRA_NLRA> lranlratype = ratetypeMgr.findAllLRAProductsDetail();
		qaData.setLranlratype(lranlratype);
		List<RoomTypeRef> roomtypelist = ratetypeMgr.findRoomTypesDetail(affiliationid);
		qaData.setRoomtypelist(roomtypelist);
		List<HotelRFPRmPools> roompoollist = accountRateMgr.getHotelAccountRmPools(haccid);
		qaData.setRoompoollist(roompoollist);

		List<QuickAuditInfo> qaInfoList = accountQuickAuditMgr.getQuickAudit(haccid);

		Long prevquickaudithotelaccountid = null;
		for (QuickAuditInfo qaInfo : qaInfoList) {
			if (prevquickaudithotelaccountid == null)
				qaInfo.setQarates(accountQuickAuditMgr.getQuickAuditRates(haccid, qaInfo.getQuickaudithotelaccountid()));
			else
				qaInfo.setQarates(accountQuickAuditMgr.getQuickAuditRatesWithDiff(haccid, qaInfo.getQuickaudithotelaccountid(), prevquickaudithotelaccountid));
			prevquickaudithotelaccountid = qaInfo.getQuickaudithotelaccountid();
		}

		qaData.setQuickAuditInfo(qaInfoList);
		return qaData;
	}

	public List<QuickAuditCancelInfo> getQuickAuditCancelInfo(long haccid) {
		return accountQuickAuditMgr.getQuickAuditCancelInfo(haccid);
	}
	
	public QuickAuditAmenData getQuickAuditAmenities(long haccid, boolean isInternational, String breakinrates, User user) {
		QuickAuditAmenData qaData = new QuickAuditAmenData();

		List<QuickAuditAmenInfo> qaInfoList = accountQuickAuditMgr.getQuickAuditAmen(haccid);

		Long prevquickaudithtlacctamenid = null;
		for (QuickAuditAmenInfo qaInfo : qaInfoList) {
			if (prevquickaudithtlacctamenid == null) {
				qaInfo.setQaamenities(accountQuickAuditMgr.getQuickAuditAmenities(haccid, qaInfo.getQuickaudithtlacctamenid()));
				if (isInternational || (user.getIsPASorAnySales() && breakinrates.equals("N")))
					qaInfo.setQarateincludes(accountQuickAuditMgr.getQuickAuditRateIncludes(haccid, qaInfo.getQuickaudithtlacctamenid()));
			} else {
				qaInfo.setQaamenities(accountQuickAuditMgr.getQuickAuditAmenitiesWithDiff(haccid, qaInfo.getQuickaudithtlacctamenid(), prevquickaudithtlacctamenid));
				if (isInternational || (user.getIsPASorAnySales() && breakinrates.equals("N")))
					qaInfo.setQarateincludes(accountQuickAuditMgr.getQuickAuditRateIncludesWithDiff(haccid, qaInfo.getQuickaudithtlacctamenid(), prevquickaudithtlacctamenid));
			}
			prevquickaudithtlacctamenid = qaInfo.getQuickaudithtlacctamenid();
		}

		qaData.setQuickAuditAmenInfo(qaInfoList);
		return qaData;
	}

	public List<AccountBlackoutGroup> getRolledupBlackouts(Long hotelid, Long period, String type, User user) {
		List<AccountBlackoutGroup> abgl = blackoutMgr.getRolledupBlackouts(hotelid, period, type, user);
		for (AccountBlackoutGroup abg : abgl) {
			List<HotelAccountname> han = new ArrayList<HotelAccountname>();
			List<String> hotelAccountInfoIDs = StringUtility.getDefinedDelimitedSubString(abg.getHotelAccountinfoString(),",",500);
			for (String hotelAccountInfoIdList : hotelAccountInfoIDs) {
				han.addAll(blackoutMgr.getBlackoutAccounts(hotelAccountInfoIdList));
			}
			abg.setHotelaccountlist(han);
		}

		return abgl;
	}

	public void updateRolledupBlackouts(List<AccountBlackoutGroup> accountBlackoutGroup, User user) {
		for (AccountBlackoutGroup abg : accountBlackoutGroup) {
			if (abg.getChanged().equals("Y")) {
				List<HotelBlackoutDate> blackoutList = abg.getBlackoutList();
				if (blackoutList != null && blackoutList.size() > 0) {
					for (int i = 0; i < blackoutList.size(); i++) {
						HotelBlackoutDate bld = blackoutList.get(i);
						if (bld.getStartdate() == null || bld.getEnddate() == null) {
							blackoutList.remove(i);
							i--;
						}
					}
					Collections.sort(blackoutList);
					Long i = 1L;
					for (HotelBlackoutDate bld : blackoutList)
						bld.setBlackoutid(i++);
				}
				blackoutMgr.updateRolledupBlackouts(blackoutList, abg.convertToHotelArray(), user);
			}
		}
	}

	@Override

	
	public QuickAuditRuleData getQuickAuditRules(long haccid, long affiliationid) {
		QuickAuditRuleData qaData = new QuickAuditRuleData();
		List<HotelRFPRmPools> roompoollist = accountRateMgr.getHotelAccountRmPools(haccid);
		qaData.setRoompoollist(roompoollist);
		List<QuickAuditRulesInfo> qaInfoList = accountQuickAuditMgr.getQuickAuditRuleInfo(haccid);
		Long prevQuickaudithtlacctruleid = null;
		for (QuickAuditRulesInfo qaInfo : qaInfoList) {
			if (prevQuickaudithtlacctruleid == null) {
				qaInfo.setQarules(accountQuickAuditMgr.getQuickAuditRules(haccid, qaInfo.getQuickaudithtlacctruleid()));
				
			} else {
				qaInfo.setQarules(accountQuickAuditMgr.getQuickAuditRulesWithDiff(haccid, qaInfo.getQuickaudithtlacctruleid(), prevQuickaudithtlacctruleid));
					}
			prevQuickaudithtlacctruleid = qaInfo.getQuickaudithtlacctruleid();
		}

		qaData.setQuickAuditRulesInfo(qaInfoList);
		return qaData;
	}
	
	public String getIsTopAccount(long hotel_accountinfoid){
		String isTopAccount  = hotelAccountSpecInfoMgr.getIsTopAccount(hotel_accountinfoid);
		
		return isTopAccount;
	}
	
	public String getIsHotelExempted(long hotelrfpid){
		String hotelExempted = hotelAccountSpecInfoMgr.getIsHotelExempted(hotelrfpid);
		
		return hotelExempted;
	}
	public List<TypeofPropertyDropDown> findPropertytypesDropDowns() {
		return hotelAccountSpecInfoMgr.findPropertytypesDropDowns();
	}
	
	public List<FinalPrintReportData> findFinalPrintReportPeriods(Long hotelid,	Long accountid, String role) {
		List<FinalPrintReportData> fprd = hotelAccountSpecInfoMgr.findFinalPrintReportPeriods(hotelid, accountid, role);
		return fprd;
	}
	
	public String getEarlyCharge() {
		return hotelAccountSpecInfoMgr.getEarlyCharge();
	}
	private List<HotelAccountSpecificRoomPoolData> hotelAccountSpecificRoomPoolDataMapping(List<HotelAccountSpecificRoomPoolDataDO> roomPoolDataDTOList) {
		
		List<HotelAccountSpecificRoomPoolData> roomPoolDataList=new ArrayList<HotelAccountSpecificRoomPoolData>();
		
		
		Map<Long, HotelAccountSpecificRoomPoolData> roomPoolDataMap = new HashMap<Long, HotelAccountSpecificRoomPoolData>();
		
		if (roomPoolDataDTOList != null && roomPoolDataDTOList.size() > 0) {
			HotelAccountSpecificRoomPoolData hotelAccountSpecificRoomPoolData = null;
			HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData = null;
			for (HotelAccountSpecificRoomPoolDataDO hotelAccountSpecificRoomPoolDataDO : roomPoolDataDTOList) {
				
				if (roomPoolDataMap.containsKey(hotelAccountSpecificRoomPoolDataDO.getRoomclassseq())) {
					hotelAccountSpecificRoomPoolData=roomPoolDataMap.get(hotelAccountSpecificRoomPoolDataDO.getRoomclassseq());
					
					hotelAccountSpecificPGOOSData=buildPGOOSData(hotelAccountSpecificRoomPoolDataDO);
					hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData().add(hotelAccountSpecificPGOOSData);
				}else {
					hotelAccountSpecificRoomPoolData=new HotelAccountSpecificRoomPoolData();
									
					
					hotelAccountSpecificRoomPoolData.setAccountrpflagid(hotelAccountSpecificRoomPoolDataDO.getAccountrpflagid());
					hotelAccountSpecificRoomPoolData.setAccepted(hotelAccountSpecificRoomPoolDataDO.getAccepted());
					hotelAccountSpecificRoomPoolData.setRoompool(hotelAccountSpecificRoomPoolDataDO.getRoomclassseq());
					hotelAccountSpecificRoomPoolData.setLra(hotelAccountSpecificRoomPoolDataDO.getLra());
					hotelAccountSpecificRoomPoolData.setRejectreasonid(hotelAccountSpecificRoomPoolDataDO.getRejectreasonid());
					hotelAccountSpecificRoomPoolData.setRejectionreason(hotelAccountSpecificRoomPoolDataDO.getRejectionreason());
					hotelAccountSpecificRoomPoolData.setIsSelected(hotelAccountSpecificRoomPoolDataDO.getIsSelected());
					
					List<HotelAccountSpecificPGOOSData> hotelAccountSpecificPGOOSDataList=new ArrayList<HotelAccountSpecificPGOOSData>();
					hotelAccountSpecificPGOOSData=buildPGOOSData(hotelAccountSpecificRoomPoolDataDO);
					hotelAccountSpecificPGOOSDataList.add(hotelAccountSpecificPGOOSData);
					
				    hotelAccountSpecificRoomPoolData.setHotelAccountSpecificPGOOSData(hotelAccountSpecificPGOOSDataList);
					
				    roomPoolDataMap.put(hotelAccountSpecificRoomPoolDataDO.getRoomclassseq(), hotelAccountSpecificRoomPoolData);
					roomPoolDataList.add(hotelAccountSpecificRoomPoolData);
			}
		}
		}
		return roomPoolDataList;
	}
	
	private HotelAccountSpecificPGOOSData buildPGOOSData(HotelAccountSpecificRoomPoolDataDO hotelAccountSpecificRoomPoolDataDO) {
		
		HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData=new HotelAccountSpecificPGOOSData();
		
		hotelAccountSpecificPGOOSData.setPgoos(hotelAccountSpecificRoomPoolDataDO.getPgoos());
		hotelAccountSpecificPGOOSData.setRemovalreason(hotelAccountSpecificRoomPoolDataDO.getRemovalreason());
		hotelAccountSpecificPGOOSData.setRemovalreasonid(hotelAccountSpecificRoomPoolDataDO.getRemovalreasonid());
		hotelAccountSpecificPGOOSData.setRoomClassSequence(hotelAccountSpecificRoomPoolDataDO.getRoomclassseq());
		hotelAccountSpecificPGOOSData.setRoomPoolSequence(hotelAccountSpecificRoomPoolDataDO.getRoompoolseq());
		
		return hotelAccountSpecificPGOOSData;
	}

	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetailCpac(long hotel_accountinfoid, long rateType, User user) {
		List<HotelAccountSpecQandA> haquest = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsDetail(hotel_accountinfoid);
		//Long rateType = hotelAccountSpecQuestionsMgr.getHotelAccountProductInfo(hotel_accountinfoid);
		boolean isEditable = true;
		Long noBidRateType = 17L;
		if (haquest != null && haquest.size() > 0) {
			HotelAccountInfoQuestionStatus haqstatus = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsModifiable(hotel_accountinfoid);
			for (int i = 0; i < haquest.size(); i++) {
				HotelAccountSpecQandA haq = haquest.get(i);
				isEditable = true;
				if(rateType == noBidRateType)
					isEditable = false;
				else if (user.getIsReadOnly())
					isEditable = false;
				else if (user.getIsPASAdmin() || user.getIsAnySalesUser())
					isEditable = true;
				else if (haqstatus.getAnswersModifiable().equals("Y"))
					isEditable = true;
				else if (haqstatus.getLocked().equals("Y") && haq.getAnswer() != null && !haq.getAnswer().equals(""))
					isEditable = false;
				haq.setEditable(isEditable);
			}

		}
		return haquest;
	}

	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetailCpac(long hotel_accountinfoid, long rateType, User user) {
		List<HotelAccountSpecQandA> haquest = hotelAccountSpecQuestionsMgr.findAccountSpecGroupQuestionsDetail(hotel_accountinfoid);
		//Long rateType = hotelAccountSpecQuestionsMgr.getHotelAccountProductInfo(hotel_accountinfoid);
		boolean isEditable = true;
		Long noBidRateType = 17L;
		if (haquest != null && haquest.size() > 0) {
			HotelAccountInfoQuestionStatus haqstatus = hotelAccountSpecQuestionsMgr.findAccountSpecQuestionsModifiable(hotel_accountinfoid);
			for (int i = 0; i < haquest.size(); i++) {
				HotelAccountSpecQandA haq = haquest.get(i);
				isEditable = true;
				if(rateType == noBidRateType)
					isEditable = false;
				else if (user.getIsReadOnly())
					isEditable = false;
				else if (user.getIsPASAdmin() || user.getIsAnySalesUser())
					isEditable = true;
				else if (haqstatus.getAnswersModifiable().equals("Y"))
					isEditable = true;
				else if (haqstatus.getLocked().equals("Y") && haq.getAnswer() != null && !haq.getAnswer().equals(""))
					isEditable = false;
				haq.setEditable(isEditable);
			}

		}
		return haquest;
	}
}
