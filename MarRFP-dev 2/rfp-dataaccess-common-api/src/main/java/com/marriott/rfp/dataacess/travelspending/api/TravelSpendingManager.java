package com.marriott.rfp.dataacess.travelspending.api;

import java.util.List;



import com.marriott.rfp.object.travelspending.TravelSpending;


public interface TravelSpendingManager {

    List<TravelSpending> findAllQuarters();
	
	
}
