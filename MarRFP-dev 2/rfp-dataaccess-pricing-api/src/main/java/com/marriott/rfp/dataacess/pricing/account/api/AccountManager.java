package com.marriott.rfp.dataacess.pricing.account.api;

import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.account.AccountBrand;
import com.marriott.rfp.object.pricing.account.AccountBrandList;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.account.AccountDefaultPercents;
import com.marriott.rfp.object.pricing.account.AccountDefaultRoompools;
import com.marriott.rfp.object.pricing.account.AccountDetailBrands;
import com.marriott.rfp.object.pricing.account.AccountDetailCompMatrix;
import com.marriott.rfp.object.pricing.account.AccountDetailGeneral;
import com.marriott.rfp.object.pricing.account.AccountDetailRFP;
import com.marriott.rfp.object.pricing.account.AccountHotelView;
import com.marriott.rfp.object.pricing.account.AccountIdJson;
import com.marriott.rfp.object.pricing.account.AccountJson;
import com.marriott.rfp.object.pricing.account.AccountThirdPartyRegion;
import com.marriott.rfp.object.pricing.account.AccountUpdateInfo;
import com.marriott.rfp.object.pricing.account.ComplexityAndRatings;
import com.marriott.rfp.object.pricing.account.RFPLaunchEmail;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.object.pricing.account.RenegSubmitList;
import com.marriott.rfp.object.pricing.account.RfpFileSentList;
import com.marriott.rfp.object.pricing.account.RfpLaunchRecapEmail;
import com.marriott.rfp.object.pricing.account.RfpSettingsList;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.user.User;


public interface AccountManager {
	String accountCopybyTierUpdate(long fromperiod, long toperiod, String accountsegment, User user);

	void accountCopyPricingUpdate(long fromAccountrecid, long toAccountrecid, String copyQuests, String copyGMQuests, User user);

	List<Account> findAccountList(long period, String accountPricingType, String accountSegment, String filterString, int orderby, Page page);

	List<Account> findAccountListForRole(Long period, Long duedate, String newAccountsOnly, String accountpricingtype, String accounttype, boolean includeAPOnly, String searchgppaccountsonly,
			User user);

	Long getNumAccountNoPeriod(User user);

	List<Account> getAccountList(long period, String accountType, User user);

	List<Account> getAccountListByRoleForProximity(long period, String accountType, User user);

	Account findAccountInfo(long accountrecid);

	String findLatestAccountName(long accountid);

	String findAccountAerType(long accountrecid);

	AccountDetailGeneral getGeneralAccountDetails(long accountrecid);

	long getAccountListNum(long period, String accountPricingType, String accountSegment, String filterString, int orderby);

	
	List<HotelAffiliation> getBrandsCannotPrice(long accountrecid);

	List<HotelAffiliation> getBrandsCanPrice(long accountrecid);
	
	List<HotelAffiliation> getNewAccountBrandsCannotPrice(long accountrecid);
	
	List<HotelAffiliation> getNewAccountBrandsCanPrice(long accountrecid);

	List<Account> getCopyAccountList(long copyperiod, long period);

	List<AccountDefaultPercents> getDefaultPercents(long accountrecid);

	List<AccountDefaultRoompools> getDefaultRoompools(long accountrecid);
	
	List<Account> getFromToAccountList(long period, boolean to);

	List<RateProgram> getRatePrograms(long accountrecid, String aer_account, boolean isAccMaint);

	List<RateProgram> getAllRatePrograms(long accountrecid);

	List<AccountThirdPartyRegion> getThirdPartyRegions(long accountrecid);

	Long updateAccountCopyInfo(String cbCopyOv, long editperiod, long copyrec, User user);

	AccountUpdateInfo updateAccount(AccountDetailGeneral adg, User user);
	
	AccountUpdateInfo updateAccount_new(AccountDetailGeneral adg, User user);

	AccountUpdateInfo updateAccountBrands(AccountDetailBrands adb, User user);
        
	void updateAccountDetailRFP(AccountDetailRFP adr, User user);
	
	AccountCenterInfo getShortAccountInfo(Long accountrecid);

	void deleteAccount(Long accountrecid, User user);

	List<AccountJson> getFilteredAccountListSAPP(long count, long start, String filter, long period, User user, boolean AllowEdit, String pFlag);
	
	List<AccountJson> getAccountListHavingSAPPInfo(long count, long start, String filter, long period);
	
	List<AccountJson> getAccountListNotHavingSAPPInfo(long count, long start, String filter, long period);

	void copySappDetailsToNewAccount(long from_acctrecid, long to_acctrecid, User user);
	
	List<AccountIdJson> getFilteredAccountListSCPT(long count, long start, String filter, long period, long hotelid, User user);

	List<AccountHotelView> getAccountHotelViewlist();

    AccountDetailBrands getBrandAccountDetails(Long accountrecid);

	List<AccountBrand> getBrands(Long accountrecid);
	
	List<AccountBrandList> getAccountBrandList(Long accountrecid);
	
	AccountDetailBrands updateBrands(AccountDetailBrands adb);
	
	AccountDetailRFP getAccountDetailRFP(Long accountrecid);
	
	AccountDetailCompMatrix getAccountDetailCompMatrix(Long accountrecid);
	
	List<ComplexityAndRatings> getAddQuestCompList();
	
	List<ComplexityAndRatings> getSatRatingList();
	
	List<ComplexityAndRatings> getTacBonusList();
	
	List<RfpFileSentList> getRfpFileList(Long accountrecid);
	
	
	
	List<RenegSubmitList> getRenegSubmitList(Long accountrecid);
	
	void updateAccountDetailCompMatrix(AccountDetailCompMatrix adcm, User user);
	
	List<RfpSettingsList> getGbtaList();
	
	List<RfpSettingsList> getMaxseasonList();
	
	List<RfpSettingsList> getMaxrtList();
	
	List<RfpSettingsList> getRtallowedList();
	
	List<RfpSettingsList> getRatevisibleList();
	
	List<RfpSettingsList> getEdierfpList();
	
	List<RfpSettingsList> getContactList(Long accountrecid, Long id);
	/*Cognos : View Report Functionality starts	*/
	String findAccountName(long accountrecid);
	/*Cognos : View Report Functionality end	*/
	
	/*Cognos : EDIE Report Functionality starts	*/
	String findProfileName(long profileid);
	/*Cognos : EDIE Report Functionality end	*/

	RFPLaunchEmail getRFPLaunchEmailDetails(long accountrecid);
	
	String getRFPThirdPartyRegions(long accountrecid);

	void updateRFPAdditionalText(Long accountrecid, RfpLaunchRecapEmail rfpLaunchRecapEmail);

	RfpLaunchRecapEmail getRFPAdditionalText(Long accountrecid);
	
}
