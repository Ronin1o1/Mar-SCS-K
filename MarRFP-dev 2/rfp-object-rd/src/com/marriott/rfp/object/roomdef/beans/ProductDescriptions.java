/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class ProductDescriptions implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String elementTypeName; // attribute
	private java.lang.String elementTypeCode; // attribute
	private java.lang.String elementGroupName; // attribute
	private java.lang.String elementGroupCode; // attribute
	private java.lang.String elementCodeList; // attribute
	private java.lang.String elementCode; // attribute
	private java.lang.String calloutInd; //attribute
	private ProductDescription[] productDescription;

	public ProductDescriptions() {
	}

	public ProductDescriptions(ProductDescriptions pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof ProductDescriptions))
			return false;
		ProductDescriptions other = (ProductDescriptions) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals =
			true
				&& ((elementTypeName == null && other.getElementTypeName() == null)
					|| (elementTypeName != null && elementTypeName.equals(other.getElementTypeName())))
				&& ((elementTypeCode == null && other.getElementTypeCode() == null)
					|| (elementTypeCode != null && elementTypeCode.equals(other.getElementTypeCode())))
				&& ((elementGroupName == null && other.getElementGroupName() == null)
					|| (elementGroupName != null && elementGroupName.equals(other.getElementGroupName())))
				&& ((elementGroupCode == null && other.getElementGroupCode() == null)
					|| (elementGroupCode != null && elementGroupCode.equals(other.getElementGroupCode())))
				&& ((elementCodeList == null && other.getElementCodeList() == null)
					|| (elementCodeList != null && elementCodeList.equals(other.getElementCodeList())))
				&& ((elementCode == null && other.getElementCode() == null) || (elementCode != null && elementCode.equals(other.getElementCode())))
				&& ((productDescription == null && other.getProductDescription() == null)
					|| (productDescription != null && productDescription.equals(other.getProductDescription())));
		__equalsCalc = null;
		return _equals;
	}

	/*
	 *  returns true if the attributes are equal.  The elements are not compared
	 */
	public synchronized boolean attributesEquals(java.lang.Object obj) {
		if (!(obj instanceof ProductDescriptions))
			return false;
		ProductDescriptions other = (ProductDescriptions) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals =
			true
				&& ((elementTypeName == null && other.getElementTypeName() == null)
					|| (elementTypeName != null && elementTypeName.equals(other.getElementTypeName())))
				&& ((elementTypeCode == null && other.getElementTypeCode() == null)
					|| (elementTypeCode != null && elementTypeCode.equals(other.getElementTypeCode())))
				&& ((elementGroupName == null && other.getElementGroupName() == null)
					|| (elementGroupName != null && elementGroupName.equals(other.getElementGroupName())))
				&& ((elementGroupCode == null && other.getElementGroupCode() == null)
					|| (elementGroupCode != null && elementGroupCode.equals(other.getElementGroupCode())))
				&& ((elementCodeList == null && other.getElementCodeList() == null)
					|| (elementCodeList != null && elementCodeList.equals(other.getElementCodeList())))
				&& ((elementCode == null && other.getElementCode() == null) || (elementCode != null && elementCode.equals(other.getElementCode())))
				&& ((calloutInd == null && other.getCalloutInd() == null) || (calloutInd != null && calloutInd.equals(other.getCalloutInd())));
		__equalsCalc = null;
		return _equals;
	}

	private boolean __hashCodeCalc = false;
	@Override
	public synchronized int hashCode() {
		if (__hashCodeCalc) {
			return 0;
		}
		__hashCodeCalc = true;
		int _hashCode = 1;
		if (getElementTypeName() != null) {
			_hashCode += getElementTypeName().hashCode();
		}
		if (getElementTypeCode() != null) {
			_hashCode += getElementTypeCode().hashCode();
		}
		if (getElementGroupName() != null) {
			_hashCode += getElementGroupName().hashCode();
		}
		if (getElementGroupCode() != null) {
			_hashCode += getElementGroupCode().hashCode();
		}
		if (getElementCodeList() != null) {
			_hashCode += getElementCodeList().hashCode();
		}
		if (getElementCode() != null) {
			_hashCode += getElementCode().hashCode();
		}
		if (getCalloutInd() != null) {
			_hashCode += getCalloutInd().hashCode();
		}
		if (getProductDescription() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getProductDescription()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getProductDescription(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(ProductDescriptions.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementTypeName");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementTypeName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementTypeCode");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementTypeCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementGroupName");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementGroupName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementGroupCode");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementGroupCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementCodeList");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementCodeList"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("elementCodeList");
		field.setXmlName(new javax.xml.namespace.QName("", "ElementCodeList"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("calloutInd");
		field.setXmlName(new javax.xml.namespace.QName("", "CalloutInd"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("productDescription");
		ele.setXmlName(new javax.xml.namespace.QName("", "ProductDescription"));
		typeDesc.addFieldDesc(ele);

		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("productDescriptionEnhanced");
		ele.setXmlName(new javax.xml.namespace.QName("", "ProductDescriptionEnhanced"));
		ele.setMinOccurs(0);
		typeDesc.addFieldDesc(ele);

	};

	/**
	 * Return type metadata object
	 */
	public static org.apache.axis.description.TypeDesc getTypeDesc() {
		return typeDesc;
	}

	/**
	 * Get Custom Serializer
	 */
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
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

	public ProductDescription[] getProductDescription() {
		return productDescription;
	}

	/**
	 * @param descriptions
	 */
	public void setProductDescription(ProductDescription[] descriptions) {
		productDescription = descriptions;
	}

	public ProductDescription getProductDescription(int i) {
		return productDescription[i];
	}

	public void setProductDescription(int i, ProductDescription value) {
		this.productDescription[i] = value;
	}


	public void copyInto(ProductDescriptions pd) {
		this.setElementCode(pd.getElementCode());
		this.setElementCodeList(pd.getElementCodeList());
		this.setElementGroupCode(pd.getElementGroupCode());
		this.setElementGroupName(pd.getElementGroupName());
		this.setElementTypeCode(pd.getElementTypeCode());
		this.setElementTypeName(pd.getElementTypeName());

		ProductDescription[] origPD = pd.getProductDescription();
		if (origPD != null) {
			this.productDescription = new ProductDescription[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				ProductDescription newpd = new ProductDescription(origPD[i]);
				this.productDescription[i] = newpd;
			}
		}

	}

	public void copyIntoAttributes(ProductDescriptions pd) {
		this.setElementCode(pd.getElementCode());
		this.setElementCodeList(pd.getElementCodeList());
		this.setElementGroupCode(pd.getElementGroupCode());
		this.setElementGroupName(pd.getElementGroupName());
		this.setElementTypeCode(pd.getElementTypeCode());
		this.setElementTypeName(pd.getElementTypeName());
	}

	/**
	 * @return
	 */
	public java.lang.String getCalloutInd() {
		return calloutInd;
	}

	/**
	 * @param string
	 */
	public void setCalloutInd(java.lang.String string) {
		calloutInd = string;
	}

}
