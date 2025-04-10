/**
 * Brands
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class AlternateTextList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String alternateTextListName; // attribute
	private java.lang.String alternateTextListCode; // attribute
	private java.lang.String alternateTextListBrandCode; // attribute
	private AlternateText[] alternateText;

	public AlternateTextList() {
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof AlternateTextList))
			return false;
		AlternateTextList other = (AlternateTextList) obj;
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
				&& ((alternateTextListName == null && other.getAlternateTextListName() == null) || (alternateTextListName != null && alternateTextListName.equals(other.getAlternateTextListName())))
				&& ((alternateTextListCode == null && other.getAlternateTextListCode() == null) || (alternateTextListCode != null && alternateTextListCode.equals(other.getAlternateTextListCode())))
				&& ((alternateTextListBrandCode == null && other.getAlternateTextListBrandCode() == null) || (alternateTextListBrandCode != null && alternateTextListBrandCode.equals(other.getAlternateTextListBrandCode())))
				&& ((alternateText == null && other.getAlternateText() == null) || (alternateText != null && java.util.Arrays.equals(alternateText, other.getAlternateText())));
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
		if (getAlternateTextListName() != null) {
			_hashCode += getAlternateTextListName().hashCode();
		}
		if (getAlternateTextListCode() != null) {
			_hashCode += getAlternateTextListCode().hashCode();
		}
		if (getAlternateTextListBrandCode() != null) {
			_hashCode += getAlternateTextListBrandCode().hashCode();
		}
		if (getAlternateText() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getAlternateText()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getAlternateText(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(AlternateTextList.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListName");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListCode");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListBrandCode");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListBrandCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);


		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("alternateText");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateText"));
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
	public java.lang.String getAlternateTextListBrandCode() {
		return alternateTextListBrandCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getAlternateTextListCode() {
		return alternateTextListCode;
	}


	/**
	 * @return
	 */
	public java.lang.String getAlternateTextListName() {
		return alternateTextListName;
	}

	/**
	 * @param string
	 */
	public void setAlternateTextListBrandCode(java.lang.String string) {
		alternateTextListBrandCode = string;
	}

	/**
	 * @param string
	 */
	public void setAlternateTextListCode(java.lang.String string) {
		alternateTextListCode = string;
	}


	/**
	 * @param string
	 */
	public void setAlternateTextListName(java.lang.String string) {
		alternateTextListName = string;
	}
	/**
	 * @return
	 */
	public AlternateText[] getAlternateText() {
		return alternateText;
	}

	public void setAlternateText(AlternateText[] alternateText) {
		this.alternateText = alternateText;
	}

	public AlternateText getAlternateText(int i) {
		return alternateText[i];
	}

	public void setAlternateText(int i, AlternateText value) {
		this.alternateText[i] = value;
	}


}
