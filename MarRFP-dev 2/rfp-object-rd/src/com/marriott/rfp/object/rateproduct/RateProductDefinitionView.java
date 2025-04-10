package com.marriott.rfp.object.rateproduct;

import java.math.BigDecimal;

public class RateProductDefinitionView {
	private String RP_CodeName;
	private String RP_Code;
	private String RP_Name;
	private String availabilityInd;
	private BigDecimal quantity;
	private boolean bShowQuantity=false;
	private String text;
	private String UOM_Type;
	private String UOM_Name;
	private String typeListName;
	private String typeName;
	private String brandType;
	private String brandName;
	
	public RateProductDefinitionView() {
		
	}

	public String getRP_CodeName() {
		return RP_CodeName;
	}

	public void setRP_CodeName(String codeName) {
		RP_CodeName = codeName;
	}

	public String getRP_Code() {
		return RP_Code;
	}

	public void setRP_Code(String code) {
		RP_Code = code;
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

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUOM_Type() {
		return UOM_Type;
	}

	public void setUOM_Type(String type) {
		UOM_Type = type;
	}

	public String getUOM_Name() {
		return UOM_Name;
	}

	public void setUOM_Name(String name) {
		UOM_Name = name;
	}

	public String getTypeListName() {
		return typeListName;
	}

	public void setTypeListName(String typeListName) {
		this.typeListName = typeListName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getBrandType() {
		return brandType;
	}

	public void setBrandType(String brandType) {
		this.brandType = brandType;
	}


	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public void setRP_Name(String rP_Name) {
		RP_Name = rP_Name;
	}

	public String getRP_Name() {
		return RP_Name;
	}

	public void setBShowQuantity(boolean bShowQuantity) {
		this.bShowQuantity = bShowQuantity;
	}

	public boolean getBShowQuantity() {
		return bShowQuantity;
	}
	
	
}
