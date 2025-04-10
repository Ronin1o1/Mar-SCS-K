package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.RatePlan;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;


public class MI_DisplayRatePlanDescriptionRS implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private BasicPropertyInfo basicPropertyInfo;
    private RatePlan ratePlan;
    private Errors errors;

    public MI_DisplayRatePlanDescriptionRS() {
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MI_DisplayRatePlanDescriptionRS))
            return false;
        MI_DisplayRatePlanDescriptionRS other = (MI_DisplayRatePlanDescriptionRS) obj;
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
                && ((success  == null && other.getSuccess()  == null) || (success  != null && success.equals(other.getSuccess())))
                && ((echoToken== null && other.getEchoToken()== null) || (echoToken!= null && echoToken.equals(other.getEchoToken())))
                && ((version  == null && other.getVersion()  == null) || (version  != null && version.equals(other.getVersion())))
                && ((basicPropertyInfo == null && other.getBasicPropertyInfo() == null) || (basicPropertyInfo != null && basicPropertyInfo.equals(other.getBasicPropertyInfo())))
                && ((ratePlan == null && other.getRatePlan() == null) || (ratePlan != null && ratePlan.equals(other.getRatePlan())))
                && ((errors   == null && other.getErrors()   == null) || (errors   != null && errors.equals(other.getErrors())));
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
        if (getSuccess() != null)   { _hashCode += getSuccess().hashCode();   }
        if (getEchoToken() != null) { _hashCode += getEchoToken().hashCode(); }
        if (getVersion() != null)   { _hashCode += getVersion().hashCode();   }
        if (getBasicPropertyInfo() != null) { _hashCode += getBasicPropertyInfo().hashCode(); }
        if (getRatePlan() != null)  { _hashCode += getRatePlan().hashCode();  }
        if (getErrors() != null)    { _hashCode += getErrors().hashCode();    }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_DisplayRatePlanDescriptionRS.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("success");
        field.setXmlName(new javax.xml.namespace.QName("", "Success"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("echoToken");
        field.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "EchoToken"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("version");
        field.setXmlName(new javax.xml.namespace.QName("", "Version"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("basicPropertyInfo");
        ele.setXmlName(new javax.xml.namespace.QName("", "BasicPropertyInfo"));
        ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "BasicPropertyInfo"));
        typeDesc.addFieldDesc(ele);

        ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("ratePlan");
        ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlan"));
        ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlan"));
		typeDesc.addFieldDesc(ele);

		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("errors");
		ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors"));
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

    public BasicPropertyInfo getBasicPropertyInfo() {
        return basicPropertyInfo;
    }
    public void setBasicPropertyInfo(BasicPropertyInfo basicPropertyInfo) {
        this.basicPropertyInfo = basicPropertyInfo;
    }
    /**
     * @return Errors
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

    /**
     * @return RatePlan
     */
    public RatePlan getRatePlan() {
        return ratePlan;
    }

    /**
     * @param ratePlan
     */
    public void setRatePlan(RatePlan ratePlan) {
        this.ratePlan = ratePlan;
    }
}
