/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class DataDictionary implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ProductDescriptions[] productDescriptions;
	

	public DataDictionary() {
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof DataDictionary))
			return false;
		DataDictionary other = (DataDictionary) obj;
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
		&& ((productDescriptions == null && other.getProductDescriptions() == null) || (productDescriptions != null && java.util.Arrays.equals(productDescriptions, other.getProductDescriptions())));
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
		if (getProductDescriptions() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getProductDescriptions()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getProductDescriptions(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(DataDictionary.class);

	static {

		
		org.apache.axis.description.ElementDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("productDescriptions");
		field.setXmlName(new javax.xml.namespace.QName("", "ProductDescriptions"));
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
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
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
	public ProductDescriptions[] getProductDescriptions() {
		return productDescriptions;
	}

	/**
	 * @param descriptions
	 */
	public void setProductDescriptions(ProductDescriptions[] descriptions) {
		productDescriptions = descriptions;
	}

	public ProductDescriptions getProductDescriptions(int i) {
		return productDescriptions[i];
	}

	public void setProductDescriptions(int i, ProductDescriptions value) {
		this.productDescriptions[i] = value;
	}

}
