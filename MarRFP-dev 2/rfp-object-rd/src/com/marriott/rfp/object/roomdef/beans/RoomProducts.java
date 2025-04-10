/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomProducts implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RoomProduct[] roomProduct;

	public RoomProducts() {
	}

	public RoomProducts(RoomProducts rp) {
		super();
		copyInto(rp);
	}

	public RoomProduct[] getRoomProduct() {
		return roomProduct;
	}

	public void setRoomProduct(RoomProduct[] roomProduct) {
		this.roomProduct = roomProduct;
	}

	public RoomProduct getRoomProduct(int i) {
		return roomProduct[i];
	}

	public void setRoomProduct(int i, RoomProduct value) {
		this.roomProduct[i] = value;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RoomProducts))
			return false;
		RoomProducts other = (RoomProducts) obj;
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
				&& ((roomProduct == null && other.getRoomProduct() == null)
					|| (roomProduct != null && java.util.Arrays.equals(roomProduct, other.getRoomProduct())));
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
		if (getRoomProduct() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRoomProduct()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRoomProduct(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomProducts.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("roomProduct");
		field.setXmlName(new javax.xml.namespace.QName("", "RoomProduct"));
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
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
	}


	public void copyInto(RoomProducts rp) {
		RoomProduct[] origRP = rp.getRoomProduct();
		this.roomProduct = new RoomProduct[origRP.length];
		for (int i = 0; i < origRP.length; i++) {
			RoomProduct newrp = new RoomProduct(origRP[i]);
			this.roomProduct[i] = newrp;
		}

	}
}
