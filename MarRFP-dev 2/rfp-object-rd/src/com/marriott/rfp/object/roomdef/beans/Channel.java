/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class Channel implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String name; // attribute
	private java.lang.String code; // attribute
	private java.lang.String number; // attribute
	private Languages languages;
	
	public Channel() {
	}

    public Channel(String name, String code, String number) {
		this.name=name;
		this.code=code;
		this.number=number;
	}
	
	public Channel(Channel ch) {
		copyInto(ch);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Channel))
			return false;
		Channel other = (Channel) obj;
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
				&& ((name == null && other.getName() == null) || (name != null && name.equals(other.getName())))
				&& ((code == null && other.getCode() == null) || (code != null && code.equals(other.getCode())))
				&& ((number == null && other.getNumber() == null) || (number != null && number.equals(other.getNumber())))
				&& ((languages == null && other.getLanguages() == null) || (languages != null && languages.equals(other.getLanguages())));
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
		if (getName() != null) {
			_hashCode += getName().hashCode();
		}
		if (getCode() != null) {
			_hashCode += getCode().hashCode();
		}
		if (getNumber() != null) {
			_hashCode += getNumber().hashCode();
		}
		if (getLanguages() != null) {
			_hashCode += getLanguages().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Channel.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("name");
		field.setXmlName(new javax.xml.namespace.QName("", "Name"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("code");
		field.setXmlName(new javax.xml.namespace.QName("", "Code"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("number");
		field.setXmlName(new javax.xml.namespace.QName("", "Number"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		
		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("languages");
		ele.setXmlName(new javax.xml.namespace.QName("", "Languages"));
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
	public java.lang.String getName() {
		return name;
	}

	/**
	 * @return
	 */
	public java.lang.String getNumber() {
		return number;
	}
    
	/**
	 * @return
	 */
	public Languages getLanguages() {
		return languages;
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
	public void setName(java.lang.String string) {
		name = string;
	}

	/**
	 * @param string
	 */
	public void setNumber(java.lang.String string) {
		number = string;
	}
	
	/**
	 * @param string
	 */
	public void setLanguages(Languages lgs) {
		languages = lgs;
	}
	
	public void copyInto(Channel ch) {
		this.setCode(ch.getCode());
		this.setNumber(ch.getNumber());
		this.setName(ch.getName());
		this.setLanguages(ch.getLanguages());
	}
}
