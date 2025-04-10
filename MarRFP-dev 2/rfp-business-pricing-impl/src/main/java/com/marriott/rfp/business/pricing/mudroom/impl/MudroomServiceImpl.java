package com.marriott.rfp.business.pricing.mudroom.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.dataacess.pricing.accountsegment.api.AccountSegmentManager;
import com.marriott.rfp.dataacess.pricing.mudroom.api.AdminMudroomManager;
import com.marriott.rfp.dataacess.pricing.mudroom.api.HotelMudroomManager;
import com.marriott.rfp.dataacess.pricing.mudroom.api.SalesMudroomManager;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.mudroom.AdminMudroom;
import com.marriott.rfp.object.pricing.mudroom.HotelMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroom;
import com.marriott.rfp.object.pricing.mudroom.SalesMudroomHotelAccount;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class MudroomServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class MudroomServiceImpl implements MudroomService {

	@Autowired
	private AdminMudroomManager adminMudroomMgr = null;
	@Autowired
	private HotelMudroomManager hoteMudroomMgr = null;
	@Autowired
	private SalesMudroomManager salesMudroomMgr = null;
    @Autowired
    private AccountSegmentManager accountSegmentMgr = null;

    public AdminMudroom getAdminRespondent(String eid, long period) {
    	AdminMudroom ar = adminMudroomMgr.findAdminRespondent(eid);
    	
    	if (ar.getAdminLocationid() != null)
    		ar.setAdminLocationid(adminMudroomMgr.findAdminRespondentLocation(eid).getLocationid());
    	
    	if (ar.getAdminRespondentid() != null) {
	    	ar.setPrimeAccountNotSel(adminMudroomMgr.getAdminRespondentAccountNotSelected(ar.getAdminRespondentid(), period, "Y"));
	    	ar.setSecAccountNotSel(adminMudroomMgr.getAdminRespondentAccountNotSelected(ar.getAdminRespondentid(), period, "N"));
	    	ar.setPrimeAccountSel(adminMudroomMgr.getAdminRespondentAccountSelected(ar.getAdminRespondentid(), period, "Y"));
	    	ar.setSecAccountSel(adminMudroomMgr.getAdminRespondentAccountSelected(ar.getAdminRespondentid(), period, "N"));
	    	ar.setAcctMktRgnNotSel(adminMudroomMgr.getAccountMarketRegionsNotSelected(ar.getAdminRespondentid()));
	    	ar.setAcctMktRgnSel(adminMudroomMgr.getAccountMarketRegionsSelected(ar.getAdminRespondentid()));
	    	ar.setSalesTypesSel(adminMudroomMgr.getAdminRespondentAvailSalesTiersSelected(ar.getAdminRespondentid()));
	    	ar.setSalesTypesNotSel(adminMudroomMgr.getAdminRespondentAvailSalesTiersNotSelected(ar.getAdminRespondentid()));
    	}
    	return ar;
    }
    
    public void updateAdminRespondent(AdminMudroom adminRespondent, long period){
    	adminMudroomMgr.updateAdminRespondent(adminRespondent, period);
    }
    
    public void updateAdminRespondentDate(User user){
    	adminMudroomMgr.updateAdminRespondentDate(user.getEid());
    }
    
    public HotelMudroom getHotelRespondent(User user) {
    	return hoteMudroomMgr.findHotelRespondent(user);
    }

    public void updateHotelRespondent(HotelMudroom hotelRespondent){
    	hoteMudroomMgr.updateHotelRespondent(hotelRespondent);
    }

    public SalesMudroom getSalesMudroomDetail(User user, Page acctpage, Page htlpage, long orderBy) {
    	SalesMudroom sm = salesMudroomMgr.findSalesMudroom(user);
    	if(sm.getSalesrespondentid() != null)
    		sm.setSalesHotelSel(salesMudroomMgr.getSalesMudroomHotelSelected(sm.getSalesrespondentid()));
    	sm.setSalesHotelNotSel(salesMudroomMgr.getSalesMudroomHotelNotSelected(user));
    	
    	if (user.getRole().equals("MFPFSALE") && sm.getMae().equals("Y") ) {
    		sm.setLinkedAccounts(salesMudroomMgr.getSalesMudroomAccountLinked(user, acctpage));
    		sm.setLinkedHotels(salesMudroomMgr.getSalesMudroomHotelLinked(user, htlpage));
    		if (sm.getSalesrespondentid() != null)
    			sm.setPrimaryContact(salesMudroomMgr.getSalesMudroomPrimaryContact(orderBy, sm.getSalesrespondentid()));
    	}
    	return sm;
    }
    
    public boolean updateSalesMudroom(SalesMudroom salesMudroom, Map<Long, SalesMudroomHotelAccount> primeContact,
    		Map<Long, String> acctList, Map<String, String> hotelList){
    	boolean bSomeAlreadyAssigned= false;
    	salesMudroomMgr.updateSalesMudroom(salesMudroom);
    	if(salesMudroom.getSalesrespondentid() != null) {
    		if (primeContact !=null){
	    		for (Long key : primeContact.keySet()) {
	    		    if (primeContact.get(key).getPcChecked() != null && primeContact.get(key).getPcChecked().equals("Y"))
	    		    	salesMudroomMgr.removeSalesMudroomPC(salesMudroom.getSalesrespondentid(), primeContact.get(key).getMarshaCode(), primeContact.get(key).getAccountID());
	    		}
    		}
    	}
    	if(salesMudroom.getSalesrespondentid() != null) {
    		if (acctList !=null && hotelList !=null){
	    		for (Map.Entry<Long, String> acct : acctList.entrySet()) {
	    		    if (acct.getValue() != null && acct.getValue().equals("Y")) {
	    		    	for (Map.Entry<String, String> hotel : hotelList.entrySet()) {
	    		    		if (hotel.getValue() != null && hotel.getValue().equals("Y"))
	    		    			bSomeAlreadyAssigned = salesMudroomMgr.updateSalesPrimaryContacts(salesMudroom.getSalesrespondentid().longValue(), new Long(acct.getKey().toString()), hotel.getKey().toString());
	    		    	}
	    		    	
	    		    }
	    		}
    		}
    	}
    	return bSomeAlreadyAssigned;
    }

    public List<SalesMudroomHotelAccount> getSalesMudroomPrimaryContact(long orderBy, User user, Page page) {
    	return salesMudroomMgr.getSalesMudroomPrimaryContact(orderBy, user, page);
    }
    
    public List<AccountSegment> getSalesAccountSegments() {
    	return accountSegmentMgr.getSalesAccountSegments();
    }

	public long getNumSalesMudroomHotelLinked (User user) {
		return salesMudroomMgr.getNumSalesMudroomHotelLinked(user);
	}
	
	public long getNumSalesMudroomAccountLinked (User user) {
		return salesMudroomMgr.getNumSalesMudroomAccountLinked(user);
	}

	public long getTotalSalesMudroomPC(User user){
		return salesMudroomMgr.getTotalSalesMudroomPC(user);
	}
	
	public List<SalesMudroom> getSalesUserListforAccounts() {
		return salesMudroomMgr.getSalesUserListforAccounts();
	}
	
	public List<Account> getSalesUserAccountList(String eid) {
		return salesMudroomMgr.getSalesUserAccountList(eid);
	}
	
	public List<SalesMudroom> getSalesUserListAAEs() {
		return salesMudroomMgr.getSalesUserListAAEs();
	}
	
	public List<AdminMudroom> findPASManagerList() {
		return adminMudroomMgr.findPASManagerList();
	}
	
	public void updatePASAccounts(AdminMudroom adminRespondent, long period){
		adminMudroomMgr.updatePASAccounts(adminRespondent, period);
	}

	@Override
	public String getUserPhoneNumber(String eid) {
		return salesMudroomMgr.getUserPhoneNumber(eid);
	}
	
	@Override
	public String getUserEmailAddress(String eid) {
		return salesMudroomMgr.getUserEmailAddress(eid);
	}
}
