package com.marriott.rfp.business.pricing.hotelrfpaccounts.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.AccountBlackoutGroup;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBlackoutData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificDataUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebid;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpeciifcGroupMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditCancelInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditData;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.hotelrfp.RemovalReason;
import  com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRuleData;
import com.marriott.rfp.object.user.User;	 
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;

public interface HotelRFPAccountSpecificService {
	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetail(long hotel_accountinfoid, User user);

	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetail(long hotel_accountinfoid, User user);

	public void updateAccountSpecificAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, List<HotelAccountSpecQandA> groupanswerList, User user);

	public void updateAccountSpecificAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> answerList, User user);

	public void updateAccountSpecificGroupAnswers(long hotel_accountinfoid, List<HotelAccountSpecQandA> groupanswerList, User user);

	public HotelAccountSpecificStatusData findHotelAccountStatusTabSpecific(long hotel_accountinfoid);

	public void updateAccountSpecificStatusTab(long hotel_accountinfoid, HotelAccountSpecificStatusData hasdu, User user);

	public HotelAccountSpecificRebid findHotelAccountRebidTabSpecific(long hotel_accountinfoid);

	public void updateAccountSpecificRebid(long hotel_accountinfoid, HotelAccountSpecificRebid hasd, User user);

	public HotelAccountSpecificFacility findHotelAccountFacilityTabSpecific(long hotel_accountinfoid, Long hotelid, Long accountid);

	public void updateAccountSpecificFacility(long hotel_accountinfoid, HotelAccountSpecificFacility hasdu, User user);

	public HotelAccountSpecific findAllHotelAccountSpecific(long hotel_accountinfoid, boolean isInternational, boolean isLOSBrand, User user);

	public HotelAccountSpecific findShortHotelAccountSpecific(long hotel_accountinfoid, long ratetype_selected, boolean isInternational, boolean isLOSBrand, User user);

	public HotelAccountSpecificData findHotelAccountSpecific(long hotel_accountinfoid);

	public HotelAccountSpecific findHotelAccountSpecificRates(long hotel_accountinfoid, boolean isInternational, boolean isLOSBrand, User user);

	public List<RemovalReason> findRemovalReasons();

	public List<RejectionReason> findRejectionReasons();

	public void updateAccountSpecific(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user);

	public void updateAccountSpecific(long hotel_accountinfoid, HotelAccountSpecificStatusUpdate hassu, User user, boolean publishrates);

	public void updateAccountSpecificShort(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user);

	public void updateCopyGov(long haccid, String rateCopy, User user);

	public void updateProduct(long haccid, long newratetype_selected, HotelAccountSpecificDataUpdate hasdu, String markComplete, User user);

	public void updateProduct(long haccid, long newratetype_selected, User user);

	public HotelAccountSpeciifcGroupMeetings getAccountGroupMeetings(long hotel_accountinfoid, long hotelid, User user);

	public void updateAccountGroupMeetings(long haccid, HotelAccountSpeciifcGroupMeetings detail, User user);

	public void updateAccountGroupMeetings(long haccid, long accountrecid, long hotelrfpid, HotelAccountSpeciifcGroupMeetings detail, String markComplete, User user);

	public List<MultiHotelAccountSpecific> findAllHotelAccountSpecificRates(long hotelrfpid, long startnum, boolean isInternational, boolean isLOSBrand, User user);

	public long findNumAllAccountSpecificForHotelDetails(long rfpid);

	public void updateAccountSpecificRates(Map<Long, HotelAccountSpecificDataUpdate> hasdmap, User user);

	public QuickAuditData getQuickAuditRates(long haccid, long affiliationid);

	public QuickAuditAmenData getQuickAuditAmenities(long haccid, boolean isInternational, String breakinrates, User user);
	
	public List<QuickAuditCancelInfo> getQuickAuditCancelInfo(long haccid);

	public List<AccountBlackoutGroup> getRolledupBlackouts(Long hotelid, Long period, String type, User user);

	public void updateRolledupBlackouts(List<AccountBlackoutGroup> accountBlackoutGroup, User user);

	public void updateAccountSpecificBlackout(long hotel_accountinfoid, String waiveBlackouts, Map<Long, HotelBlackoutDate> hasdu, User user);

	public HotelAccountSpecificBlackoutData findHotelAccountBlackTabSpecific(long hotel_accountinfoid, String isLocked, User user);

	public HotelAccountSpecificAmenityData findHotelAccountAmenityTabSpecific(long hotel_accountinfoid, long hotelrfpid);

	public void updateAccountSpecificAmenity(long hotel_accountinfoid, HotelAccountSpecificAmenityData hasdu, User user);

	public HotelAccountSpecificBusinessCase findHotelAccountCompelTabSpecific(long hotel_accountinfoid);

	public void updateAccountSpecificCompel(long hotel_accountinfoid, HotelAccountSpecificBusinessCase hasdu, User user);

	public HotelAccountSpecific findHotelAccountSpecificRatestab(long hotel_accountinfoid, User user);

	public void updateAccountSpecificRatestab(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, User user);

	public HotelAccountSpecificData findTabHotelAccountSpecific(long hotel_accountinfoid, User user);

	public void sendProductToMarshandPublishToHPP(Long hotel_accountinfoid, User user);
	
	public void updateAccountSpecificFlags(long hotel_accountinfoid, HotelAccountSpecificDataUpdate hasdu, User user);

	public QuickAuditRuleData getQuickAuditRules(long haccid, long affiliationid);
	
	public String getIsTopAccount(long hotel_accountinfoid);
	
	public String getIsHotelExempted(long hotelrfpid);

	public List<TypeofPropertyDropDown> findPropertytypesDropDowns();
	
	public List<FinalPrintReportData> findFinalPrintReportPeriods(Long hotelid, Long accountid, String role);
	
	public String getEarlyCharge();
	
	public void copySeasons(long rfpid, long haccid, long ratetype_selected, String acctype, User user);
	
	public List<HotelAccountSpecQandA> findAccountSpecQuestionsDetailCpac(long hotel_accountinfoid,long ratetype_selected, User user);

	public List<HotelAccountSpecQandA> findAccountSpecGroupQuestionsDetailCpac(long hotel_accountinfoid,long ratetype_selected, User user);
}
