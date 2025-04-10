/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomTypeNameDefinitions implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String roomTypeCode;
    private RoomTypeNameDefinition[] roomTypeNameDefinition;

    public RoomTypeNameDefinitions() {
    }

    public RoomTypeNameDefinitions(RoomTypeNameDefinitions pd) {
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RoomTypeNameDefinitions))
            return false;
        RoomTypeNameDefinitions other = (RoomTypeNameDefinitions) obj;
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
                && ((roomTypeCode == null && other.getRoomTypeCode() == null) || (roomTypeCode != null && roomTypeCode
                        .equals(other.getRoomTypeCode())))
                && ((roomTypeNameDefinition == null && other.getRoomTypeNameDefinition() == null) || (roomTypeNameDefinition != null && roomTypeNameDefinition
                        .equals(other.getRoomTypeNameDefinition())));
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
        if (getRoomTypeCode() != null) {
            _hashCode += getRoomTypeCode().hashCode();
        }
        if (getRoomTypeNameDefinition() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getRoomTypeNameDefinition()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRoomTypeNameDefinition(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomTypeNameDefinitions.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("roomTypeCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RoomTypeCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("roomTypeNameDefinition");
        ele.setXmlName(new javax.xml.namespace.QName("", "RoomTypeNameDefinition"));
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

    public RoomTypeNameDefinition[] getRoomTypeNameDefinition() {
        return roomTypeNameDefinition;
    }

    /**
     * @param descriptions
     */
    public void setRoomTypeNameDefinition(RoomTypeNameDefinition[] descriptions) {
        roomTypeNameDefinition = descriptions;
    }

    public RoomTypeNameDefinition getRoomTypeNameDefinition(int i) {
        return roomTypeNameDefinition[i];
    }

    public void setRoomTypeNameDefinition(int i, RoomTypeNameDefinition value) {
        this.roomTypeNameDefinition[i] = value;
    }

    /**
     * @return Returns the roomTypeCode.
     */
    public String getRoomTypeCode() {
        return roomTypeCode;
    }

    /**
     * @param roomTypeCode
     *                   The roomTypeCode to set.
     */
    public void setRoomTypeCode(String roomTypeCode) {
        this.roomTypeCode = roomTypeCode;
    }

    public void copyInto(RoomTypeNameDefinitions pd) {

        RoomTypeNameDefinition[] origPD = pd.getRoomTypeNameDefinition();
        if (origPD != null) {
            this.roomTypeNameDefinition = new RoomTypeNameDefinition[origPD.length];
            for (int i = 0; i < origPD.length; i++) {
                RoomTypeNameDefinition newpd = new RoomTypeNameDefinition(origPD[i]);
                this.roomTypeNameDefinition[i] = newpd;
            }
        }

    }

    public String findText(String rtndlistCode, String rtndgroupCode, String rtndcode, String rtndname) {
        String textVal = "";
        for (int iTxt = 0; iTxt < roomTypeNameDefinition.length; iTxt++) {
            textVal = roomTypeNameDefinition[iTxt].findText(rtndlistCode, rtndgroupCode, rtndcode, rtndname);
            if (!textVal.equals(""))
                break;
        }
        return textVal;
    }

}
