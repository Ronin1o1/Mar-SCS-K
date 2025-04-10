/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class DisplayDimensions implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String maxLines=""; // attribute
	private java.lang.String maxColumns=""; // attribute
	private java.lang.String mode=""; //attribute

	public DisplayDimensions() {
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof DisplayDimensions))
			return false;
		DisplayDimensions other = (DisplayDimensions) obj;
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
				&& ((maxLines == null && other.getMaxLines() == null) || (maxLines != null && maxLines.equals(other.getMaxLines())))
			&& ((maxColumns == null && other.getMaxColumns() == null) || (maxColumns != null && maxColumns.equals(other.getMaxColumns())))
		&& ((mode == null && other.getMode() == null) || (mode != null && mode.equals(other.getMode())));
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
		if (getMaxLines() != null) {
			_hashCode += getMaxLines().hashCode();
		}
		if (getMaxColumns() != null) {
			_hashCode += getMaxColumns().hashCode();
		}
		if (getMode() != null) {
			_hashCode += getMode().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(DisplayDimensions.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("maxLines");
		field.setXmlName(new javax.xml.namespace.QName("", "MaxLines"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("maxColumns");
		field.setXmlName(new javax.xml.namespace.QName("", "MaxColumns"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("mode");
		field.setXmlName(new javax.xml.namespace.QName("", "Mode"));
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
	public java.lang.String getMaxColumns() {
		return maxColumns;
	}

	/**
	 * @return
	 */
	public java.lang.String getMaxLines() {
		return maxLines;
	}

	/**
	 * @param string
	 */
	public void setMaxColumns(java.lang.String string) {
		maxColumns = string;
	}

	/**
	 * @param string
	 */
	public void setMaxLines(java.lang.String string) {
		maxLines = string;
	}

	/**
	 * @return
	 */
	public java.lang.String getMode() {
		return mode;
	}

	/**
	 * @param string
	 */
	public void setMode(java.lang.String string) {
		mode = string;
	}

}
