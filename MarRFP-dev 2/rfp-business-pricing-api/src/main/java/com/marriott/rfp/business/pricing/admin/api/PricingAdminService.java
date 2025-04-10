package com.marriott.rfp.business.pricing.admin.api;

import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountCompDropDownLists;
import com.marriott.rfp.object.pricing.account.AccountDetailBrands;
import com.marriott.rfp.object.pricing.account.AccountDetailCompMatrix;
import com.marriott.rfp.object.pricing.account.AccountDetailGeneral;
import com.marriott.rfp.object.pricing.account.AccountDetailRFP;
import com.marriott.rfp.object.pricing.account.AccountDropDownLists;
import com.marriott.rfp.object.pricing.account.AccountEmailInfo;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestionTypes;
import com.marriott.rfp.object.pricing.account.AccountSpecQuestions;
import com.marriott.rfp.object.pricing.account.AccountUpdateInfo;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;
import com.marriott.rfp.object.pricing.account.MCADDropDownLists;
import com.marriott.rfp.object.pricing.account.RenegSubmitList;
import com.marriott.rfp.object.pricing.account.RfpFileSentList;
import com.marriott.rfp.object.pricing.account.RfpLaunchRecapEmail;
import com.marriott.rfp.object.pricing.account.RfpSettingsDropDownLists;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Bedtype;
import com.marriott.rfp.object.pricing.bedtyperoomtype.Roomtype;
import com.marriott.rfp.object.pricing.filterLists.AccountFilterLists;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelGPPPGOOSListData;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSAuditListData;
import com.marriott.rfp.object.pricing.hotel.Ignore2ndRoomPool;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFODetails;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOFilterLists;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOSearch;
import com.marriott.rfp.object.pricing.hotelsfo.MarketArea;
import com.marriott.rfp.object.pricing.hotelsfo.SalesMarket;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetailDO;
import com.marriott.rfp.object.pricing.pgoos.MirrorInfo;
import com.marriott.rfp.object.pricing.pgoos.MirrorSearchCriteria;
import com.marriott.rfp.object.user.User;


import java.io.ByteArrayInputStream;
import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


public interface PricingAdminService {
	String accountCopybyTierUpdate(long fromperiod, long toperiod, String accountsegment, User user);

	void accountCopyPricingUpdate(long fromAccountrecid, long toAccountrecid, String copyQuests, String copyGMQuests, User user);

	void deleteBedtype(long bedtypeid);

	void deleteDueDate(Long pricingperiodid);
	
	void deleteCBCDueDate(Long pricingperiodid);

	void deleteRoomtype(long promo_roomtypeid);

	List<Account> findAccountList(long period, String accountPricingType, String accountSegment, String filterString, int orderby, Page page);

	List<HotelListData> findAccountTrackingHotels();

	PricingPeriod findDueDate(Long pricingperiodid);
	
	PricingPeriod findCBCDueDate(Long pricingperiodid);

	List<Period> findPeriodsForMaintenance();
	
	List<Period> findCBCPeriodsForMaintenance();

	List<Period> findAllPeriodsExcept(long period);

	AccountDetailGeneral getGeneralAccountDetails(long accountrecid, User user);

	AccountFilterLists getAccountFilterLists();

	AccountFilterLists getPricingAccountFilterLists();

	List<AccountSegment> getAllAccountSegments();

	Bedtype getBedtypeForMaintenance(long bedtypeid);

	List<Bedtype> getBedtypesForMaintenance(String orderBy);

	List<Account> getFromAccountList(long period);

	List<Period> getFromPeriods(String role);

	List<HotelListData> getRoomPoolExemptList(long affiliationid, String pgoosable, int orderHotelBy);

	Roomtype getRoomtypeForMaintenance(long promo_roomtypeid);

	List<Roomtype> getRoomtypesForMaintenance(String orderBy);

	List<Account> getToAccountList(long period);

	List<Period> getToPeriods(String role);

	long getTotalAccoutListPages(long period, String accountPricingType, String accountSegment, String filterString, int orderby, long maxpagelen);

	AccountUpdateInfo updateAccount(AccountDetailGeneral adg, User user);

	AccountUpdateInfo updateAccountBrands(AccountDetailBrands adb, User user);
	
	void updateAccountDetailRFP(AccountDetailRFP adr, User user);

	void updateAccountTrackingHotels(List<HotelListData> hotelList);

	void updateBedtype(Bedtype bedtype);

	void updateDueDate(PricingPeriod dueDate);
	
	void updateCBCDueDate(PricingPeriod dueDate);

	void updateHotelView(List<Period> periods);
	
	void updateCBCHotelView(List<Period> periods);
	
	void updateHotelView(Period period);
	
	void updateCBCHotelView(Period period);

	void updateRoomPoolExemptList(List<HotelListData> hotelList);

	void updateRoomPoolExempt(HotelListData hotelList);
	List<Ignore2ndRoomPool> getIgnore2ndRoomPoolOptions();

	void updateRoomtype(Roomtype roomtype);

	void deleteAccount(Long accountrecid, User user);

	List<Account> getCopyAccountList(long copyperiod, long period);

	Long updateAccountCopyInfo(String copyFromExisting, String copySAPP, Long editperiod, Long copyrec, User user);

	AccountDropDownLists findAccountMaintDropDowns(long period);

	Period findPeriodDetails(long period);

	String getSysDate();

	List<AccountSpecQuestions> getQuestions(long accountrecid);

	List<AccountSpecQuestionTypes> getQuestionTypes();

	Account findAccountInfo(long accountrecid);

	void updateQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user);

	void deleteQuestion(long questionid, Long accountrecid, User user);

	List<AccountSpecQuestions> getGroupMtgQuestions(long accountrecid);

	void updateGroupMtgQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user);

	void deleteGroupMtgQuestion(long questionid, Long accountrecid, User user);

	List<MCADData> findOracleMCAD(long accountrecid);

	List<MCADData> getNetezzaMcadSummaryByName(String businessName, String businessLevel, String countryCode) throws SQLException;

	List<MCADData> getNetezzaMcadSummaryById(Long businessId, String businessLevel, String countryCode) throws SQLException;

	List<MCADData> getNetezzaMcadSummaryByChild(Long businessId, String parentbusinessLevel, String childBusinessLevel) throws SQLException;

	MCADDropDownLists getMCADDropDownLists();

	long getMaxMCADLink();

	void updateMCADData(long accountrecid, Map<String, MCADData> umcadMap) throws SQLException;

	MCADDetail findNetezzaMCADDetail(Long businessId) throws SQLException;

	MCADDetail findOracleMCADDetail(long accountrecid, long businessid);

	List<MirrorDetail> findMirrorsForHotels(MirrorSearchCriteria mirrorexpsearch);

	MirrorDetail findMirrorsForHotel(Long hotelid ,Long roomClassSequence, Long roomPoolSequence);

	long getMirrorHotelsNumPages(long maxpagelen, MirrorSearchCriteria mirrorSearchCriteria);

	

	void updateMirror(MirrorInfo model);

	void deleteMirror(long hotelid);

	List<HotelSFODetails> findHotelSFOList(HotelSFOSearch filter);

	long getTotalHotelSFOListPages(HotelSFOSearch filter);

	HotelSFOFilterLists getSFOFilterList(HotelSFOSearch filter);

	List<MarketArea> findMarketArea(long salesareaid);

	HotelSFODetails getHotelSFODetails(long hotelid);

	List<SalesMarket> getSalesAreaList();

	void updateHotelSFO(HotelSFODetails model, User user);

	List<HotelPGOOSAuditListData> findPGOOSAuditTrailDetail(String marshaCode, Long period);

	List<HotelGPPPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user);

	void updateHotelGPPPgoosMaintanence(long accountrecid, List<HotelGPPPGOOSListData> hotelpgoosmaint, User user);

	void copySappDetailsToNewAccount(long from_acctrecid, long to_acctrecid, User user);
	
	List<String> getCustomAnswersForQuestion(String questionId, String accSpec);
	
	List<String> getCustomAnswers(String questionId, String accSpec);

    AccountDetailBrands getBrandAccountDetails(Long accountrecid, User userProperties);
    
    AccountDetailRFP getAccountDetailRFP(long accountrecid);
    
    AccountDetailCompMatrix getAccountDetailCompMatrix(long accountrecid);
    
    AccountCompDropDownLists findAccountCompDropDowns();
    
    RfpSettingsDropDownLists findRfpSettingsDropDowns(long accountrecid);
    
    List<RfpFileSentList> getRfpFileList(long accountrecid);
    
    List<RenegSubmitList> getRenegSubmitList(long accountrecid);
    
    void updateAccountDetailCompMatrix(AccountDetailCompMatrix adcm, User user);

    String saveExcelDataQues(ByteArrayInputStream qfile, Long accountrecid, long max_questions, User user);

	String saveExcelDataGMQues(ByteArrayInputStream qfile, Long accountrecid, long max_questions, User user);

	AccountEmailInfo sendRFPLaunchEmail(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail, User userProperties);
    
    void updateRFPAdditionalText(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail, User userProperties);
    
    RfpLaunchRecapEmail getRFPAdditionalText(Long accountrecid);
}
