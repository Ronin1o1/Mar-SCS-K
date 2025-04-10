/**
 * RoomType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef.beans;

import java.math.BigDecimal;

import org.apache.axis.description.ElementDesc;

import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSDeserializer;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListRSSerializer;

public class ProductDescription implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected java.lang.String elementTypeName; // attribute
    protected java.lang.String elementTypeCode; // attribute
    protected java.lang.String elementGroupName; // attribute
    protected java.lang.String elementGroupCode; // attribute
    protected java.lang.String elementCodeList; // attribute
    protected java.lang.String elementCode; // attribute
    protected java.lang.String elementCodeName; // attribute
    protected java.lang.String availabilityInd = " "; // attribute
    protected java.lang.String addOnAmenityInd; // attribute
    protected java.lang.String calloutInd; // attribute
    protected java.lang.String mustComplete; // attribute
    protected java.lang.String marshaOriginatedInd; //attribute
    protected BigDecimal quantity; //attribute
    protected BigDecimal roomNumber; //attribute
    protected Brand brand;
    protected Format format;
    protected UnitOfMeasure unitOfMeasure;
    protected Description description;
    protected SupplementaryData[] supplementaryData;

    public ProductDescription() {
    }

    public ProductDescription(ProductDescription pd) {
        super();
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ProductDescription))
            return false;
        ProductDescription other = (ProductDescription) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true
                && ((elementTypeName == null && other.getElementTypeName() == null) || (elementTypeName != null && elementTypeName.equals(other
                        .getElementTypeName())))
                && ((elementTypeCode == null && other.getElementTypeCode() == null) || (elementTypeCode != null && elementTypeCode.equals(other
                        .getElementTypeCode())))
                && ((elementGroupName == null && other.getElementGroupName() == null) || (elementGroupName != null && elementGroupName.equals(other
                        .getElementGroupName())))
                && ((elementGroupCode == null && other.getElementGroupCode() == null) || (elementGroupCode != null && elementGroupCode.equals(other
                        .getElementGroupCode())))
                && ((elementCodeList == null && other.getElementCodeList() == null) || (elementCodeList != null && elementCodeList.equals(other
                        .getElementCodeList())))
                && ((elementCode == null && other.getElementCode() == null) || (elementCode != null && elementCode.equals(other.getElementCode())))
                && ((elementCodeName == null && other.getElementCodeName() == null) || (elementCodeName != null && elementCodeName.equals(other
                        .getElementCodeName())))
                && ((availabilityInd == null && other.getAvailabilityInd() == null) || (availabilityInd != null && availabilityInd.equals(other
                        .getAvailabilityInd())))
                && ((calloutInd == null && other.getCalloutInd() == null) || (calloutInd != null && calloutInd.equals(other.getCalloutInd())))
                && ((addOnAmenityInd == null && other.getAddOnAmenityInd() == null) || (addOnAmenityInd != null && addOnAmenityInd.equals(other
                        .getAddOnAmenityInd())))
                && ((mustComplete == null && other.getMustComplete() == null) || (mustComplete != null && mustComplete
                        .equals(other.getMustComplete())))
                && ((marshaOriginatedInd == null && other.getMarshaOriginatedInd() == null) || (marshaOriginatedInd != null && marshaOriginatedInd
                        .equals(other.getMarshaOriginatedInd())))
                && ((quantity == null && other.getQuantity() == null) || (quantity != null && quantity.equals(other.getQuantity())))
                && ((roomNumber == null && other.getRoomNumber() == null) || (roomNumber != null && roomNumber.equals(other.getRoomNumber())))
                && ((brand == null && other.getBrand() == null) || (brand != null && brand.equals(other.getBrand())))
                && ((unitOfMeasure == null && other.getUnitOfMeasure() == null) || (unitOfMeasure != null && unitOfMeasure.equals(other
                        .getUnitOfMeasure())))
                && ((format == null && other.getFormat() == null) || (format != null && format.equals(other.getFormat())))
                && ((description == null && other.getDescription() == null) || (description != null && description.equals(other.getDescription())))
                && ((supplementaryData == null && other.getSupplementaryData() == null) || (supplementaryData != null && supplementaryData
                        .equals(other.getSupplementaryData())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the ElementCode% attributes are equal. The elements are
     * not compared
     */
    public synchronized boolean elementCodeEquals(java.lang.Object obj) {
        if (!(obj instanceof ProductDescription))
            return false;
        ProductDescription other = (ProductDescription) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true
                && ((elementCodeList == null && other.getElementCodeList() == null) || (elementCodeList != null && elementCodeList.equals(other
                        .getElementCodeList())))
                && ((elementCode == null && other.getElementCode() == null) || (elementCode != null && elementCode.equals(other.getElementCode())))
                && ((elementCodeName == null && other.getElementCodeName() == null) || (elementCodeName != null && elementCodeName.equals(other
                        .getElementCodeName())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the ElementCode% attributes are equal. The elements are
     * not compared
     */
    public synchronized boolean elementCodeandRoomEquals(java.lang.Object obj) {
        if (!(obj instanceof ProductDescription))
            return false;
        ProductDescription other = (ProductDescription) obj;
        if (obj == null)
            return false;
        if (this == obj)
            return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true
                && ((elementCodeList == null && other.getElementCodeList() == null) || (elementCodeList != null && elementCodeList.equals(other
                        .getElementCodeList())))
                && ((elementCode == null && other.getElementCode() == null) || (elementCode != null && elementCode.equals(other.getElementCode())))
                && ((elementCodeName == null && other.getElementCodeName() == null) || (elementCodeName != null && elementCodeName.equals(other
                        .getElementCodeName())))
                && ((roomNumber == null && other.getRoomNumber() == null) || (roomNumber != null && roomNumber.equals(other.getRoomNumber())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the ElementCode% attributes are equal. The elements are
     * not compared
     */
    public boolean elementCodeMatch(String eleCodeList, String eleCode) {
        boolean _equals;
        String testCodeList = elementCodeList.trim();
        _equals = testCodeList.equals(eleCodeList) && elementCode.equals(eleCode);
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
        if (getElementTypeName() != null) {
            _hashCode += getElementTypeName().hashCode();
        }
        if (getElementTypeCode() != null) {
            _hashCode += getElementTypeCode().hashCode();
        }
        if (getElementGroupName() != null) {
            _hashCode += getElementGroupName().hashCode();
        }
        if (getElementGroupCode() != null) {
            _hashCode += getElementGroupCode().hashCode();
        }
        if (getElementCodeList() != null) {
            _hashCode += getElementCodeList().hashCode();
        }
        if (getElementCode() != null) {
            _hashCode += getElementCode().hashCode();
        }
        if (getElementCodeName() != null) {
            _hashCode += getElementCodeName().hashCode();
        }
        if (getAvailabilityInd() != null) {
            _hashCode += getAvailabilityInd().hashCode();
        }
        if (getCalloutInd() != null) {
            _hashCode += getCalloutInd().hashCode();
        }
        if (getAddOnAmenityInd() != null) {
            _hashCode += getAddOnAmenityInd().hashCode();
        }
        if (getMustComplete() != null) {
            _hashCode += getMustComplete().hashCode();
        }
        if (getBrand() != null) {
            _hashCode += getBrand().hashCode();
        }
        if (getUnitOfMeasure() != null) {
            _hashCode += getUnitOfMeasure().hashCode();
        }
        if (getFormat() != null) {
            _hashCode += getFormat().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getMarshaOriginatedInd() != null) {
            _hashCode += getMarshaOriginatedInd().hashCode();
        }
        if (getQuantity() != null) {
            _hashCode += getQuantity().hashCode();
        }
        if (getRoomNumber() != null) {
            _hashCode += getRoomNumber().hashCode();
        }
        if (getSupplementaryData() != null) {
            for (int i = 0; i < java.lang.reflect.Array.getLength(getSupplementaryData()); i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getSupplementaryData(), i);
                if (obj != null && !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(ProductDescription.class);

    static {

        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementTypeName");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementTypeName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementTypeCode");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementTypeCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementGroupName");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementGroupName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementGroupCode");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementGroupCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementCodeList");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementCodeList"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementCode");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("elementCodeName");
        field.setXmlName(new javax.xml.namespace.QName("", "ElementCodeName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("availabilityInd");
        field.setXmlName(new javax.xml.namespace.QName("", "AvailabilityInd"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("addOnAmenityInd");
        field.setXmlName(new javax.xml.namespace.QName("", "AddOnAmenityInd"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("calloutInd");
        field.setXmlName(new javax.xml.namespace.QName("", "CalloutInd"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("mustComplete");
        field.setXmlName(new javax.xml.namespace.QName("", "MustComplete"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("marshaOriginatedInd");
        field.setXmlName(new javax.xml.namespace.QName("", "MarshaOriginatedInd"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("quantity");
        field.setXmlName(new javax.xml.namespace.QName("", "Quantity"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("roomNumber");
        field.setXmlName(new javax.xml.namespace.QName("", "RoomNumber"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
        typeDesc.addFieldDesc(field);

        ElementDesc ele = new ElementDesc();
        ele.setFieldName("brand");
        ele.setXmlName(new javax.xml.namespace.QName("", "Brand"));
        ele.setMinOccurs(0);
        ele.setNillable(false);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("unitOfMeasure");
        ele.setXmlName(new javax.xml.namespace.QName("", "UnitOfMeasure"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("format");
        ele.setXmlName(new javax.xml.namespace.QName("", "Format"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("description");
        ele.setXmlName(new javax.xml.namespace.QName("", "Description"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new org.apache.axis.description.ElementDesc();
        ele.setFieldName("supplementaryData");
        ele.setXmlName(new javax.xml.namespace.QName("", "SupplementaryData"));
        ele.setMinOccurs(0);
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
    public static org.apache.axis.encoding.Serializer getSerializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new MI_HotelListRSSerializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(java.lang.String mechType, java.lang.Class _javaType,
            javax.xml.namespace.QName _xmlType) {
        return new MI_HotelListRSDeserializer(_javaType, _xmlType, typeDesc);
    }

    /**
     * @return
     */
    public java.lang.String getAddOnAmenityInd() {
        return addOnAmenityInd;
    }

    /**
     * @return
     */
    public java.lang.String getAvailabilityInd() {
        return availabilityInd;
    }

    /**
     * @return
     */
    public java.lang.String getCalloutInd() {
        return calloutInd;
    }

    /**
     * @return
     */
    public java.lang.String getElementCode() {
        return elementCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementCodeList() {
        return elementCodeList;
    }

    /**
     * @return
     */
    public java.lang.String getElementGroupCode() {
        return elementGroupCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementGroupName() {
        return elementGroupName;
    }

    /**
     * @return
     */
    public java.lang.String getElementTypeCode() {
        return elementTypeCode;
    }

    /**
     * @return
     */
    public java.lang.String getElementTypeName() {
        return elementTypeName;
    }

    /**
     * @return
     */
    public java.lang.String getMustComplete() {
        return mustComplete;
    }

    /**
     * @param string
     */
    public void setAddOnAmenityInd(java.lang.String string) {
        addOnAmenityInd = string;
    }

    /**
     * @param string
     */
    public void setAvailabilityInd(java.lang.String string) {
        if (string == null || string.equals(""))
            string = " ";
        availabilityInd = string;
    }

    /**
     * @param string
     */
    public void setCalloutInd(java.lang.String string) {
        calloutInd = string;
    }

    /**
     * @param string
     */
    public void setElementCode(java.lang.String string) {
        elementCode = string;
    }

    /**
     * @param string
     */
    public void setElementCodeList(java.lang.String string) {
        elementCodeList = string;
    }

    /**
     * @param string
     */
    public void setElementGroupCode(java.lang.String string) {
        elementGroupCode = string;
    }

    /**
     * @param string
     */
    public void setElementGroupName(java.lang.String string) {
        elementGroupName = string;
    }

    /**
     * @param string
     */
    public void setElementTypeCode(java.lang.String string) {
        elementTypeCode = string;
    }

    /**
     * @param string
     */
    public void setElementTypeName(java.lang.String string) {
        elementTypeName = string;
    }

    /**
     * @param string
     */
    public void setMustComplete(java.lang.String string) {
        mustComplete = string;
    }

    /**
     * @return
     */
    public java.lang.String getElementCodeName() {
        return elementCodeName;
    }

    /**
     * @param string
     */
    public void setElementCodeName(java.lang.String string) {
        elementCodeName = string;
    }

    /**
     * @return
     */
    public java.lang.String getMarshaOriginatedInd() {
        return marshaOriginatedInd;
    }

    /**
     * @param string
     */
    public void setMarshaOriginatedInd(java.lang.String string) {
        marshaOriginatedInd = string;
    }

    /**
     * @return
     */
    public BigDecimal getQuantity() {
        return quantity;
    }

    /**
     * @param decimal
     */
    public void setQuantity(BigDecimal decimal) {
        quantity = decimal;
    }

    /**
     * @return
     */
    public Brand getBrand() {
        return brand;
    }

    /**
     * @return
     */
    public Description getDescription() {
        return description;
    }

    /**
     * @return
     */
    public Format getFormat() {
        return format;
    }

    /**
     * @return
     */
    public UnitOfMeasure getUnitOfMeasure() {
        return unitOfMeasure;
    }

    /**
     * @param brand
     */
    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    /**
     * @param description
     */
    public void setDescription(Description description) {
        this.description = description;
    }

    /**
     * @param format
     */
    public void setFormat(Format format) {
        this.format = format;
    }

    /**
     * @param measure
     */
    public void setUnitOfMeasure(UnitOfMeasure measure) {
        unitOfMeasure = measure;
    }

    /**
     * @return
     */
    public BigDecimal getRoomNumber() {
        return roomNumber;
    }

    /**
     * @param decimal
     */
    public void setRoomNumber(BigDecimal decimal) {
        roomNumber = decimal;
    }

    /**
     * @return
     */
    public SupplementaryData[] getSupplementaryData() {
        return supplementaryData;
    }

    /**
     * @param datas
     */
    public void setSupplementaryData(SupplementaryData[] datas) {
        supplementaryData = datas;
    }

    public SupplementaryData getSupplementaryData(int i) {
        return supplementaryData[i];
    }

    public void setSupplementaryData(int i, SupplementaryData value) {
        this.supplementaryData[i] = value;
    }

    public void copyInto(ProductDescription pd) {
        this.setAddOnAmenityInd(pd.getAddOnAmenityInd());
        this.setAvailabilityInd(pd.getAvailabilityInd());
        this.setCalloutInd(pd.getCalloutInd());
        this.setElementCode(pd.getElementCode());
        this.setElementCodeList(pd.getElementCodeList());
        this.setElementCodeName(pd.getElementCodeName());
        this.setElementGroupCode(pd.getElementGroupCode());
        this.setElementGroupName(pd.getElementGroupName());
        this.setElementTypeCode(pd.getElementTypeCode());
        this.setElementTypeName(pd.getElementTypeName());
        this.setMarshaOriginatedInd(pd.getMarshaOriginatedInd());
        this.setMustComplete(pd.getMustComplete());
        this.setQuantity(pd.getQuantity());
        this.setRoomNumber(pd.getRoomNumber());
        /*
         * this.setDescription(pd.getDescription());
         * this.setSupplementaryData(pd.getSupplementaryData());
         * this.setBrand(pd.getBrand()); this.setFormat(pd.getFormat());
         * this.setUnitOfMeasure(pd.getUnitOfMeasure());
         */

        SupplementaryData[] origSupplementaryData = pd.getSupplementaryData();
        if (origSupplementaryData != null) {
            this.supplementaryData = new SupplementaryData[origSupplementaryData.length];
            for (int i = 0; i < origSupplementaryData.length; i++) {
                SupplementaryData newsd = new SupplementaryData(origSupplementaryData[i]);
                this.supplementaryData[i] = newsd;
            }
        }

        if (pd.getDescription() != null)
            this.description = new Description(pd.getDescription());

        if (pd.getBrand() != null)
            this.brand = new Brand(pd.getBrand());

        if (pd.getFormat() != null)
            this.format = new Format(pd.getFormat());

        if (pd.getUnitOfMeasure() != null)
            this.unitOfMeasure = new UnitOfMeasure(pd.getUnitOfMeasure());
    }

}
