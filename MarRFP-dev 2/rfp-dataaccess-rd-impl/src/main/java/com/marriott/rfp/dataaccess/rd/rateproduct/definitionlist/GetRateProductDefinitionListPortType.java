/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRS;

public interface GetRateProductDefinitionListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDefinitionsListRS MI_RateProductDefinitionsListRQ(MI_RateProductDefinitionsListRQ MI_RateProductDefinitionsListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RateProductDefinitionsListRS MI_RateProductDefinitionsListRQ(String marshacode, String brandcode, String productCode, String productName, long count, String startProduct, String endProduct,
            RateProductDefinition[] rtnd,String SoapPort_addressl) throws java.rmi.RemoteException, ServiceException;

}
