package com.marriott.rfp.business.pricing.common.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.marketsalesregion.api.MarketSalesRegionManager;
import com.marriott.rfp.dataaccess.saleslocation.api.SalesLocationManager;
import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.dataacess.pricing.sapp.api.SAPPModulesManager;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.location.SalesLocation;
import com.marriott.rfp.object.marketsalesregion.MarketSalesRegion;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class PricingCommonServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class PricingCommonServiceImpl implements PricingCommonService {

	@Autowired
	private PeriodManager periodMgr = null;

	@Autowired
	HotelPricingManager hotelMgr = null;

    @Autowired
    private SalesLocationManager salesLocMgr = null;
    
    @Autowired
    private MarketSalesRegionManager mktSalesRgnMgr = null;
    
    @Autowired
    private SAPPModulesManager sappModulesMgr=null;
    
    @Autowired
    private RFPConstantsManager constantsMgr=null;

    @Autowired
    private AccountManager accountMgr=null;

    public List<Period> findAllPeriodsForRole(String role) {
		List<Period> periodList = periodMgr.findAllPeriodsForRole(role);
		return periodList;
	}

	public List<HotelAffiliation> findAllHotelAffiliations() {
		List<HotelAffiliation> affiliationList = hotelMgr.getAffiliations();
		return affiliationList;
	}

    public List<SalesLocation> getLocations() {
    	return salesLocMgr.getLocations();
    }

    public List<MarketSalesRegion> getMarketSalesRegion() {
    	return mktSalesRgnMgr.getMarketSalesRegion();
    }

    public String getUserNotLinkedMsg(User user) {
    	String part=sappModulesMgr.findParticipateHotelFlag(user);
    	String msg=null;
    	if (part!=null && part.equals("U")) {
    		if (user.getIsHotelUser() && (user.getEnhanced_Reporting()!=null || user.getEnhanced_Reporting().equals("N"))) {
    			msg="Logged in User currently not linked to any Property, please direct any questions to PAS at " + constantsMgr.getContactEmail().getConstant_value();
    		} else if (user.getIsSalesUser()) {
    			msg="Logged in User currently not linked to any Account, please direct any questions to PAS at " + constantsMgr.getContactEmail().getConstant_value();
    		} else if (user.getIsLimitedSalesUser()){
    			msg="Logged in User currently not linked to any Account/Property, please direct any questions to GST at " + constantsMgr.getSAPP_Email().getConstant_value();
    		}
    	}
    	return msg;
    }
    
    public String getUserNotLinkedAccountMsg(User user) {
    	Long numAccts=accountMgr.getNumAccountNoPeriod(user);
    	String msg=null;
    	if (numAccts==null || numAccts.longValue()==0) {
    		if (user.getIsSalesUser()) {
    			msg="Logged in User currently not linked to any Account, please direct any questions to PAS at " + constantsMgr.getContactEmail().getConstant_value();
    		} else if (user.getIsLimitedSalesUser()){
    			msg="Logged in User currently not linked to any Account, please direct any questions to GST at " + constantsMgr.getSAPP_Email().getConstant_value();
    		}
    	}
    	return msg;
    }

    
    public String getParticipate(User user) {
    	return sappModulesMgr.findParticipateHotelFlag(user);
    }
}
