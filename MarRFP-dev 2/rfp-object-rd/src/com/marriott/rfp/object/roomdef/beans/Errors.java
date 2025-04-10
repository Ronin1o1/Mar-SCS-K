/**
 * Errors.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Errors implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private  com.marriott.rfp.object.roomdef.beans.Error[] error;

	public Errors() {
	}

	
	/**
	 * @return
	 */
	public  com.marriott.rfp.object.roomdef.beans.Error[] getError() {
		return error;
	}

	/**
	 * @param formatses
	 */
	public void setError( com.marriott.rfp.object.roomdef.beans.Error[] value) {
		this.error = value;
	}



	public  com.marriott.rfp.object.roomdef.beans.Error getError(int i) {
		return error[i];
	}

	public void setError(int i,  com.marriott.rfp.object.roomdef.beans.Error value) {
		this.error[i] = value;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Errors))
			return false;
		Errors other = (Errors) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((error == null && other.getError() == null) || (error != null &&java.util.Arrays.equals(error, other.getError())));
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

		if (getError() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getError()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getError(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Errors.class);

	static {
		org.apache.axis.description.ElementDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("error");
		field.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error"));
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
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
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

}
