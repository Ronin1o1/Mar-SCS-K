//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.hpp.btrates;

import java.util.ArrayList;
import java.util.List;
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
 *         &lt;element name="PropertyPublishResponse" type="{http://com/marriott/rma/webservice/btrates}PropertyPublishResponseType" maxOccurs="unbounded"/>
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
    "propertyPublishResponse"
})
@XmlRootElement(name = "BTPublishResponse")
public class BTPublishResponse {

    @XmlElement(name = "PropertyPublishResponse", required = true)
    protected List<PropertyPublishResponseType> propertyPublishResponse;

    /**
     * Gets the value of the propertyPublishResponse property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the propertyPublishResponse property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPropertyPublishResponse().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link PropertyPublishResponseType }
     * 
     * 
     */
    public List<PropertyPublishResponseType> getPropertyPublishResponse() {
        if (propertyPublishResponse == null) {
            propertyPublishResponse = new ArrayList<PropertyPublishResponseType>();
        }
        return this.propertyPublishResponse;
    }

}
