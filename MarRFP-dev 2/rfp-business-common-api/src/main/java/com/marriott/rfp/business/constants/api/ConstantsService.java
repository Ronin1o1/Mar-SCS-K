package com.marriott.rfp.business.constants.api;

import com.marriott.rfp.object.roomdef.RoomDefLinks;

public interface ConstantsService {

	public long getCustomAnswersLen();

	public String getReportServerUrl();

	public String getServerUrl();

	/* Cognos : Edie Report changes starts */
	public String getReportEdieUrl();

	public String getEdieViewUrl();
	/* Cognos : Edie Report changes ends */

	public String getReportOndemandUrl();

	public String getExcelDownloadLocation();

	public String getExcelLocation();

	public String getMarshaXMLUrl();

	public long getMaxFormattedRatesProducts();

	public String getPASEmail();

	public RoomDefLinks getRoomDefLinks();

	public long getMaxEmail();

	public String getContactName();

	public String getBlockPricingScreens();

	public long getMaxBlackouts();

	public long getMaxDOS();

	public long getMaxLOS();

	public long getMaxSeasons();

	public long getAccountTrackingMaxPageLen();

	public long getAccountCenterMaxPageLen();

	public long getUsersMaxPageLen();

	public long getMaxAccountQuestions();

	public String getEpicUrl();

	public String getInfoHubUrl();

	public long getAccountStatusMaxPageLen();

	public long getUserEdPropSelMaxLen();

	public long getUserEdPropMaxLen();

	public long getUserEdAcctSelMaxLen();

	public long getUserEdAcctMaxLen();

	public String getMarrFormsUrl();

	public long getSalesMudHtlMaxPageLen();

	public long getSalesMudAccMaxPageLen();

	public long getSalesMudPCMaxPageLen();

	public String getSAPP_Email();

	public String getSAPP_Name();

	public String getEPICEmail();

	public String getWSContactEmail();

	public long getMaxRoomPool();

	public String getWholesalerUrl();

	public long getWSMaxSeasons();

	public long getWSMinSeasons();

	public long getMaxCompetitor();

	public long getMaxSubsidiaries();

	public long getMaxInitiatives();

	public long getMaxTravelLocations();

	public long getMaxAcctPlanTasks();

	public long getMaxMarketOffices();

	public long getMaxTravelMarkets();

	public long getMaxAcctKeyBuyer();

	public String getHotelEdieAuditProfile();

	public String getHotelEdieCSRAuditProfile();

	public long getNumRoomPools();

	public String getBTtoHPPServiceUrl();

	public String getShowPricing();

	public String getAcctRegEmail();

	public String findProfileName(long profileid);

	public String getSoftLaunchEnabled();

	public String getCamPassportUrl();
}
