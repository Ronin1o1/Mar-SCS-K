/**
 * BasicPropertyInfo.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class BasicPropertyInfo implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String hotelCode; // attribute
    private java.lang.String brandCode; // attribute

    public BasicPropertyInfo() {
    }

    public java.lang.String getHotelCode() {
        return hotelCode;
    }

    public void setHotelCode(java.lang.String hotelCode) {
        this.hotelCode = hotelCode;
    }

    public java.lang.String getBrandCode() {
        return brandCode;
    }

    public void setBrandCode(java.lang.String brandCode) {
        this.brandCode = brandCode;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof BasicPropertyInfo))
            return false;
        BasicPropertyInfo other = (BasicPropertyInfo) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((hotelCode == null && other.getHotelCode() == null) || (hotelCode != null && hotelCode.equals(other.getHotelCode())))
                && ((brandCode == null && other.getBrandCode() == null) || (brandCode != null && brandCode.equals(other.getBrandCode())));
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

        if (getBrandCode() != null) {
            _hashCode += getBrandCode().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(BasicPropertyInfo.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("hotelCode");
        field.setXmlName(new javax.xml.namespace.QName("", "HotelCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("brandCode");
        field.setXmlName(new javax.xml.namespace.QName("", "BrandCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
        //      return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType,
        // _xmlType, typeDesc);
        return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

}
