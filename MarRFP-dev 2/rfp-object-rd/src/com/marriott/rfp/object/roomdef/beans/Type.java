/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_DisplayTextRSSerializer;

public class Type implements java.io.Serializable, org.apache.axis.encoding.SimpleType  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String typeListName; // attribute
	private java.lang.String typeListCode; // attribute
	private java.lang.String typeCode; // attribute
	private java.lang.String typeName; // attribute
	private java.lang.String value;

	public Type() {
	}

	public Type(Type type) {
		super();
		copyInto(type);
	}

	// Simple Types must have a String constructor
	public Type(java.lang.String value) {
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
		if (!(obj instanceof Type))
			return false;
		Type other = (Type) obj;
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
				&& ((typeListName == null && other.getTypeListName() == null) || (typeListName != null && typeListName.equals(other.getTypeListName())))
				&& ((typeListCode == null && other.getTypeListCode() == null) || (typeListCode != null && typeListCode.equals(other.getTypeListCode())))
				&& ((typeCode == null && other.getTypeCode() == null) || (typeCode != null && typeCode.equals(other.getTypeCode())))
				&& ((typeName == null && other.getTypeName() == null) || (typeName != null && typeName.equals(other.getTypeName())))
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
		if (getTypeListName() != null) {
			_hashCode += getTypeListName().hashCode();
		}
		if (getTypeListCode() != null) {
			_hashCode += getTypeListCode().hashCode();
		}
		if (getTypeCode() != null) {
			_hashCode += getTypeCode().hashCode();
		}
		if (getTypeName() != null) {
			_hashCode += getTypeName().hashCode();
		}
		if (getValue() != null) {
			_hashCode += getValue().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Type.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("typeListName");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeListName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("typeListCode");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeListCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("typeCode");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("typeName");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeName"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
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

	/**
	 * @return
	 */
	public java.lang.String getTypeCode() {
		return typeCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getTypeListCode() {
		return typeListCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getTypeName() {
		return typeName;
	}

	/**
	 * @return
	 */
	public java.lang.String getTypeListName() {
		return typeListName;
	}

	/**
	 * @param string
	 */
	public void setTypeCode(java.lang.String string) {
		typeCode = string;
	}

	/**
	 * @param string
	 */
	public void setTypeListCode(java.lang.String string) {
		typeListCode = string;
	}

	/**
	 * @param string
	 */
	public void setTypeName(java.lang.String string) {
		typeName = string;
	}

	/**
	 * @param string
	 */
	public void setTypeListName(java.lang.String string) {
		typeListName = string;
	}

	
	void copyInto(Type type) {
		this.typeCode = type.typeCode;
		this.typeListCode = type.typeListCode;
		this.typeName = type.typeName;
		this.typeListName = type.typeListName;
		this.value=type.value;
	}

	void copyDataInto(Type type) {
		this.typeCode = type.typeCode;
		this.typeName = type.typeName;
		this.value=type.value;
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
