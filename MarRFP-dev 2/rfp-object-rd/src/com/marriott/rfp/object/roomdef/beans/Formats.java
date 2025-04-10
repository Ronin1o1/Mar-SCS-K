/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Formats implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String formatType; // attribute
	private java.lang.String formatList; // attribute
	private java.lang.String formatCode; // attribute
	private java.lang.String formatName; // attribute
	private Format[] format;
	

	public Formats() {
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Formats))
			return false;
		Formats other = (Formats) obj;
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
				&& ((formatType == null && other.getFormatType() == null) || (formatType != null && formatType.equals(other.getFormatType())))
				&& ((formatList == null && other.getFormatList() == null) || (formatList != null && formatList.equals(other.getFormatList())))
		&& ((formatCode == null && other.getFormatCode() == null) || (formatCode != null && formatCode.equals(other.getFormatCode())))
		&& ((formatName == null && other.getFormatName() == null) || (formatName != null && formatName.equals(other.getFormatName())))
		&& ((format == null && other.getFormat() == null) || (format != null && java.util.Arrays.equals(format, other.getFormat())));
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
		if (getFormatType() != null) {
			_hashCode += getFormatType().hashCode();
		}
		if (getFormatList() != null) {
			_hashCode += getFormatList().hashCode();
		}
		if (getFormatCode() != null) {
			_hashCode += getFormatCode().hashCode();
		}
		if (getFormatName() != null) {
			_hashCode += getFormatName().hashCode();
		}
		if (getFormat() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getFormat()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getFormat(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Formats.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("formatType");
		field.setXmlName(new javax.xml.namespace.QName("", "FormatType"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("formatList");
		field.setXmlName(new javax.xml.namespace.QName("", "FormatList"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("formatCode");
		field.setXmlName(new javax.xml.namespace.QName("", "FormatCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("formatName");
		field.setXmlName(new javax.xml.namespace.QName("", "FormatName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("format");
		field.setXmlName(new javax.xml.namespace.QName("", "Format"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}


	/**
	 * @return
	 */
	public java.lang.String getFormatCode() {
		return formatCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getFormatList() {
		return formatList;
	}

	/**
	 * @return
	 */
	public java.lang.String getFormatName() {
		return formatName;
	}

	/**
	 * @return
	 */
	public java.lang.String getFormatType() {
		return formatType;
	}

	/**
	 * @param string
	 */
	public void setFormatCode(java.lang.String string) {
		formatCode = string;
	}

	/**
	 * @param string
	 */
	public void setFormatList(java.lang.String string) {
		formatList = string;
	}

	/**
	 * @param string
	 */
	public void setFormatName(java.lang.String string) {
		formatName = string;
	}

	/**
	 * @param string
	 */
	public void setFormatType(java.lang.String string) {
		formatType = string;
	}
	/**
	 * @return
	 */

	/**
	 * @return
	 */
	public Format[] getFormat() {
		return format;
	}

	/**
	 * @param formatses
	 */
	public void setFormat(Format[] formates) {
		format = formates;
	}



	public Format getFormat(int i) {
		return format[i];
	}

	public void setFormat(int i, Format value) {
		this.format[i] = value;
	}

}
