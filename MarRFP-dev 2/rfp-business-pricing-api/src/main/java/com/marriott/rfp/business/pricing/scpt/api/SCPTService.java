package com.marriott.rfp.business.pricing.scpt.api;

import java.util.List;
import java.util.Map;

import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.pricing.scpt.SCPTAccountGroup;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingChange;
import com.marriott.rfp.object.pricing.scpt.SCPTAcctPricingDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTAddAccount;
import com.marriott.rfp.object.pricing.scpt.SCPTBreakfast;
import com.marriott.rfp.object.pricing.scpt.SCPTComm;
import com.marriott.rfp.object.pricing.scpt.SCPTCommEdit;
import com.marriott.rfp.object.pricing.scpt.SCPTCommRateAmenities;
import com.marriott.rfp.object.pricing.scpt.SCPTCommRateseason;
import com.marriott.rfp.object.pricing.scpt.SCPTCommSetupInfo;
import com.marriott.rfp.object.pricing.scpt.SCPTDetail;
import com.marriott.rfp.object.pricing.scpt.SCPTHotel;
import com.marriott.rfp.object.pricing.scpt.SCPTInternet;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpAmenities;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpBudgetAndForecastData;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpGenInfo;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpRetailRate;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpThresholds;
import com.marriott.rfp.object.pricing.scpt.SCPTSetUpWtdRetailRate;
import com.marriott.rfp.object.pricing.scpt.SCPTStatus;
import com.marriott.rfp.object.pricing.scpt.SCPTStatusReason;
import com.marriott.rfp.object.user.User;

import com.marriott.rfp.object.pricing.scpt.SCPTSetupData;
import com.marriott.rfp.object.pricing.scpt.SCPTSetupStatus;
@SuppressWarnings("unused")
public interface SCPTService {
	public List<SCPTDetail> findSCPTDetail(Long hotelid, Long period, Long orderby, String filterString, String showGPP, Page page, Long scptaccountid);
	
	public Long findTotalDetail(Long hotelid, Long period, String filterString, String showGPP);

	public SCPTHotel findSCPTHotelDetail(Long hotelid, Long period);

	public List<SCPTStatus> findSCPTStatus(Long hotelid, Long period);

	public List<SCPTStatusReason> findSCPTStatusReason();

	public SCPTComm findSCPTComm(Long hotelid, Long period,  String isbrandextendedstay, Long scptaccountid);

	public List<SCPTAcctPricingDetail> findSCPTAcctPricingDetail(Long hotelid, Long period, String filterString, Long orderby, String groupid, Page page);
	
	public List<SCPTAcctPricingDetail> findSCPTAcctPricingTotal(Long hotelid, Long period, String groupid);

	public Long findSCPTNonGroupAccount(Long hotelid, Long period);

	public void updateSCPTGroupAccount(Long hotelid, Long period);
	
	public Long findTotalComm(Long hotelid, Long period, Long maxPageLen, String filterString, String groupid);

	public Long findTotalAcctPricingDtl(Long hotelid, Long period);
	
	public void updateSCPTAcctPricingDtl(Long hotelid, Long period, Long scpt_accountid);	

	public void updateSCPTStatus(Long hotelid, Long period, List<SCPTStatus> statusList);
	
	public void updateSCPTAcctPricingChg(Long hotelid, List<SCPTAcctPricingChange> accountpricingList,
			 Long period, String username,String isLocked,String checkUpdateSCPT, User user);

	public Long updateSCPTAdd(Long hotelid, Long period, SCPTAddAccount addAccount);

	public List<SCPTBreakfast> findSCPTBreakfast();

	public List<SCPTInternet> findSCPTInternet();
	
	public List<SCPTAccountGroup> findSCPTAccountGroup();

	public void updateSCPTDetail(Long hotelid, Long period, Map<Long, SCPTDetail> details);
	

	public void updateSCPTHotelDetail(Long hotelid, Long period, SCPTHotel hotelDetail);
	
	public void updateSCPTHotelComm(Long hotelid, Long period, Long scpt_accountid, List<SCPTCommRateAmenities> rateamenitiesList, User user);
	
	public void updateSCPTFullYrRnts(Long hotelid, Long period, Long scpt_accountid, Long prevyear_fy_fcst, Long fy_fcst,
			Double chg_rn_from_ty_pct);
	
	public void updateSCPTAcctComments(Long scpt_accountid, String comments, String commentschg );
	
	public void updateSCPTHotelCommRates(Long hotelid, Long period, Long scpt_accountid, List<SCPTCommRateseason> rateSeasonList, User user);
	
	public void updateSCPTPrevWeightedNet(Long scpt_accountid, Double prev_weightedratenet);	
	
	public void updateSCPTPopulatePreviousYear(Long hotelid, Long period);
	
	public void updateSCPTPopulateGrossRates(Long hotelid, Long period);
	
	public void updateSCPTCopyTotalComments(Long hotelid, Long period);

	public void updateSCPTCopyTotalAmenities(Long hotelid, Long period);

	public String findAnticipatedRateSet(long hotelid, long period);

	public SCPTCommSetupInfo fetchSetupInfo(long hotelid, long period);	
	
	public String getBrandname(Long affiliationid);
	 

	public SCPTSetUpGenInfo getSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay);

	public List<SCPTSetUpRetailRate> getSCPTSetUpRetailRate(long hotelid, long period, List<Season> seasonList);

	public SCPTSetUpAmenities getSCPTSetUpAmenities(long hotelid, long period);

	public SCPTSetUpThresholds getSCPTSetUpThresholds(long hotelid, long period);

	public void updateSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay, String isLocked, SCPTSetUpGenInfo scptSetUpGenInfo, User user);

	public void updateSCPTSetupRetailRate(long hotelid, long period,
			List<SCPTSetUpRetailRate> scptSetUpRetailRate, User user);

	public void updateSCPTSetUpAmenities(long hotelid, long period,
			SCPTSetUpAmenities scptSetUpAmenities, User user);

	public void updateSCPTSetUpThresholds(long hotelid, long period,
			SCPTSetUpThresholds scptSetUpThresholds, User user);

	public void updateSCPTPricing(long hotelid, long period, String username, String isLocked, 
			  String checkUpdateSCPT, User user, Long scpt_accountid, String donotprice);

	public SCPTSetUpBudgetAndForecastData getSCPTSetUpBudgetAndForecastData(
			long hotelid, long period);

	public void updateSCPTSetUpBudgetAndForecastData(long hotelid, long period,
			SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData);

	public String getIsLocked(long hotelid, long period);

	public String getLastUpdatedUser(long hotelid, long period);

	public void createScptSetupIfHotelNotPresent(long hotelid, long period);

	public SCPTSetUpWtdRetailRate getSCPTSetUpWtdRetailRate(long hotelid,
			long period);

	public void updateSCPTSetUpWtdRetailRate(long hotelid, long period,
			SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate);

	public void updateLastChangedDate(long hotelid, long period);

	public String fetchPricingLastUpdated(long hotelid, long period);
	
	public String fetchSetupTabCompleted(long hotelid, long period);
	

	public void updateSCPTPreviousYearGPPRates(long hotelid, long period);

	public String fetchSetupTabLastUpdated(long hotelid, long period);
	
	public Double getYoYRetailChange(long hotelid, long period);
	/* INC000007089109 */
	
	public String getSCPTYoYSetup(long hotelid, long period, long hotelrfpid);
	
	 public String fetchHistoryLastUpdated();
	 
	 public String getCurrencyCode(long hotelrfpid);
	    
	 public String getCurrencyWidth(long hotelrfpid);
   

}
