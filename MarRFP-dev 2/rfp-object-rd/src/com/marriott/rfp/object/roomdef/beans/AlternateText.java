/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_DisplayTextRSSerializer;

public class AlternateText implements java.io.Serializable, org.apache.axis.encoding.SimpleType  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String alternateTextListName; // attribute
	private java.lang.String alternateTextListCode; // attribute
	private java.lang.String alternateTextListBrandCode; // attribute
	private java.lang.String alternateTextCode; // attribute
	private java.lang.String alternateTextName; // attribute
	private java.lang.String defaultInd; // attribute
	private java.lang.String value;

	public AlternateText() {
	}

	public AlternateText(AlternateText alternateText) {
		super();
		copyInto(alternateText);
	}

	// Simple Types must have a String constructor
	public AlternateText(java.lang.String value) {
		this.value = new java.lang.String(value);
	}

	// Simple Types must have a toString for serializing the value
	@Override
	public java.lang.String toString() {
		return value == null ? null : value.toString();
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof AlternateText))
			return false;
		AlternateText other = (AlternateText) obj;
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
				&& ((alternateTextCode == null && other.getAlternateTextCode() == null) || (alternateTextCode != null && alternateTextCode.equals(other.getAlternateTextCode())))
				&& ((alternateTextName == null && other.getAlternateTextName() == null) || (alternateTextName != null && alternateTextName.equals(other.getAlternateTextName())))
				&& ((defaultInd == null && other.getDefaultInd() == null) || (defaultInd != null && defaultInd.equals(other.getDefaultInd())))
		&& ((value == null && other.getValue() == null) || (value != null && value.equals(other.getValue())));
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
		if (getAlternateTextCode() != null) {
			_hashCode += getAlternateTextCode().hashCode();
		}
		if (getAlternateTextName() != null) {
			_hashCode += getAlternateTextName().hashCode();
		}
		if (getDefaultInd() != null) {
			_hashCode += getDefaultInd().hashCode();
		}
		if (getValue() != null) {
			_hashCode += getValue().hashCode();
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc alternateTextDesc = new org.apache.axis.description.TypeDesc(AlternateText.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListName");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListCode");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextListBrandCode");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextListBrandCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextCode");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("alternateTextName");
		field.setXmlName(new javax.xml.namespace.QName("", "AlternateTextName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("defaultInd");
		field.setXmlName(new javax.xml.namespace.QName("", "DefaultInd"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("value");
		ele.setXmlName(new javax.xml.namespace.QName("", "value"));
		ele.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		alternateTextDesc.addFieldDesc(field);
	};

	/**
	 * Return alternateText metadata object
	 */
	public static org.apache.axis.description.TypeDesc getAlternateTextDesc() {
		return alternateTextDesc;
	}


	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Serializer getSerializer(
			java.lang.String mechType,
			java.lang.Class _javaType,
			javax.xml.namespace.QName _xmlType) {
			return new MI_DisplayTextRSSerializer(_javaType, _xmlType, alternateTextDesc);
		}


	/**
	 * Get Custom Deserializer
	 */
	@SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.SimpleDeserializer(_javaType, _xmlType, alternateTextDesc);
	}

	/**
	 * @return
	 */
	public java.lang.String getAlternateTextCode() {
		return alternateTextCode;
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
	public java.lang.String getAlternateTextListBrandCode() {
		return alternateTextListBrandCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getAlternateTextName() {
		return alternateTextName;
	}
	/**
	 * @return
	 */
	public java.lang.String getDefaultInd() {
		return defaultInd;
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
	public void setAlternateTextCode(java.lang.String string) {
		alternateTextCode = string;
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
	public void setAlternateTextListBrandCode(java.lang.String string) {
		alternateTextListBrandCode = string;
	}

	/**
	 * @param string
	 */
	public void setAlternateTextName(java.lang.String string) {
		alternateTextName = string;
	}

	/**
	 * @param string
	 */
	public void setDefaultInd(java.lang.String string) {
		defaultInd = string;
	}

	/**
	 * @param string
	 */
	public void setAlternateTextListName(java.lang.String string) {
		alternateTextListName = string;
	}

	

	
 

	void copyInto(AlternateText alternateText) {
		this.alternateTextCode = alternateText.alternateTextCode;
		this.alternateTextListCode = alternateText.alternateTextListCode;
		this.alternateTextListBrandCode = alternateText.alternateTextListBrandCode;
		this.alternateTextName = alternateText.alternateTextName;
		this.alternateTextListName = alternateText.alternateTextListName;
		this.value=alternateText.value;
	}

	void copyDataInto(AlternateText alternateText) {
		this.alternateTextCode = alternateText.alternateTextCode;
		this.alternateTextListBrandCode = alternateText.alternateTextListBrandCode;
		this.value=alternateText.value;
	}
	
	/**
	 * @return
	 */
	public java.lang.String getValue() {
		return value;
	}

	/**
	 * @param string
	 */
	public void setValue(java.lang.String string) {
		value = string;
	}

}
