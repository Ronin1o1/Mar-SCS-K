package com.marriott.rfp.business.pricing.mudroom.api;

import java.util.List;
import java.util.Map;


import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.mudroom.HotelMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.object.user.User;


public interface MudroomService {
    public AdminMudroom getAdminRespondent(String eid, long period);

    public void updateAdminRespondent(AdminMudroom adminRespondent, long period);

    public void updateAdminRespondentDate(User user);

    public HotelMudroom getHotelRespondent(User user);

    public void updateHotelRespondent(HotelMudroom hotelRespondent);
    
    public SalesMudroom getSalesMudroomDetail(User user, Page acctpage, Page htlpage, long orderBy);
    
    public boolean updateSalesMudroom(SalesMudroom salesMudroom, Map<Long, SalesMudroomHotelAccount> primeContact, Map<Long, String> acctList, Map<String, String> hotelList);
    
    public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, User user, Page page);
    
    public List<AccountSegment> getSalesAccountSegments();
    
	public long getNumSalesMudroomHotelLinked (User user);
	
	public long getNumSalesMudroomAccountLinked (User user);
	
	public long getTotalSalesMudroomPC(User user);
	
	public List<SalesMudroom> getSalesUserListforAccounts();
	
	public List<Account> getSalesUserAccountList(String eid);
	
	public List<SalesMudroom> getSalesUserListAAEs();
	
	public List<AdminMudroom> findPASManagerList();
	
	public void updatePASAccounts(AdminMudroom adminRespondent, long period);

	public String getUserPhoneNumber(String eid);
	
	public String getUserEmailAddress(String eid);
}
