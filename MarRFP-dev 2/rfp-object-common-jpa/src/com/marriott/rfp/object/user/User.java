package com.marriott.rfp.object.user;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import com.marriott.rfp.object.mainmenu.MainMenu;
import com.marriott.rfp.object.travelspending.TravelSpending;

public class User implements Serializable {

	private String eid;
	private String fullName;
	private String role;
	private String enhanced_Reporting;
	private boolean agreedtoTerms;
	private boolean updateContactInfo;
	private String epicUrl;
	private String iv_user;
	private String marrformsUrl;
	private String email;
	private String phone;
	private String showPricing="Y";
	private String infoHubUrl;
	
	private HashMap<String, MainMenu> menus;
	private List<TravelSpending> travelspendingList;

	private static final long serialVersionUID = 1L;

	public User() {
		super();
	}

	public void copy(User user) {
		this.eid = user.getEid();
		this.fullName = user.getFullName();
		this.enhanced_Reporting = user.getEnhanced_Reporting();
		this.role = user.getRole();
		this.menus = user.getMenus();
		this.agreedtoTerms = user.isAgreedtoTerms();
		this.updateContactInfo = user.isUpdateContactInfo();
		this.travelspendingList = user.getTravelspendingList();
		this.epicUrl = user.getEpicUrl();
		this.infoHubUrl = user.getInfoHubUrl();
		this.iv_user = user.getIv_user();
		this.marrformsUrl = user.getMarrformsUrl();
		this.showPricing=user.getShowPricing();
	}

	public String getEid() {
		return this.eid;
	}

	public String getEnhanced_Reporting() {
		return enhanced_Reporting;
	}

	public String getFullName() {
		return fullName;
	}

	public boolean getHasPermission(long menuid) {
		if (this.menus.containsKey(String.valueOf(menuid)))
			return true;
		return false;
	}

	public HashMap<String, MainMenu> getMenus() {
		if (menus == null)
			menus = new HashMap<String, MainMenu>();
		return menus;
	}

	public String getRole() {
		return role;
	}

	public boolean isAgreedtoTerms() {
		return agreedtoTerms;
	}

	public boolean isUpdateContactInfo() {
		return updateContactInfo;
	}

	public void setAgreedtoTerms(boolean agreedtoTerms) {
		this.agreedtoTerms = agreedtoTerms;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public void setEnhanced_Reporting(String enhanced_Reporting) {
		if (enhanced_Reporting == null)
			this.enhanced_Reporting = "N";
		else
			this.enhanced_Reporting = enhanced_Reporting;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public void setMenus(HashMap<String, MainMenu> menus) {
		this.menus = menus;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setUpdateContactInfo(boolean updateContactInfo) {
		this.updateContactInfo = updateContactInfo;
	}

	public boolean getIsReadOnly() {
		return role.equals("MFPREAD");
	}

	public boolean getIsDBMarsha() {
		return role.equals("MFPDBMAR");
	}

	public boolean getIsNotReadOnly() {
		return !role.equals("MFPREAD");
	}

	public boolean getHasLimitedHotels() {
		return role.equals("MFPUSER") || role.equals("MFPFSALE");
	}

	public boolean getIsAnySalesUser() {
		return role.equals("MFPSALES") || role.equals("MFPFSALE");
	}

	public boolean getIsPricingUser() {
		return role.equals("MFPSALES") || role.equals("MFPFSALE") || role.equals("MFPADMIN") || role.equals("MFPUSER");
	}

	public boolean getIsLimitedSalesUser() {
		return role.equals("MFPFSALE");
	}

	public boolean getIsSalesUser() {
		return role.equals("MFPSALES");
	}

	public boolean getIsHotelUser() {
		return role.equals("MFPUSER");
	}

	public boolean getIsPASAdmin() {
		return role.equals("MFPADMIN");
	}

	public boolean getIsSAPPAdmin() {
		return role.equals("MFPAPADM");
	}

	public boolean getIsPASorAnySales() {
		return getIsPASAdmin() || getIsAnySalesUser();
	}

	public boolean getIsAdminRole() {
		return role.equals("MFPADMIN") || role.equals("MFPWSADM") || role.equals("MFPPPADM") || role.equals("MFPRDADM") || role.equals("MFPKORAD") || role.equals("MFPAPADM")
				|| role.equals("MFP3RHTL");
	}

	public boolean getHasLimitedAccounts() {
		return role.equals("MFPSALES") || role.equals("MFPFSALE");
	}

	public boolean getIsWholesalerAdmin() {
		return role.equals("MFPWSADM");
	}

	public boolean getIsRDAdmin() {
		return role.equals("MFPRDADM");
	}

	public boolean getIsKORAdmin() {
		return role.equals("MFPKORAD");
	}

	public String getShortRole() {
		String shortrole = null;
		if (role.equals("MFPADMIN"))
			shortrole = "A";
		if (role.equals("MFPSALES"))
			shortrole = "S";
		if (role.equals("MFPFSALE"))
			shortrole = "F";
		if (role.equals("MFPWSADM"))
			shortrole = "W";
		if (role.equals("MFPUSER"))
			shortrole = "U";
		if (role.equals("MFPREAD"))
			shortrole = "R";
		if (role.equals("MFPPPADM"))
			shortrole = "P";
		if (role.equals("MFPRDADM"))
			shortrole = "K";
		if (role.equals("MFPKORAD"))
			shortrole = "L";
		if (role.equals("MFPDBMAR"))
			shortrole = "D";
		if (role.equals("MFPAPADM"))
			shortrole = "C";
		if (role.equals("MFP3RHTL"))
			shortrole = "H";
		return shortrole;
	}

	public void setTravelspendingList(List<TravelSpending> travelspendingList) {
		this.travelspendingList = travelspendingList;
	}

	public List<TravelSpending> getTravelspendingList() {
		return travelspendingList;
	}

	public void setEpicUrl(String epicUrl) {
		this.epicUrl = epicUrl;
	}

	public String getEpicUrl() {
		return epicUrl;
	}

	public void setIv_user(String iv_user) {
		this.iv_user = iv_user;
	}

	public String getIv_user() {
		return iv_user;
	}

	public void setMarrformsUrl(String marrformsUrl) {
		this.marrformsUrl = marrformsUrl;
	}

	public String getMarrformsUrl() {
		return marrformsUrl;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		if (email == null)
			return "";
		return email;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhone() {
		if (phone == null)
			return "";
		return phone;
	}

	public void setShowPricing(String showPricing) {
		this.showPricing = showPricing;
	}

	public String getShowPricing() {
		return showPricing;
	}

	public String getInfoHubUrl() {
		return infoHubUrl;
	}

	public void setInfoHubUrl(String infoHubUrl) {
		this.infoHubUrl = infoHubUrl;
	}

}
