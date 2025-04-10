/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import java.math.BigDecimal;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class RateProductDefinitionList implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private java.lang.String RP_ListName; // attribute
	private java.lang.String RP_ListCode; // attribute
	private BigDecimal minOccurs; // attribute
	private BigDecimal maxOccurs; // attribute
    private Text text;
	private RateProductDefinitionGroup[] rateProductDefinitionGroup;

	public RateProductDefinitionList() {
	}

	public RateProductDefinitionList(RateProductDefinitionList pd) {
		copyInto(pd);
	}

	private java.lang.Object __equalsCalc = null;
	@Override
	public synchronized boolean equals(java.lang.Object obj) {
		if (!(obj instanceof RateProductDefinitionList))
			return false;
		RateProductDefinitionList other = (RateProductDefinitionList) obj;
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
				&& ((RP_ListName == null && other.getRP_ListName() == null)
					|| (RP_ListName != null && RP_ListName.equals(other.getRP_ListName())))
				&& ((RP_ListCode == null && other.getRP_ListCode() == null)
					|| (RP_ListCode != null && RP_ListCode.equals(other.getRP_ListCode())))
				&& ((minOccurs == null && other.getMinOccurs() == null) || (minOccurs != null && minOccurs.equals(other.getMinOccurs())))
				&& ((maxOccurs == null && other.getMaxOccurs() == null) || (maxOccurs != null && maxOccurs.equals(other.getMaxOccurs())))
                && ((text == null && other.getText() == null) || (text != null && text.equals(other.getText())))
				&& ((rateProductDefinitionGroup == null && other.getRateProductDefinitionGroup() == null)
					|| (rateProductDefinitionGroup != null && rateProductDefinitionGroup.equals(other.getRateProductDefinitionGroup())));
		__equalsCalc = null;
		return _equals;
	}

	/*
	 *  returns true if the attributes are equal.  The elements are not compared
	 */
	public synchronized boolean attributesEquals(java.lang.Object obj) {
		if (!(obj instanceof RateProductDefinitionList))
			return false;
		RateProductDefinitionList other = (RateProductDefinitionList) obj;
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
				&& ((RP_ListName == null && other.getRP_ListName() == null)
					|| (RP_ListName != null && RP_ListName.equals(other.getRP_ListName())))
				&& ((RP_ListCode == null && other.getRP_ListCode() == null)
					|| (RP_ListCode != null && RP_ListCode.equals(other.getRP_ListCode())));
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
		if (getRP_ListName() != null) {
			_hashCode += getRP_ListName().hashCode();
		}
		if (getRP_ListCode() != null) {
			_hashCode += getRP_ListCode().hashCode();
		}
		if (getMinOccurs() != null) {
			_hashCode += getMinOccurs().hashCode();
		}
		if (getMaxOccurs() != null) {
			_hashCode += getMaxOccurs().hashCode();
		}
	      if (getText() != null) {
	            _hashCode += getText().hashCode();
	        }
		if (getRateProductDefinitionGroup() != null) {
			for (int i = 0; i < java.lang.reflect.Array.getLength(getRateProductDefinitionGroup()); i++) {
				java.lang.Object obj = java.lang.reflect.Array.get(getRateProductDefinitionGroup(), i);
				if (obj != null && !obj.getClass().isArray()) {
					_hashCode += obj.hashCode();
				}
			}
		}
		__hashCodeCalc = false;
		return _hashCode;
	}

	// Type metadata
	private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinitionList.class);

	static {

		org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RP_ListName");
		field.setXmlName(new javax.xml.namespace.QName("", "RP_ListName"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("RP_ListCode");
		field.setXmlName(new javax.xml.namespace.QName("", "RP_ListCode"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("minOccurs");
		field.setXmlName(new javax.xml.namespace.QName("", "MinOccurs"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
		typeDesc.addFieldDesc(field);

		field = new org.apache.axis.description.AttributeDesc();
		field.setFieldName("maxOccurs");
		field.setXmlName(new javax.xml.namespace.QName("", "MaxOccurs"));
		field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
		typeDesc.addFieldDesc(field);

		org.apache.axis.description.ElementDesc ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("rateProductDefinitionGroup");
		ele.setXmlName(new javax.xml.namespace.QName("", "RateProductDefinitionGroup"));
		typeDesc.addFieldDesc(ele);

		 ele = new org.apache.axis.description.ElementDesc();
		ele.setFieldName("text");
		ele.setXmlName(new javax.xml.namespace.QName("", "Text"));
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


	/**
	 * @return
	 */
	public java.lang.String getRP_ListCode() {
		return RP_ListCode;
	}

	/**
	 * @return
	 */
	public java.lang.String getRP_ListName() {
		return RP_ListName;
	}

	/**
	 * @param string
	 */
	public void setRP_ListCode(java.lang.String string) {
		RP_ListCode = string;
	}

	/**
	 * @param string
	 */
	public void setRP_ListName(java.lang.String string) {
		RP_ListName = string;
	}

	/**
	 * @return
	 */
	public BigDecimal getMinOccurs() {
		return minOccurs;
	}

	/**
	 * @param decimal
	 */
	public void setMinOccurs(BigDecimal decimal) {
	    minOccurs = decimal;
	}

	/**
	 * @return
	 */
	public BigDecimal getMaxOccurs() {
		return maxOccurs;
	}

	/**
	 * @param decimal
	 */
	public void setMaxOccurs(BigDecimal decimal) {
	    maxOccurs = decimal;
	}


	public RateProductDefinitionGroup[] getRateProductDefinitionGroup() {
		return rateProductDefinitionGroup;
	}

	/**
	 * @param descriptions
	 */
	public void setRateProductDefinitionGroup(RateProductDefinitionGroup[] descriptions) {
		rateProductDefinitionGroup = descriptions;
	}

	public RateProductDefinitionGroup getRateProductDefinitionGroup(int i) {
		return rateProductDefinitionGroup[i];
	}

	public void setRateProductDefinitionGroup(int i, RateProductDefinitionGroup value) {
		this.rateProductDefinitionGroup[i] = value;
	}


	
	public void copyInto(RateProductDefinitionList pd) {
		this.setRP_ListCode(pd.getRP_ListCode());
		this.setRP_ListName(pd.getRP_ListName());
		this.setMinOccurs(pd.getMinOccurs());
		this.setMaxOccurs(pd.getMaxOccurs());
		this.setText(pd.getText());

		RateProductDefinitionGroup[] origPD = pd.getRateProductDefinitionGroup();
		if (origPD != null) {
			this.rateProductDefinitionGroup = new RateProductDefinitionGroup[origPD.length];
			for (int i = 0; i < origPD.length; i++) {
				RateProductDefinitionGroup newpd = new RateProductDefinitionGroup(origPD[i]);
				this.rateProductDefinitionGroup[i] = newpd;
			}
		}

	}

	public void copyIntoAttributes(RateProductDefinitionList pd) {
		this.setRP_ListCode(pd.getRP_ListCode());
		this.setRP_ListName(pd.getRP_ListName());
		this.setMinOccurs(pd.getMinOccurs());
		this.setMaxOccurs(pd.getMaxOccurs());
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
