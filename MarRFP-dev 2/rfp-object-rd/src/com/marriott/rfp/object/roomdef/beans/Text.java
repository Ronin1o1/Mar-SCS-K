/**
 * Text.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;


import java.math.BigDecimal;

import com.marriott.rfp.object.roomdef.ser.MI_DisplayTextRSSerializer;

public class Text implements java.io.Serializable, org.apache.axis.encoding.SimpleType {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String value;
	private java.lang.String language; // attribute
	private BigDecimal maxLength; //attribute

    /**
     * @return Returns the maxLength.
     */
    public BigDecimal getMaxLength() {
        return maxLength;
    }
    /**
     * @param maxLength The maxLength to set.
     */
    public void setMaxLength(BigDecimal maxLength) {
        this.maxLength = maxLength;
    }
	public Text() {
	}

	public Text(Text text) {
		super();
		copyInto(text);
	}

	// Simple Types must have a String constructor
	public Text(java.lang.String value) {
		this.value = new java.lang.String(value);
	}

	// Simple Types must have a toString for serializing the value
	@Override
	public java.lang.String toString() {
		return value == null ? null : value.toString();
	}

	public java.lang.String getValue() {
		return value;
	}

	public void setValue(java.lang.String value) {
		this.value = value;
	}
	
	public java.lang.String getLanguage() {
		return language;
	}

	public void setLanguage(java.lang.String language) {
		this.language = language;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Text))
			return false;
		Text other = (Text) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((value == null && other.getValue() == null) || (value != null && value.equals(other.getValue()))) 
		                && ((language == null && other.getLanguage() == null) || (language != null && language.equals(other.getLanguage())))
        && ((maxLength == null && other.getMaxLength() == null) || (maxLength != null && maxLength.equals(other.getMaxLength())));
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
		if (getValue() != null) {
			_hashCode += getValue().hashCode();
		}
		if (getLanguage() != null) {
			_hashCode += getLanguage().hashCode();
		}
		if (getMaxLength() != null) {
			_hashCode += getMaxLength().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Text.class);

	static {
		
	    org.apache.axis.description.FieldDesc field  = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("language");
		field.setXmlName(new javax.xml.namespace.QName("", "Language"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("maxLength");
		field.setXmlName(new javax.xml.namespace.QName("", "MaxLength"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
		typeDesc.addFieldDesc(field);
		
		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("value");
		ele.setXmlName(new javax.xml.namespace.QName("", "value"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
		//return new org.apache.axis.encoding.ser.SimpleSerializer(_javaType, _xmlType, typeDesc);
		return new MI_DisplayTextRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.SimpleDeserializer(_javaType, _xmlType, typeDesc);
	}


	void copyInto(Text text) {
		this.value = text.value;
		this.language = text.language;
		this.maxLength = text.maxLength;
	}

	void copyDataInto(Text text) {
		this.value = text.value;
	}

}
