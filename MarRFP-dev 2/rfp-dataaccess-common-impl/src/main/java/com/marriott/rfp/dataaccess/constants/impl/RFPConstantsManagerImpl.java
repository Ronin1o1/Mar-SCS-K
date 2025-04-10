package com.marriott.rfp.dataaccess.constants.impl;

import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.object.constants.Constants;
import com.marriott.rfp.object.constants.RFPConstants;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 * Session Bean implementation class RFPConstantsManagerImpl
 */
@Service
public class RFPConstantsManagerImpl implements RFPConstantsManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public RFPConstantsManagerImpl() {

	}

	public long getCustomAnswersLen() {
		return Long.parseLong(getConstantsDetails("NO_OF_CUSTOM_ANSWERS"));
	}

	private String getConstantsDetails(String constant_name) {
		String queryString = "select c.constant_value from mfpdbo.RFP_Constants c where c.constant_name= ?1 ";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, constant_name);
		String value;
		try {
			value = (String) q.getSingleResult();
		} catch (Exception ex) {
			value = null;
		}
		return value;
	}

	private String getProfName(long profileid) {
		String queryString = "select profile_name from mfpdbo.edie_profile where profile_id=?1";
		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, profileid);
		String profilename = "";
		try {
			profilename = (String) q.getSingleResult();
		} catch (NoResultException e) {
			profilename = null;
		}
		return profilename;
	}

	private Constants getConstantsFullDetails(String constant_name) {
		String queryString = "select c.constant_value, c.constant_name from mfpdbo.RFP_Constants c where c.constant_name= ?1 ";
		Query q = em.createNativeQuery(queryString, RFPConstants.class);
		q.setParameter(1, constant_name);
		return (RFPConstants) q.getSingleResult();
	}

	public long getAccountCenterMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTCTR_LENGTH"));
	}

	public long getAccountCenterGMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTCTRG_LENGTH"));
	}

	public long getAccountMsgMaxDays() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTMSG_DAYS"));
	}

	public long getAccountStatusMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTSTAT_LENGTH"));
	}

	public long getAcctOverviewMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTSTAT_LENGTH"));
	}

	public long getAccountTrackingMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTTRACK_LEN"));
	}

	public long getAccountNotViewableMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCTVIEW_LENGTH"));
	}

	public long getUsersMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_USERS_LENGTH"));
	}

	public long getUserEdAcctMaxLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCT_USERED_LEN"));
	}

	public long getUserEdPropMaxLen() {
		return Long.parseLong(getConstantsDetails("MAX_PROP_USERED_LEN"));
	}

	public long getUserEdAcctSelMaxLen() {
		return Long.parseLong(getConstantsDetails("MAX_ACCT_ED_SEL_LEN"));
	}

	public long getUserEdPropSelMaxLen() {
		return Long.parseLong(getConstantsDetails("MAX_PROP_ED_SEL_LEN"));
	}

	public String getActuateExcelLoc() {
		return getConstantsDetails("COGNOS_EXCEL_LOC");
	}

	public String getExcelLoc() {
		return getConstantsDetails("ACTUATE_EXCEL_LOC");
	}

	public Constants getContactEmail() {
		return getConstantsFullDetails("CONTACT_EMAIL");
	}

	public Constants getContactEmail_WS() {
		return getConstantsFullDetails("CONTACT_EMAIL_WS");
	}

	public Constants getContactLongName() {
		return getConstantsFullDetails("CONTACT_LNAME");
	}

	public Constants getContactName() {
		return getConstantsFullDetails("CONTACT_NAME");
	}

	public Constants getContactPhone() {
		return getConstantsFullDetails("CONTACT_PHONE");
	}

	public Constants getEPICEmail() {
		return getConstantsFullDetails("EPIC_EMAIL");
	}

	public Constants getEPICName() {
		return getConstantsFullDetails("EPIC_NAME");
	}

	public Constants getEPICWebsite() {
		return getConstantsFullDetails("EPIC_WEBSITE");
	}

	public Constants getBlockPricingScreens() {
		return getConstantsFullDetails("BLOCK_PRICE_SCREENS");
	}

	public long getMaxAdminSeasons() {
		return Long.parseLong(getConstantsDetails("MAX_ADMIN_SEASONS"));
	}

	public long getMaxBlackouts() {
		return Long.parseLong(getConstantsDetails("MAX_BLACKOUTS"));
	}

	public long getMaxDOS() {
		return Long.parseLong(getConstantsDetails("MAX_SALESDEPTH"));
	}

	public long getMaxLOS() {
		return Long.parseLong(getConstantsDetails("MAX_LOS"));
	}

	public long getMaxMarketOffices() {
		return Long.parseLong(getConstantsDetails("MAX_MARKET_OFFICES"));
	}

	public long getMaxEmail() {
		return Long.parseLong(getConstantsDetails("MAX_EMAIL"));
	}


	public long getMaxPMTHotels() {
		return Long.parseLong(getConstantsDetails("MAX_PMTHOTELS"));
	}

	public long getMaxProductsUsed() {
		return Long.parseLong(getConstantsDetails("MAX_PRODUCTSUSED"));
	}

	public long getMaxSeasons() {
		return Long.parseLong(getConstantsDetails("MAX_SEASONS"));
	}



	public long getMaxSubsidiaries() {
		return Long.parseLong(getConstantsDetails("MAX_SUBSIDIARIES"));
	}

	public long getMaxTravelMarkets() {
		return Long.parseLong(getConstantsDetails("MAX_TRAVELMARKETS"));
	}


	public String getMinHotelsEnhancedReporting() {
		return getConstantsDetails("MINHOTELS_EREPORT");
	}


	public Constants getTermsEmail() {
		return getConstantsFullDetails("TERMS_EMAIL");
	}


	public String getKorRoomDefLink() {
		return getConstantsDetails("KOR_ROOMDEF_LINK");
	}

	public long getKorRPGMLimit() {
		return Long.parseLong(getConstantsDetails("KOR_RPGM_LIMIT"));
	}

	public String getKORShow() {
		return getConstantsDetails("KOR_SHOW");
	}


	public Constants getRoomDefContactEmail() {
		return getConstantsFullDetails("CONTACT_EMAIL_RD");
	}

	public Constants getRoomDefContactName() {
		return getConstantsFullDetails("CONTACT_NAME_RD");
	}

	public Constants getRoomDefContactPhone() {
		return getConstantsFullDetails("CONTACT_PHONE_RD");
	}

	public String getRoomDefWorkShtLink() {
		return getConstantsDetails("KOR_WORKSHEET_LINK");
	}

	public String getRoomDefInstrLink() {
		return getConstantsDetails("KOR_INSTR_LINK");
	}

	public String getRoomDefFAQLink() {
		return getConstantsDetails("KOR_FAQ_LINK");
	}

	public String getEpicUrl() {
		return getConstantsDetails("EPIC_URL");
	}

	public String getInfoHubUrl() {
		return getConstantsDetails("HOTEL_INFOHUB");
	}

	public String getFormattedRatesShow() {
		return getConstantsDetails("FORMATTEDRATES_SHOW");
	}

	public long getMaxInitiatives() {
		return Long.parseLong(getConstantsDetails("MAX_APLN_INITIATIVES"));
	}

	public long getMaxCompetitor() {
		return Long.parseLong(getConstantsDetails("MAX_COMPETITOR"));
	}

	public long getMaxAcctPlanTasks() {
		return Long.parseLong(getConstantsDetails("MAX_ACCT_PLAN_TASKS"));
	}

	public long getMaxAcctKeyBuyer() {
		return Long.parseLong(getConstantsDetails("MAX_ACCT_KEYBUYER"));
	}

	public Constants getSAPP_Email() {
		return getConstantsFullDetails("SAPP_EMAIL");
	}

	public Constants getSAPP_Name() {
		return getConstantsFullDetails("SAPP_NAME");
	}

	public String getLDAP_PWD() {
		return getConstantsDetails("LDAP_PWD");
	}

	public long getMaxFRProducts() {
		return Long.parseLong(getConstantsDetails("MAX_FR_PRODUCTS"));
	}

	public long getRateAssignmentCount() {
		return Long.parseLong(getConstantsDetails("MARRFP_RATE_COUNT"));
	}

	public String getRateDescriptionMode() {
		return getConstantsDetails("MARRFP_RATE_DESC");
	}

	public String getMarshaXMLUrl() {
		return getConstantsDetails("MARSHA_ROOMDEF_URL");
	}

	public String getReportServerUrl() {
		return getConstantsDetails("COGNOS_SERVER_URL");
	}

	public String getReportOndemandUrl() {
		return getConstantsDetails("REPORT_ONDEMAND_URL");
	}

	public String getServerUrl() {
		return getConstantsDetails("REPORT_SERVER_URL");
	}
	/* Cognos : Edie Report changes starts */
	public String getReportEdieUrl() {
		return getConstantsDetails("COGNOS_EDIE_URL");
	}

	public String getEdieViewUrl() {
		return getConstantsDetails("EDIE_ONDEMAND_URL");
	}
	/* Cognos : Edie Report changes ends */

	public Constants getRateDefContactEmail() {
		return getConstantsFullDetails("CONTACT_EMAIL_FRD");
	}

	public Constants getRateDefContactName() {
		return getConstantsFullDetails("CONTACT_NAME_FRD");
	}

	public Constants getScptToolContactName() {
		return getConstantsFullDetails("CONTACT_NAME_SCPT");
	}

	public Constants getScptSupportContactEmail() {
		return getConstantsFullDetails("CONTACT_SCPT_EMAIL");
	}

	public Constants getRateDefContactPhone() {
		return getConstantsFullDetails("CONTACT_PHONE_FRD");
	}

	public long getMaxTravelLocations() {
		return Long.parseLong(getConstantsDetails("MAX_TRAVEL_LOCATIONS"));
	}

	public long getMirrorExpMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_MIRROR_LENGTH"));
	}

	public long getSFOMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_SFOPAGE_LENGTH"));
	}

	public long getMaxAccountQuestions() {
		return Long.parseLong(getConstantsDetails("MAX_ACCT_QUESTIONS"));
	}

	public String getNetezzaUserID() {
		return getConstantsDetails("NETEZZA_USER_ID");
	}

	public String getNetezzaPassword() {
		return getConstantsDetails("NETEZZA_PASSWORD");
	}

	public String getNetezzaURL() {
		return getConstantsDetails("NETEZZA_URL");
	}

	public long getMaxMcadResults() {
		return Long.parseLong(getConstantsDetails("MAX_MCAD_RESULTS"));
	}

	public long getMaxMcadLink() {
		return Long.parseLong(getConstantsDetails("MAX_MCAD_LINK"));
	}

	public String getAddEmailText() {
		return getConstantsDetails("ADD_EMAIL_TEXT");
	}

	public String getSiteUrl() {
		return getConstantsDetails("SITE_URL");
	}

	public String getSendEmail() {
		return getConstantsDetails("SEND_EMAIL");
	}

	public String getChaseSendEmail() {
		return getConstantsDetails("CHASE_SEND_EMAIL");
	}

	public String getSendEmailFrom() {
		return getConstantsDetails("SEND_EMAIL_FROM");
	}

	public String getMarrFormsUrl() {
		return getConstantsDetails("MARRFORMS_URL");
	}

	public long getSalesMudHtlMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_SLSMUDRM_HTL_LEN"));
	}

	public long getSalesMudAccMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_SLSMUDRM_ACT_LEN"));
	}

	public long getSalesMudPCMaxPageLen() {
		return Long.parseLong(getConstantsDetails("MAX_SM_PRIMECONT_LEN"));
	}

	public String getWholesalerUrl() {
		return getConstantsDetails("WS_INFO_DTLS_LINK");
	}

	public String getHotelEdieAuditProfile() {
		return getConstantsDetails("HOTELAUDITPROFILE");
	}

	public String getHotelEdieCSRAuditProfile() {
		return getConstantsDetails("HOTELAUDITCSR");
	}

	public long getNumRoomPools() {
		return Long.parseLong(getConstantsDetails("NUM_ROOMPOOLS"));
	}

	public String getBTtoHPPServiceUrl() {
		return getConstantsDetails("HPP_BTSERVICE_URL");
	}

	public String getShowPricing() {
		return getConstantsDetails("SHOW_PRICING");
	}

	public Constants getContactAcctRegEmail() {
		return getConstantsFullDetails("SEND_ACCTREG_EMAILS");
	}

	public String getSendRFPEmail() {
		return getConstantsDetails("SEND_RFPEMAIL");
	}

	public String getGlobalSalesUrl() {
		return getConstantsDetails("GLOBALSALES_URL");
	}

	public String getAreaSalesUrl() {
		return getConstantsDetails("AREASALES_URL");
	}

	public String getProfilename(long profileid) {
		return getProfName(profileid);
	}

	public String getSoftLaunchEnabled() {
		return getConstantsDetails("SOFT_LAUNCH_ENABLED");
	}

	@Override
	public Long getEnhancedDiscount() {
		return NumberUtils.toLong(getConstantsDetails("DEFAULT_ENHANCEDDISC"));
	}

	public String getCamPassportUrl() {
		return getConstantsDetails("CAM_PASSPORT_URL");
	}
	public String getPricingContactsUrl() {
		return getConstantsDetails("PRICINGCONTACTS_URL");
	}	
	
	public String getPasMgsUrl() {
        return getConstantsDetails("PAS_MGS_URL");
    }
}
