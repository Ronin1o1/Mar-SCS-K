/**
 * MI_HotelRoomPoolListRQ.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import org.apache.axis.description.ElementDesc;

@SuppressWarnings("serial")
public class MI_HotelRoomProductDisplayRulesRQ implements java.io.Serializable {
	private java.lang.Object POS;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private Channel channel;
	private Entry entry;

	public MI_HotelRoomProductDisplayRulesRQ() {
	}

	public java.lang.Object getPOS() {
		return POS;
	}

	public void setPOS(java.lang.Object POS) {
		this.POS = POS;
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
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof MI_HotelRoomProductDisplayRulesRQ))
			return false;
		MI_HotelRoomProductDisplayRulesRQ other = (MI_HotelRoomProductDisplayRulesRQ) obj;
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
				&& ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
				&& ((entry == null && other.getEntry() == null) || (entry != null && entry.equals(other.getEntry())))
				&& ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
				&& ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())));
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
		if (getPOS() != null) {
			_hashCode += getPOS().hashCode();
		}
		if (getChannel() != null) {
			_hashCode += getChannel().hashCode();
		}
		if (getEntry() != null) {
			_hashCode += getEntry().hashCode();
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
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelRoomProductDisplayRulesRQ.class);

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
		ele.setFieldName("channel");
		ele.setXmlName(new javax.xml.namespace.QName("", "Channel"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Channel"));
		typeDesc.addFieldDesc(ele);

		ele = new ElementDesc();
		ele.setFieldName("entry");
		ele.setXmlName(new javax.xml.namespace.QName("", "Entry"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Entry"));
		ele.setMinOccurs(0);
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
	public Channel getChannel() {
		return channel;
	}

	/**
	 * @return
	 */
	public Entry getEntry() {
		return entry;
	}

	/**
	 * @param channel
	 */
	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	/**
	 * @param entry
	 */
	public void setEntry(Entry entry) {
		this.entry = entry;
	}

}
