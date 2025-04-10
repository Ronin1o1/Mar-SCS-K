/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.hotelinvcount;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class StatusApplicationControl implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String start; // attribute
	private java.lang.String end; // attribute
	private java.lang.String ratePlanCode;

	public StatusApplicationControl() {
	}

	public StatusApplicationControl(StatusApplicationControl lg) {
		super();
		copyInto(lg);
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof StatusApplicationControl))
			return false;
		StatusApplicationControl other = (StatusApplicationControl) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals =
			true
				&& ((start == null && other.getStart() == null) || (start != null && start.equals(other.getStart())))
				&& ((end == null && other.getEnd() == null) || (end != null && end.equals(other.getEnd())))
				&& ((ratePlanCode == null && other.getRatePlanCode() == null) || (ratePlanCode != null && ratePlanCode.equals(other.getRatePlanCode())));
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
		if (getStart() != null) {
			_hashCode += getStart().hashCode();
		}
		if (getEnd() != null) {
			_hashCode += getEnd().hashCode();
		}
		if (getRatePlanCode() != null) {
			_hashCode += getRatePlanCode().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(StatusApplicationControl.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("start");
		field.setXmlName(new javax.xml.namespace.QName("", "Start"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("end");
		field.setXmlName(new javax.xml.namespace.QName("", "End"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("ratePlanCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RatePlanCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}


	/**
	 * @return
	 */
	public java.lang.String getStart() {
		return start;
	}

	/**
	 * @return
	 */
	public java.lang.String getEnd() {
		return end;
	}


	/**
	 * @param string
	 */
	public void setStart(java.lang.String string) {
		start = string;
	}

	/**
	 * @param string
	 */
	public void setEnd(java.lang.String string) {
		end = string;
	}


	public void copyInto(StatusApplicationControl lg) {
		this.setStart(lg.getStart());
		this.setEnd(lg.getEnd());
		this.setRatePlanCode(lg.getRatePlanCode());
	}

	public void setRatePlanCode(java.lang.String ratePlanCode) {
	    this.ratePlanCode = ratePlanCode;
	}

	public java.lang.String getRatePlanCode() {
	    return ratePlanCode;
	}

}
