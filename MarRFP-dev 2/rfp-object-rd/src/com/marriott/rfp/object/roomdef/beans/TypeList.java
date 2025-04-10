/**
 * Brands
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class TypeList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String typeListName; // attribute
	private java.lang.String typeListCode; // attribute
	private Type[] type;

	public TypeList() {
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof TypeList))
			return false;
		TypeList other = (TypeList) obj;
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
				&& ((type == null && other.getType() == null) || (type != null && java.util.Arrays.equals(type, other.getType())));
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
		if (getType() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getType()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getType(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(TypeList.class);

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

		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("type");
		field.setXmlName(new javax.xml.namespace.QName("", "Type"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
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
	public java.lang.String getTypeListName() {
		return typeListName;
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
	public void setTypeListName(java.lang.String string) {
		typeListName = string;
	}
	/**
	 * @return
	 */
	public Type[] getType() {
		return type;
	}

	public void setType(Type[] type) {
		this.type = type;
	}

	public Type getType(int i) {
		return type[i];
	}

	public void setType(int i, Type value) {
		this.type[i] = value;
	}


}
