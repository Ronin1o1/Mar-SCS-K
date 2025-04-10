package com.marriott.rfp.dataaccess.wholesaler.daysofweek.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.daysofweek.DaysOfWeek;


public interface DaysOfWeekManager {
	
	public List<DaysOfWeek> findAllDaysOfWeek();
	
	public List<DaysOfWeek> findDOWByParticipationId(long wsid);
	
	public void updateDaysofWeek(List<DaysOfWeek> dow, long wsid, String formChanged, long period, boolean isPeriodExpired, String role, String loginName);
	
	public List<DaysOfWeek> findDOWByParticipationIdwithoutComma(long wsid);

}