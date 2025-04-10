package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.AccountFacility;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.user.User;


public interface HotelAccountFacilityManager {
	public List<AccountFacility> findFacilityDetails(long hotelid, long accountrecid);

	public boolean canPickFacility(long hotelid, long accountid);

	public void updateFacilityInfo(long haccid, HotelAccountSpecificFacility hasf, Contact salesContact, User user);

	public void updateFacilityInfo(long haccid, HotelAccountSpecificFacility hasf, User user);

	public void updateSalesInfo(long haccid, Contact salesContact, User user);

	public void updateRmNights(long haccid, Long rmNights, String extendcancelpolicy, String waiveCharge, User user);
	
	public void updateRmNights_1(long haccid, Long rmNights, Long altcxlpolicytimeid, String waiveCharge, User user);
	
	public String checkPropertyDistanceUnit(long hotelid);
}
