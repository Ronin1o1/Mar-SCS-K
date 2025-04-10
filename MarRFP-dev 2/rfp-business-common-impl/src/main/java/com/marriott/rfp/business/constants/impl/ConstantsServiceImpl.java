package com.marriott.rfp.business.constants.impl;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.constants.api.WSConstantsManager;
import com.marriott.rfp.object.roomdef.RoomDefLinks;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Session Bean implementation class ConstantsServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class ConstantsServiceImpl implements ConstantsService {
	@Autowired
	private RFPConstantsManager rfpConstantsMgr = null;

	@Autowired
	private WSConstantsManager wsConstantsManager = null;

	private static final CacheManager cacheManager = CacheManager
			.create(ConstantsServiceImpl.class.getResource("/ehcache_constants.xml"));

	/**
	 * Default constructor.
	 */
	public ConstantsServiceImpl() {

	}

	public long getCustomAnswersLen() {
		return rfpConstantsMgr.getCustomAnswersLen();
	}

	public String getReportServerUrl() {
		String reportServerUrl = "";
		String cacheKey = "reportServerUrl";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			reportServerUrl = rfpConstantsMgr.getReportServerUrl();
			if (reportServerUrl != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, reportServerUrl));
			}
		} else
			reportServerUrl = (String) elem.getValue();
		return reportServerUrl;
	}

	public String getServerUrl() {
		String serverUrl = "";
		String cacheKey = "serverUrl";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			serverUrl = rfpConstantsMgr.getServerUrl();
			if (serverUrl != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, serverUrl));
			}
		} else
			serverUrl = (String) elem.getValue();
		return serverUrl;
	}

	/* Cognos : Edie Report changes starts */
	public String getReportEdieUrl() {
		String reportServerUrl = "";
		String cacheKey = "reportEdieUrl";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			reportServerUrl = rfpConstantsMgr.getReportEdieUrl();
			if (reportServerUrl != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, reportServerUrl));
			}
		} else
			reportServerUrl = (String) elem.getValue();
		return reportServerUrl;
	}

	public String getEdieViewUrl() {
		String reportServerUrl = "";
		String cacheKey = "edieViewUrl";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			reportServerUrl = rfpConstantsMgr.getEdieViewUrl();
			if (reportServerUrl != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, reportServerUrl));
			}
		} else
			reportServerUrl = (String) elem.getValue();
		return reportServerUrl;
	}
	/* Cognos : Edie Report changes ends */

	public String getReportOndemandUrl() {
		String reportServerUrl = "";
		String cacheKey = "reportOndemandUrl";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			reportServerUrl = rfpConstantsMgr.getReportOndemandUrl();
			if (reportServerUrl != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, reportServerUrl));
			}
		} else
			reportServerUrl = (String) elem.getValue();
		return reportServerUrl;
	}

	public long getNumRoomPools() {
		long num_rp;
		String cacheKey = "num_roompools";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			num_rp = rfpConstantsMgr.getNumRoomPools();
			if (num_rp != 0 && thecache != null) {
				thecache.put(elem = new Element(cacheKey, Long.valueOf(num_rp)));
			}
		} else
			num_rp = ((Long) elem.getValue()).longValue();
		return num_rp;
	}

	public String getExcelDownloadLocation() {
		String actuateExcelLoc = "";
		String cacheKey = "actuateExcelLoc";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			actuateExcelLoc = rfpConstantsMgr.getActuateExcelLoc();
			if (actuateExcelLoc != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, actuateExcelLoc));
			}
		} else
			actuateExcelLoc = (String) elem.getValue();
		return actuateExcelLoc;
	}

	public String getExcelLocation() {
		String excelLoc = "";
		String cacheKey = "excelLoc";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			excelLoc = rfpConstantsMgr.getExcelLoc();
			if (excelLoc != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, excelLoc));
			}
		} else
			excelLoc = (String) elem.getValue();
		return excelLoc;
	}

	public String getMarshaXMLUrl() {
		return rfpConstantsMgr.getMarshaXMLUrl();
	}

	public long getMaxFormattedRatesProducts() {
		return rfpConstantsMgr.getMaxFRProducts();
	}

	public String getPASEmail() {
		String pasEmail = "";
		// String cacheKey = "pasEmail";
		// Ehcache thecache = getCache();
		// Element elem = null;
		// if (thecache != null)
		// elem = thecache.get(cacheKey);
		// if (elem == null) {
		pasEmail = rfpConstantsMgr.getContactEmail().getConstant_value();
		// if (pasEmail != null && thecache != null) {
		// thecache.put(elem = new Element(cacheKey, pasEmail));
		// }
		// } else
		// pasEmail = (String) elem.getValue();
		return pasEmail;
	}

	public String getAcctRegEmail() {
		String pasAcctRegEmail = "";
		// String cacheKey = "pasAcctRegEmail";
		// Ehcache thecache = getCache();
		// Element elem = null;
		// if (thecache != null)
		// elem = thecache.get(cacheKey);
		// if (elem == null) {
		pasAcctRegEmail = rfpConstantsMgr.getContactAcctRegEmail().getConstant_value();
		// if (pasAcctRegEmail != null && thecache != null) {
		// thecache.put(elem = new Element(cacheKey, pasAcctRegEmail));
		// }
		// } else
		// pasAcctRegEmail = (String) elem.getValue();
		return pasAcctRegEmail;
	}

	public String getContactName() {
		String pasContact = "";
		// String cacheKey = "pasContact";
		// Ehcache thecache = getCache();
		// Element elem = null;
		// if (thecache != null)
		// elem = thecache.get(cacheKey);
		// if (elem == null) {
		pasContact = rfpConstantsMgr.getContactName().getConstant_value();
		// if (pasContact != null && thecache != null) {
		// thecache.put(elem = new Element(cacheKey, pasContact));
		// }
		// } else
		// pasContact = (String) elem.getValue();
		return pasContact;
	}

	public String getBlockPricingScreens() {
		return rfpConstantsMgr.getBlockPricingScreens().getConstant_value();
	}

	public RoomDefLinks getRoomDefLinks() {

		RoomDefLinks roomDefLinks = new RoomDefLinks();
		roomDefLinks.setKORDefLink(rfpConstantsMgr.getKorRoomDefLink());
		roomDefLinks.setKORInstructionsLink(rfpConstantsMgr.getRoomDefInstrLink());
		roomDefLinks.setKORWorksheetLink(rfpConstantsMgr.getRoomDefWorkShtLink());
		roomDefLinks.setKORFAQLink(rfpConstantsMgr.getRoomDefFAQLink());
		return roomDefLinks;
	}

	public long getMaxEmail() {
		long maxEmail;
		String cacheKey = "maxEmail";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			maxEmail = rfpConstantsMgr.getMaxEmail();
			if (maxEmail != 0 && thecache != null) {
				thecache.put(elem = new Element(cacheKey, Long.valueOf(maxEmail)));
			}
		} else
			maxEmail = ((Long) elem.getValue()).longValue();
		return maxEmail;
	}

	public long getMaxBlackouts() {
		return rfpConstantsMgr.getMaxBlackouts();
	}

	public long getMaxDOS() {
		return rfpConstantsMgr.getMaxDOS();
	}

	public long getMaxLOS() {
		return rfpConstantsMgr.getMaxLOS();
	}

	public long getMaxSeasons() {
		return rfpConstantsMgr.getMaxSeasons();
	}

	public long getAccountTrackingMaxPageLen() {
		return rfpConstantsMgr.getAccountTrackingMaxPageLen();
	}

	public long getAccountCenterMaxPageLen() {
		long accountCenterMaxPageLen;
		String cacheKey = "accountCenterMaxPageLen";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			accountCenterMaxPageLen = rfpConstantsMgr.getAccountCenterMaxPageLen();
			if (accountCenterMaxPageLen != 0 && thecache != null) {
				thecache.put(elem = new Element(cacheKey, Long.valueOf(accountCenterMaxPageLen)));
			}
		} else
			accountCenterMaxPageLen = ((Long) elem.getValue()).longValue();
		return accountCenterMaxPageLen;
	}

	public long getUserEdPropSelMaxLen() {
		return rfpConstantsMgr.getUserEdPropSelMaxLen();
	}

	public long getUserEdPropMaxLen() {
		return rfpConstantsMgr.getUserEdPropMaxLen();
	}

	public long getUsersMaxPageLen() {
		return rfpConstantsMgr.getUsersMaxPageLen();
	}

	public long getUserEdAcctMaxLen() {
		return rfpConstantsMgr.getUserEdAcctMaxLen();
	}

	public long getUserEdAcctSelMaxLen() {
		return rfpConstantsMgr.getUserEdAcctSelMaxLen();
	}

	public long getMaxAccountQuestions() {
		return rfpConstantsMgr.getMaxAccountQuestions();
	}

	public String getEpicUrl() {

		return rfpConstantsMgr.getEpicUrl();
	}

	public String getInfoHubUrl() {
		return rfpConstantsMgr.getInfoHubUrl();
	}

	public long getAccountStatusMaxPageLen() {
		return rfpConstantsMgr.getAccountStatusMaxPageLen();
	}

	public String getMarrFormsUrl() {
		return rfpConstantsMgr.getMarrFormsUrl();
	}

	public long getSalesMudHtlMaxPageLen() {
		return rfpConstantsMgr.getSalesMudHtlMaxPageLen();
	}

	public long getSalesMudAccMaxPageLen() {
		return rfpConstantsMgr.getSalesMudAccMaxPageLen();
	}

	public long getSalesMudPCMaxPageLen() {
		return rfpConstantsMgr.getSalesMudPCMaxPageLen();
	}

	public String getSAPP_Email() {
		return rfpConstantsMgr.getSAPP_Email().getConstant_value();
	}

	public String getSAPP_Name() {
		return rfpConstantsMgr.getSAPP_Name().getConstant_value();
	}

	public String getEPICEmail() {
		return rfpConstantsMgr.getEPICEmail().getConstant_value();
	}

	public String getWSContactEmail() {
		return wsConstantsManager.getWSContactEmail().getConstant_value();
	}

	public long getMaxRoomPool() {
		return wsConstantsManager.getMaxRoomPool();
	}

	public long getWSMaxSeasons() {
		return wsConstantsManager.getWSMaxSeasons();
	}

	public long getWSMinSeasons() {
		return wsConstantsManager.getWSMinSeasons();
	}

	public String getWholesalerUrl() {
		return rfpConstantsMgr.getWholesalerUrl();
	}

	public long getMaxCompetitor() {
		return rfpConstantsMgr.getMaxCompetitor();
	}

	public long getMaxSubsidiaries() {
		return rfpConstantsMgr.getMaxSubsidiaries();
	}

	public long getMaxInitiatives() {
		return rfpConstantsMgr.getMaxInitiatives();
	}

	public long getMaxAcctPlanTasks() {
		return rfpConstantsMgr.getMaxAcctPlanTasks();
	}

	public long getMaxTravelLocations() {
		return rfpConstantsMgr.getMaxTravelLocations();
	}

	public long getMaxMarketOffices() {
		return rfpConstantsMgr.getMaxMarketOffices();
	}

	public long getMaxTravelMarkets() {
		return rfpConstantsMgr.getMaxTravelMarkets();
	}

	public long getMaxAcctKeyBuyer() {
		return rfpConstantsMgr.getMaxAcctKeyBuyer();
	}

	public String getHotelEdieAuditProfile() {
		return rfpConstantsMgr.getHotelEdieAuditProfile();
	}

	public String getHotelEdieCSRAuditProfile() {
		return rfpConstantsMgr.getHotelEdieCSRAuditProfile();
	}

	public String getBTtoHPPServiceUrl() {
		String btToHPPService = "";
		String cacheKey = "BTToHPPService";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			btToHPPService = rfpConstantsMgr.getBTtoHPPServiceUrl();
			if (btToHPPService != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, btToHPPService));
			}
		} else
			btToHPPService = (String) elem.getValue();
		return btToHPPService;
	}

	private Ehcache getCache() {
		return cacheManager.getCache("rfp_constants");
	}

	public String getShowPricing() {
		return rfpConstantsMgr.getShowPricing();
	}

	public String findProfileName(long profileid) {
		return rfpConstantsMgr.getProfilename(profileid);
	}

	public String getSoftLaunchEnabled() {
		return rfpConstantsMgr.getSoftLaunchEnabled();
	}

	public String getCamPassportUrl() {
		return rfpConstantsMgr.getCamPassportUrl();
	}
}

