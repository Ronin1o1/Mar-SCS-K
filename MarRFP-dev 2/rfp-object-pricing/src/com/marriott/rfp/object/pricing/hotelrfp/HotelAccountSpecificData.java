package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.marriott.rfp.object.pricing.account.AlternateCancPolicy;
import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificData implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private Long accountid;
	private List<LengthOfStay> accountLOS;
	private String accountname;
	private String accountpricingtype;
	private HashMap<String, HotelRates> accountRates;
	private Long accountrecid;
	private List<HotelRules> accountRules;
	private List<Season> accountSeason;
	private List<HotelAccountSpecQandA> accountspecQandA;
	private String accounttype;
	private String aer_account;
	private Long affiliationid;
	private String allow_floatnociel;
	// GBTA-4 Rates tab product offered dropdown
	private String allowHotelcanPriceFloatVP;
	private String allow_modify;
	private String allow_qmodify;
	private List<HotelAmenities> amenities;
	private List<HotelRateIncludes> rateincludes;
	private HotelBlackoutDates blackoutdates;
	private String breakfast_incl_corp_rates;
	private String business_case;
	private String cbcstatus;
	private HashMap<String, HotelRates> compareRates;
	private Long compareratetype;
	private Date contractend;
	private Date contractstart;
	private List<HotelEligibility> eligibility;
	private String excludeaer;
	private HashMap<String, HotelRates> fixedRates;
	private Contact globalSalesLead;
	/*
	 * Changes for Ticket number:RMSDB00011509 starts here
	 * Added the new function findRitzcarltonSalesLeader
	 */
	private Contact ritzcarltonSalesLead;
	/*
	 * Changes for Ticket number:RMSDB00011509 ends here
	 */
	private String gov_account;
	private String groupmeetings;
	private String grpsmtgrespond;
	private Long hotel_accountinfoid;
	private HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags;
	private HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase;
	private HotelAccountSpecificFacility hotelAccountSpecificFacility;
	private Long hotelid;
	private Long hotelrfpid;
	private String isAccepted;
	private String isLocked;
	private String ismaxaer;
	private String isProgress;
	private String isSelected;
	private String isSolicited;
	private String initialload;
	private Date last_updatedamenities;
	private Date last_updatedrates;
	private List<HotelLRA_NLRA> lranlratype;
	private String marshacode;
	private Long maxblackouts;
	private Long minpercent;
	private Long numblackouts;
	private Long numblackoutperiods;
	private Long maxblackoutperiod;
	private String offcycle;
	private Double percentdiscount;
	private String rateoffername1;
	private Long ratetype_selected;
	private Long ratetypeid;
	private Date rebid_due;
	private Date rebid_due2;
	private Date rebid_due3;
	private String rebid_notes;
	private String rebid_notes2;
	private String rebid_notes3;
	private Long rebidstatus;
	private Long rebidstatus2;
	private Long rebidstatus3;
	private String rebidstatus_desc;
	private String rebidstatus_desc2;
	private List<RoomTypeRef> roomtypelist;
	private List<HotelRFPRmPools> roompoollist;
	private Contact salesContact;
	private String waiveblackouts;
	private String markComplete;
	private Long rebidRound;
	private String lastupaterateeid;
	private String lastupateameneid;
	private String lastupaterateeemail;
	private String lastupateameneemail;
	private Long maxseasons;
	private Date cbc_softduedate;
	private String ispastcbc;
	private String hasnlrapricing;
	private String discfirsttieronly;
	private String breakinrates;
	private String country;
	private String isbrandextendedstay;
	private String showrebid;
	private String hasaccountspecquests;
	private String hasgroupspecquests;
	private String tabrebid_status;
	private String  tabstatus_status;
	private String tabrates_status;
	private String tabelig_status;
	private String tabcompel_status;
	private String tabgroup_status;
	private String tabblackout_status;
	private String tabfacility_status;
	private String tabquest_status;
	private String tabgengroup_status;
	private String tabspecificquest_status;
	private Long rm_nights;
	private String hassalescontact;
	private String hasfacility;
	private Long maxroompools;
	private Long availroompools;
	private String roomtypetextone;
	private String roomtypetexttwo;
	private List<HotelAccountSpecificRoomPoolData> roompooldetails;
	private String top_account;
	private Long altcancelpolicytimeid;
	private Long altcancelpolicyoptionid;
	private Long altcxlpolicytimeid;
	private List<AlternateCancPolicy> altcxlpolicyoptionlist;
	private String extendcancelpolicy;
	private String altcancelpolicytime;
	private Long altcancelpolicyid;
	private String altcancelpolicynotes;
	private String bt_booking_cost;
	private Date last_updatedrebid1;
	private Date last_updatedrebid2;
	private Date last_updatedrebid3;
	private String lastupdaterebid1eid;
	private String lastupdaterebid2eid;
	private String lastupdaterebid3eid;
	private String lastupdaterebid1email;
	private String lastupdaterebid2email;
	private String lastupdaterebid3email;
	private Long htlstdcxltime;
	private String waiveearlycharge;
	private String earlychargeresponse;
	private String rateOfferName;
	private List<HotelAccountSpecificRPData> rateProgDetails;
	private String accountStatus;

	
	/*GBTA-13 Copy Season functionality*/
	private Long accountpricingcycleid;
	private Long numGeneralSeason;
	private Long period;
	
	private String rollover;

	public String getRateOfferName() {
		return rateOfferName;
	}

	public void setRateOfferName(String rateOfferName) {
		this.rateOfferName = rateOfferName;
	}

	public List<HotelAccountSpecificRPData> getRateProgDetails() {
		return rateProgDetails;
	}

	public void setRateProgDetails(List<HotelAccountSpecificRPData> rateProgDetails) {
		this.rateProgDetails = rateProgDetails;
	}

	private List<AlternateCancPolicy> cxlorderlist;

	public String getEarlychargeresponse() {
		return earlychargeresponse;
	}

	public void setEarlychargeresponse(String earlychargeresponse) {
		this.earlychargeresponse = earlychargeresponse;
	}

	public String getWaiveearlycharge() {
		return waiveearlycharge;
	}

	public void setWaiveearlycharge(String waiveearlycharge) {
		this.waiveearlycharge = waiveearlycharge;
	}

	public Long getHtlstdcxltime() {
		return htlstdcxltime;
	}

	public void setHtlstdcxltime(Long htlstdcxltime) {
		this.htlstdcxltime = htlstdcxltime;
	}

	public Date getLast_updatedrebid1() {
		return last_updatedrebid1;
	}

	public void setLast_updatedrebid1(Date last_updatedrebid1) {
		this.last_updatedrebid1 = last_updatedrebid1;
	}

	public Date getLast_updatedrebid2() {
		return last_updatedrebid2;
	}

	public void setLast_updatedrebid2(Date last_updatedrebid2) {
		this.last_updatedrebid2 = last_updatedrebid2;
	}

	public Date getLast_updatedrebid3() {
		return last_updatedrebid3;
	}

	public void setLast_updatedrebid3(Date last_updatedrebid3) {
		this.last_updatedrebid3 = last_updatedrebid3;
	}

	public String getLastupdaterebid1eid() {
		return lastupdaterebid1eid;
	}

	public void setLastupdaterebid1eid(String lastupdaterebid1eid) {
		this.lastupdaterebid1eid = lastupdaterebid1eid;
	}

	public String getLastupdaterebid2eid() {
		return lastupdaterebid2eid;
	}

	public void setLastupdaterebid2eid(String lastupdaterebid2eid) {
		this.lastupdaterebid2eid = lastupdaterebid2eid;
	}

	public String getLastupdaterebid3eid() {
		return lastupdaterebid3eid;
	}

	public void setLastupdaterebid3eid(String lastupdaterebid3eid) {
		this.lastupdaterebid3eid = lastupdaterebid3eid;
	}

	public String getLastupdaterebid1email() {
		return lastupdaterebid1email;
	}

	public void setLastupdaterebid1email(String lastupdaterebid1email) {
		this.lastupdaterebid1email = lastupdaterebid1email;
	}

	public String getLastupdaterebid2email() {
		return lastupdaterebid2email;
	}

	public void setLastupdaterebid2email(String lastupdaterebid2email) {
		this.lastupdaterebid2email = lastupdaterebid2email;
	}

	public String getLastupdaterebid3email() {
		return lastupdaterebid3email;
	}

	public void setLastupdaterebid3email(String lastupdaterebid3email) {
		this.lastupdaterebid3email = lastupdaterebid3email;
	}

	public String getFormattedLast_updatedrebid1() {
		return DateUtility.formatLongDate(last_updatedrebid1);
	}

	public String getFormattedLast_updatedrebid2() {
		return DateUtility.formatLongDate(last_updatedrebid2);
	}

	public String getFormattedLast_updatedrebid3() {
		return DateUtility.formatLongDate(last_updatedrebid3);
	}
	public Long getAccountid() {
		return accountid;
	}

	public List<LengthOfStay> getAccountLOS() {
		return accountLOS;
	}

	public String getAccountname() {
		return accountname;
	}

	public String getAccountpricingtype() {
		return accountpricingtype;
	}

	public HashMap<String, HotelRates> getAccountRates() {
		return accountRates;
	}

	public int getAccountRatesSize() {
		if(accountRates!= null)
			return accountRates.size();
		else
			return 0;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public List<HotelRules> getAccountRules() {
		return accountRules;
	}

	public List<Season> getAccountSeason() {
		return accountSeason;
	}

	public List<HotelAccountSpecQandA> getAccountspecQandA() {
		return accountspecQandA;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public String getAer_account() {
		return aer_account;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public String getAllow_floatnociel() {
		return allow_floatnociel;
	}

	public String getAllow_modify() {
		return allow_modify;
	}

	public String getAllow_qmodify() {
		return allow_qmodify;
	}

	public List<HotelAmenities> getAmenities() {
		return amenities;
	}

	public HotelBlackoutDates getBlackoutdates() {
		return blackoutdates;
	}

	public String getBusiness_case() {
		return business_case;
	}

	public HashMap<String, HotelRates> getCompareRates() {
		return compareRates;
	}

	public Long getCompareratetype() {
		return compareratetype;
	}

	public Date getContractend() {
		return contractend;
	}

	public Date getContractstart() {
		return contractstart;
	}

	public String getFormattedContractend() {
		return DateUtility.formatShortDate(contractend);
	}

	public String getFormattedContractstart() {
		return DateUtility.formatShortDate(contractstart);
	}

	public List<HotelEligibility> getEligibility() {
		return eligibility;
	}

	public String getExcludeaer() {
		return excludeaer;
	}

	public HashMap<String, HotelRates> getFixedRates() {
		return fixedRates;
	}

	public Contact getGlobalSalesLead() {
		return globalSalesLead;
	}

	public String getGov_account() {
		return gov_account;
	}

	public String getGroupmeetings() {
		return groupmeetings;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public HotelAccountSpecificAccountFlags getHotelAccountSpecificAccountFlags() {
		return hotelAccountSpecificAccountFlags;
	}

	public HotelAccountSpecificBusinessCase getHotelAccountSpecificBusinessCase() {
		return hotelAccountSpecificBusinessCase;
	}

	public HotelAccountSpecificFacility getHotelAccountSpecificFacility() {
		return hotelAccountSpecificFacility;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public String getIsAccepted() {
		return isAccepted;
	}

	public String getIsLocked() {
		return isLocked;
	}

	public String getBoolStringIsLocked() {
		if (isLocked == null || isLocked.equals("N"))
			return "false";
		else
			return "true";
	}

	public String getIsmaxaer() {
		return ismaxaer;
	}

	public String getIsProgress() {
		return isProgress;
	}

	public String getIsSelected() {
		return isSelected;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public Date getLast_updatedamenities() {
		return last_updatedamenities;
	}

	public String getFormattedLast_updatedamenities() {
		return DateUtility.formatLongDate(last_updatedamenities);
	}

	public Date getLast_updatedrates() {
		return last_updatedrates;
	}

	public String getFormattedLast_updatedrates() {
		return DateUtility.formatLongDate(last_updatedrates);
	}

	public List<HotelLRA_NLRA> getLranlratype() {
		return lranlratype;
	}

	public String getMarshacode() {
		return marshacode;
	}

	public Long getMaxblackouts() {
		return maxblackouts;
	}

	public Long getMinpercent() {
		return minpercent;
	}

	public String getOffcycle() {
		return offcycle;
	}

	public Double getPercentdiscount() {
		return percentdiscount;
	}

	public String getRateoffername1() {
		return rateoffername1;
	}
	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public Long getRatetypeid() {
		return ratetypeid;
	}

	public Date getRebid_due() {
		return rebid_due;
	}

	public String getLongRebid_due() {
		return DateUtility.formatLongDate(rebid_due);
	}

	public Date getRebid_due2() {
		return rebid_due2;
	}

	public String getLongRebid_due2() {
		return DateUtility.formatLongDate(rebid_due2);
	}

	public Date getRebid_due3() {
		return rebid_due3;
	}

	public String getLongRebid_due3() {
		return DateUtility.formatLongDate(rebid_due3);
	}

	public String getRebid_notes() {
		return rebid_notes;
	}

	public String getRebid_notes2() {
		return rebid_notes2;
	}

	public String getRebid_notes3() {
		return rebid_notes3;
	}

	public Long getRebidstatus() {
		return rebidstatus;
	}

	public Long getRebidstatus2() {
		return rebidstatus2;
	}

	public Long getRebidstatus3() {
		return rebidstatus3;
	}

	public List<RoomTypeRef> getRoomtypelist() {
		return roomtypelist;
	}

	public Contact getSalesContact() {
		return salesContact;
	}

	public String getWaiveblackouts() {
		return waiveblackouts;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	public void setAccountLOS(List<LengthOfStay> accountLOS) {
		this.accountLOS = accountLOS;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setAccountpricingtype(String accountpricingtype) {
		this.accountpricingtype = accountpricingtype;
	}

	public void setAccountRates(HashMap<String, HotelRates> accountRates) {
		this.accountRates = accountRates;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public void setAccountRules(List<HotelRules> accountRules) {
		this.accountRules = accountRules;
	}

	public void setAccountSeason(List<Season> accountSeason) {
		this.accountSeason = accountSeason;
	}

	public void setAccountspecQandA(List<HotelAccountSpecQandA> accountspecQandA) {
		this.accountspecQandA = accountspecQandA;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public void setAer_account(String aer_account) {
		this.aer_account = aer_account;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setAllow_floatnociel(String allow_floatnociel) {
		this.allow_floatnociel = allow_floatnociel;
	}

	public void setAllow_modify(String allow_modify) {
		this.allow_modify = allow_modify;
	}

	public void setAllow_qmodify(String allow_qmodify) {
		this.allow_qmodify = allow_qmodify;
	}

	public void setAmenities(List<HotelAmenities> amenities) {
		this.amenities = amenities;
	}

	public void setBlackoutdates(HotelBlackoutDates blackoutdates) {
		this.blackoutdates = blackoutdates;
	}

	public void setBusiness_case(String business_case) {
		this.business_case = business_case;
	}

	public void setCompareRates(HashMap<String, HotelRates> compareRates) {
		this.compareRates = compareRates;
	}

	public void setCompareratetype(Long compareratetype) {
		this.compareratetype = compareratetype;
	}

	public void setContractend(Date contractend) {
		this.contractend = contractend;
	}

	public void setContractstart(Date contractstart) {
		this.contractstart = contractstart;
	}

	public void setEligibility(List<HotelEligibility> eligibility) {
		this.eligibility = eligibility;
	}

	public void setExcludeaer(String excludeaer) {
		this.excludeaer = excludeaer;
	}

	public void setFixedRates(HashMap<String, HotelRates> fixedRates) {
		this.fixedRates = fixedRates;
	}

	public void setGlobalSalesLead(Contact globalSalesLead) {
		this.globalSalesLead = globalSalesLead;
	}

	public void setGov_account(String gov_account) {
		this.gov_account = gov_account;
	}

	public void setGroupmeetings(String groupmeetings) {
		if (groupmeetings == null)
			groupmeetings = "N";
		this.groupmeetings = groupmeetings;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public void setHotelAccountSpecificAccountFlags(HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags) {
		this.hotelAccountSpecificAccountFlags = hotelAccountSpecificAccountFlags;
	}

	public void setHotelAccountSpecificBusinessCase(HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase) {
		this.hotelAccountSpecificBusinessCase = hotelAccountSpecificBusinessCase;
	}

	public void setHotelAccountSpecificFacility(HotelAccountSpecificFacility hotelAccountSpecificFacility) {
		this.hotelAccountSpecificFacility = hotelAccountSpecificFacility;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public void setIsAccepted(String isAccepted) {
		this.isAccepted = isAccepted;
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	public void setIsmaxaer(String ismaxaer) {
		this.ismaxaer = ismaxaer;
	}

	public void setIsProgress(String isProgress) {
		this.isProgress = isProgress;
	}

	public void setIsSelected(String isSelected) {
		this.isSelected = isSelected;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
	}

	public void setLast_updatedamenities(Date last_updatedamenities) {
		this.last_updatedamenities = last_updatedamenities;
	}

	public void setLast_updatedrates(Date last_updatedrates) {
		this.last_updatedrates = last_updatedrates;
	}

	public void setLranlratype(List<HotelLRA_NLRA> lranlratype) {
		this.lranlratype = lranlratype;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public void setMaxblackouts(Long maxblackouts) {
		this.maxblackouts = maxblackouts;
	}
	public void setNumblackoutperiods(Long numblackoutperiods) {
		this.numblackoutperiods = numblackoutperiods;
	}

	public Long getNumblackoutperiods() {
		return numblackoutperiods;
	}

	public void setMinpercent(Long minpercent) {
		this.minpercent = minpercent;
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
	}

	public void setPercentdiscount(Double percentdiscount) {
		this.percentdiscount = percentdiscount;
	}

	public void setStrPercentdiscount(String strpercentdiscount) {
		if (strpercentdiscount == null || strpercentdiscount.equals(""))
			this.percentdiscount = null;
		else
			this.percentdiscount = Double.valueOf(strpercentdiscount);
	}

	public void setRateoffername1(String rateoffername1) {
		this.rateoffername1 = rateoffername1;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public void setRatetypeid(Long ratetypeid) {
		this.ratetypeid = ratetypeid;
	}

	public void setRebid_due(Date rebid_due) {
		this.rebid_due = rebid_due;
	}

	public void setRebid_due2(Date rebid_due2) {
		this.rebid_due2 = rebid_due2;
	}

	public void setRebid_due3(Date rebid_due3) {
		this.rebid_due3 = rebid_due3;
	}

	public void setRebid_notes(String rebid_notes) {
		this.rebid_notes = rebid_notes;
	}

	public void setRebid_notes2(String rebid_notes2) {
		this.rebid_notes2 = rebid_notes2;
	}

	public void setRebid_notes3(String rebid_notes3) {
		this.rebid_notes3 = rebid_notes3;
	}

	public void setRebidstatus(Long rebidstatus) {
		this.rebidstatus = rebidstatus;
	}

	public void setRebidstatus2(Long rebidstatus2) {
		this.rebidstatus2 = rebidstatus2;
	}

	public void setRebidstatus3(Long rebidstatus3) {
		this.rebidstatus3 = rebidstatus3;
	}

	public void setRoomtypelist(List<RoomTypeRef> roomtypelist) {
		this.roomtypelist = roomtypelist;
	}

	public void setSalesContact(Contact salesContact) {
		this.salesContact = salesContact;
	}

	public void setWaiveblackouts(String waiveblackouts) {
		this.waiveblackouts = waiveblackouts;
	}

	public void setRebidstatus_desc(String rebidstatus_desc) {
		this.rebidstatus_desc = rebidstatus_desc;
	}

	public String getRebidstatus_desc() {
		return rebidstatus_desc;
	}

	public void setRebidstatus_desc2(String rebidstatus_desc2) {
		this.rebidstatus_desc2 = rebidstatus_desc2;
	}

	public String getRebidstatus_desc2() {
		return rebidstatus_desc2;
	}

	public void setMarkComplete(String markComplete) {
		this.markComplete = markComplete;
	}

	public String getMarkComplete() {
		return markComplete;
	}

	public void setRebidRound(Long rebidRound) {
		this.rebidRound = rebidRound;
	}

	public Long getRebidRound() {
		return rebidRound;
	}

	public String getAccountStatus() {
		String status = "";
		if (isAccepted != null && isAccepted.equals("Y"))
			status = "A";
		else if (isAccepted != null && isAccepted.equals("N"))
			status = "R";
		else if (isLocked != null && isLocked.equals("Y") && isProgress.equals("Y"))
			status = "L";
		else if (isSolicited != null && isSolicited.equals("Y"))
			status = "S";

		return status;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public void setBreakfast_incl_corp_rates(String breakfast_incl_corp_rates) {
		this.breakfast_incl_corp_rates = breakfast_incl_corp_rates;
	}

	public String getBreakfast_incl_corp_rates() {
		return breakfast_incl_corp_rates;
	}

	public void setLastupaterateeid(String lastupaterateeid) {
		this.lastupaterateeid = lastupaterateeid;
	}

	public String getLastupaterateeid() {
		return lastupaterateeid;
	}

	public void setLastupateameneid(String lastupateameneid) {
		this.lastupateameneid = lastupateameneid;
	}

	public String getLastupateameneid() {
		return lastupateameneid;
	}

	public void setLastupaterateeemail(String lastupaterateeemail) {
		this.lastupaterateeemail = lastupaterateeemail;
	}

	public String getLastupaterateeemail() {
		return lastupaterateeemail;
	}

	public void setLastupateameneemail(String lastupateameneemail) {
		this.lastupateameneemail = lastupateameneemail;
	}

	public String getLastupateameneemail() {
		return lastupateameneemail;
	}

	public void setMaxseasons(Long maxseasons) {
		this.maxseasons = maxseasons;
	}

	public Long getMaxseasons() {
		return maxseasons;
	}

	public void setCbc_softduedate(Date cbc_softduedate) {
		this.cbc_softduedate = cbc_softduedate;
	}

	public Date getCbc_softduedate() {
		return cbc_softduedate;
	}

	public String getShortCbc_softduedate() {
		return DateUtility.formatShortDate(cbc_softduedate);
	}

	public void setIspastcbc(String ispastcbc) {
		this.ispastcbc = ispastcbc;
	}

	public String getIspastcbc() {
		return ispastcbc;
	}

	public void setHasnlrapricing(String hasnlrapricing) {
		this.hasnlrapricing = hasnlrapricing;
	}

	public String getHasnlrapricing() {
		return hasnlrapricing;
	}

	public String getInitialload() {
		return initialload;
	}

	public void setInitialLoad(String initialload) {
		this.initialload = initialload;
	}

	public void setRateincludes(List<HotelRateIncludes> rateincludes) {
		this.rateincludes = rateincludes;
	}

	public List<HotelRateIncludes> getRateincludes() {
		return rateincludes;
	}

	public void setDiscfirsttieronly(String discfirsttieronly) {
		this.discfirsttieronly = discfirsttieronly;
	}

	public String getDiscfirsttieronly() {
		return discfirsttieronly;
	}

	public void setCbcstatus(String cbcstatus) {
		this.cbcstatus = cbcstatus;
	}

	public String getCbcstatus() {
		return cbcstatus;
	}

	public void setBreakinrates(String breakinrates) {
		this.breakinrates = breakinrates;
	}

	public String getBreakinrates() {
		return breakinrates;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountry() {
		return country;
	}

	public void setIsbrandextendedstay(String isbrandextendedstay) {
		this.isbrandextendedstay = isbrandextendedstay;
	}

	public String getIsbrandextendedstay() {
		return isbrandextendedstay;
	}

	public boolean getIsLOSBrand() {
		return isbrandextendedstay != null && isbrandextendedstay.equals("Y");
	}

	public boolean getIsInternational() {
		if(country!= null) {
			if (country.compareTo("US") == 0)
				return false;
			else
				return true;
		}
		else
			return false;
	}

	public void setShowrebid(String showrebid) {
		this.showrebid = showrebid;
	}

	public String getShowrebid() {
		return showrebid;
	}

	public void setHasaccountspecquests(String hasaccountspecquests) {
		this.hasaccountspecquests = hasaccountspecquests;
	}

	public String getHasaccountspecquests() {
		return hasaccountspecquests;
	}

	public String getTabrebid_status() {
		return tabrebid_status;
	}

	public void setTabrebid_status(String tabrebid_status) {
		this.tabrebid_status = tabrebid_status;
	}

	public String getTabstatus_status() {
		return tabstatus_status;
	}

	public void setTabstatus_status(String tabstatus_status) {
		this.tabstatus_status = tabstatus_status;
	}

	public String getTabrates_status() {
		return tabrates_status;
	}

	public void setTabrates_status(String tabrates_status) {
		this.tabrates_status = tabrates_status;
	}

	public String getTabelig_status() {
		return tabelig_status;
	}

	public void setTabelig_status(String tabelig_status) {
		this.tabelig_status = tabelig_status;
	}

	public String getTabcompel_status() {
		return tabcompel_status;
	}

	public void setTabcompel_status(String tabcompel_status) {
		this.tabcompel_status = tabcompel_status;
	}

	public String getTabgroup_status() {
		return tabgroup_status;
	}

	public void setTabgroup_status(String tabgroup_status) {
		this.tabgroup_status = tabgroup_status;
	}

	public String getTabblackout_status() {
		return tabblackout_status;
	}

	public void setTabblackout_status(String tabblackout_status) {
		this.tabblackout_status = tabblackout_status;
	}

	public String getTabfacility_status() {
		return tabfacility_status;
	}

	public void setTabfacility_status(String tabfacility_status) {
		this.tabfacility_status = tabfacility_status;
	}

	public void setInitialload(String initialload) {
		this.initialload = initialload;
	}

	public void setTabquest_status(String tabquest_status) {
		this.tabquest_status = tabquest_status;
	}

	public String getTabquest_status() {
		return tabquest_status;
	}

	public String getTabgengroup_status() {
		return tabgengroup_status;
	}

	public void setTabgengroup_status(String tabgengroup_status) {
		this.tabgengroup_status = tabgengroup_status;
	}

	public void setNumblackouts(Long numblackouts) {
		this.numblackouts = numblackouts;
	}

	public Long getNumblackouts() {
		return numblackouts;
	}
	public void setMaxblackoutperiod(Long maxblackoutperiod) {
		this.maxblackoutperiod = maxblackoutperiod;
	}

	public Long getMaxblackoutperiod() {
		return maxblackoutperiod;
	}

	public void setRm_nights(Long rm_nights) {
		this.rm_nights = rm_nights;
	}

	public Long getRm_nights() {
		return rm_nights;
	}

	public void setHassalescontact(String hassalescontact) {
		this.hassalescontact = hassalescontact;
	}

	public String getHassalescontact() {
		return hassalescontact;
	}

	public void setHasfacility(String hasfacility) {
		this.hasfacility = hasfacility;
	}

	public String getHasfacility() {
		return hasfacility;
	}

	public void setMaxroompools(Long maxroompools) {
		this.maxroompools = maxroompools;
	}

	public Long getMaxroompools() {
		return maxroompools;
	}


	public void setRoompoollist(List<HotelRFPRmPools> roompoollist) {
		this.roompoollist = roompoollist;
	}

	public List<HotelRFPRmPools> getRoompoollist() {
		return roompoollist;
	}

	public void setAvailroompools(Long availroompools) {
		this.availroompools = availroompools;
	}

	public Long getAvailroompools() {
		return availroompools;
	}

	public String getTabspecificquest_status() {
		return tabspecificquest_status;
	}

	public void setTabspecificquest_status(String tabspecificquest_status) {
		this.tabspecificquest_status = tabspecificquest_status;
	}

	public String getGrpsmtgrespond() {
		return grpsmtgrespond;
	}

	public void setGrpsmtgrespond(String grpsmtgrespond) {
		this.grpsmtgrespond = grpsmtgrespond;
	}

	public String getHasgroupspecquests() {
		return hasgroupspecquests;
	}

	public void setHasgroupspecquests(String hasgroupspecquests) {
		this.hasgroupspecquests = hasgroupspecquests;
	}

	public String getRoomtypetextone() {
		return roomtypetextone;
	}

	public void setRoomtypetextone(String roomtypetextone) {
		this.roomtypetextone = roomtypetextone;
	}

	public String getRoomtypetexttwo() {
		return roomtypetexttwo;
}
	public void setRoomtypetexttwo(String roomtypetexttwo) {
		this.roomtypetexttwo = roomtypetexttwo;
	}

	/**
	 * @param ritzcarltonSalesLead the ritzcarltonSalesLead to set
	 */
	public void setRitzcarltonSalesLead(Contact ritzcarltonSalesLead) {
		this.ritzcarltonSalesLead = ritzcarltonSalesLead;
	}

	/**
	 * @return the ritzcarltonSalesLead
	 */
	public Contact getRitzcarltonSalesLead() {
		return ritzcarltonSalesLead;
	}

	public List<HotelAccountSpecificRoomPoolData> getRoompooldetails() {
		return roompooldetails;
	}

	public void setRoompooldetails(
			List<HotelAccountSpecificRoomPoolData> roompooldetails) {
		this.roompooldetails = roompooldetails;
	}

	public String getTop_account() {
		return top_account;
	}

	public void setTop_account(String top_account) {
		this.top_account = top_account;
	}

	public String getAltcancelpolicynotes() {
		return altcancelpolicynotes;
	}

	public void setAltcancelpolicynotes(String altcancelpolicynotes) {
		this.altcancelpolicynotes = altcancelpolicynotes;
	}

	public Long getAltcancelpolicyid() {
		return altcancelpolicyid;
	}

	public void setAltcancelpolicyid(Long altcancelpolicyid) {
		this.altcancelpolicyid = altcancelpolicyid;
	}

	public String getAltcancelpolicytime() {
		return altcancelpolicytime;
	}

	public void setAltcancelpolicytime(String altcancelpolicytime) {
		this.altcancelpolicytime = altcancelpolicytime;
	}

	public String getExtendcancelpolicy() {
		return extendcancelpolicy;
	}

	public void setExtendcancelpolicy(String extendcancelpolicy) {
		this.extendcancelpolicy = extendcancelpolicy;
	}

	public Long getAltcancelpolicytimeid() {
		return altcancelpolicytimeid;
	}

	public void setAltcancelpolicytimeid(Long altcancelpolicytimeid) {
		this.altcancelpolicytimeid = altcancelpolicytimeid;
	}

	public String getBt_booking_cost() {
		return bt_booking_cost;
	}

	public void setBt_booking_cost(String bt_booking_cost) {
		this.bt_booking_cost = bt_booking_cost;
	}

	public Long getAltcancelpolicyoptionid() {
		return altcancelpolicyoptionid;
	}

	public void setAltcancelpolicyoptionid(Long altcancelpolicyoptionid) {
		this.altcancelpolicyoptionid = altcancelpolicyoptionid;
	}

	public Long getAltcxlpolicytimeid() {
		return altcxlpolicytimeid;
	}

	public void setAltcxlpolicytimeid(Long altcxlpolicytimeid) {
		this.altcxlpolicytimeid = altcxlpolicytimeid;
	}

	public List<AlternateCancPolicy> getAltcxlpolicyoptionlist() {
		return altcxlpolicyoptionlist;
	}

	public void setAltcxlpolicyoptionlist(List<AlternateCancPolicy> altcxlpolicyoptionlist) {
		this.altcxlpolicyoptionlist = altcxlpolicyoptionlist;
	}

	public List<AlternateCancPolicy> getCxlorderlist() {
		return cxlorderlist;
	}

	public void setCxlorderlist(List<AlternateCancPolicy> cxlorderlist) {
		this.cxlorderlist = cxlorderlist;
	}

	public String getRollover() {
		return rollover;
	}

	public void setRollover(String rollover) {
		this.rollover = rollover;
	}


	public String getAllowHotelcanPriceFloatVP() {
		return allowHotelcanPriceFloatVP;
	}

	public void setAllowHotelcanPriceFloatVP(String allowHotelcanPriceFloatVP) {
		this.allowHotelcanPriceFloatVP = allowHotelcanPriceFloatVP;
	}

	public Long getAccountpricingcycleid() {
		return accountpricingcycleid;
	}

	public void setAccountpricingcycleid(Long accountpricingcycleid) {
		this.accountpricingcycleid = accountpricingcycleid;
	}

	public Long getNumGeneralSeason() {
		return numGeneralSeason;
	}

	public void setNumGeneralSeason(Long numGeneralSeason) {
		this.numGeneralSeason = numGeneralSeason;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}
	
}
