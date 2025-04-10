/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomProduct implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String roomTypeCode; // attribute
	private java.lang.String ratePlanCode; // attribute
	private 	ProductDescriptions[] productDescriptions;


	public RoomProduct() {
	}

	public RoomProduct(RoomProduct rp){
		super();
		copyInto(rp);
	}
	
	public java.lang.String getRoomTypeCode() {
		return roomTypeCode;
	}

	public void setRoomTypeCode(java.lang.String roomTypeCode) {
		this.roomTypeCode = roomTypeCode;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RoomProduct))
			return false;
		RoomProduct other = (RoomProduct) obj;
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
				&& ((roomTypeCode == null && other.getRoomTypeCode() == null) || (roomTypeCode != null && roomTypeCode.equals(other.getRoomTypeCode())))
				&& ((ratePlanCode == null && other.getRatePlanCode() == null) || (ratePlanCode != null && ratePlanCode.equals(other.getRatePlanCode())))
		&& ((productDescriptions == null && other.getProductDescriptions() == null) || (productDescriptions != null && java.util.Arrays.equals(productDescriptions, other.getProductDescriptions())));
		__equalsCalc = null;
		return _equals;
	}

/*
 *  returns true if the attributes are equal.  The elements are not compared
 */
	public synchronized boolean attributesEquals(java.lang.Object obj) {
		if (!(obj instanceof RoomProduct))
			return false;
		RoomProduct other = (RoomProduct) obj;
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
				&& ((roomTypeCode == null && other.getRoomTypeCode() == null) || (roomTypeCode != null && roomTypeCode.equals(other.getRoomTypeCode())))
				&& ((ratePlanCode == null && other.getRatePlanCode() == null) || (ratePlanCode != null && ratePlanCode.equals(other.getRatePlanCode())));
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
		if (getRoomTypeCode() != null) {
			_hashCode += getRoomTypeCode().hashCode();
		}
		if (getRatePlanCode() != null) {
			_hashCode += getRatePlanCode().hashCode();
		}
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
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomProduct.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("roomTypeCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RoomTypeCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("ratePlanCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RatePlanCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
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
	public java.lang.String getRatePlanCode() {
		return ratePlanCode;
	}

	/**
	 * @param string
	 */
	public void setRatePlanCode(java.lang.String string) {
		ratePlanCode = string;
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


	public void copyInto(RoomProduct rp){
		this.ratePlanCode=rp.ratePlanCode;
		this.ratePlanCode=rp.roomTypeCode;

		ProductDescriptions[] origPD=rp.getProductDescriptions();
		this.productDescriptions=new ProductDescriptions[origPD.length];
		for (int i=0; i<origPD.length;i++) {
			ProductDescriptions newpd=new ProductDescriptions(origPD[i]);
			this.productDescriptions[i]=newpd;
		}
		
	}
}
