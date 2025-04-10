/**
 * MI_HotelRoomPoolListRQ.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import org.apache.axis.description.ElementDesc;

public class MI_HotelRoomProductSynchModifyRQ implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.Object POS;
	private java.lang.Object basicPropertyInfo;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private SynchAlerts[] synchAlerts;

	public MI_HotelRoomProductSynchModifyRQ() {
	}

	public java.lang.Object getPOS() {
		return POS;
	}

	public void setPOS(java.lang.Object POS) {
		this.POS = POS;
	}

	public java.lang.Object getBasicPropertyInfo() {
		return basicPropertyInfo;
	}

	public void setBasicPropertyInfo(java.lang.Object basicPropertyInfo) {
		this.basicPropertyInfo = basicPropertyInfo;
	}

	public java.lang.String getEchoToken() {
		return echoToken;
	}

	public void setEchoToken(java.lang.String echoToken) {
		this.echoToken = echoToken;
	}

	public java.lang.String getVersion() {
		return version;
	}

	public void setVersion(java.lang.String version) {
		this.version = version;
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof MI_HotelRoomProductSynchModifyRQ))
			return false;
		MI_HotelRoomProductSynchModifyRQ other = (MI_HotelRoomProductSynchModifyRQ) obj;
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
				&& ((POS == null && other.getPOS() == null) || (POS != null && POS.equals(other.getPOS())))
				&& ((basicPropertyInfo == null && other.getBasicPropertyInfo() == null) || (basicPropertyInfo != null && basicPropertyInfo.equals(other.getBasicPropertyInfo())))
				&& ((synchAlerts == null && other.getSynchAlerts() == null) || (synchAlerts != null && synchAlerts.equals(other.getSynchAlerts())))
				&& ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
				&& ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())));
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
		if (getPOS() != null) {
			_hashCode += getPOS().hashCode();
		}
		if (getBasicPropertyInfo() != null) {
			_hashCode += getBasicPropertyInfo().hashCode();
		}
		if (getEchoToken() != null) {
			_hashCode += getEchoToken().hashCode();
		}
		if (getVersion() != null) {
			_hashCode += getVersion().hashCode();
		}
		if (getSynchAlerts() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getSynchAlerts()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getSynchAlerts(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelRoomProductSynchModifyRQ.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("echoToken");
		field.setXmlName(new javax.xml.namespace.QName("", "EchoToken"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("version");
		field.setXmlName(new javax.xml.namespace.QName("", "Version"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("POS");
		ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "POS"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(ele);
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("basicPropertyInfo");
		ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "BasicPropertyInfo"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(ele);
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("roomTypes");
		ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RoomTypes"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		ele.setMinOccurs(0);
		typeDesc.addFieldDesc(ele);
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("synchAlerts");
		ele.setXmlName(new javax.xml.namespace.QName("", "SynchAlerts"));
		ele.setMinOccurs(0);
		//field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "SynchAlerts"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
	}

	/**
		 * @return
		 */
	public SynchAlerts[] getSynchAlerts() {
		return synchAlerts;
	}

	/**
	 * @param alertses
	 */
	public void setSynchAlerts(SynchAlerts[] alertses) {
		synchAlerts = alertses;
	}

	public SynchAlerts getSynchAlerts(int i) {
		return synchAlerts[i];
	}

	public void setSynchAlerts(int i, SynchAlerts value) {
		this.synchAlerts[i] = value;
	}

}
