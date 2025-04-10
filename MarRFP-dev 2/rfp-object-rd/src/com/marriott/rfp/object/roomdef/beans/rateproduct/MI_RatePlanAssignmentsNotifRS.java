/**
 * MI_HotelRoomPoolListRS.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */
package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.RatePlans;
import com.marriott.rfp.object.roomdef.beans.Warnings;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_RatePlanAssignmentsNotifRS implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private BasicPropertyInfo basicPropertyInfo;
    private RatePlans[] ratePlans;
    private Errors errors;
    private Warnings warnings;

    public MI_RatePlanAssignmentsNotifRS() {
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public java.lang.String getEchoToken() {
        return echoToken;
    }

    public void setEchoToken(java.lang.String echoToken) {
        this.echoToken = echoToken;
    }

    public java.lang.String getVersion() {
        return version;
    }

    public void setVersion(java.lang.String version) {
        this.version = version;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MI_RatePlanAssignmentsNotifRS))
            return false;
        MI_RatePlanAssignmentsNotifRS other = (MI_RatePlanAssignmentsNotifRS) obj;
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
                && ((success == null && other.getSuccess() == null) || (success != null && success.equals(other.getSuccess())))
                && ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
                && ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())))
                && ((basicPropertyInfo == null && other.getBasicPropertyInfo() == null) || (basicPropertyInfo != null && basicPropertyInfo
                        .equals(other.getBasicPropertyInfo())))
                && ((ratePlans == null && other.getRatePlans() == null) || (ratePlans != null && java.util.Arrays.equals(ratePlans, other
                        .getRatePlans()))) && ((errors == null && other.getErrors() == null) || (errors != null && errors.equals(other.getErrors())))
                && ((warnings == null && other.getWarnings() == null) || (warnings != null && warnings.equals(other.getWarnings())));
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
        if (getEchoToken() != null) {
            _hashCode += getEchoToken().hashCode();
        }
        if (getVersion() != null) {
            _hashCode += getVersion().hashCode();
        }
        if (getBasicPropertyInfo() != null) {
            _hashCode += getBasicPropertyInfo().hashCode();
        }
        if (getRatePlans() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRatePlans()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRatePlans(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getErrors() != null) {
            _hashCode += getErrors().hashCode();
        }
        if (getWarnings() != null) {
            _hashCode += getWarnings().hashCode();
        }
        if (getSuccess() != null) {
            _hashCode += getSuccess().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_RatePlanAssignmentsNotifRS.class);
    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("echoToken");
        field.setXmlName(new javax.xml.namespace.QName("", "EchoToken"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("version");
        field.setXmlName(new javax.xml.namespace.QName("", "Version"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("success");
        field.setXmlName(new javax.xml.namespace.QName("", "Success"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("basicPropertyInfo");
        field.setXmlName(new javax.xml.namespace.QName("", "BasicPropertyInfo"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "BasicPropertyInfo"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("ratePlans");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlans"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlans"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("errors");
        field.setXmlName(new javax.xml.namespace.QName("", "Errors"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("warnings");
        field.setXmlName(new javax.xml.namespace.QName("", "Warnings"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Warnings"));
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
        return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

    public RatePlans[] getRatePlans() {
        return ratePlans;
    }

    public void setRatePlans(RatePlans[] ratePlans) {
        this.ratePlans = ratePlans;
    }

    public RatePlans getRatePlans(int i) {
        return ratePlans[i];
    }

    public void setRatePlans(int i, RatePlans value) {
        this.ratePlans[i] = value;
    }

    /**
     * @return
     */
    public Errors getErrors() {
        return errors;
    }

    public void setWarnings(Warnings warnings) {
        this.warnings = warnings;
    }

    /**
     * @return
     */
    public Warnings getWarnings() {
        return warnings;
    }

    /**
     * @param errors
     */
    public void setErrors(Errors errors) {
        this.errors = errors;
    }

    public BasicPropertyInfo getBasicPropertyInfo() {
        return basicPropertyInfo;
    }

    public void setBasicPropertyInfo(BasicPropertyInfo basicPropertyInfo) {
        this.basicPropertyInfo = basicPropertyInfo;
    }
}
