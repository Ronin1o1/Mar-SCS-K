/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.hotelinvcount;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class InvCounts implements java.io.Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private InvCount[] invCount;

    public InvCounts() {
    }

    public InvCounts(InvCounts pd) {
	copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
    public synchronized boolean equals(java.lang.Object obj) {
	if (!(obj instanceof InvCounts))
	    return false;
	InvCounts other = (InvCounts) obj;
	if (obj == null)
	    return false;
	if (this == obj)
	    return true;
	if (__equalsCalc != null) {
	    return (__equalsCalc == obj);
	}
	__equalsCalc = obj;
	boolean _equals;
	_equals = true && ((invCount == null && other.getInvCount() == null) || (invCount != null && invCount.equals(other.getInvCount())));
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

	if (getInvCount() != null) {
	    for (int i = 0; i < java.lang.reflect.Array.getLength(getInvCount()); i++) {
		java.lang.Object obj = java.lang.reflect.Array.get(getInvCount(), i);
		if (obj != null && !obj.getClass().isArray()) {
		    _hashCode += obj.hashCode();
		}
	    }
	}
	__hashCodeCalc = false;
	return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(InvCounts.class);

    static {

	org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
	ele.setFieldName("invCount");
	ele.setXmlName(new javax.xml.namespace.QName("", "InvCount"));
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

    public InvCount[] getInvCount() {
	return invCount;
    }

    /**
     * @param descriptions
     */
    public void setInvCount(InvCount[] descriptions) {
	invCount = descriptions;
    }

    public InvCount getInvCount(int i) {
	return invCount[i];
    }

    public void setInvCount(int i, InvCount value) {
	this.invCount[i] = value;
    }

    public void copyInto(InvCounts pd) {

	InvCount[] origPD = pd.getInvCount();
	if (origPD != null) {
	    this.invCount = new InvCount[origPD.length];
	    for (int i = 0; i < origPD.length; i++) {
		InvCount newpd = new InvCount(origPD[i]);
		this.invCount[i] = newpd;
	    }
	}

    }

}
