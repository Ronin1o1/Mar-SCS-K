/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RateProductDefinitionsSearch implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String productCode;
    private String productName;
    private String startProductCode;
    private String endProductCode;
    private String count;
    private RateProductDefinition[] rateProductDefinition;

    public RateProductDefinitionsSearch() {
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinitionsSearch))
            return false;
        RateProductDefinitionsSearch other = (RateProductDefinitionsSearch) obj;
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
                && ((count == null && other.getCount() == null) || (count != null && count.equals(other.getCount())))
                && ((startProductCode == null && other.getStartProductCode() == null) || (startProductCode != null && startProductCode.equals(other
                        .getStartProductCode())))
                && ((endProductCode == null && other.getEndProductCode() == null) || (endProductCode != null && endProductCode.equals(other
                        .getEndProductCode())))
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
        if (getCount() != null) {
            _hashCode += getCount().hashCode();
        }
        if (getStartProductCode() != null) {
            _hashCode += getStartProductCode().hashCode();
        }
        if (getEndProductCode() != null) {
            _hashCode += getEndProductCode().hashCode();
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitionsSearch.class);

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
        field.setFieldName("count");
        field.setXmlName(new javax.xml.namespace.QName("", "Count"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("startProductCode");
        field.setXmlName(new javax.xml.namespace.QName("", "StartProductCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("endProductCode");
        field.setXmlName(new javax.xml.namespace.QName("", "EndProductCode"));
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
        this.productName = productName;
    }

    /**
     * @return Returns the count.
     */
    public String getCount() {
        return count;
    }

    /**
     * @param count
     *                   The count to set.
     */
    public void setCount(String count) {
        this.count = count;
    }

    /**
     * @return Returns the endProductCode.
     */
    public String getEndProductCode() {
        return endProductCode;
    }

    /**
     * @param endProductCode
     *                   The endProductCode to set.
     */
    public void setEndProductCode(String endProductCode) {
        this.endProductCode = endProductCode;
    }

    /**
     * @return Returns the startProductCode.
     */
    public String getStartProductCode() {
        return startProductCode;
    }

    /**
     * @param startProductCode
     *                   The startProductCode to set.
     */
    public void setStartProductCode(String startProductCode) {
        this.startProductCode = startProductCode;
    }
}
