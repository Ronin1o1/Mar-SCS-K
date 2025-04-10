/**
 * RatePlan.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;


public class RatePlan implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String ratePlanCode; // attribute
    private String ratePlanName;//attribute
    private Description description;
    
    public RatePlan() {
    }

    public java.lang.String getRatePlanCode() {
        return ratePlanCode;
    }

    public void setRatePlanCode(java.lang.String ratePlanCode) {
        this.ratePlanCode = ratePlanCode;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RatePlan))
            return false;
        RatePlan other = (RatePlan) obj;
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
                && ((ratePlanCode == null && other.getRatePlanCode() == null) || (ratePlanCode != null && ratePlanCode.equals(other.getRatePlanCode())))
                && ((ratePlanName == null && other.getRatePlanName() == null) || (ratePlanName != null && ratePlanName.equals(other.getRatePlanName())))
                && ((description == null && other.getDescription() == null) || (description != null && description.equals(other.getDescription())))
;
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
        if (getRatePlanCode() != null) {
            _hashCode += getRatePlanCode().hashCode();
        }
        if (getRatePlanName() != null) {
            _hashCode += getRatePlanName().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RatePlan.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("ratePlanCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlanCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("ratePlanName");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlanName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("description");
        ele.setXmlName(new javax.xml.namespace.QName("", "Description"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);
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

    /**
     * @return Returns the ratePlanName.
     */
    public String getRatePlanName() {
        return ratePlanName;
    }

    /**
     * @param ratePlanName
     *                   The ratePlanName to set.
     */
    public void setRatePlanName(String ratePlanName) {
        this.ratePlanName = ratePlanName;
    }

    /**
     * @return Returns the description.
     */
    public Description getDescription() {
        return description;
    }
    /**
     * @param description The description to set.
     */
    public void setDescription(Description description) {
        this.description = description;
    }
}
