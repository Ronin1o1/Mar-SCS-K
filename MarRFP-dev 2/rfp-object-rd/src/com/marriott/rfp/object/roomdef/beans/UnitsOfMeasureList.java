/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;

public class UnitsOfMeasureList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private UnitsOfMeasure[] unitsOfMeasure;

	public UnitsOfMeasureList() {
	}

	public UnitsOfMeasure[] getUnitsOfMeasure() {
		return unitsOfMeasure;
	}

	public void setUnitsOfMeasure(UnitsOfMeasure[] unitsOfMeasure) {
		this.unitsOfMeasure = unitsOfMeasure;
	}

	public UnitsOfMeasure getUnitsOfMeasure(int i) {
			return unitsOfMeasure[i];
		}

		public void setUnitsOfMeasure(int i, UnitsOfMeasure value) {
			this.unitsOfMeasure[i] = value;
		}
	
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof UnitsOfMeasureList))
			return false;
		UnitsOfMeasureList other = (UnitsOfMeasureList) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((unitsOfMeasure == null && other.getUnitsOfMeasure() == null) || (unitsOfMeasure != null && java.util.Arrays.equals(unitsOfMeasure, other.getUnitsOfMeasure())));
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
		if (getUnitsOfMeasure() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getUnitsOfMeasure()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getUnitsOfMeasure(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(UnitsOfMeasureList.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("unitsOfMeasure");
		field.setXmlName(new javax.xml.namespace.QName("", "UnitsOfMeasure"));
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

}
