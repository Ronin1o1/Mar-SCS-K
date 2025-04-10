/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomTypeNameDefinitionGroup implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String RTND_GroupName; // attribute
	private java.lang.String RTND_GroupCode; // attribute
	private RoomTypeNameDefinition[] roomTypeNameDefinition;

	public RoomTypeNameDefinitionGroup() {
	}

	public RoomTypeNameDefinitionGroup(RoomTypeNameDefinitionGroup pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RoomTypeNameDefinitionGroup))
			return false;
		RoomTypeNameDefinitionGroup other = (RoomTypeNameDefinitionGroup) obj;
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
				&& ((RTND_GroupName == null && other.getRTND_GroupName() == null)
					|| (RTND_GroupName != null && RTND_GroupName.equals(other.getRTND_GroupName())))
				&& ((RTND_GroupCode == null && other.getRTND_GroupCode() == null)
					|| (RTND_GroupCode != null && RTND_GroupCode.equals(other.getRTND_GroupCode())))
				&& ((roomTypeNameDefinition == null && other.getRoomTypeNameDefinition() == null)
					|| (roomTypeNameDefinition != null && roomTypeNameDefinition.equals(other.getRoomTypeNameDefinition())));
		__equalsCalc = null;
		return _equals;
	}

	/*
	 *  returns true if the attributes are equal.  The elements are not compared
	 */
	public synchronized boolean attributesEquals(java.lang.Object obj) {
		if (!(obj instanceof RoomTypeNameDefinitionGroup))
			return false;
		RoomTypeNameDefinitionGroup other = (RoomTypeNameDefinitionGroup) obj;
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
				&& ((RTND_GroupName == null && other.getRTND_GroupName() == null)
					|| (RTND_GroupName != null && RTND_GroupName.equals(other.getRTND_GroupName())))
				&& ((RTND_GroupCode == null && other.getRTND_GroupCode() == null)
					|| (RTND_GroupCode != null && RTND_GroupCode.equals(other.getRTND_GroupCode())));
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
		if (getRTND_GroupName() != null) {
			_hashCode += getRTND_GroupName().hashCode();
		}
		if (getRTND_GroupCode() != null) {
			_hashCode += getRTND_GroupCode().hashCode();
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
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomTypeNameDefinitionGroup.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RTND_GroupName");
		field.setXmlName(new javax.xml.namespace.QName("", "RTND_GroupName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RTND_GroupCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RTND_GroupCode"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}


	/**
	 * @return
	 */
	public java.lang.String getRTND_GroupCode() {
		return RTND_GroupCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getRTND_GroupName() {
		return RTND_GroupName;
	}

	/**
	 * @param string
	 */
	public void setRTND_GroupCode(java.lang.String string) {
		RTND_GroupCode = string;
	}

	/**
	 * @param string
	 */
	public void setRTND_GroupName(java.lang.String string) {
		RTND_GroupName = string;
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


	
	public void copyInto(RoomTypeNameDefinitionGroup pd) {
		this.setRTND_GroupCode(pd.getRTND_GroupCode());
		this.setRTND_GroupName(pd.getRTND_GroupName());

		RoomTypeNameDefinition[] origPD = pd.getRoomTypeNameDefinition();
		if (origPD != null) {
			this.roomTypeNameDefinition = new RoomTypeNameDefinition[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				RoomTypeNameDefinition newpd = new RoomTypeNameDefinition(origPD[i]);
				this.roomTypeNameDefinition[i] = newpd;
			}
		}

	}

	public void copyIntoAttributes(RoomTypeNameDefinitionGroup pd) {
		this.setRTND_GroupCode(pd.getRTND_GroupCode());
		this.setRTND_GroupName(pd.getRTND_GroupName());
	}


}
