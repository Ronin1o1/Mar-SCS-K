package com.marriott.rfp.business.wholesaler.common.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.period.Period;


public interface WholesalerCommonService {
	
	public List<Period> findAllPeriodsForRole(String role);
	
	public String getWSFinishStatus(long wsid, String role);
	
	public Period findPeriodDetails(long period);

}