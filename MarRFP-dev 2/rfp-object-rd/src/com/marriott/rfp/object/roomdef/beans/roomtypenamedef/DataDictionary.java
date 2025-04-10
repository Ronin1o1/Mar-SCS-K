/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.roomtypenamedef;

import com.marriott.rfp.object.roomdef.beans.AlternateTextLists;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class DataDictionary implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private RoomTypeNameDefinitionLists roomTypeNameDefinitionLists;
	private UnitsOfMeasureList unitsOfMeasureList;
	private TypeLists typeLists;
	private AlternateTextLists alternateTextLists;
	

	public DataDictionary() {
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof DataDictionary))
			return false;
		DataDictionary other = (DataDictionary) obj;
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
		&& ((roomTypeNameDefinitionLists == null && other.getRoomTypeNameDefinitionLists() == null) || (roomTypeNameDefinitionLists != null && roomTypeNameDefinitionLists.equals( other.getRoomTypeNameDefinitionLists())))
		&& ((unitsOfMeasureList == null && other.getUnitsOfMeasureList() == null) || (unitsOfMeasureList != null && unitsOfMeasureList.equals( other.getUnitsOfMeasureList())))
		&& ((typeLists == null && other.getTypeLists() == null) || (typeLists != null && typeLists.equals( other.getTypeLists())))
		&& ((alternateTextLists == null && other.getAlternateTextLists() == null) || (alternateTextLists != null && alternateTextLists.equals( other.getAlternateTextLists())));
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
		if (getRoomTypeNameDefinitionLists() != null) {
			_hashCode += getRoomTypeNameDefinitionLists().hashCode();
		}
		if (getUnitsOfMeasureList() != null) {
			_hashCode += getUnitsOfMeasureList().hashCode();
		}
		if (getTypeLists() != null) {
			_hashCode += getTypeLists().hashCode();
		}
		if (getAlternateTextLists() != null) {
			_hashCode += getAlternateTextLists().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(DataDictionary.class);

	static {

		org.apache.axis.description.ElementDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("roomTypeNameDefinitionLists");
		field.setXmlName(new javax.xml.namespace.QName("", "RoomTypeNameDefinitionLists"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("unitsOfMeasureList");
		field.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasureList"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("typeLists");
		field.setXmlName(new javax.xml.namespace.QName("", "TypeLists"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("alternateTextLists");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextLists"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}


	/**
	 * @return
	 */
	public RoomTypeNameDefinitionLists getRoomTypeNameDefinitionLists() {
		return roomTypeNameDefinitionLists;
	}

	/**
	 * @param descriptions
	 */
	public void setRoomTypeNameDefinitionLists(RoomTypeNameDefinitionLists descriptions) {
		roomTypeNameDefinitionLists = descriptions;
	}

	/**
	 * @return
	 */
	public UnitsOfMeasureList getUnitsOfMeasureList() {
		return unitsOfMeasureList;
	}

	/**
	 * @param descriptions
	 */
	public void setUnitsOfMeasureList(UnitsOfMeasureList descriptions) {
	    unitsOfMeasureList = descriptions;
	}
	/**
	 * @return
	 */
	public TypeLists getTypeLists() {
		return typeLists;
	}

	/**
	 * @param descriptions
	 */
	public void setTypeLists(TypeLists descriptions) {
	    typeLists = descriptions;
	}
	/**
	 * @return
	 */
	public AlternateTextLists getAlternateTextLists() {
		return alternateTextLists;
	}

	/**
	 * @param descriptions
	 */
	public void setAlternateTextLists(AlternateTextLists descriptions) {
	    alternateTextLists = descriptions;
	}


}
