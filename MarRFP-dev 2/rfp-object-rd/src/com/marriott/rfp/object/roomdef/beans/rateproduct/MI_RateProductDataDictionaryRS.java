/**
 * MI_HotelRoomPoolListRS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans.rateproduct;

import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class MI_RateProductDataDictionaryRS implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String success;
	private java.lang.String echoToken; // attribute
	private java.lang.String version; // attribute
	private RateProductDataDictionary dataDictionary;
	private Errors errors;

	public MI_RateProductDataDictionaryRS() {
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
		if (!(obj instanceof MI_RateProductDataDictionaryRS))
			return false;
		MI_RateProductDataDictionaryRS other = (MI_RateProductDataDictionaryRS) obj;
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
				&& ((dataDictionary == null && other.getRateProductDataDictionary() == null) || (dataDictionary != null && dataDictionary.equals(other.getRateProductDataDictionary())))
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
		if (getRateProductDataDictionary() != null) {
			_hashCode += getRateProductDataDictionary().hashCode();
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
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(MI_RateProductDataDictionaryRS.class);

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
		field.setFieldName("rateProductDataDictionary");
		field.setXmlName(new javax.xml.namespace.QName("", "RateProductDataDictionary"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "RateProductDataDictionary"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanSerializer(_javaType, _xmlType, typeDesc);
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
	public RateProductDataDictionary getRateProductDataDictionary() {
		return dataDictionary;
	}

	/**
	 * @param types
	 */
	public void setRateProductDataDictionary(RateProductDataDictionary dataDictionary) {
		this.dataDictionary = dataDictionary;
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

	public void copyInto(MI_RateProductDataDictionaryRS pd) {

	    RateProductDataDictionary origPD = pd.getRateProductDataDictionary();
		if (origPD != null) {
			this.dataDictionary = new RateProductDataDictionary(origPD);
			}

	}

}
