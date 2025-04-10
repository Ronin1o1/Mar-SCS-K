package com.marriott.rfp.business.pricing.scpt.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.dataacess.pricing.scpt.api.SCPTManager;
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
import com.marriott.rfp.utility.NumberUtility;

/**
 * Session Bean implementation class SCPTServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class SCPTServiceImpl implements SCPTService {

	@Autowired
	private SCPTManager scptMgr = null;

	@Override
	public List<SCPTDetail> findSCPTDetail(Long hotelid, Long period, Long orderby, String filterString, String showGPP, Page page, Long scptaccountid) {

		return scptMgr.findSCPTDetail(hotelid, period, orderby, filterString, showGPP, page, scptaccountid );
	}

	public Long findTotalDetail(Long hotelid, Long period, String filterString, String showGPP) {
		return NumberUtility.getTotalPages(scptMgr.findTotalDetail(hotelid, period, filterString, showGPP), 40);
	}

	public SCPTHotel findSCPTHotelDetail(Long hotelid, Long period) {
		return scptMgr.findSCPTHotelDetail(hotelid, period);
	}

	public List<SCPTStatus> findSCPTStatus(Long hotelid, Long period) {

		return scptMgr.findSCPTStatus(hotelid, period);
	}

	public List<SCPTStatusReason> findSCPTStatusReason() {
		return scptMgr.findSCPTStatusReason();
	}

	public SCPTComm findSCPTComm(Long hotelid, Long period, String isbrandextendedstay,  Long scptaccountid) {
		SCPTComm scptComm;
		scptComm = scptMgr.findSCPTComm(hotelid, period, scptaccountid);
		if (scptComm != null) {
			scptComm.setCommRates(scptMgr.findSCPTCommRates(hotelid, period, scptComm.getScpt_accountid(), isbrandextendedstay));
		}
		return scptComm;
	}

	public List<SCPTAcctPricingDetail> findSCPTAcctPricingDetail(Long hotelid, Long period, String filterString, Long orderby, String groupid, Page page){
		/*add record validation */	
		return scptMgr.findSCPTAcctPricingDetail(hotelid, period, filterString, orderby, groupid, page);
	}
	
	public List<SCPTAcctPricingDetail> findSCPTAcctPricingTotal(Long hotelid, Long period, String groupid){
		return scptMgr.findSCPTAcctPricingTotal(hotelid, period, groupid);
	}
	
	public Long findTotalComm(Long hotelid, Long period, Long maxPageLen, String filterString, String groupid) {
		return NumberUtility.getTotalPages(scptMgr.findTotalComm(hotelid, period, filterString, groupid), maxPageLen);
	}
	
	public Long findTotalAcctPricingDtl(Long hotelid, Long period){
		return scptMgr.findTotalAcctPricingDtl(hotelid, period);
	}
	
	public void updateSCPTAcctPricingDtl(Long hotelid, Long period, Long scpt_accountid){
		scptMgr.updateSCPTAcctPricingDtl(hotelid, period, scpt_accountid);
	}
	
	public Long findSCPTNonGroupAccount(Long hotelid, Long period){
		return scptMgr.findSCPTNonGroupAccount(hotelid, period);
	}

	public void updateSCPTGroupAccount(Long hotelid, Long period){
		scptMgr.updateSCPTGroupAccount(hotelid, period);		
	}	
	
	public void updateSCPTStatus(Long hotelid, Long period, List<SCPTStatus> statusList) {
		for (SCPTStatus status : statusList) {
			if (status.getChg() != null && status.getChg().equals("Y"))
				scptMgr.updateSCPTStatus(hotelid, period, status);
		}
	}
	
	public void updateSCPTAcctPricingChg(Long hotelid, List<SCPTAcctPricingChange> acctpricingList,
			Long period, String username, String isLocked,String checkUpdateSCPT, User user){
	   for (SCPTAcctPricingChange acctpricing : acctpricingList){
		      scptMgr.updateSCPTAcctPricingChg(hotelid, acctpricing);
		      if (acctpricing.getMoveoutofprimary().equals("Y") && acctpricing.getDonotprice().equals("N") ){
		    	 scptMgr.updateSCPTPricing(hotelid, period, username, isLocked, checkUpdateSCPT, user, 
		    			 acctpricing.getScpt_accountid(), acctpricing.getDonotprice()); 
		      }
	    	  scptMgr.updateSCPTAcctPricingDtl(hotelid, period, acctpricing.getScpt_accountid());

	   }
	}

	public Long updateSCPTAdd(Long hotelid, Long period, SCPTAddAccount addAccount) {
		return scptMgr.updateSCPTAdd(hotelid, period, addAccount);
	}

	public List<SCPTBreakfast> findSCPTBreakfast() {
		return scptMgr.findSCPTBreakfast();
	}

	public List<SCPTInternet> findSCPTInternet() {
		return scptMgr.findSCPTInternet();
	}
	
	public List<SCPTAccountGroup> findSCPTAccountGroup(){
		return scptMgr.findSCPTAccountGroup();
	}

	public void updateSCPTDetail(Long hotelid, Long period, Map<Long, SCPTDetail> details) {
		if (details != null) {
			for (Map.Entry<Long, SCPTDetail> detail : details.entrySet()) {
				SCPTDetail thedetail = detail.getValue();
				if (thedetail != null && thedetail.getChg() != null && thedetail.getChg().equals("Y")) {
					scptMgr.updateSCPTDetail(hotelid, period, detail.getKey(), detail.getValue());
				}
			}
		}
	}

	public void updateSCPTHotelDetail(Long hotelid, Long period, SCPTHotel hotelDetail) {
		scptMgr.updateSCPTHotelDetail(hotelid, period, hotelDetail);
	}
	
	public void updateSCPTFullYrRnts(Long hotelid, Long period, Long scpt_accountid, Long prevyear_fy_fcst, Long fy_fcst,
			Double chg_rn_from_ty_pct){
		scptMgr.updateSCPTFullYrRnts(hotelid, period, scpt_accountid, prevyear_fy_fcst, fy_fcst, chg_rn_from_ty_pct);
	}
	
	public void updateSCPTAcctComments(Long scpt_accountid, String comments, String commentschg ){
		scptMgr.updateSCPTAcctComments(scpt_accountid, comments, commentschg);
	}
	
	public void updateSCPTHotelComm(Long hotelid, Long period, Long scpt_accountid, List<SCPTCommRateAmenities> rateAmenitiesList, User user){
        for(SCPTCommRateAmenities rateAmen : rateAmenitiesList){
        	scptMgr.updateSCPTHotelComm(hotelid, period, scpt_accountid, rateAmen, user);
	   }
	}
	
	public void updateSCPTHotelCommRates(Long hotelid, Long period, Long scpt_accountid, List<SCPTCommRateseason> rateSeasonList, User user){
        for(SCPTCommRateseason rateSeason : rateSeasonList){
        	if (rateSeason.getChg().equals("Y") && rateSeason.getChg() != null){
        	scptMgr.updateSCPTHotelCommRates(hotelid, period, scpt_accountid, rateSeason, user);
        	}
	   }
	}
	
	public void updateSCPTPrevWeightedNet(Long scpt_accountid, Double prev_weightedratenet){
		scptMgr.updateSCPTPrevWeightedNet(scpt_accountid, prev_weightedratenet);
	}
	
	public void updateSCPTPopulatePreviousYear(Long hotelid, Long period) {
		scptMgr.updateSCPTPopulatePreviousYear(hotelid, period);
	}
	
	public void updateSCPTPopulateGrossRates(Long hotelid, Long period) {
		scptMgr.updateSCPTPopulateGrossRates( hotelid,  period);
	}
	
	public void updateSCPTCopyTotalComments(Long hotelid, Long period) {
		scptMgr.updateSCPTCopyTotalComments(hotelid, period);
	}

	public void updateSCPTCopyTotalAmenities(Long hotelid, Long period) {
		scptMgr.updateSCPTCopyTotalAmenities(hotelid, period);
	}  

	@Override
	public String findAnticipatedRateSet(long hotelid, long period) {
		return scptMgr.findAnticipatedRateSet(hotelid,period);
	}
	
	@Override
	public Double getYoYRetailChange(long hotelid, long period) {
		return scptMgr.getYoYRetailChange(hotelid,period);
	}
	
	public String getSCPTYoYSetup(long hotelid, long period, long hotelrfpid){
		return scptMgr.getSCPTYoYSetup(hotelid, period, hotelrfpid);
	}
	
	@Override
	public SCPTCommSetupInfo fetchSetupInfo(long hotelid, long period) {
		return 	scptMgr.fetchSetupInfo( hotelid,  period);

	}
	
	 public String getBrandname(Long affiliationid)
	 {
		 return scptMgr.getBrandname(affiliationid);
	 }

	

	@Override
	public SCPTSetUpGenInfo getSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay) {
		SCPTSetUpGenInfo scptSetUpGenInfo=scptMgr.getSCPTSetUpGenInfo(hotelid,period,isbrandextendedstay);
		return scptSetUpGenInfo;
	}

	@Override
	public List<SCPTSetUpRetailRate> getSCPTSetUpRetailRate(long hotelid, long period, List<Season> seasonList) {
		List<SCPTSetUpRetailRate> scptSetUpRetailRate=scptMgr.getSCPTSetUpRetailRate(hotelid,period,seasonList);
		return scptSetUpRetailRate;
	}

	@Override
	public SCPTSetUpAmenities getSCPTSetUpAmenities(long hotelid, long period) {
		SCPTSetUpAmenities scptSetUpAmenities=scptMgr.getSCPTSetUpAmenities(hotelid,period);
		return scptSetUpAmenities;
	}

	@Override
	public SCPTSetUpThresholds getSCPTSetUpThresholds(long hotelid, long period) {
		SCPTSetUpThresholds scptSetUpThresholds=scptMgr.getSCPTSetUpThresholds(hotelid,period);
		return scptSetUpThresholds;
	}

	@Override
	public void updateSCPTSetUpGenInfo(long hotelid, long period,
			String isbrandextendedstay, String isLocked, SCPTSetUpGenInfo scptSetUpGenInfo, User user) {
		scptMgr.updateSCPTSetUpGenInfo(hotelid,period,isbrandextendedstay,isLocked,scptSetUpGenInfo, user);
		}

	@Override
	public void updateSCPTSetupRetailRate(long hotelid, long period,
			List<SCPTSetUpRetailRate> scptSetUpRetailRate, User user) {
		scptMgr.updateSCPTSetupRetailRate(hotelid,period,scptSetUpRetailRate, user);
		
		
	}

	@Override
	public void updateSCPTSetUpAmenities(long hotelid, long period,
			SCPTSetUpAmenities scptSetUpAmenities, User user) {
		scptMgr.updateSCPTSetUpAmenities(hotelid,period,scptSetUpAmenities, user);
		
	}

	@Override
	public void updateSCPTSetUpThresholds(long hotelid, long period,
			SCPTSetUpThresholds scptSetUpThresholds, User user) {
		scptMgr.updateSCPTSetUpThresholds(hotelid,period,scptSetUpThresholds, user);
		
	}
	


	@Override
	public SCPTSetUpBudgetAndForecastData getSCPTSetUpBudgetAndForecastData(
			long hotelid, long period) {
		return scptMgr.getSCPTSetUpBudgetAndForecastData(hotelid,period);
	}

	@Override
	public void updateSCPTSetUpBudgetAndForecastData(long hotelid, long period,
			SCPTSetUpBudgetAndForecastData scptSetUpBudgetAndForecastData) {
		scptMgr.updateSCPTSetUpBudgetAndForecastData(hotelid,period,scptSetUpBudgetAndForecastData);
		
	}

	@Override
	public void updateSCPTPricing(long hotelid, long period, String username,
			String isLocked,String checkUpdateSCPT, User user, Long scpt_accountid, String donotprice) {
		scptMgr.updateSCPTPricing(hotelid,period,username,isLocked,checkUpdateSCPT, user, scpt_accountid, donotprice);
		
	}

	@Override
	public String getIsLocked(long hotelid, long period) {
		
		  return scptMgr.getIsLocked(hotelid,period);
	}

	@Override
	public String getLastUpdatedUser(long hotelid, long period) {
		  return scptMgr.getLastUpdatedUser(hotelid,period);
	}

	@Override
	public void createScptSetupIfHotelNotPresent(long hotelid, long period) {
		scptMgr.createScptSetupIfHotelNotPresent(hotelid,period);
		
	}

	@Override
	public SCPTSetUpWtdRetailRate getSCPTSetUpWtdRetailRate(long hotelid,
			long period) {
		return scptMgr.getSCPTSetUpWtdRetailRate(hotelid,period);
	}

	@Override
	public void updateSCPTSetUpWtdRetailRate(long hotelid, long period,
			SCPTSetUpWtdRetailRate scptSetUpWtdRetailRate) {
		scptMgr.updateSCPTSetUpWtdRetailRate(hotelid,period,scptSetUpWtdRetailRate);
		
	}

	@Override
	public void updateLastChangedDate(long hotelid, long period) {
		scptMgr.updateLastChangedDate(hotelid,period);
		
	}

	@Override
	public String fetchPricingLastUpdated(long hotelid, long period) {
		return scptMgr.fetchPricingLastUpdated(hotelid,period);
	}
	@Override
	public void updateSCPTPreviousYearGPPRates(long hotelid, long period)
	{
		 scptMgr.updateSCPTPreviousYearGPPRates(hotelid,period);
	}

	@Override
	public String fetchSetupTabLastUpdated(long hotelid, long period) {
		return scptMgr.fetchSetupTabLastUpdated(hotelid,period);
	}
	
	
	public String fetchSetupTabCompleted(long hotelid, long period){
		return scptMgr.fetchSetupTabCompleted(hotelid, period);
	}
        /* INC000007089109 */
   @Override
	public String fetchHistoryLastUpdated() {
		return scptMgr.fetchHistoryLastUpdated();
	
   }
	public String getCurrencyCode(long hotelrfpid) {
	    return scptMgr.getCurrencyCode(hotelrfpid);
	}
	
	public String getCurrencyWidth(long hotelrfpid) {
	    return scptMgr.getCurrencyWidth(hotelrfpid);
	}
}
