package com.marriott.rfp.object.pgoos;

import java.util.Date;

public class PublishResponse {

	private static final String DELIMITER = "|";
	private Long transactionId;
	private Long processId;
	private String requestType;
	private Long rateOfferId;
	private String rateProgramCode;
	private Long propertyRateEntityId;
	private String propertyCode;
	private String status;
	private String source;
	private String eid;
	private Date lastPublishDate;
	private Date purgeDate;
	
	private String availParentRateProgram;
	private String availParentRateOfferName;
	private Long availParentRateOfferId;
	private Long availParentRateEntityId;
	
	private String pricingParentRateProgram;
	private String pricingParentRateOfferName;
	private Long pricingParentRateOfferId;
	private Long pricingParentRateEntityId;
	
	private String restrictionsParentRateProgram;
	private String restrictionsParentRateOfferName;
	private Long restrictionsParentRateOfferId;
	private Long restrictionsParentRateEntityId;
	
	private String ceilingParentRateProgram;
	private String ceilingParentRateOfferName;
	private Long ceilingParentRateOfferId;
	private Long ceilingParentRateEntityId;
	
	private String[] errorCodes;
	private String[] errorMsgs;
	private String[] warningCodes;
	private String[] warningMsgs;

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

	public String getRateProgramCode() {
		return rateProgramCode;
	}

	public void setRateProgramCode(String rateProgramCode) {
		this.rateProgramCode = rateProgramCode;
	}

	public Long getPropertyRateEntityId() {
		return propertyRateEntityId;
	}

	public void setPropertyRateEntityId(Long propertyRateEntityId) {
		this.propertyRateEntityId = propertyRateEntityId;
	}

	public String getPropertyCode() {
		return propertyCode;
	}

	public void setPropertyCode(String propertyCode) {
		this.propertyCode = propertyCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public Date getLastPublishDate() {
		return lastPublishDate;
	}

	public void setLastPublishDate(Date lastPublishDate) {
		this.lastPublishDate = lastPublishDate;
	}

	public Date getPurgeDate() {
		return purgeDate;
	}

	public void setPurgeDate(Date purgeDate) {
		this.purgeDate = purgeDate;
	}

	public String getAvailParentRateProgram() {
		return availParentRateProgram;
	}

	public void setAvailParentRateProgram(String availParentRateProgram) {
		this.availParentRateProgram = availParentRateProgram;
	}

	public String getAvailParentRateOfferName() {
		return availParentRateOfferName;
	}

	public void setAvailParentRateOfferName(String availParentRateOfferName) {
		this.availParentRateOfferName = availParentRateOfferName;
	}

	public Long getAvailParentRateOfferId() {
		return availParentRateOfferId;
	}

	public void setAvailParentRateOfferId(Long availParentRateOfferId) {
		this.availParentRateOfferId = availParentRateOfferId;
	}

	public Long getAvailParentRateEntityId() {
		return availParentRateEntityId;
	}

	public void setAvailParentRateEntityId(Long availParentRateEntityId) {
		this.availParentRateEntityId = availParentRateEntityId;
	}

	public String getPricingParentRateProgram() {
		return pricingParentRateProgram;
	}

	public void setPricingParentRateProgram(String pricingParentRateProgram) {
		this.pricingParentRateProgram = pricingParentRateProgram;
	}

	public String getPricingParentRateOfferName() {
		return pricingParentRateOfferName;
	}

	public void setPricingParentRateOfferName(String pricingParentRateOfferName) {
		this.pricingParentRateOfferName = pricingParentRateOfferName;
	}

	public Long getPricingParentRateOfferId() {
		return pricingParentRateOfferId;
	}

	public void setPricingParentRateOfferId(Long pricingParentRateOfferId) {
		this.pricingParentRateOfferId = pricingParentRateOfferId;
	}

	public Long getPricingParentRateEntityId() {
		return pricingParentRateEntityId;
	}

	public void setPricingParentRateEntityId(Long pricingParentRateEntityId) {
		this.pricingParentRateEntityId = pricingParentRateEntityId;
	}

	public String getRestrictionsParentRateProgram() {
		return restrictionsParentRateProgram;
	}

	public void setRestrictionsParentRateProgram(String restrictionsParentRateProgram) {
		this.restrictionsParentRateProgram = restrictionsParentRateProgram;
	}

	public String getRestrictionsParentRateOfferName() {
		return restrictionsParentRateOfferName;
	}

	public void setRestrictionsParentRateOfferName(String restrictionsParentRateOfferName) {
		this.restrictionsParentRateOfferName = restrictionsParentRateOfferName;
	}

	public Long getRestrictionsParentRateOfferId() {
		return restrictionsParentRateOfferId;
	}

	public void setRestrictionsParentRateOfferId(Long restrictionsParentRateOfferId) {
		this.restrictionsParentRateOfferId = restrictionsParentRateOfferId;
	}

	public Long getRestrictionsParentRateEntityId() {
		return restrictionsParentRateEntityId;
	}

	public void setRestrictionsParentRateEntityId(Long restrictionsParentRateEntityId) {
		this.restrictionsParentRateEntityId = restrictionsParentRateEntityId;
	}


	public String getCeilingParentRateProgram() {
		return ceilingParentRateProgram;
	}

	public void setCeilingParentRateProgram(String ceilingParentRateProgram) {
		this.ceilingParentRateProgram = ceilingParentRateProgram;
	}

	public String getCeilingParentRateOfferName() {
		return ceilingParentRateOfferName;
	}

	public void setCeilingParentRateOfferName(String ceilingParentRateOfferName) {
		this.ceilingParentRateOfferName = ceilingParentRateOfferName;
	}

	public Long getCeilingParentRateOfferId() {
		return ceilingParentRateOfferId;
	}

	public void setCeilingParentRateOfferId(Long ceilingParentRateOfferId) {
		this.ceilingParentRateOfferId = ceilingParentRateOfferId;
	}

	public Long getCeilingParentRateEntityId() {
		return ceilingParentRateEntityId;
	}

	public void setCeilingParentRateEntityId(Long ceilingParentRateEntityId) {
		this.ceilingParentRateEntityId = ceilingParentRateEntityId;
	}

	public String[] getErrorCodes() {
		return errorCodes;
	}

	public void setErrorCodes(String[] errorCodes) {
		this.errorCodes = errorCodes;
	}

	public String[] getErrorMsgs() {
		return errorMsgs;
	}

	public void setErrorMsgs(String[] errorMsgs) {
		this.errorMsgs = errorMsgs;
	}

	public String[] getWarningCodes() {
		return warningCodes;
	}

	public void setWarningCodes(String[] warningCodes) {
		this.warningCodes = warningCodes;
	}

	public String[] getWarningMsgs() {
		return warningMsgs;
	}

	public void setWarningMsgs(String[] warningMsgs) {
		this.warningMsgs = warningMsgs;
	}

	private String generateDelimitedString(String[] msgs) {
		StringBuilder builder = new StringBuilder();
		if (msgs != null) {
			builder.append(msgs.length);
			for (String msg : msgs) {
				builder.append(DELIMITER).append(msg);
			}
		}

		return builder.toString();
	}

	private String generateLengthDelimitedString(String[]msgs, int maxlen) {
		String msg=generateDelimitedString(msgs);
		if (msg !=null && msg.length()>maxlen) 
			return msg.substring(0, maxlen-1);
		else
			return msg;
	}
	public String getErrorMessagesAsDelimitedString(){
		String[] eMsgs = getErrorMsgs();
		return generateLengthDelimitedString(eMsgs,4000);
	}
	
	public String getErrorCodesAsDelimitedString(){
		String[] eCodes = getErrorCodes();
		return generateDelimitedString(eCodes);
	}
	
	public String getWarningCodesAsDelimitedString(){
		String[] wCodes = getWarningCodes();
		return generateLengthDelimitedString(wCodes,4000);
	}
	
	public String getWarningMessagesAsDelimitedString(){
		String[] wMsgs = getWarningMsgs();
		return generateLengthDelimitedString(wMsgs,4000);
	}

	public void setProcessId(Long processId) {
		this.processId = processId;
	}

	public Long getProcessId() {
		return processId;
	}

}

