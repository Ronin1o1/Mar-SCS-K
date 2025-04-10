/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class Entries implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name;
	private String code;
	private Entry[] entry;
	

	public Entries() {
	}


	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof Entries))
			return false;
		Entries other = (Entries) obj;
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
		&& ((name == null && other.getName() == null) || (name != null && name.equals(other.getName())))
		&& ((code == null && other.getCode() == null) || (code != null && code.equals(other.getCode())))
		&& ((entry == null && other.getEntry() == null) || (entry != null && java.util.Arrays.equals(entry, other.getEntry())));
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
		if (getEntry() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getEntry()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getEntry(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Entries.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("name");
		field.setXmlName(new javax.xml.namespace.QName("", "Name"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("code");
		field.setXmlName(new javax.xml.namespace.QName("", "Code"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);
		
		field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("entry");
		field.setXmlName(new javax.xml.namespace.QName("", "Entry"));
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

	/**
	 * @return
	 */
	public Entry[] getEntry() {
		return entry;
	}

	/**
	 * @param formatses
	 */
	public void setEntry(Entry[] theentry) {
		entry = theentry;
	}



	public Entry getEntry(int i) {
		return entry[i];
	}

	public void setEntry(int i, Entry value) {
		this.entry[i] = value;
	}

	/**
	 * @return
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param string
	 */
	public void setCode(String string) {
		code = string;
	}

	/**
	 * @param string
	 */
	public void setName(String string) {
		name = string;
	}

}
