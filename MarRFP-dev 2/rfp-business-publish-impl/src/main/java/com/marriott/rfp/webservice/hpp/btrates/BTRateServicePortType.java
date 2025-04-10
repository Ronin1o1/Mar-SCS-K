//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.hpp.btrates;

import javax.jws.HandlerChain;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

@WebService(name = "BTRateServicePortType", targetNamespace = "http://com/marriott/rma/webservice/btrates")
@HandlerChain (file="handler.xml")
@SOAPBinding(parameterStyle = SOAPBinding.ParameterStyle.BARE)
@XmlSeeAlso({
    ObjectFactory.class
})
public interface BTRateServicePortType {


    /**
     * 
     * @param parameter
     * @return
     *     returns com.marriott.rfp.webservice.hpp.btrates.BTRatesResponse
     * @throws FaultMessage_Exception
     */
    @WebMethod(operationName = "SendBTRates", action = "SendBTRates")
    @WebResult(name = "BTRatesResponse", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
    public BTRatesResponse sendBTRates(
        @WebParam(name = "BTRatesRequest", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
        BTRatesRequest parameter)
        throws FaultMessage_Exception
    ;

    /**
     * 
     * @param parameter
     * @return
     *     returns com.marriott.rfp.webservice.hpp.btrates.BTPublishResponse
     * @throws FaultMessage_Exception
     */
    @WebMethod(operationName = "PublishBTRates", action = "PublishBTRates")
    @WebResult(name = "BTPublishResponse", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
    public BTPublishResponse publishBTRates(
        @WebParam(name = "BTPublishRequest", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
        BTPublishRequest parameter)
        throws FaultMessage_Exception
    ;

    /**
     * 
     * @param parameter
     * @return
     *     returns com.marriott.rfp.webservice.hpp.btrates.BTRatesResponse
     * @throws FaultMessage_Exception
     */
    @WebMethod(operationName = "BTRatesStatus", action = "BTRatesStatus")
    @WebResult(name = "BTRatesResponse", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
    public BTRatesResponse btRatesStatus(
        @WebParam(name = "BTRatesStatusRequest", targetNamespace = "http://com/marriott/rma/webservice/btrates", partName = "parameter")
        BTRatesStatusRequest parameter)
        throws FaultMessage_Exception
    ;

}
