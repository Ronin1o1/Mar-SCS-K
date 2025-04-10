package com.marriott.rfp.dataaccess.wholesaler.hotelmenu.impl;

import java.util.ArrayList;
import java.util.List;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.ArgumentException;

import com.marriott.rfp.dataaccess.wholesaler.hotelmenu.api.HotelMenuManager;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenu;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuChecks;
import com.marriott.rfp.object.wholesaler.menu.WholesalerMenuData;
import com.marriott.rfp.utility.StringUtility;
import org.springframework.stereotype.Service;

/**
 * Session Bean implementation class HotelMenuManagerImpl
 */
@Service("hotelMenuManagerImplPricingWholesaler")
public class HotelMenuManagerImpl implements HotelMenuManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private long roomPoolCount;
	private int currentScreen = -10;
	private long currentSequence = -10;
	private boolean shortMenu = false;
	private boolean bHasCurrency = true;
	
	public HotelMenuManagerImpl() { }

	@SuppressWarnings("unchecked")
	public WholesalerMenuData findNavigationByWSId(long wsid, String currentItem, long roompoolid, String isParticipation,String hasPeriodExpired, User user, String missMsg) {

		String queryString = "SELECT A.SCREEN_NAME screenname, A.SCREEN_ID screenid, A.SCREEN_SEQUENCE screensequence, A.ACTIONSTRUTS actionstruts " +
							 " FROM MFPDBO.WS_SCREENS A WHERE A.SCREEN_SEQUENCE IS NOT NULL ORDER BY A.SCREEN_SEQUENCE ";
		
		Query q = em.createNativeQuery(queryString, WholesalerMenu.class);
		List<WholesalerMenu> menuList = q.getResultList();
		List<WholesalerMenu> menuitems = new ArrayList<WholesalerMenu>();
		WholesalerMenuData model = new WholesalerMenuData();
		
		for (WholesalerMenu menu : menuList) {
			if (menu.getActionstruts().contains(currentItem)) {
				this.currentScreen = menu.getScreenid();
				this.currentSequence = menu.getScreensequence();
			}
			
			List<WholesalerMenu> items = findByWSId(wsid, menu.getScreenid(), isParticipation, hasPeriodExpired, user.getRole());
			
			for (int i = 0; i < items.size(); i++) {
				WholesalerMenu m = (WholesalerMenu) items.get(i);
				getMenuChecks(wsid, user);
				if (m.getScreenid() != 9) {
					if (this.currentScreen == 5 && !bHasCurrency) {
						String msg = "";
						if (user.getRole().equals("MFPADMIN") || user.getRole().equals("MFPSALES"))
							msg = "";
						else
							msg = getMessage(m.getScreensequence(), user.getRole());
						m.setMessage(msg);
					}
				}
				
				if (!user.getRole().equals("MFPADMIN") && !user.getRole().equals("MFPSALES") && !user.getRole().equals("MFPWSADM")) {
					if (missMsg != null && missMsg.trim().length() > 0) {
						m.setMessage(missMsg);
					}
				}
				
				if (m.getScreenid() != 0)
					menuitems.add(m);
			}
		}
		
		model.setWholesalermenuList(menuitems);
		model.setRoomPoolCount(this.roomPoolCount);
			
		if (this.roomPoolCount > 0 && roompoolid == 0 && this.currentScreen == 8) {
			roompoolid = 1;
		}
			
		String prevScreen = getPreviousScreen(wsid, currentItem, user, hasPeriodExpired, roompoolid, isParticipation);
		if (prevScreen != null)
			model.setPreviousScreen(prevScreen);
			String nextScreen = getNextScreen(wsid, currentItem, user, missMsg, roompoolid, isParticipation);
			
			if (isParticipation.equals("Y") && currentItem.equals("wholesalerparticipation")) {
				nextScreen = "/wholesalerroomselection/view.action";
			}
			
			if (isParticipation.equals("N") && currentItem.equals("wholesalerparticipation")) {
				nextScreen = "/wholesalerrejection/view.action";
			} 

			if (nextScreen != null)
				model.setNextScreen(nextScreen);
		
		return model;
	}

	@SuppressWarnings("unchecked")	
	private List<WholesalerMenu> findByWSId(long wsid, int screenid, String isParticipation, String isPeriodExpired, String role) {
		
		List<WholesalerMenu> ratesInfo = new ArrayList<WholesalerMenu>();
		List<WholesalerMenu> items = new ArrayList<WholesalerMenu>();
		
		WholesalerMenu model = new WholesalerMenu();
		WholesalerMenu c_model = new WholesalerMenu();
		WholesalerMenu roomsModel = new WholesalerMenu();
		WholesalerMenu bedTypeModel = new WholesalerMenu();
		WholesalerMenu seasonsModel = new WholesalerMenu();
		WholesalerMenu daysModel = new WholesalerMenu();
		WholesalerMenu partModel = new WholesalerMenu();

		String queryString = "SELECT A.STATUS_ID statusid, B.ACTIONSTRUTS actionstruts, A.SCREEN_ID screenid, B.SCREEN_NAME screenname, B.SCREEN_SEQUENCE screensequence, A.ENTRY_STATUS_ID entrystatusid "
				+ "FROM MFPDBO.WS_ENTRY_STATUS A, MFPDBO.WS_SCREENS B WHERE (PARTICIPATION_ID = ?1) AND A.SCREEN_ID = B.SCREEN_ID AND B.SCREEN_SEQUENCE IS NOT NULL "
				+ "ORDER BY B.SCREEN_SEQUENCE, A.ENTRY_STATUS_ID";
		Query q = em.createNativeQuery(queryString, WholesalerMenu.class);
		q.setParameter(1, wsid);
		List<WholesalerMenu> menuList = q.getResultList();
		
		int index = 1;
		for (WholesalerMenu menu : menuList) {
			String status = menu.getStatusid();
			if (menu.getScreenid() == screenid) {
				c_model = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			} else if (menu.getScreenid() == 2) {
				partModel = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			} else if (menu.getScreenid() == 4) {
				roomsModel = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			} else if (menu.getScreenid() == 5) {
				bedTypeModel = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			} else if (menu.getScreenid() == 6) {
				seasonsModel = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			} else if (menu.getScreenid() == 7) {
				daysModel = new WholesalerMenu(status, menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 1);
			}
			if (menu.getScreenid() == 8) {
				WholesalerMenu rates = new WholesalerMenu(menu.getStatusid(), menu.getScreenid(), menu.getScreenname(), menu.getScreensequence(), menu.getActionstruts(), menu.getMessage(), menu.getEntrystatusid(), 2);
				rates.setRoompoolid(index++);
				ratesInfo.add(rates);
			}			
		}
		
		if (isParticipation.equals("N") || (isPeriodExpired.equals("Y") && (isParticipation.equals("N") || isParticipation == null || isParticipation.equals(""))
					&& (!role.equals("MFPADMIN") && !role.equals("MFPWSADM")))
				|| (role.equals("MFPSALES") && (isParticipation.equals("N") || isParticipation == null || isParticipation.equals("")))) {
				this.shortMenu = true;
		} else {
			shortMenu = false;
		}
		
		if (this.shortMenu) {
			switch (screenid) {
				case 1 :
				case 2 :
				case 10 :
					model = c_model;
					break;
				case 3 :
					model = c_model;
					model.setStatusid("");
					break;
			}
		} else {
			switch (screenid) {
				case 1 :
				case 2 :
				case 4 :
				case 5 :
				case 6 :
				case 7 :
				case 10 :
					if (!role.equals("MFPADMIN") && !role.equals("MFPWSADM") && isPeriodExpired.equals("N")) {
						if (!c_model.getStatusid().equals("C")) {
							if (partModel.getStatusid() != null && partModel.getStatusid().equals("N") && partModel.getScreenid() != c_model.getScreenid() && c_model.getScreensequence() > partModel.getScreensequence()) {
								c_model.setMessage("You must complete the " + partModel.getScreenname() + " screen first.");
							} else if (roomsModel.getStatusid() != null && roomsModel.getStatusid().equals("N") && roomsModel.getScreenid() != c_model.getScreenid() && c_model.getScreensequence() > roomsModel.getScreensequence()) {
								c_model.setMessage("You must complete the " + roomsModel.getScreenname() + " screen first.");
							} else if (bedTypeModel.getStatusid() != null && bedTypeModel.getStatusid().equals("N") && bedTypeModel.getScreenid() != c_model.getScreenid() && c_model.getScreensequence() > bedTypeModel.getScreensequence()) {
								c_model.setMessage("You must complete the " + bedTypeModel.getScreenname() + " screen first.");
							} else if (seasonsModel.getStatusid() != null && seasonsModel.getStatusid().equals("N") && seasonsModel.getScreenid() != c_model.getScreenid() && c_model.getScreensequence() > seasonsModel.getScreensequence()) {
								c_model.setMessage("You must complete the " + seasonsModel.getScreenname() + " screen first.");
							} else if (daysModel.getStatusid() != null && (daysModel.getStatusid().equals("N") || daysModel.getStatusid().equals("R")) && daysModel.getScreenid() != c_model.getScreenid() && c_model.getScreensequence() > daysModel.getScreensequence()) {
								c_model.setMessage("You must complete the " + daysModel.getScreenname() + " screen first.");
							} 
						}
					}
					model = c_model;
				case 9 :
					model = c_model;
					if (screenid == 9)
						model.setStatusid("");
					break;
				case 8 :
					String msg = "";
					if (!role.equals("MFPADMIN") && !role.equals("MFPWSADM") && isPeriodExpired.equals("N")) {
						if (partModel.getStatusid().equals("N")) {
							msg = "You must complete the " + partModel.getScreenname() + " screen first.";
						} else if (partModel.getStatusid().equals("R")) {
							msg = "You must revisit the " + partModel.getScreenname() + " screen first.";
						} else if (roomsModel.getStatusid().equals("N")) {
							msg = "You must complete the " + roomsModel.getScreenname() + " screen first.";
						} else if (roomsModel.getStatusid().equals("R")) {
							msg = "You must revisit the " + roomsModel.getScreenname() + " screen first.";
						} else if (bedTypeModel.getStatusid().equals("N")) {
							msg = "You must complete the " + bedTypeModel.getScreenname() + " screen first.";
						} else if (bedTypeModel.getStatusid().equals("R")) {
							msg = "You must revisit the " + bedTypeModel.getScreenname() + " screen first.";
						} else if (seasonsModel.getStatusid().equals("N")) {
							msg = "You must complete the " + seasonsModel.getScreenname() + " screen first.";
						} else if (seasonsModel.getStatusid().equals("R")) {
							msg = "You must revisit the " + seasonsModel.getScreenname() + " screen first.";
						} else if (daysModel.getStatusid().equals("N")) {
							msg = "You must complete the " + daysModel.getScreenname() + " screen first.";
						} else if (daysModel.getStatusid().equals("R")) {
							msg = "You must revisit the " + daysModel.getScreenname() + " screen first.";
						}
					}
					List<WholesalerMenu> rooms = getRatesMenu(wsid);
					int ratesNeedReview = 0;
					int ratesDone = 0;

					for (int j = 0; j < rooms.size(); j++) {
						if (((WholesalerMenu) ratesInfo.get(j)).getStatusid().equals("R"))
							ratesNeedReview++;
						else if (((WholesalerMenu) ratesInfo.get(j)).getStatusid().equals("C"))
							ratesDone++;
					}
					if (rooms.size() == 0) {
						c_model.setMessage(msg);
						model = c_model;
					} else {
						for (int j = 0; j < rooms.size(); j++) {
							WholesalerMenu r1 = (WholesalerMenu) rooms.get(j);
							WholesalerMenu r2 = (WholesalerMenu) ratesInfo.get(j);
							if (j == 0) {
								if (ratesNeedReview > 0)
									c_model.setStatusid("R");
								else if (ratesDone == rooms.size())
									c_model.setStatusid("C");
								c_model.setLevel(1);
								c_model.setMessage(msg);
								c_model.setEntrystatusid(r2.getEntrystatusid());
								model = c_model;
								items.add(model);
							}
							r2.setMessage(msg);
							r2.setScreenname(r1.getScreenname());
							r2.setActionstruts(r2.getActionstruts() + "&roompoolid=" + r2.getRoompoolid());
							items.add(r2);
						}
						return items;
					}
			}
		}
		
		items.add(model);
		return items;
	}
	
	private String getMessage(long screenSeq, String role) {
		String msg = "";
		String queryString = "select mfpproc.FN_WS_GETCONTACTINFORMATION() from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		
		if (this.currentScreen == 5) {
			if (!this.bHasCurrency && (screenSeq > this.currentSequence)) {
				String result = (String) q.getSingleResult();
				msg = "No Currency on Record. \\n" + result;
			}
		}
		
		return msg;
	} 
	
	public String getWSFinishStatus(long wsid, String role) {
		String queryString = "select NVL(mfpproc.FN_WS_FINALCHECK(?1, '?2'),'EMPTY') from dual";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, wsid);
		q.setParameter(2, StringUtility.replaceSingleQuotes(role));
		String result = (String) q.getSingleResult();
		if (result.equals("EMPTY")) {
			result = "";
		}
		return result;
	}

	public String getNextScreen(long wsid, String currentItem, User user, String missMsg, long roompoolid, String isParticipation) {
		
		String nextscreen="";
		if (currentScreen == 8 && roompoolid < roomPoolCount) {
			return "/" + currentItem + "/view.action&roompoolid=" + (roompoolid + 1); 
		} else if (currentScreen == 3 || currentScreen == 9) {
			return "";
		} else {
			String wsnext = "Y";
			if (!user.getRole().equals("MFPADMIN") && !user.getRole().equals("MFPWSADM")) {
				if (missMsg == null || missMsg.trim().length() <= 0) {
					wsnext = "Y";
				} else {
					wsnext = "N";
				}
			}
				
			String queryString = "select mfpproc.FN_WS_GETNEXTSCREEN(?,?,?,?,?) from dual";
			Query q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, wsid);
			q.setParameter(2, "/" + currentItem + "/view.action");
			q.setParameter(3, (shortMenu ? "Y":"N"));// shortMenu
			q.setParameter(4, user.getShortRole());
			q.setParameter(5,String.valueOf(wsnext));
			try {
				nextscreen = (String) q.getSingleResult();
			} catch (ArgumentException e) {}
			
			return nextscreen;
		}
	} 
	
	public String getPreviousScreen(long wsid, String currentItem, User user, String hasPeriodExpired, long roompoolid, String isParticipation) {
		
		if (currentScreen == 8 && roompoolid <= roomPoolCount && roompoolid > 1) {
			return "/" + currentItem + "/view.action&roompoolid=" + (roompoolid - 1);
		} else {
			String prevscreen = null;
			String queryString = "select mfpproc.FN_WS_GETPREVSCREEN(?,?,?,?,?) from dual";
			Query q = em.createNativeQuery(queryString, String.class);
			q.setParameter(1, wsid);
			q.setParameter(2, "/" + currentItem + "/view.action");
			q.setParameter(3, (shortMenu ? "Y":"N"));//shortMenu
			q.setParameter(4, user.getShortRole());
			q.setParameter(5,hasPeriodExpired);
			try {
				prevscreen = (String) q.getSingleResult();
			} catch (ArgumentException e) {}
			if (currentScreen == 9) {
				if (roompoolid == 1) {
					if (roomPoolCount == 0) {
						prevscreen += "&roompoolid=" + (roomPoolCount + 1);
					} else {
						prevscreen += "&roompoolid=" + roomPoolCount;
					}
				} else {
					prevscreen += "&roompoolid=" + (roomPoolCount - roompoolid);
				}
			}
			return prevscreen;
		}
	}

	public WholesalerMenuChecks getMenuChecks(long wsid, User userProperties) {
		WholesalerMenuChecks wholesalerMenuChecks = new WholesalerMenuChecks();
		String queryString;

		queryString = "select currencycode from mfpdbo.ws_participation where participation_id =?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, wsid);
		String hasCurrency = (String) q.getSingleResult();
		if (hasCurrency == null || hasCurrency.equals("")){
			wholesalerMenuChecks.setbHasCurrency(false);
		} else {
			wholesalerMenuChecks.setbHasCurrency(true);
		}

		return wholesalerMenuChecks;
	}	
	
	@SuppressWarnings("unchecked")	
	private List<WholesalerMenu> getRatesMenu(long wsid) {
		List<WholesalerMenu> menuList = new ArrayList<WholesalerMenu>();
		
		String queryString = "SELECT 'Rates - ' || B.ROOMPOOL "
				+ "FROM MFPDBO.WS_ROOMPOOL A, MFPDBO.WS_ROOMPOOL_REF B "
				+ "WHERE (A.ROOMPOOL_REF_ID = B.ROOMPOOL_REF_ID) "
				+ "AND (A.PARTICIPATION_ID = ?1) ORDER BY B.ROOMPOOL_SEQ_ID";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, wsid);
		List<String> rates = q.getResultList();
		for (String rate : rates) {
			WholesalerMenu menu = new WholesalerMenu();
			menu.setScreenname(rate);
			menuList.add(menu);
		}
		
		this.roomPoolCount = menuList.size();
		return menuList;
	}
	
	@SuppressWarnings("unchecked")	
	public void updateWSMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged) {
		boolean periodExpired = false;
		
		if (hasPeriodExpired.equals("Y")) {
			periodExpired = true;
		}
		
		String queryString = " SELECT A.ENTRY_STATUS_ID " +
				             " FROM MFPDBO.WS_ENTRY_STATUS A " + 
				             " WHERE (A.PARTICIPATION_ID = ?1) " + 
				             " AND A.SCREEN_ID = ?2 ORDER BY A.ENTRY_STATUS_ID";
		
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, wsid);
		q.setParameter(2, screenid);
		List<Integer> ids = q.getResultList();
		
		for (int i=0; i<ids.size(); i++) {
			Integer id;
			id = ids.get(i);
	    	Query query = em.createNativeQuery("{call mfpproc.SP_WS_UPDATESCREENSTATUS(?,?,?,?,?, " + periodExpired + ")}");
			query.setParameter(1, wsid);
			query.setParameter(2, id.intValue());
			query.setParameter(3, status);
			query.setParameter(4, user.getShortRole());
			query.setParameter(5, formChanged);
			query.executeUpdate();
		}
    }

	@SuppressWarnings("unchecked")
	public void updateWSRatesMenuStatus(long screenid, long wsid, String status, String hasPeriodExpired, User user, String formChanged, long roompoolid) {
	
		boolean periodExpired = false;
		if (hasPeriodExpired.equals("Y")) {
			periodExpired = true;
		}
	
		String urlLike = "%rid=" + roompoolid;
		String queryString = " SELECT A.ENTRY_STATUS_ID FROM MFPDBO.WS_ENTRY_STATUS A " + 
			             " WHERE (A.PARTICIPATION_ID = ?1) " +  " AND (A.URL like '" + urlLike + "')" + 
			             " AND A.SCREEN_ID = ?2 ORDER BY A.ENTRY_STATUS_ID";
	
		Query q = em.createNativeQuery(queryString, Long.class);
		q.setParameter(1, wsid);
		q.setParameter(2, screenid);
		List<Long> ids = q.getResultList();
	
		for (int i=0; i<ids.size(); i++) {
			Long id;
			id = ids.get(i);
			Query query = em.createNativeQuery("{call mfpproc.SP_WS_UPDATESCREENSTATUS(?,?,?,?,?, " + periodExpired + ")}");
			query.setParameter(1, wsid);
			query.setParameter(2, id.longValue());
			query.setParameter(3, status);
			query.setParameter(4, user.getShortRole());
			query.setParameter(5, formChanged);
			query.executeUpdate();
		}
	}
	
}