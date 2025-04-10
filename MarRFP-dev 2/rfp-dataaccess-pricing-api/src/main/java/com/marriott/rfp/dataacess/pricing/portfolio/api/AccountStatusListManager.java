package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;


import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusList;
import com.marriott.rfp.object.user.User;


public interface AccountStatusListManager {
	public List<AccountStatusList> findAccountStatusListDetail(long period, String accountpricingtype, String accountsegment, int orderBy, Page page, String alphaOrder, User user, String pasManager,long accountstatus, String showPortfolio);
	
	public long getNumAccountStatusListDetail(long period, String accountpricingtype, String accountsegment, int orderBy, String alphaOrder, User user, String pasManager, String showPortfolio);
	public void update(AccountStatusList acctStatusList, User user); 
}
