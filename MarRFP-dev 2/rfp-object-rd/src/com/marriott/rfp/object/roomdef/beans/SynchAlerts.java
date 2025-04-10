/**
 * RoomTypes.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class SynchAlerts implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private SynchAlert[] synchAlert;

	public SynchAlerts() {
	}

	public SynchAlert[] getSynchAlert() {
		return synchAlert;
	}

	public void setSynchAlert(SynchAlert[] synchAlert) {
		this.synchAlert = synchAlert;
	}

	public SynchAlert getSynchAlert(int i) {
			return synchAlert[i];
		}

		public void setSynchAlert(int i, SynchAlert value) {
			this.synchAlert[i] = value;
		}
	
	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof SynchAlerts))
			return false;
		SynchAlerts other = (SynchAlerts) obj;
		if (obj == null)
			return false;
		if (this == obj)
			return true;
		if (__equalsCalc != null) {
			return (__equalsCalc == obj);
		}
		__equalsCalc = obj;
		boolean _equals;
		_equals = true && ((synchAlert == null && other.getSynchAlert() == null) || (synchAlert != null && java.util.Arrays.equals(synchAlert, other.getSynchAlert())));
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
		if (getSynchAlert() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getSynchAlert()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getSynchAlert(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(SynchAlerts.class);

	static {
		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
		field.setFieldName("synchAlert");
		field.setXmlName(new javax.xml.namespace.QName("", "SynchAlert"));
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
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType, javax.xml.namespace.QName _xmlType) {
		return new org.apache.axis.encoding.ser.BeanDeserializer(_javaType, _xmlType, typeDesc);
	}


}
