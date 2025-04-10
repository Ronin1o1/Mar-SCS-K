package com.marriott.rfp.business.wholesaler.hotelmenu.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.hotelmenu.api.WholesalerHotelMenuService;
import com.marriott.rfp.dataaccess.wholesaler.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuData;

/**
 * Session Bean implementation class WholesalerHotelMenuServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerHotelMenuServiceImpl implements WholesalerHotelMenuService {

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;
	
	public WholesalerHotelMenuServiceImpl() { }

	public WholesalerMenuData findNavigationByWSId(long wsid, String currentItem,long roompoolid,String isParticipation,String hasPeriodExpired, User user, String missMsg) {
		WholesalerMenuData wholesalerMenuData = new WholesalerMenuData();
		wholesalerMenuData = hotelMenuMgr.findNavigationByWSId(wsid, currentItem, roompoolid, isParticipation, hasPeriodExpired, user, missMsg);
		return wholesalerMenuData;
	}

	public void updateWSMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged) {
		hotelMenuMgr.updateWSMenuStatus(screenid, wsid, status, hasPeriodExpired, user, formChanged);
	}
	
	public void updateWSRatesMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged, long roompoolid) {
		hotelMenuMgr.updateWSRatesMenuStatus(screenid, wsid, status, hasPeriodExpired, user, formChanged, roompoolid);
	}
	
}