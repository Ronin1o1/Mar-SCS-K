/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class SynchAlert implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String createDateTime; // attribute
	private java.lang.String creatorID; // attribute
	private java.lang.String lastModifyDateTime; // attribute
	private java.lang.String lastModifierID; // attribute 
	private RoomProduct[] roomProduct;

	public SynchAlert() {
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof SynchAlert))
			return false;
		SynchAlert other = (SynchAlert) obj;
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
				&& ((createDateTime == null && other.getCreateDateTime() == null) || (createDateTime != null && createDateTime.equals(other.getCreateDateTime())))
				&& ((creatorID == null && other.getCreatorID() == null) || (creatorID != null && creatorID.equals(other.getCreatorID())))
				&& ((lastModifyDateTime == null && other.getLastModifyDateTime() == null) || (lastModifyDateTime != null && lastModifyDateTime.equals(other.getLastModifyDateTime())))
				&& ((lastModifierID == null && other.getLastModifierID() == null) || (lastModifierID != null && lastModifierID.equals(other.getLastModifierID())))
				&& ((roomProduct == null && other.getRoomProduct() == null) || (roomProduct != null && roomProduct.equals(other.getRoomProduct())));
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
		if (getCreateDateTime() != null) {
			_hashCode += getCreateDateTime().hashCode();
		}
		if (getCreatorID() != null) {
			_hashCode += getCreatorID().hashCode();
		}
		if (getLastModifyDateTime() != null) {
			_hashCode += getLastModifyDateTime().hashCode();
		}
		if (getLastModifierID() != null) {
			_hashCode += getLastModifierID().hashCode();
		}
		if (getRoomProduct() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRoomProduct()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRoomProduct(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(SynchAlert.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("createDateTime");
		field.setXmlName(new javax.xml.namespace.QName("", "CreateDateTime"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("creatorID");
		field.setXmlName(new javax.xml.namespace.QName("", "CreatorID"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("lastModifyDateTime");
		field.setXmlName(new javax.xml.namespace.QName("", "LastModifyDateTime"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("lastModifierID");
		field.setXmlName(new javax.xml.namespace.QName("", "LastModifierID"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("roomProduct");
		field.setXmlName(new javax.xml.namespace.QName("", "RoomProduct"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * @return
	 */
	public java.lang.String getCreateDateTime() {
		return createDateTime;
	}

	/**
	 * @return
	 */
	public java.lang.String getCreatorID() {
		return creatorID;
	}

	/**
	 * @return
	 */
	public java.lang.String getLastModifierID() {
		return lastModifierID;
	}

	/**
	 * @return
	 */
	public java.lang.String getLastModifyDateTime() {
		return lastModifyDateTime;
	}


	/**
	 * @param string
	 */
	public void setCreateDateTime(java.lang.String string) {
		createDateTime = string;
	}

	/**
	 * @param string
	 */
	public void setCreatorID(java.lang.String string) {
		creatorID = string;
	}

	/**
	 * @param string
	 */
	public void setLastModifierID(java.lang.String string) {
		lastModifierID = string;
	}

	/**
	 * @param string
	 */
	public void setLastModifyDateTime(java.lang.String string) {
		lastModifyDateTime = string;
	}


	public RoomProduct[] getRoomProduct() {
		return roomProduct;
	}

	public void setRoomProduct(RoomProduct[] roomProduct) {
		this.roomProduct = roomProduct;
	}

	public RoomProduct getRoomProduct(int i) {
		return roomProduct[i];
	}

	public void setRoomProduct(int i, RoomProduct value) {
		this.roomProduct[i] = value;
	}
	
}
