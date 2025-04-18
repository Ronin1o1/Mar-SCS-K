//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.hpp.btrates;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PricingParentType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PricingParentType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="MirrorParent" type="{http://com/marriott/rma/webservice/btrates}MirroringType"/>
 *           &lt;element name="MirrorSelf" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;/choice>
 *         &lt;element name="MirrorTier" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PricingParentType", namespace = "http://com/marriott/rma/webservice/btrates", propOrder = {
    "mirrorParent",
    "mirrorSelf",
    "mirrorTier"
})
public class PricingParentType {

    @XmlElement(name = "MirrorParent")
    protected MirroringType mirrorParent;
    @XmlElement(name = "MirrorSelf")
    protected Boolean mirrorSelf;
    @XmlElement(name = "MirrorTier")
    protected Long mirrorTier;

    /**
     * Gets the value of the mirrorParent property.
     * 
     * @return
     *     possible object is
     *     {@link MirroringType }
     *     
     */
    public MirroringType getMirrorParent() {
        return mirrorParent;
    }

    /**
     * Sets the value of the mirrorParent property.
     * 
     * @param value
     *     allowed object is
     *     {@link MirroringType }
     *     
     */
    public void setMirrorParent(MirroringType value) {
        this.mirrorParent = value;
    }

    /**
     * Gets the value of the mirrorSelf property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isMirrorSelf() {
        return mirrorSelf;
    }

    /**
     * Sets the value of the mirrorSelf property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setMirrorSelf(Boolean value) {
        this.mirrorSelf = value;
    }

    /**
     * Gets the value of the mirrorTier property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getMirrorTier() {
        return mirrorTier;
    }

    /**
     * Sets the value of the mirrorTier property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setMirrorTier(Long value) {
        this.mirrorTier = value;
    }

}
