/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.datedictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;

public interface GetRateProductDataDictionaryPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDataDictionaryRS MI_RateProductDataDictionaryRQ(MI_RateProductDataDictionaryRQ MI_RateProductDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RateProductDataDictionaryRS MI_RateProductDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}
