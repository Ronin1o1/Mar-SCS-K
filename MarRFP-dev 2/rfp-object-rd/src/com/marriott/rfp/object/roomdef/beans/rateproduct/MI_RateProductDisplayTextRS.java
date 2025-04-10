/**
 * MI_HotelRoomPoolListRS.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.BrandsList;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_RateProductDisplayTextRS implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
    private java.lang.String echoToken; // attribute
    private java.lang.String version; // attribute
    private java.lang.String primaryLangID; // attribute
    private Channel channel;
    private RateProductDefinitions rateProductDefinitions;
    private UnitsOfMeasureList unitsOfMeasureList;
    private TypeLists typeLists;
	private BrandsList brandsList;
    private Errors errors;

    public MI_RateProductDisplayTextRS() {
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

    public java.lang.String getPrimaryLangID() {
        return primaryLangID;
    }

    public void setPrimaryLangID(java.lang.String primaryLangID) {
        this.primaryLangID = primaryLangID;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MI_RateProductDisplayTextRS))
            return false;
        MI_RateProductDisplayTextRS other = (MI_RateProductDisplayTextRS) obj;
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
                && ((primaryLangID == null && other.getPrimaryLangID() == null) || (primaryLangID != null && primaryLangID.equals(other
                        .getPrimaryLangID())))
                && ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
                && ((rateProductDefinitions == null && other.getRateProductDefinitions() == null) || (rateProductDefinitions != null && rateProductDefinitions
                        .equals(other.getRateProductDefinitions())))
                && ((unitsOfMeasureList == null && other.getUnitsOfMeasureList() == null) || (unitsOfMeasureList != null && unitsOfMeasureList.equals(other.getUnitsOfMeasureList())))
                && ((typeLists == null && other.getTypeLists() == null) || (typeLists != null && typeLists.equals(other.getTypeLists())))
                && ((brandsList == null && other.getBrandsList() == null) || (brandsList != null && brandsList
                        .equals(other.getBrandsList())))
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
        if (getPrimaryLangID() != null) {
            _hashCode += getPrimaryLangID().hashCode();
        }
        if (getChannel() != null) {
            _hashCode += getChannel().hashCode();
        }
        if (getRateProductDefinitions() != null) {
            _hashCode += getRateProductDefinitions().hashCode();
        }
        if (getUnitsOfMeasureList() != null) {
            _hashCode += getUnitsOfMeasureList().hashCode();
        }
        if (getTypeLists() != null) {
            _hashCode += getTypeLists().hashCode();
        }
        if (getBrandsList() != null) {
            _hashCode += getBrandsList().hashCode();
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_RateProductDisplayTextRS.class);

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
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("primaryLangID");
        field.setXmlName(new javax.xml.namespace.QName("", "PrimaryLangID"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("success");
        field.setXmlName(new javax.xml.namespace.QName("", "Success"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("channel");
		field.setXmlName(new javax.xml.namespace.QName("", "Channel"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Channel"));
		typeDesc.addFieldDesc(field);
        
    	field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("rateProductDefinitions");
		field.setXmlName(new javax.xml.namespace.QName("", "RateProductDefinitions"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("unitsOfMeasureList");
		field.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasureList"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("typeLists");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeLists"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("brandsList");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandsList"));
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

    /**
     * @return
     */
    public Channel getChannel() {
        return channel;
    }

    /**
     * @param channel
     */
    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    /**
     * @return
     */
    public RateProductDefinitions getRateProductDefinitions() {
        return rateProductDefinitions;
    }

    /**
     * @param descriptions
     */
    public void setRateProductDefinitions(RateProductDefinitions descriptions) {
        rateProductDefinitions = descriptions;
    }

    /**
     * @return
     */
    public UnitsOfMeasureList getUnitsOfMeasureList() {
        return unitsOfMeasureList;
    }

    /**
     * @param descriptions
     */
    public void setUnitsOfMeasureList(UnitsOfMeasureList descriptions) {
        unitsOfMeasureList = descriptions;
    }

    /**
     * @return
     */
    public TypeLists getTypeLists() {
        return typeLists;
    }

    /**
     * @param descriptions
     */
    public void setTypeLists(TypeLists descriptions) {
        typeLists = descriptions;
    }


    /**
     * @return Returns the formats.
     */
    public BrandsList getBrandsList() {
        return brandsList;
    }
    /**
     * @param formats The formats to set.
     */
    public void setBrandsList(BrandsList brandsList) {
        this.brandsList = brandsList;
    }
}
