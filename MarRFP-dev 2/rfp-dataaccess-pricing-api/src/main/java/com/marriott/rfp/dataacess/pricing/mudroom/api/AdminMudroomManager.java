package com.marriott.rfp.dataacess.pricing.mudroom.api;

import java.util.List;


import com.marriott.rfp.object.location.SalesLocation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountmarketregion.AccountMarketRegion;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;


public interface AdminMudroomManager {
	public List<Account> getAdminRespondentAccountNotSelected(long adminRespondentid, long period, String primeFlag);
	public List<Account> getAdminRespondentAccountSelected(long adminRespondentid, long period, String primeFlag);
	public List<AccountSegment> getAdminRespondentAvailSalesTiersNotSelected(long adminRespondentid);
	public List<AccountMarketRegion> getAccountMarketRegionsNotSelected(long adminrespondentid);
	public boolean findUpdateAdminRespondent(String loginName, String topazid);
	public AdminMudroom findAdminRespondent(String loginName);
	public SalesLocation findAdminRespondentLocation(String loginName);
	public List<AccountSegment> getAdminRespondentAvailSalesTiersSelected(long adminRespondentid) ;
	public List<AccountMarketRegion> getAccountMarketRegionsSelected(long adminRespondentid) ;
	public void updateAdminRespondent(AdminMudroom adminRespondent, long period);
	public void updateAdminRespondentDate(String loginName);
	public List<AdminMudroom> findPASManagerList();
	public void updatePASAccounts(AdminMudroom adminRespondent, long period);
}
