package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;

import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAccountFlags;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebid;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolDataDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatus;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.RebidStatus;
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;
import com.marriott.rfp.object.user.User;


public interface HotelAccountSpecInfoManager {
	public HotelAccountSpecificData findAccountSpecificDetail(long hotel_accountinfoid);

	public HotelAccountSpecificData findAccountSpecificDetailfortab(long hotel_accountinfoid);

	public HotelAccountSpecificData findAccountSpecificDetailforRates(long hotel_accountinfoid);

	public HotelAccountSpecificAmenityData findAccountSpecificAmenity(long hotel_accountinfoid);

	public Contact findGlobalSalesLeader(long accountrecid);
	
	/*
	 * Changes for Ticket number:RMSDB00011509 starts here
	 * Added the new function findRitzcarltonSalesLeader
	 */
	public Contact findRitzcarltonSalesLeader(long accountrecid);
	
	/*
	 * Changes for Ticket number:RMSDB00011509 ends here
	 */

	public Contact findSalesContact(long hotel_accountinfoid, long accountid, String marshacode);

	public Contact findSalesContact(long hotel_accountinfoid);

	public Long findMaxBlackouts(long hotel_accountinfoid);

	public HotelAccountSpecificBusinessCase findAccountSpecBusinessCase(long hotel_accountinfoid);

	public HotelAccountSpecificFacility findAccountSpecificFacility(long hotel_accountinfoid);

	public HotelAccountSpecificAccountFlags findAccountSpecStatus(long hotel_accountinfoid);

	public HotelAccountSpecificRebid findAccountSpecificRebid(long hotel_accountinfoid);

	public List<RebidStatus> getBTRebidStatus();

	public void updateAccountFlags(long haccid, String isAccepted, HotelAccountSpecificAccountFlags hasaFlags, User user);

	public void updateRebidStatus(long haccid, Long rebidRound, Long rebidstatus_id, String rebid_notes, User user);

	public void updateCompellingBusinessCase(long haccid, String business_case, HotelAccountSpecificBusinessCase hasbc, User user);

	public void updateAccountPercentDiscount(long haccid, Double percent, User user);

	public void updateCopyGov(long haccid, String rateCopy, User user);

	public void updateProduct(long haccid, long newratetype_selected, User user);
	
	public HotelAccountSpeciifcGroupMeetings getAccountGroupMeetings(long hotel_accountinfoid, long hotelid);

	public void updateAccountGroupMeetings(long haccid, HotelAccountSpeciifcGroupMeetings detail, User user);

	public List<MultiHotelAccountSpecific> findAllAccountSpecificForHotelDetails(long rfpid, long startNum);

	public long findNumAllAccountSpecificForHotelDetails(long rfpid);

	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, User user);

	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, String rateprog, User user);

	public HotelAccountSpecificStatus getLatestTransactionStatus(Long hotelAccountInfoId, User user, long roomClassId);
	public HotelAccountInfo getHotelAccountInfo(Long hotel_accountinfoid);

	public void updateMarketcode(long haccid, User user);

	public void updateAccountSpecTabStatus(Long hotel_accountinfoid, HotelAccountSpecificStatusUpdate hassu, User user);

	public List<HotelAccountSpecificRoomPoolDataDO> findAllRoomPoolDetail(long hotel_accountinfoid);
	
	public String getIsTopAccount(long hotel_accountinfoid);
	
	public String getIsHotelExempted(long hotelrfpid);
					
	public List<TypeofPropertyDropDown> findPropertytypesDropDowns();
	
	public List<FinalPrintReportData> findFinalPrintReportPeriods(Long hotelid, Long accountid, String role);
	
	public String getEarlyCharge();
	
	public void copySeasons(long rfpid, long haccid, long ratetype_selected, String acctype, User user);
	

}
