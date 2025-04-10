//
// Generated By:JAX-WS RI IBM 2.1.6 in JDK 6 (JAXB RI IBM JAXB 2.1.10 in JDK 6)
//


package com.marriott.rfp.webservice.product.batch;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

@WebService(name = "PgoosPropagateProductPortType", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface PgoosPropagateProductPortType {


    /**
     * 
     * @param eid
     * @param isAer
     * @param batchId
     * @param productid
     * @param marshacode
     * @param amenityDiff
     * @param accountrecid
     * @param hotelid
     */
    @WebMethod(action = "http://com/marriott/rfp/webservice/product/batch/hotelProductProcess")
    @RequestWrapper(localName = "hotelProductProcess", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.HotelProductProcess")
    @ResponseWrapper(localName = "hotelProductProcessResponse", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.HotelProductProcessResponse")
    public void hotelProductProcess(
        @WebParam(name = "batchId", targetNamespace = "")
        long batchId,
        @WebParam(name = "hotelid", targetNamespace = "")
        long hotelid,
        @WebParam(name = "accountrecid", targetNamespace = "")
        long accountrecid,
        @WebParam(name = "marshacode", targetNamespace = "")
        String marshacode,
        @WebParam(name = "productid", targetNamespace = "")
        String productid,
        @WebParam(name = "amenity_diff", targetNamespace = "")
        String amenityDiff,
        @WebParam(name = "isAer", targetNamespace = "")
        String isAer,
        @WebParam(name = "eid", targetNamespace = "")
        String eid);

    /**
     * 
     * @param period
     * @param productid
     * @param accountrecid
     */
    @WebMethod(action = "http://com/marriott/rfp/webservice/product/batch/accountBatchProductVerifyProcess")
    @RequestWrapper(localName = "accountBatchProductVerifyProcess", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.AccountBatchProductVerifyProcess")
    @ResponseWrapper(localName = "accountBatchProductVerifyProcesssResponse", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.AccountBatchProductVerifyProcesssResponse")
    public void accountBatchProductVerifyProcess(
        @WebParam(name = "period", targetNamespace = "")
        long period,
        @WebParam(name = "accountrecid", targetNamespace = "")
        long accountrecid,
        @WebParam(name = "productid", targetNamespace = "")
        String productid);

    /**
     * 
     * @param eid
     * @param batchId
     */
    @WebMethod(action = "http://com/marriott/rfp/webservice/product/batch/accountBatchProductMasterProcess")
    @RequestWrapper(localName = "accountBatchProductMasterProcess", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.AccountBatchProductMasterProcess")
    @ResponseWrapper(localName = "accountBatchProductMasterProcessResponse", targetNamespace = "http://com/marriott/rfp/webservice/product/batch/", className = "com.marriott.rfp.webservice.product.batch.AccountBatchProductMasterProcessResponse")
    public void accountBatchProductMasterProcess(
        @WebParam(name = "batchId", targetNamespace = "")
        long batchId,
        @WebParam(name = "eid", targetNamespace = "")
        String eid);

}
