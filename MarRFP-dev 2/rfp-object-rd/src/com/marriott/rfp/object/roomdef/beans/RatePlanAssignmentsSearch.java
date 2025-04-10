/**
 * RatePlan.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;



public class RatePlanAssignmentsSearch implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String ratePlanCode; // attribute
    private String ratePlanName;//attribute
    private String startRatePlanCode; //attribute
    private String endRatePlanCode; //attribute
    private String startKey;
    private String endKey;
    private String count; //attribute
    private String searchCompleted;
    
    /**
     * @return Returns the searchCompleted.
     */
    public String getSearchCompleted() {
        return searchCompleted;
    }
    /**
     * @param searchCompleted The searchCompleted to set.
     */
    public void setSearchCompleted(String searchCompleted) {
        this.searchCompleted = searchCompleted;
    }
    public RatePlanAssignmentsSearch() {
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
        if (!(obj instanceof RatePlanAssignmentsSearch))
            return false;
        RatePlanAssignmentsSearch other = (RatePlanAssignmentsSearch) obj;
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
                && ((endRatePlanCode == null && other.getEndRatePlanCode() == null) || (endRatePlanCode != null && endRatePlanCode.equals(other.getEndRatePlanCode())))
                && ((startRatePlanCode == null && other.getStartRatePlanCode() == null) || (startRatePlanCode != null && startRatePlanCode.equals(other.getStartRatePlanCode())))
                && ((startKey == null && other.getStartKey() == null) || (startKey != null && startKey.equals(other.getStartKey())))
                && ((endKey == null && other.getEndKey() == null) || (endKey != null && endKey.equals(other.getEndKey())))
                && ((searchCompleted == null && other.getSearchCompleted() == null) || (searchCompleted != null && searchCompleted.equals(other.getSearchCompleted())))
                && ((count == null && other.getCount() == null) || (count != null && count.equals(other.getCount())))
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
        if (getEndRatePlanCode() != null) {
            _hashCode += getEndRatePlanCode().hashCode();
        }
        if (getStartRatePlanCode() != null) {
            _hashCode += getStartRatePlanCode().hashCode();
        }
        if (getEndKey() != null) {
            _hashCode += getEndKey().hashCode();
        }
        if (getStartKey() != null) {
            _hashCode += getStartKey().hashCode();
        }
        if (getSearchCompleted() != null) {
            _hashCode += getSearchCompleted().hashCode();
        }
        if (getCount() != null) {
            _hashCode += getCount().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RatePlanAssignmentsSearch.class);

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
        field.setFieldName("startRatePlanCode");
        field.setXmlName(new javax.xml.namespace.QName("", "StartRatePlanCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("endRatePlanCode");
        field.setXmlName(new javax.xml.namespace.QName("", "EndRatePlanCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("count");
        field.setXmlName(new javax.xml.namespace.QName("", "Count"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("startKey");
        field.setXmlName(new javax.xml.namespace.QName("", "StartKey"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("endKey");
        field.setXmlName(new javax.xml.namespace.QName("", "EndKey"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("searchCompleted");
        field.setXmlName(new javax.xml.namespace.QName("", "SearchCompleted"));
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
    public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return   new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
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
     * @return Returns the count.
     */
    public String getCount() {
        return count;
    }
    /**
     * @param count The count to set.
     */
    public void setCount(String count) {
        this.count = count;
    }
    /**
     * @return Returns the endRatePlanCode.
     */
    public String getEndRatePlanCode() {
        return endRatePlanCode;
    }
    /**
     * @param endRatePlanCode The endRatePlanCode to set.
     */
    public void setEndRatePlanCode(String endRatePlanCode) {
        this.endRatePlanCode = endRatePlanCode;
    }
    /**
     * @return Returns the startRatePlanCode.
     */
    public String getStartRatePlanCode() {
        return startRatePlanCode;
    }
    /**
     * @param startRatePlanCode The startRatePlanCode to set.
     */
    public void setStartRatePlanCode(String startRatePlanCode) {
        this.startRatePlanCode = startRatePlanCode;
    }
    /**
     * @return Returns the endKey.
     */
    public String getEndKey() {
        return endKey;
    }
    /**
     * @param endKey The endKey to set.
     */
    public void setEndKey(String endKey) {
        this.endKey = endKey;
    }
    /**
     * @return Returns the startKey.
     */
    public String getStartKey() {
        return startKey;
    }
    /**
     * @param startKey The startKey to set.
     */
    public void setStartKey(String startKey) {
        this.startKey = startKey;
    }
}
