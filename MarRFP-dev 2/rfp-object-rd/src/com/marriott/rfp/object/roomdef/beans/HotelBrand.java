/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class HotelBrand implements java.io.Serializable, org.apache.axis.encoding.SimpleType  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String brandCode; // attribute
	private java.lang.String brandName; // attribute
	private java.lang.String value;

	public HotelBrand() {
	}

	public HotelBrand(HotelBrand brand) {
		super();
		copyInto(brand);
	}

	// Simple Types must have a String constructor
	public HotelBrand(java.lang.String value) {
		this.value = new java.lang.String(value);
	}

	// Simple Types must have a toString for serializing the value
	@Override
	public java.lang.String toString() {
		return value == null ? null : value.toString();
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof HotelBrand))
			return false;
		HotelBrand other = (HotelBrand) obj;
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
				&& ((brandCode == null && other.getBrandCode() == null) || (brandCode != null && brandCode.equals(other.getBrandCode())))
				&& ((brandName == null && other.getBrandName() == null) || (brandName != null && brandName.equals(other.getBrandName())))
		&& ((value == null && other.getValue() == null) || (value != null && value.equals(other.getValue())));
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
		if (getBrandCode() != null) {
			_hashCode += getBrandCode().hashCode();
		}
		if (getBrandName() != null) {
			_hashCode += getBrandName().hashCode();
		}
		if (getValue() != null) {
			_hashCode += getValue().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(HotelBrand.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandCode");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandName");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("value");
		ele.setXmlName(new javax.xml.namespace.QName("", "value"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
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
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * @return
	 */
	public java.lang.String getBrandCode() {
		return brandCode;
	}


	/**
	 * @return
	 */
	public java.lang.String getBrandName() {
		return brandName;
	}


	/**
	 * @param string
	 */
	public void setBrandCode(java.lang.String string) {
		brandCode = string;
	}


	/**
	 * @param string
	 */
	public void setBrandName(java.lang.String string) {
		brandName = string;
	}



	void copyInto(HotelBrand brand) {
		this.brandCode = brand.brandCode;
		this.brandName = brand.brandName;
		this.value=brand.value;
	}

	void copyDataInto(HotelBrand brand) {
		this.brandCode = brand.brandCode;
		this.brandName = brand.brandName;
		this.value=brand.value;
	}

	/**
	 * @return
	 */
	public java.lang.String getValue() {
		return value;
	}

	/**
	 * @param string
	 */
	public void setValue(java.lang.String string) {
		value = string;
	}

}
