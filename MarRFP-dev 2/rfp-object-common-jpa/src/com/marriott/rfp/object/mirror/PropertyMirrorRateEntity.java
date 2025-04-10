package com.marriott.rfp.object.mirror;

public class PropertyMirrorRateEntity {

	private Long rateEntitySystemId;
	private Long propertyRateEntityId;
	private String roomPoolCode;
	private String roomPoolClassification;
	private String pricingType;
	private Long priorityTag;
	private String rateProgram;

	public Long getRateEntitySystemId() {
		return rateEntitySystemId;
	}

	public void setRateEntitySystemId(Long rateEntitySystemId) {
		this.rateEntitySystemId = rateEntitySystemId;
	}

	public Long getPropertyRateEntityId() {
		return propertyRateEntityId;
	}

	public void setPropertyRateEntityId(Long propertyRateEntityId) {
		this.propertyRateEntityId = propertyRateEntityId;
	}

	public String getRoomPoolCode() {
		return roomPoolCode;
	}

	public void setRoomPoolCode(String roomPoolCode) {
		this.roomPoolCode = roomPoolCode;
	}

	public String getRoomPoolClassification() {
		return roomPoolClassification;
	}

	public void setRoomPoolClassification(String roomPoolClassification) {
		this.roomPoolClassification = roomPoolClassification;
	}

	public String getPricingType() {
		return pricingType;
	}

	public void setPricingType(String pricingType) {
		this.pricingType = pricingType;
	}

	public Long getPriorityTag() {
		return priorityTag;
	}

	public void setPriorityTag(Long priorityTag) {
		this.priorityTag = priorityTag;
	}

	public String getRateProgram() {
		return rateProgram;
	}

	public void setRateProgram(String rateProgram) {
		this.rateProgram = rateProgram;
	}

}
