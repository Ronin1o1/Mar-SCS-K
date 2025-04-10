package com.marriott.rfp.object.pricing.account;

import java.util.Date;

public class HPPRateOffer {

	private Long rateOfferSystemId;

	private Long rateOfferId;

	private String name;

	private String completionLevel;

	private Date lastUpdateDate;

	public Long getRateOfferSystemId() {
		return rateOfferSystemId;
	}

	public void setRateOfferSystemId(Long rateOfferSystemId) {
		this.rateOfferSystemId = rateOfferSystemId;
	}

	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

	public String getName() {
		return name;
	}

	public void setName(String rateOfferName) {
		this.name = rateOfferName;
	}

	public String getCompletionLevel() {
		return completionLevel;
	}

	public void setCompletionLevel(String completionLevel) {
		this.completionLevel = completionLevel;
	}

	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

}
