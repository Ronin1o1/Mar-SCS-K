/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.datadictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRS;

public interface GetHotelRoomProductDataDictionaryPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductDataDictionaryRS MI_HotelRoomProductDataDictionaryRQ(MI_HotelRoomProductDataDictionaryRQ MI_HotelRoomProductDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_HotelRoomProductDataDictionaryRS MI_HotelRoomProductDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}
