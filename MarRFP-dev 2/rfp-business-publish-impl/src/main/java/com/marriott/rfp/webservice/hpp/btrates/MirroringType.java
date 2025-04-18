//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.hpp.btrates;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for MirroringType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="MirroringType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice>
 *         &lt;element name="MirrorInfoWithRateEntityId" type="{http://com/marriott/rma/webservice/btrates}KnownRateEntityIdType"/>
 *         &lt;element name="MirrorInfoWithoutRateEntityId" type="{http://com/marriott/rma/webservice/btrates}UnknownRateEntityIdType"/>
 *       &lt;/choice>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "MirroringType", namespace = "http://com/marriott/rma/webservice/btrates", propOrder = {
    "mirrorInfoWithRateEntityId",
    "mirrorInfoWithoutRateEntityId"
})
public class MirroringType {

    @XmlElement(name = "MirrorInfoWithRateEntityId")
    protected KnownRateEntityIdType mirrorInfoWithRateEntityId;
    @XmlElement(name = "MirrorInfoWithoutRateEntityId")
    protected UnknownRateEntityIdType mirrorInfoWithoutRateEntityId;

    /**
     * Gets the value of the mirrorInfoWithRateEntityId property.
     * 
     * @return
     *     possible object is
     *     {@link KnownRateEntityIdType }
     *     
     */
    public KnownRateEntityIdType getMirrorInfoWithRateEntityId() {
        return mirrorInfoWithRateEntityId;
    }

    /**
     * Sets the value of the mirrorInfoWithRateEntityId property.
     * 
     * @param value
     *     allowed object is
     *     {@link KnownRateEntityIdType }
     *     
     */
    public void setMirrorInfoWithRateEntityId(KnownRateEntityIdType value) {
        this.mirrorInfoWithRateEntityId = value;
    }

    /**
     * Gets the value of the mirrorInfoWithoutRateEntityId property.
     * 
     * @return
     *     possible object is
     *     {@link UnknownRateEntityIdType }
     *     
     */
    public UnknownRateEntityIdType getMirrorInfoWithoutRateEntityId() {
        return mirrorInfoWithoutRateEntityId;
    }

    /**
     * Sets the value of the mirrorInfoWithoutRateEntityId property.
     * 
     * @param value
     *     allowed object is
     *     {@link UnknownRateEntityIdType }
     *     
     */
    public void setMirrorInfoWithoutRateEntityId(UnknownRateEntityIdType value) {
        this.mirrorInfoWithoutRateEntityId = value;
    }

}
