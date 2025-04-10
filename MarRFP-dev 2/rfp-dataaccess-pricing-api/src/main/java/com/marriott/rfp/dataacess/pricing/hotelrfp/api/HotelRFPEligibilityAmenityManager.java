package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureCharge;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureChargeOptions;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.user.User;


public interface HotelRFPEligibilityAmenityManager {
	public List<HotelEligibility> getGeneralEligibility(long hotelrfpid);
	public void updateGeneralEligibility(long hotelrfpid, List<HotelEligibility> hotelEligibilityList, User user);
	public List<HotelAmenities> getGeneralAmenities(long hotelrfpid);
	public String getCxlPolicy(long hotelrfpid);
	public String getEarlyCharge();
	public List<EarlyDepartureChargeOptions> getChargeOptions();
	public EarlyDepartureCharge getEarlyDepartureCharge(long hotelrfpid);
	public void updateEarlyDepartureCharge(long hotelrfpid, EarlyDepartureCharge earlyDepartureCharge, User user);
}
