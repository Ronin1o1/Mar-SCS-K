/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductoptions;

import java.rmi.RemoteException;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRS;

public interface GetHotelRoomProductOptionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */ 
    public MI_HotelRoomProductOptionsRS MI_HotelRoomProductOptionsRQ(MI_HotelRoomProductOptionsRQ MI_HotelRoomProductOptionsRQ,String SoapPort_address) throws RemoteException, ServiceException;

	public MI_HotelRoomProductOptionsRS GetProductOptions(String marshacode,String SoapPort_address ) throws RemoteException, ServiceException;
}
