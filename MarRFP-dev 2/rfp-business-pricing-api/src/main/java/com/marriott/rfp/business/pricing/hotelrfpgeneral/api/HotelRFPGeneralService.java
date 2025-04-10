package com.marriott.rfp.business.pricing.hotelrfpgeneral.api;

import java.util.List;
import java.util.Map;



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
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandards;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondent;
import com.marriott.rfp.object.pricing.hotelrfprespondent.HotelRFPRespondentEmails;
import com.marriott.rfp.object.user.User;


public interface HotelRFPGeneralService {
    public HotelRFPRespondent getHotelRFPRespondent(long hotelrfpid, String loginName);

    public List<HotelRFPRespondentEmails> getHotelRFPRespondentEmails(long respondentid);

    public void updateRFPRespondent(long hotelrfpid, HotelRFPRespondent hotelRFPRespondent,
	    Map<String, HotelRFPRespondentEmails> hotelRFPRespondentEmails, User user);

    public HotelRFPStandards getHotelRFPStandards(String marshacode, long hotelrfpid, User user);

    public void updateHotelRFPStandards(long hotelrfpid, HotelRFPStandards hotelRFPStandards,String formChg,  User user, long period);

    public List<HotelRoomPool> findAllRoomPoolsForHotel(Long hotelrfpid, User user, String softLaunchEnabled);

    public List<Bedtype> getBedtypeList();

    public List<Roomtype> getRoomtypeList();

    public List<CurrencyData> findCurrencyList(String currencyCode);

    public List<HotelEligibility> getGeneralEligibility(long hotelrfpid);

    public List<HotelAmenities> getGeneralAmenities(long hotelrfpid);
    
    public String getCxlPolicy(long hotelrfpid);

    public void updateGeneralEligibility(String formChg, long hotelrfpid, List<HotelEligibility> hotelEligibilityList, User user);

    public List<HotelBlackoutDate> getGeneralBlackouts(long hotelrfpid);

    public HotelBlackoutDates getGeneralBlackoutDates(long hotelrfpid);

    public void updateBlackoutDates(String formChg, long hotelrfpid, List<HotelBlackoutDate> hotelBlackoutDate, User user);

    public List<HotelRFPFinish> getFinishStatus(long hotelrfpid, long pricingperiodid, User user);

    public HotelRFPFinishView getFinishData(long hotelrfpid, long period, long pricingperiodid, User user);

    public HotelRFPGroupsAndMeetings getHotelRFPGroupMeeting(long hotelrfpid);

    public void updateGroupMeeting(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	public HotelRFPGroupsAndMeetings getHotelRFPGroupPricing(long hotelrfpid); 	
	
	public void updateHotelRFPGroupPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	
	public HotelRFPGroupsAndMeetings getHotelRFPGMRespond(long hotelrfpid);
	
	public void updateHotelRFPGMRespond(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user, boolean statusflag);
	
	public HotelRFPGroupsAndMeetings getHotelRFPSIHMtgPricing(long hotelrfpid);
	
	public HotelRFPGroupsAndMeetings getHotelRFPMtgPricing(long hotelrfpid);
	
	public void updateHotelRFPMtgPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	
	public HotelRFPGroupsAndMeetings getHotelRFPPayPricing(long hotelrfpid);
	
	public void updateHotelRFPPayPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);

    public void updateGovTerms(long hotelrfpid, User user);
    
    public void updateBTflag(Long hotelrfpid, String string, User user);
    
    public String getEarlyCharge();
    
    public List<EarlyDepartureChargeOptions> getChargeOptions();
    
    public EarlyDepartureCharge getEarlyDepartureCharge(long hotelrfpid);
    
    public void updateEarlyDepartureCharge(long hotelrfpid, EarlyDepartureCharge earlyDepartureCharge, User user);
}
