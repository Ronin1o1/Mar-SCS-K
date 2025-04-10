package com.marriott.rfp.dataaccess.wholesaler.hotelmenu.api;


import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuChecks;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuData;


public interface HotelMenuManager {
	
	public WholesalerMenuData findNavigationByWSId(long wsid, String currentItem,long roompoolid,String isParticipation,String hasPeriodExpired, User user, String missMsg) ;
	
	public WholesalerMenuChecks getMenuChecks( long wsid, User userProperties);
	
	public String getNextScreen(long wsid, String currentItem, User user, String missMsg, long roompoolid, String isParticipation);
	
	public String getPreviousScreen(long wsid, String currentItem, User user, String hasPeriodExpired, long roompoolid, String isParticipation);
	
	public void updateWSMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged);
	
	public void updateWSRatesMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged, long roompoolid);
	
	public String getWSFinishStatus(long wsid, String role);
	
}