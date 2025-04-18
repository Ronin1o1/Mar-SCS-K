//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.hpp.btrates;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RateEntityListType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RateEntityListType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="RateEntity" type="{http://com/marriott/rma/webservice/btrates}RateEntityType" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RateEntityListType", namespace = "http://com/marriott/rma/webservice/btrates", propOrder = {
    "rateEntity"
})
public class RateEntityListType {

    @XmlElement(name = "RateEntity", required = true)
    protected List<RateEntityType> rateEntity;

    /**
     * Gets the value of the rateEntity property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rateEntity property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRateEntity().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RateEntityType }
     * 
     * 
     */
    public List<RateEntityType> getRateEntity() {
        if (rateEntity == null) {
            rateEntity = new ArrayList<RateEntityType>();
        }
        return this.rateEntity;
    }

}
