//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.pgoos.batch;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

@WebService(name = "PGOOSBatchPortType", targetNamespace = "http://com/marriott/rfp/webservice/pgoos/batch/")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface PGOOSBatchPortType {


    /**
     * 
     * @param eid
     * @param batchId
     * @param count
     */
    @WebMethod(action = "http://com/marriott/rfp/webservice/pgoos/batch/executeQueueForBatch")
    @RequestWrapper(localName = "executeQueueForBatch", targetNamespace = "http://com/marriott/rfp/webservice/pgoos/batch/", className = "com.marriott.rfp.webservice.pgoos.batch.ExecuteQueueForBatch")
    @ResponseWrapper(localName = "executeQueueForBatchResponse", targetNamespace = "http://com/marriott/rfp/webservice/pgoos/batch/", className = "com.marriott.rfp.webservice.pgoos.batch.ExecuteQueueForBatchResponse")
    public void executeQueueForBatch(
        @WebParam(name = "batchId", targetNamespace = "")
        long batchId,
        @WebParam(name = "count", targetNamespace = "")
        long count,
        @WebParam(name = "eid", targetNamespace = "")
        String eid);

}
