package com.marriott.rfp.business.wholesaler.hotelmenu.api;



import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuData;


public interface WholesalerHotelMenuService {
	
	public WholesalerMenuData findNavigationByWSId(long wsid, String currentItem,long roompoolid,String isParticipation,String hasPeriodExpired, User user, String missMsg);
	
	public void updateWSMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged);
	
	public void updateWSRatesMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged, long roompoolid);
	
}