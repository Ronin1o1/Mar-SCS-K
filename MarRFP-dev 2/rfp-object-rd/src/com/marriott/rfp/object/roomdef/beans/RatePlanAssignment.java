/**
 * RatePlan.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;


public class RatePlanAssignment implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String ratePlanCode; // attribute
    private String ratePlanName;//attribute
    private String lockedLevel;
    private String managed;
    private RateProductDefinitions[] rateProductDefinitions;
    
    public RatePlanAssignment() {
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
        if (!(obj instanceof RatePlanAssignment))
            return false;
        RatePlanAssignment other = (RatePlanAssignment) obj;
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
                && ((rateProductDefinitions == null && other.getRateProductDefinitions() == null) || (rateProductDefinitions != null && java.util.Arrays.equals(rateProductDefinitions, other
                        .getRateProductDefinitions())))
                && ((lockedLevel == null && other.getLockedLevel() == null) || (lockedLevel != null && lockedLevel.equals(other.getLockedLevel())))
                && ((managed == null && other.getManaged() == null) || (managed != null && managed.equals(other.getManaged())))
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
        if (getLockedLevel() != null) {
            _hashCode += getLockedLevel().hashCode();
        }
        if (getManaged() != null) {
            _hashCode += getManaged().hashCode();
        }
        if (getRateProductDefinitions() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRateProductDefinitions()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRateProductDefinitions(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RatePlanAssignment.class);

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

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("lockedLevel");
        field.setXmlName(new javax.xml.namespace.QName("", "LockedLevel"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("managed");
        field.setXmlName(new javax.xml.namespace.QName("", "Managed"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("rateProductDefinitions");
        ele.setXmlName(new javax.xml.namespace.QName("", "RateProductDefinitions"));
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
        return  new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new  MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * @return Returns the ratePlanName.
     */
    public String getRatePlanName() {
        return ratePlanName;
    }

    public void setRatePlanName(String ratePlanName) {
        this.ratePlanName= ratePlanName;
    }

    /**
     * @param ratePlanName
     *                   The ratePlanName to set.
     */
   
    /**
     * @return Returns the level.
     */
    public String getLockedLevel() {
        return lockedLevel;
    }
    /**
     * @param level The level to set.
     */
    public void setLockedLevel(String lockedLevel) {
        this.lockedLevel = lockedLevel;
    }
    
    /**
     * @return Returns the managed.
     */
    public String getManaged() {
        return managed;
    }
    /**
     * @param managed The managed to set.
     */
    public void setManaged(String managed) {
        this.managed = managed;
    }
    
    public RateProductDefinitions[] getRateProductDefinitions() {
        return rateProductDefinitions;
    }

    /**
     * @param descriptions
     */
    public void setRateProductDefinitions(RateProductDefinitions[] descriptions) {
        rateProductDefinitions = descriptions;
    }

    public RateProductDefinitions getRateProductDefinitions(int i) {
        return rateProductDefinitions[i];
    }

    public void setRateProductDefinitions(int i, RateProductDefinitions value) {
        this.rateProductDefinitions[i] = value;
    }
    
}
