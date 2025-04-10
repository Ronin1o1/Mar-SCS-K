/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRS;

public interface GetRateProductDefinitionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDefinitionsRS MI_RateProductDefinitionsRQ(MI_RateProductDefinitionsRQ MI_RateProductDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RateProductDefinitionsRS MI_RateProductDefinitionsRQ(String marshacode,String brandcode, String productcode, String level,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}
