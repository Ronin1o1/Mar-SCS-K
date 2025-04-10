/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hotelroomtypelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;

public interface GetHotelRoomPoolListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomPoolListRS MI_HotelRoomPoolListRQ(MI_HotelRoomPoolListRQ MI_HotelRoomPoolListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomPoolListRS MI_HotelRoomPoolListRQ(String marshacode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}
