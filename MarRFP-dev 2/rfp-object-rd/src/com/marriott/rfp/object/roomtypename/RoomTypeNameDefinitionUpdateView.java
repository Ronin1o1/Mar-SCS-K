package com.marriott.rfp.object.roomtypename;

import java.math.BigDecimal;

public class RoomTypeNameDefinitionUpdateView {
	private String availabilityInd;
	private BigDecimal quantity;
	private String text;
	private String UOM_Code;
	private String typeCode;
	private String alternateTextListCode;
	
	public RoomTypeNameDefinitionUpdateView() {
		
	}

	public String getAvailabilityInd() {
		return availabilityInd;
	}

	public void setAvailabilityInd(String availabilityInd) {
		this.availabilityInd = availabilityInd;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public void setQuantity(String quantity) {
		if (quantity!=null && !quantity.equals(""))
			this.quantity = new BigDecimal(quantity);
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

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public void setAlternateTextListCode(String alternateTextListCode) {
		this.alternateTextListCode = alternateTextListCode;
	}

	public String getAlternateTextListCode() {
		return alternateTextListCode;
	}


}
