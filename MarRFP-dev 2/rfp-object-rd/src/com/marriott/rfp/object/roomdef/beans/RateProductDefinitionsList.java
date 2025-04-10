package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RateProductDefinitionsList implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RateProductDefinitions[] rateProductDefinitions;

    public RateProductDefinitionsList() {
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinitionsList))
            return false;
        RateProductDefinitionsList other = (RateProductDefinitionsList) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((rateProductDefinitions == null && other.getRateProductDefinitions() == null) || (rateProductDefinitions != null && rateProductDefinitions
                .equals(other.getRateProductDefinitions())));
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitionsList.class);

    static {

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
        return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
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
