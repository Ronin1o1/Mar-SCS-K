package com.marriott.rfp.business.wholesaler.daysofweek.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.daysofweek.DaysOfWeek;


public interface WholesalerDaysOfWeekService {
	
	public List<DaysOfWeek> findAllDaysOfWeek();
	
	public List<DaysOfWeek> findDOWByParticipationId(long participationid);
	
	public void updateDaysofWeek(List<DaysOfWeek> dowList, long participationid, String formChanged, long period, boolean isPeriodExpired, String role, String loginName);
	
	public List<DaysOfWeek> findDOWByParticipationIdwithoutComma(long wsid);

}