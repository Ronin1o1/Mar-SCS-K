/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channels;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;

public interface GetHotelRoomProductInfoChannelsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ(MI_HotelRoomProductInfoChannelsRQ MI_HotelRoomProductInfoChannelsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ(String SoapPort_address) throws java.rmi.RemoteException,  ServiceException;
}
