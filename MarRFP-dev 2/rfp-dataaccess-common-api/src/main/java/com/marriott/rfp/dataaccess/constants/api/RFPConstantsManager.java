package com.marriott.rfp.dataaccess.constants.api;



import com.marriott.rfp.object.constants.Constants;


public interface RFPConstantsManager {

	public long getCustomAnswersLen();

	public long getAccountCenterMaxPageLen();

	public long getAccountCenterGMaxPageLen();

	public long getAccountMsgMaxDays();

	public long getAccountStatusMaxPageLen();

	public long getAcctOverviewMaxPageLen();

	public long getAccountTrackingMaxPageLen();

	public long getAccountNotViewableMaxPageLen();

	public long getUsersMaxPageLen();

	public long getUserEdAcctMaxLen();

	public long getUserEdPropMaxLen();

	public long getUserEdAcctSelMaxLen();

	public long getUserEdPropSelMaxLen();

	public String getActuateExcelLoc();

	public String getExcelLoc();

	public Constants getContactEmail();

	public Constants getContactEmail_WS();

	public Constants getContactLongName();

	public Constants getContactName();

	public Constants getContactPhone();

	public Constants getEPICEmail();

	public Constants getEPICName();

	public Constants getEPICWebsite();

	public Constants getBlockPricingScreens();

	public long getMaxAdminSeasons();

	public long getMaxBlackouts();

	public long getMaxDOS();

	public long getMaxLOS();

	public long getMaxMarketOffices();

	public long getMaxEmail();

	public long getMaxProductsUsed();

	public long getMaxSeasons();

	public long getMaxSubsidiaries();

	public long getMaxTravelMarkets();

	public String getMinHotelsEnhancedReporting();

	public Constants getTermsEmail();

	public String getKorRoomDefLink();

	public long getKorRPGMLimit();

	public Constants getRoomDefContactEmail();

	public Constants getRoomDefContactName();

	public Constants getRoomDefContactPhone();

	public String getRoomDefWorkShtLink();

	public String getRoomDefInstrLink();

	public String getRoomDefFAQLink();

	public String getEpicUrl();

	public String getInfoHubUrl();

	public String getFormattedRatesShow();

	public long getMaxInitiatives();

	public long getMaxCompetitor();

	public long getMaxAcctPlanTasks();

	public long getMaxAcctKeyBuyer();

	public Constants getSAPP_Email();

	public Constants getSAPP_Name();

	public String getLDAP_PWD();

	public long getMaxFRProducts();

	public long getRateAssignmentCount();

	public String getRateDescriptionMode();

	public String getMarshaXMLUrl();

	public String getReportServerUrl();

	public String getReportOndemandUrl();

	public String getServerUrl();
	/* Cognos : Edie Report changes starts */
	public String getReportEdieUrl();

	public String getEdieViewUrl();
	/* Cognos : Edie Report changes ends */
	public Constants getRateDefContactEmail();

	public Constants getRateDefContactName();

	public Constants getRateDefContactPhone();

	public long getMaxTravelLocations();

	public long getMirrorExpMaxPageLen();

	public long getSFOMaxPageLen();

	public long getMaxAccountQuestions();

	public String getNetezzaUserID();

	public String getNetezzaPassword();

	public String getNetezzaURL();

	public long getMaxMcadResults();

	public long getMaxMcadLink();

	public String getAddEmailText();

	public String getSiteUrl();

	public String getSendEmail();

	public String getChaseSendEmail();

	public String getSendEmailFrom();

	public String getMarrFormsUrl();

	public long getSalesMudHtlMaxPageLen();

	public long getSalesMudAccMaxPageLen();

	public long getSalesMudPCMaxPageLen();

	public String getWholesalerUrl();

	public String getHotelEdieAuditProfile();

	public String getHotelEdieCSRAuditProfile();

	public long getNumRoomPools();

	public String getBTtoHPPServiceUrl();

	public String getShowPricing();

	public Constants getScptToolContactName();

	public Constants getScptSupportContactEmail();

	public Constants getContactAcctRegEmail();

	public String getSendRFPEmail();

	public String getGlobalSalesUrl();

	public String getAreaSalesUrl();

	public String getProfilename(long profileid);

	public String getSoftLaunchEnabled();

	public Long getEnhancedDiscount();

	public String getCamPassportUrl();
	
	public String getPricingContactsUrl();
	
	public String getPasMgsUrl();
}
