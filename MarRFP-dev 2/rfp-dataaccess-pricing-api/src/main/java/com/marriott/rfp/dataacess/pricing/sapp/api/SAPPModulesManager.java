package com.marriott.rfp.dataacess.pricing.sapp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.sapp.SAPPModule;
import com.marriott.rfp.object.user.User;


public interface SAPPModulesManager {
	public List<SAPPModule> findSAPPModules(long accountrecid, User user);

	public List<User> findGlobalContactsWithMyAccount(User user, boolean incMarriottContact);

	public String findParticipateHotelFlag(User user);
}
