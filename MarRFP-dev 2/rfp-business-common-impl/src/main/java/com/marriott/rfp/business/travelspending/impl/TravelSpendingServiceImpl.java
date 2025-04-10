package com.marriott.rfp.business.travelspending.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.travelspending.api.TravelSpendingService;
import com.marriott.rfp.dataacess.travelspending.api.TravelSpendingManager;
import com.marriott.rfp.object.travelspending.TravelSpending;

/**
 * Session Bean implementation class TravelSpendingServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class TravelSpendingServiceImpl implements TravelSpendingService {

	@Autowired
	private TravelSpendingManager travelSpendingMgr = null;
   /**
     * Default constructor. 
     */
	
	 public List<TravelSpending> findAllQuarters() {
		
		return travelSpendingMgr.findAllQuarters();
	}

}
