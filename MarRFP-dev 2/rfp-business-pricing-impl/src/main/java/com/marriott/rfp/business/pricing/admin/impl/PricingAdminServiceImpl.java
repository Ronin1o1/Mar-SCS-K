package com.marriott.rfp.business.pricing.admin.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.country.api.CountryManager;
import com.marriott.rfp.dataaccess.hotel.api.HotelManager;
import com.marriott.rfp.dataaccess.sendemail.api.SendEmailManager;
import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.accountgrpmtgquestions.api.AccountGrpMtgQuestionsManager;
import com.marriott.rfp.dataacess.pricing.accountmcad.api.AccountMCADManager;
import com.marriott.rfp.dataacess.pricing.accountmcad.api.NetezzaMCADManager;
import com.marriott.rfp.dataacess.pricing.accountpricingcycle.api.AccountPricingCycleManager;
import com.marriott.rfp.dataacess.pricing.accountpricingtype.api.AccountPricingTypeManager;
import com.marriott.rfp.dataacess.pricing.accountquestions.api.AccountQuestionsManager;
import com.marriott.rfp.dataacess.pricing.accountsegment.api.AccountSegmentManager;
import com.marriott.rfp.dataacess.pricing.accountthirdparty.api.AccountThirdPartyManager;
import com.marriott.rfp.dataacess.pricing.allowableaerpercents.api.AllowableAerPercentsManager;
import com.marriott.rfp.dataacess.pricing.alternateCancPolicy.api.AlternateCancPolicyManager;
import com.marriott.rfp.dataacess.pricing.bedtyperoomtype.api.BedtypeRoomtypeManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelGPPPGOOSMaintenanceManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPGOOSAuditManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.hotelsfo.api.HotelSFOManager;
import com.marriott.rfp.dataacess.pricing.mudroom.api.AdminMudroomManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
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
import com.marriott.rfp.object.pricing.account.EmailValidator;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;
import com.marriott.rfp.object.pricing.account.MCADDropDownLists;
import com.marriott.rfp.object.pricing.account.RFPLaunchEmail;
import com.marriott.rfp.object.pricing.account.RenegSubmitList;
import com.marriott.rfp.object.pricing.account.RfpFileSentList;
import com.marriott.rfp.object.pricing.account.RfpLaunchRecapEmail;
import com.marriott.rfp.object.pricing.account.RfpSettingsDropDownLists;
import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
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
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetailDO;
import com.marriott.rfp.object.pricing.pgoos.MirrorInfo;
import com.marriott.rfp.object.pricing.pgoos.MirrorRoomClassDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorRoomPoolDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorSearchCriteria;
import com.marriott.rfp.object.sendemail.SendEmail;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.NumberUtility;

/**
 * Session Bean implementation class PricingAdminServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class PricingAdminServiceImpl implements PricingAdminService {

    private static final Logger log = LoggerFactory.getLogger(PricingAdminServiceImpl.class);


    @Autowired
    private PeriodManager periodMgr = null;

    @Autowired
    private AccountManager accountMgr = null;

    @Autowired
    AccountSegmentManager accountSegmentMgr = null;

    @Autowired
    AccountPricingTypeManager accountPricingTypeMgr = null;

    @Autowired
    AccountPricingCycleManager accountPricingCycleMgr = null;

    @Autowired
    AccountThirdPartyManager accountThirdPartyMgr = null;
    @Autowired
    AllowableAerPercentsManager allowableAerPercentsMgr = null;
    @Autowired
    AlternateCancPolicyManager alternateCancPolicyManager = null;
    @Autowired
    HotelManager hotelMgr = null;

    @Autowired
    HotelPricingManager hotelPricingMgr = null;
    @Autowired
    HotelMenuManager hotelMenuMgr = null;

    @Autowired
    BedtypeRoomtypeManager bedtyperoomtypeMgr = null;

    @Autowired
    AccountQuestionsManager accountQuestionsMgr = null;

    @Autowired
    AccountGrpMtgQuestionsManager accountgmQuestionsMgr = null;

    @Autowired
    AccountMCADManager accountMCADMgr = null;

    @Autowired
    NetezzaMCADManager netezzaMCADMgr = null;

    @Autowired
    RFPConstantsManager constantsMgr = null;

    @Autowired
    CountryManager countryMgr = null;

    @Autowired
    HotelSFOManager hotelSFOMgr = null;

    @Autowired
    HotelPGOOSAuditManager hotelPGOOSAuditMgr = null;

    @Autowired
    HotelGPPPGOOSMaintenanceManager hotelGPPPGOOSMaintenanceMgr = null;

    @Autowired
    AdminMudroomManager adminMudroomManager = null;

    @Autowired
    private SendEmailManager sendEmailMgr = null;

    public List<Period> findPeriodsForMaintenance() {
        List<Period> periodList = periodMgr.findPeriodsForMaintenance();
        return periodList;
    }

    public List<Period> findCBCPeriodsForMaintenance() {
        List<Period> periodList = periodMgr.findCBCPeriodsForMaintenance();
        return periodList;
    }

    public List<Period> findAllPeriodsExcept(long period) {
        List<Period> periodList = periodMgr.findAllPeriodsExcept(period);
        return periodList;
    }

    public PricingPeriod findDueDate(Long pricingperiodid) {
        return periodMgr.findDueDate(pricingperiodid);
    }

    public PricingPeriod findCBCDueDate(Long pricingperiodid) {
        return periodMgr.findCBCDueDate(pricingperiodid);
    }

    public void updateDueDate(PricingPeriod dueDate) {
        periodMgr.updateDueDate(dueDate);
    }

    public void updateCBCDueDate(PricingPeriod dueDate) {
        periodMgr.updateCBCDueDate(dueDate);
    }

    public void deleteDueDate(Long pricingperiodid) {
        periodMgr.deleteDueDate(pricingperiodid);
    }

    public void deleteCBCDueDate(Long pricingperiodid) {
        periodMgr.deleteCBCDueDate(pricingperiodid);
    }

    public void updateHotelView(Period period) {
        periodMgr.updateHotelView(period);
    }

    public void updateCBCHotelView(Period period) {
        periodMgr.updateCBCHotelView(period);
    }

    public void updateHotelView(List<Period> periods) {
        for (int i = 0; i < periods.size(); i++)
            updateHotelView(periods.get(i));
    }

    public void updateCBCHotelView(List<Period> periods) {
        for (int i = 0; i < periods.size(); i++)
            updateCBCHotelView(periods.get(i));
    }

    public List<Account> getFromAccountList(long period) {
        return accountMgr.getFromToAccountList(period, false);
    }

    public List<Account> getToAccountList(long period) {
        return accountMgr.getFromToAccountList(period, true);
    }

    public void accountCopyPricingUpdate(long fromAccountrecid, long toAccountrecid, String copyQuests, String copyGMQuests, User user) {
        accountMgr.accountCopyPricingUpdate(fromAccountrecid, toAccountrecid, copyQuests, copyGMQuests, user);
    }

    public List<AccountSegment> getAllAccountSegments() {
        return accountSegmentMgr.getAllAccountSegments();
    }

    public List<Period> getFromPeriods(String role) {
        List<Period> periodFromList = periodMgr.findAllPeriodsForRole(role);
        List<Period> newperiodList;
        newperiodList = new ArrayList<Period>(periodFromList.size());
        newperiodList.addAll(periodFromList);
        newperiodList.remove(0);
        return newperiodList;
    }

    public List<Period> getToPeriods(String role) {
        List<Period> periodToList = periodMgr.findAllPeriodsForRole(role);
        List<Period> newperiodList;
        newperiodList = new ArrayList<Period>(periodToList.size());
        newperiodList.addAll(periodToList);
        newperiodList.remove(newperiodList.size() - 1);
        return newperiodList;
    }

    public String accountCopybyTierUpdate(long fromperiod, long toperiod, String accountsegment, User user) {
        return accountMgr.accountCopybyTierUpdate(fromperiod, toperiod, accountsegment, user);
    }

    public List<HotelListData> findAccountTrackingHotels() {
        return hotelPricingMgr.findAccountTrackingHotels();
    }

    public void updateAccountTrackingHotels(List<HotelListData> hotelList) {
        for (int i = 0; i < hotelList.size(); i++) {
            if (hotelList.get(i).getChanged().equals("Y"))
                hotelPricingMgr.updateAccountTrackingHotels(hotelList.get(i));
        }
    }

    public List<HotelListData> getRoomPoolExemptList(long affiliationid, String pgoosable, int orderHotelBy) {
        return hotelPricingMgr.getRoomPoolExemptList(affiliationid, pgoosable, orderHotelBy);
    }

    public void updateRoomPoolExemptList(List<HotelListData> hotelList) {
        for (int i = 0; i < hotelList.size(); i++) {
            if (hotelList.get(i).getChanged().equals("Y"))
                hotelPricingMgr.updateRoomPoolExemptList(hotelList.get(i));
        }
    }

    public List<Ignore2ndRoomPool> getIgnore2ndRoomPoolOptions() {
        return hotelPricingMgr.getIgnore2ndRoomPoolOptions();
    }

    public void updateRoomPoolExempt(HotelListData hotelList) {
        hotelPricingMgr.updateRoomPoolExemptList(hotelList);
    }

    public List<Bedtype> getBedtypesForMaintenance(String orderBy) {
        return bedtyperoomtypeMgr.getBedtypesForMaintenance(orderBy);
    }

    public void updateBedtype(Bedtype bedtype) {
        bedtyperoomtypeMgr.updateBedtype(bedtype);
    }

    public List<Roomtype> getRoomtypesForMaintenance(String orderBy) {
        return bedtyperoomtypeMgr.getRoomtypesForMaintenance(orderBy);
    }

    public void updateRoomtype(Roomtype roomtype) {
        bedtyperoomtypeMgr.updateRoomtype(roomtype);
    }

    public void deleteAccount(Long accountrecid, User user) {
        accountMgr.deleteAccount(accountrecid, user);
    }

    public Bedtype getBedtypeForMaintenance(long bedtypeid) {
        return bedtyperoomtypeMgr.getBedtypeForMaintenance(bedtypeid);
    }

    public Roomtype getRoomtypeForMaintenance(long promo_roomtypeid) {
        return bedtyperoomtypeMgr.getRoomtypeForMaintenance(promo_roomtypeid);
    }

    public void deleteBedtype(long bedtypeid) {
        bedtyperoomtypeMgr.deleteBedtype(bedtypeid);
    }

    public void deleteRoomtype(long promo_roomtypeid) {
        bedtyperoomtypeMgr.deleteRoomtype(promo_roomtypeid);
    }

    public List<Account> findAccountList(long period, String accountPricingType, String accountSegment, String filterString, int orderby, Page page) {
        return accountMgr.findAccountList(period, accountPricingType, accountSegment, filterString, orderby, page);
    }

    public AccountDetailGeneral getGeneralAccountDetails(long accountrecid, User user) {
        AccountDetailGeneral adg = null;
        if (accountrecid == 0) {
            adg = new AccountDetailGeneral();
            if (user.getIsSAPPAdmin()) {
                adg.setAccountpricingtype("P");
            }
            adg.setEnhancedDiscount(constantsMgr.getEnhancedDiscount());
        } else {
            adg = accountMgr.getGeneralAccountDetails(accountrecid);
        }
        adg.setAccountThirdPartyRegion(accountMgr.getThirdPartyRegions(accountrecid));

        return adg;
    }

    @Override
    public AccountDetailBrands getBrandAccountDetails(Long accountrecid, User user) {
        AccountDetailBrands adb = accountMgr.getBrandAccountDetails(accountrecid);
        adb.setRateprograms(accountMgr.getRatePrograms(accountrecid, "N", true));
        if (adb.getAer_account() != null && adb.getAer_account().equals("Y")) {
            adb.setAerrateprograms(accountMgr.getRatePrograms(accountrecid, "Y", true));
        }
        adb.setBrands(accountMgr.getBrands(accountrecid));
        adb.setAccountbrandlist(accountMgr.getAccountBrandList(accountrecid));
        adb = accountMgr.updateBrands(adb);
        adb.setMax_roompools(constantsMgr.getNumRoomPools());
        return adb;
    }

    public AccountUpdateInfo updateAccount(AccountDetailGeneral adg, User user) {
        AccountUpdateInfo accountup = accountMgr.updateAccount_new(adg, user);
        return accountup;
    }

    public AccountUpdateInfo updateAccountBrands(AccountDetailBrands adb, User user) {
        return accountMgr.updateAccountBrands(adb, user);
    }

    public long getTotalAccoutListPages(long period, String accountPricingType, String accountSegment, String filterString, int orderby, long maxpagelen) {
        long totalNumPages = accountMgr.getAccountListNum(period, accountPricingType, accountSegment, filterString, orderby);
        return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
    }

    public void updateAccountDetailRFP(AccountDetailRFP adr, User user) {
        accountMgr.updateAccountDetailRFP(adr, user);
    }

    public AccountFilterLists getAccountFilterLists() {
        return getAllAccountFilterLists("N");
    }

    public AccountFilterLists getPricingAccountFilterLists() {
        return getAllAccountFilterLists("Y");
    }

    public AccountFilterLists getAllAccountFilterLists(String filter) {
        AccountFilterLists afl = new AccountFilterLists();
        List<Period> periodList = periodMgr.findPeriodsForMaintenance();
        List<AccountSegment> accountSegmentList;
        List<AccountPricingType> accountPricingTypeList;
        if (filter.equals("Y")) {
            accountSegmentList = accountSegmentMgr.getPricingAccountSegmentsOrderByAccDesc();
            accountPricingTypeList = accountPricingTypeMgr.getDisplayAccountPricingTypes();
        } else {
            accountSegmentList = accountSegmentMgr.getAllAccountSegments();
            accountPricingTypeList = accountPricingTypeMgr.getAllAccountPricingTypes();
        }
        afl.setPeriodList(periodList);
        afl.setAccountSegmentList(accountSegmentList);
        afl.setAccountPricingTypeList(accountPricingTypeList);
        return afl;
    }

    public List<Account> getCopyAccountList(long copyperiod, long period) {
        return accountMgr.getCopyAccountList(copyperiod, period);
    }

    public Long updateAccountCopyInfo(String copyFromExisting, String copySAPP, Long editperiod, Long copyrec, User user) {
        Long accountrecid;
        if (copyFromExisting != null && copyFromExisting.equals("on")) {
            accountrecid = accountMgr.updateAccountCopyInfo(copySAPP, editperiod, copyrec, user);
        } else
            accountrecid = new Long(0);
        return accountrecid;

    }

    public AccountDropDownLists findAccountMaintDropDowns(long period) {
        AccountDropDownLists addl = new AccountDropDownLists();

        addl.setAccountPricingCycleList(accountPricingCycleMgr.getAccountPricingCycle());
        addl.setAccountPricingTypeList(accountPricingTypeMgr.getAllAccountPricingTypes());
        addl.setAccountSegmentList(accountSegmentMgr.getAllAccountSegments());
        addl.setAccountThirdPartyList(accountThirdPartyMgr.getAllAccountThirdParties());
        addl.setPricingPeriodList(periodMgr.findDueDates(period));
        addl.setAllowableAerPercentsList(allowableAerPercentsMgr.getAllowableAerPercents());
        addl.setAlternateCancPolicyList(alternateCancPolicyManager.getAlternateCancPolicylist());
        addl.setAlternateCancPolicyTimeList(alternateCancPolicyManager.getAlternateCancPolicyTimelist());
        addl.setAlternateCancPolicyOptionList(alternateCancPolicyManager.getAlternateCancPolicyOptionlist());
        addl.setAccountHotelViewList(accountMgr.getAccountHotelViewlist());
        return addl;
    }

    public Period findPeriodDetails(long period) {
        return periodMgr.findPeriodDetails(period);
    }

    public String getSysDate() {
        return DateUtility.formatLongDate(periodMgr.getSysDate());
    }

    public List<AccountSpecQuestions> getQuestions(long accountrecid) {
        return accountQuestionsMgr.getQuestions(accountrecid);
    }

    public List<AccountSpecQuestionTypes> getQuestionTypes() {
        return accountQuestionsMgr.getQuestionTypes();
    }

    public List<String> getCustomAnswersForQuestion(String questionId, String accspec) {
        return accountQuestionsMgr.getCustomAnswersForQuestion(questionId, accspec);
    }

    public List<String> getCustomAnswers(String quesId, String accspec) {
        return accountQuestionsMgr.getCustomAnswers(quesId, accspec);
    }

    public Account findAccountInfo(long accountrecid) {
        return accountMgr.findAccountInfo(accountrecid);
    }

    public void updateQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user) {
        accountQuestionsMgr.updateQuestions(aq, accountrecid, user);
        hotelMenuMgr.updateRevisitStatus(accountrecid);
    }

    public void deleteQuestion(long questionid, Long accountrecid, User user) {
        AccountSpecQuestions aqs = new AccountSpecQuestions();
        aqs.setQuestion_id(questionid);
        List<AccountSpecQuestions> aq = new Vector<AccountSpecQuestions>(1);
        aq.add(aqs);
        accountQuestionsMgr.updateQuestions(aq, null, user);
        hotelMenuMgr.updateRevisitStatus(accountrecid);
    }

    public List<AccountSpecQuestions> getGroupMtgQuestions(long accountrecid) {
        return accountgmQuestionsMgr.getQuestions(accountrecid);
    }

    public void updateGroupMtgQuestions(List<AccountSpecQuestions> aq, Long accountrecid, User user) {
        accountgmQuestionsMgr.updateQuestions(aq, accountrecid, user);
        hotelMenuMgr.updateRevisitStatus(accountrecid);
    }

    public void deleteGroupMtgQuestion(long questionid, Long accountrecid, User user) {
        AccountSpecQuestions aqs = new AccountSpecQuestions();
        aqs.setQuestion_id(questionid);
        List<AccountSpecQuestions> aq = new Vector<AccountSpecQuestions>(1);
        aq.add(aqs);
        accountgmQuestionsMgr.updateQuestions(aq, null, user);
        hotelMenuMgr.updateRevisitStatus(accountrecid);
    }

    public List<MCADData> findOracleMCAD(long accountrecid) {
        return accountMCADMgr.findOracleMCAD(accountrecid);
    }

    public List<MCADData> getNetezzaMcadSummaryByName(String businessName, String businessLevel, String countryCode) throws SQLException {
        String url = constantsMgr.getNetezzaURL();
        String netezzaUserId = constantsMgr.getNetezzaUserID();
        String netezzaPassword = constantsMgr.getNetezzaPassword();
        Long maxResults = constantsMgr.getMaxMcadResults();

        List<MCADData> md = netezzaMCADMgr.getNetezzaMcadSummaryByName(businessName, businessLevel, countryCode, maxResults, url, netezzaUserId, netezzaPassword);
        for (int i = 0; i < md.size(); i++) {
            md.get(i).setBusinesslevelcode(businessLevel);
        }
        return md;
    }

    public List<MCADData> getNetezzaMcadSummaryById(Long businessId, String businessLevel, String countryCode) throws SQLException {
        String url = constantsMgr.getNetezzaURL();
        String netezzaUserId = constantsMgr.getNetezzaUserID();
        String netezzaPassword = constantsMgr.getNetezzaPassword();
        Long maxResults = constantsMgr.getMaxMcadResults();
        List<MCADData> md = netezzaMCADMgr.getNetezzaMcadSummaryById(businessId, businessLevel, maxResults, url, netezzaUserId, netezzaPassword);
        for (int i = 0; i < md.size(); i++) {
            md.get(i).setBusinesslevelcode(businessLevel);
        }
        return md;
    }

    public List<MCADData> getNetezzaMcadSummaryByChild(Long businessId, String parentbusinessLevel, String childBusinessLevel) throws SQLException {
        String url = constantsMgr.getNetezzaURL();
        String netezzaUserId = constantsMgr.getNetezzaUserID();
        String netezzaPassword = constantsMgr.getNetezzaPassword();
        Long maxResults = constantsMgr.getMaxMcadResults();

        List<MCADData> md = netezzaMCADMgr.getNetezzaMcadSummaryByChild(businessId, parentbusinessLevel, childBusinessLevel, maxResults, url, netezzaUserId, netezzaPassword);
        for (int i = 0; i < md.size(); i++) {
            md.get(i).setBusinesslevelcode(childBusinessLevel);
        }
        return md;
    }

    public MCADDropDownLists getMCADDropDownLists() {
        MCADDropDownLists mddl = new MCADDropDownLists();
        mddl.setCountries(countryMgr.getCountries());
        return mddl;
    }

    public long getMaxMCADLink() {
        return constantsMgr.getMaxMcadLink();
    }

    public MCADDetail findNetezzaMCADDetail(Long businessId) throws SQLException {
        String url = constantsMgr.getNetezzaURL();
        String netezzaUserId = constantsMgr.getNetezzaUserID();
        String netezzaPassword = constantsMgr.getNetezzaPassword();
        return netezzaMCADMgr.findNetezzaMCADDetail(businessId, url, netezzaUserId, netezzaPassword);
    }

    public void updateMCADData(long accountrecid, Map<String, MCADData> mcadDataList) throws SQLException {
        String url = constantsMgr.getNetezzaURL();
        String netezzaUserId = constantsMgr.getNetezzaUserID();
        String netezzaPassword = constantsMgr.getNetezzaPassword();
        accountMCADMgr.deleteMCAD(accountrecid);
        if (mcadDataList != null) {
            for (String keybusinessid : mcadDataList.keySet()) {
                MCADDetail mcadDetail = netezzaMCADMgr.findNetezzaMCADDetail(mcadDataList.get(keybusinessid).getBusinessid(), url, netezzaUserId, netezzaPassword);
                mcadDetail.setBusinesslevelcode(mcadDataList.get(keybusinessid).getBusinesslevelcode());
                if (mcadDetail.getBusinessid() != null) {
                    accountMCADMgr.updateMCAD(accountrecid, mcadDetail);
                }
            }
        }
    }

    public MCADDetail findOracleMCADDetail(long accountrecid, long businessid) {
        return accountMCADMgr.findOracleMCADDetail(accountrecid, businessid);
    }

    public List<MirrorDetail> findMirrorsForHotels(MirrorSearchCriteria mirrorexpsearch) {
        List<MirrorDetailDO> mirrorDetailDOList = hotelPricingMgr.findMirrorsForHotels(mirrorexpsearch);
        return mirrorDetailMapping(mirrorDetailDOList);
    }

    public MirrorDetail findMirrorsForHotel(Long hotelid, Long roomClassSequence, Long roomPoolSequence) {
        return buildNewMirrorDetail(hotelPricingMgr.findMirrorsForHotel(hotelid, roomClassSequence, roomPoolSequence));
    }

    public long getMirrorHotelsNumPages(long maxpagelen, MirrorSearchCriteria mirrorSearchCriteria) {
        long numHotels = hotelPricingMgr.getMirrorHotelsNum(mirrorSearchCriteria);
        return NumberUtility.getTotalPages(numHotels, maxpagelen);
    }

    public void updateMirror(MirrorInfo model) {
        hotelPricingMgr.updateMirror(model);
    }

    public void deleteMirror(long hotelid) {
        MirrorInfo model = new MirrorInfo();
        model.setHotelid(hotelid);
        updateMirror(model);
    }

    public List<HotelSFODetails> findHotelSFOList(HotelSFOSearch filter) {
        return hotelSFOMgr.findHotelSFOList(filter);
    }

    public long getTotalHotelSFOListPages(HotelSFOSearch filter) {
        long totalNumPages = hotelSFOMgr.findHotelSFOListNum(filter);
        return NumberUtility.getTotalPages(totalNumPages, filter.getPage().getMaxpagelen());
    }

    public HotelSFOFilterLists getSFOFilterList(HotelSFOSearch filter) {
        HotelSFOFilterLists filterlist = new HotelSFOFilterLists();
        filterlist.setBrandlist(hotelPricingMgr.getAffiliations());
        filterlist.setFranchby(hotelPricingMgr.getFranchByList());
        filterlist.setSalemarket(hotelSFOMgr.getSalesAreaList());

        return filterlist;
    }

    public List<MarketArea> findMarketArea(long salesareaid) {
        return hotelSFOMgr.findMarketArea(salesareaid);
    }

    public List<SalesMarket> getSalesAreaList() {
        return hotelSFOMgr.getSalesAreaList();
    }

    public HotelSFODetails getHotelSFODetails(long hotelid) {
        return hotelSFOMgr.getHotelSFODetails(hotelid);
    }

    public void updateHotelSFO(HotelSFODetails model, User user) {
        hotelSFOMgr.updateHotelSFO(model, user);
    }

    public List<HotelPGOOSAuditListData> findPGOOSAuditTrailDetail(String marshaCode, Long period) {
        return hotelPGOOSAuditMgr.findPGOOSAuditTrailDetail(marshaCode, period);
    }

    public List<HotelGPPPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user) {
        if (filterValues != null && filterValues.getAccountFilter() != null && filterValues.getAccountFilter().getAccountrecid() != null) {
            hotelGPPPGOOSMaintenanceMgr.updateHotelRFP(filterValues.getAccountFilter().getAccountrecid(), user);
            return hotelGPPPGOOSMaintenanceMgr.findHotelPgoosMaintList(filterValues, user);
        } else
            return null;
    }

    public void updateHotelGPPPgoosMaintanence(long accountrecid, List<HotelGPPPGOOSListData> hotelpgoosmaint, User user) {
        hotelGPPPGOOSMaintenanceMgr.updateHotelGPPPgoosMaintanence(accountrecid, hotelpgoosmaint, user);
    }

    public void copySappDetailsToNewAccount(long from_acctrecid, long to_acctrecid, User user) {
        accountMgr.copySappDetailsToNewAccount(from_acctrecid, to_acctrecid, user);
    }

    public AccountDetailRFP getAccountDetailRFP(long accountrecid) {
        AccountDetailRFP rfp = accountMgr.getAccountDetailRFP(accountrecid);
        return rfp;
    }

    public AccountDetailCompMatrix getAccountDetailCompMatrix(long accountrecid) {
        AccountDetailCompMatrix adcm = accountMgr.getAccountDetailCompMatrix(accountrecid);
        return adcm;
    }

    public AccountCompDropDownLists findAccountCompDropDowns() {
        AccountCompDropDownLists acddl = new AccountCompDropDownLists();
        acddl.setAddQuestCompList(accountMgr.getAddQuestCompList());
        acddl.setSatRatingList(accountMgr.getSatRatingList());
        acddl.setTacBonusList(accountMgr.getTacBonusList());
        return acddl;
    }

    public RfpSettingsDropDownLists findRfpSettingsDropDowns(long accountrecid) {
        RfpSettingsDropDownLists rsddl = new RfpSettingsDropDownLists();
        rsddl.setGbtaList(accountMgr.getGbtaList());
        rsddl.setMaxrtList(accountMgr.getMaxrtList());
        rsddl.setMaxseasonList(accountMgr.getMaxseasonList());
        rsddl.setRatevisibleList(accountMgr.getRatevisibleList());
        rsddl.setRtallowedList(accountMgr.getRtallowedList());
        rsddl.setEdierfpList(accountMgr.getEdierfpList());
        rsddl.setAccLeadList(accountMgr.getContactList(accountrecid, (long) 1));
        rsddl.setSharedaccLeadList(accountMgr.getContactList(accountrecid, (long) 15));
        rsddl.setBtamList(accountMgr.getContactList(accountrecid, (long) 8));
        return rsddl;
    }

    public List<RfpFileSentList> getRfpFileList(long accountrecid) {
        return accountMgr.getRfpFileList(accountrecid);
    }

    public List<RenegSubmitList> getRenegSubmitList(long accountrecid) {
        return accountMgr.getRenegSubmitList(accountrecid);
    }

    public void updateAccountDetailCompMatrix(AccountDetailCompMatrix adcm, User user) {
        accountMgr.updateAccountDetailCompMatrix(adcm, user);
    }

    @Override
    public String saveExcelDataQues(ByteArrayInputStream byteArrayInputStream, Long accountrecid, long max_questions, User user) {
        String impReturn = accountQuestionsMgr.saveExcelDataQues(byteArrayInputStream, accountrecid, max_questions, user);
        if (impReturn.equalsIgnoreCase("")) {
            hotelMenuMgr.updateRevisitStatus(accountrecid);
        }
        return impReturn;
    }

    @Override
    public String saveExcelDataGMQues(ByteArrayInputStream qfile, Long accountrecid, long max_questions, User user) {
        String impReturn = accountgmQuestionsMgr.saveExcelDataGMQues(qfile, accountrecid, max_questions, user);
        if (impReturn.equalsIgnoreCase("")) {
            hotelMenuMgr.updateRevisitStatus(accountrecid);
        }
        return impReturn;
    }

    public AccountEmailInfo sendRFPLaunchEmail(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail, User user) {
        String sendRFPEmail = constantsMgr.getSendRFPEmail();
        RFPLaunchEmail rfp = null;
        AdminMudroom am = null;
        EmailValidator emailValidator = new EmailValidator();
        AccountEmailInfo accountEmailInfo = new AccountEmailInfo();
        if (sendRFPEmail != null && sendRFPEmail.equals("Y")) {
            rfp = accountMgr.getRFPLaunchEmailDetails(accountrecid);
            try {
                if (rfp == null) {
                    accountEmailInfo.setReturnMessage("Error retrieving the data");
                    return accountEmailInfo;
                }
            } catch (Exception e) {
                 log.error(e.getMessage(),e);
            }
            rfp.setRateprograms(accountMgr.getRatePrograms(accountrecid, "N", false));
            if (rfp.getAer_account() != null && rfp.getAer_account().equals("Y")) {
                rfp.setAerrateprograms(accountMgr.getRatePrograms(accountrecid, "Y", false));
            }
            rfp.setAccountThirdPartyRegion(accountMgr.getRFPThirdPartyRegions(accountrecid));
            List<String> sendTo = new Vector<String>();
            am = adminMudroomManager.findAdminRespondent(user.getEid());
            boolean result = emailValidator.validateEmail(am.getEmail());
            if (result == false) {
                accountEmailInfo.setReturnMessage("Please update valid email id");
                return accountEmailInfo;
            }
            sendTo.add(am.getEmail());
            rfp.setSendTo(sendTo);
            rfp.setFullName(am.getPersonName());
            rfp.setPhone(am.getPhoneNumber());
            rfp.setPersonTitle(am.getPersonTitle());
            rfp.setCountryCode(am.getCountryCode());
            rfp.setAreaCityCode(am.getAreaCityCode());
        }

        if (rfp.getSendTo() != null) {
            try {
                sendEmailMgr.sendEmail(new SendEmail(am.getEmail(), rfp.getSendTo(), getSubject(rfp), getPlainBodyPart(rfp, rfpLaunchRecapEmail), getHtmlBodyPart(rfp, rfpLaunchRecapEmail), false));
                accountEmailInfo.setReturnMessage("Email sent successfully");

            } catch (Exception e) {
                 log.error(e.getMessage(),e);
            }
        } else
            accountEmailInfo.setReturnMessage("Email Id is missing, please update");

        return accountEmailInfo;

    }

    private String getHtmlBodyPart(RFPLaunchEmail rfp, RfpLaunchRecapEmail rfpLaunchRecapEmail) {
		String body = "<HTML><BODY style=\\\"font-family: Arial;font-size: 12px\\\" cellpadding=\\\"1\\\" cellspacing=\\\"1\\\" border=\\\"0\\\">";
		try {
			if (rfpLaunchRecapEmail.getAdditional_text() != null && !(rfpLaunchRecapEmail.getAdditional_text().equals("")))
				body += rfpLaunchRecapEmail.getAdditional_text() + "<br /><br />";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "Below please find the RFP launch recap; the account is viewable to the hotels in MarRFP.<br /><br />";
		body += "<table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		body += "<tr bgcolor=\"#C0C0C0\"><td style=\"width:450px\"><H5><b>ACCOUNT:</b></H5></td>" + "<td><H5><b>" + rfp.getAccountname().toUpperCase() + "</b></H5></td></tr>";
		body += "<tr><td>Enhanced Price Protection (EPP):</td><td><b>";
		//if (rfp.getRollover().equalsIgnoreCase("R")) 
			//body += "Replatform";
		//else if (rfp.getRollover().equalsIgnoreCase("O")) 
			//body += "Rollover";
		//else if (rfp.getRollover().equalsIgnoreCase("T")) 
			//body += "Traditional";
		//else 
			//body += "Not Applicable";
		//body += "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;";
		if (rfp.getEnhancedPgoos().equalsIgnoreCase("Y")) {
			body += "Y";
			if (rfp.getEnhancedDiscount() != 0)
				body += ", " + rfp.getEnhancedDiscount() + "%";
		} else {
			body += "N";
		}
		body += "</b></td></tr>";
		body += "<tr><td>GPP account:</td><td><b>" + rfp.getAer_account();
		try {
			if (rfp.getAer_account() != null && rfp.getAer_account().equals("Y")) {
				body += ", " + rfp.getDefault_percent() + "%, ";
				if ( rfp.getDiscfirsttieronly().equals("Y"))
					body += "Tier 1 Only";
				else
					body += "All Tiers";
			}else
				body += "</b></td></tr>";
		}
		catch(Exception e){
			e.printStackTrace();
		}
		try {
			if (!(rfp.getAccounttype().equals("A") || rfp.getAccounttype().equals("J") || rfp.getAccounttype().equals("2") || rfp.getAccounttype().equals("3") || rfp.getAccounttype().equals("4") || rfp.getAccounttype().equals("5") || rfp.getAccounttype().equals("6")) && rfp.getAccounttype()!= null) {
				body += "<tr><td>MPB account:</td>";
				try {
					if ( rfp.getPresentfcr() != null )
						body += "<td><b>" + rfp.getPresentfcr() + "</b></td>";
				}catch(Exception e) {
					e.printStackTrace();
				}
				body += "</tr>";
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		body += "<tr><td>Rate program codes:</td><td><b>";
		try {
			if ( rfp.getRateprograms().get(0).getRateProg() != null ) {
				for (int i = 0; i < rfp.getRateprograms().size(); i++) {
					try {
						if (rfp.getRateprograms().get(i).getRateProg() != null && rfp.getRateprograms().get(i).getRateProg() != "") {
							if (i != 0)
								body += ", ";
							body += rfp.getRateprograms().get(i).getRateProg();
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				body += "</b></td></tr>";
			}
			else
				body += "(TBD)</b></td></tr>";
		}catch (Exception e) {
			e.printStackTrace();
		}
		if (rfp.getAer_account() != null && rfp.getAer_account().equals("Y")) {
			body += "<tr><td>GPP rate program codes:</td><td><b>";
			try {
				if ( rfp.getAerrateprograms().get(0).getRateProg() != null ) {
					for (int i = 0; i < rfp.getAerrateprograms().size(); i++) {
						try {
							if (rfp.getAerrateprograms().get(i).getRateProg() != null && rfp.getAerrateprograms().get(i).getRateProg() != "") {
								if (i != 0)
									body += ", ";
								body += rfp.getAerrateprograms().get(i).getRateProg();
							}
						}catch (Exception e) {
							e.printStackTrace();
						}
					}
					body += "</b></td></tr>";
				}
				else
					body += "(TBD)</b></td></tr>";
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		body += "<tr><td>Cluster code:</td>";
		try {
			if ( rfp.getClustercode() != null )
				body += "<td><b>" + rfp.getClustercode() + "</b></td>";
			else
				body += "<td><b>(TBD)</b></td>";
		} catch (Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td valign=\"top\">Cancellation policy:</td><td><b>";
		if (rfp.getAltcancelpolicyid() == 1) 
			body += "Alternate cancellation functionality is NOT ENABLED in MarRFP per the sales team; therefore hotels can ONLY offer the STANDARD CANCELLATION</td></tr>";
		else {
			if (rfp.getAltcancelpolicyid() == 2)
				body += "Mandated&nbsp;&nbsp;&nbsp;";
			else
				body += "Requested&nbsp;&nbsp;&nbsp;";
			body += "|&nbsp;&nbsp;&nbsp;Alternate cancellation functionality is ENABLED in MarRFP for hotels to select time based on their strategy</b></td></tr>";
		}
		body += "<tr><td valign=\"top\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancellation notes:</td>";
		try {
			if ( rfp.getAltcancelpolicynotes() != null )
				body += "<td><b>" + rfp.getAltcancelpolicynotes() + "</b></td>";
		} catch (Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>No-squatter account:</td><td><b>" + rfp.getNosquatter() + "</b></td></tr>";
		body += "<tr><td valign=\"top\">Additional notes:</td></tr>";
		body += "<tr><td>Presentation of rates:</td>";
		try {
			if ( rfp.getAccountThirdPartyRegion() != null )
				body += "<td><b>" + rfp.getAccountThirdPartyRegion() + "</b></td>";
		} catch (Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GBTA modules:</td><td><b>";
		String gbta = null;
		try {
			if (rfp.getPb() != null && rfp.getPb().equals("Y"))
				gbta = "PB";
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getCs() != null && rfp.getCs().equals("Y")) {
				if (gbta != null )
					gbta += ", CS";
				else
					gbta = "CS";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getSs() != null && rfp.getSs().equals("Y")) {
				if (gbta != null )
					gbta += ", SS";
				else
					gbta = "SS";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getBd() != null && rfp.getBd().equals("Y")) {
				if (gbta != null )
					gbta += ", BD";
				else
					gbta = "BD";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getEs() != null && rfp.getEs().equals("Y")) {
				if (gbta != null )
					gbta += ", ES";
				else
					gbta = "ES";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getGm() != null && rfp.getGm().equals("Y")) {
				if (gbta != null )
					gbta += ", GM";
				else
					gbta = "GM";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (rfp.getCsr() != null && rfp.getCsr().equals("Y")) {
				if (gbta != null )
					gbta += ", CSR";
				else
					gbta = "CSR";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			if (gbta == null)
				gbta = "";
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		body += gbta + "</b></td></tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pricing cycle:</td><td><b>";
		if (rfp.getAccountpricingcycleid() == 1)
			body += "Normal</b></td></tr>";
		else {
			if ( rfp.getAccountpricingcycleid() == 2 )
				body += "2 Year&nbsp;&nbsp;&nbsp;";
			else
				body += "Off Cycle&nbsp;&nbsp;&nbsp;";
			body += rfp.getShortContractstart() + " - " + rfp.getShortContractend() + "</b></td></tr>";
		}
//		if (rfp.getGov_account().equals("Y") && rfp.getGov_account() != null) {
//			body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Government account:</td><td><b>Y";
//			body += "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Account allows Per Diem adjustments:&nbsp;";
//			body += rfp.getPerdiemadjustmentsallowed() + "</b></td></tr>";
//		}
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Groups & meetings module on (in MarRFP):</td><td><b>" + rfp.getGroupmeetings() + "</b></td></tr>";
		body += "<tr></tr><tr></tr>";
		body += "<tr bgcolor=\"#C0C0C0\"><td colspan=\"2\"><H5><b>TIMELINE:</b></H5></td></tr>";
		body += "<tr><td>Viewable to hotels:</td>";
		try {
			if ( rfp.getHotel_display_date() != null ) 
				body += "<td><b>" + rfp.getHotel_display_date() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>Auto reminder email (set up by PAS):</td>";
		try {
			if ((rfp.getShortRemindersdate() != null) && !(rfp.getShortRemindersdate().equals("")))
				body += "<td><b>" + rfp.getShortRemindersdate() + "</b></td>";
			else
				body += "<td><b>N/A</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>MarRFP due date:</td>";
		try {
			if ( rfp.getPricingperiodid() != null )
				body += "<td><b>" + rfp.getShortMarrfpduedate() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>Sales Portfolio turn over due date to PAS:</td>";
		try {
			if ((rfp.getShortRfppulldate() != null) && !(rfp.getShortRfppulldate().equals("")))
				body += "<td><b>" + rfp.getShortRfppulldate() + "</b></td>";
			else
				body += "<td><b>N/A</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>PAS to upload/present RFP file:</td>";
		try {
			if ((rfp.getShortPassubmissiondate() != null) && !(rfp.getShortPassubmissiondate().equals("")))
				body += "<td><b>" + rfp.getShortPassubmissiondate() + "</b></td>";
			else
				body += "<td><b>N/A</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>RFP client due date:</td>";
		try {
			if ( rfp.getShortClientduedate() != null )
				body += "<td><b>" + rfp.getShortClientduedate() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr></tr><tr></tr>";
		body += "<tr bgcolor=\"#C0C0C0\"><td colspan=\"2\"><H5><b>USER-DEFINED (UDQ) / ADDENDUM QUESTIONS (AQ): </b></H5></td></tr>";
		body += "<tr><td> - Contains User Defined Questions (UDQ) and/or AQ:</td>";
		try {
			if ( rfp.getContain_userdefques() != null )
				body += "<td><b>" + rfp.getContain_userdefques() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UDQ/AQ Notes:</td><td><b>";
		try {
			if (rfp.getContain_userdefques() != null && rfp.getContain_userdefques().equals("Y"))
				body += "Review the attached file for your action items</b></td>";
			else
				body += "NA</b></td>";
		} catch (Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr></tr><tr></tr>";
		body += "<tr bgcolor=\"#C0C0C0\"><td colspan=\"2\"><H5><b>RATES:</b></H5></td></tr>";
		
		body += "<tr><td>- Maximum number of seasons allowed in the 3rd party RFP tool: </td>";
		try {
			if ( rfp.getMaxseason() != null )
				body += "<td><b>" + rfp.getMaxseason() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>- Rate types allowed (account's RFP settings): </td>";
		try {
			if ( rfp.getRtalloweddesc() != null )
				body += "<td><b>" + rfp.getRtalloweddesc() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>- Maximum of room types to be presented: </td>";
		try {
			if ( rfp.getMaxrt() != null )
				body += "<td><b>" + rfp.getMaxrt() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Important notes related to max room types allowed: </td>";
		try {
			if ( rfp.getMaxrt() != null ) {
				if (rfp.getMaxrt() == 3)
					body += "<td><b>N/A</b></td>";
				if (rfp.getMaxrt() < 3)
					body += "<td><b>PAS will reject upgraded price points on the RFP submission day</b></td>";
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td> - Room occupancy rates visible:</td>";
		try {
			if ( rfp.getRatevisibledesc() != null )
				body += "<td><b>" + rfp.getRatevisibledesc() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td> - Float VP Levels:</td></tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>&#x2022;</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level 1 - Account RFP Allows Float VP:</td>";
		try {
			if (null != rfp.getAccountallowfloatvp())
				body += "<td><b>" + rfp.getAccountallowfloatvp() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>&#x2022;</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level 2 - Float VP Product Enabled:</td>";
		try {
			if (null != rfp.getAllow_floatnociel())
				body += "<td><b>" + rfp.getAllow_floatnociel() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>&#x2022;</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level 3 - Hotels can See and Price Float VP:</td>";
		try {
			if (null != rfp.getAllowhotelcanpricefloatvp())
				body += "<td><b>" + rfp.getAllowhotelcanpricefloatvp() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		//try {
			//if (!((rfp.getAccounttype().equals("A") || rfp.getAccounttype().equals("J") || rfp.getAccounttype().equals("2") || rfp.getAccounttype().equals("3") || rfp.getAccounttype().equals("4") || rfp.getAccounttype().equals("5") || rfp.getAccounttype().equals("6"))&& rfp.getAccounttype()!= null)) {
				//body += "<tr><td> - Account Sales:  Submit FCR (if no response by MarRFP due date)</td>";
				//try {
					//if ( rfp.getPresentfcr() != null )
						//body += "<td><b>" + rfp.getPresentfcr() + "</b></td>";
				//}catch(Exception e) {
					//e.printStackTrace();
				//}
				//body += "</tr>";
			//}
		//}
		//catch (Exception e) {
			//e.printStackTrace();
		//}
		body += "<tr></tr><tr></tr>";
		body += "<tr bgcolor=\"#C0C0C0\"><td colspan=\"2\"><H5><b>BLACKOUT DATES:</b></H5></td></tr>";
		body += "<tr><td> - Blackout Dates Module/Fields Hidden:</td>";
		try {
			if ( rfp.getBlackoutdateshidden() != null )
				body += "<td><b>" + rfp.getBlackoutdateshidden() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td> - Maximum periods allowed:</td>";
		try {
			if ( rfp.getMaxnum_blackoutperiod() != null )
				body += "<td><b>" + rfp.getMaxnum_blackoutperiod() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td> - Maximum days allowed:</td>";
		try {
			if ( rfp.getMaxnum_blackoutdates() != null )
				body += "<td><b>" + rfp.getMaxnum_blackoutdates() + "</b></td>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		body += "</tr>";
		body += "<tr><td colspan=\"2\"> - <i>IMPORTANT!</i>&nbsp;&nbsp;Any hotel exceeding blackout days requirement will not be uploaded to the third party unless a plan of action has been previously discussed with PAS manager (ie exceeding periods/dates removed from file and presented by Sales via email)</td></tr>";
		body += "<tr></tr>";
		try {
			body += "<tr bgcolor=\"#C0C0C0\"><font color=\"red\"><td><H5><b>RFP PENDING ACTION ITEMS FOR SALES TEAM:</b></H5></td><td><b>\"SALES TEAM\" to ensure these items are thoroughly reviewed/completed PRIOR to turning portfolio over to PAS</b></td></font></tr>";
			try {
				if (rfp.getContain_userdefques() != null && rfp.getContain_userdefques().equals("Y"))
					body += "<tr><td colspan=\"2\"><b> * ADDENDUM QUESTIONS (if posted):</b> Ensure all hotels have responded to the AQ posted. PAS will assist, if agreed during the launch call</td></tr>";
			}catch(Exception e) {
				e.printStackTrace();
			}
			body += "<tr><td colspan=\"2\"><b> * RATES & SEASONS:</b> Review to ensure that rates are entered correctly for all seasons and that no LRA/NLRA applicable rate fields are blank in MarRFP</td></tr>";
			body += "<tr><td colspan=\"2\"><b> * NLRA ONLY BIDS:</b> If a bid’s LRA flags have been flipped to N and the hotel is pricing NRLA rates only, Sales should audit to ensure that the applicable LRA rate fields are filled with 9999999 (7 9s)</td></tr>";
			//body += "<tr><td colspan=\"2\"><b> * ROLLOVER ACCOUNTS ONLY:</b> Validation process – Sales to complete the validation/audit process PRIOR to turning over the portfolio to PAS.  As a reminder, rollover hotels </td></tr>";
			//body += "<tr><td colspan=\"2\">&nbsp;&nbsp;&nbsp;which offers are questionable, should <b><i>NOT</i></b> be added to the portfolio <b><i>UNLESS</i></b> you have discussed with your leader and they have been <i><u>approved</u></i> to be presented!</td></tr>";
			body += "<tr><td colspan=\"2\"><b> * GSO/MBTC ONLY:</b> Review the alternate cancellation policy per GSO BT Pricing Guide, if applicable (ie changing ALL the Americas hotels to 24HRS if pre-negotiated, etc.)</td></tr>";
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		body += "<tr></tr><tr></tr>";
		body += "<tr bgcolor=\"#C0C0C0\"><td colspan=\"2\"><H5><b>OTHER:</b></H5></td></tr>";
		body += "<tr><td valign=\"top\"><b> - Additional Notes:</b></td></tr>";
		body += "<tr><td style=\"height:30px\"></td></tr>";
		try {
			body += "<tr><td colspan=\"2\"><a href=\"";
			//if ((rfp.getAccounttype().equals("A") || rfp.getAccounttype().equals("J") || rfp.getAccounttype().equals("2") || rfp.getAccounttype().equals("3") || rfp.getAccounttype().equals("4") || rfp.getAccounttype().equals("5") || rfp.getAccounttype().equals("6"))&& rfp.getAccounttype()!= null){
				//body += "<tr><a href=\"https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/pricing-account-services/pas-tools-and-resources/global-sales.html\">Global Sales Tools & Resources (PAS MGS)</a></tr>";
				//body += constantsMgr.getGlobalSalesUrl();
				//body += "\">Global Sales Tools & Resources (PAS MGS)";
			//}
			//else {
				//body += "<tr><a href=\"https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/pricing-account-services/pas-tools-and-resources/area-sales.html\">Account Sales Tools & Resources (PAS MGS)</a></tr>";
				//body += constantsMgr.getAreaSalesUrl();
				//body += "\">Account Sales Tools & Resources (PAS MGS)";
			//}
			body += constantsMgr.getPasMgsUrl();
			body += "\">Marriott Account Leaders Tools & Resources (PAS MGS)";
			body += "</a></td></tr>";
		} catch (Exception e) {
			e.printStackTrace();
		}
		body += "<tr><td style=\"height:30px\"></td></tr>";
		try {
			if ( rfp.getFullName() != null )
				body += "<tr><b>" + rfp.getFullName() + "</b></tr>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		try {
			if ( rfp.getPersonTitle() != null )
				body += "<tr>" + rfp.getPersonTitle() + "</tr>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		try {
			body += "<tr><td colspan=\"2\">" + rfp.getSendTo().get(0) + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;+" + rfp.getTrimCountryCode() + (" (") + rfp.getAreaCityCode()+ (") ")  + rfp.getPhone() + "</td></tr>";
		}catch(Exception e) {
			e.printStackTrace();
		}
		return body;
	}
    private String getPlainBodyPart(RFPLaunchEmail rfp, RfpLaunchRecapEmail rfpLaunchRecapEmail) {
        String body = "\n";
        try {
            if (rfpLaunchRecapEmail.getAdditional_text() != null && rfpLaunchRecapEmail.getAdditional_text() != "")
                body += rfpLaunchRecapEmail.getAdditional_text() + "\n\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "Below please find the RFP launch recap; the account is viewable to the hotels in MarRFP.\n\n";
        body += "\nACCOUNT:\t\t" + rfp.getAccountname().toUpperCase() + "\n\n";
        body += "Type of account (Rollover RFP / Traditional RFP):\t\t";
        if (rfp.getRollover().equalsIgnoreCase("R"))
            body += "Replatform";
        else if (rfp.getRollover().equalsIgnoreCase("O"))
            body += "Rollover";
        else if (rfp.getRollover().equalsIgnoreCase("T"))
            body += "Traditional";
        else
            body += "Not Applicable";
        body += "   |   ";
        if (rfp.getEnhancedPgoos().equalsIgnoreCase("Y")) {
            body += "Enhanced price protection (EPP):  Y";
            if (rfp.getEnhancedDiscount() == 0)
                body += "\n";
            else {
                body += ", " + rfp.getEnhancedDiscount() + "%\n";
            }
        } else {
            body += "Enhanced price protection (EPP):  N (account not eligible for EPP)\n";
        }
        body += "GPP account:\t\t" + rfp.getAer_account() + "\n";
        try {
            if (rfp.getAer_account() != null && rfp.getAer_account().equals("Y")) {
                body += ", " + rfp.getDefault_percent() + "%, ";
                if (rfp.getDiscfirsttieronly().equals("Y"))
                    body += "Tier 1 Only";
                else
                    body += "All Tiers";
            } else
                body += "\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "Rate program codes:\t\t";

        try {
            if (rfp.getRateprograms().get(0).getRateProg() != null) {
                for (int i = 0; i < rfp.getRateprograms().size(); i++) {
                    try {
                        if (rfp.getRateprograms().get(i).getRateProg() != null && rfp.getRateprograms().get(i).getRateProg() != "") {
                            if (i != 0)
                                body += ", ";
                            body += rfp.getRateprograms().get(i).getRateProg();
                        }
                    } catch (Exception e) {
                         log.error(e.getMessage(),e);
                    }
                }
                body += "\n";
            } else
                body += "(TBD)\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        if (rfp.getAer_account() != null && rfp.getAer_account().equals("Y")) {
            body += "GPP rate program codes:\t\t";
            try {
                if (rfp.getAerrateprograms().get(0).getRateProg() != null) {
                    for (int i = 0; i < rfp.getAerrateprograms().size(); i++) {
                        try {
                            if (rfp.getAerrateprograms().get(i).getRateProg() != null && rfp.getAerrateprograms().get(i).getRateProg() != "") {
                                if (i != 0)
                                    body += ", ";
                                body += rfp.getAerrateprograms().get(i).getRateProg();
                            }
                        } catch (Exception e) {
                             log.error(e.getMessage(),e);
                        }
                    }
                    body += "\n";
                } else
                    body += "(TBD)\n";
            } catch (Exception e) {
                 log.error(e.getMessage(),e);
            }
        }
        body += "Cluster code:\t\t";
        try {
            if (rfp.getClustercode() != null)
                body += rfp.getClustercode();
            else
                body += "(TBD)\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "Cancellation policy:\t\t";
        if (rfp.getAltcancelpolicyid() == 1)
            body += "Alternate cancellation functionality is NOT ENABLED in MarRFP per the sales team; therefore hotels can ONLY offer the STANDARD CANCELLATION\n";
        else {
            if (rfp.getAltcancelpolicyid() == 2)
                body += "Mandated   ";
            else
                body += "Requested   ";
            body += "|   Alternate cancellation functionality is ENABLED in MarRFP for hotels to select time based on their strategy\n";
        }
        body += "Cancellation notes:\t\t";
        try {
            if (rfp.getAltcancelpolicynotes() != null)
                body += rfp.getAltcancelpolicynotes();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "No-squatter account:\t\t" + rfp.getNosquatter() + "\n";
        body += "Additional notes:\n";
        body += "Presentation of rates:\t\t";
        try {
            if (rfp.getAccountThirdPartyRegion() != null)
                body += rfp.getAccountThirdPartyRegion();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "GBTA modules:\t\t";
        String gbta = null;
        try {
            if (rfp.getPb() != null && rfp.getPb().equals("Y"))
                gbta = "PB";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getCs() != null && rfp.getCs().equals("Y")) {
                if (gbta != null)
                    gbta += ", CS";
                else
                    gbta = "CS";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getSs() != null && rfp.getSs().equals("Y")) {
                if (gbta != null)
                    gbta += ", SS";
                else
                    gbta = "SS";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getBd() != null && rfp.getBd().equals("Y")) {
                if (gbta != null)
                    gbta += ", BD";
                else
                    gbta = "BD";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getEs() != null && rfp.getEs().equals("Y")) {
                if (gbta != null)
                    gbta += ", ES";
                else
                    gbta = "ES";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getGm() != null && rfp.getGm().equals("Y")) {
                if (gbta != null)
                    gbta += ", GM";
                else
                    gbta = "GM";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getCsr() != null && rfp.getCsr().equals("Y")) {
                if (gbta != null)
                    gbta += ", CSR";
                else
                    gbta = "CSR";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }

        try {
            if (gbta == null)
                gbta = "";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }

        body += gbta + "\n";
        body += "Pricing cycle:\t\t";
        if (rfp.getAccountpricingcycleid() == 1)
            body += "Normal\n";
        else {
            if (rfp.getAccountpricingcycleid() == 2)
                body += "2 Year ";
            else
                body += "Off Cycle ";
            body += rfp.getShortContractstart() + " - " + rfp.getShortContractend() + "\n";
        }
       // if (rfp.getGov_account().equals("Y") && rfp.getGov_account() != null) {
           // body += "Government account:\t\tY";
           // body += "   |   Account allows Per Diem adjustments:";
           // body += rfp.getPerdiemadjustmentsallowed() + "\n";
       // }
        body += "Groups & meetings module on (in MarRFP):\t\t" + rfp.getGroupmeetings() + "\n";
        body += "\n\n";
        body += "TIMELINE:\n";
        body += "Viewable to hotels:\t\t";
        try {
            if (rfp.getHotel_display_date() != null)
                body += rfp.getHotel_display_date();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "Auto reminder email (set up by PAS):\t\t";
        if ( rfp.getShortRemindersdate() != null )
            body += rfp.getShortRemindersdate();
        else 
            body += "N/A";
        body += "\n";
        body += "MarRFP due date:\t\t";
        try {
            if (rfp.getPricingperiodid() != null)
                body += rfp.getShortMarrfpduedate();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "Sales Portfolio turn over due date to PAS:\t\t";
        if ( rfp.getShortRfppulldate() != null )
            body += rfp.getShortRfppulldate();
        else
            body += "N/A";
        body += "\n";
        body += "PAS to upload/present RFP file:\t\t";
        try {
            if (rfp.getShortPassubmissiondate() != null)
                body += rfp.getShortPassubmissiondate();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "RFP client due date:\t\t";
        try {
            if (rfp.getShortClientduedate() != null)
                body += rfp.getShortClientduedate();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "\n\n";
        body += "USER-DEFINED (UDQ) / ADDENDUM QUESTIONS (AQ):\n";
        body += " - Contains User Defined Questions (UDQ) and/or AQ:\t\t";
        try {
            if (rfp.getContain_userdefques() != null)
                body += rfp.getContain_userdefques();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "       UDQ/AQ Notes:\t\t";
        try {
            if (rfp.getContain_userdefques() != null && rfp.getContain_userdefques().equals("Y"))
                body += "Review the attached file for your action items";
            else
                body += "NA";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        
        body += "\n";
        body += "\n\n";
        body += "RATES:\n";
        body += "- Rate types allowed (account's RFP settings): \t\t";
        try {
            if (rfp.getRtalloweddesc() != null)
                body += rfp.getRtalloweddesc();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += "     Important notes related to max room types allowed: \t\t";
        try {
            if ( rfp.getMaxrt() != null ) {
                if (rfp.getMaxrt() == 3)
                    body += "N/A";
                if (rfp.getMaxrt() < 3)
                    body += "PAS will reject upgraded price points on the RFP submission day";
            }
        }catch(Exception e) {
            e.printStackTrace();
        }
        body += "\n";
        body += " - Room occupancy rates visible:\t\t";
        try {
            if (rfp.getRatevisibledesc() != null)
                body += rfp.getRatevisibledesc();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        try {
            if (!((rfp.getAccounttype().equals("A") || rfp.getAccounttype().equals("J") || rfp.getAccounttype().equals("2") || rfp.getAccounttype().equals("3") || rfp.getAccounttype().equals("4") || rfp.getAccounttype().equals("5") || rfp.getAccounttype().equals("6")) && rfp.getAccounttype() != null)) {
                body += " - Account Sales:  Submit FCR (if no response by MarRFP due date)\t\t";
                try {
                    if (rfp.getPresentfcr() != null)
                        body += rfp.getPresentfcr();
                } catch (Exception e) {
                     log.error(e.getMessage(),e);
                }
                body += "\n";
            }
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n\n";
        body += "BLACKOUT DATES:\n";
        body += " - Blackout Dates Module/Fields Hidden:\t\t";
        try {
            if (rfp.getBlackoutdateshidden() != null)
                body += rfp.getBlackoutdateshidden();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += " - Maximum periods allowed:\t\t";
        try {
            if (rfp.getMaxnum_blackoutperiod() != null)
                body += rfp.getMaxnum_blackoutperiod();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n";
        body += " - Maximum days allowed:\t\t";
        try {
            if (rfp.getMaxnum_blackoutdates() != null)
                body += rfp.getMaxnum_blackoutdates();
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        
        body += "\n";
        body += " - IMPORTANT!  Any hotel exceeding blackout days requirement will not be uploaded to the third party unless a plan of action has been previously discussed with PAS manager (ie exceeding periods/dates removed from file and presented by Sales via email)\n";
        body += "\n";
        body += "RFP PENDING ACTION ITEMS FOR SALES TEAM:\"SALES TEAM\" to ensure these items are thoroughly reviewed/completed PRIOR to turning portfolio over to PAS\n";
        try {
        	if (rfp.getContain_userdefques() != null && rfp.getContain_userdefques().equals("Y"))
                body += " * ADDENDUM QUESTIONS (if posted) – Ensure all hotels have responded to the AQ posted.  PAS will assist, if agreed during the launch call\n";
        }catch(Exception e) {
             log.error(e.getMessage(),e);
        }
        body += " * RATES & SEASONS – Review to ensure that rates are entered correctly for all seasons and that no LRA/NLRA applicable rate fields are blank in MarRFP\n";
        body += " * ROLLOVER ACCOUNTS ONLY:  Validation process – Sales to complete the validation/audit process PRIOR to turning over the portfolio to PAS.  As a reminder, rollover hotels\n";
        body += "   which offers are questionable, should NOT be added to the portfolio UNLESS you have discussed with your leader and they have been approved to be presented!\n";
        body += " * GSO/MBTC ONLY:  Review the alternate cancellation policy per GSO BT Pricing Guide, if applicable (ie changing ALL the Americas hotels to 24HRS if pre-negotiated, etc.)\n";
        body += "\n\n";
        body += "OTHER:\n";
        body += " - Additional Notes:\n";
        body += "\n\n\n\n";
        try {
            if ((rfp.getAccounttype().equals("A") || rfp.getAccounttype().equals("J") || rfp.getAccounttype().equals("2") || rfp.getAccounttype().equals("3") || rfp.getAccounttype().equals("4") || rfp.getAccounttype().equals("5") || rfp.getAccounttype().equals("6")) && rfp.getAccounttype() != null)
                body += "Go to \"https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/pricing-account-services/pas-tools-and-resources/global-sales.html\" to access - Global Sales Tools & Resources (PAS MGS)\n";
            else
                body += "Go to \"https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/pricing-account-services/pas-tools-and-resources/area-sales.html\" to access - Account Sales Tools & Resources (PAS MGS)\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        body += "\n\n\n\n";
        try {
            if (rfp.getFullName() != null)
                body += rfp.getFullName() + "\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            if (rfp.getPersonTitle() != null)
                body += rfp.getPersonTitle() + "\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        try {
            body += rfp.getSendTo().get(0) + "   |   " + rfp.getTrimCountryCode() + (" (") + rfp.getAreaCityCode() + (") ") + rfp.getPhone() + "\n";
        } catch (Exception e) {
             log.error(e.getMessage(),e);
        }
        return body;
    }

    private String getSubject(RFPLaunchEmail rfp) {
    	String subject = rfp.getAccountname().toUpperCase() + " - " + rfp.getPeriod() + " RFP LAUNCH RECAP";
        return subject;
    }

    public void updateRFPAdditionalText(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail, User userProperties) {
        accountMgr.updateRFPAdditionalText(accountrecid, rfpLaunchRecapEmail);
    }

    public RfpLaunchRecapEmail getRFPAdditionalText(Long accountrecid) {
        RfpLaunchRecapEmail rfpLaunchRecapEmail = accountMgr.getRFPAdditionalText(accountrecid);
        return rfpLaunchRecapEmail;
    }

    private List<MirrorDetail> mirrorDetailMapping(List<MirrorDetailDO> mirrorDetailMapperList) {
        List<MirrorDetail> mirrorDetailList = new ArrayList<MirrorDetail>();
        List<MirrorRoomClassDetail> mirrorRoomClassDetailList = null;
        List<MirrorRoomPoolDetail> mirrorRoomPoolDetailList = null;
        MirrorDetail mirrorDetail = null;
        MirrorRoomClassDetail mirrorRoomClassDetail = null;
        MirrorRoomPoolDetail mirrorRoomPoolDetail = null;
        Map<Long, MirrorDetail> mirrorDetailMap = new HashMap<Long, MirrorDetail>();
        Map<String, MirrorRoomClassDetail> mirrorRoomPoolDetailMap = new HashMap<String, MirrorRoomClassDetail>();

        if (mirrorDetailMapperList != null && mirrorDetailMapperList.size() > 0) {
            for (MirrorDetailDO mirrorDetailMapper : mirrorDetailMapperList) {

                if (mirrorDetailMap.containsKey(mirrorDetailMapper.getHotelid())) {
                    mirrorDetail = mirrorDetailMap.get(mirrorDetailMapper.getHotelid());
                    mirrorRoomClassDetailList = mirrorDetail.getMirrorRoomClassList();

                    if (mirrorRoomPoolDetailMap.containsKey(mirrorDetailMapper.getHotelid().toString() + mirrorDetailMapper.getRoomClassSeq().toString())) {
                        mirrorRoomClassDetail = mirrorRoomPoolDetailMap.get(mirrorDetailMapper.getHotelid().toString() + mirrorDetailMapper.getRoomClassSeq().toString());
                        mirrorRoomPoolDetailList = mirrorRoomClassDetail.getMirrorRoomPoolList();
                        mirrorRoomPoolDetail = buildNewMirrorRoomPoolDetail(mirrorDetailMapper);
                        mirrorRoomPoolDetailList.add(mirrorRoomPoolDetail);
                    } else {

                        mirrorRoomPoolDetailList = new ArrayList<MirrorRoomPoolDetail>();
                        mirrorRoomPoolDetail = buildNewMirrorRoomPoolDetail(mirrorDetailMapper);
                        mirrorRoomPoolDetailList.add(mirrorRoomPoolDetail);
                        mirrorRoomClassDetail = new MirrorRoomClassDetail();
                        mirrorRoomClassDetail.setRoomClassSeq(mirrorDetailMapper.getRoomClassSeq());
                        mirrorRoomClassDetail.setMirrorRoomPoolList(mirrorRoomPoolDetailList);
                        mirrorRoomClassDetailList.add(mirrorRoomClassDetail);
                        mirrorRoomPoolDetailMap.put(mirrorDetailMapper.getHotelid().toString() + mirrorDetailMapper.getRoomClassSeq().toString(), mirrorRoomClassDetail);
                    }
                    mirrorRoomClassDetail.setMirrorRoomPoolList(mirrorRoomPoolDetailList);
                    mirrorDetail.setMirrorRoomClassList(mirrorRoomClassDetailList);

                } else {

                    mirrorDetail = buildNewMirrorDetail(mirrorDetailMapper);
                    mirrorRoomPoolDetailMap.put(mirrorDetailMapper.getHotelid().toString() + mirrorDetailMapper.getRoomClassSeq().toString(), mirrorDetail.getMirrorRoomClassList().get(0));
                    mirrorDetailMap.put(mirrorDetailMapper.getHotelid(), mirrorDetail);
                    mirrorDetailList.add(mirrorDetail);

                }

            }
        }

        return mirrorDetailList;

    }


    /**
     * @param mirrorDetailMapper
     * @return
     */
    private MirrorRoomPoolDetail buildNewMirrorRoomPoolDetail(MirrorDetailDO mirrorDetailMapper) {
        MirrorRoomPoolDetail mirrorRoomPoolDetail = new MirrorRoomPoolDetail();
        mirrorRoomPoolDetail.setPriceRateEntityId(mirrorDetailMapper.getPriceRateEntityId());
        mirrorRoomPoolDetail.setPriceRateOfferId(mirrorDetailMapper.getPriceRateOfferId());
        mirrorRoomPoolDetail.setPriceRateOfferName(mirrorDetailMapper.getPriceRateOfferName());
        mirrorRoomPoolDetail.setPriceRateProgramCode(mirrorDetailMapper.getPriceRateProgramCode());
        mirrorRoomPoolDetail.setPriceratetypeid(mirrorDetailMapper.getPriceratetypeid());
        mirrorRoomPoolDetail.setRestrictionRateEntityId(mirrorDetailMapper.getRestrictionRateEntityId());
        mirrorRoomPoolDetail.setRestrictionRateOfferId(mirrorDetailMapper.getRestrictionRateOfferId());
        mirrorRoomPoolDetail.setRestrictionRateOfferName(mirrorDetailMapper.getRestrictionRateOfferName());
        mirrorRoomPoolDetail.setRestrictionRateProgramCode(mirrorDetailMapper.getRestrictionRateProgramCode());
        mirrorRoomPoolDetail.setRestrictionratetypeid(mirrorDetailMapper.getRestrictionratetypeid());
        mirrorRoomPoolDetail.setRoompool(mirrorDetailMapper.getRoompool());
        mirrorRoomPoolDetail.setRoomPoolSeq(mirrorDetailMapper.getRoomPoolSeq());
        return mirrorRoomPoolDetail;
    }

    private MirrorDetail buildNewMirrorDetail(MirrorDetailDO mirrorDetailMapper) {

        MirrorDetail mirrorDetail = new MirrorDetail();
        MirrorRoomClassDetail mirrorRoomClassDetail = new MirrorRoomClassDetail();
        List<MirrorRoomPoolDetail> mirrorRoomPoolDetailList = new ArrayList<MirrorRoomPoolDetail>();
        List<MirrorRoomClassDetail> mirrorRoomClassDetailList = new ArrayList<MirrorRoomClassDetail>();

        MirrorRoomPoolDetail mirrorRoomPoolDetail;
        mirrorRoomPoolDetail = buildNewMirrorRoomPoolDetail(mirrorDetailMapper);
        mirrorRoomPoolDetailList.add(mirrorRoomPoolDetail);

        mirrorRoomClassDetail.setRoomClassSeq(mirrorDetailMapper.getRoomClassSeq());
        mirrorRoomClassDetail.setMirrorRoomPoolList(mirrorRoomPoolDetailList);

        mirrorRoomClassDetailList.add(mirrorRoomClassDetail);

        mirrorDetail.setHotelid(mirrorDetailMapper.getHotelid());
        mirrorDetail.setHotelName(mirrorDetailMapper.getHotelName());
        mirrorDetail.setMarshacode(mirrorDetailMapper.getMarshacode());
        mirrorDetail.setMirror_exception_notes(mirrorDetailMapper.getMirror_exception_notes());
        mirrorDetail.setMirrorRoomClassList(mirrorRoomClassDetailList);
        return mirrorDetail;

    }


}
