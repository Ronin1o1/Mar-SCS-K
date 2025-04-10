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

public class RateProductDefinition implements java.io.Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected java.lang.String RP_ListName; // attribute
    protected java.lang.String RP_ListCode; // attribute
    protected java.lang.String RP_GroupName; // attribute
    protected java.lang.String RP_GroupCode; // attribute
    protected java.lang.String RP_Name; // attribute
    protected java.lang.String RP_Code; // attribute
    protected java.lang.String RP_CodeName; // attribute
    protected java.lang.String availabilityInd = " "; // attribute
    protected java.lang.String mustComplete; // attribute
    protected BigDecimal quantity; //attribute
    protected String managed="false";//attribute
    protected String brandModifiable="true";// attribute
    protected String hotelModifiable="true";// attribute  
    protected String productCode; //attribute
    protected String productName; //attribute
    protected Text text;
    protected Type type;
    protected Brand brand;
    protected UnitOfMeasure unitOfMeasure;
    protected Description description;
    protected SupplementaryData[] supplementaryData;

    public RateProductDefinition() {
    }

    public RateProductDefinition(String RP_ListCode, String RP_GroupCode, String RP_Name, String RP_Code) {
        super();
        this.RP_ListCode=RP_ListCode;
        this.RP_GroupCode=RP_GroupCode;
        this.RP_Name=RP_Name;
        this.RP_Code=RP_Code;
    }

    public RateProductDefinition(RateProductDefinition pd) {
        super();
        copyInto(pd);
    }

    private java.lang.Object __equalsCalc = null;

    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinition))
            return false;
        RateProductDefinition other = (RateProductDefinition) obj;
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
                && ((RP_ListName == null && other.getRP_ListName() == null) || (RP_ListName != null && RP_ListName.equals(other
                        .getRP_ListName())))
                && ((RP_ListCode == null && other.getRP_ListCode() == null) || (RP_ListCode != null && RP_ListCode.equals(other
                        .getRP_ListCode())))
                && ((RP_GroupName == null && other.getRP_GroupName() == null) || (RP_GroupName != null && RP_GroupName.equals(other
                        .getRP_GroupName())))
                && ((RP_GroupCode == null && other.getRP_GroupCode() == null) || (RP_GroupCode != null && RP_GroupCode.equals(other
                        .getRP_GroupCode())))
                && ((RP_Name == null && other.getRP_Name() == null) || (RP_Name != null && RP_Name.equals(other.getRP_Name())))
                && ((RP_Code == null && other.getRP_Code() == null) || (RP_Code != null && RP_Code.equals(other.getRP_Code())))
                && ((RP_CodeName == null && other.getRP_CodeName() == null) || (RP_CodeName != null && RP_CodeName.equals(other
                        .getRP_CodeName())))
                && ((availabilityInd == null && other.getAvailabilityInd() == null) || (availabilityInd != null && availabilityInd.equals(other
                        .getAvailabilityInd())))
                && ((mustComplete == null && other.getMustComplete() == null) || (mustComplete != null && mustComplete
                        .equals(other.getMustComplete())))
                && ((quantity == null && other.getQuantity() == null) || (quantity != null && quantity.equals(other.getQuantity())))
                && ((managed == null && other.getManaged() == null) || (managed != null && managed
                        .equals(other.getManaged())))
                && ((brandModifiable == null && other.getBrandModifiable() == null) || (brandModifiable != null && brandModifiable
                        .equals(other.getBrandModifiable())))
                && ((hotelModifiable == null && other.getHotelModifiable() == null) || (hotelModifiable != null && hotelModifiable
                        .equals(other.getHotelModifiable())))
                && ((productCode == null && other.getProductCode() == null) || (productCode != null && productCode
                        .equals(other.getProductCode())))
                && ((productName == null && other.getProductName() == null) || (productName != null && productName
                        .equals(other.getProductName())))
                && ((text == null && other.getText() == null) || (text != null && text.equals(other.getText())))
                && ((type == null && other.getType() == null) || (type != null && type.equals(other.getType())))
                && ((unitOfMeasure == null && other.getUnitOfMeasure() == null) || (unitOfMeasure != null && unitOfMeasure.equals(other
                        .getUnitOfMeasure())))
                && ((brand == null && other.getBrand() == null) || (brand != null && brand.equals(other
                        .getBrand())))
                && ((description == null && other.getDescription() == null) || (description != null && description.equals(other.getDescription())))
                && ((supplementaryData == null && other.getSupplementaryData() == null) || (supplementaryData != null && supplementaryData
                        .equals(other.getSupplementaryData())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RP_Code% attributes are equal. The elements are not
     * compared
     */
    public synchronized boolean RP_CodeEquals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinition))
            return false;
        RateProductDefinition other = (RateProductDefinition) obj;
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
                && ((RP_Name == null && other.getRP_Name() == null) || (RP_Name != null && RP_Name.equals(other.getRP_Name())))
                && ((RP_Code == null && other.getRP_Code() == null) || (RP_Code != null && RP_Code.equals(other.getRP_Code())))
                && ((RP_CodeName == null && other.getRP_CodeName() == null) || (RP_CodeName != null && RP_CodeName.equals(other
                        .getRP_CodeName())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RP_Code% attributes are equal. The elements are not
     * compared
     */
    public synchronized boolean RP_CodeandRoomEquals(java.lang.Object obj) {
        if (!(obj instanceof RateProductDefinition))
            return false;
        RateProductDefinition other = (RateProductDefinition) obj;
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
                && ((RP_Name == null && other.getRP_Name() == null) || (RP_Name != null && RP_Name.equals(other.getRP_Name())))
                && ((RP_Code == null && other.getRP_Code() == null) || (RP_Code != null && RP_Code.equals(other.getRP_Code())))
                && ((RP_CodeName == null && other.getRP_CodeName() == null) || (RP_CodeName != null && RP_CodeName.equals(other
                        .getRP_CodeName())));
        __equalsCalc = null;
        return _equals;
    }

    /*
     * returns true if the RP_Code% attributes are equal. The elements are not
     * compared
     */
    public boolean RP_CodeMatch(String eleCodeList, String eleCode) {
        boolean _equals;
        String testCodeList = RP_Name.trim();
        _equals = testCodeList.equals(eleCodeList) && RP_Code.equals(eleCode);
        return _equals;
    }

    private boolean __hashCodeCalc = false;

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
        if (getRP_GroupName() != null) {
            _hashCode += getRP_GroupName().hashCode();
        }
        if (getRP_GroupCode() != null) {
            _hashCode += getRP_GroupCode().hashCode();
        }
        if (getRP_Name() != null) {
            _hashCode += getRP_Name().hashCode();
        }
        if (getRP_Code() != null) {
            _hashCode += getRP_Code().hashCode();
        }
        if (getRP_CodeName() != null) {
            _hashCode += getRP_CodeName().hashCode();
        }
        if (getAvailabilityInd() != null) {
            _hashCode += getAvailabilityInd().hashCode();
        }
        if (getMustComplete() != null) {
            _hashCode += getMustComplete().hashCode();
        }
        if (getManaged() != null) {
            _hashCode += getManaged().hashCode();
        }
        if (getBrandModifiable() != null) {
            _hashCode += getBrandModifiable().hashCode();
        }
        if (getHotelModifiable() != null) {
            _hashCode += getHotelModifiable().hashCode();
        }
        if (getText() != null) {
            _hashCode += getText().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        if (getUnitOfMeasure() != null) {
            _hashCode += getUnitOfMeasure().hashCode();
        }
        if (getBrand() != null) {
            _hashCode += getBrand().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getQuantity() != null) {
            _hashCode += getQuantity().hashCode();
        }
        if (getProductCode() != null) {
            _hashCode += getProductCode().hashCode();
        }
        if (getProductName() != null) {
            _hashCode += getProductName().hashCode();
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
    private static org.apache.axis.description.TypeDesc typeDesc = new org.apache.axis.description.TypeDesc(RateProductDefinition.class);

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
        field.setFieldName("RP_GroupName");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_GroupName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_GroupCode");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_GroupCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_Name");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_Name"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_Code");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_Code"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("RP_CodeName");
        field.setXmlName(new javax.xml.namespace.QName("", "RP_CodeName"));
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

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("managed");
        field.setXmlName(new javax.xml.namespace.QName("", "Managed"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("brandModifiable");
        field.setXmlName(new javax.xml.namespace.QName("", "BrandModifiable"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("hotelModifiable");
        field.setXmlName(new javax.xml.namespace.QName("", "HotelModifiable"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);

        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("productCode");
        field.setXmlName(new javax.xml.namespace.QName("", "ProductCode"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        field = new org.apache.axis.description.AttributeDesc();
        field.setFieldName("productName");
        field.setXmlName(new javax.xml.namespace.QName("", "ProductName"));
        field.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(field);
        
        ElementDesc ele = new ElementDesc();
        ele.setFieldName("text");
        ele.setXmlName(new javax.xml.namespace.QName("", "Text"));
        ele.setMinOccurs(0);
        ele.setNillable(false);
        typeDesc.addFieldDesc(ele);

         ele = new ElementDesc();
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
        ele.setFieldName("brand");
        ele.setXmlName(new javax.xml.namespace.QName("", "Brand"));
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
    public java.lang.String getRP_Code() {
        return RP_Code;
    }

    /**
     * @return
     */
    public java.lang.String getRP_Name() {
        return RP_Name;
    }

    /**
     * @return
     */
    public java.lang.String getRP_GroupCode() {
        return RP_GroupCode;
    }

    /**
     * @return
     */
    public java.lang.String getRP_GroupName() {
        return RP_GroupName;
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
     * @return
     */
    public java.lang.String getMustComplete() {
        return mustComplete;
    }

    /**
     * @param string
     */
    public void setAvailabilityInd(java.lang.String string) {
        if (string == null || string.trim().equals(""))
            string = " ";
        availabilityInd = string;
    }

   public void setBlankAvailabilityInd() {
        availabilityInd = null;
    }

    /**
     * @param string
     */
    public void setRP_Code(java.lang.String string) {
        RP_Code = string;
    }

    /**
     * @param string
     */
    public void setRP_Name(java.lang.String string) {
        RP_Name = string;
    }

    /**
     * @param string
     */
    public void setRP_GroupCode(java.lang.String string) {
        RP_GroupCode = string;
    }

    /**
     * @param string
     */
    public void setRP_GroupName(java.lang.String string) {
        RP_GroupName = string;
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
     * @param string
     */
    public void setMustComplete(java.lang.String string) {
        mustComplete = string;
    }

    /**
     * @return
     */
    public java.lang.String getRP_CodeName() {
        return RP_CodeName;
    }

    /**
     * @param string
     */
    public void setRP_CodeName(java.lang.String string) {
        RP_CodeName = string;
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

    public void copyInto(RateProductDefinition pd) {
        this.setAvailabilityInd(pd.getAvailabilityInd());
        this.setRP_Code(pd.getRP_Code());
        this.setRP_Name(pd.getRP_Name());
        this.setRP_CodeName(pd.getRP_CodeName());
        this.setRP_GroupCode(pd.getRP_GroupCode());
        this.setRP_GroupName(pd.getRP_GroupName());
        this.setRP_ListCode(pd.getRP_ListCode());
        this.setRP_ListName(pd.getRP_ListName());
        this.setMustComplete(pd.getMustComplete());
        this.setQuantity(pd.getQuantity());
        this.setManaged(pd.getManaged());
        this.setBrandModifiable(pd.getBrandModifiable());
        this.setHotelModifiable(pd.getHotelModifiable());
        this.setProductCode(pd.getProductCode());
        this.setProductName(pd.getProductName());
        this.setText(pd.getText());
        
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

        if (pd.getBrand() != null)
            this.brand = new Brand(pd.getBrand());

        if (pd.getUnitOfMeasure() != null)
            this.unitOfMeasure = new UnitOfMeasure(pd.getUnitOfMeasure());
    }

    public void copyDataInto(RateProductDefinition pd) {
        this.setAvailabilityInd(pd.getAvailabilityInd());
        this.setQuantity(pd.getQuantity());
        this.setManaged(pd.getManaged());
        this.setBrandModifiable(pd.getBrandModifiable());
        this.setHotelModifiable(pd.getHotelModifiable());
       

        if (this.description != null && pd.getDescription() != null)
            description.copyDataInto(pd.getDescription());

        if (this.type != null && pd.getType() != null)
            type.copyDataInto(pd.getType());

        if (this.brand != null && pd.getBrand() != null)
            this.brand.copyDataInto(pd.getBrand());

        if (this.unitOfMeasure != null && pd.getUnitOfMeasure() != null)
            this.unitOfMeasure.copyDataInto(pd.getUnitOfMeasure());
    }

    public String findText(String rplistCode, String rpgroupCode, String rpcode, String rpname) {
        String textVal = "";
        if (RP_ListCode.equals(rplistCode) && RP_GroupCode.equals(rpgroupCode)) {
            if (((rpcode == null || rpcode.trim().equals("")) && (rpname == null || rpname.trim().equals("")))
                    || (RP_Code.equals(rpcode) && RP_Name.equals(rpname))) {
                if (description != null) {
                    Text[] txt = description.getText();
                    textVal = txt[0].getValue();
                }
            }
        }
        return textVal;
    }

    /**
     * @return Returns the brand.
     */
    public Brand getBrand() {
        return brand;
    }
    /**
     * @param brand The brand to set.
     */
    public void setBrand(Brand brand) {
        this.brand = brand;
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
    /**
     * @return Returns the brandModifiable.
     */
    public String getBrandModifiable() {
        return brandModifiable;
    }
    /**
     * @param brandModifiable The brandModifiable to set.
     */
    public void setBrandModifiable(String brandModifiable) {
        this.brandModifiable = brandModifiable;
    }
    /**
     * @return Returns the hotelModifiable.
     */
    public String getHotelModifiable() {
        return hotelModifiable;
    }
    /**
     * @param hotelModifiable The hotelModifiable to set.
     */
    public void setHotelModifiable(String hotelModifiable) {
        this.hotelModifiable = hotelModifiable;
    }
    /**
     * @return Returns the managed.
     */
    public String getManaged() {
        return managed;
    }
    /**
     * @param managed The managed to set.
     */
    public void setManaged(String managed) {
        this.managed = managed;
    }
    /**
     * @return Returns the productCode.
     */
    public String getProductCode() {
        return productCode;
    }
    /**
     * @param productCode The productCode to set.
     */
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
    /**
     * @return Returns the productName.
     */
    public String getProductName() {
        return productName;
    }
    /**
     * @param productName The productName to set.
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }
}
