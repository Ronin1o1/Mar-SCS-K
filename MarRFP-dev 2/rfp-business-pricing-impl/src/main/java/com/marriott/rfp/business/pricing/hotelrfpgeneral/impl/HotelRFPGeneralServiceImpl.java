package com.marriott.rfp.business.pricing.hotelrfpgeneral.impl;

import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfpgeneral.api.HotelRFPGeneralService;
import com.marriott.rfp.dataaccess.currency.api.CurrencyManager;
import com.marriott.rfp.dataaccess.rd.hotelinvcount.api.HotelInvCountManager;
import com.marriott.rfp.dataacess.pricing.bedtyperoomtype.api.BedtypeRoomtypeManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelRoomPoolManager;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPBlackoutManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPEligibilityAmenityManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPManager;
import com.marriott.rfp.dataacess.pricing.hotelrfprespondent.api.HotelRFPRespondentManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.object.currency.CurrencyData;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;
import com.marriott.rfp.object.pricing.hotel.HotelRoomPool;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureCharge;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureChargeOptions;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPFinish;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPFinishView;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPoolDetails;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPoolsDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandards;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondent;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondentEmails;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.InvCount;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.InvCounts;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.Inventory;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.StatusApplicationControl;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPGeneralServiceImpl implements HotelRFPGeneralService {

	private static final Logger log = LoggerFactory.getLogger(HotelRFPGeneralServiceImpl.class);

	@Autowired
	private HotelRFPRespondentManager respondentMgr = null;

	@Autowired
	private HotelRFPManager rfpMgr = null;

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;

	@Autowired
	BedtypeRoomtypeManager bedtyperoomtypeMgr = null;

	@Autowired
	CurrencyManager currencyMgr = null;

	@Autowired
	HotelRFPEligibilityAmenityManager eligAmenMgr = null;

	@Autowired
	HotelRFPBlackoutManager blackoutMgr = null;

	@Autowired
	PeriodManager periodMgr = null;

	@Autowired
	HotelRoomPoolManager hotelRoomPoolMgr = null;

	@Autowired
	HotelInvCountManager hotelInvCountMgr = null;

	public HotelRFPRespondent getHotelRFPRespondent(long hotelrfpid, String loginName) {
		respondentMgr.checkRFPRespondent(hotelrfpid, loginName);
		return respondentMgr.getHotelRFPRespondent(hotelrfpid);
	}

	public List<HotelRFPRespondentEmails> getHotelRFPRespondentEmails(long respondentid) {
		return respondentMgr.getHotelRFPRespondentEmails(respondentid);
	}

	public void updateRFPRespondent(long hotelrfpid, HotelRFPRespondent hotelRFPRespondent,
			Map<String, HotelRFPRespondentEmails> hotelRFPRespondentEmails, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			hotelRFPRespondent.setHotelrfpid(hotelrfpid);
			respondentMgr.updateRFPRespondent(hotelRFPRespondent, user.getEid());
			long respondentid = respondentMgr.getHotelRFPRespondentId(hotelrfpid);
			if (hotelRFPRespondentEmails != null) {
				for (int i = 0; i < hotelRFPRespondentEmails.size(); i++) {
					hotelRFPRespondentEmails.get(String.valueOf(i + 1)).setRfprespondentid(respondentid);
					respondentMgr.updateRFPRespondentEmails(hotelRFPRespondentEmails.get(String.valueOf(i + 1)),
							user.getEid());
				}
			}
			hotelMenuMgr.update(hotelRFPRespondent.getHotelrfpid(), 11, 0, "", "C", user, "Y", "");
		}
	}

	public void updateBTflag(Long hotelrfpid, String acceptbtflg, User user) {
		respondentMgr.updateBTflag(hotelrfpid, acceptbtflg, user.getEid());
	}

	public List<Bedtype> getBedtypeList() {
		return bedtyperoomtypeMgr.getBedtypeList();
	}

	public List<Roomtype> getRoomtypeList() {
		return bedtyperoomtypeMgr.getRoomtypeList();
	}

	public List<CurrencyData> findCurrencyList(String currencyCode) {
		return currencyMgr.findCurrencyList(currencyCode);
	}

	public HotelRFPStandards getHotelRFPStandards(String marshacode, long hotelrfpid, User user) {
		updateHotelRoomPools(marshacode, hotelrfpid, user);
		//commented the below code as it was already called in the updateHotelRoomPools Method - SWIRM-192
		//hotelRoomPoolMgr.updateHotelRFPRoomPool(hotelrfpid, user);
		HotelRFPStandards hotelRFPStandards;
		hotelRFPStandards = rfpMgr.getHotelRFPStandards(hotelrfpid, user.getEid());
		List<HotelRFPStandardRmPoolsDO> hotelRFPStandardRmPoolsBOList = rfpMgr.getHotelRFPStandardsRmPools(hotelrfpid);		
		hotelRFPStandards.setHotelRFPStandardRmPools(mapHotelRFPStandardRmPools(hotelRFPStandardRmPoolsBOList));
		return hotelRFPStandards;
	}

	
	/***
	 * This method will act as a mapper which will convert HotelRFPStandardRmPoolsDO to HotelRFPStandardRmPools object
	 *  
	 * @param hotelRFPStandardRmPoolsBOList 
	 * 				This method will accept List<HotelRFPStandardRmPoolsDO> as input parameters
	 * @return List<HotelRFPStandardRmPools> 
	 * 			
	 */
	private List<HotelRFPStandardRmPools> mapHotelRFPStandardRmPools(
			List<HotelRFPStandardRmPoolsDO> hotelRFPStandardRmPoolsBOList) {
		List<HotelRFPStandardRmPools> hotelRFPStandardRmPoolsList = new ArrayList<HotelRFPStandardRmPools>();
		
		if(hotelRFPStandardRmPoolsBOList != null && hotelRFPStandardRmPoolsBOList.size() >0) {
			HotelRFPStandardRmPools hotelRFPStandardRmPools = null;
			
			List<HotelRFPStandardRmPoolDetails> hotelRFPStandardRmPoolDetailsList = null;
			Map<Long, HotelRFPStandardRmPools> roomPoolMap = new HashMap<Long, HotelRFPStandardRmPools>();
			for(HotelRFPStandardRmPoolsDO hotelRFPStandardRmPoolsBO : hotelRFPStandardRmPoolsBOList) {
				if(roomPoolMap.containsKey(hotelRFPStandardRmPoolsBO.getRoomClassSeq())){
					hotelRFPStandardRmPools = roomPoolMap.get(hotelRFPStandardRmPoolsBO.getRoomClassSeq());
					hotelRFPStandardRmPoolDetailsList = hotelRFPStandardRmPools.getRoomPools();
					hotelRFPStandardRmPoolDetailsList.add(createRFPStandardRmPoolDetails(hotelRFPStandardRmPoolsBO));
				}else {
					hotelRFPStandardRmPools  = new HotelRFPStandardRmPools();
					hotelRFPStandardRmPools.setRoomClassSeq(hotelRFPStandardRmPoolsBO.getRoomClassSeq());
					hotelRFPStandardRmPools.setBedtypeid(hotelRFPStandardRmPoolsBO.getBedtypeid());					
					hotelRFPStandardRmPools.setBedtype(hotelRFPStandardRmPoolsBO.getBedtype());					
									
					hotelRFPStandardRmPoolDetailsList = new ArrayList<HotelRFPStandardRmPoolDetails>();
					hotelRFPStandardRmPoolDetailsList.add(createRFPStandardRmPoolDetails(hotelRFPStandardRmPoolsBO));
					hotelRFPStandardRmPools.setRoomPools(hotelRFPStandardRmPoolDetailsList);
					
					roomPoolMap.put(hotelRFPStandardRmPoolsBO.getRoomClassSeq(), hotelRFPStandardRmPools);	
					hotelRFPStandardRmPoolsList.add(hotelRFPStandardRmPools);
				}				
				
			}
		}
		return hotelRFPStandardRmPoolsList;
	}
	
	/**
	 * This method is used to create HotelRFPStandardRmPoolDetails object by setting all the parameters
	 * 
	 * @param hotelRFPStandardRmPoolsBO
	 * 				this is the raw data received from database.
	 * @return HotelRFPStandardRmPoolDetails
	 */

	private HotelRFPStandardRmPoolDetails createRFPStandardRmPoolDetails(HotelRFPStandardRmPoolsDO hotelRFPStandardRmPoolsBO) {
		HotelRFPStandardRmPoolDetails hotelRFPStandardRmPoolDetails = new HotelRFPStandardRmPoolDetails();
		hotelRFPStandardRmPoolDetails.setRoomPoolSeq(hotelRFPStandardRmPoolsBO.getRoomPoolseq());
		hotelRFPStandardRmPoolDetails.setActualNumRooms(hotelRFPStandardRmPoolsBO.getActualnumrooms());
		hotelRFPStandardRmPoolDetails.setRoomPool(hotelRFPStandardRmPoolsBO.getRoompool());
		hotelRFPStandardRmPoolDetails.setRestrictionRpgm(hotelRFPStandardRmPoolsBO.getRestrictionrpgm());
		hotelRFPStandardRmPoolDetails.setRpgm(hotelRFPStandardRmPoolsBO.getRpgm());
		hotelRFPStandardRmPoolDetails.setRoomtype(hotelRFPStandardRmPoolsBO.getRoomtype());
		hotelRFPStandardRmPoolDetails.setRoomtypeid(hotelRFPStandardRmPoolsBO.getRoomtypeid());
		return hotelRFPStandardRmPoolDetails;
		
	}

	public List<HotelRoomPool> findAllRoomPoolsForHotel(Long hotelrfpid, User user, String softLaunchEnabled) {
		Long hotelid = rfpMgr.getHotelidFromHotelrfpid(hotelrfpid);
		return hotelRoomPoolMgr.findRoomPools(hotelid, hotelrfpid, user, softLaunchEnabled);
	}

	private void updateHotelRoomPools(String marshacode, Long hotelrfpid, User user) {
		Long hotelid = rfpMgr.getHotelidFromHotelrfpid(hotelrfpid);
		boolean bUpdated = hotelRoomPoolMgr.hasBeenUpdatedToday(hotelid);
		if (!bUpdated) {
			List<HotelRoomPool> hotelRoomPoolList = getRoomPoolsFromMarsha(marshacode);
			if (hotelRoomPoolList != null) {
				hotelRoomPoolMgr.updateHotelRoomPool(hotelid, hotelRoomPoolList, user);
				hotelRoomPoolMgr.deleteHotelRoomPool(hotelid, user);
			} else {
				hotelRoomPoolMgr.updateHotelRoomPoolDate( hotelid);
			}
		}
		hotelRoomPoolMgr.updateHotelRFPRoomPool(hotelrfpid, user);
	}

	private List<HotelRoomPool> getRoomPoolsFromMarsha(String marshacode) {
		List<HotelRoomPool> hotelRoomPoolList = null;
		OTA_HotelInvCountRS hic = hotelInvCountMgr.getHotelInvCount(marshacode);
		if (hic != null && hic.getErrors() == null && hic.getInventories() != null
				&& hic.getInventories().getInventory() != null) {
			hotelRoomPoolList = new Vector<HotelRoomPool>();
			Inventory[] invs = hic.getInventories().getInventory();
			for (int i = 0; i < invs.length; i++) {
				HotelRoomPool hrp = calculateRoomPoolNumber(invs[i]);
				if (hrp != null)
					hotelRoomPoolList.add(hrp);
			}
		}
		return hotelRoomPoolList;
	}

	private HotelRoomPool calculateRoomPoolNumber(Inventory inventory) {
		// Use type=13 (Transient Room sold) + Type 15 (Transient
		// Avail)=numRooms
		HotelRoomPool hrp = null;
		StatusApplicationControl sac = inventory.getStatusApplicationControl();
		String roompool = sac.getRatePlanCode();
		Long numrooms = 0L;
		InvCounts invCounts = inventory.getInvCounts();
		if (invCounts != null) {
			InvCount[] invCount = invCounts.getInvCount();
			for (int j = 0; j < invCount.length; j++) {
				if (invCount[j].getCountType().equals("13") || invCount[j].getCountType().equals("15")) {
					try {
						numrooms += Long.decode(invCount[j].getCount());
					} catch (Exception ex) {

					}
				}
			}
		}
		if (roompool != null && !numrooms.equals(0L)) {
			hrp = new HotelRoomPool();
			hrp.setRoompool(roompool);
			hrp.setActualnumrooms(numrooms);
		}
		return hrp;
	}

	public void updateHotelRFPStandards(long hotelrfpid, HotelRFPStandards hotelRFPStandards, String formChg,
			User user, long period) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			if (formChg != null && formChg.equals("Y")) {
				rfpMgr.updateHotelRFPStandards(hotelrfpid, hotelRFPStandards, user);
				rfpMgr.updateRFPStandardRmPools(hotelrfpid, hotelRFPStandards.getHotelRFPStandardRmPools(), user);
			}
			String status = "C";
			if (period > 2020 && (hotelRFPStandards.getExempt_gpp() == null || hotelRFPStandards.getExempt_gpp().isEmpty())) {
				status = "N";
			}
			hotelMenuMgr.update(hotelrfpid, 3, 0, "", status, user, "Y", "");
		}
	}

	public List<HotelEligibility> getGeneralEligibility(long hotelrfpid) {
		return eligAmenMgr.getGeneralEligibility(hotelrfpid);
	}

	public List<HotelAmenities> getGeneralAmenities(long hotelrfpid) {
		return eligAmenMgr.getGeneralAmenities(hotelrfpid);
	}
	
	public String getCxlPolicy(long hotelrfpid) {
		return eligAmenMgr.getCxlPolicy(hotelrfpid);
	}

	public void updateGeneralEligibility(String formChg, long hotelrfpid, List<HotelEligibility> hotelEligibilityList,
			User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			eligAmenMgr.updateGeneralEligibility(hotelrfpid, hotelEligibilityList, user);
			hotelMenuMgr.update(hotelrfpid, 12, 0, "", "C", user, "Y", "");
		}
	}

	public List<HotelBlackoutDate> getGeneralBlackouts(long hotelrfpid) {
		return blackoutMgr.getGeneralBlackouts(hotelrfpid);
	}

	public HotelBlackoutDates getGeneralBlackoutDates(long hotelrfpid) {
		HotelBlackoutDates hbd = new HotelBlackoutDates();
		hbd.setHotelBlackoutDate(getGeneralBlackouts(hotelrfpid));
		return hbd;
	}

	public void updateBlackoutDates(String formChg, long hotelrfpid, List<HotelBlackoutDate> hotelBlackoutDate,
			User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			if (formChg != null && formChg.equals("Y"))
				blackoutMgr.updateBlackoutDates(hotelrfpid, hotelBlackoutDate, user);
			hotelMenuMgr.update(hotelrfpid, 6, 0, "", "C", user, "Y", "");
		}
	}

	public List<HotelRFPFinish> getFinishStatus(long hotelrfpid, long pricingperiodid, User user) {
		return rfpMgr.getFinishStatus(hotelrfpid, pricingperiodid, user);
	}

	public HotelRFPFinishView getFinishData(long hotelrfpid, long period, long pricingperiodid, User user) {
		HotelRFPFinishView hfv = new HotelRFPFinishView();
		hfv.setDuedateList(periodMgr.findDueDates(period));
		/*
		 * if no pricing period selected, then find the nearest one after today
		 */
		if (pricingperiodid == -1) {
			for (int i = 0; i < hfv.getDuedateList().size(); i++) {
				if (DateUtility.isAfterToDay(hfv.getDuedateList().get(i).getDuedate())) {
					pricingperiodid = hfv.getDuedateList().get(i).getPricingperiodid();
					hfv.setSelectedpricingperiodid(pricingperiodid);
					break;
				}
			}
		}

		if (pricingperiodid == 0)
			hfv.setSelectedDueDate("All Due Dates");
		else {
			for (int i = 0; i < hfv.getDuedateList().size(); i++) {
				if (pricingperiodid == hfv.getDuedateList().get(i).getPricingperiodid()) {
					hfv.setSelectedDueDate(hfv.getDuedateList().get(i).getShortDueDate());
					break;
				}
			}
		}
		hfv.setHotelRFPFinishList(rfpMgr.getFinishStatus(hotelrfpid, pricingperiodid, user));

		return hfv;
	}

	public HotelRFPGroupsAndMeetings getHotelRFPGroupMeeting(long hotelrfpid) {
		return rfpMgr.getHotelRFPGroupMeeting(hotelrfpid);
	}

	public void updateGroupMeeting(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			rfpMgr.updateGroupMeeting(hotelrfpid, rfpHotel, user);
			hotelMenuMgr.update(hotelrfpid, 8, 0, "", "C", user, "Y", "");
		}
	}

	public HotelRFPGroupsAndMeetings getHotelRFPGroupPricing(long hotelrfpid) {
		return rfpMgr.getHotelRFPGroupPricing(hotelrfpid);
	}

	public void updateHotelRFPGroupPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			rfpMgr.updateHotelRFPGroupPricing(hotelrfpid, rfpHotel, user);
		}
	}

	public void updateGovTerms(long hotelrfpid, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			hotelMenuMgr.update(hotelrfpid, 13, 0, "", "C", user, "Y", "");
		}
	}

	public HotelRFPGroupsAndMeetings getHotelRFPGMRespond(long hotelrfpid) {
		return rfpMgr.getHotelRFPGMRespond(hotelrfpid);
	}

	public void updateHotelRFPGMRespond(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user,
			boolean statusflag) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			rfpMgr.updateHotelRFPGMRespond(hotelrfpid, rfpHotel, user);
			if (statusflag) {
				hotelMenuMgr.update(hotelrfpid, 8, 0, "", "C", user, "Y", "");
			}
		}
	}

	public HotelRFPGroupsAndMeetings getHotelRFPSIHMtgPricing(long hotelrfpid) {
		return rfpMgr.getHotelRFPSIHMtgPricing(hotelrfpid);
	}

	public HotelRFPGroupsAndMeetings getHotelRFPMtgPricing(long hotelrfpid) {
		return rfpMgr.getHotelRFPMtgPricing(hotelrfpid);
	}

	public void updateHotelRFPMtgPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			rfpMgr.updateHotelRFPMtgPricing(hotelrfpid, rfpHotel, user);
		}
	}

	public HotelRFPGroupsAndMeetings getHotelRFPPayPricing(long hotelrfpid) {
		return rfpMgr.getHotelRFPPayPricing(hotelrfpid);
	}

	public void updateHotelRFPPayPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			log.info("user: " + user.getRole());
			rfpMgr.updateHotelRFPPayPricing(hotelrfpid, rfpHotel, user);
		}
	}
	
	public String getEarlyCharge() {
		return eligAmenMgr.getEarlyCharge();
	}
	
	public List<EarlyDepartureChargeOptions> getChargeOptions() {
		return eligAmenMgr.getChargeOptions();
	}
	
	public EarlyDepartureCharge getEarlyDepartureCharge(long hotelrfpid) {
		return eligAmenMgr.getEarlyDepartureCharge(hotelrfpid);
	}
	
	public void updateEarlyDepartureCharge(long hotelrfpid, EarlyDepartureCharge earlyDepartureCharge, User user) {
		if (!user.getIsAnySalesUser() && !user.getIsReadOnly()) {
			eligAmenMgr.updateEarlyDepartureCharge(hotelrfpid, earlyDepartureCharge, user);
		}
	}

}
