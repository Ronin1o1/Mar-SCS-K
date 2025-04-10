package com.marriott.rfp.business.user.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.user.api.UserAdminService;
import com.marriott.rfp.dataaccess.user.api.UserAdminManager;
import com.marriott.rfp.object.franchise.Franchise;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.user.DSUser;
import com.marriott.rfp.object.user.InternalNotes;
import com.marriott.rfp.utility.NumberUtility;

/**
 * Session Bean implementation class UserAdminServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class UserAdminServiceImpl implements UserAdminService {

	@Autowired
	private UserAdminManager userAdminMgr = null;

	public List<DSUser> getUserList(String role, String filterString,
			String searchBy, int orderby, Page page) {
		return userAdminMgr.getUserList(role, filterString, searchBy, orderby,
				page);
	}

	public List<DSUser> getUserListForCopy(Long userid, String role,
			String filterString, String searchBy, int orderby, Page page) {
		return userAdminMgr.getUserListForCopy(userid, role, filterString,
				searchBy, orderby, page);
	}

	public DSUser getUserDetails(Long userid) {
		return userAdminMgr.getUserDetails(userid);
	}

	public Long getTotalUserListPages(String role, String filterString,
			String searchBy, int orderby, Long maxpagelen) {
		Long totalNumPages = userAdminMgr.getUserListNum(role, filterString,
				searchBy, orderby);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public Long getHotelListPages(Long userid, Long maxpagelen) {
		Long totalNumPages = userAdminMgr.getUserPropertyListNum(userid);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public Long getAcctListPages(Long userid, Long maxpagelen) {
		Long totalNumPages = userAdminMgr.getUserAccountListNum(userid);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}
	/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getHotelListAllPages and getUserPropertyListAllNum
  */
	public Long getHotelListAllPages(Long userid, String userrole,
			String alphaOrderProp, Long maxpagelen, String filterByMorF) {
		Long totalNumPages = userAdminMgr.getUserPropertyListAllNum(userid,
				userrole, alphaOrderProp, filterByMorF);
		/*
		 Ticket number:11325 changes ends
		 */
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public Long getAcctListAllPages(Long userid, String userrole,
			String alphaOrderAcct, String accountpricingtype,
			String accountsegment, Long maxpagelen) {
		Long totalNumPages = userAdminMgr.getUserAcctListAllNum(userid,
				alphaOrderAcct, accountpricingtype, accountsegment);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public Long getTotalUserListPagesForCopy(Long userid, String role,
			String filterString, String searchBy, int orderby, Long maxpagelen) {
		Long totalNumPages = userAdminMgr.getUserListNumForCopy(userid, role,
				filterString, searchBy, orderby);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public List<DSUser> getUserListDetail(Long userid, String role) {
		return userAdminMgr.getUserListDetail(userid, role);
	}

	public List<RegionRef> getRegions() {
		return userAdminMgr.getRegions();
	}

	public List<HotelAffiliation> getAffiliations() {
		return userAdminMgr.getAffiliations();
	}

	public void copyUserPropertyAcctUpdate(Long userid, String[] eidList,
			String role) {
		userAdminMgr.copyUserPropertyAcctUpdate(userid, eidList, role);
	}

	public List<HotelDetailData> getUserPropertyList(Long uid, Page page) {
		return userAdminMgr.getUserPropertyList(uid, page);
	}

	public void updateUserRegion(Long userid, String[] selectedRegionList,
			List<RegionRef> regions) {
		userAdminMgr.updateUserRegion(userid, selectedRegionList, regions);
	}

	public void updateUserHotelAffiliation(Long userid,
			String[] selectedAffiliationList,
			List<HotelAffiliation> hotelAffiliations) {
		userAdminMgr.updateUserHotelAffiliation(userid,
				selectedAffiliationList, hotelAffiliations);
	}

	public void updateUserFranch(Long userid, String[] selectedFranchiseList,
			List<Franchise> franchiseList) {
		userAdminMgr.updateUserFranch(userid, selectedFranchiseList,
				franchiseList);
	}

	public Long getUserPropertyListNum(Long userid) {
		return userAdminMgr.getUserPropertyListNum(userid);
	}

	public void updateUserEnhancedReporting(Long userid,
			String enhancedReporting) {
		userAdminMgr.updateUserEnhancedReporting(userid, enhancedReporting);
	}

	public List<Franchise> getHotelFranchCompanyListWithCode(
			boolean showManaged, String role) {
		return userAdminMgr
				.getHotelFranchCompanyListWithCode(showManaged, role);
	}
/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getUserPropertyListAll
  */
	public List<HotelDetailData> getUserPropertyListAll(Long userid,
			String userrole, String alphaOrderProp, Page currPageProp, String filterByMorF) {
		return userAdminMgr.getUserPropertyListAll(userid, userrole,
				alphaOrderProp, currPageProp, filterByMorF);
		/*
		 Ticket number:11325 changes ends
		 */
	}
	/* Ticket number:11325 changes starts
    Added one more parameter filterByMorF to the function getUserPropertyListAllNum
  */
	
	public List<HotelDetailData> getQuickSelectPropertyList(Long userid, String userrole, String hotellist) {
		return userAdminMgr.getQuickSelectList(userid, userrole, hotellist);
	}
	
	public Long getUserPropertyListAllNum(Long userid, String userrole,
			String alphaOrderProp, String filterByMorF) {
		return userAdminMgr.getUserPropertyListAllNum(userid, userrole,
				alphaOrderProp, filterByMorF);
		/*
		 Ticket number:11325 changes ends
		 */
	}

	public List<Account> getUserAccountList(Long userid, Page currPageAcctSel) {
		return userAdminMgr.getUserAccountList(userid, currPageAcctSel);
	}

	public Long getUserAccountListNum(Long userid) {
		return userAdminMgr.getUserAccountListNum(userid);
	}

	public List<Account> getUserAccountListAll(Long userid,
			String alphaOrderAcct, Page currPageAcct,
			String accountPricingType, String accountSegment) {
		return userAdminMgr.getUserAccountListAll(userid, alphaOrderAcct,
				currPageAcct, accountPricingType, accountSegment);
	}

	public Long getUserAcctListAllNum(Long userid, String alphaOrderAcct,
			String accountPricingType, String accountSegment) {
		return userAdminMgr.getUserAcctListAllNum(userid, alphaOrderAcct,
				accountPricingType, accountSegment);
	}

	public void updateUserProperties(Long userid, String[] hotels) {
		userAdminMgr.updateUserProperties(userid, hotels);
	}

	public void updateAllHotels(Long userid, String allhotels) {
		userAdminMgr.updateAllHotels(userid, allhotels);
	}

	public void updateUserIsMAE(Long userid, String isMAE) {
		userAdminMgr.updateUserIsMAE(userid, isMAE);
	}

	public void updateUserAccounts(Long userid, String[] accounts,
			String groupId) {
		userAdminMgr.updateUserAccounts(userid, accounts, groupId);
	}

	public void deleteUserProperties(Long userid, String[] delids, String groupId) {
		userAdminMgr.deleteUserProperties(userid, delids, groupId);
	}

	public void deleteUserAccounts(Long userid, String[] delids, String groupId) {
		userAdminMgr.deleteUserAccounts(userid, delids, groupId);
	}

	public void updateAllHotelsFranchise(Long userid, String selFranchs) {
		userAdminMgr.updateAllHotelsFranchise(userid, selFranchs);
	}
	

	public void updateInternalNotes(Map<Long, InternalNotes> internalnotesMap) {
	
		if (internalnotesMap != null) {
			for (Map.Entry<Long, InternalNotes> note1 : internalnotesMap.entrySet()) {
				InternalNotes thenotes = note1.getValue();
				if (thenotes != null && thenotes.getChg() != null && thenotes.getChg().equals("Y")) {
				userAdminMgr.updateInternalNotes(note1.getValue());
				}}
			}
			
			
		
		
	}

	
}