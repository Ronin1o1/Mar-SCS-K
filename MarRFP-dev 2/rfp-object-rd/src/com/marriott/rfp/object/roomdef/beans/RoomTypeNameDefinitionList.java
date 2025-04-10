/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import java.math.BigDecimal;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomTypeNameDefinitionList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String RTND_ListName; // attribute
	private java.lang.String RTND_ListCode; // attribute
	private BigDecimal minOccurs; // attribute
	private BigDecimal maxOccurs; // attribute
	private RoomTypeNameDefinitionGroup[] roomTypeNameDefinitionGroup;

	public RoomTypeNameDefinitionList() {
	}

	public RoomTypeNameDefinitionList(RoomTypeNameDefinitionList pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RoomTypeNameDefinitionList))
			return false;
		RoomTypeNameDefinitionList other = (RoomTypeNameDefinitionList) obj;
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
				&& ((RTND_ListName == null && other.getRTND_ListName() == null)
					|| (RTND_ListName != null && RTND_ListName.equals(other.getRTND_ListName())))
				&& ((RTND_ListCode == null && other.getRTND_ListCode() == null)
					|| (RTND_ListCode != null && RTND_ListCode.equals(other.getRTND_ListCode())))
				&& ((minOccurs == null && other.getMinOccurs() == null) || (minOccurs != null && minOccurs.equals(other.getMinOccurs())))
				&& ((maxOccurs == null && other.getMaxOccurs() == null) || (maxOccurs != null && maxOccurs.equals(other.getMaxOccurs())))
				&& ((roomTypeNameDefinitionGroup == null && other.getRoomTypeNameDefinitionGroup() == null)
					|| (roomTypeNameDefinitionGroup != null && roomTypeNameDefinitionGroup.equals(other.getRoomTypeNameDefinitionGroup())));
		__equalsCalc = null;
		return _equals;
	}

	/*
	 *  returns true if the attributes are equal.  The elements are not compared
	 */
	public synchronized boolean attributesEquals(java.lang.Object obj) {
		if (!(obj instanceof RoomTypeNameDefinitionList))
			return false;
		RoomTypeNameDefinitionList other = (RoomTypeNameDefinitionList) obj;
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
				&& ((RTND_ListName == null && other.getRTND_ListName() == null)
					|| (RTND_ListName != null && RTND_ListName.equals(other.getRTND_ListName())))
				&& ((RTND_ListCode == null && other.getRTND_ListCode() == null)
					|| (RTND_ListCode != null && RTND_ListCode.equals(other.getRTND_ListCode())));
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
		if (getRTND_ListName() != null) {
			_hashCode += getRTND_ListName().hashCode();
		}
		if (getRTND_ListCode() != null) {
			_hashCode += getRTND_ListCode().hashCode();
		}
		if (getMinOccurs() != null) {
			_hashCode += getMinOccurs().hashCode();
		}
		if (getMaxOccurs() != null) {
			_hashCode += getMaxOccurs().hashCode();
		}
		if (getRoomTypeNameDefinitionGroup() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRoomTypeNameDefinitionGroup()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRoomTypeNameDefinitionGroup(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomTypeNameDefinitionList.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RTND_ListName");
		field.setXmlName(new javax.xml.namespace.QName("", "RTND_ListName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RTND_ListCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RTND_ListCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("minOccurs");
		field.setXmlName(new javax.xml.namespace.QName("", "MinOccurs"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("maxOccurs");
		field.setXmlName(new javax.xml.namespace.QName("", "MaxOccurs"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
		typeDesc.addFieldDesc(field);

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("roomTypeNameDefinitionGroup");
		ele.setXmlName(new javax.xml.namespace.QName("", "RoomTypeNameDefinitionGroup"));
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
	public java.lang.String getRTND_ListCode() {
		return RTND_ListCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getRTND_ListName() {
		return RTND_ListName;
	}

	/**
	 * @param string
	 */
	public void setRTND_ListCode(java.lang.String string) {
		RTND_ListCode = string;
	}

	/**
	 * @param string
	 */
	public void setRTND_ListName(java.lang.String string) {
		RTND_ListName = string;
	}

	/**
	 * @return
	 */
	public BigDecimal getMinOccurs() {
		return minOccurs;
	}

	/**
	 * @param decimal
	 */
	public void setMinOccurs(BigDecimal decimal) {
	    minOccurs = decimal;
	}

	/**
	 * @return
	 */
	public BigDecimal getMaxOccurs() {
		return maxOccurs;
	}

	/**
	 * @param decimal
	 */
	public void setMaxOccurs(BigDecimal decimal) {
	    maxOccurs = decimal;
	}


	public RoomTypeNameDefinitionGroup[] getRoomTypeNameDefinitionGroup() {
		return roomTypeNameDefinitionGroup;
	}

	/**
	 * @param descriptions
	 */
	public void setRoomTypeNameDefinitionGroup(RoomTypeNameDefinitionGroup[] descriptions) {
		roomTypeNameDefinitionGroup = descriptions;
	}

	public RoomTypeNameDefinitionGroup getRoomTypeNameDefinitionGroup(int i) {
		return roomTypeNameDefinitionGroup[i];
	}

	public void setRoomTypeNameDefinitionGroup(int i, RoomTypeNameDefinitionGroup value) {
		this.roomTypeNameDefinitionGroup[i] = value;
	}


	
	public void copyInto(RoomTypeNameDefinitionList pd) {
		this.setRTND_ListCode(pd.getRTND_ListCode());
		this.setRTND_ListName(pd.getRTND_ListName());
		this.setMinOccurs(pd.getMinOccurs());
		this.setMaxOccurs(pd.getMaxOccurs());

		RoomTypeNameDefinitionGroup[] origPD = pd.getRoomTypeNameDefinitionGroup();
		if (origPD != null) {
			this.roomTypeNameDefinitionGroup = new RoomTypeNameDefinitionGroup[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				RoomTypeNameDefinitionGroup newpd = new RoomTypeNameDefinitionGroup(origPD[i]);
				this.roomTypeNameDefinitionGroup[i] = newpd;
			}
		}

	}

	public void copyIntoAttributes(RoomTypeNameDefinitionList pd) {
		this.setRTND_ListCode(pd.getRTND_ListCode());
		this.setRTND_ListName(pd.getRTND_ListName());
		this.setMinOccurs(pd.getMinOccurs());
		this.setMaxOccurs(pd.getMaxOccurs());
	}


}
