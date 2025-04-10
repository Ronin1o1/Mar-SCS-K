package com.marriott.rfp.object.pgoos;

import java.io.Serializable;
import java.util.Date;

public class PricingRule  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long accountInfoId;

	private Long seasonId;

	private Date startDate;

	private Date endDate;

	private Long tierNumber;

	private Long startNights;

	private Long endNights;

	private OccupancyType occupancy;

	private Double pricingAmount;

	private Double ceilingAmount;
	private Long ceilingmirrortier;
	private String ceilingmirrorself;

	public Long getAccountInfoId() {
		return accountInfoId;
	}

	public void setAccountInfoId(Long accountInfoId) {
		this.accountInfoId = accountInfoId;
	}

	public Long getSeasonId() {
		return seasonId;
	}

	public void setSeasonId(Long seasonId) {
		this.seasonId = seasonId;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Long getTierNumber() {
		return tierNumber;
	}

	public void setTierNumber(Long tierNumber) {
		this.tierNumber = tierNumber;
	}

	public Long getStartNights() {
		return startNights;
	}

	public void setStartNights(Long startNights) {
		this.startNights = startNights;
	}

	public Long getEndNights() {
		return endNights;
	}

	public void setEndNights(Long endNights) {
		this.endNights = endNights;
	}

	public Double getPricingAmount() {
		return pricingAmount;
	}

	public void setPricingAmount(Double amount) {
		this.pricingAmount = amount;
	}

	public Double getCeilingAmount() {
		return ceilingAmount;
	}

	public void setCeilingAmount(Double amount) {
		this.ceilingAmount = amount;
	}

	public OccupancyType getOccupancy() {
		return occupancy;
	}

	public void setOccupancy(Long occupancy) {
		if (occupancy != null) {
			this.occupancy = OccupancyType.fromValue(occupancy);
		}
	}



	public void setCeilingmirrorself(String ceilingmirroself) {
		this.ceilingmirrorself = ceilingmirroself;
	}

	public String getCeilingmirrorself() {
		return ceilingmirrorself;
	}

	public void setCeilingmirrortier(Long ceilingmirrortier) {
		this.ceilingmirrortier = ceilingmirrortier;
	}

	public Long getCeilingmirrortier() {
		return ceilingmirrortier;
	}

}
