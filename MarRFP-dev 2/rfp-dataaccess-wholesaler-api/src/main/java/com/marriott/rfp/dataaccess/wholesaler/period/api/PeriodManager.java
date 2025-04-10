package com.marriott.rfp.dataaccess.wholesaler.period.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.period.Period;


public interface PeriodManager {
	
	public List<Period> findAllPeriodsForRole(String role);
	
	public Period findPeriodDetails(long period);
	
}