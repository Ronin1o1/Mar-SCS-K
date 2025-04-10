package com.marriott.rfp.dataaccess.sync.api;

import java.util.Hashtable;
import java.util.List;



import com.marriott.rfp.object.user.DSUser;


public interface SyncManager {
	public List<DSUser> getOracleUsers(String firstLetter, String secondLetter);

	public void updateUser(DSUser user, String orig_role);

	public void deleteUser(DSUser user, String orig_role);
	
	public Hashtable<String, DSUser> getLdapUsers(String firstLetter, String secondLetter, String userid, String password, String LDAPserver) ;
}
