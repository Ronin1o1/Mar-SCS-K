package com.marriott.rfp.object.roomdef;


public class RoomDefDefinitionUpdateView {
	private String availabilityInd;
	private String quantity;
	private String text;
	private String UOM_Code;
	private String brandCode;
	private String formatCode;
	private String roomNumber;
	private String mustComplete;

	public RoomDefDefinitionUpdateView() {

	}

	public String getAvailabilityInd() {
		return availabilityInd;
	}

	public void setAvailabilityInd(String availabilityInd) {
		this.availabilityInd = availabilityInd;
	}

	public String getQuantity() {
		return quantity;
	}


	public void setQuantity(String quantity) {
		if (quantity!=null && quantity.equals(""))
			this.quantity="0";
		else
			this.quantity = quantity;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUOM_Code() {
		return UOM_Code;
	}

	public void setUOM_Code(String code) {
		UOM_Code = code;
	}

	public String getBrandCode() {
		return brandCode;
	}

	public void setBrandCode(String brandCode) {
		this.brandCode = brandCode;
	}

	public String getFormatCode() {
		return formatCode;
	}

	public void setFormatCode(String formatCode) {
		this.formatCode = formatCode;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public void setMustComplete(String mustComplete) {
		this.mustComplete = mustComplete;
	}

	public String getMustComplete() {
		return mustComplete;
	}

}
