package com.marriott.rfp.dataacess.pricing.accountregistration.api;

import com.marriott.rfp.object.pricing.accountregistration.AccountRegistration;
import com.marriott.rfp.object.user.User;


public interface AccountRegistrationManager {
	public void registerCentralAccount(AccountRegistration accountReg, User user);

	public void registerNonCentralAccount(AccountRegistration accountReg, User user);
}
