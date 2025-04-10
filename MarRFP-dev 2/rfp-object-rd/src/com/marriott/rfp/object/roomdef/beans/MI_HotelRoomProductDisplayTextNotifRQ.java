/**
 * MI_HotelRoomPoolListRS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_HotelRoomProductDisplayTextNotifRQ implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private java.lang.String primaryLangID; // attribute
	private java.lang.Object POS;
	private Channel channel;
	private ProductDescriptions productDescriptions;
	private Brands brands;
	private Formats formats;
	private UnitsOfMeasure unitsOfMeasure;

	public MI_HotelRoomProductDisplayTextNotifRQ() {
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

	public java.lang.String getPrimaryLangID() {
		return primaryLangID;
	}

	public void setPrimaryLangID(java.lang.String primaryLangID) {
		this.primaryLangID = primaryLangID;
	}
	
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof MI_HotelRoomProductDisplayTextNotifRQ))
			return false;
		MI_HotelRoomProductDisplayTextNotifRQ other = (MI_HotelRoomProductDisplayTextNotifRQ) obj;
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
				&& ((echoToken == null && other.getEchoToken() == null) || (echoToken != null && echoToken.equals(other.getEchoToken())))
				&& ((version == null && other.getVersion() == null) || (version != null && version.equals(other.getVersion())))
				&& ((primaryLangID == null && other.getPrimaryLangID() == null) || (primaryLangID != null && primaryLangID.equals(other.getPrimaryLangID())))
				&& ((channel == null && other.getChannel() == null) || (channel != null && channel.equals(other.getChannel())))
		&& ((brands == null && other.getBrands() == null) || (brands != null && brands.equals(other.getBrands())))
		&& ((formats == null && other.getFormats() == null) || (formats != null && formats.equals(other.getFormats())))
		&& ((unitsOfMeasure == null && other.getUnitsOfMeasure() == null) || (unitsOfMeasure != null && unitsOfMeasure.equals(other.getUnitsOfMeasure())))
				&& ((productDescriptions == null && other.getProductDescriptions() == null)
					|| (productDescriptions != null && productDescriptions.equals(other.getProductDescriptions())));
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
		if (getPOS() != null) {
			_hashCode += getPOS().hashCode();
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
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc =
		new org.apache.axis.description.TypeDesc(MI_HotelRoomProductDisplayTextNotifRQ.class);

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
		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("POS");
		ele.setXmlName(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "POS"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("channel");
		ele.setXmlName(new javax.xml.namespace.QName("", "Channel"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Channel"));
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("brands");
		ele.setXmlName(new javax.xml.namespace.QName("", "Brands"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Brands"));
		ele.setMinOccurs(0);
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("formats");
		ele.setXmlName(new javax.xml.namespace.QName("", "Formats"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Formats"));
		ele.setMinOccurs(0);
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("unitsOfMeasure");
		ele.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasure"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "UnitsOfMeasure"));
		ele.setMinOccurs(0);
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("productDescriptions");
		ele.setXmlName(new javax.xml.namespace.QName("", "ProductDescriptions"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "ProductDescriptions"));
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
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
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
