/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef;

import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;

public class ProductDescriptionsView implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String elementTypeName; // attribute
	private String elementTypeCode; // attribute
	private String elementGroupName; // attribute
	private String elementGroupCode; // attribute
	private String elementCodeList; // attribute
	private String elementCode; // attribute
	private String calloutInd; //attribute
	private Vector<ProductDescriptionView> productDescription;

	public ProductDescriptionsView() {
	}

	

	/**
	 * @return
	 */
	public String getElementGroupCode() {
		return elementGroupCode;
	}

	/**
	 * @return
	 */
	public String getElementGroupName() {
		return elementGroupName;
	}

	/**
	 * @return
	 */
	public String getElementTypeCode() {
		return elementTypeCode;
	}

	/**
	 * @return
	 */
	public String getElementTypeName() {
		return elementTypeName;
	}

	/**
	 * @param string
	 */
	public void setElementGroupCode(String string) {
		elementGroupCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementGroupName(String string) {
		elementGroupName = string;
	}

	/**
	 * @param string
	 */
	public void setElementTypeCode(String string) {
		elementTypeCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementTypeName(String string) {
		elementTypeName = string;
	}

	/**
	 * @return
	 */
	public String getElementCode() {
		return elementCode;
	}

	/**
	 * @return
	 */
	public String getElementCodeList() {
		return elementCodeList;
	}

	/**
	 * @param string
	 */
	public void setElementCode(String string) {
		elementCode = string;
	}

	/**
	 * @param string
	 */
	public void setElementCodeList(String string) {
		elementCodeList = string;
	}


	/**
	 * @return
	 */
	public String getCalloutInd() {
		return calloutInd;
	}

	/**
	 * @param string
	 */
	public void setCalloutInd(String string) {
		calloutInd = string;
	}



	public void setProductDescription(Vector<ProductDescriptionView> productDescription) {
		this.productDescription = productDescription;
	}



	public Vector<ProductDescriptionView> getProductDescription() {
		return productDescription;
	}

	public void copyAttributesInto(ProductDescriptions pds) {
		this.calloutInd=pds.getCalloutInd();
		this.elementCode=pds.getElementCode();
		this.elementCodeList=pds.getElementCodeList();
		this.elementGroupCode=pds.getElementGroupCode();
		this.elementGroupName=pds.getElementGroupName();
		this.elementTypeCode=pds.getElementTypeCode();
		this.elementTypeName=pds.getElementTypeName();
	}
	
	public void copyAttributesInto(ProductDescriptionsView pds) {
		this.calloutInd=pds.getCalloutInd();
		this.elementCode=pds.getElementCode();
		this.elementCodeList=pds.getElementCodeList();
		this.elementGroupCode=pds.getElementGroupCode();
		this.elementGroupName=pds.getElementGroupName();
		this.elementTypeCode=pds.getElementTypeCode();
		this.elementTypeName=pds.getElementTypeName();
	}

	public void copyInto(ProductDescriptionsView pdsv) {
		this.calloutInd=pdsv.getCalloutInd();
		this.elementCode=pdsv.getElementCode();
		this.elementCodeList=pdsv.getElementCodeList();
		this.elementGroupCode=pdsv.getElementGroupCode();
		this.elementGroupName=pdsv.getElementGroupName();
		this.elementTypeCode=pdsv.getElementTypeCode();
		this.elementTypeName=pdsv.getElementTypeName();
		productDescription = new Vector<ProductDescriptionView>();
		Vector<ProductDescriptionView> pdv = pdsv.getProductDescription();
		for (int i=0; i<pdv.size(); i++) {
			ProductDescriptionView pd = pdv.elementAt(i);
			ProductDescriptionView newpd = new ProductDescriptionView(pd);
			productDescription.add(newpd);
		}
	}
}
