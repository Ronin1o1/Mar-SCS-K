package com.marriott.rfp.business.user.api;

import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.user.UserPrefs;


public interface UserService {
	public User findUser(String eid);

	public void acceptTerms(String eid);

	public boolean verifyUserHotelAccess(String marshacode, User user);

	public boolean verifyUserHotelAccess(long hotelid, User user);

	public boolean verifyUserAccountAccess(long accountrecid, User user);

	public boolean verifyUserHotelAccountinfoidAccess(long hotel_accountinfoid, User user);

	public UserPrefs getUserHomePagePref(User user);

	public void updateUserPrefs(UserPrefs userPrefs, User user);
	
	public void updateLoginDate(String eid);

}
