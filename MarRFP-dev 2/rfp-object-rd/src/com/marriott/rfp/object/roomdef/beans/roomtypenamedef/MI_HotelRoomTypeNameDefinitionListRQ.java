/**
 * MI_HotelRoomPoolListRQ.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.roomtypenamedef;

public class MI_HotelRoomTypeNameDefinitionListRQ implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.Object POS;
	private java.lang.Object basicPropertyInfo;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute

	public MI_HotelRoomTypeNameDefinitionListRQ() {
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
		if (!(obj instanceof MI_HotelRoomTypeNameDefinitionListRQ))
			return false;
		MI_HotelRoomTypeNameDefinitionListRQ other = (MI_HotelRoomTypeNameDefinitionListRQ) obj;
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
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelRoomTypeNameDefinitionListRQ.class);

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
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("POS");
		field.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "POS"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("basicPropertyInfo");
		field.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "BasicPropertyInfo"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
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
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
	}

}
