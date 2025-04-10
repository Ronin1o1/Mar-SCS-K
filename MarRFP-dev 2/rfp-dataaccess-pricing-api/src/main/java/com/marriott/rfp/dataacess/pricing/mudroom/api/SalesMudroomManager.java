package com.marriott.rfp.dataacess.pricing.mudroom.api;

import java.util.List;


import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotel;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.object.user.User;


public interface SalesMudroomManager {
	public List<Account> getSalesMudroomAccountLinked (User user, Page acctPage);
	public SalesMudroom findSalesMudroom(User user);
	public void updateSalesMudroom(SalesMudroom salesMudroom);
	public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, long salesRespondentId);
	public List<HotelListData> getSalesMudroomHotelLinked (User user, Page htlPage);
	public List<SalesMudroomHotel> getSalesMudroomHotelSelected (long salesRespondentid);
	public List<SalesMudroomHotel> getSalesMudroomHotelNotSelected (User user);
	public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, User user, Page page);
	public void removeSalesMudroomPC(long salesrespondentid, String marshaCode, long accountID);
	public boolean updateSalesPrimaryContacts(long salesrespondentid, Long accountid, String marshacode);
	public long getNumSalesMudroomHotelLinked (User user);
	public long getNumSalesMudroomAccountLinked (User user);
	public long getTotalSalesMudroomPC(User user);
	public List<SalesMudroom> getSalesUserListforAccounts();
	public List<Account> getSalesUserAccountList(String eid);
	public List<SalesMudroom> getSalesUserListAAEs();
	public String getUserPhoneNumber(String eid);
	public String getUserEmailAddress(String eid);
}
