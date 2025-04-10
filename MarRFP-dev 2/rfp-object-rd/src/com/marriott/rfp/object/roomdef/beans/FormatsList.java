/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class FormatsList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Formats[] formats;

	public FormatsList() {
	}

	public Formats[] getFormats() {
		return formats;
	}

	public void setFormats(Formats[] formats) {
		this.formats = formats;
	}

	public Formats getFormats(int i) {
			return formats[i];
		}

		public void setFormats(int i, Formats value) {
			this.formats[i] = value;
		}
	
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof FormatsList))
			return false;
		FormatsList other = (FormatsList) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((formats == null && other.getFormats() == null) || (formats != null && java.util.Arrays.equals(formats, other.getFormats())));
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
		if (getFormats() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getFormats()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getFormats(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(FormatsList.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("formats");
		field.setXmlName(new javax.xml.namespace.QName("", "Formats"));
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

}
