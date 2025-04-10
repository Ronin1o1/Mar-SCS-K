/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_DisplayTextRSSerializer;

public class UnitOfMeasure implements java.io.Serializable, org.apache.axis.encoding.SimpleType {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String UOM_Type; // attribute
	private java.lang.String UOM_List; // attribute
	private java.lang.String UOM_Code; // attribute
	private java.lang.String UOM_Name; // attribute
	private java.lang.String value;

	public UnitOfMeasure() {
	}

	public UnitOfMeasure(UnitOfMeasure unitofmeasure) {
		copyInto(unitofmeasure);
	}

	// Simple Types must have a String constructor
	public UnitOfMeasure(java.lang.String value) {
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
		if (!(obj instanceof UnitOfMeasure))
			return false;
		UnitOfMeasure other = (UnitOfMeasure) obj;
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
				&& ((UOM_Type == null && other.getUOM_Type() == null) || (UOM_Type != null && UOM_Type.equals(other.getUOM_Type())))
				&& ((UOM_List == null && other.getUOM_List() == null) || (UOM_List != null && UOM_List.equals(other.getUOM_List())))
				&& ((UOM_Code == null && other.getUOM_Code() == null) || (UOM_Code != null && UOM_Code.equals(other.getUOM_Code())))
				&& ((UOM_Name == null && other.getUOM_Name() == null) || (UOM_Name != null && UOM_Name.equals(other.getUOM_Name())))
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
		if (getUOM_Type() != null) {
			_hashCode += getUOM_Type().hashCode();
		}
		if (getUOM_List() != null) {
			_hashCode += getUOM_List().hashCode();
		}
		if (getUOM_Code() != null) {
			_hashCode += getUOM_Code().hashCode();
		}
		if (getUOM_Name() != null) {
			_hashCode += getUOM_Name().hashCode();
		}
		if (getValue() != null) {
			_hashCode += getValue().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(UnitOfMeasure.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("UOM_Type");
		field.setXmlName(new javax.xml.namespace.QName("", "UOM_Type"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("UOM_List");
		field.setXmlName(new javax.xml.namespace.QName("", "UOM_List"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("UOM_Code");
		field.setXmlName(new javax.xml.namespace.QName("", "UOM_Code"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("UOM_Name");
		field.setXmlName(new javax.xml.namespace.QName("", "UOM_Name"));
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
		//return new org.apache.axis.encoding.ser.SimpleSerializer(_javaType, _xmlType, typeDesc);
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
	public java.lang.String getUOM_Code() {
		return UOM_Code;
	}

	/**
	 * @return
	 */
	public java.lang.String getUOM_List() {
		return UOM_List;
	}

	/**
	 * @return
	 */
	public java.lang.String getUOM_Name() {
		return UOM_Name;
	}

	/**
	 * @return
	 */
	public java.lang.String getUOM_Type() {
		return UOM_Type;
	}

	/**
	 * @param string
	 */
	public void setUOM_Code(java.lang.String string) {
		UOM_Code = string;
	}

	/**
	 * @param string
	 */
	public void setUOM_List(java.lang.String string) {
		UOM_List = string;
	}

	/**
	 * @param string
	 */
	public void setUOM_Name(java.lang.String string) {
		UOM_Name = string;
	}

	/**
	 * @param string
	 */
	public void setUOM_Type(java.lang.String string) {
		UOM_Type = string;
	}


	void copyInto(UnitOfMeasure unitofmeasure) {
		this.UOM_Code = unitofmeasure.UOM_Code;
		this.UOM_List = unitofmeasure.UOM_List;
		this.UOM_Name = unitofmeasure.UOM_Name;
		this.UOM_Type = unitofmeasure.UOM_Type;
		this.value = unitofmeasure.value;
	}

	void copyDataInto(UnitOfMeasure unitofmeasure) {
		this.UOM_Code = unitofmeasure.UOM_Code;
		this.value = unitofmeasure.value;
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
