package com.marriott.rfp.dataacess.pricing.sapp.api;

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

import java.io.BufferedReader;
import java.util.List;
import java.util.Map;


public interface AccountOverviewManager {

	public AccountOverview getAcctOverview(long accountrecid, long period);

	public List<Contacts> getAcctOverviewContactTypes(long contacttypeid, long revstreamid);

	public List<Contacts> getAcctOverviewUnusedContactTypes(long accountrecid);

	public List<Contacts> getAcctOverviewContacts(long accountrecid, long contacttypeid, long revstreamid);

	public List<Contacts> getAcctOverviewTeamMembers(long accountrecid);

	public void updateAcctOverviewsGen(AccountOverview account, long period, long accountrecid, String loginName);

	public void updateAcctOverviewContacts(List<Contacts> list, long accountrecid, String loginName);

	public String getLastUpdate(long accountrecid, String pgName);

	public GenHist getAcctOverviewGenHist(long accountrecid);

	public List<ActualSpend> findAcctOverviewActualSpend(long accountrecid, String type);

	public List<Competitor> getAcctOverviewCompetitor(long accountrecid);

	public void updateAcctOverviewCompetitor(Map<Integer, Competitor> pctMap, long accountrecid);

	public void updateAcctOverviewActualSpend(Map<Long, ActualSpend> actualSpendMap, long accountrecid);

	public void updateAcctOverviewsGenHist(GenHist genHist, long accountrecid);

	public BusinessGen findAcctOverviewBusinessGen(long accountrecid);

	public List<Subsidiary> findAcctOverviewSubsidiaries(long accountrecid);

	public void updateAcctOverviewBusinessGen(BusinessGen acctPerspective, long accountrecid);

	public void updateAcctOverviewSubsidiaries(List<Subsidiary> subs, long accountrecid);

	public void updateAcctOverviewInitList(List<AcctInitiatives> inits, long accountrecid);

	public List<AcctInitiatives> getAcctOverviewInitList(long accountrecid, long revstreamid);

	public AcctInitiatives findAcctOverviewInitiatives(String action, long accountrecid, long seqId, long revStreamType, long buyinglocid);

	public Long updateAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName);

	public void deleteAcctOverviewInitiatives(AcctInitiatives initiative, long accountrecid, String loginName);

	public void updateAcctOverviewLocInitList(List<AcctInitiatives> initiative, long accountrecid, String loginName);

	public Long updateAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyinglocid, String loginName);

	public void deleteAcctOverviewLocInitiatives(AcctInitiatives initiative, long accountrecid, long buyingLocid, String loginName);

	public BTProfile getAcctOverviewBTYrOverYr(long accountrecid, long revstreamid);

	public List<HotelAffiliation> getAcctOverviewBrandSeg(long accountrecid);

	public List<Agencies> getAcctOverviewAgencies(long accountrecid);

	public List<Agencies> getAcctOverviewAgencyTypes();

	public void updateAcctOverviewBTYrOverYr(BTProfile btProfile, long accountrecid, long revStreamId);

	public void updateAcctOverviewBrandSeg(String[] selectedAffiliationList, long accountrecid);

	public void updateAcctOverviewAgencies(List<Agencies> agencies, long accountrecid);

	public BTOverview getAcctOverviewBTReqs(long accountrecid, long revStreamId);

	public void updateAcctOverviewBTReqs(BTOverview model, long accountrecid, long revStreamId);

	public List<Markets> getAcctOverviewMarkets(long accountrecid, boolean usMarket, int sortBy);

	public Markets getAcctOverviewMarketInfo(long recid);

	public void updateAcctOverviewMarkets(List<Markets> markets, long accountrecid);

	public long updateAcctOverviewMarketLevel(Markets acctMarket, long accountrecid, String action);

	public long updateAcctOverviewMarketLevel(Markets model, long accountrecid);

	public void deleteAcctOverviewMarketLevel(Long recid, String usMarket, long accountrecid);

	public void deleteAcctMarketsbyCountry(long accountrecid, String usmarket);

	public CateringExtendedStay getAcctOverviewCatering(long accountrecid, long revstreamid);

	public void updateAcctOverviewCatering(CateringExtendedStay catering, long accountrecid, long revstreamid);

	public RevStreamsDescription getAcctOverviewRevStream(long accountrecid, long revstreamid);

	public void updateAcctOverviewRevStream(RevStreamsDescription revS, long accountrecid, long revstreamid);

	public CateringExtendedStay getAcctOverviewExtStay(long accountrecid, long revstreamid);

	public void updateAcctOverviewExtStay(CateringExtendedStay extstay, long accountrecid, long revstreamid);

	public Leisure getAcctOverviewLeisure(long accountrecid);

	public void updateAcctOverviewLeisure(Leisure leisure, long accountrecid);

	public void updateAcctOverviewContactsBuyer(List<Contacts> list, long accountrecid, String loginName);

	public List<Contacts> getAcctOverviewKeyContacts(long accountrecid, String contactid, long contacttypeid);

	public long updateAcctOverviewKeyContacts(Contacts travelManager, long accountrecid);

	public void deleteAcctOverviewKeyContacts(String accountId);

	public GroupDetail getAcctOverviewGroupDetail(long accountrecid);

	public void updateAcctOverviewGroupDetail(GroupDetail model, long accountrecid);

	public AcctOverviewGroup getAcctOverviewGroup(long accountrecid);

	public void updateAcctOverviewGroup(AcctOverviewGroup model, long accountrecid);

	public String saveExcelDataSAPP(BufferedReader br,long maxTravelMarkets, String marketType, Long accountrecid, List<String> stateNames, List<String> countryNames);
	
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - Start
	/**
	 * Exports the SAPP data to csv file
	 * 
	 * @param marketType
	 *            The market type
	 * @param markets
	 *            The list of USA or International markets
	 * @return The byte[] with the data
	 */
	public byte[] getExportDataSAPP(String marketType, List<Markets> markets);
	// Added by TCS for INC000002650694 - Export feature for the BT/Business
	// Transient - City/Markets screen information - End
	
	public List<PricingPeriod> findDueDates(long period);
}