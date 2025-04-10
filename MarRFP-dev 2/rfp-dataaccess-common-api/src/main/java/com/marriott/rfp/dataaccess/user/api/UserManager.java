package com.marriott.rfp.dataaccess.user.api;

import java.util.List;



import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.Role;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.object.user.UserPrefs;


public interface UserManager {
	public User findUser(String eid);

	public void acceptTerms(String eid);

	public boolean verifyUserHotelAccess(String marshacode, User user);

	public boolean verifyUserHotelAccess(long hotelid, User user);

	public boolean verifyUserAccountAccess(long accountrecid, User user);

	public boolean verifyUserHotelAccountinfoidAccess(long hotel_accountinfoid, User user);

	public List<Role> getRoles();

	public List<DSUser> getAccountPlanUserList(long accountrecid);

	public UserPrefs getUserHomePagePref(User user);

	public void updateUserPrefs(UserPrefs userPrefs, User user);
	
	public void updateLoginDate(String eid);

}
