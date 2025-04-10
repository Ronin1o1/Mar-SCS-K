package com.marriott.rfp.object.roomdef;

import java.math.BigDecimal;

import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Format;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;

public class ProductDescriptionView implements java.io.Serializable {
	public static final String DD_YESNO = "YN";
	public static final String DD_YESNOSOME = "YS";
	public static final String NO_DD = "";
	private static final long serialVersionUID = 1L;

	private String elementTypeName; // attribute
	private String elementTypeCode; // attribute
	private String elementGroupName; // attribute
	private String elementGroupCode; // attribute
	private String elementCodeList; // attribute
	private String elementCode; // attribute
	private String elementCodeName; // attribute
	private String availabilityInd = " "; // attribute
	private String addOnAmenityInd; // attribute
	private String calloutInd; // attribute
	private String mustComplete; // attribute
	private String marshaOriginatedInd; // attribute
	private boolean syncAlert = false;
	private String dropDownType;
	private boolean showAvailability=false;
	private boolean showQuantity = false;
	private boolean showText = false;
	private boolean showBrand = false;
	private boolean showUOM = false;
	private boolean showFormat = false;
	private boolean editAvailability=false;
	private boolean editQuantity = false;
	private boolean editText = false;
	private boolean editBrand = false;
	private boolean editUOM = false;
	private boolean editFormat = false;
	private boolean showRoomNumber = false;
	private boolean show=true;
	private BigDecimal quantity; // attribute
	private BigDecimal roomNumber; // attribute
	private Brand brand;
	private Format format;
	private UnitOfMeasure unitOfMeasure;
	private Description description;
	private SupplementaryData[] supplementaryData;

	public ProductDescriptionView() {
	}

	public ProductDescriptionView(ProductDescriptionView pd) {
		super();
		copyInto(pd);
	}

	public ProductDescriptionView(ProductDescription pd) {
		super();
		copyInto(pd);
	}

	/**
	 * @return
	 */
	public java.lang.String getAddOnAmenityInd() {
		return addOnAmenityInd;
	}

	/**
	 * @return
	 */
	public java.lang.String getAvailabilityInd() {
		return availabilityInd;
	}

	public String getLongAvailabilityInd() {
		String longAvail="";
		if (availabilityInd!=null) {
		if (availabilityInd.equals("Y"))
			longAvail="Yes";
		else if (availabilityInd.equals("N"))
			longAvail="No";
		else if (availabilityInd.equals("S"))
			longAvail="Some";
		}
		return longAvail;
	}

	/**
	 * @return
	 */
	public java.lang.String getCalloutInd() {
		return calloutInd;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementCode() {
		return elementCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementCodeList() {
		return elementCodeList;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementGroupCode() {
		return elementGroupCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementGroupName() {
		return elementGroupName;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementTypeCode() {
		return elementTypeCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementTypeName() {
		return elementTypeName;
	}

	/**
	 * @return
	 */
	public java.lang.String getMustComplete() {
		return mustComplete;
	}

	/**
	 * @param string
	 */
	public void setAddOnAmenityInd(java.lang.String string) {
		addOnAmenityInd = string;
	}

	/**
	 * @param string
	 */
	public void setAvailabilityInd(java.lang.String string) {
		if (string == null || string.equals(""))
			string = " ";
		availabilityInd = string;
	}

	/**
	 * @param string
	 */
	public void setCalloutInd(java.lang.String string) {
		calloutInd = string;
	}

	/**
	 * @param string
	 */
	public void setElementCode(java.lang.String string) {
		elementCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementCodeList(java.lang.String string) {
		elementCodeList = string;
	}

	/**
	 * @param string
	 */
	public void setElementGroupCode(java.lang.String string) {
		elementGroupCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementGroupName(java.lang.String string) {
		elementGroupName = string;
	}

	/**
	 * @param string
	 */
	public void setElementTypeCode(java.lang.String string) {
		elementTypeCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementTypeName(java.lang.String string) {
		elementTypeName = string;
	}

	/**
	 * @param string
	 */
	public void setMustComplete(java.lang.String string) {
		mustComplete = string;
	}

	/**
	 * @return
	 */
	public java.lang.String getElementCodeName() {
		return elementCodeName;
	}

	/**
	 * @param string
	 */
	public void setElementCodeName(java.lang.String string) {
		elementCodeName = string;
	}

	/**
	 * @return
	 */
	public java.lang.String getMarshaOriginatedInd() {
		return marshaOriginatedInd;
	}

	/**
	 * @param string
	 */
	public void setMarshaOriginatedInd(java.lang.String string) {
		marshaOriginatedInd = string;
	}

	/**
	 * @return
	 */
	public BigDecimal getQuantity() {
		return quantity;
	}

	/**
	 * @param decimal
	 */
	public void setQuantity(BigDecimal decimal) {
		quantity = decimal;
	}

	/**
	 * @return
	 */
	public Brand getBrand() {
		return brand;
	}

	/**
	 * @return
	 */
	public Description getDescription() {
		return description;
	}

	/**
	 * @return
	 */
	public Format getFormat() {
		return format;
	}

	/**
	 * @return
	 */
	public UnitOfMeasure getUnitOfMeasure() {
		return unitOfMeasure;
	}

	/**
	 * @param brand
	 */
	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	/**
	 * @param description
	 */
	public void setDescription(Description description) {
		this.description = description;
	}

	/**
	 * @param format
	 */
	public void setFormat(Format format) {
		this.format = format;
	}

	/**
	 * @param measure
	 */
	public void setUnitOfMeasure(UnitOfMeasure measure) {
		unitOfMeasure = measure;
	}

	/**
	 * @return
	 */
	public BigDecimal getRoomNumber() {
		return roomNumber;
	}

	/**
	 * @param decimal
	 */
	public void setRoomNumber(BigDecimal decimal) {
		roomNumber = decimal;
	}

	/**
	 * @return
	 */
	public SupplementaryData[] getSupplementaryData() {
		return supplementaryData;
	}

	/**
	 * @param datas
	 */
	public void setSupplementaryData(SupplementaryData[] datas) {
		supplementaryData = datas;
	}

	public SupplementaryData getSupplementaryData(int i) {
		return supplementaryData[i];
	}

	public void setSupplementaryData(int i, SupplementaryData value) {
		this.supplementaryData[i] = value;
	}

	public void copyInto(ProductDescriptionView pd) {
		this.setAddOnAmenityInd(pd.getAddOnAmenityInd());
		this.setAvailabilityInd(pd.getAvailabilityInd());
		this.setCalloutInd(pd.getCalloutInd());
		this.setElementCode(pd.getElementCode());
		this.setElementCodeList(pd.getElementCodeList());
		this.setElementCodeName(pd.getElementCodeName());
		this.setElementGroupCode(pd.getElementGroupCode());
		this.setElementGroupName(pd.getElementGroupName());
		this.setElementTypeCode(pd.getElementTypeCode());
		this.setElementTypeName(pd.getElementTypeName());
		this.setMarshaOriginatedInd(pd.getMarshaOriginatedInd());
		this.setMustComplete(pd.getMustComplete());
		this.setQuantity(pd.getQuantity());
		this.setRoomNumber(pd.getRoomNumber());

		SupplementaryData[] origSupplementaryData = pd.getSupplementaryData();
		if (origSupplementaryData != null) {
			this.supplementaryData = new SupplementaryData[origSupplementaryData.length];
			for (int i = 0; i < origSupplementaryData.length; i++) {
				SupplementaryData newsd = new SupplementaryData(origSupplementaryData[i]);
				this.supplementaryData[i] = newsd;
			}
		}

		if (pd.getDescription() != null)
			this.description = new Description(pd.getDescription());

		if (pd.getBrand() != null)
			this.brand = new Brand(pd.getBrand());

		if (pd.getFormat() != null)
			this.format = new Format(pd.getFormat());

		if (pd.getUnitOfMeasure() != null)
			this.unitOfMeasure = new UnitOfMeasure(pd.getUnitOfMeasure());
		
		this.syncAlert = pd.getSyncAlert();
		this.dropDownType=pd.getDropDownType();
		this.showAvailability=pd.getShowAvailability();
		this.showQuantity = pd.getShowQuantity();
		this.showText = pd.getShowText();
		this.showBrand = pd.getShowBrand();
		this.showUOM = pd.getShowUOM();
		this.showFormat = pd.getShowFormat();
		this.editAvailability=pd.getEditAvailability();
		this.editQuantity = pd.getEditQuantity();
		this.editText = pd.getEditText();
		this.editBrand = pd.getEditBrand();
		this.editUOM = pd.getEditUOM();
		this.editFormat = pd.getEditFormat();
		this.showRoomNumber = pd.getShowRoomNumber();
		this.show=pd.getShow();

	}

	public void copyInto(ProductDescription pd) {
		this.setAddOnAmenityInd(pd.getAddOnAmenityInd());
		this.setAvailabilityInd(pd.getAvailabilityInd());
		this.setCalloutInd(pd.getCalloutInd());
		this.setElementCode(pd.getElementCode());
		this.setElementCodeList(pd.getElementCodeList());
		this.setElementCodeName(pd.getElementCodeName());
		this.setElementGroupCode(pd.getElementGroupCode());
		this.setElementGroupName(pd.getElementGroupName());
		this.setElementTypeCode(pd.getElementTypeCode());
		this.setElementTypeName(pd.getElementTypeName());
		this.setMarshaOriginatedInd(pd.getMarshaOriginatedInd());
		this.setMustComplete(pd.getMustComplete());
		this.setQuantity(pd.getQuantity());
		this.setRoomNumber(pd.getRoomNumber());

		SupplementaryData[] origSupplementaryData = pd.getSupplementaryData();
		if (origSupplementaryData != null) {
			this.supplementaryData = new SupplementaryData[origSupplementaryData.length];
			for (int i = 0; i < origSupplementaryData.length; i++) {
				SupplementaryData newsd = new SupplementaryData(origSupplementaryData[i]);
				this.supplementaryData[i] = newsd;
			}
		}

		if (pd.getDescription() != null)
			this.description = new Description(pd.getDescription());

		if (pd.getBrand() != null)
			this.brand = new Brand(pd.getBrand());

		if (pd.getFormat() != null)
			this.format = new Format(pd.getFormat());

		if (pd.getUnitOfMeasure() != null)
			this.unitOfMeasure = new UnitOfMeasure(pd.getUnitOfMeasure());
	}

	public void setSyncAlert(boolean syncAlert) {
		this.syncAlert = syncAlert;
	}

	public boolean getSyncAlert() {
		return syncAlert;
	}

	public void setDropDownType(String dropDownType) {
		this.dropDownType = dropDownType;
	}

	public String getDropDownType() {
		return dropDownType;
	}

	public boolean getShowQuantity() {
		return showQuantity;
	}

	public void setShowQuantity(boolean showQuantity) {
		this.showQuantity = showQuantity;
	}

	public boolean getShowText() {
		return showText;
	}

	public void setShowText(boolean showText) {
		this.showText = showText;
	}

	public boolean getShowBrand() {
		return showBrand;
	}

	public void setShowBrand(boolean showBrand) {
		this.showBrand = showBrand;
	}

	public boolean getShowUOM() {
		return showUOM;
	}

	public void setShowUOM(boolean showUOM) {
		this.showUOM = showUOM;
	}

	public boolean getShowFormat() {
		return showFormat;
	}

	public void setShowFormat(boolean showFormat) {
		this.showFormat = showFormat;
	}

	public void setShowRoomNumber(boolean showRoomNumber) {
		this.showRoomNumber = showRoomNumber;
	}

	public boolean getShowRoomNumber() {
		return showRoomNumber;
	}

	public boolean elementCodeMatch(String eleCodeList, String eleCode) {
		boolean _equals;
		String testCodeList = elementCodeList.trim();
		_equals = testCodeList.equals(eleCodeList) && elementCode.equals(eleCode);
		return _equals;
	}

	public void setShowAvailability(boolean showAvailability) {
		this.showAvailability = showAvailability;
	}

	public boolean getShowAvailability() {
		return showAvailability;
	}

	public boolean getEditAvailability() {
		return editAvailability;
	}

	public void setEditAvailability(boolean editAvailability) {
		this.editAvailability = editAvailability;
	}

	public boolean getEditQuantity() {
		return editQuantity;
	}

	public void setEditQuantity(boolean editQuantity) {
		this.editQuantity = editQuantity;
	}

	public boolean getEditText() {
		return editText;
	}

	public void setEditText(boolean editText) {
		this.editText = editText;
	}

	public boolean getEditBrand() {
		return editBrand;
	}

	public void setEditBrand(boolean editBrand) {
		this.editBrand = editBrand;
	}

	public boolean getEditUOM() {
		return editUOM;
	}

	public void setEditUOM(boolean editUOM) {
		this.editUOM = editUOM;
	}

	public boolean getEditFormat() {
		return editFormat;
	}

	public void setEditFormat(boolean editFormat) {
		this.editFormat = editFormat;
	}

	public void setShow(boolean show) {
		this.show = show;
	}

	public boolean getShow() {
		return show;
	}

}
