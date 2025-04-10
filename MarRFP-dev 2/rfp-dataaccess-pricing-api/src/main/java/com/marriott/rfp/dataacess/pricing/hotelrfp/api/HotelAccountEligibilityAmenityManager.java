package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRateIncludes;
import com.marriott.rfp.object.user.User;


public interface HotelAccountEligibilityAmenityManager {
	public List<HotelEligibility> getEligibility(long hotel_accountinfoid);

	public List<HotelAmenities> getAmenities(long hotel_accountinfoid, long hotelrfpid);

	public void updateEligibilityAmenity(long haccid, List<HotelEligibility> eligibility, User user);

	public void updateEligibility(long haccid, List<HotelEligibility> eligibility, User user);

	public void updateAmenity(long haccid, List<HotelAmenities> amenities, User user);

	public List<HotelRateIncludes> getRateIncludes(long hotel_accountinfoid);
	
	public boolean updateRateIncludes(long haccid, List<HotelRateIncludes> rateincludes, User user);
}
