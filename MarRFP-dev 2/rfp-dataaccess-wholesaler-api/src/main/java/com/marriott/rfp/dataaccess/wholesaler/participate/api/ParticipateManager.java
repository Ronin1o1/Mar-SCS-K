package com.marriott.rfp.dataaccess.wholesaler.participate.api;



import com.marriott.rfp.object.wholesaler.participate.Participiate;


public interface ParticipateManager {
	
	public long findWSParticipationID(String marshacode, long period, String loginName);
	
	public String isParticipating(long participationid);
	
	public String hasPeriodExpired(long period,long participationid);
	
	public  Participiate findRespondentDetails(long wsid, String role, String loginName);
	
	public void updateRespondent(Participiate participate,long wsid, String changed, String role, boolean isPeriodExpired, String loginName);
	
	public void updateParticipiant(Participiate participate,long wsid, String changed, String role, boolean isPeriodExpired, String loginName);
	
}