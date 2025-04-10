/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class BrandsList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Brands[] brands;

	public BrandsList() {
	}

	public Brands[] getBrands() {
		return brands;
	}

	public void setBrands(Brands[] brands) {
		this.brands = brands;
	}

	public Brands getBrands(int i) {
			return brands[i];
		}

		public void setBrands(int i, Brands value) {
			this.brands[i] = value;
		}
	
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof BrandsList))
			return false;
		BrandsList other = (BrandsList) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((brands == null && other.getBrands() == null) || (brands != null && java.util.Arrays.equals(brands, other.getBrands())));
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
		if (getBrands() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getBrands()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getBrands(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(BrandsList.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("brands");
		field.setXmlName(new javax.xml.namespace.QName("", "Brands"));
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
