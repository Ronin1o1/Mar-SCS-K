/**
 * Brands
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Brands implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String brandType; // attribute
	private java.lang.String brandList; // attribute
	private java.lang.String brandCode; // attribute
	private java.lang.String brandName; // attribute
	private Brand[] brand;

	public Brands() {
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Brands))
			return false;
		Brands other = (Brands) obj;
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
				&& ((brandType == null && other.getBrandType() == null) || (brandType != null && brandType.equals(other.getBrandType())))
				&& ((brandList == null && other.getBrandList() == null) || (brandList != null && brandList.equals(other.getBrandList())))
				&& ((brandCode == null && other.getBrandCode() == null) || (brandCode != null && brandCode.equals(other.getBrandCode())))
				&& ((brandName == null && other.getBrandName() == null) || (brandName != null && brandName.equals(other.getBrandName())))
				&& ((brand == null && other.getBrand() == null) || (brand != null && java.util.Arrays.equals(brand, other.getBrand())));
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
		if (getBrandType() != null) {
			_hashCode += getBrandType().hashCode();
		}
		if (getBrandList() != null) {
			_hashCode += getBrandList().hashCode();
		}
		if (getBrandCode() != null) {
			_hashCode += getBrandCode().hashCode();
		}
		if (getBrandName() != null) {
			_hashCode += getBrandName().hashCode();
		}
		if (getBrand() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getBrand()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getBrand(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Brands.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandType");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandType"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandList");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandList"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandCode");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("brandName");
		field.setXmlName(new javax.xml.namespace.QName("", "BrandName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("brand");
		field.setXmlName(new javax.xml.namespace.QName("", "Brand"));
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
	public java.lang.String getBrandCode() {
		return brandCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getBrandList() {
		return brandList;
	}

	/**
	 * @return
	 */
	public java.lang.String getBrandName() {
		return brandName;
	}

	/**
	 * @return
	 */
	public java.lang.String getBrandType() {
		return brandType;
	}

	/**
	 * @param string
	 */
	public void setBrandCode(java.lang.String string) {
		brandCode = string;
	}

	/**
	 * @param string
	 */
	public void setBrandList(java.lang.String string) {
		brandList = string;
	}

	/**
	 * @param string
	 */
	public void setBrandName(java.lang.String string) {
		brandName = string;
	}

	/**
	 * @param string
	 */
	public void setBrandType(java.lang.String string) {
		brandType = string;
	}
	/**
	 * @return
	 */
	public Brand[] getBrand() {
		return brand;
	}

	public void setBrand(Brand[] brand) {
		this.brand = brand;
	}

	public Brand getBrand(int i) {
		return brand[i];
	}

	public void setBrand(int i, Brand value) {
		this.brand[i] = value;
	}


}
