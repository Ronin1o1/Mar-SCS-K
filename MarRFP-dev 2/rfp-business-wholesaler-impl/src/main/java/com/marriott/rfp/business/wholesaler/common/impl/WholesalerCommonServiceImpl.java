package com.marriott.rfp.business.wholesaler.common.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.common.api.WholesalerCommonService;
import com.marriott.rfp.dataaccess.wholesaler.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataaccess.wholesaler.period.api.PeriodManager;
import com.marriott.rfp.object.wholesaler.period.Period;


/**
 * Session Bean implementation class WholesalerCommonServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerCommonServiceImpl implements WholesalerCommonService {

    /**
     * Default constructor. 
     */
    public WholesalerCommonServiceImpl() { }
    @Autowired
    private PeriodManager periodMgr = null; 
	@Autowired
	private HotelMenuManager hotelMenuMgr = null;
    
    public List<Period> findAllPeriodsForRole(String role) {
		List<Period> periodList = periodMgr.findAllPeriodsForRole(role);
		return periodList;
	}
    
    public Period findPeriodDetails(long period){
    	Period periodObj=periodMgr.findPeriodDetails(period);
    	return periodObj; 
    }
    
    public String getWSFinishStatus(long wsid, String role) {
    	String status = hotelMenuMgr.getWSFinishStatus(wsid, role); 
    	return status;
    }

}