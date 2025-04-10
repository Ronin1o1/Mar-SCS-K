package com.marriott.rfp.business.pricing.portfolio.api;

import java.io.File;
import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.ThirdPartyRegion;
import com.marriott.rfp.object.pricing.accountregistration.AccountRegistration;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSListData;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusList;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusRef;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestAvail;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestSelected;
import com.marriott.rfp.object.pricing.portfolio.CBCSelect;
import com.marriott.rfp.object.pricing.portfolio.CBCStatus;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAddEmailInfo;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAvail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationSelected;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatus;
import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;
import com.marriott.rfp.object.pricing.portfolio.SolicitSelect;
import com.marriott.rfp.object.pricing.sapp.Contacttype;
import com.marriott.rfp.object.user.User;

// //Commented for Migration 
public interface PortfolioService {
	public List<HotelSolicitationAvail> findAvailHotelSolicitation(PricingFilterSelections filterValues, User user);

	public List<HotelSolicitationSelected> findSelectedHotelSolicitation(PricingFilterSelections filterValues, User user);

	public String updateAccountSolicitationSelect(long accountrecid, List<SolicitSelect> solicitSelect, User user);

	public void updateAccountSolicitationAvail(long accountrecid, List<Long> solictAvail, User user);

	public void sendSolicitationEmails(Long accountrecid, Long period, List<SolicitSelect> solicitSelect, User user);

	public void sendSolicitationEmails(Long accountrecid, Long period, List<SolicitSelect> solicitSelect, byte[] myFile, String fileName, User user);
	
	public void updateHotelSolicitationAddEmailInfo(Long accountrecid, HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo, User user);

	public List<Portfolio> findPortfolioOrganization(PricingFilterSelections filterValues, int subsetnum, User user);

	public void updatePortfolioOrganization(long accountrecid, String subset, List<Long> orgSelect, User user);

	public List<Portfolio> findPortfolioAvail(PricingFilterSelections filterValues, User user);

	public List<Portfolio> findPortfolioSelected(PricingFilterSelections filterValues, User user);

	public String updatePortfolioSelection(long accountrecid, String subset, List<Long> orgSelect, User user);

	public void deletePortfolioSelection(long accountrecid, String accountpricingtype, List<Long> orgSelect, User user);

	public List<HotelPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user);

	public void updateHotelPgoosMaintanence(long period, List<HotelPGOOSListData> hotelpgoosmaint, User user);
	
	public List<AccountStatusList> findAccountStatusListDetail(long period, String accountpricingtype, String accountsegment, int orderBy, Page page, String alphaOrder, User user, String pasManager,long accountstatus, String showPortfolio);
	
	public long getTotalAccoutStatusListPages(long period, String accountpricingtype, String accountsegment, int orderBy, String alphaOrder, User user, long maxpagelen, String pasManager, String showPortfolio);

	public void updateAccountStatus(Map<Long, AccountStatusList> acctStatusList, User user);

	public List<AccountStatusRef> getAllAccountStatusRef();

	public List<PortfolioStatus> findPortfolioStatus(PricingFilterSelections filterValues, User user);

	public void updatePortfolioStatusList(List<PortfolioStatus> pslist, Long accountrecid, User user);

	public void updateAcceptancePortfolioStatusList(String acceptReject, List<PortfolioStatus> pslist, Long accountrecid, User user, int rejectionReasonID);

	public List<String> getEmailNotSent(PricingFilterSelections filterValues, String addemailtext_screentype); 

	public List<HotelListData> findPropertyList(PricingFilterSelections filterValues, User user);

	public List<ThirdPartyRegion> getAccountThirdPartiesForAcctReg();

	public void registerCentralAccount(AccountRegistration accountReg, User user);

	public void registerNonCentralAccount(AccountRegistration accountReg, User user);

	public List<Contacttype> getEmailContactOptions(String addemailtext_screentype); 

	public Contacttype getEmailContactOption(Long accountrecid, String addemailtext_screentype); 

	public List<CBCRequestAvail> findAvailCBCRequest(PricingFilterSelections filterValues, User user);

	public List<CBCRequestSelected> findSelectedCBCRequest(PricingFilterSelections filterValues, User user);

	public String updateAccountCBCSelect(long accountrecid, List<CBCSelect> cbcSelect, User user);

	public void updateAccountCBCAvail(long accountrecid, List<Long> cbcAvail, User user);

	public List<CBCStatus> findSelectedCBCStatus(PricingFilterSelections filterValues, User user);

	public void updateAcceptanceCBCStatusList(List<CBCStatus> pslist, Long accountrecid, User user);

	public void updateAllAcceptanceCBCStatusList(String status, List<CBCStatus> pslist, Long accountrecid, User user);

	public List<RejectionReason> findCBCRejectionReasons();

	public List<PortfolioRebid> findPortfolioRebid(PricingFilterSelections filterValues, User user) ;

	public void updatePortfolioRebidList(List<PortfolioRebid> pslist, Long accountrecid, User user) ;

	public HotelSolicitationAddEmailInfo getAccountSolicitEmailAdditionalEmail(Long accountrecid, String addemailtext_screentype);
	
	public void sendRebidEmail(Long accountrecid, Long period, List<PortfolioRebid> portfolioRebidList,  User user);
	
	public void updateCBCListByProperty(String status, List<CBCStatus> pslist, Long accountrecid, User user);

}
