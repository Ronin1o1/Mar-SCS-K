package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentsSearch;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;


public class MI_RatePlanAssignmentListRS implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private BasicPropertyInfo basicPropertyInfo;
    private RatePlanAssignmentsSearch ratePlanAssignmentsSearch;
    private RatePlanAssignmentList ratePlanAssignmentList;
    private Errors errors;

    public MI_RatePlanAssignmentListRS() {
    }

    /**
     * @return Returns the ratePlanAssignmentsSearch.
     */
    public RatePlanAssignmentsSearch getRatePlanAssignmentsSearch() {
        return ratePlanAssignmentsSearch;
    }
    /**
     * @param ratePlanAssignmentsSearch The ratePlanAssignmentsSearch to set.
     */
    public void setRatePlanAssignmentsSearch(
            RatePlanAssignmentsSearch ratePlanAssignmentsSearch) {
        this.ratePlanAssignmentsSearch = ratePlanAssignmentsSearch;
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
        if (!(obj instanceof MI_RatePlanAssignmentListRS))
            return false;
        MI_RatePlanAssignmentListRS other = (MI_RatePlanAssignmentListRS) obj;
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
                && ((ratePlanAssignmentList == null && other.getRatePlanAssignmentList() == null) || (ratePlanAssignmentList != null && ratePlanAssignmentList.equals(other.getRatePlanAssignmentList())))
                && ((ratePlanAssignmentsSearch == null && other.getRatePlanAssignmentsSearch() == null) || (ratePlanAssignmentsSearch != null && ratePlanAssignmentsSearch.equals(other.getRatePlanAssignmentsSearch())))
                && ((errors == null && other.getErrors() == null) || (errors != null && errors.equals(other.getErrors())));
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
        if (getRatePlanAssignmentsSearch() != null) {
            _hashCode += getRatePlanAssignmentsSearch().hashCode();
        }
        if (getRatePlanAssignmentList() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRatePlanAssignmentList()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRatePlanAssignmentList(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getErrors() != null) {
            _hashCode += getErrors().hashCode();
        }
        if (getSuccess() != null) {
            _hashCode += getSuccess().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_RatePlanAssignmentListRS.class);

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
        field.setFieldName("ratePlanAssignmentsSearch");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlanAssignmentsSearch"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlanAssignmentsSearch"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("ratePlanAssignmentList");
        field.setXmlName(new javax.xml.namespace.QName("", "RatePlanAssignmentList"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlanAssignmentList"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("errors");
        field.setXmlName(new javax.xml.namespace.QName("", "Errors"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors"));
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

    /**
     * @return Returns the ratePlans.
     */
    public RatePlanAssignmentList getRatePlanAssignmentList() {
        return ratePlanAssignmentList;
    }

    /**
     * @param ratePlans
     *                   The ratePlans to set.
     */
    public void setRatePlanAssignmentList(RatePlanAssignmentList ratePlanAssignmentList) {
        this.ratePlanAssignmentList = ratePlanAssignmentList;
    }

    /**
     * @return
     */
    public Errors getErrors() {
        return errors;
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
