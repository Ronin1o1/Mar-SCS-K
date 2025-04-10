/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RateProductDefinitionLists implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected Text text;
	private RateProductDefinitionList[] rateProductDefinitionList;

	public RateProductDefinitionLists() {
	}

	public RateProductDefinitionLists(RateProductDefinitionLists pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RateProductDefinitionLists))
			return false;
		RateProductDefinitionLists other = (RateProductDefinitionLists) obj;
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
            && ((text == null && other.getText() == null) || (text != null && text.equals(other.getText())))
				&& ((rateProductDefinitionList == null && other.getRateProductDefinitionList() == null)
					|| (rateProductDefinitionList != null && rateProductDefinitionList.equals(other.getRateProductDefinitionList())));
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
	      if (getText() != null) {
	            _hashCode += getText().hashCode();
	        }
		if (getRateProductDefinitionList() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRateProductDefinitionList()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRateProductDefinitionList(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitionLists.class);

	static {

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("text");
		ele.setXmlName(new javax.xml.namespace.QName("", "Text"));
		typeDesc.addFieldDesc(ele);
		
		ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("rateProductDefinitionList");
		ele.setXmlName(new javax.xml.namespace.QName("", "RateProductDefinitionList"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
	}

	/**
	 * Get Custom Deserializer
	 */
	public static org.apache.axis.encoding.Deserializer getDeserializer(
		java.lang.String mechType,
		java.lang.Class _javaType,
		javax.xml.namespace.QName _xmlType) {
		return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
	}




	public RateProductDefinitionList[] getRateProductDefinitionList() {
		return rateProductDefinitionList;
	}

	/**
	 * @param descriptions
	 */
	public void setRateProductDefinitionList(RateProductDefinitionList[] descriptions) {
		rateProductDefinitionList = descriptions;
	}

	public RateProductDefinitionList getRateProductDefinitionList(int i) {
		return rateProductDefinitionList[i];
	}

	public void setRateProductDefinitionList(int i, RateProductDefinitionList value) {
		this.rateProductDefinitionList[i] = value;
	}


	
	public void copyInto(RateProductDefinitionLists pd) {

		RateProductDefinitionList[] origPD = pd.getRateProductDefinitionList();
		if (origPD != null) {
			this.rateProductDefinitionList = new RateProductDefinitionList[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				RateProductDefinitionList newpd = new RateProductDefinitionList(origPD[i]);
				this.rateProductDefinitionList[i] = newpd;
			}
		}

	}


    /**
     * @return Returns the text.
     */
    public Text getText() {
        return text;
    }
    /**
     * @param text The text to set.
     */
    public void setText(Text text) {
        this.text = text;
    }
}
