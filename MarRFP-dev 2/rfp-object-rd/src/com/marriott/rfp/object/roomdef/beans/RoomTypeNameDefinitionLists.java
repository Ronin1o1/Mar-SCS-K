/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RoomTypeNameDefinitionLists implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RoomTypeNameDefinitionList[] roomTypeNameDefinitionList;

	public RoomTypeNameDefinitionLists() {
	}

	public RoomTypeNameDefinitionLists(RoomTypeNameDefinitionLists pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RoomTypeNameDefinitionLists))
			return false;
		RoomTypeNameDefinitionLists other = (RoomTypeNameDefinitionLists) obj;
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
				&& ((roomTypeNameDefinitionList == null && other.getRoomTypeNameDefinitionList() == null)
					|| (roomTypeNameDefinitionList != null && roomTypeNameDefinitionList.equals(other.getRoomTypeNameDefinitionList())));
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
		if (getRoomTypeNameDefinitionList() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRoomTypeNameDefinitionList()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRoomTypeNameDefinitionList(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomTypeNameDefinitionLists.class);

	static {

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("roomTypeNameDefinitionList");
		ele.setXmlName(new javax.xml.namespace.QName("", "RoomTypeNameDefinitionList"));
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




	public RoomTypeNameDefinitionList[] getRoomTypeNameDefinitionList() {
		return roomTypeNameDefinitionList;
	}

	/**
	 * @param descriptions
	 */
	public void setRoomTypeNameDefinitionList(RoomTypeNameDefinitionList[] descriptions) {
		roomTypeNameDefinitionList = descriptions;
	}

	public RoomTypeNameDefinitionList getRoomTypeNameDefinitionList(int i) {
		return roomTypeNameDefinitionList[i];
	}

	public void setRoomTypeNameDefinitionList(int i, RoomTypeNameDefinitionList value) {
		this.roomTypeNameDefinitionList[i] = value;
	}


	
	public void copyInto(RoomTypeNameDefinitionLists pd) {

		RoomTypeNameDefinitionList[] origPD = pd.getRoomTypeNameDefinitionList();
		if (origPD != null) {
			this.roomTypeNameDefinitionList = new RoomTypeNameDefinitionList[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				RoomTypeNameDefinitionList newpd = new RoomTypeNameDefinitionList(origPD[i]);
				this.roomTypeNameDefinitionList[i] = newpd;
			}
		}

	}


}
