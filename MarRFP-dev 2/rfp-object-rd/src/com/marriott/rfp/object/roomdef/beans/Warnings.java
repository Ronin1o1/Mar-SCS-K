/**
 * Errors.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Warnings implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Warning warning;

	public Warnings() {
	}

	public Warning getWarning() {
		return warning;
	}

	public void setWarning(Warning warning) {
		this.warning = warning;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Warnings))
			return false;
		Warnings other = (Warnings) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((warning == null && other.getWarning() == null) || (warning != null && warning.equals(other.getWarning())));
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
		if (getWarning() != null) {
			_hashCode += getWarning().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Warnings.class);

	static {
		org.apache.axis.description.ElementDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("warning");
		field.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Warning"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Warning"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
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

}
