/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class Language implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String englishName; // attribute
	private java.lang.String code; // attribute
	private java.lang.String populated; // attribute

	public Language() {
	}

	public Language(Language lg) {
		super();
		copyInto(lg);
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Language))
			return false;
		Language other = (Language) obj;
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
				&& ((englishName == null && other.getEnglishName() == null) || (englishName != null && englishName.equals(other.getEnglishName())))
				&& ((code == null && other.getCode() == null) || (code != null && code.equals(other.getCode())))
				&& ((populated == null && other.getPopulated() == null) || (populated != null && populated.equals(other.getPopulated())));
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
		if (getEnglishName() != null) {
			_hashCode += getEnglishName().hashCode();
		}
		if (getCode() != null) {
			_hashCode += getCode().hashCode();
		}
		if (getPopulated() != null) {
			_hashCode += getPopulated().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Language.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("englishName");
		field.setXmlName(new javax.xml.namespace.QName("", "EnglishName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("code");
		field.setXmlName(new javax.xml.namespace.QName("", "Code"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("populated");
		field.setXmlName(new javax.xml.namespace.QName("", "Populated"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
	public java.lang.String getCode() {
		return code;
	}

	/**
	 * @return
	 */
	public java.lang.String getEnglishName() {
		return englishName;
	}

	/**
	 * @return
	 */
	public java.lang.String getPopulated() {
		return populated;
	}

	/**
	 * @param string
	 */
	public void setCode(java.lang.String string) {
		code = string;
	}

	/**
	 * @param string
	 */
	public void setEnglishName(java.lang.String string) {
		englishName = string;
	}

	/**
	 * @param string
	 */
	public void setPopulated(java.lang.String string) {
		populated = string;
	}

	public void copyInto(Language lg) {
		this.setCode(lg.getCode());
		this.setEnglishName(lg.getEnglishName());
		this.setPopulated(lg.getPopulated());
	
	}

}
