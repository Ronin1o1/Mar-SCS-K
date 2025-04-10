package com.marriott.rfp.object.pricing.accountregistration;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AccountRegistration implements Serializable {
	private static final Logger log = LoggerFactory.getLogger(AccountRegistration.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long regPeriod;
	private Long accountID;
	private Long pricingperiodid;
	private String accountType; // should have been changed to account segment
	private String eid;
	private String accountUrl;
	private String rateLoadInstr;
	private String utilThirdParty;
	private Long thirdPartyId;
	private String reqRateCycle;
	private Date clientDueDate;
	private String btRoomNightSpan;
	private Long roomNight;
	private String accountName;
	private String accountLeadName;
	private String accountLeadEmail;
	private String accountLeadPhone;
	private String accountSegmentName;
	private String thirdPartyName;
	private Date pricingPeriodDueDate;
	private String otherthirdpartyname;
	private String solicitPricing;
	private String loginIdReceived;
	private String reasonToPrice;
	private String twoyearpricing;
	private String offcyclepricing;
	private String commrates;
	private String flatrates;
	private String clientPreferredName;
	private String haspriorprice;
	private String salesRegionID;
	private String salesRegion;
	
	public String getSalesRegionID() {
		return salesRegionID;
	}

	public void setSalesRegionID(String salesRegionID) {
		this.salesRegionID = salesRegionID;
	}
	
	public String getSalesRegion() {
		return salesRegion;
	}

	public void setSalesRegion(String salesRegion) {
		this.salesRegion = salesRegion;
	}

	
	public Long getRegPeriod() {
		return regPeriod;
	}

	public void setRegPeriod(Long regPeriod) {
		this.regPeriod = regPeriod;
	}

	public Long getAccountID() {
		return accountID;
	}

	public void setAccountID(Long accountID) {
		this.accountID = accountID;
	}

	public Long getPricingperiodid() {
		return pricingperiodid;
	}

	public void setPricingperiodid(Long pricingperiodid) {
		this.pricingperiodid = pricingperiodid;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public String getAccountUrl() {
		return accountUrl;
	}

	public void setAccountUrl(String accountUrl) {
		this.accountUrl = accountUrl;
	}

	public String getRateLoadInstr() {
		return rateLoadInstr;
	}

	public void setRateLoadInstr(String rateLoadInstr) {
		this.rateLoadInstr = rateLoadInstr;
	}

	public String getUtilThirdParty() {
		return utilThirdParty;
	}

	public void setUtilThirdParty(String utilThirdParty) {
		this.utilThirdParty = utilThirdParty;
	}

	public Long getThirdPartyId() {
		return thirdPartyId;
	}

	public void setThirdPartyId(Long thirdPartyId) {
		this.thirdPartyId = thirdPartyId;
	}

	public String getReqRateCycle() {
		return reqRateCycle;
	}

	public void setReqRateCycle(String reqRateCycle) {
		this.reqRateCycle = reqRateCycle;
	}

	public Date getClientDueDate() {
		return clientDueDate;
	}

	public String getClientDueDateString() {
		String clientDateStr = "";
		if (clientDueDate != null) {
			clientDateStr = DateUtility.formatShortStringDate(clientDueDate);
			if (clientDateStr.toUpperCase().equals("DEC 31, 9999"))
				clientDateStr = "TBD";
			if (clientDateStr.toUpperCase().equals("JAN 01, 9999"))
				clientDateStr = "CBC Collection";
		}
		return clientDateStr;
	}

	public void setClientDueDate(String clientDueDate) {
		if (clientDueDate.equalsIgnoreCase("TBD")) {
			try {
				this.clientDueDate = (Date) DateUtility.parseLongDate("DEC 31, 9999");
			} catch (ParseException e) {
				log.error(e.getMessage(),e);
			}
		} else if (clientDueDate.equalsIgnoreCase("CBC Collection")){
			try {
				this.clientDueDate = (Date) DateUtility.parseLongDate("JAN 01, 9999");
			} catch (ParseException e) {
				log.error(e.getMessage(),e);
			}
		}
		else {
			try {
				this.clientDueDate = DateUtility.parseDate(clientDueDate);
			} catch (ParseException e) {

			}
		}
	}

	public String getBtRoomNightSpan() {
		return btRoomNightSpan;
	}

	public void setBtRoomNightSpan(String btRoomNightSpan) {
		this.btRoomNightSpan = btRoomNightSpan;
	}

	public Long getRoomNight() {
		return roomNight;
	}

	public void setRoomNight(Long roomNight) {
		this.roomNight = roomNight;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public void setAccountLeadName(String accountLeadName) {
		this.accountLeadName = accountLeadName;
	}

	public String getAccountLeadName() {
		return accountLeadName;
	}

	public void setAccountSegmentName(String accountSegmentName) {
		this.accountSegmentName = accountSegmentName;
	}

	public String getAccountSegmentName() {
		return accountSegmentName;
	}

	public void setThirdPartyName(String thirdPartyName) {
		this.thirdPartyName = thirdPartyName;
	}

	public String getThirdPartyName() {
		return thirdPartyName;
	}

	public void setPricingPeriodDueDate(Date pricingPeriodDueDate) {
		this.pricingPeriodDueDate = pricingPeriodDueDate;
	}

	public String getPricingPeriodDueDateString() {
		String dueDateStr = "";
		if (pricingPeriodDueDate != null) {
			dueDateStr = DateUtility.formatShortStringDate(pricingPeriodDueDate);
			if (dueDateStr.toUpperCase().equals("DEC 31, 9999"))
				dueDateStr = "TBD";
			if (dueDateStr.toUpperCase().equals("JAN 01, 9999"))
				dueDateStr = "CBC Collection";
		}
		return dueDateStr;
	}

	public void setAccountLeadEmail(String accountLeadEmail) {
		this.accountLeadEmail = accountLeadEmail;
	}

	public String getAccountLeadEmail() {
		return accountLeadEmail;
	}

	public void setAccountLeadPhone(String accountLeadPhone) {
		this.accountLeadPhone = accountLeadPhone;
	}

	public String getAccountLeadPhone() {
		return accountLeadPhone;
	}


	public void setOtherthirdpartyname(String otherthirdpartyname) {
		this.otherthirdpartyname = otherthirdpartyname;
	}

	public String getOtherthirdpartyname() {
		return otherthirdpartyname;
	}

	public String getSolicitPricing() {
		return solicitPricing;
	}

	public void setSolicitPricing(String solicitPricing) {
		this.solicitPricing = solicitPricing;
	}

	public String getLoginIdReceived() {
		return loginIdReceived;
	}

	public void setLoginIdReceived(String loginIdReceived) {
		this.loginIdReceived = loginIdReceived;
	}

	public String getTwoyearpricing() {
		return twoyearpricing;
	}

	public void setTwoyearpricing(String twoyearpricing) {
		this.twoyearpricing = twoyearpricing;
	}

	public String getOffcyclepricing() {
		return offcyclepricing;
	}

	public void setOffcyclepricing(String offcyclepricing) {
		this.offcyclepricing = offcyclepricing;
	}

	public String getCommrates() {
		return commrates;
	}

	public void setCommrates(String commrates) {
		this.commrates = commrates;
	}

	public String getFlatrates() {
		return flatrates;
	}

	public void setFlatrates(String flatrates) {
		this.flatrates = flatrates;
	}

	public void setReasonToPrice(String reasonToPrice) {
		this.reasonToPrice = reasonToPrice;
	}

	public String getReasonToPrice() {
		return reasonToPrice;
	}

	public String getHaspriorprice() {
		return haspriorprice;
	}

	public void setHaspriorprice(String haspriorprice) {
		this.haspriorprice = haspriorprice;
	}

	public String getClientPreferredName() {
		return clientPreferredName;
	}

	public void setClientPreferredName(String clientPreferredName) {
		this.clientPreferredName = clientPreferredName;
	}

}
