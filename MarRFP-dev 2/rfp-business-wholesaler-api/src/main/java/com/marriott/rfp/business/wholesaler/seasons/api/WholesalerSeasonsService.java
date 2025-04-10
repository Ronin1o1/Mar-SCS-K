package com.marriott.rfp.business.wholesaler.seasons.api;

import java.util.List;



import com.marriott.rfp.object.wholesaler.seasons.Seasons;


public interface WholesalerSeasonsService {
	
	public List<Seasons> getSeasonDetails(long wsid);
	
	public void updateSeasons(List<Seasons> seasonList,long wsid,String formChanged, long period, String role, boolean isPeriodExpired, String loginName);
	
}