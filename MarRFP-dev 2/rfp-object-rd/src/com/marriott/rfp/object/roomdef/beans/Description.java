/**
 * Description.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import java.math.BigDecimal;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class Description implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Text[] text;

    public Description() {
    }

    public Description(Description description) {
        super();
        copyInto(description);
    }

    public Text[] getText() {
        return text;
    }

    public Text getText(int i) {
        return text[i];
    }

    public void setText(Text[] text) {
        this.text = text;
    }

    public void setText(int i, Text value) {
        this.text[i] = value;
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Description))
            return false;
        Description other = (Description) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && ((text == null && other.getText() == null) || (text != null && text.equals(other.getText())));
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
            for (int i = 0; i < java.lang.reflect.Array.getLength(getText()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getText(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(Description.class);

    static {
        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.ElementDesc();
        field.setFieldName("text");
        field.setXmlName(new javax.xml.namespace.QName("", "Text"));
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
	public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    @SuppressWarnings("unchecked")
	public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

    void copyInto(Description desc) {
        Text[] origTxt = desc.getText();
        if (origTxt != null) {
            this.text = new Text[origTxt.length];
            for (int i = 0; i < origTxt.length; i++) {
                Text newTxt = new Text(origTxt[i]);
                this.text[i] = newTxt;
            }
        }

    }

    void copyDataInto(Description desc) {
        BigDecimal maxLength=new BigDecimal(0);
        if (this.text != null && this.text.length>0)
            maxLength=this.text[0].getMaxLength();
        
        Text[] origTxt = desc.getText();
        if (origTxt != null) {
            this.text = new Text[origTxt.length];
            for (int i = 0; i < origTxt.length; i++) {
                Text newTxt = new Text(origTxt[i]);
                newTxt.setMaxLength(maxLength);
                this.text[i] = newTxt;
            }
        }

    }
    
}
