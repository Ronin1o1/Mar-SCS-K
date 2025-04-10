/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.hotelinvcount;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Inventories implements java.io.Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String hotelCode;
    private Inventory[] inventory;

    public Inventories() {
    }

    public Inventory[] getInventory() {
	return inventory;
    }

    public void setInventory(Inventory[] inventory) {
	this.inventory = inventory;
    }

    public Inventory getInventory(int i) {
	return inventory[i];
    }

    public void setInventory(int i, Inventory value) {
	this.inventory[i] = value;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
    public synchronized boolean equals(java.lang.Object obj) {
	if (!(obj instanceof Inventories))
	    return false;
	Inventories other = (Inventories) obj;
	if (obj == null)
	    return false;
	if (this == obj)
	    return true;
	if (__equalsCalc != null) {
	    return (__equalsCalc == obj);
	}
	__equalsCalc = obj;
	boolean _equals;
	_equals = true
		&& ((hotelCode == null && other.getHotelCode() == null) || (hotelCode != null && hotelCode.equals(other.getHotelCode())))
		&& ((inventory == null && other.getInventory() == null) || (inventory != null && java.util.Arrays.equals(inventory,
			other.getInventory())));
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
	if (getHotelCode() != null) {
	    _hashCode += getHotelCode().hashCode();
	}
	if (getInventory() != null) {
	    for (int i = 0; i < java.lang.reflect.Array.getLength(getInventory()); i++) {
		java.lang.Object obj = java.lang.reflect.Array.get(getInventory(), i);
		if (obj != null && !obj.getClass().isArray()) {
		    _hashCode += obj.hashCode();
		}
	    }
	}
	__hashCodeCalc = false;
	return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Inventories.class);

    static {
	org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
	field.setFieldName("hotelCode");
	field.setXmlName(new javax.xml.namespace.QName("", "HotelCode"));
	field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
	typeDesc.addFieldDesc(field);

	field = new org.apache.axis.description.ElementDesc();
	field.setFieldName("inventory");
	field.setXmlName(new javax.xml.namespace.QName("", "Inventory"));
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
    public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
	    javax.xml.namespace.QName _xmlType) {
	return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    @SuppressWarnings("unchecked")
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
	    javax.xml.namespace.QName _xmlType) {
	return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

    public void setHotelCode(String hotelCode) {
	this.hotelCode = hotelCode;
    }

    public String getHotelCode() {
	return hotelCode;
    }

}
