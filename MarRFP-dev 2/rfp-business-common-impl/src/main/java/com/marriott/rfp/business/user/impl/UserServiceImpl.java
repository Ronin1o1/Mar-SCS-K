package com.marriott.rfp.business.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.dataaccess.user.api.UserManager;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.user.UserPrefs;

/**
 * Session Bean implementation class UserServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserManager userMgr = null;

	/**
	 * Default constructor.
	 */

	public User findUser(String eid) {

		return userMgr.findUser(eid);
	}

	public void acceptTerms(String eid) {
		userMgr.acceptTerms(eid);

	}

	public boolean verifyUserHotelAccess(String marshacode, User user) {
		return userMgr.verifyUserHotelAccess(marshacode, user);
	}

	public boolean verifyUserHotelAccess(long hotelid, User user) {
		return userMgr.verifyUserHotelAccess(hotelid, user);
	}

	public boolean verifyUserAccountAccess(long accountrecid, User user) {
		return userMgr.verifyUserAccountAccess(accountrecid, user);
	}

	public boolean verifyUserHotelAccountinfoidAccess(long hotel_accountinfoid, User user) {
		return userMgr.verifyUserHotelAccountinfoidAccess(hotel_accountinfoid, user);
	}

	public UserPrefs getUserHomePagePref(User user) {
		return userMgr.getUserHomePagePref(user);
	}

	public void updateUserPrefs(UserPrefs userPrefs, User user) {
		userMgr.updateUserPrefs(userPrefs, user);
	}
	
	public void updateLoginDate(String eid) {
		userMgr.updateLoginDate(eid);
	}

}
