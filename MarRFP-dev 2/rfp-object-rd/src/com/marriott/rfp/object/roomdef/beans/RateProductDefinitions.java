/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;
import com.marriott.rfp.utility.StringUtility;

public class RateProductDefinitions implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String productCode;
    private String productName;
    private String managed="false";
    private String level;
    private RateProductDefinition[] rateProductDefinition;

    public RateProductDefinitions() {
    }

    
    public RateProductDefinitions(RateProductDefinitions pd) {
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinitions))
            return false;
        RateProductDefinitions other = (RateProductDefinitions) obj;
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
                && ((productCode == null && other.getProductCode() == null) || (productCode != null && productCode.equals(other.getProductCode())))
                && ((productName == null && other.getProductName() == null) || (productName != null && productName.equals(other.getProductName())))
                && ((managed == null && other.getManaged() == null) || (managed != null && managed.equals(other.getManaged())))
                && ((level == null && other.getLevel() == null) || (level != null && level.equals(other.getLevel())))
                && ((rateProductDefinition == null && other.getRateProductDefinition() == null) || (rateProductDefinition != null && rateProductDefinition
                        .equals(other.getRateProductDefinition())));
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
        if (getProductCode() != null) {
            _hashCode += getProductCode().hashCode();
        }
        if (getProductName() != null) {
            _hashCode += getProductName().hashCode();
        }
        if (getManaged() != null) {
            _hashCode += getManaged().hashCode();
        }

        if (getLevel() != null) {
            _hashCode += getLevel().hashCode();
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitions.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("productCode");
        field.setXmlName(new javax.xml.namespace.QName("", "ProductCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("productName");
        field.setXmlName(new javax.xml.namespace.QName("", "ProductName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("managed");
        field.setXmlName(new javax.xml.namespace.QName("", "Managed"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("level");
        field.setXmlName(new javax.xml.namespace.QName("", "Level"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
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

    /**
     * @return Returns the productCode.
     */
    public String getProductCode() {
        return productCode;
    }

    /**
     * @param productCode
     *                   The productCode to set.
     */
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    /**
     * @return Returns the productCode.
     */
    public String getProductName() {
        return productName;
    }

    /**
     * @param productCode
     *                   The productCode to set.
     */
    public void setProductName(String productName) {
        productName=StringUtility.removeKORInvalidChars(productName);
        if (productName ==null || productName.trim().equals(""))
            this.productName="No Name";
        else
            this.productName = productName;
    }

    /**
     * @return Returns the managed.
     */
    public String getManaged() {
        return managed;
    }

    /**
     * @param managed
     *                   The managed to set.
     */
    public void setManaged(String managed) {
        this.managed = managed;
    }

    public void copyInto(RateProductDefinitions pd) {

        RateProductDefinition[] origPD = pd.getRateProductDefinition();
        if (origPD != null) {
            this.rateProductDefinition = new RateProductDefinition[origPD.length];
            for (int i = 0; i < origPD.length; i++) {
                RateProductDefinition newpd = new RateProductDefinition(origPD[i]);
                this.rateProductDefinition[i] = newpd;
            }
        }

    }

    public String findText(String rtndlistCode, String rtndgroupCode, String rtndcode, String rtndname) {
        String textVal = "";
        for (int iTxt = 0; iTxt < rateProductDefinition.length; iTxt++) {
            textVal = rateProductDefinition[iTxt].findText(rtndlistCode, rtndgroupCode, rtndcode, rtndname);
            if (!textVal.equals(""))
                break;
        }
        return textVal;
    }

    /**
     * @return Returns the level.
     */
    public String getLevel() {
        return level;
    }
    /**
     * @param level The level to set.
     */
    public void setLevel(String level) {
        this.level = level;
    }
}
