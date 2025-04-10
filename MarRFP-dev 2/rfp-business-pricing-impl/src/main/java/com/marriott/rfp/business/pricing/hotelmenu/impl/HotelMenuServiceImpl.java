package com.marriott.rfp.business.pricing.hotelmenu.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelmenu.api.HotelMenuService;
import com.marriott.rfp.dataacess.pricing.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.object.pricing.menu.PricingMenu;
import com.marriott.rfp.object.pricing.menu.PricingMenuChecks;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelMenuServiceImpl implements HotelMenuService {

	@Autowired
	private HotelMenuManager hotelMenuMgr = null;
	@Autowired
	private PeriodManager periodMgr=null;

	public PricingMenuData findByHotelRFPId(long hotelrfpid, String currentItem, User user) {
		PricingMenuData pricingMenuData = new PricingMenuData();
		pricingMenuData.setPricingmenuList(findMenu(hotelrfpid, currentItem, user));
		pricingMenuData.setNextScreen(getNextScreen(hotelrfpid, currentItem, user));
		pricingMenuData.setPreviousScreen(getPreviousScreen(hotelrfpid, currentItem, user));
		/*find all of the periods a hotel user would see for the transient reports even if the user is not a hotel user*/
		pricingMenuData.setReportPeriods(periodMgr.findAllPeriodsForRole("MFPUSER"));
		pricingMenuData.setNoPricing(periodMgr.getNoPricingFlag(hotelrfpid));
		return pricingMenuData;
	}
	
	public String getScreenStatus(long hotelrfpid, String currentItem, long hotel_accountinfoid) {
		return hotelMenuMgr.getScreenStatus(hotelrfpid, currentItem, hotel_accountinfoid);
	}
	
	private List<PricingMenu> findMenu(long hotelrfpid, String currentItem, User user) {
		List<PricingMenu> pricingMenuList = hotelMenuMgr.findByHotelRFPId(hotelrfpid);
		PricingMenuChecks pricingMenuChecks = hotelMenuMgr.getMenuChecks(hotelrfpid, user);
		long currentScreen = -10;
		String msg;
		if (!user.getIsPASAdmin() && !user.getIsAnySalesUser()) {
			for (int i = 0; i < pricingMenuList.size(); i++) {
				PricingMenu pricingMenuItem = pricingMenuList.get(i);
				if (pricingMenuItem.getActionstruts().equals("/" + currentItem + "/view.action"))
					currentScreen = pricingMenuItem.getScreenid();
				msg = getMessage(pricingMenuItem.getScreenid(), currentScreen, user.getShortRole(), pricingMenuChecks);
				pricingMenuItem.setMessage(msg);
			}
		}
		return pricingMenuList;
	}
	

	private String getMessage(int screenid, long currentScreen, String role, PricingMenuChecks pricingMenuChecks) {
		String msg = "";
		/*
		 * 'screenid screenname 0 all bt rates 3 Standards 4 Features 5 Seasons 6 Blackouts 7 Fixed 10 Weekend 12 Elig & Amen 13 Government per diem 15 Account 19 LOS Tiers 20
		 * Depth of Sales 22 Account Selection 27 Local Account selection 28 Local Account
		 */

		if (!pricingMenuChecks.getBHasCurrency()) {
			switch (screenid) {
			case 0: // all bt rates
			case 4: // Features
			case 5: // Seasons
			case 6: // blackouts
			case 7: // fixed
			case 8: // group meetings
			case 9: // government
			case 10: // weekend
			case 12: // eligibility
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 19: // los
			case 20: // depth of sales
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				msg = "Currency or distance is not available for this property. You cannot continue";
				return msg;
			}
		}

		if (!pricingMenuChecks.getBHasStandards()) {
			switch (screenid) {
			case 0: // all bt rates
			case 5: // Seasons
			case 19: //LOS
				if (role.equals("R"))
					msg = "The Standards screen has not been completed.  You cannot continue.";
				else
					msg = "You must first review the Standards screen and update as necessary.";
				return msg;
			}
		}
		
		if (!pricingMenuChecks.getBEnteredCurrency()) {
			switch (screenid) {
			case 0: // all bt rates
			case 4: // Features
			case 5: // Seasons
			case 6: // blackouts
			case 7: // fixed
			case 8: // groups and meetings
			case 10: // weekend
			case 12: // eligibility
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 19: // los
			case 20: // depth of sales
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (role.equals("R"))
					msg = "The Standards screen has not been completed.  You cannot continue.";
				else
					msg = "You must enter the information on the Standards screen first.";
				return msg;
			}
		}

		/*
		 * if no seasons, do not allow the user to enter into the rate, selection and dos screens
		 */
		if (!pricingMenuChecks.getBHasSeasons()) {
			switch (screenid) {
			case 0: // all bt rates
			case 5: // seasons
			case 6: // blackouts
			case 7: // fixed
			case 8: // net-non
			case 10: // weekend
			case 12: // eligibility
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 19: // los
			case 20: // depth of sales
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (!(currentScreen == 5 && (screenid == 20 || screenid == 19))) {
					if (role.equals("R"))
						msg = "Seasons have not been entered for this property.  You cannot continue.";
					else
						msg = "You must first review the Seasons screen and update as necessary.";
					return msg;
				}
			}
		}
		/*
		 * if no LOS, do not allow the user to enter into the rate, selection and dos screens
		 */
		if (!pricingMenuChecks.getBHasLOS()) {
			switch (screenid) {
			case 0: // all bt rates
			case 6: // blackouts
			case 7: // fixed
			case 8: // net-non
			case 10: // weekend
			case 12: // eligibility
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 20: // depth of sales
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (!(currentScreen == 19 && screenid == 20)) { // if
					// we are not currently on the los screen prevent going to
					// the seasons screen
					if (role.equals("R"))
						msg = "Length of stay tiers have not been entered for this property.  You cannot continue.";
					else
						msg = "You must enter the length of stay tiers first.";
					return msg;
				}
			}
		}

		/* if no DOS and has a DOS screen, do not allow the user continue */
		if (!pricingMenuChecks.getBHasDOS()  && !pricingMenuChecks.getBHasNoDOSScreen()) {
			switch (screenid) {
			case 6: // blackouts
			case 7: // fixed
			case 8: // groupmeetings
			case 10: // weekend
			case 12: // eligibility
			case 13: // government per diem
			case 15: // account rates
			case 17: // gov los
			case 18: // gov rates
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (currentScreen != 20) {
					if (!role.equals("S") && !role.equals("F") && !role.equals("R") && !role.equals("A"))
						msg = "You must enter Depth of Sales first.";
					return msg;
				}
			}
		}

		//GBTA-4 Remove Fixed Rates
		/* if no fixed rates , do not allow the user continue 
		if (!pricingMenuChecks.getBHasFixed()) {
			switch (screenid) {
			case 0: // all bt rates
			case 8: // group meetings
			case 10: // weekend
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				msg = "You must enter the fixed rates first.";
				return msg;
			}
		}*/

		/* if no group meetings , do not allow the user continue */
		if (!pricingMenuChecks.getBHasGroupMeeting()) {
			switch (screenid) {
			case 0: // all bt rates
			case 10: // weekend
			case 13: // government per diem
			case 15: // account rates
			case 18: // gov rates
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				msg = "You must enter Group Meeting first.";
				return msg;
			}
		}

		/* if no gov terms , do not allow the user continue */
		if (!pricingMenuChecks.getBHasGovTerms()) {
			switch (screenid) {
			case 0: // all bt rates
			case 10: // weekend
			case 15: // account rates
			case 18: // gov rates
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (currentScreen != 13) {
					msg = "You must read and accept the Government Terms and Conditions first.";
					return msg;
				} else {
					msg = "You must read the Government Terms and Conditions first.";
					return msg;
				}
			}
		}


		/* if no gov rates , do not allow the user continue */
		if (!pricingMenuChecks.getBHasGovRates()) {
			switch (screenid) {
			case 0: // all bt rates
			case 10: // weekend
			case 15: // account rates
			case 22: // account center
			case 27: // local account center
			case 28: // local account rates
				if (!(currentScreen == 18)) {
					// we are not currently on the los screen prevent going to
					// the seasons screen
					if (role.equals("R"))
						msg = "Government rates  have not been entered for this property.  You cannot continue.";
					else
						msg = "You must enter the Government rates first.";
					return msg;
				}
			}
		}

		return msg;
	}

	private String getNextScreen(long hotelrfpid, String currentItem, User user) {
		return hotelMenuMgr.getNextScreen(hotelrfpid, currentItem, user);
	}

	private String getPreviousScreen(long hotelrfpid, String currentItem, User user) {
		return hotelMenuMgr.getPreviousScreen(hotelrfpid, currentItem, user);
	}

	public void update(long hotelrfpid, long screenid, long accountrecid, String accounttype, String status, User user, String changed,
			String markComplete) {
		hotelMenuMgr.update(hotelrfpid, screenid, accountrecid, accounttype, status, user, changed, markComplete);
	}

}
