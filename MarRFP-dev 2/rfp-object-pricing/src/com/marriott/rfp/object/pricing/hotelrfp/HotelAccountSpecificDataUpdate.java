package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HotelAccountSpecificDataUpdate implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Map<String, LengthOfStay> accountLOS;
    private Map<String, HotelRates> accountRates;
    private List<HotelRules> accountRules;
    private Map<String, Season> accountSeason;
    private List<HotelAccountSpecQandA> accountspecQandA;
    private List<HotelAmenities> amenities;
    private List<HotelRateIncludes> rateincludes;
    private Map<Long, HotelBlackoutDate> hotelBlackoutDate;
    private String business_case;
    private HashMap<String, HotelRates> compareRates;
    private List<HotelEligibility> eligibility;
    private Map<String, HotelRates> fixedRates;
    private HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags;
    private HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase;
    private HotelAccountSpecificFacility hotelAccountSpecificFacility;
    private String isAccepted;
    private Double percentdiscount;
    private Date rebid_due;
    private String rebid_notes;
    private Long rebidstatus;
    private String waiveblackouts;
    private String markComplete;
    private Long rebidRound;
    private Contact salesContact;
    private String isLocked;
    private Long ratetype_selected;
    private String offcycle;
    private String accountpricingtype;
    private Long hotelid;
    private Long hotelrfpid;
    private Long hotel_accountinfoid;
    private Long accountrecid;
	private List<HotelAccountSpecificRoomPoolData> roompoolflags;
	private String extendcancelpolicy;
	
	private Long altcancelpolicyoptionid;
	private Long altcxlpolicytimeid;
	
	
	private String rollover;
	public String getRollover() {
		return rollover;
	}
	public void setRollover(String rollover) {
		this.rollover = rollover;
	}

	private String waiveearlycharge;
    public String getWaiveearlycharge() {
		return waiveearlycharge;
	}
	public void setWaiveearlycharge(String waiveearlycharge) {
		this.waiveearlycharge = waiveearlycharge;
	}

	public Long getAltcancelpolicyoptionid() {
		return altcancelpolicyoptionid;
	}

	public void setAltcancelpolicyoptionid(Long altcancelpolicyoptionid) {
		if(altcancelpolicyoptionid==null)
			this.altcancelpolicyoptionid = Long.parseLong("0");
		else
			this.altcancelpolicyoptionid = altcancelpolicyoptionid;
	}

	public Long getAltcxlpolicytimeid() {
		return altcxlpolicytimeid;
	}

	public void setAltcxlpolicytimeid(Long altcxlpolicytimeid) {
		if(altcxlpolicytimeid==null)
			this.altcxlpolicytimeid = Long.parseLong("0");
		else
			this.altcxlpolicytimeid = altcxlpolicytimeid;
	}

	public Map<String, LengthOfStay> getAccountLOS() {
	return accountLOS;
    }

    public void setAccountLOS(Map<String, LengthOfStay> accountLOS) {
	this.accountLOS = accountLOS;
    }

    public Map<String, HotelRates> getAccountRates() {
	return accountRates;
    }

    public void setAccountRates(Map<String, HotelRates> accountRates) {
	this.accountRates = accountRates;
    }

    public List<HotelRules> getAccountRules() {
	return accountRules;
    }

    public void setAccountRules(List<HotelRules> accountRules) {
	this.accountRules = accountRules;
    }

    public Map<String, Season> getAccountSeason() {
	return accountSeason;
    }

    public void setAccountSeason(Map<String, Season> accountSeason) {
	this.accountSeason = accountSeason;
    }

    public List<HotelAccountSpecQandA> getAccountspecQandA() {
	return accountspecQandA;
    }

    public void setAccountspecQandA(List<HotelAccountSpecQandA> accountspecQandA) {
	this.accountspecQandA = accountspecQandA;
    }

    public List<HotelAmenities> getAmenities() {
	return amenities;
    }

    public void setAmenities(List<HotelAmenities> amenities) {
	this.amenities = amenities;
    }

    public String getBusiness_case() {
	return business_case;
    }

    public void setBusiness_case(String business_case) {
	this.business_case = business_case;
    }

    public List<HotelEligibility> getEligibility() {
	return eligibility;
    }

    public void setEligibility(List<HotelEligibility> eligibility) {
	this.eligibility = eligibility;
    }

    public Map<String, HotelRates> getFixedRates() {
	return fixedRates;
    }

    public void setFixedRates(Map<String, HotelRates> fixedRates) {
	this.fixedRates = fixedRates;
    }

    public HotelAccountSpecificAccountFlags getHotelAccountSpecificAccountFlags() {
	return hotelAccountSpecificAccountFlags;
    }

    public void setHotelAccountSpecificAccountFlags(HotelAccountSpecificAccountFlags hotelAccountSpecificAccountFlags) {
	this.hotelAccountSpecificAccountFlags = hotelAccountSpecificAccountFlags;
    }

    public HotelAccountSpecificBusinessCase getHotelAccountSpecificBusinessCase() {
	return hotelAccountSpecificBusinessCase;
    }

    public void setHotelAccountSpecificBusinessCase(HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase) {
	this.hotelAccountSpecificBusinessCase = hotelAccountSpecificBusinessCase;
    }

    public HotelAccountSpecificFacility getHotelAccountSpecificFacility() {
	return hotelAccountSpecificFacility;
    }

    public void setHotelAccountSpecificFacility(HotelAccountSpecificFacility hotelAccountSpecificFacility) {
	this.hotelAccountSpecificFacility = hotelAccountSpecificFacility;
    }

    public String getIsAccepted() {
	return isAccepted;
    }

    public void setIsAccepted(String isAccepted) {
	this.isAccepted = isAccepted;
    }

    public Double getPercentdiscount() {
	return percentdiscount;
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

    public Date getRebid_due() {
	return rebid_due;
    }

    public void setRebid_due(Date rebid_due) {
	this.rebid_due = rebid_due;
    }

    public String getRebid_notes() {
	return rebid_notes;
    }

    public void setRebid_notes(String rebid_notes) {
	this.rebid_notes = rebid_notes;
    }

    public Long getRebidstatus() {
	return rebidstatus;
    }

    public void setRebidstatus(Long rebidstatus) {
	this.rebidstatus = rebidstatus;
    }

    public String getWaiveblackouts() {
	return waiveblackouts;
    }

    public void setWaiveblackouts(String waiveblackouts) {
	this.waiveblackouts = waiveblackouts;
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

    public void setSalesContact(Contact salesContact) {
	this.salesContact = salesContact;
    }

    public Contact getSalesContact() {
	return salesContact;
    }

    public void setIsLocked(String isLocked) {
	this.isLocked = isLocked;
    }

    public String getIsLocked() {
	return isLocked;
    }

    public void setRatetype_selected(Long ratetype_selected) {
	this.ratetype_selected = ratetype_selected;
    }

    public Long getRatetype_selected() {
	return ratetype_selected;
    }

    public void setOffcycle(String offcycle) {
	this.offcycle = offcycle;
    }

    public String getOffcycle() {
	return offcycle;
    }

    public void setAccountpricingtype(String accountpricingtype) {
	this.accountpricingtype = accountpricingtype;
    }

    public String getAccountpricingtype() {
	return accountpricingtype;
    }

    public void setHotelBlackoutDate(Map<Long, HotelBlackoutDate> hotelBlackoutDate) {
	this.hotelBlackoutDate = hotelBlackoutDate;
    }

    public Map<Long, HotelBlackoutDate> getHotelBlackoutDate() {
	return hotelBlackoutDate;
    }

    public void setHotel_accountinfoid(Long hotel_accountinfoid) {
	this.hotel_accountinfoid = hotel_accountinfoid;
    }

    public Long getHotel_accountinfoid() {
	return hotel_accountinfoid;
    }

    public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
	this.hotelrfpid = hotelrfpid;
    }

    public Long getHotelrfpid() {
	return hotelrfpid;
    }

    public void setAccountrecid(Long accountrecid) {
	this.accountrecid = accountrecid;
    }

    public Long getAccountrecid() {
	return accountrecid;
    }

    public void setCompareRates(HashMap<String, HotelRates> compareRates) {
	this.compareRates = compareRates;
    }

    public HashMap<String, HotelRates> getCompareRates() {
	return compareRates;
    }

	public void setRateincludes(List<HotelRateIncludes> rateincludes) {
		this.rateincludes = rateincludes;
	}

	public List<HotelRateIncludes> getRateincludes() {
		return rateincludes;
	}

    public List<HotelAccountSpecificRoomPoolData> getRoompoolflags() {
		return roompoolflags;
	}

	public void setRoompoolflags(
			List<HotelAccountSpecificRoomPoolData> roompoolflags) {
		this.roompoolflags = roompoolflags;
	}

	public String getExtendcancelpolicy() {
		return extendcancelpolicy;
	}

	public void setExtendcancelpolicy(String extendcancelpolicy) {
		this.extendcancelpolicy = extendcancelpolicy;
	}
}
