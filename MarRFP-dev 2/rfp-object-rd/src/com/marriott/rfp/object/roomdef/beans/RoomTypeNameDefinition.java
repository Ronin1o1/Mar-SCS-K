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

public class RoomTypeNameDefinition implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected java.lang.String RTND_ListName; // attribute
    protected java.lang.String RTND_ListCode; // attribute
    protected java.lang.String RTND_GroupName; // attribute
    protected java.lang.String RTND_GroupCode; // attribute
    protected java.lang.String RTND_Name; // attribute
    protected java.lang.String RTND_Code; // attribute
    protected java.lang.String RTND_CodeName; // attribute
    protected java.lang.String availabilityInd = " "; // attribute
    protected java.lang.String mustComplete; // attribute
    protected BigDecimal quantity; //attribute
    protected Type type;
    protected AlternateText alternateText;
    protected UnitOfMeasure unitOfMeasure;
    protected Description description;
    protected SupplementaryData[] supplementaryData;

    public RoomTypeNameDefinition() {
    }

    public RoomTypeNameDefinition(RoomTypeNameDefinition pd) {
        super();
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    @Override
	public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RoomTypeNameDefinition))
            return false;
        RoomTypeNameDefinition other = (RoomTypeNameDefinition) obj;
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
                && ((RTND_ListName == null && other.getRTND_ListName() == null) || (RTND_ListName != null && RTND_ListName.equals(other
                        .getRTND_ListName())))
                && ((RTND_ListCode == null && other.getRTND_ListCode() == null) || (RTND_ListCode != null && RTND_ListCode.equals(other
                        .getRTND_ListCode())))
                && ((RTND_GroupName == null && other.getRTND_GroupName() == null) || (RTND_GroupName != null && RTND_GroupName.equals(other
                        .getRTND_GroupName())))
                && ((RTND_GroupCode == null && other.getRTND_GroupCode() == null) || (RTND_GroupCode != null && RTND_GroupCode.equals(other
                        .getRTND_GroupCode())))
                && ((RTND_Name == null && other.getRTND_Name() == null) || (RTND_Name != null && RTND_Name.equals(other.getRTND_Name())))
                && ((RTND_Code == null && other.getRTND_Code() == null) || (RTND_Code != null && RTND_Code.equals(other.getRTND_Code())))
                && ((RTND_CodeName == null && other.getRTND_CodeName() == null) || (RTND_CodeName != null && RTND_CodeName.equals(other
                        .getRTND_CodeName())))
                && ((availabilityInd == null && other.getAvailabilityInd() == null) || (availabilityInd != null && availabilityInd.equals(other
                        .getAvailabilityInd())))
                && ((mustComplete == null && other.getMustComplete() == null) || (mustComplete != null && mustComplete
                        .equals(other.getMustComplete())))
                && ((quantity == null && other.getQuantity() == null) || (quantity != null && quantity.equals(other.getQuantity())))
                && ((type == null && other.getType() == null) || (type != null && type.equals(other.getType())))
                && ((unitOfMeasure == null && other.getUnitOfMeasure() == null) || (unitOfMeasure != null && unitOfMeasure.equals(other
                        .getUnitOfMeasure())))
                && ((alternateText == null && other.getAlternateText() == null) || (alternateText != null && alternateText.equals(other
                        .getAlternateText())))
                && ((description == null && other.getDescription() == null) || (description != null && description.equals(other.getDescription())))
                && ((supplementaryData == null && other.getSupplementaryData() == null) || (supplementaryData != null && supplementaryData
                        .equals(other.getSupplementaryData())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RTND_Code% attributes are equal. The elements are not
     * compared
     */
    public synchronized boolean RTND_CodeEquals(java.lang.Object obj) {
        if (!(obj instanceof RoomTypeNameDefinition))
            return false;
        RoomTypeNameDefinition other = (RoomTypeNameDefinition) obj;
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
                && ((RTND_Name == null && other.getRTND_Name() == null) || (RTND_Name != null && RTND_Name.equals(other.getRTND_Name())))
                && ((RTND_Code == null && other.getRTND_Code() == null) || (RTND_Code != null && RTND_Code.equals(other.getRTND_Code())))
                && ((RTND_CodeName == null && other.getRTND_CodeName() == null) || (RTND_CodeName != null && RTND_CodeName.equals(other
                        .getRTND_CodeName())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RTND_Code% attributes are equal. The elements are not
     * compared
     */
    public synchronized boolean RTND_CodeandRoomEquals(java.lang.Object obj) {
        if (!(obj instanceof RoomTypeNameDefinition))
            return false;
        RoomTypeNameDefinition other = (RoomTypeNameDefinition) obj;
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
                && ((RTND_Name == null && other.getRTND_Name() == null) || (RTND_Name != null && RTND_Name.equals(other.getRTND_Name())))
                && ((RTND_Code == null && other.getRTND_Code() == null) || (RTND_Code != null && RTND_Code.equals(other.getRTND_Code())))
                && ((RTND_CodeName == null && other.getRTND_CodeName() == null) || (RTND_CodeName != null && RTND_CodeName.equals(other
                        .getRTND_CodeName())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RTND_Code% attributes are equal. The elements are not
     * compared
     */
    public boolean RTND_CodeMatch(String eleCodeList, String eleCode) {
        boolean _equals;
        String testCodeList = RTND_Name.trim();
        _equals = testCodeList.equals(eleCodeList) && RTND_Code.equals(eleCode);
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
        if (getRTND_ListName() != null) {
            _hashCode += getRTND_ListName().hashCode();
        }
        if (getRTND_ListCode() != null) {
            _hashCode += getRTND_ListCode().hashCode();
        }
        if (getRTND_GroupName() != null) {
            _hashCode += getRTND_GroupName().hashCode();
        }
        if (getRTND_GroupCode() != null) {
            _hashCode += getRTND_GroupCode().hashCode();
        }
        if (getRTND_Name() != null) {
            _hashCode += getRTND_Name().hashCode();
        }
        if (getRTND_Code() != null) {
            _hashCode += getRTND_Code().hashCode();
        }
        if (getRTND_CodeName() != null) {
            _hashCode += getRTND_CodeName().hashCode();
        }
        if (getAvailabilityInd() != null) {
            _hashCode += getAvailabilityInd().hashCode();
        }
        if (getMustComplete() != null) {
            _hashCode += getMustComplete().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        if (getUnitOfMeasure() != null) {
            _hashCode += getUnitOfMeasure().hashCode();
        }
        if (getAlternateText() != null) {
            _hashCode += getAlternateText().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getQuantity() != null) {
            _hashCode += getQuantity().hashCode();
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RoomTypeNameDefinition.class);

    static {

        org.apache.axis.description.FieldDesc field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_ListName");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_ListName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_ListCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_ListCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_GroupName");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_GroupName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_GroupCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_GroupCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_Name");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_Name"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_Code");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_Code"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RTND_CodeName");
        field.setXmlName(new javax.xml.namespace.QName("", "RTND_CodeName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("availabilityInd");
        field.setXmlName(new javax.xml.namespace.QName("", "AvailabilityInd"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("mustComplete");
        field.setXmlName(new javax.xml.namespace.QName("", "MustComplete"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("quantity");
        field.setXmlName(new javax.xml.namespace.QName("", "Quantity"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "byte"));
        typeDesc.addFieldDesc(field);
        
        ElementDesc ele = new ElementDesc();
        ele.setFieldName("type");
        ele.setXmlName(new javax.xml.namespace.QName("", "Type"));
        ele.setMinOccurs(0);
        ele.setNillable(false);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("unitOfMeasure");
        ele.setXmlName(new javax.xml.namespace.QName("", "UnitOfMeasure"));
        ele.setMinOccurs(0);
        typeDesc.addFieldDesc(ele);

        ele = new ElementDesc();
        ele.setFieldName("alternateText");
        ele.setXmlName(new javax.xml.namespace.QName("", "AlternateText"));
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
    public java.lang.String getAvailabilityInd() {
        return availabilityInd;
    }

    /**
     * @return Returns the quantity.
     */
    public BigDecimal getQuantity() {
        return quantity;
    }
    /**
     * @param quantity The quantity to set.
     */
    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }
    /**
     * @return
     */
    public java.lang.String getRTND_Code() {
        return RTND_Code;
    }

    /**
     * @return
     */
    public java.lang.String getRTND_Name() {
        return RTND_Name;
    }

    /**
     * @return
     */
    public java.lang.String getRTND_GroupCode() {
        return RTND_GroupCode;
    }

    /**
     * @return
     */
    public java.lang.String getRTND_GroupName() {
        return RTND_GroupName;
    }

    /**
     * @return
     */
    public java.lang.String getRTND_ListCode() {
        return RTND_ListCode;
    }

    /**
     * @return
     */
    public java.lang.String getRTND_ListName() {
        return RTND_ListName;
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
    public void setAvailabilityInd(java.lang.String string) {
        if (string == null || string.equals(""))
            string = " ";
        availabilityInd = string;
    }

    /**
     * @param string
     */
    public void setRTND_Code(java.lang.String string) {
        RTND_Code = string;
    }

    /**
     * @param string
     */
    public void setRTND_Name(java.lang.String string) {
        RTND_Name = string;
    }

    /**
     * @param string
     */
    public void setRTND_GroupCode(java.lang.String string) {
        RTND_GroupCode = string;
    }

    /**
     * @param string
     */
    public void setRTND_GroupName(java.lang.String string) {
        RTND_GroupName = string;
    }

    /**
     * @param string
     */
    public void setRTND_ListCode(java.lang.String string) {
        RTND_ListCode = string;
    }

    /**
     * @param string
     */
    public void setRTND_ListName(java.lang.String string) {
        RTND_ListName = string;
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
    public java.lang.String getRTND_CodeName() {
        return RTND_CodeName;
    }

    /**
     * @param string
     */
    public void setRTND_CodeName(java.lang.String string) {
        RTND_CodeName = string;
    }

    
    /**
     * @return
     */
    public Type getType() {
        return type;
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
    public AlternateText getAlternateText() {
        return alternateText;
    }

    /**
     * @return
     */
    public UnitOfMeasure getUnitOfMeasure() {
        return unitOfMeasure;
    }

    /**
     * @param type
     */
    public void setType(Type type) {
        this.type = type;
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
    public void setAlternateText(AlternateText alternateText) {
        this.alternateText = alternateText;
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

    public void copyInto(RoomTypeNameDefinition pd) {
        this.setAvailabilityInd(pd.getAvailabilityInd());
        this.setRTND_Code(pd.getRTND_Code());
        this.setRTND_Name(pd.getRTND_Name());
        this.setRTND_CodeName(pd.getRTND_CodeName());
        this.setRTND_GroupCode(pd.getRTND_GroupCode());
        this.setRTND_GroupName(pd.getRTND_GroupName());
        this.setRTND_ListCode(pd.getRTND_ListCode());
        this.setRTND_ListName(pd.getRTND_ListName());
        this.setMustComplete(pd.getMustComplete());
        this.setQuantity(pd.getQuantity());

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

        if (pd.getType() != null)
            this.type = new Type(pd.getType());

        if (pd.getAlternateText() != null)
            this.alternateText = new AlternateText(pd.getAlternateText());

        if (pd.getUnitOfMeasure() != null)
            this.unitOfMeasure = new UnitOfMeasure(pd.getUnitOfMeasure());
    }

    public void copyDataInto(RoomTypeNameDefinition pd) {
        this.setAvailabilityInd(pd.getAvailabilityInd());
        this.setQuantity(pd.getQuantity());

        if (this.description != null && pd.getDescription() != null)
            description.copyDataInto(pd.getDescription());

        if (this.type != null && pd.getType() != null)
            type.copyDataInto(pd.getType());

        if (this.alternateText != null && pd.getAlternateText() != null)
            this.alternateText.copyDataInto(pd.getAlternateText());

        if (this.unitOfMeasure != null && pd.getUnitOfMeasure() != null)
            this.unitOfMeasure.copyDataInto(pd.getUnitOfMeasure());
    }

    public String findText(String rtndlistCode, String rtndgroupCode, String rtndcode, String rtndname) {
        String textVal = "";
        if (RTND_ListCode.equals(rtndlistCode) && RTND_GroupCode.equals(rtndgroupCode)) {
            if (((rtndcode == null || rtndcode.trim().equals("")) && (rtndname == null || rtndname.trim().equals("")))
                    || (RTND_Code.equals(rtndcode) && RTND_Name.equals(rtndname))) {
                if (description != null) {
                    Text[] txt = description.getText();
                    textVal = txt[0].getValue();
                }
            }
        }
        return textVal;
    }

}
