/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RateProductDefinitionGroup implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String RP_GroupName; // attribute
    private java.lang.String RP_GroupCode; // attribute
    private Text text;
    private RateProductDefinition[] rateProductDefinition;

    /**
     * @return Returns the text.
     */
    public Text getText() {
        return text;
    }

    /**
     * @param text
     *                   The text to set.
     */
    public void setText(Text text) {
        this.text = text;
    }


    public RateProductDefinitionGroup() {
    }

    public RateProductDefinitionGroup(RateProductDefinitionGroup pd) {
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinitionGroup))
            return false;
        RateProductDefinitionGroup other = (RateProductDefinitionGroup) obj;
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
                && ((RP_GroupName == null && other.getRP_GroupName() == null) || (RP_GroupName != null && RP_GroupName
                        .equals(other.getRP_GroupName())))
                && ((RP_GroupCode == null && other.getRP_GroupCode() == null) || (RP_GroupCode != null && RP_GroupCode
                        .equals(other.getRP_GroupCode())))
                && ((text == null && other.getText() == null) || (text != null && text.equals(other.getText())))
                && ((rateProductDefinition == null && other.getRateProductDefinition() == null) || (rateProductDefinition != null && rateProductDefinition
                        .equals(other.getRateProductDefinition())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the attributes are equal. The elements are not compared
     */
    public synchronized boolean attributesEquals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinitionGroup))
            return false;
        RateProductDefinitionGroup other = (RateProductDefinitionGroup) obj;
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
                && ((RP_GroupName == null && other.getRP_GroupName() == null) || (RP_GroupName != null && RP_GroupName
                        .equals(other.getRP_GroupName())))
                && ((RP_GroupCode == null && other.getRP_GroupCode() == null) || (RP_GroupCode != null && RP_GroupCode
                        .equals(other.getRP_GroupCode())));
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
        if (getRP_GroupName() != null) {
            _hashCode += getRP_GroupName().hashCode();
        }
        if (getRP_GroupCode() != null) {
            _hashCode += getRP_GroupCode().hashCode();
        }
        if (getText() != null) {
            _hashCode += getText().hashCode();
        }
        if (getRateProductDefinition() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRateProductDefinition()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRateProductDefinition(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitionGroup.class);

    static {

        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_GroupName");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_GroupName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_GroupCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_GroupCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("text");
        ele.setXmlName(new javax.xml.namespace.QName("", "Text"));
        typeDesc.addFieldDesc(ele);
        
        ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("rateProductDefinition");
        ele.setXmlName(new javax.xml.namespace.QName("", "RateProductDefinition"));
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
        return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
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
    public java.lang.String getRP_GroupCode() {
        return RP_GroupCode;
    }

    /**
     * @return
     */
    public java.lang.String getRP_GroupName() {
        return RP_GroupName;
    }

    /**
     * @param string
     */
    public void setRP_GroupCode(java.lang.String string) {
        RP_GroupCode = string;
    }

    /**
     * @param string
     */
    public void setRP_GroupName(java.lang.String string) {
        RP_GroupName = string;
    }

    public RateProductDefinition[] getRateProductDefinition() {
        return rateProductDefinition;
    }

    /**
     * @param descriptions
     */
    public void setRateProductDefinition(RateProductDefinition[] descriptions) {
        rateProductDefinition = descriptions;
    }

    public RateProductDefinition getRateProductDefinition(int i) {
        return rateProductDefinition[i];
    }

    public void setRateProductDefinition(int i, RateProductDefinition value) {
        this.rateProductDefinition[i] = value;
    }

    public void copyInto(RateProductDefinitionGroup pd) {
        this.setRP_GroupCode(pd.getRP_GroupCode());
        this.setRP_GroupName(pd.getRP_GroupName());
        this.setText(pd.getText());

        RateProductDefinition[] origPD = pd.getRateProductDefinition();
        if (origPD != null) {
            this.rateProductDefinition = new RateProductDefinition[origPD.length];
            for (int i = 0; i < origPD.length; i++) {
                RateProductDefinition newpd = new RateProductDefinition(origPD[i]);
                this.rateProductDefinition[i] = newpd;
            }
        }

    }

    public void copyIntoAttributes(RateProductDefinitionGroup pd) {
        this.setRP_GroupCode(pd.getRP_GroupCode());
        this.setRP_GroupName(pd.getRP_GroupName());
    }

}
