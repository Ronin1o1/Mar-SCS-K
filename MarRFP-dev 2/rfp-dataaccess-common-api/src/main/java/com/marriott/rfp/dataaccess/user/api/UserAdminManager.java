package com.marriott.rfp.dataaccess.user.api;

import java.util.List;



import com.marriott.rfp.object.franchise.Franchise;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.InternalNotes;


public interface UserAdminManager {

    public List<DSUser> getUserList(String role, String filterString, String searchBy, int orderby, Page page);

	public List<DSUser> getUserListForCopy(Long userid, String role, String filterString, String searchBy, int orderby, Page page);

	public DSUser getUserDetails(Long userid);

	public Long getUserListNum(String role, String filterString, String searchBy, int orderby);

	public Long getUserListNumForCopy(Long userid, String role, String filterString, String searchBy, int orderby);

	public List<DSUser> getUserListDetail(Long userid, String role);

	public List<RegionRef> getRegions();
	
	public List<HotelAffiliation> getAffiliations();

	public void copyUserPropertyAcctUpdate(Long userid, String[] eidList, String role);

	public List<HotelDetailData> getUserPropertyList(Long uid, Page page);

	public void updateUserRegion(Long userid, String[] selectedRegionList, List<RegionRef> regions);
	
	public void updateUserHotelAffiliation(Long userid, String[] selectedAffiliationList, List<HotelAffiliation> hotelAffiliations);
	
	public void updateUserFranch(Long userid, String[] selectedFranchiseList, List<Franchise> franchiseList);
	
	public Long getUserPropertyListNum(Long userid);
	
	public void updateUserEnhancedReporting(Long userid, String enhancedReporting);
	
	public List<Franchise> getHotelFranchCompanyListWithCode(boolean showManaged, String role);
	
	/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getUserPropertyListAll and getUserPropertyListAllNum
  */
	
	public List<HotelDetailData> getUserPropertyListAll(Long userid, String userrole, String alphaOrderProp, Page currPageProp, String filterByMorF);
	
	public List<HotelDetailData> getQuickSelectList(Long userid, String userrole, String hotellist);
	
	public Long getUserPropertyListAllNum(Long userid, String userrole, String alphaOrderProp, String filterByMorF);
	/*
	 Ticket number:11325 changes ends
	 */
	public List<Account> getUserAccountList(Long userid, Page currPageAcctSel);
	
	public Long getUserAccountListNum(Long userid);
	
	public List<Account> getUserAccountListAll(Long userid, String alphaOrderAcct, Page currPageAcct, String accountPricingType, String accountSegment);
	
	public Long getUserAcctListAllNum(Long userid, String alphaOrderAcct, String accountPricingType, String accountSegment);
	
	public void updateUserProperties(Long userid, String[] hotels);
	
	public void updateAllHotels(Long userid, String allhotels);
	
	public void updateUserIsMAE(Long userid, String isMAE);
	
	public void updateUserAccounts(Long userid, String[] accounts, String groupId);
	
	public void deleteUserProperties(Long userid, String[] delids, String groupId);
	
	public void deleteUserAccounts(Long userid, String[] delids, String groupId);
	
	public void updateAllHotelsFranchise(Long userid, String selFranchs);

	public void updateInternalNotes( InternalNotes internalNotes);

	
}