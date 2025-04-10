package com.marriott.rfp.business.pricing.sapp.impl;

import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.dataacess.pricing.sapp.api.AccountOverviewManager;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.period.PricingPeriod;

import com.marriott.rfp.object.pricing.sapp.AccountOverview;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctOverviewGroup;
import com.marriott.rfp.object.pricing.sapp.ActualSpend;
import com.marriott.rfp.object.pricing.sapp.Agencies;
import com.marriott.rfp.object.pricing.sapp.BTOverview;
import com.marriott.rfp.object.pricing.sapp.BTProfile;
import com.marriott.rfp.object.pricing.sapp.BusinessGen;
import com.marriott.rfp.object.pricing.sapp.CateringExtendedStay;
import com.marriott.rfp.object.pricing.sapp.Competitor;
import com.marriott.rfp.object.pricing.sapp.Contacts;
import com.marriott.rfp.object.pricing.sapp.GenHist;
import com.marriott.rfp.object.pricing.sapp.GroupDetail;
import com.marriott.rfp.object.pricing.sapp.Leisure;
import com.marriott.rfp.object.pricing.sapp.Markets;
import com.marriott.rfp.object.pricing.sapp.RevStreamsDescription;
import com.marriott.rfp.object.pricing.sapp.Subsidiary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.util.List;
import java.util.Map;

/**
 * Session Bean implementation class SAPPCommonServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class AccountOverviewServiceImpl implements AccountOverviewService {

	/**
	 * Default constructor.
	 */
	public AccountOverviewServiceImpl() {
	}

	@Autowired
	private AccountOverviewManager acctOverviewMgr = null;

	public AccountOverview getAcctOverview(long accountrecid, long period) {
		return acctOverviewMgr.getAcctOverview(accountrecid, period);
	}

	public List<Contacts> getAcctOverviewContactTypes(long contacttypeid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewContactTypes(contacttypeid, revstreamid);
	}

	public List<Contacts> getAcctOverviewContacts(long accountrecid, long contacttypeid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewContacts(accountrecid, contacttypeid, revstreamid);
	}

	public List<Contacts> getAcctOverviewUnusedContactTypes(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewUnusedContactTypes(accountrecid);
	}

	public List<Contacts> getAcctOverviewTeamMembers(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewTeamMembers(accountrecid);
	}

	public void updateAcctOverviewsGen(AccountOverview account, long period, long accountrecid, String loginName) {
		acctOverviewMgr.updateAcctOverviewsGen(account, period, accountrecid, loginName);
	}

	public void updateAcctOverviewContacts(List<Contacts> list, long accountrecid, String loginName) {
		acctOverviewMgr.updateAcctOverviewContacts(list, accountrecid, loginName);
	}

	public String getLastUpdate(long accountrecid, String pgName) {
		return acctOverviewMgr.getLastUpdate(accountrecid, pgName);
	}

	public GenHist getAcctOverviewGenHist(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewGenHist(accountrecid);
	}

	public List<ActualSpend> findAcctOverviewActualSpend(long accountrecid, String type) {
		return acctOverviewMgr.findAcctOverviewActualSpend(accountrecid, type);
	}

	public List<Competitor> getAcctOverviewCompetitor(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewCompetitor(accountrecid);
	}

	public void updateAcctOverviewCompetitor(Map<Integer, Competitor> pctMap, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewCompetitor(pctMap, accountrecid);
	}

	public void updateAcctOverviewActualSpend(Map<Long, ActualSpend> actualSpendMap, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewActualSpend(actualSpendMap, accountrecid);
	}

	public void updateAcctOverviewsGenHist(GenHist genHist, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewsGenHist(genHist, accountrecid);
	}

	public BusinessGen findAcctOverviewBusinessGen(long accountrecid) {
		return acctOverviewMgr.findAcctOverviewBusinessGen(accountrecid);
	}

	public List<Subsidiary> findAcctOverviewSubsidiaries(long accountrecid) {
		return acctOverviewMgr.findAcctOverviewSubsidiaries(accountrecid);
	}

	public void updateAcctOverviewBusinessGen(BusinessGen acctPerspective, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewBusinessGen(acctPerspective, accountrecid);
	}

	public void updateAcctOverviewSubsidiaries(List<Subsidiary> subs, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewSubsidiaries(subs, accountrecid);
	}

	public List<AcctInitiatives> getAcctOverviewInitList(long accountrecid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewInitList(accountrecid, revstreamid);
	}

	public AcctInitiatives findAcctOverviewInitiatives(String action, long accountrecid, long seqId, long revStreamType, long buyinglocid) {
		return acctOverviewMgr.findAcctOverviewInitiatives(action, accountrecid, seqId, revStreamType, buyinglocid);
	}

	public Long updateAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName) {
		return acctOverviewMgr.updateAcctOverviewInitiatives(initiative, accountrecid, loginName);
	}

	public void deleteAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName) {
		acctOverviewMgr.deleteAcctOverviewInitiatives(initiative, accountrecid, loginName);
	}

	public void updateAcctOverviewInitList(List<AcctInitiatives> inits, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewInitList(inits, accountrecid);
	}

	public void updateAcctOverviewLocInitList(List<AcctInitiatives> initiative, long accountrecid, String loginName) {
		acctOverviewMgr.updateAcctOverviewLocInitList(initiative, accountrecid, loginName);
	}

	public Long updateAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyinglocid, String loginName) {
		return acctOverviewMgr.updateAcctOverviewLocInitiatives(initiative, accountrecid, buyinglocid, loginName);
	}

	public void deleteAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyingLocid, String loginName) {
		acctOverviewMgr.deleteAcctOverviewLocInitiatives(initiative, accountrecid, buyingLocid, loginName);
	}

	public BTProfile getAcctOverviewBTYrOverYr(long accountrecid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewBTYrOverYr(accountrecid, revstreamid);
	}

	public List<HotelAffiliation> getAcctOverviewBrandSeg(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewBrandSeg(accountrecid);
	}

	public List<Agencies> getAcctOverviewAgencies(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewAgencies(accountrecid);
	}

	public List<Agencies> getAcctOverviewAgencyTypes() {
		return acctOverviewMgr.getAcctOverviewAgencyTypes();
	}

	public void updateAcctOverviewBTYrOverYr(BTProfile btProfile, long accountrecid, long revStreamId) {
		acctOverviewMgr.updateAcctOverviewBTYrOverYr(btProfile, accountrecid, revStreamId);
	}

	public void updateAcctOverviewBrandSeg(String[] selectedAffiliationList, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewBrandSeg(selectedAffiliationList, accountrecid);
	}

	public void updateAcctOverviewAgencies(List<Agencies> agencies, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewAgencies(agencies, accountrecid);
	}

	public BTOverview getAcctOverviewBTReqs(long accountrecid, long revStreamId) {
		return acctOverviewMgr.getAcctOverviewBTReqs(accountrecid, revStreamId);
	}

	public void updateAcctOverviewBTReqs(BTOverview model, long accountrecid, long revStreamId) {
		acctOverviewMgr.updateAcctOverviewBTReqs(model, accountrecid, revStreamId);
	}

	public List<Markets> getAcctOverviewMarkets(long accountrecid, boolean usMarket, int sortBy) {
		return acctOverviewMgr.getAcctOverviewMarkets(accountrecid, usMarket, sortBy);
	}

	public Markets getAcctOverviewMarketInfo(long recid) {
		return acctOverviewMgr.getAcctOverviewMarketInfo(recid);
	}

	public void updateAcctOverviewMarkets(List<Markets> markets, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewMarkets(markets, accountrecid);
	}

	public long updateAcctOverviewMarketLevel(Markets acctMarket, long accountrecid, String action) {
		return acctOverviewMgr.updateAcctOverviewMarketLevel(acctMarket, accountrecid, action);
	}

	public long updateAcctOverviewMarketLevel(Markets acctMarket, long accountrecid) {
		return acctOverviewMgr.updateAcctOverviewMarketLevel(acctMarket, accountrecid);
	}

	public void deleteAcctMarketsbyCountry(long accountrecid, String usmarket) {
		acctOverviewMgr.deleteAcctMarketsbyCountry(accountrecid, usmarket);
	}

	public void deleteAcctOverviewMarketLevel(Long recid, String usMarket, long accountrecid) {
		acctOverviewMgr.deleteAcctOverviewMarketLevel(recid, usMarket,accountrecid);
	}

	public CateringExtendedStay getAcctOverviewCatering(long accountrecid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewCatering(accountrecid, revstreamid);
	}

	public void updateAcctOverviewCatering(CateringExtendedStay catering, long accountrecid, long revstreamid) {
		acctOverviewMgr.updateAcctOverviewCatering(catering, accountrecid, revstreamid);
	}

	public RevStreamsDescription getAcctOverviewRevStream(long accountrecid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewRevStream(accountrecid, revstreamid);
	}

	public void updateAcctOverviewRevStream(RevStreamsDescription revS, long accountrecid, long revstreamid) {
		acctOverviewMgr.updateAcctOverviewRevStream(revS, accountrecid, revstreamid);
	}

	public CateringExtendedStay getAcctOverviewExtStay(long accountrecid, long revstreamid) {
		return acctOverviewMgr.getAcctOverviewExtStay(accountrecid, revstreamid);
	}

	public void updateAcctOverviewExtStay(CateringExtendedStay extstay, long accountrecid, long revstreamid) {
		acctOverviewMgr.updateAcctOverviewExtStay(extstay, accountrecid, revstreamid);
	}

	public Leisure getAcctOverviewLeisure(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewLeisure(accountrecid);
	}

	public void updateAcctOverviewLeisure(Leisure leisure, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewLeisure(leisure, accountrecid);
	}

	public void updateAcctOverviewContactsBuyer(List<Contacts> list, long accountrecid, String loginName) {
		acctOverviewMgr.updateAcctOverviewContactsBuyer(list, accountrecid, loginName);
	}

	public List<Contacts> getAcctOverviewKeyContacts(long accountrecid, String contactid, long contacttypeid) {
		return acctOverviewMgr.getAcctOverviewKeyContacts(accountrecid, contactid, contacttypeid);
	}

	public long updateAcctOverviewKeyContacts(Contacts travelManager, long accountrecid) {
		return acctOverviewMgr.updateAcctOverviewKeyContacts(travelManager, accountrecid);
	}

	public void deleteAcctOverviewKeyContacts(String accountId) {
		acctOverviewMgr.deleteAcctOverviewKeyContacts(accountId);
	}

	public GroupDetail getAcctOverviewGroupDetail(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewGroupDetail(accountrecid);
	}

	public void updateAcctOverviewGroupDetail(GroupDetail model, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewGroupDetail(model, accountrecid);
	}

	public AcctOverviewGroup getAcctOverviewGroup(long accountrecid) {
		return acctOverviewMgr.getAcctOverviewGroup(accountrecid);
	}

	public void updateAcctOverviewGroup(AcctOverviewGroup model, long accountrecid) {
		acctOverviewMgr.updateAcctOverviewGroup(model, accountrecid);
	}

	

	@Override
	public String saveExcelDataSAPP(BufferedReader br,long maxTravelMarkets,String marketType, Long accountrecid, List<String> stateNames, List<String> countryNames) {
		return acctOverviewMgr.saveExcelDataSAPP(br,maxTravelMarkets,marketType,accountrecid,stateNames,countryNames);
	}
	
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - Start
	/* (non-Javadoc)
	 * @see com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService#getExportDataSAPP(java.lang.String, java.util.List, java.util.List)
	 */
	public byte[] getExportDataSAPP(String marketType, List<Markets> markets) {
		return acctOverviewMgr.getExportDataSAPP(marketType, markets);
	}
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - End
	public List<PricingPeriod> findDueDates(long period) {
		return acctOverviewMgr.findDueDates(period);
	}
}