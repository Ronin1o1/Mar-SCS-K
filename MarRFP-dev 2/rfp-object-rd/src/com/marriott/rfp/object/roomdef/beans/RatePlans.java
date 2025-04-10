/**
 * RoomTypes.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

public class RatePlans implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RatePlan[] ratePlan;

    public RatePlans() {
    }

    public RatePlan[] getRatePlan() {
        return ratePlan;
    }

    public void setRatePlan(RatePlan[] ratePlan) {
        this.ratePlan = ratePlan;
    }

    public RatePlan getRatePlan(int i) {
        return ratePlan[i];
    }

    public void setRatePlan(int i, RatePlan value) {
        this.ratePlan[i] = value;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RatePlans))
            return false;
        RatePlans other = (RatePlans) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((ratePlan == null && other.getRatePlan() == null) || (ratePlan != null && java.util.Arrays.equals(ratePlan, other
                .getRatePlan())));
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
        if (getRatePlan() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRatePlan()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRatePlan(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RatePlans.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("ratePlan");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlan"));
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
    public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
    }

}
