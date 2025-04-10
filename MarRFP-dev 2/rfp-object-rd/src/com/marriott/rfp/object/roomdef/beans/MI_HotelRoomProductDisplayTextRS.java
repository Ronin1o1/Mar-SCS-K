/**
 * MI_HotelRoomPoolListRS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_HotelRoomProductDisplayTextRS implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private java.lang.String primaryLangID; // attribute
	private Channel channel;
	private ProductDescriptions productDescriptions;
	private Brands brands;
	private Formats formats;
	private UnitsOfMeasure unitsOfMeasure;
	private Errors errors;

	public MI_HotelRoomProductDisplayTextRS() {
	}

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
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

	public java.lang.String getPrimaryLangID() {
		return primaryLangID;
	}

	public void setPrimaryLangID(java.lang.String primaryLangID) {
		this.primaryLangID = primaryLangID;
	}
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof MI_HotelRoomProductDisplayTextRS))
			return false;
		MI_HotelRoomProductDisplayTextRS other = (MI_HotelRoomProductDisplayTextRS) obj;
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
				&& ((success == null && other.getSuccess() == null) || (success != null && success.equals(other.getSuccess())))
				&& ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
				&& ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())))
				&& ((primaryLangID == null && other.getPrimaryLangID() == null) || (primaryLangID != null && primaryLangID.equals(other.getPrimaryLangID())))
				&& ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
		&& ((brands == null && other.getBrands() == null) || (brands != null && brands.equals(other.getBrands())))
		&& ((formats == null && other.getFormats() == null) || (formats != null && formats.equals(other.getFormats())))
		&& ((unitsOfMeasure == null && other.getUnitsOfMeasure() == null) || (unitsOfMeasure != null && unitsOfMeasure.equals(other.getUnitsOfMeasure())))
		&& ((productDescriptions == null && other.getProductDescriptions() == null) || (productDescriptions != null && productDescriptions.equals(other.getProductDescriptions())))
				&& ((errors == null && other.getErrors() == null) || (errors != null && errors.equals(other.getErrors())));
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
		if (getEchoToken() != null) {
			_hashCode += getEchoToken().hashCode();
		}
		if (getVersion() != null) {
			_hashCode += getVersion().hashCode();
		}
		if (getPrimaryLangID() != null) {
			_hashCode += getPrimaryLangID().hashCode();
		}
		if (getChannel() != null) {
			_hashCode += getChannel().hashCode();
		}
		if (getBrands() != null) {
			_hashCode += getBrands().hashCode();
		}
		if (getFormats() != null) {
			_hashCode += getFormats().hashCode();
		}
		if (getUnitsOfMeasure() != null) {
			_hashCode += getUnitsOfMeasure().hashCode();
		}
		if (getProductDescriptions() != null) {
			_hashCode += getProductDescriptions().hashCode();
		}
		if (getErrors() != null) {
			_hashCode += getErrors().hashCode();
		}
		if (getSuccess() != null) {
			_hashCode += getSuccess().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelRoomProductDisplayTextRS.class);

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
		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("primaryLangID");
		field.setXmlName(new javax.xml.namespace.QName("", "PrimaryLangID"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("success");
		field.setXmlName(new javax.xml.namespace.QName("", "Success"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("channel");
		field.setXmlName(new javax.xml.namespace.QName("", "Channel"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Channel"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("brands");
		field.setXmlName(new javax.xml.namespace.QName("", "Brands"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Brands"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("formats");
		field.setXmlName(new javax.xml.namespace.QName("", "Formats"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Formats"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("unitsOfMeasure");
		field.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasure"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "UnitsOfMeasure"));
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
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
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
	public Channel getChannel() {
		return channel;
	}

	/**
	 * @param channel
	 */
	public void setChannel(Channel channel) {
		this.channel = channel;
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
	public Brands getBrands() {
		return brands;
	}

	/**
	 * @return
	 */
	public Formats getFormats() {
		return formats;
	}

	/**
	 * @return
	 */
	public UnitsOfMeasure getUnitsOfMeasure() {
		return unitsOfMeasure;
	}

	/**
	 * @param brands
	 */
	public void setBrands(Brands brands) {
		this.brands = brands;
	}

	/**
	 * @param formats
	 */
	public void setFormats(Formats formats) {
		this.formats = formats;
	}

	/**
	 * @param measure
	 */
	public void setUnitsOfMeasure(UnitsOfMeasure measure) {
		unitsOfMeasure = measure;
	}

}
