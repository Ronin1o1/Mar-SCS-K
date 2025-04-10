package com.marriott.rfp.object.roomdef.beans.rateproduct;

import org.apache.axis.description.ElementDesc;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.RatePlan;

/**
 * MI_DisplayRatePlanDescriptionRQ.java
 * 
 * 
 *
 * 
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class MI_DisplayRatePlanDescriptionRQ implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.Object POS;
    private java.lang.Object basicPropertyInfo;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private Channel channel;
    private Entry entry;
    private Language language;
    private RatePlan ratePlan;

    public MI_DisplayRatePlanDescriptionRQ() {
    }

    public java.lang.Object getBasicPropertyInfo() {
        return basicPropertyInfo;
    }

    public void setBasicPropertyInfo(java.lang.Object basicPropertyInfo) {
        this.basicPropertyInfo = basicPropertyInfo;
    }

    public java.lang.Object getPOS() {
        return POS;
    }

    public void setPOS(java.lang.Object POS) {
        this.POS = POS;
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
     * @return Returns the language.
     */
    public Language getLanguage() {
        return language;
    }

    /**
     * @param language
     *                   The language to set.
     */
    public void setLanguage(Language language) {
        this.language = language;
    }

    /**
     * @return Returns the ratePlan.
     */
    public RatePlan getRatePlan() {
        return ratePlan;
    }

    /**
     * @param ratePlan
     *                   The ratePlan to set.
     */
    public void setRatePlan(RatePlan ratePlan) {
        this.ratePlan = ratePlan;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MI_DisplayRatePlanDescriptionRQ))
            return false;
        MI_DisplayRatePlanDescriptionRQ other = (MI_DisplayRatePlanDescriptionRQ) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((POS == null && other.getPOS() == null) || (POS != null && POS.equals(other.getPOS())))
                && ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
                && ((basicPropertyInfo == null && other.getBasicPropertyInfo() == null) || (basicPropertyInfo != null && basicPropertyInfo.equals(other.getBasicPropertyInfo())))
                && ((entry == null && other.getEntry() == null) || (entry != null && entry.equals(other.getEntry())))
                && ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
                && ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())))
                && ((language == null && other.getLanguage() == null) || (language != null && language.equals(other.getLanguage())))
                && ((ratePlan == null && other.getRatePlan() == null) || (ratePlan != null && ratePlan.equals(other.getRatePlan())));
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
        if (getChannel() != null) {
            _hashCode += getChannel().hashCode();
        }
        if (getEntry() != null) {
            _hashCode += getEntry().hashCode();
        }

        if (getEchoToken() != null) {
            _hashCode += getEchoToken().hashCode();
        }
        if (getVersion() != null) {
            _hashCode += getVersion().hashCode();
        }
        if (getLanguage() != null) {
            _hashCode += getLanguage().hashCode();
        }
        if (getRatePlan() != null) {
            _hashCode += getRatePlan().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_DisplayRatePlanDescriptionRQ.class);

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

        ElementDesc ele = new org.apache.axis.description.ElementDesc();
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

        ele = new ElementDesc();
        ele.setFieldName("channel");
        ele.setXmlName(new javax.xml.namespace.QName("", "Channel"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("language");
        ele.setXmlName(new javax.xml.namespace.QName("", "Language"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("entry");
        ele.setXmlName(new javax.xml.namespace.QName("", "Entry"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("ratePlan");
        ele.setXmlName(new javax.xml.namespace.QName("", "RatePlan"));
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
        return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * @return
     */
    public Channel getChannel() {
        return channel;
    }

    /**
     * @return
     */
    public Entry getEntry() {
        return entry;
    }

    /**
     * @param channel
     */
    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    /**
     * @param entry
     */
    public void setEntry(Entry entry) {
        this.entry = entry;
    }

}
