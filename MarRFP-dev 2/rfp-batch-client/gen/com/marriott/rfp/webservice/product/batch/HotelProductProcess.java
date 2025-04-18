//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.product.batch;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="batchId" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="hotelid" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="accountrecid" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="marshacode" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="productid" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="amenity_diff" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="isAer" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="eid" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "batchId",
    "hotelid",
    "accountrecid",
    "marshacode",
    "productid",
    "amenityDiff",
    "isAer",
    "eid"
})
@XmlRootElement(name = "hotelProductProcess")
public class HotelProductProcess {

    protected long batchId;
    protected long hotelid;
    protected long accountrecid;
    @XmlElement(required = true)
    protected String marshacode;
    @XmlElement(required = true)
    protected String productid;
    @XmlElement(name = "amenity_diff", required = true)
    protected String amenityDiff;
    @XmlElement(required = true)
    protected String isAer;
    @XmlElement(required = true)
    protected String eid;

    /**
     * Gets the value of the batchId property.
     * 
     */
    public long getBatchId() {
        return batchId;
    }

    /**
     * Sets the value of the batchId property.
     * 
     */
    public void setBatchId(long value) {
        this.batchId = value;
    }

    /**
     * Gets the value of the hotelid property.
     * 
     */
    public long getHotelid() {
        return hotelid;
    }

    /**
     * Sets the value of the hotelid property.
     * 
     */
    public void setHotelid(long value) {
        this.hotelid = value;
    }

    /**
     * Gets the value of the accountrecid property.
     * 
     */
    public long getAccountrecid() {
        return accountrecid;
    }

    /**
     * Sets the value of the accountrecid property.
     * 
     */
    public void setAccountrecid(long value) {
        this.accountrecid = value;
    }

    /**
     * Gets the value of the marshacode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMarshacode() {
        return marshacode;
    }

    /**
     * Sets the value of the marshacode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMarshacode(String value) {
        this.marshacode = value;
    }

    /**
     * Gets the value of the productid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProductid() {
        return productid;
    }

    /**
     * Sets the value of the productid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProductid(String value) {
        this.productid = value;
    }

    /**
     * Gets the value of the amenityDiff property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAmenityDiff() {
        return amenityDiff;
    }

    /**
     * Sets the value of the amenityDiff property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAmenityDiff(String value) {
        this.amenityDiff = value;
    }

    /**
     * Gets the value of the isAer property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIsAer() {
        return isAer;
    }

    /**
     * Sets the value of the isAer property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIsAer(String value) {
        this.isAer = value;
    }

    /**
     * Gets the value of the eid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEid() {
        return eid;
    }

    /**
     * Sets the value of the eid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEid(String value) {
        this.eid = value;
    }

}
