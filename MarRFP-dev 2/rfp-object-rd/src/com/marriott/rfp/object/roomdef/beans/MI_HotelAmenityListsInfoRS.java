/**
 * MI_HotelRoomPoolListRS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_HotelAmenityListsInfoRS implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private BrandsList brandsList;
	private FormatsList formatsList;
	private UnitsOfMeasureList unitsOfMeasureList;
	private Errors errors;

	public MI_HotelAmenityListsInfoRS() {
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

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof MI_HotelAmenityListsInfoRS))
			return false;
		MI_HotelAmenityListsInfoRS other = (MI_HotelAmenityListsInfoRS) obj;
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
				&& ((brandsList == null && other.getBrandsList() == null) || (brandsList != null && brandsList.equals(other.getBrandsList())))
				&& ((formatsList == null && other.getFormatsList() == null) || (formatsList != null && formatsList.equals(other.getFormatsList())))
				&& ((unitsOfMeasureList == null && other.getUnitsOfMeasureList() == null) || (unitsOfMeasureList != null && unitsOfMeasureList.equals(other.getUnitsOfMeasureList())))
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
		if (getBrandsList() != null) {
			_hashCode += getBrandsList().hashCode();
		}
		if (getFormatsList() != null) {
			_hashCode += getFormatsList().hashCode();
		}
		if (getUnitsOfMeasureList() != null) {
			_hashCode += getUnitsOfMeasureList().hashCode();
		}
		if (getSuccess() != null) {
			_hashCode += getSuccess().hashCode();
		}
		if (getErrors() != null) {
			_hashCode += getErrors().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_HotelAmenityListsInfoRS.class);

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
		field.setFieldName("success");
		field.setXmlName(new javax.xml.namespace.QName("", "Success"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("brandsList");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandsList"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("formatsList");
		field.setXmlName(new javax.xml.namespace.QName("", "FormatsList"));
		typeDesc.addFieldDesc(field);
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("unitsOfMeasureList");
		field.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasureList"));
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
	public BrandsList getBrandsList() {
		return brandsList;
	}

	/**
	 * @return
	 */
	public FormatsList getFormatsList() {
		return formatsList;
	}

	/**
	 * @return
	 */
	public UnitsOfMeasureList getUnitsOfMeasureList() {
		return unitsOfMeasureList;
	}

	/**
	 * @param list
	 */
	public void setBrandsList(BrandsList list) {
		brandsList = list;
	}

	/**
	 * @param list
	 */
	public void setFormatsList(FormatsList list) {
		formatsList = list;
	}

	/**
	 * @param list
	 */
	public void setUnitsOfMeasureList(UnitsOfMeasureList list) {
		unitsOfMeasureList = list;
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

}
