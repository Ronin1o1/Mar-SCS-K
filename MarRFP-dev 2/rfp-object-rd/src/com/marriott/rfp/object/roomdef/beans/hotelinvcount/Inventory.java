/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.hotelinvcount;

import org.apache.axis.description.ElementDesc;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class Inventory implements java.io.Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;

    private StatusApplicationControl statusApplicationControl;
    private InvCounts invCounts;

    public Inventory() {
    }

    public Inventory(Inventory pd) {
	super();
	copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    public synchronized boolean equals(java.lang.Object obj) {
	if (!(obj instanceof Inventory))
	    return false;
	Inventory other = (Inventory) obj;
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

		&& ((statusApplicationControl == null && other.getStatusApplicationControl() == null) || (statusApplicationControl != null && statusApplicationControl
			.equals(other.getStatusApplicationControl())))
		&& ((invCounts == null && other.getInvCounts() == null) || (invCounts != null && invCounts.equals(other.getInvCounts())));
	__equalsCalc = null;
	return _equals;
    }

    private boolean __hashCodeCalc = false;

    public synchronized int hashCode() {
	if (__hashCodeCalc) {
	    return 0;
	}
	__hashCodeCalc = true;
	int _hashCode = 1;

	if (getStatusApplicationControl() != null) {
	    _hashCode += getStatusApplicationControl().hashCode();
	}
	if (getInvCounts() != null) {
	    _hashCode += getInvCounts().hashCode();
	}

	__hashCodeCalc = false;
	__hashCodeCalc = false;
	return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Inventory.class);

    static {

	ElementDesc ele = new ElementDesc();
	ele.setFieldName("statusApplicationControl");
	ele.setXmlName(new javax.xml.namespace.QName("", "StatusApplicationControl"));
	ele.setMinOccurs(0);
	ele.setNillable(false);
	typeDesc.addFieldDesc(ele);
	
	ele = new ElementDesc();
	ele.setFieldName("invCounts");
	ele.setXmlName(new javax.xml.namespace.QName("", "InvCounts"));
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
    public StatusApplicationControl getStatusApplicationControl() {
	return statusApplicationControl;
    }

    /**
     * @param type
     */
    public void setStatusApplicationControl(StatusApplicationControl statusApplicationControl) {
	this.statusApplicationControl = statusApplicationControl;
    }

    public void copyInto(Inventory pd) {
	this.setStatusApplicationControl(pd.getStatusApplicationControl());

    }

    public void setInvCounts(InvCounts invCounts) {
	this.invCounts = invCounts;
    }

    public InvCounts getInvCounts() {
	return invCounts;
    }

}
