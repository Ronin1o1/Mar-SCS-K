package com.marriott.rfp.object.pgoos;

public class RateProgram {

	private Long transactionId;
	private Long sequence;
	private String aerRateProgram;
	private String rateProgramCode;
	private Double amount;
	private String lra;
	private String roomTypeId;
	private MarshaCommandType marshaCmd;
	private String productId;
	private Long hotelRfpId;
	private Long propertyRateEntityId;
	private Long rateOfferId;
	
	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public String getAerRateProgram() {
		return aerRateProgram;
	}

	public void setAerRateProgram(String aerRateProgram) {
		this.aerRateProgram = aerRateProgram;
	}

	public String getRateProgramCode() {
		return rateProgramCode;
	}

	public void setRateProgramCode(String rateProgramCode) {
		this.rateProgramCode = rateProgramCode;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getLra() {
		return lra;
	}

	public void setLra(String lra) {
		this.lra = lra;
	}

	public String getRoomTypeId() {
		return roomTypeId;
	}

	public void setRoomTypeId(String roomTypeId) {
		this.roomTypeId = roomTypeId;
	}

	public MarshaCommandType getMarshaCmd() {
		return marshaCmd;
	}

	public void setMarshaCmd(String marshaCmd) {
		this.marshaCmd = MarshaCommandType.fromValue(marshaCmd);
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Long getHotelRfpId() {
		return hotelRfpId;
	}

	public void setHotelRfpId(Long hotelRfpId) {
		this.hotelRfpId = hotelRfpId;
	}

	public Long getPropertyRateEntityId() {
		return propertyRateEntityId;
	}

	public void setPropertyRateEntityId(Long propertyRateEntityId) {
		this.propertyRateEntityId = propertyRateEntityId;
	}

	public Long getRateOfferId() {
		return rateOfferId;
	}

	public void setRateOfferId(Long rateOfferId) {
		this.rateOfferId = rateOfferId;
	}

}
