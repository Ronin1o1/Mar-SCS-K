/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRS;

public interface GetHotelRoomTypeNameDefinitionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomTypeNameDefinitionsRS MI_HotelRoomTypeNameDefinitionsRQ(MI_HotelRoomTypeNameDefinitionsRQ MI_HotelRoomTypeNameDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomTypeNameDefinitionsRS MI_HotelRoomTypeNameDefinitionsRQ(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}
