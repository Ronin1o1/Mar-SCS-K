/**
 * MI_HotelRoomPoolListRS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

@SuppressWarnings("serial")
public class MI_HotelRoomProductDisplayRulesRS implements java.io.Serializable {
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private Channel channel;
	private Entry entry;
	private DisplayDimensions displayDimensions;
	private ProductDescriptions productDescriptions;
	private Errors errors;
	private Warnings warnings;

	public MI_HotelRoomProductDisplayRulesRS() {
	}

	public MI_HotelRoomProductDisplayRulesRS(Channel channel, Entry entry, DisplayDimensions dd, ProductDescriptions pd) {
		this.channel=channel;
		this.entry=entry;
		this.displayDimensions=dd;
		this.productDescriptions=pd;
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
		if (!(obj instanceof MI_HotelRoomProductDisplayRulesRS))
			return false;
		MI_HotelRoomProductDisplayRulesRS other = (MI_HotelRoomProductDisplayRulesRS) obj;
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
				&& ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
				&& ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())))
				&& ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
				&& ((entry == null && other.getEntry() == null) || (entry != null && entry.equals(other.getEntry())))
				&& ((displayDimensions == null && other.getDisplayDimensions() == null)
					|| (displayDimensions != null && displayDimensions.equals(other.getDisplayDimensions())))
				&& ((productDescriptions == null && other.getProductDescriptions() == null)
					|| (productDescriptions != null && productDescriptions.equals(other.getProductDescriptions())))
				&& ((errors == null && other.getErrors() == null) || (errors != null && errors.equals(other.getErrors())))
		&& ((warnings == null && other.getWarnings() == null) || (warnings != null && warnings.equals(other.getWarnings())));
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
		if (getEchoToken() != null) {
			_hashCode += getEchoToken().hashCode();
		}
		if (getVersion() != null) {
			_hashCode += getVersion().hashCode();
		}
		if (getChannel() != null) {
			_hashCode += getChannel().hashCode();
		}
		if (getEntry() != null) {
			_hashCode += getEntry().hashCode();
		}
		if (getDisplayDimensions() != null) {
			_hashCode += getDisplayDimensions().hashCode();
		}
		if (getProductDescriptions() != null) {
			_hashCode += getProductDescriptions().hashCode();
		}
		if (getErrors() != null) {
			_hashCode += getErrors().hashCode();
		}
		if (getWarnings() != null) {
			_hashCode += getWarnings().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelRoomProductDisplayRulesRS.class);

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
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("channel");
		field.setXmlName(new javax.xml.namespace.QName("", "Channel"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Channel"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("entry");
		field.setXmlName(new javax.xml.namespace.QName("", "Entry"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Entry"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("displayDimensions");
		field.setXmlName(new javax.xml.namespace.QName("", "DisplayDimensions"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "DisplayDimensions"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("productDescriptions");
		field.setXmlName(new javax.xml.namespace.QName("", "ProductDescriptions"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "ProductDescriptions"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("errors");
		field.setXmlName(new javax.xml.namespace.QName("", "Errors"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("warnings");
		field.setXmlName(new javax.xml.namespace.QName("", "Warnings"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Warnings"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
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
	public Channel getChannel() {
		return channel;
	}

	/**
	 * @return
	 */
	public DisplayDimensions getDisplayDimensions() {
		return displayDimensions;
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
	 * @param dimensions
	 */
	public void setDisplayDimensions(DisplayDimensions dimensions) {
		displayDimensions = dimensions;
	}

	/**
	 * @param entry
	 */
	public void setEntry(Entry entry) {
		this.entry = entry;
	}

	/**
	 * @return
	 */
	public ProductDescriptions getProductDescriptions() {
		return productDescriptions;
	}

	/**
	 * @param rules
	 */
	public void setProductDescriptions(ProductDescriptions rules) {
		productDescriptions = rules;
	}

	/**
	 * @return
	 */
	public Errors getErrors() {
		return errors;
	}

	/**
	 * @param errors
	 */
	public void setErrors(Errors errors) {
		this.errors = errors;
	}

	/**
	 * @return
	 */
	public Warnings getWarnings() {
		return warnings;
	}

	/**
	 * @param errors
	 */
	public void setWarnings(Warnings warnings) {
		this.warnings = warnings;
	}

}
