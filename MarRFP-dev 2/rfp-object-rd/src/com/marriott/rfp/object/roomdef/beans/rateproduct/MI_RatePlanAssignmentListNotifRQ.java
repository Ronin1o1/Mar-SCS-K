package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;

/**
 * MI_RatePlanAssignmentListNotifRQ.java
 * 
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class MI_RatePlanAssignmentListNotifRQ implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.Object POS;
    private java.lang.Object basicPropertyInfo;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private RatePlanAssignmentList ratePlanAssignmentList;

    public MI_RatePlanAssignmentListNotifRQ() {
    }

    public java.lang.Object getPOS() {
        return POS;
    }

    public void setPOS(java.lang.Object POS) {
        this.POS = POS;
    }

    public java.lang.Object getBasicPropertyInfo() {
        return basicPropertyInfo;
    }

    public void setBasicPropertyInfo(java.lang.Object basicPropertyInfo) {
        this.basicPropertyInfo = basicPropertyInfo;
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

	/**
	 * @return Returns the ratePlanAssignmentList.
	 */
	public RatePlanAssignmentList getRatePlanAssignmentList() {
		return ratePlanAssignmentList;
	}
	/**
	 * @param ratePlanAssignmentList The ratePlanAssignmentList to set.
	 */
	public void setRatePlanAssignmentList(RatePlanAssignmentList ratePlanAssignmentList) {
		this.ratePlanAssignmentList = ratePlanAssignmentList;
	}

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MI_RatePlanAssignmentListNotifRQ))
            return false;
        MI_RatePlanAssignmentListNotifRQ other = (MI_RatePlanAssignmentListNotifRQ) obj;
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
                && ((POS == null && other.getPOS() == null)             || (POS != null && POS.equals(other.getPOS())))
                && ((basicPropertyInfo == null && other.getBasicPropertyInfo() == null)
                					|| (basicPropertyInfo != null && basicPropertyInfo.equals(other.getBasicPropertyInfo())))
                && ((ratePlanAssignmentList == null && other.getRatePlanAssignmentList() == null)
                					|| (ratePlanAssignmentList != null && ratePlanAssignmentList.equals(other.getRatePlanAssignmentList())))
                && ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
                && ((version == null && other.getVersion() == null)     || (version != null && version.equals(other.getVersion())));
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
        if (getPOS() != null) {
            _hashCode += getPOS().hashCode();
        }
        if (getBasicPropertyInfo() != null) {
            _hashCode += getBasicPropertyInfo().hashCode();
        }
        if (getEchoToken() != null) {
            _hashCode += getEchoToken().hashCode();
        }
        if (getVersion() != null) {
            _hashCode += getVersion().hashCode();
        }
        if (getRatePlanAssignmentList() != null) {
            _hashCode += getRatePlanAssignmentList().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_RatePlanAssignmentListNotifRQ.class);

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

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("POS");
        ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "POS"));
        ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        typeDesc.addFieldDesc(ele);

        ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("basicPropertyInfo");
        ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "BasicPropertyInfo"));
        ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        ele.setMinOccurs(0);
        ele.setNillable(false);
        typeDesc.addFieldDesc(ele);

        ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("ratePlanAssignmentList");
        ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RatePlanAssignmentList"));
        ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "RatePlanAssignmentList"));
        ele.setMinOccurs(0);
        ele.setNillable(false);
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
}